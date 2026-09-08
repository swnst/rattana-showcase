'use client'

// --- Service CTA Component ---
import React, { useRef } from 'react'
import { useGSAP } from '@/hooks/useGSAP'
import { gsap } from '@/lib/gsap'
import { Button } from '@/components/ui/Button'
import { MagneticElement } from '@/components/ui/MagneticElement'

export interface ServiceCTAProps {
  title?: string
  subtitle?: string
  buttonText?: string
  lineId?: string
}

export function ServiceCTA({
  title = 'Interested in working together?',
  subtitle = 'Let us create outstanding visual stories for your brand and content.',
  buttonText = 'Contact via Line',
  lineId = '@701zbckv',
}: ServiceCTAProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!containerRef.current) return

      const elements = containerRef.current.querySelectorAll('.cta-animate')

      gsap.from(elements, {
        y: 35,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
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

  const lineUrl = `https://line.me/R/ti/p/${lineId}`

  return (
    <section className="w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-navy-dark to-navy-deepest border-t border-sky-pastel/15">
      <div
        ref={containerRef}
        className="max-w-4xl mx-auto rounded-3xl p-8 sm:p-14 bg-gradient-to-r from-navy-dark/90 via-navy/80 to-navy-dark/90 border border-sky-pastel/25 shadow-2xl text-center relative overflow-hidden"
      >
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-pink-accent/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-sky-pastel/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <h2 className="cta-animate font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-beige tracking-tight leading-tight">
            {title}
          </h2>
          <p className="cta-animate text-base sm:text-lg text-sky-pastel/90 max-w-xl mx-auto">
            {subtitle}
          </p>
          <div className="cta-animate pt-4">
            <MagneticElement strength={0.3}>
              <Button
                as="a"
                href={lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="lg"
                className="font-semibold text-base sm:text-lg px-8 py-4 shadow-[0_0_25px_rgba(232,71,151,0.5)]"
              >
                <span className="flex items-center gap-3">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.019 9.577.39.084.922.258 1.057.592.121.303.079.778.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.646 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.589-3.843 2.589-5.962z" />
                  </svg>
                  {buttonText}
                </span>
              </Button>
            </MagneticElement>
          </div>
          <p className="cta-animate text-xs text-sky-pastel/60 tracking-wider">
            Line ID: {lineId}
          </p>
        </div>
      </div>
    </section>
  )
}
