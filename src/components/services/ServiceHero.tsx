'use client'

// --- Service Hero Component ---
import React, { useRef } from 'react'
import { useGSAP } from '@/hooks/useGSAP'
import { gsap } from '@/lib/gsap'
import { Badge } from '@/components/ui/Badge'

export interface ServiceHeroProps {
  title?: string
  subtitle?: string
  badgeText?: string
}

export function ServiceHero({
  title = 'Video Editing Services',
  subtitle = 'Professional video editing for social media content',
  badgeText = 'Services',
}: ServiceHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const titleWords = title.split(' ')

  useGSAP(
    () => {
      if (!containerRef.current) return

      const words = containerRef.current.querySelectorAll('.hero-word')
      const sub = containerRef.current.querySelector('.hero-subtitle')
      const badge = containerRef.current.querySelector('.hero-badge')

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      if (badge) {
        tl.from(badge, {
          y: -20,
          opacity: 0,
          duration: 0.6,
        })
      }

      if (words.length) {
        tl.from(
          words,
          {
            y: 50,
            opacity: 0,
            rotateX: -30,
            duration: 0.8,
            stagger: 0.08,
          },
          badge ? '-=0.3' : 0
        )
      }

      if (sub) {
        tl.from(
          sub,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.4'
        )
      }
    },
    [title, subtitle],
    containerRef
  )

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[radial-gradient(circle_at_50%_20%,rgba(255,182,199,0.35)_0%,rgba(255,235,240,0.2)_50%,transparent_75%),linear-gradient(180deg,#FFF1F4_0%,#FFF8F9_100%)] pt-20 pb-16 sm:pt-28 sm:pb-24 px-4 sm:px-6 lg:px-8 border-b border-rose-200/60"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-rose-200/40 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -right-40 w-[400px] h-[400px] bg-pink-300/20 rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center z-10">
        <div className="hero-badge inline-block mb-6">
          <Badge variant="pink">{badgeText}</Badge>
        </div>

        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold text-rose-950 tracking-tight mb-6 leading-[1.15]">
          {titleWords.map((word, idx) => (
            <span
              key={`${word}-${idx}`}
              className="inline-block overflow-hidden mr-[0.25em] align-top"
            >
              <span className="hero-word inline-block will-change-transform">
                {word}
              </span>
            </span>
          ))}
        </h1>

        <p className="hero-subtitle text-lg sm:text-xl md:text-2xl text-rose-900/75 max-w-2xl mx-auto leading-relaxed font-medium">
          {subtitle}
        </p>
      </div>
    </section>
  )
}
