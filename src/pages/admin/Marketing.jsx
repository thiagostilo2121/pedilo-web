import { useState, useEffect } from "react";
import { Plus, Trash2, Tag, Percent, Calendar, Edit, X, Check } from "lucide-react";
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
            <div className="space-y-12 pb-20">
                {/* SECCIÓN PROMOCIONES */}
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Marketing & Promociones</h1>
                            <p className="text-gray-500 mt-1">Gestiona cupones y ofertas para tus clientes</p>
                        </div>
                        <button
                            onClick={() => handleOpenModal()}
                            className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors shadow-sm shadow-orange-200 font-medium"
                        >
                            <Plus size={20} />
                            Crear Promoción
                        </button>
                    </div>

                    {loading ? (
                        <div className="grid gap-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                                    <div className="flex items-center gap-4 w-full">
                                        <Skeleton className="w-12 h-12 rounded-lg shrink-0" />
                                        <div className="space-y-2 w-full">
                                            <Skeleton className="h-5 w-48" />
                                            <Skeleton className="h-4 w-32" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : promotions.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                            <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Tag size={32} />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">No tienes promociones activas</h3>
                            <p className="text-gray-500 mt-2 max-w-md mx-auto">
                                Crea cupones de descuento o promociones automáticas para incentivar las ventas.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {promotions.map((promo) => (
                                <div key={promo.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between group hover:border-orange-200 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-lg ${promo.activo ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                                            <Percent size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">{promo.nombre}</h4>
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <span className="bg-gray-100 px-2.5 py-1 rounded-md text-gray-700 font-mono text-xs border border-gray-200 font-bold tracking-wide">
                                                    {promo.codigo}
                                                </span>
                                                <span>• {promo.tipo === 'porcentaje' ? `${promo.valor}% OFF` : `$${promo.valor} OFF`}</span>
                                                {promo.reglas?.min_compra > 0 && <span>• Min: ${promo.reglas.min_compra}</span>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => handleOpenModal(promo)}
                                            className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
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
                            ))}
                        </div>
                    )}
                </div>

                {/* SECCIÓN FLYER GENERATOR (Nuevo) */}
                {negocio && (
                    <div className="pt-8 border-t border-gray-200">
                        <FlyerGenerator negocio={negocio} />
                    </div>
                )}

                {/* MODAL */}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                            <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50/50">
                                <h3 className="font-bold text-lg text-gray-900">
                                    {editingPromo ? "Editar Promoción" : "Nueva Promoción"}
                                </h3>
                                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1 rounded-full transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nombre (Interno)</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Ej. Promo Verano"
                                        className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all shadow-sm"
                                        value={formData.nombre}
                                        onChange={e => setFormData({ ...formData, nombre: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Código de Cupón</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                            <Tag size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Ej. VERANO2026"
                                            className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none uppercase font-mono transition-all shadow-sm"
                                            value={formData.codigo}
                                            onChange={e => setFormData({ ...formData, codigo: e.target.value.toUpperCase() })}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tipo</label>
                                        <select
                                            className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all shadow-sm bg-white"
                                            value={formData.tipo}
                                            onChange={e => setFormData({ ...formData, tipo: e.target.value })}
                                        >
                                            <option value="porcentaje">Porcentaje (%)</option>
                                            <option value="monto_fijo">Monto Fijo ($)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Valor</label>
                                        <input
                                            type="number"
                                            required
                                            min="0"
                                            placeholder="Ej. 10"
                                            className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all shadow-sm"
                                            value={formData.valor}
                                            onChange={e => setFormData({ ...formData, valor: Number(e.target.value) })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Compra Mínima ($)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all shadow-sm"
                                        value={formData.min_compra}
                                        onChange={e => setFormData({ ...formData, min_compra: Number(e.target.value) })}
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Dejar en 0 si no aplica.</p>
                                </div>

                                <div className="flex items-center gap-3 pt-2 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                    <div className="flex items-center h-5">
                                        <input
                                            type="checkbox"
                                            id="activo"
                                            className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500 border-gray-300"
                                            checked={formData.activo}
                                            onChange={e => setFormData({ ...formData, activo: e.target.checked })}
                                        />
                                    </div>
                                    <label htmlFor="activo" className="text-sm font-medium text-gray-800 cursor-pointer select-none">
                                        Activar Promoción inmediatamente
                                    </label>
                                </div>

                                <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl font-semibold transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2.5 bg-orange-600 text-white rounded-xl hover:bg-orange-700 font-bold shadow-lg shadow-orange-200 transition-all hover:-translate-y-0.5"
                                    >
                                        {editingPromo ? "Guardar Cambios" : "Crear Promoción"}
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
