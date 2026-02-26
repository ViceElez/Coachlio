import {NavigationBar} from "@/app/navigation/NavigationBar";
import {Footer} from "@/app/footer/footer";

export default function Layout({children}:{children: React.ReactNode}){
    return(
        <div>
            <NavigationBar/>
            {children}
            <Footer/>
        </div>
    )
}