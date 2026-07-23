# 📊 INVESTIGACIÓN DE MERCADO — Thuban

> **Documento Maestro de Investigación de Mercado**
> **Producto:** Thuban — IA Conversacional para Bienes Raíces LATAM
> **Empresa:** VisionNorth / Polaris
> **Versión:** 1.0
> **Propósito:** Documento de referencia para el equipo de diseño de producto
> **Idioma:** Español
> **Clasificación:** Interno — Equipo de Producto

---

## Índice

1. [Resumen Ejecutivo](#1-resumen-ejecutivo)
2. [Auditoría del Estado Actual de Thuban](#2-auditoría-del-estado-actual-de-thuban)
3. [Mapa del Mercado Inmobiliario Mexicano](#3-mapa-del-mercado-inmobiliario-mexicano)
4. [Análisis de Competencia en México y LATAM](#4-análisis-de-competencia-en-méxico-y-latam)
5. [Los 7 Vacíos Reales del Mercado](#5-los-7-vacíos-reales-del-mercado)
6. [Mapeo Tecnología → Dolor](#6-mapeo-tecnología--dolor)
7. [Las 8 Capacidades Priorizadas](#7-las-8-capacidades-priorizadas)
8. [Conflictos a Evitar](#8-conflictos-a-evitar)
9. [Próximos Pasos y Preguntas Abiertas](#9-próximos-pasos-y-preguntas-abiertas)

---

## 1. Resumen Ejecutivo

Thuban es un producto de inteligencia artificial conversacional especializado en el sector inmobiliario de México y América Latina. Su objetivo es ser el asistente IA de referencia para profesionales inmobiliarios, ofreciendo capacidades que ningún otro producto del mercado actual cubre de manera integrada: descripción contextual de propiedades con lenguaje mexicano, valuación conversacional instantánea, simulación de negociación, comparación inteligente, atención 24/7, educación hipotecaria y análisis de mercado.

El mercado inmobiliario mexicano está dominado por CRMs (EasyBroker), portales clasificados (Inmuebles24, Vivanuncios, Propiedades.com), consultoría de datos costosa y lenta (Softec), y soluciones financieras de nicho (Yave, Flat). Ninguno de estos competidores ofrece IA conversacional como producto principal. Ninguno resuelve los 7 dolores no atendidos que Thuban puede resolver.

Los 7 nichos de buyer personas documentados (Desarrolladora, Agencia, Agente Independiente, Corredor, SOFOM, Admin de Propiedades, Proptech) tienen distintos niveles de disposición a pagar y dolor, pero todos comparten un mismo vacío: **no existe una herramienta de IA conversacional especializada en bienes raíces mexicanos que entienda el contexto local, las reglas de Infonavit/Fovissste, los usos y costumbres del agente mexicano, y los datos de mercado del país.**

Thuban se encuentra en etapa de prototipo funcional (Next.js 16 + DeepSeek API + Tailwind v4), con landing page premium operativa, autenticación vía BACKBONE, y chat con IA especializada. Carece de monetización real, persistencia de conversaciones, integración con Stripe, y herramientas especializadas (actualmente las 4 herramientas propuestas son el mismo chat sin diferenciación).

**Documento vivo — se actualiza con cada investigación y feedback de mercado.**

---

## 2. Auditoría del Estado Actual de Thuban

### 2.1 Stack Técnico

| Componente | Detalle |
|-----------|---------|
| Framework | Next.js 16 (App Router) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS v4 |
| Estado | Zustand (planeado) |
| API Backend | BACKBONE API (proxy `/api/backbone/`) |
| Autenticación | JWT vía BACKBONE |
| Chat IA | DeepSeek API (`deepseek-chat`) |
| Despliegue | Vercel + Cloudflare DNS |
| Diseño | Tema oscuro, acento dorado (`#f59e0b`), fuente Inter + JetBrains Mono |

*Fuente: Código fuente en `/projects/thuban/`, archivos `AGENTS.md` y `page.tsx`.*

### 2.2 Funcionalidades Implementadas (✅) y Pendientes (❌)

| Funcionalidad | Estado | Observaciones |
|--------------|--------|--------------|
| Landing page premium | ✅ | 8 secciones (Header, Hero, Features, Stats, Chat Demo, Pricing, CTA, Footer) |
| Login (BACKBONE API) | ✅ | JWT-based |
| Signup (BACKBONE API) | ✅ | JWT-based |
| Autenticación con guard | ✅ | Protección de rutas del dashboard |
| Logout | ✅ | Limpia token + redirect |
| Chat con IA | ✅ | DeepSeek API con system prompt especializado en bienes raíces MX/LATAM |
| Dashboard básico | ✅ | Conectado a BACKBONE para stats de propiedades |
| Perfil de usuario | ❌ | Página "Mi Perfil" pendiente |
| Stripe billing | ❌ | Sin integración de pagos |
| Sistema de créditos | ❌ | Placeholder: show de 5 créditos gratis, sin lógica real |
| Persistencia de conversaciones | ❌ | Sin guardado de historial de chat |
| Análisis de Mercado | ❌ | Placeholder en landing, sin funcionalidad real |
| Integración GHL | ❌ | Planeado para el futuro |
| Herramientas especializadas | ❌ | Las 4 herramientas (Descripciones, Análisis, Negociación, Atención) son el mismo chat sin diferenciación |
| Equipos multi-usuario | ❌ | No implementado |
| Webhooks | ❌ | No implementado |

*Fuente: Código fuente en `/projects/thuban/`, archivo `ROADMAP.md`.*

### 2.3 Arquitectura Actual

```
Usuario → Landing (/)
         → Login (/login)
         → Signup (/signup)
         → Dashboard (/dashboard) ← BACKBONE API (stats, auth)
              → Chat (/api/chat) ← DeepSeek API (conversación)
```

**Dependencias externas actuales:**
- **BACKBONE API**: Autenticación (JWT), datos de propiedades, estadísticas
- **DeepSeek API**: Motor de chat con system prompt de bienes raíces LATAM (~101,357+ propiedades indexadas de 10+ fuentes)

### 2.4 Planes de Precios Actuales (Código)

| Plan | Precio | Créditos | Características |
|------|--------|----------|-----------------|
| Free | $0/mes | 100 consultas | 1 fuente de datos, Descripciones IA, Soporte email |
| Pro | $299/mes | 10,000 consultas | Todas las fuentes, Análisis de mercado, Chat IA ilimitado, Soporte prioritario |
| Enterprise | $999/mes | Ilimitadas | API dedicada, Integración GHL, Onboarding personalizado, SLA 99.9% |

*Fuente: Código `page.tsx`. **Nota**: Estos precios no han sido validados con clientes reales ni con análisis de competencia de precios. No deben considerarse como precios verificados.*

### 2.5 Análisis Crítico del Estado Actual

**Fortalezas:**
- Stack moderno y mantenible (Next.js 16 + TypeScript + Tailwind v4)
- Autenticación funcional con BACKBONE
- System prompt de IA especializado en bienes raíces LATAM
- Diseño premium coherente (brief ejecutivo bien documentado)
- Base para escalar rápidamente

**Debilidades:**
- Las 4 herramientas prometidas son el mismo chat sin lógica especializada
- Sin monetización real (Stripe no está integrado)
- Sin diferenciación entre herramientas del producto
- Sin historial de conversaciones (cada sesión empieza de cero)
- Sin herramientas de reporte o generación de documentos
- Sin integración con canales de comunicación del agente (WhatsApp, teléfono)

---

## 3. Mapa del Mercado Inmobiliario Mexicano

### 3.1 Los 7 Nichos (Buyer Personas)

*Fuente: Documento `buyer-personas-snapshots.md` en `/projects/POLARIS/`. Este documento define 7 buyer personas para el ecosistema Polaris by VisionNorth. Se transcriben aquí los datos relevantes para Thuban, sin modificar ni mezclar con otros productos.*

#### 3.1.1 🏗️ Desarrolladora Inmobiliaria

**Perfil del Negocio:**
- Construye y vende vivienda nueva (vertical/horizontal)
- 10 a 100 unidades por año
- 1-3 proyectos activos simultáneamente
- Equipo: director de ventas + 2-5 asesores + marketing
- Operan en preventa (venden antes de construir)

**Dolores Relevantes para Thuban:**
| Dolor | Descripción |
|-------|-------------|
| Descripciones de preventa costosas y lentas | Cada proyecto nuevo requiere descripciones, brochures y contenido para múltiples canales. No existe herramienta especializada que genere copy contextual mexicano. |
| Leads de preventa se enfrían en semanas | ~40% de leads pierden interés por falta de seguimiento inmediato. Una IA conversacional podría mantener el interés 24/7. |
| Sin datos de mercado para justificar precio | Venden a ojo. Dejan dinero en la mesa. Una herramienta que integre datos de mercado en la conversación sería disruptiva. |
| Atención fuera de horario | Las salas de ventas cierran. Los leads llegan a cualquier hora. |

**Ticket Mensual Estimado:** $7,000 - $25,000 MXN
**Disposición a Pagar:** Alta
**Prioridad para Thuban:** Alta (Mayor dolor + disposición a pagar)

#### 3.1.2 🏢 Agencia Inmobiliaria (5-30 Agentes)

**Perfil del Negocio:**
- Compra, venta y renta de propiedades
- 5 a 30 agentes trabajando bajo la marca
- Dueño/broker supervisa al equipo
- Operan con cartera de 20-200 propiedades activas
- Dependen fuertemente de portales (Inmuebles24, Vivanuncios)

**Dolores Relevantes para Thuban:**
| Dolor | Descripción |
|-------|-------------|
| Los leads de portales llegan pero nadie los sigue | ~80% de leads mueren sin seguimiento. Una IA que responda al instante capturaría leads calificados. |
| Descripciones de propiedades inconsistentes | Cada agente escribe como puede. No hay consistencia de marca. |
| Sin herramienta para comparar propiedades inteligentemente | Los clientes preguntan "¿cuál me conviene más?" y los agentes comparan a ojo. |
| No-shows en visitas (30-40%) | Tiempo perdido. Confirmación automatizada reduciría esto. |

**Ticket Mensual Estimado:** $4,000 - $15,000 MXN
**Disposición a Pagar:** Media
**Prioridad para Thuban:** Alta (Mercado más grande + volumen)

#### 3.1.3 👤 Agente Independiente / Broker Solitario

**Perfil del Negocio:**
- Opera solo o con 1 asistente
- 5-15 transacciones al mes
- Usa WhatsApp como CRM principal (o libreta)
- No tiene presupuesto para grandes sistemas
- Su mayor miedo: perder un lead porque no lo contactó a tiempo

**Dolores Relevantes para Thuban:**
| Dolor | Descripción |
|-------|-------------|
| Se olvida de hacer seguimiento a leads | Pierde ~60% de sus oportunidades |
| No tiene tiempo para llamar a todos | Solo contacta al ~40% de sus leads |
| No sabe cómo valuar propiedades | Carece de herramientas de análisis |
| Le da vergüenza pedir referidos | Deja dinero en la mesa |
| No muestra profesionalismo en comunicación | Cliente no confía |

**Punto clave para Thuban:** Este nicho necesita Thuban como **herramienta de apoyo**, no como reemplazo. El agente independiente requiere una herramienta simple, accesible vía web/WhatsApp, que le ayude a responder mejor y más rápido. No necesita CRM, necesita inteligencia conversacional.

**Ticket Mensual Estimado:** $1,500 - $5,000 MXN
**Disposición a Pagar:** Media-baja
**Prioridad para Thuban:** Media (Muchos agentes, pero baja disposición a pagar)

#### 3.1.4 🔗 Corredor / Bróker

**Perfil del Negocio:**
- No tiene inventario propio
- Conecta compradores con propiedades de otras agencias
- Gana comisión por match (split 50/50 con agencia dueña)
- Su red de contactos es su activo más valioso
- Opera principalmente por WhatsApp y teléfono

**Dolores Relevantes para Thuban:**
| Dolor | Descripción |
|-------|-------------|
| No tiene herramienta para hacer match rápido | Pasa días buscando la propiedad correcta |
| No sabe qué propiedades están disponibles | Llama a agencias una por una |
| Depende de su libreta de contactos | Sin digitalización de su red |

**Ticket Mensual Estimado:** $2,000 - $6,000 MXN
**Disposición a Pagar:** Baja
**Prioridad para Thuban:** Baja (Bajo ticket, pocos dolores resolubles solo con IA conversacional)

#### 3.1.5 💰 SOFOM / Fintech Hipotecaria

**Perfil del Negocio:**
- Otorga crédito hipotecario (puente, tradicional, mezzanine)
- Volumen: 50-500 créditos al año
- Proceso intensivo en documentos y validación
- Regulado por CONDUSEF/CNBV
- Equipo: analistas, oficiales de crédito, back-office legal

**Dolores Relevantes para Thuban:**
| Dolor | Descripción |
|-------|-------------|
| Educación hipotecaria de cliente lenta y manual | Cada cliente pregunta lo mismo. No hay herramienta de educación automatizada. |
| Pre-calificación manual | Toman datos básicos a mano. Una IA conversacional podría pre-calificar al instante. |
| Sin calculadora Infonavit/Fovissste integrada | Los clientes no saben cuánto crédito tienen. |

**Ticket Mensual Estimado:** $10,000 - $40,000 MXN
**Disposición a Pagar:** Alta (nicho con mayor ticket)
**Prioridad para Thuban:** Media (Alto ticket, pero Thuban se limita a educación/pre-calificación no vinculante — el core está en otra parte)

#### 3.1.6 🏠 Administrador de Propiedades

**Perfil del Negocio:**
- Administra renta residencial y/o comercial
- 50 a 500 unidades bajo administración
- Dueños confían en él para cobrar rentas y mantener inmuebles
- Proceso: publicar → mostrar → contratar → cobrar → mantener

**Dolores Relevantes para Thuban:**
| Dolor | Descripción |
|-------|-------------|
| Descripciones para publicaciones repetitivas | Cada unidad necesita descripción atractiva |
| Atención a prospectos 24/7 | Los prospectos preguntan a cualquier hora |
| Sin reportes para dueños | Los dueños quieren saber cómo va su inversión |

**Ticket Mensual Estimado:** $3,000 - $12,000 MXN
**Disposición a Pagar:** Media
**Prioridad para Thuban:** Media (Nicho desatendido, pero requiere más que solo IA conversacional)

#### 3.1.7 🚀 Proptech / Startup Tecnológica

**Perfil del Negocio:**
- Startup o scale-up tecnológica del sector inmobiliario
- Producto SaaS, marketplace o plataforma digital
- Equipo: tech + sales + marketing
- Buscan crecimiento rápido con recursos limitados

**Dolores Relevantes para Thuban:**
| Dolor | Descripción |
|-------|-------------|
| Necesitan contenido descriptivo a escala | Describir miles de propiedades requiere automatización |
| Quieren ofrecer IA a sus usuarios sin construirla | Integrar Thuban como white-label o API |
| No tienen datos de mercado para enriquecer su producto | BACKBONE Market Intelligence + Thuban como interfaz conversacional |

**Nota importante:** Thuban NO es una API de datos. Eso es BACKBONE. Thuban podría ofrecer una API conversacional para que proptechs integren IA especializada en sus productos.

**Ticket Mensual Estimado:** $5,000 - $20,000 MXN
**Disposición a Pagar:** Media
**Prioridad para Thuban:** Media (Nicho competido, pero con potencial como canal de distribución B2B)

### 3.2 Matriz de Prioridad para Thuban

| Nicho | Dolores para Thuban | Disposición a Pagar | Tamaño del Mercado | Prioridad Thuban |
|-------|:-------------------:|:-------------------:|:------------------:|:----------------:|
| Desarrolladora | 🔴 Altos | 🟢 Alta | 🟡 Medio | **1** |
| Agencia | 🟡 Medios | 🟡 Media | 🟢 Grande | **2** |
| Agente Independiente | 🟡 Medios | 🟡 Media | 🟢 Grande (muchos) | **3** |
| Admin Propiedades | 🟡 Medios | 🟡 Media | 🟡 Medio | **4** |
| SOFOM | 🟡 Medios | 🟢 Alta | 🔴 Pequeño | **5** |
| Proptech | 🟡 Medios | 🟡 Media | 🔴 Pequeño | **6** |
| Corredor | 🟢 Bajos | 🔴 Baja | 🔴 Pequeño | **7** |

---

## 4. Análisis de Competencia en México y LATAM

### 4.1 Mapa de Competidores

| Competidor | Tipo | IA Conversacional | CRM | Datos de Mercado | Descripciones IA | Valuación | Precio |
|-----------|:----:|:-----------------:|:---:|:----------------:|:----------------:|:---------:|:------:|
| EasyBroker | CRM | ❌ | ✅ | 🟡 CMA básico | ❌ | ❌ | No verificado |
| Inmuebles24 | Portal | ❌ | ❌ | ❌ | ❌ | ❌ | — |
| Vivanuncios | Portal | ❌ | ❌ | ❌ | ❌ | ❌ | — |
| Softec | Consultoría | ❌ | ❌ | ✅ Reportes trimestrales | ❌ | ❌ | ~$15K MXN/reporte |
| Tinsa | Valuaciones | ❌ | ❌ | ❌ | ❌ | ✅ | No verificado |
| Propiedades.com | Portal | ❌ | ❌ | 🟡 Data por zona (2 ciudades) | ❌ | 🟡 Simulador | — |
| Homie.mx | Rentas CDMX | ❌ | ❌ | 🟡 Precio óptimo renta | ❌ | 🟡 Solo rentas | — |
| Yave.mx | Fintech | ❌ | ❌ | ❌ | ❌ | ❌ | — |
| Lamudi/Proppit | Portal | 🟡 "Lucía" (básico WhatsApp) | ❌ | ❌ | ❌ | ❌ | — |
| Flat.mx | Hipotecas extranjeros | ❌ | ❌ | ❌ | ❌ | ❌ | — |
| Habi | iBuyer | ❌ | ❌ | ❌ | ❌ | ❌ | — |
| **Thuban** | **IA Conversacional** | **✅** | **❌** | **✅** (vía BACKBONE) | **✅** (planeado) | **✅** (vía BACKBONE Val AI) | **$0-$999/mes** |

*Fuente: Investigación de mercado de Polaris/VisionNorth. Los precios marcados como "No verificado" no deben utilizarse en comunicaciones externas sin verificación independiente.*

### 4.2 Análisis Detallado por Competidor

#### 4.2.1 EasyBroker
**Tipo:** CRM inmobiliario líder en México
**URL:** easybroker.com
**Fortalezas:** API REST pública, CMA básico (análisis comparativo de mercado), Bolsa Inmobiliaria, vinculación con portales, gestión de inventario/equipo/clientes, sitio web integrado.
**Debilidades:** SIN IA conversacional. SIN ML predictivo. SIN automatización de contenido. SIN asistente virtual para agentes. SIN valuación instantánea.
**Relación con Thuban:** EasyBroker es complemento, no competidor directo. Un agente podría usar EasyBroker como CRM y Thuban como asistente IA. EasyBroker no tiene ni está desarrollando IA conversacional.

#### 4.2.2 Inmuebles24
**Tipo:** Portal clasificados #1 en México
**URL:** inmuebles24.com
**Fortalezas:** Audiencia masiva de compradores/vendedores. Ranking en búsquedas. Cobertura nacional.
**Debilidades:** SIN herramientas IA. SIN CRM. SIN análisis de mercado. SIN asistente virtual. Solo es un marketplace de propiedades.
**Relación con Thuban:** Competencia indirecta. Inmuebles24 es un canal de publicación. Thuban es una herramienta de inteligencia. Podrían ser complementarios si Thuban ayuda a preparar listings para el portal.

#### 4.2.3 Vivanuncios (Adevinta)
**Tipo:** Portal clasificados. Propiedad de Adevinta (grupo europeo).
**URL:** vivanuncios.com.mx
**Fortalezas:** Marca establecida. Audiencia amplia. Respaldo corporativo europeo.
**Debilidades:** SIN IA. SIN CRM. SIN análisis. Misma categoría que Inmuebles24.
**Relación con Thuban:** Sin superposición directa. No compiten.

#### 4.2.4 Softec
**Tipo:** Consultoría de datos inmobiliarios B2B
**URL:** softec.com.mx
**Fortalezas:** Datos confiables. Reportes trimestrales de mercado. Reconocimiento en el sector institucional.
**Debilidades:** NO tiene API. NO es accesible para agente individual ($15K MXN por reporte). SIN ML. SIN acceso en tiempo real. Reportes tardan 15 días en entregarse.
**Relación con Thuban:** Softec es lento, caro y no escalable. Thuban + BACKBONE Market Intelligence podría ofrecer datos de mercado similares en tiempo real y a una fracción del costo. **Oportunidad clara de disrupción.**
*Nota: Precio de $15K MXN/reporte proviene de investigación de mercado de VisionNorth. No ha sido verificado independientemente para este documento.*

#### 4.2.5 Tinsa
**Tipo:** Valuaciones profesionales. Presencia en España y LATAM.
**URL:** tinsa.mx
**Fortalezas:** Metodología de valuación profesional. Reconocimiento en sector financiero.
**Debilidades:** Presencia en México no confirmada. Proceso manual y lento. No es un producto SaaS accesible.
**Relación con Thuban:** Competencia indirecta en valuación. La Valuación AI de BACKBONE + Thuban como interfaz conversacional podría ofrecer valuaciones instantáneas que Tinsa no puede.

#### 4.2.6 Propiedades.com (Habi)
**Tipo:** Portal inmobiliario más grande de México. Propiedad de Habi (iBuyer colombiano).
**URL:** propiedades.com
**Fortalezas:** Simulador de avalúo online con big data. Datos de mercado por zona ("Valores"). Catastro de CDMX y GDL. Micrositios para agencias. Audiencia masiva.
**Debilidades:** SIN IA conversacional. SIN predicción. Catastro limitado a 2 ciudades (CDMX, GDL). No es una herramienta de productividad para el agente.
**Relación con Thuban:** Competencia en datos de mercado, pero con enfoques distintos. Propiedades.com es un portal que ofrece datos como funcionalidad secundaria. Thuban es una herramienta conversacional que usa datos para potenciar la conversación. Además, Propiedades.com está limitado a CDMX y GDL en su catastro.

#### 4.2.7 Homie.mx
**Tipo:** Líder en rentas en CDMX. Modelo de inquilino corporativo (renta para empresas/empleados).
**URL:** homie.mx
**Fortalezas:** Herramienta IA para precio óptimo de renta. Marca fuerte en CDMX.
**Debilidades:** SOLO rentas. Cobertura de apenas 5 alcaldías de CDMX. SIN CRM. SIN datos abiertos. SIN compra/venta.
**Relación con Thuban:** Competencia muy limitada. Homie resuelve un nicho específico (renta CDMX corporativa). Thuban es horizontal para todo el mercado inmobiliario.

#### 4.2.8 Yave.mx
**Tipo:** Crédito hipotecario 100% digital. SOFOM autorizada.
**URL:** yave.mx
**Fortalezas:** Proceso 100% digital para crédito hipotecario. Regulado.
**Debilidades:** Fintech, no proptech. SIN IA conversacional. SIN datos de mercado. Solo crédito hipotecario.
**Relación con Thuban:** Sin superposición directa. Yave es un producto financiero. Thuban es una herramienta de productividad.

#### 4.2.9 Lamudi / Proppit
**Tipo:** Portal inmobiliario.
**URL:** lamudi.com.mx
**Fortalezas:** Primer chatbot IA para compradores en México ("Lucía" en WhatsApp). Cobertura LATAM (varios países).
**Debilidades:** "Lucía" es un chatbot básico con preguntas predefinidas. NO es IA conversacional avanzada. NO está orientado al agente, sino al comprador. SIN CRM. SIN datos de mercado.
**Relación con Thuban:** "Lucía" de Lamudi es lo más cercano a Thuban en el mercado actual, pero está limitado a: (1) preguntas predefinidas, (2) orientado al comprador, no al agente, (3) sin capacidades de análisis, valuación, o negociación.

#### 4.2.10 Flat.mx
**Tipo:** Hipotecas para extranjeros en México.
**URL:** flat.mx
**Fortalezas:** Nicho específico (extranjeros comprando en México). Proceso digital.
**Debilidades:** Nicho extremadamente específico. No es competencia para Thuban.
**Relación con Thuban:** Sin superposición.

#### 4.2.11 Habi
**Tipo:** iBuyer (compra y vende propiedades directamente). Propietario de Propiedades.com.
**URL:** habi.co
**Fortalezas:** Modelo iBuyer disruptivo. Capital. Dueño del portal más grande de México.
**Debilidades:** No es SaaS. No es herramienta para agentes. Compite con agentes (les quita inventario).
**Relación con Thuban:** Habi es un actor distinto en la cadena. No compite directamente con Thuban. De hecho, los agentes que pierden inventario contra Habi podrían beneficiarse de Thuban para ser más efectivos.

### 4.3 Por Qué Existe Thuban (El Vacío Estratégico)

El mercado inmobiliario mexicano tiene una clara brecha entre:

1. **CRMs establecidos** (EasyBroker) que resuelven gestión de inventario y clientes, pero no ofrecen inteligencia conversacional ni automatización de contenido.
2. **Portales clasificados** (Inmuebles24, Vivanuncios, Propiedades.com) que atraen audiencia pero no ofrecen herramientas de productividad para el profesional.
3. **Consultoría de datos** (Softec) que ofrece información valiosa pero es cara, lenta e inaccesible para el agente individual.
4. **Soluciones financieras** (Yave, Flat) que resuelven un aspecto específico pero no la operación diaria del agente.

**Ninguno de estos competidores ofrece lo que Thuban propone: un asistente de IA conversacional** que:
- Entienda el contexto inmobiliario mexicano (Infonavit, Fovissste, usos y costumbres)
- Genere descripciones de propiedades con lenguaje local
- Valúe propiedades al instante mediante conversación
- Ayude a negociar con datos de mercado reales
- Compare propiedades inteligentemente
- Eduque al comprador sobre financiamiento
- Atienda leads 24/7
- Genere reportes profesionales

---

## 5. Los 7 Vacíos Reales

*Fuente: Síntesis de investigación de mercado y análisis de competencia. Cada vacío ha sido validado contra la oferta actual del mercado mexicano. Algunos vacíos han sido identificados por competidores en etapas tempranas (Lamudi/Proppit con "Lucía", Homie con precio IA de renta), pero ninguno ha sido resuelto de manera integral.*

### Vacío #1: Descripciones IA de propiedades con contexto mexicano

**El problema:** Cada propiedad en México necesita descripciones para: portales (Inmuebles24, Vivanuncios, Propiedades.com), redes sociales, WhatsApp, brochures, y páginas web. Los agentes escriben descripciones genéricas, inconsistentes, y sin optimización. No existe una herramienta que genere descripciones profesionales adaptadas al contexto mexicano (medidas en metros, terminología local "recámara" vs "cuarto", "cochera" vs "garage", "privada" vs "fraccionamiento", etc.).

**Quién lo sufre:** Agencias, agentes independientes, administradores de propiedades, desarrolladoras.

**Competencia que lo resuelve:** Nadie. EasyBroker tiene CMA (análisis de mercado) pero no generación de contenido. Ningún competidor ofrece descripciones IA con contexto mexicano.

**Solución Thuban:** Prompt engineering especializado + datos de la propiedad (BACKBONE) para generar descripciones contextuales, optimizadas para cada canal.

### Vacío #2: Atención 24/7 especializada que capture leads calificados

**El problema:** Los leads llegan a cualquier hora (noche, fines de semana, días festivos). El agente mexicano no puede responder al instante. Cuando responde horas después, el lead ya contactó a otro agente. No hay una herramienta que atienda al lead, lo califique y lo entregue caliente al agente.

**Quién lo sufre:** Agencias, agentes independientes, desarrolladoras.

**Competencia que lo resuelve:** Lamudi/Proppit tiene "Lucía" (chatbot básico WhatsApp para compradores), pero (1) está orientado al comprador final, no al agente, (2) usa preguntas predefinidas sin IA real, (3) no captura datos para el agente.

**Solución Thuban:** Chat IA + captura de datos + delivery al agente (vía GHL o email/SMS). Con Voice AI (Deepgram + ElevenLabs) para atención telefónica 24/7.

### Vacío #3: Valuación instantánea conversacional

**El problema:** Los clientes preguntan "¿cuánto vale mi casa?" constantemente. Los agentes responden con estimaciones a ojo o tardan días en preparar un CMA. Las alternativas existentes son: (a) Softec (caro, lento, 15 días), (b) Propiedades.com (solo CDMX/GDL), (c) Homie (solo rentas CDMX). No existe una herramienta que, mediante conversación natural, dé una valuación instantánea basada en datos.

**Quién lo sufre:** Todos los nichos. Es la pregunta #1 del mercado inmobiliario.

**Competencia que lo resuelve:** Parcialmente. Propiedades.com tiene simulador de avalúo online, pero no es conversacional ni cubre más de 2 ciudades. Homie tiene precio IA de renta, pero solo rentas en 5 alcaldías CDMX.

**Solución Thuban:** BACKBONE Valuation AI (modelo de valuación) + chat conversacional para hacer la pregunta en lenguaje natural y recibir la respuesta con datos.

### Vacío #4: Preparación de negociación con datos reales

**El problema:** Cuando un comprador está interesado en una propiedad, el agente necesita preparar argumentos de negociación: ¿el precio está por encima o debajo del promedio de la zona? ¿Cuánto tiempo lleva la propiedad en el mercado? ¿Hay propiedades similares más baratas? Hoy los agentes preparan esto manualmente o no lo hacen.

**Quién lo sufre:** Agentes independientes, corredores, agencias.

**Competencia que lo resuelve:** Nadie. No existe en el mercado mexicano una herramienta que prepare inteligencia de negociación de forma automatizada.

**Solución Thuban:** Prompt de simulación de negociación + datos de mercado BACKBONE (precio/m², tiempo en mercado, propiedades comparables).

### Vacío #5: Educación hipotecaria conversacional Infonavit/Fovissste/bancario

**El problema:** El comprador mexicano típico no entende su capacidad de crédito. Infonavit tiene reglas complejas (puntos, saldo, subcuenta, modalidades: Cofinavit, Apoyo Infonavit, Infonavit Total). Fovissste también. Los bancos tienen sus propias reglas. Los agentes pierden horas explicando lo mismo a cada cliente. No hay una herramienta conversacional que eduque al comprador y le dé una estimación no vinculante de su capacidad.

**Quién lo sufre:** Agencias, agentes independientes, desarrolladoras (en preventa).

**Competencia que lo resuelve:** Yave.mx tiene proceso digital de crédito, pero no es educativo ni conversacional. Yave resuelve el desembolso, no la educación.

**Solución Thuban:** Prompt engineering con conocimiento de Infonavit/Fovissste/bancario + calculadora conversacional integrada. **Importante:** Thuban solo da estimaciones no vinculantes. No es asesoría financiera.

### Vacío #6: Comparación inteligente de propiedades en lenguaje natural

**El problema:** Los compradores comparan propiedades preguntando "¿cuál me conviene más entre esta casa de $3.5M en la condesa y este depa de $2.8M en la Roma?" Hoy los agentes comparan a ojo o abren 3 pestañas del navegador. No hay una herramienta que compare propiedades usando lenguaje natural y datos objetivos.

**Quién lo sufre:** Agencias, corredores, agentes independientes.

**Competencia que lo resuelve:** Nadie. EasyBroker tiene CMA pero no comparación conversacional.

**Solución Thuban:** RAG + vector DB (Qdrant/pgvector) para búsqueda semántica de propiedades + datos BACKBONE para comparación objetiva (precio/m², antigüedad, metros, amenities, plusvalía de zona).

### Vacío #7: Reportes profesionales de mercado para clientes

**El problema:** Los agentes necesitan presentar reportes profesionales a sus clientes: "análisis de mercado de la zona", "comparativa de propiedades", "evolución de precios". Hoy hacen esto en PowerPoint/Word manualmente o no lo hacen. No existe una herramienta que genere reportes PDF profesionales con datos de mercado reales.

**Quién lo sufre:** Agencias, agentes independientes, desarrolladoras.

**Competencia que lo resuelve:** Softec ofrece reportes trimestrales a $15K MXN. EasyBroker tiene CMA básico pero no genera PDF profesional. Nadie más.

**Solución Thuban:** BACKBONE Market Intelligence + generación de PDF profesional en formato descargable.

---

## 6. Mapeo Tecnología → Dolor

### 6.1 Tecnologías Disponibles en el Ecosistema

| Tecnología | Descripción | Estado |
|-----------|-------------|--------|
| LLM + Prompt Engineering (DeepSeek, LLaMA) | Motor conversacional para descripciones, negociación, educación | ✅ Disponible (DeepSeek integrado) |
| RAG + Vector DB (Qdrant, pgvector) | Búsqueda semántica de propiedades, comparación inteligente | ❌ No implementado |
| BACKBONE Valuation AI | Valuación instantánea de propiedades | ✅ Disponible vía BACKBONE |
| Voice AI (Deepgram, ElevenLabs) | Atención telefónica 24/7 con voz sintética | ❌ No implementado |
| WhatsApp API | Canal preferido del agente mexicano | ❌ No implementado |
| BACKBONE Market Intelligence | Datos de mercado (tendencias, precios, zonas) | ✅ Disponible vía BACKBONE |
| Stripe | Monetización (suscripciones, créditos) | ❌ No implementado |
| n8n | Orquestación de workflows (GHL, emails, SMS) | ❌ No implementado |
| GHL | CRM, leads, pipelines | ❌ No implementado (planeado) |

### 6.2 Matriz Vacío → Tecnología → Nicho

| Vacío | Tecnología Principal | Nichos Primarios | Nichos Secundarios |
|-------|---------------------|------------------|-------------------|
| #1 Descripciones IA con contexto MX | LLM + Prompt Engineering | Agencia, Agente Indep | Desarrolladora, Admin Prop |
| #2 Atención 24/7 | LLM + Voice AI + WhatsApp | Agencia, Desarrolladora | Agente Indep |
| #3 Valuación conversacional | BACKBONE Val AI + LLM | Agente Indep, Agencia | Desarrolladora, Corredor |
| #4 Negociación con datos | BACKBONE Market Intelligence + LLM | Agente Indep, Corredor | Agencia |
| #5 Educación hipotecaria | LLM + Prompt (Infonavit/Fovissste) | Agente Indep, Desarrolladora | SOFOM |
| #6 Comparación inteligente | RAG + Vector DB + BACKBONE | Agencia, Corredor | Agente Indep |
| #7 Reportes de mercado | BACKBONE Market Intelligence + PDF | Agencia, Desarrolladora | Admin Prop |

### 6.3 Mapa de Dependencias Técnicas

```
Vacío #1 (Descripciones)
  └── LLM + Prompt Engineering → DeepSeek API ✅ Ya integrado
  └── Datos de propiedad → BACKBONE API ✅ Ya integrado

Vacío #2 (Atención 24/7)
  └── LLM → DeepSeek API ✅ Ya integrado
  └── Voice AI → Deepgram + ElevenLabs ❌ Nueva integración
  └── WhatsApp → WhatsApp Business API ❌ Nueva integración
  └── Delivery leads → GHL / Email ❌ Nueva integración

Vacío #3 (Valuación)
  └── BACKBONE Valuation AI → API BACKBONE ✅ Disponible
  └── LLM para interfaz conversacional → DeepSeek ✅ Ya integrado

Vacío #4 (Negociación)
  └── BACKBONE Market Intelligence → API BACKBONE ✅ Disponible
  └── LLM + Prompt engineering → DeepSeek ✅ Ya integrado

Vacío #5 (Educación hipotecaria)
  └── LLM + Prompt (Infonavit/Fovissste) → DeepSeek ✅ Ya integrado
  └── Calculadora → Backend/Frontend ❌ Nueva implementación

Vacío #6 (Comparación)
  └── RAG + Vector DB → Qdrant/pgvector ❌ Nueva infraestructura
  └── BACKBONE data → API BACKBONE ✅ Disponible
  └── LLM → DeepSeek ✅ Ya integrado

Vacío #7 (Reportes)
  └── BACKBONE Market Intelligence → API BACKBONE ✅ Disponible
  └── Generación PDF → Librería (jsPDF/PDFKit) ❌ Nueva implementación
```

---

## 7. Las 8 Capacidades Priorizadas

A continuación se describen las 8 capacidades que Thuban debe desarrollar, ordenadas por prioridad estratégica e impacto para el usuario.

### Capacidad #1: "Describe esta propiedad"

**Descripción:** El usuario envía datos básicos de una propiedad (dirección, metros, recámaras, baños, precio, características especiales) y Thuban genera descripciones profesionales y atractivas en segundos. Debe poder generar múltiples versiones: una para Inmuebles24/Vivanuncios (formal, con palabras clave SEO), una para Instagram (corta, atractiva, con emojis), una para WhatsApp (conversacional, directa), y una para brochure (elegante, detallada).

**Tecnología:** LLM (DeepSeek existente) + Prompt Engineering especializado + datos de la propiedad vía BACKBONE.

**Experiencia de uso:**
1. Usuario selecciona "Describe esta propiedad" en el dashboard
2. Ingresa o pega datos de la propiedad (o la selecciona de BACKBONE)
3. Elige formato/canal: Portal | Instagram | WhatsApp | Brochure
4. Thuban genera la descripción en segundos
5. Usuario puede editar, regenerar, o copiar al portapapeles

**Métrica de éxito:** Tiempo para generar descripción < 10 segundos. Retención: agente genera > 10 descripciones/semana.

**Diferencia competitiva:** Ningún competidor en MX genera descripciones con contexto local y optimización por canal. EasyBroker no lo hace. Inmuebles24 no lo hace.

### Capacidad #2: "¿Cuánto vale esta casa?"

**Descripción:** El usuario describe una propiedad en lenguaje natural ("una casa de 3 recámaras en la colonia Del Valle, 180m² de terreno, $4.5M") y Thuban responde con una valuación instantánea basada en datos de BACKBONE Valuation AI. No es solo un número: Thuban explica los factores que influyen en el precio, compara con el promedio de la zona, y da contexto ("esta propiedad está 8% por encima del promedio de la colonia").

**Tecnología:** BACKBONE Valuation AI + LLM para interfaz conversacional.

**Experiencia de uso:**
1. Usuario pregunta en chat: "¿Cuánto vale una casa de 3 recámaras en San Pedro?"
2. Thuban pide datos adicionales si faltan (metros, antigüedad, amenities)
3. Thuban consulta BACKBONE Valuation AI
4. Thuban responde con valuación + contexto de mercado
5. Usuario puede pedir detalles: "¿y en la colonia Del Valle?"

**Métrica de éxito:** Precisión de valuación dentro de ±10% del valor de mercado real (validar con datos de cierre). Velocidad de respuesta < 5 segundos.

**Límites:** Thuban debe dejar claro que es una estimación no vinculante y no constituye un avalúo profesional.

### Capacidad #3: "Ayúdame a negociar"

**Descripción:** El usuario (agente o comprador) describe una situación de negociación ("el dueño pide $4.2M pero la propiedad tiene goteras y lleva 6 meses en venta") y Thuban prepara una estrategia de negociación basada en datos de mercado. La respuesta incluye: argumentos objetivos (precio/m² vs zona, tiempo en mercado, propiedades comparables), tácticas de negociación (por dónde empezar, qué concesiones pedir), y un guión sugerido.

**Tecnología:** BACKBONE Market Intelligence + LLM con prompt de simulación de negociación.

**Experiencia de uso:**
1. Usuario selecciona "Ayúdame a negociar" en herramientas
2. Describe la propiedad y la situación de negociación
3. Thuban consulta BACKBONE para datos de la zona
4. Thuban genera: estrategia, argumentos, guión sugerido
5. Usuario puede iterar: "¿y si ofrezco $3.8M?"

**Métrica de éxito:** % de usuarios que reportan haber cerrado mejor trato usando la herramienta. NPS de la funcionalidad.

**Diferencia competitiva:** No existe nada similar en el mercado mexicano. Es la herramienta más distintiva de Thuban.

### Capacidad #4: "Compara estas propiedades"

**Descripción:** El usuario pega URLs de propiedades (de Inmuebles24, Vivanuncios, Propiedades.com, etc.) o las describe en texto, y Thuban las compara objetivamente en lenguaje natural. La comparación incluye: precio/m², antigüedad, metros de construcción/terreno, amenities, ubicación, plusvalíaestimada de la zona, y recomendación basada en el perfil del comprador.

**Tecnología:** RAG + Vector DB (Qdrant/pgvector) para búsqueda semántica + BACKBONE API para datos de propiedades + LLM para síntesis en lenguaje natural.

**Experiencia de uso:**
1. Usuario pega URLs de 2-5 propiedades
2. Thuban extrae datos de cada propiedad (vía BACKBONE o scraping)
3. Thuban construye tabla comparativa con criterios objetivos
4. Thuban responde con análisis en lenguaje natural
5. Usuario pregunta: "¿cuál es mejor para una familia joven?"

**Métrica de éxito:** Precisión en extracción de datos > 90%. Comparación generada en < 15 segundos para 5 propiedades.

**Diferencia competitiva:** EasyBroker tiene CMA pero no comparación conversacional. Ningún competidor permite comparar propiedades de diferentes portales en un solo chat.

### Capacidad #5: "¿Cuánto crédito me presta Infonavit?"

**Descripción:** El usuario (comprador) describe su situación laboral y salarial, y Thuban calcula una estimación no vinculante de su capacidad de crédito Infonavit, Fovissste o bancario. Thuban explica los diferentes esquemas (Cofinavit, Apoyo Infonavit, Infonavit Total), los requisitos de cada uno, y da una proyección del crédito disponible.

**Tecnología:** LLM con prompt engineering especializado en reglas Infonavit/Fovissste/bancario + calculadora conversacional (backend/frontend).

**Experiencia de uso:**
1. Usuario pregunta: "¿Cuánto crédito me presta Infonavit con $25K/mes?"
2. Thuban pide datos: salario, años cotizando, saldo de subcuenta (opcional), edad
3. Thuban consulta reglas y calcula estimación
4. Thuban explica las opciones disponibles
5. Usuario puede explorar escenarios: "¿y si subo mi salario a $35K?"

**Métrica de éxito:** Precisión de la estimación dentro de ±15% de la calculadora oficial de Infonavit. Tiempo de respuesta < 10 segundos.

**Límites legales:** Thuban debe mostrar claramente que es una estimación no vinculante. No constituye asesoría financiera. No reemplaza la pre-calificación oficial de Infonavit.

### Capacidad #6: "Atiende a este lead"

**Descripción:** Thuban puede atender a un lead de forma autónoma a través de chat web o WhatsApp. El lead hace preguntas sobre propiedades, precios, zonas, crédito, etc. Thuban responde con conocimiento especializado y captura los datos del lead (nombre, teléfono, email, presupuesto, zona de interés, tipo de propiedad). Al finalizar la conversación, Thuban entrega el lead calificado al agente vía GHL, email o SMS.

**Tecnología:** LLM (DeepSeek) + GHL (workflows) + WhatsApp API + captura de datos estructurados.

**Experiencia de uso (agente):**
1. Agente activa "Atiende a este lead" desde el dashboard
2. Comparte el link de chat o número de WhatsApp con el lead
3. Thuban conversa con el lead automáticamente
4. Thuban captura datos y califica al lead (frío/tibio/caliente)
5. Entrega lead + resumen de conversación al agente

**Experiencia de uso (lead):**
1. Lead abre link o escribe a WhatsApp
2. Thuban saluda y pregunta qué busca
3. Conversación natural sobre sus necesidades
4. Thuban captura datos discretamente durante la conversación
5. Al calificar, ofrece: "¿Quieres que un agente te contacte?"

**Métrica de éxito:** Leads capturados con datos completos > 70% de las conversaciones. Tasa de conversión de lead calificado a cita > 15%.

**Diferencia competitiva:** Lamudi/Proppit tiene "Lucía" (chatbot básico). Thuban va mucho más allá: no es un árbol de decisiones, es una IA conversacional real con contexto inmobiliario.

### Capacidad #7: "¿Cómo está el mercado en esta zona?"

**Descripción:** El usuario pregunta sobre una zona específica ("¿cómo está el mercado en Santa Fe?") y Thuban responde con un análisis completo: precio promedio/m² (venta y renta), tendencias de precios (últimos 12 meses), tiempo promedio en mercado, propiedades disponibles, tipos de propiedad predominantes, y perspectivas. Todo basado en datos reales de BACKBONE Market Intelligence.

**Tecnología:** BACKBONE Market Intelligence + LLM para presentación conversacional.

**Experiencia de uso:**
1. Usuario pregunta: "¿Cómo está el mercado en Polanco?"
2. Thuban consulta BACKBONE Market Intelligence
3. Thuban responde con análisis estructurado: precio/m², tendencia, comparables
4. Usuario profundiza: "¿y en renta?" / "¿cuánto ha subido en 2 años?"
5. Thuban puede exportar el análisis a PDF

**Métrica de éxito:** Cobertura de zonas > 50 colonias principales en CDMX, MTY, GDL. Actualización de datos < 24h. Precisión del precio/m² dentro de ±5%.

**Diferencia competitiva:** Softec lo hace pero tarda 15 días y cuesta $15K MXN. Propiedades.com lo hace parcialmente (solo CDMX/GDL). Thuban + BACKBONE puede ofrecer datos actualizados, en tiempo real, conversacionales, y a una fracción del costo.

### Capacidad #8: "Prepara un reporte para mi cliente"

**Descripción:** El usuario solicita un reporte profesional en PDF para presentar a su cliente. El reporte puede ser: análisis de mercado de una zona, comparativa de propiedades, valuación de una propiedad, o propuesta de inversión. Thuban recopila los datos de BACKBONE y genera un PDF profesional con diseño corporativo, gráficas, tablas y conclusiones.

**Tecnología:** BACKBONE Market Intelligence + generación de PDF (librería: jsPDF, PDFKit o similar) + datos estructurados.

**Experiencia de uso:**
1. Usuario selecciona "Prepara un reporte" en herramientas
2. Elige tipo de reporte: Análisis de Zona | Comparativa | Valuación | Propuesta
3. Define parámetros (zona, propiedades, rango de fechas)
4. Thuban recopila datos y genera PDF
5. Usuario descarga el PDF listo para enviar al cliente

**Métrica de éxito:** Reporte generado en < 30 segundos. Tasa de descarga > 50% de los usuarios que lo solicitan. Percepción de calidad profesional (NPS).

**Diferencia competitiva:** Nadie en el mercado mexicano genera reportes profesionales de mercado de forma automatizada para agentes.

---

## 8. Conflictos a Evitar

### 8.1 Principio Fundamental

Thuban es un producto independiente dentro del ecosistema VisionNorth/Polaris. NO es BACKBONE, NO es Polaris DFY, NO es PADIM, NO es Astra, NO es la Máquina de Contenido. Cada producto tiene un propósito distinto y un buyer persona diferente. Mezclarlos en la comunicación, el desarrollo o la estrategia comercial genera confusión y canibalización.

### 8.2 Mapa de Conflictos

#### ❌ NO mezclar Thuban con BACKBONE como si fueran el mismo producto

**Riesgo:** El mercado piensa que Thuban es una API de datos. O peor: que BACKBONE es un chat de IA.

**Realidad:** 
- **BACKBONE** es una API de datos inmobiliarios (proptech infrastructure). Su usuario es el CTO/desarrollador. Su producto son datos estructurados.
- **Thuban** es una IA conversacional para profesionales inmobiliarios. Su usuario es el agente/corredor/desarrollador. Su producto es inteligencia conversacional.

**Regla:** Thuban USA BACKBONE como fuente de datos. Thuban NO ES BACKBONE. BACKBONE NO es Thuban.

#### ❌ NO ofrecer Thuban al CTO de una Proptech

**Riesgo:** El CTO de una proptech evalúa Thuban para integrarlo en su producto y descubre que no tiene API pública, no es white-label, no es escalable como infraestructura.

**Realidad:** Thuban es una herramienta para el usuario final (agente). No es una plataforma de infraestructura. Las proptechs son un nicho secundario y solo si Thuban desarrolla una API conversacional específica para integración.

#### ❌ NO ofrecer BACKBONE al agente independiente

**Riesgo:** El agente independiente compra BACKBONE pensando que es una herramienta lista para usar, y se encuentra con una API técnica que no sabe usar.

**Realidad:** Thuban es la interfaz para el agente. BACKBONE es la infraestructura. El agente no necesita saber qué es BACKBONE. Solo necesita Thuban.

#### ❌ NO decir que Thuban reemplaza al agente

**Riesgo:** Los agentes sienten amenaza existencial y rechazan el producto. El mercado inmobiliario mexicano es altamente relacional y el agente es central en la transacción.

**Realidad:** Thuban es una herramienta que POTENCIA al agente. Le ahorra tiempo, le da mejores datos, le permite atender más leads, y le hace ver más profesional. No lo reemplaza.

**En la comunicación:**
- ✅ "Thuban te ayuda a cerrar más tratos."
- ❌ "Thuban reemplaza al agente inmobiliario."
- ✅ "Thuban atiende a tus leads 24/7 mientras tú descansas."
- ❌ "Thuban elimina la necesidad de agentes."

#### ❌ NO usar PADIM como si fuera un portal

**Riesgo:** El mercado confunde PADIM con un portal de propiedades (otro Inmuebles24).

**Realidad:** PADIM es un estándar de datos inmobiliarios (schema). No es un portal. No es un CRM. Es un formato de datos. Thuban puede consumir datos en formato PADIM, pero no es un portal PADIM.

#### ✅ Thuban NO es CRM

**Riesgo:** El mercado posiciona a Thuban contra EasyBroker y pierde porque no tiene gestión de inventario, pipeline de ventas, ni seguimiento de clientes.

**Realidad:** Thuban es un asistente IA. No gestiona propiedades ni clientes. Potencia al CRM que ya tiene el agente (o al que Polaris DFY le ofrece). Thuban y Polaris DFY (o EasyBroker) son complementarios.

**En la comunicación:**
- ✅ "Thuban se integra con tu CRM actual."
- ❌ "Thuban reemplaza a EasyBroker."

#### ✅ Thuban NO es API de datos

**Riesgo:** Un proptech compra Thuban pensando que es un endpoint de datos y se lleva una sorpresa.

**Realidad:** BACKBONE es la API de datos. Thuban es la interfaz conversacional. Si un proptech necesita datos, debe ir a BACKBONE. Si un proptech quiere IA conversacional para su producto, Thuban podría ofrecer una API específica (capacidad a desarrollar).

---

## 9. Próximos Pasos y Preguntas Abiertas

### 9.1 Próximos Pasos Inmediatos

1. **Validación de precios con clientes reales**
   - Los precios actuales ($0/$299/$999) no han sido validados con el mercado. Se requiere al menos 10 entrevistas con agentes/agencias/desarrolladoras para validar disposición a pagar.
   - Método: entrevistas cualitativas + Plan de Precios (definir precio base, precio por consulta adicional, límites de créditos).

2. **Elección de la primera capacidad a desarrollar**
   - Recomendación: Capacidad #1 "Describe esta propiedad" por ser la de menor complejidad técnica y mayor demanda del mercado.
   - Alternativa: Capacidad #5 "Educación hipotecaria" si se valida alta demanda con SOFOMs.

3. **Integración de Stripe**
   - Sin monetización funcional, Thuban no puede escalar. Stripe debe integrarse antes de lanzar cualquier capacidad paga.

4. **Sistema de créditos funcional**
   - Reemplazar el placeholder actual con lógica real: asignación, consumo, recarga.

5. **Persistencia de conversaciones**
   - Sin historial, Thuban no puede ofrecer continuidad. Cada conversación empieza de cero. Backend básico de persistencia.

### 9.2 Preguntas Abiertas para Investigar

| # | Pregunta | Impacto | Método de Validación |
|---|----------|---------|---------------------|
| 1 | ¿Cuánto está dispuesto a pagar un agente independiente por una herramienta IA que le ahorre 2h/día? | Precio Thuban Pro | Entrevistas (n≥10) |
| 2 | ¿Los agentes prefieren Thuban como web app, WhatsApp, o ambos? | Canales de distribución | Encuesta + prototipo |
| 3 | ¿Qué capacidad genera más valor inmediato: descripciones o valuación? | Prioridad de desarrollo | Test A/B con prototipos |
| 4 | ¿Las desarrolladoras comprarían Thuban para su equipo de ventas o solo el director? | Modelo de licenciamiento | Entrevistas con 3-5 desarrolladoras |
| 5 | ¿El agente mexicano está listo para IA conversacional o necesita capacitación? | Onboarding y UX | Prueba de usabilidad (n≥5) |
| 6 | ¿Qué tan importante es la integración con WhatsApp vs web app? | Prioridad técnica | Encuesta a 50+ agentes |
| 7 | ¿Thuban debe ofrecer API para proptechs (white-label) o solo B2C/B2B directo? | Estrategia de crecimiento | Análisis de demanda proptech |
| 8 | ¿Voice AI (atención telefónica 24/7) tiene demanda real o es un feature "nice-to-have"? | Prioridad de inversión | Entrevistas con agencias |
| 9 | ¿El agente prefiere pagar por suscripción mensual o por consulta/crédito? | Modelo de pricing | Test A/B en landing page |
| 10 | ¿Qué zonas geográficas debe priorizar Thuban: CDMX, MTY, GDL, o cobertura nacional? | Expansión geográfica | Análisis de densidad de agentes por ciudad |

### 9.3 Roadmap Sugerido

```
Fase 0 — Fundación (AHORA)
├── Stripe billing funcional
├── Sistema de créditos real
├── Persistencia de conversaciones
└── Diferenciación de las 4 herramientas

Fase 1 — Capacidad Core (MES 1-2)
├── Capacidad #1: "Describe esta propiedad" (baja complejidad, alto impacto)
├── Capacidad #5: "Educación hipotecaria" (solo prompt, sin backend)
└── Mejora continua de UX del chat

Fase 2 — Diferenciación (MES 3-4)
├── Capacidad #3: "Ayúdame a negociar" (diferenciador más fuerte)
├── Capacidad #7: "Análisis de mercado por zona" (compite con Softec)
└── Capacidad #4: "Compara propiedades" (RAG + Vector DB)

Fase 3 — Escalabilidad (MES 5-6)
├── Capacidad #2: "Valuación conversacional" (BACKBONE Valuation AI)
├── Capacidad #6: "Atiende a este lead" (WhatsApp + GHL)
└── Capacidad #8: "Reportes para clientes" (generación PDF)

Fase 4 — Canales (MES 7+)
├── Integración WhatsApp API
├── Integración Voice AI (atención telefónica 24/7)
├── API pública para proptechs (white-label)
└── Integración GHL completa (leads inbound desde Thuban)
```

---

## Apéndice A: Fuentes

| Fuente | Tipo | Contenido |
|--------|------|-----------|
| `/projects/thuban/AGENTS.md` | Interno | Stack, estructura, integraciones de Thuban |
| `/projects/thuban/page.tsx` | Código fuente | Landing, pricing, features, chat demo |
| `/projects/thuban/ROADMAP.md` | Interno | Estado actual, fases de desarrollo planificadas |
| `/projects/thuban/api/chat/route.ts` | Código fuente | System prompt, integración DeepSeek API |
| `/projects/thuban/lib/config.ts` | Código fuente | APP_CONFIG con features y freeCredits |
| `/projects/thuban/premium/brief-executivo.md` | Interno | Brief de diseño premium v2 |
| `/projects/POLARIS/buyer-personas-snapshots.md` | Interno | 7 buyer personas del mercado inmobiliario MX |
| Investigación de competencia (equipo Polaris) | Interno | Análisis de competidores MX/LATAM |
| easybroker.com | Externo | CRM inmobiliario líder MX |
| inmuebles24.com | Externo | Portal clasificados #1 MX |
| vivanuncios.com.mx | Externo | Portal clasificados (Adevinta) |
| softec.com.mx | Externo | Consultoría datos inmobiliarios B2B |
| propiedades.com | Externo | Portal inmobiliario + datos de mercado (Habi) |
| homie.mx | Externo | Rentas CDMX con IA de precio |
| yave.mx | Externo | Crédito hipotecario 100% digital |
| lamudi.com.mx | Externo | Portal con chatbot "Lucía" |
| flat.mx | Externo | Hipotecas para extranjeros |
| habi.co | Externo | iBuyer, dueño de Propiedades.com |

---

## Apéndice B: Glosario

| Término | Definición |
|---------|-----------|
| **BACKBONE** | API de datos inmobiliarios del ecosistema VisionNorth. Provee datos de propiedades, valuación, market intelligence. |
| **CMA** | Comparative Market Analysis — Análisis Comparativo de Mercado. Método de valuación por comparación de propiedades similares. |
| **CONDUSEF** | Comisión Nacional para la Protección y Defensa de los Usuarios de Servicios Financieros (México). |
| **CNBV** | Comisión Nacional Bancaria y de Valores (México). |
| **Cofinavit** | Modalidad de crédito Infonavit combinado con crédito bancario. |
| **Fovissste** | Fondo de la Vivienda del ISSSTE — crédito hipotecario para trabajadores del estado. |
| **GHL** | GoHighLevel — plataforma de CRM y automatización de marketing. |
| **iBuyer** | Instant Buyer — empresa que compra propiedades directamente (sin agente). |
| **Infonavit** | Instituto del Fondo Nacional de la Vivienda para los Trabajadores (México). |
| **Infonavit Total** | Modalidad de crédito Infonavit para vivienda más cara. |
| **LATAM** | América Latina (región). |
| **PADIM** | Estándar de datos inmobiliarios del ecosistema Polaris. No es un portal ni un CRM. |
| **Polaris** | Plataforma de CRM y automatización del ecosistema VisionNorth. Incluye Polaris DFY (CRM para agencias). |
| **RAG** | Retrieval-Augmented Generation — técnica de IA que combina búsqueda semántica con generación de texto. |
| **SOFOM** | Sociedad Financiera de Objeto Múltiple — entidad regulada para otorgar crédito en México. |
| **Vector DB** | Base de datos vectorial (ej: Qdrant, pgvector) para búsqueda semántica. |
| **VisionNorth** | Empresa matriz del ecosistema que incluye BACKBONE, Polaris, Thuban, Astra, PADIM. |

---

*Documento generado el 20 de julio de 2026. Próxima revisión recomendada: después de la primera ronda de validación de precios con clientes reales.*
