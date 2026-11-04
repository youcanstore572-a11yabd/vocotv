// app/reviews/page.tsx
// ✅ Server Component — no "use client" (already correct).
// ✅ Added revalidate, hardened JSON-LD, removed dangerous fallback URL.
// ✅ Consumed shared flag components.

import Link from 'next/link';
import { CONSTANTS, generateSEOMetadata } from '@/lib/seo';
import { reviews, REVIEW_STATS, REVIEW_FAQS } from '@/lib/reviews';
import {
  Star,
  ShieldCheck,
  Zap,
  Headphones,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  Users,
  MapPin,
  PlayCircle,
  ThumbsUp,
  Award,
  Sparkles,
  Quote,
  ChevronDown,
  type LucideIcon,
} from 'lucide-react';
import { FlagUS, FlagCA, FlagUK, FlagAU } from '../components/Flags';

const SITE_URL = CONSTANTS.SITE_URL;
const BRAND = CONSTANTS.BRAND_NAME;
const PAGE_URL = `${SITE_URL}/reviews`;

// WhatsApp URL — no silent fallback. A missing URL should be a build failure.
const WHATSAPP_BASE = CONSTANTS.CONTACT.whatsappUrl;

// ---------------------------------------------------------------------------
// ISR — reviews can be refreshed without a full redeploy
// ---------------------------------------------------------------------------
export const revalidate = 3600;

// ---------------------------------------------------------------------------
// REVIEW STATS — module-scope, computed once
// ---------------------------------------------------------------------------
const RATING_VALUE = String(REVIEW_STATS?.averageRating ?? 4.9);
const REVIEW_COUNT = String(REVIEW_STATS?.totalReviews ?? 1255);
const HAPPY_CUSTOMERS = String(REVIEW_STATS?.happyCustomers ?? '15,000');
const RECOMMEND_PERCENT = String(REVIEW_STATS?.recommendPercent ?? 98);

// ---------------------------------------------------------------------------
// METADATA
// ---------------------------------------------------------------------------
export const metadata = generateSEOMetadata(
  `${BRAND} Subscription Reviews | Verified US Customer Feedback 2026`,
  `Read ${REVIEW_COUNT}+ verified ${BRAND} reviews from US customers. Rated ${RATING_VALUE}/5 for 4K streaming, 36,000+ channels, and 24/7 support.`,
  '/reviews'
);

// ---------------------------------------------------------------------------
// Module-scope constants
// ---------------------------------------------------------------------------
const HERO_GRID_STYLE = {
  backgroundImage: `linear-gradient(to right, #111111 1px, transparent 1px), linear-gradient(to bottom, #111111 1px, transparent 1px)`,
  backgroundSize: '50px 50px',
} as const;

const STAR_INDICES = [0, 1, 2, 3, 4] as const;

const TRUST_BADGES: readonly { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: ShieldCheck, title: '99.9% Uptime', desc: 'Enterprise grade US servers' },
  { icon: Zap, title: '4K & 60FPS', desc: 'Ultra HD streaming quality' },
  { icon: Headphones, title: '24/7 Support', desc: 'Real chat team on hand' },
  { icon: Award, title: 'Free Trial First', desc: 'Test it on your own device' },
];

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------
function waLink(message: string): string {
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;
}

function formatReviewDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

// ---------------------------------------------------------------------------
// JSON-LD SCHEMA — module-scope, XSS-hardened
// ---------------------------------------------------------------------------
function buildReviewsSchema() {
  const productId = `${SITE_URL}/#product`;
  const orgId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;

  const socials = Object.values(CONSTANTS.SOCIALS ?? {}).filter(Boolean);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': orgId,
        name: BRAND,
        alternateName: `${BRAND} Streaming`,
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          '@id': `${SITE_URL}/#logo`,
          url: `${SITE_URL}/img/iptv-logo.webp`,
          contentUrl: `${SITE_URL}/img/iptv-logo.webp`,
          width: 512,
          height: 512,
          caption: `${BRAND} Logo`,
        },
        email: CONSTANTS.CONTACT.email,
        telephone: CONSTANTS.CONTACT.phone,
        areaServed: ['US', 'CA', 'GB', 'AU', 'NZ'],
        ...(socials.length > 0 ? { sameAs: socials } : {}),
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: SITE_URL,
        name: BRAND,
        inLanguage: 'en-US',
        publisher: { '@id': orgId },
      },
      {
        '@type': 'WebPage',
        '@id': `${PAGE_URL}/#webpage`,
        url: PAGE_URL,
        name: `${BRAND} Reviews & Testimonials`,
        description: `Verified reviews from US ${BRAND} customers.`,
        inLanguage: 'en-US',
        isPartOf: { '@id': websiteId },
        about: { '@id': orgId },
        breadcrumb: { '@id': `${PAGE_URL}/#breadcrumb` },
      },
      {
        '@type': 'Product',
        '@id': productId,
        name: `${BRAND} Premium Subscription`,
        image: `${SITE_URL}/img/structer.webp`,
        description: `${BRAND} delivers premium 4K live TV and on demand media across the United States with 99.9% server uptime and quick chat guided activation.`,
        sku: 'IPTV-SUB-US-PREMIUM',
        category: 'Streaming Service',
        brand: {
          '@type': 'Brand',
          '@id': `${SITE_URL}/#brand`,
          name: BRAND,
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: RATING_VALUE,
          reviewCount: REVIEW_COUNT,
          bestRating: '5',
          worstRating: '1',
        },
      },
      ...reviews.map((rev, index) => ({
        '@type': 'Review',
        '@id': `${PAGE_URL}/#review-${index + 1}`,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: String(rev.rating),
          bestRating: '5',
          worstRating: '1',
        },
        author: { '@type': 'Person', name: rev.name },
        reviewBody: rev.text,
        name: rev.title,
        datePublished: rev.date,
        itemReviewed: { '@id': productId },
      })),
      {
        '@type': 'BreadcrumbList',
        '@id': `${PAGE_URL}/#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Reviews', item: PAGE_URL },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${PAGE_URL}/#faq`,
        mainEntity: REVIEW_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
      },
    ],
  };

  // Escape `<` so no review text can break out of the <script> tag.
  return JSON.stringify(jsonLd).replace(/</g, '\\u003c');
}

const REVIEWS_SCHEMA_STRING = buildReviewsSchema();

// ---------------------------------------------------------------------------
// STAR RATING
// ---------------------------------------------------------------------------
function StarRating({
  rating,
  size = 'md',
}: {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizeClass =
    size === 'lg' ? 'w-6 h-6' : size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {STAR_INDICES.map((i) => (
        <Star
          key={i}
          className={`${sizeClass} ${
            i < rating ? 'fill-[#FFD700] text-[#FFD700]' : 'text-black/20'
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// REVIEW CARD
// ---------------------------------------------------------------------------
function ReviewCard({ review }: { review: (typeof reviews)[number] }) {
  const initials = getInitials(review.name);

  return (
    <div className="relative bg-[#f9f9f9] border-2 border-[#111111]/15 hover:border-[#EF233C] rounded-none p-6 shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
      <Quote className="absolute top-4 right-4 w-12 h-12 text-[#111111]/10 rotate-180" aria-hidden="true" />

      <div className="flex items-start gap-3.5 mb-4">
        <div className="relative flex-shrink-0">
          <div
            className="w-12 h-12 rounded-none bg-gradient-to-br from-black to-[#2a0814] flex items-center justify-center text-white font-black text-base uppercase shadow-sm"
            aria-hidden="true"
          >
            {initials}
          </div>
          <div className="absolute -bottom-1 -right-1 rounded-none ring-2 ring-[#f9f9f9]">
            <CountryFlag country={review.country} size="sm" />
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
            <span className="font-black text-[#111111] text-sm uppercase tracking-tight">
              {review.name}
            </span>
            {review.verified && (
              <span title="Verified Subscriber" aria-label="Verified subscriber">
                <CheckCircle2 className="w-4 h-4 text-[#EF233C] shrink-0" aria-hidden="true" />
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#555555]">
            <MapPin className="w-3 h-3 text-[#EF233C]" aria-hidden="true" />
            <span>
              {review.city}, {review.province}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <StarRating rating={review.rating} size="sm" />
        <span className="text-[10px] font-black uppercase tracking-wider text-[#555555]">
          {formatReviewDate(review.date)}
        </span>
      </div>

      <h3 className="font-black text-[#111111] text-base uppercase tracking-tight leading-tight mb-3 line-clamp-2">
        {review.title}
      </h3>

      <p className="text-[#333333] text-sm font-medium leading-relaxed line-clamp-6 flex-1 mb-4">
        {review.text}
      </p>

      <div className="pt-4 border-t border-[#111111]/10 flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-[#555555]">
          <PlayCircle className="w-3.5 h-3.5 text-[#EF233C]" aria-hidden="true" />
          {review.device}
        </span>
        <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-[#EF233C]">
          <ShieldCheck className="w-3 h-3" aria-hidden="true" />
          Verified
        </span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// CountryFlag — thin wrapper around shared flag components
// ---------------------------------------------------------------------------
function CountryFlag({
  country,
  size = 'md',
}: {
  country: 'AU' | 'US' | 'UK' | 'CA';
  size?: 'sm' | 'md' | 'lg';
}) {
  const dim = size === 'lg' ? 'w-7 h-7' : size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
  return (
    <span className={`inline-block ${dim}`}>
      {country === 'US' && <FlagUS />}
      {country === 'CA' && <FlagCA />}
      {country === 'UK' && <FlagUK />}
      {country === 'AU' && <FlagAU />}
    </span>
  );
}

// ---------------------------------------------------------------------------
// FAQ ITEM — native <details>/<summary>
// ---------------------------------------------------------------------------
function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group bg-[#f9f9f9] border-2 border-[#111111]/15 rounded-none overflow-hidden shadow-sm">
      <summary className="cursor-pointer list-none p-6 flex items-center justify-between gap-4 hover:bg-[#f9f9f9]/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700]">
        <h3 className="text-base md:text-lg font-black uppercase tracking-tight text-[#111111] flex items-start gap-3 text-left">
          <span className="text-[#EF233C] font-black text-xl shrink-0" aria-hidden="true">
            Q.
          </span>
          <span>{q}</span>
        </h3>
        <ChevronDown
          className="w-5 h-5 flex-shrink-0 text-[#EF233C] transition-transform duration-300 group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <div className="px-6 pb-6">
        <p className="text-[#333333] font-medium leading-relaxed text-sm md:text-base pl-9 border-l-4 border-[#EF233C] ml-1 py-1">
          {a}
        </p>
      </div>
    </details>
  );
}

// ---------------------------------------------------------------------------
// MAIN PAGE
// ---------------------------------------------------------------------------
export default function ReviewsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        id="reviews-page-schema"
        dangerouslySetInnerHTML={{ __html: REVIEWS_SCHEMA_STRING }}
      />

      <div className="flex flex-col min-h-screen bg-white text-[#111111]">
        {/* HERO */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#EF233C] via-[#2a0814] to-black text-white">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#EF233C]/20 blur-[150px] rounded-none pointer-events-none" aria-hidden="true" />
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={HERO_GRID_STYLE} aria-hidden="true" />

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-black/60 px-4 py-2 rounded-none mb-6 shadow-md border border-[#FFD700]/40">
              <Sparkles className="w-4 h-4 text-[#FFD700]" aria-hidden="true" />
              <span className="text-white font-black text-xs uppercase tracking-widest">
                Real Customer Feedback 🇺🇸
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-white mb-6 drop-shadow-md">
              {BRAND} SUBSCRIPTION <br />
              <span className="text-[#FFD700]">REVIEWS &amp; TESTIMONIALS</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/90 font-bold max-w-2xl mx-auto leading-relaxed mb-8">
              Read verified reviews from {HAPPY_CUSTOMERS} happy US customers, from New York to Los Angeles, rated{' '}
              <span className="text-[#FFD700] font-black">{RATING_VALUE}/5</span>{' '}
              for buffer free 4K streaming.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-none bg-black/80 border border-white/15 text-white text-xs font-black uppercase tracking-wider">
                <Star className="w-3.5 h-3.5 text-[#FFD700] fill-[#FFD700]" aria-hidden="true" />
                {RATING_VALUE} / 5
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-none bg-black/80 border border-white/15 text-white text-xs font-black uppercase tracking-wider">
                <Users className="w-3.5 h-3.5 text-[#FFD700]" aria-hidden="true" />
                {HAPPY_CUSTOMERS} Customers
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-none bg-black/80 border border-white/15 text-white text-xs font-black uppercase tracking-wider">
                <ThumbsUp className="w-3.5 h-3.5 text-[#FFD700]" aria-hidden="true" />
                {RECOMMEND_PERCENT}% Recommend
              </span>
            </div>
          </div>
        </section>

        {/* OVERALL RATING CARD */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full my-16">
          <div className="bg-[#f9f9f9] border-2 border-[#111111]/15 rounded-none p-8 md:p-10 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="text-center md:text-left">
                <div className="text-6xl md:text-7xl font-black text-[#111111] leading-none mb-2">
                  {RATING_VALUE}
                </div>
                <div className="mb-3 flex justify-center md:justify-start">
                  <StarRating rating={5} size="lg" />
                </div>
                <p className="text-[#555555] text-xs font-black uppercase tracking-wider">
                  Based on {REVIEW_COUNT} Reviews
                </p>
              </div>

              <div className="text-center border-y md:border-y-0 md:border-x border-[#111111]/10 py-6 md:py-0 md:px-8">
                <div className="inline-flex items-center justify-center gap-2 bg-[#EF233C] text-white px-4 py-1.5 rounded-none text-[10px] font-black uppercase tracking-widest mb-3 border border-black">
                  <Award className="w-3.5 h-3.5" aria-hidden="true" /> Top Rated
                </div>
                <div className="text-4xl md:text-5xl font-black text-[#111111] leading-none mb-2">
                  {RECOMMEND_PERCENT}%
                </div>
                <p className="text-[#555555] text-xs font-black uppercase tracking-wider">
                  Would Recommend
                </p>
              </div>

              <div className="text-center md:text-right">
                <div className="text-4xl md:text-5xl font-black text-[#111111] leading-none mb-2">
                  {HAPPY_CUSTOMERS}
                </div>
                <p className="text-[#555555] text-xs font-black uppercase tracking-wider mb-4">
                  Happy US Customers
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-end items-center">
                  <CountryFlag country="US" size="md" />
                  <CountryFlag country="CA" size="md" />
                  <CountryFlag country="UK" size="md" />
                  <CountryFlag country="AU" size="md" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* REVIEWS GRID */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full mb-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-[#f9f9f9] border border-[#EF233C]/40 px-4 py-1.5 rounded-none mb-4 shadow-sm">
              <MessageCircle className="w-4 h-4 text-[#EF233C]" aria-hidden="true" />
              <span className="text-[#111111] font-black text-xs uppercase tracking-widest">
                Customer Stories
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-[#111111] uppercase tracking-tighter leading-tight">
              What US Customers Are <span className="text-[#EF233C]">Saying</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </section>

        {/* TRUST BADGES */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full mb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {TRUST_BADGES.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-[#f9f9f9] border-2 border-[#111111]/15 hover:border-[#EF233C] rounded-none p-5 text-center transition-all duration-300 shadow-sm"
                >
                  <div className="w-12 h-12 rounded-none bg-[#EF233C]/10 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-[#EF233C]" aria-hidden="true" />
                  </div>
                  <h3 className="text-sm font-black text-[#111111] uppercase tracking-tight mb-1">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-[#555555] font-bold leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* CHAT CTA */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full mb-16">
          <div className="relative rounded-none overflow-hidden border border-[#FFD700]/30 bg-gradient-to-br from-[#EF233C] via-[#2a0814] to-black p-8 md:p-10 text-center shadow-xl text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,215,0,0.1),_transparent_70%)] pointer-events-none" aria-hidden="true" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-[#FFD700] text-black px-4 py-2 rounded-none mb-5 shadow-md border border-black">
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span className="font-black text-xs uppercase tracking-widest">
                  Join {HAPPY_CUSTOMERS} US Viewers
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-tight mb-4 drop-shadow-md">
                Get Started with a Free 24 Hour Trial
              </h2>
              <p className="text-white/90 text-sm sm:text-base font-bold max-w-xl mx-auto mb-6">
                Message our team on chat. We will set up IBO Player Pro for you and get you streaming in under 10 minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={waLink("Hi! I read your reviews and I'd like to try the free 24 hour trial.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-none bg-[#FFD700] text-black font-black text-sm uppercase tracking-widest hover:bg-[#ffdf33] transition-all shadow-md border border-[#FFD700]"
                >
                  <MessageCircle className="w-5 h-5 text-black" aria-hidden="true" />
                  Get Free Trial
                </a>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-none bg-black text-[#FFD700] font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-md border border-[#FFD700]/50"
                >
                  View Pricing <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full mb-16 relative">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-2xl h-96 bg-[#EF233C]/10 blur-[130px] rounded-none pointer-events-none" aria-hidden="true" />

          <div className="text-center mb-10 relative z-10">
            <div className="inline-flex items-center gap-2 bg-[#f9f9f9] border border-[#EF233C]/40 px-4 py-1.5 rounded-none mb-4 shadow-sm">
              <MessageCircle className="w-4 h-4 text-[#EF233C]" aria-hidden="true" />
              <span className="text-[#111111] font-black text-xs uppercase tracking-widest">
                Reviews FAQ
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-[#111111] uppercase tracking-tighter leading-tight">
              Common Questions <span className="text-[#EF233C]">About Our Reviews</span>
            </h2>
          </div>

          <div className="space-y-4 relative z-10">
            {REVIEW_FAQS.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full pb-20">
          <div className="bg-[#f9f9f9] rounded-none p-8 md:p-12 border-2 border-[#111111]/15 text-center shadow-sm">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter text-[#111111] leading-tight mb-4">
              Ready to Join Our <span className="text-[#EF233C]">Happy Customers?</span>
            </h2>
            <p className="text-[#333333] text-sm sm:text-base font-medium max-w-xl mx-auto mb-8">
              Choose from 3, 6, or 12 month plans starting at $35 USD. Guided chat setup, 36,000+ channels, and 120,000+ movies and TV shows.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/pricing"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-none bg-[#FFD700] text-black font-black text-sm uppercase tracking-widest hover:bg-[#ffdf33] transition-all shadow-md border border-[#FFD700]"
              >
                View Plans <ArrowRight className="w-5 h-5" aria-hidden="true" />
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