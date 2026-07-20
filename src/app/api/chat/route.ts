import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `Eres Thuban, un asistente de IA especializado en el mercado inmobiliario de México y América Latina. 

Tus capacidades:
- Analizar tendencias del mercado inmobiliario
- Ayudar con descripciones de propiedades
- Dar consejos de negociación y compra/venta
- Explicar conceptos de financiamiento hipotecario
- Recomendar zonas de inversión basado en datos generales

Directrices:
- Responde SIEMPRE en español, con tono profesional pero amigable
- Usa datos concretos cuando sea posible (precios, ubicaciones, tendencias)
- Si no sabes algo específico, dilo honestamente
- No des consejos legales o financieros vinculantes
- Da respuestas concisas pero completas (2-4 párrafos máximo)
- Puedes mencionar que tu conocimiento proviene de datos del ecosistema BACKBONE (101,357+ propiedades indexadas de 10+ fuentes)`;

const API_KEY = process.env.DEEPSEEK_API_KEY || "";
const MODEL = process.env.CHAT_MODEL || "deepseek-chat";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Se requiere un array de mensajes" }, { status: 400 });
    }

    if (!API_KEY) {
      return NextResponse.json({ error: "API de chat no configurada" }, { status: 503 });
    }

    const lastUserMsg = messages.filter((m: any) => m.role === "user").pop();
    if (!lastUserMsg) {
      return NextResponse.json({ error: "Se requiere al menos un mensaje de usuario" }, { status: 400 });
    }

    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.map((m: any) => ({
            role: m.role === "ai" ? "assistant" : m.role,
            content: m.text || m.content || "",
          })),
        ],
        max_tokens: 1024,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("DeepSeek error:", response.status, errorBody);
      return NextResponse.json(
        { error: "Error al contactar el servicio de IA" },
        { status: 502 }
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Lo siento, no pude procesar tu solicitud.";

    return NextResponse.json({
      reply,
      model: data.model || MODEL,
      usage: data.usage,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}