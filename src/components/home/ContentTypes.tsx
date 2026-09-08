'use client'

// --- Imports ---
import React, { useRef } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Badge, type BadgeVariant } from '@/components/ui/Badge'
import { gsap } from '@/lib/gsap'
import { useGSAP } from '@/hooks/useGSAP'

interface ContentItem {
  id: 'education' | 'website' | 'lifestyle' | 'editing' | 'cosplay'
  variant: BadgeVariant
}

const contentCategories: ContentItem[] = [
  { id: 'education', variant: 'pink' },
  { id: 'website', variant: 'blue' },
  { id: 'lifestyle', variant: 'pink' },
  { id: 'editing', variant: 'blue' },
  { id: 'cosplay', variant: 'pink' },
]

// --- Content Types Component ---
export function ContentTypes() {
  const t = useTranslations('home.contentTypes')
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

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

      if (imageRef.current) {
        gsap.from(imageRef.current, {
          scale: 0.85,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            once: true,
          },
        })
      }

      const pills = containerRef.current?.querySelectorAll('.content-pill')
      if (pills && pills.length > 0) {
        gsap.from(pills, {
          scale: 0,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: 'back.out(1.7)',
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
      className="py-20 md:py-32 relative bg-gradient-to-b from-[#FFF8F9] via-[#FFF0F4] to-[#FFF8F9] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h2
          ref={titleRef}
          className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-center text-rose-950 mb-12 md:mb-20 tracking-tight"
        >
          {t('title')}
        </h2>

        {/* Layout: Surrounding layout on md/lg and stacked on mobile */}
        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Left / Top Pills */}
          <div className="flex lg:flex-col items-center lg:items-end justify-center gap-4 flex-wrap w-full lg:w-1/3">
            <div className="content-pill">
              <Badge
                variant={contentCategories[0].variant}
                className="text-sm md:text-base px-5 py-2.5"
              >
                {t(contentCategories[0].id)}
              </Badge>
            </div>
            <div className="content-pill">
              <Badge
                variant={contentCategories[1].variant}
                className="text-sm md:text-base px-5 py-2.5"
              >
                {t(contentCategories[1].id)}
              </Badge>
            </div>
          </div>

          {/* Center Image */}
          <div
            ref={imageRef}
            className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(232,74,116,0.15)] border-2 border-white/80 bg-white/70 backdrop-blur-md shrink-0"
          >
            <Image
              src="/images/placeholder-1.svg"
              alt={t('title')}
              fill
              sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-rose-950/20 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Right / Bottom Pills */}
          <div className="flex lg:flex-col items-center lg:items-start justify-center gap-4 flex-wrap w-full lg:w-1/3">
            <div className="content-pill">
              <Badge
                variant={contentCategories[2].variant}
                className="text-sm md:text-base px-5 py-2.5"
              >
                {t(contentCategories[2].id)}
              </Badge>
            </div>
            <div className="content-pill">
              <Badge
                variant={contentCategories[3].variant}
                className="text-sm md:text-base px-5 py-2.5"
              >
                {t(contentCategories[3].id)}
              </Badge>
            </div>
            <div className="content-pill">
              <Badge
                variant={contentCategories[4].variant}
                className="text-sm md:text-base px-5 py-2.5"
              >
                {t(contentCategories[4].id)}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
