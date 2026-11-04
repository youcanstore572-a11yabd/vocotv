// app/blog/page.tsx
// ✅ Server Component — no "use client". Full metadata export, hero + static
//    sections server-rendered. Pagination is URL-driven via searchParams,
//    so /blog, /blog?page=2, /blog?page=3 are all real, indexable URLs.

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/lib/blog';
import { CONSTANTS } from '@/lib/seo';
import {
  ArrowRight,
  Clock,
  Calendar,
  Sparkles,
  Tag,
  MessageCircle,
  BookOpen,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// CONSTANTS
// ---------------------------------------------------------------------------
const SITE_URL = `https://${CONSTANTS.DOMAIN}`;
const BRAND = CONSTANTS.BRAND_NAME;
const PAGE_URL = `${SITE_URL}/blog`;
const POSTS_PER_PAGE = 6;

// ---------------------------------------------------------------------------
// SEO SAFETY HELPERS
// ---------------------------------------------------------------------------
const clampTitle = (s: string, max = 60): string =>
  s.length <= max ? s : s.slice(0, max - 1).trimEnd() + '…';

const clampDescription = (s: string, max = 160): string =>
  s.length <= max ? s : s.slice(0, max - 3).trimEnd() + '...';

// ---------------------------------------------------------------------------
// SEO STRINGS
// ---------------------------------------------------------------------------
const PAGE_TITLE = clampTitle(
  `${BRAND} Blog | Setup Guides, Tips & News 2026`
);

const PAGE_DESCRIPTION = clampDescription(
  `${BRAND} blog with setup guides, app reviews, and streaming tips for Firestick, Smart TV and mobile. Updated weekly with fresh news.`
);

// ---------------------------------------------------------------------------
// METADATA
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: PAGE_TITLE,
    absolute: PAGE_TITLE,
  },
  description: PAGE_DESCRIPTION,
  authors: [{ name: `${BRAND} Team` }],
  creator: BRAND,
  publisher: BRAND,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'en-US': PAGE_URL,
      'en-CA': PAGE_URL,
      'x-default': PAGE_URL,
    },
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: BRAND,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/img/structer.webp`,
        width: 1200,
        height: 630,
        alt: `${BRAND} Blog - Setup Guides and Streaming Tips`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [`${SITE_URL}/img/structer.webp`],
  },
  category: 'entertainment',
  keywords: [
    'voco tv blog',
    'best streaming subscription',
    'voco tv usa',
    'iptv setup guide usa',
    'iptv firestick setup',
    'ibo player pro guide',
    'iptv reviews usa',
    'iptv service',
    'iptv provider',
    '4k iptv provider',
    'iptv smart tv guide',
    'streaming tips usa',
    'iptv news 2026',
  ],
};

// ---------------------------------------------------------------------------
// CATEGORY CONFIG
// ---------------------------------------------------------------------------
const CATEGORIES = [
  { id: 'all', label: 'All Posts' },
  { id: 'setup', label: 'Setup Guides' },
  { id: 'review', label: 'Reviews' },
  { id: 'sports', label: 'Live Sports' },
  { id: 'tips', label: 'Tips & Tricks' },
  { id: 'news', label: 'News' },
];

function getPostCategory(post: any): string {
  if (post.category) return post.category;
  const kw = (post.keywords || []).join(' ').toLowerCase();
  const title = (post.title || '').toLowerCase();
  if (title.includes('setup') || title.includes('install') || kw.includes('setup guide')) return 'setup';
  if (title.includes('review') || title.includes('compare') || title.includes('best')) return 'review';
  if (title.includes('sport') || kw.includes('live sports')) return 'sports';
  if (title.includes('tip') || title.includes('troubleshoot')) return 'tips';
  return 'news';
}

function getCategoryLabel(id: string): string {
  const map: Record<string, string> = {
    setup: 'Setup Guide',
    review: 'Review',
    sports: 'Live Sports',
    tips: 'Tips & Tricks',
    news: 'News',
  };
  return map[id] || 'Guide';
}

function getReadTime(post: any): string {
  if (post.readTime) return post.readTime;
  const words = (post.content || '').split(/\s+/).length;
  const mins = Math.max(5, Math.round(words / 220));
  return `${mins} min read`;
}

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

// ---------------------------------------------------------------------------
// SORT POSTS BY DATE DESC
// ---------------------------------------------------------------------------
const sortedPosts = [...blogPosts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

const featuredPost = sortedPosts[0];
const restPosts = sortedPosts.slice(1);

// ---------------------------------------------------------------------------
// JSON-LD SCHEMAS
// ---------------------------------------------------------------------------
const BlogSchema = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': `${PAGE_URL}/#blog`,
        name: `${BRAND} Blog`,
        description: `Setup guides, reviews, and streaming tips for Firestick, Smart TV, and mobile streaming.`,
        url: PAGE_URL,
        inLanguage: 'en-US',
        publisher: { '@id': `${SITE_URL}/#organization` },
        blogPost: blogPosts.map((post) => ({
          '@type': 'BlogPosting',
          '@id': `${SITE_URL}/blog/${post.slug}/#article`,
          headline: post.title,
          description: post.description || post.excerpt || '',
          url: `${SITE_URL}/blog/${post.slug}`,
          datePublished: post.date,
          dateModified: post.date,
          inLanguage: 'en-US',
          author: {
            '@type': 'Person',
            name: post.author,
          },
          publisher: { '@id': `${SITE_URL}/#organization` },
          image: {
            '@type': 'ImageObject',
            url: post.image.startsWith('http') ? post.image : `${SITE_URL}${post.image}`,
          },
          keywords: (post.keywords || []).join(', '),
        })),
      },
      {
        '@type': 'CollectionPage',
        '@id': `${PAGE_URL}/#collection`,
        url: PAGE_URL,
        name: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        inLanguage: 'en-US',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${PAGE_URL}/#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: PAGE_URL,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      id="blog-page-schema"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

// ---------------------------------------------------------------------------
// BLOG CARD COMPONENT
// ---------------------------------------------------------------------------
function BlogCard({ post, priority = false }: { post: any; priority?: boolean }) {
  const categoryId = getPostCategory(post);
  const categoryLabel = getCategoryLabel(categoryId);
  const readTime = getReadTime(post);
  const dateStr = formatDate(post.date);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative flex flex-col bg-[#f9f9f9] rounded-none overflow-hidden border-2 border-[#111111]/15 hover:border-[#EF233C] hover:shadow-md hover:-translate-y-2 transition-all duration-300"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-black">
        <Image
          src={post.image}
          alt={post.title}
          width={800}
          height={500}
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />

        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-none bg-[#EF233C] text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
            <Tag className="w-3 h-3" />
            {categoryLabel}
          </span>
        </div>

        <div className="absolute top-3 right-3 z-10">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-none bg-black/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider border border-white/15">
            <Clock className="w-3 h-3" />
            {readTime}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5 md:p-6">
        <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-[#555555] mb-3">
          <Calendar className="w-3 h-3 text-[#EF233C]" />
          <span>{dateStr}</span>
          <span className="text-[#EF233C]">•</span>
          <span>{post.author}</span>
        </div>

        <h3 className="text-base md:text-lg font-black text-[#111111] uppercase tracking-tight leading-snug mb-3 line-clamp-2 group-hover:text-[#EF233C] transition-colors">
          {post.title}
        </h3>

        <p className="text-[#333333] text-sm font-medium leading-relaxed line-clamp-3 mb-4 flex-1">
          {post.description || post.excerpt || ''}
        </p>

        <div className="pt-4 border-t border-[#111111]/10 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-[#EF233C] font-black text-xs uppercase tracking-widest group-hover:gap-2.5 transition-all">
            Read Article
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
          <div className="w-8 h-8 rounded-none bg-[#EF233C]/10 border border-[#EF233C]/30 flex items-center justify-center text-[#EF233C] group-hover:bg-[#FFD700] group-hover:text-black group-hover:border-[#FFD700] transition-all duration-300">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// FEATURED CARD COMPONENT
// ---------------------------------------------------------------------------
function FeaturedCard({ post }: { post: any }) {
  const categoryLabel = getCategoryLabel(getPostCategory(post));
  const readTime = getReadTime(post);
  const dateStr = formatDate(post.date);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative grid grid-cols-1 lg:grid-cols-2 gap-0 bg-[#f9f9f9] rounded-none overflow-hidden border-2 border-[#111111]/20 hover:border-[#EF233C] hover:shadow-xl transition-all duration-300"
    >
      <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[420px] overflow-hidden bg-black">
        <Image
          src={post.image}
          alt={post.title}
          width={900}
          height={600}
          priority
          loading="eager"
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 via-transparent to-transparent" />

        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-[#EF233C] text-white text-[11px] font-black uppercase tracking-widest shadow-md border border-black">
            <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
            Featured
          </span>
        </div>
      </div>

      <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10">
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-black uppercase tracking-wider text-[#555555] mb-4">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-none bg-[#EF233C]/10 text-[#EF233C] border border-[#EF233C]/30">
            <Tag className="w-3 h-3" />
            {categoryLabel}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="w-3 h-3 text-[#EF233C]" />
            {dateStr}
          </span>
          <span className="text-[#EF233C]">•</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#EF233C]" />
            {readTime}
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#111111] uppercase tracking-tight leading-tight mb-4 group-hover:text-[#EF233C] transition-colors">
          {post.title}
        </h2>

        <p className="text-[#333333] text-sm md:text-base font-medium leading-relaxed mb-6 line-clamp-3">
          {post.description || post.excerpt || ''}
        </p>

        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-2 px-6 py-3 rounded-none bg-[#FFD700] text-black font-black text-xs uppercase tracking-widest group-hover:gap-3 transition-all shadow-md border border-[#FFD700]">
            Read Full Article
            <ArrowRight className="w-4 h-4" />
          </span>
          <span className="text-[#555555] text-xs font-bold uppercase tracking-wider">
            by {post.author}
          </span>
        </div>
      </div>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// MAIN PAGE — URL-driven pagination
// ---------------------------------------------------------------------------
type PageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function BlogListing({ searchParams }: PageProps) {
  // Resolve the current page from the URL (?page=2), clamp to a valid range.
  const resolvedParams = await searchParams;
  const rawPage = resolvedParams?.page;
  const parsedPage = Number.parseInt(String(rawPage ?? '1'), 10);
  const requestedPage = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const totalPages = Math.max(1, Math.ceil(restPosts.length / POSTS_PER_PAGE));
  const currentPage = Math.min(requestedPage, totalPages);

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = restPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  // Pagination URL helper — page 1 uses the clean /blog URL, others use ?page=N
  const pageHref = (page: number) =>
    page === 1 ? '/blog' : `/blog?page=${page}`;

  // Window of page numbers to show around the current page (max 5 buttons)
  const pageNumbers: number[] = (() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const start = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
    return Array.from({ length: 5 }, (_, i) => start + i);
  })();

  return (
    <>
      <BlogSchema />

      <div className="flex flex-col min-h-screen bg-white text-[#111111]">

        {/* HERO */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#EF233C] via-[#2a0814] to-black text-white">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#EF233C]/20 blur-[150px] rounded-none pointer-events-none" />
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, #FFFFFF 1px, transparent 1px), linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}
          />

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-black/60 px-4 py-2 rounded-none mb-6 shadow-md border border-[#FFD700]/40">
              <BookOpen className="w-4 h-4 text-[#FFD700]" />
              <span className="text-white font-black text-xs uppercase tracking-widest">
                {BRAND} Blog 🇺🇸
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-white mb-6 drop-shadow-md">
              {BRAND} <br />
              <span className="text-[#FFD700]">BLOG &amp; GUIDES</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/90 font-bold max-w-2xl mx-auto leading-relaxed mb-8">
              Setup guides, app reviews, streaming tips, and the latest news. Everything you need to get the most out of your {BRAND} subscription.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-none bg-black/80 border border-white/15 text-white text-xs font-black uppercase tracking-wider">
                <TrendingUp className="w-3.5 h-3.5 text-[#FFD700]" />
                {blogPosts.length} Articles
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-none bg-black/80 border border-white/15 text-white text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
                Updated Weekly
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-none bg-black/80 border border-white/15 text-white text-xs font-black uppercase tracking-wider">
                <MessageCircle className="w-3.5 h-3.5 text-[#FFD700]" />
                24/7 Support
              </span>
            </div>
          </div>
        </section>

        {/* CATEGORY FILTER CHIPS */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full my-10">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {CATEGORIES.map((cat) => (
              <span
                key={cat.id}
                className={`px-4 sm:px-5 py-2 rounded-none text-xs font-black uppercase tracking-widest transition-all border-2 ${
                  cat.id === 'all'
                    ? 'bg-[#FFD700] text-black border-[#FFD700] shadow-md'
                    : 'bg-[#f9f9f9] text-[#333333] border-[#111111]/15 hover:border-[#EF233C]'
                }`}
                aria-label={`Filter by ${cat.label}`}
              >
                {cat.label}
              </span>
            ))}
          </div>
        </section>

        {/* FEATURED POST — only on page 1 */}
        {currentPage === 1 && featuredPost && (
          <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full mb-16">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-1 w-12 bg-[#EF233C] rounded-none" />
              <h2 className="text-sm font-black uppercase tracking-widest text-[#EF233C]">
                Featured Article
              </h2>
            </div>
            <FeaturedCard post={featuredPost} />
          </section>
        )}

        {/* ARTICLES GRID */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full mb-16">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-1 w-12 bg-[#EF233C] rounded-none" />
            <h2 className="text-sm font-black uppercase tracking-widest text-[#EF233C]">
              {currentPage === 1 ? 'Latest Articles' : `Articles — Page ${currentPage}`}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {currentPosts.map((post, i) => (
              <BlogCard key={post.id} post={post} priority={currentPage === 1 && i < 3} />
            ))}
          </div>

          {/* PAGINATION — real links, URL-driven */}
          {totalPages > 1 && (
            <nav
              className="mt-12 flex items-center justify-center gap-2 sm:gap-3"
              aria-label="Blog pagination"
            >
              {currentPage === 1 ? (
                <span
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-none bg-black/5 text-black/30 border border-black/10 text-xs font-black uppercase tracking-widest cursor-not-allowed"
                  aria-disabled="true"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Prev
                </span>
              ) : (
                <Link
                  href={pageHref(currentPage - 1)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-none bg-black text-[#FFD700] border border-[#FFD700]/40 hover:bg-[#FFD700] hover:text-black transition-all text-xs font-black uppercase tracking-widest"
                  aria-label="Previous page"
                  rel="prev"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Prev
                </Link>
              )}

              {pageNumbers.map((n) => {
                const isCurrent = n === currentPage;
                return isCurrent ? (
                  <span
                    key={n}
                    className="w-10 h-10 rounded-none text-xs font-black flex items-center justify-center bg-[#FFD700] text-black shadow-sm border border-black"
                    aria-current="page"
                  >
                    {n}
                  </span>
                ) : (
                  <Link
                    key={n}
                    href={pageHref(n)}
                    className="w-10 h-10 rounded-none text-xs font-black flex items-center justify-center bg-[#f9f9f9] text-[#111111] border border-[#111111]/15 hover:bg-black hover:text-[#FFD700] transition-all"
                    aria-label={`Go to page ${n}`}
                  >
                    {n}
                  </Link>
                );
              })}

              {currentPage === totalPages ? (
                <span
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-none bg-black/5 text-black/30 border border-black/10 text-xs font-black uppercase tracking-widest cursor-not-allowed"
                  aria-disabled="true"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </span>
              ) : (
                <Link
                  href={pageHref(currentPage + 1)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-none bg-black text-[#FFD700] border border-[#FFD700]/40 hover:bg-[#FFD700] hover:text-black transition-all text-xs font-black uppercase tracking-widest"
                  aria-label="Next page"
                  rel="next"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Link>
              )}
            </nav>
          )}
        </section>

        {/* CHAT CTA STRIP */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full mb-16">
          <div className="relative rounded-none overflow-hidden border border-[#FFD700]/30 bg-gradient-to-br from-[#EF233C] via-[#2a0814] to-black p-8 md:p-10 text-center shadow-xl text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,215,0,0.1),_transparent_70%)] pointer-events-none" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-[#FFD700] text-black px-4 py-2 rounded-none mb-5 shadow-md border border-black">
                <MessageCircle className="w-4 h-4" />
                <span className="font-black text-xs uppercase tracking-widest">
                  Need Help?
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-tight mb-4 drop-shadow-md">
                Get Free {BRAND} Setup Help
              </h3>
              <p className="text-white/90 text-sm sm:text-base font-bold max-w-xl mx-auto mb-6">
                Our team is on chat 24/7 to help with Firestick, Smart TV, or any device. Guided IBO Player Pro activation included.
              </p>
              <a
                href={`${CONSTANTS.CONTACT.whatsappUrl}?text=${encodeURIComponent(
                  `Hi ${BRAND}, I found your blog and need setup help.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-none bg-[#FFD700] text-black font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-md border border-[#FFD700]"
              >
                <MessageCircle className="w-5 h-5 text-black" />
                Chat With Us
              </a>
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full pb-20">
          <div className="bg-[#f9f9f9] rounded-none p-8 md:p-12 border-2 border-[#111111]/15 text-center shadow-sm">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter text-[#111111] leading-tight mb-4">
              Ready to Stream <span className="text-[#EF233C]">{BRAND}?</span>
            </h3>
            <p className="text-[#333333] text-sm sm:text-base font-medium max-w-xl mx-auto mb-8">
              Choose from 3, 6, or 12 month plans starting at $35 USD. Guided chat setup, 36,000+ channels, and 120,000+ movies and TV shows.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/pricing"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-none bg-[#FFD700] text-black font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-md border border-[#FFD700]"
              >
                View Plans <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/setup"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-none bg-black text-[#FFD700] font-black text-sm uppercase tracking-widest hover:scale-105 transition-all border border-[#FFD700]/50"
              >
                Setup Guide
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}