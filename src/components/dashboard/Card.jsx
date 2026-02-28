/*
 * Copyright (C) 2026 Thiago Valentín Stilo Limarino
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

/**
 * Card — Standard surface container for dashboard content.
 *
 * @param {React.ReactNode} children
 * @param {"sm"|"md"|"lg"|"none"} [padding="md"] - Internal padding
 * @param {boolean} [hover] - Adds lift-on-hover effect
 * @param {boolean} [dashed] - Dashed border for empty states
 * @param {string} [className] - Additional classes
 * @param {object} [rest] - Spread to root div (onClick, etc.)
 */
export default function Card({
    children,
    padding = "md",
    hover = false,
    dashed = false,
    className = "",
    ...rest
}) {
    const paddings = {
        none: "",
        sm: "p-4",
        md: "p-6",
        lg: "p-6 sm:p-8",
    };

    return (
        <div
            className={[
                "bg-white dark:bg-zinc-900 rounded-3xl shadow-sm",
                dashed
                    ? "border-2 border-dashed border-gray-200 dark:border-white/10"
                    : "border border-gray-100 dark:border-white/10",
                hover && "hover:shadow-xl hover:-translate-y-1 transition-all duration-300",
                paddings[padding],
                className,
            ].filter(Boolean).join(" ")}
            {...rest}
        >
            {children}
        </div>
    );
}
