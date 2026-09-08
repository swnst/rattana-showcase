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

      gsap.fromTo(
        elements,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      )
    },
    [],
    containerRef
  )

  const lineUrl = `https://line.me/R/ti/p/${lineId}`

  return (
    <section className="w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FFF8F9] to-[#FFF0F4] border-t border-rose-200/60">
      <div
        ref={containerRef}
        className="max-w-4xl mx-auto rounded-3xl p-8 sm:p-14 bg-gradient-to-r from-white via-rose-50/70 to-white border border-rose-200/80 shadow-[0_20px_50px_rgba(232,74,116,0.1)] text-center relative overflow-hidden"
      >
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-rose-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-pink-300/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <h2 className="cta-animate font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-rose-950 tracking-tight leading-tight">
            {title}
          </h2>
          <p className="cta-animate text-base sm:text-lg text-rose-900/75 max-w-xl mx-auto font-medium">
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
                className="font-semibold text-base sm:text-lg px-8 py-4 shadow-[0_4px_16px_rgba(232,74,116,0.35)]"
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
          <p className="cta-animate text-xs text-rose-900/60 tracking-wider font-semibold">
            Line ID: {lineId}
          </p>
        </div>
      </div>
    </section>
  )
}
