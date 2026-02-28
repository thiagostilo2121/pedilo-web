import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import Card from "./Card";

export default function StatsCard({ title, value, subtext, icon, trend, variant = "default" }) {
    const trendColor =
        trend === 'up' ? 'text-green-700 dark:text-green-400' :
            trend === 'down' ? 'text-red-700 dark:text-red-400' : 'text-gray-500 dark:text-zinc-400';

    const trendBg =
        trend === 'up' ? 'bg-green-50 dark:bg-green-900/30 border-green-100 dark:border-green-800' :
            trend === 'down' ? 'bg-red-50 dark:bg-red-900/30 border-red-100 dark:border-red-800' : 'bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/10';

    const TrendIcon =
        trend === 'up' ? ArrowUpRight :
            trend === 'down' ? ArrowDownRight : Minus;

    const variantStyles = {
        default: "p-2 bg-gray-50 dark:bg-white/5 rounded-xl text-gray-500 dark:text-zinc-400 shadow-sm border border-gray-100 dark:border-white/10 shrink-0",
        warning: "p-2 bg-red-50 dark:bg-red-900/30 rounded-xl text-red-600 dark:text-red-400 animate-pulse border border-red-100 dark:border-red-800 shrink-0",
    };

    return (
        <Card hover padding="md" className={`p-5 sm:p-6 ${variant === 'warning' ? 'border-red-100 dark:border-red-800' : ''}`}>
            <div className="flex flex-col justify-between items-start mb-5 sm:mb-6">
                <div className="flex items-center gap-2 mb-2 w-full justify-between">
                    <p className="text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-[0.2em] truncate">{title}</p>
                    <div className={variantStyles[variant]}>
                        {icon}
                    </div>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 dark:text-zinc-100 tracking-tighter truncate w-full">{value}</h3>
            </div>

            {subtext && (
                <div className="flex items-center gap-2 flex-wrap">
                    {trend && (
                        <div className={`flex items-center ${trendColor} ${trendBg} border px-2 py-0.5 rounded-lg text-[10px] font-black shrink-0`}>
                            <TrendIcon size={12} className="mr-1" strokeWidth={3} />
                            <span>{trend === 'up' ? 'ALZA' : trend === 'down' ? 'BAJA' : 'ESTABLE'}</span>
                        </div>
                    )}
                    <span className="text-[11px] font-bold text-gray-400 dark:text-zinc-500 tracking-tight truncate">{subtext}</span>
                </div>
            )}
        </Card>
    );
}
