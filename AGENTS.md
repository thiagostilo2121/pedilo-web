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

### Contexts (`src/contexts/`)
- **`AuthProvider`** - Manages user state, provides `login`, `register`, `logout`. Wraps app and blocks render until auth initializes.
- **`ToastProvider`** - Toast notifications via `useToast()` → `toast.success()`, `toast.error()`, etc.

### Routing (`src/App.jsx`)
Three route categories with layouts:
1. **Static public** - `/`, `/login`, `/register`, `/terminos`, `/privacidad`, `/planes`, `/crear-negocio`
2. **Dashboard (protected)** - `/dashboard/*` routes wrapped in `PrivateRoute` (redirects to `/login` if unauthenticated)
3. **Dynamic public** - `/n/:slug`, `/n/:slug/checkout`, `/n/:slug/pedidos` (customer-facing store pages)

### UI Stack
- Tailwind CSS v4 with `@tailwindcss/vite` plugin
- Flowbite + Flowbite React for components
- DaisyUI for additional component styles
- Lucide React for icons
- React Hook Form for form handling

## Key Patterns

- Use `api` for authenticated requests, `apiPublic` for public requests
- Access auth via `useAuth()` hook from `contexts/AuthProvider`
- Access toast notifications via `useToast()` hook
- Image uploads go through `productService.uploadImage()` → Cloudinary
- Slug-based routes use URL params: `const { slug } = useParams()`

## Deployment

Deployed to Netlify. SPA redirect configured in `netlify.toml`.
