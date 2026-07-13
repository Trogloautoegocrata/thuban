'use client';

import React from 'react';

/* ─── Types ─── */
export interface Activity {
  id: string;
  dotColor: 'gold' | 'blue' | 'green' | 'purple';
  text: string;
  boldSegment: string;
  time: string;
}

interface ActivityTimelineProps {
  activities: Activity[];
}

/* ─── Dot color mapping ─── */
const dotColors: Record<string, string> = {
  gold: '#f59e0b',
  blue: '#3b82f6',
  green: '#22c55e',
  purple: '#a855f7',
};

/* ─── Styles ─── */
const styles: Record<string, React.CSSProperties> = {
  container: { display: 'flex', flexDirection: 'column' },
  item: {
    display: 'flex',
    gap: '0.875rem',
    padding: '0.75rem 0.5rem',
    borderBottom: '1px solid rgba(255,255,255,0.03)',
    transition: 'background 0.2s ease',
    borderRadius: '0.5rem',
    cursor: 'default',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    marginTop: 6,
    flexShrink: 0,
  },
  content: { flex: 1, minWidth: 0 },
  text: {
    fontSize: '0.875rem',
    color: 'rgba(255,255,255,0.65)',
    lineHeight: 1.4,
  },
  bold: {
    color: 'rgba(255,255,255,0.85)',
    fontWeight: 500,
  },
  time: {
    fontSize: '0.75rem',
    color: 'rgba(255,255,255,0.2)',
    marginTop: '0.15rem',
  },
};

/* ─── Component ─── */
export default function ActivityTimeline({ activities }: ActivityTimelineProps) {
  if (!activities.length) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '2rem',
          color: 'rgba(255,255,255,0.2)',
          fontSize: '0.875rem',
        }}
      >
        Sin actividad reciente
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {activities.map((act) => (
        <div
          key={act.id}
          style={styles.item}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = 'transparent')
          }
        >
          <div style={{ ...styles.dot, background: dotColors[act.dotColor] }} />
          <div style={styles.content}>
            <div style={styles.text}>
              <strong style={styles.bold}>{act.boldSegment}</strong>
              {act.text}
            </div>
            <div style={styles.time}>{act.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Default timeline data ─── */
export const defaultActivities: Activity[] = [
  {
    id: '1',
    dotColor: 'gold',
    boldSegment: 'Análisis completado',
    text: ' — 12 propiedades en Polanco',
    time: 'Hace 15 minutos',
  },
  {
    id: '2',
    dotColor: 'blue',
    boldSegment: 'Informe generado',
    text: ' — Comparativa de precios por colonia',
    time: 'Hace 1 hora',
  },
  {
    id: '3',
    dotColor: 'green',
    boldSegment: 'Conversación archivada',
    text: ' — Consulta sobre créditos hipotecarios',
    time: 'Hace 3 horas',
  },
  {
    id: '4',
    dotColor: 'purple',
    boldSegment: 'Exportación realizada',
    text: ' — 45 propiedades a CSV',
    time: 'Hace 5 horas',
  },
];