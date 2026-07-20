// src/app/api/market/trends/route.ts
// Endpoint para análisis de mercado con datos reales de BACKBONE
// v1.0.0

import { NextRequest, NextResponse } from "next/server";

const BACKBONE_URL = process.env.NEXT_PUBLIC_BACKBONE_URL || "https://api.back-bone.dev/v1";
const API_KEY = process.env.BACKBONE_API_KEY || "";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const zone = searchParams.get("zone") || "";
    const propertyType = searchParams.get("property_type") || "";

    // Consultar propiedades desde BACKBONE
    const params = new URLSearchParams({ per_page: "100" });
    if (zone) params.set("search", zone);
    if (propertyType) params.set("property_type", propertyType);

    const res = await fetch(`${BACKBONE_URL}/properties?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
      next: { revalidate: 300 }, // cache 5 min
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Error consultando datos de mercado" },
        { status: 502 }
      );
    }

    const data = await res.json();
    const properties = data.data || [];
    const meta = data.meta || {};

    // Análisis básico
    const prices = properties
      .map((p: any) => parseFloat(p.price))
      .filter((p: number) => !isNaN(p) && p > 0);

    const avgPrice = prices.length > 0
      ? prices.reduce((a: number, b: number) => a + b, 0) / prices.length
      : 0;

    const sortedPrices = [...prices].sort((a, b) => a - b);
    const medianPrice = sortedPrices.length > 0
      ? sortedPrices[Math.floor(sortedPrices.length / 2)]
      : 0;

    const minPrice = sortedPrices[0] || 0;
    const maxPrice = sortedPrices[sortedPrices.length - 1] || 0;

    // Distribución por tipo
    const byType: Record<string, number> = {};
    properties.forEach((p: any) => {
      const t = p.property_type || "no especificado";
      byType[t] = (byType[t] || 0) + 1;
    });

    // Distribución por recámaras
    const byBedrooms: Record<string, number> = {};
    properties.forEach((p: any) => {
      const b = p.bedrooms ? String(p.bedrooms) : "no especificado";
      byBedrooms[b] = (byBedrooms[b] || 0) + 1;
    });

    return NextResponse.json({
      success: true,
      market: {
        total_properties: meta.total || properties.length,
        sources: meta.sources || [],
        analysis: {
          avg_price: Math.round(avgPrice),
          median_price: Math.round(medianPrice),
          min_price: Math.round(minPrice),
          max_price: Math.round(maxPrice),
          sample_size: prices.length,
        },
        distribution: {
          by_type: byType,
          by_bedrooms: byBedrooms,
        },
      },
      filters: {
        zone: zone || "todas",
        property_type: propertyType || "todos",
      },
    });
  } catch (error) {
    console.error("Market trends error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
