'use client';

import { Loader2, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { Button, Input } from '@/components/ui';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError('Completa todos los campos'); return; }
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setError('No tienes conexión a internet. Verifica tu conexión e intenta de nuevo.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/backbone/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.access_token) {
        localStorage.setItem('thuban_token', data.access_token);
        localStorage.setItem('thuban_user', JSON.stringify(data.user));
        window.location.href = '/dashboard';
      } else {
        setError(data.detail || 'Credenciales inválidas');
      }
    } catch {
      setError('Error de conexión. Intenta de nuevo.');
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-bg" />
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">
              <svg viewBox="0 0 28 28" fill="none" width="24" height="24" aria-hidden="true">
                <rect width="28" height="28" rx="8" fill="#f59e0b" />
                <text x="14" y="20" textAnchor="middle" fontFamily="Inter,sans-serif" fontWeight="700" fontSize="16" fill="#0a0a0f">T</text>
              </svg>
              Thuban
            </div>
            <h1>Iniciar Sesión</h1>
            <p>Bienvenido de nuevo. Ingresa tus credenciales.</p>
          </div>

          {error && <div className="login-error">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <Input
              label="Correo electrónico"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              autoComplete="email"
              disabled={loading}
              wrapperClassName="gap-1"
            />

            <Input
              label="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              showPasswordToggle
              disabled={loading}
              wrapperClassName="gap-1"
            />

            <div className="form-row">
              <label className="checkbox-label">
                <input type="checkbox" defaultChecked /> Recordarme
              </label>
              <a
                href="#"
                className="forgot-link"
                onClick={(e) => { e.preventDefault(); setError('Contacta a soporte para restablecer tu contraseña.'); }}
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="full"
              loading={loading}
              disabled={loading}
            >
              Iniciar Sesión
            </Button>
          </form>

          <div className="login-footer">
            ¿No tienes cuenta? <Link href="/signup">Regístrate</Link>
          </div>
        </div>
      </div>
      <style>{`
        .forgot-link { font-size: 0.85rem; color: var(--muted); cursor: pointer; }
        .forgot-link:hover { color: var(--gold); text-decoration: underline; }
      `}</style>
    </div>
  );
}
