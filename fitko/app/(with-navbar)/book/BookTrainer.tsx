"use client";

import { useState } from "react";
import {
    Calendar,
    Clock,
    Users,
    DollarSign,
    Tag,
    FileText,
    CheckCircle2,
} from "lucide-react";

const SESSION_TYPES = ["1on1", "group"] as const;

export default function BookTrainer() {
    const [sessionType, setSessionType] = useState<"1on1" | "group">("1on1");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // logic will be added later
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="bg-white border border-gray-200 rounded-2xl p-8 sm:p-12 flex flex-col items-center gap-4 max-w-md w-full text-center shadow-sm">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Session Created!</h2>
                    <p className="text-sm text-gray-500">Your session has been successfully created and is now visible to clients.</p>
                    <button
                        onClick={() => setSubmitted(false)}
                        className="mt-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors w-full"
                    >
                        Create Another Session
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Create a Session</h1>
                <p className="text-gray-500 text-sm sm:text-base mt-1 mb-4 sm:mb-6">
                    Set up a new training session for your clients to book
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 flex flex-col gap-6"
                    >
                        {/* Session Type */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <Tag className="w-4 h-4 text-gray-400" />
                                Session Type
                            </label>
                            <div className="flex gap-2">
                                {SESSION_TYPES.map((type) => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => setSessionType(type)}
                                        className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                                            sessionType === type
                                                ? "bg-emerald-500 text-white border-emerald-500"
                                                : "bg-white text-gray-700 border-gray-200 hover:border-emerald-400"
                                        }`}
                                    >
                                        {type === "1on1" ? "1-on-1" : "Group"}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Date & Time row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    Start Date &amp; Time
                                </label>
                                <input
                                    type="datetime-local"
                                    required
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-gray-400" />
                                    End Date &amp; Time
                                </label>
                                <input
                                    type="datetime-local"
                                    required
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                />
                            </div>
                        </div>

                        {/* Capacity & Price row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <Users className="w-4 h-4 text-gray-400" />
                                    {sessionType === "1on1" ? "Capacity (max 1)" : "Capacity"}
                                </label>
                                <input
                                    type="number"
                                    min={1}
                                    max={sessionType === "1on1" ? 1 : 50}
                                    defaultValue={sessionType === "1on1" ? 1 : undefined}
                                    required
                                    placeholder={sessionType === "1on1" ? "1" : "e.g. 10"}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <DollarSign className="w-4 h-4 text-gray-400" />
                                    Price per Spot ($)
                                </label>
                                <input
                                    type="number"
                                    min={0}
                                    step={0.01}
                                    required
                                    placeholder="e.g. 60"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                />
                            </div>
                        </div>

                        {/* Notes */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <FileText className="w-4 h-4 text-gray-400" />
                                Session Notes
                                <span className="text-gray-400 font-normal">(optional)</span>
                            </label>
                            <textarea
                                rows={4}
                                placeholder="Describe the session, what to bring, focus areas..."
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-5 py-3 rounded-xl transition-colors"
                        >
                            Create Session
                        </button>
                    </form>

                    {/* Preview Card */}
                    <div className="flex flex-col gap-4">
                        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 flex flex-col gap-4">
                            <h3 className="text-sm font-semibold text-gray-700">Session Preview</h3>
                            <div className="flex items-start justify-between gap-2">
                                <div>
                                    <p className="text-base font-bold text-gray-900">Your Session</p>
                                    <p className="text-sm text-gray-500 capitalize mt-0.5">
                                        {sessionType === "1on1" ? "1-on-1 Session" : "Group Session"}
                                    </p>
                                </div>
                                <span
                                    className={`text-xs font-semibold px-3 py-0.5 rounded-full shrink-0 ${
                                        sessionType === "1on1"
                                            ? "bg-emerald-500 text-white"
                                            : "bg-gray-100 text-gray-700"
                                    }`}
                                >
                                    {sessionType === "1on1" ? "1-on-1" : "Group"}
                                </span>
                            </div>
                            <div className="grid grid-cols-1 gap-y-2 text-sm text-gray-500">
                                <span className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                                    Date will appear here
                                </span>
                                <span className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                                    Time will appear here
                                </span>
                                <span className="flex items-center gap-2">
                                    <Users className="w-4 h-4 text-gray-400 shrink-0" />
                                    Spots will appear here
                                </span>
                            </div>
                            <div className="border-t border-gray-100 pt-4">
                                <span className="text-2xl font-bold text-emerald-500">$—</span>
                                <p className="text-xs text-gray-400 mt-0.5">per spot</p>
                            </div>
                        </div>

                        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 text-sm text-emerald-700 leading-relaxed">
                            <p className="font-semibold mb-1">💡 Tips</p>
                            <ul className="list-disc list-inside space-y-1 text-emerald-600">
                                <li>1-on-1 sessions are capped at 1 client</li>
                                <li>Group sessions can have up to 50 spots</li>
                                <li>Sessions become visible once created</li>
                                <li>You can manage sessions from your dashboard</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

