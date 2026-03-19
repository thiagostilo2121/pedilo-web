import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getBadgeMetadata } from '../../utils/badgeUtils';
import DynamicIcon from '../common/DynamicIcon';
import { calcularTotalCarrito } from '../../utils/precioUtils';

export default function StickyNavBar({ negocio, slug, scrolled }) {
  const navigate = useNavigate();

  return (
    <nav className={`sticky top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-xl shadow-sm py-3' : 'bg-transparent py-4'}`}>
      <div className="max-w-4xl mx-auto mb-0 px-4 flex justify-between items-center">
        {/* Left Side */}
        <div className={`flex items-center gap-3 transition-all duration-300 ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          {negocio.logo_url && <img src={negocio.logo_url} className="w-8 h-8 rounded-full border border-gray-200" alt="Logo" />}
          <span className="font-extrabold text-gray-900 text-sm truncate max-w-[150px]">{negocio.nombre}</span>
          {negocio.insignias?.length > 0 && (() => {
            const meta = getBadgeMetadata(negocio.insignias[0]);
            if (!meta) return null;
            return (
              <div
                className={`flex items-center justify-center w-6 h-6 rounded-full shadow-sm border border-white/50 bg-gradient-to-br ${meta.bgGradient} text-white`}
                title={meta.name}
              >
                <DynamicIcon name={meta.icon} size={12} />
              </div>
            );
          })()}
        </div>
        
        {/* Right Side - Orders Button */}
        <div className="flex items-center gap-3 ml-auto">
          <button 
            onClick={() => navigate(`/n/${slug}/pedidos`)} 
            className={`relative p-2.5 rounded-full transition-all active:scale-95 ${scrolled ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : 'bg-black/20 text-white backdrop-blur-md hover:bg-black/30'}`}
          >
            <ShoppingBag size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}
