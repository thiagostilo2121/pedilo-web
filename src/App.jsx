/*
 * Copyright (C) 2026 Thiago Valentín Stilo Limarino
 */

import { Routes, Route, Navigate, useParams } from "react-router-dom";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Productos from "./pages/PublicNegocio";
import Checkout from "./pages/Checkout";
import SeguimientoPedido from "./pages/BuscarPedido";
import PedidosDashboard from "./pages/Pedidos";
import ProductosDashboard from "./pages/Productos";
import CategoriasDashboard from "./pages/Categorias";
import ToppingsDashboard from "./pages/Toppings";
import ConfiguracionNegocio from "./pages/Configuracion";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import Terminos from "./pages/TyC";
import Privacidad from "./pages/PdP";
import Planes from "./pages/Planes";
import CrearNegocio from "./pages/CrearNegocio";
import MiSuscripcion from "./pages/MiSus";
import SuscripcionSuccess from "./pages/SuscripcionSuccess";
import DashboardHome from "./pages/admin/DashboardHome";
import Marketing from "./pages/admin/Marketing";
import Brochure from "./pages/marketing/Brochure";
import About from "./pages/About";
import { AuthProvider, useAuth } from "./contexts/AuthProvider";
import { ToastProvider } from "./contexts/ToastProvider";

import DashboardLayout from "./layout/DashboardLayout";

// Wrapper para proteger rutas privadas
function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
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

          {/* 3. RUTAS DINÁMICAS (Clientes) */}
          <Route path="/n/:slug" element={<PublicLayout><ProductosWrapper /></PublicLayout>} />
          <Route path="/n/:slug/checkout" element={<PublicLayout><CheckoutWrapper /></PublicLayout>} />
          <Route path="/n/:slug/pedidos" element={<PublicLayout><PedidoWrapper /></PublicLayout>} />

          {/* 4. REDIRECCIÓN POR DEFECTO */}
          {/* Si alguien entra a /dashboard/* y no hace match, podría ir a NotFound o a DashboardHome */}
          <Route path="/dashboard" element={<Navigate to="/dashboard/inicio" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </ToastProvider>
  );
}
