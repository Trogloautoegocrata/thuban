'use client';

import React from 'react';
import { cn } from '@/lib/utils';

type CardVariant = 'default' | 'featured' | 'metric';

interface CardProps {
  variant?: CardVariant;
  hover?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const variantStyles: Record<CardVariant, string> = {
  default:
    'bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl',
  featured:
    'bg-[var(--color-card)] border border-[#f59e0b]/30 rounded-xl shadow-[0_0_30px_rgba(245,158,11,0.06)]',
  metric:
    'bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-5',
};

export default function Card({
  variant = 'default',
  hover = false,
  className,
  children,
  onClick,
}: CardProps) {
  return (
    <div
      className={cn(
        variantStyles[variant],
        hover &&
          'transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(245,158,11,0.06)] hover:border-[var(--color-border-light)]',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}

// ─── Card sub-components for compositional use ───

export function CardIcon({
  children,
  color = 'gold',
  className,
}: {
  children: React.ReactNode;
  color?: 'gold' | 'blue' | 'green';
  className?: string;
}) {
  const bgColors = {
    gold: 'bg-[#f59e0b]/10',
    blue: 'bg-[#759ce7]/10',
    green: 'bg-[#34d399]/10',
  };
  const textColors = {
    gold: 'text-[var(--color-gold)]',
    blue: 'text-[var(--color-blue)]',
    green: 'text-[var(--color-green)]',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center w-10 h-10 rounded-lg mb-3',
        bgColors[color],
        textColors[color],
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3 className={cn('font-sans text-base font-semibold text-[var(--color-fg)] mb-1', className)}>
      {children}
    </h3>
  );
}

export function CardDescription({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn('text-sm text-[var(--color-muted)] leading-relaxed', className)}>
      {children}
    </p>
  );
}

export function CardValue({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('font-sans text-2xl md:text-3xl font-bold text-[var(--color-fg)] tracking-tight mb-0.5', className)}>
      {children}
    </div>
  );
}
