/*
 * Copyright (C) 2026 Thiago Valentín Stilo Limarino
 */

import { useState, useEffect } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import adminService from "../../services/adminService";
import { Search, ChevronLeft, ChevronRight, Store, Plus, X, Award } from "lucide-react";
import DynamicIcon from "../../components/common/DynamicIcon";

export default function AdminNegocios() {
    const [negocios, setNegocios] = useState([]);
    const [definitions, setDefinitions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const limit = 20;

    // Modal state
    const [selectedNegocio, setSelectedNegocio] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        loadData();
    }, [page]);

    useEffect(() => {
        adminService.getBadgeDefinitions().then(setDefinitions).catch(console.error);
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const data = await adminService.getNegocios(page, limit, search);
            setNegocios(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(0);
        loadData();
    };

    const openBadgeModal = (negocio) => {
        setSelectedNegocio(negocio);
        setModalOpen(true);
    };

    const handleAddBadge = async (badgeId) => {
        if (!selectedNegocio) return;
        try {
            await adminService.assignBadge(selectedNegocio.id, badgeId);
            // Update local state
            const updated = negocios.map(n =>
                n.id === selectedNegocio.id
                    ? { ...n, badges: [...n.badges, badgeId] }
                    : n
            );
            setNegocios(updated);
            setSelectedNegocio(prev => ({ ...prev, badges: [...prev.badges, badgeId] }));
        } catch (error) {
            alert("Error asignando badge: " + error.message);
        }
    };

    const handleRemoveBadge = async (badgeId) => {
        if (!selectedNegocio) return;
        if (!confirm(`¿Remover badge ${badgeId}?`)) return;

        try {
            await adminService.removeBadge(selectedNegocio.id, badgeId);
            // Update local state
            const updated = negocios.map(n =>
                n.id === selectedNegocio.id
                    ? { ...n, badges: n.badges.filter(b => b !== badgeId) }
                    : n
            );
            setNegocios(updated);
            setSelectedNegocio(prev => ({ ...prev, badges: prev.badges.filter(b => b !== badgeId) }));
        } catch (error) {
            alert("Error removiendo badge");
        }
    };

    return (
        <DashboardLayout>
            <div className="max-w-[1600px] mx-auto space-y-6 px-4 md:px-8 py-6 relative">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <h1 className="text-2xl font-black text-gray-900">Gestión de Negocios</h1>

                    <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
                        <input
                            type="text"
                            placeholder="Buscar por nombre o slug..."
                            className="px-4 py-2 rounded-xl border border-gray-200 w-full md:w-64"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button type="submit" className="bg-gray-900 text-white p-2 rounded-xl">
                            <Search size={20} />
                        </button>
                    </form>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-4">ID</th>
                                    <th className="px-6 py-4">Negocio</th>
                                    <th className="px-6 py-4">Slug</th>
                                    <th className="px-6 py-4 text-center">Pedidos</th>
                                    <th className="px-6 py-4 text-left">Badges</th>
                                    <th className="px-6 py-4 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <tr><td colSpan="6" className="p-8 text-center text-gray-400">Cargando...</td></tr>
                                ) : negocios.length === 0 ? (
                                    <tr><td colSpan="6" className="p-8 text-center text-gray-400">No se encontraron negocios</td></tr>
                                ) : (
                                    negocios.map(negocio => (
                                        <tr key={negocio.id} className="hover:bg-gray-50/50">
                                            <td className="px-6 py-4 font-mono text-gray-400">#{negocio.id}</td>
                                            <td className="px-6 py-4 font-bold text-gray-900 flex items-center gap-2">
                                                <Store size={16} className={negocio.activo ? "text-green-500" : "text-gray-300"} />
                                                {negocio.nombre}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 font-mono text-xs">{negocio.slug}</td>
                                            <td className="px-6 py-4 text-center font-bold">{negocio.total_pedidos}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap gap-1">
                                                    {negocio.badges.length > 0 ? (
                                                        negocio.badges.map(b => (
                                                            <span key={b} className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded text-[10px] font-bold border border-blue-100">
                                                                {b}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <span className="text-gray-300 text-xs">-</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <button
                                                    onClick={() => openBadgeModal(negocio)}
                                                    className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                                                >
                                                    Gestionar Badges
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/50">
                        <button
                            disabled={page === 0}
                            onClick={() => setPage(p => Math.max(0, p - 1))}
                            className="flex items-center gap-1 text-sm font-bold text-gray-500 disabled:opacity-50 hover:text-gray-900"
                        >
                            <ChevronLeft size={16} /> Anterior
                        </button>
                        <span className="text-xs font-bold text-gray-400">Página {page + 1}</span>
                        <button
                            disabled={negocios.length < limit}
                            onClick={() => setPage(p => p + 1)}
                            className="flex items-center gap-1 text-sm font-bold text-gray-500 disabled:opacity-50 hover:text-gray-900"
                        >
                            Siguiente <ChevronRight size={16} />
                        </button>
                    </div>
                </div>

                {/* BADGE MODAL */}
                {modalOpen && selectedNegocio && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                        <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
                            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                                <div>
                                    <h2 className="text-xl font-black text-gray-900">Badges de {selectedNegocio.nombre}</h2>
                                    <p className="text-xs text-gray-500 font-medium">Gestionar insignias exclusivas</p>
                                </div>
                                <button onClick={() => setModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Badges Asignados</h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedNegocio.badges.length > 0 ? (
                                        selectedNegocio.badges.map(badgeId => {
                                            const def = definitions.find(d => d.id === badgeId);
                                            return (
                                                <div key={badgeId} className="flex items-center gap-2 bg-blue-50 text-blue-800 px-3 py-1.5 rounded-lg border border-blue-100">
                                                    <DynamicIcon name={def?.icon} size={16} />
                                                    <span className="text-xs font-bold">{def?.name || badgeId}</span>
                                                    <button onClick={() => handleRemoveBadge(badgeId)} className="hover:text-red-500 ml-1">
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <p className="text-sm text-gray-400 italic">Sin badges asignados.</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Disponibles para Asignar</h3>
                                <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-2">
                                    {definitions.filter(d => !selectedNegocio.badges.includes(d.id)).map(def => (
                                        <button
                                            key={def.id}
                                            onClick={() => handleAddBadge(def.id)}
                                            className="text-left flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-orange-50 hover:border-orange-200 group transition-all"
                                        >
                                            <div className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-lg group-hover:bg-white text-lg shadow-sm">
                                                <DynamicIcon name={def.icon} size={18} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="font-bold text-gray-900 text-xs truncate">{def.name}</div>
                                                <div className="text-[10px] text-gray-400 truncate">{def.type === 'manual' ? '(Manual)' : '(Auto)'}</div>
                                            </div>
                                            <div className="opacity-0 group-hover:opacity-100 text-orange-500">
                                                <Plus size={16} />
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                                <button onClick={() => setModalOpen(false)} className="px-5 py-2.5 bg-gray-900 text-white font-bold rounded-xl text-sm hover:bg-black transition-colors">
                                    Listo
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </DashboardLayout>
    );
}
