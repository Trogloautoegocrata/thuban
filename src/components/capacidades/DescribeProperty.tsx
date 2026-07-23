// src/components/capacidades/DescribeProperty.tsx
// Capacidad #1: Describe esta propiedad — UI completa

"use client";

import { useState } from "react";
import { Star, Copy, Check, RefreshCw, Loader2 } from "lucide-react";

interface PropertyData {
  tipo: string;
  ubicacion: string;
  metros_construccion: string;
  metros_terreno: string;
  recamaras: string;
  banos: string;
  estacionamiento: string;
  precio: string;
  caracteristicas: string;
}

const TIPOS_PROPIEDAD = [
  "Casa", "Departamento", "Terreno", "Local comercial",
  "Oficina", "Nave industrial", "Bodega", "Penthouse",
];

const FORMATOS = ["Portal", "Instagram", "WhatsApp", "Brochure"];

const initialData: PropertyData = {
  tipo: "",
  ubicacion: "",
  metros_construccion: "",
  metros_terreno: "",
  recamaras: "",
  banos: "",
  estacionamiento: "",
  precio: "",
  caracteristicas: "",
};

export default function DescribeProperty() {
  const [data, setData] = useState<PropertyData>(initialData);
  const [formatos, setFormatos] = useState<string[]>(["Portal"]);
  const [generando, setGenerando] = useState(false);
  const [resultados, setResultados] = useState<Record<string, string>>({});
  const [copiado, setCopiado] = useState<string | null>(null);
  const [paso, setPaso] = useState<"formulario" | "resultado">("formulario");

  const actualizar = (campo: keyof PropertyData, valor: string) => {
    setData((prev) => ({ ...prev, [campo]: valor }));
  };

  const toggleFormato = (fmt: string) => {
    setFormatos((prev) =>
      prev.includes(fmt) ? prev.filter((f) => f !== fmt) : [...prev, fmt]
    );
  };

  const generar = async () => {
    setGenerando(true);
    setResultados({});
    setPaso("resultado");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              text: `Genera descripciones para esta propiedad en los siguientes formatos: ${formatos.join(", ")}.

DATOS DE LA PROPIEDAD:
- Tipo: ${data.tipo}
- Ubicación: ${data.ubicacion}
- Metros de construcción: ${data.metros_construccion || "No especificado"}
- Metros de terreno: ${data.metros_terreno || "No especificado"}
- Recámaras: ${data.recamaras || "No especificado"}
- Baños: ${data.banos || "No especificado"}
- Estacionamiento: ${data.estacionamiento || "No especificado"}
- Precio: ${data.precio ? `$${parseInt(data.precio).toLocaleString("es-MX")} MXN` : "No especificado"}
- Características especiales: ${data.caracteristicas || "No especificadas"}

IMPORTANTE: Para CADA formato, genera el texto COMPLETO de la descripción. Estructura tu respuesta así:

## Formato: Portal
[descripción completa]

## Formato: Instagram
[descripción completa]

## Formato: WhatsApp
[descripción completa]

## Formato: Brochure
[descripción completa]`,
            },
          ],
          userId: "describe-capability",
          conversationId: "describe-tool",
          activeCapability: "describe",
        }),
      });

      const data_ = await res.json();
      if (data_.reply) {
        // Parsear la respuesta en secciones por formato
        const secciones: Record<string, string> = {};
        let currentFormat = "";
        const lines = data_.reply.split("\n");

        for (const line of lines) {
          const match = line.match(/^##\s*Formato:\s*(.+)$/i);
          if (match) {
            currentFormat = match[1].trim();
            secciones[currentFormat] = "";
          } else if (currentFormat && line.trim()) {
            secciones[currentFormat] += line + "\n";
          }
        }

        if (Object.keys(secciones).length > 0) {
          setResultados(secciones);
        } else {
          // Si no pudo parsear, poner todo como "Completo"
          setResultados({ Completo: data_.reply });
        }
      } else {
        setResultados({ Error: "No se pudo generar la descripción. Intenta de nuevo." });
      }
    } catch {
      setResultados({ Error: "Error de conexión. Verifica tu conexión e intenta de nuevo." });
    }

    setGenerando(false);
  };

  const copiar = async (texto: string, formato: string) => {
    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(formato);
      setTimeout(() => setCopiado(null), 2000);
    } catch {
      // fallback
      const textarea = document.createElement("textarea");
      textarea.value = texto;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopiado(formato);
      setTimeout(() => setCopiado(null), 2000);
    }
  };

  const regenerar = () => {
    setPaso("formulario");
    setResultados({});
  };

  return (
    <div className="dash-section">
      <div className="dash-welcome">
        <h1>🏠 Describe esta propiedad</h1>
        <p>Genera descripciones profesionales para tus listings en segundos. Elige los formatos y completa los datos.</p>
      </div>

      {paso === "formulario" ? (
        <div style={{ maxWidth: 600 }}>
          {/* Tipo de propiedad */}
          <div className="form-group">
            <label>Tipo de propiedad</label>
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
              {TIPOS_PROPIEDAD.map((t) => (
                <button
                  key={t}
                  onClick={() => actualizar("tipo", t)}
                  style={{
                    padding: "0.4rem 0.8rem", borderRadius: 8, border: "1px solid var(--color-border)",
                    background: data.tipo === t ? "var(--color-gold)" : "var(--color-card)",
                    color: data.tipo === t ? "#000" : "var(--color-fg)",
                    cursor: "pointer", fontSize: "0.8rem", fontFamily: "inherit",
                    transition: "all 0.15s",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Campos del formulario */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <div className="form-group">
              <label>Ubicación *</label>
              <input
                className="form-input"
                placeholder="Colonia, Ciudad, Estado"
                value={data.ubicacion}
                onChange={(e) => actualizar("ubicacion", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Precio (MXN) *</label>
              <input
                className="form-input"
                type="number"
                placeholder="Ej: 2500000"
                value={data.precio}
                onChange={(e) => actualizar("precio", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Metros construcción</label>
              <input
                className="form-input"
                type="number"
                placeholder="Ej: 180"
                value={data.metros_construccion}
                onChange={(e) => actualizar("metros_construccion", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Metros terreno</label>
              <input
                className="form-input"
                type="number"
                placeholder="Ej: 250"
                value={data.metros_terreno}
                onChange={(e) => actualizar("metros_terreno", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Recámaras</label>
              <input
                className="form-input"
                type="number"
                min="0"
                placeholder="Ej: 3"
                value={data.recamaras}
                onChange={(e) => actualizar("recamaras", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Baños</label>
              <input
                className="form-input"
                type="number"
                min="0"
                step="0.5"
                placeholder="Ej: 2.5"
                value={data.banos}
                onChange={(e) => actualizar("banos", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Estacionamiento</label>
              <input
                className="form-input"
                type="number"
                min="0"
                placeholder="Ej: 2"
                value={data.estacionamiento}
                onChange={(e) => actualizar("estacionamiento", e.target.value)}
              />
            </div>
          </div>

          {/* Características */}
          <div className="form-group" style={{ marginTop: "0.75rem" }}>
            <label>Características especiales</label>
            <textarea
              className="form-input"
              rows={3}
              placeholder="Amenidades, acabados, antigüedad, vista, etc."
              value={data.caracteristicas}
              onChange={(e) => actualizar("caracteristicas", e.target.value)}
              style={{ resize: "vertical", fontFamily: "inherit" }}
            />
          </div>

          {/* Selector de formatos */}
          <div className="form-group" style={{ marginTop: "0.75rem" }}>
            <label>Formatos de salida</label>
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
              {FORMATOS.map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => toggleFormato(fmt)}
                  style={{
                    padding: "0.4rem 0.8rem", borderRadius: 8, border: "1px solid var(--color-border)",
                    background: formatos.includes(fmt) ? "var(--color-gold)" : "var(--color-card)",
                    color: formatos.includes(fmt) ? "#000" : "var(--color-fg)",
                    cursor: "pointer", fontSize: "0.8rem", fontFamily: "inherit",
                    transition: "all 0.15s",
                  }}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>

          {/* Botón generar */}
          <button
            className="btn-primary"
            onClick={generar}
            disabled={!data.tipo || !data.ubicacion || !data.precio || formatos.length === 0 || generando}
            style={{ marginTop: "1.5rem", width: "100%", padding: "0.75rem", fontSize: "1rem" }}
          >
            {generando ? <><Loader2 className="spin" /> Generando...</> : "✨ Generar descripciones"}
          </button>
        </div>
      ) : (
        /* ─── Resultados ─── */
        <div>
          {generando ? (
            <div style={{ textAlign: "center", padding: "4rem 0" }}>
              <Loader2 className="spin" style={{ width: 40, height: 40, color: "var(--color-gold)", margin: "0 auto 1rem" }} />
              <p style={{ color: "var(--color-muted)" }}>Generando descripciones profesionales...</p>
            </div>
          ) : (
            <>
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
                {Object.keys(resultados).map((fmt) => (
                  <button
                    key={fmt}
                    className={`btn-${resultados[fmt] ? "primary" : "secondary"}`}
                    onClick={() => {
                      const el = document.getElementById(`desc-${fmt}`);
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    style={{ fontSize: "0.8rem", padding: "0.4rem 0.8rem" }}
                  >
                    📄 {fmt}
                  </button>
                ))}
                <button
                  onClick={regenerar}
                  className="btn-secondary"
                  style={{ marginLeft: "auto", fontSize: "0.8rem", padding: "0.4rem 0.8rem" }}
                >
                  <RefreshCw /> Nueva descripción
                </button>
              </div>

              {Object.entries(resultados).map(([formato, texto]) => (
                <div
                  key={formato}
                  id={`desc-${formato}`}
                  className="metric-card"
                  style={{ marginBottom: "1rem", padding: "1.25rem", background: "var(--color-card)" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                    <h3 style={{ fontSize: "1rem", fontWeight: 700 }}>📄 {formato}</h3>
                    <button
                      onClick={() => copiar(texto, formato)}
                      className="btn-secondary"
                      style={{ fontSize: "0.75rem", padding: "0.3rem 0.6rem", display: "flex", alignItems: "center", gap: "0.3rem" }}
                    >
                      {copiado === formato ? <><Check /> Copiado</> : <><Copy /> Copiar</>}
                    </button>
                  </div>
                  <div
                    style={{
                      whiteSpace: "pre-wrap",
                      fontSize: "0.9rem",
                      lineHeight: 1.7,
                      color: "var(--color-fg)",
                      maxHeight: 400,
                      overflowY: "auto",
                      padding: "1rem",
                      background: "rgba(0,0,0,0.2)",
                      borderRadius: 8,
                    }}
                  >
                    {texto}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
