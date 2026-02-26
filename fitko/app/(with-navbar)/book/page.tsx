import {getProfile} from "@/lib/getProfile";
import {redirect} from "next/navigation";
import BookClient from "./BookClient";
import {routes} from "@/constants/routes";

export default async function BookPage() {
    const profile=await getProfile()

    if(!profile) return redirect(routes.LOGIN)

    return <>
        <BookClient profile={profile}/>
    </>
}