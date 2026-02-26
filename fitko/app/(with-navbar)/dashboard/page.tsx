import HomeClient from "./HomeClient";
import {getProfile} from "@/lib/getProfile";
import {redirect} from "next/navigation";
import {routes} from "@/constants/routes";

export default async function HomePage() {
    const profile=await getProfile()
    if(!profile) redirect(routes.LOGIN)

    return <>
        <HomeClient profile={profile} />
    </>;
}