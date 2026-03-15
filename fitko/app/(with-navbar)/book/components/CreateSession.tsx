"use client";

import { useState } from "react";
import {
    Calendar,
    Clock,
    Users,
    DollarSign,
    Tag,
    CheckCircle2,
    AlertCircle,
    Loader2,
    X,
} from "lucide-react";
import { createSession } from "@/lib/session";
import { ClientProfile } from "@/constants/interface/clientProfile";
import {formatDate, formatTime, getDuration, localDatetimeToISOString} from "@/lib/helper/getTime";

const SESSION_TYPES = ["1on1", "group"] as const;

export default function CreateSession({
    profile,
    onClose,
}: {
    profile: ClientProfile;
    onClose?: () => void;
}) {
    const [sessionType, setSessionType] = useState<"1on1" | "group">("1on1");
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [capacity, setCapacity] = useState("");
    const [price, setPrice] = useState("");

    const duration = startTime && endTime ? getDuration(startTime, endTime) : null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const startTimeIso=localDatetimeToISOString(startTime)
            const endTimeIso=localDatetimeToISOString(endTime)
            const result = await createSession(
                profile.id,
                startTimeIso,
                endTimeIso,
                sessionType,
                parseFloat(price),
                parseFloat(capacity),
            );

            if (!result) {
                setError("Failed to create session. Please try again.");
                return;
            }

            setSubmitted(true);
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const validateTimes = (start: string, end: string) => {
        const endInput = document.getElementsByName("end_time")[0] as HTMLInputElement;

        if (start && end && new Date(start) >= new Date(end)) {
            endInput.setCustomValidity("End time must be after start time.");
        } else {
            endInput.setCustomValidity("");
        }
    };

    if (submitted) {
        return (
            <div className="bg-white rounded-2xl p-8 sm:p-10 flex flex-col items-center gap-4 max-w-md w-full text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Session Created!</h2>
                <p className="text-sm text-gray-500">Your session has been successfully created and is now visible to clients.</p>

                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
                    <button
                        onClick={() => {
                            setSubmitted(false);
                            setStartTime("");
                            setEndTime("");
                            setCapacity("");
                            setPrice("");
                        }}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors"
                    >
                        Create Another
                    </button>
                    <button
                        type="button"
                        onClick={() => onClose?.()}
                        className="border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold px-6 py-3 rounded-xl transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white">
            <div className="flex items-start justify-between gap-4 px-4 sm:px-6 pt-5">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Create a Session</h1>
                    <p className="text-gray-500 text-sm sm:text-base mt-1">
                        Set up a new training session for your clients to book
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => onClose?.()}
                    className="p-2 rounded-xl hover:bg-gray-50 border border-gray-200"
                    aria-label="Close"
                >
                    <X className="w-4 h-4 text-gray-600" />
                </button>
            </div>

            <div className="px-4 sm:px-6 pb-6 pt-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <form
                        onSubmit={handleSubmit}
                        className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 flex flex-col gap-6"
                    >
                        {error && (
                            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                {error}
                            </div>
                        )}

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

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    Start Date &amp; Time
                                </label>
                                <input
                                    name="start_time"
                                    type="datetime-local"
                                    required
                                    value={startTime}
                                    onChange={(e) => {
                                        setStartTime(e.target.value);
                                        validateTimes(e.target.value, endTime);
                                    }}
                                    className="w-full px-4 py-3 border border-gray-200 rounde   d-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-gray-400" />
                                    End Date &amp; Time
                                </label>
                                <input
                                    name="end_time"
                                    type="datetime-local"
                                    required
                                    min={startTime}
                                    value={endTime}
                                    onChange={(e) => {
                                        setEndTime(e.target.value);
                                        validateTimes(startTime, e.target.value);
                                    }}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <Users className="w-4 h-4 text-gray-400" />
                                    {sessionType === "1on1" ? "Capacity (max 1)" : "Capacity"}
                                </label>
                                <input
                                    name="capacity"
                                    type="number"
                                    min={1}
                                    max={sessionType === "1on1" ? 1 : 50}
                                    value={capacity}
                                    onChange={(e) => setCapacity(e.target.value)}
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
                                    name="price"
                                    type="number"
                                    min={0}
                                    step={0.01}
                                    required
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="e.g. 60"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Creating Session...
                                </>
                            ) : (
                                "Create Session"
                            )}
                        </button>
                    </form>

                    {/* Sidebar */}
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
                                <span className={`text-xs font-semibold px-3 py-0.5 rounded-full shrink-0 ${
                                    sessionType === "1on1"
                                        ? "bg-emerald-500 text-white"
                                        : "bg-gray-100 text-gray-700"
                                }`}>
                                    {sessionType === "1on1" ? "1-on-1" : "Group"}
                                </span>
                            </div>

                            <div className="flex flex-col gap-2 text-sm text-gray-500">
                                <span className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                                    {startTime ? (
                                        <span className="text-gray-700 font-medium">{formatDate(startTime)}</span>
                                    ) : "Date will appear here"}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                                    {startTime && endTime ? (
                                        <span className="text-gray-700 font-medium">
                                            {formatTime(startTime)} → {formatTime(endTime)}
                                            {duration && <span className="text-gray-400 font-normal ml-1">({duration})</span>}
                                        </span>
                                    ) : startTime ? (
                                        <span className="text-gray-700 font-medium">{formatTime(startTime)}</span>
                                    ) : "Time will appear here"}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Users className="w-4 h-4 text-gray-400 shrink-0" />
                                    {capacity ? (
                                        <span className="text-gray-700 font-medium">
                                            {capacity} {parseInt(capacity) === 1 ? "spot" : "spots"}
                                        </span>
                                    ) : "Spots will appear here"}
                                </span>
                            </div>

                            <div className="border-t border-gray-100 pt-4">
                                {price ? (
                                    <span className="text-2xl font-bold text-emerald-500">${parseFloat(price).toFixed(2)}</span>
                                ) : (
                                    <span className="text-2xl font-bold text-emerald-500">$—</span>
                                )}
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
            </div>
        </div>
    );
}