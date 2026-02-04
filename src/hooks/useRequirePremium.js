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

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { useToast } from "../contexts/ToastProvider";

/**
 * Custom hook to verify premium subscription and business ownership.
 * Redirects to appropriate pages if user doesn't meet requirements.
 */
export function useRequirePremium() {
    const { get_usuario } = useAuth();
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        const checkSession = async () => {
            try {
                const u = await get_usuario();

                if (!u.es_premium) {
                    navigate("/planes");
                } else if (!u.tiene_negocio) {
                    navigate("/crear-negocio");
                }
            } catch (err) {
                console.error("Error verificando sesión:", err);
                toast.error("No se pudo verificar tu sesión.");
            }
        };

        checkSession();
    }, [navigate, get_usuario, toast]);
}
