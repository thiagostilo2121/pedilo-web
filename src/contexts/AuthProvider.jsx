import { createContext, useContext, useState, useEffect } from "react";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const userData = await authService.getProfile();
                    setUser(userData);
                } catch (error) {
                    console.error("Error loading user profile:", error);
                    localStorage.removeItem("token");
                }
            }
            setLoading(false);
        };
        initAuth();
    }, []);

    const login = async (email, password) => {
        const data = await authService.login(email, password);
        localStorage.setItem("token", data.access_token);
        const userData = await authService.getProfile();
        setUser(userData);
        navigate("/dashboard");
    };

    const register = async (userData) => {
        await authService.register(userData);
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        navigate("/login");
    };

    // Compatibility aliases
    const user_login = login;
    const user_register = register;

    const get_usuario = async () => {
        if (user) return user;
        // Fallback if user is not loaded for some reason, though loading state should prevent this
        return await authService.getProfile();
    };

    const refresh_usuario = async () => {
        const userData = await authService.getProfile();
        setUser(userData);
        return userData;
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            register,
            logout,
            loading,
            // Legacy aliases
            user_login,
            user_register,
            get_usuario,
            refresh_usuario
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
