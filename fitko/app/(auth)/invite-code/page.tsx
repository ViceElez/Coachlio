"use client";

import { useState} from "react";
import { useRouter} from "next/navigation";
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
import { verifyInviteCode } from "@/lib/auth-actions";
import { routes } from "@/constants/routes";

export default function InviteCodePage() {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: any) {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const formData = new FormData(e.currentTarget);
            const code = formData.get("invite-code") as string;
            const result = await verifyInviteCode(code);

            if (result.success) {
                router.push(routes.SIGNUP);
            } else {
                setError(result.error || "Invalid invite code. Please try again.");
            }
        } catch (err) {
            console.error(err);
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex h-svh items-center">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Invite Code Required</CardTitle>
                    <CardDescription>
                        Please enter your invite code to continue
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="invite-code">Invite Code</Label>
                                <Input
                                    id="invite-code"
                                    name="invite-code"
                                    type="text"
                                    placeholder="Enter your invite code"
                                    required
                                    maxLength={50}
                                    disabled={isLoading}
                                />
                                {error && (
                                    <p className="text-red-500 text-sm">{error}</p>
                                )}
                            </div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Verifying..." : "Continue"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

