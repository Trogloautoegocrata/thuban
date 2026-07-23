// src/lib/credits.ts
// Sistema de créditos de Thuban
// Fase 0: localStorage-based (sin Stripe ni DB)
// Fase 1+: Stripe + PostgreSQL

export interface CreditsState {
  total: number;
  used: number;
  plan: "free" | "pro" | "enterprise";
  expiresAt: number | null;
}

const CREDITS_KEY = "thuban_credits";

const PLAN_LIMITS: Record<string, { total: number; label: string }> = {
  free: { total: 100, label: "Free" },
  pro: { total: 10000, label: "Pro" },
  enterprise: { total: 999999, label: "Enterprise" },
};

export function getCredits(): CreditsState {
  if (typeof window === "undefined") {
    return { total: 100, used: 0, plan: "free", expiresAt: null };
  }

  const stored = localStorage.getItem(CREDITS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // fallthrough
    }
  }

  // Estado inicial: Free, 100 créditos
  const initial: CreditsState = {
    total: PLAN_LIMITS.free.total,
    used: 0,
    plan: "free",
    expiresAt: null,
  };
  localStorage.setItem(CREDITS_KEY, JSON.stringify(initial));
  return initial;
}

export function getRemainingCredits(): number {
  const state = getCredits();
  return Math.max(0, state.total - state.used);
}

export function useCredits(amount: number = 1): boolean {
  const state = getCredits();
  const remaining = state.total - state.used;

  if (remaining < amount) {
    return false; // Sin créditos suficientes
  }

  state.used += amount;
  localStorage.setItem(CREDITS_KEY, JSON.stringify(state));
  return true;
}

export function setPlan(plan: "free" | "pro" | "enterprise"): void {
  const state = getCredits();
  state.plan = plan;
  const limit = PLAN_LIMITS[plan];
  if (limit) {
    state.total = limit.total;
  }
  state.used = 0;
  localStorage.setItem(CREDITS_KEY, JSON.stringify(state));
}

export function getPlanLabel(): string {
  return PLAN_LIMITS[getCredits().plan]?.label || "Free";
}
