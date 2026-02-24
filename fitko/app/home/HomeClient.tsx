"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import LoginButton from "@/components/LoginLogoutButton";
import { verifyInviteCode } from "@/lib/auth-actions";

type PublicUser = {
    trainer_id: string;
    email: string;
    first_name: string;
    last_name: string;
    is_activated: boolean;
};

export default function HomeClient({ userId }: { userId: string }) {
    const [user, setUser] = useState<PublicUser | null>(null);
    const [mounted, setMounted] = useState(false);
    const supabase = createClient();

    useEffect(() => {
        const fetchUser = async () => {
            const { data } = await supabase
                .from("users")
                .select("trainer_id,email,first_name,last_name,is_activated")
                .eq("id", userId)
                .single();

            if (!data) {
                setMounted(true);
                return;
            }

            if (!data.is_activated) {
                const trainerCode = prompt(
                    "Your account is not activated. Please enter your trainer code:"
                );

                if (trainerCode) {
                    const res = await verifyInviteCode(trainerCode.trim(), {
                        returnTrainerId: true,
                    });

                    if (res.success) {
                        await supabase
                            .from("users")
                            .update({
                                is_activated: true,
                                trainer_id: res.trainerId,
                            })
                            .eq("id", userId);

                        alert("Account activated! Refresh page.");
                    } else {
                        alert("Invalid trainer code.");
                    }
                }
            }

            setUser(data);
            setMounted(true);
        };

        void fetchUser();
    }, [userId]);

    if (!mounted) return null;

    return (
        <div>
            {user?.is_activated
                ? user.first_name
                : "Activate your account. Please refresh."}
            <LoginButton />
        </div>
    );
}