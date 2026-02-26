"use client";

import { ClientProfile } from "@/constants/interface/clientProfile";
import { useState } from "react";
import {
    MapPin,
    Clock,
    Users,
    Calendar,
    Video,
    Search,
} from "lucide-react";

const SESSIONS = [
    {
        id: 1,
        title: "Personal Training",
        coach: "Coach Sarah Johnson",
        date: "Feb 5, 2026",
        time: "09:00 AM",
        location: "Studio A",
        spots: "1 spot",
        price: 80,
        duration: "60 min",
        tag: "Personal",
        tagColor: "bg-emerald-500 text-white",
        online: false,
    },
    {
        id: 2,
        title: "HIIT Class",
        coach: "Coach Mike Chen",
        date: "Feb 5, 2026",
        time: "10:30 AM",
        location: "Main Gym",
        spots: "3/12 spots",
        price: 25,
        duration: "45 min",
        tag: "Group",
        tagColor: "bg-gray-100 text-gray-700",
        online: false,
    },
    {
        id: 3,
        title: "Yoga Flow",
        coach: "Coach Emma Davis",
        date: "Feb 6, 2026",
        time: "06:00 PM",
        location: "Studio B",
        spots: "5/10 spots",
        price: 20,
        duration: "60 min",
        tag: "Group",
        tagColor: "bg-gray-100 text-gray-700",
        online: true,
    },
    {
        id: 4,
        title: "Strength Training",
        coach: "Coach John Smith",
        date: "Feb 6, 2026",
        time: "08:00 AM",
        location: "Weight Room",
        spots: "2 spots",
        price: 90,
        duration: "75 min",
        tag: "Personal",
        tagColor: "bg-emerald-500 text-white",
        online: true,
    },
];

const FILTERS = ["All Sessions", "Personal", "Group", "Online", "In-Person"];

export default function BookClient({ profile }: { profile: ClientProfile }) {
    const [activeFilter, setActiveFilter] = useState("All Sessions");
    const [search, setSearch] = useState("");

    const filtered = SESSIONS.filter((s) => {
        const matchesFilter =
            activeFilter === "All Sessions" ||
            (activeFilter === "Online" && s.online) ||
            (activeFilter === "In-Person" && !s.online) ||
            s.tag === activeFilter;

        const matchesSearch =
            search === "" ||
            s.title.toLowerCase().includes(search.toLowerCase()) ||
            s.coach.toLowerCase().includes(search.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Main content */}
            <main className="max-w-6xl mx-auto px-6 py-10">
                <h1 className="text-2xl font-bold text-gray-900">Browse &amp; Book Sessions</h1>
                <p className="text-gray-500 mt-1 mb-6">Find the perfect training session that fits your schedule</p>

                {/* Search + Filters */}
                <div className="bg-white border border-gray-200 rounded-2xl px-6 py-5 mb-8">
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
                        {FILTERS.map((f) => (
                            <button
                                key={f}
                                onClick={() => setActiveFilter(f)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                                    activeFilter === f
                                        ? "bg-emerald-500 text-white border-emerald-500"
                                        : "bg-white text-gray-700 border-gray-200 hover:border-emerald-400"
                                }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Session Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filtered.map((session) => (
                        <div key={session.id} className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col gap-4">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">{session.title}</h2>
                                    <p className="text-sm text-gray-500 mt-0.5">{session.coach}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    {session.online && (
                                        <span className="flex items-center gap-1 text-xs text-gray-500 border border-gray-200 rounded-full px-2 py-0.5">
                                            <Video className="w-3 h-3" /> Online
                                        </span>
                                    )}
                                    <span className={`text-xs font-semibold px-3 py-0.5 rounded-full ${session.tagColor}`}>
                                        {session.tag}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600">
                                <span className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    {session.date}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-gray-400" />
                                    {session.time}
                                </span>
                                <span className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-gray-400" />
                                    {session.location}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Users className="w-4 h-4 text-gray-400" />
                                    {session.spots}
                                </span>
                            </div>

                            <div className="border-t border-gray-100 pt-4 flex items-end justify-between">
                                <div>
                                    <span className="text-2xl font-bold text-emerald-500">${session.price}</span>
                                    <p className="text-xs text-gray-400 mt-0.5">{session.duration}</p>
                                </div>
                                <button className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
                                    Book Now
                                </button>
                            </div>
                        </div>
                    ))}

                    {filtered.length === 0 && (
                        <p className="col-span-2 text-center text-gray-400 py-16">No sessions found.</p>
                    )}
                </div>
            </main>
        </div>
    );
}