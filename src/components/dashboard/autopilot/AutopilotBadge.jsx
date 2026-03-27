const PRIORITY_COLORS = {
    "crítica": "bg-red-500",
    "alta": "bg-orange-500",
    "media": "bg-yellow-500",
    "baja": "bg-gray-400",
};

const PRIORITY_BG = {
    "crítica": "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300",
    "alta": "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800 text-orange-800 dark:text-orange-300",
    "media": "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-300",
    "baja": "bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-zinc-400",
};

export default function AutopilotBadge({ priority }) {
    return (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-full border ${PRIORITY_BG[priority] || PRIORITY_BG.media}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${PRIORITY_COLORS[priority] || PRIORITY_COLORS.media}`}></span>
            {priority}
        </span>
    );
}
