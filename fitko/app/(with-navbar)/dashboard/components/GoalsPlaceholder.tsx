"use client";

import React from "react";
import Link from "next/link";

export default function GoalsPlaceholder() {
    const goals = [
        { name: 'Weight Loss', current: 8, target: 15, unit: 'lbs' },
        { name: 'Weekly Workouts', current: 5, target: 6, unit: '' },
        { name: 'Body Fat %', current: 3, target: 5, unit: '%' },
    ];

    return (
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col min-h-[420px]">
            <h2 className="text-xl font-semibold text-gray-900">Current Goals</h2>

            <div className="mt-8 space-y-8">
                {goals.map((g, i) => {
                    const pct = Math.min(100, Math.round((g.current / g.target) * 100));
                    return (
                        <div key={i}>
                            <div className="flex items-center justify-between">
                                <span className="text-base font-medium text-gray-900">{g.name}</span>
                                <span className="text-base font-semibold text-gray-900">
                                    {g.current}/{g.target}{g.unit ? ` ${g.unit}` : ""}
                                </span>
                            </div>

                            <div className="mt-3 h-3 w-full rounded-full bg-emerald-100 overflow-hidden">
                                <div
                                    className="h-full rounded-full bg-emerald-500"
                                    style={{ width: `${pct}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-auto pt-10">
                <Link
                    href="#"
                    className="block text-center w-full border border-gray-200 rounded-xl px-4 py-3 text-base font-semibold hover:bg-gray-50 transition-colors"
                >
                    View Full Progress
                </Link>

                <p className="mt-4 text-xs text-gray-400">
                    Values shown are placeholder examples — live progress data will appear here later.
                </p>
            </div>
        </div>
    );
}



