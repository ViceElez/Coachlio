import {getProfile} from "@/lib/getProfile";
import {redirect} from "next/navigation";
import BookClient from "./BookClient";

export default async function BookPage() {
    const profile=await getProfile()

    if(!profile) return redirect("/login")

    return <>
        <BookClient profile={profile}/>
    </>
}