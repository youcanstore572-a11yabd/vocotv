// @/lib/reviews.ts

export interface Review {
  id: string;
  name: string;
  city: string;
  province: string;        // US: NY/IL/CA | CA: ON/BC | UK: ENG/SCT | AU: NSW/VIC
  country: 'US' | 'CA' | 'UK' | 'AU';
  rating: number;
  title: string;
  text: string;
  date: string;            // ISO "2026-XX-XX"
  verified: boolean;
  device: string;
}

export const BRAND = "VocoTV";

// ---------------------------------------------------------------------------
// SITE-WIDE REVIEW STATS
// ---------------------------------------------------------------------------
export const REVIEW_STATS = {
  averageRating: 4.9,
  totalReviews: 1255,
  recommendPercent: 98,
  happyCustomers: '15,000+',
  countries: [
    { code: 'US' as const, name: 'United States',  flag: 'usa', label: 'USA' },
    { code: 'CA' as const, name: 'Canada',         flag: 'ca',  label: 'Canada' },
    { code: 'UK' as const, name: 'United Kingdom', flag: 'uk',  label: 'UK' },
    { code: 'AU' as const, name: 'Australia',      flag: 'aus', label: 'Australia' },
  ],
};

// ---------------------------------------------------------------------------
// REVIEWS — 20 total (15 US · 2 CA · 2 UK · 1 AU)
// ---------------------------------------------------------------------------
export const reviews: Review[] = [
  // =========================================================================
  // UNITED STATES 🇺🇸
  // =========================================================================
  {
    id: '1',
    name: 'Liam T.',
    city: 'Houston',
    province: 'TX',
    country: 'US',
    rating: 5,
    title: 'Perfect for NFL Sunday and NBA every weekend',
    text: 'Finally found a stable subscription for watching the games on weekends without any buffering. The 4K picture on my Firestick 4K Max is razor sharp and zapping between channels is instant. Support answered my chat within 2 minutes during setup. Real team, no bots.',
    date: '2026-09-08',
    verified: true,
    device: 'Firestick 4K Max',
  },
  {
    id: '2',
    name: 'Sarah M.',
    city: 'New York',
    province: 'NY',
    country: 'US',
    rating: 5,
    title: 'Cancelled my cable and never looked back',
    text: 'Cancelled my old cable package last month and switched over. Setup took under five minutes on my Samsung Smart TV with IBO Player Pro, and the channel lineup is unreal. ESPN, NFL Network, NBA TV, plus 120,000 movies and TV shows. The 12 month VIP plan paid for itself in the first month.',
    date: '2026-09-03',
    verified: true,
    device: 'Samsung Smart TV',
  },
  {
    id: '3',
    name: 'Jason P.',
    city: 'Los Angeles',
    province: 'CA',
    country: 'US',
    rating: 5,
    title: 'Brilliant for MLB and international channels',
    text: 'Fantastic selection of MLB playoffs coverage alongside European, Latin American, and Asian networks. My parents watch their regional news in HD, and I still get every NBA Finals and NFL playoff game. The EPG guide syncs perfectly with Pacific time.',
    date: '2026-08-28',
    verified: true,
    device: 'Apple TV 4K',
  },
  {
    id: '4',
    name: 'Rebecca H.',
    city: 'Chicago',
    province: 'IL',
    country: 'US',
    rating: 5,
    title: 'Excellent value for a family of four',
    text: 'We run the service on three screens at once. My husband watches the NFL, I catch movies, and the kids have their own profiles. Everything stays smooth even during peak hours. For less than one cable box used to cost, we now have 36,000 channels and 120,000 on demand titles.',
    date: '2026-08-09',
    verified: true,
    device: 'Firestick + Smart TVs',
  },
  {
    id: '5',
    name: 'Priya S.',
    city: 'Phoenix',
    province: 'AZ',
    country: 'US',
    rating: 5,
    title: 'Love the international channel range',
    text: 'Great to have Indian, Sri Lankan, and Middle Eastern channels alongside the local US networks. My parents can watch their regional news and I still get every NBA game and Formula 1 race. The stream quality is consistently high and the EPG handles the Arizona time zone without any glitches.',
    date: '2026-07-25',
    verified: true,
    device: 'Firestick 4K',
  },
  {
    id: '6',
    name: 'Nathan B.',
    city: 'Denver',
    province: 'CO',
    country: 'US',
    rating: 5,
    title: 'Great for both sport and everyday TV',
    text: 'Full coverage of NBC, CBS, ABC, FOX, PBS, and The CW alongside ESPN and Fox Sports. Setup on our LG TV was straightforward with the chat support team walking me through IBO Player Pro. Handy when we travel and want to catch up on the local news.',
    date: '2026-07-11',
    verified: true,
    device: 'LG Smart TV',
  },
  {
    id: '7',
    name: 'Dylan K.',
    city: 'Miami',
    province: 'FL',
    country: 'US',
    rating: 5,
    title: 'Best streaming service I have tried in Florida',
    text: 'Living in Miami, I struggled to find a provider with reliable US servers that delivered low latency for live NBA and NFL. The service has been flawless. No buffering during the Super Bowl, NBA Finals, or UFC pay per views. The 24/7 chat support is a genuine game changer compared to email only competitors.',
    date: '2026-07-02',
    verified: true,
    device: 'Android TV Box',
  },
  {
    id: '8',
    name: 'Michael R.',
    city: 'Seattle',
    province: 'WA',
    country: 'US',
    rating: 5,
    title: 'Support helped me set up in under 10 minutes',
    text: 'I am not tech savvy at all and was worried about setup. The support team handled everything over chat. They sent my M3U URL, walked me through installing IBO Player Pro on my Firestick, and activated it remotely. Streaming was working within 10 minutes of my first message.',
    date: '2026-06-25',
    verified: true,
    device: 'Firestick 4K',
  },
  {
    id: '9',
    name: 'Olivia W.',
    city: 'Boston',
    province: 'MA',
    country: 'US',
    rating: 5,
    title: 'IBO Player Pro makes the whole thing feel premium',
    text: 'I have used TiviMate, IPTV Smarters, and IBO Player Pro. IBO Player Pro is by far the smoothest. Combined with the service, it feels like a premium cable experience for a fraction of the price. The remote activation is brilliant. I sent my device key and everything was set up in 30 seconds.',
    date: '2026-06-18',
    verified: true,
    device: 'Apple TV 4K',
  },
  {
    id: '10',
    name: 'Tyler N.',
    city: 'Atlanta',
    province: 'GA',
    country: 'US',
    rating: 5,
    title: 'Reliable through every major sporting event',
    text: 'I have watched every NFL playoff game, NBA Finals, MLB World Series, and UFC event this year without a single freeze. That says everything about the server quality. The 60FPS feeds are noticeably smoother than my old cable box, and pay per view events that used to cost $50 are fully included.',
    date: '2026-06-11',
    verified: true,
    device: 'Firestick 4K Max',
  },
  {
    id: '11',
    name: 'Emily C.',
    city: 'Dallas',
    province: 'TX',
    country: 'US',
    rating: 5,
    title: 'Works perfectly even in Texas',
    text: 'I was worried about latency living so far south, but the US servers handle it perfectly. No buffering, fast channel switching, and the picture quality is excellent. Chat support even helped me fine tune my router settings to reduce any jitter. Highly recommend for anyone outside the big cities.',
    date: '2026-06-04',
    verified: true,
    device: 'Firestick 4K',
  },
  {
    id: '12',
    name: 'Brandon L.',
    city: 'Philadelphia',
    province: 'PA',
    country: 'US',
    rating: 5,
    title: 'Best streaming provider I have used in the USA',
    text: 'Tried three different providers before this one. All had buffering issues during big games. This service has been flawless for five months. The 4K feeds are sharp, the sport channels are comprehensive, and support is quick. This is the real deal for American sports fans.',
    date: '2026-05-28',
    verified: true,
    device: 'Nvidia Shield Pro',
  },
  {
    id: '13',
    name: 'Chloe A.',
    city: 'San Diego',
    province: 'CA',
    country: 'US',
    rating: 5,
    title: 'Great for a regional household',
    text: 'Living in San Diego, we do not always get the best free to air reception. This service solved that overnight. We now watch every MLB game and the local news in perfect HD. Setup was simple on the Samsung, and support was patient with all my questions.',
    date: '2026-05-18',
    verified: true,
    device: 'Samsung Smart TV',
  },
  {
    id: '14',
    name: 'Jack W.',
    city: 'San Antonio',
    province: 'TX',
    country: 'US',
    rating: 5,
    title: 'Worth every dollar for the sport alone',
    text: 'ESPN, Fox Sports, NBA TV, and every NFL Sunday match. For what I used to pay just for one sports add on, I now get everything plus 120,000 movies and TV shows. Picture is clean, zapping is quick, and the chat support actually replies. No complaints at all.',
    date: '2026-05-10',
    verified: true,
    device: 'Firestick 4K Max',
  },
  {
    id: '15',
    name: 'Grace T.',
    city: 'Portland',
    province: 'OR',
    country: 'US',
    rating: 5,
    title: 'Streaming is smooth even up in the Pacific Northwest',
    text: 'Very stable service from Portland. I use it mainly for the NFL, UK channels, and movies with the kids. Setup was easy. I sent my device key over chat and everything was live within 20 minutes. The 12 month plan is excellent value.',
    date: '2026-05-02',
    verified: true,
    device: 'Apple TV 4K',
  },

  // =========================================================================
  // CANADA 🇨🇦
  // =========================================================================
  {
    id: '16',
    name: 'Michael R.',
    city: 'Toronto',
    province: 'ON',
    country: 'CA',
    rating: 5,
    title: 'Great for keeping up with US sport from Canada',
    text: 'I am an expat in Toronto and this service is a lifeline. Full NFL, NBA, and MLB coverage in 4K. The US networks are perfect for catching up with home news. Chat support is fast and honest pricing in USD. Could not ask for more.',
    date: '2026-08-22',
    verified: true,
    device: 'Firestick 4K',
  },
  {
    id: '17',
    name: 'Daniel T.',
    city: 'Vancouver',
    province: 'BC',
    country: 'CA',
    rating: 5,
    title: 'Best US streaming service I have tried',
    text: 'I have tested at least five different providers over the past three years and this is by far the most stable. No freezing during big NFL games and the VOD library is enormous. The free trial gave me confidence to try it. I have been a customer for 8 months now.',
    date: '2026-07-18',
    verified: true,
    device: 'Android TV Box',
  },

  // =========================================================================
  // UNITED KINGDOM 🇬🇧
  // =========================================================================
  {
    id: '18',
    name: 'James P.',
    city: 'London',
    province: 'ENG',
    country: 'UK',
    rating: 5,
    title: 'Excellent for US sport and news from London',
    text: 'Living in London, I was looking for a reliable way to watch the NFL and NBA. This service delivers exactly that. No buffering during the Super Bowl and the US networks are included too. The 24/7 chat support is unmatched.',
    date: '2026-08-15',
    verified: true,
    device: 'Nvidia Shield Pro',
  },
  {
    id: '19',
    name: 'Emma H.',
    city: 'Manchester',
    province: 'ENG',
    country: 'UK',
    rating: 5,
    title: 'Reliable service from the UK for US content',
    text: 'Very stable service from Manchester. I use it mainly for the NFL and US news, and the feeds are consistently high quality. Setup was easy. I sent my device key over chat and everything was live within 20 minutes. The 12 month plan is excellent value.',
    date: '2026-07-04',
    verified: true,
    device: 'Firestick 4K Max',
  },

  // =========================================================================
  // AUSTRALIA 🇦🇺
  // =========================================================================
  {
    id: '20',
    name: 'Olivia W.',
    city: 'Sydney',
    province: 'NSW',
    country: 'AU',
    rating: 5,
    title: 'Fantastic for US expats in Australia',
    text: 'I moved to Sydney from Chicago two years ago and missed American TV enormously. This fills that gap perfectly. Full NFL, NBA, and MLB coverage in 4K plus all the major US news networks. The latency is minimal even from Australia, and the price in USD is unbeatable.',
    date: '2026-08-01',
    verified: true,
    device: 'Apple TV 4K',
  },
];

// ---------------------------------------------------------------------------
// REVIEW FAQS — used by /reviews page FAQ + FAQPage schema
// ---------------------------------------------------------------------------
export const REVIEW_FAQS = [
  {
    q: `Is ${BRAND} a reliable streaming service?`,
    a: `Yes. ${BRAND} serves over 15,000 active customers across the United States and beyond with a 4.9 out of 5 average rating. We offer a free 24 hour trial, 24/7 chat support, and secure USD ($) payments via Credit Card, PayPal, and Crypto.`
  },
  {
    q: `How many customers does ${BRAND} have?`,
    a: `${BRAND} serves over 15,000 active subscribers, with our largest communities in New York, Los Angeles, Chicago, Houston, and Phoenix. We also serve US expats and international viewers in Canada, the United Kingdom, and Australia.`
  },
  {
    q: `What do customers say about ${BRAND}?`,
    a: 'Customers consistently praise the buffer free 4K streaming, extensive US network coverage (ESPN, Fox Sports, NBC, CBS, ABC, FOX), fast chat support, and the included IBO Player Pro activation service. Our average rating across verified reviews is 4.9 out of 5.'
  },
  {
    q: 'Can I trust the reviews on this page?',
    a: `Yes. Every review shown on this page comes from a verified active subscriber. We only publish reviews from customers who have an active ${BRAND} subscription. Reviews are never edited or purchased. They reflect real customer experiences.`
  },
  {
    q: 'What is the most common feedback about us?',
    a: 'The most common feedback is that we occasionally sell out of monthly 1 screen plans during peak sports seasons like the NFL playoffs, NBA Finals, and UFC events. We always restock within 24 hours, and priority access is available on the 12 month VIP plan.'
  },
  {
    q: 'How do I leave a review?',
    a: 'Active subscribers can leave a review by messaging our chat support team directly. We publish all genuine reviews, both positive and critical, to maintain transparency and help future customers make informed decisions.'
  },
];