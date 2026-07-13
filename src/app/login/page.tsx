"use client";

import { Star, Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError("Completa todos los campos"); return; }
    setLoading(true); setError("");
    setTimeout(() => { setLoading(false); window.location.href = "/dashboard"; }, 1200);
  };

  return (
    <div className="login-page">
      <div className="login-bg" />
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <Link href="/" className="login-logo"><Star /> Thuban</Link>
            <h1>Iniciar Sesión</h1>
            <p>Bienvenido de nuevo. Ingresa tus credenciales.</p>
          </div>

          {error && <div className="login-error">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>Correo electrónico</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@correo.com" className="form-input" />
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <div className="pw-input">
                <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="form-input" />
                <button type="button" className="pw-toggle" onClick={() => setShowPw(!showPw)}>{showPw ? <EyeOff /> : <Eye />}</button>
              </div>
            </div>
            <div className="form-row">
              <label className="checkbox-label"><input type="checkbox" defaultChecked /> Recordarme</label>
              <a href="#" className="forgot-link">¿Olvidaste tu contraseña?</a>
            </div>
            <button type="submit" className="btn-primary btn-full" disabled={loading}>
              {loading ? <><Loader2 className="spin" /> Iniciando sesión...</> : "Iniciar Sesión"}
            </button>
          </form>

          <div className="login-footer">
            ¿No tienes cuenta? <Link href="/signup">Regístrate</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
