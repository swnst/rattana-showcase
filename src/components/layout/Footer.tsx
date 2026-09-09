'use client'

// --- Footer Component ---
import React from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { socialLinks } from '@/data/social-links'
import { MagneticElement } from '@/components/ui/MagneticElement'

export function Footer() {
  const t = useTranslations('footer')
  const tNav = useTranslations('nav')
  const currentYear = new Date().getFullYear()

  const navLinks = [
    { href: '/', label: tNav('home') },
    { href: '/about', label: tNav('about') },
    { href: '/portfolio', label: tNav('portfolio') },
    { href: '/services', label: tNav('services') },
    { href: '/contact', label: tNav('contact') },
  ]

  const externalSocials = socialLinks.filter((item) => item.platform !== 'line')
  const workLink = socialLinks.find((item) => item.platform === 'line')

  return (
    <footer className="relative bg-gradient-to-b from-[#FFF5F8] to-[#FFEBF2] border-t border-rose-200/70 pt-20 pb-12 px-6 overflow-hidden">
      {/* Ambient Backdrop Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[36rem] h-80 bg-gradient-to-b from-pink-300/25 via-rose-200/15 to-transparent blur-3xl pointer-events-none rounded-full -z-10" />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* Centered Brand Crest with Aura */}
        <motion.div
          whileHover={{ scale: 1.08, rotate: [0, -3, 3, 0] }}
          transition={{ duration: 0.5 }}
          className="relative mb-6 cursor-pointer select-none group"
        >
          <div className="w-20 h-20 rounded-3xl bg-white/90 backdrop-blur-xl shadow-[0_12px_35px_rgba(232,74,116,0.2)] border-2 border-white/90 flex items-center justify-center p-4 transition-all duration-300 group-hover:border-pink-300 group-hover:shadow-[0_16px_45px_rgba(232,74,116,0.3)]">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              className="w-full h-full text-pink-accent transition-transform duration-500 group-hover:scale-110"
              aria-hidden="true"
            >
              <rect
                x="4"
                y="4"
                width="40"
                height="40"
                rx="12"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeDasharray="4 2"
                className="opacity-40"
              />
              <path
                d="M16 34V14H25C28.3137 14 31 16.6863 31 20C31 22.9698 28.8471 25.4367 26 25.9V26.1C28.2 26.6 29.5 28.3 30.5 31.5L31.5 34H26L25.2 31.5C24.4 28.9 23.3 28 21 28H19.5V34H16ZM19.5 24.5H24.5C26 24.5 27.2 23.4 27.2 22C27.2 20.6 26 19.5 24.5 19.5H19.5V24.5Z"
                fill="url(#footer-crest-gradient)"
              />
              <defs>
                <linearGradient id="footer-crest-gradient" x1="16" y1="14" x2="32" y2="34">
                  <stop offset="0%" stopColor="#E84A74" />
                  <stop offset="100%" stopColor="#FF85A2" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="absolute -inset-2 rounded-3xl bg-pink-400/25 blur-lg -z-10 animate-pulse" />
        </motion.div>

        {/* Brand Name & Tagline */}
        <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-gradient-hero mb-3">
          rattana_music
        </h2>
        <p className="font-sans text-sm md:text-base font-medium text-rose-900/70 max-w-md mx-auto mb-8 leading-relaxed">
          Content Creator, Video Editor & Tech Specialist
        </p>

        {/* Centered Navigation Capsule */}
        <nav className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-8 p-1.5 rounded-full bg-white/70 backdrop-blur-md border border-rose-200/80 shadow-xs">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-rose-950/80 hover:text-white hover:bg-gradient-to-r hover:from-pink-accent hover:to-pink-light transition-all duration-200 select-none"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Social Links & Work CTA */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10">
          {workLink && (
            <MagneticElement strength={0.25}>
              <a
                href={workLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-pink-accent via-[#FF6B93] to-pink-accent shadow-[0_4px_14px_rgba(232,74,116,0.3)] hover:shadow-[0_6px_20px_rgba(232,74,116,0.45)] hover:scale-105 active:scale-95 transition-all"
              >
                <span>Line Work</span>
              </a>
            </MagneticElement>
          )}

          {externalSocials.map((social) => (
            <MagneticElement key={social.platform} strength={0.25}>
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-rose-950/80 bg-white/80 border border-rose-200/80 hover:border-pink-accent hover:text-pink-accent hover:bg-pink-accent/5 transition-all shadow-xs"
                aria-label={social.label}
              >
                {social.label}
              </a>
            </MagneticElement>
          ))}
        </div>

        {/* Centered Symmetrical Divider with Diamond Accent */}
        <div className="flex items-center justify-center gap-4 w-full max-w-sm mb-8">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-rose-300/70" />
          <div className="w-2 h-2 rounded-sm rotate-45 bg-pink-accent/70" />
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-rose-300/70" />
        </div>

        {/* Copyright */}
        <p className="text-xs text-rose-900/60 tracking-wider">
          &copy; {currentYear} {t('brand')}. {t('rights')}
        </p>
      </div>
    </footer>
  )
}
