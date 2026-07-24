'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Badge from './Badge';

interface SectionHeadingProps {
  label?: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: 'center' | 'left';
  badge?: boolean;
  className?: string;
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = 'center',
  badge = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-12 md:mb-16',
        align === 'center' ? 'text-center' : 'text-left',
        className
      )}
    >
      {/* Eyebrow / Label */}
      {label && (
        <div className={cn(
          'inline-flex items-center gap-2 text-xs font-semibold tracking-[0.08em] uppercase text-[var(--color-gold)] mb-4',
          align === 'center' ? 'mx-auto' : ''
        )}>
          {badge ? (
            <Badge variant="gold">{label}</Badge>
          ) : (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
              {label}
            </>
          )}
        </div>
      )}

      {/* Title */}
      <h2 className="font-sans text-[clamp(1.6rem,3.5vw,2rem)] font-bold text-[var(--color-fg)] tracking-tight mb-3">
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className={cn(
          'text-sm md:text-base text-[var(--color-muted)] max-w-xl leading-relaxed',
          align === 'center' ? 'mx-auto' : ''
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
