import Link from "next/link";
import { routes } from "@/constants/routes";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Help Center | Coachlio",
};

export default function HelpCenterPage() {
    return (
        <main className="min-h-screen bg-white">
            <div className="mx-auto max-w-3xl px-4 py-12">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Help Center</h1>
                <p className="mt-4 text-gray-600">
                    Welcome to the Coachlio Help Center. This page is a starting point for support resources.
                </p>

                <div className="mt-8 grid gap-4">
                    <section className="rounded-lg border p-5">
                        <h2 className="text-lg font-semibold text-gray-900">Common questions</h2>
                        <ul className="mt-3 list-disc pl-5 text-sm text-gray-700">
                            <li>How do I book a session?</li>
                            <li>How do I update my profile?</li>
                            <li>What should I do if I can’t log in?</li>
                        </ul>
                    </section>

                    <section className="rounded-lg border p-5 bg-gray-50">
                        <h2 className="text-lg font-semibold text-gray-900">Need more help?</h2>
                        <p className="mt-2 text-sm text-gray-700">
                            Email us at{" "}
                            <a
                                className="font-medium text-primary underline-offset-4 hover:underline"
                                href="mailto:support@coachlio.net"
                            >
                                support@coachlio.net
                            </a>
                            .
                        </p>
                    </section>
                </div>

                <div className="mt-10 flex flex-wrap gap-4 text-sm">
                    <Link className="underline" href={routes.CONTACT}>
                        Contact Us
                    </Link>
                    <Link className="underline" href={routes.PRIVACY_POLICY}>
                        Privacy Policy
                    </Link>
                    <Link className="underline" href={routes.TERMS_OF_SERVICE}>
                        Terms of Service
                    </Link>
                </div>
            </div>
        </main>
    );
}


