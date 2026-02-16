"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { loginSchema, signupSchema } from "@/lib/validators/userAuthValidation";

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

    redirect(data.url);
}
