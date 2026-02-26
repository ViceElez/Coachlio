"use client";
import React, { useEffect, useState } from "react";
import { LogIn, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { signout } from "@/lib/auth-actions";
import {routes} from "@/constants/routes";

const LoginButton = () => {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();
    const supabase = createClient();
    useEffect(() => {
        const fetchUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            setUser(user);
        };
        fetchUser();
    }, []);
    if (user) {
        return (
            <button
                onClick={() => { signout(); setUser(null); }}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-sm font-medium transition-colors"
            >
                <LogOut className="w-4 h-4" />
                Logout
            </button>
        );
    }
    return (
        <button
            onClick={() => router.push(routes.LOGIN)}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-sm font-medium transition-colors"
        >
            <LogIn className="w-4 h-4" />
            Login
        </button>
    );
};

export default LoginButton;