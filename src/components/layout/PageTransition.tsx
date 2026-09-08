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
    // Force immediate scroll to top on both Lenis and native browser
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0

    // Refresh ScrollTrigger calculations after DOM settles
    const timer1 = setTimeout(() => {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true })
      }
      ScrollTrigger.refresh()
    }, 60)

    const timer2 = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 250)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [pathname, lenis])

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 15, filter: 'blur(3px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      {children}
    </motion.div>
  )
}

