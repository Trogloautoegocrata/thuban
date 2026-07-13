# THUBAN — Design Brief v1.0.0

> *Identidad visual completa para aplicación web de IA conversacional inmobiliaria*
> *Producto hermano de BACKBONE, Astra y Polaris*
> *Stack: Next.js 16, TypeScript, Tailwind CSS v4, React 19*

---

## 1. Identidad de Marca

### 1.1 El Nombre

**Thubán** (α Draconis) es la estrella más brillante de la constelación Draco (Dragón). Fue la estrella polar alrededor del año 3000 a.C. — un **punto de referencia fijo** en el cielo nocturno.

**Significado para la marca:** Thuban es el norte inmutable para los profesionales inmobiliarios. En un mercado caótico, Thuban es la referencia confiable que guía cada decisión. Como la estrella que guiaba a los navegantes, Thuban guía a agentes, brokers y desarrolladores hacia mejores resultados.

### 1.2 Concepto Visual

| Atributo | Descripción |
|----------|-------------|
| **Tono** | Profesional, confiable, moderno, aspiracional |
| **Sensación** | Oscuro pero acogedor — como un lounge ejecutivo de noche |
| **Referencias** | genspark.ai (UX conversacional), rightzero.pt (espaciado premium), Stripe (clean minimal) |
| **Audiencia** | Profesionales inmobiliarios LATAM (agentes, brokers, desarrolladores) |
| **Diferenciador** | IA especializada en bienes raíces, no genérica |

### 1.3 Logo

**Formato:** Solo tipografía "Thuban" + estrella dorada (lucide `Star` icon)
**Prohibido:** Puntos decorativos (T·H·U·B·A·N = ❌), iconos complejos, marcas gráficas, knowledge graphs

```
⭐ Thuban
(star-icon) (text)
```

---

## 2. Paleta de Color

### 2.1 Colores Base

| Token | HEX | RGB | Uso |
|-------|-----|-----|-----|
| `--background` | `#0c0c0f` | `12,12,15` | Fondo principal — negro profundo |
| `--foreground` | `#f0f0f5` | `240,240,245` | Texto principal |
| `--card` | `#111114` | `17,17,20` | Superficie de tarjetas |
| `--card-hover` | `#16161a` | `22,22,26` | Hover de tarjetas |
| `--border` | `#1c1c24` | `28,28,36` | Bordes y separadores |
| `--border-light` | `#2a2a35` | `42,42,53` | Bordes hover/highlight |
| `--muted` | `#9898a8` | `152,152,168` | Texto secundario |
| `--muted-foreground` | `#5c5c6e` | `92,92,110` | Texto terciario / metadatos |

### 2.2 Acentos

| Token | HEX | HEX Claro | Uso |
|-------|-----|-----------|-----|
| `--gold` | `#f59e0b` | `#fbbf24` | Gradiente CTA, hover, iconos principales |
| `--gold-glow` | `rgba(245,158,11,0.15)` | — | Sombra glow de botones gold |
| `--blue` | `#759ce7` | `#8bb9f7` | Acento secundario, links, badges |
| `--blue-glow` | `rgba(117,156,231,0.12)` | — | Sombra glow de elementos azules |
| `--green` | `#34d399` | `#6ee7b7` | Estados exitosos, online, verificado |
| `--red` | `#f87171` | `#fca5a5` | Errores, alertas, cancelaciones |

### 2.3 Gradientes

```css
/* Gold gradient — CTAs principales */
.gold-gradient {
  background: linear-gradient(135deg, #f59e0b, #fbbf24);
  color: #0a0a12;
}

/* Hero ambient glow */
.hero-gradient {
  background:
    radial-gradient(ellipse 80% 50% at 50% -20%, rgba(245,158,11,0.12), transparent),
    radial-gradient(ellipse 50% 30% at 20% 80%, rgba(117,156,231,0.08), transparent),
    var(--background);
}

/* Glassmorphism card */
.glass-card {
  background: linear-gradient(160deg, rgba(17,17,20,0.85), rgba(22,22,26,0.5));
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 12px;
}

/* Dashboard card */
.dashboard-card {
  background: linear-gradient(160deg, rgba(17,17,20,0.9), rgba(22,22,26,0.6));
  border: 1px solid #1c1c24;
  border-radius: 12px;
}
```

---

## 3. Tipografía

### 3.1 Familias

| Rol | Fuente | Pesos | Fallback |
|-----|--------|-------|----------|
| **Sans (body)** | Inter | 300, 400, 500, 600, 700, 800, 900 | system-ui, -apple-system, sans-serif |
| **Mono (code/data)** | JetBrains Mono | 400, 500, 600 | monospace |

### 3.2 Escala Tipográfica

| Elemento | Tamaño | Peso | Line-height | Letter-spacing |
|----------|--------|------|-------------|----------------|
| **h1 (hero)** | `clamp(2.5rem, 5vw, 4rem)` | 800 | 1.1 | -0.03em |
| **h2 (section)** | `clamp(1.75rem, 3vw, 2.5rem)` | 700 | 1.2 | -0.02em |
| **h3 (card title)** | `clamp(1.125rem, 1.5vw, 1.375rem)` | 600 | 1.3 | — |
| **Body** | `clamp(0.938rem, 1vw, 1.063rem)` | 400 | 1.7 | — |
| **Body small** | `0.875rem` | 400 | 1.6 | — |
| **Caption** | `0.75rem` | 400 | 1.5 | — |
| **Meta** | `0.688rem` | 500 | 1.4 | 0.05em |
| **Mono (code)** | `0.875rem` | 400 | 1.6 | — |

### 3.3 Piso Tipográfico Mobile

| Breakpoint | Logo | Body | h2 | Botones |
|------------|------|------|----|---------|
| 768px | 1.5rem mínimo | 0.88rem mínimo | 1.5rem mínimo | 0.88rem |
| 480px | 1.25rem mínimo | 0.75rem mínimo | 1.25rem mínimo | 0.85rem |

---

## 4. Sistema de Espaciado

### 4.1 Layout

| Contexto | Desktop (≥1024px) | Tablet (768px) | Mobile (480px) |
|----------|-------------------|----------------|----------------|
| **Hero padding vertical** | 7rem (112px) | 5rem | 3.5rem |
| **Section padding vertical** | 6rem (96px) | 4rem | 3rem |
| **Wrap padding lateral** | 4rem (64px) | 2.5rem | 1.25rem |
| **Content max-width** | 1200px | 100% | 100% |
| **Grid gap** | 1.5rem | 1.25rem | 1rem |
| **Card padding** | 1.5rem | 1.25rem | 1rem |
| **Line-height mínimo** | 1.7 | 1.7 | 1.65 |

### 4.2 Component Spacing

| Elemento | Spec |
|----------|------|
| **Nav items gap** | 0.5rem |
| **CTA buttons padding** | 0.5rem 1.25rem |
| **Feature card icon + text gap** | 1rem |
| **Chat bubble padding** | 0.75rem 1rem |
| **Chat bubbles gap** | 0.5rem |
| **Auth form field gap** | 1.25rem |
| **Sidebar item padding** | 0.625rem 1rem |
| **Sidebar sections gap** | 0.5rem |
| **Metric card padding** | 1.25rem |
| **Footer links gap** | 1.5rem |

---

## 5. Glassmorphism y Efectos

### 5.1 Tarjetas (Cards)

```css
.card {
  background: linear-gradient(160deg, rgba(17,17,20,0.85), rgba(22,22,26,0.5));
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 12px;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.card:hover {
  transform: translateY(-2px);
  border-color: rgba(245,158,11,0.2);
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
}
```

### 5.2 Botones

```css
.btn-primary {
  background: linear-gradient(135deg, #f59e0b, #fbbf24);
  color: #0a0a12;
  font-weight: 600;
  border-radius: 10px;
  padding: 0.625rem 1.5rem;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.btn-primary:hover {
  box-shadow: 0 0 24px rgba(245,158,11,0.25);
  transform: translateY(-1px);
}

.btn-secondary {
  background: transparent;
  border: 1px solid #2a2a35;
  color: #f0f0f5;
  font-weight: 500;
  border-radius: 10px;
  padding: 0.625rem 1.5rem;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.btn-secondary:hover {
  border-color: #5c5c6e;
  background: rgba(255,255,255,0.03);
}
```

### 5.3 Inputs

```css
.input {
  background: rgba(255,255,255,0.03);
  border: 1px solid #1c1c24;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  color: #f0f0f5;
  font-size: 0.938rem;
  transition: all 0.2s ease;
}
.input:focus {
  border-color: #759ce7;
  box-shadow: 0 0 0 3px rgba(117,156,231,0.08);
  outline: none;
}
.input::placeholder {
  color: #5c5c6e;
}
```

### 5.4 Micro-interacciones

| Elemento | Efecto | Duración | Timing |
|----------|--------|----------|--------|
| Botón hover | translateY(-1px) + glow | 0.2s | ease-out |
| Card hover | translateY(-2px) + border glow | 0.25s | cubic-bezier(0.4,0,0.2,1) |
| Link hover | color → gold, opacidad | 0.2s | ease |
| Input focus | border glow azul | 0.2s | ease |
| Chat bubble | fadeIn + slideUp | 0.3s | ease-out |
| Sidebar item | bg + border-left color | 0.2s | ease |
| Toast/notification | slideIn + fade | 0.35s | cubic-bezier(0.22,1,0.36,1) |
| Modal overlay | fade backdrop | 0.35s | ease |

---

## 6. Sistema de Componentes

### 6.1 Componentes de Landing

| Componente | Props | Descripción |
|------------|-------|-------------|
| **Header** | none (sticky, scroll-aware) | Nav con logo tipográfico + estrella + CTAs login/signup |
| **Hero** | none (full section) | Título, subtítulo, CTA gold, background con estrellas animadas |
| **FeatureCard** | `icon: LucideIcon`, `title: string`, `description: string`, `color: string` | Card glassmorphism con icono + texto |
| **StatsBar** | `stats: { icon, value, label }[]` | 3+ estadísticas clave con animación de conteo |
| **Footer** | none | Logo + enlaces ecosistema + copyright + badge by Polaris |

### 6.2 Componentes de Auth

| Componente | Props | Descripción |
|------------|-------|-------------|
| **AuthForm** | `mode: 'login' \\| 'signup'`, `onSubmit: (data) => void` | Formulario unificado con email, password, nombre (signup) |

### 6.3 Componentes de Dashboard

| Componente | Props | Descripción |
|------------|-------|-------------|
| **DashboardLayout** | `children: ReactNode` | Sidebar fijo + contenido scrollable + header |
| **MetricCard** | `icon: LucideIcon`, `value: string \\| number`, `label: string`, `trend?: number` | Card de métrica con número grande + label + icono |

### 6.4 Componentes de Chat

| Componente | Props | Descripción |
|------------|-------|-------------|
| **ChatBubble** | `message: string`, `role: 'user' \\| 'assistant'`, `timestamp?: string` | Burbuja de mensaje con avatar, texto, timestamp |
| **ChatInput** | `onSend: (message: string) => void`, `disabled?: boolean`, `placeholder?: string` | Textarea + botón send con micro-interacciones |

---

## 7. Íconos

Usar **lucide-react** exclusivamente para todos los iconos. No usar emojis como iconos funcionales.

| Contexto | Icono | Detalle |
|----------|-------|---------|
| Logo | `Star` | Relleno gold, tamaño 24-28px en header, 20px en footer |
| Hero badge | `Sparkles` | Acento gold, 16px |
| CTA | `ArrowRight` | 20px, animación translateX en hover |
| Features | Según config | `MessageSquare`, `TrendingUp`, `Shield`, `Users` |
| Metrics | Según necesidad | `Building2`, `Zap`, `Star`, `TrendingUp`, `Users` |
| Auth | `Mail`, `Lock`, `User` | 18px, muted |
| Chat | `Send`, `Bot`, `User` | 16-18px |
| Nav | `Menu`, `X`, `ChevronLeft` | 20-24px |
| Status | `CheckCircle2`, `AlertCircle`, `Info` | 16-18px |

---

## 8. Responsive Breakpoints

| Breakpoint | Target | Comportamiento |
|------------|--------|----------------|
| **≥1024px** | Desktop | Layout completo, sidebar visible, padding 4rem |
| **768px** | Tablet | h1 escala, padding 2.5rem, sidebar colapsable, grid 2 cols |
| **480px** | Mobile | Layout single-col, padding 1.25rem, hamburger menu, hero 3.5rem padding |

### 8.1 Header Responsive

| Breakpoint | Logo | Nav | CTAs |
|------------|------|-----|------|
| ≥1024px | Star + Thuban | Links visibles | Login + Signup |
| 768px | Star + Thuban | Links ocultos | Login + hamburger |
| 480px | Star + Thuban | Hamburger menu | Hamburger menu |

### 8.2 Dashboard Responsive

| Breakpoint | Sidebar | Content |
|------------|---------|---------|
| ≥1024px | Fixed 240px | flex-1 con padding |
| 768px | Overlay (toggle) | 100% width |
| 480px | Overlay (toggle) | 100% width, padding reducido |

---

## 9. Animaciones

### 9.1 Permitidas (sutiles, con Intersection Observer)

```css
/* Fade-in reveal */
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Star twinkle */
@keyframes twinkle {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.5); }
}

/* Slide-in for chat messages */
@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### 9.2 Prohibidas

- ❌ Animaciones pesadas (WebGL, Three.js, partículas complejas)
- ❌ Knowledge graphs (círculos conectados con líneas)
- ❌ Rotaciones continuas (spinners solo para loading)
- ❌ Animaciones que bloquean interacción
- ❌ Parallax scrolling

---

## 10. Assets a Generar

| Asset | Formato | Descripción |
|-------|---------|-------------|
| **Favicon** | SVG | Estrella dorada simple, viewBox 0 0 24 24 |
| **OG Image** | SVG/PNG | Thuban + estrella + tagline, 1200×630px |
| **Logo** | SVG | Solo tipografía "Thuban" + Star icon |

---

## 11. Referencias de Diseño

| Referencia | Qué tomar |
|------------|-----------|
| [genspark.ai](https://genspark.ai) | UX conversacional, clean minimal |
| [rightzero.pt](https://rightzero.pt) | Espaciado generoso, premium minimalista |
| [shadcn/ui](https://ui.shadcn.com) | Componentes, tokens, accesibilidad |
| Stripe Dashboard | Métricas, cards, layout de datos |
| Backbone API Docs | JSON blocks, clean minimal |

---

## 12. Paleta de Ecosistema (Enlaces entre productos)

| Proyecto | Color | HEX | Uso |
|----------|-------|-----|-----|
| **PADIM** | Oro | `#f0c040` | Enlaces a PADIM |
| **Polaris** | Verde | `#1edb7f` | Enlaces a Polaris |
| **BACKBONE** | Blanco | `#ffffff` | Enlaces a BACKBONE |
| **VisionNorth** | Azul | `#0976F8` | Enlaces a VisionNorth |
| **Astra** | Azul claro | `#759ce7` | Enlaces a Astra |

---

## 13. Checklist de Verificación

- [ ] Paleta de color aplicada correctamente
- [ ] Tipografía Inter + JetBrains Mono cargadas
- [ ] Logo tipográfico sin puntos decorativos
- [ ] Espaciado generoso (hero 7rem, sections 6rem, lateral 4rem)
- [ ] Glassmorphism en tarjetas (blur + semi-transparente)
- [ ] Botones gold gradient en CTAs
- [ ] Line-height mínimo 1.7
- [ ] Micro-interacciones en todos los elementos interactivos
- [ ] 3 breakpoints responsive (1024px, 768px, 480px)
- [ ] Sin animaciones pesadas
- [ ] Sin knowledge graphs
- [ ] Tema oscuro exclusivo
- [ ] Favicon estrella SVG
- [ ] OG Image generada
- [ ] Mobile responsive probado
- [ ] Contraste WCAG AA verificado

---

*Thuban Design Brief v1.0.0 — Julio 2026*
*Ecosistema Polaris by VisionNorth*