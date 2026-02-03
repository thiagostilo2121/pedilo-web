import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { useEffect } from "react";
import { Spinner } from "flowbite-react";
import { LogIn, AlertCircle } from "lucide-react";
import { useToast } from "../contexts/ToastProvider";

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

        if (!u.es_premium) {
          navigate("/planes");
        } else if (!u.tiene_negocio) {
          navigate("/crear-negocio");
        } else {
          navigate("/dashboard/configuracion");
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

      if (!u.es_premium) {
        navigate("/planes");
      } else {
        navigate("/dashboard/configuracion");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Email o contraseña incorrectos.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-orange-100 p-3 rounded-full mb-4">
            <LogIn className="text-orange-600" size={32} />
          </div>
          <h1 className="text-3xl font-black text-gray-900 text-center">
            Bienvenido
          </h1>
          <p className="text-gray-500 text-sm mt-1">Ingresá a tu panel de control</p>
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
              className={`w-full p-3 border-2 rounded-xl focus:outline-none focus:ring-4 transition-all ${errors.email
                ? "border-red-500 focus:ring-red-100"
                : "border-gray-100 focus:border-orange-500 focus:ring-orange-50"
                }`}
              placeholder="tu@email.com"
            />
            {errors.email && (
              <p className="mt-1.5 text-xs text-red-600 font-bold ml-1 flex items-center gap-1">
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
              className={`w-full p-3 border-2 rounded-xl focus:outline-none focus:ring-4 transition-all ${errors.password
                ? "border-red-500 focus:ring-red-100"
                : "border-gray-100 focus:border-orange-500 focus:ring-orange-50"
                }`}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-1.5 text-xs text-red-600 font-bold ml-1 flex items-center gap-1">
                <AlertCircle size={12} /> {errors.password.message}
              </p>
            )}
          </div>


          {/* Botón */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center items-center gap-2 bg-orange-600 text-white font-black py-4 rounded-2xl hover:bg-orange-700 transition-all shadow-lg shadow-orange-100 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? <Spinner size="sm" /> : "Ingresar"}
          </button>

          <div className="pt-4 text-center">
            <p className="text-sm text-gray-500">
              ¿No tenés cuenta todavía?{" "}
              <Link to="/register" className="text-orange-600 font-bold hover:underline">
                Registrate gratis
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}