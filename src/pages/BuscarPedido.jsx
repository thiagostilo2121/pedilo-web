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
import pedidosService from "../services/pedidosService";
import {
  ChevronLeft,
  Search,
  Package,
  HandPlatter,
  ChefHat,
  CheckCircle2,
  Clock,
  AlertCircle
} from "lucide-react";

export default function SeguimientoPedido() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [codigo, setCodigo] = useState("");
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar último pedido buscado al iniciar
  useEffect(() => {
    const lastCode = localStorage.getItem(`ultimo_pedido_${slug}`);
    if (lastCode) {
      setCodigo(lastCode);
      // Opcional: Auto-buscar si hay código? Mejor dejar que el usuario toque "Buscar" para no spamear o confundir.
      // Pero podríamos mostrar un botón "Ver último: #..."
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
    { id: 'pendiente', label: 'Recibido', icon: Clock, color: 'text-orange-500' },
    { id: 'aceptado', label: 'Aceptado', icon: CheckCircle2, color: 'text-blue-500' },
    { id: 'en_progreso', label: 'En Progreso', icon: ChefHat, color: 'text-purple-500' },
    { id: 'finalizado', label: 'Finalizado', icon: HandPlatter, color: 'text-green-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Navbar Simple */}
      <nav className="bg-white shadow-sm p-4 mb-6">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <button onClick={() => navigate(`/n/${slug}`)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ChevronLeft size={24} />
          </button>
          <h1 className="font-bold text-xl">Seguimiento de Pedido</h1>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4">
        {/* Buscador */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl shadow-sm border border-gray-100 mb-6">
          <p className="text-gray-500 text-sm mb-4">Ingresá el código que recibiste al finalizar tu compra para ver el estado en tiempo real.</p>
          <form onSubmit={buscarPedido} className="flex gap-2">
            <input
              type="text"
              placeholder="Ej: #A1B2C3"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              className="flex-1 p-3 sm:p-4 border-2 border-gray-100 rounded-2xl focus:border-orange-500 outline-none font-bold uppercase text-sm sm:text-base"
            />
            <button
              disabled={loading}
              className="bg-orange-600 text-white p-3 sm:p-4 rounded-2xl font-bold hover:bg-orange-700 transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white border-t-transparent animate-spin rounded-full" /> : <Search className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </form>
          {error && <p className="mt-3 text-red-500 text-sm font-medium flex items-center gap-1"><AlertCircle size={14} /> {error}</p>}
        </div>

        {/* Resultado del Pedido (con Skeleton) */}
        {loading ? (
          <div className="space-y-6 animate-pulse">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 h-64 flex flex-col items-center justify-center space-y-4">
              <div className="h-4 bg-gray-200 rounded w-24" />
              <div className="h-10 bg-gray-200 rounded w-48" />
              <div className="h-12 bg-gray-100 rounded-full w-full mt-8" />
            </div>
            <div className="bg-white p-6 rounded-3xl border border-gray-100 h-40" />
          </div>
        ) : pedido && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Estado Visual */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="text-center mb-8">
                <span className="text-xs font-black uppercase tracking-widest text-gray-400">Estado Actual</span>
                <h2 className="text-3xl font-black text-gray-900 mt-1 uppercase italic italic">
                  {pedido.estado.replace('_', ' ')}
                </h2>
              </div>

              {/* Línea de Tiempo */}
              <div className="relative flex justify-between">
                <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-100 -z-0" />
                {estados.map((est, index) => {
                  const esPasado = estados.findIndex(e => e.id === pedido.estado) >= index;
                  const Icon = est.icon;
                  return (
                    <div key={est.id} className="relative z-10 flex flex-col items-center gap-2">
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors duration-500 ${esPasado ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-300'}`}>
                        <Icon size={16} className="sm:hidden" />
                        <Icon size={20} className="hidden sm:block" />
                      </div>
                      <span className={`text-[9px] sm:text-[10px] font-bold uppercase ${esPasado ? 'text-orange-600' : 'text-gray-300'}`}>{est.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Resumen de Productos */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="font-bold mb-4 border-b pb-2">Detalle de tu pedido</h3>
              <div className="space-y-3">
                {pedido.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start text-sm">
                    <div className="flex gap-2 min-w-0">
                      <span className="text-gray-600 font-medium whitespace-nowrap">{item.cantidad}x</span>
                      <div>
                        <span className="text-gray-600 font-medium">{item.nombre_producto}</span>
                        {item.toppings_seleccionados && item.toppings_seleccionados.length > 0 && (
                          <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">
                            {(() => {
                              const counts = item.toppings_seleccionados.reduce((acc, t) => {
                                acc[t.nombre] = (acc[t.nombre] || 0) + 1;
                                return acc;
                              }, {});
                              return Object.entries(counts)
                                .map(([name, count]) => count > 1 ? `${count}x ${name}` : name)
                                .join(", ");
                            })()}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="font-bold ml-2">${(item.subtotal).toFixed(0)}</span>
                  </div>
                ))}
                <div className="pt-3 border-t flex justify-between items-center">
                  <span className="font-black text-gray-900 uppercase text-xs">Total pagado</span>
                  <span className="text-xl font-black text-orange-600">${pedido.total}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}