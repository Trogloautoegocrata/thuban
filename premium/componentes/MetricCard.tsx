'use client';

import React from 'react';

/* ─── Types ─── */
interface MetricCardProps {
  icon: string;
  iconBg: 'gold' | 'blue' | 'green' | 'purple';
  value: string;
  label: string;
  change: string;
  changeDirection?: 'up' | 'down';
}

/* ─── Icon BG mapping ─── */
const iconStyles: Record<string, React.CSSProperties> = {
  gold: { background: 'rgba(245,158,11,0.1)' },
  blue: { background: 'rgba(59,130,246,0.1)' },
  green: { background: 'rgba(34,197,94,0.1)' },
  purple: { background: 'rgba(168,85,247,0.1)' },
};

const changeStyles: Record<string, React.CSSProperties> = {
  up: {
    background: 'rgba(34,197,94,0.12)',
    color: '#4ade80',
  },
  down: {
    background: 'rgba(239,68,68,0.12)',
    color: '#f87171',
  },
};

/* ─── Styles ─── */
const styles: Record<string, React.CSSProperties> = {
  card: {
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: '1rem',
    padding: '1.5rem',
    transition: 'all 0.3s ease',
    cursor: 'default',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem',
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
  },
  change: {
    fontSize: '0.75rem',
    fontWeight: 600,
    padding: '0.2rem 0.5rem',
    borderRadius: '0.375rem',
  },
  value: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '1.75rem',
    fontWeight: 700,
    color: '#fff',
    lineHeight: 1.1,
    marginBottom: '0.25rem',
  },
  label: {
    fontSize: '0.8125rem',
    color: 'rgba(255,255,255,0.35)',
  },
};

/* ─── Component ─── */
export default function MetricCard({
  icon,
  iconBg,
  value,
  label,
  change,
  changeDirection = 'up',
}: MetricCardProps) {
  return (
    <div
      style={styles.card}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
        e.currentTarget.style.borderColor = 'rgba(245,158,11,0.12)';
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={styles.header}>
        <div style={{ ...styles.iconBox, ...iconStyles[iconBg] }}>{icon}</div>
        <span style={{ ...styles.change, ...changeStyles[changeDirection] }}>
          {changeDirection === 'up' ? '+' : ''}{change}
        </span>
      </div>
      <div style={styles.value}>{value}</div>
      <div style={styles.label}>{label}</div>
    </div>
  );
}