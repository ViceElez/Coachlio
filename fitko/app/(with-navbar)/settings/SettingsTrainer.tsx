"use client";

import type React from "react";
import { useState } from "react";
import type { ClientProfile } from "@/constants/interface/clientProfile";
import type { TrainerClient } from "@/constants/interface/clientProfileAndSessions";
import { Users, UserRound, ChevronRight } from "lucide-react";
import ClientInfo from "./components/clientInfo";

function PersonalSettings({ profile }: { profile: ClientProfile }) {
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


export type TrainerSettingsProps = {
	profile: ClientProfile;
	clients: TrainerClient[];
};

const SettingsTrainer: React.FC<TrainerSettingsProps> = ({ profile, clients }) => {
	const [activeView, setActiveView] = useState<"my" | "clients">("clients");
	const [selectedClientId, setSelectedClientId] = useState<string | null>(null);



	return (
		<main className="max-w-4xl mx-auto p-6">
			<div className="flex items-start justify-between gap-4 mb-6">
				<div>
					<h1 className="text-xl font-semibold">Settings</h1>
					<p className="text-sm text-gray-600">Coach settings and client management</p>
				</div>
				<div className="text-xs text-gray-500 text-right">
					<div className="font-medium text-gray-700">
						{profile.first_name} {profile.last_name}
					</div>
					<div>{profile.email}</div>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-4">
				<aside className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden h-fit">
					<button
						type="button"
						onClick={() => {
							setActiveView("my");
							setSelectedClientId(null);
						}}
						className={`w-full px-4 py-3 flex items-center justify-between text-sm font-semibold transition cursor-pointer ${
							activeView === "my" ? "bg-emerald-50 text-emerald-800" : "bg-white text-gray-800 hover:bg-gray-50"
						}`}
					>
						<span className="flex items-center gap-2">
							<UserRound className="w-4 h-4" />
							My settings
						</span>
						<ChevronRight className="w-4 h-4 text-gray-400" />
					</button>
					<div className="h-px bg-gray-100" />
					<button
						type="button"
						onClick={() => setActiveView("clients")}
						className={`w-full px-4 py-3 flex items-center justify-between text-sm font-semibold transition cursor-pointer ${
							activeView === "clients" ? "bg-emerald-50 text-emerald-800" : "bg-white text-gray-800 hover:bg-gray-50"
						}`}
					>
						<span className="flex items-center gap-2">
							<Users className="w-4 h-4" />
							Clients
						</span>
						<ChevronRight className="w-4 h-4 text-gray-400" />
					</button>
				</aside>

				<section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
					{activeView === "my" ? (
						<PersonalSettings profile={profile} />
					) : (
						<ClientInfo
							clients={clients}
							selectedClientId={selectedClientId}
							onToggleClientAction={(clientId: string) =>
								setSelectedClientId((prev) => (prev === clientId ? null : clientId))
							}
						/>
					)}
				</section>
			</div>
		</main>
	);
};

export default SettingsTrainer;





