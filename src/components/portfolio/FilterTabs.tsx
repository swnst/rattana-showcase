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
      <div className="flex items-center gap-2 sm:gap-3 p-1.5 rounded-full bg-white/80 border border-rose-200/80 backdrop-blur-md shadow-xs">
        {TAB_KEYS.map((tab) => {
          const isActive = activeCategory === tab.id
          const label = t(tab.key)

          return (
            <button
              key={tab.id}
              onClick={() => onSelectCategory(tab.id)}
              className={`relative px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer select-none whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-accent ${
                isActive
                  ? 'text-white font-semibold'
                  : 'text-rose-950/80 hover:text-pink-accent hover:bg-rose-50/60 bg-transparent'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeFilterIndicator"
                  className="absolute inset-0 bg-gradient-to-r from-pink-accent via-[#FF6B93] to-pink-accent rounded-full shadow-[0_4px_14px_rgba(232,74,116,0.35)]"
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
