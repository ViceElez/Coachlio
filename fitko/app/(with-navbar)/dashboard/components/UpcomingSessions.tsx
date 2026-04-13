"use client";

import {Calendar} from "lucide-react";
import {BookingProps} from "@/constants/interface/BookingProps";
import {formatDate, formatTime} from "@/lib/helper/getTime";
import {useState} from "react";
import CancelSessionModal from "@/app/(with-navbar)/dashboard/components/CancelSessionModal";


export const UpcomingSessions = (session: BookingProps) => {
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

    const sessionTypeLabel = session.sessions.session_type === "group" ? "Group Session" : "1-on-1 Session";

    return (
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl border border-gray-100 hover:border-emerald-100 hover:bg-emerald-50/30 transition-colors">
            <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-50 rounded-2xl flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500" />
                </div>
                <div className="min-w-0">
                    <p className="font-bold text-gray-900 text-sm sm:text-lg truncate">{session.sessions.trainer?.first_name} {session.sessions.trainer?.last_name}</p>
                    <p className="text-xs sm:text-sm text-emerald-500 font-medium">{sessionTypeLabel}</p>
                    <p className="text-xs sm:text-sm text-amber-500 mt-1 truncate">{formatDate(session.sessions.start_time)}, {formatTime(session.sessions.start_time)}</p>
                </div>
            </div>
            <div className="flex flex-col items-center sm:items-end gap-2 shrink-0 w-full sm:w-35">
                <span
                    className="w-[80%] sm:w-full text-center text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full bg-emerald-500 text-white"
                >
                    {session.sessions.status.charAt(0).toUpperCase() + session.sessions.status.slice(1)}
                </span>
                <button
                    type="button"
                    onClick={() => setIsCancelModalOpen(true)}
                    className="w-[80%] sm:w-full text-center text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full border border-rose-200 text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors hover:cursor-pointer"
                >
                    Cancel
                </button>
            </div>

            <CancelSessionModal
                open={isCancelModalOpen}
                onOpenChangeAction={setIsCancelModalOpen}
                bookingId={session.id}
            />
        </div>
    );
};
