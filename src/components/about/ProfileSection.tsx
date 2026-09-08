'use client'

// --- Profile Section Component ---
import React, { useRef } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { gsap } from '@/lib/gsap'
import { useGSAP } from '@/hooks/useGSAP'

import { InteractiveImageFrame } from '@/components/ui/InteractiveImageFrame'

export function ProfileSection() {
  const t = useTranslations('about')
  const sectionRef = useRef<HTMLElement | null>(null)
  const imageWrapperRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const subtitleRef = useRef<HTMLParagraphElement | null>(null)
  const bioRef = useRef<HTMLDivElement | null>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true,
        },
      })

      if (imageWrapperRef.current) {
        tl.fromTo(
          imageWrapperRef.current,
          { x: -35, opacity: 0, scale: 0.9 },
          { x: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out', clearProps: 'all' }
        )
      }

      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', clearProps: 'all' },
          '-=0.5'
        )
      }

      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', clearProps: 'all' },
          '-=0.4'
        )
      }

      const bioParagraphs = sectionRef.current?.querySelectorAll('.bio-paragraph')
      if (bioParagraphs && bioParagraphs.length > 0) {
        tl.fromTo(
          bioParagraphs,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'power3.out', clearProps: 'all' },
          '-=0.3'
        )
      }
    },
    [],
    sectionRef
  )

  return (
    <section ref={sectionRef} className="relative py-12 md:py-20">
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16">
        {/* --- Image Frame with Interactive 3D Tilt & SVG Outline --- */}
        <div
          ref={imageWrapperRef}
          className="relative w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[360px] mx-auto lg:mx-0 flex-shrink-0"
        >
          <InteractiveImageFrame
            aspectRatio="aspect-square"
            tiltStrength={14}
            enableGlow={true}
            enableSvgBorder={true}
          >
            <div className="relative w-full h-full scale-105">
              <Image
                src="/images/profile-placeholder.svg"
                alt={t('profileName')}
                fill
                priority
                sizes="(max-width: 768px) 280px, 360px"
                className="object-cover"
              />
            </div>
          </InteractiveImageFrame>
        </div>

        {/* --- Bio Content --- */}
        <div className="w-full lg:w-7/12 flex flex-col justify-center">
          <h1
            ref={titleRef}
            className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold text-gradient-hero tracking-tight leading-none mb-3"
          >
            {t('profileName')}
          </h1>

          <p
            ref={subtitleRef}
            className="font-sans text-base sm:text-lg md:text-xl text-pink-accent font-semibold tracking-wide mb-8"
          >
            {t('profileSubtitle')}
          </p>

          <div ref={bioRef} className="space-y-4 text-rose-900/80 text-base sm:text-lg leading-relaxed font-sans">
            <p className="bio-paragraph">
              {t('bio1')}
            </p>
            <p className="bio-paragraph">
              {t('bio2')}
            </p>
            <p className="bio-paragraph">
              {t('bio3')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
