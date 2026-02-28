/*
 * Copyright (C) 2026 Thiago Valentín Stilo Limarino
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */
import { Search } from "lucide-react";

/**
 * SearchInput — Dashboard search field with icon and focus ring.
 * 
 * @param {string} value
 * @param {Function} onChange - receives the new string value
 * @param {string} [placeholder="Buscar..."]
 * @param {string} [className] - Additional wrapper classes
 */
export default function SearchInput({ value, onChange, placeholder = "Buscar...", className = "" }) {
    return (
        <div className={`relative flex-1 group ${className}`}>
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500 group-focus-within:text-orange-500 transition-colors">
                <Search size={22} />
            </div>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all shadow-sm text-base font-medium placeholder:text-gray-400 dark:placeholder:text-zinc-500 text-gray-900 dark:text-zinc-100"
            />
        </div>
    );
}
