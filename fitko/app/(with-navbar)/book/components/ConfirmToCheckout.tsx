"use client";

import { SessionProps } from "@/constants/interface/SessionProps";
import { Calendar, Clock, Users, X, DollarSign, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

interface ConfirmToCheckoutProps {
    session: SessionProps;
    onClose: () => void;
}

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}

function formatTime(iso: string) {
    return new Date(iso).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    });
}

function getDuration(start: string, end: string) {
    const mins = Math.round((new Date(end).getTime() - new Date(start).getTime()) / 60000);
    return mins >= 60 ? `${Math.round(mins / 60)}h` : `${mins} min`;
}

export default function ConfirmToCheckout({ session, onClose }: ConfirmToCheckoutProps) {
    const router = useRouter();

    const trainerName = session.trainer
        ? `${session.trainer.first_name} ${session.trainer.last_name}`
        : "Unknown Trainer";

    const isOneOnOne = session.session_type === "1on1";

    function handleContinue() {
        // TODO: replace with actual payout route once payout page is created
        router.push("");
    }

    return (
        <AnimatePresence>
            {/* Backdrop */}
            <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
                onClick={onClose}
            >
                {/* Modal panel */}
                <motion.div
                    key="modal"
                    initial={{ opacity: 0, scale: 0.93, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.93, y: 12 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 flex flex-col gap-6 relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Header */}
                    <div className="pr-6">
                        <h2 className="text-2xl font-bold text-gray-900 leading-snug">Confirm Booking</h2>
                        <p className="text-sm text-gray-500 mt-1 leading-relaxed">Review your session details before continuing</p>
                    </div>

                    {/* Session info card */}
                    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 flex flex-col gap-4">
                        {/* Trainer + badge */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                    <User className="w-5 h-5 text-emerald-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900 leading-snug">{trainerName}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">Trainer</p>
                                </div>
                            </div>
                            <span
                                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                    isOneOnOne
                                        ? "bg-emerald-500 text-white"
                                        : "bg-gray-100 text-gray-700"
                                }`}
                            >
                                {isOneOnOne ? "1-on-1" : "Group"}
                            </span>
                        </div>

                        {/* Details grid */}
                        <div className="flex flex-col gap-3 pt-3 border-t border-gray-200 text-sm text-gray-600">
                            <span className="flex items-center gap-2.5 leading-relaxed">
                                <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                                {formatDate(session.start_time)}
                            </span>
                            <div className="grid grid-cols-2 gap-3">
                                <span className="flex items-center gap-2.5 leading-relaxed">
                                    <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                                    {formatTime(session.start_time)}
                                </span>
                                <span className="flex items-center gap-2.5 leading-relaxed">
                                    <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                                    {getDuration(session.start_time, session.end_time)} duration
                                </span>
                                <span className="flex items-center gap-2.5 leading-relaxed">
                                    <Users className="w-4 h-4 text-gray-400 shrink-0" />
                                    {session.capacity_available} spots left
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Price summary */}
                    <div className="flex items-center justify-between border-t border-gray-100 pt-5">
                        <div className="flex items-center gap-2 text-gray-500">
                            <DollarSign className="w-4 h-4" />
                            <span className="text-sm font-medium">Total</span>
                        </div>
                        <span className="text-3xl font-bold text-emerald-500">${session.price}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 mt-1">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 px-6 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleContinue}
                            className="flex-1 py-3 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold transition-colors"
                        >
                            Continue to Payment
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}


