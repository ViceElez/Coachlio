"use client"
import {LayoutDashboard} from "lucide-react";
import {NavigationButtonsProps} from "@/constants/interface/NavigationButtonsProps";
import {usePathname} from "next/navigation";
import Link from "next/link";
import { routes as appRoutes } from "@/constants/routes";

export const NavigationButtons = ({text}:NavigationButtonsProps) =>{
    const pathname=usePathname()
    const routes: Record<string, string> = {
        Dashboard: appRoutes.DASHBOARD,
        BookSession: appRoutes.BOOK,
        Messages: appRoutes.MESSAGES,
        Progress: appRoutes.PROGRESS,
        Settings: appRoutes.SETTINGS,
    };

    const isActive = pathname === routes[text];
    return(
        <Link href={routes[text]} className="w-full md:w-auto">
            <button
                className={`w-full md:w-auto flex items-center gap-2 text-sm font-medium transition-colors py-2 md:py-0 cursor-pointer
                ${isActive
                    ? "text-emerald-600 font-semibold"
                    : "text-gray-500 hover:text-gray-800"
                }`}
            >
                <LayoutDashboard className="w-4 h-4 shrink-0" />
                {text}
            </button>
        </Link>
    )
}