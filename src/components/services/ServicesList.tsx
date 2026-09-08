'use client'

// --- Services List Component ---
import React from 'react'
import { Service, services as defaultServices } from '@/data/services'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

export interface ServicesListProps {
  services?: Service[]
  title?: string
  subtitle?: string
  locale?: string
}

export function ServicesList({
  services = defaultServices,
  title = 'Specialized Services',
  subtitle = 'Comprehensive creative solutions to elevate your brand and social channels',
  locale = 'en',
}: ServicesListProps) {
  const isThai = locale === 'th'

  const renderServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'video':
        return (
          <svg className="w-6 h-6 text-pink-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )
      case 'sparkles':
        return (
          <svg className="w-6 h-6 text-pink-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        )
      case 'code':
      default:
        return (
          <svg className="w-6 h-6 text-pink-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        )
    }
  }

  return (
    <section id="services-list" className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-rose-950 mb-4 tracking-tight">
          {title}{' '}
          <span className="text-gradient-rose block sm:inline">
            {isThai ? 'ระดับพรีเมียม' : 'Offerings'}
          </span>
        </h2>
        <p className="text-rose-900/80 text-sm sm:text-base font-medium leading-relaxed">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
        {services.map((service) => {
          const serviceTitle = isThai ? service.title.th : service.title.en
          const serviceDesc = isThai ? service.description.th : service.description.en
          const featureList = isThai ? service.features.th : service.features.en

          return (
            <div
              key={service.id}
              className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                service.popular
                  ? 'bg-gradient-to-b from-white via-rose-50/40 to-white border-2 border-pink-accent/40 shadow-hover-rose -translate-y-1'
                  : 'bg-white/90 backdrop-blur-md border border-rose-200/80 shadow-soft-rose hover:border-pink-accent/40 hover:shadow-hover-rose hover:-translate-y-0.5'
              }`}
            >
              {service.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full bg-gradient-cta text-white text-xs font-bold tracking-wider uppercase shadow-xs">
                    {isThai ? 'ยอดนิยม' : 'Most Popular'}
                  </span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-rose-100/90 border border-rose-200/80 flex items-center justify-center shadow-xs">
                    {renderServiceIcon(service.icon)}
                  </div>
                  <Badge variant={service.popular ? 'pink' : 'beige'}>
                    {isThai ? 'พร้อมรับงาน' : 'Available'}
                  </Badge>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-rose-950 mb-3 tracking-tight">
                  {serviceTitle}
                </h3>

                <p className="text-rose-900/80 text-sm sm:text-base leading-relaxed mb-6 font-sans font-normal">
                  {serviceDesc}
                </p>

                <div className="border-t border-rose-100 pt-5 mb-6 space-y-3">
                  <span className="text-xs font-semibold text-rose-950/70 tracking-wider uppercase block mb-2">
                    {isThai ? 'สิ่งที่จะได้รับ' : 'What is included'}
                  </span>
                  {featureList.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-rose-900/85">
                      <svg
                        className="w-4 h-4 text-pink-accent shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-rose-100">
                <Button
                  as="a"
                  href="https://line.me/R/ti/p/@701zbckv"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant={service.popular ? 'primary' : 'secondary'}
                  className="w-full justify-center font-semibold text-sm py-3"
                >
                  {isThai ? 'ปรึกษา & ประเมินราคา' : 'Inquire & Get Quote'}
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
