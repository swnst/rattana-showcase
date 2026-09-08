'use client'

// --- Imports ---
import React, { useRef } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { gsap } from '@/lib/gsap'
import { useGSAP } from '@/hooks/useGSAP'
import { Button } from '@/components/ui/Button'

// --- Hero Section Component ---
export function HeroSection() {
  const t = useTranslations('home')
  const containerRef = useRef<HTMLDivElement>(null)
  const imageWrapperRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const chars = containerRef.current?.querySelectorAll('.hero-char')
      if (chars && chars.length > 0) {
        gsap.from(chars, {
          y: 60,
          opacity: 0,
          stagger: 0.05,
          duration: 0.8,
          ease: 'power3.out',
        })
      }

      if (taglineRef.current) {
        gsap.from(taglineRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          delay: 0.5,
          ease: 'power3.out',
        })
      }

      if (imageWrapperRef.current) {
        gsap.from(imageWrapperRef.current, {
          scale: 0.8,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        })
      }

      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          scale: 0.8,
          opacity: 0,
          duration: 0.6,
          delay: 1,
          ease: 'back.out(1.7)',
        })
      }

      if (imageRef.current && containerRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    },
    [],
    containerRef
  )

  const name = 'rattana_music'

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-navy via-navy to-navy-dark py-20 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-8">
        <div className="flex-1 text-center lg:text-left">
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-tight leading-none mb-6">
            {name.split('').map((char, index) => (
              <span key={index} className="hero-char inline-block will-change-transform">
                {char}
              </span>
            ))}
          </h1>
          <p
            ref={taglineRef}
            className="text-lg md:text-xl text-beige/70 font-sans tracking-wide mb-8"
          >
            {t('hero.tagline')}
          </p>
          <div ref={ctaRef} className="inline-block">
            <Button
              as="a"
              href="https://line.me/R/ti/p/@701zbckv"
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="lg"
            >
              {t('hero.cta')}
            </Button>
          </div>
        </div>

        <div className="flex-1 flex justify-center lg:justify-end">
          <div
            ref={imageWrapperRef}
            className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-2xl overflow-hidden shadow-2xl border border-sky-pastel/20 bg-navy-dark/40"
          >
            <div ref={imageRef} className="relative w-full h-full scale-105">
              <Image
                src="/images/profile-placeholder.svg"
                alt="rattana_music profile"
                fill
                priority
                sizes="(max-width: 768px) 256px, (max-width: 1024px) 384px, 384px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
