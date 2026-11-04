// app/channels/[slug]/page.tsx
import {
  channelsData,
  getChannelCategoryBySlug,
  getAllCategorySlugs,
  type CountryCode,
} from '@/lib/channels-data';
import { CONSTANTS, generateSEOMetadata } from '@/lib/seo';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  Tv,
  ShieldCheck,
  Zap,
  ArrowLeft,
  Sparkles,
  HelpCircle,
  Activity,
  Cpu,
  MonitorSmartphone,
  MessageCircle,
  Users,
  Globe,
  Film,
  Trophy,
  Baby,
  Star,
} from 'lucide-react';
import ShareButtons from '../../components/ShareButtons';

const SITE_URL = `https://${CONSTANTS.DOMAIN}`;
const BRAND = CONSTANTS.BRAND_NAME;

// ---------------------------------------------------------------------------
// COUNTRY FLAG — complete support for every country in channels-data.ts
// ---------------------------------------------------------------------------
function CountryFlag({
  country,
  size = 'md',
  uid = '0',
}: {
  country: CountryCode;
  size?: 'sm' | 'md' | 'lg';
  uid?: string | number;
}) {
  const dim = size === 'lg' ? 'w-7 h-7' : size === 'sm' ? 'w-4 h-4' : 'w-6 h-6';
  const cls = `${dim} rounded-none shadow-sm shrink-0 border border-white/20 overflow-hidden`;
  const cid = `cf-${country}-${uid}`;

  const wrap = (children: React.ReactNode) => (
    <svg className={cls} viewBox="0 0 32 32" aria-label={`${country} flag`}>
      <clipPath id={cid}>
        <rect width="32" height="32" rx="0" />
      </clipPath>
      <g clipPath={`url(#${cid})`}>{children}</g>
    </svg>
  );

  switch (country) {
    case 'AU':
      return wrap(
        <>
          <path fill="#111111" d="M0 0h32v32H0z" />
          <path stroke="#FFF" strokeWidth="4" d="M0 0l16 16M16 0L0 16" />
          <path stroke="#EF233C" strokeWidth="2" d="M0 0l16 16M16 0L0 16" />
          <path stroke="#FFF" strokeWidth="6" d="M8 0v16M0 8h16" />
          <path stroke="#EF233C" strokeWidth="3" d="M8 0v16M0 8h16" />
          <circle cx="24" cy="8" r="1.5" fill="#FFF" />
          <circle cx="24" cy="24" r="1.5" fill="#FFF" />
          <circle cx="20" cy="18" r="1.5" fill="#FFF" />
          <circle cx="28" cy="18" r="1.5" fill="#FFF" />
          <circle cx="16" cy="26" r="1.5" fill="#FFF" />
        </>
      );
    case 'US':
      return wrap(
        <>
          <path fill="#FFF" d="M0 0h32v32H0z" />
          {[0, 4.57, 9.14, 13.71, 18.29, 22.86, 27.43].map((y, i) => (
            <path key={i} fill="#EF233C" d={`M0 ${y}h32v2.29H0z`} />
          ))}
          <path fill="#111111" d="M0 0h13.7v14.86H0z" />
        </>
      );
    case 'UK':
      return wrap(
        <>
          <path fill="#111111" d="M0 0h32v32H0z" />
          <path stroke="#FFF" strokeWidth="6" d="M0 0l32 32M32 0L0 32" />
          <path stroke="#EF233C" strokeWidth="3" d="M0 0l32 32M32 0L0 32" />
          <path stroke="#FFF" strokeWidth="10" d="M16 0v32M0 16h32" />
          <path stroke="#EF233C" strokeWidth="6" d="M16 0v32M0 16h32" />
        </>
      );
    case 'CA':
      return wrap(
        <>
          <path fill="#FFF" d="M0 0h32v32H0z" />
          <path fill="#EF233C" d="M0 0h8v32H0zM24 0h8v32h-8z" />
          <path
            fill="#EF233C"
            d="M16 7l1.2 2.4 2.6-.6-.9 2.5 2.3 1.3-2.1 1.5.8 2.5-2.5-.7L16 18l-1.4-2.1-2.5.7.8-2.5-2.1-1.5 2.3-1.3-.9-2.5 2.6.6L16 7z"
          />
        </>
      );
    case 'EU':
      return wrap(
        <>
          <path fill="#111111" d="M0 0h32v32H0z" />
          {[
            { cx: 16, cy: 6 },
            { cx: 22.7, cy: 8.8 },
            { cx: 25.5, cy: 15.4 },
            { cx: 22.7, cy: 22 },
            { cx: 16, cy: 24.8 },
            { cx: 9.3, cy: 22 },
            { cx: 6.5, cy: 15.4 },
            { cx: 9.3, cy: 8.8 },
          ].map((star, i) => (
            <circle key={i} cx={star.cx} cy={star.cy} r="1.3" fill="#FFD700" />
          ))}
        </>
      );
    case 'CN':
      return wrap(
        <>
          <path fill="#EF233C" d="M0 0h32v32H0z" />
          <path
            fill="#FFD700"
            d="M6 5l1.6 4.9 5.1 0-4.1 3 1.6 4.9-4.2-3-4.2 3 1.6-4.9-4.1-3 5.1 0z"
          />
          <circle cx="15" cy="5" r="1.2" fill="#FFD700" />
          <circle cx="19" cy="8" r="1.2" fill="#FFD700" />
          <circle cx="19" cy="13" r="1.2" fill="#FFD700" />
          <circle cx="15" cy="16" r="1.2" fill="#FFD700" />
        </>
      );
    case 'IN':
      return wrap(
        <>
          <path fill="#FF9933" d="M0 0h32v10.7H0z" />
          <path fill="#FFF" d="M0 10.7h32v10.6H0z" />
          <path fill="#138808" d="M0 21.3h32V32H0z" />
          <circle cx="16" cy="16" r="3" fill="none" stroke="#111111" strokeWidth="0.8" />
          <circle cx="16" cy="16" r="1" fill="#111111" />
        </>
      );
    case 'PK':
      return wrap(
        <>
          <path fill="#111111" d="M0 0h32v32H0z" />
          <path fill="#FFF" d="M0 0h8v32H0z" />
          <circle cx="19" cy="14" r="6" fill="#FFF" />
          <circle cx="21" cy="13" r="5.2" fill="#111111" />
          <path
            fill="#FFF"
            d="M23.5 9l.7 1.6 1.7.1-1.3 1.1.4 1.7-1.5-.9-1.5.9.4-1.7-1.3-1.1 1.7-.1z"
          />
        </>
      );
    case 'JP':
      return wrap(
        <>
          <path fill="#FFF" d="M0 0h32v32H0z" />
          <circle cx="16" cy="16" r="8" fill="#EF233C" />
        </>
      );
    case 'KR':
      return wrap(
        <>
          <path fill="#FFF" d="M0 0h32v32H0z" />
          <circle cx="16" cy="16" r="7" fill="#EF233C" />
          <path fill="#111111" d="M16 9a3.5 3.5 0 000 7 3.5 3.5 0 000-7z" />
        </>
      );
    case 'ME':
      return wrap(
        <>
          <path fill="#111111" d="M0 0h32v32H0z" />
          <text
            x="16"
            y="21"
            textAnchor="middle"
            fontSize="12"
            fontWeight="900"
            fill="#FFFFFF"
            fontFamily="Arial"
          >
            ﷲ
          </text>
        </>
      );
    case 'PH':
      return wrap(
        <>
          <path fill="#111111" d="M0 0h32v16H0z" />
          <path fill="#EF233C" d="M0 16h32v16H0z" />
          <path fill="#FFF" d="M0 0l16 16L0 32z" />
          <circle cx="5" cy="16" r="1.6" fill="#FFD700" />
          <circle cx="9" cy="11" r="1" fill="#FFD700" />
          <circle cx="9" cy="21" r="1" fill="#FFD700" />
        </>
      );
    case 'TH':
      return wrap(
        <>
          <path fill="#EF233C" d="M0 0h32v32H0z" />
          <path fill="#F4F5F8" d="M0 5.3h32v21.4H0z" />
          <path fill="#111111" d="M0 10.7h32v10.6H0z" />
        </>
      );
    case 'VN':
      return wrap(
        <>
          <path fill="#EF233C" d="M0 0h32v32H0z" />
          <path
            fill="#FFD700"
            d="M16 7l2 6.2h6.5l-5.3 3.8 2 6.2-5.2-3.8-5.2 3.8 2-6.2L7.5 13.2H14z"
          />
        </>
      );
    case 'ID':
      return wrap(
        <>
          <path fill="#FFF" d="M0 0h32v32H0z" />
          <path fill="#EF233C" d="M0 0h32v16H0z" />
        </>
      );
    case 'MY':
      return wrap(
        <>
          <path fill="#FFF" d="M0 0h32v32H0z" />
          {[0, 3.2, 6.4, 9.6, 12.8, 16, 19.2, 22.4, 25.6, 28.8].map((y, i) => (
            <path key={i} fill="#EF233C" d={`M0 ${y}h32v1.6H0z`} />
          ))}
          <path fill="#111111" d="M0 0h16v17H0z" />
          <circle cx="8" cy="8.5" r="4" fill="#FFD700" />
          <circle cx="10" cy="8.5" r="3.3" fill="#111111" />
          <path
            fill="#FFD700"
            d="M12 5.5l.6 1.4 1.5.1-1.1 1 .3 1.5-1.3-.8-1.3.8.3-1.5-1.1-1 1.5-.1z"
          />
        </>
      );
    case 'NZ':
      return wrap(
        <>
          <path fill="#111111" d="M0 0h32v32H0z" />
          <path stroke="#FFF" strokeWidth="4" d="M0 0l16 16M16 0L0 16" />
          <path stroke="#EF233C" strokeWidth="2" d="M0 0l16 16M16 0L0 16" />
          <path stroke="#FFF" strokeWidth="6" d="M8 0v16M0 8h16" />
          <path stroke="#EF233C" strokeWidth="3" d="M8 0v16M0 8h16" />
          <circle cx="24" cy="6" r="1" fill="#EF233C" stroke="#FFF" strokeWidth="0.6" />
          <circle cx="24" cy="12" r="1" fill="#EF233C" stroke="#FFF" strokeWidth="0.6" />
          <circle cx="24" cy="20" r="1" fill="#EF233C" stroke="#FFF" strokeWidth="0.6" />
          <circle cx="24" cy="26" r="1" fill="#EF233C" stroke="#FFF" strokeWidth="0.6" />
          <circle cx="19" cy="16" r="0.7" fill="#EF233C" stroke="#FFF" strokeWidth="0.5" />
        </>
      );
    default:
      return wrap(<path fill="#888" d="M0 0h32v32H0z" />);
  }
}

// ---------------------------------------------------------------------------
// CATEGORY ICONS
// ---------------------------------------------------------------------------
const categoryIcons: Record<string, any> = {
  sports: Trophy,
  usa: Globe,
  canadian: Users,
  europe: Globe,
  'asia-middle-east': Globe,
  'movies-vod': Film,
  'kids-family': Baby,
};

const HERO_FLAGS: CountryCode[] = ['US', 'CA', 'UK', 'EU', 'AU', 'IN', 'CN', 'ME'];

// ---------------------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------------------
type Props = { params: Promise<{ slug: string }> };

// ---------------------------------------------------------------------------
// STATIC PARAMS
// ---------------------------------------------------------------------------
export function generateStaticParams() {
  return getAllCategorySlugs().map((slug) => ({ slug }));
}

// ---------------------------------------------------------------------------
// METADATA
// ---------------------------------------------------------------------------
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const category = getChannelCategoryBySlug(resolvedParams.slug);

  if (!category) {
    return generateSEOMetadata('Channel Category Not Found');
  }

  const title = `${category.name} | ${BRAND} 4K Streaming 2026`;
  const description = `Watch ${category.name.toLowerCase()} on ${BRAND} — ${category.totalChannels.toLocaleString('en-US')}+ live channels including ${category.channels.slice(0, 3).map((c) => c.name).join(', ')}.`;

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, absolute: title },
    description,
    keywords: category.keywords.join(', '),
    alternates: {
      canonical: `${SITE_URL}/channels/${category.slug}`,
      languages: {
        'en-US': `${SITE_URL}/channels/${category.slug}`,
        'en-CA': `${SITE_URL}/channels/${category.slug}`,
        'x-default': `${SITE_URL}/channels/${category.slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/channels/${category.slug}`,
      type: 'website',
      locale: 'en_US',
      siteName: BRAND,
      images: [
        {
          url: `${SITE_URL}/img/background.webp`,
          width: 1200,
          height: 630,
          alt: `${category.name} - ${BRAND} Channels`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_URL}/img/background.webp`],
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
  };
}

// ---------------------------------------------------------------------------
// MAIN PAGE
// ---------------------------------------------------------------------------
export default async function ChannelCategoryPage({ params }: Props) {
  const resolvedParams = await params;
  const category = getChannelCategoryBySlug(resolvedParams.slug);

  if (!category) {
    notFound();
  }

  const whatsappBaseUrl = CONSTANTS.CONTACT.whatsappUrl;
  const Icon = categoryIcons[category.slug] || Tv;

  // Sort so popular channels appear first
  const popularChannels = category.channels.filter((c) => c.popular);
  const otherChannels = category.channels.filter((c) => !c.popular);
  const sortedChannels = [...popularChannels, ...otherChannels];

  const jsonLdGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/channels/${category.slug}/#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Channels', item: `${SITE_URL}/#channels` },
          { '@type': 'ListItem', position: 3, name: category.name, item: `${SITE_URL}/channels/${category.slug}` },
        ],
      },
      {
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}/channels/${category.slug}/#collection`,
        url: `${SITE_URL}/channels/${category.slug}`,
        name: `${category.name} | ${BRAND}`,
        description: category.description,
        inLanguage: 'en-US',
        isPartOf: { '@id': `${SITE_URL}/#website` },
      },
      {
        '@type': 'ItemList',
        name: `${category.name} Channels`,
        numberOfItems: category.channels.length,
        itemListElement: category.channels.map((ch, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: ch.name,
          description: ch.description,
        })),
      },
      {
        '@type': 'Product',
        name: `${BRAND} — ${category.name}`,
        image: `${SITE_URL}/img/background.webp`,
        description: category.description,
        brand: { '@type': 'Brand', name: BRAND },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'USD',
          lowPrice: '35.00',
          highPrice: '99.00',
          offerCount: '9',
          availability: 'https://schema.org/InStock',
          url: `${SITE_URL}/pricing`,
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/channels/${category.slug}/#faq`,
        mainEntity: category.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#111111] overflow-hidden">

      <script
        type="application/ld+json"
        id="channel-category-schema"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
      />

      {/* HERO */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#111111]/10 overflow-hidden bg-gradient-to-b from-[#EF233C] via-[#2a0814] to-black text-white">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#EF233C]/20 blur-[140px] rounded-none" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(to right, #FFFFFF 1px, transparent 1px), linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="flex items-center justify-center gap-2 mb-6 text-[10px] sm:text-xs font-black uppercase tracking-widest text-white/75 flex-wrap">
            <Link href="/" className="hover:text-[#FFD700] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-white/85">Channels</span>
            <span>/</span>
            <span className="text-[#FFD700]">{category.name}</span>
          </div>

          <div className="inline-flex items-center gap-2 bg-black/60 px-4 py-2 rounded-none mb-6 shadow-md border border-[#FFD700]/40">
            <Icon className="w-4 h-4 text-[#FFD700]" />
            <span className="text-white font-black text-xs uppercase tracking-widest">
              Live Stream Hub 🇺🇸
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter uppercase mb-6 leading-none whitespace-normal break-words drop-shadow-md">
            {category.name} <br className="hidden sm:block" />
            <span className="text-[#FFD700]">Channels</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/90 font-bold max-w-3xl mx-auto leading-relaxed mb-6">
            {category.description}
          </p>

          <div className="w-full max-w-3xl mx-auto my-6 px-3 py-2.5 rounded-none bg-black/80 border border-white/15 backdrop-blur-md flex items-center justify-center gap-3 sm:gap-5 overflow-x-auto shadow-xl flex-wrap">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-white/70 shrink-0">
              Available in:
            </span>
            <div className="flex items-center gap-3 sm:gap-4 shrink-0 flex-wrap justify-center">
              {HERO_FLAGS.map((code, i) => (
                <div
                  key={code}
                  className="flex items-center gap-1.5 group cursor-default transition-transform hover:scale-105"
                >
                  <CountryFlag country={code} size="md" uid={`hero-${i}`} />
                  <span className="text-[10px] sm:text-xs font-black uppercase text-white group-hover:text-[#FFD700] transition-colors">
                    {code}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-xs md:text-sm text-white/90 font-black uppercase tracking-widest mt-6">
            <span className="flex items-center gap-2 bg-black/80 px-4 py-2 rounded-none border border-white/15">
              <Zap className="w-4 h-4 text-[#FFD700]" /> {category.totalChannels.toLocaleString('en-US')}+ Channels
            </span>
            <span className="flex items-center gap-2 bg-black/80 px-4 py-2 rounded-none border border-white/15">
              <ShieldCheck className="w-4 h-4 text-[#FFD700]" /> Anti Freeze 60FPS
            </span>
            <span className="flex items-center gap-2 bg-black/80 px-4 py-2 rounded-none border border-white/15">
              <Activity className="w-4 h-4 text-[#FFD700]" /> 99.9% Server Uptime
            </span>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Link
              href="/pricing"
              className="w-full sm:w-auto text-center px-8 py-4 rounded-none bg-[#FFD700] text-black font-black text-sm uppercase tracking-widest hover:bg-[#ffdf33] transition-transform hover:scale-105 shadow-md border border-[#FFD700]"
            >
              Choose a Plan
            </Link>
            <a
              href={`${whatsappBaseUrl}?text=${encodeURIComponent(`Hi ${BRAND}, I would like a free 24 hour trial for the ${category.name} package.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center px-8 py-4 rounded-none bg-black text-[#FFD700] font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-md border border-[#FFD700]/50"
            >
              Free 24h Trial
            </a>
          </div>
        </div>
      </section>

      {/* CHANNELS GRID — popular first, browser native lazy render */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#111111] uppercase tracking-tight">
              Available <span className="text-[#EF233C]">{category.name}</span>
            </h2>
            <p className="text-[#333333] font-bold text-sm sm:text-base mt-2">
              Popular channels shown first. Every channel streams in FHD or 4K with low latency and 7 day catch up.
            </p>
          </div>
          <div className="text-xs uppercase font-black tracking-widest text-[#555555] bg-[#f9f9f9] px-4 py-2 rounded-none border border-[#111111]/15 w-fit shadow-sm">
            Automatic EPG TV Guide Included
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sortedChannels.map((channel, idx) => (
            <div
              key={idx}
              style={{
                contentVisibility: 'auto',
                containIntrinsicSize: '420px',
              }}
              className="group relative bg-[#f9f9f9] border-2 border-[#111111]/15 rounded-none overflow-hidden hover:border-[#EF233C] hover:-translate-y-1.5 hover:shadow-md transition-all duration-300 flex flex-col"
            >
              <div className="flex items-start justify-between gap-2 p-4 pb-2">
                <div className="flex flex-col items-start gap-1.5">
                  <span className="px-2.5 py-1 bg-[#EF233C] text-white text-[10px] font-black uppercase tracking-wider rounded-none shadow-sm">
                    {channel.quality}
                  </span>
                  {channel.popular && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-black text-white text-[9px] font-black uppercase tracking-wider rounded-none shadow-sm border border-white/10">
                      <Star className="w-2.5 h-2.5 fill-[#FFD700] text-[#FFD700]" />
                      Popular
                    </span>
                  )}
                </div>
                <CountryFlag country={channel.country ?? 'US'} size="md" uid={`card-${idx}`} />
              </div>

              <div className="px-4 flex items-start gap-3 mb-2">
                <div className="w-11 h-11 rounded-none bg-black flex items-center justify-center shrink-0 group-hover:bg-[#EF233C] transition-colors shadow-sm">
                  <Tv className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-black text-[#111111] text-base uppercase tracking-tight leading-tight">
                    {channel.name}
                  </h3>
                  {channel.genre && (
                    <p className="text-[10px] font-black uppercase tracking-wider text-[#EF233C] mt-0.5">
                      {channel.genre}
                    </p>
                  )}
                </div>
              </div>

              <div className="px-4 pb-4 flex flex-col flex-1">
                <p className="text-[#333333] text-xs font-bold leading-relaxed mb-3">
                  {channel.description}
                </p>

                {channel.whyWatch && (
                  <div className="flex items-start gap-2 p-2.5 rounded-none bg-[#EF233C]/10 border border-[#EF233C]/30 mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-[#EF233C] shrink-0 mt-0.5" />
                    <p className="text-[11px] font-black text-[#EF233C] leading-snug">
                      {channel.whyWatch}
                    </p>
                  </div>
                )}

                <div className="mt-auto pt-3 border-t border-[#111111]/10 flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-[#555555]">
                  <span>✓ 50/60 FPS Smooth</span>
                  <span>7 Day Catch Up</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY + TRUST + FAQ + CTA */}
      <section className="py-16 bg-white border-t border-[#111111]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#f9f9f9] border-2 border-[#111111]/15 rounded-none p-6 sm:p-10 mb-12 shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-black text-[#111111] uppercase tracking-tight mb-4">
              Why stream {category.name} with {BRAND}?
            </h2>
            <div className="text-[#333333] font-medium text-sm sm:text-base leading-relaxed space-y-4">
              <p>{category.longDescription}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
            <div className="p-6 bg-[#f9f9f9] border-2 border-[#111111]/15 rounded-none text-center hover:border-[#EF233C] transition-colors shadow-sm">
              <Cpu className="w-8 h-8 text-[#EF233C] mx-auto mb-2" />
              <h3 className="font-black text-sm uppercase text-[#111111]">H.265 / HEVC</h3>
              <p className="text-xs text-[#555555] font-bold mt-1">
                Sharp 4K picture with minimal data usage
              </p>
            </div>
            <div className="p-6 bg-[#f9f9f9] border-2 border-[#111111]/15 rounded-none text-center hover:border-[#EF233C] transition-colors shadow-sm">
              <MonitorSmartphone className="w-8 h-8 text-[#EF233C] mx-auto mb-2" />
              <h3 className="font-black text-sm uppercase text-[#111111]">Universal Compatibility</h3>
              <p className="text-xs text-[#555555] font-bold mt-1">
                Smart TV, Firestick, Android, Apple TV and PC
              </p>
            </div>
            <div className="p-6 bg-[#f9f9f9] border-2 border-[#111111]/15 rounded-none text-center hover:border-[#EF233C] transition-colors shadow-sm">
              <ShieldCheck className="w-8 h-8 text-[#EF233C] mx-auto mb-2" />
              <h3 className="font-black text-sm uppercase text-[#111111]">Anti Freeze Load Balancing</h3>
              <p className="text-xs text-[#555555] font-bold mt-1">
                No buffering during peak viewing hours
              </p>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-black text-[#111111] uppercase tracking-tight mb-8 text-center">
              Frequently Asked Questions about <span className="text-[#EF233C]">{category.name}</span>
            </h2>

            <div className="space-y-4">
              {category.faqs.map((faq, idx) => (
                <div key={idx} className="bg-[#f9f9f9] border-2 border-[#111111]/15 rounded-none p-6 shadow-sm">
                  <h3 className="text-base sm:text-lg font-black text-[#111111] uppercase tracking-tight mb-3 flex items-start gap-2">
                    <HelpCircle className="w-5 h-5 text-[#EF233C] shrink-0 mt-0.5" />
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-[#333333] text-sm font-medium leading-relaxed pl-7 border-l-4 border-[#EF233C] ml-1 py-1">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-none overflow-hidden border border-[#FFD700]/30 bg-gradient-to-br from-[#EF233C] via-[#2a0814] to-black p-8 md:p-10 text-center shadow-xl mb-12 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,215,0,0.1),_transparent_70%)] pointer-events-none" />
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-tight mb-4 drop-shadow-md">
                Ready to Watch {category.name}?
              </h3>
              <p className="text-white/90 text-sm sm:text-base font-bold max-w-xl mx-auto mb-6">
                Message our team on chat. We will activate IBO Player Pro for you and set up your subscription in under 10 minutes.
              </p>
              <a
                href={`${whatsappBaseUrl}?text=${encodeURIComponent(`Hi ${BRAND}, I would like to subscribe to the ${category.name} package.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-none bg-[#FFD700] text-black font-black text-sm uppercase tracking-widest hover:bg-[#ffdf33] transition-all shadow-md border border-[#FFD700]"
              >
                <MessageCircle className="w-5 h-5 text-black" />
                Get Started on Chat
              </a>
            </div>
          </div>

          <div className="w-full flex justify-center items-center my-10">
            <ShareButtons
              title={`${category.name} - ${BRAND}`}
              url={`${SITE_URL}/channels/${category.slug}`}
            />
          </div>

          <div className="mt-16 pt-10 border-t border-[#111111]/10">
            <h3 className="text-xl font-black text-[#111111] uppercase tracking-tight mb-6 text-center">
              Explore Other Channel Packages
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {channelsData
                .filter((c) => c.slug !== category.slug)
                .map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/channels/${cat.slug}`}
                    className="p-4 bg-[#f9f9f9] border border-[#111111]/15 rounded-none hover:border-[#EF233C] transition-all text-center group shadow-sm"
                  >
                    <span className="text-xs sm:text-sm font-black uppercase text-[#111111] group-hover:text-[#EF233C] transition-colors block">
                      {cat.name}
                    </span>
                    <span className="text-[10px] text-[#555555] font-bold mt-1 block">
                      {cat.totalChannels.toLocaleString('en-US')}+ Channels
                    </span>
                  </Link>
                ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[#EF233C] hover:text-[#111111] transition-colors font-black text-xs uppercase tracking-widest"
            >
              <ArrowLeft className="w-4 h-4" /> Back to homepage
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}