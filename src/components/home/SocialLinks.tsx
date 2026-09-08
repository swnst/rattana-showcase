'use client'

// --- Imports ---
import React, { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { gsap } from '@/lib/gsap'
import { useGSAP } from '@/hooks/useGSAP'
import { socialLinks } from '@/data/social-links'
import { MagneticElement } from '@/components/ui/MagneticElement'

// --- Icon Component Mapping ---
function PlatformIcon({ platform }: { platform: string }) {
  switch (platform) {
    case 'instagram':
      return (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      )
    case 'tiktok':
      return (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298 0 .592.046.87.136V9.4a6.33 6.33 0 0 0-6.19 6.34 6.34 6.34 0 0 0 10.82 4.49 6.3 6.3 0 0 0 1.84-4.5V8.84a8.28 8.28 0 0 0 4.77 1.52V6.91a4.84 4.84 0 0 1-2-.22z" />
        </svg>
      )
    case 'lemon8':
      return (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
        </svg>
      )
    case 'linkedin':
      return (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.65 1.65 0 1 0 0-3.3 1.65 1.65 0 0 0 0 3.3m1.39 9.74v-8.37H5.07v8.37h2.78z" />
        </svg>
      )
    default:
      return null
  }
}

// --- Social Links Component ---
export function SocialLinks() {
  const t = useTranslations('common')
  const containerRef = useRef<HTMLDivElement>(null)
  const lineLinkRef = useRef<HTMLDivElement>(null)

  const platformsToShow = ['instagram', 'tiktok', 'lemon8', 'linkedin'] as const
  const activeSocials = socialLinks.filter((s) =>
    platformsToShow.includes(s.platform as (typeof platformsToShow)[number])
  )
  const lineItem = socialLinks.find((s) => s.platform === 'line')
  const lineUrl = lineItem?.url ?? 'https://line.me/R/ti/p/@701zbckv'

  useGSAP(
    () => {
      const items = containerRef.current?.querySelectorAll('.social-item')
      if (items && items.length > 0) {
        gsap.fromTo(
          items,
          { opacity: 0, x: -25 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.08,
            duration: 0.6,
            ease: 'power2.out',
            clearProps: 'all',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        )
      }

      if (lineLinkRef.current) {
        gsap.fromTo(
          lineLinkRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.25,
            ease: 'power2.out',
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
    <section ref={containerRef} className="py-16 md:py-24 bg-navy-dark/80 relative">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center gap-6">
        <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 flex-wrap">
          {activeSocials.map((link) => (
            <div key={link.platform} className="social-item">
              <MagneticElement strength={0.4}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-14 h-14 rounded-full bg-navy border border-sky-pastel/20 flex items-center justify-center text-sky-pastel hover:text-pink-accent hover:border-pink-accent/50 hover:shadow-[0_0_20px_rgba(232,71,151,0.3)] transition-all duration-300"
                >
                  <PlatformIcon platform={link.platform} />
                </a>
              </MagneticElement>
            </div>
          ))}
        </div>

        <div ref={lineLinkRef} className="text-center">
          <a
            href={lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm md:text-base text-sky-pastel/80 hover:text-pink-accent transition-colors duration-200 font-medium tracking-wide underline underline-offset-4 decoration-pink-accent/50"
          >
            <span>{t('forWork')}</span>
          </a>
        </div>
      </div>
    </section>
  )
}
