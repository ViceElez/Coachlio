"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { verifyInviteCode } from "@/lib/auth-actions";
import { createClient } from "@/utils/supabase/client";
import { routes } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function ActivatePage() {
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleActivate = async (e?: React.FormEvent) => {
        e?.preventDefault();
        setError("");
        if (!code.trim()) {
            setError("Please enter a code");
            return;
        }

        setLoading(true);
        try {
            const res = await verifyInviteCode(code.trim(), { returnTrainerId: true });

            if (!res.success) {
                setError(res.error ?? "Invalid code");
                setLoading(false);
                return;
            }

            const { data: { user } } = await supabase.auth.getUser();
            await supabase.auth.updateUser({
                data: { is_activated: true, trainer_id: res.trainerId },
            });

            if (user?.id) {
                await supabase
                    .from("users")
                    .update({ is_activated: true, trainer_id: res.trainerId })
                    .eq("id", user.id);
            }

            router.push(routes.DASHBOARD);
        } catch (err) {
            console.error(err);
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-svh items-center">
            <Card className="mx-auto max-w-sm w-full">
                <CardHeader>
                    <CardTitle className="text-xl">Activate your account</CardTitle>
                    <CardDescription>Enter the trainer invite code to activate your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleActivate}>
                        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
                        <div className="grid gap-2">
                            <div className="grid gap-2">
                                <Label htmlFor="invite-code">Trainer code</Label>
                                <Input
                                    id="invite-code"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    placeholder="Enter code"
                                />
                            </div>

                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? "Activating..." : "Activate"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}