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
    <footer className="bg-navy-deepest border-t border-sky-pastel/10 py-12 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8"
      >
        {/* --- Brand & Contact --- */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-serif text-2xl font-bold tracking-tight text-pink-accent">
            rattana
          </span>
          {workLink && (
            <a
              href={workLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-sky-pastel hover:text-pink-accent transition-colors underline underline-offset-4"
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
                className="text-sm font-medium text-beige hover:text-pink-accent transition-colors"
                aria-label={social.label}
              >
                {social.label}
              </a>
            </MagneticElement>
          ))}
        </div>

        {/* --- Copyright --- */}
        <p className="text-xs text-beige/60 tracking-wider">
          &copy; {currentYear} {t('brand')}. {t('rights')}
        </p>
      </motion.div>
    </footer>
  )
}
