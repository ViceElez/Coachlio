"use client";

import { ClientProfile } from "@/constants/interface/clientProfile";
import { useState } from "react";
import {
    Clock,
    Users,
    Calendar,
    Search,
} from "lucide-react";
import { SessionProps } from "@/constants/interface/SessionProps";
import { formatDate, formatTime, getDuration } from "@/lib/helper/getTime";
import {ConfirmToCheckout} from "./components/ConfirmToCheckout";

const SESSION_TYPE_FILTERS = ["All", "1on1", "group"];
const SORT_OPTIONS = ["Most Capacity", "Least Capacity", "Lowest Price", "Highest Price"];

export default function BookClient({ availableSessions }: { profile: ClientProfile, availableSessions: SessionProps[] }) {
    const [typeFilter, setTypeFilter] = useState("All");
    const [sortOption, setSortOption] = useState("Most Capacity");
    const [search, setSearch] = useState("");
    const [selectedSession, setSelectedSession] = useState<SessionProps | null>(null);

    const filtered = availableSessions
        .filter((s) => {
            const trainerName = s.trainer
                ? `${s.trainer.first_name} ${s.trainer.last_name}`
                : "";

            const matchesType =
                typeFilter === "All" || s.session_type === typeFilter;

            const matchesSearch =
                search === "" ||
                trainerName.toLowerCase().includes(search.toLowerCase());

            return matchesType && matchesSearch;
        })
        .sort((a, b) => {
            if (sortOption === "Most Capacity") return b.capacity_available - a.capacity_available;
            if (sortOption === "Least Capacity") return a.capacity_available - b.capacity_available;
            if (sortOption === "Lowest Price") return a.price - b.price;
            if (sortOption === "Highest Price") return b.price - a.price;
            return 0;
        });

    return (
        <div className="min-h-screen bg-gray-50">
            {selectedSession && (
                <ConfirmToCheckout
                    session={selectedSession}
                    onClose={() => setSelectedSession(null)}
                />
            )}
            <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Browse &amp; Book Sessions</h1>
                <p className="text-gray-500 text-sm sm:text-base mt-1 mb-4 sm:mb-6">Find the perfect training session that fits your schedule</p>

                <div className="bg-white border border-gray-200 rounded-2xl px-4 sm:px-6 py-4 sm:py-5 mb-6 sm:mb-8">
                    <div className="relative mb-4">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search trainers or session types..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {SESSION_TYPE_FILTERS.map((f) => (
                            <button
                                key={f}
                                onClick={() => setTypeFilter(f)}
                                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                                    typeFilter === f
                                        ? "bg-emerald-500 text-white border-emerald-500"
                                        : "bg-white text-gray-700 border-gray-200 hover:border-emerald-400"
                                }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                        <span className="text-sm text-gray-500">Sort by:</span>
                        {SORT_OPTIONS.map((option) => (
                            <button
                                key={option}
                                onClick={() => setSortOption(option)}
                                className={`px-3 py-2 rounded-full text-sm font-medium border transition-colors ${
                                    sortOption === option
                                        ? "bg-emerald-500 text-white border-emerald-500"
                                        : "bg-white text-gray-700 border-gray-200 hover:border-emerald-400"
                                }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {filtered.map((session) => {
                        const trainerName = session.trainer
                            ? `${session.trainer.first_name} ${session.trainer.last_name}`
                            : "Unknown Trainer";
                        const typeColor =
                            session.session_type === "1on1"
                                ? "bg-emerald-500 text-white"
                                : "bg-gray-100 text-gray-700";

                        return (
                            <div key={session.id} className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 flex flex-col gap-4">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="min-w-0">
                                        <h2 className="text-base sm:text-lg font-bold text-gray-900 truncate">{trainerName}</h2>
                                        <p className="text-sm text-gray-500 mt-0.5 capitalize">{session.session_type === "1on1" ? "1-on-1 Session" : "Group Session"}</p>
                                    </div>
                                    <span className={`text-xs font-semibold px-3 py-0.5 rounded-full capitalize shrink-0 ${typeColor}`}>
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
                                        {session.capacity_available} spots left
                                    </span>
                                </div>

                                <div className="border-t border-gray-100 pt-4 flex items-end justify-between gap-3">
                                    <div>
                                        <span className="text-2xl font-bold text-emerald-500">${session.price}</span>
                                        <p className="text-xs text-gray-400 mt-0.5">{getDuration(session.start_time, session.end_time)}</p>
                                    </div>
                                    <button
                                        onClick={() => setSelectedSession(session)}
                                        className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-5 py-3 rounded-xl transition-colors shrink-0"
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        );
                    })}

                    {filtered.length === 0 && (
                        <p className="col-span-full text-center text-gray-400 py-16">No sessions found.</p>
                    )}

                </div>
            </main>
        </div>
    );
}