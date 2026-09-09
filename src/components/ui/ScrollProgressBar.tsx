'use client'

// --- Imports ---
import React from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

// --- Scroll Progress Bar Component ---
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-pink-accent via-pink-light to-sky-pastel origin-left z-50 pointer-events-none transform-gpu shadow-[0_0_8px_rgba(232,74,116,0.4)]"
      aria-hidden="true"
    />
  )
}
