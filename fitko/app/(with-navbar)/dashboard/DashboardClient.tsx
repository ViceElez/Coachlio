"use client";

import { ClientProfile } from "@/constants/interface/clientProfile";
import Link from "next/link";
import {UpcomingSessions} from "@/app/(with-navbar)/dashboard/components/UpcomingSessions";
import {BookingProps} from "@/constants/interface/BookingProps";
import {routes} from "@/constants/routes";
import ChartPlaceholder from "@/app/(with-navbar)/dashboard/components/ChartPlaceholder";
import GoalsPlaceholder from "@/app/(with-navbar)/dashboard/components/GoalsPlaceholder";


export default function DashboardClient({
    profile,
    motivationalMessage,
    upcomingSessions,
}: {
    profile: ClientProfile;
    motivationalMessage: string;
    upcomingSessions: BookingProps[];
}) {

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 space-y-4 sm:space-y-6">
            <div className="bg-emerald-500 rounded-2xl p-4 sm:p-6 text-white">
                <h1 className="text-xl sm:text-2xl font-bold">Welcome back, {profile.first_name}!</h1>
                <p className="mt-1 text-sm sm:text-base text-emerald-50">{motivationalMessage}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 min-h-[260px]">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-base sm:text-lg font-semibold text-gray-900">Upcoming Sessions</h2>
                        <Link
                            href={routes.BOOK}
                            className="text-sm font-medium border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors whitespace-nowrap"
                        >
                            Book More
                        </Link>
                    </div>
                    {upcomingSessions.length === 0 ? (
                        <p className="text-gray-400 text-sm">No upcoming sessions</p>
                    ) : (
                        <div className="space-y-3 sm:space-y-4">
                            {upcomingSessions.map((session, i) => (
                                <UpcomingSessions key={i} {...session} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
                <div className="lg:col-span-2">
                    <ChartPlaceholder />
                </div>

                <div>
                    <GoalsPlaceholder />
                </div>
            </div>
        </div>
    );
}


