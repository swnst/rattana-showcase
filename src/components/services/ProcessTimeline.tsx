'use client'

// --- Process Timeline Component ---
import React, { useRef } from 'react'
import { useGSAP } from '@/hooks/useGSAP'
import { gsap } from '@/lib/gsap'
import { ProcessStep, processSteps as defaultSteps } from '@/data/services'

export interface ProcessTimelineProps {
  steps?: ProcessStep[]
  title?: string
  subtitle?: string
  locale?: string
}

export function ProcessTimeline({
  steps = defaultSteps,
  title = 'How I Work',
  subtitle = 'A structured, transparent workflow from vision to final delivery',
  locale = 'en',
}: ProcessTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!containerRef.current || !lineRef.current) return

      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            end: 'bottom 85%',
            scrub: true,
          },
        }
      )

      const stepElements = containerRef.current.querySelectorAll('.timeline-step')
      stepElements.forEach((stepEl) => {
        const dot = stepEl.querySelector('.step-dot')
        const content = stepEl.querySelector('.step-content')

        if (dot && content) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: stepEl,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          })

          tl.from(dot, {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            ease: 'back.out(1.7)',
          }).from(
            content,
            {
              x: stepEl.classList.contains('desktop-left') ? -40 : 40,
              opacity: 0,
              duration: 0.6,
              ease: 'power3.out',
            },
            '-=0.3'
          )
        }
      })
    },
    [steps],
    containerRef
  )

  const isThai = locale === 'th'

  return (
    <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-24">
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-beige mb-4 tracking-tight">
          {title}
        </h2>
        <p className="text-sky-pastel/80 text-sm sm:text-base">
          {subtitle}
        </p>
      </div>

      <div ref={containerRef} className="relative w-full">
        <div className="absolute top-0 bottom-0 left-6 md:left-1/2 md:-translate-x-1/2 w-1 bg-navy-dark border-r border-sky-pastel/20" />

        <div
          ref={lineRef}
          className="absolute top-0 bottom-0 left-6 md:left-1/2 md:-translate-x-1/2 w-1 bg-gradient-to-b from-pink-accent via-pink-light to-pink-accent shadow-[0_0_12px_rgba(232,71,151,0.6)] origin-top will-change-transform"
        />

        <div className="space-y-12 sm:space-y-16">
          {steps.map((stepItem, index) => {
            const isEven = index % 2 === 1
            const stepTitle = isThai ? stepItem.title.th : stepItem.title.en
            const stepDesc = isThai ? stepItem.description.th : stepItem.description.en

            return (
              <div
                key={stepItem.step}
                className={`timeline-step relative flex flex-col md:flex-row items-start md:items-center ${
                  isEven ? 'desktop-right' : 'desktop-left md:flex-row-reverse'
                }`}
              >
                <div
                  className={`w-full md:w-1/2 pl-14 md:pl-0 ${
                    isEven ? 'md:pl-12 text-left' : 'md:pr-12 md:text-right'
                  }`}
                >
                  <div className="step-content p-6 rounded-2xl bg-navy-dark/80 border border-sky-pastel/20 backdrop-blur-sm shadow-lg hover:border-pink-accent/40 transition-colors">
                    <span className="text-xs uppercase tracking-widest text-pink-light font-semibold block mb-1">
                      Step 0{stepItem.step}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-beige mb-2">
                      {stepTitle}
                    </h3>
                    <p className="text-sm sm:text-base text-beige/75 leading-relaxed">
                      {stepDesc}
                    </p>
                  </div>
                </div>

                <div className="step-dot absolute left-6 md:left-1/2 -translate-x-1/2 top-4 md:top-auto z-10 w-10 h-10 rounded-full bg-pink-accent text-white font-bold flex items-center justify-center shadow-[0_0_20px_rgba(232,71,151,0.7)] border-2 border-beige will-change-transform select-none">
                  {stepItem.step}
                </div>

                <div className="hidden md:block w-1/2" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
