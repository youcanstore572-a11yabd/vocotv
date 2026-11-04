// components/ArticleScrollSidebar.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Calendar,
  Clock,
  Tag,
  Sparkles,
  Zap,
  MessageCircle,
  Flame,
  Crown,
  CheckCircle2,
} from 'lucide-react';
import { CONSTANTS } from '@/lib/seo';

const BRAND = CONSTANTS.BRAND_NAME;

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------
function getCategoryLabel(post: any): string {
  if (post.category) {
    const map: Record<string, string> = {
      setup: 'Setup Guide',
      review: 'Review',
      sports: 'Live Sports',
      tips: 'Tips & Tricks',
      news: 'News',
    };
    return map[post.category] || post.category;
  }
  if (post.keywords && post.keywords.length > 0) return post.keywords[0];
  return 'Streaming Guide';
}

function getReadTime(post: any): number {
  if (post.readTime) {
    const match = String(post.readTime).match(/(\d+)/);
    if (match) return parseInt(match[1]);
  }
  const words = (post.content || '')
    .replace(/<[^>]*>/g, '')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(3, Math.ceil(words / 200));
}

function formatDateShort(dateStr: string): string {
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
// SIDEBAR
// ---------------------------------------------------------------------------
export default function ArticleScrollSidebar({
  relatedPosts,
  whatsappIboMsg,
  whatsappSubMsg,
}: {
  relatedPosts: any[];
  whatsappIboMsg: string;
  whatsappSubMsg: string;
}) {
  return (
    <aside className="lg:col-span-4 order-2 lg:order-2 lg:self-start lg:sticky lg:top-24">
      <div className="space-y-6">
        {/* =====================================================
            Card 1 — IPTV Smarters Pro (recommended player)
        ===================================================== */}
        <div className="bg-[#f9f9f9] border-2 border-[#111111]/15 rounded-none p-6 shadow-sm relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#EF233C]/5 rounded-none blur-2xl pointer-events-none" />

          <div className="inline-flex items-center gap-1.5 bg-[#EF233C] text-white px-3 py-1 rounded-none text-[10px] font-black uppercase tracking-widest mb-3 shadow-sm">
            <Flame className="w-3.5 h-3.5" /> Recommended Player
          </div>

          <h2 className="text-lg sm:text-xl font-black text-[#111111] uppercase tracking-tight mb-2">
            Get IPTV Smarters Pro Access
          </h2>
          <p className="text-[#333333] text-xs sm:text-sm font-bold leading-relaxed mb-3">
            IPTV Smarters Pro is one of our top picks for fast, secure playback with minimal buffering. Our team helps you get set up on chat and stays on hand throughout your whole subscription.
          </p>
          <p className="text-[#555555] text-[11px] font-bold uppercase tracking-wider mb-6">
            Included with every VocoTV plan · Works alongside IBO Player Pro
          </p>

          <a
            href={`${CONSTANTS.CONTACT.whatsappUrl}?text=${whatsappIboMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-none bg-[#FFD700] text-black font-black text-xs uppercase tracking-wider hover:bg-[#ffdf33] transition-all shadow-md hover:scale-105 border border-[#FFD700]"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Get IPTV Smarters Pro</span>
          </a>
        </div>

        {/* =====================================================
            Card 2 — Official Plans (Modern Dark with Pink/Gold)
        ===================================================== */}
        <div className="relative rounded-none overflow-hidden shadow-xl border border-[#FFD700]/40">
          <div className="absolute inset-0 bg-gradient-to-br from-[#EF233C] via-[#2a0814] to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,215,0,0.15),_transparent_60%)] pointer-events-none" />
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, #FFFFFF 1px, transparent 1px), linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }}
          />

          <div className="relative z-10 p-6 text-white">
            <div className="inline-flex items-center gap-1.5 bg-[#FFD700] text-black px-3 py-1 rounded-none text-[10px] font-black uppercase tracking-widest mb-4 shadow-md border border-black">
              <Crown className="w-3.5 h-3.5" /> Official Plans
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mb-2 drop-shadow-md">
              {BRAND} <br />
              <span className="text-[#FFD700]">Subscriptions</span>
            </h2>
            <p className="text-white/85 text-xs sm:text-sm font-bold leading-relaxed mb-6">
              36,000+ live channels · 120,000+ movies &amp; TV shows · 4K Ultra HD · Anti freeze servers.
            </p>

            <div className="space-y-3">
              {/* Standard */}
              <div className="group bg-[#f9f9f9] text-[#111111] border border-[#111111]/15 rounded-none p-4 hover:border-[#EF233C] hover:-translate-y-0.5 transition-all shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-none bg-[#EF233C]/10 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-[#EF233C]" />
                    </div>
                    <span className="text-[#111111] font-black text-sm uppercase tracking-tight">
                      Standard
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-[#EF233C] font-black text-xl leading-none">
                      $35
                    </div>
                    <div className="text-[9px] font-black uppercase tracking-wider text-[#555555] mt-0.5">
                      3 Months
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3 text-[10px] font-bold text-[#333333]">
                  <CheckCircle2 className="w-3 h-3 text-[#EF233C]" />
                  <span>Set up on chat in minutes</span>
                </div>
                <a
                  href={`${CONSTANTS.CONTACT.whatsappUrl}?text=${whatsappSubMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-2.5 rounded-none bg-[#FFD700] text-black hover:bg-[#ffdf33] transition-all font-black text-[10px] uppercase tracking-widest block border border-[#FFD700]"
                >
                  Order on Chat
                </a>
              </div>

              {/* VIP */}
              <div className="group relative bg-black text-white border-2 border-[#FFD700] rounded-none p-4 hover:border-[#ffdf33] hover:-translate-y-0.5 transition-all shadow-xl">
                <div className="absolute -top-3 right-4 bg-[#FFD700] text-black px-2.5 py-0.5 rounded-none text-[9px] font-black uppercase tracking-widest shadow-md border border-black">
                  ⭐ Best Value
                </div>

                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-none bg-[#FFD700]/20 flex items-center justify-center">
                      <Crown className="w-4 h-4 text-[#FFD700]" />
                    </div>
                    <span className="text-white font-black text-sm uppercase tracking-tight">
                      12 Months VIP
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-[#FFD700] font-black text-xl leading-none">
                      $89
                    </div>
                    <div className="text-[9px] font-black uppercase tracking-wider text-white/60 mt-0.5">
                      Save 50%
                    </div>
                  </div>
                </div>

                <div className="space-y-1 mb-3">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-white/85">
                    <CheckCircle2 className="w-3 h-3 text-[#FFD700]" />
                    <span>4K Anti Freeze Servers</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-white/85">
                    <CheckCircle2 className="w-3 h-3 text-[#FFD700]" />
                    <span>Free 24 hour trial before you pay</span>
                  </div>
                </div>

                <a
                  href={`${CONSTANTS.CONTACT.whatsappUrl}?text=${whatsappSubMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-2.5 rounded-none bg-[#FFD700] text-black hover:bg-[#ffdf33] transition-all font-black text-[10px] uppercase tracking-widest block shadow-lg hover:scale-105 border border-[#FFD700]"
                >
                  Order VIP on Chat
                </a>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-white/20 text-center">
              <Link
                href="/pricing"
                className="text-xs font-black text-white uppercase tracking-wider hover:underline inline-flex items-center gap-1 group"
              >
                View all US VocoTV plans
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-[#FFD700]" />
              </Link>
            </div>
          </div>
        </div>

        {/* =====================================================
            Card 3 — Related Articles
        ===================================================== */}
        {relatedPosts.length > 0 && (
          <div className="bg-[#f9f9f9] border-2 border-[#111111]/15 rounded-none p-5 shadow-sm">
            <h2 className="text-lg font-black text-[#111111] uppercase tracking-tight mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#EF233C]" /> Related Articles
            </h2>

            <div className="space-y-4">
              {relatedPosts.map((relPost) => {
                const relCategory = getCategoryLabel(relPost);
                const relReadTime = getReadTime(relPost);
                const relDate = formatDateShort(relPost.date);

                return (
                  <Link
                    key={relPost.slug}
                    href={`/blog/${relPost.slug}`}
                    className="group block bg-[#f9f9f9] rounded-none overflow-hidden border border-[#111111]/15 hover:border-[#EF233C] hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-black">
                      <Image
                        src={relPost.image}
                        alt={relPost.title}
                        width={400}
                        height={250}
                        loading="lazy"
                        sizes="(max-width: 1024px) 100vw, 350px"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />

                      <div className="absolute top-2 left-2 z-10">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-none bg-[#EF233C] text-white text-[9px] font-black uppercase tracking-wider shadow-sm">
                          <Tag className="w-2.5 h-2.5" />
                          {relCategory}
                        </span>
                      </div>

                      <div className="absolute top-2 right-2 z-10">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-none bg-black/80 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-wider border border-white/15">
                          <Clock className="w-2.5 h-2.5" />
                          {relReadTime} min
                        </span>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-[#555555] mb-2">
                        <Calendar className="w-3 h-3 text-[#EF233C]" />
                        <span>{relDate}</span>
                      </div>

                      <h3 className="text-sm font-black text-[#111111] uppercase tracking-tight leading-snug mb-2 line-clamp-2 group-hover:text-[#EF233C] transition-colors">
                        {relPost.title}
                      </h3>

                      <p className="text-[#333333] text-xs font-medium leading-relaxed line-clamp-2 mb-3">
                        {relPost.description || relPost.excerpt}
                      </p>

                      <div className="pt-3 border-t border-[#111111]/10 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 text-[#EF233C] font-black text-[10px] uppercase tracking-widest group-hover:gap-2 transition-all">
                          Read
                          <ArrowRight className="w-3 h-3" />
                        </span>
                        <div className="w-6 h-6 rounded-none bg-[#EF233C]/10 border border-[#EF233C]/30 flex items-center justify-center text-[#EF233C] group-hover:bg-[#FFD700] group-hover:text-black group-hover:border-[#FFD700] transition-all duration-300">
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}