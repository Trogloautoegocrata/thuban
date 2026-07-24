'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

type InputVariant = 'default' | 'error' | 'success';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  variant?: InputVariant;
  icon?: React.ReactNode;
  showPasswordToggle?: boolean;
  errorMessage?: string;
  wrapperClassName?: string;
}

export default function Input({
  label,
  variant = 'default',
  icon,
  showPasswordToggle = false,
  errorMessage,
  type = 'text',
  className,
  wrapperClassName,
  disabled,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password' && showPasswordToggle;
  const actualType = isPassword ? (showPassword ? 'text' : 'password') : type;

  const borderStyles = {
    default: 'border-[var(--color-border)] focus:border-[var(--color-gold)]',
    error: 'border-[var(--color-red)] focus:border-[var(--color-red)]',
    success: 'border-[var(--color-green)] focus:border-[var(--color-green)]',
  };

  return (
    <div className={cn('flex flex-col gap-1.5', wrapperClassName)}>
      {label && (
        <label className="text-xs font-semibold text-[var(--color-muted)] tracking-wide">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted-2)] pointer-events-none [&>svg]:h-4 [&>svg]:w-4">
            {icon}
          </span>
        )}
        <input
          type={actualType}
          disabled={disabled}
          className={cn(
            'w-full bg-white/[0.03] rounded-xl py-2.5 px-3 text-sm text-[var(--color-fg)]',
            'placeholder:text-[var(--color-muted-2)]',
            'border transition-all duration-200',
            'focus:shadow-[0_0_0_3px_rgba(245,158,11,0.08)] focus:outline-none',
            'disabled:opacity-40 disabled:cursor-not-allowed',
            borderStyles[variant],
            icon && 'pl-10',
            (isPassword) && 'pr-10',
            className
          )}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted-2)] hover:text-[var(--color-muted)] transition-colors"
            tabIndex={-1}
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            {showPassword ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        )}
      </div>
      {errorMessage && variant === 'error' && (
        <p className="text-xs text-[var(--color-red)] flex items-center gap-1">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 flex-shrink-0">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {errorMessage}
        </p>
      )}
    </div>
  );
}
