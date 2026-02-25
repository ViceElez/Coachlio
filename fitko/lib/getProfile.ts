import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function getProfile() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) redirect("/login");

    const { data: profile } = await supabase
        .from("users")
        .select("trainer_id, email, first_name, last_name, is_activated")
        .eq("id", user.id)
        .single();

    return profile;
}