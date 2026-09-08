'use client'

// --- Page Transition Component ---
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { usePathname } from '@/i18n/routing'
import { ScrollTrigger } from '@/lib/gsap'

interface PageTransitionProps {
  children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo(0, 0)
    ScrollTrigger.refresh()
  }, [pathname])

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="w-full"
    >
      {children}
    </motion.div>
  )
}
