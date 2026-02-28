/*
 * Copyright (C) 2026 Thiago Valentín Stilo Limarino
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

import { AlertTriangle, X } from "lucide-react";

/**
 * Modern confirmation modal to replace browser's native confirm() dialog.
 * 
 * @param {boolean} isOpen - Whether the modal is visible
 * @param {function} onClose - Called when modal is closed without confirming
 * @param {function} onConfirm - Called when user confirms the action
 * @param {string} title - Modal title
 * @param {string} message - Confirmation message
 * @param {string} confirmText - Text for confirm button (default: "Confirmar")
 * @param {string} cancelText - Text for cancel button (default: "Cancelar")
 * @param {string} variant - "danger" | "warning" | "info" (default: "danger")
 */
export default function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title = "¿Estás seguro?",
    message = "Esta acción no se puede deshacer.",
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    variant = "danger"
}) {
    if (!isOpen) return null;

    const variants = {
        danger: {
            icon: "bg-red-100 dark:bg-red-500/15 text-red-600 dark:text-red-400",
            button: "bg-red-600 hover:bg-red-700 shadow-red-100 dark:shadow-none"
        },
        warning: {
            icon: "bg-amber-100 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400",
            button: "bg-amber-600 hover:bg-amber-700 shadow-amber-100 dark:shadow-none"
        },
        info: {
            icon: "bg-blue-100 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400",
            button: "bg-blue-600 hover:bg-blue-700 shadow-blue-100 dark:shadow-none"
        }
    };

    const style = variants[variant] || variants.danger;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-150">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="p-6 pb-0 flex justify-between items-start">
                    <div className={`p-3 rounded-full ${style.icon}`}>
                        <AlertTriangle size={24} />
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:text-zinc-400 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 pt-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-zinc-100 mb-2">{title}</h3>
                    <p className="text-gray-500 dark:text-zinc-400 text-sm">{message}</p>
                </div>

                {/* Actions */}
                <div className="p-6 pt-2 flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 px-4 rounded-xl font-bold text-gray-600 dark:text-zinc-400 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/15 dark:bg-white/10 transition-all"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className={`flex-1 py-3 px-4 rounded-xl font-bold text-white shadow-lg transition-all ${style.button}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
