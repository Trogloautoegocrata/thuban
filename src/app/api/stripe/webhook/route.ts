// src/app/api/stripe/webhook/route.ts
// Webhook de Stripe para Thuban — actualiza créditos cuando se recibe pago

import { NextRequest, NextResponse } from "next/server";

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature") || "";

    if (!STRIPE_WEBHOOK_SECRET || !signature) {
      // Modo demo: simular webhook
      const payload = JSON.parse(body);
      console.log("Webhook demo recibido:", payload.type, payload.data?.object?.id);
      return NextResponse.json({ received: true, demo: true });
    }

    const stripe = new (require("stripe"))(process.env.STRIPE_SECRET_KEY);
    const event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET);

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const plan = session.metadata?.plan || "free";
        const userId = session.metadata?.userId || session.client_reference_id;
        // Actualizar créditos vía API interna o DB
        console.log(`✅ Pago completado: usuario=${userId}, plan=${plan}`);
        break;
      }
      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        console.log(`❌ Suscripción cancelada: ${subscription.id}`);
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Stripe webhook error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
