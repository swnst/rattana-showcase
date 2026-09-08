// --- Contact Page ---
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { ContactInfo } from '@/components/contact/ContactInfo'
import { SocialGrid } from '@/components/contact/SocialGrid'

interface ContactPageProps {
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
    ? 'ติดต่อ | Rattana Music'
    : 'Contact | Rattana Music'
  const description = isThai
    ? 'ติดต่อร่วมงานกับ Rattana Music ได้ทุกช่องทาง ทั้ง Line Official, Instagram, TikTok และอื่นๆ'
    : 'Get in touch with Rattana Music for collaborations, creative projects, and video editing inquiries.'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://rattana-showcase.vercel.app/${locale}/contact`,
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

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 overflow-hidden">
      <ContactInfo />
      <SocialGrid />
    </div>
  )
}
