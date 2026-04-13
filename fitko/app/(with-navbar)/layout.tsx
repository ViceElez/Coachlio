import { NavigationBar } from "@/app/navigation/NavigationBar";
import {Footer} from "@/app/footer/footer";
import { getProfile, getUserCredits } from "@/lib/getProfile";

export default async function Layout({children}:{children: React.ReactNode}){
    const profile = await getProfile();
    const credits = profile?.id ? (await getUserCredits(profile.id)) ?? 0 : 0;
    return(
        <div>
            <NavigationBar credits={credits} />
            {children}
            <Footer/>
        </div>
    )
}