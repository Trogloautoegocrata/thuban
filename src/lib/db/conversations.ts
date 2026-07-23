// src/lib/db/conversations.ts
// Persistencia local de conversaciones usando localforage (IndexedDB)
// Funciona en Vercel/serverless sin backend propio

import localforage from "localforage";

const conversationsDb = localforage.createInstance({
  name: "thuban",
  storeName: "conversations",
});

export interface Conversation {
  id: string;
  userId: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  messageCount: number;
}

export interface StoredMessage {
  role: "user" | "assistant" | "tool";
  content: string;
  timestamp: number;
  toolCalls?: any[];
}

// ─── Conversaciones ───

export async function getConversations(userId: string): Promise<Conversation[]> {
  const all: Conversation[] = [];
  await conversationsDb.iterate<any, void>((value, key) => {
    if (value?.userId === userId && value?.createdAt) {
      all.push(value as Conversation);
    }
  });
  return all.sort((a, b) => b.updatedAt - a.updatedAt);
}

export async function saveConversation(conv: Conversation): Promise<void> {
  await conversationsDb.setItem(`conv_${conv.id}`, conv);
}

export async function getConversation(id: string): Promise<Conversation | null> {
  return (await conversationsDb.getItem(`conv_${id}`)) || null;
}

// ─── Mensajes de una conversación ───

export async function getMessages(conversationId: string): Promise<StoredMessage[]> {
  const data = await conversationsDb.getItem<StoredMessage[]>(`msgs_${conversationId}`);
  return data || [];
}

export async function addMessage(conversationId: string, msg: StoredMessage): Promise<void> {
  const messages = await getMessages(conversationId);
  messages.push(msg);
  // Mantener solo los últimos 100 mensajes
  if (messages.length > 100) {
    messages.splice(0, messages.length - 100);
  }
  await conversationsDb.setItem(`msgs_${conversationId}`, messages);
}

export async function deleteConversation(id: string): Promise<void> {
  await conversationsDb.removeItem(`conv_${id}`);
  await conversationsDb.removeItem(`msgs_${id}`);
}
