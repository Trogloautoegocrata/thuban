'use client';

import React, { useState, useCallback, type FormEvent } from 'react';

/* ─── Types ─── */
export type AuthMode = 'login' | 'signup';

interface AuthPageProps {
  mode: AuthMode;
  onSuccess?: () => void;
  onToggleMode?: () => void;
}

/* ─── Icons (static svg) ─── */
const StarIcon = () => (
  <svg
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: '100%', height: '100%' }}
  >
    <circle
      cx="18"
      cy="18"
      r="16"
      stroke="#f59e0b"
      strokeWidth="1.5"
      fill="rgba(245,158,11,0.06)"
    />
    <path
      d="M18 8 L20 14 L26 14 L21 18 L23 24 L18 20 L13 24 L15 18 L10 14 L16 14 Z"
      fill="#f59e0b"
      opacity="0.9"
    />
  </svg>
);

/* ─── Spinner ─── */
const Spinner = () => (
  <span
    style={{
      display: 'inline-block',
      width: '1.25rem',
      height: '1.25rem',
      border: '2px solid rgba(12,12,15,0.2)',
      borderTopColor: '#0c0c0f',
      borderRadius: '50%',
      animation: 'thubanSpin 0.6s linear infinite',
    }}
  />
);

/* ─── Styles ─── */
const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    maxWidth: 440,
    padding: '1.5rem',
  },
  card: {
    background: 'rgba(255,255,255,0.03)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '1.5rem',
    padding: '2.5rem 2rem',
    boxShadow: '0 0 60px rgba(245,158,11,0.04), 0 8px 32px rgba(0,0,0,0.4)',
    transition: 'border-color 0.3s ease',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.65rem',
    marginBottom: '0.5rem',
    textDecoration: 'none',
  },
  logoText: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#fff',
    letterSpacing: '-0.02em',
  },
  logostar: {
    color: '#f59e0b',
    fontSize: '1.25rem',
  },
  subtitle: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.4)',
    fontSize: '0.875rem',
    fontWeight: 400,
    marginBottom: '2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  formCompact: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  group: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  label: {
    fontSize: '0.8125rem',
    fontWeight: 500,
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: '0.01em',
  },
  input: {
    fontFamily: "'Inter', sans-serif",
    width: '100%',
    padding: '0.85rem 1rem',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '0.75rem',
    color: '#f0f0f5',
    fontSize: '0.9375rem',
    outline: 'none',
    transition: 'all 0.25s ease',
  },
  inputError: {
    borderColor: 'rgba(239,68,68,0.5)',
    boxShadow: '0 0 0 3px rgba(239,68,68,0.08)',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  rowDuo: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.8125rem',
    color: 'rgba(255,255,255,0.45)',
    cursor: 'pointer',
    userSelect: 'none',
  },
  checkbox: {
    width: '1rem',
    height: '1rem',
    accentColor: '#f59e0b',
    cursor: 'pointer',
  },
  forgotLink: {
    fontSize: '0.8125rem',
    color: 'rgba(245,158,11,0.7)',
    textDecoration: 'none',
  },
  button: {
    fontFamily: "'Inter', sans-serif",
    width: '100%',
    padding: '0.9rem 1.5rem',
    border: 'none',
    borderRadius: '0.75rem',
    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
    color: '#0c0c0f',
    fontSize: '0.9375rem',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
  },
  message: {
    padding: '0.75rem 1rem',
    borderRadius: '0.75rem',
    fontSize: '0.8125rem',
    fontWeight: 500,
  },
  messageError: {
    background: 'rgba(239,68,68,0.1)',
    border: '1px solid rgba(239,68,68,0.2)',
    color: '#f87171',
  },
  messageSuccess: {
    background: 'rgba(34,197,94,0.1)',
    border: '1px solid rgba(34,197,94,0.2)',
    color: '#4ade80',
  },
  footer: {
    textAlign: 'center',
    marginTop: '1.5rem',
    fontSize: '0.875rem',
    color: 'rgba(255,255,255,0.3)',
  },
  footerLink: {
    color: 'rgba(245,158,11,0.7)',
    textDecoration: 'none',
    fontWeight: 500,
  },
};

/* ─── Helpers ─── */
function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
function isValidPhone(v: string) {
  return /^[\d\s+\-()]{7,20}$/.test(v);
}

/* ─── Auth Page Component ─── */
export default function AuthPage({ mode, onSuccess, onToggleMode }: AuthPageProps) {
  const isLogin = mode === 'login';

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirm: '',
    remember: false,
    terms: false,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'error' | 'success' } | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const update = useCallback(
    (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
      if (message?.type === 'error') setMessage(null);
    },
    [message],
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const { name, email, phone, password, confirm, terms } = form;

    if (!isLogin) {
      if (!name) { setMessage({ text: 'Ingresa tu nombre completo', type: 'error' }); return; }
      if (!email) { setMessage({ text: 'Ingresa tu correo', type: 'error' }); return; }
      if (!isValidEmail(email)) { setMessage({ text: 'Correo inválido', type: 'error' }); return; }
      if (!phone) { setMessage({ text: 'Ingresa tu teléfono', type: 'error' }); return; }
      if (!isValidPhone(phone)) { setMessage({ text: 'Teléfono inválido', type: 'error' }); return; }
      if (!password) { setMessage({ text: 'Ingresa una contraseña', type: 'error' }); return; }
      if (password.length < 8) { setMessage({ text: 'Mín. 8 caracteres', type: 'error' }); return; }
      if (password !== confirm) { setMessage({ text: 'Las contraseñas no coinciden', type: 'error' }); return; }
      if (!terms) { setMessage({ text: 'Acepta términos y condiciones', type: 'error' }); return; }
    } else {
      if (!email) { setMessage({ text: 'Ingresa tu correo', type: 'error' }); return; }
      if (!isValidEmail(email)) { setMessage({ text: 'Correo inválido', type: 'error' }); return; }
      if (!password) { setMessage({ text: 'Ingresa tu contraseña', type: 'error' }); return; }
      if (password.length < 6) { setMessage({ text: 'Mín. 6 caracteres', type: 'error' }); return; }
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (isLogin && email === 'demo@thuban.ai' && password === 'thuban123') {
        setMessage({ text: 'Inicio exitoso. Redirigiendo…', type: 'success' });
        setTimeout(() => onSuccess?.(), 800);
      } else if (!isLogin) {
        setMessage({ text: 'Cuenta creada. Redirigiendo…', type: 'success' });
        setTimeout(() => onSuccess?.(), 1000);
      } else {
        throw new Error('Credenciales incorrectas');
      }
    } catch (err: unknown) {
      const errorText = err instanceof Error ? err.message : 'Error inesperado';
      setMessage({ text: errorText, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (isError?: boolean): React.CSSProperties => ({
    ...styles.input,
    ...(isError ? styles.inputError : {}),
  });

  const msgStyle =
    message?.type === 'error'
      ? { ...styles.message, ...styles.messageError }
      : message?.type === 'success'
        ? { ...styles.message, ...styles.messageSuccess }
        : undefined;

  return (
    <div style={styles.wrapper}>
      <div
        style={styles.card}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(245,158,11,0.12)')}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}
      >
        {/* Logo */}
        <div style={styles.logo}>
          <div style={{ width: 36, height: 36 }}>
            <StarIcon />
          </div>
          <span style={styles.logoText}>Thuban</span>
          <span style={styles.logostar}>✦</span>
        </div>
        <p style={styles.subtitle}>
          {isLogin
            ? 'Accede a tu panel de inteligencia inmobiliaria'
            : 'Comienza a transformar tu negocio inmobiliario'}
        </p>

        {/* Form */}
        <form style={isLogin ? styles.form : styles.formCompact} onSubmit={handleSubmit}>
          {/* Signup-only fields */}
          {!isLogin && (
            <>
              <div style={isLogin ? undefined : styles.rowDuo}>
                <div style={styles.group}>
                  <label style={styles.label} htmlFor="auth-name">
                    Nombre completo
                  </label>
                  <input
                    id="auth-name"
                    style={inputStyle()}
                    type="text"
                    value={form.name}
                    onChange={update('name')}
                    placeholder="Juan Pérez"
                    autoComplete="name"
                  />
                </div>
                <div style={styles.group}>
                  <label style={styles.label} htmlFor="auth-email">
                    Correo electrónico
                  </label>
                  <input
                    id="auth-email"
                    style={inputStyle()}
                    type="email"
                    value={form.email}
                    onChange={update('email')}
                    placeholder="tu@correo.com"
                    autoComplete="email"
                  />
                </div>
              </div>
              <div style={styles.group}>
                <label style={styles.label} htmlFor="auth-phone">
                  Teléfono
                </label>
                <input
                  id="auth-phone"
                  style={inputStyle()}
                  type="tel"
                  value={form.phone}
                  onChange={update('phone')}
                  placeholder="+52 55 1234 5678"
                  autoComplete="tel"
                />
              </div>
            </>
          )}

          {/* Login-only email */}
          {isLogin && (
            <div style={styles.group}>
              <label style={styles.label} htmlFor="auth-email">
                Correo electrónico
              </label>
              <input
                id="auth-email"
                style={inputStyle()}
                type="email"
                value={form.email}
                onChange={update('email')}
                placeholder="tu@correo.com"
                autoComplete="email"
              />
            </div>
          )}

          {/* Password group */}
          {isLogin ? (
            <div style={styles.group}>
              <label style={styles.label} htmlFor="auth-password">
                Contraseña
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="auth-password"
                  style={inputStyle()}
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={update('password')}
                  placeholder="••••••••"
                  autoComplete={isLogin ? 'current-password' : 'new-password'}
                />
                <button
                  type="button"
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255,255,255,0.3)',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    padding: '0.25rem',
                    lineHeight: 1,
                  }}
                  onClick={() => setShowPassword((p) => !p)}
                  aria-label="Toggle password"
                >
                  {showPassword ? '🙈' : '👁'}
                </button>
              </div>
            </div>
          ) : (
            <div style={styles.rowDuo}>
              <div style={styles.group}>
                <label style={styles.label} htmlFor="auth-password">
                  Contraseña
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="auth-password"
                    style={inputStyle()}
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={update('password')}
                    placeholder="Mín. 8 caracteres"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    style={{
                      position: 'absolute',
                      right: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: 'rgba(255,255,255,0.3)',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      padding: '0.25rem',
                      lineHeight: 1,
                    }}
                    onClick={() => setShowPassword((p) => !p)}
                    aria-label="Toggle password"
                  >
                    {showPassword ? '🙈' : '👁'}
                  </button>
                </div>
              </div>
              <div style={styles.group}>
                <label style={styles.label} htmlFor="auth-confirm">
                  Confirmar
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="auth-confirm"
                    style={inputStyle()}
                    type={showConfirm ? 'text' : 'password'}
                    value={form.confirm}
                    onChange={update('confirm')}
                    placeholder="Repite"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    style={{
                      position: 'absolute',
                      right: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: 'rgba(255,255,255,0.3)',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      padding: '0.25rem',
                      lineHeight: 1,
                    }}
                    onClick={() => setShowConfirm((p) => !p)}
                    aria-label="Toggle confirm password"
                  >
                    {showConfirm ? '🙈' : '👁'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Login extras */}
          {isLogin && (
            <div style={styles.row}>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  style={styles.checkbox}
                  checked={form.remember}
                  onChange={update('remember')}
                />
                Recordarme
              </label>
              <a href="#" style={styles.forgotLink}>
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          )}

          {/* Terms */}
          {!isLogin && (
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                style={styles.checkbox}
                checked={form.terms}
                onChange={update('terms')}
              />
              Acepto los{' '}
              <a href="#" style={{ color: 'rgba(245,158,11,0.7)', textDecoration: 'none' }}>
                términos y condiciones
              </a>
            </label>
          )}

          {/* Message */}
          {message && (
            <div style={msgStyle}>{message.text}</div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              ...(loading ? { opacity: 0.5, cursor: 'not-allowed' } : {}),
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.setProperty(
                  'background',
                  'linear-gradient(135deg, #d97706, #b45309)',
                );
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.setProperty(
                  'background',
                  'linear-gradient(135deg, #f59e0b, #d97706)',
                );
              }
            }}
          >
            {loading ? (
              <>
                <Spinner /> <span style={{ position: 'relative', zIndex: 1 }}>{isLogin ? 'Iniciando…' : 'Creando…'}</span>
              </>
            ) : (
              <span style={{ position: 'relative', zIndex: 1 }}>
                {isLogin ? 'Iniciar Sesión' : 'Comenzar Gratis'}
              </span>
            )}
          </button>
        </form>

        {/* Footer */}
        <p style={styles.footer}>
          {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
          <button
            type="button"
            onClick={onToggleMode}
            style={{
              ...styles.footerLink,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.875rem',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#f59e0b')}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = 'rgba(245,158,11,0.7)')
            }
          >
            {isLogin ? 'Regístrate' : 'Inicia Sesión'}
          </button>
        </p>
      </div>

      <style jsx global>{`
        @keyframes thubanSpin {
          to {
            transform: rotate(360deg);
          }
        }
        input:focus {
          border-color: rgba(245, 158, 11, 0.5) !important;
          background: rgba(255, 255, 255, 0.06) !important;
          box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.08) !important;
        }
      `}</style>
    </div>
  );
}