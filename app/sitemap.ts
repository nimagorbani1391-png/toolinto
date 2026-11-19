import { MetadataRoute } from 'next'
import { tools } from '../lib/tools'
import { siteOrigin } from '../lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteOrigin()

  // نقشه صفحه اصلی
  const routes = [
    {
      url: baseUrl,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
  ]

  // نقشه تمام ابزارها
  const toolRoutes = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...routes, ...toolRoutes]
}
