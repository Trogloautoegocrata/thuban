'use client';

import React from 'react';

/* ─── Types ─── */
interface SidebarProps {
  activeSection?: string;
  onNavigate?: (section: string) => void;
}

/* ─── Nav Config ─── */
interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    id: 'inicio',
    label: 'Inicio',
    icon: (
      <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="1" width="7" height="7" rx="1" />
        <rect x="10" y="1" width="7" height="7" rx="1" />
        <rect x="1" y="10" width="7" height="7" rx="1" />
        <rect x="10" y="10" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    id: 'chat',
    label: 'Chat',
    icon: (
      <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z" />
        <path d="M7 10h4M7 6h4M7 14h2" />
      </svg>
    ),
  },
  {
    id: 'propiedades',
    label: 'Propiedades',
    icon: (
      <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 4h14M2 9h14M2 14h14" />
        <rect x="3" y="2" width="3" height="4" rx="0.5" />
        <rect x="12" y="7" width="3" height="4" rx="0.5" />
        <rect x="7" y="12" width="3" height="4" rx="0.5" />
      </svg>
    ),
  },
  {
    id: 'analisis',
    label: 'Análisis',
    icon: (
      <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 16V2h14" />
        <path d="M6 12l3-4 3 2 4-5" />
      </svg>
    ),
  },
  {
    id: 'configuracion',
    label: 'Configuración',
    icon: (
      <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="9" r="7" />
        <path d="M9 5v4l3 2" />
      </svg>
    ),
  },
];

/* ─── Styles ─── */
const styles: Record<string, React.CSSProperties> = {
  sidebar: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    width: 240,
    background: 'rgba(255,255,255,0.02)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRight: '1px solid rgba(255,255,255,0.04)',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 100,
    transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
    overflow: 'hidden',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.65rem',
    padding: '1.5rem 1.5rem 1.25rem',
    borderBottom: '1px solid rgba(255,255,255,0.04)',
  },
  brandIcon: { width: 28, height: 28, flexShrink: 0 },
  brandText: {
    fontSize: '1.125rem',
    fontWeight: 700,
    color: '#fff',
    letterSpacing: '-0.02em',
    whiteSpace: 'nowrap',
  },
  brandStar: {
    color: '#f59e0b',
    fontSize: '0.875rem',
  },
  nav: {
    flex: 1,
    padding: '0.75rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.2rem',
    overflowY: 'auto',
  },
  label: {
    fontSize: '0.6875rem',
    fontWeight: 600,
    color: 'rgba(255,255,255,0.2)',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    padding: '0.75rem 0.75rem 0.4rem',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.7rem 0.75rem',
    borderRadius: '0.625rem',
    color: 'rgba(255,255,255,0.4)',
    textDecoration: 'none',
    fontSize: '0.875rem',
    fontWeight: 500,
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap',
    position: 'relative',
    cursor: 'pointer',
    border: 'none',
    background: 'none',
    width: '100%',
    textAlign: 'left',
    fontFamily: "'Inter', sans-serif",
  },
  linkActive: {
    color: '#f59e0b',
    background: 'rgba(245,158,11,0.08)',
  },
  linkIndicator: {
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    width: 3,
    height: 20,
    background: '#f59e0b',
    borderRadius: '0 3px 3px 0',
  },
  icon: { width: 18, height: 18, flexShrink: 0, opacity: 0.6 },
  footer: {
    padding: '1rem',
    borderTop: '1px solid rgba(255,255,255,0.04)',
  },
  credits: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.5rem 0.75rem',
    background: 'rgba(245,158,11,0.06)',
    border: '1px solid rgba(245,158,11,0.1)',
    borderRadius: '0.625rem',
    fontSize: '0.8125rem',
  },
  creditsLabel: { color: 'rgba(255,255,255,0.4)' },
  creditsValue: {
    color: '#f59e0b',
    fontWeight: 600,
    fontFamily: "'JetBrains Mono', monospace",
  },
};

/* ─── Component ─── */
export default function Sidebar({ activeSection = 'inicio', onNavigate }: SidebarProps) {
  return (
    <aside style={styles.sidebar} role="navigation" aria-label="Navegación principal">
      {/* Brand */}
      <div style={styles.brand}>
        <div style={styles.brandIcon}>
          <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="14" cy="14" r="12" stroke="#f59e0b" strokeWidth="1.2" fill="rgba(245,158,11,0.06)" />
            <path d="M14 6 L15.5 11 L20 11 L16.5 14 L18 19 L14 16 L10 19 L11.5 14 L8 11 L12.5 11 Z" fill="#f59e0b" opacity="0.9" />
          </svg>
        </div>
        <span style={styles.brandText}>Thuban</span>
        <span style={styles.brandStar}>✦</span>
      </div>

      {/* Nav */}
      <nav style={styles.nav}>
        <div style={styles.label}>Menú</div>
        {navItems.map((item) => {
          const isActive = item.id === activeSection;
          return (
            <button
              key={item.id}
              style={{
                ...styles.link,
                ...(isActive ? styles.linkActive : {}),
              }}
              onClick={() => onNavigate?.(item.id)}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.4)';
                  e.currentTarget.style.background = 'transparent';
                }
              }}
              aria-current={isActive ? 'page' : undefined}
            >
              {isActive && <div style={styles.linkIndicator} />}
              <span style={styles.icon}>{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Footer Credits */}
      <div style={styles.footer}>
        <div style={styles.credits}>
          <span style={styles.creditsLabel}>Créditos</span>
          <span style={styles.creditsValue}>240</span>
        </div>
      </div>
    </aside>
  );
}