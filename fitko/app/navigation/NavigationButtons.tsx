"use client"
import {LayoutDashboard} from "lucide-react";
import {NavigationButtonsProps} from "@/constants/interface/NavigationButtonsProps";
import {usePathname} from "next/navigation";
import Link from "next/link";

export const NavigationButtons = ({text}:NavigationButtonsProps) =>{
    const pathname=usePathname()
    const routes: Record<string, string> = {
        Dashboard: "/dashboard",
        BookSession: "/book",
        Messages: "/messages",
        Progress: "/progress",
    };

    const isActive = pathname === routes[text];
    return(
        <Link href={routes[text]}>
            <button
                className={`flex items-center gap-2 text-sm font-medium transition-colors
                ${isActive
                    ? "text-emerald-600 font-semibold"
                    : "text-gray-500 hover:text-gray-800"
                }`}
            >
                <LayoutDashboard className="w-4 h-4" />
                {text}
            </button>
        </Link>
    )
}