/*
 * Copyright (C) 2026 Thiago Valentín Stilo Limarino
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */
import { ImageIcon, Trash2, Palette, AlertCircle, UploadCloud, Type } from "lucide-react";

export default function DatosNegocioPanel({
    negocio,
    setNegocio,
    logoFile,
    setLogoFile,
    fileInputRef,
    bannerFile,
    setBannerFile,
    bannerInputRef
}) {
    return (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-8">

            {/* SECCIÓN INFORMACIÓN BÁSICA */}
            <div className="space-y-6">
                <div className="flex items-center gap-2 mb-2">
                    <Type className="text-gray-400" size={18} />
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Información Básica</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Nombre del Negocio</label>
                            <input
                                type="text"
                                value={negocio.nombre}
                                onChange={(e) => setNegocio({ ...negocio, nombre: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border-gray-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-bold text-gray-900 placeholder:text-gray-400"
                                placeholder="Ej. Burger King"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Descripción Corta</label>
                            <textarea
                                rows="3"
                                value={negocio.descripcion || ""}
                                onChange={(e) => setNegocio({ ...negocio, descripcion: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border-gray-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium text-gray-900 resize-none"
                                placeholder="La mejor hamburguesa de la ciudad..."
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                                Anuncio Web <span className="text-orange-500 text-[10px] normal-case tracking-normal ml-1">(Marquesina)</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={negocio.anuncio_web || ""}
                                    onChange={(e) => setNegocio({ ...negocio, anuncio_web: e.target.value })}
                                    className="w-full pl-4 pr-16 py-3 bg-gray-50 border-gray-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium text-gray-900"
                                    placeholder="Ej: ¡Envío GRATIS este finde!"
                                    maxLength={120}
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400">
                                    {negocio.anuncio_web?.length || 0}/120
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* LOGO UPLOAD */}
                    <div className="flex flex-col gap-2">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Logotipo</label>
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="flex-1 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50 hover:bg-white hover:border-orange-300 transition-all cursor-pointer flex flex-col items-center justify-center p-6 group relative overflow-hidden"
                        >
                            {(negocio.logo_url || logoFile) ? (
                                <div className="relative z-10">
                                    <img
                                        src={logoFile ? URL.createObjectURL(logoFile) : negocio.logo_url}
                                        alt="Logo Preview"
                                        className="w-32 h-32 object-cover rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute -top-2 -right-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setNegocio({ ...negocio, logo_url: "" });
                                                setLogoFile(null);
                                                if (fileInputRef.current) fileInputRef.current.value = "";
                                            }}
                                            className="bg-white text-red-500 p-1.5 rounded-full shadow-md hover:bg-red-50 transition-colors"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center space-y-3 z-10">
                                    <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto text-orange-500 group-hover:scale-110 transition-transform">
                                        <UploadCloud size={24} />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-bold text-gray-700 group-hover:text-orange-600 transition-colors">Subir Logo</p>
                                        <p className="text-[10px] text-gray-400 font-medium">PNG, JPG (Max 2MB)</p>
                                    </div>
                                </div>
                            )}

                            {/* Hidden Input */}
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                                className="hidden"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <hr className="border-gray-100" />

            {/* SECCIÓN COLORES */}
            <div className="space-y-6">
                <div className="flex items-center gap-2 mb-2">
                    <Palette className="text-gray-400" size={18} />
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Identidad de Marca</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Color Primario */}
                    <div className="group">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Color Principal</label>
                        <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-xl border border-gray-100 group-hover:border-gray-200 transition-colors">
                            <div className="relative overflow-hidden w-12 h-12 rounded-lg shadow-sm shrink-0 cursor-pointer hover:scale-105 active:scale-95 transition-transform">
                                <input
                                    type="color"
                                    value={negocio.color_primario || "#ea580c"}
                                    onChange={(e) => setNegocio({ ...negocio, color_primario: e.target.value })}
                                    className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] cursor-pointer p-0 border-0"
                                />
                            </div>
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={negocio.color_primario || "#ea580c"}
                                    onChange={(e) => setNegocio({ ...negocio, color_primario: e.target.value })}
                                    className="w-full bg-transparent font-mono text-sm font-bold text-gray-700 outline-none uppercase"
                                    maxLength={7}
                                />
                                <p className="text-[10px] text-gray-400 font-medium mt-0.5">Botones y destacados</p>
                            </div>
                        </div>
                    </div>

                    {/* Color Secundario */}
                    <div className="group">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Color Secundario</label>
                        <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-xl border border-gray-100 group-hover:border-gray-200 transition-colors">
                            <div className="relative overflow-hidden w-12 h-12 rounded-lg shadow-sm shrink-0 cursor-pointer hover:scale-105 active:scale-95 transition-transform">
                                <input
                                    type="color"
                                    value={negocio.color_secundario || "#ffffff"}
                                    onChange={(e) => setNegocio({ ...negocio, color_secundario: e.target.value })}
                                    className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] cursor-pointer p-0 border-0"
                                />
                            </div>
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={negocio.color_secundario || "#ffffff"}
                                    onChange={(e) => setNegocio({ ...negocio, color_secundario: e.target.value })}
                                    className="w-full bg-transparent font-mono text-sm font-bold text-gray-700 outline-none uppercase"
                                    maxLength={7}
                                />
                                <p className="text-[10px] text-gray-400 font-medium mt-0.5">Fondos y detalles</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-orange-50 rounded-xl p-4 flex gap-3 items-start">
                    <AlertCircle className="text-orange-500 shrink-0 mt-0.5" size={18} />
                    <div>
                        <h4 className="font-bold text-orange-900 text-sm">Vista Previa</h4>
                        <p className="text-xs text-orange-800/80 mt-1 leading-relaxed">
                            Los colores elegidos se aplicarán automáticamente a tu <span className="font-bold">Menú Digital</span>.
                            Asegurate de que el contraste sea legible.
                        </p>
                    </div>
                </div>
            </div>

            <hr className="border-gray-100" />

            {/* SECCIÓN BANNER */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <ImageIcon className="text-gray-400" size={18} />
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Banner de Portada</h3>
                    </div>
                    <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-1 rounded-md uppercase">Opcional</span>
                </div>

                <div
                    onClick={() => bannerInputRef.current?.click()}
                    className="relative w-full h-40 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 overflow-hidden group hover:border-orange-300 transition-all cursor-pointer"
                >
                    {(negocio.banner_url || bannerFile) ? (
                        <>
                            <img
                                src={bannerFile ? URL.createObjectURL(bannerFile) : negocio.banner_url}
                                alt="Banner"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-[2px]">
                                <span className="text-white font-bold text-sm bg-black/20 px-4 py-2 rounded-full backdrop-blur-md">Cambiar Imagen</span>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setNegocio({ ...negocio, banner_url: "" });
                                        setBannerFile(null);
                                        if (bannerInputRef.current) bannerInputRef.current.value = "";
                                    }}
                                    className="bg-white text-red-500 p-2 rounded-full shadow-lg hover:bg-red-50 transition-transform hover:scale-110"
                                    title="Eliminar Banner"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 space-y-2 group-hover:text-orange-500 transition-colors">
                            <div className="p-3 bg-white rounded-full shadow-sm group-hover:shadow-md transition-shadow">
                                <ImageIcon size={24} />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider">Subir Banner</span>
                        </div>
                    )}

                    <input
                        type="file"
                        accept="image/*"
                        ref={bannerInputRef}
                        onChange={(e) => setBannerFile(e.target.files?.[0] || null)}
                        className="hidden"
                    />
                </div>
                <p className="text-[10px] text-gray-400 font-medium mt-2 ml-1">
                    Se recomienda una imagen horizontal de al menos 1200x400px.
                </p>
            </div>
        </div>
    );
}
