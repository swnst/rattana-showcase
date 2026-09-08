'use client'

// --- Portfolio View Component ---
import React, { useMemo, useState } from 'react'
import { ContentCategory, PortfolioItem } from '@/data/portfolio-items'
import { FilterTabs } from './FilterTabs'
import { ContentGrid } from './ContentGrid'

export interface PortfolioViewProps {
  initialItems: PortfolioItem[]
  locale?: string
}

export function PortfolioView({ initialItems, locale = 'en' }: PortfolioViewProps) {
  const [category, setCategory] = useState<ContentCategory>('all')

  const filteredItems = useMemo(() => {
    if (category === 'all') {
      return initialItems
    }
    return initialItems.filter((item) => item.category === category)
  }, [initialItems, category])

  return (
    <div className="w-full space-y-10 sm:space-y-12">
      <FilterTabs
        activeCategory={category}
        onSelectCategory={setCategory}
        locale={locale}
      />
      <ContentGrid items={filteredItems} locale={locale} />
    </div>
  )
}
