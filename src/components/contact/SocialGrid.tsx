'use client'

// --- Social Grid Component ---
import React, { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { socialLinks, type SocialLink } from '@/data/social-links'
import { MagneticElement } from '@/components/ui/MagneticElement'
import { gsap } from '@/lib/gsap'
import { useGSAP } from '@/hooks/useGSAP'

const usernames: Record<SocialLink['platform'], string> = {
  instagram: '@rattana_music',
  tiktok: '@rattana_music',
  lemon8: '@rattana_music',
  linkedin: 'Nuntanarat J.',
  line: '@701zbckv',
}

function PlatformIcon({ platform }: { platform: SocialLink['platform'] }) {
  const iconClass = 'w-10 h-10 md:w-12 md:h-12 fill-current'

  if (platform === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" className={iconClass} xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.79-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    )
  }

  if (platform === 'tiktok') {
    return (
      <svg viewBox="0 0 24 24" className={iconClass} xmlns="http://www.w3.org/2000/svg">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    )
  }

  if (platform === 'lemon8') {
    return (
      <svg viewBox="0 0 24 24" className={iconClass} xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 3.824 2.14 7.151 5.305 8.847-.07-.631-.055-1.455.15-2.083l1.194-4.88c-.28-.567-.432-1.218-.432-1.884 0-2.485 2.015-4.5 4.5-4.5s4.5 2.015 4.5 4.5c0 2.215-1.597 4.053-3.69 4.432-.303.055-.589-.136-.644-.439-.055-.303.136-.589.439-.644 1.602-.29 2.795-1.696 2.795-3.349 0-1.879-1.521-3.4-3.4-3.4s-3.4 1.521-3.4 3.4c0 .506.113 1.002.327 1.449.123.256.037.566-.201.716-.239.15-.556.088-.716-.151A4.47 4.47 0 0 1 8.2 12c0-2.1 1.7-3.8 3.8-3.8s3.8 1.7 3.8 3.8-1.7 3.8-3.8 3.8c-.3 0-.58-.04-.86-.1l-.47 1.93c-.22.9-.85 1.99-1.35 2.8A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
      </svg>
    )
  }

  if (platform === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" className={iconClass} xmlns="http://www.w3.org/2000/svg">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.96 0-1.74.78-1.74 1.75s.78 1.74 1.74 1.74 1.75-.78 1.75-1.74-.79-1.75-1.75-1.75z" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className={iconClass} xmlns="http://www.w3.org/2000/svg">
      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.477.254l2.486 3.373V8.108c0-.345.28-.63.631-.63.348 0 .627.285.627.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
    </svg>
  )
}

export function SocialGrid() {
  const t = useTranslations('contact')
  const sectionRef = useRef<HTMLElement | null>(null)
  const headingRef = useRef<HTMLHeadingElement | null>(null)

  useGSAP(
    () => {
      gsap.from(headingRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
          once: true,
        },
      })

      gsap.from('.social-grid-card', {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })
    },
    [],
    sectionRef
  )

  return (
    <section ref={sectionRef} className="py-12 md:py-20">
      <div className="text-center mb-12">
        <h2
          ref={headingRef}
          className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-rose-950 tracking-tight"
        >
          {t('socialTitle')}
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
        {socialLinks.map((social) => (
          <div key={social.platform} className="social-grid-card h-full">
            <MagneticElement strength={0.2} className="w-full h-full">
              <div className="w-full h-full flex flex-col items-center justify-between p-6 sm:p-8 bg-white/85 backdrop-blur-md rounded-3xl border border-rose-200/80 shadow-[0_4px_20px_rgba(232,74,116,0.06)] transition-all duration-300 hover:scale-[1.03] hover:border-pink-accent/50 hover:shadow-[0_15px_35px_rgba(232,74,116,0.14)] group">
                <div className="text-pink-accent group-hover:scale-110 transition-all duration-300 mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-100">
                  <PlatformIcon platform={social.platform} />
                </div>

                <div className="text-center mb-6">
                  <h3 className="font-display text-lg sm:text-xl font-bold text-rose-950 mb-1 group-hover:text-pink-accent transition-colors">
                    {social.label}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-rose-900/60 font-medium truncate max-w-[140px] sm:max-w-[180px]">
                    {usernames[social.platform]}
                  </p>
                </div>

                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-5 py-2 text-xs sm:text-sm font-semibold text-rose-950 bg-rose-50 border border-rose-200 rounded-full transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-pink-accent group-hover:to-pink-light group-hover:text-white group-hover:border-transparent group-hover:shadow-[0_4px_14px_rgba(232,74,116,0.35)]"
                >
                  {t('visitButton')}
                </a>
              </div>
            </MagneticElement>
          </div>
        ))}
      </div>
    </section>
  )
}
