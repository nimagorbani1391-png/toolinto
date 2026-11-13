import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'], // به ربات‌ها می‌گیم به APIها کاری نداشته باشن
    },
    sitemap: 'https://toolinto.netlify.app/sitemap.xml',
  }
}
