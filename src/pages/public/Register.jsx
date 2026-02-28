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
import { useAuth } from "../../auth/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Spinner } from "flowbite-react";
import { UserPlus, AlertCircle, ShieldCheck, ChevronLeft } from "lucide-react";
import { useToast } from "../../contexts/ToastProvider";

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const { user_register, get_usuario } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  // Redirigir si ya hay sesión activa
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
        // Toast opcional aquí para no spamear al cargar
      }
    };

    checkSession();
  }, [navigate, get_usuario]);

  const onSubmit = async (data) => {
    try {
      await user_register(data);
      toast.success("¡Cuenta creada! Ya podés iniciar sesión.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "No se pudo crear la cuenta. El email podría estar en uso.");
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
            <UserPlus className="text-orange-600" size={32} />
          </div>
          <h1 className="text-3xl font-black text-gray-900 text-center tracking-tight">
            Sumá tu Negocio
          </h1>
          <p className="text-gray-500 text-sm mt-2 text-center font-medium">
            Configurá tu catálogo digital en minutos
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Nombre */}
          <div>
            <label className="block mb-1.5 text-xs font-bold text-gray-400 uppercase ml-1">
              Nombre Personal / Dueño
            </label>
            <input
              type="text"
              {...register("nombre", {
                required: "Tu nombre es obligatorio",
                minLength: { value: 2, message: "Mínimo 2 caracteres" },
              })}
              className={`w-full p-4 bg-gray-50 border-2 rounded-2xl outline-none transition-all font-medium ${errors.nombre
                ? "border-red-100 bg-red-50 text-red-900 focus:border-red-500"
                : "border-transparent focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
                }`}
              placeholder="Juan Pérez"
            />
            {errors.nombre && <p className="mt-1.5 text-xs text-red-600 font-bold ml-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.nombre.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1.5 text-xs font-bold text-gray-400 uppercase ml-1">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "El email es obligatorio",
                pattern: { value: /^\S+@\S+$/i, message: "Email inválido" },
              })}
              className={`w-full p-4 bg-gray-50 border-2 rounded-2xl outline-none transition-all font-medium ${errors.email
                ? "border-red-100 bg-red-50 text-red-900 focus:border-red-500"
                : "border-transparent focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
                }`}
              placeholder="hola@tu-negocio.com"
            />
            {errors.email && <p className="mt-1.5 text-xs text-red-600 font-bold ml-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1.5 text-xs font-bold text-gray-400 uppercase ml-1">
              Contraseña
            </label>
            <input
              type="password"
              autoComplete="new-password"
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: { value: 8, message: "Mínimo 8 caracteres" },
              })}
              className={`w-full p-4 bg-gray-50 border-2 rounded-2xl outline-none transition-all font-medium ${errors.password
                ? "border-red-100 bg-red-50 text-red-900 focus:border-red-500"
                : "border-transparent focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
                }`}
              placeholder="••••••••"
            />
            {errors.password && <p className="mt-1.5 text-xs text-red-600 font-bold ml-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1.5 text-xs font-bold text-gray-400 uppercase ml-1">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              autoComplete="new-password"
              {...register("confirmPassword", {
                required: "Repetí tu contraseña",
                validate: (value) => value === watch("password") || "Las contraseñas no coinciden"
              })}
              className={`w-full p-4 bg-gray-50 border-2 rounded-2xl outline-none transition-all font-medium ${errors.confirmPassword
                ? "border-red-100 bg-red-50 text-red-900 focus:border-red-500"
                : "border-transparent focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
                }`}
              placeholder="••••••••"
            />
            {errors.confirmPassword && <p className="mt-1.5 text-xs text-red-600 font-bold ml-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.confirmPassword.message}</p>}
          </div>



          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center items-center gap-2 bg-gray-900 text-white font-black py-4 rounded-2xl hover:bg-black transition-all shadow-xl active:scale-95 disabled:opacity-50 mt-2"
          >
            {isSubmitting ? <Spinner size="sm" /> : "Crear mi Cuenta"}
          </button>

          <div className="pt-4 text-center">
            <p className="text-sm text-gray-500 font-medium">
              ¿Ya sos parte?{" "}
              <Link to="/login" className="text-orange-600 font-extrabold hover:underline">
                Iniciá sesión acá
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}