'use client'

// --- Filter Tabs Component ---
import React from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { ContentCategory } from '@/data/portfolio-items'

export interface FilterTabsProps {
  activeCategory: ContentCategory
  onSelectCategory: (category: ContentCategory) => void
  locale?: string
}

const TAB_KEYS: { id: ContentCategory; key: 'filterAll' | 'filterEducation' | 'filterLifestyle' | 'filterCosplay' | 'filterWebsite' }[] = [
  { id: 'all', key: 'filterAll' },
  { id: 'education', key: 'filterEducation' },
  { id: 'lifestyle', key: 'filterLifestyle' },
  { id: 'cosplay', key: 'filterCosplay' },
  { id: 'website', key: 'filterWebsite' },
]

export function FilterTabs({
  activeCategory,
  onSelectCategory,
}: FilterTabsProps) {
  const t = useTranslations('portfolio')

  return (
    <div className="w-full flex items-center justify-start md:justify-center overflow-x-auto py-2 no-scrollbar">
      <div className="flex items-center gap-2 sm:gap-3 p-1 rounded-full bg-navy-dark/40 border border-sky-pastel/15 backdrop-blur-md">
        {TAB_KEYS.map((tab) => {
          const isActive = activeCategory === tab.id
          const label = t(tab.key)

          return (
            <button
              key={tab.id}
              onClick={() => onSelectCategory(tab.id)}
              className={`relative px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer select-none whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-accent ${
                isActive
                  ? 'text-white'
                  : 'text-beige hover:text-white border border-beige/30 hover:border-beige/60 bg-transparent'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeFilterIndicator"
                  className="absolute inset-0 bg-pink-accent rounded-full shadow-[0_0_15px_rgba(232,71,151,0.5)]"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
