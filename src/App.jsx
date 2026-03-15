/*
 * Copyright (C) 2026 Thiago Valentín Stilo Limarino
 */

import { lazy, Suspense } from "react";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import Footer from "./components/Footer";
import Landing from "./pages/public/Landing"; // Mantenemos Landing estático para LCP óptimo
import { AuthProvider, useAuth } from "./contexts/AuthProvider";
import { ToastProvider } from "./contexts/ToastProvider";
import ThemeProvider from "./contexts/ThemeProvider";
import DashboardLayout from "./layout/DashboardLayout";

// Lazy loading de páginas
// Public pages
const Register = lazy(() => import("./pages/public/Register"));
const Login = lazy(() => import("./pages/public/Login"));
const Productos = lazy(() => import("./pages/public/PublicNegocio"));
const Checkout = lazy(() => import("./pages/public/Checkout"));
const SeguimientoPedido = lazy(() => import("./pages/public/BuscarPedido"));
const NotFound = lazy(() => import("./pages/public/NotFound"));
const Terminos = lazy(() => import("./pages/public/TyC"));
const Privacidad = lazy(() => import("./pages/public/PdP"));
const Planes = lazy(() => import("./pages/public/Planes"));
const CrearNegocio = lazy(() => import("./pages/public/CrearNegocio"));
const SuscripcionSuccess = lazy(() => import("./pages/public/SuscripcionSuccess"));
const Brochure = lazy(() => import("./pages/marketing/Brochure"));
const About = lazy(() => import("./pages/public/About"));
const Insignias = lazy(() => import("./pages/public/Insignias"));

// Dashboard pages
const DashboardHome = lazy(() => import("./pages/dashboard/DashboardHome"));
const PedidosDashboard = lazy(() => import("./pages/dashboard/Pedidos"));
const ProductosDashboard = lazy(() => import("./pages/dashboard/Productos"));
const CategoriasDashboard = lazy(() => import("./pages/dashboard/Categorias"));
const ToppingsDashboard = lazy(() => import("./pages/dashboard/Toppings"));
const ConfiguracionNegocio = lazy(() => import("./pages/dashboard/Configuracion"));
const MiSuscripcion = lazy(() => import("./pages/dashboard/MiSus"));
const Autopilot = lazy(() => import("./pages/dashboard/Autopilot"));
const Marketing = lazy(() => import("./pages/dashboard/Marketing"));

// Admin pages
const AdminDashboard = lazy(() => import("./pages/dashboard/admin/AdminDashboard"));
const AdminUsers = lazy(() => import("./pages/dashboard/admin/AdminUsers"));
const AdminNegocios = lazy(() => import("./pages/dashboard/admin/AdminNegocios"));

// Pantalla de carga elegante
const PageLoader = () => (
  <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950">
    <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mb-4"></div>
    <p className="text-gray-400 font-bold animate-pulse">Cargando Pedilo...</p>
  </div>
);

// Wrapper para proteger rutas privadas
function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <PageLoader />;
  return user ? children : <Navigate to="/login" replace />;
}

// Wrapper para rutas de admin
function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <PageLoader />;
  if (!user) return <Navigate to="/login" replace />;
  if (!user.es_admin) return <Navigate to="/dashboard/inicio" replace />;
  return children;
}

// Layout para la parte pública (clientes)
function PublicLayout({ children }) {
  return (
    <div className="">
      <main className="">{children}</main>
      <Footer />
    </div>
  );
}

// Wrappers para capturar el slug de la URL
function ProductosWrapper() { const { slug } = useParams(); return <Productos slug={slug} />; }
function CheckoutWrapper() { const { slug } = useParams(); return <Checkout slug={slug} />; }
function PedidoWrapper() { const { slug } = useParams(); return <SeguimientoPedido slug={slug} />; }

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <Suspense fallback={<PageLoader />}>
            <Routes>
            {/* 1. RUTAS PÚBLICAS */}
            <Route path="/" element={<PublicLayout><Landing /></PublicLayout>} />
            <Route path="/n/:slug" element={<PublicLayout><ProductosWrapper /></PublicLayout>} />
            <Route path="/n/:slug/checkout" element={<PublicLayout><CheckoutWrapper /></PublicLayout>} />
            <Route path="/n/:slug/pedidos" element={<PublicLayout><PedidoWrapper /></PublicLayout>} />
            <Route path="/marketing/brochure" element={<Brochure />} />
            <Route path="/terminos" element={<PublicLayout><Terminos /></PublicLayout>} />
            <Route path="/privacidad" element={<PublicLayout><Privacidad /></PublicLayout>} />
            <Route path="/acerca" element={<PublicLayout><About /></PublicLayout>} />
            <Route path="/insignias" element={<PublicLayout><Insignias /></PublicLayout>} />
            <Route path="/planes" element={<PublicLayout><Planes /></PublicLayout>} />

            {/* 2. RUTAS DE AUTH */}
            <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />
            <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
            <Route path="/crear-negocio" element={<PublicLayout><CrearNegocio /></PublicLayout>} />
            <Route path="/suscripcion/success" element={<PrivateRoute><SuscripcionSuccess /></PrivateRoute>} />

            {/* 3. DASHBOARD - Rutas anidadas con Outlet */}
            <Route path="/dashboard" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
              <Route index element={<Navigate to="inicio" replace />} />
              <Route path="inicio" element={<DashboardHome />} />
              <Route path="pedidos" element={<PedidosDashboard />} />
              <Route path="marketing" element={<Marketing />} />
              <Route path="productos" element={<ProductosDashboard />} />
              <Route path="categorias" element={<CategoriasDashboard />} />
              <Route path="toppings" element={<ToppingsDashboard />} />
              <Route path="configuracion" element={<ConfiguracionNegocio />} />
              <Route path="mi-suscripcion" element={<MiSuscripcion />} />
              <Route path="autopilot" element={<Autopilot />} />
            </Route>

            {/* 4. ADMIN - Rutas anidadas con Outlet */}
            <Route path="/dashboard/admin" element={<AdminRoute><DashboardLayout /></AdminRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="negocios" element={<AdminNegocios />} />
            </Route>

            <Route path="*" element={<LinkNotFound />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </ToastProvider>
  </ThemeProvider>
  );
}

// Nueva función para el 404 que use el layout público
function LinkNotFound() {
  return (
    <PublicLayout>
      <NotFound />
    </PublicLayout>
  );
}
