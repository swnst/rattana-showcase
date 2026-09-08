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
              start: 'top 85%',
              once: true,
            },
          })

          tl.fromTo(
            dot,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              ease: 'back.out(1.7)',
              clearProps: 'transform,opacity',
            }
          ).fromTo(
            content,
            {
              x: stepEl.classList.contains('desktop-left') ? -30 : 30,
              opacity: 0,
            },
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power3.out',
              clearProps: 'transform,opacity',
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
    <section id="how-i-work" className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-28">
      <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-24">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-rose-950 mb-4 tracking-tight">
          {title}{' '}
          <span className="text-gradient-rose">
            {isThai ? 'อย่างมืออาชีพ' : 'Workflow'}
          </span>
        </h2>
        <p className="text-rose-900/80 text-sm sm:text-base font-medium">
          {subtitle}
        </p>
      </div>

      <div ref={containerRef} className="relative w-full">
        <div className="absolute top-0 bottom-0 left-6 md:left-1/2 md:-translate-x-1/2 w-1 bg-rose-200/60" />

        <div
          ref={lineRef}
          className="absolute top-0 bottom-0 left-6 md:left-1/2 md:-translate-x-1/2 w-1 bg-gradient-to-b from-pink-accent via-pink-light to-pink-accent shadow-[0_0_12px_rgba(232,74,116,0.5)] origin-top will-change-transform"
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
                  className={`w-full md:w-1/2 pl-16 sm:pl-20 md:pl-0 ${
                    isEven ? 'md:pl-12 text-left' : 'md:pr-12 md:text-right'
                  }`}
                >
                  <div className="step-content p-6 sm:p-7 rounded-3xl bg-white/90 border border-rose-200/80 backdrop-blur-md shadow-[0_4px_20px_rgba(232,74,116,0.06)] hover:border-pink-accent/50 hover:shadow-[0_12px_30px_rgba(232,74,116,0.12)] transition-all">
                    <span className="text-xs uppercase tracking-widest text-pink-accent font-bold block mb-1">
                      Step 0{stepItem.step}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-rose-950 mb-2">
                      {stepTitle}
                    </h3>
                    <p className="text-sm sm:text-base text-rose-900/75 leading-relaxed font-sans">
                      {stepDesc}
                    </p>
                  </div>
                </div>

                <div className="step-dot absolute left-6 md:left-1/2 -translate-x-1/2 top-4 md:top-auto z-10 w-10 h-10 rounded-full bg-gradient-to-tr from-pink-accent to-pink-light text-white font-bold flex items-center justify-center shadow-[0_4px_16px_rgba(232,74,116,0.4)] border-2 border-white will-change-transform select-none">
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
