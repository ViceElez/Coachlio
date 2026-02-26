import Link from "next/link";
import { Instagram, Twitter, Youtube } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 px-8 py-10">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-lg">F</span>
                        </div>
                        <p className="font-bold text-gray-900 text-lg">Fittonia</p>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        Your personal fitness companion. Train smarter, recover better, and reach your goals.
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                        <a href="#" className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-emerald-50 hover:text-emerald-600 text-gray-500 transition-colors">
                            <Instagram className="w-4 h-4" />
                        </a>
                        <a href="#" className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-emerald-50 hover:text-emerald-600 text-gray-500 transition-colors">
                            <Twitter className="w-4 h-4" />
                        </a>
                        <a href="#" className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-emerald-50 hover:text-emerald-600 text-gray-500 transition-colors">
                            <Youtube className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                {/* Product */}
                <div className="flex flex-col gap-3">
                    <p className="font-semibold text-gray-900 text-sm">Product</p>
                    <ul className="flex flex-col gap-2">
                        {["Dashboard", "Book a Session", "Progress", "Messages"].map((item) => (
                            <li key={item}>
                                <Link href="#" className="text-sm text-gray-500 hover:text-emerald-600 transition-colors">
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Company */}
                <div className="flex flex-col gap-3">
                    <p className="font-semibold text-gray-900 text-sm">Company</p>
                    <ul className="flex flex-col gap-2">
                        {["About Us", "Careers", "Blog", "Press"].map((item) => (
                            <li key={item}>
                                <Link href="#" className="text-sm text-gray-500 hover:text-emerald-600 transition-colors">
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Support */}
                <div className="flex flex-col gap-3">
                    <p className="font-semibold text-gray-900 text-sm">Support</p>
                    <ul className="flex flex-col gap-2">
                        {["Help Center", "Contact Us", "Privacy Policy", "Terms of Service"].map((item) => (
                            <li key={item}>
                                <Link href="#" className="text-sm text-gray-500 hover:text-emerald-600 transition-colors">
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-2">
                <p className="text-xs text-gray-400">© {new Date().getFullYear()} Fittonia. All rights reserved.</p>
                <p className="text-xs text-gray-400">Made with <span className="text-emerald-500">♥</span> for a healthier you.</p>
            </div>
        </footer>
    );
};

