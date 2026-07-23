// src/lib/prompts/memory.ts
// CAPA: MEMORY — Gestión de contexto persistente entre sesiones
// Inspirado en el archivo MEMORY.md de HappyCapy.ai
// Por ahora: almacenamiento en localStorage del navegador
// Cuando se implemente persistencia (F0.2): almacenar en PostgreSQL vía BACKBONE

export interface MemoryEntry {
  key: string;
  value: string;
  timestamp: number;
}

export interface ConversationMemory {
  userId: string;
  conversationId: string;
  entries: MemoryEntry[];
  context: {
    userPreferences?: string;
    activeProject?: string;
    recentProperties?: string[];
    lastTopics?: string[];
  };
}

// ─── Memoria de sesión (en memoria mientras no hay persistencia) ───

const sessionMemory: Map<string, ConversationMemory> = new Map();

export function getOrCreateMemory(userId: string, conversationId: string): ConversationMemory {
  const key = `${userId}:${conversationId}`;
  if (!sessionMemory.has(key)) {
    sessionMemory.set(key, {
      userId,
      conversationId,
      entries: [],
      context: {},
    });
  }
  return sessionMemory.get(key)!;
}

export function addMemoryEntry(userId: string, conversationId: string, key: string, value: string): void {
  const mem = getOrCreateMemory(userId, conversationId);
  mem.entries.push({ key, value, timestamp: Date.now() });
  // Mantener solo las últimas 50 entradas
  if (mem.entries.length > 50) {
    mem.entries = mem.entries.slice(-50);
  }
}

export function getMemoryContext(userId: string, conversationId: string): string {
  const mem = getOrCreateMemory(userId, conversationId);
  if (mem.entries.length === 0) return "";

  const recentEntries = mem.entries.slice(-10);
  const contextLines = recentEntries.map(
    (e) => `[${new Date(e.timestamp).toLocaleString("es-MX")}] ${e.key}: ${e.value}`
  );
  return `
## CONTEXTO DE LA CONVERSACIÓN (últimas interacciones)
${contextLines.join("\n")}
`;
}
