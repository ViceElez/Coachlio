"use client";

import { ClientProfile } from "@/constants/interface/clientProfile";
import { Users, DollarSign, Activity, TrendingUp, Clock } from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
} from "recharts";
import { TodaySession } from "@/constants/interface/TodaySessionProps";
import { TrainerStats } from "@/constants/interface/TrainerStatsProps";

const revenueData = [
    { month: "Jan", revenue: 4200 },
    { month: "Feb", revenue: 4800 },
    { month: "Mar", revenue: 5100 },
    { month: "Apr", revenue: 4900 },
    { month: "May", revenue: 7800 },
    { month: "Jun", revenue: 8100 },
];

const weeklyData = [
    { day: "Mon", sessions: 8 },
    { day: "Tue", sessions: 12 },
    { day: "Wed", sessions: 10 },
    { day: "Thu", sessions: 14 },
    { day: "Fri", sessions: 11 },
    { day: "Sat", sessions: 5 },
    { day: "Sun", sessions: 4 },
];


export default function DashboardTrainer({
    profile,
    todaySessions,
    stats,
}: {
    profile: ClientProfile;
    todaySessions: TodaySession[];
    stats: TrainerStats | null;
}) {
    const formatTime = (iso: string) => {
        return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };

    const statCards = [
        {
            label: "Total Clients",
            value: stats?.totalClients ?? 0,
            sub: "+12 this month",
            subColor: "text-emerald-500",
            icon: <Users className="w-6 h-6 text-emerald-500" />,
            iconBg: "bg-emerald-100",
        },
        {
            label: "Monthly Revenue",
            value: "$8,100",
            sub: "+18% vs last month",
            subColor: "text-emerald-500",
            icon: <DollarSign className="w-6 h-6 text-emerald-500" />,
            iconBg: "bg-emerald-100",
        },
        {
            label: "This Week",
            value: stats?.weekSessionsCompleted ?? 0,
            sub: "Sessions completed",
            subColor: "text-gray-400",
            icon: <Activity className="w-6 h-6 text-blue-400" />,
            iconBg: "bg-blue-100",
        },
        {
            label: "Retention Rate",
            value: "94%",
            sub: "Above target",
            subColor: "text-purple-500",
            icon: <TrendingUp className="w-6 h-6 text-purple-500" />,
            iconBg: "bg-purple-100",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Header */}
            <div className="bg-emerald-500 rounded-2xl p-4 sm:p-6 text-white">
                <h1 className="text-xl sm:text-2xl font-bold">
                    Welcome back, {profile.first_name}!
                </h1>
                <p className="mt-1 text-sm sm:text-base text-emerald-50">
                    Here&apos;s your trainer overview for today.
                </p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((card) => (
                    <div
                        key={card.label}
                        className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 flex items-center justify-between gap-4"
                    >
                        <div className="flex flex-col gap-1">
                            <p className="text-xs sm:text-sm text-gray-400">{card.label}</p>
                            <p className="text-2xl sm:text-3xl font-bold text-gray-900">{card.value}</p>
                            <p className={`text-xs ${card.subColor}`}>{card.sub}</p>
                        </div>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${card.iconBg}`}>
                            {card.icon}
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Revenue Trend */}
                <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h2>
                    <ResponsiveContainer width="100%" height={220}>
                        <AreaChart data={revenueData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                            <defs>
                                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                            <Tooltip
                                contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}
                                formatter={(value) => [`$${Number(value).toLocaleString()}`, "Revenue"]}
                            />
                            <Area
                                type="monotone"
                                dataKey="revenue"
                                stroke="#10b981"
                                strokeWidth={2.5}
                                fill="url(#revenueGradient)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Weekly Sessions */}
                <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Weekly Sessions</h2>
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={weeklyData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                            <Tooltip
                                contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}
                                formatter={(value) => [value, "Sessions"]}
                            />
                            <Bar dataKey="sessions" fill="#10b981" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Today's Sessions */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900">Today&apos;s Sessions</h2>
                    <button className="text-sm font-medium border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors whitespace-nowrap">
                        View All
                    </button>
                </div>
                {todaySessions.length === 0 ? (
                    <p className="text-gray-400 text-sm">No sessions scheduled for today.</p>
                ) : (
                    <div className="space-y-3">
                        {todaySessions.map((session) => {
                            const paidBookings = (session.bookings || []).filter((b) => b.status === "paid");
                            const clientNames = paidBookings
                                .map((b) => {
                                    const c = b.client;
                                    if (!c) return null;
                                    return `${c.first_name ?? ""} ${c.last_name ?? ""}`.trim();
                                })
                                .filter(Boolean) as string[];

                            const clientPreview =
                                clientNames.length === 0
                                    ? "No client yet"
                                    : clientNames.length <= 2
                                        ? clientNames.join(", ")
                                        : `${clientNames.slice(0, 2).join(", ")} +${clientNames.length - 2} more`;

                            const isPending = clientNames.length === 0;

                            return (
                                <div
                                    key={session.id}
                                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl"
                                >
                                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                        <Clock className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                                            {clientPreview}
                                        </p>
                                        <p className="text-xs sm:text-sm text-gray-400">
                                            {formatTime(session.start_time)} &bull;{" "}
                                            <span className="capitalize">{session.session_type}</span>
                                        </p>
                                    </div>
                                    <span
                                        className={`text-xs font-medium px-3 py-1 rounded-full shrink-0 ${
                                            isPending
                                                ? "bg-gray-100 text-gray-500 border border-gray-200"
                                                : "bg-emerald-500 text-white"
                                        }`}
                                    >
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}