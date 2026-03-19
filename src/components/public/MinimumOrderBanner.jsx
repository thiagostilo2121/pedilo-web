import React from 'react';
import { calcularTotalCarrito } from '../../utils/precioUtils';

export default function MinimumOrderBanner({ carrito, negocio }) {
  if (negocio?.tipo_negocio !== 'distribuidora' || !(negocio.pedido_minimo > 0)) {
    return null;
  }

  const currentTotal = calcularTotalCarrito(carrito, negocio);
  const progress = Math.min(100, (currentTotal / negocio.pedido_minimo) * 100);
  const reached = currentTotal >= negocio.pedido_minimo;

  return (
    <div className="mx-4 mb-4 bg-white border border-gray-100 px-4 py-4 rounded-[1.5rem] shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">{reached ? '🎉' : '📦'}</span>
            <span className="text-sm font-bold text-gray-900">
              {reached ? '¡Mínimo alcanzado!' : 'Pedido mínimo'}
            </span>
          </div>
          <span className={`text-sm font-black ${reached ? 'text-green-500' : 'text-gray-900'}`}>
            ${currentTotal.toLocaleString()} <span className="text-xs text-gray-400 font-medium">/ ${negocio.pedido_minimo.toLocaleString()}</span>
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out ${reached ? 'bg-green-500' : 'bg-orange-500'}`}
            style={{
              width: `${progress}%`,
              backgroundColor: !reached ? (negocio.color_primario || '#f97316') : undefined
            }}
          />
        </div>

        {!reached && (
          <p className="text-[11px] text-gray-500 font-medium text-right mt-0.5 animate-pulse">
            Faltan <strong className="text-gray-900">${(negocio.pedido_minimo - currentTotal).toLocaleString()}</strong>
          </p>
        )}
      </div>
    </div>
  );
}
