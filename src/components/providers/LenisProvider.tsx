'use client'

// --- Imports & Types ---
import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'

interface LenisContextValue {
  lenis: Lenis | null
}

const LenisContext = createContext<LenisContextValue>({ lenis: null })

export const useLenisContext = () => useContext(LenisContext)

interface LenisProviderProps {
  children: React.ReactNode
}

// --- Provider Implementation ---
export function LenisProvider({ children }: LenisProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenisRef.current = instance
    const timer = setTimeout(() => {
      setLenis(instance)
    }, 0)

    const updateScrollTrigger = () => {
      ScrollTrigger.update()
    }

    instance.on('scroll', updateScrollTrigger)

    const updateTicker = (time: number) => {
      instance.raf(time * 1000)
    }

    gsap.ticker.add(updateTicker)
    gsap.ticker.lagSmoothing(0)

    return () => {
      clearTimeout(timer)
      instance.off('scroll', updateScrollTrigger)
      gsap.ticker.remove(updateTicker)
      instance.destroy()
      lenisRef.current = null
      setLenis(null)
    }
  }, [])

  return (
    <LenisContext.Provider value={{ lenis }}>
      {children}
    </LenisContext.Provider>
  )
}
