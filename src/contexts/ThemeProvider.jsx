import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ThemeContext = createContext();

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
    return ctx;
}

export default function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        try {
            return localStorage.getItem("pedilo_theme") || "light";
        } catch {
            return "light";
        }
    });

    const location = useLocation();
    const isDashboard = location.pathname.startsWith("/dashboard");

    useEffect(() => {
        const root = document.documentElement;
        // Dark mode only applies on dashboard routes
        if (theme === "dark" && isDashboard) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        try {
            localStorage.setItem("pedilo_theme", theme);
        } catch { }
    }, [theme, isDashboard]);

    const toggleTheme = () => setTheme(prev => prev === "dark" ? "light" : "dark");
    const isDark = theme === "dark" && isDashboard;

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
            {children}
        </ThemeContext.Provider>
    );
}
