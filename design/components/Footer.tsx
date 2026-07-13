// design/components/Footer.tsx
// Thuban — Footer with logo, ecosistema links, copyright
// Dark theme, glassmorphism top border

"use client";

import { Star } from "lucide-react";

const ECOSYSTEM_LINKS = [
  { name: "Polaris", url: "https://polaris.pw", color: "#1edb7f" },
  { name: "BACKBONE", url: "https://back-bone.dev", color: "#ffffff" },
  { name: "VisionNorth", url: "https://visionnorth.vision", color: "#0976F8" },
  { name: "PADIM", url: "https://padim.enmexico.casa", color: "#f0c040" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#1c1c24]/60 bg-[#0c0c0f]">
      <div className="max-w-[1200px] mx-auto px-4 xl:px-16 py-10 md:py-14">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <a href="/" className="flex items-center gap-2 group">
              <Star className="h-5 w-5 text-[#f59e0b] fill-[#f59e0b] transition-transform duration-200 group-hover:scale-110" />
              <span className="font-sans text-lg font-bold tracking-tight text-white">
                Thuban
              </span>
            </a>
            <p className="text-sm text-[#5c5c6e] max-w-[240px] text-center md:text-left">
              Inteligencia Artificial especializada para el mercado inmobiliario LATAM.
            </p>
            <span className="text-xs text-[#5c5c6e] inline-flex items-center gap-1.5">
              by{" "}
              <a
                href="https://polaris.pw"
                style={{ color: "#1edb7f" }}
                className="no-underline font-semibold hover:opacity-80 transition-opacity"
              >
                Polaris
              </a>
            </span>
          </div>

          {/* Ecosystem links */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <span className="text-xs font-semibold text-[#5c5c6e] uppercase tracking-widest">
              Ecosistema
            </span>
            <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2">
              {ECOSYSTEM_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: link.color }}
                  className="text-sm no-underline font-semibold hover:opacity-80 transition-opacity"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <span className="text-xs font-semibold text-[#5c5c6e] uppercase tracking-widest">
              Thuban
            </span>
            <div className="flex flex-col items-center md:items-start gap-2">
              <a
                href="/login"
                className="text-sm text-[#9898a8] hover:text-white transition-colors"
              >
                Iniciar Sesión
              </a>
              <a
                href="/signup"
                className="text-sm text-[#9898a8] hover:text-white transition-colors"
              >
                Crear Cuenta
              </a>
              <a
                href="/#features"
                className="text-sm text-[#9898a8] hover:text-white transition-colors"
              >
                Funciones
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#1c1c24]/40 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#5c5c6e]">
            &copy; {new Date().getFullYear()} Thuban. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-[#5c5c6e]">
            <span>Hecho con</span>
            <span className="text-red-400">♥</span>
            <span>en México</span>
          </div>
        </div>
      </div>
    </footer>
  );
}