import {getProfile} from "@/lib/getProfile";
import {redirect} from "next/navigation";
import BookClient from "./BookClient";
import {routes} from "@/constants/routes";
import {getClientSessions} from "@/lib/getSessions";

export default async function BookPage() {
    const profile=await getProfile()
    if(!profile) return redirect(routes.LOGIN)

    const clientSessions=await getClientSessions(profile?.trainer_id)
    console.log("Client Sessions:", clientSessions)

    return <>
        <BookClient profile={profile} availableSessions={clientSessions ?? []} />
    </>
}