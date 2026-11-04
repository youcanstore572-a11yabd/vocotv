// app/page.tsx
'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { CONSTANTS } from '@/lib/seo';
import { ProductSchema, FAQSchema } from './components/PageSchemas';
import { blogPosts } from '@/lib/blog';
import USAFlag from './components/USAFlag';
import { 
  PlayCircle,
  UserCheck,
  BookOpen,
  Star, 
  ShieldCheck, 
  Zap, 
  CreditCard, 
  CheckCircle2, 
  MonitorSmartphone, 
  Tv2, 
  Cpu, 
  ArrowRight, 
  Lock, 
  ThumbsUp, 
  Trophy, 
  Medal, 
  LifeBuoy,
  Settings,
  Check,
  Smartphone,
  BarChart
} from 'lucide-react';
import { FadeIn, FadeInStagger, FadeInItem } from './components/AnimatedSection';
import AnimatedCounter from './components/AnimatedCounter';
import TargetCountries from './components/TargetCountries';
import ShareButtons from './components/ShareButtons';

// Lazy loaded components keep the page fast and improve Core Web Vitals
const PricingSection = dynamic(() => import('./components/PricingSection'), {
  loading: () => (
    <div className="min-h-[600px] flex items-center justify-center bg-white">
      <div className="h-12 w-12 animate-spin rounded-none border-4 border-[#EF2E55] border-t-transparent" />
    </div>
  ),
});

const MovieSlider = dynamic(() => import('./components/MovieSlider'), {
  loading: () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto px-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="aspect-[2/3] bg-white rounded-none animate-pulse border border-[#EF2E55]/20 shadow-sm" />
      ))}
    </div>
  ),
});

const PartnerSlider = dynamic(() => import('./components/PartnerSlider'), {
  loading: () => <div className="h-32 bg-transparent max-w-7xl mx-auto" />,
});

const GlobalServerMap = dynamic(() => import('./components/GlobalServerMap'), {
  loading: () => <div className="h-[400px] bg-white rounded-none animate-pulse max-w-7xl mx-auto border border-[#EF2E55]/20 shadow-sm" />,
});

const FAQ = dynamic(() => import('./components/FAQ'), {
  loading: () => (
    <div className="min-h-[400px] flex items-center justify-center bg-white">
      <div className="h-12 w-12 animate-spin rounded-none border-4 border-[#EF2E55] border-t-transparent" />
    </div>
  ),
});

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#111111] overflow-hidden">
      <ProductSchema />
      <FAQSchema />

      {/* Hero Section */}
      <section className="relative px-4 py-24 md:py-40 overflow-hidden flex flex-col items-center justify-center text-center min-h-screen w-full bg-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/background.webp"
            alt="VocoTV IPTV streaming in 4K ultra HD quality across the USA"
            fill
            priority
            fetchPriority="high"
            className="object-cover object-center brightness-[0.9] contrast-[1.05]"
            sizes="100vw"
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/85 to-white/95" />
        </div>
        
        <FadeIn className="relative z-10 max-w-5xl mx-auto flex flex-col items-center justify-center my-auto w-full">
          <div className="inline-flex items-center gap-2 bg-white border border-[#EF2E55]/40 px-5 py-2 rounded-none mb-6 shadow-sm backdrop-blur-md">
            <Medal className="w-4 h-4 text-[#EF2E55]" />
            <span className="text-[#111111] font-extrabold text-xs uppercase tracking-widest flex items-center gap-2">
              Official VocoTV USA Provider
              <USAFlag className="w-7 h-7 rounded-none shrink-0" />
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase text-[#111111] mb-6 leading-none break-words">
            VOCOTV SUBSCRIPTION <br />
            <span className="text-[#EF2E55]">PREMIER IPTV SERVICE</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#333333] max-w-3xl mx-auto mb-10 font-medium leading-relaxed px-2">
            Stream 36,000+ live channels plus 120,000+ movies and shows in crisp 4K on any device with VocoTV. Our US IPTV service includes step-by-step setup, expert support, a free trial to test on your screen first, and USD pricing with no lock-in contract.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-md sm:max-w-xl mx-auto px-4">
            <Link 
              href="/pricing" 
              className="w-full sm:w-auto text-center whitespace-nowrap py-3.5 px-8 rounded-none bg-[#FFD700] text-black font-black text-sm hover:bg-[#ffdf33] transition-all hover:scale-105 uppercase tracking-wider shrink-0 shadow-lg shadow-[#FFD700]/20 border border-[#FFD700]"
            >
              Get VocoTV Now
            </Link>
            <Link 
              href="/free-trial" 
              className="w-full sm:w-auto text-center whitespace-nowrap py-3.5 px-8 rounded-none bg-[#111111] text-white border border-[#111111] font-black text-sm hover:bg-[#EF2E55] transition-all hover:scale-105 uppercase tracking-wider flex items-center justify-center gap-2 shrink-0 shadow-md"
            >
              <PlayCircle className="w-5 h-5 text-[#FFD700] shrink-0" /> Claim Free Trial
            </Link>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-xs md:text-sm text-[#111111] font-bold uppercase tracking-widest bg-white/90 backdrop-blur-md px-8 py-4 rounded-none border border-[#EF2E55]/20 shadow-xl">
            <span className="flex items-center gap-2"><Zap className="w-5 h-5 text-[#EF2E55]" /> Ultra HD Stream Quality</span>
            <span className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-[#EF2E55]" /> High Uptime Network</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-[#EF2E55]" /> Anti Freeze Server Technology</span>
          </div>
        </FadeIn>
      </section>

      {/* Partner Slider Section */}
      <div className="min-h-[128px] bg-white">
        {isMounted ? <PartnerSlider /> : <div className="h-32 bg-transparent" />}
      </div>

      {/* 3 Step Setup Section */}
      <section className="py-28 bg-[#f9f9f9] w-full relative overflow-hidden border-y border-[#EF2E55]/10">
        <div className="absolute inset-0 bg-[radial-gradient(#EF2E55_1px,transparent_1px)] [background-size:28px_28px] opacity-5 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-20">
              <div className="inline-flex items-center gap-2 bg-white border border-[#EF2E55]/40 px-4 py-2 rounded-none mb-6 shadow-sm">
                <div className="w-2.5 h-2.5 rounded-none bg-[#EF2E55] animate-pulse" />
                <span className="text-[#111111] font-black text-xs uppercase tracking-widest">
                  VocoTV Setup USA
                </span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#111111] tracking-tight uppercase leading-[1.05]">
                START STREAMING VOCOTV IN <br className="hidden sm:block" />
                <span className="text-[#EF2E55] relative inline-block mt-1">
                  3 SIMPLE STEPS
                  <span className="absolute -bottom-1 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent rounded-none" />
                </span>
              </h2>
              
              <p className="text-[#333333] text-base sm:text-lg mt-6 font-semibold max-w-2xl leading-relaxed">
                No tech headaches, we keep it easy. Pick your plan, message us on chat, and our support team walks you through setup on your device. Test everything with a free trial before paying a cent.
              </p>
            </div>
          </FadeIn>
          
          <FadeInStagger className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 relative">
            {/* Step 1 */}
            <FadeInItem className="group relative z-10 flex flex-col justify-between bg-white text-[#111111] rounded-none p-8 sm:p-10 border-2 border-[#111111]/15 shadow-[0_15px_35px_rgba(0,0,0,0.08)] hover:border-[#EF2E55] hover:shadow-[0_25px_50px_rgba(239,46,85,0.15)] hover:-translate-y-2.5 transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-8 relative">
                  <div className="w-16 h-16 rounded-none bg-[#f9f9f9] text-[#EF2E55] shadow-md border border-[#EF2E55]/30 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    <Tv2 className="w-8 h-8 text-[#EF2E55]" />
                  </div>
                  <span className="text-5xl font-black text-white bg-[#EF2E55] px-4 py-1 rounded-none shadow-md tracking-tight border border-[#EF2E55]">
                    01
                  </span>
                </div>

                <div className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-[#111111] bg-[#FFD700] px-3.5 py-1.5 rounded-none mb-4 shadow-sm border border-[#FFD700]">
                  Step One
                </div>

                <h3 className="text-2xl font-black text-[#111111] mb-3 uppercase tracking-tight group-hover:text-[#EF2E55] transition-colors">
                  Select A Plan
                </h3>

                <p className="text-[#333333] text-sm font-medium leading-relaxed mb-6">
                  Choose the VocoTV subscription that fits your home. Select 1, 2, or 3 device connections with 3, 6, or 12-month duration choices. All plans are billed in USD with zero long-term commitments.
                </p>

                <ul className="text-xs font-bold text-[#444444] space-y-2.5 mb-8">
                  <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-none bg-[#EF2E55]" /> 1, 2, or 3 Device Connections</li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-none bg-[#EF2E55]" /> 3, 6, or 12 Month Options</li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-none bg-[#EF2E55]" /> Billed In USD ($) With No Contracts</li>
                </ul>
              </div>

              <div className="pt-5 border-t border-[#111111]/10 flex items-center justify-between mt-auto">
                <span className="text-xs font-black text-[#555555] uppercase tracking-wider group-hover:text-[#EF2E55] transition-colors">
                  Simple Selection
                </span>
                <div className="w-9 h-9 rounded-none bg-[#111111] text-[#FFD700] flex items-center justify-center shadow-md group-hover:bg-[#EF2E55] group-hover:text-white transition-all duration-300">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </FadeInItem>

            {/* Step 2 */}
            <FadeInItem className="group relative z-10 flex flex-col justify-between bg-white text-[#111111] rounded-none p-8 sm:p-10 border-2 border-[#111111]/15 shadow-[0_15px_35px_rgba(0,0,0,0.08)] hover:border-[#EF2E55] hover:shadow-[0_25px_50px_rgba(239,46,85,0.15)] hover:-translate-y-2.5 transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-8 relative">
                  <div className="w-16 h-16 rounded-none bg-[#f9f9f9] text-[#EF2E55] shadow-md border border-[#EF2E55]/30 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    <Smartphone className="w-8 h-8 text-[#EF2E55]" />
                  </div>
                  <span className="text-5xl font-black text-white bg-[#EF2E55] px-4 py-1 rounded-none shadow-md tracking-tight border border-[#EF2E55]">
                    02
                  </span>
                </div>

                <div className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-[#111111] bg-[#FFD700] px-3.5 py-1.5 rounded-none mb-4 shadow-sm border border-[#FFD700]">
                  Step Two
                </div>

                <h3 className="text-2xl font-black text-[#111111] mb-3 uppercase tracking-tight group-hover:text-[#EF2E55] transition-colors">
                  Setup On Chat
                </h3>

                <p className="text-[#333333] text-sm font-medium leading-relaxed mb-6">
                  Once you pick your plan, connect with us on chat. We guide you step-by-step to set up Firestick, Smart TV, or mobile devices using compatible streaming applications. You receive your trial credentials instantly.
                </p>

                <ul className="text-xs font-bold text-[#444444] space-y-2.5 mb-8">
                  <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-none bg-[#EF2E55]" /> Guided Setup Over Chat</li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-none bg-[#EF2E55]" /> Assistance with App Installation</li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-none bg-[#EF2E55]" /> Direct Access Credentials Delivered</li>
                </ul>
              </div>

              <div className="pt-5 border-t border-[#111111]/10 flex items-center justify-between mt-auto">
                <span className="text-xs font-black text-[#555555] uppercase tracking-wider group-hover:text-[#EF2E55] transition-colors">
                  Friendly US Support
                </span>
                <div className="w-9 h-9 rounded-none bg-[#111111] text-[#FFD700] flex items-center justify-center shadow-md group-hover:bg-[#EF2E55] group-hover:text-white transition-all duration-300">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </FadeInItem>

            {/* Step 3 */}
            <FadeInItem className="group relative z-10 flex flex-col justify-between bg-white text-[#111111] rounded-none p-8 sm:p-10 border-2 border-[#111111]/15 shadow-[0_15px_35px_rgba(0,0,0,0.08)] hover:border-[#EF2E55] hover:shadow-[0_25px_50px_rgba(239,46,85,0.15)] hover:-translate-y-2.5 transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-8 relative">
                  <div className="w-16 h-16 rounded-none bg-[#f9f9f9] text-[#EF2E55] shadow-md border border-[#EF2E55]/30 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    <CreditCard className="w-8 h-8 text-[#EF2E55]" />
                  </div>
                  <span className="text-5xl font-black text-white bg-[#EF2E55] px-4 py-1 rounded-none shadow-md tracking-tight border border-[#EF2E55]">
                    03
                  </span>
                </div>

                <div className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-[#111111] bg-[#FFD700] px-3.5 py-1.5 rounded-none mb-4 shadow-sm border border-[#FFD700]">
                  Step Three
                </div>

                <h3 className="text-2xl font-black text-[#111111] mb-3 uppercase tracking-tight group-hover:text-[#EF2E55] transition-colors">
                  Test Then Upgrade
                </h3>

                <p className="text-[#333333] text-sm font-medium leading-relaxed mb-6">
                  Start your free trial and test the performance. Check live sports channels, browse movie catalogs, and verify stability on your device. Upgrade to a paid plan only when completely satisfied.
                </p>

                <ul className="text-xs font-bold text-[#444444] space-y-2.5 mb-8">
                  <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-none bg-[#EF2E55]" /> Free Trial To Test Streams</li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-none bg-[#EF2E55]" /> Upgrade Only When Fully Satisfied</li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-none bg-[#EF2E55]" /> Full Customer Support Included</li>
                </ul>
              </div>

              <div className="pt-5 border-t border-[#111111]/10 flex items-center justify-between mt-auto">
                <span className="text-xs font-black text-[#555555] uppercase tracking-wider group-hover:text-[#EF2E55] transition-colors">
                  Ready To Watch
                </span>
                <div className="w-9 h-9 rounded-none bg-[#111111] text-[#FFD700] flex items-center justify-center shadow-md group-hover:bg-[#EF2E55] group-hover:text-white transition-all duration-300">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </FadeInItem>
          </FadeInStagger>
        </div>
      </section>

      {/* Living Room Section */}
      <section className="w-full bg-white py-20 md:py-28 flex flex-col items-center justify-center overflow-hidden border-b border-[#EF2E55]/10">
        <div className="w-full max-w-7xl px-4 text-center mb-8">
          <span className="mb-4 inline-flex rounded-none bg-[#f9f9f9] border border-[#EF2E55]/40 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#EF2E55]">
            Home Cinema Experience 🇺🇸
          </span>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[#111111] leading-none">
            BRING VOCOTV HIGH DEFINITION TO YOUR <span className="text-[#EF2E55]">LIVING ROOM</span>
          </h2>
        </div>

        <div className="w-full bg-[#f9f9f9] py-10 flex justify-center items-center transition-all duration-300 border-y border-[#EF2E55]/10">
          <div className="w-full max-w-[1100px] px-6 h-auto aspect-[5/2] flex justify-center items-center">
            <Image
              src="/img/sofa.webp"
              alt="VocoTV subscription service playing on a Smart TV in a US living room"
              width={1200}
              height={480}
              loading="lazy"
              className="h-full w-full object-contain"
              sizes="(max-width: 1100px) 100vw, 1100px"
            />
          </div>
        </div>

        <div className="w-full max-w-3xl px-4 text-center mt-10">
          <p className="text-base md:text-lg leading-relaxed text-[#333333] font-medium">
            Nothing beats watching live sports or blockbuster movies on the big screen with VocoTV. Our servers keep picture quality sharp and streams low-latency so you can enjoy the game without buffering or pixelation.
          </p>
          <div className="w-full flex justify-center mt-8">
            <Link 
              href="/pricing" 
              className="bg-[#FFD700] border border-[#FFD700] px-8 py-3 text-sm font-black uppercase tracking-widest text-black hover:bg-[#ffdf33] transition-transform hover:scale-105 rounded-none shadow-xl shadow-[#FFD700]/20"
            >
              Activate VocoTV Today
            </Link>
          </div>
        </div>
      </section>

      {/* Media Grid Section */}
      <section id="channels" className="pt-24 bg-white max-w-[100vw] overflow-hidden relative min-h-[400px]">
        <FadeIn className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-between items-start mb-12 gap-6 relative z-10 w-full">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-[#111111] mb-4 uppercase tracking-tight leading-none">
              WIDE RANGE OF VOCOTV LOCAL & INTERNATIONAL CHANNELS
            </h2>
            <p className="text-[#444444] font-medium text-lg">
              Access 36,000+ live broadcasts alongside 120,000+ movies and series on demand with VocoTV IPTV. New titles are added regularly.
            </p>
          </div>
        </FadeIn>
        {isMounted ? (
          <MovieSlider />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto px-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-[2/3] bg-[#f9f9f9] rounded-none border border-[#EF2E55]/20 shadow-sm" />
            ))}
          </div>
        )}
      </section>

      {/* Pricing Section */}
      <div className="min-h-[600px] bg-white" id="pricing-section">
        {isMounted ? <PricingSection /> : <div className="h-[600px] bg-transparent" />}
      </div>

      <section className="w-full max-w-4xl mx-auto px-4 my-8 flex justify-center items-center">
        <ShareButtons />
      </section>

      {/* Trust Badges */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#f9f9f9] text-[#111111] border border-[#111111]/15 rounded-none p-8 md:p-12 shadow-2xl">
          <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
            <FadeInItem className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-none bg-white border border-[#EF2E55]/40 flex items-center justify-center shrink-0 shadow-sm">
                <Lock className="w-7 h-7 text-[#EF2E55]" />
              </div>
              <div>
                <div className="font-black text-[#111111] text-lg uppercase tracking-tight">Secure Payment Options</div>
                <p className="text-[#444444] font-medium text-xs mt-1">Encrypted checkout supporting Credit Cards, PayPal, Bank Transfers, and Crypto</p>
              </div>
            </FadeInItem>

            <FadeInItem className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-none bg-white border border-[#EF2E55]/40 flex items-center justify-center shrink-0 shadow-sm">
                <ThumbsUp className="w-7 h-7 text-[#EF2E55]" />
              </div>
              <div>
                <div className="font-black text-[#111111] text-lg uppercase tracking-tight">Free Trial Option</div>
                <p className="text-[#444444] font-medium text-xs mt-1">Test VocoTV stream performance on your device before deciding to subscribe</p>
              </div>
            </FadeInItem>

            <FadeInItem className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-none bg-white border border-[#EF2E55]/40 flex items-center justify-center shrink-0 shadow-sm">
                <LifeBuoy className="w-7 h-7 text-[#EF2E55]" />
              </div>
              <div>
                <div className="font-black text-[#111111] text-lg uppercase tracking-tight">Chat Setup Guide</div>
                <p className="text-[#444444] font-medium text-xs mt-1">Our technical team provides step-by-step assistance directly via chat</p>
              </div>
            </FadeInItem>

            <FadeInItem className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-none bg-white border border-[#EF2E55]/40 flex items-center justify-center shrink-0 shadow-sm">
                <Medal className="w-7 h-7 text-[#EF2E55]" />
              </div>
              <div>
                <div className="font-black text-[#111111] text-lg uppercase tracking-tight">Optimized Server Network</div>
                <p className="text-[#444444] font-medium text-xs mt-1">Dedicated network capacity ensures smooth streaming during major events</p>
              </div>
            </FadeInItem>
          </FadeInStagger>
        </div>
      </section>

      {/* Animated Statistics Section */}
      <section className="py-24 bg-[#111111] text-white relative overflow-hidden border-y border-[#EF2E55]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn className="text-center mb-12">
            <h3 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tight">
              {CONSTANTS.BRAND_NAME} PERFORMANCE METRICS
            </h3>
            <p className="text-[#FFD700] text-base font-bold mt-4 uppercase tracking-wider">
              Serving satisfied VocoTV viewers across New York, Los Angeles, Chicago, Houston, and Phoenix.
            </p>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            <FadeInItem className="flex flex-col items-center p-6 bg-white text-[#111111] rounded-none border border-white/20 shadow-lg">
              <span className="text-5xl md:text-7xl font-black text-[#EF2E55] mb-2">
                <AnimatedCounter value={15} suffix="K+" />
              </span>
              <span className="text-xs text-[#555555] font-extrabold uppercase tracking-widest mt-2">Active Subscribers</span>
            </FadeInItem>
            <FadeInItem className="flex flex-col items-center p-6 bg-white text-[#111111] rounded-none border border-white/20 shadow-lg">
              <span className="text-5xl md:text-7xl font-black text-[#EF2E55] mb-2">
                <AnimatedCounter value={36} suffix="K+" />
              </span>
              <span className="text-xs text-[#555555] font-extrabold uppercase tracking-widest mt-2">Live Channels</span>
            </FadeInItem>
            <FadeInItem className="flex flex-col items-center p-6 bg-white text-[#111111] rounded-none border border-white/20 shadow-lg">
              <span className="text-5xl md:text-7xl font-black text-[#EF2E55] mb-2">
                <AnimatedCounter value={120} suffix="K+" />
              </span>
              <span className="text-xs text-[#555555] font-extrabold uppercase tracking-widest mt-2">On Demand Titles</span>
            </FadeInItem>
            <FadeInItem className="flex flex-col items-center p-6 bg-white text-[#111111] rounded-none border border-white/20 shadow-lg">
              <span className="text-5xl md:text-7xl font-black text-[#EF2E55] mb-2">
                <AnimatedCounter value={99.9} decimals={1} suffix="%" />
              </span>
              <span className="text-xs text-[#555555] font-extrabold uppercase tracking-widest mt-2">Server Uptime</span>
            </FadeInItem>
          </FadeInStagger>
        </div>
      </section>

      <section className="w-full bg-white py-12 border-b border-[#EF2E55]/10">
        <div className="max-w-7xl mx-auto px-4">
          <TargetCountries />
        </div>
      </section>

      {/* Global Server Map */}
      <div className="min-h-[400px] bg-white">
        {isMounted ? <GlobalServerMap /> : <div className="h-[400px] bg-transparent" />}
      </div>

      {/* Benefits Section */}
      <section className="py-24 bg-[#f9f9f9] relative overflow-hidden border-t border-[#EF2E55]/10">
        <div className="absolute inset-0 bg-[radial-gradient(#EF2E55_1px,transparent_1px)] [background-size:32px_32px] opacity-5 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-white border border-[#EF2E55]/40 px-4 py-2 rounded-none mb-6">
              <span className="w-2.5 h-2.5 rounded-none bg-[#EF2E55] animate-pulse" />
              <span className="text-[#111111] font-black text-xs uppercase tracking-widest">
                Reliable VocoTV Service 🇺🇸
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#111111] mb-6 uppercase tracking-tight leading-none">
              WHY VOCOTV IS THE <span className="text-[#EF2E55]">BEST IPTV SUBSCRIPTION</span> IN THE USA
            </h2>
            <p className="text-[#333333] font-semibold text-lg max-w-3xl mx-auto leading-relaxed">
              Cord-cutters across America looking for a smarter alternative to cable choose VocoTV IPTV. Here is why our platform stands out.
            </p>
          </FadeIn>

          <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {[
              { 
                iconSvg: (
                  <svg className="w-7 h-7 text-[#EF2E55]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21 3.582 4 8 4s8-1.79 8-4" />
                  </svg>
                ), 
                title: "Huge On Demand Library", 
                desc: "Instant access to 120,000+ movies, full series, and multi-language audio or subtitle options with VocoTV. Content updates continuously." 
              },
              { 
                iconSvg: (
                  <svg className="w-7 h-7 text-[#EF2E55]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ), 
                title: "Anti Freeze Server Infrastructure", 
                desc: "Load-balanced server architecture engineered by VocoTV to eliminate interruptions during peak sports broadcasts." 
              },
              { 
                iconSvg: (
                  <svg className="w-7 h-7 text-[#EF2E55]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                ), 
                title: "Optimized US Routing", 
                desc: "Dedicated US edge servers keep ping low, channel switching fast, and video quality consistent from coast to coast." 
              },
              { 
                iconSvg: (
                  <svg className="w-7 h-7 text-[#EF2E55]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                ), 
                title: "NFL, NBA, MLB & NHL Action", 
                desc: "Follow NFL Sunday, NBA primetime, MLB playoffs, NHL games, college football, and PPV fight nights at fluid 60fps with VocoTV IPTV." 
              },
              { 
                iconSvg: (
                  <svg className="w-7 h-7 text-[#EF2E55]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ), 
                title: "7 Day Electronic Program Guide", 
                desc: "Integrated EPG schedule providing 7-day program overviews alongside catch-up TV functionality." 
              },
              { 
                iconSvg: (
                  <svg className="w-7 h-7 text-[#EF2E55]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ), 
                title: "Multi Device Connections", 
                desc: "Stream on multiple screens in your home using Firestick, Android TV, Smart TV, or mobile devices simultaneously." 
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white text-[#111111] rounded-none p-8 border-2 border-[#111111]/15 shadow-xl hover:border-[#EF2E55] hover:shadow-[0_20px_45px_rgba(239,46,85,0.15)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 rounded-none bg-[#f9f9f9] border border-[#EF2E55]/40 flex items-center justify-center mb-6 shadow-sm">
                    {item.iconSvg}
                  </div>
                  <h3 className="text-2xl font-black text-[#111111] mb-3 uppercase tracking-tight">{item.title}</h3>
                  <p className="text-[#333333] font-medium text-sm leading-relaxed">{item.desc}</p>
                </div>
                <div className="pt-6 mt-6 border-t border-[#111111]/10 flex items-center justify-between text-xs font-bold text-[#EF2E55]">
                  <span className="uppercase tracking-wider">Key Feature</span>
                  <span className="w-2 h-2 rounded-none bg-[#EF2E55]" />
                </div>
              </div>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* Channel Categories */}
      <section className="py-24 bg-white relative border-t border-[#EF2E55]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#f9f9f9] border border-[#EF2E55]/40 px-4 py-2 rounded-none mb-6">
              <span className="w-2.5 h-2.5 rounded-none bg-[#EF2E55] animate-pulse" />
              <span className="text-[#111111] font-black text-xs uppercase tracking-widest">
                36,000+ Live Channels
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#111111] mb-6 uppercase tracking-tight leading-none">
              EXPLORE VOCOTV <span className="text-[#EF2E55]">CHANNEL CATEGORIES</span>
            </h2>
            <p className="text-[#333333] font-semibold text-lg max-w-3xl mx-auto leading-relaxed">
              Our VocoTV IPTV service brings sports networks, local affiliate channels, cinema feeds, and international broadcasts together into one clean player application.
            </p>
          </FadeIn>

          <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                cat: "Live Sports Networks", 
                channels: "Watch NFL Sunday, NBA, MLB, NHL, college football, Premier League, and major PPV fight nights in high definition.", 
                iconSvg: (
                  <svg className="w-6 h-6 text-[#EF2E55]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                )
              },
              { 
                cat: "Local US Affiliates", 
                channels: "Coverage of major network affiliates, local news networks, and standard free-to-air broadcasting across the US.", 
                iconSvg: (
                  <svg className="w-6 h-6 text-[#EF2E55]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )
              },
              { 
                cat: "Movies & On Demand", 
                channels: "Thousands of cinema releases, box sets, and streaming originals updated daily — including HBO, Showtime, and more.", 
                iconSvg: (
                  <svg className="w-6 h-6 text-[#EF2E55]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                  </svg>
                )
              },
              { 
                cat: "Kids & Family Programming", 
                channels: "Family-oriented channels, educational shows, and animated programming for younger audiences.", 
                iconSvg: (
                  <svg className="w-6 h-6 text-[#EF2E55]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )
              },
              { 
                cat: "US & UK Broadcasters", 
                channels: "American and British television networks providing round-the-clock news, series, and live entertainment.", 
                iconSvg: (
                  <svg className="w-6 h-6 text-[#EF2E55]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                )
              },
              { 
                cat: "Global Television", 
                channels: "International networks spanning Europe, Asia, Latin America, and the Americas.", 
                iconSvg: (
                  <svg className="w-6 h-6 text-[#EF2E55]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                )
              },
              { 
                cat: "Documentary & Nature", 
                channels: "Channels dedicated to geography, science, history, and natural history documentaries.", 
                iconSvg: (
                  <svg className="w-6 h-6 text-[#EF2E55]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                )
              },
              { 
                cat: "Combat Sports & Events", 
                channels: "UFC, professional boxing, wrestling, and pay-per-view broadcasts in high resolution.", 
                iconSvg: (
                  <svg className="w-6 h-6 text-[#EF2E55]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-[#f9f9f9] text-[#111111] rounded-none p-6 border-2 border-[#111111]/15 shadow-sm hover:border-[#EF2E55] hover:shadow-[0_15px_30px_rgba(239,46,85,0.15)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-none bg-white flex items-center justify-center shrink-0 border border-[#EF2E55]/40 shadow-sm">
                      {item.iconSvg}
                    </div>
                    <h3 className="font-black text-[#111111] text-base uppercase tracking-wider">{item.cat}</h3>
                  </div>
                  <p className="text-[#333333] font-semibold text-xs leading-relaxed">{item.channels}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#111111]/10 flex items-center justify-between text-[10px] font-extrabold uppercase text-[#EF2E55] tracking-widest">
                  <span>HD & 4K Quality</span>
                  <span>On Air</span>
                </div>
              </div>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* Feature Blocks */}
      <section className="bg-[#f9f9f9] py-24 border-y border-[#EF2E55]/10 relative overflow-hidden">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#EF2E55]/5 blur-[150px] rounded-none pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#EF2E55]/5 blur-[150px] rounded-none pointer-events-none" />

        <div className="mx-auto max-w-7xl space-y-28 px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Block 1: 4K Quality */}
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative order-1 overflow-hidden rounded-none bg-white border-2 border-[#111111]/15 p-3 shadow-xl transition-all duration-500 hover:border-[#EF2E55]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-none sm:aspect-video lg:aspect-[5/4]">
                <Image
                  src="/img/image-1.webp"
                  alt="VocoTV 4K IPTV provider streaming in high definition on a Smart TV in the USA"
                  width={800}
                  height={600}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                
                <div className="absolute left-4 top-4 rounded-none bg-white px-4 py-2 text-xs font-black uppercase tracking-widest text-[#111111] border border-[#EF2E55]/50 shadow-md">
                  4K Ultra HD Quality
                </div>
                
                <div className="absolute bottom-4 left-4 right-4 rounded-none bg-white/95 backdrop-blur-md border border-[#111111]/15 p-4 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-[340px] shadow-xl">
                  <div className="flex items-center gap-3.5">
                    <span className="flex h-12 w-12 items-center justify-center rounded-none bg-[#f9f9f9] text-[#EF2E55] shrink-0 shadow-sm border border-[#EF2E55]/40">
                      <PlayCircle className="h-6 w-6 text-[#EF2E55]" />
                    </span>
                    <div>
                      <p className="text-base font-black uppercase text-[#111111]">Ultra Clear Streams</p>
                      <p className="text-xs font-medium text-[#444444] mt-0.5">
                        Enjoy sharp resolution and stable video output across all supported displays.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <FadeIn className="order-2">
              <span className="mb-4 inline-flex items-center gap-2 rounded-none bg-white border border-[#EF2E55]/40 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#EF2E55] shadow-sm">
                <span className="w-2 h-2 rounded-none bg-[#EF2E55] animate-pulse" />
                High Definition Playback 🇺🇸
              </span>
              
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#111111] leading-[1.1] mb-6">
                EXPERIENCE UNMATCHED <br />
                <span className="text-[#EF2E55] relative inline-block mt-1">
                  4K VIDEO CLARITY
                  <span className="absolute -bottom-1 left-0 right-0 h-1.5 bg-[#111111] rounded-none" />
                </span>
              </h3>
              
              <p className="text-base leading-relaxed text-[#333333] font-medium space-y-4">
                Our infrastructure is built for network stability. We use high-bandwidth server hubs across the US that reduce buffering, so 4K, Full HD, and standard broadcasts stay reliable with VocoTV.
              </p>

              <p className="mt-4 text-sm leading-relaxed text-[#444444] font-medium">
                Whether you are watching live news, browsing the on-demand library, or following your team, server optimization keeps playback smooth on Amazon Firestick, Smart TVs, Android TV, and Apple TV.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  'Anti Freeze Protection Engine', 
                  'Wide Channel Selection in 4K & FHD', 
                  '120,000+ On Demand Titles Available', 
                  'Compatible with Firestick, TV & Mobile'
                ].map((item) => (
                  <div key={item} className="rounded-none bg-white text-[#111111] border border-[#111111]/15 px-4 py-3.5 text-xs font-extrabold uppercase flex items-center gap-3 shadow-sm hover:border-[#EF2E55] transition-colors">
                    <div className="w-5 h-5 rounded-none bg-[#f9f9f9] text-[#EF2E55] flex items-center justify-center shrink-0 border border-[#EF2E55]/40">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="w-full flex sm:inline-flex mt-8">
                <Link 
                  href="/pricing" 
                  className="w-full sm:w-auto text-center whitespace-nowrap bg-[#FFD700] px-8 py-4 text-xs font-black uppercase tracking-widest text-black hover:bg-[#ffdf33] transition-all hover:scale-105 rounded-none shrink-0 shadow-lg shadow-[#FFD700]/20 border border-[#FFD700]"
                >
                  Get VocoTV Access Now
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Block 2: Live Sports */}
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <FadeIn className="order-2 lg:order-1">
              <span className="mb-4 inline-flex items-center gap-2 rounded-none bg-white border border-[#EF2E55]/40 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#EF2E55] shadow-sm">
                <span className="w-2 h-2 rounded-none bg-[#EF2E55] animate-pulse" />
                Match Day & Pay Per View
              </span>

              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#111111] leading-[1.1] mb-6">
                NEVER MISS A SINGLE <br />
                <span className="text-[#EF2E55] relative inline-block mt-1">
                  MATCH OR EVENT
                  <span className="absolute -bottom-1 left-0 right-0 h-1.5 bg-[#111111] rounded-none" />
                </span>
              </h3>

              <p className="text-base leading-relaxed text-[#333333] font-medium">
                Sports fans need smooth delivery and low latency. Picking VocoTV as your dedicated IPTV provider means uninterrupted coverage of NFL Sunday, NBA primetime, MLB playoffs, NHL games, college football, Formula 1, and PPV fight nights.
              </p>

              <p className="mt-4 text-sm leading-relaxed text-[#444444] font-medium">
                Our server network scales to handle high traffic during every big matchup. Streams run at high frame rates to keep motion sharp and natural.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  'Full NFL, NBA, MLB & NHL Coverage', 
                  'Fight Night Events & Pay Per Views', 
                  'Low Latency High Frame Rate Feeds', 
                  'Dedicated Sports Channels & ESPN'
                ].map((item) => (
                  <div key={item} className="rounded-none bg-white text-[#111111] border border-[#111111]/15 px-4 py-3.5 text-xs font-extrabold uppercase flex items-center gap-3 shadow-sm hover:border-[#EF2E55] transition-colors">
                    <div className="w-5 h-5 rounded-none bg-[#f9f9f9] text-[#EF2E55] flex items-center justify-center shrink-0 border border-[#EF2E55]/40">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="w-full flex sm:inline-flex mt-8">
                <Link 
                  href="#channels" 
                  className="w-full sm:w-auto text-center whitespace-nowrap bg-[#111111] border-2 border-[#EF2E55] px-8 py-4 text-xs font-black uppercase tracking-widest text-white hover:bg-[#EF2E55] hover:text-white transition-all hover:scale-105 rounded-none shrink-0 shadow-lg"
                >
                  Explore Sports Coverage
                </Link>
              </div>
            </FadeIn>

            <div className="relative order-1 overflow-hidden rounded-none bg-white border-2 border-[#111111]/15 p-3 lg:order-2 shadow-xl transition-all duration-500 hover:border-[#EF2E55]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-none sm:aspect-video lg:aspect-[5/4]">
                <Image
                  src="/img/bg-1.webp"
                  alt="NFL Sunday and NBA match day coverage on a VocoTV subscription"
                  width={800}
                  height={600}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                <div className="absolute left-4 top-4 rounded-none bg-white px-4 py-2 text-xs font-black uppercase tracking-widest text-[#111111] border border-[#EF2E55]/50 shadow-md">
                  Match Day Broadcasts
                </div>

                <div className="absolute bottom-4 left-4 right-4 rounded-none bg-white/95 backdrop-blur-md border border-[#111111]/15 p-4 shadow-xl">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-none bg-[#f9f9f9] text-[#EF2E55] shadow-sm border border-[#EF2E55]/40">
                      <Trophy className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="text-base font-black uppercase text-[#111111]">Sports Pass</p>
                      <p className="text-xs font-extrabold uppercase tracking-widest text-[#EF2E55]">
                        Match Day & Sports Feeds
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 relative overflow-hidden bg-white border-y border-[#EF2E55]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#f9f9f9] px-4 py-2 rounded-none border border-[#EF2E55]/50 mb-6">
              <BarChart className="w-4 h-4 text-[#EF2E55]" />
              <span className="text-[#111111] font-extrabold text-xs uppercase tracking-wider">Service Comparison</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#111111] mb-6 uppercase tracking-tight">
              VOCOTV VS TRADITIONAL CABLE TV
            </h2>
            <p className="text-[#333333] text-lg max-w-3xl mx-auto font-medium">
              Compare features to see why households across America are switching to VocoTV. Enjoy greater flexibility, expanded channel lineups, and massive savings.
            </p>
          </FadeIn>

          <div className="hidden md:block overflow-x-auto">
            <div className="rounded-none border border-[#EF2E55]/30 overflow-hidden shadow-xl bg-white">
              <div className="grid grid-cols-3 gap-0">
                <div className="p-6 border-b border-r border-[#111111]/10 bg-[#111111] text-white">
                  <h3 className="text-lg font-black uppercase text-white">Feature Comparison</h3>
                </div>
                <div className="p-6 border-b border-r border-[#111111]/10 bg-[#111111] text-white">
                  <h3 className="text-lg font-black uppercase text-[#EF2E55]">VocoTV</h3>
                </div>
                <div className="p-6 border-b border-[#111111]/10 bg-[#111111] text-white">
                  <h3 className="text-lg font-black uppercase text-white/70">Traditional Cable TV</h3>
                </div>
                
                {[
                  { feature: "Monthly Cost", us: "From ~$5.75 USD / month", cable: "$80 to $150 USD per month" },
                  { feature: "Contract Terms", us: "No Lock In Contract", cable: "12 to 24 Month Contracts" },
                  { feature: "Live Channels", us: "36,000+ Channels", cable: "60 to 100 Channels" },
                  { feature: "On Demand Movies", us: "120,000+ Titles", cable: "Limited On Demand Selection" },
                  { feature: "Ultra HD Quality", us: "Standard Inclusion", cable: "Extra HD Hardware Fees", usIcon: true },
                  { feature: "Multiple Screens", us: "Multi Device Support", cable: "Additional Box Rental Fees", usIcon: true },
                  { feature: "Sports Events", us: "Included in Package", cable: "Extra Sports Package Fees", usIcon: true },
                  { feature: "International Feeds", us: "Global Networks Included", cable: "Restricted Add-on Options" }
                ].map((row, idx) => (
                  <div key={idx} className="grid grid-cols-3 gap-0 contents">
                    <div className={`p-6 border-r border-b border-[#111111]/10 ${idx % 2 === 0 ? 'bg-white' : 'bg-[#f9f9f9]'}`}>
                      <span className="text-[#111111] font-bold text-sm">{row.feature}</span>
                    </div>

                    <div className={`p-6 border-r border-b border-[#111111]/10 ${idx % 2 === 0 ? 'bg-white' : 'bg-[#f9f9f9]'}`}>
                      {row.usIcon ? (
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-[#EF2E55]" />
                          <span className="text-[#111111] font-extrabold text-sm">{row.us}</span>
                        </div>
                      ) : (
                        <span className="text-[#EF2E55] font-black text-sm">{row.us}</span>
                      )}
                    </div>

                    <div className={`p-6 border-b border-[#111111]/10 ${idx % 2 === 0 ? 'bg-white' : 'bg-[#f9f9f9]'}`}>
                      <span className="text-[#555555] text-sm font-medium">{row.cable}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:hidden space-y-4">
            {[
              { feature: "Monthly Cost", us: "From ~$5.75 USD/mo", cable: "$80 to $150 USD/mo" },
              { feature: "Contract Terms", us: "No Contract", cable: "12 to 24 Months" },
              { feature: "Live Channels", us: "36,000+ Channels", cable: "60 to 100 Channels" },
              { feature: "On Demand Titles", us: "120,000+ Titles", cable: "Limited Selection" },
              { feature: "4K Streaming", us: "Included Standard", cable: "Extra Hardware Fee" },
              { feature: "Multi Screen", us: "Multi Device", cable: "Fee per box" },
              { feature: "Sports Events", us: "Included", cable: "Extra Monthly Fees" },
              { feature: "International Feeds", us: "Global Networks", cable: "Extra Add-ons" }
            ].map((row, idx) => (
              <div key={idx} className="bg-white text-[#111111] rounded-none border border-[#EF2E55]/30 p-5 shadow-lg">
                <div className="text-center mb-3">
                  <span className="text-[#EF2E55] text-xs font-black uppercase tracking-wider">{row.feature}</span>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <div className="text-left bg-[#f9f9f9] p-3 rounded-none flex-1 border border-[#EF2E55]/30">
                    <div className="text-[#EF2E55] font-black text-sm">{row.us}</div>
                    <div className="text-[#111111] text-[10px] font-bold uppercase">VocoTV</div>
                  </div>
                  <div className="text-right bg-[#f9f9f9] p-3 rounded-none flex-1 border border-[#111111]/10">
                    <div className="text-[#777777] line-through text-sm">{row.cable}</div>
                    <div className="text-[#777777] text-[10px] font-bold uppercase">Cable TV</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-24 bg-[#f9f9f9] border-b border-[#EF2E55]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-none border border-[#111111]/20 mb-6 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-[#EF2E55]" />
              <span className="text-[#111111] font-extrabold text-xs uppercase tracking-wider">Subscriber Feedback</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#111111] mb-6 uppercase tracking-tight">
              POPULAR WITH OVER <span className="text-[#EF2E55]">15,000+ VOCOTV VIEWERS 🇺🇸</span>
            </h2>
            <p className="text-[#333333] text-lg font-medium max-w-2xl mx-auto">
              Read feedback from subscribers across New York, Los Angeles, Chicago, Houston, and Phoenix.
            </p>
          </FadeIn>

          <FadeInStagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                name: "Mark S.", 
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
                text: "Finding VocoTV in the US that streams weekend sports without buffering was tough until I set this up. Setup via chat was quick and the 4K feeds are crystal clear.", 
                role: "New York, NY" 
              },
              { 
                name: "Emma W.", 
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
                text: "Switched away from expensive cable to VocoTV. The team walked me through setup on chat in minutes. Tested during the free trial and upgraded straight away. Top tier quality.", 
                role: "Los Angeles, CA" 
              },
              { 
                name: "David K.", 
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
                text: "Excellent selection of live sports, local US feeds, and updated movies on VocoTV. Runs smooth on player apps on my Smart TV. Highly recommended for cord-cutters.", 
                role: "Chicago, IL" 
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white text-[#111111] rounded-none p-8 border border-[#111111]/15 shadow-xl transition-all hover:-translate-y-2 hover:border-[#EF2E55] hover:shadow-2xl duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <Image 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        width={48}
                        height={48} 
                        className="w-12 h-12 rounded-none object-cover border-2 border-[#EF2E55] shadow-sm shrink-0" 
                      />
                      <div>
                        <div className="font-black text-[#111111] text-base uppercase tracking-tight flex items-center gap-1.5">
                          {testimonial.name}
                          <UserCheck className="w-4 h-4 text-[#EF2E55]" />
                        </div>
                        <div className="text-[#EF2E55] text-xs font-bold uppercase tracking-wider">{testimonial.role}</div>
                      </div>
                    </div>

                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#FFD700] text-[#FFD700]" />
                      ))}
                    </div>
                  </div>

                  <p className="text-[#333333] font-medium text-base leading-relaxed italic mb-6">
                    &quot;{testimonial.text}&quot;
                  </p>
                </div>

                <div className="border-t border-[#111111]/10 pt-4 flex items-center justify-between">
                  <span className="text-[11px] font-black text-[#EF2E55] uppercase tracking-wider flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#EF2E55]" /> Active Subscriber
                  </span>
                  <span className="text-[11px] font-bold text-[#555555] uppercase">United States 🇺🇸</span>
                </div>
              </div>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* Supported Devices Section */}
      <section className="py-24 bg-white w-full relative overflow-hidden border-b border-[#EF2E55]/10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#EF2E55]/5 blur-[120px] pointer-events-none rounded-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#f9f9f9] px-4 py-2 rounded-none border border-[#EF2E55]/40 backdrop-blur-md mb-6">
              <span className="w-2 h-2 rounded-none bg-[#EF2E55] animate-pulse" />
              <span className="text-[#EF2E55] font-extrabold text-xs uppercase tracking-widest">Universal Hardware Support</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-[#111111] mb-6 uppercase tracking-tight max-w-4xl mx-auto leading-tight">
              VOCOTV IS COMPATIBLE WITH ALL POPULAR HARDWARE PLATFORMS
            </h2>
            
            <p className="text-[#333333] text-lg max-w-3xl mx-auto font-medium leading-relaxed">
              Setup works easily on hardware you already own. We help with app installation over chat, supporting playlist and Xtream Code credentials on Smart TVs, Firesticks, Android, iOS, and PC.
            </p>
          </FadeIn>
          
          <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {[
              { 
                tag: "Amazon Firestick & Fire TV", 
                desc: "Fire OS, Fire TV Cube, and 4K Sticks", 
                detail: "Compatible media players offer high responsiveness and smooth navigation.",
                icon: Zap, 
                code: "01" 
              },
              { 
                tag: "Smart TVs (Samsung & LG)", 
                desc: "Samsung Tizen OS and LG webOS Systems", 
                detail: "Install compatible media player apps directly from TV app stores without extra hardware.",
                icon: Tv2, 
                code: "02" 
              },
              { 
                tag: "Android TV & Streaming Boxes", 
                desc: "Nvidia Shield, Google TV, and Android Boxes", 
                detail: "Full hardware decoding support provides stable playback for high frame rate live sports broadcasts.",
                icon: Cpu, 
                code: "03" 
              },
              { 
                tag: "Apple TV, iPhone & iPad", 
                desc: "tvOS and iOS Operating Platforms", 
                detail: "Optimal playback across native iOS player apps with cloud profile synchronization.",
                icon: Smartphone, 
                code: "04" 
              },
              { 
                tag: "Windows PCs & Mac Computers", 
                desc: "Windows 10 and 11, macOS, and Linux", 
                detail: "Stream via desktop media software or compatible web browser player interfaces.",
                icon: MonitorSmartphone, 
                code: "05" 
              },
              { 
                tag: "MAG & Dedicated Boxes", 
                desc: "Portal Media Players and Set Top Devices", 
                detail: "Direct MAC address integration offering complete Electronic Program Guide navigation.",
                icon: ShieldCheck, 
                code: "06" 
              },
            ].map((device) => {
              const Icon = device.icon;
              return (
                <div 
                  key={device.tag} 
                  className="group relative bg-[#f9f9f9] text-[#111111] border border-[#111111]/15 rounded-none p-7 flex flex-col justify-between gap-5 hover:border-[#EF2E55] hover:shadow-[0_12px_35px_rgba(239,46,85,0.15)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer shadow-sm overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#EF2E55] opacity-90 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-none bg-white border border-[#111111]/15 flex items-center justify-center shrink-0 group-hover:scale-105 transition-all duration-300 shadow-sm">
                        <Icon className="w-7 h-7 text-[#EF2E55] transition-all duration-300" />
                      </div>
                      <div>
                        <h3 className="text-base font-black text-[#111111] uppercase tracking-wide leading-tight">
                          {device.tag}
                        </h3>
                        <p className="text-xs font-bold text-[#EF2E55] mt-0.5">
                          {device.desc}
                        </p>
                      </div>
                    </div>

                    <span className="text-xs font-black text-black bg-[#FFD700] border border-[#FFD700] px-2.5 py-1 rounded-none shrink-0 shadow-sm">
                      {device.code}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-[#444444] leading-relaxed pt-2 border-t border-[#111111]/10">
                    {device.detail}
                  </p>
                </div>
              );
            })}
          </FadeInStagger>
        </div>
      </section>

      {/* FAQ Section */}
      <div className="min-h-[400px] bg-white">
        {isMounted ? <FAQ /> : <div className="h-[400px] bg-transparent" />}
      </div>

      {/* Blog Section */}
      <section className="py-24 bg-[#f9f9f9] w-full relative overflow-hidden border-t border-[#EF2E55]/10">
        <div className="absolute inset-0 bg-[radial-gradient(#EF2E55_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <FadeIn className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-none border border-[#111111]/20 mb-6 shadow-sm">
                <BookOpen className="w-4 h-4 text-[#EF2E55]" />
                <span className="text-[#111111] font-extrabold text-xs uppercase tracking-widest">Guides &amp; Insights</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-[#111111] mb-4 uppercase tracking-tight">
                LATEST VOCOTV SETUP <span className="text-[#EF2E55]">GUIDES &amp; NEWS</span>
              </h2>
              <p className="text-[#333333] text-lg font-medium max-w-2xl leading-relaxed">
                Learn how to get the most out of your VocoTV subscription with configuration guides, streaming app tips, and network optimization insights.
              </p>
            </div>
            
            <div className="flex shrink-0">
              <Link 
                href="/blog" 
                className="whitespace-nowrap px-7 py-4 rounded-none bg-[#FFD700] text-black font-black hover:bg-[#ffdf33] transition-all duration-300 flex items-center gap-3 group shrink-0 shadow-xl border border-[#FFD700] hover:shadow-[0_10px_25px_rgba(255,215,0,0.3)]"
              >
                <span className="uppercase text-xs tracking-wider">Explore All Articles</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-black" />
              </Link>
            </div>
          </FadeIn>
          
          <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {blogPosts.slice(0, 3).map((post) => (
              <div key={post.id} className="group cursor-pointer h-full">
                <Link href={`/blog/${post.slug}`} className="block h-full">
                  <div className="bg-white text-[#111111] rounded-none p-4 border-2 border-[#111111]/15 shadow-sm hover:border-[#EF2E55] hover:shadow-[0_20px_40px_rgba(239,46,85,0.15)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between h-full relative">
                    
                    <div>
                      <div className="relative aspect-[16/10] rounded-none overflow-hidden bg-[#f9f9f9]">
                        <Image 
                          src={post.image} 
                          alt={`${post.title} VocoTV subscription USA setup guide`} 
                          width={800} 
                          height={450} 
                          loading="lazy" 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                          sizes="(max-width: 768px) 100vw, 33vw" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                        
                        <div className="absolute top-3 left-3 flex items-center gap-2">
                          <span className="px-3 py-1 bg-[#EF2E55] text-white text-[10px] font-black uppercase tracking-widest rounded-none shadow-md border border-[#EF2E55]">
                            {post.author || "Setup Guide"}
                          </span>
                        </div>

                        <div className="absolute bottom-3 right-3">
                          <span className="px-2.5 py-1 bg-white/90 backdrop-blur-md text-[#111111] text-[10px] font-extrabold uppercase tracking-wider rounded-none border border-[#111111]/20 shadow-sm">
                            5 Min Read
                          </span>
                        </div>
                      </div>

                      <div className="p-4 pt-6">
                        <h3 className="text-lg font-black text-[#111111] mb-2.5 group-hover:text-[#EF2E55] transition-colors tracking-tight line-clamp-2 uppercase leading-snug">
                          {post.title}
                        </h3>

                        <p className="text-[#444444] text-xs font-semibold line-clamp-3 leading-relaxed mb-4">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="px-4 pb-3 pt-3 border-t border-[#111111]/10 flex items-center justify-between mt-auto">
                      <span className="inline-flex items-center gap-2 text-xs font-black text-[#EF2E55] uppercase tracking-wider group-hover:text-[#111111] transition-colors">
                        Read Article
                      </span>
                      
                      <div className="w-9 h-9 rounded-none bg-[#f9f9f9] border border-[#111111]/20 flex items-center justify-center text-[#EF2E55] group-hover:bg-[#EF2E55] group-hover:text-white group-hover:border-[#EF2E55] group-hover:scale-105 transition-all duration-300 shadow-sm">
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>

                  </div>
                </Link>
              </div>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative overflow-hidden py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-white w-full border-t border-[#EF2E55]/10">
        <div className="absolute inset-0 bg-[radial-gradient(#EF2E55_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-none border-2 border-[#111111]/20 bg-[#f9f9f9] shadow-2xl">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#EF2E55]/10 rounded-none blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#FFD700]/10 rounded-none blur-3xl pointer-events-none" />

            <div className="h-2 w-full bg-gradient-to-r from-[#111111] via-[#EF2E55] to-[#FFD700]" />

            <FadeIn className="relative z-10 px-5 py-10 text-center sm:px-8 sm:py-14 md:px-12 md:py-16 lg:px-16 lg:py-20">
              <div className="mb-6 inline-flex items-center gap-2 rounded-none border border-[#111111]/20 bg-white px-4 py-2 backdrop-blur-md shadow-sm">
                <ShieldCheck className="h-4 w-4 text-[#EF2E55]" />
                <span className="text-xs font-black uppercase tracking-widest text-[#111111] flex items-center gap-1.5">
                  VocoTV Service 🇺🇸
                </span>
              </div>
              
              <h2 className="mx-auto max-w-5xl text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight uppercase text-[#111111] leading-[1.05] mb-6">
                UPGRADE YOUR ENTERTAINMENT <br />
                <span className="text-[#EF2E55]">WITH VOCOTV TODAY</span>
              </h2>
              
              <p className="mx-auto mt-4 max-w-3xl text-sm sm:text-base md:text-lg font-medium leading-relaxed text-[#333333]">
                Pick your plan, message us on chat, and we will walk you through setup. Try the free trial first before activating your preferred VocoTV subscription. No long-term contracts required.
              </p>
              
              <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                {[
                  ['36K+', 'Live Channels'],
                  ['Ultra HD', 'Stream Quality'],
                  ['99.99%', 'Server Uptime'],
                  ['24/7', 'Technical Support'],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-none border border-[#111111]/15 bg-white p-4 shadow-sm hover:border-[#EF2E55] transition-colors">
                    <div className="text-2xl sm:text-3xl font-black text-[#111111]">{value}</div>
                    <div className="mt-1 text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-[#555555]">{label}</div>
                  </div>
                ))}
              </div>
              
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto">
                <Link 
                  href="/pricing" 
                  className="w-full sm:w-auto text-center whitespace-nowrap rounded-none bg-[#FFD700] px-8 py-4 text-xs sm:text-sm font-black uppercase tracking-widest text-black hover:bg-[#ffdf33] transition-all hover:scale-105 shrink-0 shadow-lg shadow-[#FFD700]/20 border border-[#FFD700]"
                >
                  Choose Your Plan
                </Link>
                <Link 
                  href="/firestick-setup" 
                  className="w-full sm:w-auto text-center whitespace-nowrap inline-flex items-center justify-center gap-2 rounded-none border border-[#111111]/30 bg-white px-8 py-4 text-xs sm:text-sm font-black uppercase tracking-widest text-[#111111] hover:bg-[#EF2E55] hover:text-white transition-all hover:scale-105 shrink-0 shadow-sm"
                >
                  <Settings className="h-4 w-4 text-[#EF2E55] shrink-0" /> Firestick Setup Guide
                </Link>
              </div>
              
              <p className="mt-8 text-[11px] sm:text-xs font-black text-[#EF2E55] uppercase tracking-wider">
                Free Trial First • Chat Guided Setup • Ongoing Support
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

    </div>
  );
}