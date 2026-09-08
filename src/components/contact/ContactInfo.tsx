'use client'

// --- Contact Info Hero Section ---
import React, { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { gsap } from '@/lib/gsap'
import { useGSAP } from '@/hooks/useGSAP'

export function ContactInfo() {
  const t = useTranslations('contact')
  const containerRef = useRef<HTMLElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const subRef = useRef<HTMLParagraphElement | null>(null)
  const buttonWrapperRef = useRef<HTMLDivElement | null>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline()

      tl.from(titleRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      })
        .from(
          subRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
            ease: 'power3.out',
          },
          '-=0.5'
        )
        .from(
          buttonWrapperRef.current,
          {
            scale: 0.5,
            opacity: 0,
            duration: 1.1,
            ease: 'elastic.out(1, 0.5)',
          },
          '-=0.3'
        )
    },
    [],
    containerRef
  )

  return (
    <section
      ref={containerRef}
      className="relative py-16 md:py-24 text-center flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4">
        <h1
          ref={titleRef}
          className="font-playfair text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight mb-6"
        >
          {t('title')}
        </h1>

        <p
          ref={subRef}
          className="font-inter text-lg sm:text-xl text-beige/80 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t('subtitle')}
        </p>

        <div ref={buttonWrapperRef} className="inline-block">
          <a
            href="https://line.me/R/ti/p/@701zbckv"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 py-4 px-8 text-lg sm:text-xl font-semibold text-white bg-pink-accent rounded-full border border-pink-accent shadow-[0_0_25px_rgba(232,71,151,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(232,71,151,0.7)] cursor-pointer select-none"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-7 h-7 fill-current flex-shrink-0"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.477.254l2.486 3.373V8.108c0-.345.28-.63.631-.63.348 0 .627.285.627.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
            </svg>
            <span>{t('ctaButton')}</span>
          </a>
        </div>
      </div>
    </section>
  )
}
