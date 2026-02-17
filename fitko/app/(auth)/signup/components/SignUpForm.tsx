"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signup } from "@/lib/auth-actions";
import SignInWithGoogleButton from "./SignInWithGoogleButton";

export function SignUpForm() {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [successMessage, setSuccessMessage] = useState("");
    const router = useRouter();

    async function handleSubmit(formData: FormData) {
        setErrors({});
        setSuccessMessage("");

        try {
            const result = await signup(formData);

            if (result.errors) {
                setErrors(result.errors);
                if (result.errors.general?.includes("Invalid session")) {
                    setTimeout(() => {
                        router.push("/invite-code?redirect_to=signup");
                    }, 2000);
                }
            } else if (result.success) {
                setSuccessMessage(
                    "Account created successfully! Please check your email to verify your account."
                );
            }
        } catch (err) {
            console.error(err);
            setErrors({ general: "An unexpected error occurred. Please try again." });
        }
    }

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-xl">Sign Up</CardTitle>
                <CardDescription>
                    Enter your information to create an account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={handleSubmit}>
                    {errors.general && (
                        <p className="text-red-500 text-center mb-2">{errors.general}</p>
                    )}
                    {successMessage && (
                        <p className="text-green-600 text-center mb-2">{successMessage}</p>
                    )}
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="first-name">First name</Label>
                                <Input
                                    name="first-name"
                                    id="first-name"
                                    placeholder="Max"
                                    required
                                />
                                {errors.firstName && (
                                    <p className="text-red-500 text-sm">{errors.firstName}</p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="last-name">Last name</Label>
                                <Input
                                    name="last-name"
                                    id="last-name"
                                    placeholder="Robinson"
                                    required
                                />
                                {errors.lastName && (
                                    <p className="text-red-500 text-sm">{errors.lastName}</p>
                                )}
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                name="email"
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">{errors.email}</p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input name="password" id="password" type="password" />
                            {errors.password && (
                                <p className="text-red-500 text-sm">{errors.password}</p>
                            )}
                        </div>
                        <Button type="submit" className="w-full">
                            Create an account
                        </Button>
                        <SignInWithGoogleButton />
                    </div>
                </form>
                <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="underline">
                        Sign in
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
