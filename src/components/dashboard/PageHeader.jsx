/*
 * Copyright (C) 2026 Thiago Valentín Stilo Limarino
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

/**
 * PageHeader — Reusable header for all dashboard pages.
 * 
 * @param {string} title - Page title (h1)
 * @param {string} subtitle - Description below title
 * @param {string} [badge] - Optional orange pill text
 * @param {React.ReactNode} [actions] - Right-side slot for buttons
 * @param {boolean} [borderBottom=false] - Show bottom border + padding
 * @param {React.ReactNode} [icon] - Optional icon element to the left of the title
 */
export default function PageHeader({ title, subtitle, badge, actions, borderBottom = false, icon }) {
    return (
        <div className={`flex flex-col md:flex-row md:items-end justify-between gap-4 ${borderBottom ? "border-b border-gray-100 dark:border-white/10 pb-6" : ""}`}>
            <div className="flex items-center gap-4">
                {icon && icon}
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-zinc-100 tracking-tight flex items-center gap-3">
                        {title}
                        {badge && (
                            <span className="hidden sm:inline-block px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full uppercase tracking-widest">
                                {badge}
                            </span>
                        )}
                    </h1>
                    <p className="text-gray-500 dark:text-zinc-400 mt-1 font-medium max-w-2xl text-sm sm:text-base">
                        {subtitle}
                    </p>
                </div>
            </div>

            {actions && (
                <div className="flex items-center gap-3 shrink-0">
                    {actions}
                </div>
            )}
        </div>
    );
}
