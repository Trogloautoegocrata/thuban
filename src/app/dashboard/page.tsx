"use client";

import { Star, MessageSquare, Building2, TrendingUp, Settings, LogOut, Bell, Menu, Zap, Clock, ChevronRight, Loader2, Send } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

type Section = "chat" | "propiedades" | "analisis" | "info" | "configuracion";

const navItems: { id: Section; icon: React.ReactNode; label: string }[] = [
  { id: "chat", icon: <MessageSquare />, label: "Chat" },
  { id: "propiedades", icon: <Building2 />, label: "Propiedades" },
  { id: "analisis", icon: <TrendingUp />, label: "Análisis" },
  { id: "info", icon: <Star />, label: "Info" },
  { id: "configuracion", icon: <Settings />, label: "Configuración" },
];

/* ─── Auth Hook ─── */
function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("thuban_token");
    if (!token) { window.location.href = "/login"; return; }

    fetch("/api/backbone/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.email) setUser(data);
        else window.location.href = "/login";
      })
      .catch(() => window.location.href = "/login")
      .finally(() => setLoading(false));
  }, []);

  return { user, loading };
}

/* ─── Stats Hook ─── */
function useStats() {
  const [stats, setStats] = useState({ properties: "—", chats: "—", credits: "5", sources: 0 });

  useEffect(() => {
    Promise.all([
      fetch("/api/backbone/properties?per_page=1").then(r => r.json()),
    ])
      .then(([props]) => {
        const meta = props?.meta;
        setStats({
          properties: meta?.total?.toLocaleString() || "—",
          chats: localStorage.getItem("thuban_chats_count") || "0",
          credits: "5",
          sources: meta?.sources?.length || 10,
        });
      })
      .catch(() => {});
  }, []);

  return stats;
}

/* ─── Chat Demo ─── */
function ChatView() {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([
    { role: "ai", text: "¡Hola! Soy Thuban, tu asistente IA para bienes raíces. ¿En qué puedo ayudarte hoy?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    const updatedMessages = [...messages, { role: "user", text: userMsg }];
    setMessages(updatedMessages);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({ role: m.role, content: m.text })),
        }),
      });
      const data = await res.json();
      if (data.reply) {
        setMessages((m) => [...m, { role: "ai", text: data.reply }]);
      } else {
        setMessages((m) => [...m, { role: "ai", text: "Lo siento, no pude procesar tu solicitud. Intenta de nuevo." }]);
      }
    } catch {
      setMessages((m) => [...m, { role: "ai", text: "Error de conexión. Verifica tu conexión e intenta de nuevo." }]);
    }
    setLoading(false);
  };

  return (
    <div className="chat-full">
      <div className="chat-messages" style={{ maxHeight: "50vh", overflowY: "auto" }}>
        {messages.map((m, i) => (
          <div key={i} className={`chat-msg ${m.role}`}>
            <div className="chat-avatar">{m.role === "ai" ? <Star /> : <MessageSquare />}</div>
            <div className="chat-bubble">{m.text}</div>
          </div>
        ))}
        {loading && (
          <div className="chat-msg ai">
            <div className="chat-avatar"><Star /></div>
            <div className="chat-bubble loading"><Loader2 className="spin" /> Pensando...</div>
          </div>
        )}
        <div ref={endRef} />
      </div>
      <div className="chat-input-row">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Pregunta sobre el mercado inmobiliario..."
          className="chat-input"
        />
        <button className="btn-send" onClick={handleSend} disabled={loading || !input.trim()}>
          <Send />
        </button>
      </div>
    </div>
  );
}

/* ─── Properties View ─── */
function PropertiesView() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [sourceFilter, setSourceFilter] = useState("");
  const perPage = 8;

  useEffect(() => {
    setLoading(true);
    let url = `/api/backbone/properties?per_page=${perPage}&page=${page}`;
    if (sourceFilter) url += `&source=${sourceFilter}`;
    fetch(url)
      .then(r => r.json())
      .then(data => {
        if (data.data) setProperties(data.data);
        if (data.meta) setTotal(data.meta.total);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [page, sourceFilter]);

  const formatPrice = (price: string) => {
    const n = parseFloat(price);
    if (isNaN(n)) return price;
    return "$" + n.toLocaleString("es-MX") + " MXN";
  };

  return (
    <div className="dash-section">
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        <div className="form-group" style={{ flex: 1, minWidth: 200 }}>
          <input
            placeholder="Buscar propiedades por colonia o estado..."
            className="form-input"
            style={{ background: "var(--color-card)", borderColor: "var(--color-border)" }}
            onKeyDown={(e: any) => {
              if (e.key === "Enter") setSourceFilter(e.target.value);
            }}
          />
        </div>
        <span style={{ color: "var(--color-muted)", fontSize: "0.85rem", whiteSpace: "nowrap" }}>
          {total.toLocaleString()} propiedades indexadas
        </span>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "3rem 0" }}>
          <Loader2 className="spin" style={{ width: 32, height: 32, color: "var(--color-gold)", margin: "0 auto" }} />
        </div>
      ) : properties.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem 0", color: "var(--color-muted)" }}>
          <Building2 style={{ width: 48, height: 48, margin: "0 auto 1rem", opacity: 0.3 }} />
          <p>No se encontraron propiedades.</p>
        </div>
      ) : (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
            {properties.map((p: any) => (
              <div key={p.id} className="metric-card" style={{ padding: "1rem", cursor: "default" }}>
                <div style={{ fontSize: "0.75rem", color: "var(--color-muted-2)", marginBottom: "0.25rem", textTransform: "uppercase" }}>
                  {p.source}
                </div>
                <div style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.25rem", lineHeight: 1.3 }}>
                  {p.title?.substring(0, 60) || "Sin título"}
                </div>
                <div style={{ fontSize: "0.85rem", color: "var(--color-muted)", marginBottom: "0.5rem" }}>
                  {p.colony || p.municipality || p.state || p.address?.substring(0, 40) || "Ubicación no disponible"}
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "0.5rem" }}>
                  <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--color-gold)" }}>
                    {formatPrice(p.price)}
                  </span>
                  <span style={{ fontSize: "0.8rem", color: "var(--color-muted-2)" }}>
                    {p.property_type || "N/A"}
                  </span>
                </div>
                <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem", fontSize: "0.8rem", color: "var(--color-muted)" }}>
                  {p.bedrooms > 0 && <span>🛏️ {p.bedrooms}</span>}
                  {p.bathrooms > 0 && <span>🚿 {p.bathrooms}</span>}
                  {p.m2_constructed && <span>📐 {parseFloat(p.m2_constructed).toFixed(0)} m²</span>}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", marginTop: "1.5rem" }}>
            <button
              className="btn-secondary"
              disabled={page <= 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
            >
              ← Anterior
            </button>
            <span style={{ fontSize: "0.85rem", color: "var(--color-muted)" }}>
              Página {page}
            </span>
            <button
              className="btn-secondary"
              disabled={properties.length < perPage}
              onClick={() => setPage(p => p + 1)}
            >
              Siguiente →
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* ─── Analysis View ─── */
function AnalysisView() {
  const [marketData, setMarketData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [zone, setZone] = useState("");

  useEffect(() => {
    fetch("/api/market/trends")
      .then(r => r.json())
      .then(data => {
        if (data.success) setMarketData(data.market);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = () => {
    setLoading(true);
    fetch(`/api/market/trends?zone=${encodeURIComponent(zone)}`)
      .then(r => r.json())
      .then(data => {
        if (data.success) setMarketData(data.market);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const fmt = (n: number) => "$" + Math.round(n).toLocaleString("es-MX") + " MXN";

  return (
    <div className="dash-section">
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
          <input
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Buscar por zona (colonia, municipio)..."
            className="form-input"
            style={{ flex: 1, background: "var(--color-card)", borderColor: "var(--color-border)" }}
          />
          <button className="btn-primary" onClick={handleSearch} style={{ padding: "0.5rem 1rem" }}>
            Analizar
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "3rem 0" }}>
          <Loader2 className="spin" style={{ width: 32, height: 32, color: "var(--color-gold)", margin: "0 auto" }} />
        </div>
      ) : marketData ? (
        <>
          <div className="metrics-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}>
            <div className="metric-card" style={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12, padding: "1.25rem" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--color-muted)", fontWeight: 500, marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>Propiedades</div>
              <div style={{ fontFamily: "var(--font-display, Space Grotesk)", fontSize: "1.75rem", fontWeight: 700, color: "var(--color-gold)" }}>{marketData.total_properties?.toLocaleString()}</div>
            </div>
            <div className="metric-card" style={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12, padding: "1.25rem" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--color-muted)", fontWeight: 500, marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>Precio Promedio</div>
              <div style={{ fontFamily: "var(--font-display, Space Grotesk)", fontSize: "1.75rem", fontWeight: 700, color: "var(--color-gold)" }}>{fmt(marketData.analysis?.avg_price || 0)}</div>
            </div>
            <div className="metric-card" style={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12, padding: "1.25rem" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--color-muted)", fontWeight: 500, marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>Mediana</div>
              <div style={{ fontFamily: "var(--font-display, Space Grotesk)", fontSize: "1.75rem", fontWeight: 700, color: "var(--color-gold)" }}>{fmt(marketData.analysis?.median_price || 0)}</div>
            </div>
            <div className="metric-card" style={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12, padding: "1.25rem" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--color-muted)", fontWeight: 500, marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>Rango</div>
              <div style={{ fontFamily: "var(--font-display, Space Grotesk)", fontSize: "1.1rem", fontWeight: 600, color: "var(--color-fg)" }}>
                {fmt(marketData.analysis?.min_price || 0)} — {fmt(marketData.analysis?.max_price || 0)}
              </div>
            </div>
          </div>

          {marketData.distribution?.by_type && (
            <div className="metric-card" style={{ marginTop: "1rem", background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12, padding: "1.25rem" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.75rem" }}>Distribución por Tipo</h3>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                {Object.entries(marketData.distribution.by_type).map(([type, count]: any) => (
                  <span key={type} style={{ background: "rgba(245,158,11,0.1)", color: "var(--color-gold)", padding: "0.3rem 0.75rem", borderRadius: 100, fontSize: "0.8rem" }}>
                    {type}: {count}
                  </span>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div style={{ textAlign: "center", padding: "3rem 0", color: "var(--color-muted)" }}>
          <TrendingUp style={{ width: 48, height: 48, margin: "0 auto 1rem", opacity: 0.3 }} />
          <p>No hay datos disponibles para esta zona.</p>
        </div>
      )}
    </div>
  );
}

/* ─── Info View ─── */
function InfoView({ user, stats }: { user: any; stats: any }) {
  const name = user?.name || user?.email?.split("@")[0] || "Usuario";
  const firstName = name.split(" ")[0];

  return (
    <>
      <div className="dash-welcome">
        <h1>Bienvenido de nuevo, {firstName}</h1>
        <p>Estos son tus resultados en el ecosistema.</p>
      </div>

      <div className="metrics-grid">
        <div className="metric-card metric-gold">
          <div className="metric-icon"><Zap /></div>
          <div className="metric-val">{stats.credits}</div>
          <div className="metric-label">Créditos</div>
          <div className="metric-sub">disponibles</div>
        </div>
        <div className="metric-card metric-blue">
          <div className="metric-icon"><Building2 /></div>
          <div className="metric-val">{stats.properties}</div>
          <div className="metric-label">Propiedades</div>
          <div className="metric-sub">en BACKBONE</div>
        </div>
        <div className="metric-card metric-green">
          <div className="metric-icon"><MessageSquare /></div>
          <div className="metric-val">{stats.chats}</div>
          <div className="metric-label">Conversaciones</div>
          <div className="metric-sub">con Thuban IA</div>
        </div>
        <div className="metric-card metric-gold">
          <div className="metric-icon"><Clock /></div>
          <div className="metric-val">12h</div>
          <div className="metric-label">Tiempo Ahorrado</div>
          <div className="metric-sub">vs hacerlo manual</div>
        </div>
      </div>

      <div className="dash-section">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Conversaciones Recientes</h2>
          <button
            onClick={() => {/* navigate to chat handled by parent */}}
            style={{ background: "none", border: "none", color: "var(--color-gold)", cursor: "pointer", fontSize: "0.85rem", fontFamily: "inherit" }}
          >
            Ir al Chat →
          </button>
        </div>
        <div className="chat-list">
          {[
            { title: "Bienvenido a Thuban", preview: "Esta es tu primera conversación con Thuban IA. Haz cualquier pregunta sobre el mercado inmobiliario.", time: "Ahora", status: "Nueva" },
          ].map((chat) => (
            <div
              key={chat.title}
              className="chat-item"
              onClick={() => window.location.href = "#chat"}
              style={{ cursor: "pointer" }}
            >
              <div className="chat-item-main">
                <div className="chat-item-title">{chat.title}</div>
                <div className="chat-item-preview">{chat.preview}</div>
              </div>
              <div className="chat-item-meta">
                <span className="chat-item-time">{chat.time}</span>
                <span className={`chat-item-status status-${chat.status.toLowerCase()}`}>{chat.status}</span>
                <ChevronRight />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ─── Settings View ─── */
function SettingsView({ user }: { user: any }) {
  return (
    <div className="dash-section">
      <div className="dash-section" style={{ maxWidth: 480 }}>
        <div className="form-group" style={{ marginBottom: "1rem" }}>
          <label>Correo electrónico</label>
          <input className="form-input" value={user?.email || ""} readOnly style={{ background: "var(--color-card)" }} />
        </div>
        <div className="form-group" style={{ marginBottom: "1rem" }}>
          <label>Plan actual</label>
          <input className="form-input" value="Free" readOnly style={{ background: "var(--color-card)" }} />
        </div>
        <div style={{ marginTop: "2rem" }}>
          <Link href="/">
            <button className="btn-secondary">Volver al inicio</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── Dashboard Page ─── */
export default function DashboardPage() {
  const [sidebar, setSidebar] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>("chat");
  const { user, loading } = useAuth();
  const stats = useStats();

  const handleLogout = () => {
    localStorage.removeItem("thuban_token");
    localStorage.removeItem("thuban_user");
    window.location.href = "/login";
  };

  const handleNavigate = (section: Section) => {
    setActiveSection(section);
    setSidebar(false);
  };

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "var(--color-bg)" }}>
        <Loader2 className="spin" style={{ width: 32, height: 32, color: "var(--color-gold)" }} />
      </div>
    );
  }

  const name = user?.name || user?.email?.split("@")[0] || "Usuario";
  const initial = name.charAt(0).toUpperCase();
  const firstName = name.split(" ")[0];

  return (
    <div className="dash-layout">
      {/* ─── Sidebar ─── */}
      <aside className={`dash-sidebar ${sidebar ? "open" : ""}`}>
        <div className="sidebar-header">
          <Link href="/" className="sidebar-logo"><Star /> Thuban</Link>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className={`sidebar-item ${activeSection === item.id ? "active" : ""}`}
              style={{ width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: "0.875rem" }}
            >
              {item.icon} <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="sidebar-credits"><Zap /> <span><strong>{stats.credits}</strong> créditos disponibles</span></div>
          <button onClick={handleLogout} className="sidebar-logout" style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--color-muted)", padding: 0 }}>
            <LogOut /> Cerrar Sesión
          </button>
        </div>
      </aside>
      {sidebar && <div className="sidebar-overlay" onClick={() => setSidebar(false)} />}

      {/* ─── Main Content ─── */}
      <div className="dash-main">
        <header className="dash-topbar">
          <button className="dash-menu-btn" onClick={() => setSidebar(true)} style={{ background: "none", border: "none", color: "var(--color-fg)", cursor: "pointer" }}>
            <Menu />
          </button>
          <div style={{ fontSize: "0.9rem", color: "var(--color-muted)" }}>
            {navItems.find(n => n.id === activeSection)?.label || "Dashboard"}
          </div>
          <div className="dash-top-right">
            <button className="dash-notif" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-muted)", position: "relative" }}>
              <Bell />
            </button>
            <div className="dash-avatar" title={name}>{initial}</div>
          </div>
        </header>

        <div className="dash-content">
          {/* ─── CHAT (default) ─── */}
          {activeSection === "chat" && (
            <div className="dash-section">
              <div className="dash-welcome">
                <h1>Chat con Thuban IA</h1>
                <p>Pregunta sobre el mercado inmobiliario, propiedades, tendencias y más. Datos en tiempo real de BACKBONE.</p>
              </div>
              <ChatView />
            </div>
          )}

          {/* ─── PROPIEDADES ─── */}
          {activeSection === "propiedades" && (
            <div className="dash-section">
              <div className="dash-welcome">
                <h1>Propiedades</h1>
                <p>Explora propiedades indexadas desde BACKBONE.</p>
              </div>
              <PropertiesView />
            </div>
          )}

          {/* ─── ANÁLISIS ─── */}
          {activeSection === "analisis" && (
            <div className="dash-section">
              <div className="dash-welcome">
                <h1>Análisis de Mercado</h1>
                <p>Tendencias, estadísticas y oportunidades de inversión. Datos en tiempo real de BACKBONE.</p>
              </div>
              <AnalysisView />
            </div>
          )}

          {/* ─── INFO ─── */}
          {activeSection === "info" && (
            <div className="dash-section">
              <InfoView user={user} stats={stats} />
            </div>
          )}

          {/* ─── CONFIGURACIÓN ─── */}
          {activeSection === "configuracion" && (
            <div className="dash-section">
              <div className="dash-welcome">
                <h1>Configuración</h1>
                <p>Administra tu cuenta y preferencias.</p>
              </div>
              <SettingsView user={user} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
