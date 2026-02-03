import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from "lucide-react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    // Auto-dismiss logic
    useEffect(() => {
        if (toasts.length > 0) {
            const timer = setTimeout(() => {
                setToasts((prev) => prev.slice(1));
            }, 5000); // 5 seconds default
            return () => clearTimeout(timer);
        }
    }, [toasts]);

    const addToast = useCallback((message, type = "success") => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);

        // Auto remove specific toast after 5s
        setTimeout(() => {
            setToasts(current => current.filter(t => t.id !== id));
        }, 5000);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    // Shortcuts
    const toast = {
        success: (msg) => addToast(msg, "success"),
        error: (msg) => addToast(msg, "error"),
        info: (msg) => addToast(msg, "info"),
        warning: (msg) => addToast(msg, "warning"),
    };

    return (
        <ToastContext.Provider value={toast}>
            {children}
            {/* Toast Container */}
            <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
                {toasts.map((t) => (
                    <div
                        key={t.id}
                        className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border animate-in slide-in-from-right-full duration-300 ${t.type === "success" ? "bg-white border-green-200 text-gray-800" :
                                t.type === "error" ? "bg-white border-red-200 text-gray-800" :
                                    t.type === "warning" ? "bg-white border-amber-200 text-gray-800" :
                                        "bg-white border-blue-200 text-gray-800"
                            }`}
                    >
                        <div className={`
              ${t.type === "success" ? "text-green-500" :
                                t.type === "error" ? "text-red-500" :
                                    t.type === "warning" ? "text-amber-500" : "text-blue-500"}
            `}>
                            {t.type === "success" && <CheckCircle2 size={20} />}
                            {t.type === "error" && <AlertCircle size={20} />}
                            {t.type === "warning" && <AlertTriangle size={20} />}
                            {t.type === "info" && <Info size={20} />}
                        </div>
                        <p className="text-sm font-medium pr-4">{t.message}</p>
                        <button
                            onClick={() => removeToast(t.id)}
                            className="ml-auto text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}
