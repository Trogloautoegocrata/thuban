// design/components/AuthForm.tsx
// Thuban — Unified auth form for login and signup
// Glassmorphism card, gold CTAs, micro-interactions

"use client";

import { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Star, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthFormProps {
  mode: "login" | "signup";
  onSubmit: (data: { email: string; password: string; name?: string }) => void;
  isLoading?: boolean;
  error?: string;
  className?: string;
}

export default function AuthForm({
  mode,
  onSubmit,
  isLoading = false,
  error,
  className,
}: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isLogin = mode === "login";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    onSubmit({ email, password, ...(isLogin ? {} : { name }) });
  };

  const isValid = email.trim() && password.length >= 6 && (isLogin || name.trim());

  return (
    <div
      className={cn(
        "w-full max-w-md mx-auto",
        className
      )}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#f59e0b]/10 mb-4">
          <Star className="h-7 w-7 text-[#f59e0b]" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          {isLogin ? "Bienvenido de vuelta" : "Crear tu cuenta"}
        </h1>
        <p className="text-sm text-[#9898a8]">
          {isLogin
            ? "Ingresa tus datos para continuar"
            : "Comienza con 5 créditos gratis, sin tarjeta"}
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className={cn(
          "rounded-2xl p-6 md:p-8",
          "bg-gradient-to-br from-[#111114]/85 to-[#16161a]/50",
          "backdrop-blur-xl border border-white/[0.06]",
          "space-y-5"
        )}
      >
        {/* Name field (signup only) */}
        {!isLogin && (
          <div>
            <label className="block text-sm font-medium text-[#9898a8] mb-1.5">
              Nombre completo
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5c5c6e]" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
                disabled={isLoading}
                className="w-full bg-white/[0.03] border border-[#1c1c24] rounded-xl py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-[#5c5c6e] transition-all duration-200 focus:border-[#759ce7] focus:shadow-[0_0_0_3px_rgba(117,156,231,0.08)] focus:outline-none disabled:opacity-50"
              />
            </div>
          </div>
        )}

        {/* Email field */}
        <div>
          <label className="block text-sm font-medium text-[#9898a8] mb-1.5">
            Correo electrónico
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5c5c6e]" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              disabled={isLoading}
              autoComplete="email"
              className="w-full bg-white/[0.03] border border-[#1c1c24] rounded-xl py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-[#5c5c6e] transition-all duration-200 focus:border-[#759ce7] focus:shadow-[0_0_0_3px_rgba(117,156,231,0.08)] focus:outline-none disabled:opacity-50"
            />
          </div>
        </div>

        {/* Password field */}
        <div>
          <label className="block text-sm font-medium text-[#9898a8] mb-1.5">
            Contraseña
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5c5c6e]" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              disabled={isLoading}
              autoComplete={isLogin ? "current-password" : "new-password"}
              className="w-full bg-white/[0.03] border border-[#1c1c24] rounded-xl py-2.5 pl-10 pr-10 text-sm text-white placeholder:text-[#5c5c6e] transition-all duration-200 focus:border-[#759ce7] focus:shadow-[0_0_0_3px_rgba(117,156,231,0.08)] focus:outline-none disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5c5c6e] hover:text-[#9898a8] transition-colors"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="text-sm text-[#f87171] bg-[#f87171]/10 border border-[#f87171]/20 rounded-lg px-4 py-2.5">
            {error}
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={!isValid || isLoading}
          className={cn(
            "w-full inline-flex items-center justify-center gap-2 h-11 rounded-xl text-sm font-semibold",
            "transition-all duration-200",
            isValid && !isLoading
              ? "gold-gradient hover:shadow-[0_0_24px_rgba(245,158,11,0.25)] hover:-translate-y-0.5"
              : "bg-[#1c1c24] text-[#5c5c6e] cursor-not-allowed"
          )}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Procesando...
            </>
          ) : (
            <>
              {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      {/* Toggle mode */}
      <p className="text-center text-sm text-[#5c5c6e] mt-6">
        {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
        <a
          href={isLogin ? "/signup" : "/login"}
          className="text-[#759ce7] hover:text-[#8bb9f7] font-medium transition-colors"
        >
          {isLogin ? "Regístrate" : "Inicia Sesión"}
        </a>
      </p>
    </div>
  );
}