'use client'

// --- Navbar Component ---
import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { Link, usePathname, useRouter } from '@/i18n/routing'
import { gsap } from '@/lib/gsap'

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
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return
      if (window.scrollY > 30) {
        gsap.to(navRef.current, {
          backgroundColor: '#203F9A',
          boxShadow: '0 10px 30px rgba(15, 31, 77, 0.5)',
          duration: 0.3,
          ease: 'power2.out',
        })
      } else {
        gsap.to(navRef.current, {
          backgroundColor: 'transparent',
          boxShadow: 'none',
          duration: 0.3,
          ease: 'power2.out',
        })
      }
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
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-40 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* --- Logo --- */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-serif text-3xl md:text-4xl font-bold text-pink-accent tracking-tight group-hover:scale-110 transition-transform">
            R
          </span>
          <span className="text-sm md:text-base font-medium tracking-widest text-beige uppercase opacity-90 group-hover:text-sky-pastel transition-colors">
            rattana
          </span>
        </Link>

        {/* --- Desktop Navigation --- */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`text-sm font-medium transition-colors relative py-1 ${
                  isActive ? 'text-pink-accent font-semibold' : 'text-beige hover:text-sky-pastel'
                }`}
              >
                {t(item.key)}
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-accent rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* --- Actions --- */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full border border-sky-pastel/30 text-beige hover:border-pink-accent hover:text-pink-accent transition-colors"
            aria-label="Toggle language"
          >
            {locale === 'en' ? 'TH' : 'EN'}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col items-center justify-center w-9 h-9 gap-1.5 focus:outline-none cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            <motion.span
              animate={mobileMenuOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-beige block transition-transform origin-center"
            />
            <motion.span
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 bg-beige block transition-opacity"
            />
            <motion.span
              animate={mobileMenuOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-beige block transition-transform origin-center"
            />
          </button>
        </div>
      </div>

      {/* --- Mobile Menu Overlay --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-20 bg-navy-dark z-30 flex flex-col items-center justify-center p-8 md:hidden"
          >
            <nav className="flex flex-col items-center gap-6">
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-2xl font-serif font-medium tracking-wide ${
                      pathname === item.href ? 'text-pink-accent' : 'text-beige hover:text-sky-pastel'
                    }`}
                  >
                    {t(item.key)}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
