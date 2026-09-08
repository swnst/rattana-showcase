'use client'

// --- Service Showcase Component ---
import React, { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@/hooks/useGSAP'
import { gsap } from '@/lib/gsap'
import { PortfolioItem } from '@/data/portfolio-items'
import { Badge } from '@/components/ui/Badge'

export interface ServiceShowcaseProps {
  items: PortfolioItem[]
  title?: string
  subtitle?: string
  locale?: string
}

export function ServiceShowcase({
  items,
  title = 'My Editing Work',
  subtitle = 'Selected video editing and creative production highlights',
  locale = 'en',
}: ServiceShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return

      const cards = sectionRef.current.querySelectorAll('.showcase-card')
      if (!cards.length) return

      gsap.from(cards, {
        y: 45,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })
    },
    [items],
    sectionRef
  )

  const isThai = locale === 'th'
  const displayItems = items.slice(0, 6)

  return (
    <section ref={sectionRef} className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-rose-950 mb-4 tracking-tight">
          {title}
        </h2>
        <p className="text-rose-900/75 text-sm sm:text-base font-medium">
          {subtitle}
        </p>
      </div>

      <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-6 pb-6 md:pb-0 no-scrollbar snap-x snap-mandatory">
        {displayItems.map((item) => {
          const itemTitle = isThai ? item.title.th : item.title.en
          const itemDesc = isThai ? item.description.th : item.description.en

          return (
            <div
              key={item.id}
              className="showcase-card min-w-[280px] sm:min-w-[320px] md:min-w-0 snap-center flex-shrink-0 md:flex-shrink rounded-3xl overflow-hidden border border-rose-200/80 bg-white/90 backdrop-blur-md shadow-[0_4px_20px_rgba(232,74,116,0.06)] hover:border-pink-accent/50 hover:shadow-[0_15px_35px_rgba(232,74,116,0.14)] transition-all duration-300 group flex flex-col"
            >
              <div className="relative w-full aspect-video overflow-hidden bg-[#FFF0F4]">
                <Image
                  src={item.thumbnailUrl}
                  alt={itemTitle}
                  fill
                  sizes="(max-width: 768px) 80vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="pink">{item.category}</Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="blue">{item.platform}</Badge>
                </div>
              </div>

              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-rose-950 mb-2 group-hover:text-pink-accent transition-colors">
                    {itemTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-rose-900/70 line-clamp-2 leading-relaxed font-sans">
                    {itemDesc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-rose-100 flex items-center justify-between text-xs text-rose-900/60 font-medium">
                  <span>{item.date}</span>
                  <span className="text-pink-accent font-semibold group-hover:translate-x-0.5 transition-transform">
                    {item.platform}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
