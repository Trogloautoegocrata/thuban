// src/lib/db/credits.ts
// Sistema de créditos con persistencia real (localforage)
// Reemplaza la versión localStorage de lib/credits.ts

import localforage from "localforage";

const creditsDb = localforage.createInstance({
  name: "thuban",
  storeName: "credits",
});

export interface CreditsState {
  userId: string;
  total: number;
  used: number;
  plan: "free" | "pro" | "enterprise";
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  expiresAt: number | null;
  updatedAt: number;
}

const PLAN_LIMITS: Record<string, { total: number; label: string; priceId: string }> = {
  free: { total: 100, label: "Free", priceId: "" },
  pro: { total: 10000, label: "Pro", priceId: "price_pro_thuban" },
  enterprise: { total: 999999, label: "Enterprise", priceId: "price_enterprise_thuban" },
};

export async function getCredits(userId: string): Promise<CreditsState> {
  const stored = await creditsDb.getItem<CreditsState>(`credits_${userId}`);
  if (stored) return stored;

  const initial: CreditsState = {
    userId,
    total: PLAN_LIMITS.free.total,
    used: 0,
    plan: "free",
    expiresAt: null,
    updatedAt: Date.now(),
  };
  await creditsDb.setItem(`credits_${userId}`, initial);
  return initial;
}

export async function getRemaining(userId: string): Promise<number> {
  const state = await getCredits(userId);
  return Math.max(0, state.total - state.used);
}

export async function consumeCredit(userId: string, amount: number = 1): Promise<{ success: boolean; remaining: number }> {
  const state = await getCredits(userId);
  const remaining = state.total - state.used;

  if (remaining < amount) {
    return { success: false, remaining: 0 };
  }

  state.used += amount;
  state.updatedAt = Date.now();
  await creditsDb.setItem(`credits_${userId}`, state);
  return { success: true, remaining: state.total - state.used };
}

export async function setPlan(userId: string, plan: "free" | "pro" | "enterprise"): Promise<CreditsState> {
  const state = await getCredits(userId);
  state.plan = plan;
  const limits = PLAN_LIMITS[plan];
  if (limits) {
    state.total = limits.total;
  }
  state.used = 0;
  state.updatedAt = Date.now();
  await creditsDb.setItem(`credits_${userId}`, state);
  return state;
}

export function getPlanLimits() {
  return PLAN_LIMITS;
}
