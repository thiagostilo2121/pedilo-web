import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

export default function AutopilotSection({ icon: Icon, title, count, children, color = "text-gray-900 dark:text-zinc-100", bgColor = "bg-gray-50 dark:bg-white/5" }) {
    const [open, setOpen] = useState(true);
    return (
        <div className="border border-gray-100 dark:border-white/10 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50/80 dark:hover:bg-white/5 transition-all duration-300"
            >
                <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl ${bgColor} flex items-center justify-center ${color}`}>
                        <Icon size={18} />
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-zinc-100 text-sm">{title}</h4>
                    {count > 0 && (
                        <span className="text-[10px] font-bold bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-zinc-400 px-2 py-0.5 rounded-full">{count}</span>
                    )}
                </div>
                {open ? <ChevronUp size={16} className="text-gray-400 dark:text-zinc-500 transition-transform duration-300" /> : <ChevronDown size={16} className="text-gray-400 dark:text-zinc-500 transition-transform duration-300" />}
            </button>
            <div className={`grid transition-all duration-300 ease-in-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                    <div className="px-4 pb-4 space-y-3 pt-1">{children}</div>
                </div>
            </div>
        </div>
    );
}
