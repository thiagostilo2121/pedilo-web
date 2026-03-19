import React from 'react';
import { LayoutGrid, List } from 'lucide-react';

export default function CatalogHeader({ negocio, productosLength, viewMode, setViewMode, searchTerm }) {
  if (searchTerm || productosLength === 0) return null;

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between items-center mb-6 mt-8 animate-in fade-in slide-in-from-bottom-2 duration-500 px-4 md:px-0">
      <div className="flex flex-col items-center md:items-start text-center md:text-left select-none pointer-events-none mb-4 md:mb-0">
        <span className="text-[10px] font-black uppercase tracking-[0.8em] text-gray-400 ml-[0.8em] md:ml-0">Catálogo</span>
        <div className="flex items-center gap-2 mt-2">
          <div className="w-1.5 h-1.5 rounded-full opacity-60" style={{ backgroundColor: negocio?.color_primario || '#f97316' }} />
          <span className="text-[10.5px] font-bold text-gray-400 uppercase tracking-widest">{productosLength} Variedades</span>
          <div className="w-1.5 h-1.5 rounded-full opacity-60 hidden md:block" style={{ backgroundColor: negocio?.color_primario || '#f97316' }} />
        </div>
      </div>

      <div className="bg-white p-1 rounded-xl flex items-center gap-1 shadow-sm border border-gray-100">
        <button
          onClick={() => setViewMode("grid")}
          className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 text-xs font-bold ${viewMode === 'grid' ? 'bg-gray-100 text-gray-900 shadow-inner' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
        >
          <LayoutGrid size={16} /> Grilla
        </button>
        <button
          onClick={() => setViewMode("list")}
          className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 text-xs font-bold ${viewMode === 'list' ? 'bg-gray-100 text-gray-900 shadow-inner' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
        >
          <List size={16} /> Lista
        </button>
      </div>
    </div>
  );
}
