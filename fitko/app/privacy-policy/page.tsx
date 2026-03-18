import Link from "next/link";
import { routes } from "@/constants/routes";

export const metadata = {
	title: "Privacy Policy | Coachlio",
};

export default function PrivacyPolicyPage() {
	return (
		<main className="min-h-screen bg-white">
			<div className="mx-auto max-w-3xl px-4 py-12">
				<h1 className="text-3xl font-bold tracking-tight text-gray-900">Privacy Policy</h1>
				<p className="mt-4 text-gray-600">Last updated: March 18, 2026</p>

				<section className="prose prose-gray mt-8 max-w-none">
					<p>
						This Privacy Policy explains how Coachlio ("Coachlio", "we", "us") collects, uses,
						and shares information when you use our website and services (the "Service").
					</p>

					<h2>Information we collect</h2>
					<ul>
						<li>
							<strong>Account information</strong> (e.g., name, email) when you sign up.
						</li>
						<li>
							<strong>Usage data</strong> (e.g., pages visited, device/browser info) to help improve the Service.
						</li>
						<li>
							<strong>Messages/support requests</strong> when you contact us.
						</li>
					</ul>

					<h2>How we use information</h2>
					<ul>
						<li>Provide and maintain the Service.</li>
						<li>Authenticate users and secure accounts.</li>
						<li>Improve features, reliability, and user experience.</li>
						<li>Respond to support inquiries.</li>
					</ul>

					<h2>Sharing</h2>
					<p>
						We may share information with service providers (e.g., hosting, analytics, authentication)
						solely to operate the Service, and when required by law.
					</p>

					<h2>Data retention</h2>
					<p>
						We keep personal information only as long as necessary to provide the Service and for
						legitimate business or legal purposes.
					</p>

					<h2>Your choices</h2>
					<p>
						You may update or delete certain account information through your account settings, or
						request help by contacting us.
					</p>

					<h2>Contact</h2>
					<p>
						If you have questions about this Privacy Policy, contact us at{" "}
						<a href="mailto:support@coachlio.net">support@coachlio.net</a>.
					</p>
				</section>

				<div className="mt-10 text-sm">
					<Link className="underline" href={routes.CONTACT}>
						Contact Us
					</Link>
				</div>
			</div>
		</main>
	);
}


