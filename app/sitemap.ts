import { MetadataRoute } from 'next'
import { tools } from '../lib/tools'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://toolinto.netlify.app'

  // نقشه صفحه اصلی
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
  ]

  // نقشه تمام ابزارها
  const toolRoutes = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...routes, ...toolRoutes]
}
