// components/MovieSlider.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useMemo } from 'react';

// ---------------------------------------------------------------------------
// IMAGE COUNTS
// ---------------------------------------------------------------------------
const MOVIES_COUNT = 16;
const SERIES_COUNT = 16;
const SPORTS_COUNT = 14;

// ---------------------------------------------------------------------------
// UNIQUE TITLES — one per image, no duplicates
// ---------------------------------------------------------------------------
const MOVIE_TITLES = [
  'Latest Action Blockbuster',
  'Top-Rated Drama Film',
  '4K Sci-Fi Cinema Release',
  'Award-Winning Thriller',
  'Family Adventure Movie',
  'Epic Fantasy Feature',
  'Bestselling Comedy Film',
  'Classic Cinema Remaster',
  'International Box Office Hit',
  'Superhero Movie Premiere',
  'Suspense Mystery Film',
  'Hollywood Romance Release',
  'Historical War Drama',
  'Animated Feature Film',
  'Crime Documentary Feature',
  'Independent Cinema Pick',
];

const SERIES_TITLES = [
  'Trending Drama Series',
  'Binge-Worthy Crime Show',
  'Award-Winning TV Series',
  'Sci-Fi Streaming Series',
  'Comedy Sitcom Boxset',
  'Popular Fantasy Series',
  'Reality TV Show Collection',
  'Mystery Thriller Series',
  'Historical Period Drama',
  'Medical Drama Series',
  'Animated Series for Adults',
  'Romantic Drama Boxset',
  'Political Thriller Show',
  'Superhero TV Series',
  'Documentary Series Collection',
  'International Streaming Series',
];

const SPORTS_TITLES = [
  'Live NFL Sunday Match',
  'NBA Basketball Live Game',
  'Premier League Soccer Match',
  'UFC Pay-Per-View Event',
  'Formula 1 Race Broadcast',
  'MLB Baseball Live Game',
  'NHL Hockey Broadcast',
  'College Football Live Match',
  'Tennis Grand Slam Match',
  'Boxing Championship Fight',
  'ESPN Live Sports Stream',
  'Golf PGA Tour Live',
  'MLS Soccer Match',
  'WWE Main Event Broadcast',
];

// ---------------------------------------------------------------------------
// UNIQUE ALT TEXT — one per image, all structurally different
// ---------------------------------------------------------------------------
const MOVIE_ALTS = [
  'Action blockbuster now streaming in 4K Ultra HD for US subscribers',
  'Award-winning drama film available in the on-demand movie library',
  'Sci-fi cinema release playing in sharp UHD on Smart TV and Firestick',
  'Suspense thriller movie ready to watch tonight on VocoTV',
  'Family adventure film streaming without buffering during peak hours',
  'Epic fantasy feature showing in HDR quality on any connected device',
  'Top-rated comedy film added to the VOD catalog this week',
  'Restored classic cinema remastered for 4K displays',
  'International box office hit with original audio and English subtitles',
  'Superhero premiere available immediately after theatrical release',
  'Mystery film streaming on demand across every US time zone',
  'Hollywood romance title included with all active plans',
  'Historical war drama with cinematic 5.1 surround sound',
  'Animated family feature ready to stream on Firestick and Roku',
  'Investigative crime documentary from an award-winning director',
  'Independent film selection curated by our editorial team',
];

const SERIES_ALTS = [
  'Full-season drama series available to binge in a single weekend',
  'Crime investigation show with new episodes added weekly',
  'Emmy-nominated TV series streaming in original broadcast quality',
  'Science fiction series with multi-season boxsets ready to watch',
  'Sitcom collection bringing back classic primetime comedy',
  'Fantasy epic series with immersive world-building and lore',
  'Reality television seasons refreshed on a rolling schedule',
  'Mystery thriller series designed for one-episode-per-night viewing',
  'Period drama capturing historical detail in every episode',
  'Medical drama with full character arcs and season finales',
  'Adult animation series streaming uncensored and uncut',
  'Romantic drama boxset with over 40 episodes per season',
  'Political thriller following a single story arc across 10 episodes',
  'Superhero series tied to the broader cinematic universe',
  'Nature and science documentaries from leading global studios',
  'International streaming series in original language with subtitles',
];

const SPORTS_ALTS = [
  'Live NFL Sunday match with pre-game analysis and post-game coverage',
  'NBA regular season game streaming at 60 frames per second',
  'Premier League soccer fixture including halftime highlight reels',
  'UFC numbered event with full main card and prelims',
  'Formula 1 race weekend including practice, qualifying, and Grand Prix',
  'MLB divisional matchup with local broadcast commentary',
  'NHL regular season game covering both Eastern and Western conferences',
  'College football Saturday game with full conference coverage',
  'Grand Slam tennis match across singles, doubles, and mixed draws',
  'Championship boxing main event with undercard bouts',
  'ESPN live broadcast covering multiple sports in one stream',
  'PGA Tour round with featured groups and final-hole coverage',
  'MLS soccer match including full regular season schedule',
  'Wrestling main event with pay-per-view exclusive matches',
];

// ---------------------------------------------------------------------------
// DATA ARRAYS
// ---------------------------------------------------------------------------
const movies = Array.from({ length: MOVIES_COUNT }).map((_, i) => {
  const number = String(i + 1).padStart(2, '0');
  return {
    id: `movie-${i}`,
    title: MOVIE_TITLES[i],
    imagePath: `/img/sliders/movies/iptv-usa-movies-${number}`,
    alt: MOVIE_ALTS[i],
  };
});

const series = Array.from({ length: SERIES_COUNT }).map((_, i) => {
  const number = String(i + 1).padStart(2, '0');
  return {
    id: `series-${i}`,
    title: SERIES_TITLES[i],
    imagePath: `/img/sliders/series/iptv-usa-serie-${number}`,
    alt: SERIES_ALTS[i],
  };
});

const sports = Array.from({ length: SPORTS_COUNT }).map((_, i) => {
  const number = String(i + 1).padStart(2, '0');
  return {
    id: `sport-${i}`,
    title: SPORTS_TITLES[i],
    imagePath: `/img/sliders/sports/iptv-usa-sports-${number}`,
    alt: SPORTS_ALTS[i],
  };
});

const scrollToPricing = () => {
  const pricingSection = document.getElementById('pricing-section');
  if (pricingSection) {
    pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// ---------------------------------------------------------------------------
// INFINITE SLIDER
// ---------------------------------------------------------------------------
const InfiniteSlider = ({
  items,
  direction = 'left',
  speed = 50,
  category,
  fadeBgColor = '#ffffff',
  cardBorderColor = '#111111/15',
}: {
  items: { id: string; title: string; imagePath: string; alt: string }[];
  direction?: 'left' | 'right';
  speed?: number;
  category: string;
  fadeBgColor?: string;
  cardBorderColor?: string;
}) => {
  const [failedImages, setFailedImages] = useState<{ [key: string]: boolean }>({});
  const infiniteItems = useMemo(() => [...items, ...items], [items]);
  const duration = (items.length * speed) / 10;

  return (
    <div className="relative w-full overflow-hidden py-3">
      {/* Side Fades */}
      <div
        className="absolute left-0 top-0 bottom-0 w-20 md:w-36 z-10 pointer-events-none"
        style={{ background: `linear-gradient(to right, ${fadeBgColor}, transparent)` }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-20 md:w-36 z-10 pointer-events-none"
        style={{ background: `linear-gradient(to left, ${fadeBgColor}, transparent)` }}
      />

      <motion.div
        className="flex w-max gap-4 md:gap-6 px-4"
        animate={{ x: direction === 'left' ? [0, '-50%'] : ['-50%', 0] }}
        transition={{ repeat: Infinity, repeatType: 'loop', duration, ease: 'linear' }}
      >
        {infiniteItems.map((item, idx) => {
          const key = `${item.id}-${idx}`;
          const isFirstHalf = idx < items.length;
          const isPriority = isFirstHalf && idx < 6;
          const isDuplicate = idx >= items.length;

          return (
            <button
              key={key}
              onClick={scrollToPricing}
              tabIndex={isDuplicate ? -1 : 0}
              aria-hidden={isDuplicate ? true : undefined}
              aria-label={isDuplicate ? undefined : item.title}
              className="flex-shrink-0 w-32 sm:w-40 md:w-48 lg:w-52 block cursor-pointer group text-left bg-transparent border-none p-0 transition-transform duration-300 hover:-translate-y-2"
            >
              <div
                className="relative aspect-[2/3] rounded-none overflow-hidden bg-black border border-black/15 shadow-sm group-hover:shadow-md transition-all duration-300"
              >
                {!failedImages[key] ? (
                  <Image
                    src={`${item.imagePath}.webp`}
                    alt={item.alt}
                    width={208}
                    height={312}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="eager"
                    priority={isPriority}
                    sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 192px, 208px"
                    onError={() =>
                      setFailedImages((prev) => ({ ...prev, [key]: true }))
                    }
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-black p-3 text-center">
                    <span className="text-[#FFD700] text-xs font-black uppercase tracking-widest">
                      {category}
                    </span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </motion.div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// MAIN SECTION
// ---------------------------------------------------------------------------
export default function MovieSlider() {
  return (
    <section className="w-full" aria-label="US VocoTV media catalog overview">
      {/* ROW 1: Movies (Light Background) */}
      <div className="w-full py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-none bg-[#111111] text-[#FFD700] text-xs font-black uppercase tracking-wider">
              4K Cinema
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#111111] uppercase tracking-tight">
              Latest Blockbuster Releases
            </h2>
          </div>
          <p className="text-[#333333] text-sm mt-2 font-semibold hidden md:block max-w-2xl">
            Part of our 120,000+ movies and TV shows library. Stream the newest cinema hits in crystal clear Ultra HD, ready to watch on any device you own.
          </p>
        </div>
        <InfiniteSlider
          items={movies}
          direction="left"
          speed={45}
          category="Movie"
          fadeBgColor="#ffffff"
          cardBorderColor="#111111/15"
        />
      </div>

      {/* ROW 2: Series (Dark Background with Neon Accent) */}
      <div className="w-full py-12 sm:py-16 bg-[#111111] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-none bg-[#EF233C] text-white text-xs font-black uppercase tracking-wider">
              VOD Series
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              Trending TV Shows &amp; Series
            </h2>
          </div>
          <p className="text-white/80 text-sm mt-2 font-medium hidden md:block max-w-2xl">
            Binge complete boxsets from leading global networks. Fresh titles land every day across our US VocoTV service.
          </p>
        </div>
        <InfiniteSlider
          items={series}
          direction="right"
          speed={40}
          category="Series"
          fadeBgColor="#111111"
          cardBorderColor="rgba(255,215,0,0.5)"
        />
      </div>

      {/* ROW 3: Sports (Light Background) */}
      <div className="w-full py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-none bg-[#EF233C] text-white text-xs font-black uppercase tracking-wider">
              Live Sports
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#111111] uppercase tracking-tight">
              Live Sports &amp; PPV Events 🇺🇸
            </h2>
          </div>
          <p className="text-[#333333] text-sm mt-2 font-semibold hidden md:block max-w-2xl">
            Catch every match live, including NFL Sunday, NBA, MLB, NHL, college football, ESPN, Formula 1, and PPV fight nights.
          </p>
        </div>
        <InfiniteSlider
          items={sports}
          direction="left"
          speed={50}
          category="Sports"
          fadeBgColor="#ffffff"
          cardBorderColor="#111111/15"
        />
      </div>
    </section>
  );
}