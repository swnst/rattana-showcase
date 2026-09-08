'use client'

// --- Navbar Component ---
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { Link, usePathname, useRouter } from '@/i18n/routing'

const navItems = [
  { href: '/', key: 'home' },
  { href: '/about', key: 'about' },
  { href: '/portfolio', key: 'portfolio' },
  { href: '/services', key: 'services' },
  { href: '/contact', key: 'contact' },
] as const

export function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleLanguage = () => {
    const nextLocale = locale === 'en' ? 'th' : 'en'
    router.replace(pathname, { locale: nextLocale })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* --- Brand Logo --- */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-accent via-pink-light to-pink-accent flex items-center justify-center shadow-[0_0_20px_rgba(232,74,116,0.35)] group-hover:scale-105 transition-transform">
            <span className="font-display font-extrabold text-white text-xl tracking-tight">
              R
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-base text-beige tracking-tight group-hover:text-pink-light transition-colors leading-none">
              rattana
            </span>
            <span className="text-[11px] font-medium tracking-widest text-sky-pastel/70 uppercase">
              showcase
            </span>
          </div>
        </Link>

        {/* --- Desktop Floating Capsule Navigation --- */}
        <nav className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-navy-dark/75 backdrop-blur-xl border border-pink-accent/20 shadow-[0_8px_30px_rgba(18,6,11,0.5)]">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 select-none ${
                  isActive
                    ? 'text-white'
                    : 'text-beige/80 hover:text-white hover:bg-pink-accent/10'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-gradient-to-r from-pink-accent to-pink-light rounded-full shadow-[0_0_15px_rgba(232,74,116,0.45)]"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  />
                )}
                <span className="relative z-10 font-sans tracking-tight">
                  {t(item.key)}
                </span>
              </Link>
            )
          })}
        </nav>

        {/* --- Right Actions (Language Switcher + Work CTA) --- */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full bg-navy-dark/60 backdrop-blur-md border border-pink-accent/25 text-beige hover:border-pink-accent hover:text-pink-light hover:bg-pink-accent/10 transition-all cursor-pointer shadow-sm"
            aria-label="Toggle language"
          >
            {locale === 'en' ? 'TH' : 'EN'}
          </button>

          <a
            href="https://line.me/R/ti/p/@701zbckv"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-pink-accent via-[#FF6B93] to-pink-accent shadow-[0_0_20px_rgba(232,74,116,0.35)] hover:shadow-[0_0_25px_rgba(232,74,116,0.55)] hover:scale-105 active:scale-95 transition-all"
          >
            <span>Line Work</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col items-center justify-center w-10 h-10 rounded-xl bg-navy-dark/80 border border-pink-accent/20 text-beige hover:bg-pink-accent/10 transition-colors focus:outline-none cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            <motion.span
              animate={mobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="w-5 h-0.5 bg-beige block transition-transform origin-center"
            />
            <motion.span
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-5 h-0.5 bg-beige block my-1 transition-opacity"
            />
            <motion.span
              animate={mobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="w-5 h-0.5 bg-beige block transition-transform origin-center"
            />
          </button>
        </div>
      </div>

      {/* --- Mobile Menu Drawer --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-20 z-40 p-4 md:hidden"
          >
            <div className="rounded-3xl p-6 bg-navy-dark/95 backdrop-blur-2xl border border-pink-accent/30 shadow-[0_12px_40px_rgba(0,0,0,0.6)] flex flex-col gap-3">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-2xl text-base font-semibold transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-pink-accent to-pink-light text-white shadow-md'
                        : 'text-beige hover:bg-white/5'
                    }`}
                  >
                    {t(item.key)}
                  </Link>
                )
              })}

              <div className="pt-3 border-t border-pink-accent/15 mt-1">
                <a
                  href="https://line.me/R/ti/p/@701zbckv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-accent via-[#FF6B93] to-pink-accent text-white font-semibold text-center shadow-md flex items-center justify-center gap-2"
                >
                  <span>Line @701zbckv</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
