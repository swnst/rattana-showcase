'use client'

// --- Skills Showcase Component ---
import React, { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { gsap } from '@/lib/gsap'
import { useGSAP } from '@/hooks/useGSAP'

type SkillKey = 'videoEditing' | 'cosplay' | 'education' | 'webDev' | 'content' | 'lifestyle'

interface SkillItem {
  id: SkillKey
  renderIcon: () => React.ReactNode
}

const skills: SkillItem[] = [
  {
    id: 'videoEditing',
    renderIcon: () => (
      <svg className="w-8 h-8 text-pink-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'cosplay',
    renderIcon: () => (
      <svg className="w-8 h-8 text-sky-pastel" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'education',
    renderIcon: () => (
      <svg className="w-8 h-8 text-pink-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    id: 'webDev',
    renderIcon: () => (
      <svg className="w-8 h-8 text-sky-pastel" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    id: 'content',
    renderIcon: () => (
      <svg className="w-8 h-8 text-pink-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: 'lifestyle',
    renderIcon: () => (
      <svg className="w-8 h-8 text-sky-pastel" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
]

export function SkillsShowcase() {
  const t = useTranslations('about')
  const containerRef = useRef<HTMLElement | null>(null)
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

      gsap.from('.skill-card', {
        scale: 0.9,
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true,
        },
      })
    },
    [],
    containerRef
  )

  return (
    <section ref={containerRef} className="py-12 md:py-20">
      <div className="text-center mb-12">
        <h2
          ref={headingRef}
          className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight"
        >
          {t('skillsTitle')}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="skill-card bg-navy-dark border border-sky-pastel/20 rounded-xl p-6 transition-all duration-300 hover:border-pink-accent/50 hover:shadow-[0_0_25px_rgba(232,71,151,0.2)] hover:-translate-y-1 group"
          >
            <div className="mb-4 select-none group-hover:scale-110 transition-transform duration-300 inline-block p-3 rounded-lg bg-navy/60 border border-sky-pastel/10">
              {skill.renderIcon()}
            </div>
            <h3 className="font-inter text-xl font-bold text-white mb-2 group-hover:text-sky-pastel transition-colors">
              {t(`skills.${skill.id}.name`)}
            </h3>
            <p className="font-inter text-sm text-beige/70 leading-relaxed">
              {t(`skills.${skill.id}.desc`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
