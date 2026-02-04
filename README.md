# 📦 Pedilo - Frontend

**Pedilo** es una plataforma moderna para la gestión de pedidos y negocios, diseñada para ofrecer una experiencia fluida tanto a los dueños de negocios como a sus clientes. Esta aplicación frontend está construida con tecnologías de vanguardia para garantizar rapidez, escalabilidad y un diseño excepcional.

---

## 🚀 Características Principales

- **Gestión de Negocios**: Creación y configuración detallada de perfiles comerciales.
- **Catálogo de Productos**: Administración completa de productos y categorías.
- **Sistema de Pedidos**: Seguimiento y gestión de pedidos recibidos.
- **Página Pública de Negocio**: Interfaz optimizada para que los clientes realicen pedidos.
- **Checkout Dinámico**: Proceso de compra sencillo para los usuarios finales.
- **Autenticación Segura**: Sistema de login y registro para dueños de negocios.
- **Gestión de Suscripciones**: Control de planes y servicios activos.
- **Diseño Responsivo**: Experiencia de usuario optimizada para móviles y escritorio.
- **Integración con WhatsApp**: Comunicación directa para la confirmación de pedidos.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Estilos**: [Tailwind CSS 4](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/) + [Flowbite](https://flowbite.com/)
- **Navegación**: [React Router DOM 7](https://reactrouter.com/)
- **Gestión de Formularios**: [React Hook Form](https://react-hook-form.com/)
- **API Client**: [Axios](https://axios-http.com/)
- **Multimedia**: [Cloudinary](https://cloudinary.com/) (Gestión de imágenes)
- **Iconografía**: [Lucide React](https://lucide.dev/)

---

## 📂 Estructura del Proyecto

```text
src/
├── api/          # Configuraciones de Axios y llamadas base
├── assets/       # Recursos estáticos (imágenes, logos)
├── auth/         # Lógica de autenticación
├── components/   # Componentes UI reutilizables
├── contexts/     # Contextos globales (Auth, Pedidos, etc.)
├── layout/       # Componentes de estructura (Navbar, Footer, Sidebar)
├── pages/        # Pantallas principales de la aplicación
├── services/     # Lógica de negocio e interacción con APIs
├── App.jsx       # Componente raíz y configuración de rutas
└── main.jsx      # Punto de entrada de la aplicación
```

---

## ⚙️ Configuración e Instalación

### Requisitos Previos

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- npm o yarn

### Pasos para iniciar el proyecto

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/thiagostilo2121/pedilo-web.git
   cd pedilo-web
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Variables de Entorno**:
   Crea un archivo `.env` en la raíz del proyecto y configura las variables necesarias.
   ```env
   VITE_API_URL=https://tu-api.com/api
   VITE_API_PUBLIC_URL=https://tu-api.com/public
   VITE_CLOUDINARY_CLOUD_NAME=tu-cloud-name
   VITE_CLOUDINARY_UPLOAD_PRESET=tu-preset
   ```

4. **Iniciar en modo desarrollo**:
   ```bash
   npm run dev
   ```

5. **Construir para producción**:
   ```bash
   npm run build
   ```

---

## 📜 Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo con Vite.
- `npm run build`: Genera los archivos estáticos optimizados para producción en la carpeta `/dist`.
- `npm run lint`: Ejecuta el linter (ESLint) para verificar la calidad del código.
- `npm run preview`: Previsualiza localmente la construcción de producción.

---

## 🤝 Contribución

Si deseas contribuir a este proyecto, por favor abre un issue o envía un pull request. Todas las contribuciones son bienvenidas.

---

## 📄 Licencia

Este proyecto está bajo la Licencia [GNU Affero General Public License v3.0 (AGPLv3)](LICENSE).

---

### Comentarios del Desarrollador

Este proyecto ha sido creado en una semana y media (Back + Front) donde el backend (Python + FastAPI) fue creado por mí con ayuda de IA como herramienta (como normalmente se utiliza). Por otro lado y siendo honestos, el frontend no fue hecho completamente por mí, la ayuda de la inteligencia artificial fue crucial para poder terminar el proyecto debido a que no poseo conocimientos avanzados en React y Tailwind CSS. Sin embargo, me siento orgulloso del resultado final y espero que sea de utilidad para quienes lo utilicen. El proyecto está pensado para ser escalable y modular, permitiendo agregar nuevas funcionalidades en el futuro.

- El código del backend se encuentra cerrado por seguridad por el momento. Se planea abrirlo en un futuro

- El proyecto está desplegado en Netlify, pueden verlo [aquí](https://pediloarg.netlify.app)

- Contamos con negocios DEMO para probar el sistema desde el lado del cliente final, pueden verlos en [Pedilo Oficial](https://pediloarg.netlify.app/n/pedilo-oficial), [Pedilo Oficial 2](https://pediloarg.netlify.app/n/pedilo-oficial-2) y [DEMO](https://pediloarg.netlify.app/n/demo)

- Si quieren probar la dashboard de administrador, pueden hacerlo con las siguientes credenciales:
  - Email: `pedilo@testing.com`
  - Contraseña: `12345678`

- Tengan en cuenta que la cuenta es abierta a cualquiera, por lo que si ven que hay pedidos o cosas raras, es porque cualquiera puede entrar y hacer lo que quiera. No es una cuenta privada.