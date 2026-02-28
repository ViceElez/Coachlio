"use client";

import { ClientProfile } from "@/constants/interface/clientProfile";
import Link from "next/link";
import {UpcomingSessions} from "@/app/(with-navbar)/dashboard/components/UpcomingSessions";
import { Flame, Target, Trophy, TrendingUp } from "lucide-react";
import {BookingProps} from "@/constants/interface/BookingProps";


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
        <div className="min-h-screen bg-gray-50 p-6 space-y-6">
            <div className="bg-emerald-500 rounded-2xl p-6 text-white">
                <h1 className="text-2xl font-bold">Welcome back, {profile.first_name}!</h1>
                <p className="mt-1 text-emerald-50">{motivationalMessage}</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Upcoming Sessions</h2>
                        <Link
                            href="/book"
                            className="text-sm font-medium border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors"
                        >
                            Book More
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {upcomingSessions.map((session, i) => (
                            <UpcomingSessions key={i} {...session} />
                        ))}
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4">
                    <h2 className="text-lg font-semibold text-gray-900">Quick Stats</h2>
                    <div className="grid grid-cols-2 gap-4 flex-1">
                        <div className="bg-emerald-50 rounded-xl p-4 flex flex-col gap-2">
                            <div className="w-9 h-9 bg-emerald-100 rounded-lg flex items-center justify-center">
                                <Flame className="w-5 h-5 text-emerald-600" />
                            </div>
                            <p className="text-2xl font-bold text-gray-900">12</p>
                            <p className="text-xs text-gray-500">Day Streak</p>
                        </div>
                        <div className="bg-blue-50 rounded-xl p-4 flex flex-col gap-2">
                            <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Target className="w-5 h-5 text-blue-600" />
                            </div>
                            <p className="text-2xl font-bold text-gray-900">8</p>
                            <p className="text-xs text-gray-500">Goals Hit</p>
                        </div>
                        <div className="bg-purple-50 rounded-xl p-4 flex flex-col gap-2">
                            <div className="w-9 h-9 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Trophy className="w-5 h-5 text-purple-600" />
                            </div>
                            <p className="text-2xl font-bold text-gray-900">3</p>
                            <p className="text-xs text-gray-500">Badges Earned</p>
                        </div>
                        <div className="bg-orange-50 rounded-xl p-4 flex flex-col gap-2">
                            <div className="w-9 h-9 bg-orange-100 rounded-lg flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-orange-600" />
                            </div>
                            <p className="text-2xl font-bold text-gray-900">24</p>
                            <p className="text-xs text-gray-500">Sessions Total</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}