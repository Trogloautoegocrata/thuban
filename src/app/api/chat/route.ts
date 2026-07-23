import { NextRequest, NextResponse } from "next/server";
import { executeTool } from "@/lib/backbone-tools";
import { assembleSystemPrompt } from "@/lib/prompts/route";
import { ALL_TOOL_DEFINITIONS, executeThubanTool, ThubanToolName } from "@/lib/prompts/tools";
import { addMemoryEntry } from "@/lib/prompts/memory";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || process.env.DEEPSEEK_API_KEY || "";
const MODEL = "deepseek/deepseek-chat";

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

    if (!OPENROUTER_API_KEY) {
      return NextResponse.json({ error: "API de chat no configurada" }, { status: 503 });
    }

    // ─── CAPA 1-4: Ensamblar system prompt desde las 5 capas ───
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

    // ─── Guardar el mensaje del usuario en memoria ───
    const lastUserMsg = rawMessages.filter((m: any) => m.role === "user").pop();
    if (lastUserMsg && userId) {
      addMemoryEntry(userId, conversationId || "default", "user_query", lastUserMsg.text || lastUserMsg.content || "");
    }

    const MAX_ROUNDS = 3;
    let currentMessages = [...messages];

    for (let round = 0; round < MAX_ROUNDS; round++) {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://app.thuban.online",
          "X-Title": "Thuban",
        },
        body: JSON.stringify({
          model: MODEL,
          messages: currentMessages,
          tools: ALL_TOOL_DEFINITIONS,
          max_tokens: 4096,
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
        // Guardar respuesta en memoria
        if (userId && replyMessage.content) {
          addMemoryEntry(userId, conversationId || "default", "assistant_reply", replyMessage.content.slice(0, 200));
        }
        return NextResponse.json({
          reply: replyMessage.content || "Claro, ¿en qué más puedo ayudarte?",
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
        const name = toolCall.function?.name;
        let args: Record<string, any> = {};

        try {
          args = JSON.parse(toolCall.function?.arguments || "{}");
        } catch {
          args = {};
        }

        const result = await executeThubanTool(name, args);

        // Guardar tool call en memoria
        if (userId && name) {
          addMemoryEntry(userId, conversationId || "default", "tool_call", `${name}: ${JSON.stringify(args).slice(0, 100)}`);
        }

        currentMessages.push({
          role: "tool",
          tool_call_id: toolCall.id,
          name: name,
          content: JSON.stringify(result),
        });
      }
    }

    return NextResponse.json({
      reply: "He consultado varias fuentes de datos. ¿Quieres que profundice en algún aspecto en particular?",
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
