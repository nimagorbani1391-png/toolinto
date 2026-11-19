import { MetadataRoute } from 'next'
import { siteOrigin } from '../lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/dashboard', '/owner'],
    },
    sitemap: `${siteOrigin()}/sitemap.xml`,
  }
}
