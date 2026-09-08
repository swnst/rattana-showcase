// --- Home Page ---
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { HeroSection } from '@/components/home/HeroSection'
import { SocialLinks } from '@/components/home/SocialLinks'
import { StatsCounter } from '@/components/home/StatsCounter'
import { ContentTypes } from '@/components/home/ContentTypes'
import { QuickPreview } from '@/components/home/QuickPreview'
import { CTASection } from '@/components/home/CTASection'

interface HomePageProps {
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
    ? 'ยินดีต้อนรับสู่พอร์ตโฟลิโอรวมผลงานวิดีโอ ไลฟ์สไตล์ การศึกษา และโปรเจกต์สร้างสรรค์ของ rattana_music'
    : 'Welcome to the official portfolio of rattana_music showcasing videos, lifestyle, education, and creative projects.'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://rattana-showcase.vercel.app/${locale}`,
      images: [
        {
          url: '/images/og-image.svg',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/og-image.svg'],
    },
  }
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <SocialLinks />
      <StatsCounter />
      <ContentTypes />
      <QuickPreview />
      <CTASection />
    </div>
  )
}
