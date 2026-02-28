/*
 * Copyright (C) 2026 Thiago Valentín Stilo Limarino
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */
import { Loader2 } from "lucide-react";

/**
 * PrimaryButton — Main CTA button for dashboard actions.
 * Dark bg that inverts to white in dark mode.
 *
 * @param {Function} onClick
 * @param {React.ReactNode} children - Button label
 * @param {React.ElementType} [icon] - Lucide icon component
 * @param {"primary"|"secondary"|"danger"} [variant="primary"]
 * @param {"md"|"sm"} [size="md"]
 * @param {boolean} [disabled=false]
 * @param {boolean} [loading=false]
 * @param {string} [className] - Additional classes
 * @param {boolean} [iconRotate=false] - Rotate icon 90° on hover
 */
export default function PrimaryButton({
    onClick,
    children,
    icon: Icon,
    variant = "primary",
    size = "md",
    disabled = false,
    loading = false,
    className = "",
    iconRotate = false,
    type = "button",
    ...rest
}) {
    const base = "group inline-flex items-center justify-center gap-2 font-bold transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed";

    const sizes = {
        md: "px-6 py-3 rounded-xl text-base shadow-lg",
        sm: "px-4 py-2 rounded-xl text-sm shadow-md",
    };

    const variants = {
        primary: "bg-gray-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-black dark:hover:bg-zinc-200 shadow-gray-200 dark:shadow-black/20",
        secondary: "bg-white dark:bg-zinc-800 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-700 hover:text-gray-900 dark:hover:text-zinc-100 shadow-sm",
        danger: "bg-red-600 text-white hover:bg-red-700 shadow-red-200 dark:shadow-none",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
            {...rest}
        >
            {loading ? (
                <Loader2 size={size === "sm" ? 16 : 20} className="animate-spin" />
            ) : Icon ? (
                <Icon size={size === "sm" ? 16 : 20} className={iconRotate ? "group-hover:rotate-90 transition-transform" : ""} />
            ) : null}
            {children}
        </button>
    );
}
