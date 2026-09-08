'use client'

// --- Content Grid Component ---
import React, { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PortfolioItem } from '@/data/portfolio-items'
import { ContentCard } from './ContentCard'
import { EmbedModal } from './EmbedModal'
import { useGSAP } from '@/hooks/useGSAP'
import { gsap } from '@/lib/gsap'

export interface ContentGridProps {
  items: PortfolioItem[]
  locale?: string
}

export function ContentGrid({ items, locale = 'en' }: ContentGridProps) {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!containerRef.current) return

      const cards = containerRef.current.querySelectorAll('.bento-item')
      if (!cards.length) return

      gsap.from(cards, {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          once: true,
        },
      })
    },
    [],
    containerRef
  )

  const getBentoSpan = (index: number) => {
    if (index === 0) {
      return 'md:col-span-2 lg:col-span-1 lg:row-span-2'
    }
    if (index === 3) {
      return 'md:col-span-2 lg:col-span-2'
    }
    return 'col-span-1'
  }

  const getAspect = (index: number): 'vertical' | 'horizontal' => {
    if (index === 0) return 'vertical'
    if (index === 3) return 'horizontal'
    return index % 2 === 0 ? 'vertical' : 'horizontal'
  }

  return (
    <>
      <div
        ref={containerRef}
        className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 auto-rows-[280px] sm:auto-rows-[320px] md:auto-rows-[340px]"
      >
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => {
            const spanClass = getBentoSpan(index)
            const aspect = getAspect(index)

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className={`bento-item w-full h-full ${spanClass}`}
              >
                <ContentCard
                  item={item}
                  aspectRatio={aspect}
                  onSelect={(selected) => setSelectedItem(selected)}
                  locale={locale}
                  className="h-full w-full"
                />
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      <EmbedModal
        item={selectedItem}
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
        locale={locale}
      />
    </>
  )
}
