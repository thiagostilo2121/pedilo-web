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
import {
    CreditCard,
    Calendar,
    AlertTriangle,
    CheckCircle2,
    XCircle,
    Clock,
    ExternalLink,
    Loader2,
    Gift
} from "lucide-react";
import { getMiSuscripcion, getCheckoutUrl } from "../services/suscripcionService";
import { useToast } from "../contexts/ToastProvider";
import DashboardLayout from "../layout/DashboardLayout";

export default function MiSuscripcion() {
    const [suscripcion, setSuscripcion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [checkoutLoading, setCheckoutLoading] = useState(false);
    const toast = useToast();

    useEffect(() => {
        fetchSuscripcion();
    }, []);

    const fetchSuscripcion = async () => {
        try {
            setLoading(true);
            const data = await getMiSuscripcion();
            setSuscripcion(data);
        } catch (err) {
            console.error("Error al obtener suscripción", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSuscribirse = async () => {
        setCheckoutLoading(true);
        try {
            const data = await getCheckoutUrl();
            if (data.url) {
                window.location.href = data.url;
            } else {
                toast.error("No se pudo generar el link de pago");
            }
        } catch (err) {
            console.error("Error:", err);
            toast.error("Error al procesar");
        } finally {
            setCheckoutLoading(false);
        }
    };

    if (loading) return <DashboardLayout><div className="p-8 text-center font-bold">Cargando datos de facturación...</div></DashboardLayout>;

    if (!suscripcion || suscripcion.status === "expired" || suscripcion.status === "cancelled") {
        return (
            <DashboardLayout>
                <div className="p-8 bg-white rounded-3xl border border-dashed border-gray-300 text-center max-w-2xl mx-auto mt-10">
                    <AlertTriangle className="mx-auto text-orange-500 mb-4" size={40} />
                    <h3 className="text-xl font-bold">Sin suscripción activa</h3>
                    <p className="text-gray-500 mt-2 mb-6">Suscribite al Plan Profesional para acceder a todas las funciones.</p>
                    <button
                        onClick={handleSuscribirse}
                        disabled={checkoutLoading}
                        className="bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-orange-700 transition-all disabled:opacity-70 flex items-center justify-center gap-2 mx-auto"
                    >
                        {checkoutLoading ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                Preparando...
                            </>
                        ) : (
                            "Suscribirme ahora"
                        )}
                    </button>
                </div>
            </DashboardLayout>
        );
    }

    const isActive = suscripcion.status === "authorized" || suscripcion.status === "active";
    const displayStatus = suscripcion.status === "cancelled" ? "Cancelado" : suscripcion.status;

    // Detectar si está en período de prueba (monto 0)
    const isTrial = suscripcion.amount === 0;
    const trialEndDate = suscripcion.next_payment_date ? new Date(suscripcion.next_payment_date) : null;
    const daysRemaining = trialEndDate ? Math.max(0, Math.ceil((trialEndDate - new Date()) / (1000 * 60 * 60 * 24))) : 0;

    return (
        <DashboardLayout>
            <div className="max-w-2xl mx-auto space-y-6 p-4">
                <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                    <CreditCard className="text-orange-600" /> Mi Suscripción
                </h2>

                {/* CARD PRINCIPAL INFORMATIVA */}
                <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                    <div className={`p-5 sm:p-8 ${isActive ? 'bg-green-50/50' : 'bg-gray-50'}`}>
                        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6">
                            <div className="w-full md:w-auto">
                                <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-1 w-fit ${isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                    {isActive ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                                    {isActive ? "Plan Activo" : "Estado: " + displayStatus}
                                </span>

                                {/* Badge de Trial */}
                                {isTrial && isActive && (
                                    <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-fit mt-2">
                                        <Gift size={12} />
                                        Período de prueba • {daysRemaining} días restantes
                                    </div>
                                )}

                                <h3 className="text-3xl md:text-4xl font-black mt-4 flex items-baseline">
                                    ${suscripcion.amount?.toFixed(0) || "0"}
                                    <span className="text-sm md:text-lg text-gray-400 font-bold uppercase ml-2">
                                        {suscripcion.currency || "ARS"}
                                    </span>
                                </h3>
                                <p className="text-gray-500 font-medium text-sm md:text-base">
                                    Cobro {suscripcion.frequency_type === "months" ? "Mensual" : "Anual"} • ID: {suscripcion.mp_subscription_id?.slice(0, 15)}...
                                </p>
                            </div>
                            <div className="bg-white p-3 sm:p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center w-full md:w-auto min-w-[140px]">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/9/98/Mercado_Pago.svg"
                                    alt="Mercado Pago"
                                    className="h-8 md:h-10 opacity-90 object-contain"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-200/50 pt-6">
                            <div className="flex items-center gap-3">
                                <Calendar className="text-gray-400" size={20} />
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Próximo Vencimiento</p>
                                    <p className="font-bold text-gray-700">
                                        {suscripcion.next_payment_date ? new Date(suscripcion.next_payment_date).toLocaleDateString() : "No programado"}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Clock className="text-gray-400" size={20} />
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Fecha de Inicio</p>
                                    <p className="font-bold text-gray-700">{new Date(suscripcion.start_date).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* MENSAJE DE GESTIÓN EXTERNA */}
                    <div className="p-6 bg-gray-50 border-t border-gray-100">
                        <a
                            href="https://www.mercadopago.com.ar/subscriptions"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-4 bg-white border-2 border-gray-200 text-gray-700 font-bold rounded-2xl hover:bg-gray-100 transition-all active:scale-[0.98]"
                        >
                            Gestionar en Mercado Pago <ExternalLink size={18} />
                        </a>
                        <p className="text-center text-[11px] text-gray-400 mt-4 px-4 leading-tight">
                            Para cancelar tu suscripción, actualizar medios de pago o ver comprobantes, por favor ingresa a tu cuenta de Mercado Pago.
                        </p>
                    </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex gap-4">
                    <AlertTriangle className="text-blue-500 shrink-0" />
                    <p className="text-blue-800 text-sm leading-relaxed">
                        Los pagos de <b>Pedilo</b> son procesados de forma segura por Mercado Pago.
                        No almacenamos los datos de tus tarjetas en nuestros servidores.
                    </p>
                </div>
            </div>
        </DashboardLayout>
    );
}