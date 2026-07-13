"use client";

import { Star, Sparkles, ArrowRight, MessageSquare, TrendingUp, Shield, Users, Building2, Zap, Menu, X } from "lucide-react";
import { APP_CONFIG } from "@/lib/config";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 no-underline">
          <Star className="h-6 w-6 text-gold" />
          <span className="font-display text-xl font-bold tracking-tight text-foreground">Thuban</span>
        </a>
        <nav className="hidden md:flex items-center gap-6">
          <a href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors no-underline">Iniciar Sesión</a>
          <a href="/signup">
            <button className="text-sm font-semibold px-5 py-2.5 rounded-lg gold-gradient">Comenzar Gratis</button>
          </a>
        </nav>
        <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menú">
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden border-t border-border/50 bg-card px-6 py-4 flex flex-col gap-4">
          <a href="/login" className="text-sm text-muted-foreground no-underline" onClick={() => setMenuOpen(false)}>Iniciar Sesión</a>
          <a href="/signup" onClick={() => setMenuOpen(false)}>
            <button className="w-full text-sm font-semibold px-5 py-2.5 rounded-lg gold-gradient">Comenzar Gratis</button>
          </a>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden pt-24">
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue/10 rounded-full blur-3xl" />
      </div>
      <div className="max-w-[1200px] mx-auto px-6 text-center relative z-10 py-24">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 mb-8">
          <Sparkles className="h-4 w-4 text-gold" />
          <span className="text-sm text-gold">Powered by Polaris by Visionnorth</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
          Inteligencia Artificial para{" "}
          <span className="text-gold">Bienes Raíces</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          {APP_CONFIG.slogan}. Genera descripciones, analiza mercados, mejora tus negociaciones y atiende clientes como nunca antes.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="/signup">
            <button className="inline-flex items-center gap-2 h-12 px-8 rounded-xl gold-gradient text-base font-semibold">
              Empieza con {APP_CONFIG.freeCredits} Créditos Gratis
              <ArrowRight className="h-5 w-5" />
            </button>
          </a>
          <a href="/login">
            <button className="inline-flex items-center h-12 px-8 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-border-light transition-colors bg-transparent text-base">
              Ya tengo cuenta
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description, index }: { icon: React.ReactNode; title: string; description: string; index: number }) {
  return (
    <div className="group rounded-xl border border-border bg-card p-8 flex gap-5 hover:border-gold/20 hover:-translate-y-0.5 transition-all duration-300">
      <div className="mt-1 text-gold flex-shrink-0">{icon}</div>
      <div>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function StatsBar() {
  const stats = [
    { icon: <Building2 className="h-8 w-8 text-gold" />, title: "Especializado", desc: "Sector Inmobiliario" },
    { icon: <Zap className="h-8 w-8 text-gold" />, title: "Instantáneas", desc: "Respuestas" },
    { icon: <Star className="h-8 w-8 text-gold" />, title: "LATAM", desc: "Mercado" },
  ];
  return (
    <section className="py-20 border-t border-border/50">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
          {stats.map((s) => (
            <div key={s.title} className="flex flex-col items-center gap-3">
              {s.icon}
              <div className="text-2xl font-bold">{s.title}</div>
              <div className="text-sm text-muted-foreground">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/50 py-10">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 text-gold" />
          <span className="font-semibold">Thuban</span>
          <span className="text-xs text-muted-foreground">by Polaris Visionnorth</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <a href="https://back-bone.dev" className="hover:text-foreground no-underline transition-colors">BACKBONE</a>
          <a href="https://polaris.pw" className="hover:text-foreground no-underline transition-colors">Polaris</a>
          <a href="https://visionnorth.mx" className="hover:text-foreground no-underline transition-colors">VisionNorth</a>
          <span className="text-border">|</span>
          <span>© {new Date().getFullYear()} Thuban</span>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  const iconMap: Record<string, React.ReactNode> = {
    MessageSquare: <MessageSquare className="h-7 w-7" />,
    TrendingUp: <TrendingUp className="h-7 w-7" />,
    Shield: <Shield className="h-7 w-7" />,
    Users: <Users className="h-7 w-7" />,
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              4 herramientas, un solo asistente
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Todo lo que necesitas para destacar en el mercado inmobiliario mexicano y latinoamericano.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {APP_CONFIG.features.map((f, i) => (
              <FeatureCard key={f.title} icon={iconMap[f.icon]} title={f.title} description={f.description} index={i} />
            ))}
          </div>
        </div>
      </section>

      <StatsBar />
      <Footer />
    </div>
  );
}
