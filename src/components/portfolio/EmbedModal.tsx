'use client'

// --- Embed Modal Component ---
import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { PortfolioItem } from '@/data/portfolio-items'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

export interface EmbedModalProps {
  item: PortfolioItem | null
  isOpen: boolean
  onClose: () => void
  locale?: string
}

export function EmbedModal({
  item,
  isOpen,
  onClose,
  locale = 'en',
}: EmbedModalProps) {
  const t = useTranslations('portfolio')
  const modalRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement
      document.body.style.overflow = 'hidden'

      const timer = setTimeout(() => {
        const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (focusable && focusable.length > 0) {
          focusable[0].focus()
        }
      }, 50)

      return () => {
        clearTimeout(timer)
        document.body.style.overflow = ''
        if (previousActiveElement.current) {
          previousActiveElement.current.focus()
        }
      }
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (!focusable.length) return

        const firstElement = focusable[0]
        const lastElement = focusable[focusable.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement.focus()
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!item) return null

  const isThai = locale === 'th'
  const title = isThai ? item.title.th : item.title.en
  const description = isThai ? item.description.th : item.description.en
  const closeLabel = t('modalClose')
  const platformName = item.platform.charAt(0).toUpperCase() + item.platform.slice(1)
  const viewOnPlatformLabel = t('viewOnPlatform', { platform: platformName })

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#201018]/50 backdrop-blur-md"
            aria-hidden="true"
          />

          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl bg-white border border-rose-200 shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-rose-100 bg-[#FFF8F9]">
              <div className="flex items-center gap-2">
                <Badge variant="pink">{item.category}</Badge>
                <Badge variant="blue">{item.platform}</Badge>
              </div>
              <button
                onClick={onClose}
                aria-label={closeLabel}
                className="p-1.5 rounded-full text-rose-900/70 hover:text-rose-950 hover:bg-rose-100/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-accent"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
              <div className="relative w-full rounded-2xl overflow-hidden bg-rose-50 border border-rose-200/60">
                {item.embedUrl ? (
                  <div className="relative w-full aspect-video">
                    <iframe
                      src={item.embedUrl}
                      title={title}
                      className="absolute inset-0 w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="relative w-full aspect-video flex items-center justify-center bg-rose-100/50">
                    <Image
                      src={item.thumbnailUrl}
                      alt={title}
                      fill
                      sizes="(max-width: 768px) 100vw, 672px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                )}
              </div>

              <div>
                <h3 id="modal-title" className="text-xl sm:text-2xl font-display font-bold text-rose-950 mb-2">
                  {title}
                </h3>
                <p className="text-sm sm:text-base text-rose-900/80 leading-relaxed">
                  {description}
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-5 border-t border-rose-100 bg-[#FFF8F9] flex items-center justify-between gap-3">
              <span className="text-xs text-rose-800/60">{item.date}</span>
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" onClick={onClose}>
                  {closeLabel}
                </Button>
                <Button
                  as="a"
                  href={`https://${item.platform}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="sm"
                >
                  {viewOnPlatformLabel}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
