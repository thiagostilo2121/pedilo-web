/*
 * Copyright (C) 2026 Thiago Valentín Stilo Limarino
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

/**
 * ToggleSwitch — Accessible on/off toggle with label.
 *
 * @param {boolean} checked
 * @param {Function} onChange - Receives the new boolean value
 * @param {string} [label]
 * @param {"green"|"orange"} [color="green"]
 */
export default function ToggleSwitch({ checked, onChange, label, color = "green" }) {
    const colors = {
        green: "peer-checked:bg-green-500",
        orange: "peer-checked:bg-orange-500",
    };

    return (
        <label className="flex items-center gap-3 cursor-pointer group select-none">
            <div className="relative">
                <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                />
                <div className={`w-12 h-7 bg-gray-200 dark:bg-white/10 rounded-full peer ${colors[color]} transition-all cursor-pointer`} />
                <div className="absolute left-1 top-1 w-5 h-5 bg-white dark:bg-zinc-900 rounded-full transition-all peer-checked:translate-x-5 shadow-sm" />
            </div>
            {label && (
                <span className="text-sm font-bold text-gray-700 dark:text-zinc-300 group-hover:text-gray-900 dark:group-hover:text-zinc-100">
                    {label}
                </span>
            )}
        </label>
    );
}
