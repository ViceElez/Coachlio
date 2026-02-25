import HomeClient from "./HomeClient";
import {getProfile} from "@/lib/getProfile";
import {redirect} from "next/navigation";

export default async function HomePage() {
    const profile=await getProfile()
    if(!profile) redirect("/login")

    return <>
        <HomeClient profile={profile} />
    </>;
}