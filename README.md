# 🍕 Pedilo - Frontend

<div align="center">

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind_4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Version](https://img.shields.io/badge/version-1.1.0-blue?style=for-the-badge)](https://github.com/thiagostilo2121/pedilo-web/releases/tag/v1.1.0)
[![License](https://img.shields.io/badge/License-AGPL_v3-blue?style=for-the-badge)](LICENSE)

**La independencia digital del comercio local: Pedidos online sin intermediarios**

[🔗 Pedilo en Vivo](https://pediloarg.netlify.app) · [⚙️ Backend Repo](https://github.com/thiagostilo2121/pedilo-api) · [🐛 Reportar Bug](https://github.com/thiagostilo2121/pedilo-web/issues)

</div>

---

## 📖 Sobre el Proyecto

**Pedilo Frontend** es una Progressive Web App (PWA) de alto rendimiento diseñada para ofrecer una experiencia premium tanto a consumidores como a dueños de negocios. Construida sobre **React 19** y **Tailwind CSS 4**, la plataforma prioriza la velocidad, la estética y la facilidad de uso para maximizar la rentabilidad de los comercios locales.

---

## ✨ Características Destacadas

### 🎨 Experiencia del Cliente (Premium Store)
- 📸 **Navegación Intuitiva**: Sistema de categorías estilo "Stories" con scroll spy inteligente.
- ✨ **Header Inmersivo**: Diseño dinámico que se adapta a la identidad del negocio.
- 🛒 **Checkout Express**: Proceso de compra optimizado con envío directo a WhatsApp.
- 📱 **PWA Nativa**: Instalable, rápida y con una interfaz fluida que "parece una app".

### 🛠️ Panel Administrativo (Dashboard 2.0)
- 📈 **Analytics en Tiempo Real**: Gráficos de ventas, horarios pico y tendencias con Recharts.
- 📥 **Importación Masiva**: Sube cientos de productos en segundos mediante archivos **Excel (.xlsx)**.
- ⚙️ **Configuración Total**: Control sobre toppings, variantes, stock y horarios de atención.
- 💳 **Gestión de Suscripciones**: Integración con Mercado Pago para acceso a funciones Premium.
- 🔍 **Smart Scanner**: Soporte para QR y códigos de barras (Cámara/USB) con búsqueda en Open Food Facts.

---

## 🛠️ Tech Stack

| Categoría | Tecnología |
|-----------|------------|
| **Framework** | [React 19](https://react.dev/) |
| **Bundler** | [Vite 7](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) + [DaisyUI 5](https://daisyui.com/) |
| **Navigation** | [React Router 7](https://reactrouter.com/) |
| **State/Data** | Axios + Context API |
| **Forms** | React Hook Form |
| **Tooling** | ESLint, PostCSS, Vite PWA |

---

## 🏗️ Arquitectura

Siguiendo principios de mantenibilidad y escalabilidad, el proyecto se organiza en:

```
src/
├── api/              # Clientes Axios (Privado y Público)
├── components/       # Componentes atómicos y UI reutilizable
├── contexts/         # Estado global (Auth, Notificaciones)
├── hooks/            # Lógica extraída (useAuth, useRequirePremium)
├── layout/           # Estructuras maestras (Dashboard vs Público)
├── pages/            # Vistas de la aplicación
├── services/         # Capa de comunicación con la API
└── constants/        # Configuraciones globales y estilos por defecto
```

---

## 🚀 Inicio Rápido

### Requisitos
- Node.js 18.0 o superior.
- npm.

### Instalación

1. **Clonar e instalar**:
   ```bash
   git clone https://github.com/thiagostilo2121/pedilo-web.git
   cd pedilo-web
   npm install
   ```

2. **Configuración**:
   ```bash
   cp .env.example .env
   # Configura tus variables de Cloudinary y Backend URL
   ```

3. **Ejecutar**:
   ```bash
   npm run dev  # Servidor de desarrollo con HMR
   ```

---

## 📜 Licencia

Este proyecto está bajo la licencia **GNU Affero General Public License v3.0 (AGPL-3.0)**. 

> [!IMPORTANT]
> Si decides utilizar o modificar este código en un servicio accesible a la red, **debes liberar el código fuente bajo la misma licencia**.

---

## 👤 Autor

**Thiago Valentín Stilo Limarino**
- GitHub: [@thiagostilo2121](https://github.com/thiagostilo2121)

---

<div align="center">

⭐ **"Pedilo. Tu negocio, tus reglas, tu ganancia."** ⭐

</div>