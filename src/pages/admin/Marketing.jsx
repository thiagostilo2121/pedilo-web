import { useState, useEffect } from "react";
import { Plus, Trash2, Tag, Percent, Calendar, Edit, X, Check } from "lucide-react";
import { promotionsService } from "../../services/promotionsService";
import toast from "react-hot-toast";

import DashboardLayout from "../../layout/DashboardLayout";
import Skeleton from "../../components/ui/Skeleton";

export default function Marketing() {
    const [promotions, setPromotions] = useState([]);
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
        loadPromotions();
    }, []);

    const loadPromotions = async () => {
        try {
            setLoading(true);
            const data = await promotionsService.getAll();
            setPromotions(data);
        } catch (error) {
            console.error("Error loading promos", error);
            toast.error("Error al cargar promociones");
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
            loadPromotions();
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
            loadPromotions();
        } catch (error) {
            toast.error("Error al eliminar");
        }
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Marketing & Promociones</h1>
                        <p className="text-gray-500 mt-1">Gestiona cupones y ofertas para tus clientes</p>
                    </div>
                    <button
                        onClick={() => handleOpenModal()}
                        className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
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
                            <div key={promo.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-lg ${promo.activo ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                                        <Percent size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">{promo.nombre}</h4>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-700 font-mono text-xs border border-gray-200">
                                                {promo.codigo}
                                            </span>
                                            <span>• {promo.tipo === 'porcentaje' ? `${promo.valor}% OFF` : `$${promo.valor} OFF`}</span>
                                            {promo.reglas?.min_compra > 0 && <span>• Min: ${promo.reglas.min_compra}</span>}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleOpenModal(promo)}
                                        className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(promo.id)}
                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* MODAL */}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
                            <div className="px-6 py-4 border-b flex justify-between items-center">
                                <h3 className="font-bold text-lg">
                                    {editingPromo ? "Editar Promoción" : "Nueva Promoción"}
                                </h3>
                                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre (Interno)</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Ej. Promo Verano"
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                                        value={formData.nombre}
                                        onChange={e => setFormData({ ...formData, nombre: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Código de Cupón</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Ej. VERANO2026"
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none uppercase"
                                        value={formData.codigo}
                                        onChange={e => setFormData({ ...formData, codigo: e.target.value.toUpperCase() })}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                                        <select
                                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                                            value={formData.tipo}
                                            onChange={e => setFormData({ ...formData, tipo: e.target.value })}
                                        >
                                            <option value="porcentaje">Porcentaje (%)</option>
                                            <option value="monto_fijo">Monto Fijo ($)</option>
                                            {/* <option value="envio_gratis">Envío Gratis</option> */}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Valor</label>
                                        <input
                                            type="number"
                                            required
                                            min="0"
                                            placeholder="Ej. 10"
                                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                                            value={formData.valor}
                                            onChange={e => setFormData({ ...formData, valor: Number(e.target.value) })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Compra Mínima ($)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                                        value={formData.min_compra}
                                        onChange={e => setFormData({ ...formData, min_compra: Number(e.target.value) })}
                                    />
                                </div>

                                <div className="flex items-center gap-2 pt-2">
                                    <input
                                        type="checkbox"
                                        id="activo"
                                        className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
                                        checked={formData.activo}
                                        onChange={e => setFormData({ ...formData, activo: e.target.checked })}
                                    />
                                    <label htmlFor="activo" className="text-sm font-medium text-gray-700">Promoción Activa</label>
                                </div>

                                <div className="pt-4 flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium"
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
