// src/app/api/stripe/create-checkout/route.ts
// Crea sesión de Stripe Checkout para Thuban

import { NextRequest, NextResponse } from "next/server";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "";
const PRICE_IDS: Record<string, string> = {
  pro: process.env.STRIPE_PRICE_PRO || "price_pro",
  enterprise: process.env.STRIPE_PRICE_ENTERPRISE || "price_enterprise",
};

export async function POST(req: NextRequest) {
  try {
    const { plan, email, userId } = await req.json();

    if (!plan || !["pro", "enterprise"].includes(plan)) {
      return NextResponse.json({ error: "Plan inválido" }, { status: 400 });
    }

    const priceId = PRICE_IDS[plan];
    if (!priceId) {
      return NextResponse.json({ error: "Precio no configurado para este plan" }, { status: 500 });
    }

    if (!STRIPE_SECRET_KEY) {
      // Modo demo: simular checkout exitoso
      return NextResponse.json({
        url: `/dashboard?checkout=success&plan=${plan}&demo=true`,
        demo: true,
      });
    }

    const stripe = new (require("stripe"))(STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: email || undefined,
      client_reference_id: userId,
      success_url: `${req.headers.get("origin") || "https://app.thuban.online"}/dashboard?checkout=success&plan=${plan}`,
      cancel_url: `${req.headers.get("origin") || "https://app.thuban.online"}/pricing`,
      metadata: { userId, plan },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json({ error: error.message || "Error al crear checkout" }, { status: 500 });
  }
}
