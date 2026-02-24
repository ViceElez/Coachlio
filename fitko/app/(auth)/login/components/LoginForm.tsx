"use client";

import { useState } from "react";
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

export function LoginForm() {
    const [errors, setErrors] = useState<Record<string, string>>({});

    async function handleSubmit(formData: FormData) {
        setErrors({});
        try {
            const result = await login(formData);
            if (result?.errors) {
                setErrors(result.errors);
            }
        } catch (err) {
            console.error(err);
            setErrors({ general: "An unexpected error occurred. Please try again." });
        }
    }

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={handleSubmit}>
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
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <Link href="#" className="ml-auto inline-block text-sm underline">
                                    Forgot your password?
                                </Link>
                            </div>
                            <Input id="password" name="password" type="password" required />
                            {errors.password && (
                                <p className="text-red-500 text-sm">{errors.password}</p>
                            )}
                        </div>
                        <Button type="submit" className="w-full">
                            Login
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
