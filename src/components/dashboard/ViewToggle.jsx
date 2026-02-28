/*
 * Copyright (C) 2026 Thiago Valentín Stilo Limarino
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */
import { LayoutGrid, List } from "lucide-react";

/**
 * ViewToggle — Grid/List view mode toggle.
 * 
 * @param {"grid"|"list"} value - Current view mode
 * @param {Function} onChange - Callback with new mode
 */
export default function ViewToggle({ value, onChange }) {
    const options = [
        { mode: "grid", icon: LayoutGrid, label: "Vista Cuadrícula" },
        { mode: "list", icon: List, label: "Vista Lista" },
    ];

    return (
        <div className="flex bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/10 p-1 rounded-xl shadow-sm shrink-0">
            {options.map(({ mode, icon: Icon, label }) => (
                <button
                    key={mode}
                    onClick={() => onChange(mode)}
                    className={`p-2.5 rounded-lg transition-all ${value === mode
                            ? "bg-orange-50 text-orange-600 shadow-sm font-bold"
                            : "text-gray-400 dark:text-zinc-500 hover:text-gray-700 dark:hover:text-zinc-300 hover:bg-gray-50 dark:hover:bg-white/5"
                        }`}
                    title={label}
                >
                    <Icon size={20} strokeWidth={2.5} />
                </button>
            ))}
        </div>
    );
}
