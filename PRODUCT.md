# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary:** Agentes inmobiliarios independientes en México y LATAM (25-50 años). Usan WhatsApp a diario, trabajan desde su celular y laptop, no quieren aprender tecnología nueva — necesitan que la IA resuelva su problema sin fricción.

**Secondary:** Dueños de agencia (35-55 años) que buscan escalar su operación sin contratar más personal. Desarrolladores inmobiliarios (38-55 años) que necesitan análisis de mercado para decisiones de inversión.

**Tertiary (future):** Compradores y rentadores finales que interactúan con Thuban a través del agente (WhatsApp bridge, sin registro directo).

## Product Purpose

Thuban es un asistente IA conversacional especializado en bienes raíces mexicanos y LATAM. Su propósito es potenciar el negocio del agente inmobiliario automatizando tareas que hoy le toman horas: escribir descripciones de propiedades, analizar tendencias de mercado, preparar negociaciones, y atender clientes — todo desde una conversación natural.

El producto existe porque el 80% de los agentes inmobiliarios mexicanos viven en WhatsApp y ninguna herramienta actual les ofrece un asistente IA verdaderamente especializado en su mercado local con datos reales.

**Success metric:** El agente ahorra 10+ horas por semana y cierra 2+ tratos adicionales al mes usando Thuban.

## Positioning

Thuban es el único asistente IA conversacional para bienes raíces que combina:

1. **Datos reales del mercado mexicano** — respaldado por BACKBONE con 101,971+ propiedades indexadas de 10+ fuentes públicas (Inmuebles24, Vivanuncios, Propiedades.com, etc.)
2. **Especialización vertical** — no es un ChatGPT con prompt inmobiliario, sino 8 skills entrenadas específicamente para el dominio (Describe, Valúa, Negocia, Compara, Infonavit, Atiende, Mercado, Reporte)
3. **Contexto persistente** — memoria entre sesiones, sabe quién es el cliente del agente y dónde dejó la conversación

Lo que Thuban NO es: no es un CRM, no es un marketplace de propiedades, no es un generador de leads. Es un asistente inteligente que potencia al agente, no lo reemplaza.

## Operating Context

- **Canales:** Web app (onboarding) → WhatsApp (uso diario, futuro)
- **Dispositivos:** Mobile-first (375px+), desktop (1440px)
- **Horarios:** El agente usa Thuban principalmente por las noches (para preparar el día siguiente) y en momentos muertos entre citas
- **Entorno:** Navegador web moderno (Chrome, Safari), conexión a internet variable (México tiene zonas con 3G)
- **Competencia indirecta:** ChatGPT con prompting manual, EasyBroker (sin IA conversacional), MarketDataMéxico (solo datos, sin asistente)

## Capabilities and Constraints

### Funcionalidades actuales (Jul 2026)

| Capacidad | Estado | 
|-----------|--------|
| Landing premium (tema oscuro oro, 6 páginas conceptuales) | ✅ Producción |
| Auth (registro/login JWT vía BACKBONE) | ✅ Producción |
| Chat IA con DeepSeek + function calling a BACKBONE | ✅ Producción |
| Sistema de prompts 5-capas (SOUL, IDENTITY, TOOLS, MEMORY, route) | ✅ Producción |
| Toolbar de capacidades (Describe, Valúa, Negocia, Mercado) | ✅ Producción |
| Persistencia de conversaciones (localforage/IndexedDB) | ✅ Producción |
| Stripe Checkout + Webhook (demo y real) | ✅ Producción |
| Sistema de créditos (free 5, upgrade a Pro) | ✅ Producción |
| Dashboard con grid de propiedades desde BACKBONE | ✅ Producción |
| Análisis de mercado con tendencias BACKBONE | ✅ Producción |

### Capacidades planeadas

| Capacidad | Fase | 
|-----------|------|
| Describe propiedad (generar descripciones profesionales) | F1 |
| Educación Infonavit (reglas actualizadas del organismo) | F1 |
| Negociación asistida (estrategias y técnicas) | F1 |
| Comparación de propiedades (RAG + vector search) | F2 |
| Análisis de mercado por zona geográfica | F2 |
| Reportes PDF descargables | F2 |
| WhatsApp bridge (canal principal del agente) | F3 |
| Valuación conversacional de propiedades | F3 |
| Voice AI 24/7 | F3 |
| Proyectos multi-cliente (workspaces por cartera) | F4 |

### Constraints técnicas

- **Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4
- **LLM:** DeepSeek vía OpenRouter (modelo: deepseek-chat)
- **API de datos:** BACKBONE API (proxy en `/api/backbone/`)
- **Auth:** JWT emitido por BACKBONE
- **Pagos:** Stripe (modo real con STRIPE_SECRET_KEY)
- **Persistencia:** localforage/IndexedDB (cliente) — migración futura a PostgreSQL
- **Deploy:** Vercel + Cloudflare DNS (app.thuban.online)
- **Dominio:** thuban.online (app.thuban.online para la web app)
- **Diseño:** Tema oscuro con acento dorado (#f59e0b), tech-minimal inspirado en genspark.ai

### Lo que Thuban NO hace

- No es un CRM ni reemplaza a GHL (integración futura)
- No es un marketplace abierto al público (solo agentes registrados)
- No ofrece asesoría legal ni financiera vinculante
- No garantiza exactitud total de los datos (fuentes públicas indexadas automáticamente)
- No tiene app móvil nativa (PWA futura)

## Brand Commitments

- **Nombre:** Thuban (estrella en la constelación Draco — "el guardián")
- **Eslogan:** "Inteligencia Artificial para Bienes Raíces"
- **Marca completa:** "Thuban — Powered by Polaris by Visionnorth"
- **Personalidad:** Profesional con calidez. Serio pero no frío. Tecnología para personas, no para ingenieros.
- **Voz:** Confiable, directa, mexicana (no neutra internacional). Usa "tú", no "usted". Frases cortas, sin jerga técnica.
- **Identidad visual:** Tech-minimal oscuro (#0a0a0f fondo, #f4f4f9 texto, #f59e0b acento dorado). Sin fotos de stock ni personas IA. Sin emojis en títulos ni botones.
- **Diferenciador inmutable:** Único asistente IA inmobiliario con datos reales del mercado mexicano (no ChatGPT con prompt)
- **Propiedad intelectual:** Todos los derechos reservados. Marca propiedad de CAMARENA'S GROUP LLC.
- **Legal:** Operado por Polaris / VisionNorth. Responsable: CAMARENA'S GROUP LLC. Contacto: legal@visionnorth.mx

## Evidence on Hand

- **Brief completo de diseño:** `tmp/thuban-pherkad-brief.md` — 312 líneas con especificación visual detallada, paleta, tipografía, layout mobile-first, anti-patrones
- **ADR-015:** `ADR-015-THUBAN-5-CAPAS.md` — Arquitectura de 5 capas inspirada en HappyCapy.ai
- **Plan de implementación:** `PLAN-IMPLEMENTACION-HAPPYCAPY.md` — Roadmap de 20 semanas
- **CLAUDE.md:** `CLAUDE.md` — Documentación operativa del proyecto
- **AGENTS.md:** `AGENTS.md` — Documentación de estructura y stack
- **Plan de escalabilidad:** `ROADMAP.md` — Fases 1-3 con tiempos
- **Auditoría Impeccable:** `PLAN-IMPECCABLE.md` — Plan de adopción de buenas prácticas
- **Código fuente:** `src/` — Next.js 16 con App Router, TypeScript, Tailwind v4
- **Design tokens:** `src/app/globals.css` — Paleta completa en @theme de Tailwind

### Lo que NO tenemos (no inventar)

- ❌ Testimonios reales de usuarios (producto en pre-lanzamiento)
- ❌ Casos de estudio con métricas de éxito
- ❌ Precios definitivos (los del brief son propuesta inicial)
- ❌ Números de usuarios registrados
- ❌ Fecha de lanzamiento oficial

## Product Principles

1. **Mobile-first, siempre.** El agente inmobiliario mexicano vive en su celular. Todo en Thuban debe funcionar perfectamente en 375px antes de verse bien en 1440px.

2. **Datos reales, nunca inventados.** Thuban no fabrica información. Si no hay datos de BACKBONE para una consulta, Thuban lo dice claramente. No se inventan precios, tendencias ni propiedades.

3. **Una herramienta a la vez.** Thuban no es un oráculo generalista. Cada conversación se enruta a una skill específica (Describe, Valúa, Negocia...). El agente sabe exactamente qué está usando.

4. **Gratis para empezar, valioso para quedarse.** El plan free (5 créditos) demuestra el valor sin riesgo. El plan Pro ($299/mes) es para quien ya experimentó el producto y necesita escala.

5. **Transparencia sobre automatización.** Thuban muestra lo que está haciendo (🔍 buscando, 📊 analizando, ✅ listo). El usuario nunca se pregunta "¿ya terminó?".

6. **Contexto persistente sin fricción.** La memoria entre sesiones es automática. El agente retoma donde dejó sin tener que explicar todo otra vez.

7. **WhatsApp es el destino, la web es el onboarding.** La arquitectura asume que el canal principal será WhatsApp. La web UI existe para registrar, explorar y configurar; el uso diario ocurre en el chat del agente.

## Accessibility & Inclusion

- **Estándar:** WCAG AA (contraste 4.5:1 texto normal, 3:1 texto grande)
- **Focus states:** outline 2px solid #f59e0b, outline-offset 2px en todos los elementos interactivos
- **Touch targets:** mínimo 44px en mobile (botones, links de navegación, inputs)
- **Labels:** todos los inputs de formulario tienen label semántico visible
- **Skip link:** enlace "Saltar al contenido" al inicio de cada página
- **Alt text:** todos los íconos decorativos con aria-hidden="true"; imágenes informativas con alt descriptivo
- **Reducción de movimiento:** `@media (prefers-reduced-motion: reduce)` desactiva animaciones no esenciales
- **Idioma:** Español mexicano, configurado con lang="es-MX"
- **Privacidad:** Sin rastreadores ni analytics. Sin cookies de rastreo publicitario.
