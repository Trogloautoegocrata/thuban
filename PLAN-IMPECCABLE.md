# Plan de Implementación — Buenas Prácticas Impeccable en Thuban

> **Proyecto:** Thuban — IA conversacional para bienes raíces LATAM
> **Stack:** Next.js 16 + Tailwind CSS v4 + TypeScript + DeepSeek + BACKBONE API
> **Fecha:** 24-Jul-2026
> **Auditoría inicial:** ✅ 0 anti-patrones (`npx impeccable detect src/`)

---

## 📋 Resumen Ejecutivo

Thuban está en buena forma: **0 anti-patrones** detectados por Impeccable después de las correcciones iniciales. Sin embargo, carece de la **infraestructura de diseño formal** que Impeccable recomienda para proyectos en crecimiento: un `PRODUCT.md` y un `DESIGN.md` que documenten la verdad del producto y su sistema visual.

| Activo | Estado | Prioridad |
|--------|--------|-----------|
| `npx impeccable detect` | ✅ 0 findings | — |
| `PRODUCT.md` | ❌ No existe | **P0** |
| `DESIGN.md` (formato Google Stitch) | ❌ No existe | **P0** |
| Design system extraído (componentes reusables) | ⚠️ Parcial (carpeta `ui/` vacía, tokens en globals.css) | **P1** |
| `CLAUDE.md` | ✅ Existe | — |
| `AGENTS.md` | ✅ Existe | — |

---

## 🎯 Fase 1: Init — Capturar la Verdad del Producto (P0 — 30 min)

### Objetivo
Crear `PRODUCT.md` con la verdad del producto: usuarios, propósito, posicionamiento, constraints.

### Qué producir
`projects/thuban/PRODUCT.md` con el schema oficial de Impeccable:

```markdown
# Product

<!-- impeccable:product-schema 1 -->

## Platform
web

## Users
[agentes inmobiliarios independientes, dueños de agencia, desarrolladores]

## Product Purpose
[asistente IA conversacional especializado en el mercado inmobiliario mexicano/LATAM]

## Positioning
[único asistente inmobiliario con datos reales de BACKBONE — 101,971+ propiedades]

## Operating Context
[WhatsApp daily, escritorios, noches, navegador web, mobile-first]

## Capabilities and Constraints
[Next.js 16, Tailwind v4, DeepSeek vía OpenRouter, BACKBONE API, tema oscuro oro]

## Brand Commitments
[Thuban — "Inteligencia Artificial para Bienes Raíces", Powered by Polaris, acento dorado #f59e0b]

## Evidence on Hand
[BRIEF en tmp/thuban-pherkad-brief.md, ADR-015, CLAUDE.md, AGENTS.md]

## Product Principles
1. Mobile-first siempre
2. Datos reales, nunca inventados
3. Una herramienta por conversación
4. Gratis para empezar, Pro para escalar

## Accessibility & Inclusion
[WCAG AA, contraste 4.5:1, focus states dorados, touch targets ≥44px]
```

### Cómo ejecutar
```bash
# Opción A: Delegar a Claude Code con skills Impeccable instalados
# cd /path/to/thuban && /impeccable init

# Opción B: OmegaBridge genera PRODUCT.md directamente desde el brief existente
# (recomendado: ya tenemos el BRIEF completo en tmp/thuban-pherkad-brief.md)
```

---

## 🎨 Fase 2: Document — Design System Formal (P0 — 45 min)

### Objetivo
Generar `DESIGN.md` en formato [Google Stitch](https://github.com/google-labs-code/design.md) con los tokens extraídos del código.

### Qué producir
`projects/thuban/DESIGN.md` con frontmatter YAML (tokens machine-readable) + 8 secciones markdown.

### Tokens a extraer (ya existen en globals.css y Tailwind)

```yaml
# Frontmatter parcial (los valores viven en @theme en globals.css)
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
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)"
    fontWeight: 700
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.7
  mono:
    fontFamily: "JetBrains Mono, Consolas, monospace"
rounded:
  sm: "6px"
  md: "10px"
  lg: "16px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section: "5rem"
```

### Secciones markdown
1. **Overview** — descripción del sistema
2. **Colors** — paleta completa con roles semánticos
3. **Typography** — jerarquía tipográfica
4. **Layout** — grid responsive, breakpoints, containers
5. **Elevation & Depth** — sombras, backdrop-blur
6. **Shapes** — border-radius, botones, cards
7. **Components** — botones primarios/secundarios, inputs, cards de features, pricing cards
8. **Do's and Don'ts** — anti-patrones a evitar

---

## 🔧 Fase 3: Extract — Componentes Reusables (P1 — 1h)

### Objetivo
Extraer componentes repetidos 3+ veces a la carpeta `src/components/ui/` como design system formal.

### Candidatos a extraer (identificados por código)

| Componente | Uso actual | Beneficio |
|------------|-----------|-----------|
| `Button` | Varios CTAs (hero, pricing, formularios) | Consistencia + variantes (primario/secundario/outline) |
| `Input` | Login, Signup, Chat input | Estados (normal/focus/error/loading) unificados |
| `Card` | Features, Pricing, Propiedades | Border-radius + hover comunes |
| `Badge` | Pricing "Más popular", créditos | Variante gold + outline |
| `SectionHeading` | En todas las secciones de la landing | Título + subtítulo + badge áureo |

### Output esperado
```
src/components/ui/
├── Button.tsx         # Primario (gold gradient), Secundario (outline), Ghost
├── Input.tsx          # Text + email + password con estados
├── Card.tsx           # Base + hoverable + featured (gold border)
├── Badge.tsx          # Gold, outline, success
└── SectionHeading.tsx # Título + subtítulo + sección (opcional badge gold)
```

---

## ✨ Fase 4: Polish — Refinamiento Visual (P1 — 1h)

### Objetivo
Ejecutar `/impeccable polish` sobre la superficie completa.

### Checklist de polish

#### Funcional (prioridad 1)
- [ ] Loading states en login/signup
- [ ] Empty states en dashboard (créditos en 0, sin conversaciones)
- [ ] Error states en formularios (email inválido, password débil)
- [ ] Success states (registro completo, chat enviado)

#### Visual (prioridad 2)
- [ ] Consistencia de espaciado entre secciones
- [ ] Hover states en todas las cards (scale + glow sutil)
- [ ] Responsive: testear 375px, 768px, 1440px
- [ ] Focus states dorados en todos los inputs y botones (WCAG AA)

#### Motion (prioridad 3)
- [ ] Scroll-reveal suave (fade-in + translateY, duración 0.6s)
- [ ] Transiciones de página (Next.js App Router nativas)

---

## 🛡️ Fase 5: Harden — Edge Cases y Error Handling (P2 — 30 min)

### Objetivo
Ejecutar `/impeccable harden` para cubrir bordes y errores.

- [ ] Text overflow en títulos largos
- [ ] Long loading en chat (timeout + retry)
- [ ] Sesión expirada (redirect a login con toast)
- [ ] Sin conexión (offline state detectable)

---

## 🚀 Fase 6: CI/CD — Detector en PRs (P2 — 30 min)

### Objetivo
Agregar Impeccable Design Check como GitHub Action en modo warning.

```yaml
# .github/workflows/impeccable-detect.yml
name: Impeccable Design Check
on: [pull_request]
jobs:
  detect:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
      - run: npx impeccable detect src/
        continue-on-error: true
```

---

## 📊 Cronograma

| Fase | Tarea | Esfuerzo | Dependencias | 
|------|-------|----------|--------------|
| **F1** | Init — PRODUCT.md | 30 min | — |
| **F2** | Document — DESIGN.md | 45 min | F1 |
| **F3** | Extract — UI Components | 1h | F2 |
| **F4** | Polish — Refinamiento | 1h | F3 |
| **F5** | Harden — Edge Cases | 30 min | F4 |
| **F6** | CI/CD — GitHub Action | 30 min | F1-F5 |
| | **Total** | **~4h 15 min** | |

---

## 📈 Métricas de Éxito

| KPI | Meta | Cómo medirlo |
|-----|------|-------------|
| Anti-patrones en `detect` | 0 | `npx impeccable detect src/` |
| Diseño documentado | PRODUCT.md + DESIGN.md existen | `ls` |
| Componentes reusables | ≥5 en `src/components/ui/` | `ls src/components/ui/` |
| PRs con detector pasando | 100% | GitHub Actions checks |
| Tiempo de onboard para nuevo dev | < 30 min | Tiempo para entender design system |

---

## ⚠️ Riesgos y Mitigaciones

| Riesgo | Impacto | Mitigación |
|--------|---------|------------|
| PRODUCT.md se vuelve obsoleto | Bajo | Revisión trimestral, actualizar en cada redesign |
| DESIGN.md se desvía del código | Medio | Ejecutar `impeccable document` periódicamente |
| Componentes demasiado genéricos | Medio | Extraer solo lo que ya se usa 3+ veces (principio Impeccable) |
| El detector CI bloquea PRs sin contexto | Bajo | Empezar en modo `continue-on-error: true` |
