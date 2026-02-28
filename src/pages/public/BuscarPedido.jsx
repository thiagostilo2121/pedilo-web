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

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import pedidosService from "../../services/pedidosService";
import apiPublic from "../../api/apiPublic";
import {
  ChevronLeft,
  Search,
  Package,
  HandPlatter,
  ChefHat,
  CheckCircle2,
  Clock,
  AlertCircle,
  MessageSquare
} from "lucide-react";

export default function SeguimientoPedido() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [negocio, setNegocio] = useState(null);
  const [fetchingNegocio, setFetchingNegocio] = useState(true);
  const [codigo, setCodigo] = useState("");
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar info del negocio y último pedido
  useEffect(() => {
    const fetchNegocio = async () => {
      try {
        const data = await apiPublic.get(`/${slug}`);
        setNegocio(data.data);
      } catch (err) {
        console.error("Error cargando negocio", err);
      } finally {
        setFetchingNegocio(false);
      }
    };
    fetchNegocio();

    const lastCode = localStorage.getItem(`ultimo_pedido_${slug}`);
    if (lastCode) {
      setCodigo(lastCode);
    }
  }, [slug]);

  const buscarPedido = async (e) => {
    if (e) e.preventDefault();
    if (!codigo) return;

    try {
      setLoading(true);
      setError(null);
      const data = await pedidosService.getByCode(slug, codigo.toUpperCase());
      setPedido(data);
      // Guardar en historial
      localStorage.setItem(`ultimo_pedido_${slug}`, codigo.toUpperCase());
    } catch (err) {
      setError("No encontramos ningún pedido con ese código. Revisalo e intentá de nuevo.");
      setPedido(null);
    } finally {
      setLoading(false);
    }
  };

  // Polling: Actualizar cada 30s si hay un pedido activo en pantalla
  useEffect(() => {
    let interval;
    if (pedido && ['pendiente', 'aceptado', 'en_progreso'].includes(pedido.estado)) {
      interval = setInterval(() => {
        buscarPedido(); // Re-fetch silencioso (aunque activará loading spinner en botón por un microsegundo, es aceptable)
      }, 30000);
    }
    return () => clearInterval(interval);
  }, [pedido]);

  const estados = [
    { id: 'pendiente', label: 'Recibido', icon: Clock, color: 'from-orange-400 to-orange-600', description: 'Estamos procesando tu pedido.' },
    { id: 'aceptado', label: 'Confirmado', icon: CheckCircle2, color: 'from-blue-400 to-blue-600', description: '¡Tu pedido fue aceptado!' },
    { id: 'en_progreso', label: 'Cocinando', icon: ChefHat, color: 'from-purple-400 to-purple-600', description: 'Preparando algo delicioso.' },
    { id: 'finalizado', label: 'Listo', icon: CheckCircle2, color: 'from-green-400 to-green-600', description: '¡Tu pedido está listo!' },
  ];

  if (fetchingNegocio) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent animate-spin rounded-full" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFCFB] pb-12 font-sans selection:bg-orange-100 selection:text-orange-900">
      {/* Dynamic Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-md bg-white/80">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate(`/n/${slug}`)}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-all active:scale-90"
          >
            <ChevronLeft size={24} className="text-gray-700" />
          </button>

          <div className="flex flex-col items-center">
            {negocio?.logo_url ? (
              <img src={negocio.logo_url} alt={negocio.nombre} className="h-8 w-auto object-contain" />
            ) : (
              <h1 className="font-extrabold text-lg text-gray-900 tracking-tight">{negocio?.nombre}</h1>
            )}
          </div>

          <div className="w-10" /> {/* Spacer for balance */}
        </div>
      </div>

      <main className="max-w-2xl mx-auto px-4 pt-8">
        {/* Search Hero */}
        {!pedido && (
          <div className="text-center mb-10 mt-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-3xl font-black text-gray-900 mb-2 leading-tight">
              ¿Cómo va tu <span className="text-orange-600">pedido?</span>
            </h2>
            <p className="text-gray-500 text-sm max-w-[280px] mx-auto">
              Ingresá el código de 6 dígitos que recibiste para ver el estado en tiempo real.
            </p>
          </div>
        )}

        <div className={`transition-all duration-500 ${pedido ? 'scale-95 opacity-50 mb-4' : 'mb-8'}`}>
          <div className="bg-white p-2 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100">
            <form onSubmit={buscarPedido} className="flex gap-2">
              <div className="relative flex-1 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-orange-500 transition-colors" size={20} />
                <input
                  type="text"
                  placeholder="Código (ej: #D12F3A)"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 sm:py-5 bg-transparent rounded-[2rem] focus:outline-none font-bold uppercase tracking-widest text-gray-800 placeholder:text-gray-300 placeholder:normal-case placeholder:tracking-normal sm:text-lg"
                />
              </div>
              <button
                disabled={loading}
                className="bg-gray-900 text-white px-6 sm:px-10 rounded-[2rem] font-black uppercase text-xs tracking-widest hover:bg-orange-600 transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-gray-200"
              >
                {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin rounded-full" /> : "Buscar"}
              </button>
            </form>
          </div>
          {error && (
            <div className="mt-4 px-6 flex justify-center">
              <p className="text-red-500 text-xs font-bold flex items-center gap-1.5 bg-red-50 px-4 py-2 rounded-full border border-red-100 animate-in fade-in zoom-in duration-300">
                <AlertCircle size={14} /> {error}
              </p>
            </div>
          )}
        </div>

        {/* Status Content */}
        {loading && !pedido ? (
          <div className="space-y-6 animate-pulse">
            <div className="bg-white p-12 rounded-[3rem] border border-gray-100 h-80 shadow-sm flex flex-col items-center justify-center gap-4">
              <div className="w-20 h-20 bg-gray-100 rounded-full" />
              <div className="h-6 bg-gray-100 rounded w-48" />
              <div className="h-2 bg-gray-50 rounded w-full mt-4" />
            </div>
          </div>
        ) : pedido && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Status Big Card */}
            <div className="bg-white p-8 sm:p-12 rounded-[3.5rem] shadow-2xl shadow-gray-200/40 border border-gray-50 relative overflow-hidden group">
              {/* Background Glow */}
              <div className={`absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br transition-all duration-1000 opacity-10 blur-[80px] rounded-full ${estados.find(e => e.id === pedido.estado)?.color || 'from-orange-500 to-orange-600'}`} />

              <div className="relative z-10 text-center flex flex-col items-center">
                <div className={`mb-6 p-6 rounded-full bg-gradient-to-br shadow-xl transition-all duration-700 scale-110 ${estados.find(e => e.id === pedido.estado)?.color || 'from-gray-500 to-gray-700'} text-white ring-8 ring-white shadow-2xl shadow-gray-200`}>
                  {(() => {
                    const Icon = estados.find(e => e.id === pedido.estado)?.icon || Clock;
                    return <Icon size={48} className="animate-in zoom-in duration-500" />;
                  })()}
                </div>

                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6">Estado del pedido</span>
                <h2 className={`text-4xl font-black tracking-tighter uppercase italic leading-none mb-5 ${estados.find(e => e.id === pedido.estado)?.color.includes('orange') ? 'text-orange-600' : 'text-gray-900'}`}>
                  {pedido.estado.replace('_', ' ')}
                </h2>
                <p className="text-gray-500 text-sm font-medium mb-10 max-w-[240px]">
                  {estados.find(e => e.id === pedido.estado)?.description || 'Actualizando información...'}
                </p>

                {/* Progress Visual */}
                <div className="w-full max-w-[320px] mx-auto px-4">
                  <div className="relative flex justify-between">
                    <div className="absolute top-4 left-0 w-full h-1 bg-gray-100 -z-0 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r transition-all duration-1000 ${estados.find(e => e.id === pedido.estado)?.color}`}
                        style={{ width: `${(estados.findIndex(e => e.id === pedido.estado) + 1) * 25}%` }}
                      />
                    </div>
                    {estados.map((est, index) => {
                      const esPasado = estados.findIndex(e => e.id === pedido.estado) >= index;
                      const Icon = est.icon;
                      return (
                        <div key={est.id} className="relative z-10 flex flex-col items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 border-4 border-white shadow-md ${esPasado ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-300'}`}>
                            <Icon size={12} />
                          </div>
                          <span className={`text-[8px] font-black uppercase tracking-tighter ${esPasado ? 'text-gray-900' : 'text-gray-200'}`}>{est.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions & Detail */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* WhatsApp Support */}
              <button
                onClick={() => {
                  const msg = `¡Hola ${negocio?.nombre}! Tengo una consulta sobre mi pedido #${pedido.codigo}.`;
                  window.open(`https://wa.me/${(negocio?.codigo_pais || "") + negocio?.telefono}?text=${encodeURIComponent(msg)}`);
                }}
                className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-3 group active:scale-95"
              >
                <div className="w-10 h-10 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                  <MessageSquare size={20} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Soporte</p>
                  <p className="text-sm font-bold text-gray-800">Chat WhatsApp</p>
                </div>
              </button>

              {/* Order Info */}
              <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600">
                  <Package size={20} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Identificación</p>
                  <p className="text-sm font-bold text-gray-800">Pedido #{pedido.codigo}</p>
                </div>
              </div>
            </div>

            {/* Detail Card */}
            <div className="bg-white p-8 sm:p-10 rounded-[3rem] shadow-xl shadow-gray-200/30 border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-black text-gray-900 tracking-tight">Tu Compra</h3>
                <span className="bg-gray-50 text-gray-500 font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-widest">
                  {pedido.items.length} {pedido.items.length === 1 ? 'item' : 'items'}
                </span>
              </div>

              <div className="space-y-6">
                {pedido.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start group">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center font-black text-gray-400 text-sm group-hover:bg-orange-50 group-hover:text-orange-600 group-hover:border-orange-100 transition-colors">
                        {item.cantidad}x
                      </div>
                      <div className="pt-1">
                        <p className="font-bold text-gray-800 text-sm sm:text-base leading-tight">
                          {item.nombre_producto}
                        </p>
                        {item.toppings_seleccionados && item.toppings_seleccionados.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {(() => {
                              const counts = item.toppings_seleccionados.reduce((acc, t) => {
                                acc[t.nombre] = (acc[t.nombre] || 0) + 1;
                                return acc;
                              }, {});
                              return Object.entries(counts).map(([name, count], i) => (
                                <span key={i} className="text-[10px] bg-gray-50 text-gray-500 px-2 py-0.5 rounded-md font-medium">
                                  {count > 1 ? `${count}x ${name}` : name}
                                </span>
                              ));
                            })()}
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="font-black text-gray-900 pt-1 tracking-tight">${item.subtotal}</p>
                  </div>
                ))}

                <div className="pt-8 border-t border-dashed border-gray-200 mt-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 font-black uppercase text-[10px] tracking-widest">Subtotal</span>
                    <span className="text-gray-500 font-bold">${pedido.total + (pedido.descuento_aplicado || 0)}</span>
                  </div>
                  {pedido.descuento_aplicado > 0 && (
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-green-500 font-black uppercase text-[10px] tracking-widest">Descuento</span>
                      <span className="text-green-600 font-bold">-${pedido.descuento_aplicado}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-gray-900 uppercase tracking-widest leading-none mb-2">Total Pagado</span>
                      <span className="text-[10px] text-gray-400 font-bold">{pedido.metodo_pago.replace('_', ' ')}</span>
                    </div>
                    <span className="text-3xl font-black text-orange-600 tracking-tighter">${pedido.total}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer with support */}
            <div className="text-center pt-8 pb-4">
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                Desarrollado con ❤️ por <span className="text-gray-900">Pedilo</span>
              </p>
            </div>
          </div>
        )}
      </main>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-up { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-in { animation: fade-in 0.5s ease-out; }
        .slide-up { animation: slide-up 0.6s ease-out; }
      `}} />
    </div>
  );
}