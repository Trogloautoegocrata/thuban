// src/lib/backbone-tools.ts
// Herramientas BACKBONE para function calling del chat de Thuban
// Cada tool es una función que consulta la API de BACKBONE en tiempo real

const BACKBONE_URL = process.env.NEXT_PUBLIC_BACKBONE_URL || "https://api.back-bone.dev/v1";
const API_KEY = process.env.BACKBONE_API_KEY || "";

interface BackboneResponse {
  success: boolean;
  data?: any;
  error?: string;
}

// ─── Helper: llamar a BACKBONE API ───

async function callBackbone(endpoint: string, params?: Record<string, string>): Promise<BackboneResponse> {
  try {
    let url = `${BACKBONE_URL}${endpoint}`;
    if (params) {
      const search = new URLSearchParams(params);
      url += `?${search.toString()}`;
    }
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 }, // cache 60s
    });
    if (!res.ok) {
      return { success: false, error: `BACKBONE error ${res.status}: ${await res.text()}` };
    }
    const data = await res.json();
    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message || "Error de conexión con BACKBONE" };
  }
}

// ─── Tools ───

export type ToolName =
  | "search_properties"
  | "get_market_stats"
  | "get_property_detail"
  | "get_market_trends";

export interface ToolDefinition {
  type: "function";
  function: {
    name: ToolName;
    description: string;
    parameters: Record<string, any>;
  };
}

export type ToolHandler = (args: Record<string, any>) => Promise<BackboneResponse>;

// Definiciones de herramientas para enviar a la API de DeepSeek
export const TOOL_DEFINITIONS: ToolDefinition[] = [
  {
    type: "function",
    function: {
      name: "search_properties",
      description: "Busca propiedades en México por ubicación, tipo, precio o características",
      parameters: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "Búsqueda por ubicación (colonia, municipio, estado)",
          },
          property_type: {
            type: "string",
            enum: ["casa", "departamento", "terreno", "local", "oficina", "nave"],
            description: "Tipo de propiedad",
          },
          min_price: { type: "number", description: "Precio mínimo en MXN" },
          max_price: { type: "number", description: "Precio máximo en MXN" },
          bedrooms: { type: "number", description: "Número de recámaras" },
          limit: { type: "number", description: "Cantidad de resultados (max 10)", default: 5 },
        },
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_market_stats",
      description: "Obtiene estadísticas generales del mercado: propiedades indexadas, fuentes de datos, propiedades por tipo",
      parameters: {
        type: "object",
        properties: {},
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_property_detail",
      description: "Obtiene el detalle completo de una propiedad por su ID",
      parameters: {
        type: "object",
        properties: {
          property_id: {
            type: "string",
            description: "ID de la propiedad en BACKBONE",
          },
        },
        required: ["property_id"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_market_trends",
      description: "Obtiene tendencias de mercado: precios promedio, análisis por zona, datos de inversión",
      parameters: {
        type: "object",
        properties: {
          zone: {
            type: "string",
            description: "Zona geográfica (colonia, municipio o estado)",
          },
          property_type: {
            type: "string",
            enum: ["casa", "departamento", "terreno"],
            description: "Tipo de propiedad",
          },
        },
      },
    },
  },
];

// Handlers que ejecutan las tools
export const TOOL_HANDLERS: Record<ToolName, ToolHandler> = {
  async search_properties(args) {
    const params: Record<string, string> = { per_page: String(args.limit || 5), page: "1" };
    if (args.query) params.search = args.query;
    if (args.property_type) params.property_type = args.property_type;
    if (args.min_price) params.min_price = String(args.min_price);
    if (args.max_price) params.max_price = String(args.max_price);
    if (args.bedrooms) params.bedrooms = String(args.bedrooms);
    return callBackbone("/properties", params);
  },

  async get_market_stats() {
    return callBackbone("/properties", { per_page: "1" });
  },

  async get_property_detail(args) {
    return callBackbone(`/properties/${args.property_id}`);
  },

  async get_market_trends(args) {
    const params: Record<string, string> = {};
    if (args.zone) params.zone = args.zone;
    if (args.property_type) params.property_type = args.property_type;
    return callBackbone("/market/trends", params);
  },
};

// ─── Ejecutor de tools ───

export async function executeTool(name: ToolName, args: Record<string, any>): Promise<BackboneResponse> {
  const handler = TOOL_HANDLERS[name];
  if (!handler) {
    return { success: false, error: `Tool desconocida: ${name}` };
  }
  return handler(args);
}
