# THUBAN — Arquitectura y Operación

Thuban es un asistente IA conversacional para bienes raíces LATAM. Basado en Next.js 16 + DeepSeek + BACKBONE API.

## Stack
- **Framework**: Next.js 16 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS v4
- **API**: BACKBONE API proxy `/api/backbone/`
- **Auth**: JWT via BACKBONE
- **Persistencia**: localforage (IndexedDB) — migración futura a PostgreSQL
- **Pagos**: Stripe (modo demo sin keys, real con STRIPE_SECRET_KEY)
- **Deploy**: Vercel + Cloudflare DNS
- **LLM**: DeepSeek via OpenRouter

## Arquitectura: 5 Capas (ADR-015)

```
Capa 0 — Frontend:     Next.js 16 · Tailwind · Tema oscuro oro
Capa 1 — Prompts:      SOUL(base.ts) · IDENTITY(persona.ts) · TOOLS(tools.ts) · MEMORY(memory.ts)
Capa 2 — Capacidades:  8 skills verticales (Describe, Valúa, Negocia, Compara, Infonavit, Atiende, Mercado, Reporte)
Capa 3 — Inteligencia:  DeepSeek · BACKBONE Val AI · RAG pgvector (futuro)
Capa 4 — Ecosistema:    BACKBONE · GHL(futuro) · WhatsApp(futuro) · PADIM(schema)
Capa 5 — Infra:         Vercel · Cloudflare · Stripe · PostgreSQL(futuro)
```

## Estado Actual (Jul 2026)

| Feature | Status | Notas |
|---------|:------:|-------|
| Landing premium | ✅ | Tema oscuro oro, 6 páginas |
| Auth (BACKBONE JWT) | ✅ | Login/Signup/Logout |
| Chat IA con DeepSeek | ✅ | Function Calling BACKBONE |
| Sistema prompts 5-capas | ✅ | F0.1 — SOUL, IDENTITY, TOOLS, MEMORY, route |
| Toolbar capacidades | ✅ | F0.5 — Describe, Valúa, Negocia, Mercado |
| Persistencia local | ✅ | F0.2 — localforage/IndexedDB |
| Stripe API | ✅ | F0.3 — Checkout + Webhook (demo/real) |
| Créditos funcionales | ✅ | F0.4 — localStorage + upgrade a Pro |
| Dashboard con propiedades | ✅ | Grid paginado desde BACKBONE |
| Análisis de mercado | ✅ | Vista con tendencias BACKBONE |

## Próximas Capacidades (Fase 1+)

| Capacidad | Fase | Estado |
|-----------|:----:|:------:|
| #1 Describe propiedad | F1.1 | 🔴 Pendiente |
| #5 Educación Infonavit | F1.2 | 🔴 Pendiente |
| #3 Ayúdame a negociar | F1.3 | 🔴 Pendiente |
| #7 Análisis de mercado por zona | F2.1 | 🔴 Pendiente |
| #4 Compara propiedades (RAG) | F2.2 | 🔴 Pendiente |
| #8 Reportes PDF | F2.3 | 🔴 Pendiente |
| #6 WhatsApp bridge | F3.1 | 🔴 Pendiente |
| #2 Valuación conversacional | F3.2 | 🔴 Pendiente |
| Voice AI 24/7 | F3.3 | 🔴 Pendiente |
| Proyectos multi-cliente | F4 | 🔴 Pendiente |

## Comandos
```bash
npm run dev      # Desarrollo
npm run build    # Build
npm run start    # Producción local
npx vercel --prod # Deploy manual
```

## Estructura
```
src/
├── app/
│   ├── page.tsx                   # Landing
│   ├── login/                     # Login
│   ├── signup/                    # Registro
│   ├── dashboard/                 # Dashboard (toolbar + chat + propiedades + análisis)
│   └── api/
│       ├── auth/                  # Auth JWT (BACKBONE proxy)
│       ├── chat/                  # Chat IA (5-capas + function calling)
│       ├── backbone/              # Proxy BACKBONE
│       ├── market/trends          # Tendencias mercado
│       ├── conversations/         # Persistencia bridge
│       └── stripe/                # Checkout + Webhook
├── components/
│   ├── ui/                        # UI primitives
│   ├── landing/                   # Landing components
│   ├── chat/                      # Chat interface
│   ├── design/                    # Design components
│   └── premium/                   # Premium dashboard components
└── lib/
    ├── prompts/                   # Sistema 5-capas
    │   ├── base.ts                # SOUL — guardrails
    │   ├── persona.ts             # IDENTITY — voz y tono
    │   ├── tools.ts               # TOOLS — 8 herramientas + handlers
    │   ├── memory.ts              # MEMORY — contexto persistente
    │   └── route.ts               # Ensamblador de system prompt
    ├── db/
    │   ├── conversations.ts       # Persistencia localforage
    │   └── credits.ts             # Créditos con persistencia
    ├── backbone-tools.ts          # Tools BACKBONE (function calling)
    ├── credits.ts                 # Créditos (deprecado, usar db/credits)
    ├── config.ts                  # Config app
    └── utils.ts                   # Utilidades
```
