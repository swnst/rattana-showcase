'use client'

// --- Profile Section Component ---
import React, { useRef } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { gsap } from '@/lib/gsap'
import { useGSAP } from '@/hooks/useGSAP'

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
          start: 'top 80%',
          once: true,
        },
      })

      tl.from(imageWrapperRef.current, {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })
        .from(
          titleRef.current,
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.6'
        )
        .from(
          subtitleRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.5'
        )
        .from(
          '.bio-paragraph',
          {
            y: 25,
            opacity: 0,
            duration: 0.7,
            stagger: 0.18,
            ease: 'power3.out',
          },
          '-=0.4'
        )
    },
    [],
    sectionRef
  )

  return (
    <section ref={sectionRef} className="relative py-12 md:py-20">
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16">
        {/* --- Image Frame with Glow --- */}
        <div
          ref={imageWrapperRef}
          className="relative w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[360px] mx-auto lg:mx-0 flex-shrink-0"
        >
          <div className="absolute -inset-2 bg-gradient-to-tr from-pink-accent/25 via-[#FFE4EC]/50 to-transparent rounded-3xl blur-xl" />
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden border-2 border-white/80 shadow-[0_20px_50px_rgba(232,74,116,0.15)] bg-white/80 backdrop-blur-md">
            <Image
              src="/images/profile-placeholder.svg"
              alt={t('profileName')}
              fill
              priority
              sizes="(max-width: 768px) 280px, 360px"
              className="object-cover"
            />
          </div>
        </div>

        {/* --- Bio Content --- */}
        <div className="w-full lg:w-7/12 flex flex-col justify-center">
          <h1
            ref={titleRef}
            className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold text-rose-950 tracking-tight leading-none mb-3"
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
