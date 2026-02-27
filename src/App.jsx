/*
 * Copyright (C) 2026 Thiago Valentín Stilo Limarino
 */

import { lazy, Suspense } from "react";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import Footer from "./components/Footer";
import Landing from "./pages/Landing"; // Mantenemos Landing estático para LCP óptimo
import { AuthProvider, useAuth } from "./contexts/AuthProvider";
import { ToastProvider } from "./contexts/ToastProvider";
import DashboardLayout from "./layout/DashboardLayout";

// Lazy loading de páginas
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const Productos = lazy(() => import("./pages/PublicNegocio"));
const Checkout = lazy(() => import("./pages/Checkout"));
const SeguimientoPedido = lazy(() => import("./pages/BuscarPedido"));
const PedidosDashboard = lazy(() => import("./pages/Pedidos"));
const ProductosDashboard = lazy(() => import("./pages/Productos"));
const CategoriasDashboard = lazy(() => import("./pages/Categorias"));
const ToppingsDashboard = lazy(() => import("./pages/Toppings"));
const ConfiguracionNegocio = lazy(() => import("./pages/Configuracion"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Terminos = lazy(() => import("./pages/TyC"));
const Privacidad = lazy(() => import("./pages/PdP"));
const Planes = lazy(() => import("./pages/Planes"));
const CrearNegocio = lazy(() => import("./pages/CrearNegocio"));
const MiSuscripcion = lazy(() => import("./pages/MiSus"));
const SuscripcionSuccess = lazy(() => import("./pages/SuscripcionSuccess"));
const DashboardHome = lazy(() => import("./pages/admin/DashboardHome"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));
const AdminNegocios = lazy(() => import("./pages/admin/AdminNegocios"));
const Marketing = lazy(() => import("./pages/admin/Marketing"));
const Autopilot = lazy(() => import("./pages/admin/Autopilot"));
const Brochure = lazy(() => import("./pages/marketing/Brochure"));
const About = lazy(() => import("./pages/About"));

// Pantalla de carga elegante
const PageLoader = () => (
  <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50">
    <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mb-4"></div>
    <p className="text-gray-400 font-bold animate-pulse">Cargando Pedilo...</p>
  </div>
);

// Wrapper para proteger rutas privadas
function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

// Wrapper para rutas de admin
function AdminRoute({ children }) {
  const { user } = useAuth();
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
    <ToastProvider>
      <AuthProvider>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* 1. RUTAS ESTÁTICAS (Prioridad) */}
            <Route path="/" element={<PublicLayout><Landing /></PublicLayout>} />
            <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />
            <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
            <Route path="/terminos" element={<PublicLayout><Terminos /></PublicLayout>} />
            <Route path="/privacidad" element={<PublicLayout><Privacidad /></PublicLayout>} />
            <Route path="/planes" element={<PublicLayout><Planes /></PublicLayout>} />
            <Route path="/marketing/brochure" element={<Brochure />} />
            <Route path="/crear-negocio" element={<PublicLayout><CrearNegocio /></PublicLayout>} />
            <Route path="/acerca" element={<PublicLayout><About /></PublicLayout>} />
            <Route path="/suscripcion/success" element={<PrivateRoute><SuscripcionSuccess /></PrivateRoute>} />

            {/* 2. RUTAS DE DASHBOARD (Protegidas) */}
            <Route path="/dashboard/inicio" element={
              <PrivateRoute><DashboardHome /></PrivateRoute>
            } />
            <Route path="/dashboard/pedidos" element={
              <PrivateRoute><PedidosDashboard /></PrivateRoute>
            } />
            <Route path="/dashboard/marketing" element={
              <PrivateRoute><Marketing /></PrivateRoute>
            } />
            <Route path="/dashboard/productos" element={
              <PrivateRoute><ProductosDashboard /></PrivateRoute>
            } />
            <Route path="/dashboard/categorias" element={
              <PrivateRoute><CategoriasDashboard /></PrivateRoute>
            } />
            <Route path="/dashboard/toppings" element={
              <PrivateRoute><ToppingsDashboard /></PrivateRoute>
            } />
            <Route path="/dashboard/configuracion" element={
              <PrivateRoute><ConfiguracionNegocio /></PrivateRoute>
            } />
            <Route path="/dashboard/mi-suscripcion" element={
              <PrivateRoute><MiSuscripcion /></PrivateRoute>
            } />
            <Route path="/dashboard/autopilot" element={
              <PrivateRoute><Autopilot /></PrivateRoute>
            } />

            {/* RUTAS DE ADMIN */}
            <Route path="/dashboard/admin" element={
              <AdminRoute><AdminDashboard /></AdminRoute>
            } />
            <Route path="/dashboard/admin/users" element={
              <AdminRoute><AdminUsers /></AdminRoute>
            } />
            <Route path="/dashboard/admin/negocios" element={
              <AdminRoute><AdminNegocios /></AdminRoute>
            } />

            {/* 3. RUTAS DINÁMICAS (Clientes) */}
            <Route path="/n/:slug" element={<PublicLayout><ProductosWrapper /></PublicLayout>} />
            <Route path="/n/:slug/checkout" element={<PublicLayout><CheckoutWrapper /></PublicLayout>} />
            <Route path="/n/:slug/pedidos" element={<PublicLayout><PedidoWrapper /></PublicLayout>} />

            {/* 4. REDIRECCIÓN POR DEFECTO */}
            <Route path="/dashboard" element={<Navigate to="/dashboard/inicio" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </ToastProvider>
  );
}
