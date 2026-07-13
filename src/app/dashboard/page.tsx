"use client";

import { Star, MessageSquare, Building2, TrendingUp, Settings, LogOut, Bell, Menu, Zap, Clock, ChevronRight, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

const navItems = [
  { icon: <Star />, label: "Inicio", active: true },
  { icon: <MessageSquare />, label: "Chat", active: false },
  { icon: <Building2 />, label: "Propiedades", active: false },
  { icon: <TrendingUp />, label: "Análisis", active: false },
  { icon: <Settings />, label: "Configuración", active: false },
];

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

function useStats() {
  const [stats, setStats] = useState({ properties: "—", chats: "—", credits: "—" });

  useEffect(() => {
    Promise.all([
      fetch("/api/backbone/properties?per_page=1").then(r => r.json()),
    ])
      .then(([props]) => {
        setStats({
          properties: props?.meta?.total?.toLocaleString() || "—",
          chats: "8",
          credits: "5",
        });
      })
      .catch(() => {});
  }, []);

  return stats;
}

export default function DashboardPage() {
  const [sidebar, setSidebar] = useState(false);
  const { user, loading } = useAuth();
  const stats = useStats();

  const handleLogout = () => {
    localStorage.removeItem("thuban_token");
    localStorage.removeItem("thuban_user");
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "var(--bg)" }}>
        <Loader2 className="spin" style={{ width: 32, height: 32, color: "var(--gold)" }} />
      </div>
    );
  }

  const name = user?.name || user?.email?.split("@")[0] || "Usuario";

  return (
    <div className="dash-layout">
      <aside className={`dash-sidebar ${sidebar ? "open" : ""}`}>
        <div className="sidebar-header">
          <Link href="/" className="sidebar-logo"><Star /> Thuban</Link>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <a key={item.label} href="#" className={`sidebar-item ${item.active ? "active" : ""}`}>
              {item.icon} <span>{item.label}</span>
            </a>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="sidebar-credits"><Zap /> <span><strong>{stats.credits}</strong> créditos disponibles</span></div>
          <a href="#" className="sidebar-logout" onClick={(e) => { e.preventDefault(); handleLogout(); }}>
            <LogOut /> Cerrar Sesión
          </a>
        </div>
      </aside>
      {sidebar && <div className="sidebar-overlay" onClick={() => setSidebar(false)} />}

      <div className="dash-main">
        <header className="dash-topbar">
          <button className="dash-menu-btn" onClick={() => setSidebar(true)}><Menu /></button>
          <div className="dash-top-right">
            <button className="dash-notif"><Bell /></button>
            <div className="dash-avatar">{name.charAt(0).toUpperCase()}</div>
          </div>
        </header>

        <div className="dash-content">
          <div className="dash-welcome">
            <h1>Bienvenido de nuevo, {name.split(" ")[0]}</h1>
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
            <h2>Conversaciones Recientes</h2>
            <div className="chat-list">
              {[
                { title: "Bienvenido a Thuban", preview: "Esta es tu primera conversación con Thuban IA. Haz cualquier pregunta sobre el mercado inmobiliario.", time: "Ahora", status: "Nueva" },
              ].map((chat) => (
                <div key={chat.title} className="chat-item">
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
        </div>
      </div>
    </div>
  );
}