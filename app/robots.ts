import { MetadataRoute } from 'next';
import { CONSTANTS } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = `https://${CONSTANTS.DOMAIN}`;

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
