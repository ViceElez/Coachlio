"use client";

import React from "react";

export default function ChartPlaceholder() {
    const points = [185, 183, 182, 180, 179, 177];
    const max = Math.max(...points) + 2;
    const min = Math.min(...points) - 2;
    const width = 720;
    const height = 260;
    const padding = 30;

    const svgPoints = points.map((p, i) => {
        const x = padding + (i / (points.length - 1)) * (width - padding * 2);
        const y = padding + ((max - p) / (max - min)) * (height - padding * 2);
        return `${x},${y}`;
    }).join(' ');

    const xLabels = ["W1", "W2", "W3", "W4", "W5", "W6"];
    const yTicks = [170, 175, 180, 185, 190];

    return (
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 min-h-[460px] flex flex-col">
            <h2 className="text-xl font-semibold text-gray-900">Weight Progress</h2>

            <div className="mt-6 flex-1">
                <div className="w-full overflow-hidden">
                    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-[300px]">
                        {yTicks.map((val) => {
                            const y = padding + ((max - val) / (max - min)) * (height - padding * 2);
                            return (
                                <g key={val}>
                                    <line
                                        x1={padding}
                                        x2={width - padding}
                                        y1={y}
                                        y2={y}
                                        stroke="#e5e7eb"
                                        strokeDasharray="4 4"
                                    />
                                    <text
                                        x={padding - 10}
                                        y={y + 4}
                                        fontSize={12}
                                        fill="#9ca3af"
                                        textAnchor="end"
                                    >
                                        {val}
                                    </text>
                                </g>
                            );
                        })}

                        {xLabels.map((_, i) => {
                            const x = padding + (i / (points.length - 1)) * (width - padding * 2);
                            return (
                                <line
                                    key={i}
                                    x1={x}
                                    x2={x}
                                    y1={padding}
                                    y2={height - padding}
                                    stroke="#eef2f7"
                                    strokeDasharray="4 4"
                                />
                            );
                        })}

                        <line x1={padding} x2={padding} y1={padding} y2={height - padding} stroke="#6b7280" />
                        <line x1={padding} x2={width - padding} y1={height - padding} y2={height - padding} stroke="#6b7280" />

                        <polyline
                            points={svgPoints}
                            fill="none"
                            stroke="#10B981"
                            strokeWidth={4}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />

                        {points.map((p, i) => {
                            const x = padding + (i / (points.length - 1)) * (width - padding * 2);
                            const y = padding + ((max - p) / (max - min)) * (height - padding * 2);
                            return (
                                <circle key={i} cx={x} cy={y} r={7} fill="#10B981" stroke="#10B981" strokeWidth={2} />
                            );
                        })}

                        {xLabels.map((lab, i) => {
                            const x = padding + (i / (points.length - 1)) * (width - padding * 2);
                            const y = height - padding + 18;
                            return (
                                <text key={lab} x={x} y={y} fontSize={12} fill="#9ca3af" textAnchor="middle">
                                    {lab}
                                </text>
                            );
                        })}
                    </svg>
                </div>
            </div>

            <p className="mt-4 text-xs text-gray-400">
                This chart is a placeholder preview — live progress data will be shown here soon.
            </p>
        </div>
    );
}




