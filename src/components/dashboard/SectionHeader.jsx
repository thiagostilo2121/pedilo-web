/*
 * Copyright (C) 2026 Thiago Valentín Stilo Limarino
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

/**
 * SectionHeader — Icon + title for content sections inside panels and modals.
 *
 * @param {import("lucide-react").LucideIcon} icon - Lucide icon component
 * @param {string} title
 * @param {string} [className] - Extra classes on wrapper
 */
export default function SectionHeader({ icon: Icon, title, className = "" }) {
    return (
        <div className={`flex items-center gap-2 mb-4 ${className}`}>
            {Icon && <Icon className="text-gray-400 dark:text-zinc-500" size={18} />}
            <h3 className="text-sm font-bold text-gray-900 dark:text-zinc-100 uppercase tracking-wide">
                {title}
            </h3>
        </div>
    );
}
