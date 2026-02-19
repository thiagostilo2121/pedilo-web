import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

export default function StatsCard({ title, value, subtext, icon, trend, variant = "default" }) {
    const trendColor =
        trend === 'up' ? 'text-green-700' :
            trend === 'down' ? 'text-red-700' : 'text-gray-500';

    const trendBg =
        trend === 'up' ? 'bg-green-50 border-green-100' :
            trend === 'down' ? 'bg-red-50 border-red-100' : 'bg-gray-50 border-gray-100';

    const TrendIcon =
        trend === 'up' ? ArrowUpRight :
            trend === 'down' ? ArrowDownRight : Minus;

    const variantStyles = {
        default: "p-2.5 bg-orange-50 rounded-2xl text-orange-600 shadow-sm shadow-orange-100 shrink-0",
        warning: "p-2.5 bg-red-50 rounded-2xl text-red-600 animate-pulse shadow-sm shadow-red-100 shrink-0",
    };

    return (
        <div className={`bg-white p-5 sm:p-6 rounded-3xl shadow-sm border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${variant === 'warning' ? 'border-red-100' : 'border-gray-100/80'}`}>
            <div className="flex justify-between items-start mb-5 sm:mb-6">
                <div className="space-y-1 min-w-0">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{title}</p>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tighter truncate">{value}</h3>
                </div>
                <div className={variantStyles[variant]}>
                    {icon}
                </div>
            </div>

            {subtext && (
                <div className="flex items-center gap-2 flex-wrap">
                    {trend && (
                        <div className={`flex items-center ${trendColor} ${trendBg} border px-2 py-0.5 rounded-lg text-[10px] font-black shrink-0`}>
                            <TrendIcon size={12} className="mr-1" strokeWidth={3} />
                            <span>{trend === 'up' ? 'ALZA' : trend === 'down' ? 'BAJA' : 'ESTABLE'}</span>
                        </div>
                    )}
                    <span className="text-[11px] font-bold text-gray-400 tracking-tight truncate">{subtext}</span>
                </div>
            )}
        </div>
    );
}
