// src/components/capacidades/NegotiateStrategy.tsx
// Capacidad #3: Ayúdame a negociar — UI completa

"use client";

import { useState } from "react";
import { RefreshCw, Loader2, Copy, Check } from "lucide-react";

interface NegotiationInput {
  precio_publicado: string;
  ubicacion: string;
  precio_oferta: string;
  tipo_propiedad: string;
  tiempo_mercado: string;
  motivacion_vendedor: string;
  condiciones: string;
}

const TIPOS = ["Casa", "Departamento", "Terreno"];
const TIEMPOS = ["No lo sé", "Menos de 1 mes", "1-3 meses", "3-6 meses", "Más de 6 meses", "Recién publicada"];
const MOTIVACIONES = [
  "No lo sé", "Cambio de ciudad", "Herencia", "Divorcio", "Necesidad de liquidez",
  "Inversión", "Upgrade a propiedad más grande", "Downsize",
];

const initialInput: NegotiationInput = {
  precio_publicado: "",
  ubicacion: "",
  precio_oferta: "",
  tipo_propiedad: "Casa",
  tiempo_mercado: "No lo sé",
  motivacion_vendedor: "No lo sé",
  condiciones: "",
};

export default function NegotiateStrategy() {
  const [input, setInput] = useState<NegotiationInput>(initialInput);
  const [generando, setGenerando] = useState(false);
  const [resultado, setResultado] = useState<string>("");
  const [iteracion, setIteracion] = useState(1);
  const [copiado, setCopiado] = useState(false);

  const actualizar = (campo: keyof NegotiationInput, valor: string) => {
    setInput((prev) => ({ ...prev, [campo]: valor }));
  };

  const generar = async (nuevaOferta?: string) => {
    setGenerando(true);

    const oferta = nuevaOferta || input.precio_oferta;
    const msgNum = iteracion;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              text: `Ayúdame a preparar una estrategia de negociación para esta propiedad:

DATOS DE LA PROPIEDAD:
- Tipo: ${input.tipo_propiedad}
- Ubicación: ${input.ubicacion}
- Precio publicado: $${parseInt(input.precio_publicado).toLocaleString("es-MX")} MXN
${oferta ? `- Precio de oferta considerado: $${parseInt(oferta).toLocaleString("es-MX")} MXN` : ""}
- Tiempo en el mercado: ${input.tiempo_mercado}
- Motivación del vendedor: ${input.motivacion_vendedor}
- Condiciones de la propiedad: ${input.condiciones || "No especificadas"}

${msgNum > 1 ? `\nES LA ITERACIÓN #${msgNum}. La oferta ha cambiado a $${parseInt(oferta).toLocaleString("es-MX")} MXN. Recalcula la estrategia con este nuevo dato.` : ""}

Genera tu respuesta con esta estructura exacta:

## Análisis de la Situación
[análisis basado en los datos disponibles]

## Argumentos Objetivos
[argumentos basados en el precio/m² de la zona y condiciones]

## Estrategia Recomendada
[precio de apertura, rango de cierre, concesiones]

## Guión Sugerido
[texto que el agente puede decir o enviar]

IMPORTANTE: Usa terminología de negociación inmobiliaria mexicana. Incluye el disclaimer correspondiente.`,
            },
          ],
          userId: "negotiate-capability",
          conversationId: "negotiate-tool",
          activeCapability: "negotiate",
        }),
      });

      const data = await res.json();
      setResultado(data.reply || "Lo siento, no pude generar la estrategia. Intenta de nuevo.");
    } catch {
      setResultado("Error de conexión. Verifica tu conexión e intenta de nuevo.");
    }

    setGenerando(false);
  };

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(resultado);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = resultado;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    }
  };

  const iterar = () => {
    setIteracion((p) => p + 1);
    generar(input.precio_oferta);
  };

  const reiniciar = () => {
    setInput(initialInput);
    setResultado("");
    setIteracion(1);
  };

  return (
    <div className="dash-section">
      <div className="dash-welcome">
        <h1>🛡️ Ayúdame a negociar</h1>
        <p>Prepara una estrategia de negociación con datos de mercado. Describe la situación y recibe argumentos, tácticas y un guión sugerido.</p>
      </div>

      {!resultado ? (
        <div style={{ maxWidth: 600 }}>
          {/* Tipo de propiedad */}
          <div className="form-group">
            <label>Tipo de propiedad</label>
            <div style={{ display: "flex", gap: "0.4rem" }}>
              {TIPOS.map((t) => (
                <button
                  key={t}
                  onClick={() => actualizar("tipo_propiedad", t)}
                  style={{
                    padding: "0.4rem 0.8rem", borderRadius: 8, border: "1px solid var(--color-border)",
                    background: input.tipo_propiedad === t ? "var(--color-gold)" : "var(--color-card)",
                    color: input.tipo_propiedad === t ? "#000" : "var(--color-fg)",
                    cursor: "pointer", fontSize: "0.8rem", fontFamily: "inherit",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <div className="form-group">
              <label>Precio publicado (MXN) *</label>
              <input
                className="form-input" type="number"
                placeholder="Ej: 4200000"
                value={input.precio_publicado}
                onChange={(e) => actualizar("precio_publicado", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Ubicación *</label>
              <input
                className="form-input"
                placeholder="Colonia, Ciudad"
                value={input.ubicacion}
                onChange={(e) => actualizar("ubicacion", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Tu oferta (opcional)</label>
              <input
                className="form-input" type="number"
                placeholder="Ej: 3800000"
                value={input.precio_oferta}
                onChange={(e) => actualizar("precio_oferta", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Tiempo en el mercado</label>
              <select
                className="form-input"
                value={input.tiempo_mercado}
                onChange={(e) => actualizar("tiempo_mercado", e.target.value)}
                style={{ fontFamily: "inherit" }}
              >
                {TIEMPOS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Motivación del vendedor (si se conoce)</label>
            <select
              className="form-input"
              value={input.motivacion_vendedor}
              onChange={(e) => actualizar("motivacion_vendedor", e.target.value)}
              style={{ fontFamily: "inherit" }}
            >
              {MOTIVACIONES.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Condiciones de la propiedad</label>
            <textarea
              className="form-input" rows={2}
              placeholder="¿Necesita reparaciones? ¿Está remodelada? ¿Tiene algún defecto visible?"
              value={input.condiciones}
              onChange={(e) => actualizar("condiciones", e.target.value)}
              style={{ resize: "vertical", fontFamily: "inherit" }}
            />
          </div>

          <button
            className="btn-primary"
            onClick={() => generar()}
            disabled={!input.precio_publicado || !input.ubicacion || generando}
            style={{ marginTop: "1.5rem", width: "100%", padding: "0.75rem", fontSize: "1rem" }}
          >
            {generando ? <><Loader2 className="spin" /> Analizando... </> : "🎯 Generar estrategia"}
          </button>
        </div>
      ) : (
        <div>
          {/* Toolbar */}
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
            <button onClick={copiar} className="btn-secondary" style={{ fontSize: "0.8rem", padding: "0.4rem 0.8rem" }}>
              {copiado ? <><Check /> Copiado</> : <><Copy /> Copiar</>}
            </button>
            {input.precio_oferta && (
              <button onClick={iterar} className="btn-primary" style={{ fontSize: "0.8rem", padding: "0.4rem 0.8rem" }}>
                🔄 Iterar: ¿y si ofrezco ${parseInt(input.precio_oferta).toLocaleString("es-MX")}?
              </button>
            )}
            <button onClick={reiniciar} className="btn-secondary" style={{ marginLeft: "auto", fontSize: "0.8rem", padding: "0.4rem 0.8rem" }}>
              <RefreshCw /> Nueva negociación
            </button>
          </div>

          {/* Resultado */}
          <div
            className="metric-card"
            style={{
              padding: "1.5rem", background: "var(--color-card)",
              whiteSpace: "pre-wrap", fontSize: "0.9rem", lineHeight: 1.7,
            }}
          >
            {resultado.split("\n").map((line, i) => {
              if (line.startsWith("## ")) {
                return (
                  <h3 key={i} style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: "1.5rem", marginBottom: "0.5rem", color: "var(--color-gold)" }}>
                    {line.replace("## ", "")}
                  </h3>
                );
              }
              if (line.startsWith("### ")) {
                return (
                  <h4 key={i} style={{ fontSize: "0.95rem", fontWeight: 600, marginTop: "1rem", marginBottom: "0.3rem" }}>
                    {line.replace("### ", "")}
                  </h4>
                );
              }
              return <p key={i} style={{ margin: "0.3rem 0" }}>{line}</p>;
            })}
          </div>

          <div style={{ marginTop: "1rem", fontSize: "0.75rem", color: "var(--color-muted-2)", fontStyle: "italic" }}>
            ⚠️ Esta es una estrategia sugerida basada en datos de mercado. La negociación real depende de muchos factores que una IA no puede evaluar completamente.
          </div>
        </div>
      )}
    </div>
  );
}
