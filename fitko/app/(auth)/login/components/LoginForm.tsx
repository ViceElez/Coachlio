"use client";

import { useActionState } from "react";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login } from "@/lib/auth-actions"
import SignInWithGoogleButton from "@/app/(auth)/signup/components/SignInWithGoogleButton";
import {routes} from "@/constants/routes";

type LoginActionState = {
    errors?: Record<string, string>;
};

export function LoginForm() {
    const [state, formAction, isPending] = useActionState<LoginActionState, FormData>(
        async (_prevState, formData) => {
            try {
                const result = await login(formData);
                return result ?? {};
            } catch (err) {
                const digest = (err as any)?.digest;
                if (typeof digest === "string" && digest.startsWith("NEXT_REDIRECT")) throw err;
                return { errors: { general: "An unexpected error occurred. Please try again." } };
            }
        },
        { errors: {} }
    );

    const errors = state?.errors ?? {};

    return (
        <Card className="mx-auto w-[85%] sm:w-full max-w-sm sm:max-w-md lg:max-w-lg">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={formAction}>
                    {errors.general && (
                        <p className="text-red-500 text-center mb-2">{errors.general}</p>
                    )}
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">{errors.email}</p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center justify-between gap-3 w-full">
                                <Label htmlFor="password">Password</Label>
                                <Link href={routes.RESETPASSWORD} className="inline-block text-sm underline whitespace-nowrap">
                                    Forgot your password?
                                </Link>
                            </div>
                            <Input id="password" name="password" type="password" required />
                            {errors.password && (
                                <p className="text-red-500 text-sm">{errors.password}</p>
                            )}
                        </div>
                        <Button type="submit" className="w-full" disabled={isPending}>
                            {isPending ? "Logging in..." : "Login"}
                        </Button>
                    </div>
                </form>
                <SignInWithGoogleButton/>
                <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="/invite-code?redirect_to=signup" className="underline">
                        Sign up
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
