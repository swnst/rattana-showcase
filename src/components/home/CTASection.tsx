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
        gsap.from(titleRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            once: true,
          },
        })
      }

      if (subtitleRef.current) {
        gsap.from(subtitleRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            once: true,
          },
        })
      }

      if (buttonRef.current) {
        gsap.from(buttonRef.current, {
          scale: 0.8,
          opacity: 0,
          duration: 0.6,
          delay: 0.4,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            once: true,
          },
        })
      }
    },
    [],
    containerRef
  )

  return (
    <section
      ref={containerRef}
      className="py-20 md:py-32 relative bg-gradient-to-b from-navy-dark to-navy overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        <h2
          ref={titleRef}
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-beige mb-4 tracking-tight"
        >
          {t('title')}
        </h2>
        <p
          ref={subtitleRef}
          className="text-base sm:text-lg md:text-xl text-sky-pastel/90 max-w-xl mb-8 leading-relaxed"
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
