/*
 * Copyright (C) 2026 Thiago Valentín Stilo Limarino
 */

import { useState, useEffect } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import adminService from "../../services/adminService";
import { Users, Store, TrendingUp, RefreshCw, Lock, ShoppingBag } from "lucide-react";
import StatsCard from "../../components/dashboard/StatsCard";

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bootstrapSecret, setBootstrapSecret] = useState("");
    const [bootstrapStatus, setBootstrapStatus] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await adminService.getStats();
            setStats(data);
        } catch (error) {
            console.error("Error loading admin stats:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleClearCache = async () => {
        try {
            await adminService.clearCache();
            alert("Cache del sistema limpiado exitosamente.");
        } catch (error) {
            alert("Error limpiando cache: " + error.message);
        }
    };

    const handleBootstrap = async () => {
        try {
            await adminService.startBootstrap(bootstrapSecret);
            setBootstrapStatus("success");
            alert("¡Ahora eres Administrador! Refresca la página.");
        } catch (error) {
            setBootstrapStatus("error");
            alert("Error: Secret incorrecto o problema de servidor.");
        }
    };

    if (loading) return <DashboardLayout><div>Cargando panel...</div></DashboardLayout>;

    return (
        <DashboardLayout>
            <div className="max-w-[1600px] mx-auto space-y-8 px-4 sm:px-6 lg:px-8 py-4 sm:py-8">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Admin Panel</h1>
                        <p className="text-gray-500 font-medium">Gestión global de la plataforma Pedilo</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handleClearCache}
                            className="bg-red-50 text-red-600 px-4 py-2 rounded-xl font-bold hover:bg-red-100 transition-colors flex items-center gap-2"
                        >
                            <RefreshCw size={18} /> Limpiar Cache Global
                        </button>
                    </div>
                </div>

                {/* Platform Overview Stats */}
                {stats && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <StatsCard
                            title="Total Usuarios"
                            value={stats.total_usuarios}
                            icon={<Users size={20} />}
                        />
                        <StatsCard
                            title="Total Negocios"
                            value={stats.total_negocios}
                            icon={<Store size={20} />}
                        />
                        <StatsCard
                            title="Negocios Activos"
                            value={stats.negocios_activos}
                            icon={<TrendingUp size={20} />}
                            subtext="Con ventas recientes"
                        />
                        <StatsCard
                            title="Total Pedidos"
                            value={stats.total_pedidos}
                            icon={<ShoppingBag size={20} />}
                            variant="success"
                        />
                    </div>
                )}

                {/* Quick Links */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <a href="/dashboard/admin/users" className="block p-6 bg-white rounded-3xl border border-gray-100 hover:shadow-lg transition-all group">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Users size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Gestionar Usuarios</h3>
                        <p className="text-sm text-gray-500 mt-1">Ver lista completa, toggle premium status.</p>
                    </a>

                    <a href="/dashboard/admin/negocios" className="block p-6 bg-white rounded-3xl border border-gray-100 hover:shadow-lg transition-all group">
                        <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Store size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Gestionar Negocios</h3>
                        <p className="text-sm text-gray-500 mt-1">Asignar badges exclusivos, ver métricas.</p>
                    </a>

                    {/* Bootstrap Section */}
                    <div className="p-6 bg-white rounded-3xl border border-gray-100 hover:shadow-lg transition-all">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                            <Lock size={18} className="text-orange-500" />
                            Admin Bootstrap
                        </h3>
                        <p className="text-sm text-gray-500 mb-4">
                            Si no sos admin, usá tu SECRET aquí.
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="password"
                                placeholder="ADMIN_SECRET"
                                className="flex-1 px-4 py-2 border rounded-xl text-sm bg-gray-50"
                                value={bootstrapSecret}
                                onChange={(e) => setBootstrapSecret(e.target.value)}
                            />
                            <button
                                onClick={handleBootstrap}
                                className="bg-gray-900 text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-black"
                            >
                                Promover
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </DashboardLayout>
    );
}
