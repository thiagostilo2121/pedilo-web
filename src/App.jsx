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
import { AuthProvider, useAuth } from "./contexts/AuthProvider";
import { ToastProvider } from "./contexts/ToastProvider";

// Componente para proteger rutas privadas
function PrivateRoute({ children }) {
  const { user } = useAuth();
  // El AuthProvider ya maneja el loading, así que si llegamos aquí, loading es false.
  // Pero por seguridad:
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

// Layout para el Dashboard (dueños) - Podrías agregar un Sidebar aquí luego
function DashboardLayout({ children }) {
  return (
    <div className="">
      <main className="">{children}</main>
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
          <Route path="/crear-negocio" element={<PublicLayout><CrearNegocio /></PublicLayout>} />
          <Route path="/suscripcion/success" element={<PrivateRoute><SuscripcionSuccess /></PrivateRoute>} />

          {/* 2. RUTAS DE DASHBOARD (Protegidas) */}
          <Route path="/dashboard/pedidos" element={
            <PrivateRoute><DashboardLayout><PedidosDashboard /></DashboardLayout></PrivateRoute>
          } />
          <Route path="/dashboard/productos" element={
            <PrivateRoute><DashboardLayout><ProductosDashboard /></DashboardLayout></PrivateRoute>
          } />
          <Route path="/dashboard/categorias" element={
            <PrivateRoute><DashboardLayout><CategoriasDashboard /></DashboardLayout></PrivateRoute>
          } />
          <Route path="/dashboard/toppings" element={
            <PrivateRoute><DashboardLayout><ToppingsDashboard /></DashboardLayout></PrivateRoute>
          } />
          <Route path="/dashboard/configuracion" element={
            <PrivateRoute><DashboardLayout><ConfiguracionNegocio /></DashboardLayout></PrivateRoute>
          } />
          <Route path="/dashboard/mi-suscripcion" element={
            <PrivateRoute><DashboardLayout><MiSuscripcion /></DashboardLayout></PrivateRoute>
          } />

          {/* 3. RUTAS DINÁMICAS (Clientes) */}
          <Route path="/n/:slug" element={<PublicLayout><ProductosWrapper /></PublicLayout>} />
          <Route path="/n/:slug/checkout" element={<PublicLayout><CheckoutWrapper /></PublicLayout>} />
          <Route path="/n/:slug/pedidos" element={<PublicLayout><PedidoWrapper /></PublicLayout>} />

          {/* 4. REDIRECCIÓN POR DEFECTO */}
          <Route path="/dashboard" element={
            <PrivateRoute><DashboardLayout><ConfiguracionNegocio /></DashboardLayout></PrivateRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </ToastProvider>
  );
}
