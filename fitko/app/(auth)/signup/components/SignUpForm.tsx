"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
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
import { routes } from "@/constants/routes";

function SignUpSubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Creating account..." : "Create an account"}
        </Button>
    );
}

export function SignUpForm() {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [successMessage, setSuccessMessage] = useState("");
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const router = useRouter();

    async function handleSubmit(formData: FormData) {
        setErrors({});
        setSuccessMessage("");

        try {
            const result = await signup(formData);

            if (result.errors) {
                setErrors(result.errors);
                setValues((prev) => ({
                    firstName: result.errors.firstName ? "" : prev.firstName,
                    lastName: result.errors.lastName ? "" : prev.lastName,
                    email: result.errors.email ? "" : prev.email,
                    password: result.errors.password ? "" : prev.password,
                }));

                if (result.errors.general?.includes("Invalid session")) {
                    setTimeout(() => {
                        router.push("/invite-code?redirect_to=signup");
                    }, 2000);
                }
            } else if (result.success) {
                setSuccessMessage(
                    "Account created successfully! Please check your email to verify your account."
                );
                setValues({ firstName: "", lastName: "", email: "", password: "" });
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
                                    value={values.firstName}
                                    onChange={(e) =>
                                        setValues((p) => ({ ...p, firstName: e.target.value }))
                                    }
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
                                    value={values.lastName}
                                    onChange={(e) =>
                                        setValues((p) => ({ ...p, lastName: e.target.value }))
                                    }
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
                                value={values.email}
                                onChange={(e) =>
                                    setValues((p) => ({ ...p, email: e.target.value }))
                                }
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">{errors.email}</p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                name="password"
                                id="password"
                                type="password"
                                value={values.password}
                                onChange={(e) =>
                                    setValues((p) => ({ ...p, password: e.target.value }))
                                }
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm">{errors.password}</p>
                            )}
                        </div>
                        <SignUpSubmitButton />
                    </div>
                </form>
                <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link href={routes.LOGIN} className="underline">
                        Sign in
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
