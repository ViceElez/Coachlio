"use client";

import { NavigationButtons } from "@/app/navigation/NavigationButtons";
import LoginButton from "@/components/LoginLogoutButton";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export const NavigationBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 relative">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shrink-0">
                        <span className="text-white font-bold text-lg">F</span>
                    </div>
                    <p className="font-bold text-gray-900 leading-tight">Coachlio</p>
                </div>

                <div className="hidden md:flex items-center gap-6">
                    <NavigationButtons text={"Dashboard"} />
                    <NavigationButtons text={"BookSession"} />
                    <NavigationButtons text={"Messages"} />
                    <NavigationButtons text={"Progress"} />
                    <LoginButton />
                </div>

                <button
                    className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                    onClick={() => setMenuOpen((prev) => !prev)}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {menuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50 flex flex-col px-4 py-3 gap-1">
                    <div onClick={() => setMenuOpen(false)}>
                        <NavigationButtons text={"Dashboard"} />
                    </div>
                    <div onClick={() => setMenuOpen(false)}>
                        <NavigationButtons text={"BookSession"} />
                    </div>
                    <div onClick={() => setMenuOpen(false)}>
                        <NavigationButtons text={"Messages"} />
                    </div>
                    <div onClick={() => setMenuOpen(false)}>
                        <NavigationButtons text={"Progress"} />
                    </div>
                    <div className="pt-2 border-t border-gray-100 mt-1">
                        <LoginButton />
                    </div>
                </div>
            )}
        </nav>
    );
};
