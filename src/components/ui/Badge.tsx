'use client';

import React from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'gold' | 'success' | 'warning' | 'neutral';

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  gold:
    'bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] text-[#0a0a12] font-bold',
  success:
    'bg-[#34d399]/10 text-[var(--color-green)] font-semibold',
  warning:
    'bg-[#f59e0b]/10 text-[var(--color-gold)] font-semibold',
  neutral:
    'bg-white/[0.04] text-[var(--color-muted)] font-medium',
};

export default function Badge({
  variant = 'gold',
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
