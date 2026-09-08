'use client'

// --- Intro Screen Component ---
import React, { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'

export function IntroScreen() {
  const [isVisible, setIsVisible] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('rattana_has_seen_intro')
    if (hasSeenIntro) {
      return
    }

    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 0)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const ctx = gsap.context(() => {
      const letters = textRef.current?.querySelectorAll('.intro-letter')
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem('rattana_has_seen_intro', 'true')
          setIsVisible(false)
        },
      })

      // Step 1: "R" appear (scale up + fade in)
      tl.fromTo(
        logoRef.current,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.7)' }
      )

      // Step 2: "rattana_music" letter by letter
      if (letters && letters.length > 0) {
        tl.fromTo(
          letters,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.04, ease: 'power2.out' },
          '-=0.2'
        )
      }

      // Step 3: fade out inner contents and slide up curtain
      tl.to(
        [logoRef.current, textRef.current],
        { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in', delay: 0.3 }
      )
      tl.to(
        overlayRef.current,
        { yPercent: -100, duration: 0.7, ease: 'power3.inOut' },
        '-=0.1'
      )
    }, overlayRef)

    return () => ctx.revert()
  }, [isVisible])

  if (!isVisible) return null

  const brandText = 'rattana_music'.split('')

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FFF8F9] select-none"
    >
      <div
        ref={logoRef}
        className="font-display text-8xl md:text-9xl font-bold bg-gradient-to-r from-pink-accent via-[#FF6B93] to-pink-accent bg-clip-text text-transparent mb-4 tracking-tighter"
      >
        R
      </div>
      <div
        ref={textRef}
        className="text-lg md:text-xl font-medium tracking-[0.3em] uppercase text-rose-950/80 flex"
      >
        {brandText.map((char, index) => (
          <span key={`${char}-${index}`} className="intro-letter inline-block">
            {char}
          </span>
        ))}
      </div>
    </div>
  )
}
