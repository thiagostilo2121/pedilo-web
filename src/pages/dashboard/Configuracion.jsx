/*
 * Copyright (C) 2026 Thiago Valentín Stilo Limarino
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

import { useEffect, useState, useRef } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { ExternalLink, Loader2, Save, Store, Truck, Clock } from "lucide-react";
import { useToast } from "../../contexts/ToastProvider";
import { useRequirePremium } from "../../hooks/useRequirePremium";
import negocioService from "../../services/negocioService";

// Components
import DatosNegocioPanel from "../../components/configuracion/DatosNegocioPanel";
import LogisticaPanel from "../../components/configuracion/LogisticaPanel";
import EstadoPanel from "../../components/configuracion/EstadoPanel";
import PageHeader from "../../components/dashboard/PageHeader";
import PrimaryButton from "../../components/dashboard/PrimaryButton";
import Skeleton from "../../components/ui/Skeleton";

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

      // Actualizar cache para el header
      sessionStorage.setItem("negocio_info", JSON.stringify({ ...negocio, logo_url: logoUrl, banner_url: bannerUrl }));

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 space-y-8 animate-pulse">
        {/* Skeleton Header */}
        <div className="flex justify-between items-center pb-6 border-b border-gray-100 dark:border-white/10">
          <div className="space-y-3">
            <Skeleton className="h-10 w-64 rounded-xl" />
            <Skeleton className="h-4 w-96 rounded-lg" />
          </div>
          <Skeleton className="h-12 w-40 rounded-xl" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-8">
            <Skeleton className="h-96 rounded-3xl" />
            <Skeleton className="h-64 rounded-3xl" />
          </div>
          <Skeleton className="h-80 rounded-3xl" />
        </div>
      </div>
    </DashboardLayout>
  );

  if (error || !negocio) return (
    <DashboardLayout>
      <div className="flex h-[80vh] flex-col items-center justify-center text-center p-4">
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
          <Store size={40} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-zinc-100 mb-2">Error al cargar</h3>
        <p className="text-gray-500 dark:text-zinc-400 mb-8 max-w-sm">{error || "No se pudo cargar la información de tu negocio. Por favor, intenta nuevamente."}</p>
        <button
          onClick={fetchNegocio}
          className="px-8 py-3 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-200 hover:-translate-y-1"
        >
          Reintentar Carga
        </button>
      </div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pb-24">

        {/* HEADER & ACTIONS */}
        <PageHeader
          title="Configuración"
          subtitle="Personalizá la identidad, horarios y logística de tu tienda online."
          badge="Tu Negocio"
          borderBottom
          actions={
            <div className="hidden md:flex items-center gap-3">
              <PrimaryButton
                variant="secondary"
                onClick={() => {
                  if (!negocio.slug) {
                    toast.error("Tu negocio aún no tiene URL pública.");
                    return;
                  }
                  window.open(`/n/${negocio.slug}`, "_blank");
                }}
                icon={ExternalLink}
              >
                Ver Tienda
              </PrimaryButton>
              <PrimaryButton
                onClick={handleSave}
                disabled={saving}
                loading={saving}
                icon={saving ? undefined : Save}
              >
                {saving ? "Guardando..." : "Guardar Cambios"}
              </PrimaryButton>
            </div>
          }
        />

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start mb-20 md:mb-0">

          {/* LEFT COLUMN: MAIN SETTINGS */}
          <div className="xl:col-span-2 space-y-10">

            {/* Sección Identidad */}
            <section className="animate-in slide-in-from-bottom-4 duration-700 delay-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <Store size={24} />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-zinc-100">Identidad del Negocio</h2>
              </div>
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
            </section>

            {/* Sección Logística */}
            <section className="animate-in slide-in-from-bottom-4 duration-700 delay-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                  <Truck size={24} />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-zinc-100">Logística y Envíos</h2>
              </div>
              <LogisticaPanel negocio={negocio} setNegocio={setNegocio} />
            </section>
          </div>

          {/* RIGHT COLUMN: STATUS & HELP */}
          <div className="space-y-8 xl:sticky xl:top-8 animate-in slide-in-from-right-4 duration-700 delay-300">

            {/* Estado Panel (Apertura/Cierre) */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                  <Clock size={24} />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-zinc-100">Estado Actual</h2>
              </div>
              <EstadoPanel negocio={negocio} setNegocio={setNegocio} />
            </section>

            {/* Quick Tips Cards (Optional placeholder for future) */}
            <div className="bg-orange-50 rounded-3xl p-6 border border-orange-100">
              <h4 className="font-bold text-orange-900 mb-2">💡 Tip para vender más</h4>
              <p className="text-sm text-orange-800/80 leading-relaxed">
                Mantené actualizados tus horarios y logo. Una buena imagen de perfil aumenta un <strong>30%</strong> la confianza de los clientes nuevos.
              </p>
            </div>

          </div>
        </div>

        {/* MOBILE STICKY BOTTOM BAR */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 p-3 pb-5 bg-white dark:bg-zinc-900 border-t border-gray-100 dark:border-white/10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50 flex justify-center gap-3">
          <button
            onClick={() => {
              if (!negocio.slug) {
                toast.error("Tu negocio aún no tiene URL pública.");
                return;
              }
              window.open(`/n/${negocio.slug}`, "_blank");
            }}
            className="flex-1 flex items-center justify-center gap-2 py-3 text-gray-700 dark:text-zinc-300 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl font-bold active:scale-95 transition-all"
          >
            <ExternalLink size={18} />
            Ver Tienda
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-[2] flex items-center justify-center gap-2 py-3 bg-gray-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-bold hover:bg-black dark:hover:bg-zinc-200 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all shadow-lg shadow-gray-200 dark:shadow-black/20 active:scale-95"
          >
            {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            {saving ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>

      </div>
    </DashboardLayout>
  );
}
