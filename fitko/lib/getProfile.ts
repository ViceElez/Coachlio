"use server"

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { routes } from "@/constants/routes";

export async function getProfile() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) redirect(routes.LOGIN);

    const { data: profile } = await supabase
        .from("users")
        .select("id,trainer_id, email, first_name, last_name, is_activated")
        .eq("id", user.id)
        .single();

    return profile;
}

export async function getUserRole(userId: string) {
    const supabase = await createClient();
    const { data: userPrivate, error } = await supabase
        .from('user_private')
        .select('role')
        .eq('id', userId)
        .single();

    if(error) {
        console.error('Error fetching user role:', error);
        return null;
    }

    return userPrivate?.role || null;

}

export async function getUserCredits(userId: string) {
    const supabase = await createClient();

    const { data:userPrivate,error } = await supabase
        .from("user_private")
        .select("credits")
        .eq("id", userId)
        .single();

    if(error) {
        console.error('Error fetching user credits:', error);
        return null;
    }

    return userPrivate?.credits || null;

}

