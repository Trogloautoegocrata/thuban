# 🐉 PLAN DE IMPLEMENTACIÓN — Thuban + Aprendizajes HappyCapy

> **Documento Maestro de Implementación**
> **Producto:** Thuban — IA Conversacional para Bienes Raíces LATAM
> **Versión:** 1.0 — Julio 2026
> **Inspiración:** HappyCapy.ai (agente-native computer, 5-file config, skills MCP, visual desktop, bridges)
> **Propósito:** Orquestar al ecosistema para construir Thuban con las mejores lecciones de HappyCapy

---

## 📋 Índice

1. [Resumen Ejecutivo](#1-resumen-ejecutivo)
2. [Aprendizajes de HappyCapy Aplicables a Thuban](#2-aprendizajes-de-happycapy-aplicables-a-thuban)
3. [Arquitectura de 5 Capas (Inspirada en HappyCapy)](#3-arquitectura-de-5-capas-inspirada-en-happycapy)
4. [Mapeo de Integración con el Ecosistema](#4-mapeo-de-integración-con-el-ecosistema)
5. [Plan de Implementación por Fases](#5-plan-de-implementación-por-fases)
6. [Artefactos a Crear](#6-artefactos-a-crear)
7. [Métrica de Éxito por Fase](#7-métrica-de-éxito-por-fase)
8. [Preguntas Abiertas y Riesgos](#8-preguntas-abiertas-y-riesgos)

---

## 1. Resumen Ejecutivo

Thuban es actualmente un MVP funcional (Next.js 16 + DeepSeek + BACKBONE API, ~101K propiedades) que necesita evolucionar de "chat IA genérico con temática inmobiliaria" a un **asistente conversacional especializado** que implemente las 8 capacidades documentadas en la investigación de mercado.

HappyCapy.ai nos enseñó 5 lecciones arquitectónicas directamente aplicables:

| Lección HappyCapy | Traducción a Thuban | Prioridad |
|-------------------|---------------------|:---------:|
| **5-file config system** | Arquitectura de prompts en 5 capas por herramienta | 🔴 Fase 1 |
| **Desktops/workspaces** | Proyectos y sesiones por cliente del agente | 🟡 Fase 2 |
| **Skills vía MCP** | Skills verticales inmobiliarias (no 300K, sino 8) | 🔴 Fase 1 |
| **Visual desktop** | Transparencia: mostrar qué está haciendo Thuban | 🟡 Fase 2 |
| **Bridges (Telegram, Slack)** | WhatsApp como canal principal del agente MX | 🟡 Fase 3 |

**Regla de oro:** Thuban NO es BACKBONE, NO es PADIM, NO es Polaris. Es un asistente conversacional que USA esos productos como infraestructura. No mezclar. No canibalizar.

---

## 2. Aprendizajes de HappyCapy Aplicables a Thuban

### 2.1 5-File Config System → Arquitectura de Prompts en 5 Capas

HappyCapy configura cada agente con 5 archivos markdown: SOUL, USER, IDENTITY, MEMORY, AGENTS.

**Traducción a Thuban:**

| Archivo HappyCapy | Equivalente Thuban | Implementación Técnica |
|-------------------|-------------------|----------------------|
| **SOUL.md** | **System Prompt Base** — Valores, guardrails, lo que NO hacer | `SYSTEM_PROMPT_BASE` en `lib/prompts/` |
| **IDENTITY.md** | **Persona del Asistente** — "Eres Thuban, asistente IA para bienes raíces mexicanos..." | `SYSTEM_PROMPT_PERSONA` |
| **MEMORY.md** | **Contexto Persistente** — Preferencias del agente, historial de cliente | Tabla `conversations` en PostgreSQL |
| **USER.md** | **Perfil del Usuario** — Qué agente está usando Thuban, su zona, su estilo | Tabla `user_profiles` |
| **AGENTS.md** | **Routing de Herramientas** — Cuándo llamar a BACKBONE, cuándo generar texto | Function Calling + tool definitions |

**Implementación:**

```
src/lib/prompts/
├── base.ts              # SOUL — Guardrails, valores, límites
├── persona.ts           # IDENTITY — Voz del asistente
├── tools.ts             # Function calling definitions
├── capacidades/         # Prompts específicos por capacidad
│   ├── descripciones.ts # Capacidad #1
│   ├── valuacion.ts     # Capacidad #3
│   ├── negociacion.ts   # Capacidad #4
│   ├── comparacion.ts   # Capacidad #6
│   ├── educacion.ts     # Capacidad #5
│   ├── atencion.ts      # Capacidad #6
│   └── reportes.ts      # Capacidad #8
└── route.ts             # Router de sistema de prompts
```

### 2.2 Skills → Capacidades Verticales (No 300K, Sino 8)

HappyCapy tiene 300,000 skills. Thuban necesita exactamente **8 skills** — una por cada vacío del mercado documentado.

| Skill Thuban | Vacío de Mercado | Tecnología | Estado |
|-------------|:----------------:|------------|:------:|
| **#1 Describe** | Descripciones IA con contexto MX | LLM + Prompt Engineering | 🔴 No implementado |
| **#2 ¿Cuánto vale?** | Valuación conversacional | BACKBONE Val AI + LLM | 🟡 BACKBONE listo |
| **#3 Negocia** | Preparación de negociación con datos | BACKBONE MI + LLM | 🔴 No implementado |
| **#4 Compara** | Comparación inteligente en lenguaje natural | RAG + Vector DB + BACKBONE | 🔴 No implementado |
| **#5 Infonavit** | Educación hipotecaria conversacional | LLM + Prompt especializado | 🔴 No implementado |
| **#6 Atiende** | Atención 24/7 con captura de leads | LLM + GHL + WhatsApp | 🔴 No implementado |
| **#7 Mercado** | Análisis de mercado por zona | BACKBONE MI + LLM | 🟡 BACKBONE listo |
| **#8 Reporte** | Reportes PDF profesionales | BACKBONE MI + PDF gen | 🔴 No implementado |

### 2.3 Desktops → Proyectos por Cliente

HappyCapy tiene "Desktops" como workspaces aislados. Thuban los implementa como:

- **"Proyectos"** por cada cliente del agente inmobiliario
- Cada proyecto guarda: historial de búsquedas, propiedades favoritas, notas del agente
- No es CRM — es **contexto persistente** entre sesiones del asistente

### 2.4 Visual Desktop → Transparencia en el Chat

HappyCapy muestra al usuario lo que el agente está haciendo. Thuban implementa:

```
Usuario: "Busca casas en Cancún por menos de $5M"

Thuban responde con estados visuales:
  🔍 Buscando propiedades en Cancún...
  📊 Filtrando por precio < $5M...
  ✅ Encontré 23 propiedades. Mostrando las mejores 3.

  [Resultado: 3 propiedades con foto, precio, y datos clave]
```

Esto construye confianza y diferencia a Thuban de un ChatGPT genérico.

### 2.5 Bridges → WhatsApp como Canal Principal

HappyCapy tiene Telegram bridge. En México, el canal es **WhatsApp**.

El 80% de los agentes inmobiliarios mexicanos usan WhatsApp como su herramienta principal. Si Thuban funciona desde WhatsApp, el agente no necesita abrir la web app.

---

## 3. Arquitectura de 5 Capas (Inspirada en HappyCapy)

### 3.1 Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                    CAPA 0: FRONTEND                          │
│  Next.js 16 · TypeScript · Tailwind v4 · Tema oscuro oro    │
│  Landing | Dashboard | Chat | Admin                         │
├─────────────────────────────────────────────────────────────┤
│                    CAPA 1: PROMPTS                           │
│  Sistema de 5-capas: SOUL · IDENTITY · USER · MEMORY · TOOLS│
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐│
│  │  base.ts │ │persona.ts│ │ perfil   │ │ conversaciones   ││
│  │ (SOUL)   │ │(IDENTITY)│ │ (USER)   │ │ (MEMORY)         ││
│  └──────────┘ └──────────┘ └──────────┘ └──────────────────┘│
├─────────────────────────────────────────────────────────────┤
│                  CAPA 2: CAPACIDADES (SKILLS)                │
│  8 skills verticales: Describe · Valúa · Negocia · Compara  │
│  Infonavit · Atiende · Mercado · Reporte                    │
│  Cada skill = prompt + tool definition + validación          │
├─────────────────────────────────────────────────────────────┤
│                 CAPA 3: INTELIGENCIA                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐   │
│  │ DeepSeek │ │ BACKBONE │ │ RAG      │ │ Calculadoras │   │
│  │ API      │ │ Val AI   │ │ pgvector │ │ Infonavit    │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────┘   │
├─────────────────────────────────────────────────────────────┤
│               CAPA 4: ECOSISTEMA                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────────────┐  │
│  │ BACKBONE │ │ Polaris  │ │ PADIM    │ │ WhatsApp API   │  │
│  │ API      │ │ GHL      │ │ Schema   │ │ (futuro)        │  │
│  └──────────┘ └──────────┘ └──────────┘ └────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│              CAPA 5: INFRAESTRUCTURA                          │
│  Vercel (frontend) · BACKBONE server (API) · Cloudflare DNS  │
│  Stripe · PostgreSQL (persistencia)                         │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Stack Tecnológico

| Capa | Componente | Tecnología | Estado |
|------|-----------|-----------|:------:|
| Frontend | Framework | Next.js 16 (App Router) | ✅ Existente |
| Frontend | UI | Tailwind CSS v4 | ✅ Existente |
| Frontend | Estado | Zustand (planeado) | 🟡 Pendiente |
| Prompts | Sistema 5-capas | TypeScript + templates | 🔴 Nueva |
| Capacidades | Skills | TypeScript + funciones | 🔴 Nueva |
| Inteligencia | LLM | DeepSeek API (`deepseek-chat`) | ✅ Existente |
| Inteligencia | Valuación | BACKBONE Valuation AI | 🟡 Disponible |
| Inteligencia | RAG / Vector DB | pgvector en PostgreSQL | 🔴 Nueva |
| Inteligencia | Generación PDF | jsPDF / PDFKit | 🔴 Nueva |
| Ecosistema | BACKBONE | API proxy `/api/backbone/` | ✅ Existente |
| Ecosistema | GHL | API (futuro) | 🔴 Pendiente |
| Ecosistema | WhatsApp | WhatsApp Business API | 🔴 Pendiente |
| Infraestructura | Hosting | Vercel | ✅ Existente |
| Infraestructura | DNS | Cloudflare | ✅ Existente |
| Infraestructura | Pagos | Stripe | 🔴 Pendiente |
| Infraestructura | Persistencia | PostgreSQL vía BACKBONE | 🔴 Pendiente |

---

## 4. Mapeo de Integración con el Ecosistema

### 4.1 Thuban + BACKBONE (Ya existe, fortalecer)

| Recurso BACKBONE | Uso en Thuban | Prioridad |
|-----------------|---------------|:---------:|
| `/v1/properties/stats` | Dashboard: propiedades indexadas | ✅ Hecho |
| `/v1/auth/me`, `/v1/auth/login` | Autenticación JWT | ✅ Hecho |
| `/v1/market/trends` | Análisis de mercado por zona | 🟡 Fase 2 |
| BACKBONE Valuation AI | Valuación conversacional (Capacidad #3) | 🟡 Fase 2 |
| `/v1/search/semantic` | Búsqueda semántica de propiedades | 🟡 Fase 2 |
| DB PostgreSQL | Persistencia de conversaciones | 🔴 Fase 1 |

**Relación:** Thuban es el **frontend conversacional** de BACKBONE. Cada consulta de un agente en Thuban es una llamada a la API de BACKBONE. Thuban NO es BACKBONE.

### 4.2 Thuban + PADIM (Estándar de datos)

| Recurso PADIM | Uso en Thuban |
|--------------|---------------|
| Schema de datos | Normalizar datos de propiedades que Thuban consume |
| Documentación | Referencia para el prompt de descripciones |

**Relación:** Thuban consume datos que (potencialmente) siguen el estándar PADIM. Thuban NO publica en PADIM. PADIM NO es un portal.

### 4.3 Thuban + Polaris DFY (Canal de distribución)

| Recurso Polaris | Uso en Thuban |
|----------------|---------------|
| GHL workflows | Captura de leads desde Thuban a pipeline de ventas |
| Sub-accounts | Multi-tenancy para agencias que usan Thuban |

**Relación:** Thuban es gratuito/freemium. Cuando un agente escala de Thuban Free, Polaris DFY puede ofrecerle el CRM gestionado. Thuban es el embudo, Polaris es el servicio premium.

### 4.4 Thuban + Hermes (Orquestación interna)

Hermes puede:
- Ejecutar cron jobs de análisis de mercado para Thuban
- Monitorear salud del sistema
- Generar reportes automáticos

### 4.5 Thuban + Astra (NO compiten)

| Producto | Para quién | Qué hace |
|----------|-----------|----------|
| **Thuban** | Agente inmobiliario | Herramienta de productividad |
| **Astra** | Comprador final | Experiencia de compra AI-céntrica |

Son complementarios: Thuban potencia al agente, Astra potencia al comprador.

---

## 5. Plan de Implementación por Fases

### Fase 0 — Fundación (Semana 1-2)

**Objetivo:** Preparar Thuban para recibir las capacidades nuevas.

| # | Tarea | Dependencia | Tiempo |
|---|-------|-------------|:------:|
| 0.1 | Crear sistema de prompts 5-capas (`lib/prompts/*`) | — | 4h |
| 0.2 | Implementar persistencia de conversaciones (PostgreSQL vía BACKBONE) | BACKBONE DB | 8h |
| 0.3 | Integrar Stripe billing | Stripe account | 4h |
| 0.4 | Sistema de créditos funcional (no placeholder) | Stripe + DB | 6h |
| 0.5 | Diferenciar las 4 herramientas del dashboard (cada una con su skill) | 0.1 | 4h |

**Entregables Fase 0:**
- [ ] `src/lib/prompts/base.ts`, `persona.ts`, `tools.ts`
- [ ] Historial de conversaciones guardado y recuperable
- [ ] Stripe Checkout funcional (Free / Pro / Enterprise)
- [ ] Créditos reales: asignación por plan, consumo por consulta, recarga
- [ ] Dashboard con las 4 herramientas diferenciadas

**Verificación Fase 0:**
- Login → Chat → Thuban responde con personalidad consistente → Conversación se guarda → Se recupera al volver
- Stripe: Free $0 → Pro $299 → Enterprise $999 funcional
- Cada herramienta del dashboard tiene su propia UI y prompt

**Inspiración HappyCapy:** El 5-file config system y el sistema de créditos son tomados directamente de HappyCapy.

---

### Fase 1 — Capacidades Core (Semana 3-6)

**Objetivo:** Implementar las 3 capacidades de mayor impacto con menor complejidad técnica.

#### Sprint 1.1 — Capacidad #1: "Describe esta propiedad" (Semana 3)

| Tarea | Descripción | Tiempo |
|-------|-------------|:------:|
| 1.1.1 | Prompt especializado para descripciones con contexto MX | 3h |
| 1.1.2 | UI de captura de datos de propiedad (formulario conversacional) | 4h |
| 1.1.3 | 4 formatos de salida: Portal, Instagram, WhatsApp, Brochure | 4h |
| 1.1.4 | Botón "Copiar al portapapeles" por formato | 2h |

**Verificación:** Agente genera descripción en < 10 segundos. Tono profesional, contexto mexicano (recámara, cochera, privada).

#### Sprint 1.2 — Capacidad #5: "¿Cuánto me presta Infonavit?" (Semana 4)

| Tarea | Descripción | Tiempo |
|-------|-------------|:------:|
| 1.2.1 | Investigar reglas Infonavit/Fovissste actualizadas | 4h |
| 1.2.2 | Prompt especializado en educación hipotecaria MX | 3h |
| 1.2.3 | Calculadora conversacional (backend simple) | 6h |
| 1.2.4 | Disclaimer legal visible: "Estimación no vinculante" | 1h |

**Verificación:** Precisión dentro de ±15% de calculadora oficial de Infonavit. Respuesta en < 10 segundos.

#### Sprint 1.3 — Capacidad #3: "Ayúdame a negociar" (Semana 5-6)

| Tarea | Descripción | Tiempo |
|-------|-------------|:------:|
| 1.3.1 | Prompt de simulación de negociación | 4h |
| 1.3.2 | Integración BACKBONE Market Intelligence (precio/m² zona) | 4h |
| 1.3.3 | UI de iteración: "¿Y si ofrezco $X?" | 4h |
| 1.3.4 | Generación de guión sugerido | 3h |

**Verificación:** Agente describe situación → Thuban genera estrategia con argumentos basados en datos.

**Inspiración HappyCapy:** Cada capacidad es un "skill" independiente con su propio prompt (IDENTITY) y herramientas (TOOLS).

---

### Fase 2 — Diferenciación (Semana 7-10)

**Objetivo:** Implementar las capacidades que diferencian a Thuban de cualquier competidor.

#### Sprint 2.1 — Capacidad #7: "¿Cómo está el mercado?" (Semana 7)

| Tarea | Descripción | Tiempo |
|-------|-------------|:------:|
| 2.1.1 | Integrar BACKBONE Market Intelligence (trends, prices) | 4h |
| 2.1.2 | Prompt de análisis conversacional por zona | 3h |
| 2.1.3 | Cobertura inicial: CDMX (30 colonias), MTY (15), GDL (15) | 4h |

**Verificación:** Usuario pregunta por una colonia → Thuban responde con precio/m², tendencia, tiempo en mercado.

#### Sprint 2.2 — Capacidad #4: "Compara propiedades" (Semana 8-9)

| Tarea | Descripción | Tiempo |
|-------|-------------|:------:|
| 2.2.1 | Configurar pgvector en PostgreSQL (BACKBONE DB) | 4h |
| 2.2.2 | Indexar propiedades con embeddings | 6h |
| 2.2.3 | Prompt de comparación con RAG | 4h |
| 2.2.4 | UI de pegar URLs o describir propiedades | 4h |

**Verificación:** Usuario pega 3 URLs → Thuban compara precio/m², antigüedad, metros, ubicación.

#### Sprint 2.3 — Capacidad #8: "Prepara un reporte" (Semana 10)

| Tarea | Descripción | Tiempo |
|-------|-------------|:------:|
| 2.3.1 | Integrar librería de generación PDF | 4h |
| 2.3.2 | Template de reporte profesional (análisis de zona) | 4h |
| 2.3.3 | Template de reporte de valuación | 3h |
| 2.3.4 | Template de comparativa de propiedades | 3h |

**Verificación:** Reporte PDF generado en < 30 segundos, diseño profesional, descargable.

**Inspiración HappyCapy:** Capacidad #4 (RAG) es la versión Thuban de los "skills de búsqueda" de HappyCapy con MCP.

---

### Fase 3 — Canales y Escalabilidad (Semana 11-16)

**Objetivo:** Llevar Thuban a los canales donde viven los agentes.

#### Sprint 3.1 — Capacidad #6: WhatsApp Bridge (Semana 11-13)

| Tarea | Descripción | Tiempo |
|-------|-------------|:------:|
| 3.1.1 | Configurar WhatsApp Business API | 8h |
| 3.1.2 | Bridge WhatsApp ↔ Thuban AI (inspirado en HappyCapy Telegram) | 12h |
| 3.1.3 | Captura de leads + entrega a GHL (Polaris DFY) | 8h |
| 3.1.4 | Manejo de rate limiting + exp backoff | 4h |

**Verificación:** Lead escribe a WhatsApp → Thuban responde IA → Captura datos → Crea contacto en GHL.

#### Sprint 3.2 — Capacidad #2: Valuación conversacional (Semana 14)

| Tarea | Descripción | Tiempo |
|-------|-------------|:------:|
| 3.2.1 | Integrar BACKBONE Valuation AI | 4h |
| 3.2.2 | Prompt de valuación conversacional | 3h |

**Verificación:** Usuario pregunta "¿cuánto vale X?" → Thuban responde con valuación + contexto.

#### Sprint 3.3 — Voice AI (Atención telefónica 24/7) (Semana 15-16)

| Tarea | Descripción | Tiempo |
|-------|-------------|:------:|
| 3.3.1 | Integrar Vapi.ai o Deepgram + ElevenLabs | 8h |
| 3.3.2 | Prompt de atención telefónica con voice UX | 6h |
| 3.3.3 | Integración con GHL para entrega de leads | 4h |

**Verificación:** Lead llama → Thuban contesta → Conversación natural → Lead calificado → Creado en GHL.

**Inspiración HappyCapy:** El Telegram bridge de HappyCapy es el patrón directo para el WhatsApp bridge. HappyCapy ya demostró que es viable.

---

### Fase 4 — Proyectos y Memoria (Semana 17-20)

**Objetivo:** Implementar el concepto "Desktops" de HappyCapy adaptado a Thuban.

| Tarea | Descripción | Tiempo |
|-------|-------------|:------:|
| 4.1 | "Proyectos" por cliente del agente | 8h |
| 4.2 | Sesiones paralelas por proyecto | 6h |
| 4.3 | Memoria persistente entre sesiones (MEMORY.md style) | 6h |
| 4.4 | Compartir proyecto con equipo (multi-usuario) | 8h |

**Inspiración HappyCapy:** Desktops + persistencia de memoria entre sesiones.

---

## 6. Artefactos a Crear

### 6.1 Skills de Hermes para Thuban

| Skill | Propósito | Contenido |
|-------|-----------|-----------|
| `thuban-core` | Arquitectura, prompts, stack, integraciones | 5-capas, plan implementación, mapa de skills |
| `thuban-capacidades` | Las 8 skills verticales con prompts | Cada capacidad = prompt + tools + validación |
| `thuban-whatsapp-bridge` | Bridge WhatsApp ↔ Thuban AI | Basado en patrón HappyCapy Telegram |

### 6.2 Documentación (Vía Láctea)

| Artefacto | Archivo |
|-----------|---------|
| ADR | `ADR-015-THUBAN-5-CAPAS.md` |
| BITACORA | `BITACORA.md` (entrada de implementación Thuban) |
| CHANGELOG | `CHANGELOG.md` (por fase) |
| Diseño UX | `docs/guias/GUIA-99.md` (para operador) |
| Guía técnica | `docs/guias/GUIA-1.md` (para desarrollador) |

### 6.3 Archivos de Código

| Archivo | Propósito |
|---------|-----------|
| `src/lib/prompts/base.ts` | SOUL — Guardrails del asistente |
| `src/lib/prompts/persona.ts` | IDENTITY — Voz y personalidad |
| `src/lib/prompts/tools.ts` | AGENTS — Function calling definitions |
| `src/lib/prompts/capacidades/` | 8 skills, 8 archivos |
| `src/lib/memory.ts` | MEMORY — Gestión de contexto persistente |
| `src/lib/credits.ts` | Sistema de créditos |
| `src/lib/backbone.ts` | Cliente BACKBONE API |
| `src/lib/stripe.ts` | Cliente Stripe |
| `src/app/api/chat/route.ts` | Chat con routing de skills |

---

## 7. Métrica de Éxito por Fase

| Fase | Métrica | Target | Cómo medirlo |
|------|---------|:------:|-------------|
| **F0** | Persistencia funcional | 100% | Conversación guardada y recuperable |
| **F0** | Stripe checkout funcional | 3 planes | Comprar Free/Pro/Enterprise y verificar |
| **F0** | Herramientas diferenciadas | 4 distintas | Cada herramienta tiene su propia UI |
| **F1** | Descripción generada | < 10s | Tiempo real de generación |
| **F1** | Precisión Infonavit | ±15% | vs calculadora oficial |
| **F2** | Cobertura de zonas | 60 colonias | CDMX (30), MTY (15), GDL (15) |
| **F2** | Comparación de propiedades | < 15s | 5 propiedades en paralelo |
| **F3** | WhatsApp bridge funcional | 100% | Lead → WhatsApp → Thuban → GHL |
| **F3** | Voice AI funcional | 100% | Llamada → Thuban → Lead capturado |
| **F4** | Proyectos por cliente | 100% | Workspace aislado por proyecto |

---

## 8. Preguntas Abiertas y Riesgos

### 8.1 Riesgos Técnicos

| Riesgo | Severidad | Mitigación |
|--------|:---------:|------------|
| Costo de DeepSeek API escala con usuarios | 🟡 Medio | Cache de respuestas frecuentes + modelo Haiku para consultas simples |
| pgvector no disponible en BACKBONE DB | 🟡 Medio | Usar Qdrant como alternativa self-hosted |
| WhatsApp Business API requiere aprobación Meta | 🟡 Medio | Iniciar proceso en Fase 2, no esperar a Fase 3 |
| Stripe no configurado en BACKBONE server | 🔴 Alto | Evaluar Stripe standalone para Thuban |

### 8.2 Riesgos de Producto

| Riesgo | Severidad | Mitigación |
|--------|:---------:|------------|
| Agente no adopta Thuban (no forma hábito) | 🔴 Alto | WhatsApp primero (donde ya vive el agente) |
| EasyBroker lanza IA conversacional | 🟡 Medio | Thuban tiene 6 meses de ventaja + datos BACKBONE que EasyBroker no tiene |
| Precios no validados con clientes | 🟡 Medio | Hacer entrevistas de pricing en Fase 0 |
| Confusión BACKBONE vs Thuban (mercado) | 🟡 Medio | Comunicación clara: "Thuban es el chat, BACKBONE son los datos" |

### 8.3 Preguntas Abiertas

| # | Pregunta | Quién responde | Cuándo |
|---|----------|---------------|:------:|
| 1 | ¿Validar precios $0/$299/$999 con clientes reales? | CEO | Antes de F0 |
| 2 | ¿Thuban debe tener su propio Stripe o usar el de BACKBONE? | CEO + Técnico | F0 |
| 3 | ¿Priorizar WhatsApp sobre Voice AI o viceversa? | CEO | F2 |
| 4 | ¿pgvector en BACKBONE DB o Qdrant independiente? | Técnico | F2 |
| 5 | ¿Thuban ofrece API para proptechs (white-label) eventualmente? | CEO | Post-F4 |

---

## Apéndice A: Línea de Tiempo Total

```
Sem 1-2:   F0 — Fundación (prompts 5-capas, persistencia, Stripe, créditos)
Sem 3:     F1.1 — Capacidad #1 "Describe esta propiedad"
Sem 4:     F1.2 — Capacidad #5 "Educación Infonavit"
Sem 5-6:   F1.3 — Capacidad #3 "Ayúdame a negociar"
Sem 7:     F2.1 — Capacidad #7 "Análisis de mercado"
Sem 8-9:   F2.2 — Capacidad #4 "Compara propiedades" (RAG + Vector DB)
Sem 10:    F2.3 — Capacidad #8 "Reportes PDF"
Sem 11-13: F3.1 — Capacidad #6 "WhatsApp bridge"
Sem 14:    F3.2 — Capacidad #2 "Valuación conversacional"
Sem 15-16: F3.3 — Voice AI (atención telefónica 24/7)
Sem 17-20: F4 — Proyectos, memoria persistente, multi-usuario

Tiempo total estimado: 20 semanas
```

## Apéndice B: Lo que HappyCapy NO puede hacer y Thuban SÍ

| Capacidad | HappyCapy | Thuban |
|-----------|:---------:|:------:|
| Chat IA inmobiliario | ❌ Genérico | ✅ Especializado MX/LATAM |
| Datos de propiedades reales (101K+) | ❌ | ✅ vía BACKBONE |
| Valuación conversacional con datos locales | ❌ | ✅ vía BACKBONE Val AI |
| Educación Infonavit/Fovissste | ❌ | ✅ Prompt especializado |
| Comparación de propiedades MX | ❌ | ✅ RAG + Vector DB |
| Reportes PDF profesionales MX | ❌ | ✅ Generación nativa |
| Integración GHL (CRM MX líder) | ❌ | ✅ vía Polaris DFY |
| WhatsApp bridge (canal MX #1) | ❌ Telegram bridge | ✅ WhatsApp bridge |
| Atención telefónica 24/7 con voz | ❌ | ✅ vía Vapi.ai |

**Este es el diferenciador clave de Thuban:** HappyCapy es una navaja suiza generalista. Thuban es un bisturí especializado para el mercado inmobiliario LATAM — con datos reales, contexto local y canales que el agente mexicano ya usa.

---

*Documento generado por OmegaBridge · Hermes x VisionNorth · Julio 2026*
*Basado en: investigación de HappyCapy.ai, INVESTIGACION-MERCADO.md de Thuban, buyer personas del ecosistema*
