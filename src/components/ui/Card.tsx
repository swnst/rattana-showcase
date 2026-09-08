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
    const cardInternalRef = React.useRef<HTMLDivElement>(null)
    const [glarePos, setGlarePos] = React.useState({ x: 50, y: 50, opacity: 0 })
    const [tilt, setTilt] = React.useState({ x: 0, y: 0 })

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const target = cardInternalRef.current
      if (!target) return
      const rect = target.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      const tiltX = ((y - 50) / 50) * -5
      const tiltY = ((x - 50) / 50) * 5
      setGlarePos({ x, y, opacity: 1 })
      setTilt({ x: tiltX, y: tiltY })
    }

    const handleMouseLeave = () => {
      setGlarePos((prev) => ({ ...prev, opacity: 0 }))
      setTilt({ x: 0, y: 0 })
    }

    return (
      <div style={{ perspective: 1000 }} className="w-full h-full">
        <motion.div
          ref={(node) => {
            cardInternalRef.current = node
            if (typeof ref === 'function') ref(node)
            else if (ref) ref.current = node
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          animate={{
            rotateX: tilt.x,
            rotateY: tilt.y,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 220, mass: 0.2 }}
          whileHover={{
            scale: 1.02,
            boxShadow: '0 25px 50px -15px rgba(232, 74, 116, 0.22)',
          }}
          className={`group relative rounded-3xl overflow-hidden border border-rose-200/90 transition-colors duration-300 hover:border-pink-300 ${
            isSemiTransparent
              ? 'bg-white/80 backdrop-blur-md shadow-[0_8px_30px_rgba(232,74,116,0.06)]'
              : 'bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)]'
          } ${className}`}
          style={{ transformStyle: 'preserve-3d' }}
          {...rest}
        >
          {imageSrc && (
            <div className={`relative w-full overflow-hidden ${aspectStyles[imageAspect]}`}>
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />
            </div>
          )}

          {/* Specular Glare Reflection */}
          <div
            className="absolute inset-0 pointer-events-none z-20 mix-blend-overlay transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.05) 50%, transparent 80%)`,
              opacity: glarePos.opacity,
            }}
          />

          <div className="p-6 relative z-10">{children}</div>
        </motion.div>
      </div>
    )
  }
)

Card.displayName = 'Card'
