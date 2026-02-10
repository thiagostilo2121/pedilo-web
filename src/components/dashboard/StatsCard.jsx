import { ArrowUp, ArrowDown, Minus } from "lucide-react";

export default function StatsCard({ title, value, subtext, icon, trend }) {
    // trend: 'up' | 'down' | 'neutral'

    const trendColor =
        trend === 'up' ? 'text-green-600' :
            trend === 'down' ? 'text-red-600' : 'text-gray-500';

    const TrendIcon =
        trend === 'up' ? ArrowUp :
            trend === 'down' ? ArrowDown : Minus;

    return (
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
                    <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
                </div>
                <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                    {icon}
                </div>
            </div>

            {subtext && (
                <div className="flex items-center gap-2 text-sm">
                    {/* Placeholder trend logic */}
                    {/* <span className={`flex items-center font-medium ${trendColor}`}>
             <TrendIcon size={16} className="mr-1" />
             12% 
           </span> */}
                    <span className="text-gray-400">{subtext}</span>
                </div>
            )}
        </div>
    );
}
