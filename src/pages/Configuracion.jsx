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

import { useEffect, useState, useRef } from "react";
import api from "../api/api";
import { useRequirePremium } from "../hooks/useRequirePremium";
import DashboardLayout from "../layout/DashboardLayout";
import {
  Save,
  ExternalLink,
  Trash2,
  Plus,
  Image as ImageIcon,
  Loader2,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  CreditCard,
  Truck,
  QrCode,
  Copy,
  Share2,
  Download,
  Palette
} from "lucide-react";
import { useToast } from "../contexts/ToastProvider";
import { QRCodeSVG } from "qrcode.react";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const MAX_FILE_SIZE_MB = 2;

export default function ConfiguracionNegocio() {
  const [negocio, setNegocio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const [nuevoMetodoPago, setNuevoMetodoPago] = useState("");
  const [nuevoTipoEntrega, setNuevoTipoEntrega] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const fileInputRef = useRef(null);
  const [bannerFile, setBannerFile] = useState(null);
  const bannerInputRef = useRef(null);

  const toast = useToast();

  const fetchNegocio = async () => {
    setLoading(true);
    try {
      const res = await api.get("/negocios/me");
      const data = res.data;
      if (!data || typeof data !== "object") throw new Error("Formato inválido");
      setNegocio({
        ...data,
        metodos_pago: Array.isArray(data.metodos_pago) ? data.metodos_pago : [],
        tipos_entrega: Array.isArray(data.tipos_entrega) ? data.tipos_entrega : [],
      });
      setError(null);
    } catch (err) {
      console.error("Error al cargar configuración", err);
      // setError("No se pudo cargar la configuración."); // Keeping setError for blocking UI if really needed, but showing toast too is good.
      // But user asked to add toasts.
      setError("No se pudo cargar la configuración.");
      toast.error("Error al cargar la configuración.");
    } finally {
      setLoading(false);
    }
  };


  // Verificar suscripción premium y negocio
  useRequirePremium();

  useEffect(() => { fetchNegocio(); }, []);

  const uploadToCloudinary = async (file) => {
    if (!file) throw new Error("No hay archivo");
    if (!file.type.startsWith("image/")) throw new Error("El archivo no es una imagen válida");
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) throw new Error("La imagen supera los 2MB");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Error al subir la imagen");
    const data = await res.json();
    if (!data.secure_url) throw new Error("Respuesta inválida de Cloudinary");
    return data.secure_url;
  };

  const handleSave = async () => {
    if (!negocio) return;
    if (!negocio.nombre?.trim()) {
      toast.error("El nombre del negocio es obligatorio.");
      return;
    }

    setSaving(true);
    try {
      let logoUrl = negocio.logo_url;
      if (logoFile) logoUrl = await uploadToCloudinary(logoFile);

      let bannerUrl = negocio.banner_url;
      if (bannerFile) bannerUrl = await uploadToCloudinary(bannerFile);

      const payload = {
        ...negocio,
        logo_url: logoUrl,
        banner_url: bannerUrl,
        slug: undefined
      };

      await api.put("/negocios/me", payload);

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

  const handleDownloadQR = async () => {
    // Asegurarnos que la fuente esté cargada antes de dibujar
    await document.fonts.load("900 80px Montserrat");
    await document.fonts.load("600 30px Montserrat");
    await document.fonts.load("bold 50px Montserrat");

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const qrElement = document.getElementById("negocio-qr");

    if (!qrElement) return;

    // Configuración del Canvas (High Res)
    const width = 800;
    const height = 1000;

    canvas.width = width;
    canvas.height = height;

    // 1. Fondo Gradiente Premium (Naranja a Rojo)
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "#fb923c"); // Orange 400
    gradient.addColorStop(1, "#ea580c"); // Orange 600
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // 2. Título "Pedilo" con Sombra
    ctx.shadowColor = "rgba(0,0,0,0.2)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 4;

    ctx.fillStyle = "#ffffff";
    ctx.font = "900 80px Montserrat, sans-serif"; // Montserrat font
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Pedilo", width / 2, 80);

    // Reset shadow para textos normales
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    // 3. Subtexto
    ctx.font = "600 30px Montserrat, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.fillText("Escaneá para ver el menú", width / 2, 150);

    // 4. Nombre del Negocio (Bottom)
    ctx.font = "bold 50px Montserrat, sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(negocio.nombre, width / 2, height - 100);

    // 5. Dibujar QR en Tarjeta Blanca con Sombra
    const svgData = new XMLSerializer().serializeToString(qrElement);
    const img = new Image();
    // Convertir SVG a base64
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      const qrSize = 500;
      const cardPadding = 60;
      const cardSize = qrSize + cardPadding;
      const x = (width - cardSize) / 2;
      const y = (height - cardSize) / 2; // Centrado verticalmente

      // Sombra de la tarjeta
      ctx.shadowColor = "rgba(0,0,0,0.3)";
      ctx.shadowBlur = 30;
      ctx.shadowOffsetY = 15;

      // Tarjeta Blanca con Bordes Redondeados (Manual)
      ctx.fillStyle = "#ffffff";
      const radius = 40;
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + cardSize - radius, y);
      ctx.quadraticCurveTo(x + cardSize, y, x + cardSize, y + radius);
      ctx.lineTo(x + cardSize, y + cardSize - radius);
      ctx.quadraticCurveTo(x + cardSize, y + cardSize, x + cardSize - radius, y + cardSize);
      ctx.lineTo(x + radius, y + cardSize);
      ctx.quadraticCurveTo(x, y + cardSize, x, y + cardSize - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      ctx.fill();

      // Reset shadow para el QR
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;

      // Dibujar QR centrado en la tarjeta
      ctx.drawImage(img, x + cardPadding / 2, y + cardPadding / 2, qrSize, qrSize);

      // Descargar
      const pngUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = pngUrl;
      link.download = `QR-${negocio.slug}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    };
    img.src = url;
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
            {/* Skeleton Section 1 */}
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
            {/* Skeleton Sidebar */}
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
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Configuración</h1>
          <p className="text-gray-500">Personaliza la apariencia y logística de tu local.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => {
              if (!negocio.slug) {
                toast.error("Tu negocio aún no tiene URL pública.");
                return;
              }
              window.open(`/n/${negocio.slug}`, "_blank");
            }}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 font-semibold transition-all"
          >
            <ExternalLink size={18} /> Ver mi tienda
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 disabled:bg-orange-300 transition-all shadow-lg shadow-orange-200"
          >
            {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            {saving ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">

        {/* Columna Izquierda: Identidad */}
        <div className="lg:col-span-2 space-y-6">
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
              <div className="grid grid-cols-2 gap-6">
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

          {/* Métodos y Entregas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <CreditCard className="text-blue-500" size={20} /> Pagos
              </h2>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Ej: Mercado Pago"
                  value={nuevoMetodoPago}
                  onChange={(e) => setNuevoMetodoPago(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  onClick={() => {
                    const value = nuevoMetodoPago.trim();
                    if (value && !negocio.metodos_pago.includes(value)) {
                      setNegocio({ ...negocio, metodos_pago: [...negocio.metodos_pago, value] });
                      setNuevoMetodoPago("");
                    }
                  }}
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  <Plus size={18} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {negocio.metodos_pago.map((m, i) => (
                  <span key={i} className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold">
                    {m} <Trash2 size={12} className="cursor-pointer" onClick={() => setNegocio({ ...negocio, metodos_pago: negocio.metodos_pago.filter((_, idx) => idx !== i) })} />
                  </span>
                ))}
              </div>
            </section>

            <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Truck className="text-purple-500" size={20} /> Entregas
              </h2>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Ej: Delivery propio"
                  value={nuevoTipoEntrega}
                  onChange={(e) => setNuevoTipoEntrega(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-purple-500"
                />
                <button
                  onClick={() => {
                    const value = nuevoTipoEntrega.trim();
                    if (value && !negocio.tipos_entrega.includes(value)) {
                      setNegocio({ ...negocio, tipos_entrega: [...negocio.tipos_entrega, value] });
                      setNuevoTipoEntrega("");
                    }
                  }}
                  className="p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                >
                  <Plus size={18} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {negocio.tipos_entrega.map((t, i) => (
                  <span key={i} className="flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-bold">
                    {t} <Trash2 size={12} className="cursor-pointer" onClick={() => setNegocio({ ...negocio, tipos_entrega: negocio.tipos_entrega.filter((_, idx) => idx !== i) })} />
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Columna Derecha: Información de Contacto y Estado */}
        <div className="space-y-6">
          <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm overflow-hidden relative">
            <div className={`absolute top-0 right-0 h-1 w-full ${negocio.acepta_pedidos ? 'bg-green-500' : 'bg-red-500'}`} />
            <h2 className="text-lg font-bold mb-4">Estado del Local</h2>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="font-medium text-gray-700">Aceptando pedidos</span>
              <button
                onClick={() => setNegocio({ ...negocio, acepta_pedidos: !negocio.acepta_pedidos })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${negocio.acepta_pedidos ? 'bg-green-500' : 'bg-gray-300'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${negocio.acepta_pedidos ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
            <p className="text-[10px] text-gray-400 mt-2">Si apagas esto, los clientes no podrán finalizar compras.</p>
          </section>

          <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-lg font-bold mb-2">Contacto y Ubicación</h2>
            {/* Input de Teléfono y Código de País */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-2 border-b border-gray-50 focus-within:border-orange-500 transition-colors">
                <Phone size={18} className="text-gray-400 shrink-0" />
                <div className="flex items-center gap-2 w-full">
                  <div className="flex items-center bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
                    <span className="text-gray-400 text-sm font-bold">+</span>
                    <input
                      type="text"
                      value={negocio.codigo_pais || ""}
                      onChange={(e) => setNegocio({ ...negocio, codigo_pais: e.target.value.replace(/\D/g, '') })}
                      className="w-10 text-sm outline-none bg-transparent font-bold"
                      placeholder="54"
                      maxLength={4}
                    />
                  </div>
                  <input
                    type="tel"
                    value={negocio.telefono || ""}
                    onChange={(e) => setNegocio({ ...negocio, telefono: e.target.value.replace(/\D/g, '') })}
                    className="w-full text-sm outline-none bg-transparent font-medium"
                    placeholder="Número de WhatsApp"
                  />
                </div>
              </div>

              {/* Dirección */}
              <div className="flex items-center gap-3 p-2 border-b border-gray-50 focus-within:border-orange-500 transition-colors">
                <MapPin size={18} className="text-gray-400 shrink-0" />
                <input
                  type="text"
                  value={negocio.direccion || ""}
                  onChange={(e) => setNegocio({ ...negocio, direccion: e.target.value })}
                  className="w-full text-sm outline-none bg-transparent"
                  placeholder="Dirección"
                />
              </div>

              {/* Horarios */}
              <div className="flex items-center gap-3 p-2 border-b border-gray-50 focus-within:border-orange-500 transition-colors">
                <Clock size={18} className="text-gray-400 shrink-0" />
                <input
                  type="text"
                  value={negocio.horario || ""}
                  onChange={(e) => setNegocio({ ...negocio, horario: e.target.value })}
                  className="w-full text-sm outline-none bg-transparent"
                  placeholder="Horarios (ej: Lunes a Sábados 19 a 23hs)"
                />
              </div>
            </div>
          </section>

          {/* Sección Compartir / QR */}
          <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
              <Share2 className="text-blue-500" size={20} /> Compartir Tienda
            </h2>

            <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-center">
              <div className="bg-white p-3 rounded-xl shadow-sm mb-4">
                {negocio.slug && (
                  <QRCodeSVG
                    id="negocio-qr"
                    value={`${window.location.origin}/n/${negocio.slug}`}
                    size={150}
                    level="H"
                    includeMargin={false}
                  />
                )}
              </div>

              <div className="flex gap-2 w-full">
                <button
                  onClick={handleDownloadQR}
                  className="flex-1 bg-orange-600 text-white py-2 rounded-lg font-bold text-sm hover:bg-orange-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-orange-100"
                >
                  <Download size={16} /> Descargar QR
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`${window.location.origin}/n/${negocio.slug}`);
                    toast.success("Link copiado al portapapeles");
                  }}
                  className="flex-none bg-white border border-gray-200 text-gray-700 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  title="Copiar Link"
                >
                  <Copy size={20} />
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-400 text-center">
              Descarga la imagen para imprimir stickers o compartir en redes.
            </p>
          </section>
        </div>
      </div >
    </DashboardLayout >
  );
}
