'use client'

// --- Footer Component ---
import React from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { socialLinks } from '@/data/social-links'
import { MagneticElement } from '@/components/ui/MagneticElement'

// --- Platform SVG Icons ---
function PlatformIcon({ platform, className = 'w-5 h-5' }: { platform: string; className?: string }) {
  switch (platform) {
    case 'line':
      return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.066.516.251l2.44 3.317V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
        </svg>
      )
    case 'instagram':
      return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      )
    case 'tiktok':
      return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298 0 .592.046.87.136V9.4a6.33 6.33 0 0 0-6.19 6.34 6.34 6.34 0 0 0 10.82 4.49 6.3 6.3 0 0 0 1.84-4.5V8.84a8.28 8.28 0 0 0 4.77 1.52V6.91a4.84 4.84 0 0 1-2-.22z" />
        </svg>
      )
    case 'lemon8':
      return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2C7.03 2 3 6.03 3 11c0 3.2 1.68 6 4.19 7.62-.22.68-.53 1.48-1.02 2.21a.75.75 0 0 0 .94 1.1c1.88-.94 3.23-2.09 3.89-2.93H12c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm0 6a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z" />
        </svg>
      )
    case 'linkedin':
      return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.65 1.65 0 1 0 0-3.3 1.65 1.65 0 0 0 0 3.3m1.39 9.74v-8.37H5.07v8.37h2.78z" />
        </svg>
      )
    default:
      return null
  }
}

export function Footer() {
  const t = useTranslations('footer')
  const currentYear = new Date().getFullYear()

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
          Content Creator & Video Editor
        </p>

        {/* Social App Icon Buttons */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-10">
          {socialLinks.map((social) => {
            const isLine = social.platform === 'line'
            return (
              <MagneticElement key={social.platform} strength={0.3}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={isLine ? 'Line Work' : social.label}
                  title={isLine ? 'Line Work' : social.label}
                  className={`w-12 h-12 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center transition-all duration-300 select-none group relative shadow-[0_4px_16px_rgba(232,74,116,0.12)] hover:shadow-[0_8px_24px_rgba(232,74,116,0.28)] hover:-translate-y-1 hover:scale-105 active:scale-95 ${
                    isLine
                      ? 'bg-gradient-to-tr from-pink-accent to-pink-light text-white border-2 border-white/80'
                      : 'bg-white/85 backdrop-blur-md text-rose-950/80 border border-rose-200/80 hover:border-pink-accent hover:text-pink-accent hover:bg-white'
                  }`}
                >
                  <PlatformIcon platform={social.platform} className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                </a>
              </MagneticElement>
            )
          })}
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
