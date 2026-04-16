"use client";

import type { TrainerClient } from "@/constants/interface/clientProfileAndSessions";
import {
	BadgeEuro,
	CalendarDays,
	CheckCircle2,
	ChevronRight,
	Clock,
	Dumbbell,
	XCircle,
} from "lucide-react";
import DescriptionEditor from "./DescriptionEditor";

function formatClientName(c: TrainerClient) {
	return `${c.first_name ?? ""} ${c.last_name ?? ""}`.trim() || c.email;
}

function summarizeNotes(c: TrainerClient) {
	const note = c.client_notes?.[0]?.note;
	if (!note) return "No description yet";
	return note.length > 140 ? `${note.slice(0, 140)}…` : note;
}

function formatSessionDate(startTime: string) {
	const d = new Date(startTime);
	return Number.isNaN(d.getTime())
		? startTime
		: d.toLocaleDateString(undefined, { year: "numeric", month: "2-digit", day: "2-digit" });
}

function formatSessionTime(t: string) {
	const d = new Date(t);
	return Number.isNaN(d.getTime())
		? t
		: d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}

function formatTimeRange(start: string, end: string) {
	const s = new Date(start);
	const e = new Date(end);
	if (Number.isNaN(s.getTime()) || Number.isNaN(e.getTime())) return null;
	return `${formatSessionTime(start)}–${formatSessionTime(end)}`;
}

function formatDurationMinutes(start: string, end: string) {
	const s = new Date(start);
	const e = new Date(end);
	if (Number.isNaN(s.getTime()) || Number.isNaN(e.getTime())) return null;
	const mins = Math.round((e.getTime() - s.getTime()) / 60000);
	if (!Number.isFinite(mins) || mins <= 0) return null;
	return `${mins} min`;
}

function formatPriceEUR(amount: number) {
	if (!Number.isFinite(amount)) return null;
	return new Intl.NumberFormat(undefined, { style: "currency", currency: "EUR" }).format(amount);
}

function BookingStatusBadge({ status }: { status: "reserved" | "paid" | "expired" | "cancelled" }) {
	const base = "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium border";
	switch (status) {
		case "paid":
			return (
				<span className={`${base} bg-emerald-50 text-emerald-700 border-emerald-200`}>
					<CheckCircle2 className="w-3.5 h-3.5" /> Paid
				</span>
			);
		case "reserved":
			return (
				<span className={`${base} bg-amber-50 text-amber-800 border-amber-200`}>
					Reserved
				</span>
			);
		case "cancelled":
			return (
				<span className={`${base} bg-rose-50 text-rose-700 border-rose-200`}>
					<XCircle className="w-3.5 h-3.5" /> Cancelled
				</span>
			);
		case "expired":
		default:
			return (
				<span className={`${base} bg-gray-50 text-gray-600 border-gray-200`}>Expired</span>
			);
	}
}

function SessionStatusBadge({ status }: { status: "scheduled" | "completed" }) {
	const base = "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium border";
	if (status === "completed") {
		return <span className={`${base} bg-slate-50 text-slate-700 border-slate-200`}>Completed</span>;
	}
	return <span className={`${base} bg-indigo-50 text-indigo-700 border-indigo-200`}>Scheduled</span>;
}

function summarizeSessionNote(note?: string) {
	if (!note) return null;
	const trimmed = note.trim();
	if (!trimmed) return null;
	return trimmed.length > 160 ? `${trimmed.slice(0, 160)}…` : trimmed;
}

export default function ClientInfo({
	clients,
	selectedClientId,
	onToggleClientAction,
}: {
	clients: TrainerClient[];
	selectedClientId: string | null;
	onToggleClientAction: (clientId: string) => void;
}) {
	const clientInfo = clients.map((c) => ({
		id: c.id,
		name: formatClientName(c),
		email: c.email,
		clientNote: c.client_notes?.[0] ?? null,
		descriptionSummary: summarizeNotes(c),
		pastSessions: c.past_sessions ?? [],
	}));

	return (
		<>
			<h2 className="text-lg font-semibold">Clients</h2>
			<p className="text-sm text-gray-600 mt-1">Click a client to view previous sessions</p>

			<div className="mt-5 space-y-3">
				{clientInfo.map((c) => {
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
								onClick={() => onToggleClientAction(c.id)}
								className="w-full flex items-start justify-between gap-4 p-5 text-left cursor-pointer"
							>
								<div className="min-w-0">
									<p className="text-base font-semibold text-gray-900 truncate">{c.name}</p>
									<p className="text-sm text-gray-600 mt-1">{c.descriptionSummary}</p>
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

									<div className="flex items-start justify-between gap-3 mb-4">
										<div className="min-w-0">
											<p className="text-sm font-semibold text-gray-900">Client description</p>
											<p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">
												{c.clientNote?.note?.trim() || "No description for this client yet."}
											</p>
										</div>

										<DescriptionEditor
											type="client"
											entityId={c.id}
											existingNote={c.clientNote ? { id: c.clientNote.id, note: c.clientNote.note } : null}
										/>
									</div>

									<div className="h-px bg-gray-100 mb-4" />
									<p className="text-sm font-semibold text-gray-900 mb-3">Previous sessions</p>
									<div className="space-y-3">
										{(c.pastSessions ?? []).length === 0 ? (
											<div className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-600">
												No past sessions for this client.
											</div>
										) : (
											(c.pastSessions ?? []).map((s) => {
												const timeRange = formatTimeRange(s.start_time, s.end_time);
												const duration = formatDurationMinutes(s.start_time, s.end_time);
												const price = formatPriceEUR(s.price);
												const notePreview = summarizeSessionNote(s.session_notes?.[0]?.note);
												const descriptionText = notePreview ?? "No description for this session yet.";

												return (
													<div
														key={s.booking_id}
														className="p-4 rounded-xl border border-gray-100 bg-white"
													>
														<div className="flex items-start justify-between gap-4">
															<div className="flex items-center gap-2 min-w-0">
																<Dumbbell className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
																<div className="min-w-0">
																	<p className="font-semibold text-gray-900 truncate">
																		{s.session_type ?? "Session"}
																	</p>
																	<div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 mt-1">
																		<span className="inline-flex items-center gap-1">
																			<CalendarDays className="w-3.5 h-3.5" />
																			{formatSessionDate(s.start_time)}
																		</span>
																		{timeRange && (
																			<span className="inline-flex items-center gap-1">
																				<Clock className="w-3.5 h-3.5" />
																				{timeRange}
																			</span>
																		)}
																		{duration && <span>{duration}</span>}
																		{price && (
																			<span className="inline-flex items-center gap-1">
																				<BadgeEuro className="w-3.5 h-3.5" />
																				{price}
																			</span>
																		)}
																	</div>
																</div>
															</div>

															<div className="flex flex-col items-end gap-2 shrink-0">
																<div className="flex items-center gap-2">
																	<BookingStatusBadge status={s.booking_status} />
																	<SessionStatusBadge status={s.status} />
																</div>
																<p className="text-[11px] text-gray-400">Booking #{s.booking_id}</p>
															</div>
														</div>

														<div className="mt-3 flex items-start justify-between gap-3">
															<p className="text-sm text-gray-600 whitespace-pre-wrap">
																<span className="font-medium text-gray-700">Description:</span> {descriptionText}
															</p>

															<DescriptionEditor
																type="session"
																entityId={s.session_id}
																clientId={c.id}
																existingNote={
																	s.session_notes?.[0]
																		? { id: s.session_notes[0].id, note: s.session_notes[0].note }
																		: null
																}
															/>
														</div>

														{s.session_notes?.length > 1 && (
															<p className="text-xs text-gray-500 mt-2">
																+{s.session_notes.length - 1} more note(s)
															</p>
														)}
													</div>
												);
											})
										)}
									</div>
								</div>
							)}
						</div>
					);
				})}
			</div>
		</>
	);
}



