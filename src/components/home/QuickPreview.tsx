'use client'

// --- Imports ---
import React, { useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { portfolioItems } from '@/data/portfolio-items'
import { Card } from '@/components/ui/Card'
import { Badge, type BadgeVariant } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Link } from '@/i18n/routing'
import { gsap } from '@/lib/gsap'
import { useGSAP } from '@/hooks/useGSAP'

// --- Platform Mini Icon ---
function PlatformMiniIcon({ platform }: { platform: string }) {
  switch (platform) {
    case 'instagram':
      return (
        <svg className="w-5 h-5 text-sky-pastel" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      )
    case 'tiktok':
      return (
        <svg className="w-5 h-5 text-sky-pastel" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298 0 .592.046.87.136V9.4a6.33 6.33 0 0 0-6.19 6.34 6.34 6.34 0 0 0 1082 4.49 6.3 6.3 0 0 0 1.84-4.5V8.84a8.28 8.28 0 0 0 4.77 1.52V6.91a4.84 4.84 0 0 1-2-.22z" />
        </svg>
      )
    case 'lemon8':
      return (
        <svg className="w-5 h-5 text-sky-pastel" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
        </svg>
      )
    default:
      return null
  }
}

// --- Quick Preview Component ---
export function QuickPreview() {
  const t = useTranslations('home')
  const locale = useLocale()
  const isThai = locale === 'th'
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const buttonWrapperRef = useRef<HTMLDivElement>(null)

  const featuredItems = portfolioItems.slice(0, 4)

  const getBadgeVariant = (category: string): BadgeVariant => {
    switch (category) {
      case 'education':
        return 'pink'
      case 'cosplay':
        return 'pink'
      case 'website':
        return 'blue'
      case 'lifestyle':
        return 'beige'
      default:
        return 'blue'
    }
  }

  useGSAP(
    () => {
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          y: 30,
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

      const cards = containerRef.current?.querySelectorAll('.preview-card')
      if (cards && cards.length > 0) {
        gsap.from(cards, {
          y: 40,
          opacity: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            once: true,
          },
        })
      }

      if (buttonWrapperRef.current) {
        gsap.from(buttonWrapperRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          delay: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
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
      className="py-20 md:py-32 relative bg-gradient-to-b from-[#FFF8F9] to-[#FFF0F4] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2
          ref={titleRef}
          className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-center text-rose-950 mb-12 md:mb-16 tracking-tight"
        >
          {t('preview.title')}{' '}
          <span className="text-gradient-rose">
            {isThai ? 'ล่าสุด' : 'Spotlight'}
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {featuredItems.map((item) => (
            <div key={item.id} className="preview-card h-full">
              <Card
                imageSrc={item.thumbnailUrl}
                imageAlt={isThai ? item.title.th : item.title.en}
                imageAspect="video"
                isSemiTransparent
                className="h-full flex flex-col justify-between"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant={getBadgeVariant(item.category)}>
                      {item.category}
                    </Badge>
                    <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-rose-50 border border-rose-100 text-rose-600">
                      <PlatformMiniIcon platform={item.platform} />
                    </div>
                  </div>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-rose-950 line-clamp-1">
                    {isThai ? item.title.th : item.title.en}
                  </h3>
                  <p className="text-sm text-rose-900/70 line-clamp-2">
                    {isThai ? item.description.th : item.description.en}
                  </p>
                </div>
              </Card>
            </div>
          ))}
        </div>

        <div ref={buttonWrapperRef} className="mt-12 md:mt-16 text-center">
          <Link href="/portfolio">
            <Button variant="secondary" size="lg">
              {t('preview.viewAll')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
