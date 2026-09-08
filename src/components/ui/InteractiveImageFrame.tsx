'use client'

// --- Imports ---
import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

// --- Props Interface ---
export interface InteractiveImageFrameProps {
  children: React.ReactNode
  className?: string
  aspectRatio?: string
  tiltStrength?: number
  enableGlow?: boolean
  enableSvgBorder?: boolean
}

// --- Interactive Image Frame Component ---
export function InteractiveImageFrame({
  children,
  className = '',
  aspectRatio = 'aspect-square',
  tiltStrength = 10,
  enableGlow = true,
  enableSvgBorder = true,
}: InteractiveImageFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const springConfig = { damping: 20, stiffness: 200, mass: 0.2 }
  const smoothMouseX = useSpring(mouseX, springConfig)
  const smoothMouseY = useSpring(mouseY, springConfig)

  const rotateX = useTransform(smoothMouseY, [0, 1], [tiltStrength, -tiltStrength])
  const rotateY = useTransform(smoothMouseX, [0, 1], [-tiltStrength, tiltStrength])

  const innerParallaxX = useTransform(smoothMouseX, [0, 1], [8, -8])
  const innerParallaxY = useTransform(smoothMouseY, [0, 1], [8, -8])

  const glareX = useTransform(smoothMouseX, [0, 1], ['0%', '100%'])
  const glareY = useTransform(smoothMouseY, [0, 1], ['0%', '100%'])

  // --- Event Handlers ---
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    mouseX.set(Math.min(Math.max(x, 0), 1))
    mouseY.set(Math.min(Math.max(y, 0), 1))
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative select-none ${className}`}
      style={{ perspective: 1200 }}
    >
      {/* Ambient Backdrop Glow */}
      {enableGlow && (
        <motion.div
          animate={{
            scale: isHovered ? 1.08 : 1,
            opacity: isHovered ? 0.6 : 0.35,
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="absolute -inset-3 rounded-[2.2rem] bg-gradient-to-tr from-pink-accent/30 via-rose-300/40 to-sky-pastel/30 blur-2xl pointer-events-none -z-10"
        />
      )}

      {/* 3D Tilting Card Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className={`relative w-full ${aspectRatio} rounded-3xl overflow-hidden border-2 border-white/90 bg-white/80 shadow-[0_20px_50px_rgba(232,74,116,0.16)] backdrop-blur-md transition-shadow duration-500 hover:shadow-[0_30px_70px_rgba(232,74,116,0.25)]`}
      >
        {/* Parallax Inner Content */}
        <motion.div
          style={{
            x: innerParallaxX,
            y: innerParallaxY,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="relative w-full h-full will-change-transform"
        >
          {children}
        </motion.div>

        {/* Specular Glare Reflection */}
        <motion.div
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(circle at ${gx} ${gy}, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.05) 50%, transparent 80%)`
            ),
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 pointer-events-none z-20 mix-blend-overlay"
        />

        {/* Animated SVG Border Outline */}
        {enableSvgBorder && (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="1.5"
              y="1.5"
              width="calc(100% - 3px)"
              height="calc(100% - 3px)"
              rx="22"
              stroke="url(#frame-gradient)"
              strokeWidth="2"
              strokeDasharray="40 160"
              className="transition-all duration-700"
              style={{
                strokeDashoffset: isHovered ? 120 : 0,
                opacity: isHovered ? 1 : 0.4,
              }}
            />
            <defs>
              <linearGradient id="frame-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E84A74" />
                <stop offset="50%" stopColor="#FFB6C7" />
                <stop offset="100%" stopColor="#7DD3FC" />
              </linearGradient>
            </defs>
          </svg>
        )}
      </motion.div>
    </div>
  )
}
