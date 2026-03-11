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
import { useAuth } from "../../contexts/AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Spinner } from "flowbite-react";
import { UserPlus, AlertCircle, ChevronLeft, Eye, EyeOff } from "lucide-react";
import { useToast } from "../../contexts/ToastProvider";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

export default function Register() {
  useDocumentTitle("Crear Cuenta");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const { register: registerUser, refresh_usuario } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [isCheckingSession, setIsCheckingSession] = useState(!!localStorage.getItem("token"));
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Helper para Fuerza de Contraseña
  const passwordValue = watch("password") || "";
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: "Seguridad de contraseña", color: "bg-gray-200", textColor: "text-gray-400" };
    if (pass.length < 6) return { score: 1, label: "Muy débil", color: "bg-red-400", textColor: "text-red-500" };
    if (pass.length < 8) return { score: 2, label: "Débil", color: "bg-orange-400", textColor: "text-orange-500" };
    
    let score = 2;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    
    if (score === 3) return { score: 3, label: "Buena", color: "bg-yellow-400", textColor: "text-yellow-600" };
    if (score >= 4) return { score: 4, label: "Fuerte", color: "bg-green-500", textColor: "text-green-600" };
    return { score: 2, label: "Débil", color: "bg-orange-400", textColor: "text-orange-500" };
  };
  
  const strength = getPasswordStrength(passwordValue);

  // Redirigir si ya hay sesión activa
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
        // Toast opcional aquí para no spamear al cargar
        setIsCheckingSession(false);
      }
    };

    checkSession();
  }, [navigate, refresh_usuario]);

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      toast.success("¡Cuenta creada! Ya podés iniciar sesión.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "No se pudo crear la cuenta. El email podría estar en uso.");
    }
  };

  return (
    <section className="min-h-screen flex bg-white relative">
      {/* Volver al inicio */}
      <Link to="/" className="absolute top-6 left-6 flex items-center gap-2 text-gray-500 hover:text-orange-600 transition-colors font-medium text-sm z-10">
        <ChevronLeft size={18} /> Volver al inicio
      </Link>

      {/* Lado Derecho (Visual) - Invertido en el Register para dar variedad */}
      <div className="hidden lg:flex w-1/2 bg-gray-50 relative overflow-hidden items-center justify-center border-r border-gray-100">
        {/* Decoración abstracta */}
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-50 via-yellow-50/50 to-orange-100/50"></div>
        <div className="absolute bottom-0 right-0 -mr-20 -mb-20 w-96 h-96 rounded-full bg-orange-300/30 blur-3xl opacity-60 mix-blend-multiply animate-pulse"></div>
        <div className="absolute top-0 left-0 -ml-20 -mt-20 w-80 h-80 rounded-full bg-yellow-300/30 blur-3xl opacity-60 mix-blend-multiply delay-1000 animate-pulse"></div>
        
        {/* Contenido Visual */}
        <div className="relative z-10 p-12 max-w-lg text-center animate-in fade-in zoom-in duration-1000 delay-300">
             <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-white shadow-2xl shadow-orange-900/5 mb-10 border border-orange-50/50 -rotate-3">
                 <span className="text-5xl drop-shadow-sm">✨</span>
             </div>
             <h2 className="text-4xl font-black text-gray-900 mb-6 tracking-tight leading-tight">Tu negocio online en minutos</h2>
             <p className="text-lg text-gray-500 font-medium leading-relaxed">Creá tu cuenta, personalizá tu menú y empezá a recibir pedidos por WhatsApp hoy mismo. Sin comisiones abusivas.</p>
             
             {/* Stats "Falsos" */}
             <div className="mt-12 grid grid-cols-2 gap-4">
                <div className="bg-white/60 backdrop-blur-xl border border-white rounded-2xl p-6 shadow-xl shadow-orange-900/5 transform hover:-translate-y-1 transition-all duration-300">
                    <p className="text-3xl font-black text-orange-600 mb-1">0%</p>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">Comisiones x Venta</p>
                </div>
                <div className="bg-white/60 backdrop-blur-xl border border-white rounded-2xl p-6 shadow-xl shadow-orange-900/5 transform hover:-translate-y-1 transition-all duration-300 delay-100">
                    <p className="text-3xl font-black text-orange-600 mb-1">24/7</p>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">Catálogo Online</p>
                </div>
             </div>
        </div>
      </div>

      {/* Lado Izquierdo (Form) - Ahora a la derecha */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 relative overflow-y-auto max-h-screen">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700 my-auto py-8">
          <div className="flex flex-col mb-10">
            <div className="bg-orange-100 p-3 rounded-2xl mb-6 w-fit ring-8 ring-orange-50">
              <UserPlus className="text-orange-600" size={28} />
            </div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight leading-none mt-5 mb-5">
              Sumá tu Negocio
            </h1>
            <p className="text-gray-500 text-base font-medium">
              Completá tus datos para empezar
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Nombre */}
            <div>
              <label className="block mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
                Nombre Personal / Dueño
              </label>
              <input
                type="text"
                disabled={isCheckingSession}
                {...register("nombre", {
                  required: "Tu nombre es obligatorio",
                  minLength: { value: 2, message: "Mínimo 2 caracteres" },
                })}
                className={`w-full px-5 py-4 bg-gray-50 border-2 rounded-2xl outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400 ${errors.nombre
                  ? "border-red-200 bg-red-50 text-red-900 focus:border-red-500"
                  : "border-gray-100 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 hover:border-gray-200"
                  }`}
                placeholder="Juan Pérez"
              />
              {errors.nombre && <p className="mt-2 text-xs text-red-600 font-bold ml-1 flex items-center gap-1.5 animate-in slide-in-from-left-1"><AlertCircle size={14} /> {errors.nombre.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
                Email
              </label>
              <input
                type="email"
                disabled={isCheckingSession}
                {...register("email", {
                  required: "El email es obligatorio",
                  pattern: { value: /^\S+@\S+$/i, message: "Email inválido" },
                })}
                className={`w-full px-5 py-4 bg-gray-50 border-2 rounded-2xl outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400 ${errors.email
                  ? "border-red-200 bg-red-50 text-red-900 focus:border-red-500"
                  : "border-gray-100 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 hover:border-gray-200"
                  }`}
                placeholder="hola@tu-negocio.com"
              />
              {errors.email && <p className="mt-2 text-xs text-red-600 font-bold ml-1 flex items-center gap-1.5 animate-in slide-in-from-left-1"><AlertCircle size={14} /> {errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  disabled={isCheckingSession}
                  {...register("password", {
                    required: "La contraseña es obligatoria",
                    minLength: { value: 8, message: "Mínimo 8 caracteres" },
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
              
              {/* Indicador de Fuerza de Contraseña */}
              <div className="mt-3 px-1">
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3, 4].map((step) => (
                    <div 
                      key={step} 
                      className={`h-1.5 w-full rounded-full transition-all duration-300 ${strength.score >= step ? strength.color : 'bg-gray-200'}`}
                    />
                  ))}
                </div>
                <p className={`text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 ${strength.textColor} text-right`}>
                  {strength.label}
                </p>
              </div>
              
              {errors.password && <p className="mt-2 text-xs text-red-600 font-bold ml-1 flex items-center gap-1.5 animate-in slide-in-from-left-1"><AlertCircle size={14} /> {errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
                Confirmar Contraseña
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  disabled={isCheckingSession}
                  {...register("confirmPassword", {
                    required: "Repetí tu contraseña",
                    validate: (value) => value === watch("password") || "Las contraseñas no coinciden"
                  })}
                  className={`w-full px-5 py-4 pr-12 bg-gray-50 border-2 rounded-2xl outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400 ${errors.confirmPassword
                    ? "border-red-200 bg-red-50 text-red-900 focus:border-red-500"
                    : "border-gray-100 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 hover:border-gray-200"
                    }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                  disabled={isCheckingSession}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-2 text-xs text-red-600 font-bold ml-1 flex items-center gap-1.5 animate-in slide-in-from-left-1"><AlertCircle size={14} /> {errors.confirmPassword.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isCheckingSession}
              className="w-full flex justify-center items-center gap-2 bg-gray-900 text-white font-bold text-lg py-4 rounded-2xl hover:bg-black transition-all shadow-xl shadow-gray-900/10 hover:shadow-gray-900/20 active:scale-[0.98] disabled:opacity-50 mt-6"
            >
              {isSubmitting || isCheckingSession ? <Spinner size="md" light={true} /> : "Crear mi Cuenta"}
            </button>

            <div className="pt-6 text-center">
              <p className="text-sm text-gray-500 font-medium">
                ¿Ya sos parte?{" "}
                <Link to="/login" className="text-orange-600 font-extrabold hover:underline">
                  Iniciá sesión acá
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}