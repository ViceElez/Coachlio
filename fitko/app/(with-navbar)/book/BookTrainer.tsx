"use client";

import { ClientProfile } from "@/constants/interface/clientProfile";
import { SessionProps } from "@/constants/interface/SessionProps";
import { formatDate, formatTime, getDuration } from "@/lib/helper/getTime";
import { Calendar, Clock, Pencil, Plus, Trash2, Users } from "lucide-react";
import { useEffect, useState } from "react";
import CreateSession from "./components/CreateSession";

export default function BookTrainer({ profile,availableSessions }: { profile: ClientProfile,availableSessions:SessionProps[] }) {

    const [createOpen, setCreateOpen] = useState(false);

    useEffect(() => {
        if (!createOpen) return;

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setCreateOpen(false);
        };
        window.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [createOpen]);

    const upcomingSessions = [...availableSessions]
        .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime());

    const trainerName = [profile?.first_name, profile?.last_name].filter(Boolean).join(" ");

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Your Sessions</h1>
                        <p className="text-gray-500 text-sm sm:text-base mt-1">
                            Manage your upcoming sessions{trainerName ? `, ${trainerName}` : ""}.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            setCreateOpen(true);
                        }}
                        className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-5 py-3 rounded-xl transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Create a session
                    </button>
                </div>

                {createOpen && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        role="dialog"
                        aria-modal="true"
                    >
                        <button
                            type="button"
                            className="absolute inset-0 bg-black/40"
                            aria-label="Close create session modal"
                            onClick={() => setCreateOpen(false)}
                        />

                        <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl">
                            <CreateSession profile={profile} onClose={() => setCreateOpen(false)} />
                        </div>
                    </div>
                )}

                <section className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6">
                    <div className="flex items-center justify-between gap-4 mb-4">
                        <h2 className="text-base sm:text-lg font-semibold text-gray-900">Upcoming sessions</h2>
                        <span className="text-xs sm:text-sm text-gray-500">{upcomingSessions.length} total</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {upcomingSessions.map((session) => {
                            const typeColor =
                                session.session_type === "1on1"
                                    ? "bg-emerald-500 text-white"
                                    : "bg-gray-100 text-gray-700";

                            return (
                                <div
                                    key={session.id}
                                    className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 flex flex-col gap-4"
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="min-w-0">
                                            <h3 className="text-base font-bold text-gray-900 truncate">
                                                {session.session_type === "1on1" ? "1-on-1 Session" : "Group Session"}
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-0.5 truncate">
                                                {getDuration(session.start_time, session.end_time)}
                                            </p>
                                        </div>
                                        <span
                                            className={`text-xs font-semibold px-3 py-0.5 rounded-full capitalize shrink-0 ${typeColor}`}
                                        >
                                            {session.session_type === "1on1" ? "1-on-1" : "Group"}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600">
                                        <span className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                                            <span className="truncate">{formatDate(session.start_time)}</span>
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                                            <span className="truncate">{formatTime(session.start_time)}</span>
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <Users className="w-4 h-4 text-gray-400 shrink-0" />
                                            <span className="truncate">{session.capacity_available} spots left</span>
                                        </span>
                                        <span className="flex items-center justify-end">
                                            <span className="text-emerald-600 font-semibold">${session.price}</span>
                                        </span>
                                    </div>

                                    <div className="border-t border-gray-100 pt-4 flex items-center justify-end gap-2">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                // TODO: wire up edit session flow
                                                console.log("edit-session:placeholder", session.id);
                                            }}
                                            className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                                        >
                                            <Pencil className="w-4 h-4" />
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                // TODO: wire up delete session flow
                                                console.log("delete-session:placeholder", session.id);
                                            }}
                                            className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            );
                        })}

                        {upcomingSessions.length === 0 && (
                            <p className="col-span-full text-center text-gray-400 py-10">No upcoming sessions.</p>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}