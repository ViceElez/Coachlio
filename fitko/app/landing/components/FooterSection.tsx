import { Dumbbell } from "lucide-react";

interface FooterLink {
    label: string;
    href: string;
}

interface FooterColumn {
    heading: string;
    links: FooterLink[];
}

interface FooterSectionProps {
    brandName: string;
    brandTagline: string;
    columns: FooterColumn[];
    copyright: string;
    legalLinks: FooterLink[];
}

export const FooterSection = ({
    brandName,
    brandTagline,
    columns,
    copyright,
    legalLinks,
}: FooterSectionProps) => {
    return (
        <footer className="bg-gray-900 text-gray-400 py-8 md:py-12 px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8">
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-2 mb-3 md:mb-4">
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                                <Dumbbell className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-base md:text-lg font-semibold text-white">{brandName}</span>
                        </div>
                        <p className="text-xs md:text-sm mb-3 md:mb-4">{brandTagline}</p>
                    </div>

                    {columns.map((col) => (
                        <div key={col.heading}>
                            <h4 className="text-sm md:text-base font-semibold text-white mb-2 md:mb-3">{col.heading}</h4>
                            <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
                                {col.links.map((link) => (
                                    <li key={link.label}>
                                        <a href={link.href} className="hover:text-white transition-colors">
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t border-gray-800 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
                    <p className="text-xs md:text-sm text-center md:text-left">{copyright}</p>
                    <div className="flex gap-4 md:gap-6 text-xs md:text-sm">
                        {legalLinks.map((link) => (
                            <a key={link.label} href={link.href} className="hover:text-white transition-colors">
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

