import {getProfile, getUserRole} from "@/lib/getProfile";
import {redirect} from "next/navigation";
import BookClient from "./BookClient";
import {routes} from "@/constants/routes";
import {getClientSessions} from "@/lib/session";
import BookTrainer from "./BookTrainer";

export default async function BookPage() {
    const profile=await getProfile()
    if(!profile) return redirect(routes.LOGIN)

    const role = await getUserRole(profile.id);

    if(role !== "client") {
        return <BookTrainer />;
    }

    const clientSessions=await getClientSessions(profile?.trainer_id)

    return <>
        <BookClient profile={profile} availableSessions={clientSessions ?? []} />
    </>
}

//na book client triba fetchat i koje je on vec bukirao da se ne prikazuju te sesije