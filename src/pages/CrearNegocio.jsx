import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store, Globe, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import api from "../api/api";
import { useAuth } from "../auth/useAuth";
import { useToast } from "../contexts/ToastProvider";

export default function CrearNegocio() {
  const [nombre, setNombre] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificando, setVerificando] = useState(false);

  const navigate = useNavigate();
  const { refresh_usuario } = useAuth();
  const toast = useToast();

  const handleNombreChange = (e) => {
    const val = e.target.value;
    setNombre(val);
    setSlug(
      val
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "")
    );
  };

  const verificarEstado = async () => {
    try {
      const user = await refresh_usuario();
      if (user.tiene_negocio) {
        toast.success("¡Todo listo! Redirigiendo...");
        setVerificando(false);
        navigate("/dashboard/");
      } else {
        // Reintentar en 2 segundos
        setTimeout(verificarEstado, 2000);
      }
    } catch (err) {
      console.error("Error verificando estado:", err);
      setTimeout(verificarEstado, 3000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/negocios", { nombre, slug });
      setVerificando(true);
      verificarEstado();
    } catch (err) {
      const status = err.response?.status;
      const backendMsg = err.response?.data?.detail || err.response?.data?.message;

      if (status === 409 || backendMsg?.toLowerCase().includes("ya tenés")) {
        toast.error("Ya tenés un negocio creado. No podés crear otro.");
      } else if (status === 400) {
        toast.error("Los datos ingresados no son válidos.");
      } else {
        toast.error("No se pudo crear el negocio. Intentalo de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (verificando) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-4 py-12 relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-100/50 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-red-100/40 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-md w-full relative z-10 text-center">
          <div className="inline-flex bg-white p-6 rounded-[3rem] shadow-xl shadow-orange-100/50 mb-8 border border-orange-50/50 relative">
            <div className="bg-gradient-to-br from-orange-500 to-red-600 w-20 h-20 rounded-[2rem] flex items-center justify-center text-white shadow-lg shadow-orange-200">
              <Loader2 className="animate-spin" size={40} />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-2 rounded-full shadow-lg border-4 border-white">
              <CheckCircle2 size={20} />
            </div>
          </div>

          <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-4">¡Negocio creado!</h1>
          <p className="text-gray-500 text-lg font-medium leading-relaxed mb-8">
            Estamos configurando tu panel de administración. Esto puede tardar unos segundos...
          </p>

          <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/80 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                <Store size={20} />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Negocio</p>
                <p className="text-sm font-black text-gray-900">{nombre}</p>
              </div>
            </div>

            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-orange-500 h-full w-2/3 animate-[progress_2s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes progress {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(200%); }
          }
        `}} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Elementos Decorativos de Fondo */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-100/50 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-red-100/40 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-xl w-full relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex bg-white p-4 rounded-[2rem] shadow-xl shadow-orange-100/50 mb-6 border border-orange-50/50">
            <div className="bg-gradient-to-br from-orange-500 to-red-600 w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-200">
              <Store size={32} />
            </div>
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Tu negocio en línea</h1>
          <p className="text-gray-500 mt-3 text-lg font-medium max-w-sm mx-auto">
            Personalizá la identidad de tu negocio y empezá a recibir pedidos hoy mismo.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-white space-y-8"
        >
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-end mb-2 px-1">
                <label className="text-sm font-black text-gray-900 uppercase tracking-wider">
                  Nombre del Negocio
                </label>
                <span className="text-[10px] font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full uppercase">Requerido</span>
              </div>
              <input
                required
                type="text"
                placeholder="Ej: La Tiendita de Juan"
                value={nombre}
                onChange={handleNombreChange}
                className="w-full p-5 bg-gray-50/50 border-2 border-transparent focus:border-orange-500/30 focus:bg-white focus:ring-4 focus:ring-orange-500/5 rounded-2xl outline-none transition-all font-semibold text-gray-800 placeholder:text-gray-300"
                disabled={loading}
              />
            </div>

            <div>
              <div className="flex justify-between items-end mb-2 px-1">
                <label className="text-sm font-black text-gray-900 uppercase tracking-wider flex items-center gap-2">
                  <Globe size={14} className="text-orange-500" /> Tu URL única
                </label>
              </div>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm pointer-events-none transition-colors group-focus-within:text-orange-300">
                  pediloarg.netlify.app/n/
                </div>
                <input
                  required
                  type="text"
                  value={slug}
                  onChange={(e) =>
                    setSlug(
                      e.target.value
                        .toLowerCase()
                        .replace(/[^\w\s-]/g, "")
                        .replace(/\s+/g, "-")
                    )
                  }
                  className="w-full p-5 pl-[182px] bg-gray-50/50 border-2 border-transparent focus:border-orange-500/30 focus:bg-white focus:ring-4 focus:ring-orange-500/5 rounded-2xl outline-none transition-all font-black text-orange-600 tracking-tight"
                  disabled={loading}
                />
              </div>
              <div className="mt-3 flex items-start gap-2 bg-blue-50/50 p-3 rounded-xl border border-blue-100/50">
                <AlertCircle size={14} className="text-blue-500 mt-0.5" />
                <p className="text-[11px] text-blue-600/80 font-bold leading-relaxed">
                  Este es el link que pondrás en tu bio de Instagram. Elegí algo corto y fácil de recordar.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full relative group overflow-hidden bg-gray-900 text-white py-5 rounded-2xl font-black text-xl transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 shadow-xl shadow-gray-200"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center justify-center gap-3">
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={24} />
                    <span>Configurando...</span>
                  </>
                ) : (
                  <>
                    <span>¡Lanzar mi Negocio!</span>
                    <CheckCircle2 size={24} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </div>
            </button>
            <p className="text-center mt-6 text-xs text-gray-400 font-bold uppercase tracking-widest">
              Al crear tu negocio aceptás nuestros <button onClick={() => window.open("https://pediloarg.netlify.app/terminos", "_blank")} type="button" className="text-gray-900 hover:underline">Términos y Condiciones</button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
