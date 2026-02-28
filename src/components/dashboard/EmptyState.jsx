/*
 * Copyright (C) 2026 Thiago Valentín Stilo Limarino
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */
import { Plus } from "lucide-react";

/**
 * EmptyState — Placeholder shown when a list has no items.
 * 
 * @param {React.ElementType} icon - Lucide icon component
 * @param {string} title
 * @param {string} description
 * @param {string} [actionLabel] - CTA text
 * @param {Function} [onAction] - CTA click handler
 * @param {"link"|"button"} [actionStyle="link"] - CTA style
 */
export default function EmptyState({
    icon: Icon,
    title,
    description,
    actionLabel,
    onAction,
    actionStyle = "link",
}) {
    return (
        <div className="bg-white dark:bg-zinc-900 border-2 border-dashed border-gray-200 dark:border-white/10 rounded-3xl p-12 text-center animate-in fade-in zoom-in-95 duration-500 flex flex-col items-center">
            {Icon && (
                <div className="bg-orange-50 dark:bg-orange-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="text-orange-500" size={40} />
                </div>
            )}
            <h3 className="text-xl font-black text-gray-900 dark:text-zinc-100 mb-2">{title}</h3>
            <p className="text-gray-500 dark:text-zinc-400 mb-8 max-w-sm mx-auto">{description}</p>
            {actionLabel && onAction && (
                actionStyle === "button" ? (
                    <button
                        onClick={onAction}
                        className="inline-flex items-center gap-2 text-white bg-orange-600 px-6 py-3 rounded-xl font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-200 dark:shadow-none"
                    >
                        <Plus size={20} /> {actionLabel}
                    </button>
                ) : (
                    <button
                        onClick={onAction}
                        className="text-orange-600 font-bold hover:text-orange-700 hover:underline flex items-center justify-center gap-2 mx-auto transition-all"
                    >
                        <Plus size={20} /> {actionLabel}
                    </button>
                )
            )}
        </div>
    );
}
