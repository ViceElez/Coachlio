import {getProfile, getUserRole} from "@/lib/getProfile";
import {redirect} from "next/navigation";
import BookClient from "./BookClient";
import {routes} from "@/constants/routes";
import {getAllUpcomingSessions, getClientSessions, getClientUpcomingSessions} from "@/lib/session";
import BookTrainer from "./BookTrainer";

export default async function BookPage() {
    const profile=await getProfile()
    if(!profile) return redirect(routes.LOGIN)

    const role = await getUserRole(profile.id);

    if(role !== "client") {
        const trainerSessions=await getAllUpcomingSessions(profile.id)
        return <BookTrainer profile={profile} availableSessions={trainerSessions??[]} />;
    }

    const clientSessions=await getClientSessions(profile?.trainer_id,profile?.id)

    return <>
        <BookClient profile={profile} availableSessions={clientSessions ?? []} />
    </>
}