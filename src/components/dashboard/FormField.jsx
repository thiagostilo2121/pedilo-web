/*
 * Copyright (C) 2026 Thiago Valentín Stilo Limarino
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

/**
 * FormField — Label + input wrapper for consistent form styling.
 *
 * @param {string} label
 * @param {React.ReactNode} children - Form control (input, select, etc.)
 * @param {string} [className] - Extra classes on wrapper
 */
export default function FormField({ label, children, className = "" }) {
    return (
        <div className={`space-y-1.5 ${className}`}>
            <label className="block text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest ml-1">
                {label}
            </label>
            {children}
        </div>
    );
}
