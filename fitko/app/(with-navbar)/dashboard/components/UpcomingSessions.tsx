import {Calendar} from "lucide-react";
import {BookingProps} from "@/constants/interface/BookingProps";
import {formatDate, formatTime} from "@/lib/helper/getTime";

export const UpcomingSessions = (session: BookingProps) => {

    return (
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl border border-gray-100 hover:border-emerald-100 hover:bg-emerald-50/30 transition-colors">
            <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-50 rounded-2xl flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500" />
                </div>
                <div className="min-w-0">
                    <p className="font-bold text-gray-900 text-sm sm:text-lg truncate">{session.sessions.trainer?.first_name} {session.sessions.trainer?.last_name}</p>
                    <p className="text-xs sm:text-sm text-emerald-500 font-medium">Personal Training</p>
                    <p className="text-xs sm:text-sm text-amber-500 mt-1 truncate">{formatDate(session.sessions.start_time)}, {formatTime(session.sessions.start_time)}</p>
                </div>
            </div>
            <span
                className="text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full shrink-0 bg-emerald-500 text-white"
            >
                {session.sessions.status.charAt(0).toUpperCase() + session.sessions.status.slice(1)}
            </span>
        </div>
    );
};
