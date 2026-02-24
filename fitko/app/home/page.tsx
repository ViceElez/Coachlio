"use client"

import LoginButton from "@/components/LoginLogoutButton";
import {useEffect, useState} from "react";
import {createClient} from "@/utils/supabase/client";
import {verifyInviteCode} from "@/lib/auth-actions";

type PublicUser = {
    trainer_id:string,
    email:string,
    first_name: string;
    last_name: string;
    is_activated:boolean
};

export default function HomePage(){
    const [user, setUser] = useState<PublicUser | null>(null);
    const [mounted, setMounted] = useState(false);
    const supabase = createClient();

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            const userId = session?.user.id ?? "";

            const { data } = await supabase
                .from("users")
                .select("trainer_id,email,first_name, last_name, is_activated")
                .eq("id", userId)
                .single();

            if (!data) {
                setMounted(true);
                return;
            }

            if (!data.is_activated) {
                const trainerCode = prompt("Your account is not activated. Please enter your trainer code to activate it:");
                if (trainerCode) {
                    const res = await verifyInviteCode(trainerCode.trim(),{returnTrainerId:true});
                    if (res.success) {
                        const trainerId = res ? res.trainerId : null;
                        await supabase.from("users").update({ is_activated: true, trainer_id:trainerId }).eq("id", userId);
                        data.is_activated = true;
                        alert("Account activated successfully! Please refresh the page.");
                    } else {
                        alert("Invalid trainer code. Please try again.");
                    }
                }
            }

            setUser(data);
            setMounted(true);
        };
        void fetchUser();
    }, []);

    if (!mounted) {
        return null;
    }

    return(
        <div>
            {
                user?.is_activated ? user.first_name : "Activate your account. Please refresh the page."
            }
            <LoginButton/>
        </div>
    )
}
//samo dodat da se uvati trainer id i da se stavi na usera kasd se priko gogole autha
