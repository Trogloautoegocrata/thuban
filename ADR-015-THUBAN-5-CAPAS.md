# ADR-015: Arquitectura de 5 Capas para Thuban (Inspirada en HappyCapy)

- **Fecha:** 2026-07-23
- **Status:** Aceptado
- **Decisión:** Implementar arquitectura de 5 capas para Thuban (Frontend → Prompts → Capacidades → Inteligencia → Ecosistema), con plan de implementación de 20 semanas inspirado en HappyCapy.ai
- **Contexto:** [Thuban — IA Conversacional para Bienes Raíces LATAM](#contexto)
- **Consecuencias:** [Nuevas capacidades, trade-offs, riesgos mitigados](#consecuencias)
- **Alternativas:** [Evaluación de 3 caminos distintos](#alternativas-consideradas)

---

## Contexto

Thuban es actualmente un MVP funcional construido sobre Next.js 16 + DeepSeek + BACKBONE API (~101K propiedades indexadas). El producto existe como una aplicación web con login, dashboard básico, y un chat genérico que responde preguntas sobre propiedades usando la API de BACKBONE.

### El Problema

El MVP de Thuban es funcional pero genérico. Se comporta como un "ChatGPT con temática inmobiliaria" — responde preguntas pero no tiene:

1. **Personalidad consistente** — No hay una voz ni guardrails definidos. Cada respuesta depende enteramente del prompt instantáneo.
2. **Especialización vertical** — No distingue entre describir una propiedad, valuarla, negociar, comparar, educar sobre Infonavit, etc.
3. **Memoria persistente** — Las conversaciones se pierden entre sesiones. No hay contexto del cliente del agente.
4. **Transparencia** — El usuario no ve qué está haciendo Thuban internamente (buscando, calculando, analizando).
5. **Canales** — Solo funciona via web. El 80% de los agentes inmobiliarios mexicanos viven en WhatsApp.

### Lo que Aprendimos de HappyCapy.ai

HappyCapy.ai demostró un patrón arquitectónico exitoso para agentes conversacionales especializados. Las 5 lecciones directamente aplicables a Thuban:

| Lección HappyCapy | Traducción a Thuban | Impacto |
|---|---|---|
| **5-file config system** (SOUL, IDENTITY, USER, MEMORY, AGENTS) | Arquitectura de prompts en 5 capas que separa guardrails, voz, perfil, contexto y herramientas | Cada consulta tiene el contexto correcto sin mezclar responsabilidades |
| **Skills vía MCP** | 8 skills verticales inmobiliarias en lugar de 300K skills genéricos | Cada skill tiene su propio prompt + herramientas + validación |
| **Desktops/workspaces** | Proyectos por cliente del agente, sesiones aisladas con memoria persistente | El agente retoma donde dejó, no empieza de cero cada vez |
| **Visual desktop** | Transparencia: Thuban muestra lo que está haciendo (🔍 buscando, 📊 analizando, ✅ listo) | Genera confianza y diferencia de un chat genérico |
| **Bridges (Telegram, Slack)** | WhatsApp como canal principal del agente inmobiliario mexicano | Donde el agente ya vive, ahí debe estar Thuban |

### Por Qué Ahora

El mercado de IA conversacional inmobiliaria en LATAM está en formación. EasyBroker y otras plataformas no han lanzado aún asistentes conversacionales especializados. Thuban tiene una ventana de ~6 meses para establecer diferenciación. La arquitectura actual (chat genérico + BACKBONE API) no es suficiente para capturar esa ventana. Se necesita una arquitectura que permita:

- Evolucionar de forma controlada (no todo a la vez)
- Añadir capacidades sin reescribir el core
- Integrar canales sin modificar la lógica del asistente
- Persistir contexto sin depender de un CRM externo

---

## Decisión

Se implementará una **arquitectura de 5 capas** para Thuban, inspirada directamente en el modelo de HappyCapy.ai pero adaptada al dominio inmobiliario LATAM y al ecosistema existente (BACKBONE, Polaris, PADIM).

### La Arquitectura

```
┌─────────────────────────────────────────────────────────────────┐
│                    CAPA 0: FRONTEND                              │
│  Next.js 16 · TypeScript · Tailwind v4 · Tema oscuro oro         │
│  Landing | Dashboard | Chat | Admin                              │
│  Propósito: Experiencia de usuario diferenciada por herramienta   │
├─────────────────────────────────────────────────────────────────┤
│                    CAPA 1: PROMPTS                               │
│  Sistema de 5-capas: SOUL · IDENTITY · USER · MEMORY · TOOLS    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────────┐│
│  │  base.ts │ │persona.ts│ │ perfil   │ │ conversaciones       ││
│  │ (SOUL)   │ │(IDENTITY)│ │ (USER)   │ │ (MEMORY)             ││
│  │   -      │ │   -      │ │   -      │ │   -                  ││
│  │Guardrails│ │ Voz      │ │ Prefs    │ │ Historial            ││
│  │Valores   │ │Tono      │ │ Zona     │ │ Contexto             ││
│  │Límites   │ │Estilo    │ │Plan      │ │ Preferencias         ││
│  └──────────┘ └──────────┘ └──────────┘ └──────────────────────┘│
│  Propósito: Cada consulta tiene el cocktail de prompts correcto  │
├─────────────────────────────────────────────────────────────────┤
│                  CAPA 2: CAPACIDADES (SKILLS)                    │
│  8 skills verticales — cada una = prompt + tools + validación    │
│                                                                   │
│  #1 Describe     | #2 ¿Cuánto vale?  | #3 Negocia               │
│  #4 Compara      | #5 Infonavit      | #6 Atiende               │
│  #7 Mercado      | #8 Reporte                                   │
│                                                                   │
│  Propósito: Especialización — no es un chat genérico, es un      │
│  asistente que sabe de bienes raíces mexicanos                   │
├─────────────────────────────────────────────────────────────────┤
│                 CAPA 3: INTELIGENCIA                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────────────────┐  │
│  │ DeepSeek │ │ BACKBONE │ │ RAG      │ │ Calculadoras       │  │
│  │ API      │ │ Val AI   │ │ pgvector │ │ Infonavit          │  │
│  └──────────┘ └──────────┘ └──────────┘ └────────────────────┘  │
│  Propósito: Motores que alimentan las capacidades                 │
├─────────────────────────────────────────────────────────────────┤
│               CAPA 4: ECOSISTEMA                                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────────────────┐  │
│  │ BACKBONE │ │ Polaris  │ │ PADIM    │ │ WhatsApp API       │  │
│  │ API      │ │ GHL      │ │ Schema   │ │ (futuro Voice AI)  │  │
│  └──────────┘ └──────────┘ └──────────┘ └────────────────────┘  │
│  Propósito: Thuban NO es estos productos — los USA              │
├─────────────────────────────────────────────────────────────────┤
│              CAPA 5: INFRAESTRUCTURA                              │
│  Vercel (frontend) · BACKBONE server (API) · Cloudflare DNS      │
│  Stripe · PostgreSQL · pgvector                                   │
│  Propósito: Corriente abajo que no distrae al usuario             │
└─────────────────────────────────────────────────────────────────┘
```

### Principios Arquitectónicos

1. **Separación de responsabilidades.** Cada capa tiene un propósito único. La Capa 1 (Prompts) no llama directamente a la Capa 4 (Ecosistema). La comunicación fluye secuencialmente con interfaces claras.

2. **Skills como unidades autónomas.** Cada capacidad (Capa 2) es autocontenida: su prompt, sus tools, su validación. Añadir una skill nueva no requiere modificar las existentes.

3. **Thuban NO es sus integraciones.** Thuban usa BACKBONE como fuente de datos, Polaris como canal de distribución, PADIM como estándar de datos. Pero Thuban no es ninguno de esos productos. No mezclar identidades.

4. **Persistencia como requisito, no feature.** La memoria (MEMORY) no es opcional — es lo que diferencia un asistente de un chat stateless.

5. **WhatsApp primero.** La arquitectura asume que el canal principal será WhatsApp. La web UI es el onboarding; WhatsApp es el uso diario.

---

## Consecuencias

### Positivas (+)

- **Evolución controlada.** Cada fase del plan (20 semanas) entrega valor medible. No hay "big bang" de integración.
- **Reutilización de skills.** Una vez implementada una capacidad en la web,移植arla a WhatsApp requiere solo añadir el bridge — la lógica de la skill no cambia.
- **Aislamiento de fallos.** Si BACKBONE API cae, las capacidades que dependen de datos estructurados (Valuación, Mercado) se degradan, pero las que usan solo LLM (Describe, Infonavit) siguen funcionando.
- **Testing por capa.** Cada capa puede testearse independientemente. Los prompts se validan en aislamiento antes de conectarlos a las tools.
- **Onboarding rápido.** Nuevos desarrolladores entienden la arquitectura leyendo 5 nombres de capa.

### Negativas (-)

- **Complejidad inicial.** La arquitectura de 5 capas es más compleja que un chat monolítico. Las primeras 2 semanas (Fase 0) son preparación, no entrega de valor al usuario final.
- **Costo de abstracción.** Cada capa añade latencia mínima. La suma de 5 capas puede añadir 200-500ms por consulta vs un prompt único.
- **Sobrecarga de mantenimiento.** 8 skills = 8 prompts que mantener actualizados (reglas Infonavit cambian, mercado cambia, etc.).

### Riesgos Mitigados

| Riesgo | Mitigación |
|---|---|
| **Costo DeepSeek escala con usuarios** | Cache de respuestas frecuentes + modelo Haiku para consultas simples (Capa 3) |
| **pgvector no disponible en BACKBONE DB** | Qdrant como alternativa self-hosted (Capa 3) |
| **WhatsApp Business API requiere aprobación Meta** | Iniciar proceso en Fase 2, no esperar a Fase 3 (Capa 4) |
| **Stripe no configurado en BACKBONE server** | Stripe standalone para Thuban con webhooks propios (Capa 5) |
| **Agente no adopta Thuban** | WhatsApp como canal principal (donde ya vive el agente) desde Fase 3 |
| **Confusión BACKBONE vs Thuban** | Comunicación clara en UI: "Thuban es el chat, BACKBONE potencia los datos" |

---

## Alternativas Consideradas

### Alternativa 1: Seguir como chat genérico (No adoptada)

**Descripción:** Mantener Thuban como está — un chat IA con temática inmobiliaria que usa BACKBONE API. Mejorar el prompt base pero sin arquitectura de capas ni skills verticales.

**Ventajas:**
- Sin inversión en arquitectura
- Time-to-market inmediato para mejoras pequeñas
- Sin riesgo de over-engineering

**Desventajas:**
- No hay diferenciación sostenible — cualquier competidor replica con un prompt mejor
- No hay especialización — el chat trata "Describe esta propiedad" igual que "¿Cuánto me presta Infonavit?"
- No hay memoria — cada sesión empieza de cero
- No hay canales — solo web
- HappyCapy ya demostró que los agentes especializados (con skills, memoria, bridges) son significativamente más valiosos que los chats genéricos

**Veredicto:** Rechazada. La ventana de oportunidad es demasiado corta para no diferenciarse. HappyCapy es la prueba viviente de que la arquitectura de skills + capas + bridges es el estándar emergente para agentes conversacionales.

---

### Alternativa 2: Usar LangChain / LangGraph (No adoptada)

**Descripción:** Implementar Thuban sobre LangChain/LangGraph como framework de agentes, con chains, tools, memory y routing.

**Ventajas:**
- Framework maduro con abstracciones para prompts, chains, memory
- Community grande, documentación extensa
- Soporte nativo para RAG, tool calling, persistencia

**Desventajas:**
- **Over-engineering para el caso de uso.** Thuban necesita exactamente 8 skills, no un framework genérico para N agentes. LangChain añade abstracciones que nunca usaríamos.
- **Costos de abstracción.** LangChain añade latencia por cada "chain" que wrappea. En un producto donde la velocidad de respuesta es crítica (< 5 segundos), cada abstracción cuenta.
- **Debugging complejo.** Los errores de LangChain son notoriamente difíciles de debuggear — wrappeos de wrappeos.
- **Dependencia externa.** LangChain cambia rápido. Mantenerse al día con breaking changes consume tiempo que debería ir al producto.
- **HappyCapy no lo usó.** HappyCapy demostró que se puede construir un agente conversacional exitoso sin LangChain — con TypeScript vanilla, prompts bien estructurados, y function calling nativo del LLM.

**Veredicto:** Rechazada. Thuban no necesita un framework de agentes. Necesita **8 skills bien diseñados** con prompts precisos. TypeScript + DeepSeek function calling + PostgreSQL es suficiente. HappyCapy es el proof of concept de que esto funciona sin LangChain.

---

### Alternativa 3: Copiar HappyCapy Directamente (No adoptada)

**Descripción:** Implementar la arquitectura de HappyCapy exactamente como ellos la tienen: 5-file config system, 300K skills marketplace, visual desktop completo, bridges multiplataforma.

**Ventajas:**
- Patrón probado (HappyCapy funciona)
- Sin riesgo de diseño — copiar lo que ya funciona
- HappyCapy tiene buena documentación de su arquitectura

**Desventajas:**
- **HappyCapy es un producto B2C genérico.** Thuban es B2B especializado en bienes raíces LATAM. Copiar el modelo de 300K skills no tiene sentido cuando Thuban necesita exactamente 8.
- **Sobredimensionado.** HappyCapy tiene desktops visuales completos, skills marketplace, bridges a Telegram/Slack, etc. Thuban necesita WhatsApp MX y proyectos simples por cliente.
- **Tiempo de implementación.** HappyCapy tardó ~12 meses en llegar a su estado actual. Thuban no tiene 12 meses — tiene 20 semanas.
- **Recursos del equipo.** HappyCapy es un equipo dedicado. El equipo de Thuban es el ecosistema existente.

**Veredicto:** Rechazada. HappyCapy es inspiración, no plantilla. Se toman los patrones (5-capas, skills vía MCP, bridges, visual feedback) pero adaptados a la escala y dominio de Thuban. 8 skills, 1 canal primario, proyectos simples.

---

### Decisión Final: Alternativa Propuesta — Arquitectura de 5 Capas Adaptada

**Descripción:** Implementar arquitectura de 5 capas inspirada en HappyCapy pero adaptada al dominio inmobiliario LATAM, con 8 skills verticales (no 300K), 1 canal primario (WhatsApp), y plan de implementación en 5 fases (20 semanas).

**Fundamentos de la decisión:**

1. **HappyCapy validó el patrón.** No estamos inventando — estamos adaptando un patrón que ya demostró funcionar para agentes conversacionales especializados.

2. **5 capas es el punto dulce.** Menos (3 capas) no separa suficiente la lógica. Más (7 capas) es over-engineering. 5 capas permite evolucionar sin reescribir.

3. **8 skills es el número correcto.** Son los 8 vacíos de mercado documentados en la investigación de producto. Cada skill es una capacidad que un agente inmobiliario necesita y que ningún competidor ofrece integrada.

4. **20 semanas es realista.** 5 fases de 2-4 semanas cada una. Cada fase entrega valor medible. El producto no está "congelado" durante 20 semanas — está live y mejorando.

5. **El ecosistema ya existe.** BACKBONE (datos), Polaris (GHL/distribución), PADIM (estándar) están listos. Thuban los orquesta, no los construye.

---

## Plan de Implementación (Resumen)

### Fase 0 — Fundación (Semanas 1-2)
*Preparar Thuban para recibir las capacidades nuevas.*

| # | Tarea | Tiempo |
|---|-------|:------:|
| 0.1 | Crear sistema de prompts 5-capas (`lib/prompts/*`) | 4h |
| 0.2 | Persistencia de conversaciones (PostgreSQL vía BACKBONE) | 8h |
| 0.3 | Stripe billing (Free / Pro / Enterprise) | 4h |
| 0.4 | Sistema de créditos funcional | 6h |
| 0.5 | Dashboard con 4 herramientas diferenciadas | 4h |

**Entregables:** `src/lib/prompts/base.ts`, `persona.ts`, `tools.ts` · Historial persistente · Stripe funcional · Créditos reales · Dashboard con 4 herramientas.

---

### Fase 1 — Capacidades Core (Semanas 3-6)
*3 capacidades de mayor impacto con menor complejidad.*

**Sprint 1.1 — Capacidad #1: "Describe esta propiedad" (Semana 3)**
- Prompt especializado con contexto MX (recámara, cochera, privada)
- 4 formatos de salida: Portal, Instagram, WhatsApp, Brochure
- Botón "Copiar al portapapeles" por formato
- Target: < 10 segundos de generación

**Sprint 1.2 — Capacidad #5: "¿Cuánto me presta Infonavit?" (Semana 4)**
- Investigación de reglas Infonavit/Fovissste actualizadas
- Prompt de educación hipotecaria MX
- Calculadora conversacional
- Disclaimer legal: "Estimación no vinculante"
- Target: ±15% de calculadora oficial

**Sprint 1.3 — Capacidad #3: "Ayúdame a negociar" (Semanas 5-6)**
- Prompt de simulación de negociación
- Integración BACKBONE Market Intelligence (precio/m² zona)
- UI de iteración: "¿Y si ofrezco $X?"
- Generación de guión sugerido

---

### Fase 2 — Diferenciación (Semanas 7-10)
*Capacidades que diferencian a Thuban de cualquier competidor.*

**Sprint 2.1 — Capacidad #7: "¿Cómo está el mercado?" (Semana 7)**
- Integrar BACKBONE Market Intelligence
- Análisis conversacional por zona
- Cobertura inicial: CDMX (30 colonias), MTY (15), GDL (15)

**Sprint 2.2 — Capacidad #4: "Compara propiedades" (Semanas 8-9)**
- Configurar pgvector en PostgreSQL (o Qdrant alternativo)
- Indexar propiedades con embeddings
- Prompt de comparación con RAG
- Input: URLs o descripción de propiedades

**Sprint 2.3 — Capacidad #8: "Prepara un reporte" (Semana 10)**
- Librería de generación PDF
- Template: reporte de análisis de zona
- Template: reporte de valuación
- Template: comparativa de propiedades
- Target: < 30 segundos de generación

---

### Fase 3 — Canales y Escalabilidad (Semanas 11-16)
*Llevar Thuban a los canales donde viven los agentes.*

**Sprint 3.1 — Capacidad #6: WhatsApp Bridge (Semanas 11-13)**
- Configurar WhatsApp Business API
- Bridge WhatsApp ↔ Thuban AI (patrón HappyCapy Telegram)
- Captura de leads + GHL (Polaris DFY)
- Rate limiting + exponential backoff
- Target: Lead escribe → Thuban responde → Captura datos → GHL

**Sprint 3.2 — Capacidad #2: Valuación conversacional (Semana 14)**
- Integrar BACKBONE Valuation AI
- Prompt de valuación conversacional

**Sprint 3.3 — Voice AI 24/7 (Semanas 15-16)**
- Integrar Vapi.ai o Deepgram + ElevenLabs
- Prompt de atención telefónica con voice UX
- Integración GHL para leads
- Target: Lead llama → Thuban contesta → Lead calificado → GHL

---

### Fase 4 — Proyectos y Memoria (Semanas 17-20)
*El concepto "Desktops" de HappyCapy adaptado a Thuban.*

| # | Tarea | Tiempo |
|---|-------|:------:|
| 4.1 | Proyectos por cliente del agente | 8h |
| 4.2 | Sesiones paralelas por proyecto | 6h |
| 4.3 | Memoria persistente entre sesiones | 6h |
| 4.4 | Compartir proyecto con equipo (multi-usuario) | 8h |

**Inspiración HappyCapy:** Desktops + persistencia de memoria entre sesiones.

---

### Métrica de Éxito Agregada

| Métrica | Target | Cómo medirlo |
|---------|:------:|-------------|
| Persistencia funcional | 100% | Conversación guardada y recuperable |
| Stripe checkout funcional | 3 planes | Comprar Free/Pro/Enterprise y verificar |
| Descripción generada | < 10s | Tiempo real de generación |
| Precisión Infonavit | ±15% | vs calculadora oficial |
| Cobertura de zonas | 60 colonias | CDMX (30), MTY (15), GDL (15) |
| Comparación propiedades | < 15s | 5 propiedades en paralelo |
| WhatsApp bridge | 100% | Lead → WhatsApp → Thuban → GHL |
| Voice AI | 100% | Llamada → Thuban → Lead capturado |
| Proyectos por cliente | 100% | Workspace aislado por proyecto |

---

### Línea de Tiempo Consolidada

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
```

---

## Apéndice: Stack Tecnológico por Capa

| Capa | Componente | Tecnología | Estado |
|------|-----------|-----------|:------:|
| **Frontend** | Framework | Next.js 16 (App Router) | ✅ Existente |
| **Frontend** | UI | Tailwind CSS v4 | ✅ Existente |
| **Frontend** | Estado | Zustand (planeado) | 🟡 Pendiente |
| **Prompts** | Sistema 5-capas | TypeScript + templates | 🔴 Nueva |
| **Capacidades** | Skills | TypeScript + funciones | 🔴 Nueva |
| **Inteligencia** | LLM | DeepSeek API (`deepseek-chat`) | ✅ Existente |
| **Inteligencia** | Valuación | BACKBONE Valuation AI | 🟡 Disponible |
| **Inteligencia** | RAG / Vector DB | pgvector o Qdrant | 🔴 Nueva |
| **Inteligencia** | Generación PDF | jsPDF / PDFKit | 🔴 Nueva |
| **Ecosistema** | BACKBONE | API proxy `/api/backbone/` | ✅ Existente |
| **Ecosistema** | GHL | API (futuro) | 🔴 Pendiente |
| **Ecosistema** | WhatsApp | WhatsApp Business API | 🔴 Pendiente |
| **Infraestructura** | Hosting | Vercel | ✅ Existente |
| **Infraestructura** | DNS | Cloudflare | ✅ Existente |
| **Infraestructura** | Pagos | Stripe | 🔴 Pendiente |
| **Infraestructura** | Persistencia | PostgreSQL vía BACKBONE | 🔴 Pendiente |
