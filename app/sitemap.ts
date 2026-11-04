// app/sitemap.ts
import { MetadataRoute } from 'next';
import { CONSTANTS } from '@/lib/seo';
import { blogPosts } from '@/lib/blog';
import { channelsData } from '@/lib/channels-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = `https://${CONSTANTS.DOMAIN}`;
  const now = new Date();

  // -------------------------------------------------------------------------
  // 1. CORE STATIC PAGES
  // -------------------------------------------------------------------------
  const corePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/setup`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/reseller`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/support`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // -------------------------------------------------------------------------
  // 2. CHANNELS INDEX
  // -------------------------------------------------------------------------
  const channelsIndex: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/channels`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // -------------------------------------------------------------------------
  // 3. LEGAL & POLICY PAGES
  // -------------------------------------------------------------------------
  const legalPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/refund-policy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/dmca`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // -------------------------------------------------------------------------
  // 4. DYNAMIC CHANNEL CATEGORIES
  // -------------------------------------------------------------------------
  const channelPages: MetadataRoute.Sitemap = channelsData.map((category) => ({
    url: `${baseUrl}/channels/${category.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // -------------------------------------------------------------------------
  // 5. DYNAMIC BLOG POSTS
  // -------------------------------------------------------------------------
  const blogPostPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // -------------------------------------------------------------------------
  // COMBINE & RETURN
  // -------------------------------------------------------------------------
  return [
    ...corePages,
    ...channelsIndex,
    ...channelPages,
    ...blogPostPages,
    ...legalPages,
  ];
}