'use client'

// --- Imports ---
import React, { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/Button'
import { gsap } from '@/lib/gsap'
import { useGSAP } from '@/hooks/useGSAP'

// --- CTA Section Component ---
export function CTASection() {
  const t = useTranslations('home.cta')
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            clearProps: 'all',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        )
      }

      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: 0.15,
            ease: 'power3.out',
            clearProps: 'all',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        )
      }

      if (buttonRef.current) {
        gsap.fromTo(
          buttonRef.current,
          { scale: 0.85, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            delay: 0.3,
            ease: 'back.out(1.5)',
            clearProps: 'all',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        )
      }
    },
    [],
    containerRef
  )

  return (
    <section
      ref={containerRef}
      className="py-20 md:py-32 relative bg-gradient-to-b from-[#FFF0F4] via-[#FFE4EC]/50 to-[#FFF8F9] overflow-hidden border-t border-rose-200/50"
    >
      {/* Floating Decorative Luxury Starlets */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute top-1/4 left-[8%] w-6 h-6 text-rose-400/40 animate-pulse">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
          </svg>
        </div>
        <div className="absolute bottom-1/4 right-[10%] w-7 h-7 text-rose-500/30 animate-pulse [animation-delay:1.2s]">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
          </svg>
        </div>
        <div className="absolute top-1/3 right-[20%] w-4 h-4 text-pink-400/35 animate-pulse [animation-delay:0.6s]">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
          </svg>
        </div>
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-radial from-rose-300/25 via-pink-200/10 to-transparent blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center relative z-10">
        <h2
          ref={titleRef}
          className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-gradient-hero mb-4 tracking-tight"
        >
          {t('title')}
        </h2>
        <p
          ref={subtitleRef}
          className="text-base sm:text-lg md:text-xl text-rose-900/75 max-w-xl mb-8 leading-relaxed font-medium"
        >
          {t('subtitle')}
        </p>
        <div ref={buttonRef}>
          <Button
            as="a"
            href="https://line.me/R/ti/p/@701zbckv"
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="lg"
          >
            {t('button')}
          </Button>
        </div>
      </div>
    </section>
  )
}
