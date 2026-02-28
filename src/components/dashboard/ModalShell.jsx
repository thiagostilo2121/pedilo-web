/*
 * Copyright (C) 2026 Thiago Valentín Stilo Limarino
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */
import { X } from "lucide-react";
import { useEffect } from "react";

/**
 * ModalShell — Reusable modal container with backdrop, header, scrollable body, and footer.
 * 
 * @param {boolean} isOpen
 * @param {Function} onClose
 * @param {string} title
 * @param {string} [subtitle]
 * @param {React.ReactNode} children - Modal body content
 * @param {React.ReactNode} [footer] - Sticky footer slot
 * @param {"md"|"lg"|"xl"} [size="lg"] - Max width
 */
export default function ModalShell({
    isOpen,
    onClose,
    title,
    subtitle,
    children,
    footer,
    size = "lg",
}) {
    // Close on Escape key
    useEffect(() => {
        if (!isOpen) return;
        const handler = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [isOpen, onClose]);

    // Prevent body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    if (!isOpen) return null;

    const maxWidths = {
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm transition-all"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className={`bg-white dark:bg-zinc-900 sm:rounded-3xl rounded-t-3xl shadow-2xl w-full ${maxWidths[size]} overflow-hidden animate-in zoom-in-95 sm:slide-in-from-bottom-0 slide-in-from-bottom-4 duration-200 border border-gray-100 dark:border-white/10 flex flex-col max-h-[95dvh] sm:max-h-[85vh]`}>

                {/* Header */}
                <div className="px-6 sm:px-8 py-5 sm:py-6 border-b border-gray-50 dark:border-white/5 flex justify-between items-center shrink-0">
                    <div>
                        <h3 className="font-black text-xl text-gray-900 dark:text-zinc-100 tracking-tight">{title}</h3>
                        {subtitle && <p className="text-sm text-gray-400 dark:text-zinc-500 font-medium">{subtitle}</p>}
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-zinc-100 p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-all active:scale-95"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Scrollable Body */}
                <div className="flex-1 overflow-y-auto">
                    {children}
                </div>

                {/* Sticky Footer */}
                {footer && (
                    <div className="p-5 sm:p-6 border-t border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5 shrink-0 pb-8 sm:pb-6">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}
