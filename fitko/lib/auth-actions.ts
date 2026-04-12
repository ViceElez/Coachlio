"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient, createAdminClient } from "@/utils/supabase/server";
import { loginSchema, signupSchema } from "@/lib/validators/userAuthValidation";
import { routes } from "@/constants/routes";

const rateLimitStore = new Map<string, { attempts: number; resetTime: number }>();

function checkRateLimit(identifier: string, maxAttempts = 5, windowMs = 15 * 60 * 1000): boolean {
    const now = Date.now();
    const record = rateLimitStore.get(identifier);

    if (!record || now > record.resetTime) {
        rateLimitStore.set(identifier, { attempts: 1, resetTime: now + windowMs });
        return true;
    }

    if (record.attempts >= maxAttempts) {
        return false;
    }

    record.attempts++;
    return true;
}

function clearRateLimit(identifier: string) {
    rateLimitStore.delete(identifier);
}

export async function login(formData: FormData) {
    const supabase = await createClient();

    const data = {
        email: (formData.get("email") as string).trim(),
        password: formData.get("password") as string,
    };

    const parsedData = loginSchema.safeParse(data);

    if (!parsedData.success) {
        const fieldErrors: Record<string, string> = {};
        parsedData.error.issues.forEach(issue => {
            const key = String(issue.path[0]);
            if (key) fieldErrors[key] = issue.message;
        });
        return { errors: fieldErrors };
    }

    const { error } = await supabase.auth.signInWithPassword(parsedData.data);

    if (error) {
        const msg =
            error.message.toLowerCase().includes("invalid login credentials") ||
            error.message.toLowerCase().includes("invalid credentials")
                ? "Invalid email or password. Please try again."
                : error.message;
        return { errors: { general: msg } };
    }

    revalidatePath(routes.DASHBOARD, "layout");
    redirect(routes.DASHBOARD);
}

export async function signup(formData: FormData) {
    const adminSupabase = createAdminClient();
    const supabase = await createClient();
    const cookieStore = await cookies();
    const inviteCodeCookie = cookieStore.get("validated_invite_code");

    if (!inviteCodeCookie) {
        return { errors: { general: "Invalid session. Please verify your invite code again." } };
    }

    const inputData = {
        firstName: (formData.get("first-name") as string).trim(),
        lastName: (formData.get("last-name") as string).trim(),
        email: (formData.get("email") as string).trim(),
        password: formData.get("password") as string,
    };

    const parsedData = signupSchema.safeParse(inputData);
    if (!parsedData.success) {
        const fieldErrors: Record<string, string> = {};
        parsedData.error.issues.forEach(issue => {
            const key = String(issue.path[0]);
            if (key) fieldErrors[key] = issue.message;
        });
        return { errors: fieldErrors };
    }

    const { firstName, lastName, email, password } = parsedData.data;
    const { data: codeData } = await adminSupabase
        .from("trainer_codes")
        .select("trainer_id")
        .eq("code", inviteCodeCookie.value)
        .single();

    if (!codeData?.trainer_id) {
        return { errors: { general: "Invalid session. Please verify your invite code again. Please wait, you will be redirected soon." } };
    }

    const { count } = await adminSupabase
        .from("users")
        .select("id", { count: "exact", head: true })
        .eq("email", email);

    if (count) {
        return { errors: { email: "Email is already in use" } };
    }

    const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                first_name: firstName,
                last_name: lastName,
                trainer_id: codeData.trainer_id,
                is_activated: true,
            },
        },
    });

    if (authError) {
        const msg = authError.message.includes("already registered")
            ? "Email is already in use"
            : authError.message;
        return { errors: { general: msg } };
    }

    cookieStore.delete("validated_invite_code");
    return { success: true };
}

export async function signout() {
    const supabase =await createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.log(error);
        redirect(routes.ERROR);
    }

    redirect(routes.LOGOUT);
}

export async function signInWithGoogle() {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo : `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
            queryParams: {
                access_type: "offline",
                prompt: "consent",
            },
        },
    });

    if (error) {
        console.log(error);
        redirect(routes.ERROR);
    }
    redirect(data.url);
}

export async function verifyInviteCode(
  code: string,
  opts: { returnTrainerId?: boolean } = {}
) {
  if (!code || code.trim().length < 1 || code.trim().length > 50) {
    return {
      success: false,
      error: "Invite code must be between 1 and 50 characters",
    };
  }

  const trimmedCode = code.trim();
  const rateLimitKey = `invite_code_${trimmedCode}`;
  if (!checkRateLimit(rateLimitKey, 5, 15 * 60 * 1000)) {
    return {
      success: false,
      error: "Too many attempts. Please try again in 15 minutes.",
    };
  }

    const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("trainer_codes")
    .select("code, trainer_id")
    .eq("code", trimmedCode)
    .single();

  if (error || !data) {
    return {
      success: false,
      error: "Invalid invite code. Please check and try again.",
    };
  }

  clearRateLimit(rateLimitKey);
  const cookieStore = await cookies();
  cookieStore.set("validated_invite_code", trimmedCode, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 10 * 60,
    path: "/",
  });

  if (opts.returnTrainerId) {
    return { success: true, trainerId: data.trainer_id ?? null };
  }

  return { success: true };
}

