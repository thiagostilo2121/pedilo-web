/*
 * Copyright (C) 2026 Thiago Valentín Stilo Limarino
 */

import { useState, useEffect } from "react";
import DashboardLayout from "../../../layout/DashboardLayout";
import adminService from "../../../services/adminService";
import { Search, ChevronLeft, ChevronRight, Check, X, Shield, Star } from "lucide-react";

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const limit = 20;

    useEffect(() => {
        loadUsers();
    }, [page]);

    const loadUsers = async () => {
        setLoading(true);
        try {
            const data = await adminService.getUsers(page, limit, search);
            setUsers(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(0);
        loadUsers();
    };

    const togglePremium = async (userId) => {
        try {
            const updated = await adminService.togglePremium(userId);
            setUsers(users.map(u => u.id === userId ? { ...u, es_premium: updated.es_premium } : u));
        } catch (error) {
            alert("Error cambiando estado premium");
        }
    };

    return (
        <DashboardLayout>
            <div className="max-w-[1600px] mx-auto space-y-6 px-4 md:px-8 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <h1 className="text-2xl font-black text-gray-900 dark:text-zinc-100">Gestión de Usuarios</h1>

                    <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
                        <input
                            type="text"
                            placeholder="Buscar por nombre o email..."
                            className="px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 w-full md:w-64"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button type="submit" className="bg-gray-900 text-white p-2 rounded-xl">
                            <Search size={20} />
                        </button>
                    </form>
                </div>

                <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-sm border border-gray-100 dark:border-white/10 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-zinc-400 font-bold uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-4">ID</th>
                                    <th className="px-6 py-4">Usuario</th>
                                    <th className="px-6 py-4">Email</th>
                                    <th className="px-6 py-4 text-center">Admin</th>
                                    <th className="px-6 py-4 text-center">Premium</th>
                                    <th className="px-6 py-4 text-center">Negocio</th>
                                    <th className="px-6 py-4 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <tr><td colSpan="7" className="p-8 text-center text-gray-400 dark:text-zinc-500">Cargando...</td></tr>
                                ) : users.length === 0 ? (
                                    <tr><td colSpan="7" className="p-8 text-center text-gray-400 dark:text-zinc-500">No se encontraron usuarios</td></tr>
                                ) : (
                                    users.map(user => (
                                        <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-white/5/50">
                                            <td className="px-6 py-4 font-mono text-gray-400 dark:text-zinc-500">#{user.id}</td>
                                            <td className="px-6 py-4 font-bold text-gray-900 dark:text-zinc-100">{user.nombre || "-"}</td>
                                            <td className="px-6 py-4 text-gray-600 dark:text-zinc-400">{user.email}</td>
                                            <td className="px-6 py-4 text-center">
                                                {user.es_admin ? <Shield size={16} className="mx-auto text-purple-600" /> : "-"}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {user.es_premium ? (
                                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold">
                                                        <Star size={12} fill="currentColor" /> PREMIUM
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-400 dark:text-zinc-500 text-xs">FREE</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {user.tiene_negocio ? <Check size={16} className="mx-auto text-green-500" /> : <X size={16} className="mx-auto text-gray-300" />}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <button
                                                    onClick={() => togglePremium(user.id)}
                                                    className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline"
                                                >
                                                    {user.es_premium ? "Quitar Premium" : "Dar Premium"}
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 dark:border-white/10 bg-gray-50/50">
                        <button
                            disabled={page === 0}
                            onClick={() => setPage(p => Math.max(0, p - 1))}
                            className="flex items-center gap-1 text-sm font-bold text-gray-500 dark:text-zinc-400 disabled:opacity-50 hover:text-gray-900 dark:hover:text-zinc-100 dark:text-zinc-100"
                        >
                            <ChevronLeft size={16} /> Anterior
                        </button>
                        <span className="text-xs font-bold text-gray-400 dark:text-zinc-500">Página {page + 1}</span>
                        <button
                            disabled={users.length < limit}
                            onClick={() => setPage(p => p + 1)}
                            className="flex items-center gap-1 text-sm font-bold text-gray-500 dark:text-zinc-400 disabled:opacity-50 hover:text-gray-900 dark:hover:text-zinc-100 dark:text-zinc-100"
                        >
                            Siguiente <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
