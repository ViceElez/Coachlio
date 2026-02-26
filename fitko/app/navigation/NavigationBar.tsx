import {NavigationButtons} from "@/app/navigation/NavigationButtons";
import LoginButton from "@/components/LoginLogoutButton";

export const NavigationBar = () =>
{
    return <nav className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
            </div>
            <div>
                <p className="font-bold text-gray-900 leading-tight">Fittonia</p>
            </div>
        </div>

        <div className="flex items-center gap-6">
            <NavigationButtons text={"Dashboard"}/>
            <NavigationButtons text={"BookSession"}/>
            <NavigationButtons text={"Messages"}/>
            <NavigationButtons text={"Progress"}/>
            <LoginButton/>
        </div>
    </nav>
}