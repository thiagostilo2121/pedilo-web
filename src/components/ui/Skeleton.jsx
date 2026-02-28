/*
 * Copyright (C) 2026 Thiago Valentín Stilo Limarino
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

/**
 * Skeleton — Animated placeholder for loading states.
 *
 * Uses a shimmer gradient that adapts to dark mode.
 * Pass standard Tailwind size/shape classes via className:
 *   <Skeleton className="h-6 w-32 rounded-lg" />
 *   <Skeleton className="h-40 w-full rounded-2xl" />
 */
export default function Skeleton({ className = "", ...props }) {
    return (
        <div
            className={`animate-pulse bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 dark:from-white/5 dark:via-white/10 dark:to-white/5 bg-[length:200%_100%] rounded-2xl ${className}`}
            style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
            {...props}
        />
    );
}
