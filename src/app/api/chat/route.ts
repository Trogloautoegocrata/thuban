import { NextRequest, NextResponse } from "next/server";
import { assembleSystemPrompt } from "@/lib/prompts/route";
import { ALL_TOOL_DEFINITIONS, executeThubanTool } from "@/lib/prompts/tools";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || "";
const MODEL = process.env.CHAT_MODEL || "deepseek/deepseek-chat";

interface ChatMessage {
  role: "system" | "user" | "assistant" | "tool";
  content: string;
  tool_calls?: any[];
  tool_call_id?: string;
  name?: string;
}

export async function POST(req: NextRequest) {
  try {
    const { messages: rawMessages, userId, conversationId, activeCapability } = await req.json();

    if (!rawMessages || !Array.isArray(rawMessages) || rawMessages.length === 0) {
      return NextResponse.json({ error: "Se requiere un array de mensajes" }, { status: 400 });
    }

    // ─── System prompt desde 5 capas ───
    const systemPrompt = assembleSystemPrompt({
      userId: userId || "anonymous",
      conversationId: conversationId || "default",
      activeCapability: activeCapability || undefined,
    });

    const messages: ChatMessage[] = [
      { role: "system", content: systemPrompt },
      ...rawMessages.map((m: any) => ({
        role: m.role === "ai" ? "assistant" : m.role,
        content: m.text || m.content || "",
      })),
    ];

    // ─── Llamada a OpenRouter ───
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
        messages,
        tools: ALL_TOOL_DEFINITIONS,
        max_tokens: 4096,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("LLM error:", response.status, errorBody);
      // Si es error de API key no configurada, dar respuesta amigable
      if (response.status === 401 || response.status === 403) {
        return NextResponse.json({
          reply: "🔧 Thuban está en mantenimiento. El chat con IA estará disponible en breve. Mientras tanto, puedes explorar las propiedades en la sección correspondiente.",
          model: "offline",
          usage: null,
          rounds: 0,
        });
      }
      return NextResponse.json(
        { error: "Error al contactar el servicio de IA" },
        { status: 502 }
      );
    }

    const data = await response.json();
    const choice = data.choices?.[0];
    const replyMessage = choice?.message;

    if (!replyMessage) {
      return NextResponse.json({ reply: "Lo siento, no pude procesar tu solicitud." });
    }

    return NextResponse.json({
      reply: replyMessage.content || "Claro, ¿en qué más puedo ayudarte?",
      model: data.model || MODEL,
      usage: data.usage,
      rounds: 1,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
