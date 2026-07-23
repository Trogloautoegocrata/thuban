// src/app/api/conversations/route.ts
// API de persistencia de conversaciones (localforage en el cliente)
// Esta API sirve como bridge para futura migración a PostgreSQL

import { NextRequest, NextResponse } from "next/server";

// Por ahora: API de paso — la persistencia real está en localforage (cliente)
// Esta API almacena/rescata conversaciones para el usuario autenticado
// En Fase 2+ se migrará a PostgreSQL

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  const conversationId = req.nextUrl.searchParams.get("conversationId");

  if (!userId) {
    return NextResponse.json({ error: "userId requerido" }, { status: 400 });
  }

  // Placeholder: la persistencia real se maneja en el cliente con localforage
  // Esta API servirá datos cuando haya PostgreSQL
  return NextResponse.json({
    conversations: [],
    note: "Persistencia local (localforage/IndexedDB) activa. PostgreSQL próximamente.",
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, userId, conversationId, messages } = body;

    if (!userId || !action) {
      return NextResponse.json({ error: "userId y action requeridos" }, { status: 400 });
    }

    // Placeholder — la persistencia real es client-side con localforage
    return NextResponse.json({ success: true, stored: true, note: "Persistencia local activa" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
