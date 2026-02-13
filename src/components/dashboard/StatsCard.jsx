import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

export default function StatsCard({ title, value, subtext, icon, trend, variant = "default" }) {
    // trend: 'up' | 'down' | 'neutral'
    // variant: 'default' | 'warning'

    const trendColor =
        trend === 'up' ? 'text-green-600' :
            trend === 'down' ? 'text-red-600' : 'text-gray-400';

    const TrendIcon =
        trend === 'up' ? ArrowUpRight :
            trend === 'down' ? ArrowDownRight : Minus;

    const variantStyles = {
        default: "p-2 bg-orange-50 rounded-lg text-orange-600",
        warning: "p-2 bg-red-50 rounded-lg text-red-600 animate-pulse",
    };

    return (
        <div className={`bg-white p-4 sm:p-6 rounded-2xl shadow-sm border transition-all hover:shadow-md ${variant === 'warning' ? 'border-red-100' : 'border-gray-100'}`}>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-sm font-black text-gray-400 uppercase tracking-widest mb-1">{title}</p>
                    <h3 className="text-3xl font-black text-gray-900 tracking-tight">{value}</h3>
                </div>
                <div className={variantStyles[variant]}>
                    {icon}
                </div>
            </div>

            {subtext && (
                <div className="flex items-center gap-1 text-[11px] font-bold">
                    {trend && (
                        <span className={`flex items-center ${trendColor} bg-opacity-10 px-1.5 py-0.5 rounded-md`}>
                            <TrendIcon size={12} className="mr-0.5" strokeWidth={3} />
                        </span>
                    )}
                    <span className="text-gray-400 truncate">{subtext}</span>
                </div>
            )}
        </div>
    );
}
