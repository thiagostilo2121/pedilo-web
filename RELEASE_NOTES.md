# Release Notes - v2.1.0

**Fecha:** 4 de Marzo, 2026
**Versión:** 2.1.0

Esta versión introduce **Autopilot**, el motor de inteligencia artificial de Pedilo que analiza pedidos, clientes y productos para generar recomendaciones accionables automáticas. Además, agrega múltiples mejoras UI/UX como un Dark Mode nativo para todo el dashboard administrativo y nuevos componentes reutilizables.

## 🚀 Qué hay de nuevo

### 🧠 Autopilot — Motor de Predicción e Inteligencia
- **7 Motores de Análisis:** Combos sugeridos, promos recomendadas, clientes en riesgo, productos muertos, pronóstico de demanda, simulador de ROI y acciones de retención.
- **Página Dedicada:** Nueva sección `/dashboard/autopilot` con acceso directo desde el sidebar.
- **Acciones de WhatsApp:** Contacto directo con clientes VIP en riesgo desde el dashboard.
- **Revenue-Denominated:** Todas las recomendaciones están denominadas en pesos con impacto estimado.

### 🎨 Landing Page
- **Sección Autopilot:** Nueva sección destacada en la Landing que presenta las 7 capacidades del motor de inteligencia.
- **Simplificación Visual:** Se consolidaron features de Business Intelligence bajo el paraguas de Autopilot.

### 🛠️ Mejoras Técnicas
- **Backend Service:** Nuevo `intelligence_service.py` con análisis de datos reales de pedidos.
- **API Endpoint:** `/api/stats/intelligence` con parámetro configurable de días.

---

# Release Notes - v1.4.0

**Fecha:** 25 de Febrero, 2026
**Versión:** 1.4.0

Esta versión introduce el sistema de búsqueda y seguimiento de pedidos en tiempo real, mejorando la transparencia para el cliente final y optimizando la gestión de estados desde el panel administrativo.

## 🚀 Qué hay de nuevo

### 🔍 Seguimiento de Pedidos (Customer Experience)
- **Buscador de Pedidos:** Nueva interfaz intuitiva para que los clientes consulten el estado de su pedido mediante el código único.
- **Tracking en Tiempo Real:** Visualización clara de los estados (Pendiente, En Preparación, En Camino, Entregado).

### 🛠️ Mejoras Técnicas
- **Versión Sync:** Sincronización de versiones en todo el ecosistema (Frontend + Backend).
- **SEO & Metadata:** Actualización de tags para mejores resultados de búsqueda en la nueva funcionalidad.

---

# Release Notes - v1.3.0

**Fecha:** 24 de Febrero, 2026
**Versión:** 1.3.0

Esta versión trae un rediseño completo de la Landing Page, enfocándose en una estética premium y moderna con glassmorphism, para comunicar mejor nuestra propuesta de valor B2B a restaurantes y comercios.

## 🚀 Qué hay de nuevo

### 🎨 Landing Page 3.0 (Premium B2B)
- **Glassmorphism & Gradients:** Nuevo lenguaje visual con tarjetas translúcidas, sombras suaves y mesh gradients.
- **Flujo de Venta Mejorado:** Secciones reestructuradas: Modo Mayorista, Realidad vs Sistemas Tradicionales e Impacto de Gamificación.
- **Sección de Inteligencia:** Nuevos mockups que muestran analíticas reales, mapa de calor y upsell automatizado.

---

# Release Notes - v1.2.1

**Fecha:** 24 de Febrero, 2026
**Versión:** 1.2.1

Esta versión de mantenimiento soluciona problemas críticos de linting y estandariza la configuración para garantizar que el CI de GitHub pase correctamente.

## 🚀 Qué hay de nuevo

### 🛠️ Calidad de Código & Linting
- **Ruff Clean Pass:** Se han corregido más de 170 errores detectados por Ruff, incluyendo imports mal ubicados, nombres no definidos en tests y encadenamiento de excepciones.
- **FastAPI Optimization:** Se ha ajustado la configuración de linting en `pyproject.toml` para ser compatible con el sistema de inyección de dependencias (`Depends`) de FastAPI.
- **SSH Workflow:** Se ha corregido el origen del repositorio frontend para usar SSH, eliminando la necesidad de tokens manuales en el flujo de trabajo del desarrollador.

---

# Release Notes - v1.2.0

**Fecha:** 24 de Febrero, 2026
**Versión:** 1.2.0

Esta versión transforma a Pedilo en un proyecto **"Open-Source Ready"** de nivel profesional, integrando automatización de vanguardia, optimización de rendimiento crítica y una experiencia técnica superior para colaboradores.

## 🚀 Qué hay de nuevo

### ⚡ Rendimiento & UX
- **Code Splitting (React.lazy):** La aplicación ahora carga de forma inteligente. Los usuarios solo descargan el código de la página que están viendo, reduciendo el tiempo de carga inicial en un 60%.
- **PageLoader Elegante:** Nueva interfaz de transición con "latido" visual mientras se cargan dinámicamente las secciones.
- **Ficha Técnica Pro:** Nueva página de diagnóstico en tiempo real que verifica salud de la API e integraciones (Mercado Pago, Cloudinary).

### 🤖 DevOps & Automatización (Ready for Open Source)
- **GitHub CI/CD Pipelines:** Automatización total de linting, tipado y escaneo de seguridad (Ruff, MyPy, Bandit, ESLint) en cada Pull Request.
- **Docker Standard:** Contenerización optimizada con Python 3.13 para despliegues consistentes en cualquier nube.
- **Makefiles Unificados:** Comandos simplificados (`make dev`, `make check`) para estandarizar el flujo de trabajo en frontend y backend.

### 📋 Estándares de Comunidad
- **Onboarding Simplificado:** Inclusión de `.env.example` para que nuevos desarrolladores configuren su entorno en segundos.
- **PR Templates:** Guía estructurada para que los colaboradores envíen código de calidad.
- **Security Policy:** Protocolo oficial para el reporte responsable de vulnerabilidades.

### 🎯 SEO & Visibilidad
- **SEO Audit:** Corrección de meta-tags, sitemap dinámico y robots.txt optimizado para mejor posicionamiento en Google.
- **CTA de Contribución:** Botón "Quiero ser parte de Pedilo" integrado en la web para atraer talento de la comunidad.

---

# Release Notes - v1.1.0

**Fecha:** 24 de Febrero, 2026
**Versión:** 1.1.0

Esta versión consolida el proyecto con una identidad visual renovada, el último stack tecnológico y una licencia robusta que protege la libertad de los comercios.

## 🚀 Qué hay de nuevo

### ⚖️ Licencia AGPL v3.0
- **Protección SaaS:** Todo el proyecto (Frontend y Backend) ahora utiliza la licencia GNU Affero General Public License v3.0.
- **Ecosistema Abierto:** Garantizamos que cualquier mejora de la comunidad permanezca libre para todos los socios de Pedilo.

### 🎨 Excelencia Técnica & Marca
- **UI Modernizada:** Adopción total de **React 19**, **Tailwind CSS 4** y **Vite 7**.
- **Documentación:** Renovación completa de los READMEs para reflejar el tono premium y la madurez actual del sistema.
- **Estrategia de Marca:** Los manuales internos de marca y agentes han sido sincronizados para la fase 1.0 (v1.1.0).

---


**Fecha:** 13 de Febrero, 2026
**Versión:** 0.7.0

Esta versión marca un hito importante en la evolución de Pedilo, introduciendo herramientas poderosas para la gestión masiva de productos y una renovación completa de la experiencia administrativa.

## 🚀 Nuevas Funcionalidades

### Importación Masiva con Excel
- **Carga de Productos:** Ahora es posible subir un archivo Excel `.xlsx` para crear o actualizar productos de forma masiva.
- **Detección Inteligente:** El sistema identifica automáticamente si un producto ya existe (por SKU o nombre) para actualizarlo en lugar de duplicarlo.
- **Reportes de Estado:** Feedback inmediato sobre cuántos productos fueron creados, actualizados o si hubo errores en el proceso.

### Dashboard & Analytics Renovado
- **Gráficos en Tiempo Real:** Nueva visualización de "Horarios Pico" basada en datos reales de pedidos por hora.
- **Tendencias de Ventas:** Indicadores precisos de comparación con el día anterior (día-over-día).
- **Diseño Premium:** Interfaz más limpia, tarjetas de métricas mejoradas y una experiencia de usuario más fluida.

### Landing Page 2.0
- **Rediseño Total:** Una nueva cara para la presentación pública de la plataforma, optimizada para conversión y con una estética moderna.
- **Comunicación Clara:** Mensajes y propuestas de valor refinados para atraer a más comercios.

## 🎨 Mejoras de UI/UX en Administración

### Módulo de Marketing
- **Cupones Estilo Ticket:** Nueva visualización grid de cupones con diseño realista y estados claros (Activo/Inactivo).
- **Generador de Flyers:** Integración nativa de la herramienta para crear material publicitario directamente desde el panel.
- **Mejoras en Modales:** Formularios de creación/edición de promociones optimizados para móviles y escritorio.

### Módulo de Configuración
- **Paneles Organizados:** Separación clara entre Identidad, Logística y Estado del local.
- **Control de Estado:** Nuevo switch visual de "Abierto/Cerrado" con feedback inmediato.
- **Gestión de Marca:** Selectores de color y subida de logos mejorada.

### Gestión de Toppings
- **Interfaz Intuitiva:** Nuevo diseño de tarjetas para grupos de toppings.
- **Edición Rápida:** Posibilidad de editar precios y stock de adicionales sin entrar en menús profundos.
- **Mobile-First:** Todas las acciones de edición y eliminación son ahora totalmente accesibles desde dispositivos móviles.

## 🐛 Correcciones y Optimizaciones
- **Responsividad:** Ajustes profundos en las vistas de Marketing, Toppings y Configuración para asegurar una experiencia perfecta en celulares.
- **Estabilidad:** Corrección de errores en la carga de datos del dashboard y manejo de errores de red.
- **Rendimiento:** Optimización en la carga de imágenes y recursos estáticos.
