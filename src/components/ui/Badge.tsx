// --- Badge Component ---
import React from 'react'

export type BadgeVariant = 'pink' | 'blue' | 'beige'

export interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  pink: 'bg-rose-100/90 text-rose-800 border border-rose-200/80 shadow-2xs',
  blue: 'bg-rose-50 text-rose-900/80 border border-rose-100 shadow-2xs',
  beige: 'bg-white/90 text-rose-950 border border-rose-200/60 shadow-2xs',
}

export function Badge({ variant = 'blue', children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full uppercase tracking-wider backdrop-blur-sm ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
