/*
 * Copyright (C) 2026 Thiago Valentín Stilo Limarino
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */
import { ImageIcon, Trash2, Palette } from "lucide-react";

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
        <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <ImageIcon className="text-orange-500" size={20} /> Identidad Visual
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Nombre del Negocio</label>
                        <input
                            type="text"
                            value={negocio.nombre}
                            onChange={(e) => setNegocio({ ...negocio, nombre: e.target.value })}
                            className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Descripción corta</label>
                        <textarea
                            rows="3"
                            value={negocio.descripcion || ""}
                            onChange={(e) => setNegocio({ ...negocio, descripcion: e.target.value })}
                            className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                            placeholder="Contanos qué haces (ej: Las mejores pizzas a la leña)"
                        />
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-2xl p-4 bg-gray-50">
                    {(negocio.logo_url || logoFile) ? (
                        <div className="relative group">
                            <img
                                src={logoFile ? URL.createObjectURL(logoFile) : negocio.logo_url}
                                alt="Logo Preview"
                                className="h-32 w-32 object-cover rounded-2xl shadow-md"
                            />
                            <button
                                onClick={() => {
                                    setNegocio({ ...negocio, logo_url: "" });
                                    setLogoFile(null);
                                    if (fileInputRef.current) fileInputRef.current.value = "";
                                }}
                                className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    ) : (
                        <div className="text-center">
                            <div className="bg-white p-3 rounded-full shadow-sm mb-2 mx-auto w-fit text-gray-400">
                                <ImageIcon size={24} />
                            </div>
                            <p className="text-xs text-gray-500 mb-2">Sube tu logo (Max 2MB)</p>
                        </div>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                        className="mt-4 text-xs block w-full text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                    />
                </div>
            </div>

            {/* Colors Selection */}
            <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <Palette size={16} className="text-gray-400" /> Colores de Marca
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Color Principal</label>
                        <div className="flex items-center gap-3">
                            <div className="relative overflow-hidden w-10 h-10 rounded-full border border-gray-200 shadow-sm cursor-pointer hover:scale-105 transition-transform">
                                <input
                                    type="color"
                                    value={negocio.color_primario || "#ea580c"}
                                    onChange={(e) => setNegocio({ ...negocio, color_primario: e.target.value })}
                                    className="absolute -top-2 -left-2 w-16 h-16 cursor-pointer p-0 border-0"
                                />
                            </div>
                            <input
                                type="text"
                                value={negocio.color_primario || "#ea580c"}
                                onChange={(e) => setNegocio({ ...negocio, color_primario: e.target.value })}
                                className="flex-1 p-2 text-sm border border-gray-200 rounded-lg uppercase"
                                maxLength={7}
                            />
                        </div>
                        <p className="text-[10px] text-gray-400 mt-1">Botones, enlaces y barra de estado.</p>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Color Secundario</label>
                        <div className="flex items-center gap-3">
                            <div className="relative overflow-hidden w-10 h-10 rounded-full border border-gray-200 shadow-sm cursor-pointer hover:scale-105 transition-transform">
                                <input
                                    type="color"
                                    value={negocio.color_secundario || "#ffffff"}
                                    onChange={(e) => setNegocio({ ...negocio, color_secundario: e.target.value })}
                                    className="absolute -top-2 -left-2 w-16 h-16 cursor-pointer p-0 border-0"
                                />
                            </div>
                            <input
                                type="text"
                                value={negocio.color_secundario || "#ffffff"}
                                onChange={(e) => setNegocio({ ...negocio, color_secundario: e.target.value })}
                                className="flex-1 p-2 text-sm border border-gray-200 rounded-lg uppercase"
                                maxLength={7}
                            />
                        </div>
                        <p className="text-[10px] text-gray-400 mt-1">Fondos alternativos y detalles.</p>
                    </div>
                </div>
            </div>

            {/* Banner Upload */}
            <div className="mt-6 pt-6 border-t border-gray-100">
                <label className="block text-sm font-bold text-gray-700 mb-2">Banner de Portada (Opcional)</label>
                <div className="relative h-32 w-full rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 overflow-hidden group hover:border-orange-200 transition-colors">
                    {(negocio.banner_url || bannerFile) ? (
                        <>
                            <img
                                src={bannerFile ? URL.createObjectURL(bannerFile) : negocio.banner_url}
                                alt="Banner"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <button
                                    onClick={() => {
                                        setNegocio({ ...negocio, banner_url: "" });
                                        setBannerFile(null);
                                        if (bannerInputRef.current) bannerInputRef.current.value = "";
                                    }}
                                    className="bg-white text-red-500 p-2 rounded-full shadow-lg hover:bg-red-50"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 pointer-events-none">
                            <ImageIcon size={24} className="mb-1 opacity-50" />
                            <span className="text-xs">Click para subir banner</span>
                        </div>
                    )}

                    <input
                        type="file"
                        accept="image/*"
                        ref={bannerInputRef}
                        onChange={(e) => setBannerFile(e.target.files?.[0] || null)}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                </div>
                <p className="text-[10px] text-gray-400 mt-1">Se verá con un efecto borroso en el fondo de tu tienda.</p>
            </div>
        </section>
    );
}
