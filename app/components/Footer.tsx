// components/Footer.tsx
// ✅ Server Component — no "use client". Zero interactivity.
// ✅ Uses shared flag components from components/Flags.
// ✅ Footer link lists wrapped in <nav> landmarks.
// ✅ Year computed once at module scope (no hydration risk, no per-render).

import Link from 'next/link';
import Image from 'next/image';
import type { ReactElement } from 'react';
import { CONSTANTS } from '@/lib/seo';
import { channelsData } from '@/lib/channels-data';
import { Facebook, Instagram, Twitter, type LucideIcon } from 'lucide-react';
import { FlagUS, FlagCA, FlagUK, FlagAU } from '../components/Flags';

const BRAND = CONSTANTS.BRAND_NAME;
const CURRENT_YEAR = new Date().getFullYear();

// ---------------------------------------------------------------------------
// STATIC DATA — module scope, no per-render allocation
// ---------------------------------------------------------------------------
const NAV_LINKS: readonly { name: string; href: string }[] = [
  { name: 'Home', href: '/' },
  { name: 'Pricing & Plans', href: '/pricing' },
  { name: 'Setup Guide', href: '/setup' },
  { name: 'Reviews & Feedback', href: '/reviews' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Blog & Guide', href: '/blog' },
  { name: 'Support', href: '/support' },
  { name: 'Reseller Program', href: '/reseller' },
];

const LEGAL_LINKS: readonly { name: string; href: string }[] = [
  { name: 'About Us', href: '/about' },
  { name: 'Terms & Conditions', href: '/terms' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Refund & Guarantee Policy', href: '/refund-policy' },
  { name: 'DMCA Policy', href: '/dmca' },
];

const SERVING_FLAGS: readonly {
  name: string;
  code: string;
  Flag: () => ReactElement;
}[] = [
  { name: 'United States', code: 'US', Flag: FlagUS },
  { name: 'Canada', code: 'CA', Flag: FlagCA },
  { name: 'United Kingdom', code: 'UK', Flag: FlagUK },
  { name: 'Australia', code: 'AU', Flag: FlagAU },
];

const SOCIAL_LINKS: readonly {
  name: string;
  href: string | undefined;
  Icon: LucideIcon;
}[] = [
  { name: 'Twitter', href: CONSTANTS.SOCIALS?.twitter, Icon: Twitter },
  { name: 'Instagram', href: CONSTANTS.SOCIALS?.instagram, Icon: Instagram },
  { name: 'Facebook', href: CONSTANTS.SOCIALS?.facebook, Icon: Facebook },
];

const PAYMENT_METHODS = CONSTANTS.PAYMENT_METHODS ?? [];

// ---------------------------------------------------------------------------
// FOOTER
// ---------------------------------------------------------------------------
export default function Footer() {
  return (
    <footer className="relative bg-black text-white pt-16 border-t-4 border-[#FFD700] overflow-hidden shadow-[0_-10px_30px_rgba(239,35,60,0.15)]">
      {/* Top accent line with neon glow */}
      <div
        className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#EF233C] to-transparent shadow-[0_0_15px_#EF233C]"
        aria-hidden="true"
      />

      {/* Main body */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-5 flex flex-col justify-between">
            <div>
              <Link
                href="/"
                className="flex items-center gap-3 border-2 border-solid border-[#FF1746] mb-5 bg-white pb-3 px-3 pt-1 group inline-flex focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EF233C] rounded-none"
                aria-label={`${BRAND} - Home`}
              >
                <div className="w-auto h-12 flex items-center group-hover:scale-105 transition-transform duration-200">
                  <Image
                    src="/img/banner-logo.png"
                    alt={`${BRAND} Logo`}
                    width={180}
                    height={48}
                    className="object-contain h-full w-auto"
                    loading="lazy"
                  />
                </div>
              </Link>

              <p className="text-sm md:text-base font-bold text-white/80 max-w-sm leading-relaxed mb-5">
                Experience the future of American television with{' '}
                <strong className="text-[#EF233C] drop-shadow-[0_0_8px_rgba(239,35,60,0.5)]">{BRAND}</strong>. Delivering
                premium 4K IPTV streams across New York, Los Angeles, Chicago,
                Houston, and beyond.
              </p>

              {/* Serving badge */}
              <div className="inline-flex items-center flex-wrap gap-2 sm:gap-3 py-1.5 px-3 mb-6 rounded-none bg-[#0a0a0a] border border-[#EF233C]/60 backdrop-blur-md w-fit shadow-[0_0_10px_rgba(239,35,60,0.2)]">
                <span className="text-[10px] uppercase font-black tracking-wider text-white/60 shrink-0">
                  Serving:
                </span>
                <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 flex-wrap">
                  {SERVING_FLAGS.map(({ name, code, Flag }) => (
                    <div
                      key={code}
                      className="flex items-center gap-1 group cursor-default"
                    >
                      <Flag />
                      <span className="text-[10px] font-black uppercase text-white group-hover:text-[#EF233C] transition-colors">
                        <span className="sr-only">{name}</span>
                        <span aria-hidden="true">{code}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ name, href, Icon }) =>
                href ? (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow ${BRAND} on ${name}`}
                    className="group w-10 h-10 rounded-none bg-[#0a0a0a] border border-[#EF233C]/40 flex items-center justify-center hover:bg-[#EF233C] hover:border-[#EF233C] hover:shadow-[0_0_12px_#EF233C] transition-all duration-300 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EF233C]"
                  >
                    <Icon
                      className="w-4 h-4 text-white/80 group-hover:text-white transition-colors"
                      aria-hidden="true"
                    />
                  </a>
                ) : null
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav
            aria-labelledby="footer-nav-heading"
            className="lg:col-span-2"
          >
            <h3
              id="footer-nav-heading"
              className="text-white font-black mb-5 tracking-widest uppercase text-sm border-b-2 border-[#EF233C] pb-1 inline-block drop-shadow-[0_0_6px_rgba(239,35,60,0.4)]"
            >
              Navigation
            </h3>
            <ul className="space-y-3 text-sm font-bold">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-[#EF233C] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EF233C] rounded-none"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Channel Packages */}
          <nav
            aria-labelledby="footer-channels-heading"
            className="lg:col-span-3"
          >
            <h3
              id="footer-channels-heading"
              className="text-white font-black mb-5 tracking-widest uppercase text-sm border-b-2 border-[#EF233C] pb-1 inline-block drop-shadow-[0_0_6px_rgba(239,35,60,0.4)]"
            >
              Channel Packages
            </h3>
            <ul className="space-y-3 text-sm font-bold">
              {channelsData.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/channels/${category.slug}`}
                    className="text-white/70 hover:text-[#EF233C] transition-colors block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EF233C] rounded-none"
                  >
                    {category.name.replace(/\s*\([^)]*\)/g, '')}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <nav
            aria-labelledby="footer-legal-heading"
            className="lg:col-span-2"
          >
            <h3
              id="footer-legal-heading"
              className="text-white font-black mb-5 tracking-widest uppercase text-sm border-b-2 border-[#EF233C] pb-1 inline-block drop-shadow-[0_0_6px_rgba(239,35,60,0.4)]"
            >
              Legal
            </h3>
            <ul className="space-y-3 text-sm font-bold">
              {LEGAL_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-[#EF233C] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EF233C] rounded-none"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-[#EF233C]/30 py-6 px-6 lg:px-12 shadow-inner z-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
          <p className="text-base md:text-sm font-extrabold text-white tracking-wide text-center md:text-left">
            © {CURRENT_YEAR} <span className="text-[#EF233C] drop-shadow-[0_0_8px_rgba(239,35,60,0.5)]">{BRAND}</span>. All rights reserved.
          </p>

          <div className="flex items-center gap-3 flex-wrap justify-center">
            {PAYMENT_METHODS.map((item) => (
              <div
                key={item.name}
                className="relative h-10 w-16 shrink-0 rounded-none border border-[#EF233C]/30 bg-black p-1 shadow-sm hover:scale-105 hover:border-[#EF233C] hover:shadow-[0_0_10px_rgba(239,35,60,0.3)] transition-all duration-200"
                title={item.name}
              >
                <Image
                  src={item.icon}
                  alt={item.name}
                  fill
                  className="object-contain p-1 filter drop-shadow-sm opacity-95 invert"
                  loading="lazy"
                  sizes="64px"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}