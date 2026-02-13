import { useState, useEffect } from "react";
import { Plus, Trash2, Tag, Percent, Calendar, Edit, X, Check, Megaphone, Share2, DollarSign } from "lucide-react";
import { promotionsService } from "../../services/promotionsService";
import negocioService from "../../services/negocioService";
import toast from "react-hot-toast";

import DashboardLayout from "../../layout/DashboardLayout";
import Skeleton from "../../components/ui/Skeleton";
import FlyerGenerator from "../../components/marketing/FlyerGenerator";

export default function Marketing() {
    const [promotions, setPromotions] = useState([]);
    const [negocio, setNegocio] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingPromo, setEditingPromo] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        nombre: "",
        codigo: "",
        tipo: "porcentaje",
        valor: 0,
        min_compra: 0,
        activo: true
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const [promosData, negocioData] = await Promise.all([
                promotionsService.getAll(),
                negocioService.getMiNegocio()
            ]);
            setPromotions(promosData);
            setNegocio(negocioData);
        } catch (error) {
            console.error("Error loading data", error);
            toast.error("Error al cargar datos");
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (promo = null) => {
        if (promo) {
            setEditingPromo(promo);
            setFormData({
                nombre: promo.nombre,
                codigo: promo.codigo,
                tipo: promo.tipo,
                valor: promo.valor,
                min_compra: promo.reglas?.min_compra || 0,
                activo: promo.activo
            });
        } else {
            setEditingPromo(null);
            setFormData({
                nombre: "",
                codigo: "",
                tipo: "porcentaje",
                valor: 0,
                min_compra: 0,
                activo: true
            });
        }
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                reglas: { min_compra: Number(formData.min_compra) }
            };

            if (editingPromo) {
                await promotionsService.update(editingPromo.id, payload);
                toast.success("Promoción actualizada");
            } else {
                await promotionsService.create(payload);
                toast.success("Promoción creada");
            }
            setShowModal(false);
            loadData(); // Reload all data just in case
        } catch (error) {
            console.error(error);
            toast.error("Error al guardar promoción. Verifica el código.");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Seguro que deseas eliminar esta promoción?")) return;
        try {
            await promotionsService.delete(id);
            toast.success("Promoción eliminada");
            loadData();
        } catch (error) {
            toast.error("Error al eliminar");
        }
    };

    return (
        <DashboardLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pb-20 space-y-10">

                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-100 pb-6">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Marketing</h1>
                        <p className="text-gray-500 mt-2 font-medium max-w-2xl">Gestioná tus herramientas de venta, creá cupones de descuento y descargá material publicitario para tu local.</p>
                    </div>
                </div>

                {/* SECCIÓN CUPONES */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <Tag className="text-orange-500" size={24} />
                            Cupones Activos
                        </h2>
                        <button
                            onClick={() => handleOpenModal()}
                            className="group flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl hover:bg-gray-800 transition-all shadow-lg shadow-gray-200 active:scale-95"
                        >
                            <Plus size={18} className="group-hover:rotate-90 transition-transform" />
                            <span className="font-bold text-sm">Crear Cupón</span>
                        </button>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                                    <div className="flex justify-between">
                                        <Skeleton className="w-12 h-12 rounded-xl" />
                                        <Skeleton className="w-8 h-8 rounded-full" />
                                    </div>
                                    <Skeleton className="h-6 w-3/4" />
                                    <Skeleton className="h-4 w-1/2" />
                                    <Skeleton className="h-10 w-full rounded-xl" />
                                </div>
                            ))}
                        </div>
                    ) : promotions.length === 0 ? (
                        <div className="bg-white rounded-3xl shadow-sm border border-dashed border-gray-200 p-12 text-center flex flex-col items-center">
                            <div className="w-20 h-20 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mb-6 animate-pulse">
                                <Megaphone size={40} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No hay promociones activas</h3>
                            <p className="text-gray-400 max-w-sm mx-auto mb-8">
                                Creá tu primer cupón de descuento para incentivar a tus clientes y aumentar las ventas.
                            </p>
                            <button
                                onClick={() => handleOpenModal()}
                                className="text-orange-600 font-bold hover:text-orange-700 hover:underline transition-all"
                            >
                                + Crear mi primer cupón
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {promotions.map((promo) => (
                                <div
                                    key={promo.id}
                                    className={`group relative bg-white rounded-2xl shadow-sm border transition-all duration-300 hover:shadow-md hover:-translate-y-1 overflow-hidden 
                                        ${promo.activo ? 'border-gray-200' : 'border-gray-100 opacity-75 grayscale-[0.5] hover:grayscale-0'}`}
                                >
                                    {/* Status Indicator inside card */}
                                    <div className="absolute top-0 right-0 p-4 z-10">
                                        <div className={`w-2.5 h-2.5 rounded-full ${promo.activo ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-gray-300'}`} />
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-6">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className={`p-4 rounded-2xl ${promo.activo ? 'bg-orange-50 text-orange-600' : 'bg-gray-100 text-gray-400'}`}>
                                                {promo.tipo === 'porcentaje' ? <Percent size={28} strokeWidth={2.5} /> : <DollarSign size={28} strokeWidth={2.5} />}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 text-lg leading-tight line-clamp-1">{promo.nombre}</h4>
                                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                                    {promo.tipo === 'porcentaje' ? 'Descuento %' : 'Descuento fijo'}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 rounded-xl p-4 border border-dashed border-gray-200 mb-6 flex items-center justify-between relative overflow-hidden">
                                            <div className="relative z-10">
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">CÓDIGO</p>
                                                <p className="font-mono text-xl font-black text-gray-800 tracking-wider">{promo.codigo}</p>
                                            </div>
                                            <div className="text-right relative z-10">
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">VALOR</p>
                                                <p className="text-xl font-black text-orange-600">
                                                    {promo.tipo === 'porcentaje' ? `${promo.valor}%` : `$${promo.valor}`}
                                                </p>
                                            </div>
                                            {/* Watermark effect */}
                                            <div className="absolute -right-4 -bottom-4 text-gray-200 opacity-20 rotate-12 pointer-events-none">
                                                <Tag size={80} />
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between text-sm text-gray-500 font-medium">
                                            <div className="flex items-center gap-1.5">
                                                {promo.reglas?.min_compra > 0 ? (
                                                    <span className="bg-gray-100 px-2 py-1 rounded-md text-xs">Min. ${promo.reglas.min_compra}</span>
                                                ) : <span className="text-gray-400 text-xs">Sin mínimo de compra</span>}
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleOpenModal(promo)}
                                                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Editar"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(promo.id)}
                                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Eliminar"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Decorative circles to simulate coupon holes */}
                                    <div className="absolute -left-2 top-[58%] -translate-y-1/2 w-4 h-4 bg-gray-50 rounded-full border border-gray-100" />
                                    <div className="absolute -right-2 top-[58%] -translate-y-1/2 w-4 h-4 bg-gray-50 rounded-full border border-gray-100" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* SECCIÓN FLYER GENERATOR */}
                {negocio && (
                    <div className="space-y-6 pt-6 border-t border-gray-100">
                        <FlyerGenerator negocio={negocio} />
                    </div>
                )}

                {/* MODAL */}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all overflow-y-auto">
                        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100 my-auto">
                            <div className="px-6 sm:px-8 py-5 sm:py-6 border-b border-gray-50 flex justify-between items-center bg-white">
                                <div>
                                    <h3 className="font-black text-xl text-gray-900 tracking-tight">
                                        {editingPromo ? "Editar Promoción" : "Nueva Promoción"}
                                    </h3>
                                    <p className="text-sm text-gray-400 font-medium">Configurá los detalles del descuento</p>
                                </div>
                                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-900 p-2 hover:bg-gray-100 rounded-full transition-all active:scale-95">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 sm:space-y-6">
                                <div className="space-y-4">
                                    {/* Nombre */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Nombre Interno</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Ej. Promo Verano 2026"
                                            className="w-full px-4 py-3 bg-gray-50 border-gray-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400"
                                            value={formData.nombre}
                                            onChange={e => setFormData({ ...formData, nombre: e.target.value })}
                                        />
                                    </div>

                                    {/* Código */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Código del Cupón</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                                <Tag size={18} />
                                            </div>
                                            <input
                                                type="text"
                                                required
                                                placeholder="Ej. VERANO2026"
                                                className="w-full pl-11 pr-4 py-3 bg-gray-50 border-gray-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none uppercase font-mono font-bold tracking-wider text-gray-900 transition-all placeholder:text-gray-400"
                                                value={formData.codigo}
                                                onChange={e => setFormData({ ...formData, codigo: e.target.value.toUpperCase() })}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 sm:gap-5">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Tipo</label>
                                            <div className="relative">
                                                <select
                                                    className="w-full appearance-none px-4 py-3 bg-gray-50 border-gray-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium text-gray-900 cursor-pointer"
                                                    value={formData.tipo}
                                                    onChange={e => setFormData({ ...formData, tipo: e.target.value })}
                                                >
                                                    <option value="porcentaje">Porcentaje (%)</option>
                                                    <option value="monto">Fijo ($)</option>
                                                </select>
                                                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                                                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Valor</label>
                                            <input
                                                type="number"
                                                required
                                                min="0"
                                                className="w-full px-4 py-3 bg-gray-50 border-gray-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-bold text-gray-900"
                                                value={formData.valor}
                                                onChange={e => setFormData({ ...formData, valor: Number(e.target.value) })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Compra Mínima (Opcional)</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                                            <input
                                                type="number"
                                                min="0"
                                                placeholder="0"
                                                className="w-full pl-8 pr-4 py-3 bg-gray-50 border-gray-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400"
                                                value={formData.min_compra}
                                                onChange={e => setFormData({ ...formData, min_compra: Number(e.target.value) })}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 pt-2">
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <div className="relative">
                                                <input
                                                    type="checkbox"
                                                    className="peer sr-only"
                                                    checked={formData.activo}
                                                    onChange={e => setFormData({ ...formData, activo: e.target.checked })}
                                                />
                                                <div className="w-12 h-7 bg-gray-200 rounded-full peer peer-checked:bg-green-500 transition-all cursor-pointer"></div>
                                                <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-all peer-checked:translate-x-5 shadow-sm"></div>
                                            </div>
                                            <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900 select-none">Cupón Habilitado</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="pt-4 flex flex-col-reverse sm:flex-row gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 px-6 py-3.5 rounded-xl border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-all active:scale-95 text-center"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-6 py-3.5 rounded-xl bg-gray-900 text-white font-bold hover:bg-black transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2"
                                    >
                                        <Check size={20} />
                                        {editingPromo ? "Guardar" : "Crear Cupón"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
