'use client'

// --- Footer Component ---
import React from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { socialLinks } from '@/data/social-links'
import { MagneticElement } from '@/components/ui/MagneticElement'

export function Footer() {
  const t = useTranslations('footer')
  const currentYear = new Date().getFullYear()

  const workLink = socialLinks.find((item) => item.platform === 'line')
  const externalSocials = socialLinks.filter((item) => item.platform !== 'line')

  return (
    <footer className="bg-[#FFF0F4] border-t border-rose-200/60 py-12 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8"
      >
        {/* --- Brand & Contact --- */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-display text-2xl font-bold tracking-tight bg-gradient-to-r from-pink-accent to-pink-light bg-clip-text text-transparent">
            rattana
          </span>
          {workLink && (
            <a
              href={workLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-rose-900/70 hover:text-pink-accent transition-colors underline underline-offset-4"
            >
              {t('forWork')}
            </a>
          )}
        </div>

        {/* --- Social Links --- */}
        <div className="flex items-center gap-6">
          {externalSocials.map((social) => (
            <MagneticElement key={social.platform} strength={0.25}>
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-rose-950/80 hover:text-pink-accent transition-colors"
                aria-label={social.label}
              >
                {social.label}
              </a>
            </MagneticElement>
          ))}
        </div>

        {/* --- Copyright --- */}
        <p className="text-xs text-rose-900/60 tracking-wider">
          &copy; {currentYear} {t('brand')}. {t('rights')}
        </p>
      </motion.div>
    </footer>
  )
}
