import Link from "next/link";

export function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
    return (
        <div className="flex flex-col gap-3 items-center text-center md:items-start md:text-left">
            <p className="font-semibold text-gray-900 text-sm">{title}</p>
            <ul className="flex flex-col gap-1">
                {links.map((link) => (
                    <li key={link.label}>
                        <Link href={link.href} className="inline-block py-1.5 text-sm text-gray-500 hover:text-emerald-600 transition-colors">
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}