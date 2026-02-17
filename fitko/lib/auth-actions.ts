"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { loginSchema, signupSchema } from "@/lib/validators/userAuthValidation";

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
        const errors = parsedData.error.issues;
        console.log("Login validation errors:", errors);
        redirect("/error");
    }

    const { error } = await supabase.auth.signInWithPassword(parsedData.data);

    if (error) {
        console.log("Login error:", error.message);
        redirect("/error");
    }

    revalidatePath("/", "layout");
    redirect("/");
}

export async function signup(formData: FormData) {
    const supabase = await createClient();

    const cookieStore = await cookies();
    const inviteCodeCookie = cookieStore.get("validated_invite_code");

    if (!inviteCodeCookie) {
        return {
            errors: {
                general: "Invalid session. Please verify your invite code again."
            }
        };
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
            if (key) {
                fieldErrors[key] = issue.message;
            }
        });

        return { errors: fieldErrors };
    }

    const { firstName, lastName, email, password } = parsedData.data;

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: `${firstName} ${lastName}` } },
    });

    if (error) {
        return { errors: { general: error.message } };
    }

    await supabase.from("users").insert({
        email,
        first_name: firstName,
        last_name: lastName,
    })
    cookieStore.delete("validated_invite_code");
    return { success: true };
}

export async function signout() {
    const supabase =await createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.log(error);
        redirect("/error");
    }

    redirect("/logout");
}

export async function signInWithGoogle() {
    const supabase = await createClient();

    const cookieStore = await cookies();
    const inviteCodeCookie = cookieStore.get("validated_invite_code");

    if (!inviteCodeCookie) {
        redirect("/invite-code?redirect_to=google-oauth");
    }

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            queryParams: {
                access_type: "offline",
                prompt: "consent",
            },
        },
    });

    if (error) {
        console.log(error);
        redirect("/error");
    }
    cookieStore.delete("validated_invite_code");
    redirect(data.url);
}

export async function verifyInviteCode(code: string) {
    if (!code || code.trim().length < 1 || code.trim().length > 50) {
        return {
            success: false,
            error: "Invite code must be between 1 and 50 characters"
        };
    }

    const trimmedCode = code.trim();
    const rateLimitKey = `invite_code_${trimmedCode}`;
    if (!checkRateLimit(rateLimitKey, 5, 15 * 60 * 1000)) {
        return {
            success: false,
            error: "Too many attempts. Please try again in 15 minutes."
        };
    }

    const supabase = await createClient();

    const { data, error } = await supabase
        .from("users")
        .select("invite_code")
        .eq("invite_code", trimmedCode)
        .single();

    if (error || !data) {
        return {
            success: false,
            error: "Invalid invite code. Please check and try again."
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
    return { success: true };
}

