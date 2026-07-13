# AGENT.md — Thuban

Thuban es una aplicación Next.js de IA para el mercado inmobiliario LATAM.

## Stack
- **Framework**: Next.js 16 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS v4
- **Estado**: Zustand (previsto)
- **API**: BACKBONE API /api/backbone/ (proxy)
- **Auth**: JWT via BACKBONE
- **Deploy**: Vercel + Cloudflare DNS

## Estructura
```
src/
├── app/
│   ├── page.tsx          # Landing page
│   ├── login/            # Login
│   ├── signup/           # Registro
│   ├── dashboard/        # Dashboard principal
│   └── api/
│       ├── auth/         # Auth API routes
│       └── chat/         # Chat API routes
├── components/
│   ├── ui/               # UI primitives
│   ├── landing/          # Landing components
│   ├── chat/             # Chat interface
│   └── dashboard/        # Dashboard components
└── lib/
    ├── config.ts         # App config
    └── utils.ts          # Utilities
```

## Diseño
- Tema oscuro
- Acento dorado (#f59e0b / amber)
- Fuente: Inter (sans) + JetBrains Mono (mono)
- Gradientes gold para CTAs
- Referencia de diseño: genspark.ai

## Integraciones
- BACKBONE API (datos inmobiliarios)
- GHL (leads y CRM) — futuro
- PADIM (estándar de datos) — futuro

## Comandos
```bash
npm run dev      # Desarrollo
npm run build    # Build
npm start        # Producción
```