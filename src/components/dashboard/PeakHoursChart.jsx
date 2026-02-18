import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Zap } from "lucide-react";

export default function PeakHoursChart({ data }) {
    if (!data || data.length === 0) return null;

    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Zap size={14} className="text-orange-500" /> Horarios Pico
            </h3>
            <div className="h-40 w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                        <XAxis
                            dataKey="hour"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 10, fill: '#9ca3af', fontWeight: 800 }}
                            interval={3}
                        />
                        <YAxis hide />
                        <Tooltip
                            cursor={{ fill: '#f3f4f6', radius: 6 }}
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const hour = payload[0].payload.hour;
                                    const hourNum = parseInt(hour);
                                    const nextHour = (hourNum + 1) % 24;
                                    const range = `${hourNum.toString().padStart(2, '0')}:00 - ${nextHour.toString().padStart(2, '0')}:00`;

                                    return (
                                        <div className="bg-gray-900 px-3 py-2 rounded-xl shadow-xl border border-gray-800 text-white z-50">
                                            <p className="text-[10px] font-medium text-gray-400 mb-1">{range}</p>
                                            <p className="mt-2 text-xl font-black text-white leading-none">
                                                {payload[0].value} <span className="text-[10px] font-bold text-gray-500 uppercase">Pedidos</span>
                                            </p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Bar
                            dataKey="volume"
                            radius={[4, 4, 4, 4]}
                            barSize={20}
                        >
                            {data.map((entry, index) => {
                                const maxVol = Math.max(...data.map(d => d.volume)) || 1;
                                const intensity = entry.volume / maxVol;

                                let fill = "#f3f4f6";
                                if (intensity > 0.7) fill = "#ea580c";
                                else if (intensity > 0.4) fill = "#fb923c";
                                else if (intensity > 0.1) fill = "#fdba74";

                                return <Cell key={`cell-${index}`} fill={fill} />;
                            })}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="mt-2 flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                    <div className="flex gap-0.5 h-3 items-end">
                        <div className="w-1 h-1 bg-gray-200 rounded-sm"></div>
                        <div className="w-1 h-2 bg-orange-300 rounded-sm"></div>
                        <div className="w-1 h-3 bg-orange-600 rounded-sm"></div>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400">Intensidad</span>
                </div>
                <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Últimos 30 días</span>
            </div>
        </div>
    );
}
