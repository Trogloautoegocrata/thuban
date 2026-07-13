"use client";

import { Star, Loader2, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [terms, setTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) { setError("Completa los campos obligatorios"); return; }
    if (password !== confirm) { setError("Las contraseñas no coinciden"); return; }
    if (!terms) { setError("Acepta los términos y condiciones"); return; }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/backbone/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await res.json();
      if (res.ok && data.access_token) {
        localStorage.setItem("thuban_token", data.access_token);
        localStorage.setItem("thuban_user", JSON.stringify(data.user));
        window.location.href = "/dashboard";
      } else {
        setError(data.detail || "Error al crear la cuenta");
      }
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-bg" />
      <div className="login-container" style={{ maxWidth: 480 }}>
        <div className="login-card">
          <div className="login-header">
            <Link href="/" className="login-logo"><Star /> Thuban</Link>
            <h1>Crear tu cuenta</h1>
            <p>Empieza con 5 créditos gratis. Sin tarjeta.</p>
          </div>
          {error && <div className="login-error">{error}</div>}
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>Nombre completo *</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                placeholder="Juan Pérez" className="form-input" />
            </div>
            <div className="form-group">
              <label>Correo electrónico *</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com" className="form-input" autoComplete="email" />
            </div>
            <div className="form-group">
              <label>Teléfono</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                placeholder="+52 55 1234 5678" className="form-input" />
            </div>
            <div className="form-row-duo">
              <div className="form-group">
                <label>Contraseña *</label>
                <div className="pw-input">
                  <input type={showPw ? "text" : "password"} value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" className="form-input" autoComplete="new-password" />
                  <button type="button" className="pw-toggle" onClick={() => setShowPw(!showPw)} tabIndex={-1}>
                    {showPw ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label>Confirmar *</label>
                <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)}
                  placeholder="••••••••" className="form-input" autoComplete="new-password" />
              </div>
            </div>
            <label className="checkbox-label" style={{ margin: "0.5rem 0 1rem" }}>
              <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} />
              Acepto los <a href="#" onClick={(e) => e.preventDefault()} style={{ color: "var(--gold)", textDecoration: "underline" }}>términos y condiciones</a>
            </label>
            <button type="submit" className="btn-primary btn-full" disabled={loading}>
              {loading ? <><Loader2 className="spin" /> Creando cuenta...</> : "Comenzar Gratis"}
            </button>
          </form>
          <div className="login-footer">
            ¿Ya tienes cuenta? <Link href="/login">Inicia Sesión</Link>
          </div>
        </div>
      </div>
    </div>
  );
}