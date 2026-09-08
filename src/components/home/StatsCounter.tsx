'use client'

// --- Imports ---
import React, { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { stats, type StatItem } from '@/data/stats'
import { useCountUp } from '@/hooks/useCountUp'
import { useGSAP } from '@/hooks/useGSAP'
import { gsap } from '@/lib/gsap'

// --- Single Stat Card Component ---
function StatCard({
  item,
  label,
  triggerRef,
}: {
  item: StatItem
  label: string
  triggerRef: React.RefObject<HTMLDivElement | null>
}) {
  const count = useCountUp({
    end: item.value,
    start: 0,
    duration: 2,
    triggerRef,
  })

  return (
    <div className="stat-card flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl bg-white/80 border border-rose-200/70 backdrop-blur-md hover:border-pink-accent/40 shadow-[0_10px_30px_rgba(232,74,116,0.06)] hover:shadow-[0_15px_35px_rgba(232,74,116,0.12)] transition-all duration-300 text-center group">
      <span className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-accent via-[#FF6B93] to-pink-accent mb-2 tracking-tight">
        {count.toLocaleString()}
        {item.suffix}
      </span>
      <span className="text-xs sm:text-sm md:text-base text-rose-900/70 font-medium">
        {label}
      </span>
    </div>
  )
}

// --- Stats Counter Component ---
export function StatsCounter() {
  const t = useTranslations('home.stats')
  const containerRef = useRef<HTMLDivElement>(null)

  const labelMap: Record<StatItem['platform'], string> = {
    instagram: t('instagram'),
    tiktok: t('tiktok'),
    lemon8: t('lemon8'),
    all: t('content'),
  }

  useGSAP(
    () => {
      const cards = containerRef.current?.querySelectorAll('.stat-card')
      if (cards && cards.length > 0) {
        gsap.from(cards, {
          opacity: 0,
          y: 40,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            once: true,
          },
        })
      }
    },
    [],
    containerRef
  )

  return (
    <section
      ref={containerRef}
      className="bg-[#FFF0F4] py-20 md:py-32 relative overflow-hidden border-y border-rose-200/50"
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="sr-only">{t('title')}</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              item={stat}
              label={labelMap[stat.platform]}
              triggerRef={containerRef}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
