"use client"

import LoginButton from "@/components/LoginLogoutButton";
import {useEffect, useState} from "react";
import {createClient} from "@/utils/supabase/client";

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
            const { data } = await supabase
                .from("users")
                .select("trainer_id,email,first_name, last_name, is_activated")
                .eq("id", (await supabase.auth.getSession()).data.session?.user.id ?? "")
                .single();
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
                user?.is_activated ? user.first_name:"not activated"
            }
            <LoginButton/>
        </div>
    )
}