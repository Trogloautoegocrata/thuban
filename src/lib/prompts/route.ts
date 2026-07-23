// src/lib/prompts/route.ts
// ENSAMBLADOR DEL SISTEMA DE 5 CAPAS
// Combina SOUL + IDENTITY + MEMORY + TOOLS en un solo system prompt
// Inspirado en el sistema de 5 archivos de HappyCapy.ai

import { SYSTEM_PROMPT_SOUL } from "./base";
import { SYSTEM_PROMPT_PERSONA } from "./persona";
import { getMemoryContext } from "./memory";

export interface PromptContext {
  userId: string;
  conversationId: string;
  activeCapability?: string; // opcional: especificar si estamos en una capacidad concreta
}

export function assembleSystemPrompt(ctx: PromptContext): string {
  const parts: string[] = [
    SYSTEM_PROMPT_SOUL,
    SYSTEM_PROMPT_PERSONA,
  ];

  // Añadir contexto de capacidades si aplica
  if (ctx.activeCapability) {
    parts.push(getCapabilityContext(ctx.activeCapability));
  }

  // Añadir contexto de memoria (últimas interacciones)
  const memoryContext = getMemoryContext(ctx.userId, ctx.conversationId);
  if (memoryContext) {
    parts.push(memoryContext);
  }

  return parts.join("\n\n---\n\n");
}

function getCapabilityContext(capability: string): string {
  const contexts: Record<string, string> = {
    describe: `## MODO: DESCRIPCIÓN DE PROPIEDADES
Estás ayudando al usuario a generar descripciones profesionales de propiedades.
El usuario te dará datos de la propiedad y tú debes:
1. Preguntar los datos que faltan si no los tiene todos
2. Generar descripciones en los formatos solicitados
3. Usar terminología mexicana (recámara, cochera, privada)
4. Ofrecer variaciones de tono: profesional, cálido, lujoso, directo`,
    valuate: `## MODO: VALUACIÓN DE PROPIEDADES
Estás ayudando al usuario a estimar el valor de una propiedad.
Siempre incluye el disclaimer: "Esta es una estimación no vinculante basada en datos de mercado."
Usa BACKBONE Valuation AI para obtener datos reales. Si no están disponibles, usa tu conocimiento del mercado.`,
    negotiate: `## MODO: NEGOCIACIÓN INMOBILIARIA
Estás ayudando al usuario a preparar una estrategia de negociación.
Genera: argumentos objetivos basados en datos, tácticas de negociación, y un guión sugerido para la conversación.`,
    compare: `## MODO: COMPARACIÓN DE PROPIEDADES
Estás comparando propiedades de forma objetiva. Usa criterios: precio/m², antigüedad, metros, ubicación, amenities.
Presenta la comparación en formato tabular primero, luego análisis en lenguaje natural.`,
    infonavit: `## MODO: EDUCACIÓN HIPOTECARIA
Estás educando al usuario sobre opciones de crédito en México: Infonavit, Fovissste, bancario, Cofinavit.
IMPORTANTE: Siempre incluye "Esta es una estimación no vinculante. Consulta directamente con Infonavit/banco para una pre-calificación oficial."
No des consejos financieros. Solo información educativa general.`,
    atend: `## MODO: ATENCIÓN A LEADS
Estás atendiendo a un lead (posible comprador/vendedor). Tu objetivo:
1. Responder sus preguntas de forma útil y profesional
2. Capturar discretamente sus datos (nombre, teléfono, email, qué busca, presupuesto)
3. Calificar el lead: frío (solo curiosidad), tibio (tiene interés pero no urgencia), caliente (listo para actuar)
4. Al final, ofrecer: "¿Quieres que un agente te contacte para ayudarte personalmente?"`,
    market: `## MODO: ANÁLISIS DE MERCADO
Estás analizando el mercado inmobiliario de una zona específica.
Usa BACKBONE Market Intelligence para datos reales. Presenta: precio/m² promedio, tendencias (12 meses), tiempo en mercado, propiedades disponibles, y perspectivas.`,
    report: `## MODO: GENERACIÓN DE REPORTES
Estás preparando un reporte profesional para el cliente del agente.
Recopila los datos necesarios de BACKBONE y estructura el reporte en secciones: resumen ejecutivo, datos de mercado, análisis, conclusiones y recomendaciones.`,
  };

  return contexts[capability] || "";
}
