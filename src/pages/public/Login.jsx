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
import { useAuth } from "../../auth/useAuth";
import { useEffect } from "react";
import { Spinner } from "flowbite-react";
import { LogIn, AlertCircle, ChevronLeft } from "lucide-react";
import { useToast } from "../../contexts/ToastProvider";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const { user_login, get_usuario } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  // Redirigir si ya está logueado
  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const u = await get_usuario();

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
      }
    };

    checkSession();
  }, [navigate, get_usuario]);

  const onSubmit = async (data) => {
    try {
      await user_login(data.email, data.password);
      const u = await get_usuario();

      toast.success(`¡Bienvenido de nuevo!`);

      if (u.plan_actual === "gratis") {
        navigate("/planes");
      } else {
        navigate("/dashboard/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Email o contraseña incorrectos.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 relative">
      {/* Volver al inicio */}
      <Link to="/" className="absolute top-6 left-6 flex items-center gap-2 text-gray-500 hover:text-orange-600 transition-colors font-medium text-sm">
        <ChevronLeft size={18} /> Volver al inicio
      </Link>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-gray-100 relative">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-orange-100 p-3 rounded-full mb-4 ring-8 ring-orange-50">
            <LogIn className="text-orange-600" size={32} />
          </div>
          <h1 className="text-3xl font-black text-gray-900 text-center tracking-tight">
            Bienvenido
          </h1>
          <p className="text-gray-500 text-sm mt-2 text-center font-medium">Ingresá a tu panel de control</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block mb-1.5 text-xs font-bold text-gray-400 uppercase ml-1">
              Email
            </label>
            <input
              type="email"
              autoComplete="email"
              {...register("email", {
                required: "El email es obligatorio",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Formato de email inválido",
                },
              })}
              className={`w-full p-4 bg-gray-50 border-2 rounded-2xl outline-none transition-all font-medium ${errors.email
                ? "border-red-100 bg-red-50 text-red-900 focus:border-red-500"
                : "border-transparent focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
                }`}
              placeholder="tu@email.com"
            />
            {errors.email && (
              <p className="mt-1.5 text-xs text-red-600 font-bold ml-1 flex items-center gap-1 animate-in slide-in-from-left-2">
                <AlertCircle size={12} /> {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1.5 text-xs font-bold text-gray-400 uppercase ml-1">
              Contraseña
            </label>
            <input
              type="password"
              autoComplete="current-password"
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: { value: 6, message: "Mínimo 6 caracteres" },
              })}
              className={`w-full p-4 bg-gray-50 border-2 rounded-2xl outline-none transition-all font-medium ${errors.password
                ? "border-red-100 bg-red-50 text-red-900 focus:border-red-500"
                : "border-transparent focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
                }`}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-1.5 text-xs text-red-600 font-bold ml-1 flex items-center gap-1 animate-in slide-in-from-left-2">
                <AlertCircle size={12} /> {errors.password.message}
              </p>
            )}
          </div>


          {/* Botón */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center items-center gap-2 bg-gray-900 text-white font-black py-4 rounded-2xl hover:bg-black transition-all shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {isSubmitting ? <Spinner size="sm" /> : "Ingresar"}
          </button>

          <div className="pt-4 text-center">
            <p className="text-sm text-gray-500 font-medium">
              ¿No tenés cuenta todavía?{" "}
              <Link to="/register" className="text-orange-600 font-extrabold hover:underline">
                Registrate gratis
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}