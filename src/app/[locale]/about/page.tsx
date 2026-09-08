// --- About Page ---
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { ProfileSection } from '@/components/about/ProfileSection'
import { SkillsShowcase } from '@/components/about/SkillsShowcase'
import { BrandCollaboration } from '@/components/about/BrandCollaboration'

interface AboutPageProps {
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
    ? 'เกี่ยวกับ | Rattana Music'
    : 'About | Rattana Music'
  const description = isThai
    ? 'ทำความรู้จักกับรัตนา คอนเทนต์ครีเอเตอร์ คอสเพลเยอร์ และนักตัดต่อวิดีโอมืออาชีพ'
    : 'Learn more about Rattana - content creator, cosplayer, and professional video editor.'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://rattana-showcase.vercel.app/${locale}/about`,
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

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 overflow-hidden">
      <ProfileSection />
      <SkillsShowcase />
      <BrandCollaboration />
    </div>
  )
}
