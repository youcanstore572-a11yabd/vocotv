// components/FaqList.tsx
'use client';

import { useId, useMemo, useState } from 'react';
import { CONSTANTS } from '@/lib/seo';
import {
  HelpCircle,
  Tv,
  Zap,
  CreditCard,
  Smartphone,
  Search,
  ChevronDown,
  AlertCircle,
  MessageCircle,
  type LucideIcon,
} from 'lucide-react';

const SITE_URL = `https://${CONSTANTS.DOMAIN}`;
const BRAND = CONSTANTS.BRAND_NAME;
const PAGE_URL = `${SITE_URL}/faq`;

// ---------------------------------------------------------------------------
// TYPES + DATA
// ---------------------------------------------------------------------------
type CategoryId = 'general' | 'sports' | 'devices' | 'billing';
type CategoryFilter = 'all' | CategoryId;

interface FAQItem {
  id: string;
  category: CategoryId;
  q: string;
  a: string;
}

export const faqList: readonly FAQItem[] = [
  // GENERAL
  { id: 'gen-1', category: 'general', q: `What is streaming and how is it different from traditional cable TV?`, a: `Instead of a coax cable, fiber receiver, or satellite dish from traditional providers, the TV signals are streamed directly over your internet connection. This means no physical cable box is needed. You can watch thousands of channels in Full HD and 4K anywhere in the USA with just an internet connection.` },
  { id: 'gen-2', category: 'general', q: 'How fast will I get set up after payment?', a: `Once you confirm your plan and complete payment, our team handles the setup with you live on chat. We send your login details, walk you through installing a player like IPTV Smarters Pro or IBO Player Pro, and send the test content, all in the same chat. Most customers are streaming within 10 minutes.` },
  { id: 'gen-3', category: 'general', q: 'Can I watch on multiple TVs or screens at the same time?', a: 'Yes, depending on your plan. You can pick 1, 2, or 3 simultaneous screens during checkout. That means multiple household members can watch different things at the same time without any interruption.' },
  { id: 'gen-4', category: 'general', q: 'How does the free trial work?', a: `Message us on chat and we will set you up with a free 24 hour trial so you can test the 4K picture quality, check the sport and movie lineup, and make sure everything runs smooth on your own device and internet connection. Upgrade to a paid plan only when you are happy.` },
  { id: 'gen-5', category: 'general', q: 'Am I locked into a contract or auto-renewal?', a: 'No, absolutely not. We offer prepaid subscriptions for 3, 6, or 12 months. When your period ends, the streaming connection stops automatically. There are never any automatic charges or silent renewals.' },
  { id: 'gen-6', category: 'general', q: 'Can I test the service before I pay?', a: 'Yes, that is exactly how we do things. Contact our chat support team and we will give you a free 24 hour trial so you can see the picture quality on your own TV before you commit to a subscription.' },

  // SPORTS
  { id: 'sport-1', category: 'sports', q: 'Are NFL Sunday, NBA, MLB, and ESPN included?', a: 'Yes. Every channel package includes the complete US sport lineup in smooth 60FPS quality. Watch NFL Sunday, NBA primetime, MLB playoffs, NHL games, college football, Formula 1, and major fight nights, all included.' },
  { id: 'sport-2', category: 'sports', q: 'Do I pay extra for UFC or Boxing PPV events?', a: 'No, all worldwide Pay Per View events are included by default. This covers numbered UFC Main Cards, Championship Boxing, WWE events, AEW, and major MMA events at no additional cost.' },
  { id: 'sport-3', category: 'sports', q: 'Do foreign movies and series have English subtitles?', a: 'Over 95% of our complete VOD catalog, more than 120,000 movies and TV shows from Netflix, HBO Max, Disney Plus, and cinema releases, includes selectable English subtitles and optional original audio tracks.' },
  { id: 'sport-4', category: 'sports', q: 'Does the EPG TV guide and catch up feature work properly?', a: 'Yes. Our interactive EPG TV guide is synced automatically every 6 hours with current programming. For major US, UK, Australian, and international channels, a 7 day catch up and replay feature is available.' },
  { id: 'sport-5', category: 'sports', q: 'Can I hide unnecessary foreign channel lists?', a: 'Absolutely. You can easily hide country groups in your player like IPTV Smarters Pro or TiviMate. Our support team can also adjust your account on request so you only receive channels you actually watch.' },
  { id: 'sport-6', category: 'sports', q: 'How stable is the picture quality during popular sport events?', a: 'Our servers use dynamic load balancing through dedicated New York and Los Angeles data centers. Even during peak moments like the Super Bowl, NBA Finals, or a major UFC title fight, the bitrate stays stable without frame drops.' },

  // DEVICES
  { id: 'dev-1', category: 'devices', q: 'On which TVs and devices can I install our streaming service?', a: `Our service is universally compatible with Smart TVs (Samsung Tizen, LG webOS, Sony Android TV, Philips), Amazon Fire TV Stick, Google Chromecast with Google TV, Apple TV 4K, Nvidia Shield, MAG boxes, Windows PC, Mac, iPhone, iPad, and Android phones.` },
  { id: 'dev-2', category: 'devices', q: 'Which streaming apps deliver the best viewing experience?', a: 'For Android TV and Fire TV Stick, we recommend IPTV Smarters Pro for the fastest channel zapping. For Samsung and LG Smart TVs, IPTV Smarters Pro or IBO Player Pro work best. For Apple TV users, IPTVX or GSE Smart IPTV are the top choices.' },
  { id: 'dev-3', category: 'devices', q: 'What minimum internet speed do I need for 4K and 60FPS?', a: 'For Full HD channels we recommend at least 15 to 20 Mbps. For 4K Ultra HD and 60FPS sport streams, 25 to 30 Mbps. A wired Ethernet cable or 5GHz Wi-Fi network always provides the most stable experience.' },
  { id: 'dev-4', category: 'devices', q: 'What should I do if a channel buffers or freezes?', a: 'Buffering is caused in 99% of cases by temporary Wi-Fi interference or a full app cache. Restart your router and modem, restart your streaming app, or switch the stream engine between HLS and TS in the player settings.' },
  { id: 'dev-5', category: 'devices', q: 'Do I need technical skills to complete the installation?', a: 'No. Installation takes less than 5 minutes on average, and our team walks you through it on chat. You download a player app from your device store, enter the login details we send you, and the channels load automatically.' },
  { id: 'dev-6', category: 'devices', q: 'Can I use my account while travelling outside the United States?', a: 'Yes. Our streams are accessible worldwide without geographic restrictions. You can use your subscription account worry free in your holiday home in Europe, Asia, or anywhere else.' },

  // BILLING
  { id: 'pay-1', category: 'billing', q: 'What secure payment options do you support?', a: 'You can pay safely via Credit Card (Visa and Mastercard), PayPal, and cryptocurrencies (Bitcoin, USDT, Ethereum) through a heavily secured 256 bit SSL connection. All prices are in USD $.' },
  { id: 'pay-2', category: 'billing', q: 'Is a VPN required?', a: 'No. A VPN is not required because all our streams run through secure, encrypted connections. If you prefer extra privacy, our streaming servers are 100% compatible with all major VPN providers.' },
  { id: 'pay-3', category: 'billing', q: 'How is my personal data protected?', a: 'We respect US privacy regulations and international data protection standards. We never store viewing history or channel logs, never sell data to third parties, and never retain credit card or bank account numbers on our local servers.' },
  { id: 'pay-4', category: 'billing', q: 'What happens if I lose my login credentials?', a: 'No problem. Send a message with your order number or registration email to our chat customer service team, and our support desk will resend your login details within 5 minutes.' },
  { id: 'pay-5', category: 'billing', q: 'Do I receive an invoice or receipt after payment?', a: 'Yes. Immediately after completing the transaction, you will receive an automated digital order confirmation and invoice in your inbox.' },
  { id: 'pay-6', category: 'billing', q: 'Are there hidden fees or admin charges?', a: 'No. The prices shown on our pricing page are fully all in. You pay once for your chosen period with no unexpected surcharges or connection fees.' },
];

const CATEGORY_TABS: readonly { id: CategoryFilter; label: string; icon: LucideIcon }[] = [
  { id: 'all', label: 'All Questions', icon: HelpCircle },
  { id: 'general', label: 'General & Service', icon: Tv },
  { id: 'sports', label: 'Sport & Channels', icon: Zap },
  { id: 'devices', label: 'Smart TV & Apps', icon: Smartphone },
  { id: 'billing', label: 'Billing & Security', icon: CreditCard },
];

// ---------------------------------------------------------------------------
// JSON-LD — module scope so it's built once at load, not per render
// NOTE: The /faq page is marked `robots: { index: false }` per project spec.
// If you decide to make it indexable, this JSON-LD is ready to go.
// ---------------------------------------------------------------------------
const FAQ_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'FAQPage',
      '@id': `${PAGE_URL}/#faq`,
      mainEntity: faqList.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${PAGE_URL}/#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'FAQ', item: PAGE_URL },
      ],
    },
    {
      '@type': 'WebPage',
      '@id': `${PAGE_URL}/#webpage`,
      url: PAGE_URL,
      name: `${BRAND} FAQ | Help Center`,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en-US',
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/img/structer.webp`,
        width: '1200',
        height: '630',
      },
      breadcrumb: { '@id': `${PAGE_URL}/#breadcrumb` },
    },
  ],
};

// Escape `<` so no FAQ answer can break out of the <script> tag.
const FAQ_JSON_LD_STRING = JSON.stringify(FAQ_JSON_LD).replace(/</g, '\\u003c');

// ---------------------------------------------------------------------------
// FAQ ACCORDION ITEM
// ---------------------------------------------------------------------------
function FaqAccordionItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const headingId = useId();
  const answerId = useId();

  return (
    <div
      className={`group relative bg-[#f9f9f9] rounded-none overflow-hidden border-2 transition-all duration-300 ${
        isOpen
          ? 'border-[#EF233C] shadow-md'
          : 'border-[#111111]/15 hover:border-[#EF233C]'
      }`}
    >
      <div
        className={`absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-300 ${
          isOpen ? 'bg-[#EF233C]' : 'bg-transparent'
        }`}
        aria-hidden="true"
      />

      <h3 className="m-0">
        <button
          type="button"
          onClick={onToggle}
          className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer rounded-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700]"
          aria-expanded={isOpen}
          aria-controls={answerId}
          id={headingId}
        >
          <div className="flex items-start gap-3 pr-2 flex-1">
            <span
              className={`shrink-0 w-7 h-7 rounded-none flex items-center justify-center transition-colors border ${
                isOpen ? 'bg-[#EF233C] text-white border-[#EF233C]' : 'bg-black text-[#FFD700] border-[#FFD700]/40'
              }`}
              aria-hidden="true"
            >
              <HelpCircle className="w-4 h-4" />
            </span>
            <span className="font-black text-[#111111] text-base sm:text-lg uppercase tracking-tight leading-snug">
              {faq.q}
            </span>
          </div>
          <div
            className={`w-8 h-8 rounded-none flex items-center justify-center shrink-0 transition-all duration-300 border ${
              isOpen
                ? 'rotate-180 bg-[#FFD700] text-black border-black'
                : 'bg-black text-[#FFD700] border-[#FFD700]/40 group-hover:bg-[#EF233C] group-hover:text-white group-hover:border-[#EF233C]'
            }`}
            aria-hidden="true"
          >
            <ChevronDown className="w-4 h-4" />
          </div>
        </button>
      </h3>

      <div
        id={answerId}
        role="region"
        aria-labelledby={headingId}
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100 pb-6' : 'grid-rows-[0fr] opacity-0 pb-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-[#333333] text-sm sm:text-base font-medium leading-relaxed px-5 sm:px-6 pl-15 sm:pl-16 border-l-4 border-[#EF233C] ml-4 sm:ml-5 py-1">
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// MAIN — FaqList client leaf
// ---------------------------------------------------------------------------
export default function FaqList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [openAccordion, setOpenAccordion] = useState<string | null>('gen-1');

  const filteredFaqs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return faqList.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        q === '' || item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const toggleAccordion = (id: string) =>
    setOpenAccordion((prev) => (prev === id ? null : id));

  return (
    <>
      <script
        type="application/ld+json"
        id="faq-page-schema"
        dangerouslySetInnerHTML={{ __html: FAQ_JSON_LD_STRING }}
      />

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">

        {/* Search */}
        <div className="w-full max-w-xl mx-auto relative mb-10 group">
          <div
            className="absolute -inset-0.5 bg-gradient-to-r from-[#EF233C] to-black rounded-none blur opacity-30 group-hover:opacity-60 transition-opacity duration-300"
            aria-hidden="true"
          />
          <div className="relative">
            <label htmlFor="faq-search" className="sr-only">
              Search frequently asked questions
            </label>
            <Search
              className="w-5 h-5 text-[#EF233C] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10"
              aria-hidden="true"
            />
            <input
              id="faq-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search a question (NFL Sunday, IPTV Smarters, PayPal, buffering)..."
              className="w-full pl-12 pr-4 py-4 rounded-none bg-[#f9f9f9] text-[#111111] placeholder-[#555555] font-bold border-2 border-[#111111]/15 focus:border-[#EF233C] focus:outline-none shadow-sm transition-all"
            />
          </div>
        </div>

        {/* Category tabs */}
        <div
          role="group"
          aria-label="Filter by category"
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12"
        >
          {CATEGORY_TABS.map((tab) => {
            const Icon = tab.icon;
            const active = activeCategory === tab.id;
            const label =
              tab.id === 'all' ? `${tab.label} (${faqList.length})` : tab.label;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                aria-pressed={active}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-none text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm border-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700] ${
                  active
                    ? 'bg-[#FFD700] text-black border-black scale-105 shadow-md'
                    : 'bg-black text-white/80 border-[#FFD700]/40 hover:border-[#FFD700] hover:text-white hover:scale-105'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        {/* Accordion */}
        {filteredFaqs.length > 0 ? (
          <div className="space-y-4">
            {filteredFaqs.map((faq) => (
              <FaqAccordionItem
                key={faq.id}
                faq={faq}
                isOpen={openAccordion === faq.id}
                onToggle={() => toggleAccordion(faq.id)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-[#f9f9f9] border-2 border-[#111111]/15 rounded-none p-10 text-center shadow-sm">
            <AlertCircle className="w-10 h-10 text-[#EF233C] mx-auto mb-3" aria-hidden="true" />
            <p className="font-black text-lg uppercase tracking-tight mb-1 text-[#111111]">
              No results found
            </p>
            <p className="text-sm font-bold text-[#555555] mb-6">
              Try a different search term or contact our chat help desk directly.
            </p>
            <a
              href={`${CONSTANTS.CONTACT.whatsappUrl}?text=${encodeURIComponent(
                `Hi ${BRAND}, I could not find an answer to my question.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-none bg-[#FFD700] text-black font-black text-xs uppercase tracking-widest hover:bg-[#ffdf33] transition-all shadow-md border border-black"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" /> Ask on Chat
            </a>
          </div>
        )}
      </section>
    </>
  );
}