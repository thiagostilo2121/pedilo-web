---
description: Guía de implementación de Dark Mode para nuevas páginas y componentes del dashboard Pedilo
---

# Dark Mode — Guía para Agentes

## Arquitectura

Dark mode usa la clase `dark` en `<html>`, gestionada por `ThemeProvider` (en `src/contexts/ThemeProvider.jsx`).
El toggle persiste en `localStorage` con key `pedilo_theme`.

## Regla de Oro

**Un UI Dark Moderno usa contraste suave y no cansa a la vista.**
Usa la paleta `zinc` en fondo oscuro en lugar de `gray`, agrega transparencias (`white/5`, `white/10`) para bordes y hovers, lo cual da un efecto Glassmorphism muy elegante (estilo Linear/Vercel).
Los colores de acento (orange, violet, green, red, blue) **NO se cambian** sustancialmente, aunque sus fondos tenues deben utilizar opacidad.

## Tabla de Mapeo Premium (Lineal/Vercel Style)

| Light (Light Mode) | Dark (Dark Mode Premium) | Contexto de Uso |
|---|---|---|
| `bg-gray-50` | `dark:bg-zinc-950` | Fondo global de la aplicación (`<html>` o `<main>`) |
| `bg-white` | `dark:bg-zinc-900` | Tarjetas, Paneles, Modales, Dropdowns |
| `bg-gray-50` / `bg-gray-100` | `dark:bg-white/5` | Inputs, Pills, Sub-tarjetas internas, fondos tenues |
| `text-gray-900` | `dark:text-zinc-100` | Títulos principales, Valores de métricas (No usar texto blanco puro) |
| `text-gray-700` | `dark:text-zinc-300` | Párrafos fuertes o subtítulos secundarios |
| `text-gray-500` / `text-gray-600` | `dark:text-zinc-400` | Texto secundario o descriptivo normal |
| `text-gray-400` | `dark:text-zinc-500` | Textos muteados, labels, placeholders |
| `border-gray-100` | `dark:border-white/10` | Bordes principales de tarjetas y paneles |
| `border-gray-200` | `dark:border-white/20` | Bordes divisorios internos más fuertes |
| `hover:bg-gray-50` | `dark:hover:bg-white/5` | Efectos hover sutiles sobre tarjetas (filas de tabla) |
| `hover:bg-gray-100` | `dark:hover:bg-white/10` | Efectos hover más pronunciados (botones icono) |
| `shadow-sm` / `shadow-md` | `dark:shadow-none` | En Dark mode puro, los bordes `white/10` funcionan mejor que las sombras. |

## Fondos con Color de Acento (gradients, pills, badges)

Haz que resplandezcan de manera elegante sin cegar:
Usa `/{opacity}` baja tanto en el fondo como en el borde para "tintar".

Ejemplo para Naranja:
- `bg-orange-50` → `dark:bg-orange-500/10`
- `border-orange-100` → `dark:border-orange-500/20`
- `text-orange-600` → `dark:text-orange-400` (Subir luminosidad al texto para contraste en oscuro)

## Checklist para Nuevos Componentes

1. [ ] Contenedor principal: `bg-white dark:bg-zinc-900 border-gray-100 dark:border-white/10`
2. [ ] Títulos: `text-gray-900 dark:text-zinc-100`
3. [ ] Subtextos: `text-gray-500 dark:text-zinc-400`
4. [ ] Botones/Inputs internos tenues: `bg-gray-50 dark:bg-white/5 dark:border-white/10`
5. [ ] Efectos de Hover: `hover:bg-gray-50 dark:hover:bg-white/5`
6. [ ] Badge/pills con color de acento configurados para Brillo suave (`bg-x-500/10 text-x-400`).

## Acceder al Tema

```jsx
import { useTheme } from "../contexts/ThemeProvider";
const { isDark, toggleTheme } = useTheme();
```

## Recharts / Librerías Externas

Usa colores de Zinc o blanco/transparente directamente desde JavaScript:
```jsx
<CartesianGrid stroke={isDark ? "rgba(255,255,255,0.05)" : "#f3f4f6"} />
<XAxis tick={{ fill: isDark ? "#a1a1aa" : "#6b7280" }} /> // zinc-400 / gray-500
```

## NO Hacer

- ❌ No aplicar `dark:` a componentes que corren en parte "pública" de la web, es decir `src/pages/public/`. Solo `dashboard` lleva dark mode.
- ❌ No uses negro absoluto (`bg-black`), se siente artificial y fatiga la vista. Usa `bg-zinc-950` y `bg-zinc-900`.
- ❌ Evita sombras oscuras duras en dark mode. Un buen borde sutil (`ring-1 ring-white/10`) genera una elevación visual mucho más sobria y contemporánea.
