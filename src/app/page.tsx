"use client";

import { Star, Sparkles, Menu, X, Send, Loader2, Check } from "lucide-react";
import { APP_CONFIG } from "@/lib/config";
import { useState, useEffect, useRef } from "react";

/* ─── Icons inline (para las features) ─── */
function CameraIcon() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-2l-2-2H9L7 7H5a2 2 0 00-2 2z"/><circle cx="12" cy="13" r="3"/></svg>; }
function TrendingIcon() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>; }
function ShieldIcon() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>; }
function UsersIcon() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>; }
function CheckIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>; }

/* ─── Secciones ─── */

function Header() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`navbar${scrolled ? " scrolled" : ""}`} id="navbar">
      <div className="navbar-inner">
        <a href="/" className="nav-logo" aria-label="Thuban — Ir al inicio">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <rect width="28" height="28" rx="8" fill="#f59e0b"/>
            <text x="14" y="20" textAnchor="middle" fontFamily="'Space Grotesk',sans-serif" fontWeight="700" fontSize="16" fill="#0a0a0f">T</text>
          </svg>
          Thuban
        </a>
        <nav className="nav-links" aria-label="Navegación principal">
          <a href="#features">Funciones</a>
          <a href="#precios">Precios</a>
        </nav>
        <div className="nav-cta">
          <a href="/login" className="btn btn-secondary">Iniciar Sesión</a>
          <a href="/signup" className="btn btn-primary">Comenzar Gratis</a>
          <button className="hamburger" onClick={() => setMenu(true)} aria-label="Abrir menú">
            <Menu />
          </button>
        </div>
      </div>
      {menu && (
        <div className="mobile-menu">
          <div className="mobile-menu-header">
            <a href="/" className="nav-logo">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <rect width="28" height="28" rx="8" fill="#f59e0b"/>
                <text x="14" y="20" textAnchor="middle" fontFamily="'Space Grotesk',sans-serif" fontWeight="700" fontSize="16" fill="#0a0a0f">T</text>
              </svg>
              Thuban
            </a>
            <button className="mobile-menu-close" onClick={() => setMenu(false)} aria-label="Cerrar menú">
              <X />
            </button>
          </div>
          <nav aria-label="Menú principal">
            <a href="#features" onClick={() => setMenu(false)}>Funciones</a>
            <a href="#precios" onClick={() => setMenu(false)}>Precios</a>
            <a href="/login" onClick={() => setMenu(false)}>Iniciar Sesión</a>
            <a href="/signup" onClick={() => setMenu(false)}>Comenzar Gratis</a>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" data-od-id="hero">
      <div className="container-narrow">
        <div className="eyebrow reveal">
          <Sparkles className="badge-icon" />
          <span>Powered by Polaris by Visionnorth</span>
        </div>
        <h1 className="reveal" style={{ transitionDelay: "0.1s" }}>Inteligencia Artificial para <span className="gold">Bienes Raíces</span></h1>
        <p className="reveal" style={{ transitionDelay: "0.2s" }}>Potencia tu negocio inmobiliario con IA especializada. Genera descripciones, analiza mercados, mejora tus negociaciones y atiende clientes como nunca antes.</p>
        <div className="hero-buttons reveal" style={{ transitionDelay: "0.3s" }}>
          <a href="/signup" className="btn btn-primary">Comenzar Gratis</a>
          <a href="/login" className="btn btn-secondary">Iniciar Sesión</a>
        </div>
        <p className="hero-note reveal" style={{ transitionDelay: "0.4s" }}>5 créditos gratis al registrarte</p>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { icon: <CameraIcon />, title: "Descripciones de Propiedades", desc: "Genera descripciones profesionales para tus listings en segundos." },
    { icon: <TrendingIcon />, title: "Análisis de Mercado", desc: "Obtén insights sobre tendencias, precios y oportunidades de inversión con datos reales de BACKBONE." },
    { icon: <ShieldIcon />, title: "Negociación Inmobiliaria", desc: "Estrategias y técnicas para cerrar los mejores tratos con confianza." },
    { icon: <UsersIcon />, title: "Atención a Clientes", desc: "Respuestas profesionales y seguimiento efectivo para cada prospecto." },
  ];

  return (
    <section id="features" data-od-id="features-section">
      <div className="container">
        <div className="text-center mb-4">
          <p className="section-label reveal">Funciones</p>
          <h2 className="section-title reveal" style={{ transitionDelay: "0.1s" }}>4 herramientas, un solo asistente</h2>
          <p className="section-subtitle mx-auto reveal" style={{ transitionDelay: "0.15s" }}>Todo lo que necesitas para destacar en el mercado inmobiliario mexicano y latinoamericano.</p>
        </div>
        <div className="features-grid">
          {features.map((f, i) => (
            <article key={i} className="feature-card reveal" style={{ transitionDelay: `${0.1 + i * 0.1}s` }}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section data-od-id="stats-section">
      <div className="container-narrow">
        <div className="text-center mb-4">
          <p className="section-label reveal">Datos en tiempo real</p>
          <h2 className="section-title reveal" style={{ transitionDelay: "0.1s" }}>El poder de BACKBONE</h2>
        </div>
        <div className="stats-grid">
          <div className="stat-card reveal" style={{ transitionDelay: "0.15s" }}>
            <p className="stat-number">101,971+</p>
            <p className="stat-label">Propiedades Indexadas</p>
          </div>
          <div className="stat-card reveal" style={{ transitionDelay: "0.25s" }}>
            <p className="stat-number">10</p>
            <p className="stat-label">Fuentes de Datos</p>
          </div>
          <div className="stat-card reveal" style={{ transitionDelay: "0.35s" }}>
            <p className="stat-number">LATAM</p>
            <p className="stat-label">Mercado Especializado</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const DEMO_REPLIES = [
  "¡Claro! En estos momentos tengo más de 101,971 propiedades indexadas de 10 fuentes como Vivanuncios, Inmuebles24 y Lamudi. ¿Buscas algo en particular?",
  "El precio promedio en zonas como Polanco es de $9.5M MXN, con una mediana de $6.7M. Hay 54 departamentos y 37 casas disponibles. ¿Te interesa alguna zona en específico?",
  "Por supuesto. Las propiedades de 3 recámaras representan el 39% del inventario en zonas premium, seguidas de 2 recámaras con 23%. El ticket promedio es de $6.7M MXN.",
];

function ChatDemo() {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([
    { role: "ai", text: "¡Hola! Soy Thuban, tu asistente IA para bienes raíces. ¿En qué puedo ayudarte hoy?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [replyCount, setReplyCount] = useState(0);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleSend = () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((m) => [...m, { role: "user", text: userMsg }]);
    setLoading(true);
    const idx = replyCount % DEMO_REPLIES.length;
    setTimeout(() => {
      setMessages((m) => [...m, { role: "ai", text: DEMO_REPLIES[idx] }]);
      setReplyCount((c) => c + 1);
      setLoading(false);
    }, 1200);
  };

  return (
    <section data-od-id="chat-demo-section">
      <div className="container-narrow">
        <div className="text-center mb-4">
          <p className="section-label reveal">Prueba el chat</p>
          <h2 className="section-title reveal" style={{ transitionDelay: "0.1s" }}>Conversa con Thuban</h2>
          <p className="section-subtitle mx-auto reveal" style={{ transitionDelay: "0.15s" }}>Así de fácil es obtener respuestas sobre el mercado inmobiliario.</p>
        </div>
        <div className="chat-demo reveal" style={{ transitionDelay: "0.2s" }}>
          <div className="chat-window" data-od-id="chat-demo-window">
            <div className="chat-header">
              <span className="chat-header-dot"></span>
              <span className="chat-header-text">Thuban — Asistente IA</span>
            </div>
            <div className="chat-body">
              {messages.map((m, i) => (
                <div key={i} className={`chat-msg ${m.role}`}>
                  <div className={`chat-avatar ${m.role}-avatar`}>
                    {m.role === "ai" ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    )}
                  </div>
                  <div className="chat-bubble">{m.text}</div>
                </div>
              ))}
              {loading && (
                <div className="chat-msg ai">
                  <div className="chat-avatar ai-avatar">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  </div>
                  <div className="chat-bubble">
                    <span className="chat-typing">
                      <span></span><span></span><span></span>
                    </span>
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>
            <div className="chat-input-row">
              <input
                type="text"
                className="chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                disabled={loading}
                placeholder="Pregunta sobre el mercado inmobiliario..."
                aria-label="Escribe tu consulta"
              />
              <button className="chat-send" onClick={handleSend} disabled={loading || !input.trim()} aria-label="Enviar mensaje">
                <Send />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "/mes",
    featured: false,
    badge: null,
    features: ["100 consultas/mes", "1 fuente de datos", "Descripciones IA", "Soporte email"],
    cta: "Comenzar Gratis",
    href: "/signup",
    primary: false,
  },
  {
    name: "Pro",
    price: "$299",
    period: "/mes",
    featured: true,
    badge: "Más popular",
    features: ["10,000 consultas/mes", "Todas las fuentes", "Análisis de mercado", "Chat IA ilimitado", "Soporte prioritario"],
    cta: "Probar Gratis",
    href: "/signup",
    primary: true,
  },
  {
    name: "Enterprise",
    price: "$999",
    period: "/mes",
    featured: false,
    badge: null,
    features: ["Consultas ilimitadas", "API dedicada", "Integración GHL", "Onboarding personalizado", "SLA 99.9%"],
    cta: "Contactar",
    href: "mailto:legal@visionnorth.mx",
    primary: false,
  },
];

function Pricing() {
  return (
    <section id="precios" data-od-id="pricing-section">
      <div className="container">
        <div className="text-center mb-4">
          <p className="section-label reveal">Planes</p>
          <h2 className="section-title reveal" style={{ transitionDelay: "0.1s" }}>Elige tu plan</h2>
          <p className="section-subtitle mx-auto reveal" style={{ transitionDelay: "0.15s" }}>Empieza gratis. Escala cuando lo necesites.</p>
        </div>
        <div className="pricing-grid">
          {PLANS.map((plan, i) => (
            <div key={i} className={`pricing-card reveal${plan.featured ? " featured" : ""}`} style={{ transitionDelay: `${0.1 + i * 0.1}s` }}>
              {plan.badge && <span className="pricing-badge">{plan.badge}</span>}
              <p className="pricing-name">{plan.name}</p>
              <p className="pricing-price">{plan.price}<span>{plan.period}</span></p>
              <ul className="pricing-features">
                {plan.features.map((f, j) => (
                  <li key={j}>
                    <span style={{ color: "var(--success)", display: "flex" }}><CheckIcon /></span>
                    {f}
                  </li>
                ))}
              </ul>
              <a href={plan.href} className={`btn ${plan.primary ? "btn-primary" : "btn-secondary"}`} style={{ width: "100%", textAlign: "center" }}>{plan.cta}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="cta-section" data-od-id="cta-final-section">
      <div className="container-narrow reveal">
        <h2 className="section-title">¿Listo para transformar tu negocio inmobiliario?</h2>
        <p className="section-subtitle mx-auto">Únete a los profesionales que ya usan Thuban para potenciar sus resultados.</p>
        <a href="/signup" className="btn btn-primary" style={{ marginTop: "1rem" }}>Empieza Gratis</a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer" data-od-id="footer">
      <div className="footer-inner">
        <div>
          <div className="footer-brand">
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true"><rect width="28" height="28" rx="8" fill="#f59e0b"/><text x="14" y="20" textAnchor="middle" fontFamily="'Space Grotesk',sans-serif" fontWeight="700" fontSize="16" fill="#0a0a0f">T</text></svg>
            Thuban
          </div>
          <p className="footer-by">by Polaris Visionnorth</p>
        </div>
        <nav className="footer-links" aria-label="Enlaces externos">
          <a href="https://back-bone.dev" target="_blank" rel="noopener">BACKBONE</a>
          <a href="https://polaris.pw" target="_blank" rel="noopener">Polaris</a>
          <a href="https://visionnorth.mx" target="_blank" rel="noopener">VisionNorth</a>
          <a href="https://astra.visionnorth.mx" target="_blank" rel="noopener">Astra</a>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>&copy; 2026 Thuban. Todos los derechos reservados.</span>
        <div className="footer-bottom-legal">
          <a href="/aviso-legal">Aviso Legal</a>
          <a href="/privacidad">Privacidad</a>
        </div>
        <span>Hecho en México</span>
      </div>
    </footer>
  );
}

/* ─── Intersection Observer helper ─── */
function useRevealObserver() {
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    if (reveals.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    reveals.forEach((el) => observer.observe(el));
    const safety = setTimeout(() => {
      reveals.forEach((el) => el.classList.add("visible"));
    }, 3000);
    return () => {
      observer.disconnect();
      clearTimeout(safety);
    };
  }, []);
}

/* ─── Page ─── */
export default function HomePage() {
  useRevealObserver();

  return (
    <>
      <a href="#main" className="skip-link">Saltar al contenido</a>
      <Header />
      <main id="main">
        <Hero />
        <Features />
        <Stats />
        <ChatDemo />
        <Pricing />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
