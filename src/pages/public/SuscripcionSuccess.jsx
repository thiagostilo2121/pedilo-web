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

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Loader2, Rocket } from "lucide-react";

export default function SuscripcionSuccess() {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    navigate("/dashboard");
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center px-4">
            <div className="bg-white rounded-[3rem] shadow-2xl p-12 md:p-16 max-w-lg w-full text-center">

                {/* Ícono de éxito animado */}
                <div className="relative mx-auto w-24 h-24 mb-8">
                    <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-50"></div>
                    <div className="relative bg-green-500 rounded-full w-24 h-24 flex items-center justify-center">
                        <CheckCircle2 className="text-white" size={48} strokeWidth={2.5} />
                    </div>
                </div>

                {/* Título */}
                <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                    ¡Pago Exitoso!
                </h1>

                {/* Mensaje */}
                <p className="text-gray-600 text-lg mb-8">
                    Tu suscripción al <span className="font-bold text-green-600">Plan Profesional</span> está activa.
                    <br />
                    ¡Ya podés empezar a recibir pedidos!
                </p>

                {/* Contador de redirección */}
                <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                    <div className="flex items-center justify-center gap-3 text-gray-500">
                        <Loader2 className="animate-spin" size={20} />
                        <span>Redirigiendo al dashboard en <span className="font-bold text-gray-900">{countdown}</span> segundos...</span>
                    </div>
                </div>

                {/* Botón manual */}
                <button
                    onClick={() => navigate("/dashboard")}
                    className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-green-200 hover:bg-green-700 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                >
                    <Rocket size={20} />
                    Ir al Dashboard ahora
                </button>

                {/* Footer */}
                <p className="mt-8 text-gray-400 text-sm">
                    Gracias por confiar en Pedilo 🍔
                </p>
            </div>
        </div>
    );
}
