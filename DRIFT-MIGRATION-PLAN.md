# Design System Drift — Plan de Migración Progresiva

> **Contexto:** 79 findings de `npx impeccable detect` que NO son anti-patrones de UI.
> Son valores literales (colores, tamaños, radios) que existen en el código pero no están
> documentados en el `DESIGN.md`. No bloquean funcionalidad ni afectan al usuario.

---

## 📊 Clasificación

| Tipo | Cantidad | Significado |
|------|----------|-------------|
| `design-system-color` | 62 | Colores `rgba()`, `#fff`, `#000` fuera de la paleta del DESIGN.md |
| `design-system-font-size` | 12 | Tamaños de fuente literales fuera de la rampa tipográfica |
| `design-system-radius` | 5 | Border-radius literales fuera de la escala documentada |
| **Total** | **79** | |

## 🗂️ Por archivo (priorizado por cantidad)

### 🔴 Prioridad Alta (>10 drifts)

| Archivo | Drifts | Tipo predominante |
|---------|--------|-------------------|
| `src/components/premium/AuthPage.tsx` | 23 | 20 colores, 3 font-size |
| `src/components/premium/DashboardPage.tsx` | 12 | 10 colores, 1 font-size, 1 radius |

### 🟡 Prioridad Media (5-10 drifts)

| Archivo | Drifts | Tipo predominante |
|---------|--------|-------------------|
| `src/app/globals.css` | 9 | 5 colores, 2 font-size, 2 radius |
| `src/components/premium/MetricCard.tsx` | 9 | 8 colores, 1 font-size |
| `src/components/capacidades/DescribeProperty.tsx` | 5 | 3 colores, 2 font-size |
| `src/components/design/Footer.tsx` | 5 | 5 colores |
| `src/components/premium/ActivityTimeline.tsx` | 5 | 4 colores, 1 radius |
| `src/components/premium/Sidebar.tsx` | 5 | 4 colores, 1 radius |

### 🟢 Prioridad Baja (<5 drifts)

| Archivo | Drifts | Tipo |
|---------|--------|------|
| `src/app/dashboard/page.tsx` | 3 | 2 colores, 1 font-size |
| `src/components/capacidades/NegotiateStrategy.tsx` | 2 | 1 color, 1 font-size |
| `src/components/design/ChatBubble.tsx` | 1 | 1 font-size |

---

## 🔧 Estrategia de Migración

### Regla general
> Cuando toques un archivo por cualquier razón (bugfix, feature, refactor),
> migra sus drifts en esa misma pasada. No hagas pasadas exclusivas de drift.

### Patrón de migración

**Colores hardcodeados → variables CSS:**
```tsx
// ❌ Antes
color: '#f59e0b'
background: 'rgba(245,158,11,0.1)'

// ✅ Después  
color: 'var(--color-gold)'
background: 'rgba(var(--color-gold), 0.1)'  // o la variable exacta
```

**Font-sizes literales → tokens del DESIGN.md:**
```tsx
// ❌ Antes
fontSize: '1.05rem'
fontSize: '1.15rem'

// ✅ Después (usar la rampa documentada)
// body-lg: 1.05rem, heading-sm: 1.1rem, nav: 1.25rem, etc.
```

### Cuándo detenerse
- Cuando los drifts restantes son solo `rgba()` con opacidades ligeras (0.03, 0.04, 0.06) — esos son casos legítimos de glassmorphism que no vale la pena tokenizar
- Cuando el costo de la refactorización supera el beneficio visual

### Métrica de éxito
- `npx impeccable detect src/` → 0 findings (o solo los rgba de opacidad deliberados)
