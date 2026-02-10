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

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicons/*.png", "images/*.svg"],
      manifest: {
        name: "Pedilo - Pedidos Online",
        short_name: "Pedilo",
        description: "Sistema de pedidos online para negocios locales. Sin comisiones.",
        theme_color: "#EA580C",
        background_color: "#FFFFFF",
        display: "standalone",
        orientation: "portrait-primary",
        start_url: "/",
        scope: "/",
        icons: [
          {
            src: "/favicons/favicon2.png",
            sizes: "500x500",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/favicons/favicon2.png",
            sizes: "500x500",
            type: "image/png",
            purpose: "maskable"
          }
        ],
        screenshots: [
          {
            src: "https://via.placeholder.com/1280x720?text=Desktop+Preview",
            sizes: "1280x720",
            type: "image/png",
            form_factor: "wide",
            label: "Dashboard de Pedilo"
          },
          {
            src: "https://via.placeholder.com/720x1280?text=Mobile+Preview",
            sizes: "720x1280",
            type: "image/png",
            form_factor: "narrow",
            label: "Vista de Cliente"
          }
        ]
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2,txt,md}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\..*\/api\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 // 24 hours
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/res\.cloudinary\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "cloudinary-cache",
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
  base: "/"
});
