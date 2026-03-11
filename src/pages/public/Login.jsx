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

import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";
import { LogIn, AlertCircle, ChevronLeft, Eye, EyeOff } from "lucide-react";
import { useToast } from "../../contexts/ToastProvider";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

export default function Login() {
  useDocumentTitle("Iniciar Sesión");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const { login, refresh_usuario } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [isCheckingSession, setIsCheckingSession] = useState(!!localStorage.getItem("token"));
  const [showPassword, setShowPassword] = useState(false);

  // Redirigir si ya está logueado
  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsCheckingSession(false);
        return;
      }

      try {
        const u = await refresh_usuario();

        if (u.plan_actual === "gratis") {
          navigate("/planes");
        } else if (!u.tiene_negocio) {
          navigate("/crear-negocio");
        } else {
          navigate("/dashboard/");
        }
      } catch (err) {
        console.error("Error verificando sesión:", err);
        // toast.error("No se pudo verificar tu sesión."); // Opcional, puede ser molesto al cargar
        setIsCheckingSession(false);
      }
    };

    checkSession();
  }, [navigate, refresh_usuario]);

  const onSubmit = async (data) => {
    try {
      const u = await login(data.email, data.password);

      toast.success(`¡Bienvenido de nuevo!`);

      if (u.plan_actual === "gratis") {
        navigate("/planes");
      } else if (!u.tiene_negocio) {
        navigate("/crear-negocio");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Email o contraseña incorrectos.");
    }
  };

  return (
    <section className="min-h-screen flex bg-white relative">
      {/* Volver al inicio */}
      <Link to="/" className="absolute top-6 left-6 flex items-center gap-2 text-gray-500 hover:text-orange-600 transition-colors font-medium text-sm z-10">
        <ChevronLeft size={18} /> Volver al inicio
      </Link>

      {/* Lado Izquierdo (Form) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 relative">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-col mb-10">
            <div className="bg-orange-100 p-3 rounded-2xl mb-6 w-fit ring-8 ring-orange-50">
              <LogIn className="text-orange-600" size={28} />
            </div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight leading-none mt-5 mb-5">
              Bienvenido de nuevo
            </h1>
            <p className="text-gray-500 text-base font-medium">Ingresá los datos de tu comercio</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
                Email
              </label>
              <input
                type="email"
                autoComplete="email"
                disabled={isCheckingSession}
                {...register("email", {
                  required: "El email es obligatorio",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Formato de email inválido",
                  },
                })}
                className={`w-full px-5 py-4 bg-gray-50 border-2 rounded-2xl outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400 ${errors.email
                  ? "border-red-200 bg-red-50 text-red-900 focus:border-red-500"
                  : "border-gray-100 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 hover:border-gray-200"
                  }`}
                placeholder="tu@email.com"
              />
              {errors.email && (
                <p className="mt-2 text-xs text-red-600 font-bold ml-1 flex items-center gap-1.5 animate-in slide-in-from-left-1">
                  <AlertCircle size={14} /> {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  disabled={isCheckingSession}
                  {...register("password", {
                    required: "La contraseña es obligatoria",
                    minLength: { value: 6, message: "Mínimo 6 caracteres" },
                  })}
                  className={`w-full px-5 py-4 pr-12 bg-gray-50 border-2 rounded-2xl outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400 ${errors.password
                    ? "border-red-200 bg-red-50 text-red-900 focus:border-red-500"
                    : "border-gray-100 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 hover:border-gray-200"
                    }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                  disabled={isCheckingSession}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-xs text-red-600 font-bold ml-1 flex items-center gap-1.5 animate-in slide-in-from-left-1">
                  <AlertCircle size={14} /> {errors.password.message}
                </p>
              )}
            </div>


            {/* Botón */}
            <button
              type="submit"
              disabled={isSubmitting || isCheckingSession}
              className="w-full flex justify-center items-center gap-2 bg-gray-900 text-white font-bold text-lg py-4 rounded-2xl hover:bg-black transition-all shadow-xl shadow-gray-900/10 hover:shadow-gray-900/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              {isSubmitting || isCheckingSession ? <Spinner size="md" light={true} /> : "Ingresar a mi cuenta"}
            </button>

            <div className="pt-6 text-center">
              <p className="text-sm text-gray-500 font-medium">
                ¿No tenés cuenta todavía?{" "}
                <Link to="/register" className="text-orange-600 font-extrabold hover:underline">
                  Registrate gratis
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Lado Derecho (Visual) */}
      <div className="hidden lg:flex w-1/2 bg-gray-50 relative overflow-hidden items-center justify-center border-l border-gray-100">
        {/* Decoración abstracta */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-red-50/50 to-orange-100/50"></div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-orange-300/30 blur-3xl opacity-60 mix-blend-multiply animate-pulse"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-red-300/30 blur-3xl opacity-60 mix-blend-multiply delay-1000 animate-pulse"></div>
        
        {/* Contenido Visual */}
        <div className="relative z-10 p-12 max-w-lg text-center animate-in fade-in zoom-in duration-1000 delay-300">
             <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-white shadow-2xl shadow-orange-900/5 mb-10 border border-orange-50/50 rotate-3">
                 <span className="text-5xl drop-shadow-sm">🚀</span>
             </div>
             <h2 className="text-4xl font-black text-gray-900 mb-6 tracking-tight leading-tight">Maneja tu negocio como un Pro</h2>
             <p className="text-lg text-gray-500 font-medium leading-relaxed">Simplificá tu gestión, recibe pedidos por WhatsApp fácilmente y llevá el control absoluto de tus ventas desde un único lugar.</p>
             
             {/* Decoración de UI "Falsa" */}
             <div className="mt-12 bg-white/60 backdrop-blur-xl border border-white rounded-2xl p-6 shadow-xl shadow-orange-900/5 transform -rotate-2 hover:rotate-0 transition-all duration-500">
               <div className="flex items-center gap-4 border-b border-gray-100/50 pb-4 mb-4">
                 <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/20 text-white font-bold">🍔</div>
                 <div className="text-left flex-1">
                   <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                   <div className="h-3 bg-gray-100 rounded w-16"></div>
                 </div>
                 <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">Nuevo</div>
               </div>
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/20 text-white font-bold">🍕</div>
                 <div className="text-left flex-1">
                   <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                   <div className="h-3 bg-gray-100 rounded w-20"></div>
                 </div>
                 <div className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">En viaje</div>
               </div>
             </div>
        </div>
      </div>
    </section>
  );
}