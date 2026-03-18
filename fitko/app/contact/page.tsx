import Link from "next/link";
import { routes } from "@/constants/routes";

export default function ContactPage() {
	return (
		<main className="min-h-screen bg-white">
			<div className="mx-auto max-w-3xl px-4 py-12">
				<h1 className="text-3xl font-bold tracking-tight text-gray-900">Contact Us</h1>
				<p className="mt-4 text-gray-600">
					Need help or have a question? Email us and we’ll get back to you.
				</p>

				<div className="mt-6 rounded-lg border bg-gray-50 p-5">
					<p className="text-sm text-gray-700">
						Support email:{" "}
						<a
							className="font-medium text-primary underline-offset-4 hover:underline"
							href="mailto:support@coachlio.net"
						>
							support@coachlio.net
						</a>
					</p>
				</div>

				<div className="mt-8 flex flex-wrap gap-4 text-sm">
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


