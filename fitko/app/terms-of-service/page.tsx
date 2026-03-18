import Link from "next/link";
import { routes } from "@/constants/routes";

export const metadata = {
	title: "Terms of Service | Coachlio",
};

export default function TermsOfServicePage() {
	return (
		<main className="min-h-screen bg-white">
			<div className="mx-auto max-w-3xl px-4 py-12">
				<h1 className="text-3xl font-bold tracking-tight text-gray-900">Terms of Service</h1>
				<p className="mt-4 text-gray-600">Last updated: March 18, 2026</p>

				<section className="prose prose-gray mt-8 max-w-none">
					<p>
						These Terms of Service ("Terms") govern your access to and use of Coachlio (the "Service").
						By using the Service, you agree to these Terms.
					</p>

					<h2>Eligibility</h2>
					<p>
						You must be able to form a binding contract in your jurisdiction to use the Service.
					</p>

					<h2>Accounts</h2>
					<ul>
						<li>You are responsible for maintaining the confidentiality of your account credentials.</li>
						<li>You agree to provide accurate information and keep it up to date.</li>
					</ul>

					<h2>Acceptable use</h2>
					<p>You agree not to misuse the Service, including by:</p>
					<ul>
						<li>Attempting to access non-public areas or other users’ data without authorization.</li>
						<li>Interfering with the Service’s operation or security.</li>
						<li>Uploading or transmitting unlawful, harmful, or infringing content.</li>
					</ul>

					<h2>Third-party services</h2>
					<p>
						The Service may integrate with third-party services. Your use of those services may be
						governed by their own terms and policies.
					</p>

					<h2>Disclaimer</h2>
					<p>
						The Service is provided on an “as-is” and “as-available” basis. Coachlio disclaims all warranties
						to the maximum extent permitted by law.
					</p>

					<h2>Limitation of liability</h2>
					<p>
						To the maximum extent permitted by law, Coachlio will not be liable for any indirect, incidental,
						special, consequential, or punitive damages, or any loss of profits or revenues.
					</p>

					<h2>Changes</h2>
					<p>
						We may update these Terms from time to time. Continued use of the Service after changes become
						effective constitutes acceptance of the updated Terms.
					</p>

					<h2>Contact</h2>
					<p>
						Questions about these Terms? Contact us at{" "}
						<a href="mailto:support@coachlio.net">support@coachlio.net</a>.
					</p>
				</section>

				<div className="mt-10 flex flex-wrap gap-4 text-sm">
					<Link className="underline" href={routes.PRIVACY_POLICY}>
						Privacy Policy
					</Link>
					<Link className="underline" href={routes.CONTACT}>
						Contact Us
					</Link>
				</div>
			</div>
		</main>
	);
}


