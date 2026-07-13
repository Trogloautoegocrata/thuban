"use client";

import { Star, MessageSquare, Building2, TrendingUp, Settings, LogOut, Bell, Menu, X, Zap, Clock, CheckCircle, ChevronRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const navItems = [
  { icon: <Star />, label: "Inicio", active: true },
  { icon: <MessageSquare />, label: "Chat", active: false },
  { icon: <Building2 />, label: "Propiedades", active: false },
  { icon: <TrendingUp />, label: "Análisis", active: false },
  { icon: <Settings />, label: "Configuración", active: false },
];

const metrics = [
  { icon: <Zap />, val: "5", label: "Créditos", sub: "de 5 disponibles", color: "gold" },
  { icon: <Building2 />, val: "12", label: "Propiedades", sub: "analizadas este mes", color: "blue" },
  { icon: <MessageSquare />, val: "8", label: "Conversaciones", sub: "con Thuban IA", color: "green" },
  { icon: <Clock />, val: "3h", label: "Tiempo Ahorrado", sub: "vs hacerlo manual", color: "gold" },
];

const recentChats = [
  { title: "Descripción de departamento en Condesa", preview: "Departamento de 2 recámaras con vista panorámica...", time: "Hace 2h", status: "Completado" },
  { title: "Análisis de mercado Roma Norte", preview: "Precio promedio $4.2M MXN, incremento 12% vs trimestre anterior...", time: "Hace 5h", status: "Completado" },
  { title: "Estrategia de negociación para cliente", preview: "Perfil del comprador: familia joven, presupuesto $3.5-4.5M...", time: "Ayer", status: "Pendiente" },
];

export default function DashboardPage() {
  const [sidebar, setSidebar] = useState(false);

  return (
    <div className="dash-layout">
      {/* Sidebar */}
      <aside className={`dash-sidebar ${sidebar ? "open" : ""}`}>
        <div className="sidebar-header">
          <Link href="/" className="sidebar-logo"><Star /> Thuban</Link>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <a key={item.label} href="#" className={`sidebar-item ${item.active ? "active" : ""}`}>
              {item.icon}
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="sidebar-credits">
            <Zap />
            <span><strong>5</strong> créditos disponibles</span>
          </div>
          <a href="/login" className="sidebar-logout"><LogOut /> Cerrar Sesión</a>
        </div>
      </aside>
      {sidebar && <div className="sidebar-overlay" onClick={() => setSidebar(false)} />}

      {/* Main */}
      <div className="dash-main">
        {/* Topbar */}
        <header className="dash-topbar">
          <button className="dash-menu-btn" onClick={() => setSidebar(true)}><Menu /></button>
          <div className="dash-top-right">
            <button className="dash-notif"><Bell /></button>
            <div className="dash-avatar">JP</div>
          </div>
        </header>

        <div className="dash-content">
          <div className="dash-welcome">
            <h1>Bienvenido de nuevo, Juan</h1>
            <p>Estos son tus resultados de hoy.</p>
          </div>

          {/* Metrics */}
          <div className="metrics-grid">
            {metrics.map((m) => (
              <div key={m.label} className={`metric-card metric-${m.color}`}>
                <div className="metric-icon">{m.icon}</div>
                <div className="metric-val">{m.val}</div>
                <div className="metric-label">{m.label}</div>
                <div className="metric-sub">{m.sub}</div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="dash-section">
            <h2>Conversaciones Recientes</h2>
            <div className="chat-list">
              {recentChats.map((chat) => (
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
