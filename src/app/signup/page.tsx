'use client';

import { Loader2, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { Button, Input } from '@/components/ui';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [terms, setTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) { setError('Completa los campos obligatorios'); return; }
    if (password !== confirm) { setError('Las contraseñas no coinciden'); return; }
    if (!terms) { setError('Acepta los términos y condiciones'); return; }
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setError('No tienes conexión a internet. Verifica tu conexión e intenta de nuevo.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/backbone/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await res.json();
      if (res.ok && data.access_token) {
        localStorage.setItem('thuban_token', data.access_token);
        localStorage.setItem('thuban_user', JSON.stringify(data.user));
        window.location.href = '/dashboard';
      } else {
        setError(data.detail || 'Error al crear la cuenta');
      }
    } catch {
      setError('Error de conexión. Intenta de nuevo.');
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-bg" />
      <div className="login-container" style={{ maxWidth: 480 }}>
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">
              <svg viewBox="0 0 28 28" fill="none" width="24" height="24" aria-hidden="true">
                <rect width="28" height="28" rx="8" fill="#f59e0b" />
                <text x="14" y="20" textAnchor="middle" fontFamily="Inter,sans-serif" fontWeight="700" fontSize="16" fill="#0a0a0f">T</text>
              </svg>
              Thuban
            </div>
            <h1>Crear tu cuenta</h1>
            <p>Empieza con 5 créditos gratis. Sin tarjeta.</p>
          </div>

          {error && <div className="login-error">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <Input
              label="Nombre completo *"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Juan Pérez"
              disabled={loading}
              wrapperClassName="gap-1"
            />

            <Input
              label="Correo electrónico *"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              autoComplete="email"
              disabled={loading}
              wrapperClassName="gap-1"
            />

            <Input
              label="Teléfono"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+52 55 1234 5678"
              disabled={loading}
              wrapperClassName="gap-1"
            />

            <div className="form-row-duo">
              <Input
                label="Contraseña *"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="new-password"
                showPasswordToggle
                disabled={loading}
                wrapperClassName="gap-1"
              />
              <Input
                label="Confirmar *"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="••••••••"
                autoComplete="new-password"
                disabled={loading}
                wrapperClassName="gap-1"
              />
            </div>

            <label className="checkbox-label" style={{ margin: '0.5rem 0 1rem' }}>
              <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} />
              Acepto los <a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'var(--gold)', textDecoration: 'underline' }}>términos y condiciones</a>
            </label>

            <Button
              type="submit"
              variant="primary"
              size="full"
              loading={loading}
              disabled={loading}
            >
              Comenzar Gratis
            </Button>
          </form>

          <div className="login-footer">
            ¿Ya tienes cuenta? <Link href="/login">Inicia Sesión</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
