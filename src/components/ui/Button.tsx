'use client';

import React from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg' | 'full';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  href?: string;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] text-[#0a0a12] font-semibold ' +
    'hover:opacity-90 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:-translate-y-0.5 ' +
    'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-y-0',
  secondary:
    'bg-transparent text-[var(--color-muted)] border border-[var(--color-border)] font-medium ' +
    'hover:text-[var(--color-fg)] hover:border-[var(--color-border-light)] ' +
    'disabled:opacity-40 disabled:cursor-not-allowed',
  ghost:
    'bg-transparent text-[var(--color-muted)] font-medium ' +
    'hover:text-[var(--color-fg)] hover:bg-white/[0.04] ' +
    'disabled:opacity-40 disabled:cursor-not-allowed',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-xl',
  lg: 'px-7 py-3.5 text-base rounded-xl',
  full: 'w-full justify-center px-5 py-3 text-sm rounded-xl',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  href,
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 transition-all duration-200 font-sans',
    'focus:outline-2 focus:outline-offset-2 focus:outline-[#f59e0b]',
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (href && !disabled) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
            <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
          {children}
        </>
      ) : (
        children
      )}
    </button>
  );
}
