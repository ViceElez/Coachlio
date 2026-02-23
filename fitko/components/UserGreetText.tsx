"use client";
import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";

type PublicUser = {
    first_name: string;
    last_name: string;
};

const UserGreetText = () => {
    const [user, setUser] = useState<PublicUser | null>(null);
    const [mounted, setMounted] = useState(false);
    const supabase = createClient();

    useEffect(() => {
        const fetchUser = async () => {
            const { data } = await supabase
                .from("users")
                .select("first_name, last_name")
                .eq("id", (await supabase.auth.getSession()).data.session?.user.id ?? "")
                .single();
            setUser(data);
            setMounted(true);
        };
        fetchUser();
    }, []);

    if (!mounted) {
        return null;
    }

    if (user !== null) {
        return (
            <p
                className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8
        backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
            >
                hello&nbsp;
                <code className="font-mono font-bold">{`${user.first_name} ${user.last_name}`}!</code>
            </p>
        );
    }

    return (
        <p
            className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl
    dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
        >
            Please login to see your name here!&nbsp;
        </p>
    );
};

export default UserGreetText;
