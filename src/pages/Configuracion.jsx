/*
 * Copyright (C) 2026 Thiago Valentín Stilo Limarino
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

import { useEffect, useState, useRef } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { ExternalLink, Loader2, Save } from "lucide-react";
import { useToast } from "../contexts/ToastProvider";
import { useRequirePremium } from "../hooks/useRequirePremium";
import negocioService from "../services/negocioService";
import apiPublic from "../api/apiPublic";

// Components
import DatosNegocioPanel from "../components/configuracion/DatosNegocioPanel";
import LogisticaPanel from "../components/configuracion/LogisticaPanel";
import EstadoPanel from "../components/configuracion/EstadoPanel";

export default function ConfiguracionNegocio() {
  const [negocio, setNegocio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  // File states for DatosNegocioPanel
  const [logoFile, setLogoFile] = useState(null);
  const fileInputRef = useRef(null);
  const [bannerFile, setBannerFile] = useState(null);
  const bannerInputRef = useRef(null);

  const toast = useToast();

  const fetchNegocio = async () => {
    setLoading(true);
    try {
      const data = await negocioService.getMiNegocio();
      if (!data || typeof data !== "object") throw new Error("Formato inválido");
      setNegocio({
        ...data,
        metodos_pago: Array.isArray(data.metodos_pago) ? data.metodos_pago : [],
        tipos_entrega: Array.isArray(data.tipos_entrega) ? data.tipos_entrega : [],
      });
      setError(null);
    } catch (err) {
      console.error("Error al cargar configuración", err);
      setError("No se pudo cargar la configuración.");
      toast.error("Error al cargar la configuración.");
    } finally {
      setLoading(false);
    }
  };

  // Verificar suscripción premium y negocio
  useRequirePremium();

  useEffect(() => { fetchNegocio(); }, []);

  const handleSave = async () => {
    if (!negocio) return;
    if (!negocio.nombre?.trim()) {
      toast.error("El nombre del negocio es obligatorio.");
      return;
    }

    setSaving(true);
    try {
      let logoUrl = negocio.logo_url;
      if (logoFile) logoUrl = await negocioService.uploadImage(logoFile);

      let bannerUrl = negocio.banner_url;
      if (bannerFile) bannerUrl = await negocioService.uploadImage(bannerFile);

      const payload = {
        ...negocio,
        logo_url: logoUrl,
        banner_url: bannerUrl,
        slug: undefined
      };

      await negocioService.updateMiNegocio(payload);

      setLogoFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setBannerFile(null);
      if (bannerInputRef.current) bannerInputRef.current.value = "";
      toast.success("¡Cambios guardados con éxito!");
      fetchNegocio();
    } catch (err) {
      console.error("Error al guardar", err);
      const msg = err?.response?.data?.message || err.message || "Error al guardar.";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <DashboardLayout>
      <div className="animate-pulse space-y-8">
        {/* Skeleton Header */}
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 rounded w-48" />
            <div className="h-4 bg-gray-200 rounded w-64" />
          </div>
          <div className="flex gap-3">
            <div className="h-10 bg-gray-200 rounded-xl w-32" />
            <div className="h-10 bg-gray-200 rounded-xl w-40" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 h-64 space-y-4">
              <div className="h-6 bg-gray-200 rounded w-32" />
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="h-10 bg-gray-200 rounded-xl" />
                  <div className="h-24 bg-gray-200 rounded-xl" />
                </div>
                <div className="h-40 bg-gray-200 rounded-2xl" />
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 h-32" />
            <div className="bg-white p-6 rounded-2xl border border-gray-100 h-48" />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );

  if (error || !negocio) return (
    <DashboardLayout>
      <div className="flex h-96 flex-col items-center justify-center text-red-500">
        <p>{error || "No se pudo cargar el negocio."}</p>
        <button
          onClick={fetchNegocio}
          className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700"
        >
          Reintentar
        </button>
      </div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout>
      {/* Header con Acción Principal */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 sm:mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Configuración</h1>
          <p className="text-gray-500 text-sm sm:text-base">Personaliza la apariencia y logística de tu local.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              if (!negocio.slug) {
                toast.error("Tu negocio aún no tiene URL pública.");
                return;
              }
              window.open(`/n/${negocio.slug}`, "_blank");
            }}
            className="flex items-center justify-center gap-2 px-4 py-3 sm:py-2 text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 font-semibold transition-all active:scale-95"
          >
            <ExternalLink size={18} /> Ver mi tienda
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center justify-center gap-2 px-6 py-3 sm:py-2 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 disabled:bg-orange-300 transition-all shadow-lg shadow-orange-200 active:scale-95"
          >
            {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            {saving ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      </div>

      <div className="space-y-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna Izquierda: Identidad y Logística */}
          <div className="lg:col-span-2 space-y-6">
            <DatosNegocioPanel
              negocio={negocio}
              setNegocio={setNegocio}
              logoFile={logoFile}
              setLogoFile={setLogoFile}
              fileInputRef={fileInputRef}
              bannerFile={bannerFile}
              setBannerFile={setBannerFile}
              bannerInputRef={bannerInputRef}
            />
            <LogisticaPanel negocio={negocio} setNegocio={setNegocio} />
          </div>

          {/* Columna Derecha: Información de Contacto y Estado */}
          <div className="space-y-6">
            <EstadoPanel negocio={negocio} setNegocio={setNegocio} />
          </div>
        </div>
      </div >
    </DashboardLayout >
  );
}
