"use client";

import { useState } from "react";
import type { ClientProfile } from "@/constants/interface/clientProfile";
import { Users, UserRound, ChevronRight, CalendarDays, Dumbbell } from "lucide-react";

type TrainerSettingsProps = {
	profile: ClientProfile;
};

type ClientItem = {
	id: string;
	name: string;
	email: string;
	description: string;
};

type TrainingItem = {
	id: string;
	date: string;
	title: string;
	notes?: string;
};

const SAMPLE_CLIENTS: ClientItem[] = [
	{
		id: "c1",
		name: "Alex Johnson",
		email: "alex.johnson@example.com",
		description: "Goal: build strength and stay consistent. Prefers 1-on-1 sessions.",
	},
	{
		id: "c2",
		name: "Maya Singh",
		email: "maya.singh@example.com",
		description: "Goal: fat loss + mobility. Loves short workouts and clear weekly targets.",
	},
	{
		id: "c3",
		name: "Luca Rossi",
		email: "luca.rossi@example.com",
		description: "Goal: hypertrophy. Tracking progressive overload and nutrition basics.",
	},
];

const SAMPLE_TRAININGS: Record<string, TrainingItem[]> = {
	c1: [
		{
			id: "t1",
			date: "2026-04-02",
			title: "Upper Body Strength",
			notes: "Bench press 5x5, rows 4x10, accessory work. Progress: +2.5kg bench.",
		},
		{
			id: "t2",
			date: "2026-03-26",
			title: "Conditioning + Core",
			notes: "Intervals: 10x1min. Core circuit 3 rounds.",
		},
	],
	c2: [
		{
			id: "t3",
			date: "2026-04-07",
			title: "Lower Body Power",
			notes: "Squats 4x6, RDL 4x8. Focus on depth + tempo.",
		},
	],
	c3: [
		{
			id: "t4",
			date: "2026-04-10",
			title: "Full Body Hypertrophy",
			notes: "Supersets: push/pull. Finished with 15-min incline walk.",
		},
		{
			id: "t5",
			date: "2026-03-30",
			title: "Mobility + Technique",
			notes: "Hip mobility + deadlift technique. Reduced load, improved bracing.",
		},
	],
};

export default function SettingsTrainer({ profile }: TrainerSettingsProps) {
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
				{/* Left nav */}
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

				{/* Right content */}
				<section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
					{activeView === "my" ? (
						<>
							<h2 className="text-lg font-semibold">My settings</h2>
							<p className="text-sm text-gray-600 mt-1">Your coach profile info</p>

							<div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div className="border border-gray-100 rounded-xl p-4 bg-gray-50">
									<p className="text-xs text-gray-500">Name</p>
									<p className="font-medium text-gray-900">
										{profile.first_name} {profile.last_name}
									</p>
								</div>
								<div className="border border-gray-100 rounded-xl p-4 bg-gray-50">
									<p className="text-xs text-gray-500">Email</p>
									<p className="font-medium text-gray-900">{profile.email}</p>
								</div>
							</div>

							<p className="text-xs text-gray-500 mt-4">
								(Sample UI) Later we can add edit forms here.
							</p>
						</>
					) : (
						<>
							<h2 className="text-lg font-semibold">Clients</h2>
							<p className="text-sm text-gray-600 mt-1">
								Click a client to view previous sessions (sample data)
							</p>

							<div className="mt-5 space-y-3">
								{SAMPLE_CLIENTS.map((c) => {
									const isSelected = c.id === selectedClientId;
									return (
										<div
											key={c.id}
											className={`rounded-2xl border transition ${
												isSelected
													? "border-emerald-200 bg-emerald-50/40"
													: "border-gray-100 hover:border-gray-200"
											}`}
										>
											<button
												type="button"
												onClick={() => setSelectedClientId((prev) => (prev === c.id ? null : c.id))}
												className="w-full flex items-start justify-between gap-4 p-5 text-left cursor-pointer"
											>
												<div className="min-w-0">
													<p className="text-base font-semibold text-gray-900 truncate">{c.name}</p>
													<p className="text-sm text-gray-600 mt-1">{c.description}</p>
													<p className="text-xs text-gray-500 mt-2">{c.email}</p>
												</div>
												<ChevronRight
													className={`w-5 h-5 text-gray-400 shrink-0 mt-1 transition ${
														isSelected ? "rotate-90 text-emerald-600" : ""
													}`}
												/>
											</button>

										{isSelected && (
											<div className="px-5 pb-5">
												<div className="h-px bg-gray-100 mb-4" />
												<p className="text-sm font-semibold text-gray-900 mb-3">Previous sessions</p>
												<div className="space-y-3">
													{(SAMPLE_TRAININGS[c.id] ?? []).length === 0 ? (
														<div className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-600">
															No past sessions for this client (sample).
														</div>
													) : (
														(SAMPLE_TRAININGS[c.id] ?? []).map((t) => (
															<div key={t.id} className="p-4 rounded-xl border border-gray-100">
																<div className="flex items-center justify-between gap-4">
																	<div className="flex items-center gap-2 min-w-0">
																		<Dumbbell className="w-4 h-4 text-emerald-600 shrink-0" />
																		<p className="font-semibold text-gray-900 truncate">{t.title}</p>
																	</div>
																	<div className="flex items-center gap-2 text-xs text-gray-500 shrink-0">
																		<CalendarDays className="w-4 h-4" />
																		{t.date}
																	</div>
																</div>
																{t.notes && (
																	<p className="text-sm text-gray-600 mt-2">{t.notes}</p>
																)}
															</div>
														))
													)}
												</div>

												<p className="text-xs text-gray-500 mt-4">
													(Sample UI) Later we can load real clients + session history from Supabase.
												</p>
											</div>
										)}
									</div>
									);
								})}
							</div>
						</>
					)}
				</section>
			</div>
		</main>
	);
}





