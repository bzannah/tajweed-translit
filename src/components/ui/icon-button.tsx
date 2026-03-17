'use client';

import { cn } from '@/lib/cn';
import type { ReactNode } from 'react';

/** Props for the IconButton component. */
export interface IconButtonProps {
  /** Icon content to render inside the button */
  icon: ReactNode;
  /** Accessible label for screen readers */
  label: string;
  /** Click handler */
  onClick?: () => void;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Visual variant */
  variant?: 'ghost' | 'filled';
  /** Additional CSS classes */
  className?: string;
  /** Optional test ID */
  'data-testid'?: string;
}

/**
 * A consistent icon button with hover states and accessibility.
 * Used throughout the app for toolbar and control buttons.
 */
export function IconButton({
  icon,
  label,
  onClick,
  disabled = false,
  variant = 'ghost',
  className,
  'data-testid': testId,
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      data-testid={testId}
      className={cn(
        'inline-flex items-center justify-center rounded-lg p-2 transition-colors duration-150',
        'focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg focus:outline-none',
        disabled && 'cursor-not-allowed opacity-50',
        variant === 'ghost' && 'hover:bg-surface-hover active:bg-surface-active',
        variant === 'filled' && 'bg-accent text-bg hover:opacity-90',
        className
      )}
    >
      {icon}
    </button>
  );
}
