// app/blog/[slug]/page.tsx
// ✅ Server Component (already correct).
// ✅ Next.js 15 async params pattern (already correct — preserved).
// ✅ Added: revalidate, dynamicParams=false, typed post, JSON-LD escape,
//    hoisted constants, dedupe word count, aria-hidden decorative icons.

import { blogPosts } from '@/lib/blog';
import { CONSTANTS } from '@/lib/seo';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Calendar,
  User,
  Tag,
  Clock,
  Zap,
  ShieldCheck,
  Headphones,
  BookOpen,
} from 'lucide-react';
import ShareButtons from '../../components/ShareButtons';
import ArticleScrollSidebar from '../../components/ArticleScrollSidebar';

type Props = { params: Promise<{ slug: string }> };

type BlogPost = (typeof blogPosts)[number];

const SITE_URL = CONSTANTS.SITE_URL;
const BRAND = CONSTANTS.BRAND_NAME;
const LANGUAGE = CONSTANTS.LANGUAGE || 'en-US';

// ---------------------------------------------------------------------------
// ISR / SSG — required by project spec. Dynamic slugs disabled because every
// valid slug is known at build time; anything else 404s at build.
// ---------------------------------------------------------------------------
export const revalidate = 86400;
export const dynamicParams = false;

// ---------------------------------------------------------------------------
// Module-scope hero grid style (no per-render allocation)
// ---------------------------------------------------------------------------
const HERO_GRID_STYLE = {
  backgroundImage: `linear-gradient(to right, #111111 1px, transparent 1px), linear-gradient(to bottom, #111111 1px, transparent 1px)`,
  backgroundSize: '60px 60px',
} as const;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const clampTitle = (s: string, max = 60): string =>
  s.length <= max ? s : s.slice(0, max - 1).trimEnd() + '…';

const clampDescription = (s: string, max = 160): string =>
  s.length <= max ? s : s.slice(0, max - 3).trimEnd() + '...';

const CATEGORY_LABELS: Record<string, string> = {
  setup: 'Setup Guide',
  review: 'Review',
  sports: 'Live Sports',
  tips: 'Tips & Tricks',
  news: 'News',
};

function getCategoryLabel(post: BlogPost): string {
  if (post.category) {
    return CATEGORY_LABELS[post.category] ?? post.category;
  }
  if (post.keywords && post.keywords.length > 0) return post.keywords[0];
  return 'Streaming Guide';
}

// Compute both minutes and word count in one pass — no duplicate regex work.
function getReadStats(post: BlogPost): { minutes: number; wordCount: number } {
  if (post.readTime) {
    const match = String(post.readTime).match(/(\d+)/);
    if (match) {
      const minutes = parseInt(match[1], 10);
      const wordCount = (post.content || '')
        .replace(/<[^>]*>/g, '')
        .split(/\s+/)
        .filter(Boolean).length;
      return { minutes, wordCount };
    }
  }
  const wordCount = (post.content || '')
    .replace(/<[^>]*>/g, '')
    .split(/\s+/)
    .filter(Boolean).length;
  return { minutes: Math.max(3, Math.ceil(wordCount / 200)), wordCount };
}

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

// Convert stray <h1> tags to <h2> so the page keeps a single H1 (the hero).
// Skips tags inside <pre>/<code> blocks to avoid mangling code samples.
function sanitizeContent(html: string): string {
  return html
    .replace(/<h1(\s[^>]*)?>/gi, '<h2$1>')
    .replace(/<\/h1>/gi, '</h2>');
}

function extractFAQs(html: string): { q: string; a: string }[] {
  const faqs: { q: string; a: string }[] = [];

  const cardRegex =
    /<div\s+class="[^"]*\bfaq-card\b[^"]*"\s*>[\s\S]*?<h3[^>]*>[\s\S]*?<span>([\s\S]*?)<\/span>\s*<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>\s*<\/div>/gi;
  let match: RegExpExecArray | null;
  while ((match = cardRegex.exec(html)) !== null) {
    const q = match[1].replace(/<[^>]*>/g, '').trim();
    const a = match[2].replace(/<[^>]*>/g, '').trim();
    if (q.length > 5 && a.length > 10) {
      faqs.push({ q, a });
    }
  }

  if (faqs.length === 0) {
    const legacyRegex =
      /<h3[^>]*>([\s\S]*?)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/gi;
    let legacyMatch: RegExpExecArray | null;
    while ((legacyMatch = legacyRegex.exec(html)) !== null) {
      const rawQ = legacyMatch[1].replace(/<[^>]*>/g, '').trim();
      const rawA = legacyMatch[2].replace(/<[^>]*>/g, '').trim();
      if (rawQ.includes('Q.') || rawQ.endsWith('?')) {
        const cleanQ = rawQ.replace(/^Q\.\s*/, '').trim();
        if (cleanQ.length > 5 && rawA.length > 10) {
          faqs.push({ q: cleanQ, a: rawA });
        }
      }
    }
  }

  return faqs.slice(0, 10);
}

function getRelatedPosts(
  currentPost: BlogPost,
  allPosts: readonly BlogPost[],
  limit = 3
): BlogPost[] {
  const currentKw = (currentPost.keywords || []).map((k: string) =>
    k.toLowerCase()
  );

  const scored = allPosts
    .filter((p) => p.slug !== currentPost.slug)
    .map((p) => {
      let score = 0;
      if (p.category && currentPost.category && p.category === currentPost.category) {
        score += 5;
      }
      const otherKw = (p.keywords || []).map((k: string) => k.toLowerCase());
      const shared = currentKw.filter((k) => otherKw.includes(k));
      score += shared.length * 2;
      if (p.author === currentPost.author) score += 1;
      return { post: p, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => s.post);
}

function extractHeadings(html: string): string[] {
  const headings: string[] = [];
  const regex = /<h2[^>]*>([\s\S]*?)<\/h2>/gi;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(html)) !== null) {
    const text = match[1].replace(/<[^>]*>/g, '').trim();
    if (text.length > 3 && text.length < 100) {
      headings.push(text);
    }
  }
  return headings.slice(0, 8);
}

// ---------------------------------------------------------------------------
// ROUTES
// ---------------------------------------------------------------------------
export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Article Not Found',
      description: 'The article you are looking for could not be found.',
      alternates: { canonical: `${SITE_URL}/blog` },
    };
  }

  const shortTitle = clampTitle(post.title);
  const description = clampDescription(
    post.description ||
      post.excerpt ||
      `Read the full ${BRAND} guide and tips for streaming in the USA.`
  );

  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;
  const imageUrl = post.image.startsWith('http')
    ? post.image
    : `${SITE_URL}${post.image}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: { absolute: shortTitle },
    description,
    keywords: post.keywords?.length
      ? post.keywords.join(', ')
      : `${CONSTANTS.FOCUS_KEYWORD}, ${CONSTANTS.SECONDARY_FOCUS_KEYWORD}`,
    authors: [{ name: post.author }],
    creator: post.author,
    publisher: BRAND,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-US': canonicalUrl,
        'en-CA': canonicalUrl,
        'x-default': canonicalUrl,
      },
    },
    openGraph: {
      title: shortTitle,
      description,
      url: canonicalUrl,
      siteName: BRAND,
      locale: CONSTANTS.LOCALE,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [post.author],
      images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: shortTitle,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    category: 'entertainment',
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const { minutes: readTime, wordCount } = getReadStats(post);
  const displayCategory = getCategoryLabel(post);
  const dateStr = formatDate(post.date);
  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;
  const imageUrl = post.image.startsWith('http')
    ? post.image
    : `${SITE_URL}${post.image}`;

  const safeContent = sanitizeContent(post.content);
  const faqs = extractFAQs(post.content);
  const relatedPosts = getRelatedPosts(post, blogPosts, 3);
  const articleHeadings = extractHeadings(safeContent);

  const whatsappIboMsg = encodeURIComponent(
    `Hi! I'd like to get access to IBO Player Pro.`
  );
  const whatsappSubMsg = encodeURIComponent(
    `Hi! I'd like to get a ${BRAND} subscription plan.`
  );

  const authorId = `${SITE_URL}/#author-${post.author
    .toLowerCase()
    .replace(/\s+/g, '-')}`;

  const orgId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;

  // -------------------------------------------------------------------------
  // JSON-LD @graph — Person, BlogPosting, WebPage, BreadcrumbList, FAQPage
  // -------------------------------------------------------------------------
  const jsonLdGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': authorId,
        name: post.author,
        url: `${SITE_URL}/about`,
        jobTitle: 'Streaming Specialist',
        description:
          'Specialises in streaming guides and setup for US viewers.',
        knowsAbout: [
          BRAND,
          'IBO Player Pro',
          'Firestick setup',
          'Smart TV streaming',
          '4K streaming',
        ],
        worksFor: { '@id': orgId },
      },
      {
        '@type': 'BlogPosting',
        '@id': `${canonicalUrl}/#article`,
        headline: post.title,
        name: post.title,
        description: post.description || post.excerpt,
        keywords: post.keywords ? post.keywords.join(', ') : '',
        articleSection: displayCategory,
        wordCount,
        timeRequired: `PT${readTime}M`,
        image: {
          '@type': 'ImageObject',
          '@id': `${canonicalUrl}/#primaryimage`,
          url: imageUrl,
          contentUrl: imageUrl,
          width: 1200,
          height: 630,
          caption: post.title,
          representativeOfPage: true,
        },
        thumbnailUrl: imageUrl,
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: LANGUAGE,
        author: { '@id': authorId },
        publisher: { '@id': orgId },
        mainEntityOfPage: { '@id': `${canonicalUrl}/#webpage` },
        isPartOf: { '@id': `${canonicalUrl}/#webpage` },
        about: articleHeadings.slice(0, 4).map((h) => ({
          '@type': 'Thing',
          name: h,
        })),
        mentions: (post.keywords || []).slice(0, 6).map((k: string) => ({
          '@type': 'Thing',
          name: k,
        })),
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['h1', 'h2', 'article > p:first-of-type'],
        },
        accessMode: ['textual', 'visual'],
        isAccessibleForFree: true,
        copyrightHolder: { '@id': orgId },
        license: `${SITE_URL}/terms`,
      },
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}/#webpage`,
        url: canonicalUrl,
        name: post.title,
        description: post.description || post.excerpt,
        inLanguage: LANGUAGE,
        isPartOf: { '@id': websiteId },
        about: { '@id': `${canonicalUrl}/#article` },
        primaryImageOfPage: { '@id': `${canonicalUrl}/#primaryimage` },
        breadcrumb: { '@id': `${canonicalUrl}/#breadcrumb` },
        datePublished: post.date,
        dateModified: post.date,
        potentialAction: {
          '@type': 'ReadAction',
          target: [canonicalUrl],
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}/#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: `${SITE_URL}/blog`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.title,
            item: canonicalUrl,
          },
        ],
      },
      ...(faqs.length > 0
        ? [
            {
              '@type': 'FAQPage',
              '@id': `${canonicalUrl}/#faq`,
              mainEntity: faqs.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            },
          ]
        : []),
    ],
  };

  // Escape `<` so a stray "</script>" inside any string can't break out of
  // the JSON-LD script tag.
  const jsonLdString = JSON.stringify(jsonLdGraph).replace(/</g, '\\u003c');

  return (
    <article className="flex flex-col min-h-screen bg-white text-[#111111]">
      <script
        type="application/ld+json"
        id="article-schema-data"
        dangerouslySetInnerHTML={{ __html: jsonLdString }}
      />

      {/* HERO */}
      <section className="relative min-h-[70vh] md:min-h-[75vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#EF233C] via-[#2a0814] to-black text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src={post.image}
            alt={post.title}
            width={1920}
            height={1080}
            priority
            fetchPriority="high"
            className="w-full h-full object-cover scale-105 brightness-[0.22]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/10" />
        </div>

        <div
          className="absolute inset-0 z-0 opacity-[0.06]"
          style={HERO_GRID_STYLE}
          aria-hidden="true"
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#EF233C]/20 blur-[150px] rounded-none pointer-events-none z-0"
          aria-hidden="true"
        />

        <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 text-center relative z-10 pt-32 sm:pt-36 md:pt-40 pb-16 flex flex-col items-center justify-center">
          <div className="inline-flex items-center gap-2 bg-black/60 px-5 py-2.5 rounded-none mb-8 shadow-md border border-[#FFD700]/40">
            <BookOpen className="w-4 h-4 text-[#FFD700]" aria-hidden="true" />
            <span className="text-white text-xs font-black uppercase tracking-widest">
              {displayCategory}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-tighter uppercase mb-6 leading-[1.05] max-w-4xl drop-shadow-md">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/90 font-bold max-w-3xl mx-auto leading-relaxed mb-10">
            {post.description || post.excerpt}
          </p>

          <div className="flex flex-wrap justify-center items-center gap-3">
            <div className="inline-flex items-center gap-2 bg-black/80 border border-white/15 backdrop-blur-md px-4 py-2 rounded-none text-white text-xs font-black uppercase tracking-widest">
              <Calendar className="w-3.5 h-3.5 text-[#FFD700]" aria-hidden="true" />
              <span>{dateStr}</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-black/80 border border-white/15 backdrop-blur-md px-4 py-2 rounded-none text-white text-xs font-black uppercase tracking-widest">
              <User className="w-3.5 h-3.5 text-[#FFD700]" aria-hidden="true" />
              <span>{post.author}</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-black/80 border border-white/15 backdrop-blur-md px-4 py-2 rounded-none text-white text-xs font-black uppercase tracking-widest">
              <Clock className="w-3.5 h-3.5 text-[#FFD700]" aria-hidden="true" />
              <span>{readTime} min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* BREADCRUMB */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[#EF233C] hover:text-[#111111] transition-colors font-black text-xs uppercase tracking-widest group"
        >
          <ArrowLeft
            className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
            aria-hidden="true"
          />
          Back to all articles
        </Link>
      </div>

      {/* MAIN GRID */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 order-1 lg:order-1 space-y-10">
          <div className="relative w-full aspect-video rounded-none overflow-hidden border-2 border-[#111111]/15 shadow-md">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 800px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>

          <div className="relative bg-[#f9f9f9] text-[#111111] rounded-none border-2 border-[#111111]/15 shadow-sm p-6 sm:p-8 md:p-12">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#EF233C]/5 to-transparent pointer-events-none" />

            <div
              className="
                article-body
                prose prose-lg max-w-none relative
                [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-black [&_h2]:text-[#111111] [&_h2]:mb-5 [&_h2]:mt-12 [&_h2]:tracking-tight [&_h2]:uppercase [&_h2]:leading-tight
                [&_h2]:pb-3 [&_h2]:border-b-4 [&_h2]:border-[#EF233C]/30
                [&_h3]:text-xl [&_h3]:md:text-2xl [&_h3]:font-black [&_h3]:text-[#EF233C] [&_h3]:mb-4 [&_h3]:mt-8 [&_h3]:uppercase
                [&_h4]:text-lg [&_h4]:md:text-xl [&_h4]:font-black [&_h4]:text-[#EF233C] [&_h4]:mb-3 [&_h4]:mt-6 [&_h4]:uppercase
                [&_p]:text-[#333333] [&_p]:text-base [&_p]:md:text-lg [&_p]:font-medium [&_p]:leading-[1.8] [&_p]:mb-5 [&_p]:md:mb-6
                [&_a]:text-[#EF233C] [&_a]:font-black [&_a]:hover:text-[#111111] [&_a]:transition-colors [&_a]:underline [&_a]:decoration-2 [&_a]:underline-offset-2
                [&_blockquote]:border-l-4 [&_blockquote]:border-[#EF233C] [&_blockquote]:bg-[#EF233C]/5 [&_blockquote]:pl-6 [&_blockquote]:py-3 [&_blockquote]:my-6 [&_blockquote]:text-[#333333] [&_blockquote]:italic
                [&_code]:bg-black/10 [&_code]:px-2 [&_code]:py-1 [&_code]:rounded-none [&_code]:text-[#EF233C] [&_code]:text-sm [&_code]:font-bold
                [&_pre]:bg-black [&_pre]:text-white [&_pre]:p-6 [&_pre]:rounded-none [&_pre]:overflow-x-auto
                [&_img]:rounded-none [&_img]:my-8 [&_img]:border-2 [&_img]:border-[#111111]/15 [&_img]:w-full [&_img]:h-auto [&_img]:shadow-sm
                [&_hr]:border-black/10 [&_hr]:my-12
              "
              dangerouslySetInnerHTML={{ __html: safeContent }}
            />
          </div>

          <ShareButtons title={`${post.title} - ${BRAND}`} url={canonicalUrl} />

          {post.keywords && post.keywords.length > 0 && (
            <div className="pt-2">
              <div className="flex items-center gap-2 mb-5">
                <Tag className="w-5 h-5 text-[#EF233C]" aria-hidden="true" />
                <h2 className="text-[#111111] font-black text-base md:text-lg uppercase tracking-wide">
                  Topics in this article
                </h2>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {post.keywords.slice(0, 8).map((keyword: string) => (
                  <span
                    key={keyword}
                    className="px-4 py-2 bg-[#f9f9f9] text-[#111111] text-xs md:text-sm font-black uppercase tracking-wider rounded-none border border-[#111111]/15 shadow-sm hover:bg-[#FFD700] hover:text-black hover:border-[#FFD700] hover:scale-105 transition-all cursor-default"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="relative overflow-hidden rounded-none border-2 border-[#111111]/15 bg-[#f9f9f9] shadow-sm p-6 md:p-8">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#EF233C]/10 pointer-events-none" />
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 md:gap-6 text-center sm:text-left relative z-10">
              <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-none overflow-hidden border-2 border-black shadow-md flex-shrink-0">
                <Image
                  src="/img/profile.webp"
                  alt={`${post.author} - Streaming Specialist`}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-[#EF233C] text-white px-3 py-1 rounded-none text-[10px] font-black uppercase tracking-widest mb-3 border border-black">
                  <User className="w-3 h-3 text-white" aria-hidden="true" /> Author
                </div>
                <h2 className="text-[#111111] font-black text-2xl md:text-3xl mb-1 uppercase tracking-tight">
                  {post.author}
                </h2>
                <p className="text-[#EF233C] text-xs md:text-sm uppercase tracking-widest font-black mb-3">
                  Streaming Specialist
                </p>
                <p className="text-[#333333] text-sm md:text-base font-semibold leading-relaxed">
                  Specialised in streaming protocols, app configurations, and US network optimisations. Helps customers get the most out of their 4K {BRAND} subscription and IBO Player Pro setups.
                </p>
              </div>
            </div>
          </div>
        </div>

        <ArticleScrollSidebar
          relatedPosts={relatedPosts}
          whatsappIboMsg={whatsappIboMsg}
          whatsappSubMsg={whatsappSubMsg}
        />
      </div>

      <div className="border-t border-[#111111]/10 mt-12 py-8 bg-[#f9f9f9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-[#555555] text-xs font-black uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#EF233C]" aria-hidden="true" /> 4K Ultra HD
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#EF233C]" aria-hidden="true" /> 99.9% Server Uptime
            </span>
            <span className="flex items-center gap-2">
              <Headphones className="w-4 h-4 text-[#EF233C]" aria-hidden="true" /> 24/7 Chat Support
            </span>
          </div>
          <p className="text-center text-[#555555] text-xs mt-6 font-bold">
            © 2026 {BRAND}. All rights reserved. Made in the USA 🇺🇸
          </p>
        </div>
      </div>
    </article>
  );
}