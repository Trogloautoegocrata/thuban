// src/lib/prompts/tools.ts
// CAPA: TOOLS (AGENTS) — Definiciones de function calling y routing
// Inspirado en el archivo AGENTS.md de HappyCapy.ai
// Extiende backbone-tools.ts con las nuevas capacidades

import { TOOL_DEFINITIONS as BACKBONE_TOOLS, executeTool as executeBackboneTool, ToolName } from "@/lib/backbone-tools";

// ─── Tipos extendidos ───

export type ThubanToolName = ToolName 
  | "describe_property"
  | "valuate_property"
  | "negotiate_strategy"
  | "compare_properties"
  | "calculate_infonavit"
  | "analyze_zone_market"
  | "generate_report"
  | "capture_lead";

// ─── Tools de Capacidades ───

export interface ThubanToolDefinition {
  type: "function";
  function: {
    name: ThubanToolName;
    description: string;
    parameters: Record<string, any>;
  };
}

// Tools actuales de BACKBONE (heredadas)
const BACKBONE_TOOL_DEFS = BACKBONE_TOOLS as ThubanToolDefinition[];

// Tools de las nuevas capacidades
const CAPACIDADES_TOOLS: ThubanToolDefinition[] = [
  {
    type: "function",
    function: {
      name: "describe_property",
      description: "Genera descripciones profesionales de propiedades con contexto mexicano. Devuelve 4 versiones: Portal, Instagram, WhatsApp, Brochure.",
      parameters: {
        type: "object",
        properties: {
          tipo_propiedad: {
            type: "string",
            enum: ["casa", "departamento", "terreno", "local", "oficina", "nave industrial", "bodega"],
            description: "Tipo de propiedad",
          },
          ubicacion: { type: "string", description: "Dirección, colonia, ciudad, estado" },
          metros_construccion: { type: "number", description: "Metros cuadrados de construcción" },
          metros_terreno: { type: "number", description: "Metros cuadrados de terreno (si aplica)" },
          recamaras: { type: "number", description: "Número de recámaras" },
          banos: { type: "number", description: "Número de baños" },
          estacionamiento: { type: "number", description: "Número de lugares de estacionamiento" },
          precio: { type: "number", description: "Precio en MXN" },
          caracteristicas: { type: "string", description: "Características especiales: amenidades, acabados, antigüedad, etc." },
          formato: {
            type: "string",
            enum: ["portal", "instagram", "whatsapp", "brochure", "todos"],
            description: "Formato de salida deseado",
            default: "todos",
          },
        },
        required: ["tipo_propiedad", "ubicacion", "precio"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "valuate_property",
      description: "Obtiene una valuación estimada de una propiedad usando BACKBONE Valuation AI. Incluye precio estimado, rango de confianza, y comparables de la zona.",
      parameters: {
        type: "object",
        properties: {
          ubicacion: { type: "string", description: "Ubicación de la propiedad (colonia, ciudad)" },
          tipo_propiedad: { type: "string", enum: ["casa", "departamento", "terreno"] },
          metros_construccion: { type: "number" },
          recamaras: { type: "number" },
          antiguedad: { type: "number", description: "Antigüedad en años" },
          estado_conservacion: { type: "string", enum: ["nuevo", "bueno", "regular", "remodelar"] },
        },
        required: ["ubicacion", "tipo_propiedad"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "negotiate_strategy",
      description: "Genera una estrategia de negociación basada en datos de mercado BACKBONE: argumentos objetivos, tácticas, y guión sugerido.",
      parameters: {
        type: "object",
        properties: {
          precio_publicado: { type: "number", description: "Precio publicado de la propiedad en MXN" },
          ubicacion: { type: "string", description: "Ubicación de la propiedad" },
          precio_oferta: { type: "number", description: "Precio que el comprador quiere ofrecer (opcional)" },
          tipo_propiedad: { type: "string", enum: ["casa", "departamento", "terreno"] },
          tiempo_mercado: { type: "string", description: "Tiempo que lleva la propiedad en el mercado (si se sabe)" },
          motivacion_vendedor: { type: "string", description: "Motivación del vendedor si se conoce (ej: 'herencia', 'divorcio', 'cambio de ciudad')" },
          condiciones_propiedad: { type: "string", description: "Condiciones: necesita reparaciones, está remodelada, etc." },
        },
        required: ["precio_publicado", "ubicacion"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "analyze_zone_market",
      description: "Obtiene análisis detallado del mercado inmobiliario de una zona específica usando BACKBONE Market Intelligence.",
      parameters: {
        type: "object",
        properties: {
          zona: { type: "string", description: "Colonia, municipio o zona a analizar" },
          ciudad: { type: "string", description: "Ciudad (CDMX, MTY, GDL, etc.)" },
          tipo_propiedad: { type: "string", enum: ["casa", "departamento", "terreno", "todos"], default: "todos" },
        },
        required: ["zona"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "calculate_infonavit",
      description: "Calcula una estimación no vinculante de capacidad de crédito Infonavit/Fovissste/bancario basada en datos del usuario.",
      parameters: {
        type: "object",
        properties: {
          ingreso_mensual: { type: "number", description: "Ingreso mensual neto en MXN" },
          tipo_credito: { type: "string", enum: ["infonavit", "fovissste", "bancario", "cofinavit", "no_se"] },
          anos_cotizando_infonavit: { type: "number", description: "Años cotizando en Infonavit (si aplica)" },
          saldo_subcuenta: { type: "number", description: "Saldo aproximado de subcuenta de vivienda (si se conoce)" },
          edad: { type: "number", description: "Edad del solicitante" },
          deudas_mensuales: { type: "number", description: "Total de deudas mensuales en MXN (opcional)" },
        },
        required: ["ingreso_mensual", "tipo_credito"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "capture_lead",
      description: "Captura los datos de un lead calificado y los prepara para entrega al agente (GHL o email).",
      parameters: {
        type: "object",
        properties: {
          nombre: { type: "string", description: "Nombre completo del lead" },
          telefono: { type: "string", description: "Teléfono del lead" },
          email: { type: "string", description: "Correo electrónico del lead" },
          tipo_interes: { type: "string", enum: ["comprar", "vender", "rentar", "invertir", "valuar"] },
          presupuesto: { type: "number", description: "Presupuesto aproximado en MXN" },
          zona_interes: { type: "string", description: "Zona o colonia de interés" },
          urgencia: { type: "string", enum: ["inmediata", "1_mes", "3_meses", "6_meses", "sin_prisa"] },
          notas: { type: "string", description: "Notas adicionales de la conversación" },
        },
        required: ["nombre", "telefono", "tipo_interes"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "generate_report",
      description: "Genera un reporte profesional PDF con datos de BACKBONE Market Intelligence.",
      parameters: {
        type: "object",
        properties: {
          tipo_reporte: { type: "string", enum: ["analisis_zona", "comparativa", "valuacion", "propuesta_inversion"] },
          zona: { type: "string", description: "Zona para el reporte" },
          propiedades_ids: { type: "string", description: "IDs de propiedades separados por coma (para comparativa)" },
          email_cliente: { type: "string", description: "Email del cliente para enviar el reporte (opcional)" },
        },
        required: ["tipo_reporte"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "compare_properties",
      description: "Compara múltiples propiedades de forma objetiva usando datos de BACKBONE y búsqueda semántica.",
      parameters: {
        type: "object",
        properties: {
          propiedades: {
            type: "array",
            items: {
              type: "object",
              properties: {
                url: { type: "string", description: "URL de la propiedad en portal (opcional)" },
                descripcion: { type: "string", description: "Descripción de la propiedad en texto" },
              },
            },
            description: "Lista de propiedades a comparar (2-5)",
          },
          criterio_comprador: {
            type: "string",
            description: "Perfil del comprador: 'familia joven', 'inversionista', 'soltero profesional', 'pareja sin hijos', etc.",
          },
        },
        required: ["propiedades"],
      },
    },
  },
];

// ─── Tool Definitions Consolidadas ───

export const ALL_TOOL_DEFINITIONS: ThubanToolDefinition[] = [
  ...BACKBONE_TOOL_DEFS,
  ...CAPACIDADES_TOOLS,
];

// ─── Handler ───

export async function executeThubanTool(name: string, args: Record<string, any>): Promise<any> {
  // Si es tool de BACKBONE, delegar
  const backboneNames: ToolName[] = ["search_properties", "get_market_stats", "get_property_detail", "get_market_trends"];
  if (backboneNames.includes(name as ToolName)) {
    return executeBackboneTool(name as ToolName, args);
  }

  // Tools de capacidades (por ahora, todas mock — se implementarán en Fases 1-3)
  switch (name) {
    case "describe_property":
      return {
        success: true,
        message: "Capacidad 'Describe' implementada en Fase 1. Por ahora, aquí tienes las herramientas conceptuales.",
        tool_ready: false,
        planned_fase: "F1.1",
      };
    case "valuate_property":
      return {
        success: true,
        message: "Capacidad 'Valuación' implementada en Fase 3.2.",
        tool_ready: false,
        planned_fase: "F3.2",
      };
    case "negotiate_strategy":
      return {
        success: true,
        message: "Capacidad 'Negociación' implementada en Fase 1.3.",
        tool_ready: false,
        planned_fase: "F1.3",
      };
    case "analyze_zone_market":
      return {
        success: true,
        message: "Capacidad 'Análisis de Mercado' implementada en Fase 2.1.",
        tool_ready: false,
        planned_fase: "F2.1",
      };
    case "calculate_infonavit":
      return {
        success: true,
        message: "Capacidad 'Infonavit' implementada en Fase 1.2.",
        tool_ready: false,
        planned_fase: "F1.2",
      };
    case "capture_lead":
      return {
        success: true,
        message: "Capacidad 'Captura de Leads' implementada en Fase 3.1 (WhatsApp).",
        tool_ready: false,
        planned_fase: "F3.1",
      };
    case "generate_report":
      return {
        success: true,
        message: "Capacidad 'Reportes' implementada en Fase 2.3.",
        tool_ready: false,
        planned_fase: "F2.3",
      };
    case "compare_properties":
      return {
        success: true,
        message: "Capacidad 'Comparación de Propiedades' implementada en Fase 2.2.",
        tool_ready: false,
        planned_fase: "F2.2",
      };
    default:
      return { success: false, error: `Tool desconocida: ${name}` };
  }
}
