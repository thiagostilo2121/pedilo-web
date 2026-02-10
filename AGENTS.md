# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Pedilo Frontend is a React + Vite e-commerce platform for online ordering. Business owners manage their store via a dashboard; customers browse and order through public slug-based URLs (`/n/:slug`).

## Commands

```powershell
npm run dev      # Start development server (Vite HMR)
npm run build    # Production build to dist/
npm run lint     # Run ESLint
npm run preview  # Preview production build locally
```

## Environment Variables

Required in `.env`:
- `VITE_API_URL` - Backend API base URL (authenticated endpoints)
- `VITE_API_PUBLIC_URL` - Backend API base URL (public endpoints)
- `VITE_CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name for image uploads
- `VITE_CLOUDINARY_UPLOAD_PRESET` - Cloudinary unsigned upload preset

## Architecture

### API Layer (`src/api/`)
- **`api.js`** - Axios instance with JWT auth interceptor (reads token from localStorage)
- **`apiPublic.js`** - Axios instance without auth for public endpoints

### Services (`src/services/`)
Encapsulate API calls. All services return promises.
- **`authService.js`** - Auth endpoints (`/auth/*`)
- **`productService.js`** - Products CRUD + Cloudinary image upload helper
- **`pedidosService.js`** - Orders for both dashboard (private) and customers (public via slug)
- **`negocioService.js`** - Business settings (update info, logo, banner, shipping/payments)
- **`statsService.js`** - Business stats (overview, charts, top products)
- **`promotionsService.js`** - Promotions CRUD
- **`suscripcionService.js`** - Subscription management (Mercado Pago checkout URL, subscription status)
- **`toppingPublicService.js`** - Public topping data for products (via slug)

### Contexts (`src/contexts/`)
- **`AuthProvider.jsx`** - Manages user state, provides `login`, `register`, `logout`, `get_usuario`. Wraps app and blocks render until auth initializes.
- **`ToastProvider.jsx`** - Toast notifications via `useToast()` → `toast.success()`, `toast.error()`, etc.

### Auth (`src/auth/`)
- **`useAuth.js`** - Re-exports `useAuth` hook from `AuthProvider` for cleaner imports

### Hooks (`src/hooks/`)
- **`useDocumentTitle.js`** - Sets document title dynamically
- **`useRequirePremium.js`** - Verifies premium subscription and business ownership, redirects if requirements not met

### Layouts (`src/layout/`)
- **`DashboardLayout.jsx`** - Sidebar layout for dashboard pages with navigation menu, collapsible sidebar, mobile responsive
- **`PublicLayout.jsx`** - Simple layout for public pages with footer

### Constants (`src/constants/`)
- **`index.js`** - App-wide constants: default images, Cloudinary config, file upload limits, refresh intervals

### Components (`src/components/`)
Organized into subdirectories:
- **`configuracion/`** - Business configuration components
- **`dashboard/`** - Dashboard-specific components
- **`home/`** - Landing page components
- **`ui/`** - Reusable UI components
- Root-level components (e.g., `Footer.jsx`)

### Pages (`src/pages/`)
Top-level page components for routing:
- **`admin/`** - Dashboard pages (`DashboardHome.jsx`, `Marketing.jsx`)
- Public pages: `Landing.jsx`, `Login.jsx`, `Register.jsx`, `Planes.jsx`, `CrearNegocio.jsx`, etc.
- Dashboard pages: `Pedidos.jsx`, `Productos.jsx`, `Categorias.jsx`, `Toppings.jsx`, `Configuracion.jsx`, `MiSus.jsx`
- Customer pages: **`PublicNegocio.jsx`** (Premium store view with scroll spy), `Checkout.jsx`, `BuscarPedido.jsx`

### Routing (`src/App.jsx`)
Three route categories with layouts:
1. **Static public** - `/`, `/login`, `/register`, `/terminos`, `/privacidad`, `/planes`, `/crear-negocio`, `/suscripcion/success` (wrapped in `PublicLayout`)
2. **Dashboard (protected)** - `/dashboard/inicio`, `/dashboard/pedidos`, `/dashboard/marketing`, `/dashboard/productos`, `/dashboard/categorias`, `/dashboard/toppings`, `/dashboard/configuracion`, `/dashboard/mi-suscripcion` (wrapped in `PrivateRoute` and use `DashboardLayout`, redirects to `/login` if unauthenticated)
3. **Dynamic public** - `/n/:slug`, `/n/:slug/checkout`, `/n/:slug/pedidos` (customer-facing store pages, wrapped in `PublicLayout`)

### UI Stack
- Tailwind CSS v4 with `@tailwindcss/vite` plugin
- Flowbite + Flowbite React for components
- DaisyUI for additional component styles
- Lucide React for icons
- React Hook Form for form handling
- Recharts for dashboard analytics

## Key Patterns

- **API Usage**: Use `api` for authenticated requests, `apiPublic` for public requests.
- **State Management**: Context API for global state (Auth, Toast).
- **Premium UX (Public Store)**:
    - **Scroll Spy**: Navigation updates based on scroll position using `IntersectionObserver`.
    - **Smooth Scroll**: Category selection triggers smooth scroll to anchored sections.
    - **Optimistic Interactions**: Progressive image loading and pre-loading of toppings for zero-latency feel.
    - **Responsive Layout**: Horizontal scrollbars hidden on mobile but sleekly visible on desktop via custom CSS utilities (`scrollbar-responsive`).
- **Auth Guards**: `PrivateRoute` for dashboard access, `useRequirePremium()` for subscription-locked features.
- **Image Handling**: All images (logos, banners, products) are uploaded to Cloudinary via services.
- **PWA Integration**: Dynamic theme colors and meta tags based on business configuration.

## Deployment

Deployed to Netlify. SPA redirect configured in `netlify.toml`.
