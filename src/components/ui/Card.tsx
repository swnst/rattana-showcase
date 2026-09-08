'use client'

// --- Card Component ---
import React from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import Image from 'next/image'

export interface CardProps extends HTMLMotionProps<'div'> {
  imageSrc?: string
  imageAlt?: string
  imageAspect?: 'video' | 'square' | 'portrait'
  isSemiTransparent?: boolean
  children: React.ReactNode
  className?: string
}

const aspectStyles = {
  video: 'aspect-video',
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      imageSrc,
      imageAlt = 'Card image',
      imageAspect = 'video',
      isSemiTransparent = false,
      children,
      className = '',
      ...rest
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        whileHover={{
          scale: 1.02,
          boxShadow: '0 20px 40px -15px rgba(232, 74, 116, 0.18)',
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={`rounded-3xl overflow-hidden border border-rose-200/80 ${
          isSemiTransparent ? 'bg-white/80 backdrop-blur-md shadow-[0_8px_30px_rgba(232,74,116,0.06)]' : 'bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)]'
        } ${className}`}
        {...rest}
      >
        {imageSrc && (
          <div className={`relative w-full overflow-hidden ${aspectStyles[imageAspect]}`}>
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        )}
        <div className="p-6">{children}</div>
      </motion.div>
    )
  }
)

Card.displayName = 'Card'
