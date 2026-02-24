import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function BookPage() {
    const supabase = await createClient();

    const {data: { user }} = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    return <div>Book</div>;
}