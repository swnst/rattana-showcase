// --- Badge Component ---
import React from 'react'

export type BadgeVariant = 'pink' | 'blue' | 'beige'

export interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  pink: 'bg-pink-accent/15 text-pink-accent border border-pink-accent/30',
  blue: 'bg-sky-pastel/15 text-sky-pastel border border-sky-pastel/30',
  beige: 'bg-beige/15 text-beige border border-beige/30',
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
