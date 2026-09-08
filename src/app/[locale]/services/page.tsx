// --- Services Page ---
import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { ServiceHero } from '@/components/services/ServiceHero'
import { ServiceShowcase } from '@/components/services/ServiceShowcase'
import { ProcessTimeline } from '@/components/services/ProcessTimeline'
import { ServiceCTA } from '@/components/services/ServiceCTA'
import { portfolioItems } from '@/data/portfolio-items'
import { processSteps } from '@/data/services'

interface ServicesPageProps {
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
    ? 'บริการตัดต่อวิดีโอ | Rattana Music'
    : 'Video Editing Services | Rattana Music'
  const description = isThai
    ? 'บริการตัดต่อวิดีโอคุณภาพระดับพรีเมียมสำหรับ Short-form, TikTok, Reels, YouTube และโซเชียลมีเดียทุกแพลตฟอร์ม'
    : 'Professional video editing services for short-form content, TikTok, Reels, YouTube, and multi-platform digital branding.'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://rattana-showcase.vercel.app/${locale}/services`,
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

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('services')

  const title = t('title')
  const subtitle = t('subtitle')

  return (
    <div className="min-h-screen bg-navy text-beige">
      <ServiceHero
        title={title}
        subtitle={subtitle}
        badgeText={t('badge')}
      />
      <ServiceShowcase
        items={portfolioItems}
        title={t('showcaseTitle')}
        subtitle={t('showcaseSubtitle')}
        locale={locale}
      />
      <ProcessTimeline
        steps={processSteps}
        title={t('processTitle')}
        subtitle={t('processSubtitle')}
        locale={locale}
      />
      <ServiceCTA
        title={t('ctaTitle')}
        subtitle={t('ctaSubtitle')}
        buttonText={t('ctaButton')}
      />
    </div>
  )
}
