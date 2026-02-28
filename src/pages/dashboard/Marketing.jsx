import { useState, useEffect } from "react";
import { Plus, Trash2, Tag, Percent, Calendar, Edit, X, Check, Megaphone, Share2, DollarSign, Lock, CalendarDays } from "lucide-react";
import { promotionsService } from "../../services/promotionsService";
import negocioService from "../../services/negocioService";
import productService from "../../services/productService";
import toast from "react-hot-toast";

import DashboardLayout from "../../layout/DashboardLayout";
import Skeleton from "../../components/ui/Skeleton";
import FlyerGenerator from "../../components/marketing/FlyerGenerator";
import PageHeader from "../../components/dashboard/PageHeader";
import PrimaryButton from "../../components/dashboard/PrimaryButton";
import EmptyState from "../../components/dashboard/EmptyState";
import ModalShell from "../../components/dashboard/ModalShell";
import { useAuth } from "../../contexts/AuthProvider";

export default function Marketing() {
    const { user } = useAuth();
    const [promotions, setPromotions] = useState([]);
    const [negocio, setNegocio] = useState(null);
    const [productosList, setProductosList] = useState([]);
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
        activo: true,
        fecha_fin: "",
        limite_usos_total: "",
        dias_semana: [],
        reglas: {
            buy_x: 2,
            get_y: 1,
            productos_ids: []
        }
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const [promosData, negocioData, prodsData] = await Promise.all([
                promotionsService.getAll(),
                negocioService.getMiNegocio(),
                productService.getAll()
            ]);
            setPromotions(promosData);
            setNegocio(negocioData);
            setProductosList(prodsData);
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
                activo: promo.activo,
                fecha_fin: promo.fecha_fin ? promo.fecha_fin.split('T')[0] : "",
                limite_usos_total: promo.limite_usos_total || "",
                dias_semana: promo.reglas?.dias_semana || [],
                reglas: {
                    buy_x: promo.reglas?.buy_x || 2,
                    get_y: promo.reglas?.get_y || 1,
                    productos_ids: promo.reglas?.productos_ids || []
                }
            });
        } else {
            setEditingPromo(null);
            setFormData({
                nombre: "",
                codigo: "",
                tipo: "porcentaje",
                valor: 0,
                min_compra: 0,
                activo: true,
                fecha_fin: "",
                limite_usos_total: "",
                dias_semana: [],
                reglas: {
                    buy_x: 2,
                    get_y: 1,
                    productos_ids: []
                }
            });
        }
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.tipo === 'n_por_m' && (!formData.reglas.productos_ids || formData.reglas.productos_ids.length === 0)) {
                toast.error("Debes seleccionar al menos un producto para aplicar la promoción N x M.");
                return;
            }

            const payload = {
                ...formData,
                valor: formData.tipo === 'n_por_m' ? 0 : formData.valor,
                reglas: {
                    min_compra: Number(formData.min_compra),
                    ...(formData.dias_semana.length > 0 && { dias_semana: formData.dias_semana }),
                    ...(formData.tipo === 'n_por_m' && {
                        buy_x: Number(formData.reglas.buy_x),
                        get_y: Number(formData.reglas.get_y),
                        productos_ids: formData.reglas.productos_ids
                    })
                }
            };

            if (!payload.fecha_fin) payload.fecha_fin = null;
            if (!payload.limite_usos_total) payload.limite_usos_total = null;
            else payload.limite_usos_total = Number(payload.limite_usos_total);

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

                <PageHeader
                    title="Marketing"
                    subtitle="Gestioná tus herramientas de venta, creá cupones de descuento y descargá material publicitario para tu local."
                    borderBottom
                />

                {/* SECCIÓN CUPONES */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-zinc-100 flex items-center gap-2">
                            <Tag className="text-orange-500" size={24} />
                            Cupones Activos
                        </h2>
                        <PrimaryButton onClick={() => handleOpenModal()} icon={Plus} iconRotate size="sm">
                            Crear Cupón
                        </PrimaryButton>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/10 space-y-4">
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
                        <EmptyState
                            icon={Megaphone}
                            title="No hay promociones activas"
                            description="Creá tu primer cupón de descuento para incentivar a tus clientes y aumentar las ventas."
                            actionLabel="Crear mi primer cupón"
                            onAction={() => handleOpenModal()}
                        />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {promotions.map((promo) => (
                                <div
                                    key={promo.id}
                                    className={`group relative bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border transition-all duration-300 hover:shadow-md hover:-translate-y-1 overflow-hidden 
                                        ${promo.activo ? 'border-gray-200 dark:border-white/10' : 'border-gray-100 dark:border-white/10 opacity-75 grayscale-[0.5] hover:grayscale-0'}`}
                                >
                                    {/* Status Indicator inside card */}
                                    <div className="absolute top-0 right-0 p-4 z-10">
                                        <div className={`w-2.5 h-2.5 rounded-full ${promo.activo ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-gray-300'}`} />
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-4 sm:p-6">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className={`p-3 sm:p-4 rounded-2xl ${promo.activo ? 'bg-orange-50 text-orange-600' : 'bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-zinc-500'}`}>
                                                {promo.tipo === 'porcentaje' ? <Percent size={24} className="sm:w-7 sm:h-7" strokeWidth={2.5} /> :
                                                    promo.tipo === 'n_por_m' ? <Tag size={24} className="sm:w-7 sm:h-7" strokeWidth={2.5} /> :
                                                        <DollarSign size={24} className="sm:w-7 sm:h-7" strokeWidth={2.5} />}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 dark:text-zinc-100 text-base sm:text-lg leading-tight line-clamp-1">{promo.nombre}</h4>
                                                <span className="text-[10px] sm:text-xs font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-wider">
                                                    {promo.tipo === 'porcentaje' ? 'Descuento %' :
                                                        promo.tipo === 'n_por_m' ? `Promo ${promo.reglas?.buy_x || 2}x${promo.reglas?.get_y || 1}` :
                                                            'Descuento fijo'}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-3 sm:p-4 border border-dashed border-gray-200 dark:border-white/10 mb-4 sm:mb-6 flex items-center justify-between relative overflow-hidden">
                                            <div className="relative z-10">
                                                <p className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest mb-1">CÓDIGO</p>
                                                <p className="font-mono text-lg sm:text-xl font-black text-gray-800 dark:text-zinc-200 tracking-wider">{promo.codigo}</p>
                                            </div>
                                            <div className="text-right relative z-10">
                                                <p className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest mb-1">VALOR</p>
                                                <p className="text-lg sm:text-xl font-black text-orange-600">
                                                    {promo.tipo === 'porcentaje' ? `${promo.valor}%` :
                                                        promo.tipo === 'n_por_m' ? 'N/A' :
                                                            `$${promo.valor}`}
                                                </p>
                                            </div>
                                            {/* Watermark effect */}
                                            <div className="absolute -right-4 -bottom-4 text-gray-200 opacity-20 rotate-12 pointer-events-none">
                                                <Tag size={80} />
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-zinc-400 font-medium">
                                            <div className="flex items-center gap-1.5">
                                                {promo.reglas?.min_compra > 0 ? (
                                                    <span className="bg-gray-100 dark:bg-white/5 px-2 py-1 rounded-md text-xs">Min. ${promo.reglas.min_compra}</span>
                                                ) : <span className="text-gray-400 dark:text-zinc-500 text-xs">Sin mínimo de compra</span>}
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleOpenModal(promo)}
                                                    className="p-2 text-gray-400 dark:text-zinc-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Editar"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(promo.id)}
                                                    className="p-2 text-gray-400 dark:text-zinc-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Eliminar"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Decorative circles to simulate coupon holes */}
                                    <div className="absolute -left-2 top-[58%] -translate-y-1/2 w-4 h-4 bg-gray-50 dark:bg-white/5 rounded-full border border-gray-100 dark:border-white/10" />
                                    <div className="absolute -right-2 top-[58%] -translate-y-1/2 w-4 h-4 bg-gray-50 dark:bg-white/5 rounded-full border border-gray-100 dark:border-white/10" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* SECCIÓN FLYER GENERATOR */}
                {negocio && (
                    <div className="space-y-6 pt-6 border-t border-gray-100 dark:border-white/10">
                        <FlyerGenerator negocio={negocio} />
                    </div>
                )}

                {/* MODAL */}
                <ModalShell
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    title={editingPromo ? "Editar Promoción" : "Nueva Promoción"}
                    subtitle="Configurá los detalles del descuento"
                    footer={
                        <div className="flex flex-col-reverse sm:flex-row gap-3">
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="flex-1 px-6 py-3.5 rounded-xl border border-gray-200 dark:border-white/10 text-gray-700 dark:text-zinc-300 font-bold hover:bg-gray-50 dark:hover:bg-white/5 transition-all active:scale-95 text-center"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                form="promo-form"
                                className="flex-1 px-6 py-3.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-zinc-900 font-bold hover:bg-black dark:hover:bg-zinc-200 transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2"
                            >
                                <Check size={20} />
                                {editingPromo ? "Guardar" : "Crear Cupón"}
                            </button>
                        </div>
                    }
                >

                    <form id="promo-form" onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 sm:space-y-6">
                        <div className="space-y-4">
                            {/* Nombre */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest">Nombre Interno</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Ej. Promo Verano 2026"
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/10 rounded-xl focus:bg-white dark:focus:bg-zinc-800 dark:bg-zinc-900 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium text-gray-900 dark:text-zinc-100 placeholder:text-gray-400 dark:text-zinc-500"
                                    value={formData.nombre}
                                    onChange={e => setFormData({ ...formData, nombre: e.target.value })}
                                />
                            </div>

                            {/* Código */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest">Código del Cupón</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 dark:text-zinc-500">
                                        <Tag size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Ej. VERANO2026"
                                        className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/10 rounded-xl focus:bg-white dark:focus:bg-zinc-800 dark:bg-zinc-900 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none uppercase font-mono font-bold tracking-wider text-gray-900 dark:text-zinc-100 transition-all placeholder:text-gray-400 dark:text-zinc-500"
                                        value={formData.codigo}
                                        onChange={e => setFormData({ ...formData, codigo: e.target.value.toUpperCase() })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 sm:gap-5">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest">Tipo</label>
                                    <div className="relative">
                                        <select
                                            className="w-full appearance-none px-4 py-3 bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/10 rounded-xl focus:bg-white dark:focus:bg-zinc-800 dark:bg-zinc-900 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium text-gray-900 dark:text-zinc-100 cursor-pointer"
                                            value={formData.tipo}
                                            onChange={e => setFormData({ ...formData, tipo: e.target.value })}
                                        >
                                            <option value="porcentaje">Porcentaje (%)</option>
                                            <option value="monto_fijo">Fijo ($)</option>
                                            <option value="n_por_m">Lleva X, Paga Y</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400 dark:text-zinc-500">
                                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                        </div>
                                    </div>
                                </div>
                                {formData.tipo !== 'n_por_m' && (
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest">Valor</label>
                                        <input
                                            type="number"
                                            required
                                            min="0"
                                            className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/10 rounded-xl focus:bg-white dark:focus:bg-zinc-800 dark:bg-zinc-900 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-bold text-gray-900 dark:text-zinc-100"
                                            value={formData.valor}
                                            onChange={e => setFormData({ ...formData, valor: Number(e.target.value) })}
                                        />
                                    </div>
                                )}
                            </div>

                            {formData.tipo === 'n_por_m' && (
                                <div className="grid grid-cols-2 gap-4 sm:gap-5 bg-orange-50/50 dark:bg-orange-500/5 p-4 rounded-xl border border-orange-100 dark:border-orange-500/20">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-orange-700 dark:text-orange-400 uppercase tracking-widest">Llevas (Total)</label>
                                        <input
                                            type="number"
                                            required
                                            min="2"
                                            className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border-orange-200 dark:border-orange-500/30 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-bold text-gray-900 dark:text-zinc-100"
                                            value={formData.reglas.buy_x}
                                            onChange={e => setFormData({ ...formData, reglas: { ...formData.reglas, buy_x: Number(e.target.value) } })}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-orange-700 dark:text-orange-400 uppercase tracking-widest">Pagas (Abonas)</label>
                                        <input
                                            type="number"
                                            required
                                            min="1"
                                            className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border-orange-200 dark:border-orange-500/30 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-bold text-gray-900 dark:text-zinc-100"
                                            value={formData.reglas.get_y}
                                            onChange={e => setFormData({ ...formData, reglas: { ...formData.reglas, get_y: Number(e.target.value) } })}
                                        />
                                    </div>
                                    <div className="col-span-2 pt-1 flex justify-center pb-2">
                                        <span className="text-xs font-bold text-orange-600/80 dark:text-orange-400/80 bg-orange-100 dark:bg-orange-500/10 px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5">
                                            <Tag size={12} />
                                            ¡El cliente ahorra {Math.max(0, formData.reglas.buy_x - formData.reglas.get_y)} producto(s) por cada {formData.reglas.buy_x}!
                                        </span>
                                    </div>

                                    <div className="col-span-2 space-y-3 pt-4 border-t border-orange-200/50 dark:border-orange-500/20">
                                        <div className="flex items-center justify-between">
                                            <label className="text-xs font-bold text-orange-700 dark:text-orange-400 uppercase tracking-widest">
                                                Participantes <span className="text-red-500">*</span>
                                            </label>
                                            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 bg-white/50 dark:bg-zinc-900 px-2.5 py-1 rounded-md">
                                                {formData.reglas.productos_ids.length} Seleccionados
                                            </span>
                                        </div>
                                        <div className="max-h-60 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                                            {(() => {
                                                const productosAgrupados = productosList.reduce((acc, producto) => {
                                                    const cat = producto.categoria || "Sin categoría";
                                                    if (!acc[cat]) acc[cat] = [];
                                                    acc[cat].push(producto);
                                                    return acc;
                                                }, {});

                                                if (Object.keys(productosAgrupados).length === 0) {
                                                    return (
                                                        <div className="p-4 text-center text-gray-500 dark:text-zinc-500 text-sm">
                                                            No tienes productos registrados en tu menú.
                                                        </div>
                                                    );
                                                }

                                                return Object.entries(productosAgrupados).map(([catNombre, prods]) => (
                                                    <div key={catNombre} className="space-y-2">
                                                        <h5 className="text-xs font-bold text-gray-400 dark:text-zinc-500 uppercase sticky top-0 bg-orange-50/90 dark:bg-zinc-800/90 backdrop-blur-sm z-10 py-1">
                                                            {catNombre}
                                                        </h5>
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                            {prods.map(producto => {
                                                                const isSelected = formData.reglas.productos_ids.includes(producto.id);
                                                                return (
                                                                    <button
                                                                        key={producto.id}
                                                                        type="button"
                                                                        onClick={() => {
                                                                            const prevIds = formData.reglas.productos_ids;
                                                                            setFormData({
                                                                                ...formData,
                                                                                reglas: {
                                                                                    ...formData.reglas,
                                                                                    productos_ids: isSelected
                                                                                        ? prevIds.filter(id => id !== producto.id)
                                                                                        : [...prevIds, producto.id]
                                                                                }
                                                                            });
                                                                        }}
                                                                        className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${isSelected
                                                                            ? 'bg-orange-500/5 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500 shadow-sm'
                                                                            : 'bg-white dark:bg-zinc-900 text-gray-700 dark:text-zinc-300 border-gray-200 dark:border-white/10 hover:border-orange-300 dark:hover:border-orange-500/50'
                                                                            }`}
                                                                    >
                                                                        <span className="font-medium text-sm line-clamp-1 flex-1 pr-2">{producto.nombre}</span>
                                                                        <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border-2 ${isSelected
                                                                            ? 'border-orange-500 bg-orange-500 text-white'
                                                                            : 'border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-zinc-800'
                                                                            }`}>
                                                                            {isSelected && <Check size={12} strokeWidth={4} />}
                                                                        </div>
                                                                    </button>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                ));
                                            })()}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest">Compra Mínima (Opcional)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500 font-bold">$</span>
                                    <input
                                        type="number"
                                        min="0"
                                        placeholder="0"
                                        className="w-full pl-8 pr-4 py-3 bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/10 rounded-xl focus:bg-white dark:focus:bg-zinc-800 dark:bg-zinc-900 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium text-gray-900 dark:text-zinc-100 placeholder:text-gray-400 dark:text-zinc-500"
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
                                        <div className="w-12 h-7 bg-gray-200 dark:bg-white/10 rounded-full peer peer-checked:bg-green-500 transition-all cursor-pointer"></div>
                                        <div className="absolute left-1 top-1 w-5 h-5 bg-white dark:bg-zinc-900 rounded-full transition-all peer-checked:translate-x-5 shadow-sm"></div>
                                    </div>
                                    <span className="text-sm font-bold text-gray-700 dark:text-zinc-300 group-hover:text-gray-900 dark:hover:text-zinc-100 dark:text-zinc-100 select-none">Cupón Habilitado</span>
                                </label>
                            </div>

                            {/* CONFIGURACIÓN AVANZADA (PRO) */}
                            <div className="pt-6 mt-4 border-t border-gray-100 dark:border-white/10 relative">
                                <h3 className="text-sm font-black text-gray-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
                                    <CalendarDays size={18} className="text-purple-500" /> Configuración Avanzada (Pro)
                                </h3>

                                {user?.plan_actual !== 'pro' && (
                                    <div className="absolute inset-x-0 bottom-0 top-12 z-10 backdrop-blur-[3px] bg-white/40 dark:bg-zinc-900/40 rounded-xl flex items-center justify-center border border-gray-100 dark:border-white/5">
                                        <div className="bg-white dark:bg-zinc-800 p-4 rounded-2xl shadow-xl border border-gray-200 dark:border-white/10 text-center max-w-xs mx-auto">
                                            <div className="bg-purple-100 dark:bg-purple-500/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                                <Lock size={20} className="text-purple-600 dark:text-purple-400" />
                                            </div>
                                            <h4 className="font-bold text-gray-900 dark:text-zinc-100 mb-1">Función exclusiva Pro</h4>
                                            <p className="text-xs text-gray-500 dark:text-zinc-400 mb-4 px-2">Mejorá tu plan para configurar vencimientos, límites y días festivos específicos.</p>
                                            <button type="button" onClick={() => window.location.href = '/dashboard/suscripcion'} className="text-sm font-bold bg-purple-600 text-white px-5 py-2.5 rounded-xl hover:bg-purple-700 transition-colors w-full shadow-md hover:shadow-lg">
                                                Mejorar a Plan Pro
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className={`space-y-4 ${user?.plan_actual !== 'pro' ? 'opacity-30 pointer-events-none select-none blur-[2px]' : ''}`}>
                                    <div className="grid grid-cols-2 gap-4 sm:gap-5">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest">Vencimiento</label>
                                            <input
                                                type="date"
                                                className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/10 rounded-xl focus:bg-white dark:focus:bg-zinc-800 dark:bg-zinc-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all font-medium text-gray-900 dark:text-zinc-100"
                                                value={formData.fecha_fin}
                                                onChange={e => setFormData({ ...formData, fecha_fin: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest">Usos Totales</label>
                                            <input
                                                type="number"
                                                min="1"
                                                placeholder="Ilimitado"
                                                className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/10 rounded-xl focus:bg-white dark:focus:bg-zinc-800 dark:bg-zinc-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all font-medium text-gray-900 dark:text-zinc-100 placeholder:text-gray-400 dark:text-zinc-500"
                                                value={formData.limite_usos_total}
                                                onChange={e => setFormData({ ...formData, limite_usos_total: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2 pt-1 border-t border-dashed border-gray-200 dark:border-white/10 mt-3 flex flex-col items-start">
                                        <label className="text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest pt-2">Días Válidos</label>
                                        <div className="flex flex-wrap gap-2">
                                            {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, idx) => {
                                                const isSelected = formData.dias_semana.includes(idx);
                                                return (
                                                    <button
                                                        type="button"
                                                        key={idx}
                                                        onClick={() => {
                                                            const newDays = isSelected
                                                                ? formData.dias_semana.filter(d => d !== idx)
                                                                : [...formData.dias_semana, idx];
                                                            setFormData({ ...formData, dias_semana: newDays });
                                                        }}
                                                        className={`w-10 h-10 rounded-lg font-bold text-sm flex items-center justify-center transition-all ${isSelected ? 'bg-purple-100 text-purple-700 dark:bg-purple-500/30 dark:text-purple-300 border border-purple-200 dark:border-purple-500/50' : 'bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-zinc-400 border border-gray-100 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10'}`}
                                                    >
                                                        {day}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                        <p className="text-[10px] text-gray-400 dark:text-zinc-500 mt-1">Si no seleccionás ninguno, será válido todos los días.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </ModalShell>
            </div>
        </DashboardLayout>
    );
}
