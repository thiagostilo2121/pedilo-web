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

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: "selector",
  theme: {
    extend: {

      // ─────────────────────────────────────────────
      // 🎨 PEDILO BRAND PALETTE
      //
      // brand   → Orange/Rose  — energético, confiable, local
      // autopilot → Violet → Fuchsia — IA, inteligencia, premium
      // success → Emerald
      // warning → Amber
      // danger  → Rose
      // neutral → Zinc (dark) / Gray (light)
      // ─────────────────────────────────────────────
      colors: {
        // ── Brand principal: Naranja
        brand: {
          50:  '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',   // orange-500
          600: '#ea580c',   // orange-600 — DEFAULT brand color
          700: '#c2410c',   // orange-700 — hover/press state
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },

        // ── Autopilot / IA Module (violet — do NOT use outside autopilot)
        autopilot: {
          50:  '#f5f3ff',
          500: '#8b5cf6',
          600: '#7c3aed',   // autopilot primary
          700: '#6d28d9',
        },

        // ── Surface tokens (alias for consistent bg/border usage)
        surface: {
          DEFAULT: '#ffffff',
          subtle:  '#f9fafb',   // gray-50
          muted:   '#f3f4f6',   // gray-100
          border:  '#e5e7eb',   // gray-200
        },
        'surface-dark': {
          DEFAULT: '#09090b',   // zinc-950
          subtle:  '#18181b',   // zinc-900
          muted:   '#27272a',   // zinc-800
          border:  '#3f3f46',   // zinc-700
        },
      },

      // ─────────────────────────────────────────────
      // 🔠 TYPOGRAPHY
      // ─────────────────────────────────────────────
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],  // 10px
      },
      letterSpacing: {
        widest2: '0.2em',
      },

      // ─────────────────────────────────────────────
      // 🟠 BORDER RADIUS — rounded, never sharp
      // ─────────────────────────────────────────────
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },

      // ─────────────────────────────────────────────
      // 🌑 SHADOWS — brand-tinted (orange) + neutral card
      // ─────────────────────────────────────────────
      boxShadow: {
        'brand-sm': '0 2px 12px 0 rgba(234,88,12,0.10)',
        'brand-md': '0 4px 24px 0 rgba(234,88,12,0.20)',
        'brand-lg': '0 8px 40px 0 rgba(234,88,12,0.30)',
        'card':     '0 1px 4px 0 rgba(0,0,0,0.04), 0 4px 24px 0 rgba(0,0,0,0.06)',
        'card-dark':'0 1px 4px 0 rgba(0,0,0,0.4),  0 4px 24px 0 rgba(0,0,0,0.5)',
      },

      // ─────────────────────────────────────────────
      // 🎬 ANIMATIONS
      // ─────────────────────────────────────────────
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in-right': {
          from: { opacity: '0', transform: 'translateX(16px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        shimmer:          'shimmer 1.5s infinite',
        'fade-in':        'fade-in 0.3s ease-out both',
        'fade-in-up':     'fade-in-up 0.5s ease-out both',
        'scale-in':       'scale-in 0.25s ease-out both',
        'slide-in-right': 'slide-in-right 0.3s ease-out both',
      },

      // ─────────────────────────────────────────────
      // 🖥 LAYOUT
      // ─────────────────────────────────────────────
      maxWidth: {
        'content': '72rem',   // 1152px — main content max-width
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
};
