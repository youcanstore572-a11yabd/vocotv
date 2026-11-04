// components/PricingSection.tsx
'use client';

import { useState } from 'react';
import { FadeIn, FadeInStagger, FadeInItem } from './AnimatedSection';
import { CONSTANTS } from '@/lib/seo';
import {
  CheckCircle2,
  Zap,
  Crown,
  MonitorPlay,
  Gift,
  Sparkles,
  Flame,
  ShieldCheck,
  Lock,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Module-scope constants — updated to correct VocoTV device/duration pricing tiers
// ---------------------------------------------------------------------------
const DEVICE_OPTIONS = [1, 2, 3] as const;
type DeviceCount = (typeof DEVICE_OPTIONS)[number];
type Duration = 3 | 6 | 12;

const PRICING: Record<DeviceCount, Record<Duration, { total: number; mo: string }>> = {
  1: {
    3: { total: 35, mo: (35 / 3).toFixed(2) },
    6: { total: 45, mo: (45 / 6).toFixed(2) },
    12: { total: 69, mo: (69 / 12).toFixed(2) },
  },
  2: {
    3: { total: 45, mo: (45 / 3).toFixed(2) },
    6: { total: 75, mo: (75 / 6).toFixed(2) },
    12: { total: 99, mo: (99 / 12).toFixed(2) },
  },
  3: {
    3: { total: 77, mo: (77 / 3).toFixed(2) },
    6: { total: 99, mo: (99 / 6).toFixed(2) },
    12: { total: 150, mo: (150 / 12).toFixed(2) },
  },
};

const STANDARD_FEATURES = [
  '4K Ultra HD & 60FPS Sports Feeds',
  '36,000+ Live Channels (US, CA, UK, INTL)',
  '120,000+ Movies & TV Shows (Updated Daily)',
  'NFL Sunday, NBA, MLB, NHL & College Football',
  '7 Day US Catch Up & Full EPG Guide',
  'Anti Freeze US Edge Servers',
  'Smart TV, Firestick, iOS, Android, Shield',
  '24/7 Priority Support via Live Chat',
] as const;

const VIP_FEATURES = [
  'Ultra HD 4K & Pure Full HD Quality',
  '36,000+ Premium Live Channels',
  '120,000+ Movies & TV Shows (Updated Daily)',
  'NFL, NBA, ESPN, HBO, Showtime & All PPVs',
  '7 Day Catch Up & Electronic Program Guide',
  'Dedicated New York & Los Angeles Server Line',
  'Smart TV, Firestick, Apple TV, iOS, Android',
  '24/7 VIP Priority Support via Live Chat',
] as const;

const FREE_TRIAL_MESSAGE =
  "Hi! I would like to request a free 24-hour trial to test the VocoTV sports, movies and live TV streaming quality on my device before I subscribe.";

// ---------------------------------------------------------------------------
// Payment Method SVG Icons — US & Global Standard
// ---------------------------------------------------------------------------
const SHELL_STYLES = {
  light: { bg: '#FFFFFF', border: '#E4E4E7' },
  dark: { bg: '#111111', border: 'rgba(255,215,0,0.35)' },
} as const;

function PaymentShell({
  variant,
  children,
}: {
  variant: 'light' | 'dark';
  children: React.ReactNode;
}) {
  const { bg, border } = SHELL_STYLES[variant];
  return (
    <div
      className="flex items-center justify-center h-8 w-12 rounded-none overflow-hidden shrink-0 transition-transform duration-300 hover:scale-110 shadow-sm"
      style={{ backgroundColor: bg, border: `1px solid ${border}` }}
    >
      {children}
    </div>
  );
}

const PaymentIcons = ({ variant = 'light' }: { variant?: 'light' | 'dark' }) => {
  const isDark = variant === 'dark';
  return (
    <div className="grid grid-cols-5 gap-2 items-center">
      <PaymentShell variant={variant}>
        <svg viewBox="0 0 48 32" className="h-5 w-auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <text x="24" y="22" textAnchor="middle" fontFamily="Helvetica, Arial, sans-serif" fontSize="14" fontWeight="900" fontStyle="italic" fill={isDark ? '#FFFFFF' : '#1434CB'} letterSpacing="-0.5">VISA</text>
        </svg>
      </PaymentShell>

      <PaymentShell variant={variant}>
        <svg viewBox="0 0 48 32" className="h-5 w-auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="19" cy="16" r="9" fill="#EB001B" />
          <circle cx="29" cy="16" r="9" fill="#F79E1B" />
          <path d="M24 8.5a9 9 0 000 15 9 9 0 000-15z" fill="#FF5F00" />
        </svg>
      </PaymentShell>

      <PaymentShell variant={variant}>
        <svg viewBox="0 0 48 32" className="h-5 w-auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <text x="24" y="21" textAnchor="middle" fontFamily="Helvetica, Arial, sans-serif" fontSize="11" fontWeight="900" fontStyle="italic" fill="#003087">Pay</text>
          <text x="24" y="27" textAnchor="middle" fontFamily="Helvetica, Arial, sans-serif" fontSize="9" fontWeight="800" fontStyle="italic" fill="#0079C1">Pal</text>
        </svg>
      </PaymentShell>

      <PaymentShell variant={variant}>
        <svg viewBox="0 0 48 32" className="h-5 w-auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="24" cy="16" r="10" fill="#F7931A" />
          <text x="24" y="21" textAnchor="middle" fontFamily="Helvetica, Arial, sans-serif" fontSize="14" fontWeight="900" fill="#FFFFFF">₿</text>
        </svg>
      </PaymentShell>

      <PaymentShell variant={variant}>
        <svg viewBox="0 0 48 32" className="h-5 w-auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <text x="24" y="21" textAnchor="middle" fontFamily="Helvetica, Arial, sans-serif" fontSize="11" fontWeight="800" fill={isDark ? '#FFFFFF' : '#5F6368'}>GPay</text>
        </svg>
      </PaymentShell>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Feature list renderer
// ---------------------------------------------------------------------------
function FeatureList({
  devices,
  features,
  theme,
}: {
  devices: DeviceCount;
  features: readonly string[];
  theme: 'standard' | 'gold';
}) {
  const isGold = theme === 'gold';
  const checkWrap = isGold
    ? 'bg-[#FFD700]/20 p-0.5 rounded-none border border-[#FFD700]/40'
    : '';
  const checkColor = isGold ? 'text-[#FFD700]' : 'text-[#EF233C]';
  const textColor = isGold ? 'text-white' : 'text-[#333333]';

  return (
    <ul className="w-full space-y-3.5 flex-grow relative mb-6">
      <li className={`flex items-center gap-3 text-sm font-semibold ${textColor}`}>
        {isGold ? (
          <div className={checkWrap}>
            <CheckCircle2 className={`w-4 h-4 ${checkColor} flex-shrink-0`} />
          </div>
        ) : (
          <CheckCircle2 className={`w-4 h-4 ${checkColor} flex-shrink-0`} />
        )}
        <span>{devices} Simultaneous {devices > 1 ? 'Screens' : 'Connection'}</span>
      </li>
      {features.map((feature, idx) => (
        <li key={feature} className={`flex items-center gap-3 text-sm font-semibold ${textColor}`}>
          {isGold ? (
            <div className={checkWrap}>
              <CheckCircle2 className={`w-4 h-4 ${checkColor} flex-shrink-0`} />
            </div>
          ) : (
            <CheckCircle2 className={`w-4 h-4 ${checkColor} flex-shrink-0`} />
          )}
          <span className={isGold ? 'text-white' : ''}>{feature}</span>
          {isGold && idx === 3 && (
            <span className="bg-[#FFD700]/20 text-[#FFD700] text-[9px] font-black uppercase px-2 py-0.5 rounded-none ml-auto border border-[#FFD700]/40">
              All PPVs
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

// ---------------------------------------------------------------------------
// Live chat helper
// ---------------------------------------------------------------------------
function openLiveChat(message: string) {
  const url = `${CONSTANTS.CONTACT.whatsappUrl}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

// ---------------------------------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------------------------------
export default function PricingSection() {
  const [devices, setDevices] = useState<DeviceCount>(1);
  const currentPricing = PRICING[devices];

  const handleLiveChatRedirect = (months: Duration) => {
    const selectedPrice = currentPricing[months].total;
    const noun = devices > 1 ? 'screens' : 'screen';
    openLiveChat(
      `Hi! I would like to order a ${months}-month VocoTV subscription for ${devices} ${noun} for $${selectedPrice}. Please send me the step by step setup guide on live chat so we can get started.`
    );
  };

  const handleFreeTrialRedirect = () => openLiveChat(FREE_TRIAL_MESSAGE);

  return (
    <section
      id="pricing-section"
      className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10 scroll-mt-20 bg-white text-[#111111] overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#EF233C]/5 blur-[140px] rounded-none pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:24px_24px] md:bg-[size:40px_40px] pointer-events-none" />

      {/* Section Header */}
      <FadeIn className="text-center justify-center max-w-4xl mx-auto mb-16 md:mb-20 relative z-10">
        <div className="inline-flex items-center gap-2 border border-[#EF233C]/40 bg-[#f9f9f9] px-4 py-1.5 rounded-none mb-6 shadow-sm">
          <Crown className="w-4 h-4 text-[#EF233C]" />
          <span className="text-[#111111] font-black text-xs uppercase tracking-widest">
            Best VocoTV Subscription Plans 🇺🇸
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#111111] mb-6 uppercase tracking-tight leading-tight">
          CHOOSE YOUR <span className="text-[#EF233C]">VOCOTV SUBSCRIPTION</span> PLAN
        </h2>
        <p className="text-base sm:text-lg text-[#333333] mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
          Official VocoTV IPTV provider with instant 4K Ultra HD streaming across the US. Save big on multi-month passes with simultaneous multi screen support. Set up on live chat, test on a free trial, then upgrade when you are happy.
        </p>

        {/* Device Switcher */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="inline-flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-[#EF233C]" />
            <span className="text-xs text-[#555555] font-black uppercase tracking-widest">
              Select Simultaneous Screens
            </span>
          </div>
          <div className="inline-flex bg-[#f9f9f9] border border-[#111111]/15 rounded-none p-1.5 shadow-sm relative">
            {DEVICE_OPTIONS.map((d) => (
              <button
                key={d}
                type="button"
                aria-pressed={devices === d}
                onClick={() => setDevices(d)}
                className={`px-5 sm:px-8 py-2.5 rounded-none text-xs sm:text-sm font-black tracking-wider uppercase transition-all duration-300 relative ${
                  devices === d
                    ? 'bg-[#EF233C] text-white shadow-md scale-[1.03]'
                    : 'text-[#555555] hover:text-[#111111]'
                }`}
              >
                {d} {d > 1 ? 'Screens' : 'Screen'}
              </button>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Pricing Cards Grid */}
      <FadeInStagger className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8 items-stretch max-w-6xl mx-auto mt-12 relative z-10">

        {/* CARD 1: 3 MONTHS */}
        <FadeInItem className="relative bg-[#f9f9f9] text-[#111111] border-2 border-[#111111]/15 rounded-none p-6 sm:p-8 flex flex-col group overflow-hidden shadow-sm transition-all duration-500 hover:border-[#EF233C] hover:shadow-[0_25px_60px_rgba(239,35,60,0.15)] hover:-translate-y-3">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent group-hover:from-[#EF233C]/5 group-hover:to-[#EF233C]/10 transition-all duration-500 pointer-events-none" />
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#EF233C]/10 to-transparent pointer-events-none transition-all duration-500 group-hover:from-[#EF233C]/20 group-hover:w-32 group-hover:h-32" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#EF233C] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-black text-[#EF233C] uppercase tracking-[0.2em]">Starter Pass</h3>
              <MonitorPlay className="w-5 h-5 text-[#EF233C] transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
            </div>
            <div className="text-3xl font-black text-[#111111] mb-2 tracking-tighter uppercase">3 Months</div>

            <div className="flex items-baseline gap-2 mb-2 mt-4">
              <span className="text-5xl font-black text-[#111111] tracking-tighter transition-all duration-500 group-hover:text-[#EF233C]">
                ${currentPricing[3].total}
              </span>
            </div>
            <div className="text-[11px] font-black text-[#111111] mb-8 uppercase tracking-widest border border-[#111111]/25 self-start px-3 py-1 rounded-none inline-block bg-white shadow-sm">
              ${currentPricing[3].mo} / month
            </div>
            <button
              type="button"
              onClick={() => handleLiveChatRedirect(3)}
              className="w-full text-center whitespace-nowrap px-6 py-4 rounded-none bg-[#FFD700] text-black font-black text-xs uppercase tracking-widest hover:bg-[#ffdf33] transition-all shadow-md active:scale-95 group-hover:scale-105 group-hover:shadow-[0_15px_35px_rgba(255,215,0,0.3)] border border-[#FFD700]"
            >
              Select 3 Months
            </button>

            <br />

            <div className="mb-6 pt-4 border-t border-[#111111]/10">
              <div className="flex items-center justify-between text-[10px] font-black text-[#555555] uppercase tracking-widest mb-3">
                <span>Accepted Payments</span>
                <Lock className="w-3 h-3 text-[#555555]" />
              </div>
              <PaymentIcons variant="light" />
            </div>

            <FeatureList devices={devices} features={STANDARD_FEATURES} theme="standard" />

            <div className="mb-6 p-3 bg-white border border-[#111111]/10 rounded-none flex items-center gap-2.5 transition-colors duration-500 group-hover:bg-[#EF233C]/5">
              <Zap className="w-4 h-4 text-[#EF233C] shrink-0" />
              <span className="text-[11px] font-black text-[#111111] uppercase tracking-wider">
                Instant Activation • 99.9% Uptime Guarantee
              </span>
            </div>
          </div>
        </FadeInItem>

        {/* CARD 2: 12 MONTHS VIP — DARK ULTIMATE CARD */}
        <FadeInItem className="relative bg-[#111111] text-white border-2 border-[#FFD700] rounded-none p-6 sm:p-9 flex flex-col transform lg:-translate-y-4 shadow-[0_0_40px_rgba(239,35,60,0.2)] z-20 group transition-all duration-500 hover:shadow-[0_0_60px_rgba(239,35,60,0.4)] hover:-translate-y-6">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30 w-auto whitespace-nowrap">
            <div className="bg-[#FFD700] text-black text-[11px] font-black uppercase tracking-[0.2em] px-5 py-2 rounded-none flex items-center gap-1.5 shadow-xl border border-black">
              <Flame className="w-3.5 h-3.5 fill-current text-black" /> Most Popular in USA
            </div>
          </div>

          <div className="absolute inset-0 rounded-none bg-gradient-to-br from-transparent via-transparent to-transparent group-hover:from-[#EF233C]/10 group-hover:to-[#EF233C]/20 transition-all duration-500 pointer-events-none" />

          <div className="relative z-10 flex flex-col h-full pt-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-black text-[#FFD700] uppercase tracking-[0.2em] flex items-center gap-1.5">
                <Crown className="w-4 h-4 text-[#FFD700]" /> Ultimate US VIP
              </h3>
              <Sparkles className="w-4 h-4 text-[#FFD700] transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
            </div>

            <div className="mb-4 inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-none bg-[#EF233C] text-white text-[10px] font-black uppercase tracking-widest shadow-lg border border-[#EF233C]">
              <Flame className="w-3 h-3 fill-current" /> Best Value Deal
            </div>

            <div className="text-3xl font-black text-white mb-2 tracking-tighter uppercase">
              12 Months
            </div>

            <div className="flex items-baseline gap-2 mb-2 mt-4">
              <span className="text-6xl font-black text-white tracking-tighter drop-shadow-[0_0_20px_rgba(239,35,60,0.5)] transition-all duration-500">
                ${currentPricing[12].total}
              </span>
            </div>

            <div className="text-[11px] font-black text-black mb-8 uppercase tracking-widest border border-[#FFD700] self-start px-4 py-1.5 rounded-none inline-block bg-[#FFD700] shadow-sm">
              BEST VALUE: ${currentPricing[12].mo} / mo
            </div>

            <button
              type="button"
              onClick={() => handleLiveChatRedirect(12)}
              className="w-full text-center whitespace-nowrap px-6 py-4 sm:py-5 rounded-none bg-[#FFD700] text-black font-black text-xs sm:text-sm uppercase tracking-widest hover:bg-[#ffdf33] transition-all shadow-xl shadow-[#FFD700]/20 active:scale-95 group-hover:scale-105 group-hover:shadow-[0_15px_40px_rgba(255,215,0,0.4)] border border-[#FFD700]"
            >
              Get 12 Months VIP
            </button>
            <br />

            <div className="mb-6 pt-4 border-t border-white/15">
              <div className="flex items-center justify-between text-[10px] font-black text-white/70 uppercase tracking-widest mb-3">
                <span>Accepted Payments</span>
                <Lock className="w-3 h-3 text-[#FFD700]" />
              </div>
              <PaymentIcons variant="dark" />
            </div>

            <FeatureList devices={devices} features={VIP_FEATURES} theme="gold" />

            <div className="mb-6 p-3 bg-white/5 border border-white/15 rounded-none flex items-center gap-2.5 transition-colors duration-500 group-hover:bg-[#EF233C]/20">
              <Crown className="w-4 h-4 text-[#FFD700] shrink-0" />
              <span className="text-[11px] font-black text-white uppercase tracking-wider">
                Priority Local Server Line Included
              </span>
            </div>
          </div>
        </FadeInItem>

        {/* CARD 3: 6 MONTHS */}
        <FadeInItem className="relative bg-[#f9f9f9] text-[#111111] border-2 border-[#111111]/15 rounded-none p-6 sm:p-8 flex flex-col group overflow-hidden shadow-sm transition-all duration-500 hover:border-[#EF233C] hover:shadow-[0_25px_60px_rgba(239,35,60,0.15)] hover:-translate-y-3">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent group-hover:from-[#EF233C]/5 group-hover:to-[#EF233C]/10 transition-all duration-500 pointer-events-none" />
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#EF233C]/10 to-transparent pointer-events-none transition-all duration-500 group-hover:from-[#EF233C]/20 group-hover:w-32 group-hover:h-32" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#EF233C] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-black text-[#EF233C] uppercase tracking-[0.2em]">Standard Pass</h3>
              <MonitorPlay className="w-5 h-5 text-[#EF233C] transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
            </div>
            <div className="text-3xl font-black text-[#111111] mb-2 tracking-tighter uppercase">6 Months</div>

            <div className="flex items-baseline gap-2 mb-2 mt-4">
              <span className="text-5xl font-black text-[#111111] tracking-tighter transition-all duration-500 group-hover:text-[#EF233C]">
                ${currentPricing[6].total}
              </span>
            </div>
            <div className="text-[11px] font-black text-[#111111] mb-8 uppercase tracking-widest border border-[#111111]/25 self-start px-3 py-1 rounded-none inline-block bg-white shadow-sm">
              ${currentPricing[6].mo} / month
            </div>

            <button
              type="button"
              onClick={() => handleLiveChatRedirect(6)}
              className="w-full text-center whitespace-nowrap px-6 py-4 rounded-none bg-[#FFD700] text-black font-black text-xs uppercase tracking-widest hover:bg-[#ffdf33] transition-all shadow-md active:scale-95 group-hover:scale-105 group-hover:shadow-[0_15px_35px_rgba(255,215,0,0.3)] border border-[#FFD700]"
            >
              Select 6 Months
            </button>
            <br />
            <div className="mb-6 pt-4 border-t border-[#111111]/10">
              <div className="flex items-center justify-between text-[10px] font-black text-[#555555] uppercase tracking-widest mb-3">
                <span>Accepted Payments</span>
                <Lock className="w-3 h-3 text-[#555555]" />
              </div>
              <PaymentIcons variant="light" />
            </div>

            <FeatureList devices={devices} features={STANDARD_FEATURES} theme="standard" />

            <div className="mb-6 p-3 bg-white border border-[#111111]/10 rounded-none flex items-center gap-2.5 transition-colors duration-500 group-hover:bg-[#EF233C]/5">
              <Zap className="w-4 h-4 text-[#EF233C] shrink-0" />
              <span className="text-[11px] font-black text-[#111111] uppercase tracking-wider">
                Instant Activation • 99.9% Uptime Guarantee
              </span>
            </div>
          </div>
        </FadeInItem>

      </FadeInStagger>

      {/* Free Trial Banner */}
      <FadeIn className="max-w-2xl mx-auto mt-16 relative z-30">
        <div className="bg-[#f9f9f9] border border-[#EF233C]/40 rounded-none p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl relative overflow-hidden group hover:border-[#EF233C] transition-all duration-500">
          <div className="absolute -top-16 -left-16 w-64 h-64 bg-[#EF233C]/5 blur-[80px] rounded-none pointer-events-none" />
          <div className="flex items-center gap-4 text-left relative z-10">
            <div className="bg-white border border-[#EF233C]/30 p-3 rounded-none text-[#EF233C] shrink-0 hidden sm:block transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-sm">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="w-4 h-4 text-[#EF233C]" />
                <h4 className="text-base font-black text-[#111111] uppercase tracking-tight">
                  Free 24 Hour VocoTV Trial 🇺🇸
                </h4>
              </div>
              <p className="text-xs text-[#333333] font-medium">
                Test 4K streaming on your own device before you commit. Our team guides you through setup on live chat so you are sorted from the start.
              </p>
            </div>
          </div>

          <div className="w-full sm:w-auto shrink-0 relative z-10">
            <button
              type="button"
              onClick={handleFreeTrialRedirect}
              className="w-full sm:w-auto text-center whitespace-nowrap px-6 py-3 rounded-none bg-[#FFD700] text-black font-black text-xs uppercase tracking-widest hover:bg-[#ffdf33] transition-all shadow-md active:scale-95 hover:scale-105 border border-[#FFD700]"
            >
              Request Free Trial
            </button>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}