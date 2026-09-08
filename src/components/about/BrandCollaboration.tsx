'use client'

// --- Brand Collaboration Component ---
import React, { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { gsap } from '@/lib/gsap'
import { useGSAP } from '@/hooks/useGSAP'

const brands = [
  'Brand 1',
  'Brand 2',
  'Brand 3',
  'Brand 4',
  'Brand 5',
  'Brand 6',
]

export function BrandCollaboration() {
  const t = useTranslations('about')
  const containerRef = useRef<HTMLElement | null>(null)
  const headerRef = useRef<HTMLDivElement | null>(null)

  useGSAP(
    () => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            clearProps: 'all',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        )
      }

      const boxes = containerRef.current?.querySelectorAll('.brand-box')
      if (boxes && boxes.length > 0) {
        gsap.fromTo(
          boxes,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
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
    },
    [],
    containerRef
  )

  return (
    <section ref={containerRef} className="py-12 md:py-20">
      <div ref={headerRef} className="text-center mb-10">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-rose-950 tracking-tight mb-3">
          {t('brandsTitle')}
        </h2>
        <p className="font-sans text-sm sm:text-base text-rose-900/60 font-medium">
          {t('brandsPlaceholder')}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
        {brands.map((brand) => (
          <div
            key={brand}
            className="brand-box flex items-center justify-center h-28 sm:h-32 rounded-2xl bg-white/70 backdrop-blur-md border border-rose-200/80 text-rose-950 font-sans font-semibold text-base sm:text-lg tracking-wide select-none shadow-xs transition-all duration-300 hover:bg-white hover:border-pink-accent/50 hover:shadow-[0_10px_25px_rgba(232,74,116,0.1)] hover:-translate-y-0.5"
          >
            {brand}
          </div>
        ))}
      </div>
    </section>
  )
}
