import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rattana-showcase.vercel.app'
  const locales = ['en', 'th']
  const routes = ['', '/about', '/portfolio', '/services', '/contact']

  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1.0 : 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en${route}`,
            th: `${baseUrl}/th${route}`,
          },
        },
      })
    }
  }

  return entries
}
