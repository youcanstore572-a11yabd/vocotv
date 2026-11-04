// components/PartnerSlider.tsx
'use client';

// ✅ Client Component — guarantees keyframes land in the DOM before paint.
// ✅ Inline animation styles on the track — no class-name dependency.
// ✅ Unique alt text per image — no duplicate-content patterns.
// ✅ CSS marquee = composited animation, zero JS per frame.

import Image from 'next/image';
import { useEffect } from 'react';

// ---------------------------------------------------------------------------
// Static data — hoisted to module scope
// ---------------------------------------------------------------------------
type PartnerItem = {
  name: string;
  alt: string;
  imagePath: string;
  width: number;
  height: number;
};

const APP_PARTNERS: PartnerItem[] = [
  { name: 'Amazon Firestick', alt: 'Amazon Firestick 4K Max set up for streaming VocoTV' },
  { name: 'Samsung Smart TV', alt: 'Samsung QLED Smart TV running the Tizen IPTV player app' },
  { name: 'LG Smart TV', alt: 'LG OLED Smart TV with webOS streaming live sports and movies' },
  { name: 'Apple TV 4K', alt: 'Apple TV 4K box playing UHD IPTV through a tvOS player' },
  { name: 'Android TV', alt: 'Android TV box connected to a 4K television for live channels' },
  { name: 'Nvidia Shield', alt: 'Nvidia Shield Pro handling high bitrate IPTV without buffering' },
  { name: 'IBO Player Pro', alt: 'IBO Player Pro interface showing the electronic program guide' },
  { name: 'TiviMate Player', alt: 'TiviMate IPTV player displaying a full channel lineup and EPG' },
  { name: 'IPTV Smarters Pro', alt: 'IPTV Smarters Pro dashboard loading live and on-demand content' },
  { name: 'MAG & Formuler', alt: 'MAG and Formuler set-top boxes streaming via portal MAC address' },
].map((p, i) => ({
  ...p,
  imagePath: `/img/partners/iptv-usa-partners-${String(i + 1).padStart(2, '0')}.png`,
  width: 128,
  height: 128,
}));

const DEVICE_PARTNERS: PartnerItem[] = [
  { name: 'Samsung Smart TV', imagePath: '/img/devices/samsung.webp', alt: 'Samsung Smart TV app store icon for VocoTV', width: 128, height: 128 },
  { name: 'Roku Streaming Device', imagePath: '/img/devices/roku.webp', alt: 'Roku streaming stick with an IPTV player installed', width: 128, height: 128 },
  { name: 'Apple TV 4K', imagePath: '/img/devices/appletv.webp', alt: 'Apple TV 4K device and Siri remote side by side', width: 128, height: 128 },
  { name: 'Windows PC', imagePath: '/img/devices/windows.webp', alt: 'Windows 11 desktop running an IPTV player application', width: 128, height: 128 },
  { name: 'Amazon Fire TV', imagePath: '/img/devices/firetv.webp', alt: 'Amazon Fire TV Stick plugged into an HDMI port', width: 128, height: 128 },
  { name: 'Android TV', imagePath: '/img/devices/android.webp', alt: 'Android TV home screen with the IPTV app on the top row', width: 128, height: 128 },
  { name: 'Google TV', imagePath: '/img/devices/googletv.webp', alt: 'Google TV Chromecast remote and interface overview', width: 128, height: 128 },
  { name: 'LG Smart TV', imagePath: '/img/devices/lg.webp', alt: 'LG webOS home screen showing installed streaming apps', width: 128, height: 128 },
  { name: 'Sony Smart TV', imagePath: '/img/devices/sonny.webp', alt: 'Sony Bravia 4K TV displaying a live sports channel', width: 128, height: 128 },
];

// ---------------------------------------------------------------------------
// CSS injected at runtime via <style> element appended to <head>
// ---------------------------------------------------------------------------
const MARQUEE_CSS = `
  @keyframes iptvMarqueeLeft {
    from { transform: translate3d(0, 0, 0); }
    to   { transform: translate3d(-50%, 0, 0); }
  }
  @keyframes iptvMarqueeRight {
    from { transform: translate3d(-50%, 0, 0); }
    to   { transform: translate3d(0, 0, 0); }
  }
`;

function useMarqueeStyles() {
  useEffect(() => {
    const STYLE_ID = 'iptv-marquee-keyframes';
    // Prevent double injection in React 18 StrictMode
    if (document.getElementById(STYLE_ID)) return;

    const styleEl = document.createElement('style');
    styleEl.id = STYLE_ID;
    styleEl.textContent = MARQUEE_CSS;
    document.head.appendChild(styleEl);

    // No cleanup — we want the keyframes to persist for the app lifetime
  }, []);
}

// ---------------------------------------------------------------------------
// Row renderer
// ---------------------------------------------------------------------------
function MarqueeRow({
  items,
  direction,
  theme,
  ariaLabel,
  duration,
}: {
  items: PartnerItem[];
  direction: 'left' | 'right';
  theme: 'dark' | 'light';
  ariaLabel: string;
  duration: number;
}) {
  const isDark = theme === 'dark';
  const edgeFrom = isDark ? 'rgba(200, 200, 200, 0.31)' : '#f9f9f9';
  const rowBg = isDark ? 'bg-[#f9f9f9]' : 'bg-[#f9f9f9]';
  const logoFx = isDark
    ? 'grayscale hover:grayscale-0 opacity-80 hover:opacity-100 invert'
    : 'opacity-90 hover:opacity-100 hover:scale-105';

  const looped = [...items, ...items];

  // Inline animation — cannot fail on a missing CSS class
  const trackStyle: React.CSSProperties = {
    animationName: direction === 'left' ? 'iptvMarqueeLeft' : 'iptvMarqueeRight',
    animationDuration: `${duration}s`,
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    animationFillMode: 'both',
    willChange: 'transform',
    width: 'max-content',
    display: 'flex',
  };

  return (
    <div className={`relative w-full overflow-hidden ${rowBg} py-10 md:py-12 border-y border-[#EF233C]/20`}>
      {/* Edge masks — solid → transparent, matched to row background */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 md:w-32 z-10 pointer-events-none"
        style={{ background: `linear-gradient(to right, ${edgeFrom}, transparent)` }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 md:w-32 z-10 pointer-events-none"
        style={{ background: `linear-gradient(to left, ${edgeFrom}, transparent)` }}
      />

      <div
        className="gap-12 md:gap-16 items-center"
        style={trackStyle}
        role="list"
        aria-label={ariaLabel}
      >
        {looped.map((item, idx) => {
          const isDuplicate = idx >= items.length;
          return (
            <div
              key={`${item.name}-${idx}`}
              role="listitem"
              aria-hidden={isDuplicate ? true : undefined}
              className={`flex items-center justify-center min-w-[120px] md:min-w-[150px] transition-all duration-300 shrink-0 ${logoFx}`}
            >
              <div className="relative w-20 h-20 md:w-28 md:h-28 flex items-center justify-center">
                <Image
                  src={item.imagePath}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  className="object-contain w-full h-full drop-shadow-sm"
                  sizes="(max-width: 768px) 80px, 112px"
                  loading="lazy"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------------
export default function PartnerSlider() {
  useMarqueeStyles();

  return (
    <section
      className="w-full relative py-12 bg-white overflow-hidden"
      aria-label="Supported VocoTV apps and devices"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
        <h2 className="text-sm text-[#EF233C] font-black uppercase tracking-widest flex items-center justify-center gap-2">
          <span>Supported VocoTV Apps &amp; Devices</span>
        </h2>
      </div>

      {/* Row 1: Apps — Dark background, slides left */}
      <div className="relative w-full overflow-hidden mb-6">
        <MarqueeRow
          items={APP_PARTNERS}
          direction="left"
          theme="dark"
          ariaLabel="Supported IPTV apps"
          duration={30}
        />
      </div>

      {/* Row 2: Devices — Light background, slides right */}
      <div className="relative w-full overflow-hidden">
        <MarqueeRow
          items={DEVICE_PARTNERS}
          direction="right"
          theme="light"
          ariaLabel="Supported IPTV devices"
          duration={28}
        />
      </div>
    </section>
  );
}