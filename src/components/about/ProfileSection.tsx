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
          className="relative w-full max-w-sm sm:max-w-md lg:w-5/12 flex-shrink-0"
        >
          <div className="absolute -inset-2 bg-gradient-to-tr from-pink-accent/40 via-sky-pastel/20 to-transparent rounded-3xl blur-xl" />
          <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border-2 border-pink-accent/60 shadow-[0_0_35px_rgba(232,71,151,0.25)] bg-navy-dark/60 backdrop-blur-md">
            <Image
              src="/images/profile-placeholder.svg"
              alt={t('profileName')}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
              className="object-cover"
            />
          </div>
        </div>

        {/* --- Bio Content --- */}
        <div className="w-full lg:w-7/12 flex flex-col justify-center">
          <h1
            ref={titleRef}
            className="font-playfair text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-none mb-3"
          >
            {t('profileName')}
          </h1>

          <p
            ref={subtitleRef}
            className="font-inter text-base sm:text-lg md:text-xl text-beige/70 font-medium tracking-wide mb-8"
          >
            {t('profileSubtitle')}
          </p>

          <div ref={bioRef} className="space-y-4 text-beige/90 text-base sm:text-lg leading-relaxed font-inter">
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
