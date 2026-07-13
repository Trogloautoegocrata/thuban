'use client';

import React, { useState, useCallback } from 'react';
import Sidebar from './Sidebar';
import MetricCard from './MetricCard';
import ActivityTimeline, { defaultActivities } from './ActivityTimeline';

/* ─── Styles ─── */
const styles: Record<string, React.CSSProperties> = {
  layout: { display: 'flex', minHeight: '100vh' },
  main: {
    marginLeft: 240,
    flex: 1,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    transition: 'margin-left 0.35s cubic-bezier(0.4,0,0.2,1)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem 2rem',
    borderBottom: '1px solid rgba(255,255,255,0.04)',
    background: 'rgba(12,12,15,0.8)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    position: 'sticky' as const,
    top: 0,
    zIndex: 50,
    gap: '1rem',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  greeting: { fontSize: '0.9375rem', fontWeight: 500 },
  greetingMuted: { color: 'rgba(255,255,255,0.4)' },
  greetingName: { color: '#f59e0b', fontWeight: 600 },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.25rem',
  },
  creditsBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    fontSize: '0.8125rem',
    color: 'rgba(255,255,255,0.5)',
    background: 'rgba(255,255,255,0.03)',
    padding: '0.35rem 0.75rem',
    borderRadius: '2rem',
    border: '1px solid rgba(255,255,255,0.04)',
  },
  creditsValue: {
    color: '#f59e0b',
    fontWeight: 600,
    fontFamily: "'JetBrains Mono', monospace",
  },
  iconBtn: {
    background: 'none',
    border: 'none',
    color: 'rgba(255,255,255,0.35)',
    cursor: 'pointer',
    fontSize: '1.2rem',
    padding: '0.25rem',
    position: 'relative' as const,
    lineHeight: 1,
    transition: 'color 0.2s ease',
  },
  badge: {
    position: 'absolute' as const,
    top: -2,
    right: -4,
    width: 7,
    height: 7,
    background: '#f59e0b',
    borderRadius: '50%',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#0c0c0f',
    fontWeight: 700,
    fontSize: '0.875rem',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  content: { padding: '2rem', flex: 1 },
  title: { fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' },
  subtitle: {
    fontSize: '0.875rem',
    color: 'rgba(255,255,255,0.35)',
    marginBottom: '2rem',
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1rem',
    marginBottom: '2rem',
  },
  panelsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem',
  },
  panel: {
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: '1rem',
    padding: '1.5rem',
    transition: 'border-color 0.3s ease',
  },
  panelTitle: {
    fontSize: '0.9375rem',
    fontWeight: 600,
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  panelLink: {
    fontSize: '0.8125rem',
    fontWeight: 500,
    color: 'rgba(245,158,11,0.6)',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    fontFamily: "'Inter', sans-serif",
  },
  chatMsg: {
    display: 'flex',
    gap: '0.75rem',
    padding: '0.75rem 1rem',
    background: 'rgba(255,255,255,0.02)',
    borderRadius: '0.75rem',
    transition: 'background 0.2s ease',
  },
  chatAvatar: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.75rem',
    fontWeight: 600,
  },
  chatBody: { flex: 1, minWidth: 0 },
  chatName: {
    fontSize: '0.75rem',
    fontWeight: 600,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: '0.15rem',
  },
  chatText: {
    fontSize: '0.875rem',
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 1.4,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  chatTime: {
    fontSize: '0.6875rem',
    color: 'rgba(255,255,255,0.2)',
    flexShrink: 0,
  },
};

/* ─── Dashboard Page Props ─── */
interface DashboardPageProps {
  userName?: string;
  userInitial?: string;
}

/* ─── Component ─── */
export default function DashboardPage({
  userName = 'Juan',
  userInitial = 'J',
}: DashboardPageProps) {
  const [activeSection, setActiveSection] = useState('inicio');

  const handleNavigate = useCallback((section: string) => {
    setActiveSection(section);
  }, []);

  return (
    <div style={styles.layout}>
      {/* Sidebar */}
      <Sidebar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main */}
      <div style={styles.main}>
        {/* Header */}
        <header style={styles.header}>
          <div style={styles.headerLeft}>
            <div style={styles.greeting}>
              <span style={styles.greetingMuted}>Buenos días, </span>
              <span style={styles.greetingName}>{userName}</span>
            </div>
          </div>
          <div style={styles.headerRight}>
            <div style={styles.creditsBadge}>
              <span>✦</span>
              <span style={styles.creditsValue}>240</span>
              <span>créditos</span>
            </div>
            <button
              style={styles.iconBtn}
              aria-label="Notificaciones"
              onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
            >
              🔔
              <span style={styles.badge} />
            </button>
            <div
              style={styles.avatar}
              role="button"
              tabIndex={0}
              aria-label="Perfil de usuario"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(245,158,11,0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {userInitial}
            </div>
          </div>
        </header>

        {/* Content */}
        <main style={styles.content}>
          <h1 style={styles.title}>Dashboard</h1>
          <p style={styles.subtitle}>Resumen de tu actividad en Thuban</p>

          {/* Metrics */}
          <div style={styles.metricsGrid}>
            <MetricCard
              icon="✦"
              iconBg="gold"
              value="240"
              label="Créditos usados"
              change="12%"
              changeDirection="up"
            />
            <MetricCard
              icon="🏠"
              iconBg="blue"
              value="1,247"
              label="Propiedades analizadas"
              change="8%"
              changeDirection="up"
            />
            <MetricCard
              icon="💬"
              iconBg="green"
              value="89"
              label="Conversaciones"
              change="23%"
              changeDirection="up"
            />
            <MetricCard
              icon="⏱"
              iconBg="purple"
              value="32h"
              label="Ahorro de tiempo"
              change="18%"
              changeDirection="up"
            />
          </div>

          {/* Panels */}
          <div style={styles.panelsGrid}>
            {/* Chat Preview */}
            <section
              style={styles.panel}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = 'rgba(245,158,11,0.08)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')
              }
            >
              <div style={styles.panelTitle}>
                <span>Chat rápido</span>
                <button
                  style={styles.panelLink}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#f59e0b')}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = 'rgba(245,158,11,0.6)')
                  }
                >
                  Ver todas →
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div
                  style={styles.chatMsg}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')
                  }
                >
                  <div
                    style={{
                      ...styles.chatAvatar,
                      background: 'rgba(245,158,11,0.15)',
                      color: '#f59e0b',
                    }}
                  >
                    J
                  </div>
                  <div style={styles.chatBody}>
                    <div style={styles.chatName}>Tú</div>
                    <div style={styles.chatText}>
                      ¿Cuáles son las mejores zonas para invertir en CDMX este trimestre?
                    </div>
                  </div>
                  <div style={styles.chatTime}>10:32</div>
                </div>
                <div
                  style={styles.chatMsg}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')
                  }
                >
                  <div
                    style={{
                      ...styles.chatAvatar,
                      background: 'rgba(59,130,246,0.15)',
                      color: '#60a5fa',
                    }}
                  >
                    T
                  </div>
                  <div style={styles.chatBody}>
                    <div style={styles.chatName}>Thuban AI</div>
                    <div style={styles.chatText}>
                      Basado en tendencias de precios y plusvalía, las zonas más prometedoras
                      son: Benito Juárez, Cuauhtémoc (zona norte) y Miguel Hidalgo.
                    </div>
                  </div>
                  <div style={styles.chatTime}>10:33</div>
                </div>
              </div>
            </section>

            {/* Activity Timeline */}
            <section
              style={styles.panel}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = 'rgba(245,158,11,0.08)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')
              }
            >
              <div style={styles.panelTitle}>
                <span>Actividad reciente</span>
                <button
                  style={styles.panelLink}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#f59e0b')}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = 'rgba(245,158,11,0.6)')
                  }
                >
                  Ver todo →
                </button>
              </div>
              <ActivityTimeline activities={defaultActivities} />
            </section>
          </div>
        </main>
      </div>

      {/* Global styles for animations and input focus */}
      <style jsx global>{`
        @keyframes thubanPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes thubanSpin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}