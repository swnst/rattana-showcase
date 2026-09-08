'use client'

// --- Button Component ---
import React from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface BaseButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  children: React.ReactNode
  className?: string
}

type ButtonAsButton = BaseButtonProps &
  Omit<HTMLMotionProps<'button'>, keyof BaseButtonProps> & {
    as?: 'button'
    href?: undefined
  }

type ButtonAsAnchor = BaseButtonProps &
  Omit<HTMLMotionProps<'a'>, keyof BaseButtonProps> & {
    as: 'a'
    href: string
  }

export type ButtonProps = ButtonAsButton | ButtonAsAnchor

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-gradient-to-r from-pink-accent via-[#FF6B93] to-pink-accent text-white shadow-[0_4px_14px_rgba(232,74,116,0.3)] hover:shadow-[0_6px_25px_rgba(232,74,116,0.45)] border border-transparent',
  secondary: 'bg-white/80 text-rose-950 border border-rose-200/80 hover:border-pink-accent hover:text-pink-accent hover:bg-rose-50/60 shadow-xs',
  ghost: 'bg-transparent text-rose-900/80 hover:text-pink-accent hover:bg-rose-100/40',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs font-medium rounded-full',
  md: 'px-5 py-2.5 text-sm font-medium rounded-full',
  lg: 'px-7 py-3.5 text-base font-semibold rounded-full',
}

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      children,
      className = '',
      as = 'button',
      ...rest
    },
    ref
  ) => {
    const combinedClass = `inline-flex items-center justify-center transition-colors cursor-pointer select-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

    if (as === 'a') {
      const anchorProps = rest as HTMLMotionProps<'a'>
      return (
        <motion.a
          ref={ref as React.Ref<HTMLAnchorElement>}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className={combinedClass}
          {...anchorProps}
        >
          {children}
        </motion.a>
      )
    }

    const buttonProps = rest as HTMLMotionProps<'button'>
    return (
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className={combinedClass}
        {...buttonProps}
      >
        {children}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'
