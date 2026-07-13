// design/components/Header.tsx
// Thuban — Header component with logo navigation + auth CTAs
// Sticky, backdrop-blur, glassmorphism nav bar

"use client";

import { useState, useEffect } from "react";
import { Star, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  transparent?: boolean;
}

export default function Header({ transparent = false }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || !transparent
          ? "bg-[#0c0c0f]/80 backdrop-blur-xl border-b border-[#1c1c24]/80"
          : "bg-transparent"
      )}
    >
      <div className="max-w-[1200px] mx-auto px-4 xl:px-16 h-16 md:h-[72px] flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-2.5 group"
        >
          <Star className="h-6 w-6 md:h-7 md:w-7 text-[#f59e0b] fill-[#f59e0b] transition-transform duration-200 group-hover:scale-110" />
          <span className="font-sans text-xl md:text-2xl font-bold tracking-tight text-white">
            Thuban
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <a
            href="/#features"
            className="text-sm text-[#9898a8] hover:text-[#f59e0b] transition-colors duration-200"
          >
            Funciones
          </a>
          <a
            href="/#stats"
            className="text-sm text-[#9898a8] hover:text-[#f59e0b] transition-colors duration-200"
          >
            Stats
          </a>
          <div className="flex items-center gap-3 ml-4">
            <a
              href="/login"
              className="text-sm font-medium text-[#9898a8] hover:text-white px-4 py-2 rounded-lg transition-all duration-200 hover:bg-white/5"
            >
              Iniciar Sesión
            </a>
            <a
              href="/signup"
              className="text-sm font-semibold px-5 py-2.5 rounded-lg gold-gradient transition-all duration-200 hover:shadow-[0_0_24px_rgba(245,158,11,0.25)] hover:-translate-y-0.5"
            >
              Comenzar Gratis
            </a>
          </div>
        </nav>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#9898a8] hover:text-white transition-colors"
          aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 w-[280px] h-full bg-[#111114] border-l border-[#1c1c24] z-50 md:hidden flex flex-col pt-24 px-6 gap-4 animate-slide-in-right">
            <a
              href="/#features"
              className="text-base text-[#9898a8] hover:text-white py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Funciones
            </a>
            <a
              href="/#stats"
              className="text-base text-[#9898a8] hover:text-white py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Stats
            </a>
            <hr className="border-[#1c1c24] my-2" />
            <a
              href="/login"
              className="text-base font-medium text-[#9898a8] hover:text-white py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Iniciar Sesión
            </a>
            <a
              href="/signup"
              className="block text-center text-sm font-semibold px-5 py-3 rounded-lg gold-gradient mt-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Comenzar Gratis
            </a>
          </div>
        </>
      )}
    </header>
  );
}