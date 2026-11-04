// app/reseller/page.tsx
'use client';

import { useState, useId } from 'react';
import Link from 'next/link';
import { CONSTANTS } from '@/lib/seo';
import {
  ArrowRight,
  BadgeDollarSign,
  BarChart3,
  Bot,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  Globe,
  Headphones,
  LayoutDashboard,
  MessageCircle,
  Package,
  Rocket,
  Server,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserPlus,
  Users,
  Wallet,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { FadeIn, FadeInStagger, FadeInItem } from '../components/AnimatedSection';

const BRAND = CONSTANTS.BRAND_NAME;
const YEAR = new Date().getFullYear();

// ---------------------------------------------------------------------------
// Hero grid — module-scope constant (no per-render allocation)
// ---------------------------------------------------------------------------
const HERO_GRID_STYLE = {
  backgroundImage: `linear-gradient(to right, #111111 1px, transparent 1px), linear-gradient(to bottom, #111111 1px, transparent 1px)`,
  backgroundSize: '60px 60px',
} as const;

// ---------------------------------------------------------------------------
// CURRENCY SYSTEM
// ---------------------------------------------------------------------------
type CurrencyCode = 'USD' | 'CAD' | 'GBP';

const CURRENCIES: Record<
  CurrencyCode,
  { code: CurrencyCode; label: string; symbol: string; usdRate: number }
> = {
  USD: { code: 'USD', label: 'USD', symbol: '$', usdRate: 1 },
  CAD: { code: 'CAD', label: 'CAD', symbol: 'C$', usdRate: 1.36 },
  GBP: { code: 'GBP', label: 'GBP', symbol: '£', usdRate: 0.79 },
};

const CURRENCY_ORDER: readonly CurrencyCode[] = ['USD', 'CAD', 'GBP'];

const formatPrice = (usdAmount: number, currency: CurrencyCode): string => {
  const { symbol, usdRate } = CURRENCIES[currency];
  const converted = Math.round(usdAmount * usdRate);
  return `${symbol}${converted.toLocaleString('en-US')}`;
};

// ---------------------------------------------------------------------------
// PRICING TIERS
// ---------------------------------------------------------------------------
interface PricingTier {
  name: string;
  tag: string;
  years: number;
  credits: number;
  wholesaleUSD: number;
  perYearUSD: number;
  retailMinUSD: number;
  retailMaxUSD: number;
  highlighted: boolean;
  features: string[];
  waMessage: string;
}

const TIERS: readonly PricingTier[] = [
  {
    name: 'Starter',
    tag: '10 Years',
    years: 10,
    credits: 10,
    wholesaleUSD: 300,
    perYearUSD: 30,
    retailMinUSD: 50,
    retailMaxUSD: 100,
    highlighted: false,
    features: [
      `10 ${BRAND} reseller credits (10 years)`,
      'Full reseller panel access',
      'Instant per customer activation',
      '24/7 live chat support',
      'Credits never expire',
      'Free trial line generator',
      'Payment integration ready',
    ],
    waMessage: `Hi! I want the Starter ${BRAND} Reseller package (10 years / $300).`,
  },
  {
    name: 'Growth',
    tag: '20 Years',
    years: 20,
    credits: 20,
    wholesaleUSD: 550,
    perYearUSD: 27.5,
    retailMinUSD: 50,
    retailMaxUSD: 100,
    highlighted: true,
    features: [
      `20 ${BRAND} reseller credits (20 years)`,
      'Full reseller panel access',
      'Instant per customer activation',
      'Priority live chat support',
      'Credits never expire',
      'Free trial line generator',
      'Custom pricing per customer',
      'API access included',
    ],
    waMessage: `Hi! I want the Growth ${BRAND} Reseller package (20 years / $550).`,
  },
  {
    name: 'Pro',
    tag: '30 Years',
    years: 30,
    credits: 30,
    wholesaleUSD: 750,
    perYearUSD: 25,
    retailMinUSD: 50,
    retailMaxUSD: 100,
    highlighted: false,
    features: [
      `30 ${BRAND} reseller credits (30 years)`,
      'Full reseller panel access',
      'Instant per customer activation',
      'Dedicated live chat support',
      'Credits never expire',
      'Free trial line generator',
      'Custom pricing per customer',
      'Full API access included',
      'White label branding option',
    ],
    waMessage: `Hi! I want the Pro ${BRAND} Reseller package (30 years / $750).`,
  },
];

// ---------------------------------------------------------------------------
// FAQS
// ---------------------------------------------------------------------------
const FAQS: readonly { q: string; a: string }[] = [
  {
    q: `What exactly is a ${BRAND} reseller panel?`,
    a: `A ${BRAND} reseller panel is a private dashboard that lets you create and manage streaming subscriptions for your own customers. You buy credits from us in bulk, then use those credits to activate yearly, monthly, or trial subscriptions for anyone you sell to. You keep the full retail price minus your wholesale cost, and your customers never see that we exist behind the scenes.`,
  },
  {
    q: `How much can I realistically earn as a ${BRAND} reseller in the USA?`,
    a: `It depends on how many customers you bring in. American and international customers typically pay between $50 and $100 per year, with $75 being the average. Your wholesale cost per credit starts around $30 per year, so your profit per sale ranges from $20 to $70 depending on your selling price. Sell 10 subscriptions at $75 and you have earned roughly $450 in profit from a $300 investment.`,
  },
  {
    q: 'Do I need technical skills to become a reseller?',
    a: 'No. The reseller panel is designed to be simple. If you can use live chat and a web browser, you can run a reseller business. We also provide onboarding guidance over live chat, so any time you get stuck, our team walks you through it directly.',
  },
  {
    q: 'Do the reseller credits expire?',
    a: 'No. Your credits stay in your account indefinitely. You can activate them at your own pace, whether that means selling several subscriptions in a week or spreading them across months. There is no monthly minimum, no expiration date, and no pressure to sell quickly.',
  },
  {
    q: 'Which currencies can I sell in?',
    a: 'You can sell to your customers in any currency you prefer. US dollars, Canadian dollars, British pounds, or anything else. Your wholesale cost with us is fixed in USD. Your retail price is completely up to you, so you control your margin. Use the currency toggle at the top of the pricing section to see all prices in USD, CAD, or GBP.',
  },
  {
    q: 'What kind of support do I get as a reseller?',
    a: 'Every reseller, regardless of tier, gets direct live chat support from our team. The Growth plan adds priority response times, and the Pro plan includes a dedicated support channel plus white label setup assistance.',
  },
];

// ---------------------------------------------------------------------------
// STEPS
// ---------------------------------------------------------------------------
const STEPS: readonly { icon: LucideIcon; number: string; title: string; description: string }[] = [
  {
    icon: Wallet,
    number: '01',
    title: 'Buy Your Credits',
    description: `Choose a package and receive your ${BRAND} credits instantly. Starter, Growth, and Pro all activate within minutes of payment confirmation.`,
  },
  {
    icon: LayoutDashboard,
    number: '02',
    title: 'Access Your Panel',
    description:
      'Log into your private reseller dashboard. Create subscriptions, generate trial lines, and manage every customer account from one clean interface.',
  },
  {
    icon: Users,
    number: '03',
    title: 'Sell to Customers',
    description:
      'Set your own prices and sell yearly, monthly, or trial subscriptions. You keep the full retail amount and only spend credits when you activate a customer.',
  },
  {
    icon: TrendingUp,
    number: '04',
    title: 'Scale Your Profit',
    description:
      'Buy more credits at lower per credit prices as your customer base grows. Every new tier improves your margin and increases your recurring income.',
  },
];

// ---------------------------------------------------------------------------
// VALUE CARDS
// ---------------------------------------------------------------------------
const VALUE_CARDS: readonly { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: BadgeDollarSign,
    title: 'Low Entry Cost',
    description: `Start your ${BRAND} reseller business with a single $300 package. No contracts, no monthly fees, no hidden charges. Just buy credits and start selling.`,
  },
  {
    icon: Users,
    title: 'Global Demand',
    description: `Millions of viewers look for cable alternatives every year. The ${BRAND} reseller market keeps growing with room for new sellers in every region.`,
  },
  {
    icon: Wallet,
    title: 'High Margins',
    description:
      'Your cost per yearly subscription starts at $25 to $30. Customers happily pay $50 to $100 per year. That is a strong margin on every sale.',
  },
  {
    icon: Server,
    title: 'Real Infrastructure',
    description:
      'You resell on our dedicated bare metal servers. No overloaded shared hosting, no downtime during peak hours, no technical issues to explain.',
  },
];

// ---------------------------------------------------------------------------
// PANEL FEATURES
// ---------------------------------------------------------------------------
const PANEL_FEATURES: readonly { icon: LucideIcon; label: string }[] = [
  { icon: LayoutDashboard, label: 'Reseller Dashboard' },
  { icon: Zap, label: 'Instant Activation' },
  { icon: Package, label: 'No Expiry Credits' },
  { icon: Bot, label: 'Trial Generator' },
  { icon: BarChart3, label: 'Sales Tracking' },
  { icon: CreditCard, label: 'Payment Ready' },
  { icon: Globe, label: 'Multi Currency' },
  { icon: Headphones, label: '24/7 Support' },
  { icon: ShieldCheck, label: 'Encrypted Panel' },
  { icon: Rocket, label: 'API Automation' },
];

// ---------------------------------------------------------------------------
// Live chat helper
// ---------------------------------------------------------------------------
const waLink = (message: string): string =>
  `${CONSTANTS.CONTACT.whatsappUrl}?text=${encodeURIComponent(message)}`;

// ---------------------------------------------------------------------------
// PRICING CARD
// ---------------------------------------------------------------------------
function PricingCard({ tier, currency }: { tier: PricingTier; currency: CurrencyCode }) {
  const wholesalePrice = formatPrice(tier.wholesaleUSD, currency);
  const perYearPrice = formatPrice(tier.perYearUSD, currency);
  const retailMin = formatPrice(tier.retailMinUSD, currency);
  const retailMax = formatPrice(tier.retailMaxUSD, currency);
  const totalProfit = formatPrice((tier.retailMaxUSD - tier.perYearUSD) * tier.years, currency);

  return (
    <div
      className={`relative flex flex-col rounded-none p-6 md:p-8 transition-all duration-300 ${
        tier.highlighted
          ? 'bg-gradient-to-br from-[#EF233C] via-[#2a0814] to-black border-2 border-[#FFD700] shadow-xl lg:-translate-y-4 z-20 text-white'
          : 'bg-[#f9f9f9] border-2 border-[#111111]/15 hover:border-[#EF233C] hover:-translate-y-2 hover:shadow-md text-[#111111]'
      }`}
    >
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30">
        <div
          className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-none text-[10px] font-black uppercase tracking-widest shadow-sm border whitespace-nowrap ${
            tier.highlighted
              ? 'bg-[#FFD700] text-black border-black'
              : 'bg-black text-[#FFD700] border-[#FFD700]'
          }`}
        >
          {tier.highlighted && <Sparkles className="w-3 h-3 shrink-0" aria-hidden="true" />}
          {tier.tag}
        </div>
      </div>

      <div className="pt-4">
        <h3
          className={`text-xs font-black uppercase tracking-[0.2em] mb-3 ${
            tier.highlighted ? 'text-white/90' : 'text-[#EF233C]'
          }`}
        >
          {tier.name}
        </h3>

        <div
          className={`text-2xl font-black uppercase tracking-tight mb-4 ${
            tier.highlighted ? 'text-white' : 'text-[#111111]'
          }`}
        >
          {tier.years} Years
        </div>

        <div className="mb-4">
          <div
            className={`text-5xl md:text-6xl font-black tracking-tighter mb-2 ${
              tier.highlighted ? 'text-white' : 'text-[#111111]'
            }`}
          >
            {wholesalePrice}
          </div>
          <div
            className={`text-xs font-bold tracking-wide ${
              tier.highlighted ? 'text-white/80' : 'text-[#555555]'
            }`}
          >
            {tier.credits} credits total
          </div>
        </div>

        <div
          className={`text-[11px] font-black uppercase tracking-widest mb-6 inline-block px-3 py-1 rounded-none border whitespace-nowrap ${
            tier.highlighted
              ? 'text-[#FFD700] border-[#FFD700]/40 bg-[#FFD700]/10'
              : 'text-[#EF233C] border-[#EF233C]/30 bg-[#EF233C]/10'
          }`}
        >
          {perYearPrice} per year
        </div>

        <div
          className={`rounded-none p-4 mb-6 ${
            tier.highlighted
              ? 'bg-black/40 border border-[#FFD700]/30'
              : 'bg-white border border-[#111111]/15'
          }`}
        >
          <div
            className={`text-[10px] font-black uppercase tracking-widest mb-2 ${
              tier.highlighted ? 'text-[#FFD700]/80' : 'text-[#555555]'
            }`}
          >
            Your Profit Potential
          </div>
          <div
            className={`text-xs font-bold mb-1 ${
              tier.highlighted ? 'text-white' : 'text-[#111111]'
            }`}
          >
            Sell at {retailMin} to {retailMax} / year
          </div>
          <div
            className={`text-base font-black uppercase mt-2 ${
              tier.highlighted ? 'text-[#FFD700]' : 'text-[#EF233C]'
            }`}
          >
            Up to {totalProfit} total
          </div>
        </div>

        <ul className="space-y-2.5 mb-8 flex-1">
          {tier.features.map((feature) => (
            <li
              key={feature}
              className={`flex items-start gap-2.5 text-xs font-bold ${
                tier.highlighted ? 'text-white' : 'text-[#333333]'
              }`}
            >
              <CheckCircle2
                className={`w-4 h-4 shrink-0 mt-0.5 ${
                  tier.highlighted ? 'text-[#FFD700]' : 'text-[#EF233C]'
                }`}
                aria-hidden="true"
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <a
          href={waLink(tier.waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full inline-flex items-center justify-center gap-2 py-4 rounded-none font-black text-xs uppercase tracking-widest transition-all hover:scale-105 whitespace-nowrap shadow-sm ${
            tier.highlighted
              ? 'bg-[#FFD700] text-black hover:bg-[#ffdf33]'
              : 'bg-black text-[#FFD700] hover:bg-[#EF233C] hover:text-white border border-[#FFD700]/50'
          }`}
        >
          <span>Get This Package</span>
          <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FAQ ITEM
// ---------------------------------------------------------------------------
function FaqItem({
  faq,
  index,
  defaultOpen = false,
}: {
  faq: { q: string; a: string };
  index: number;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const headingId = useId();
  const answerId = useId();
  const num = String(index + 1).padStart(2, '0');

  return (
    <div
      className={`relative overflow-hidden rounded-none border-2 transition-all duration-300 ${
        isOpen
          ? 'border-[#EF233C] shadow-md'
          : 'border-[#111111]/15 hover:border-[#EF233C]'
      } bg-[#f9f9f9]`}
    >
      <h3 className="m-0">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left p-6 md:p-7 flex items-start gap-5 cursor-pointer rounded-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700]"
          aria-expanded={isOpen}
          aria-controls={answerId}
          id={headingId}
        >
          <div
            className="shrink-0 w-14 h-14 rounded-none bg-black flex items-center justify-center text-[#FFD700] font-black text-lg shadow-sm border border-[#FFD700]/40"
            aria-hidden="true"
          >
            {num}
          </div>
          <div className="flex-1 min-w-0">
            <span className="block font-black text-[#111111] text-base md:text-lg uppercase tracking-tight leading-snug">
              {faq.q}
            </span>
          </div>
          <ChevronDown
            className={`shrink-0 w-5 h-5 text-[#EF233C] transition-transform duration-300 mt-4 ${
              isOpen ? 'rotate-180' : ''
            }`}
            aria-hidden="true"
          />
        </button>
      </h3>

      <div
        id={answerId}
        role="region"
        aria-labelledby={headingId}
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-[#333333] font-medium leading-relaxed text-sm md:text-base mt-1 ml-6 md:ml-7 pl-4 border-l-4 border-[#EF233C] pb-6 pr-6">
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// MAIN PAGE
// ---------------------------------------------------------------------------
export default function ResellerPage() {
  const [currency, setCurrency] = useState<CurrencyCode>('USD');

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#111111]">

      {/* HERO */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#EF233C] via-[#2a0814] to-black text-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#EF233C]/20 blur-[150px] rounded-none pointer-events-none" aria-hidden="true" />
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={HERO_GRID_STYLE} aria-hidden="true" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 bg-black/60 px-5 py-2.5 rounded-none mb-8 shadow-md border border-[#FFD700]/40">
              <BadgeDollarSign className="w-4 h-4 text-[#FFD700] shrink-0" aria-hidden="true" />
              <span className="text-white font-black text-xs uppercase tracking-widest whitespace-nowrap">
                {BRAND} Reseller USA {YEAR} 🇺🇸
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[1.05] text-white mb-6 max-w-4xl mx-auto drop-shadow-md">
              BECOME A <br className="hidden sm:block" />
              <span className="text-[#FFD700]">RESELLER</span> 
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/90 font-bold max-w-3xl mx-auto leading-relaxed mb-10">
              Start your own {BRAND} reseller business with a single $300 package. Buy credits in bulk, sell yearly subscriptions at $50 to $100, and earn up to $70 profit per customer.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto mb-12">
              <a
                href="#pricing"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-none bg-[#FFD700] text-black font-black text-sm uppercase tracking-widest shadow-md hover:bg-[#ffdf33] hover:scale-105 transition-transform whitespace-nowrap border border-[#FFD700]"
              >
                See Pricing
                <ArrowRight className="w-5 h-5 shrink-0" aria-hidden="true" />
              </a>
              <a
                href={waLink(`Hi! I want to learn more about becoming a ${BRAND} reseller in the USA.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-none bg-black text-[#FFD700] font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform whitespace-nowrap border border-[#FFD700]/50"
              >
                <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                Talk to Us
              </a>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-none bg-black/80 border border-white/15 text-white text-xs font-black uppercase tracking-widest whitespace-nowrap">
                <Zap className="w-3.5 h-3.5 text-[#FFD700] shrink-0" aria-hidden="true" />
                Instant Access
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-none bg-black/80 border border-white/15 text-white text-xs font-black uppercase tracking-widest whitespace-nowrap">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FFD700] shrink-0" aria-hidden="true" />
                No Expiry
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-none bg-black/80 border border-white/15 text-white text-xs font-black uppercase tracking-widest whitespace-nowrap">
                <Headphones className="w-3.5 h-3.5 text-[#FFD700] shrink-0" aria-hidden="true" />
                24/7 Support
              </span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* VALUE CARDS — LIGHT */}
      <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#f9f9f9] w-full">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-14 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#EF233C]/10 border border-[#EF233C]/30 px-4 py-1.5 rounded-none mb-5">
              <TrendingUp className="w-4 h-4 text-[#EF233C] shrink-0" aria-hidden="true" />
              <span className="text-[#111111] font-black text-xs uppercase tracking-widest whitespace-nowrap">
                Why Join Us
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111111] uppercase tracking-tighter leading-tight mb-5">
              WHY RESELL {BRAND} <span className="text-[#EF233C]">TODAY</span>?
            </h2>
            <p className="text-base md:text-lg text-[#333333] font-bold leading-relaxed">
              The {BRAND} reseller market has never been easier to enter. Low upfront costs, massive demand, and full profit control make it one of the most accessible side businesses today.
            </p>
          </FadeIn>

          <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUE_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <FadeInItem
                  key={card.title}
                  className="group bg-[#f9f9f9] border-2 border-[#111111]/15 rounded-none p-6 md:p-7 hover:border-[#EF233C] hover:-translate-y-2 hover:shadow-md transition-all duration-300 shadow-sm"
                >
                  <div className="w-14 h-14 rounded-none bg-[#EF233C]/10 group-hover:bg-[#EF233C] flex items-center justify-center mb-5 transition-colors">
                    <Icon className="w-7 h-7 text-[#EF233C] group-hover:text-white transition-colors" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg md:text-xl font-black text-[#111111] uppercase tracking-tight mb-3">
                    {card.title}
                  </h3>
                  <p className="text-[#333333] text-sm font-medium leading-relaxed">
                    {card.description}
                  </p>
                </FadeInItem>
              );
            })}
          </FadeInStagger>
        </div>
      </section>

      {/* PROFIT MATH — DARK */}
      <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-white border-y border-[#111111]/10">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#f9f9f9] border border-[#EF233C]/40 px-4 py-1.5 rounded-none mb-5 shadow-sm">
              <BarChart3 className="w-4 h-4 text-[#EF233C] shrink-0" aria-hidden="true" />
              <span className="text-[#111111] font-black text-xs uppercase tracking-widest whitespace-nowrap">
                The Real Math
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111111] uppercase tracking-tighter leading-tight mb-5">
              HOW MUCH CAN YOU <span className="text-[#EF233C]">EARN</span>?
            </h2>
            <p className="text-base md:text-lg text-[#333333] font-bold max-w-3xl mx-auto">
              A concrete example. This is what happens when you buy a reseller package and sell to customers at normal retail pricing.
            </p>
          </FadeIn>

          <FadeIn className="bg-[#f9f9f9] text-[#111111] border-2 border-[#111111]/15 rounded-none p-6 sm:p-8 md:p-12 shadow-sm mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center">
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-[#555555] mb-3">
                  Starter Package
                </div>
                <div className="text-4xl md:text-5xl font-black text-[#111111] tracking-tighter mb-2">
                  {formatPrice(300, currency)}
                </div>
                <div className="text-xs font-bold text-[#333333]">
                  10 credits (10 years)
                </div>
              </div>
              <div className="md:border-x-2 border-[#111111]/10 md:px-8">
                <div className="text-xs font-black uppercase tracking-widest text-[#555555] mb-3">
                  Sell Per Year At
                </div>
                <div className="text-4xl md:text-5xl font-black text-[#111111] tracking-tighter mb-2">
                  {formatPrice(75, currency)}
                </div>
                <div className="text-xs font-bold text-[#333333]">
                  average retail price
                </div>
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-[#555555] mb-3">
                  Total Revenue
                </div>
                <div className="text-4xl md:text-5xl font-black text-[#111111] tracking-tighter mb-2">
                  {formatPrice(750, currency)}
                </div>
                <div className="text-xs font-bold text-[#333333]">
                  from 10 customers
                </div>
              </div>
            </div>

            <div className="pt-6 md:pt-8 border-t-2 border-[#111111]/10 mt-6 md:mt-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-center sm:text-left">
                  <div className="text-xs font-black uppercase tracking-widest text-[#555555] mb-2">
                    Revenue minus Cost
                  </div>
                  <div className="text-sm font-bold text-[#333333]">
                    Net profit from your first 10 customers
                  </div>
                </div>
                <div className="text-center sm:text-right">
                  <div className="text-xs font-black uppercase tracking-widest text-[#EF233C] mb-1">
                    Your Profit
                  </div>
                  <div className="text-5xl md:text-6xl font-black text-[#111111] tracking-tighter">
                    {formatPrice(450, currency)}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn className="text-center max-w-3xl mx-auto">
            <p className="text-[#333333] font-bold text-base md:text-lg leading-relaxed">
              Sell at the higher end of the range and profit climbs even further. At $100 per sale, your profit from 10 customers reaches <span className="text-[#EF233C] font-black">{formatPrice(700, currency)}</span>. The Growth and Pro packages lower your per year cost, so your total profit scales with every additional customer.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* PRICING — DARK */}
      <section id="pricing" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-24">
        <FadeIn className="text-center mb-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#f9f9f9] border border-[#EF233C]/40 px-4 py-1.5 rounded-none mb-5 shadow-sm">
            <Package className="w-4 h-4 text-[#EF233C] shrink-0" aria-hidden="true" />
            <span className="text-[#111111] font-black text-xs uppercase tracking-widest whitespace-nowrap">
              Reseller Packages
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111111] uppercase tracking-tighter leading-tight mb-5">
            CHOOSE YOUR <span className="text-[#EF233C]">PACKAGE</span>
          </h2>
          <p className="text-base md:text-lg text-[#333333] font-bold max-w-3xl mx-auto">
            Every {BRAND} package includes full reseller panel access, instant activation per customer, and 24/7 live chat support. Credits never expire.
          </p>
        </FadeIn>

        <FadeIn className="flex justify-center mb-12">
          <div
            role="group"
            aria-label="Currency"
            className="inline-flex bg-black border border-white/15 rounded-none p-1.5 shadow-md"
          >
            {CURRENCY_ORDER.map((code) => {
              const active = currency === code;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => setCurrency(code)}
                  aria-pressed={active}
                  className={`px-5 sm:px-8 py-2.5 rounded-none text-xs sm:text-sm font-black tracking-wider uppercase transition-all duration-300 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700] ${
                    active
                      ? 'bg-[#FFD700] text-black shadow-sm'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {CURRENCIES[code].label}
                </button>
              );
            })}
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 items-stretch max-w-6xl mx-auto mt-8">
          {TIERS.map((tier) => (
            <PricingCard key={tier.name} tier={tier} currency={currency} />
          ))}
        </div>

        <FadeIn className="mt-12 text-center">
          <p className="text-[#555555] text-sm font-bold">
            Need larger volume? Message our team on live chat for wholesale pricing on 100+ credits.
          </p>
        </FadeIn>
      </section>

      {/* HOW IT WORKS — LIGHT */}
      <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#f9f9f9] border-y border-[#111111]/10">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#EF233C]/10 border border-[#EF233C]/30 px-4 py-1.5 rounded-none mb-5">
              <Rocket className="w-4 h-4 text-[#EF233C] shrink-0" aria-hidden="true" />
              <span className="text-[#111111] font-black text-xs uppercase tracking-widest whitespace-nowrap">
                How It Works
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111111] uppercase tracking-tighter leading-tight mb-5">
              START IN <span className="text-[#EF233C]">FOUR STEPS</span>
            </h2>
          </FadeIn>

          <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <FadeInItem
                  key={step.number}
                  className="relative bg-[#f9f9f9] border-2 border-[#111111]/15 rounded-none p-6 md:p-7 hover:border-[#EF233C] hover:-translate-y-2 hover:shadow-md transition-all duration-300 shadow-sm"
                >
                  <div
                    className="absolute -top-4 -right-3 w-12 h-12 rounded-none bg-black flex items-center justify-center text-[#FFD700] font-black text-sm shadow-sm border border-[#FFD700]/40"
                    aria-hidden="true"
                  >
                    {step.number}
                  </div>
                  <div className="w-14 h-14 rounded-none bg-[#EF233C]/10 flex items-center justify-center mb-5">
                    <Icon className="w-7 h-7 text-[#EF233C]" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg md:text-xl font-black text-[#111111] uppercase tracking-tight mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[#333333] text-sm font-medium leading-relaxed">
                    {step.description}
                  </p>
                </FadeInItem>
              );
            })}
          </FadeInStagger>
        </div>
      </section>

      {/* PANEL FEATURES — COBALT */}
      <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#EF233C] via-[#2a0814] to-black w-full relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFD700]/10 blur-[140px] rounded-none pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/40 blur-[140px] rounded-none pointer-events-none" aria-hidden="true" />

        <div className="max-w-6xl mx-auto relative z-10">
          <FadeIn className="text-center mb-14 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-black/60 border border-[#FFD700]/40 px-4 py-1.5 rounded-none mb-5 shadow-md">
              <LayoutDashboard className="w-4 h-4 text-[#FFD700] shrink-0" aria-hidden="true" />
              <span className="text-white font-black text-xs uppercase tracking-widest whitespace-nowrap">
                Panel Features
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-tight mb-5 drop-shadow-md">
              EVERYTHING IN <span className="text-[#FFD700]">ONE DASHBOARD</span>
            </h2>
          </FadeIn>

          <FadeInStagger className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {PANEL_FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <FadeInItem
                  key={feature.label}
                  className="bg-[#f9f9f9] border-2 border-[#111111]/15 rounded-none p-4 flex flex-col items-center text-center hover:border-[#EF233C] transition-colors duration-300 shadow-sm"
                >
                  <Icon className="w-6 h-6 text-[#EF233C] mb-2" aria-hidden="true" />
                  <span className="text-[#111111] font-black text-[11px] md:text-xs uppercase tracking-wide leading-tight">
                    {feature.label}
                  </span>
                </FadeInItem>
              );
            })}
          </FadeInStagger>
        </div>
      </section>

      {/* FAQ — LIGHT */}
      <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#f9f9f9] w-full border-t border-[#111111]/10">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#f9f9f9] border border-[#EF233C]/40 px-4 py-1.5 rounded-none mb-5 shadow-sm">
              <MessageCircle className="w-4 h-4 text-[#EF233C] shrink-0" aria-hidden="true" />
              <span className="text-[#111111] font-black text-xs uppercase tracking-widest whitespace-nowrap">
                Reseller FAQ
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111111] uppercase tracking-tighter leading-tight mb-5">
              COMMON <span className="text-[#EF233C]">QUESTIONS</span>
            </h2>
          </FadeIn>

          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <FaqItem key={faq.q} faq={faq} index={i} defaultOpen={i === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA — DARK with cobalt gradient card */}
      <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-white max-w-5xl mx-auto w-full">
        <FadeIn>
          <div className="relative overflow-hidden rounded-none border border-[#FFD700]/30 bg-gradient-to-br from-[#EF233C] via-[#2a0814] to-black p-8 md:p-14 text-center shadow-xl text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,215,0,0.1),_transparent_70%)] pointer-events-none" aria-hidden="true" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-[#FFD700] text-black px-5 py-2 rounded-none mb-6 shadow-md border border-black">
                <UserPlus className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span className="font-black text-xs uppercase tracking-widest whitespace-nowrap">
                  Ready to Start
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-tight mb-5 max-w-3xl mx-auto drop-shadow-md">
                LAUNCH YOUR RESELLER BUSINESS TODAY
              </h2>

              <p className="text-white/90 font-bold text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                Message our team on live chat and we will have your reseller panel active within 10 minutes. Pick your package, log in, and start selling to your first customer the same day.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
                <a
                  href={waLink(`Hi! I want to become a ${BRAND} reseller. Please help me get started.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-none bg-[#FFD700] text-black font-black text-sm uppercase tracking-widest hover:bg-[#ffdf33] hover:scale-105 transition-all shadow-md border border-[#FFD700] whitespace-nowrap"
                >
                  <MessageCircle className="w-5 h-5 text-black shrink-0" aria-hidden="true" />
                  Start on Chat
                </a>
                <Link
                  href="/pricing"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-none bg-black text-[#FFD700] font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-md border border-[#FFD700]/50 whitespace-nowrap"
                >
                  Customer Plans
                  <ArrowRight className="w-5 h-5 shrink-0" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}