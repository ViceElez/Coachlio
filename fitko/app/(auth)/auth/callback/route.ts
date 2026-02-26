import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import {routes} from "@/constants/routes";

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");
    if (code) {
        const supabase = await createClient();
        await supabase.auth.exchangeCodeForSession(code);
    }

    return NextResponse.redirect(new URL(routes.DASHBOARD, request.url));
}