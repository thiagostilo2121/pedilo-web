# 🍕 Pedilo - Frontend

<div align="center">

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind_4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![AI Ready](https://img.shields.io/badge/AI_Ready-FFD700?style=for-the-badge&logo=robot&logoColor=black)](AI_CONTEXT.md)
[![License](https://img.shields.io/badge/License-AGPL_v3-blue?style=for-the-badge)](LICENSE)

**Sistema de pedidos online sin comisiones para pequeños negocios**

[🔗 Pedilo en Vivo](https://pediloarg.netlify.app) · [⚙️ Backend Repo](https://github.com/thiagostilo2121/pedilo-api) · [🐛 Reportar Bug](https://github.com/thiagostilo2121/pedilo-web/issues)

</div>

---

## ✨ Características

### 🎨 Experiencia Premium (Public View v2)
- 📸 **Instagram-Style Navigation** - Categorías circulares tipo "Stories" con scroll spy automático.
- ✨ **Immersive Header** - Banner con blur dinámico, logo flotante y estado del negocio (Abierto/Cerrado) animado.
- 🚀 **Smooth Discovery** - Desplazamiento continuo con anclas automáticas y recomendaciones siempre visibles.
- 💅 **UI Refinada** - Tarjetas de producto con sombras suaves, badges de "Popular" y botones de acción optimizados.

### Para Dueños de Negocios
- 🏪 **Dashboard Completo** - Gestión de productos, categorías y pedidos en tiempo real.
- 📊 **Estadísticas Clave** - Visualización de ventas y productos más vendidos con Recharts.
- ⚙️ **Configuración Total** - Gestión de toppings, horarios, métodos de pago y delivery.
- 📸 **Scanner Integrado** - Lectura de códigos de barra (Cámara/USB) y búsqueda automática en Open Food Facts.
- 📦 **Modo Distribuidora** - Precios mayoristas, mínimos por bulto y reglas de negocio B2B.
- 💳 **Monetización** - Integración con Mercado Pago para suscripciones premium automáticas.

### Para Clientes
- 🛒 **Carrito Inteligente** - Persistente y optimizado para una conversión rápida.
- 📱 **PWA Ready** - Instalable como app, con colores dinámicos según el negocio.
- 💬 **WhatsApp Express** - Envío de pedidos directo al WhatsApp del local sin vueltas.
- 🔍 **Rastreador de Pedidos** - Seguimiento de estado con código único y feedback visual.

---

## 🛠️ Tech Stack

| Categoría | Tecnología |
|-----------|------------|
| **Framework** | [React 19](https://react.dev/) |
| **Build Tool** | [Vite](https://vitejs.dev/) |
| **Estilos** | [Tailwind CSS 4](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/) |
| **Routing** | [React Router DOM 7](https://reactrouter.com/) |
| **Forms** | [React Hook Form](https://react-hook-form.com/) |
| **HTTP Client** | [Axios](https://axios-http.com/) |
| **Iconos** | [Lucide React](https://lucide.dev/) |
| **Gráficos** | [Recharts](https://recharts.org/) |
| **Imágenes** | [Cloudinary](https://cloudinary.com/) |

---

## 🏗️ Arquitectura

```
src/
├── api/              # Configuración de Axios
│   ├── api.js        # Cliente autenticado (JWT)
│   └── apiPublic.js  # Cliente público (sin auth)
├── components/       # Componentes reutilizables
│   └── ConfirmModal.jsx
├── constants/        # Configuración centralizada
├── contexts/         # Estado global
│   ├── AuthProvider.jsx
│   └── ToastProvider.jsx
├── hooks/            # Custom hooks
│   ├── useRequirePremium.js
│   └── useDocumentTitle.js
├── layout/           # Layouts (Dashboard, Public)
├── pages/            # Páginas/Vistas
│   ├── Dashboard/    # Configuracion, Pedidos, Productos, Categorias
│   └── Public/       # PublicNegocio, Checkout, Tracking
├── services/         # Lógica de negocio
└── App.jsx           # Router principal
```

### Patrones Implementados

| Patrón | Uso |
|--------|-----|
| **Context API** | Auth global, Toast notifications |
| **Custom Hooks** | `useRequirePremium`, `useDocumentTitle` |
| **Service Layer** | Abstracción de API calls |
| **Route Guards** | `PrivateRoute` para rutas protegidas |

---

## 🚀 Quick Start

### Requisitos

- Node.js 18+
- npm o yarn

### Instalación

```bash
# Clonar repositorio
git clone https://github.com/thiagostilo2121/pedilo-web.git
cd pedilo-web

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus valores
```

### Variables de Entorno

```env
VITE_API_URL=http://localhost:8000/api
VITE_API_PUBLIC_URL=http://localhost:8000/public
VITE_CLOUDINARY_CLOUD_NAME=tu-cloud-name
VITE_CLOUDINARY_UPLOAD_PRESET=tu-preset
```

### Ejecutar

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

---

## 🎮 Demo

### Tiendas de Prueba
- [Pedilo Oficial](https://pediloarg.netlify.app/n/pedilo-oficial)
- [Pedilo Oficial 2](https://pediloarg.netlify.app/n/pedilo-oficial-2)
- [DEMO](https://pediloarg.netlify.app/n/demo)

### Acceso al Dashboard
```
Email: pedilo@testing.com
Password: 12345678
```

> ⚠️ Esta cuenta es pública. Cualquiera puede acceder y modificar datos.

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas!

1. Fork el proyecto
2. Creá tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: AmazingFeature'`)
4. Push a la branch (`git push origin feature/AmazingFeature`)
5. Abrí un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la [GNU Affero General Public License v3.0 (AGPL-3.0)](LICENSE).

Esto significa que si modificás este código y lo usás en un servicio público, **debés liberar tu código fuente**.

---

## 👤 Autor

**Thiago Valentín Stilo Limarino**

- GitHub: [@thiagostilo2121](https://github.com/thiagostilo2121)

---

## 💬 Nota del Desarrollador

> Este proyecto fue creado en **una semana y media** (Backend + Frontend). El backend fue desarrollado principalmente por mí con asistencia de IA. El frontend, siendo honesto, tuvo una participación mayor de herramientas de IA dado que mi especialidad es el backend (Python/FastAPI).
>
> A pesar de eso, me siento orgulloso del resultado. El proyecto está diseñado para ser escalable y modular.

---

<div align="center">

⭐ Si te sirvió este proyecto, dejá una estrella!

</div>