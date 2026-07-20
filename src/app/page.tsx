"use client";

import { Star, Sparkles, ArrowRight, MessageSquare, TrendingUp, Shield, Users, Building2, Zap, Menu, X, ChevronRight, Send, Check, Loader2 } from "lucide-react";
import { APP_CONFIG } from "@/lib/config";
import { useState, useEffect, useRef } from "react";

// ─── Header ───
function Header() {
  const [menu, setMenu] = useState(false);
  return (
    <header className="header" id="header">
      <div className="wrap">
        <a href="/" className="logo">
          <Star className="star-icon" />
          <span>Thuban</span>
        </a>
        <nav className="nav-desktop">
          <a href="#features">Funciones</a>
          <a href="#pricing">Precios</a>
          <a href="/login" className="nav-cta">Iniciar Sesión</a>
          <a href="/signup"><button className="btn-primary">Comenzar Gratis</button></a>
        </nav>
        <button className="menu-btn" onClick={() => setMenu(!menu)} aria-label="Menú">
          {menu ? <X /> : <Menu />}
        </button>
      </div>
      {menu && (
        <div className="nav-mobile">
          <a href="#features" onClick={() => setMenu(false)}>Funciones</a>
          <a href="#pricing" onClick={() => setMenu(false)}>Precios</a>
          <a href="/login" onClick={() => setMenu(false)}>Iniciar Sesión</a>
          <a href="/signup" onClick={() => setMenu(false)}><button className="btn-primary" style={{width:'100%'}}>Comenzar Gratis</button></a>
        </div>
      )}
    </header>
  );
}

// ─── Hero ───
function Hero() {
  return (
    <section className="hero hero-bg" id="hero">
      <div className="hero-glow" />
      <div className="hero-content">
        <div className="hero-badge">
          <Sparkles className="badge-icon" />
          <span>Powered by Polaris by Visionnorth</span>
        </div>
        <h1 className="hero-title">
          Inteligencia Artificial para <span className="gold">Bienes Raíces</span>
        </h1>
        <p className="hero-sub">{APP_CONFIG.slogan}. Genera descripciones, analiza mercados, mejora tus negociaciones y atiende clientes como nunca antes.</p>
        <div className="hero-actions">
          <a href="/signup"><button className="btn-primary btn-lg">Empieza con {APP_CONFIG.freeCredits} Créditos Gratis <ArrowRight /></button></a>
          <a href="/login"><button className="btn-secondary btn-lg">Ya tengo cuenta</button></a>
        </div>
      </div>
    </section>
  );
}

// ─── Feature Card ───
function FeatureCard({ icon, title, desc, idx }: { icon: React.ReactNode; title: string; desc: string; idx: number }) {
  return (
    <div className="feature-card" style={{ animationDelay: `${idx * 0.1}s` }}>
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

// ─── Features ───
function Features() {
  const features = [
    { icon: <MessageSquare />, title: "Descripciones de Propiedades", desc: "Genera descripciones profesionales y atractivas para tus listings en segundos." },
    { icon: <TrendingUp />, title: "Análisis de Mercado", desc: "Obtén insights sobre tendencias, precios y oportunidades de inversión." },
    { icon: <Shield />, title: "Negociación Inmobiliaria", desc: "Estrategias y técnicas para cerrar los mejores tratos con confianza." },
    { icon: <Users />, title: "Atención a Clientes", desc: "Respuestas profesionales y seguimiento efectivo para cada prospecto." },
  ];
  return (
    <section className="section" id="features">
      <div className="wrap">
        <div className="section-header">
          <h2>4 herramientas, un solo asistente</h2>
          <p>Todo lo que necesitas para destacar en el mercado inmobiliario mexicano y latinoamericano.</p>
        </div>
        <div className="features-grid">
          {features.map((f, i) => <FeatureCard key={f.title} icon={f.icon} title={f.title} desc={f.desc} idx={i} />)}
        </div>
      </div>
    </section>
  );
}

// ─── Stats ───
function Stats() {
  const [data, setData] = useState({ total: "101,357+", sources: "10" });
  useEffect(() => {
    fetch("/api/backbone/properties?per_page=1")
      .then(r => r.json())
      .then(d => {
        if (d?.meta?.total) setData({
          total: d.meta.total.toLocaleString() + "+",
          sources: (d.meta.sources?.length || 10).toString(),
        });
      })
      .catch(() => {});
  }, []);
  const stats = [
    { icon: <Building2 />, val: data.total, label: "Propiedades Indexadas" },
    { icon: <Zap />, val: data.sources, label: "Fuentes de Datos" },
    { icon: <Star />, val: "LATAM", label: "Mercado Especializado" },
  ];
  return (
    <section className="section stats-section">
      <div className="wrap">
        <div className="stats-grid">
          {stats.map((s) => (
            <div key={s.label} className="stat-card">
              <div className="stat-icon">{s.icon}</div>
              <div className="stat-val">{s.val}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Chat Demo ───
function ChatDemo() {
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
      setMessages((m) => [...m, { role: "ai", text: data.reply || "Lo siento, no pude procesar tu solicitud." }]);
    } catch {
      setMessages((m) => [...m, { role: "ai", text: "Error de conexión. Intenta de nuevo." }]);
    }
    setLoading(false);
  };

  return (
    <section className="section" id="chat">
      <div className="wrap">
        <div className="section-header">
          <h2>Prueba Thuban ahora</h2>
          <p>Conversa con nuestra IA especializada en bienes raíces.</p>
        </div>
        <div className="chat-demo-card">
          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.role}`}>
                <div className="chat-avatar">{m.role === "ai" ? <Star /> : <Users />}</div>
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
      </div>
    </section>
  );
}

// ─── Pricing ───
function Pricing() {
  const plans = [
    { name: "Free", price: "$0", desc: "Para empezar", features: ["100 consultas/mes", "1 fuente de datos", "Descripciones IA", "Soporte email"], cta: "Comenzar Gratis", featured: false },
    { name: "Pro", price: "$299", desc: "/mes", features: ["10,000 consultas/mes", "Todas las fuentes", "Análisis de mercado", "Chat IA ilimitado", "Soporte prioritario"], cta: "Probar Gratis", featured: true },
    { name: "Enterprise", price: "$999", desc: "/mes", features: ["Consultas ilimitadas", "API dedicada", "Integración GHL", "Onboarding personalizado", "SLA 99.9%"], cta: "Contactar", featured: false },
  ];
  return (
    <section className="section" id="pricing">
      <div className="wrap">
        <div className="section-header">
          <h2>Planes transparentes</h2>
          <p>Empieza gratis y escala cuando lo necesites.</p>
        </div>
        <div className="pricing-grid">
          {plans.map((p) => (
            <div key={p.name} className={`pricing-card ${p.featured ? "featured" : ""}`}>
              {p.featured && <div className="pricing-badge">Más popular</div>}
              <h3>{p.name}</h3>
              <div className="pricing-price"><span className="price-val">{p.price}</span><span className="price-desc">{p.desc}</span></div>
              <ul className="pricing-features">{p.features.map((f) => <li key={f}><Check /> {f}</li>)}</ul>
              {p.name === "Enterprise" ? (
                <button className="btn-secondary" style={{ width: "100%" }}>{p.cta}</button>
              ) : (
                <a href="/signup" style={{ width: "100%" }}>
                  <button className={`btn-${p.featured ? "primary" : "secondary"}`} style={{ width: "100%" }}>{p.cta}</button>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ───
function CTA() {
  return (
    <section className="cta-section">
      <div className="wrap">
        <h2>¿Listo para transformar tu negocio inmobiliario?</h2>
        <p>Únete a los profesionales que ya usan Thuban para potenciar sus resultados.</p>
        <a href="/signup"><button className="btn-primary btn-lg">Empieza Gratis <ArrowRight /></button></a>
      </div>
    </section>
  );
}

// ─── Footer ───
function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-main">
          <div className="footer-brand">
            <Star />
            <span className="footer-name">Thuban</span>
            <span className="footer-by">by Polaris Visionnorth</span>
          </div>
          <div className="footer-links">
            <a href="https://back-bone.dev">BACKBONE</a>
            <a href="https://polaris.pw">Polaris</a>
            <a href="https://visionnorth.mx">VisionNorth</a>
            <a href="https://astra.visionnorth.mx">Astra</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Thuban. Todos los derechos reservados.</span>
          <span className="footer-heart">Hecho con ❤️ en México</span>
        </div>
      </div>
    </footer>
  );
}

// ─── Intersection Observer ───
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ─── Page ───
export default function Home() {
  useReveal();
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Stats />
        <ChatDemo />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </>
  );
}