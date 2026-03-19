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

import { useState, useEffect, useRef } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { useTheme } from "../contexts/ThemeProvider";
import negocioService from "../services/negocioService";
import CommandPalette from "../components/dashboard/CommandPalette";

import DashboardSidebar from "../components/dashboard/layout/DashboardSidebar";
import DashboardHeader from "../components/dashboard/layout/DashboardHeader";
import DashboardMobileMenu from "../components/dashboard/layout/DashboardMobileMenu";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [negocio, setNegocio] = useState(null);
  
  const { logout, user } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const isFetching = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isFetching.current) return;

    const cached = sessionStorage.getItem("negocio_info");
    if (cached) {
      setNegocio(JSON.parse(cached));
      return; 
    }

    isFetching.current = true;
    negocioService.getMiNegocio()
      .then(data => {
        setNegocio(data);
        sessionStorage.setItem("negocio_info", JSON.stringify(data));
      })
      .catch(err => console.error("Error fetching negocio:", err))
      .finally(() => {
        isFetching.current = false;
      });
  }, []);

  const logoutAction = () => {
    sessionStorage.removeItem("negocio_info");
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-zinc-950 overflow-hidden font-sans transition-colors duration-300">
      <CommandPalette />
      
      {/* SIDEBAR DESKTOP */}
      <DashboardSidebar 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        user={user}
        isDark={isDark}
        toggleTheme={toggleTheme}
        logoutAction={logoutAction}
      />

      {/* CONTENEDOR PRINCIPAL */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative">
        {/* HEADER DESKTOP & MOBILE */}
        <DashboardHeader 
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          negocio={negocio}
          user={user}
          isDark={isDark}
          toggleTheme={toggleTheme}
        />

        {/* MENU MOBILE DESPLEGABLE */}
        <DashboardMobileMenu 
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          user={user}
          isDark={isDark}
          toggleTheme={toggleTheme}
          logoutAction={logoutAction}
        />

        {/* CONTENIDO SCROLLABLE */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-gray-50 dark:bg-zinc-950 transition-colors duration-300 relative z-0">
          <div className="w-full max-w-screen-2xl mx-auto h-full">
            {children || <Outlet />}
          </div>
        </main>
      </div>
    </div>
  );
}