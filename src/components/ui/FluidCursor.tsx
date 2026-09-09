'use client'

// --- Imports ---
import React, { useEffect, useState, useRef } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

// --- Fluid Cursor Component ---
export function FluidCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const springConfig = { damping: 28, stiffness: 350, mass: 0.15 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (
        target?.closest('a, button, [role="button"], input, textarea, select, .preview-card, .stat-card, .skill-card')
      ) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mouseover', handleMouseOver, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [isVisible, mouseX, mouseY])

  if (!isVisible) return null

  return (
    <motion.div
      ref={cursorRef}
      style={{
        x: smoothX,
        y: smoothY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-multiply transition-opacity duration-300"
      aria-hidden="true"
    >
      <motion.div
        animate={{
          scale: isHovered ? 2.4 : 1,
          opacity: isHovered ? 0.35 : 0.2,
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-accent via-rose-300 to-sky-pastel blur-md transform-gpu"
      />
      <motion.div
        animate={{
          scale: isHovered ? 1.6 : 1,
          opacity: isHovered ? 0.8 : 0.5,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="absolute inset-0 m-auto w-2.5 h-2.5 rounded-full border border-pink-accent/80 bg-white/60 transform-gpu"
      />
    </motion.div>
  )
}
