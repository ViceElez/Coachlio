import {Calendar} from "lucide-react";
import {BookingProps} from "@/constants/interface/BookingProps";

export const UpcomingSessions = (session: BookingProps) => {
    const isConfirmed = session.sessions.status === "scheduled";

    return (
        <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-emerald-100 hover:bg-emerald-50/30 transition-colors">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                    <p className="font-bold text-gray-900">{session.sessions.trainer.first_name} {session.sessions.trainer.last_name}</p>
                    <p className="text-sm text-emerald-500 font-medium">Personal Training</p>
                    <p className="text-xs text-amber-500 mt-0.5">{session.sessions.start_time}</p>
                </div>
            </div>
            <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    isConfirmed
                        ? "bg-emerald-500 text-white"
                        : "bg-yellow-100 text-yellow-700"
                }`}
            >
                {session.sessions.status.charAt(0).toUpperCase() + session.sessions.status.slice(1)}
            </span>
        </div>
    );
};
