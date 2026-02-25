"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { verifyInviteCode } from "@/lib/auth-actions";
import { createClient } from "@/utils/supabase/client";

export default function ActivatePage() {
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const supabase = createClient();

    const handleActivate = async () => {
        const res = await verifyInviteCode(code.trim(), { returnTrainerId: true });

        if (!res.success) {
            setError(res.error ?? "Invalid code");
            return;
        }

        const { data: { user } } = await supabase.auth.getUser();
        await supabase.auth.updateUser({
            data: { is_activated: true, trainer_id: res.trainerId }
        });
        await supabase
            .from("users")
            .update({ is_activated: true, trainer_id: res.trainerId })
            .eq("id", user!.id);
        router.push("/home");
    };

    return (
        <div>
            <h1>Activate your account</h1>
            <input
                value={code}
                onChange={e => setCode(e.target.value)}
                placeholder="Trainer code"
            />
            {error && <p>{error}</p>}
            <button onClick={handleActivate}>Activate</button>
        </div>
    );
}