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

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    // Helper para normalizar datos del usuario que vienen del backend
    const normalizeUser = (userData) => {
        if (userData && userData.plan_actual) {
            userData.plan_actual = userData.plan_actual.toLowerCase();
        }
        return userData;
    };

    // Soft logout triggered by Axios interceptor when refresh fails
    const handleForceLogout = useCallback(() => {
        authService.logout();
        setUser(null);
        navigate("/login");
    }, [navigate]);

    useEffect(() => {
        // Listen for auth:logout events from the Axios interceptor
        window.addEventListener("auth:logout", handleForceLogout);
        return () => window.removeEventListener("auth:logout", handleForceLogout);
    }, [handleForceLogout]);

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const userData = await authService.getProfile();
                    setUser(normalizeUser(userData));
                } catch (error) {
                    console.error("Error loading user profile:", error);
                    localStorage.removeItem("token");
                    localStorage.removeItem("refresh_token");
                }
            }
            setLoading(false);
        };
        initAuth();
    }, []);

    const login = async (email, password) => {
        const data = await authService.login(email, password);
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        const userData = await authService.getProfile();
        const normalized = normalizeUser(userData);
        setUser(normalized);
        return normalized;
    };

    const register = async (userData) => {
        await authService.register(userData);
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        navigate("/login");
    };

    const refresh_usuario = async () => {
        const userData = await authService.getProfile();
        const normalized = normalizeUser(userData);
        setUser(normalized);
        return normalized;
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            register,
            logout,
            loading,
            refresh_usuario
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
