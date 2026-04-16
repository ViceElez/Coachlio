"use client";

import type { ClientProfile } from "@/constants/interface/clientProfile";

export default function PersonalSettings({ profile }: { profile: ClientProfile }) {
	const personalSettings = [
		{
			label: "Name",
			value: `${profile.first_name ?? ""} ${profile.last_name ?? ""}`.trim(),
		},
		{
			label: "Email",
			value: profile.email,
		},
	];

	return (
		<>
			<h2 className="text-lg font-semibold">My settings</h2>
			<p className="text-sm text-gray-600 mt-1">Your coach profile info</p>

			<div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
				{personalSettings.map((item) => (
					<div key={item.label} className="border border-gray-100 rounded-xl p-4 bg-gray-50">
						<p className="text-xs text-gray-500">{item.label}</p>
						<p className="font-medium text-gray-900">{item.value}</p>
					</div>
				))}
			</div>
		</>
	);
}




