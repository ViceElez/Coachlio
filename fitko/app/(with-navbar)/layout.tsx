import {NavigationBar} from "@/app/navigation/NavigationBar";

export default function Layout({children}:{children: React.ReactNode}){
    return(
        <div>
            <NavigationBar/>
            {children}
        </div>
    )
}