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
          boxShadow: '0 10px 30px -10px rgba(148, 194, 218, 0.25)',
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={`rounded-2xl overflow-hidden border border-sky-pastel/20 ${
          isSemiTransparent ? 'bg-navy-dark/60 backdrop-blur-md' : 'bg-navy-dark'
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
