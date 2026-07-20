import { NextRequest, NextResponse } from "next/server";
import { TOOL_DEFINITIONS, executeTool, ToolName } from "@/lib/backbone-tools";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || process.env.DEEPSEEK_API_KEY || "";
const MODEL = "deepseek/deepseek-chat";

const SYSTEM_PROMPT = `Eres Thuban, un asistente de IA especializado en el mercado inmobiliario de Mexico y America Latina.

CAPACIDADES (puedes usar herramientas para obtener datos en tiempo real):
- Buscar propiedades por ubicacion, tipo, precio y caracteristicas
- Consultar estadisticas del mercado inmobiliario
- Obtener tendencias de precios por zona
- Dar informacion detallada de propiedades especificas

DIRECTRICES:
- Responde SIEMPRE en espanol, con tono profesional pero amigable
- USA las herramientas disponibles para dar respuestas con DATOS REALES
- Cuando alguien pregunte por propiedades o mercado, USA las herramientas - no inventes datos
- Si la herramienta devuelve datos, presentalos de forma clara y util
- Si no encuentras datos para lo que piden, dilo honestamente
- Se conciso: 2-4 parrafos maximo, a menos que pidan mas detalle
- No des consejos legales o financieros vinculantes
- Puedes mencionar que tus datos provienen del ecosistema BACKBONE (101,357+ propiedades indexadas de 10+ fuentes)
- Para descripciones de propiedades, ofrece generarlas si te dan los datos necesarios
- Para analisis de mercado, si no hay datos especificos de una zona, da contexto general del mercado mexicano`;

interface ChatMessage {
  role: "system" | "user" | "assistant" | "tool";
  content: string;
  tool_calls?: any[];
  tool_call_id?: string;
  name?: string;
}

export async function POST(req: NextRequest) {
  try {
    const { messages: rawMessages } = await req.json();

    if (!rawMessages || !Array.isArray(rawMessages) || rawMessages.length === 0) {
      return NextResponse.json({ error: "Se requiere un array de mensajes" }, { status: 400 });
    }

    if (!OPENROUTER_API_KEY) {
      return NextResponse.json({ error: "API de chat no configurada" }, { status: 503 });
    }

    const messages: ChatMessage[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...rawMessages.map((m: any) => ({
        role: m.role === "ai" ? "assistant" : m.role,
        content: m.text || m.content || "",
      })),
    ];

    const MAX_ROUNDS = 3;
    let currentMessages = [...messages];

    for (let round = 0; round < MAX_ROUNDS; round++) {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://app.thuban.online",
          "X-Title": "Thuban",
        },
        body: JSON.stringify({
          model: MODEL,
          messages: currentMessages,
          tools: TOOL_DEFINITIONS,
          max_tokens: 2048,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error("LLM error:", response.status, errorBody);
        return NextResponse.json(
          { error: "Error al contactar el servicio de IA" },
          { status: 502 }
        );
      }

      const data = await response.json();
      const choice = data.choices?.[0];
      const replyMessage = choice?.message;

      if (!replyMessage) {
        return NextResponse.json(
          { reply: "Lo siento, no pude procesar tu solicitud." }
        );
      }

      if (!replyMessage.tool_calls || replyMessage.tool_calls.length === 0) {
        return NextResponse.json({
          reply: replyMessage.content || "Claro, en que mas puedo ayudarte?",
          model: data.model || MODEL,
          usage: data.usage,
          rounds: round + 1,
        });
      }

      const assistantMsg: ChatMessage = {
        role: "assistant",
        content: replyMessage.content || "",
        tool_calls: replyMessage.tool_calls,
      };
      currentMessages.push(assistantMsg);

      for (const toolCall of replyMessage.tool_calls) {
        const name = toolCall.function?.name as ToolName;
        let args: Record<string, any> = {};

        try {
          args = JSON.parse(toolCall.function?.arguments || "{}");
        } catch {
          args = {};
        }

        const result = await executeTool(name, args);

        currentMessages.push({
          role: "tool",
          tool_call_id: toolCall.id,
          name: name,
          content: JSON.stringify(result),
        });
      }
    }

    return NextResponse.json({
      reply: "He consultado varias fuentes de datos. Quieres que profundice en algun aspecto en particular?",
      rounds: MAX_ROUNDS,
    });

  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
