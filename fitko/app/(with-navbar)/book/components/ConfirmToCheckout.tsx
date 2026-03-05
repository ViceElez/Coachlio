"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { X, Calendar, Clock, Timer, Users, DollarSign, User } from "lucide-react";
import { formatDate, formatTime, getDuration } from "@/lib/helper/getTime";
import { ConfirmToCheckoutProps } from "@/constants/interface/ConfirmToCheckoutProps";
import { routes } from "@/constants/routes";
import {reserveSession} from "@/lib/bookSession";

export const ConfirmToCheckout = ({ session, onClose }: ConfirmToCheckoutProps) => {
    const router = useRouter();
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onClose]);

    const portalRoot =
        typeof document !== "undefined"
            ? (document.getElementById("portal-root") ?? document.body)
            : null;

    if (!portalRoot) return null;

    const trainerName = session.trainer
        ? `${session.trainer.first_name} ${session.trainer.last_name}`
        : "Unknown Trainer";

    const typeLabel = session.session_type === "1on1" ? "1-on-1 Session" : "Group Session";
    const typeColor =
        session.session_type === "1on1"
            ? "bg-emerald-100 text-emerald-700"
            : "bg-gray-100 text-gray-700";

    const handleConfirm = async () => {
        try {
            const booking = await reserveSession(session.id)
            router.push(`${routes.CHECKOUT}/${booking.id}`)
        } catch (e: any) {
            console.error(e)
            alert(e.message)
        }
    }

    return createPortal(
        <div
            className="fixed inset-0 flex items-center justify-center px-4 py-6"
            style={{ zIndex: 9999 }}
            onClick={onClose}
        >
            <div className="absolute inset-0 bg-black/50" />
            <div
                className="relative w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between px-4 sm:px-6 pt-4 sm:pt-6 pb-4 border-b border-gray-100 shrink-0">
                    <div>
                        <h2 className="text-base sm:text-lg font-bold text-gray-900">Confirm Booking</h2>
                        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Review the session details below</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-700"
                        aria-label="Close modal"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="px-4 sm:px-6 py-4 sm:py-5 space-y-4 overflow-y-auto flex-1">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                <User className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">{trainerName}</p>
                                <p className="text-xs text-gray-500">Trainer</p>
                            </div>
                        </div>
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${typeColor}`}>
                            {typeLabel}
                        </span>
                    </div>

                    <div className="border-t border-gray-100" />

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                            <div>
                                <p className="text-xs text-gray-400">Date</p>
                                <p className="font-medium text-gray-800">{formatDate(session.start_time)}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                            <div>
                                <p className="text-xs text-gray-400">Time</p>
                                <p className="font-medium text-gray-800">{formatTime(session.start_time)}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Timer className="w-4 h-4 text-gray-400 shrink-0" />
                            <div>
                                <p className="text-xs text-gray-400">Duration</p>
                                <p className="font-medium text-gray-800">{getDuration(session.start_time, session.end_time)}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Users className="w-4 h-4 text-gray-400 shrink-0" />
                            <div>
                                <p className="text-xs text-gray-400">Spots left</p>
                                <p className="font-medium text-gray-800">{session.capacity_available}</p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-100" />
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <DollarSign className="w-4 h-4 text-gray-400" />
                            <span>Total</span>
                        </div>
                        <span className="text-2xl font-bold text-emerald-500">${session.price}</span>
                    </div>
                </div>

                <div className="px-4 sm:px-6 pb-4 sm:pb-6 flex gap-3 shrink-0 border-t border-gray-100 pt-4">
                    <button
                        onClick={onClose}
                        className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {handleConfirm()}}
                        className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold transition-colors"
                    >
                        Confirm Booking
                    </button>
                </div>
            </div>
        </div>,
        portalRoot
    );
};