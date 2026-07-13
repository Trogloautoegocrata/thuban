// src/app/page.tsx
"use client";

import { APP_CONFIG } from "@/lib/config";
import {
  Star,
  Sparkles,
  ArrowRight,
  MessageSquare,
  TrendingUp,
  Shield,
  Users,
  Building2,
  Zap,
} from "lucide-react";

export default function Home() {
  const iconMap: Record<string, React.ReactNode> = {
    MessageSquare: <MessageSquare className="h-7 w-7" />,
    TrendingUp: <TrendingUp className="h-7 w-7" />,
    Shield: <Shield className="h-7 w-7" />,
    Users: <Users className="h-7 w-7" />,
  };

  const colorMap: Record<string, string> = {
    "text-amber-400": "rgba(251,191,36,0.1)",
    "text-blue-400": "rgba(96,165,250,0.1)",
    "text-emerald-400": "rgba(52,211,153,0.1)",
    "text-orange-400": "rgba(251,146,60,0.1)",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="max-w-[1200px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="h-6 w-6 text-amber-400" />
            <span className="font-display text-xl font-bold tracking-tight">
              Thuban
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a href="/login">
              <button className="text-sm font-medium hover:bg-accent/10 px-4 py-2 rounded-md transition-colors">
                Iniciar Sesión
              </button>
            </a>
            <a href="/signup">
              <button className="text-sm font-semibold px-5 py-2 rounded-md gold-gradient">
                Comenzar Gratis
              </button>
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {/* Animated stars - 20 dots */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-amber-300 rounded-full"
              style={{
                left: `${(i * 5 + 3) % 100}%`,
                top: `${(i * 7 + 11) % 100}%`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>
        <div className="max-w-[1200px] mx-auto px-4 py-24 md:py-32 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 mb-6">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span className="text-sm text-amber-300">
              Powered by Polaris by Visionnorth
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Inteligencia Artificial para{" "}
            <span className="text-amber-400">Bienes Raíces</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            {APP_CONFIG.slogan}. Genera descripciones, analiza mercados, mejora
            tus negociaciones y atiende clientes como nunca antes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/signup">
              <button className="inline-flex items-center gap-2 h-11 rounded-lg text-base gold-gradient px-8">
                Empieza con {APP_CONFIG.freeCredits} Créditos Gratis
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </a>
            <a href="/login">
              <button className="inline-flex items-center h-11 rounded-lg text-base border border-gray-500 bg-transparent px-8 hover:bg-gray-800 transition-colors">
                Ya tengo cuenta
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-[1200px] mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-3">
            4 herramientas, un solo asistente
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            Todo lo que necesitas para destacar en el mercado inmobiliario
            mexicano y latinoamericano.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {APP_CONFIG.features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-lg border border-border bg-card p-6 flex gap-4 hover:shadow-lg transition-shadow duration-300"
            >
              <div
                className="mt-1"
                style={{
                  color: feature.color.replace("text-", ""),
                }}
              >
                {iconMap[feature.icon]}
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-muted/50 py-16">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: <Building2 className="h-8 w-8 text-amber-500" />,
                title: "Especializado",
                desc: "Sector Inmobiliario",
              },
              {
                icon: <Zap className="h-8 w-8 text-amber-500" />,
                title: "Instantáneas",
                desc: "Respuestas",
              },
              {
                icon: <Star className="h-8 w-8 text-amber-500" />,
                title: "LATAM",
                desc: "Mercado",
              },
            ].map((stat) => (
              <div
                key={stat.title}
                className="flex flex-col items-center gap-2"
              >
                {stat.icon}
                <div className="text-2xl font-bold">{stat.title}</div>
                <div className="text-sm text-gray-400">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="max-w-[1200px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-amber-400" />
            <span className="font-semibold">Thuban</span>
            <span className="text-xs text-gray-400">by Polaris Visionnorth</span>
          </div>
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Thuban. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
