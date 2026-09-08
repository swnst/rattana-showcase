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
      gsap.from(headerRef.current, {
        y: 25,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          once: true,
        },
      })

      gsap.from('.brand-box', {
        rotation: -5,
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true,
        },
      })
    },
    [],
    containerRef
  )

  return (
    <section ref={containerRef} className="py-12 md:py-20">
      <div ref={headerRef} className="text-center mb-10">
        <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-3">
          {t('brandsTitle')}
        </h2>
        <p className="font-inter text-sm sm:text-base text-beige/60">
          {t('brandsPlaceholder')}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
        {brands.map((brand) => (
          <div
            key={brand}
            className="brand-box flex items-center justify-center h-28 sm:h-32 rounded-xl bg-beige/10 border border-sky-pastel/15 text-beige/80 font-inter font-medium text-base sm:text-lg tracking-wide select-none transition-all duration-300 hover:bg-beige/15 hover:border-pink-accent/40 hover:text-white"
          >
            {brand}
          </div>
        ))}
      </div>
    </section>
  )
}
