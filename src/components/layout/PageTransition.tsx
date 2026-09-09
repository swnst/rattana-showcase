'use client'

// --- Page Transition Component ---
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { usePathname } from '@/i18n/routing'
import { ScrollTrigger } from '@/lib/gsap'
import { useLenisContext } from '@/components/providers/LenisProvider'

interface PageTransitionProps {
  children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const { lenis } = useLenisContext()

  useEffect(() => {
    // Reset scroll instantly without fighting RAF
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0

    // Refresh ScrollTrigger after next two animation frames so DOM is stable
    let rafId: number
    const timer = setTimeout(() => {
      rafId = requestAnimationFrame(() => {
        ScrollTrigger.refresh()
      })
    }, 100)

    return () => {
      clearTimeout(timer)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [pathname, lenis])

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
      className="w-full will-change-[transform,opacity] transform-gpu"
    >
      {children}
    </motion.div>
  )
}

