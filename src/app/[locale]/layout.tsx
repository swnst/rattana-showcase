// --- Locale Layout ---
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import { routing } from '@/i18n/routing'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { IntroScreen } from '@/components/layout/IntroScreen'
import { PageTransition } from '@/components/layout/PageTransition'
import { ScrollProgressBar } from '@/components/ui/ScrollProgressBar'
import { FluidCursor } from '@/components/ui/FluidCursor'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isThai = locale === 'th'

  const title = isThai
    ? 'Rattana Music | คอนเทนต์ครีเอเตอร์ & ตัดต่อวิดีโอ'
    : 'Rattana Music | Content Creator & Video Editor'
  const description = isThai
    ? 'ยินดีต้อนรับสู่พอร์ตโฟลิโอของ Rattana Music - คอนเทนต์ครีเอเตอร์ ไลฟ์สไตล์ การศึกษา และบริการตัดต่อวิดีโอคุณภาพสูง'
    : 'Portfolio of Rattana Music - Content creator showcasing videos, lifestyle, education, and professional video editing services.'

  return {
    metadataBase: new URL('https://rattana-showcase.vercel.app'),
    title: {
      default: title,
      template: '%s | Rattana Music',
    },
    description,
    openGraph: {
      title,
      description,
      url: `https://rattana-showcase.vercel.app/${locale}`,
      siteName: 'Rattana Music',
      locale: isThai ? 'th_TH' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/images/og-image.svg',
          width: 1200,
          height: 630,
          alt: 'Rattana Music Portfolio',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/og-image.svg'],
    },
    alternates: {
      canonical: `https://rattana-showcase.vercel.app/${locale}`,
      languages: {
        en: 'https://rattana-showcase.vercel.app/en',
        th: 'https://rattana-showcase.vercel.app/th',
      },
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'en' | 'th')) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Rattana',
    alternateName: 'rattana_music',
    url: `https://rattana-showcase.vercel.app/${locale}`,
    image: 'https://rattana-showcase.vercel.app/images/profile-placeholder.svg',
    jobTitle: locale === 'th' ? 'คอนเทนต์ครีเอเตอร์ & ตัดต่อวิดีโอ' : 'Content Creator & Video Editor',
    sameAs: [
      'https://www.instagram.com/rattana_music',
      'https://www.tiktok.com/@rattana_music',
      'https://www.lemon8-app.com/@rattana_music',
      'https://line.me/R/ti/p/@701zbckv',
    ],
  }

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollProgressBar />
      <FluidCursor />
      <IntroScreen />
      <Navbar />
      <main className="min-h-screen pt-20">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      <Footer />
    </NextIntlClientProvider>
  )
}
