---
name: Thuban
description: "Asistente IA conversacional para bienes raíces en México y LATAM"
colors:
  bg: "#0c0c0f"
  fg: "#f0f0f5"
  card: "#111114"
  card-hover: "#16161a"
  border: "#1c1c24"
  border-light: "#2a2a35"
  muted: "#9898a8"
  muted-2: "#5c5c6e"
  gold: "#f59e0b"
  gold-light: "#fbbf24"
  blue: "#759ce7"
  green: "#34d399"
  red: "#f87171"
  success: "#10b981"
typography:
  display:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(2.2rem, 5vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  heading:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(1.6rem, 3.5vw, 2rem)"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  heading-xl:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(1.5rem, 4vw, 2.25rem)"
    fontWeight: 800
    lineHeight: 1.3
  heading-sm:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.1rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-0.005em"
  body:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.7
  body-lg:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 400
    lineHeight: 1.6
  small:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 400
    lineHeight: 1.5
  small-xs:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.7rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "0.08em"
    textTransform: "uppercase"
  label-sm:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.5
  mono:
    fontFamily: "'JetBrains Mono', Consolas, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  stat:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(2.5rem, 4.5vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.03em"
  metric-val:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 800
    lineHeight: 1
  metric-val-lg:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "2.5rem"
    fontWeight: 800
    lineHeight: 1
  nav:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    letterSpacing: "-0.01em"
  nav-sm:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
pricing:
  val:
    fontSize: "2.5rem"
    fontWeight: 800
  name:
    fontSize: "1.1rem"
    fontWeight: 700
rounded:
  xs: "2px"
  sm: "6px"
  md: "10px"
  md-alt: "12px"
  lg: "14px"
  xl: "16px"
  xxl: "1.5rem"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section: "5rem"
  section-mobile: "3rem"
components:
  button-primary:
    backgroundColor: "linear-gradient(135deg, #f59e0b, #fbbf24)"
    textColor: "#0a0a12"
    rounded: "{rounded.md}"
    padding: "0.625rem 1.5rem"
    fontSize: "0.875rem"
    fontWeight: 600
  button-primary-hover:
    opacity: 0.9
    boxShadow: "0 0 20px rgba(245, 158, 11, 0.2)"
    transform: "translateY(-1px)"
  button-primary-lg:
    padding: "0.875rem 2rem"
    fontSize: "1rem"
    rounded: "{rounded.xl}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.md}"
    padding: "0.625rem 1.5rem"
    fontSize: "0.875rem"
    fontWeight: 500
    border: "1px solid {colors.border}"
  button-secondary-hover:
    textColor: "{colors.fg}"
    borderColor: "{colors.border-light}"
  input:
    backgroundColor: "rgba(255, 255, 255, 0.04)"
    textColor: "{colors.fg}"
    rounded: "{rounded.md}"
    padding: "0.75rem 1rem"
    fontSize: "0.9rem"
    border: "1px solid {colors.border}"
  input-focus:
    borderColor: "{colors.gold}"
  card:
    backgroundColor: "{colors.card}"
    rounded: "{rounded.lg}"
    border: "1px solid {colors.border}"
    padding: "1.75rem"
  card-hover:
    transform: "translateY(-2px) scale(1.02)"
    boxShadow: "0 0 28px rgba(245, 158, 11, 0.08)"
  card-featured:
    borderColor: "rgba(245, 158, 11, 0.3)"
    boxShadow: "0 0 30px rgba(245, 158, 11, 0.06)"
  badge:
    backgroundColor: "linear-gradient(135deg, #f59e0b, #fbbf24)"
    textColor: "#0a0a12"
    rounded: "{rounded.full}"
    padding: "0.25rem 0.875rem"
    fontSize: "0.75rem"
    fontWeight: 700
  pricing-card:
    backgroundColor: "{colors.card}"
    rounded: "{rounded.xl}"
    border: "1px solid {colors.border}"
    padding: "2rem"
  pricing-card-featured:
    extends: "card-featured"
  metric-card:
    backgroundColor: "{colors.card}"
    rounded: "{rounded.lg}"
    border: "1px solid {colors.border}"
    padding: "1.25rem"
---

# Design — Thuban

## Overview

Thuban utiliza un sistema de diseño **tech-minimal oscuro** con acento dorado. La estética está inspirada en genspark.ai, Vercel y Linear — minimalista, oscura, con bordes sutiles y fondos con glassmorphism. El tono es **profesional con calidez**: serio pero no frío. El dorado da calidez sin caer en lo corporativo frío.

El sistema completo está definido en `src/app/globals.css` mediante `@theme` de Tailwind CSS v4, con componentes utilitarios CSS nativos y componentes React en `src/components/`.

### Principios de diseño

1. **Mobile-first** — todo funciona primero en 375px, luego escala a 768px y 1440px
2. **Un acento por sección** — el dorado (#f59e0b) es el ÚNICO color de acento. No mezclar con azul, verde u otros acentos en la misma sección
3. **Sin fotos de stock ni personas IA** — el hero usa un glow animado con CSS (radial-gradient pulsante)
4. **Sin emojis en títulos ni botones** — solo SVGs inline con aria-hidden
5. **Datos reales o silencio** — nunca inventar testimonios, precios ni propiedades
6. **Glassmorphism en superficies** — backdrop-filter: blur() en navbar, auth cards, sidebar

## Colors

### Neutrales (fondo y superficie)

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-bg` | `#0c0c0f` | Fondo principal (casi negro con leve tono azul) |
| `--color-fg` | `#f0f0f5` | Texto principal (blanco suave) |
| `--color-card` | `#111114` | Fondo de tarjetas, sidebar, dropdowns |
| `--color-card-hover` | `#16161a` | Hover de tarjetas |
| `--color-border` | `#1c1c24` | Bordes base |
| `--color-border-light` | `#2a2a35` | Bordes hover/active |
| `--color-muted` | `#9898a8` | Texto secundario, placeholders, labels |
| `--color-muted-2` | `#5c5c6e` | Texto terciario, metadatos |

### Acento

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-gold` | `#f59e0b` | Ámbar/dorado — acento principal. CTAs, íconos de features, badges, hover states, precios. **UN elemento por sección máximo** |
| `--color-gold-light` | `#fbbf24` | Variante clara del dorado, para gradientes en botones CTA |

### Funcionales

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-blue` | `#759ce7` | Links informativos, íconos de data |
| `--color-green` | `#34d399` | Checkmarks en pricing, indicadores de estado |
| `--color-red` | `#f87171` | Errores, alerts destructivos |
| `--success` | `#10b981` | Verde esmeralda — solo checkmarks en pricing |

### Gradientes

- **Hero glow:** `radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 60%)`
- **Botones primarios:** `linear-gradient(135deg, #f59e0b, #fbbf24)`
- **Login bg:** `radial-gradient(ellipse 80% 50% at 50% -20%, rgba(245,158,11,0.08), transparent)` + `radial-gradient(ellipse 50% 30% at 20% 80%, rgba(117,156,231,0.05), transparent)`
- **Badge pricing:** `linear-gradient(135deg, #f59e0b, #fbbf24)`

### Reglas de color

- ❌ No usar `#000` puro ni `#fff` puro — siempre entintar
- ❌ No mezclar colores de acento en una misma sección
- ❌ No usar texto gris (`--color-muted`) sobre fondos de color — el contraste debe ser ≥ 4.5:1
- ✅ Usar `--color-bg` para fondos, `--color-card` para superficies elevadas
- ✅ El dorado solo en: botones CTA, íconos, badges, números de stats, hover states

## Typography

### Familias

| Rol | Fuente | Fallback |
|-----|--------|----------|
| **Display / Títulos** | Inter | system-ui, -apple-system, BlinkMacSystemFont, sans-serif |
| **Cuerpo** | Inter | system-ui, -apple-system, BlinkMacSystemFont, sans-serif |
| **Mono** | JetBrains Mono | Consolas, monospace |

### Escala

| Nivel | Tamaño | Weight | Line Height | Letter Spacing | Uso |
|-------|--------|--------|-------------|----------------|-----|
| H1 | `clamp(2.2rem, 5vw, 3.5rem)` | 700 | 1.08 | -0.02em | Hero title |
| H2 | `clamp(1.6rem, 3.5vw, 2rem)` | 700 | 1.3 | -0.01em | Section titles |
| H3 | `1.1rem` | 600-700 | 1.4 | -0.005em | Card titles, pricing headers |
| Body | `0.9375rem` | 400 | 1.7 | normal | Paragraphs, descriptions |
| Small | `0.8rem` | 400-500 | 1.5 | normal | Labels, footnotes, timestamps |
| Label | `0.8rem` | 600 | 1.5 | 0.08em uppercase | Section labels, eyebrow text |
| Mono | `0.875rem` | 400 | 1.5 | normal | Código, valores numéricos |

### Reglas tipográficas

- ❌ No usar Space Grotesk (previsto en brief, descartado en implementación — se usa Inter consistentemente)
- ❌ No usar font-weight por debajo de 400 en body (accesibilidad)
- ✅ Títulos H1 con letter-spacing negativo pronunciado (-0.02em)
- ✅ Labels siempre en uppercase con letter-spacing expandido

## Layout

### Breakpoints

| Dispositivo | Ancho | Grid |
|-------------|-------|------|
| Mobile | 375px+ | 1 columna |
| Tablet | 768px+ | 2-3 columnas |
| Desktop | 1024px+ | 3-4 columnas |
| Wide | 1440px | max-width: 1280px contenedor |

### Containers

| Clase | Max-width | Padding lateral | Uso |
|-------|-----------|----------------|-----|
| `.container` | 1280px | 0 1.5rem | Secciones generales, navbar, footer |
| `.wrap` | 1200px | 0 1.5rem | Alternativa a container |
| `.container-narrow` | 800px | 0 1.5rem | Formularios auth, contenido legal |

### Espaciado de secciones

- **Desktop:** `padding: 5rem 0` (section)
- **Mobile:** `padding: 3rem 0` (implícito en diseño responsive)
- **Hero:** `padding: 8rem 1.5rem 6rem` (desktop), `padding: 6rem 1.5rem 4rem` (mobile)

### Grids

| Componente | Mobile | Tablet | Desktop |
|------------|--------|--------|---------|
| Features | 1 col | 2 cols | 4 cols |
| Stats | 1 col | 3 cols | 3 cols |
| Pricing | 1 col | 3 cols | 3 cols |
| Metrics | 1 col | 2 cols | auto-fit minmax(180px, 1fr) |
| Properties | 1 col | 2 cols | 3 cols |

### Espaciado interno

| Token | Rem | Px | Uso |
|-------|-----|----|-----|
| xs | 0.25rem | 4px | Gap mínimo entre elementos |
| sm | 0.5rem | 8px | Gap entre icono y texto |
| md | 1rem | 16px | Padding cards, gap entre features |
| lg | 1.5rem | 24px | Padding secciones, gap entre grupos |
| xl | 2rem | 32px | Padding cards grandes |

## Elevation & Depth

### Sombras

| Elemento | Sombra |
|----------|--------|
| Auth card | `0 0 60px rgba(245,158,11,0.04), 0 8px 32px rgba(0,0,0,0.4)` |
| Hover cards | `0 0 28px rgba(245,158,11,0.08)` |
| Featured pricing | `0 0 30px rgba(245,158,11,0.06)` |
| Button hover | `0 0 20px rgba(245,158,11,0.2)` |

### Blur / Glassmorphism

| Elemento | backdrop-filter | Opacidad fondo |
|----------|----------------|----------------|
| Navbar scrolled | `blur(12px)` | `rgba(10,10,15,0.85)` |
| Auth card | `blur(24px)` | `rgba(255,255,255,0.03)` |
| Sidebar | `blur(20px)` | `rgba(255,255,255,0.02)` |
| Dashboard topbar | `blur(12px)` | `rgba(12,12,15,0.8)` |
| Feature card (design/) | `blur-xl` | `rgba(17,17,20,0.85)` |

## Shapes

### Border radius

| Token | Valor (rem) | Valor (px) | Uso |
|-------|-------------|------------|-----|
| sm | 0.375rem | 6px | Skip link, scrollbar |
| md | 0.625rem | 10px | Botones base, inputs, feature icon bg |
| lg | 0.875rem | 14px | Cards (feature, stat, metric), sidebar items |
| xl | 1rem | 16px | Pricing cards, chat window, auth card |
| full | 9999px | — | Badges, eyebrow pills |

### Botones

| Variante | Border-radius | Padding | Font |
|----------|--------------|---------|------|
| `.btn-primary` | 10px | 0.625rem 1.5rem | 0.875rem / 600 |
| `.btn-primary-lg` | 12px | 0.875rem 2rem | 1rem / 600 |
| `.btn-secondary` | 10px | 0.625rem 1.5rem | 0.875rem / 500 |
| `.btn-full` | 12px | 0.875rem | 0.95rem / 600 |

### Cards

| Tipo | Border-radius | Padding | Border |
|------|--------------|---------|--------|
| Feature | 14px | 1.75rem | 1px solid --color-border |
| Stat | 14px | 2.5rem 1.5rem | 1px solid --color-border |
| Pricing | 16px | 2rem | 1px solid --color-border |
| Pricing featured | 16px | 2rem | rgba(245,158,11,0.3) + glow |
| Metric | 14px | 1.25rem | 1px solid --color-border |
| Chat item | 12px | 1rem 1.25rem | 1px solid --color-border |

## Components

### Button

**Estados:** normal, hover, active, disabled, loading.

| Prop | Primario | Secundario | Primario-lg | Full-width |
|------|----------|------------|-------------|------------|
| Background | gold gradient | transparent | gold gradient | gold gradient |
| Text color | #0a0a12 | --color-muted | #0a0a12 | #0a0a12 |
| Border | none | 1px solid --border | none | none |
| Hover | opacity 0.9 + shadow | fg color + border-light | same | same |
| Disabled | opacity 0.4 | opacity 0.4 | opacity 0.4 | opacity 0.4 |

### Input

**Estados:** normal, focus (gold border), error (red border + message), disabled.

```css
/* Normal */
.form-input {
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
}

/* Focus */
.form-input:focus { border-color: var(--color-gold); }

/* Error */
.form-input[aria-invalid="true"],
.login-error {
  border-color: var(--color-red);
  background: rgba(248,113,113,0.1);
}
```

**Password input:** incluye toggle de visibilidad (Eye/EyeOff icon) alineado a la derecha.

### Card

**Estados:** normal, hover (translateY(-2px) scale(1.02) + gold glow), featured (gold border + glow).

Usado en: features, stats, pricing, métricas del dashboard, items de chat.

### Badge

| Variante | Background | Texto |
|----------|-----------|-------|
| Gold | gradient gold | #0a0a12 |
| Green (status) | rgba(52,211,153,0.1) | --color-green |
| Gold (status) | rgba(245,158,11,0.1) | --color-gold |

### Navigation

**Navbar (landing):**
- Sticky con backdrop-blur(12px) al hacer scroll
- Logo izquierda (SVG monograma "T" + "Thuban")
- Nav centro (Funciones, Precios)
- CTAs derecha (Iniciar Sesión + Comenzar Gratis)
- Mobile: hamburger menu a pantalla completa

**Sidebar (dashboard):**
- Fixed en desktop (240px width)
- Overlay + slide en mobile
- Transición con transform (performance)
- Logo + nav items + créditos + logout

**Bottom (footer):**
- Logo + "by Polaris Visionnorth"
- Links: BACKBONE | Polaris | VisionNorth | Astra
- Copyright + "Hecho con ❤️ en México"

## Do's and Don'ts

### ✅ Do's

- Usar **un solo acento dorado** por sección — máximo UN elemento dorado prominente
- Gradiente gold para **todos los CTAs primarios**
- **Glassmorphism** consistente: backdrop-filter con blur en navbar, auth cards, sidebar
- **Mobile-first:** construir para 375px antes de optimizar para 1440px
- **Scroll-reveal suave:** fade-in + translateY(20px→0), 0.6s duration, stagger 0.1s
- **Hover en cards:** scale(1.02) + box-shadow gold glow sutil
- **Estados de formulario:** normal, focus (borde dorado), error (borde rojo + mensaje), loading (spinner)
- **Focus states:** outline 2px solid gold, outline-offset 2px (WCAG AA)
- **SVGs inline** para todos los iconos — no usar librerías de iconos externas
- **Touch targets** ≥ 44px en mobile para todos los elementos interactivos

### ❌ Don'ts

- **Nunca** usar easing bounce o elástico en animaciones — usar cubic-bezier(0.25,0.46,0.45,0.94)
- **Nunca** animar width, height, padding, o margin — usar transform y opacity
- **Nunca** usar emojis en títulos, botones, o CTAs
- **Nunca** mezclar colores de acento en la misma sección
- **Nunca** usar #000 puro ni #fff puro — usar --color-bg y --color-fg
- **Nunca** usar fotos de stock ni imágenes generadas por IA de personas
- **Nunca** inventar testimonios, datos, precios o propiedades
- **Nunca** usar gradient-text combinado con word-reveal
- **Nunca** dejar .reveal con opacity:0 sin safety net (setTimeout 2-3s por si JS falla)
- **Nunca** escribir 'r' en @keyframes CSS (usar transform:scale en vez de width/height)
- **Nunca** usar arrow functions fuera de IIFE en scripts inline
- **Evitar** parallax, partículas complejas, y gradient-text (se sienten dated)
