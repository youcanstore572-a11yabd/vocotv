// app/about/page.tsx
import { CONSTANTS, generateSEOMetadata } from '@/lib/seo';
import Link from 'next/link';
import {
  Award,
  Globe,
  Users,
  Server,
  Zap,
  ShieldCheck,
  Trophy,
  Headphones,
  Sparkles,
  Heart,
  Star,
  ArrowRight,
  Tv,
  Film,
  Activity,
} from 'lucide-react';

const SITE_URL = `https://${CONSTANTS.DOMAIN}`;
const BRAND = CONSTANTS.BRAND_NAME;
const PAGE_URL = `${SITE_URL}/about`;

// ---------------------------------------------------------------------------
// METADATA
// ---------------------------------------------------------------------------
export const metadata = generateSEOMetadata(
  'About Us',
  `Discover the story behind ${BRAND}, the trusted US streaming provider with 36,000+ live channels in 4K Ultra HD and 99.9% uptime.`,
  '/about'
);

// ---------------------------------------------------------------------------
// JSON-LD
// ---------------------------------------------------------------------------
const AboutPageSchema = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': `${PAGE_URL}/#about`,
        url: PAGE_URL,
        name: `About ${BRAND}`,
        description: `Learn about ${BRAND}, the trusted US streaming provider with 36,000+ live channels, 120,000+ movies and TV shows, and 15,000+ satisfied customers across the United States and beyond.`,
        inLanguage: 'en-US',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${PAGE_URL}/#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'About Us', item: PAGE_URL },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      id="about-page-schema"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

// ---------------------------------------------------------------------------
// MAIN PAGE
// ---------------------------------------------------------------------------
export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-[#111111]">

      <AboutPageSchema />

      {/* HERO */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-[#111111]/10 bg-gradient-to-b from-[#EF233C] via-[#2a0814] to-black text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(239,35,60,0.2),_transparent_50%)] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #FFFFFF08 1px, transparent 1px), linear-gradient(to bottom, #FFFFFF08 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 flex flex-col items-center justify-center">
          <div className="inline-flex items-center gap-2 bg-black/60 px-4 py-2 rounded-none mb-6 shadow-md border border-[#FFD700]/40">
            <Sparkles className="w-4 h-4 text-[#FFD700]" />
            <span className="text-white font-black text-xs uppercase tracking-widest">
              Our Story & Mission 🇺🇸
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-6 drop-shadow-md">
            About <span className="text-[#FFD700]">{BRAND}</span>
          </h1>

          <p className="text-lg md:text-xl text-white/90 font-bold max-w-2xl mx-auto leading-relaxed">
            America&apos;s premium streaming provider. Experience unlimited streaming in 4K quality without buffering, lock in contracts, or hidden fees.
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full" aria-label="Company statistics">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Users, value: '15,000+', label: 'Happy Customers' },
            { icon: Globe, value: '100+', label: 'Countries Available' },
            { icon: Server, value: '99.9%', label: 'Server Uptime' },
            { icon: Trophy, value: '4.9/5', label: 'Average Rating' },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="text-center p-6 bg-[#f9f9f9] border-2 border-[#111111]/15 rounded-none shadow-sm hover:scale-[1.02] hover:shadow-md transition-all duration-300"
              >
                <Icon className="w-10 h-10 text-[#EF233C] mx-auto mb-3" />
                <div className="text-2xl md:text-3xl font-black text-[#111111] uppercase tracking-tight">
                  {stat.value}
                </div>
                <div className="text-[#555555] text-xs font-black uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="w-full bg-gradient-to-br from-[#EF233C] via-[#2a0814] to-black py-10 px-4 sm:px-6 border-y border-[#FFD700]/30 shadow-xl relative z-20 overflow-hidden text-white">
        <div className="max-w-3xl mx-auto flex flex-col items-center justify-center text-center relative z-10 gap-5">
          <div className="bg-[#FFD700] text-black font-black text-xs px-5 py-2 rounded-none uppercase tracking-widest shadow-md border border-black">
            SAVE BIG ON CABLE TV
          </div>
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none drop-shadow-md max-w-2xl">
            READY FOR THE BEST STREAMING EXPERIENCE?
          </h2>
          <p className="text-white/90 text-sm sm:text-base md:text-lg font-bold max-w-xl leading-relaxed">
            Stop overpaying for separate subscriptions. Get all your sport, movies, and US channels in one complete package.
          </p>
          <div className="w-full sm:w-auto mt-2">
            <Link
              href="/pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#FFD700] text-black hover:bg-[#ffdf33] hover:scale-105 transition-all duration-300 px-10 py-4 rounded-none font-black text-sm uppercase tracking-widest shadow-md border border-[#FFD700]"
            >
              <span>View Subscriptions</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="max-w-4xl mx-auto px-4 py-16 w-full">

        {/* Intro Card */}
        <div className="bg-[#f9f9f9] border-2 border-[#111111]/15 rounded-none p-6 md:p-8 mb-12 shadow-sm">
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-none bg-[#EF233C]/10 flex items-center justify-center border border-[#EF233C]/30">
                <Heart className="w-6 h-6 text-[#EF233C]" />
              </div>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-[#111111] uppercase tracking-tight mb-2">
                Welcome to {BRAND}
              </h2>
              <p className="text-[#333333] font-bold text-base leading-relaxed">
                We were founded with one clear goal. Making premium live television and on demand media accessible and affordable for every household in America, without compromising on picture quality or stability.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Narrative */}
        <div className="space-y-12">

          {/* Mission */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-[#111111] uppercase tracking-tight mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-[#EF233C] rounded-none inline-block" />
              Our Mission & Vision
            </h2>
            <p className="text-[#333333] text-base leading-relaxed font-medium mb-4">
              Traditional cable subscriptions get more expensive every year while channel selection stays limited. American households are forced to bundle multiple services just to get the NFL, NBA, MLB, and movies, often paying $100 or more per month for a fraction of the content.
            </p>
            <p className="text-[#333333] text-base leading-relaxed font-medium">
              At {BRAND}, we bundle everything into one intuitive platform. Live sport, US national networks, and the latest cinema releases in 4K Ultra HD. We continuously invest in advanced server capacity to make buffering a thing of the past, even during the Super Bowl.
            </p>
          </section>

          {/* Feature Grid */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-[#111111] uppercase tracking-tight mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-[#EF233C] rounded-none inline-block" />
              Why {BRAND} Is the Best Choice
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: ShieldCheck,
                  title: '99.9% Uptime Guarantee',
                  desc: 'Our redundant server clusters keep your favourite broadcasts live and interruption free.',
                },
                {
                  icon: Zap,
                  title: 'Anti Freeze Technology',
                  desc: 'Advanced load balancers prevent buffering during peak hours and high traffic live sport events.',
                },
                {
                  icon: Server,
                  title: 'High Speed New York & Los Angeles Servers',
                  desc: 'Directly connected to major US and global internet exchanges for minimal latency and instant channel zapping.',
                },
                {
                  icon: Headphones,
                  title: '24/7 Chat Customer Support',
                  desc: 'Expert help for installation, app selection, and channel configuration, usually within minutes.',
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex gap-4 p-6 bg-[#f9f9f9] rounded-none border-2 border-[#111111]/15 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                  >
                    <Icon className="w-8 h-8 text-[#EF233C] flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-black text-[#111111] text-base uppercase tracking-wider">
                        {item.title}
                      </h3>
                      <p className="text-[#333333] text-xs font-bold mt-2 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Infrastructure */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-[#111111] uppercase tracking-tight mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-[#EF233C] rounded-none inline-block" />
              Our Technical Server Infrastructure
            </h2>
            <p className="text-[#333333] text-base leading-relaxed font-medium mb-6">
              We manage our own streaming servers with dedicated 10 Gbps fibre connections. Our servers automatically route the video signal through the closest node, so you always enjoy smooth 50 and 60 FPS streaming quality, whether you are in New York, Los Angeles, Chicago, Houston, or Phoenix.
            </p>
            <div className="bg-[#f9f9f9] border border-[#111111]/15 rounded-none p-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-white rounded-none border border-[#111111]/10 hover:border-[#EF233C] transition-all shadow-sm">
                  <Activity className="w-8 h-8 text-[#EF233C] mx-auto mb-2" />
                  <div className="text-lg font-black text-[#111111]">Low Latency</div>
                  <p className="text-xs text-[#555555] font-bold mt-1">
                    Minimal delay during live sport
                  </p>
                </div>
                <div className="p-4 bg-white rounded-none border border-[#111111]/10 hover:border-[#EF233C] transition-all shadow-sm">
                  <Film className="w-8 h-8 text-[#EF233C] mx-auto mb-2" />
                  <div className="text-lg font-black text-[#111111]">H.265 / HEVC</div>
                  <p className="text-xs text-[#555555] font-bold mt-1">
                    Optimal data usage at 4K
                  </p>
                </div>
                <div className="p-4 bg-white rounded-none border border-[#111111]/10 hover:border-[#EF233C] transition-all shadow-sm">
                  <Tv className="w-8 h-8 text-[#EF233C] mx-auto mb-2" />
                  <div className="text-lg font-black text-[#111111]">Universal</div>
                  <p className="text-xs text-[#555555] font-bold mt-1">
                    Works on every Smart TV system
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Content Catalog */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-[#111111] uppercase tracking-tight mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-[#EF233C] rounded-none inline-block" />
              The Most Complete Channel Lineup
            </h2>
            <p className="text-[#333333] text-base leading-relaxed font-medium mb-6">
              With over <strong className="text-[#111111]">36,000 live TV channels</strong> and a video library of{' '}
              <strong className="text-[#111111]">120,000+ movies and TV shows</strong>, we offer one of the widest channel packages in the USA:
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'All major US networks (NBC, CBS, ABC, PBS, The CW) in 4K & Full HD',
                'Live sport channels including ESPN, Fox Sports, NBA TV, NFL Network, MLB Network, and UFC PPV',
                'NFL Sunday, NBA, MLB, NHL, college football, Formula 1, Premier League, and international soccer',
                'Full international lineup from the UK, Canada, Europe, Latin America, India, Pakistan, China, and the Middle East',
                'Daily updated VOD catalog with English subtitles for cinema releases and top series',
                'Electronic Program Guide (EPG) and 7 day catch up and replay functionality',
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-[#333333] font-bold text-sm md:text-base"
                >
                  <Star className="w-5 h-5 text-[#EF233C] flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Free Trial */}
          <section>
            <div className="bg-[#f9f9f9] border-2 border-[#111111]/15 rounded-none p-6 md:p-8 shadow-sm">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-none bg-[#EF233C]/10 flex items-center justify-center flex-shrink-0 border border-[#EF233C]/30">
                  <Award className="w-6 h-6 text-[#EF233C]" />
                </div>
                <div>
                  <h3 className="text-[#111111] font-black text-lg md:text-xl uppercase tracking-tight mb-2">
                    Free 24 Hour Trial First
                  </h3>
                  <p className="text-[#333333] text-sm md:text-base font-bold leading-relaxed">
                    Message us on chat and we will set you up with a free 24 hour trial. Test the 4K picture, check the sport lineup, and make sure everything runs smooth on your own device and internet connection. Upgrade to a paid plan only when you are happy. No lock in, no pressure.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-[#f9f9f9] border-2 border-[#111111]/15 rounded-none p-8 md:p-12 shadow-sm">
            <h2 className="text-3xl md:text-4xl font-black text-[#111111] uppercase tracking-tight mb-3">
              Experience It Yourself, Risk Free
            </h2>
            <p className="text-[#555555] font-bold text-base max-w-lg mx-auto mb-8">
              Join thousands of happy households across America. Guided setup on chat and most customers are streaming within 10 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md mx-auto px-4">
              <Link
                href="/pricing"
                className="w-full sm:w-auto text-center px-8 py-4 rounded-none bg-[#FFD700] text-black font-black text-sm uppercase tracking-widest transition-transform hover:scale-105 shadow-md border border-[#FFD700]"
              >
                Choose Your Plan
              </Link>
              <Link
                href="/setup"
                className="w-full sm:w-auto text-center px-8 py-4 rounded-none bg-black text-[#FFD700] font-black text-sm uppercase tracking-widest border border-[#FFD700]/50 transition-transform hover:scale-105"
              >
                Setup Guide
              </Link>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-16 pt-8 border-t border-[#111111]/10 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#EF233C] hover:text-[#111111] transition-colors font-black text-xs uppercase tracking-widest"
          >
            ← Back to homepage
          </Link>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center">
          <p className="text-[#555555] text-xs font-bold">
            © {new Date().getFullYear()} {BRAND}. All rights reserved. Made in the USA 🇺🇸
          </p>
        </div>
      </div>
    </div>
  );
}