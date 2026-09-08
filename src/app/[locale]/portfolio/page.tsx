// --- Portfolio Page ---
import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { Badge } from '@/components/ui/Badge'
import { PortfolioView } from '@/components/portfolio/PortfolioView'
import { portfolioItems } from '@/data/portfolio-items'

interface PortfolioPageProps {
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
    ? 'ผลงาน | Rattana Music'
    : 'Portfolio | Rattana Music'
  const description = isThai
    ? 'รวมผลงานที่ดีที่สุดของ Rattana Music วิดีโอสั้น คอนเทนต์สร้างสรรค์ และโปรเจกต์ต่างๆ'
    : 'Featured portfolio of Rattana Music - short-form videos, creative content, and digital showcases.'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://rattana-showcase.vercel.app/${locale}/portfolio`,
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

export default async function PortfolioPage({ params }: PortfolioPageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('portfolio')

  const title = t('title') || 'Portfolio'
  const subtitle = t('subtitle') || 'A collection of my best work'

  return (
    <div className="min-h-screen bg-navy py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="mb-4">
            <Badge variant="pink">{subtitle}</Badge>
          </div>
          <AnimatedText
            text={title}
            tag="h1"
            className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold text-beige tracking-tight mb-4"
          />
          <p className="text-sky-pastel/80 text-base sm:text-lg">
            {subtitle}
          </p>
        </div>

        <PortfolioView initialItems={portfolioItems} locale={locale} />
      </div>
    </div>
  )
}
