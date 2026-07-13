# THUBAN — Brief Ejecutivo de Diseño Premium v2.0.0

> **Proyecto:** Thuban — IA Conversacional para Bienes Raíces LATAM
> **URL:** https://app.thuban.online
> **Stack:** Next.js 16 + TypeScript + Tailwind CSS v4 + React 19
> **Producto hermano de:** BACKBONE, Astra, Polaris, PADIM
> **Inspiraciones:** rightzero.pt (espaciado), genspark.ai (UX conversacional), Stripe (clean minimal)

---

## 1. Filosofía de Diseño

Thuban es la **estrella polar** para profesionales inmobiliarios LATAM. En un mercado caótico, Thuban es la referencia confiable que guía cada decisión.

| Principio | Aplicación |
|-----------|-----------|
| **Oscuro pero acogedor** | Fondo `#0c0c0f` como lounge ejecutivo de noche |
| **Oro como norte** | Gold `#f59e0b` es la estrella que guía — único acento principal |
| **Espaciado generoso** | Hero padding 7rem, secciones 6rem, wrap 4rem desktop |
| **Micro-interacciones** | Cada elemento responde: hover, glow, translateY, opacity |
| **Mobile-first** | 3 breakpoints: 1024px, 768px, 480px |
| **Sin dependencias externas** | Fonts locales, CSS nativo, sin CDN |

---

## 2. Paleta Exacta

### 2.1 Base

| Token | HEX | RGB | Uso |
|-------|-----|-----|-----|
| `--background` | `#0c0c0f` | `12,12,15` | Fondo principal |
| `--foreground` | `#f0f0f5` | `240,240,245` | Texto principal |
| `--card` | `#111114` | `17,17,20` | Superficie de tarjetas |
| `--card-hover` | `#16161a` | `22,22,26` | Hover de tarjetas |
| `--border` | `#1c1c24` | `28,28,36` | Bordes y separadores |
| `--border-light` | `#2a2a35` | `42,42,53` | Bordes hover/highlight |
| `--muted` | `#9898a8` | `152,152,168` | Texto secundario |
| `--muted-foreground` | `#5c5c6e` | `92,92,110` | Texto terciario |

### 2.2 Acentos

| Token | HEX | Uso |
|-------|-----|-----|
| `--gold` | `#f59e0b` | Acento principal — estrella, CTAs, hover states |
| `--gold-light` | `#fbbf24` | Gold hover/gradiente secundario |
| `--gold-glow` | `rgba(245,158,11,0.15)` | Sombra glow de botones gold |
| `--blue` | `#759ce7` | Acento secundario — links, badges, iconos |
| `--green` | `#34d399` | Estados exitosos |
| `--red` | `#f87171` | Errores y alertas |

### 2.3 Gradientes críticos

```css
/* Gold gradient — CTAs principales */
background: linear-gradient(135deg, #f59e0b, #fbbf24);

/* Hero ambient glow */
background:
  radial-gradient(ellipse 80% 50% at 50% -20%, rgba(245,158,11,0.12), transparent),
  radial-gradient(ellipse 50% 30% at 20% 80%, rgba(117,156,231,0.08), transparent),
  #0c0c0f;

/* Glassmorphism card */
background: linear-gradient(160deg, rgba(17,17,20,0.85), rgba(22,22,26,0.5));
backdrop-filter: blur(12px);
border: 1px solid rgba(255,255,255,0.06);
border-radius: 12px;
```

---

## 3. Sistema de Componentes

### 3.1 Landing Page (index.html)

| Sección | Orden | Descripción |
|---------|-------|-------------|
| **Header** | 1 | Sticky nav, backdrop-blur, logo + nav links + CTA button |
| **Hero** | 2 | Badge "Powered by Polaris", H1 bold, glow effects, 2 CTAs |
| **Features** | 3 | 4 glassmorphism cards con iconos + hover glow |
| **Stats** | 4 | 3 métricas con iconos, valores grandes |
| **Chat Demo** | 5 | Simulación interactiva de chat (3 mensajes pre-cargados) |
| **Pricing** | 6 | 3 planes (Free, Pro, Enterprise) con feature list |
| **CTA Final** | 7 | Banner con gradiente + CTA contundente |
| **Footer** | 8 | Logo + ecosistema links + copyright + "Hecho en México" |

### 3.2 Componentes TSX (Next.js 16 + Tailwind v4)

| Componente | Archivo | Props | "use client" |
|-----------|---------|-------|:------------:|
| Header | `Header.tsx` | `transparent?: boolean` | ✅ |
| Hero | `Hero.tsx` | (ninguno) | ✅ (efecto estrellas) |
| Features | `Features.tsx` | (ninguno) | ❌ (estático) |
| ChatDemo | `ChatDemo.tsx` | (ninguno) | ✅ (estado interactivo) |
| Pricing | `Pricing.tsx` | (ninguno) | ✅ (toggle anual/mensual) |
| Footer | `Footer.tsx` | (ninguno) | ❌ (estático) |

### 3.3 Reglas de Componentes TSX

1. **Importar `cn()` de `@/lib/utils`** — usar en TODOS los className compuestos
2. **Usar clases Tailwind estándar** — NO arbitrarias como `min-h-[90vh]`
3. **Colores via `@theme` tokens** — `bg-background`, `text-gold`, `border-border`
4. **"use client"** solo cuando hay useState, useEffect, o event handlers
5. **Iconos de `lucide-react`** — importar como componentes, no strings
6. **Transiciones estándar:** `transition-all duration-300`
7. **Hover effects:** `hover:-translate-y-0.5 hover:shadow-lg hover:border-gold/20`
8. **Espaciado generoso:** `p-6 md:p-8` interior, `gap-6` entre elementos

---

## 4. Tipografía

| Rol | Fuente | Peso | Tamaño |
|-----|--------|:----:|:------:|
| Headings (h1) | Inter | 800 | clamp(2.5rem, 6vw, 4.5rem) |
| Headings (h2) | Inter | 700 | clamp(1.75rem, 4vw, 3rem) |
| Headings (h3) | Inter | 600 | clamp(1.25rem, 2.5vw, 1.75rem) |
| Body | Inter | 400 | clamp(0.9rem, 1.2vw, 1rem) |
| Small | Inter | 400 | clamp(0.75rem, 0.9vw, 0.875rem) |
| Mono | JetBrains Mono | 400,500,600 | — |
| Logo | Inter | 800 | 1.25rem-1.5rem |

**Regla:** Font-size mínimo absoluto `0.75rem` en cualquier elemento.

---

## 5. Micro-interacciones

| Elemento | Hover | Focus/Active |
|----------|-------|--------------|
| Botón primario (gold) | `translateY(-1px)`, `box-shadow: 0 0 24px gold-glow` | `translateY(0)` |
| Botón secundario | `border-color: gold/30`, `background: white/5` | `border-color: gold` |
| Card feature | `translateY(-2px)`, `border-color: gold/20`, `shadow` | — |
| Nav link | `color: gold` | — |
| Logo star | `scale(1.1) rotate(10deg)` | — |
| Pricing card (active) | `border-color: gold/40`, `shadow-xl` | — |
| Chat send button | `translateY(-0.5px)`, `shadow-glow` cuando hay texto | — |
| Footer links | `opacity: 80% → 100%`, `color: gold` | — |

**Timing:** `transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1)`

---

## 6. Estrategia de Contenido

### 6.1 Hero Copy
- **Pre-header:** "⚡ Powered by Polaris by VisionNorth"
- **H1:** "Inteligencia Artificial para Bienes Raíces"
- **Sub:** "Genera descripciones, analiza mercados, mejora negociaciones y atiende clientes con IA especializada en el sector inmobiliario LATAM."
- **CTA:** "Empieza con 5 Créditos Gratis →"
- **Secondary:** "Ya tengo cuenta"

### 6.2 Features Copy
| Título | Descripción |
|--------|-------------|
| Descripciones de Propiedades | Genera descripciones profesionales y atractivas para tus listings en segundos. |
| Análisis de Mercado | Obtén insights sobre tendencias, precios y oportunidades de inversión. |
| Negociación Inmobiliaria | Estrategias y técnicas para cerrar los mejores tratos con confianza. |
| Atención a Clientes | Respuestas profesionales y seguimiento efectivo para cada prospecto. |

### 6.3 Stats
| Ícono | Valor | Label |
|-------|-------|-------|
| 🏢 | Especializado | Sector Inmobiliario |
| ⚡ | Instantáneo | Respuestas en tiempo real |
| 🌎 | LATAM | Mercado Latinoamericano |

### 6.4 Pricing
| Plan | Price | Features |
|------|-------|----------|
| Free | $0/mes | 5 créditos, Descripciones básicas, Chat estándar |
| Pro | $299/mes | 100 créditos, Análisis de mercado, Chat prioritario, API access |
| Enterprise | $999/mes | Créditos ilimitados, Todo incluido, Soporte dedicado, Onboarding personalizado |

### 6.5 Ecosistema Links (colores exactos)
| Proyecto | Color | URL |
|----------|-------|-----|
| Polaris | `#1edb7f` | https://polaris.pw |
| BACKBONE | `#ffffff` | https://back-bone.dev |
| VisionNorth | `#0976F8` | https://visionnorth.vision |
| PADIM | `#f0c040` | https://padim.enmexico.casa |

---

## 7. Referencias Visuales

| Inspiración | Qué tomar |
|-------------|-----------|
| [rightzero.pt](https://rightzero.pt) | Espaciado generoso, hero bold, atmósfera oscura premium |
| [genspark.ai](https://genspark.ai) | UX conversacional limpia, chat bubbles, micro-interacciones |
| [stripe.com](https://stripe.com) | Pricing cards, clean minimal, tipografía bold |
| [shadcn/ui](https://ui.shadcn.com) | Componentes accesibles, focus states, transiciones |

---

## 8. Estructura de Archivos Premium

```
projects/thuban/premium/
├── brief-executivo.md          # Este documento
├── index.html                  # Landing page completa, autocontenida, <50KB
└── componentes/
    ├── Header.tsx              # Sticky header con backdrop-blur + hamburger
    ├── Hero.tsx                # Hero con badge, glow effects, CTAs
    ├── Features.tsx            # 4 glassmorphism feature cards
    ├── ChatDemo.tsx            # Chat simulado interactivo
    ├── Pricing.tsx             # 3 planes con toggle anual/mensual
    └── Footer.tsx              # Ecosistema links + copyright
```

---

## 9. Reglas de Oro (No Negociables)

1. **No usar Google Fonts CDN** — @font-face con Inter descargado localmente
2. **No usar Tailwind CDN** — CSS nativo en `<style>` o Tailwind vía npm
3. **No usar clases arbitrarias** — solo clases Tailwind estándar
4. **Espaciado generoso** — hero 7rem, secciones 6rem
5. **Logo solo tipografía + estrella** — sin puntos decorativos
6. **Gold accent solo en CTAs y highlights** — blue para secundarios
7. **Sin knowledge graphs ni círculos conectados** — atmósfera con estrellas
8. **Micro-interacciones en TODOS los elementos**
9. **Responsive 3 breakpoints: 1024px, 768px, 480px**
10. **Máximo 50KB para index.html completo**