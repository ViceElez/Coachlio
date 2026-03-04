import { Instagram, Twitter, Youtube } from "lucide-react";
import { FooterColumn } from "@/app/footer/components/FooterColumn";
import {routes} from "@/constants/routes";
export const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 px-4 sm:px-8 py-8 sm:py-10 w-full overflow-x-hidden">
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

                <div className="flex flex-col gap-3 items-center text-center md:items-start md:text-left sm:col-span-2 md:col-span-1">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shrink-0">
                            <span className="text-white font-bold text-lg">F</span>
                        </div>
                        <p className="font-bold text-gray-900 text-lg">Fittonia</p>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                        Your personal fitness companion. Train smarter, recover better, and reach your goals.
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                        <a href="#" className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-emerald-50 hover:text-emerald-600 text-gray-500 transition-colors">
                            <Instagram className="w-4 h-4" />
                        </a>
                        <a href="#" className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-emerald-50 hover:text-emerald-600 text-gray-500 transition-colors">
                            <Twitter className="w-4 h-4" />
                        </a>
                        <a href="#" className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-emerald-50 hover:text-emerald-600 text-gray-500 transition-colors">
                            <Youtube className="w-4 h-4" />
                        </a>
                    </div>
                </div>
                <FooterColumn
                    title="Product"
                    links={[
                        { label: "Dashboard", href: routes.DASHBOARD },
                        { label: "Book a Session", href: routes.BOOK },
                        { label: "Progress", href: routes.PROGRESS },
                        { label: "Messages", href: routes.MESSAGES },
                    ]}
                />

                <FooterColumn
                    title="Company"
                    links={[
                        { label: "About Us", href: "/about" },
                        { label: "Careers", href: "/careers" },
                        { label: "Blog", href: "/blog" },
                        { label: "Press", href: "/press" },
                    ]}
                />

                <FooterColumn
                    title="Support"
                    links={[
                        { label: "Help Center", href: routes.HELP },
                        { label: "Contact Us", href: routes.CONTACT },
                        { label: "Privacy Policy", href: routes.PRIVACY},
                        { label: "Terms of Service", href: routes.TERMS },
                    ]}
                />
            </div>

            <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left">
                <p className="text-xs text-gray-400">© {new Date().getFullYear()} Fittonia. All rights reserved.</p>
                <p className="text-xs text-gray-400">Made with <span className="text-emerald-500">♥</span> for a healthier you.</p>
            </div>
        </footer>
    );
};

