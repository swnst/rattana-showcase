'use client'

// --- Content Card Component ---
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { PortfolioItem, Platform } from '@/data/portfolio-items'
import { Badge } from '@/components/ui/Badge'

export interface ContentCardProps {
  item: PortfolioItem
  onSelect: (item: PortfolioItem) => void
  aspectRatio?: 'vertical' | 'horizontal'
  locale?: string
  className?: string
}

function PlatformIcon({ platform }: { platform: Platform }) {
  if (platform === 'instagram') {
    return (
      <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    )
  }

  if (platform === 'tiktok') {
    return (
      <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.064-.097a2.894 2.894 0 0 1 2.368-4.542c.484 0 .937.119 1.336.33V9.583a6.342 6.342 0 0 0-1.336-.142A6.337 6.337 0 0 0 3 15.779a6.34 6.34 0 0 0 10.824 4.479c.046-.046.09-.093.132-.142V11.83a8.212 8.212 0 0 0 5.633 2.222V10.6a4.78 4.78 0 0 1-3.77-3.914h3.77z" />
      </svg>
    )
  }

  return (
    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </svg>
  )
}

export function ContentCard({
  item,
  onSelect,
  aspectRatio = 'vertical',
  locale = 'en',
  className = '',
}: ContentCardProps) {
  const isThai = locale === 'th'
  const title = isThai ? item.title.th : item.title.en
  const aspectClass = aspectRatio === 'vertical' ? 'aspect-[9/16]' : 'aspect-video'

  return (
    <motion.article
      layout
      whileHover={{
        scale: 1.03,
        boxShadow: '0 20px 40px -10px rgba(232, 74, 116, 0.22)',
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onClick={() => onSelect(item)}
      className={`group relative w-full h-full min-h-[260px] rounded-3xl overflow-hidden cursor-pointer border border-rose-200/80 bg-white shadow-sm select-none ${aspectClass} ${className}`}
    >
      <Image
        src={item.thumbnailUrl}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#201018]/90 via-[#201018]/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

      <div className="absolute top-3 left-3 z-10">
        <Badge variant="pink" className="shadow-md">
          {item.category}
        </Badge>
      </div>

      <div className="absolute top-3 right-3 z-10">
        <div
          aria-label={item.platform}
          className="w-8 h-8 rounded-full bg-white/85 backdrop-blur-md border border-rose-200/80 text-rose-600 flex items-center justify-center shadow-md transition-transform group-hover:scale-110"
        >
          <PlatformIcon platform={item.platform} />
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10 transform transition-transform duration-300">
        <h3 className="font-display text-base sm:text-lg md:text-xl font-bold text-white leading-snug line-clamp-2 drop-shadow-md">
          {title}
        </h3>
        <p className="text-xs text-rose-200/90 mt-1 flex items-center justify-between font-medium">
          <span>{item.date}</span>
          <span className="text-pink-light group-hover:translate-x-1 transition-transform inline-flex items-center text-xs font-semibold">
            View &rarr;
          </span>
        </p>
      </div>
    </motion.article>
  )
}
