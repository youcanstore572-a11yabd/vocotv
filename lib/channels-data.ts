// @/lib/channels-data.ts

// ===========================================================================
// COUNTRY CODE TYPE (exported so other files can import it)
// ===========================================================================
export type CountryCode = 'US' | 'UK' | 'CA' | 'AU' | 'EU' | 'CN' | 'IN' | 'PK' | 'JP' | 'KR' | 'ME' | 'PH' | 'TH' | 'VN' | 'ID' | 'MY' | 'NZ';

// ===========================================================================
// CHANNEL INTERFACE
// ===========================================================================
export interface Channel {
  name: string;
  quality: '4K UHD' | 'FHD 60FPS' | 'HD';
  genre?: string;
  description: string;
  whyWatch?: string;
  country?: CountryCode;
  popular?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ChannelCategory {
  slug: string;
  name: string;
  totalChannels: number;
  description: string;
  longDescription: string;
  keywords: string[];
  channels: Channel[];
  faqs: FAQItem[];
  featured?: boolean;
}

// ---------------------------------------------------------------------------
// CATEGORIES
// ---------------------------------------------------------------------------
export const channelsData: ChannelCategory[] = [
  // =========================================================================
  // 1. SPORTS — Global
  // =========================================================================
  {
    slug: 'sports',
    name: 'All Sports Channels',
    totalChannels: 3000,
    description:
      'Every major sport from around the world in smooth 60FPS. Includes ESPN, Fox Sports, NFL Network, NBA TV, MLB Network, NHL Network, TNT Sports, Sky Sports, plus every NFL, NBA, MLB, NHL, college football, Premier League, UFC, and Formula 1 match.',
    longDescription:
      'Traditional cable providers force sports fans into expensive tiered packages with long lock in contracts. With IPTV Subscription, you unlock the complete global sports universe. ESPN, Fox Sports, NFL Network, NBA TV, MLB Network, NHL Network, Sky Sports, plus every NFL, NBA, MLB, NHL, college football, Premier League, UFC, and Formula 1 match at a fraction of the cost. Our dedicated servers in New York, Los Angeles, and London are optimised for 60FPS high bitrate delivery, ensuring zero buffering during Super Bowl Sunday, NBA Finals, NFL playoffs, or any other peak viewing event.',
    keywords: [
      'best iptv subscription sports',
      'iptv subscription live sports',
      'espn iptv subscription',
      'fox sports iptv',
      'nfl sunday iptv',
      'nba iptv usa',
      'mlb iptv usa',
      'nhl iptv usa',
      'sky sports iptv',
      'ufc ppv iptv',
      'formula 1 iptv',
      'nfl iptv usa',
      'college football iptv',
      'live sports iptv usa',
    ],
    channels: [
      // US sport
      { name: 'ESPN HD', quality: 'FHD 60FPS', genre: 'US Sports', country: 'US', description: 'The worldwide leader in sports with NFL, NBA, MLB, and UFC coverage.', popular: true },
      { name: 'ESPN 2 HD', quality: 'FHD 60FPS', genre: 'US Sports', country: 'US', description: 'Additional US sports programming including college football, NBA, and MLB.', popular: true },
      { name: 'ESPNU HD', quality: 'FHD 60FPS', genre: 'College Sports', country: 'US', description: 'College sports coverage with NCAA football, basketball, and more.' },
      { name: 'ESPN News HD', quality: 'FHD 60FPS', genre: 'Sports News', country: 'US', description: 'Round the clock sports news, analysis, and debate.' },
      { name: 'FS1 HD', quality: 'FHD 60FPS', genre: 'US Sports', country: 'US', description: 'Fox Sports 1 with MLB, NASCAR, UFC Fight Nights, and more.', popular: true },
      { name: 'FS2 HD', quality: 'FHD 60FPS', genre: 'US Sports', country: 'US', description: 'Fox Sports 2 with international football and additional sports coverage.' },
      { name: 'NFL Network HD', quality: 'FHD 60FPS', genre: 'NFL', country: 'US', description: '24/7 NFL coverage, Thursday Night Football, and NFL RedZone replays.', popular: true },
      { name: 'NBA TV HD', quality: 'FHD 60FPS', genre: 'NBA', country: 'US', description: 'Round the clock NBA coverage, classic games, and live analysis.', popular: true },
      { name: 'MLB Network HD', quality: 'FHD 60FPS', genre: 'MLB', country: 'US', description: 'Major League Baseball coverage with live games and analysis.', popular: true },
      { name: 'NHL Network HD', quality: 'FHD 60FPS', genre: 'NHL', country: 'US', description: 'National Hockey League coverage with live games and player analysis.' },
      { name: 'TNT Sports US HD', quality: 'FHD 60FPS', genre: 'NBA & MLB', country: 'US', description: 'TNT NBA coverage plus MLB playoff games and international sport.' },
      { name: 'TBS Sports HD', quality: 'FHD 60FPS', genre: 'MLB Playoffs', country: 'US', description: 'Major League Baseball postseason coverage and March Madness.' },
      { name: 'Big Ten Network HD', quality: 'FHD 60FPS', genre: 'College Sports', country: 'US', description: 'NCAA Big Ten conference football, basketball, and other sports.' },
      { name: 'SEC Network HD', quality: 'FHD 60FPS', genre: 'College Sports', country: 'US', description: 'Southeastern Conference football and basketball coverage.' },
      { name: 'ACC Network HD', quality: 'FHD 60FPS', genre: 'College Sports', country: 'US', description: 'Atlantic Coast Conference football and basketball coverage.' },
      { name: 'Pac-12 Network HD', quality: 'FHD 60FPS', genre: 'College Sports', country: 'US', description: 'Pac-12 conference football and basketball coverage.' },
      { name: 'NFL RedZone HD', quality: 'FHD 60FPS', genre: 'NFL', country: 'US', description: 'Every NFL Sunday touchdown, live and commercial free.', popular: true },
      { name: 'MLB Network Strike Zone', quality: 'FHD 60FPS', genre: 'MLB', country: 'US', description: 'Live look ins at every MLB game during the regular season.' },
      { name: 'NBA League Pass HD', quality: 'FHD 60FPS', genre: 'NBA', country: 'US', description: 'Every out of market NBA game live across the regular season.' },
      { name: 'NHL Center Ice HD', quality: 'FHD 60FPS', genre: 'NHL', country: 'US', description: 'Every out of market NHL game live from every arena.' },
      { name: 'Tennis Channel HD', quality: 'FHD 60FPS', genre: 'Tennis', country: 'US', description: '24/7 tennis with all ATP and WTA tournaments and Grand Slams.', popular: true },
      { name: 'Golf Channel HD', quality: 'FHD 60FPS', genre: 'Golf', country: 'US', description: 'PGA Tour, LPGA, and Major Championship coverage 24/7.' },
      { name: 'UFC Fight Pass Live', quality: 'FHD 60FPS', genre: 'MMA', country: 'US', description: 'Numbered UFC events, Fight Nights, Contender Series, and full PPV main cards.', popular: true },
      { name: 'WWE Network', quality: 'FHD 60FPS', genre: 'Wrestling', country: 'US', description: 'WWE Raw, SmackDown, NXT, and full pay per view events.' },
      { name: 'AEW Plus HD', quality: 'FHD 60FPS', genre: 'Wrestling', country: 'US', description: 'All Elite Wrestling with Dynamite, Rampage, and PPV events.' },
      // UK sport
      { name: 'Sky Sports Main Event', quality: 'FHD 60FPS', genre: 'UK Premier League', country: 'UK', description: 'Full English Premier League coverage with UK commentary and analysis.', popular: true },
      { name: 'Sky Sports F1', quality: 'FHD 60FPS', genre: 'Formula 1', country: 'UK', description: 'Dedicated F1 channel with onboard cameras, qualifying, and race weekend coverage.', popular: true },
      { name: 'Sky Sports Premier League', quality: 'FHD 60FPS', genre: 'Football', country: 'UK', description: 'Dedicated Premier League channel with every televised match.' },
      { name: 'Sky Sports Football', quality: 'FHD 60FPS', genre: 'Football', country: 'UK', description: 'Championship, League One, and international football coverage.' },
      { name: 'Sky Sports Cricket', quality: 'FHD 60FPS', genre: 'Cricket', country: 'UK', description: 'England cricket, international tours, and The Ashes coverage.' },
      { name: 'Sky Sports Golf', quality: 'FHD 60FPS', genre: 'Golf', country: 'UK', description: 'PGA Tour, DP World Tour, and Major Championship coverage.' },
      { name: 'Sky Sports Action', quality: 'FHD 60FPS', genre: 'Multi Sport', country: 'UK', description: 'Rugby, boxing, and additional live sports events.' },
      { name: 'Sky Sports Arena', quality: 'FHD 60FPS', genre: 'Multi Sport', country: 'UK', description: 'Darts, snooker, and additional live sport events.' },
      { name: 'TNT Sports 1 HD', quality: 'FHD 60FPS', genre: 'Multi Sport', country: 'UK', description: 'Champions League football, UFC, and MotoGP coverage.' },
      { name: 'TNT Sports 2 HD', quality: 'FHD 60FPS', genre: 'Multi Sport', country: 'UK', description: 'Additional TNT Sports feed with Premier League and European football.' },
      // Canadian sport
      { name: 'TSN 1 HD', quality: 'FHD 60FPS', genre: 'Canadian Sports', country: 'CA', description: 'Canada sports leader with NHL, NBA, and CFL coverage.' },
      { name: 'TSN 2 HD', quality: 'FHD 60FPS', genre: 'NFL & NBA', country: 'CA', description: 'NFL Sunday coverage, Monday Night Football, and NBA playoff matchups.' },
      { name: 'TSN 3 HD', quality: 'FHD 60FPS', genre: 'Soccer & MLB', country: 'CA', description: 'Premier League matches, MLB coverage, and MLB playoff games.' },
      { name: 'TSN 4 HD', quality: 'FHD 60FPS', genre: 'Formula 1 & Tennis', country: 'CA', description: 'Formula 1 races, Grand Slam tennis, and international sports events.' },
      { name: 'TSN 5 HD', quality: 'FHD 60FPS', genre: 'Multi Sport', country: 'CA', description: 'Additional TSN feed for parallel events and multiple simultaneous games.' },
      { name: 'Sportsnet Ontario HD', quality: 'FHD 60FPS', genre: 'Canadian Sports', country: 'CA', description: 'Canadian sports network with NHL, MLB, and NBA coverage.' },
      { name: 'Sportsnet West HD', quality: 'FHD 60FPS', genre: 'Canadian Sports', country: 'CA', description: 'Western Canadian sports with NHL and NBA coverage.' },
      { name: 'Sportsnet East HD', quality: 'FHD 60FPS', genre: 'Canadian Sports', country: 'CA', description: 'Eastern Canadian sports with NHL and regional coverage.' },
      { name: 'Sportsnet 360 HD', quality: 'FHD 60FPS', genre: 'WWE & UFC', country: 'CA', description: 'WWE Raw and SmackDown, UFC Fight Nights, and combat sports coverage.' },
      { name: 'Sportsnet One HD', quality: 'FHD 60FPS', genre: 'Premier Sports', country: 'CA', description: 'Premier League football, international soccer tournaments, and NHL games.' },
      // Australian sport
      { name: 'Fox Sports AU 501 HD', quality: 'FHD 60FPS', genre: 'Australian Sports', country: 'AU', description: 'Australian Fox Sports feed with cricket, rugby, and motorsport.' },
      { name: 'Fox Sports AU 502 HD', quality: 'FHD 60FPS', genre: 'Australian Sports', country: 'AU', description: 'Additional Australian Fox Sports feed with parallel events.' },
      { name: 'Optus Sport HD', quality: 'FHD 60FPS', genre: 'Australian Football', country: 'AU', description: 'English Premier League and UEFA Champions League coverage for Australia.' },
      // Combat sports and specialty
      { name: 'DAZN Boxing & PPV', quality: 'FHD 60FPS', genre: 'Combat Sports', country: 'UK', description: 'Matchroom Boxing, Golden Boy Promotions, and major boxing PPV events worldwide.' },
      { name: 'Fight Sports HD', quality: 'FHD 60FPS', genre: 'Combat Sports', country: 'US', description: 'Boxing, kickboxing, and MMA from around the world.' },
      { name: 'Red Bull TV HD', quality: 'FHD 60FPS', genre: 'Extreme Sports', country: 'EU', description: 'Extreme sports, motorsport, and adventure programming.' },
      { name: 'Olympic Channel HD', quality: 'FHD 60FPS', genre: 'Olympics', country: 'EU', description: 'Olympic sports coverage, highlights, and athlete profiles.' },
      { name: 'Eurosport 1 HD', quality: 'FHD 60FPS', genre: 'Tennis & Cycling', country: 'EU', description: 'Grand Slam tennis, Tour de France, and winter sports coverage.' },
      { name: 'Eurosport 2 HD', quality: 'FHD 60FPS', genre: 'Multi Sport', country: 'EU', description: 'Additional European sport channel with cycling and motorsport coverage.' },
    ],
    faqs: [
      {
        question: 'Can I watch NFL, NBA, MLB, NHL, and UFC pay per view events live?',
        answer:
          'Yes. Every channel package includes full live NFL, NBA, MLB, NHL, college football, Premier League, and all major UFC and boxing pay per view events without any extra charges. What costs $50 or more on traditional pay per view is included in your subscription.',
      },
      {
        question: 'Is there any delay compared to traditional cable?',
        answer:
          'No. Our dedicated servers in New York, Los Angeles, and London use 60FPS high bitrate connections with minimal latency, so you watch live events in real time with no noticeable delay.',
      },
      {
        question: 'Do you offer catch up for missed games?',
        answer:
          'Yes. Most sports channels include a 7 day catch up feature and a fully synchronised EPG guide so you can rewatch any match you missed.',
      },
    ],
    featured: true,
  },

  // =========================================================================
  // 2. USA CHANNELS
  // =========================================================================
  {
    slug: 'usa',
    name: 'USA Channels',
    totalChannels: 5000,
    description:
      'Full access to every major US network. ABC, CBS, NBC, FOX, HBO, Showtime, ESPN, CNN, and premium streaming originals in Full HD and 4K.',
    longDescription:
      'Access the full range of American television from major broadcast networks (ABC, CBS, NBC, FOX, CW) to premium cable channels (HBO, Showtime, Starz, AMC) and dedicated sports networks (ESPN, FS1, NFL Network). Our US lineup includes East and West coast feeds so you can watch primetime shows at the time that suits your household, wherever you are in the world.',
    keywords: [
      'us channels iptv subscription',
      'hbo iptv subscription',
      'showtime iptv',
      'espn iptv subscription',
      'american tv channels iptv',
      'abc cbs nbc iptv',
      'best iptv subscription',
    ],
    channels: [
      // Broadcast networks
      { name: 'ABC East HD', quality: 'FHD 60FPS', genre: 'US Broadcast', country: 'US', description: 'Major US network with primetime hits, live sports, and late night shows.', popular: true },
      { name: 'ABC West HD', quality: 'FHD 60FPS', genre: 'US Broadcast', country: 'US', description: 'West coast ABC feed for Pacific time zone viewers.' },
      { name: 'CBS East HD', quality: 'FHD 60FPS', genre: 'US Broadcast', country: 'US', description: 'US drama hits, NFL Sunday coverage, and primetime entertainment.', popular: true },
      { name: 'CBS West HD', quality: 'FHD 60FPS', genre: 'US Broadcast', country: 'US', description: 'West coast CBS feed for Pacific time zone viewers.' },
      { name: 'NBC East HD', quality: 'FHD 60FPS', genre: 'US Broadcast', country: 'US', description: 'US variety shows, live sports, and award winning dramas.', popular: true },
      { name: 'NBC West HD', quality: 'FHD 60FPS', genre: 'US Broadcast', country: 'US', description: 'West coast NBC feed for Pacific time zone viewers.' },
      { name: 'FOX East HD', quality: 'FHD 60FPS', genre: 'US Broadcast', country: 'US', description: 'US primetime hits, NFL Football, and major entertainment events.' },
      { name: 'FOX West HD', quality: 'FHD 60FPS', genre: 'US Broadcast', country: 'US', description: 'West coast FOX feed for Pacific time zone viewers.' },
      { name: 'The CW HD', quality: 'FHD 60FPS', genre: 'US Broadcast', country: 'US', description: 'Superhero series, teen dramas, and new American entertainment.' },
      { name: 'PBS HD', quality: 'FHD 60FPS', genre: 'US Public', country: 'US', description: 'American public broadcasting with documentaries and educational shows.' },
      // Premium cable
      { name: 'HBO East HD', quality: 'FHD 60FPS', genre: 'Premium Cable', country: 'US', description: 'HBO original series, blockbuster movies, and premium entertainment.', popular: true },
      { name: 'HBO West HD', quality: 'FHD 60FPS', genre: 'Premium Cable', country: 'US', description: 'West coast HBO feed with the same premium programming.' },
      { name: 'HBO 2 HD', quality: 'FHD 60FPS', genre: 'Premium Cable', country: 'US', description: 'Second HBO channel with additional films and originals.' },
      { name: 'HBO Signature HD', quality: 'FHD 60FPS', genre: 'Premium Cable', country: 'US', description: 'Additional HBO feed featuring top original series and films.' },
      { name: 'HBO Family HD', quality: 'FHD 60FPS', genre: 'Premium Family', country: 'US', description: 'Family friendly HBO programming including animated features.' },
      { name: 'HBO Comedy HD', quality: 'FHD 60FPS', genre: 'Comedy', country: 'US', description: 'HBO comedy specials, stand up, and comedic series.' },
      { name: 'Showtime East HD', quality: 'FHD 60FPS', genre: 'Premium Cable', country: 'US', description: 'Showtime originals, hit movies, and major boxing events.', popular: true },
      { name: 'Showtime 2 HD', quality: 'FHD 60FPS', genre: 'Premium Cable', country: 'US', description: 'Additional Showtime feed with movies and original series.' },
      { name: 'Showtime Showcase HD', quality: 'FHD 60FPS', genre: 'Premium Cable', country: 'US', description: 'Showcase feed with premium films and dramas.' },
      { name: 'Starz East HD', quality: 'FHD 60FPS', genre: 'Premium Cable', country: 'US', description: 'Starz original series, first run movies, and premium dramas.' },
      { name: 'Starz Encore HD', quality: 'FHD 60FPS', genre: 'Premium Cable', country: 'US', description: 'Encore channel with classic films and library content.' },
      { name: 'Cinemax HD', quality: 'FHD 60FPS', genre: 'Premium Cable', country: 'US', description: 'Cinemax films, action series, and late night programming.' },
      { name: 'AMC HD', quality: 'FHD 60FPS', genre: 'Premium Cable', country: 'US', description: 'AMC original series including The Walking Dead universe and Better Call Saul.', popular: true },
      { name: 'AMC+ HD', quality: 'FHD 60FPS', genre: 'Premium Cable', country: 'US', description: 'AMC Plus streaming content and exclusive original series.' },
      { name: 'FX HD', quality: 'FHD 60FPS', genre: 'Premium Cable', country: 'US', description: 'FX original dramas, comedies, and anthology series.' },
      { name: 'FXX HD', quality: 'FHD 60FPS', genre: 'Comedy', country: 'US', description: 'FXX comedies and exclusive content from the FX family.' },
      // News
      { name: 'CNN USA HD', quality: 'FHD 60FPS', genre: 'US News', country: 'US', description: 'American and international news coverage 24/7 from CNN headquarters.', popular: true },
      { name: 'CNN International HD', quality: 'FHD 60FPS', genre: 'International News', country: 'US', description: 'Global news coverage from CNN International with worldwide bureaus.' },
      { name: 'MSNBC HD', quality: 'FHD 60FPS', genre: 'US News', country: 'US', description: 'Progressive American news coverage, political analysis, and commentary.' },
      { name: 'FOX News HD', quality: 'FHD 60FPS', genre: 'US News', country: 'US', description: 'American news, political debates, and opinion programming.' },
      { name: 'CNBC HD', quality: 'FHD 60FPS', genre: 'Business', country: 'US', description: 'Business news, market analysis, and financial programming.' },
      { name: 'Bloomberg TV HD', quality: 'FHD 60FPS', genre: 'Business', country: 'US', description: 'Global business and financial market coverage 24 hours a day.' },
      // Entertainment
      { name: 'USA Network HD', quality: 'FHD 60FPS', genre: 'Entertainment', country: 'US', description: 'USA Network original series, WWE, and entertainment programming.' },
      { name: 'TNT HD', quality: 'FHD 60FPS', genre: 'Entertainment', country: 'US', description: 'TNT original dramas, movies, and NBA coverage.' },
      { name: 'TBS HD', quality: 'FHD 60FPS', genre: 'Comedy', country: 'US', description: 'TBS sitcoms, comedy, and Major League Baseball coverage.' },
      { name: 'Bravo HD', quality: 'FHD 60FPS', genre: 'Reality', country: 'US', description: 'Bravo reality shows, Real Housewives franchise, and lifestyle.' },
      { name: 'E! Entertainment HD', quality: 'FHD 60FPS', genre: 'Entertainment', country: 'US', description: 'Celebrity news, entertainment, and pop culture programming.' },
      { name: 'Comedy Central HD', quality: 'FHD 60FPS', genre: 'Comedy', country: 'US', description: 'Comedy Central shows, stand up specials, and satire.' },
      { name: 'Syfy HD', quality: 'FHD 60FPS', genre: 'Sci-Fi', country: 'US', description: 'Science fiction, fantasy, and supernatural programming.' },
      { name: 'Paramount Network HD', quality: 'FHD 60FPS', genre: 'Entertainment', country: 'US', description: 'Yellowstone, movies, and entertainment programming.' },
      { name: 'MTV HD', quality: 'FHD 60FPS', genre: 'Music & Reality', country: 'US', description: 'Music videos, reality shows, and youth oriented entertainment.' },
      { name: 'VH1 HD', quality: 'FHD 60FPS', genre: 'Music', country: 'US', description: 'Music programming, reality shows, and pop culture.' },
      { name: 'BET HD', quality: 'FHD 60FPS', genre: 'Entertainment', country: 'US', description: 'Black Entertainment Television with music, comedy, and dramas.' },
      { name: 'Food Network HD', quality: 'FHD 60FPS', genre: 'Food', country: 'US', description: 'Cooking shows, competitions, and celebrity chef programming.' },
      { name: 'HGTV HD', quality: 'FHD 60FPS', genre: 'Home & Garden', country: 'US', description: 'Home improvement, renovation, and real estate programming.' },
      { name: 'Travel Channel HD', quality: 'FHD 60FPS', genre: 'Travel', country: 'US', description: 'Travel, adventure, and exploration documentaries.' },
      { name: 'History Channel HD', quality: 'FHD 60FPS', genre: 'History', country: 'US', description: 'Historical documentaries, reality shows, and educational content.' },
      { name: 'Discovery Channel US HD', quality: 'FHD 60FPS', genre: 'Documentary', country: 'US', description: 'Discovery programming including Gold Rush, Deadliest Catch, and more.' },
      { name: 'National Geographic HD', quality: 'FHD 60FPS', genre: 'Documentary', country: 'US', description: 'Nature, science, and exploration documentaries from Nat Geo.' },
      { name: 'Animal Planet US HD', quality: 'FHD 60FPS', genre: 'Nature', country: 'US', description: 'Animal documentaries, wildlife, and pet programming.' },
      { name: 'IFC HD', quality: 'FHD 60FPS', genre: 'Independent Film', country: 'US', description: 'Independent films, cult comedy, and original series.' },
      { name: 'Sundance TV HD', quality: 'FHD 60FPS', genre: 'Independent Film', country: 'US', description: 'Independent film and original drama programming.' },
      { name: 'Oxygen HD', quality: 'FHD 60FPS', genre: 'True Crime', country: 'US', description: 'True crime, investigation, and crime documentary programming.' },
      { name: 'A&E HD', quality: 'FHD 60FPS', genre: 'Reality', country: 'US', description: 'Reality TV, documentary, and crime programming from A&E.' },
      { name: 'Lifetime HD', quality: 'FHD 60FPS', genre: 'Drama', country: 'US', description: 'Lifetime original movies, dramas, and reality programming.' },
      { name: 'Hallmark Channel HD', quality: 'FHD 60FPS', genre: 'Family', country: 'US', description: 'Hallmark original movies, family entertainment, and holiday specials.' },
      { name: 'OWN HD', quality: 'FHD 60FPS', genre: 'Lifestyle', country: 'US', description: 'Oprah Winfrey Network with lifestyle, reality, and inspiration shows.' },
      { name: 'Disney Channel US HD', quality: 'FHD 60FPS', genre: 'Kids', country: 'US', description: 'Disney Channel original series and family programming.' },
      { name: 'Freeform HD', quality: 'FHD 60FPS', genre: 'Youth', country: 'US', description: 'Youth oriented dramas, comedies, and original series.' },
    ],
    faqs: [
      {
        question: 'Can I watch HBO, Showtime, and premium US channels from anywhere?',
        answer:
          'Yes. Our US lineup includes premium American channels like HBO, Showtime, Starz, AMC, and more. All included in your IPTV Subscription at no extra cost.',
      },
      {
        question: 'Are live American sports channels like ESPN and NFL Network included?',
        answer:
          'Absolutely. You get full access to ESPN, ESPN 2, FS1, NFL Network, NBA TV, and every major US sports channel. Perfect for following NFL, NBA, MLB, and UFC events.',
      },
    ],
  },

  // =========================================================================
  // 3. CANADIAN CHANNELS
  // =========================================================================
  {
    slug: 'canadian',
    name: 'Canadian Channels',
    totalChannels: 500,
    description:
      'Complete Canadian broadcasting lineup. CBC, CTV, Global, Citytv, TSN, Sportsnet, TVA, Radio-Canada, and regional channels with EPG and catch up.',
    longDescription:
      'The full range of Canadian television for expats and viewers who love Canadian content. CBC, CTV, Global, Citytv, TSN, Sportsnet, plus full French coverage from TVA and Radio-Canada. Whether you are a US expat in Toronto or just a fan of Canadian programming, you get the complete lineup in Full HD.',
    keywords: [
      'canadian tv iptv subscription',
      'cbc iptv subscription',
      'ctv iptv',
      'tsn iptv subscription',
      'sportsnet iptv',
      'canadian channels iptv',
      'best iptv subscription',
    ],
    channels: [
      // CBC family
      { name: 'CBC HD', quality: 'FHD 60FPS', genre: 'National Public', country: 'CA', description: 'CBC News, The National, Hockey Night in Canada, and Canadian originals.' },
      { name: 'CBC News Network HD', quality: 'FHD 60FPS', genre: '24/7 News', country: 'CA', description: 'Rolling Canadian news coverage, live political events, and breaking stories.' },
      { name: 'CBC Gem Originals', quality: 'FHD 60FPS', genre: 'Original Series', country: 'CA', description: 'Canadian original dramas, comedies, and documentaries from CBC Gem.' },
      { name: 'Ici Radio-Canada Télé HD', quality: 'FHD 60FPS', genre: 'French Public', country: 'CA', description: 'French language public broadcaster with dramas and news.' },
      { name: 'ICI RDI HD', quality: 'FHD 60FPS', genre: 'French News', country: 'CA', description: 'French Canadian news channel with continuous coverage of national events.' },
      { name: 'ICI Explora HD', quality: 'FHD 60FPS', genre: 'Documentary', country: 'CA', description: 'French language documentaries, science, and nature programming.' },
      // CTV family
      { name: 'CTV HD', quality: 'FHD 60FPS', genre: 'National Commercial', country: 'CA', description: 'CTV National News, primetime dramas, and major live sports coverage.' },
      { name: 'CTV News Channel HD', quality: 'FHD 60FPS', genre: '24/7 News', country: 'CA', description: 'Rolling Canadian and international news coverage with live reports.' },
      { name: 'CTV 2 HD', quality: 'FHD 60FPS', genre: 'Regional Entertainment', country: 'CA', description: 'Regional CTV programming, primetime entertainment, and local news.' },
      { name: 'CTV Comedy HD', quality: 'FHD 60FPS', genre: 'Comedy', country: 'CA', description: 'Comedy Channel with sitcoms and stand up specials.' },
      { name: 'CTV Drama HD', quality: 'FHD 60FPS', genre: 'Drama', country: 'CA', description: 'Drama Channel with crime, mystery, and drama series.' },
      { name: 'CTV Life HD', quality: 'FHD 60FPS', genre: 'Lifestyle', country: 'CA', description: 'Lifestyle programming including home, food, and travel.' },
      { name: 'CTV Sci-Fi HD', quality: 'FHD 60FPS', genre: 'Sci-Fi', country: 'CA', description: 'Science fiction, fantasy, and supernatural programming.' },
      // Global family
      { name: 'Global TV HD', quality: 'FHD 60FPS', genre: 'National Commercial', country: 'CA', description: 'Global National news, primetime dramas, and blockbuster movie nights.' },
      { name: 'Global News HD', quality: 'FHD 60FPS', genre: '24/7 News', country: 'CA', description: 'Canadian news, politics, and international coverage 24 hours a day.' },
      { name: 'Global News BC HD', quality: 'FHD 60FPS', genre: 'Regional News', country: 'CA', description: 'British Columbia news coverage from Global News BC.' },
      { name: 'Global News Toronto HD', quality: 'FHD 60FPS', genre: 'Regional News', country: 'CA', description: 'Toronto area news coverage from Global News Toronto.' },
      // Citytv family
      { name: 'Citytv HD', quality: 'FHD 60FPS', genre: 'Urban Entertainment', country: 'CA', description: 'Citytv original shows, primetime entertainment, and regional morning news.' },
      { name: 'CityNews 24/7 HD', quality: 'FHD 60FPS', genre: 'Local News', country: 'CA', description: 'Local news coverage from Toronto, Vancouver, Calgary, and other Canadian cities.' },
      { name: 'Citytv Vancouver HD', quality: 'FHD 60FPS', genre: 'Regional', country: 'CA', description: 'Vancouver regional programming and news from Citytv.' },
      // French
      { name: 'TVA HD', quality: 'FHD 60FPS', genre: 'French Canadian', country: 'CA', description: 'The top French language Canadian network with prime time dramas and news.' },
      { name: 'TVA Nouvelles HD', quality: 'FHD 60FPS', genre: 'French News', country: 'CA', description: 'Round the clock French Canadian news coverage from TVA Nouvelles.' },
      { name: 'V Télé HD', quality: 'FHD 60FPS', genre: 'French Entertainment', country: 'CA', description: 'Quebec entertainment, reality TV, and French language series.' },
      { name: 'Noovo HD', quality: 'FHD 60FPS', genre: 'French Commercial', country: 'CA', description: 'Popular Quebec programming, talk shows, and international series.' },
      { name: 'RDS HD', quality: 'FHD 60FPS', genre: 'French Sports', country: 'CA', description: 'Reseau des Sports with French language sports coverage.' },
      { name: 'TVA Sports HD', quality: 'FHD 60FPS', genre: 'French Sports', country: 'CA', description: 'French language Canadian sports channel with NHL and other coverage.' },
      // Specialty and entertainment
      { name: 'TSN SportsCentre HD', quality: 'FHD 60FPS', genre: 'Sports News', country: 'CA', description: 'Canada flagship sports news program and daily highlights.' },
      { name: 'The Weather Network CA HD', quality: 'FHD 60FPS', genre: 'Weather', country: 'CA', description: 'Canadian weather forecasts, storm tracking, and climate coverage.' },
      { name: 'Slice HD', quality: 'FHD 60FPS', genre: 'Reality', country: 'CA', description: 'Reality TV, drama, and lifestyle programming on Slice.' },
      { name: 'HGTV Canada HD', quality: 'FHD 60FPS', genre: 'Home & Garden', country: 'CA', description: 'Canadian home improvement and design programming.' },
      { name: 'Food Network Canada HD', quality: 'FHD 60FPS', genre: 'Food', country: 'CA', description: 'Canadian cooking shows and food competition programming.' },
      { name: 'W Network HD', quality: 'FHD 60FPS', genre: 'Women Lifestyle', country: 'CA', description: 'Women focused programming with drama, reality, and lifestyle.' },
      { name: 'Showcase HD', quality: 'FHD 60FPS', genre: 'Premium Drama', country: 'CA', description: 'Premium dramas and exclusive series on Canadian Showcase.' },
      { name: 'Space HD', quality: 'FHD 60FPS', genre: 'Sci-Fi', country: 'CA', description: 'Canadian science fiction, fantasy, and supernatural programming.' },
      { name: 'Discovery Canada HD', quality: 'FHD 60FPS', genre: 'Documentary', country: 'CA', description: 'Canadian Discovery programming with nature and factual shows.' },
      { name: 'History Canada HD', quality: 'FHD 60FPS', genre: 'History', country: 'CA', description: 'Canadian history documentaries and historical programming.' },
      { name: 'National Geographic Canada HD', quality: 'FHD 60FPS', genre: 'Documentary', country: 'CA', description: 'Nature, science, and exploration documentaries for Canadian viewers.' },
      { name: 'CTV Sci-Fi Channel HD', quality: 'FHD 60FPS', genre: 'Sci-Fi', country: 'CA', description: 'Science fiction series and fantasy programming on CTV Sci-Fi.' },
      { name: 'MuchMusic HD', quality: 'FHD 60FPS', genre: 'Music', country: 'CA', description: 'Canadian music channel with videos, countdowns, and music news.' },
      { name: 'MTV Canada HD', quality: 'FHD 60FPS', genre: 'Music & Reality', country: 'CA', description: 'Canadian MTV with music, reality shows, and entertainment.' },
      { name: 'Family Channel HD', quality: 'FHD 60FPS', genre: 'Family', country: 'CA', description: 'Family programming, kids shows, and teen dramas for Canadian viewers.' },
      { name: 'YTV HD', quality: 'FHD 60FPS', genre: 'Youth', country: 'CA', description: 'Canadian youth network with animation and teen entertainment.' },
      { name: 'Teletoon HD', quality: 'FHD 60FPS', genre: 'Animation', country: 'CA', description: 'Canadian animation channel with original and international cartoons.' },
      { name: 'Treehouse HD', quality: 'FHD 60FPS', genre: 'Preschool', country: 'CA', description: 'Preschool programming in English and French for the youngest viewers.' },
      { name: 'Cartoon Network Canada HD', quality: 'FHD 60FPS', genre: 'Animation', country: 'CA', description: 'Canadian Cartoon Network with animation and youth programming.' },
      { name: 'CBC News Explore HD', quality: 'FHD 60FPS', genre: 'Documentary', country: 'CA', description: 'Documentary and investigative programming from CBC News.' },
      { name: 'OutTV HD', quality: 'FHD 60FPS', genre: 'LGBTQ+', country: 'CA', description: 'LGBTQ+ focused programming, drama, comedy, and documentaries.' },
      { name: 'Hollywood Suite HD', quality: 'FHD 60FPS', genre: 'Classic Film', country: 'CA', description: 'Classic films, cult movies, and cinema from the 70s through 2000s.' },
      { name: 'Silver Screen Classics HD', quality: 'FHD 60FPS', genre: 'Classic Film', country: 'CA', description: 'Golden age Hollywood films, classics, and cinema gems.' },
      { name: 'Rewind HD', quality: 'FHD 60FPS', genre: 'Classic TV', country: 'CA', description: 'Classic Canadian and international television series from every decade.' },
      { name: 'DejaView HD', quality: 'FHD 60FPS', genre: 'Classic TV', country: 'CA', description: 'Retro television programming and classic Canadian series.' },
      { name: 'Cosmopolitan TV HD', quality: 'FHD 60FPS', genre: 'Women Lifestyle', country: 'CA', description: 'Women focused lifestyle, fashion, and entertainment programming.' },
      { name: 'Gusto TV HD', quality: 'FHD 60FPS', genre: 'Food & Travel', country: 'CA', description: 'Canadian food and travel programming from Gusto.' },
      { name: 'CTV Life Channel HD', quality: 'FHD 60FPS', genre: 'Lifestyle', country: 'CA', description: 'Canadian lifestyle, cooking, and home programming.' },
      { name: 'Cottage Life HD', quality: 'FHD 60FPS', genre: 'Outdoor', country: 'CA', description: 'Canadian outdoor living, cottages, and lifestyle programming.' },
    ],
    faqs: [
      {
        question: 'Can I watch Canadian channels from the United States?',
        answer:
          'Yes. Our IPTV streams work worldwide without geographic restrictions. US expats in Canada and Canadian expats in the United States can both watch CBC, CTV, Global, and all Canadian channels from anywhere.',
      },
      {
        question: 'Are French Canadian channels included?',
        answer:
          'Absolutely. Our Canadian lineup includes full French language coverage from TVA, Radio-Canada, ICI RDI, and more, all in Full HD.',
      },
    ],
  },

  // =========================================================================
  // 4. UK & EUROPE CHANNELS
  // =========================================================================
  {
    slug: 'europe',
    name: 'UK & Europe Channels',
    totalChannels: 8000,
    description:
      'Every major European broadcaster. BBC, ITV, Channel 4, Sky, TF1, France 2, ARD, ZDF, RAI, TVE, RTL, and premium channels from the UK, France, Germany, Spain, Italy, and across the continent.',
    longDescription:
      'Watch television from across Europe with our complete UK and Europe lineup. From the UK (BBC, ITV, Channel 4, Channel 5, Sky) to France (TF1, France 2, Canal+), Germany (ARD, ZDF, RTL), Spain (TVE, Antena 3), Italy (RAI, Mediaset), and every other major European country. Perfect for European expats living in the United States, and for US viewers who love British and European content.',
    keywords: [
      'uk channels iptv subscription',
      'bbc iptv subscription',
      'itv iptv',
      'sky sports iptv',
      'european channels iptv subscription',
      'french channels iptv',
      'german channels iptv',
      'best iptv subscription',
    ],
    channels: [
      // UK — BBC
      { name: 'BBC One HD', quality: 'FHD 60FPS', genre: 'United Kingdom', country: 'UK', description: 'The UK flagship public channel with news, top drama, and live sport.', popular: true },
      { name: 'BBC Two HD', quality: 'FHD 60FPS', genre: 'United Kingdom', country: 'UK', description: 'Documentaries, comedy, and background programming from the UK.' },
      { name: 'BBC Three HD', quality: 'FHD 60FPS', genre: 'Youth', country: 'UK', description: 'Youth oriented BBC channel with new comedy and drama.' },
      { name: 'BBC Four HD', quality: 'FHD 60FPS', genre: 'Culture', country: 'UK', description: 'Arts, culture, and in depth documentary programming.' },
      { name: 'BBC News HD', quality: 'FHD 60FPS', genre: 'UK News', country: 'UK', description: 'BBC News with global coverage from London and around the world.' },
      { name: 'BBC World News HD', quality: 'FHD 60FPS', genre: 'International News', country: 'UK', description: 'BBC global news channel with international reporters.' },
      { name: 'CBBC HD', quality: 'FHD 60FPS', genre: 'Kids', country: 'UK', description: 'British children programming with CBBC shows.' },
      { name: 'CBeebies HD', quality: 'FHD 60FPS', genre: 'Preschool', country: 'UK', description: 'BBC preschool programming with educational content for young viewers.' },
      // UK — ITV
      { name: 'ITV 1 HD', quality: 'FHD 60FPS', genre: 'United Kingdom', country: 'UK', description: 'The UK largest commercial network with top entertainment and shows.', popular: true },
      { name: 'ITV 2 HD', quality: 'FHD 60FPS', genre: 'Entertainment', country: 'UK', description: 'ITV2 with reality TV, entertainment, and youth oriented shows.' },
      { name: 'ITV 3 HD', quality: 'FHD 60FPS', genre: 'Drama', country: 'UK', description: 'ITV3 with classic British dramas and crime series.' },
      { name: 'ITV 4 HD', quality: 'FHD 60FPS', genre: 'Sport & Factual', country: 'UK', description: 'ITV4 with sport, factual programming, and men focused content.' },
      { name: 'ITVBe HD', quality: 'FHD 60FPS', genre: 'Lifestyle', country: 'UK', description: 'ITVBe with reality, lifestyle, and entertainment programming.' },
      // UK — Channel 4 and 5
      { name: 'Channel 4 HD', quality: 'FHD 60FPS', genre: 'United Kingdom', country: 'UK', description: 'UK quality films, documentaries, and award winning series.' },
      { name: 'E4 HD', quality: 'FHD 60FPS', genre: 'Entertainment', country: 'UK', description: 'E4 with youth entertainment, comedy, and US imports.' },
      { name: 'More4 HD', quality: 'FHD 60FPS', genre: 'Documentary', country: 'UK', description: 'More4 with documentaries, drama, and factual programming.' },
      { name: 'Film4 HD', quality: 'FHD 60FPS', genre: 'Movies', country: 'UK', description: 'Film4 with independent films, cinema classics, and premieres.' },
      { name: 'Channel 5 HD', quality: 'FHD 60FPS', genre: 'United Kingdom', country: 'UK', description: 'UK entertainment, factual programming, and original drama.' },
      { name: '5Star HD', quality: 'FHD 60FPS', genre: 'Drama', country: 'UK', description: 'Drama, US imports, and entertainment programming on 5Star.' },
      // UK — Sky
      { name: 'Sky Witness HD', quality: 'FHD 60FPS', genre: 'United Kingdom', country: 'UK', description: 'UK dramas, US crime shows, and premium entertainment series.' },
      { name: 'Sky Atlantic HD', quality: 'FHD 60FPS', genre: 'United Kingdom', country: 'UK', description: 'HBO originals and premium dramas exclusive to Sky Atlantic.' },
      { name: 'Sky Max HD', quality: 'FHD 60FPS', genre: 'Entertainment', country: 'UK', description: 'Sky Max with premium dramas, comedies, and entertainment.' },
      { name: 'Sky Comedy HD', quality: 'FHD 60FPS', genre: 'Comedy', country: 'UK', description: 'Sky Comedy with sitcoms, stand up, and comedy series.' },
      { name: 'Sky Cinema Premiere HD', quality: 'FHD 60FPS', genre: 'United Kingdom', country: 'UK', description: 'UK movie channel with brand new cinema releases every week.' },
      { name: 'Sky Cinema Action HD', quality: 'FHD 60FPS', genre: 'Action', country: 'UK', description: 'Action films, thrillers, and blockbuster movies on Sky Cinema.' },
      { name: 'Sky Cinema Family HD', quality: 'FHD 60FPS', genre: 'Family', country: 'UK', description: 'Family friendly films and animated features on Sky Cinema.' },
      { name: 'Sky News HD', quality: 'FHD 60FPS', genre: 'UK News', country: 'UK', description: 'British news channel with breaking coverage and analysis.' },
      { name: 'Sky History HD', quality: 'FHD 60FPS', genre: 'History', country: 'UK', description: 'History documentaries and factual programming on Sky History.' },
      { name: 'Sky Nature HD', quality: 'FHD 60FPS', genre: 'Nature', country: 'UK', description: 'Nature documentaries and wildlife programming.' },
      { name: 'Sky Arts HD', quality: 'FHD 60FPS', genre: 'Arts', country: 'UK', description: 'Arts, music, and cultural programming from Sky Arts.' },
      // UK — Others
      { name: 'Dave HD', quality: 'FHD 60FPS', genre: 'Comedy', country: 'UK', description: 'Dave comedy channel with panel shows, comedy series, and British wit.' },
      { name: 'Gold HD', quality: 'FHD 60FPS', genre: 'Classic Comedy', country: 'UK', description: 'Classic British comedy series and retro entertainment.' },
      { name: 'W HD', quality: 'FHD 60FPS', genre: 'Women Lifestyle', country: 'UK', description: 'Women focused programming with drama, reality, and lifestyle.' },
      { name: 'Alibi HD', quality: 'FHD 60FPS', genre: 'Crime Drama', country: 'UK', description: 'Crime dramas, detective series, and mystery programming.' },
      // France
      { name: 'TF1 HD', quality: 'FHD 60FPS', genre: 'France', country: 'EU', description: 'France largest TV network with live sport, series, and films.', popular: true },
      { name: 'France 2 HD', quality: 'FHD 60FPS', genre: 'France', country: 'EU', description: 'French public broadcaster with Roland Garros and Tour de France coverage.' },
      { name: 'France 3 HD', quality: 'FHD 60FPS', genre: 'France', country: 'EU', description: 'Regional French programming, news, and national entertainment.' },
      { name: 'France 5 HD', quality: 'FHD 60FPS', genre: 'Documentary', country: 'EU', description: 'French documentary, culture, and educational programming.' },
      { name: 'M6 HD', quality: 'FHD 60FPS', genre: 'France', country: 'EU', description: 'French entertainment network with reality shows, films, and series.' },
      { name: 'Canal+ HD', quality: 'FHD 60FPS', genre: 'France', country: 'EU', description: 'Premium French channel with films, sport, and original series.' },
      { name: 'Canal+ Sport HD', quality: 'FHD 60FPS', genre: 'French Sports', country: 'EU', description: 'Premium French sports channel with football and rugby coverage.' },
      { name: 'Canal+ Cinema HD', quality: 'FHD 60FPS', genre: 'French Cinema', country: 'EU', description: 'French and international cinema on premium Canal+ Cinema.' },
      // Germany
      { name: 'ARD Das Erste', quality: 'FHD 60FPS', genre: 'Germany', country: 'EU', description: 'German public flagship with Tagesschau news and Bundesliga football.', popular: true },
      { name: 'ZDF HD', quality: 'FHD 60FPS', genre: 'Germany', country: 'EU', description: 'German quality television with documentaries and live sport.' },
      { name: 'RTL HD', quality: 'FHD 60FPS', genre: 'Germany', country: 'EU', description: 'German commercial leader with entertainment, sport, and news.' },
      { name: 'Sat.1 HD', quality: 'FHD 60FPS', genre: 'Germany', country: 'EU', description: 'German entertainment with films, shows, and live sports events.' },
      { name: 'ProSieben HD', quality: 'FHD 60FPS', genre: 'Germany', country: 'EU', description: 'German entertainment network with US imports and reality shows.' },
      { name: 'ZDF Neo HD', quality: 'FHD 60FPS', genre: 'Germany', country: 'EU', description: 'ZDF Neo with documentaries, comedy, and youth oriented programming.' },
      { name: '3sat HD', quality: 'FHD 60FPS', genre: 'Germany', country: 'EU', description: 'German language cultural programming, documentaries, and science shows.' },
      // Spain
      { name: 'La 1 HD', quality: 'FHD 60FPS', genre: 'Spain', country: 'EU', description: 'Spanish national channel with news, entertainment, and La Liga coverage.' },
      { name: 'La 2 HD', quality: 'FHD 60FPS', genre: 'Spain', country: 'EU', description: 'Spanish public channel with documentaries, culture, and education.' },
      { name: 'Antena 3 HD', quality: 'FHD 60FPS', genre: 'Spain', country: 'EU', description: 'Spanish commercial network with series, films, and reality shows.' },
      { name: 'Telecinco HD', quality: 'FHD 60FPS', genre: 'Spain', country: 'EU', description: 'Spanish entertainment network with reality TV and dramas.' },
      { name: 'Movistar Plus HD', quality: 'FHD 60FPS', genre: 'Spain', country: 'EU', description: 'Spanish premium channel with films, series, and La Liga football.' },
      { name: 'Movistar Deportes HD', quality: 'FHD 60FPS', genre: 'Spanish Sports', country: 'EU', description: 'Spanish sports channel with La Liga and international coverage.' },
      // Italy
      { name: 'Rai 1 HD', quality: 'FHD 60FPS', genre: 'Italy', country: 'EU', description: 'Italy flagship public channel with news and entertainment.', popular: true },
      { name: 'Rai 2 HD', quality: 'FHD 60FPS', genre: 'Italy', country: 'EU', description: 'Italian public broadcaster with sport, series, and entertainment.' },
      { name: 'Rai 3 HD', quality: 'FHD 60FPS', genre: 'Italy', country: 'EU', description: 'Italian regional programming, culture, and news.' },
      { name: 'Canale 5 HD', quality: 'FHD 60FPS', genre: 'Italy', country: 'EU', description: 'Mediaset flagship with Italian dramas, reality shows, and films.' },
      { name: 'Italia 1 HD', quality: 'FHD 60FPS', genre: 'Italy', country: 'EU', description: 'Italian youth oriented channel with animation and sport.' },
      { name: 'Rete 4 HD', quality: 'FHD 60FPS', genre: 'Italy', country: 'EU', description: 'Italian channel with films, dramas, and documentary programming.' },
      { name: 'Sky Sport Italia HD', quality: 'FHD 60FPS', genre: 'Italian Sports', country: 'EU', description: 'Italian sports channel with Serie A, Champions League, and Formula 1.' },
      // Other European
      { name: 'RTP 1 HD', quality: 'FHD 60FPS', genre: 'Portugal', country: 'EU', description: 'Portuguese public broadcaster with news, sport, and entertainment.' },
      { name: 'RTP 2 HD', quality: 'FHD 60FPS', genre: 'Portugal', country: 'EU', description: 'Portuguese cultural and documentary programming.' },
      { name: 'SIC HD', quality: 'FHD 60FPS', genre: 'Portugal', country: 'EU', description: 'Portuguese commercial network with telenovelas and entertainment.' },
      { name: 'NPO 1 HD', quality: 'FHD 60FPS', genre: 'Netherlands', country: 'EU', description: 'Dutch public broadcaster with news and entertainment programming.' },
      { name: 'RTL 4 HD', quality: 'FHD 60FPS', genre: 'Netherlands', country: 'EU', description: 'Dutch commercial network with entertainment and reality shows.' },
      { name: 'SVT 1 HD', quality: 'FHD 60FPS', genre: 'Sweden', country: 'EU', description: 'Swedish public broadcaster with news, drama, and cultural programming.' },
      { name: 'TV4 Sweden HD', quality: 'FHD 60FPS', genre: 'Sweden', country: 'EU', description: 'Swedish commercial channel with entertainment and sport.' },
      { name: 'NRK 1 HD', quality: 'FHD 60FPS', genre: 'Norway', country: 'EU', description: 'Norwegian public broadcaster with news, culture, and sport.' },
      { name: 'DR1 HD', quality: 'FHD 60FPS', genre: 'Denmark', country: 'EU', description: 'Danish public broadcaster with news, drama, and entertainment.' },
      { name: 'YLE TV1 HD', quality: 'FHD 60FPS', genre: 'Finland', country: 'EU', description: 'Finnish public broadcaster with news and cultural programming.' },
    ],
    faqs: [
      {
        question: 'Can I watch UK and European channels from the United States?',
        answer:
          'Yes. Our UK and European lineup includes every major broadcaster from the UK, France, Germany, Spain, Italy, and more. All streaming in Full HD from our London server node with low latency to the US.',
      },
      {
        question: 'Is Sky Sports included in this category?',
        answer:
          'Sky Sports channels appear in the Sports category along with other global sport networks, but the standard UK entertainment channels (Sky Witness, Sky Atlantic, Sky Cinema) are listed here.',
      },
    ],
  },

  // =========================================================================
  // 5. ASIA & MIDDLE EAST CHANNELS
  // =========================================================================
  {
    slug: 'asia-middle-east',
    name: 'Asia & Middle East Channels',
    totalChannels: 12000,
    description:
      'The largest selection of Asian and Middle Eastern television. CCTV, Zee TV, Star Plus, PTV, Geo TV, NHK, KBS, Al Jazeera, and every major broadcaster from China, India, Pakistan, Japan, Korea, and the Middle East.',
    longDescription:
      'Our Asia and Middle East category covers more than 12,000 channels from every major region. China (CCTV, CGTN), India (Zee, Star, Sony, Colors), Pakistan (PTV, Geo, ARY), Japan (NHK, Fuji TV), Korea (KBS, SBS, MBC), the Philippines (ABS-CBN, GMA), Vietnam, Thailand, Indonesia, and the entire Middle East (Al Jazeera, MBC, Dubai TV, Rotana). Perfect for expats and for viewers who love Asian content.',
    keywords: [
      'asian channels iptv subscription',
      'indian channels iptv subscription',
      'chinese channels iptv',
      'pakistani channels iptv',
      'japanese channels iptv',
      'korean channels iptv',
      'middle east iptv',
      'best iptv subscription',
    ],
    channels: [
      // China
      { name: 'CCTV-1 HD', quality: 'FHD 60FPS', genre: 'China', country: 'CN', description: 'China flagship national network with news and family entertainment.', popular: true },
      { name: 'CCTV-2 HD', quality: 'FHD 60FPS', genre: 'China Business', country: 'CN', description: 'Chinese business and finance news programming.' },
      { name: 'CCTV-3 HD', quality: 'FHD 60FPS', genre: 'China Entertainment', country: 'CN', description: 'Chinese entertainment, music, and variety shows.' },
      { name: 'CCTV-4 International', quality: 'FHD 60FPS', genre: 'China', country: 'CN', description: 'International Chinese broadcasting with culture, history, and world news.' },
      { name: 'CCTV-5 Sports', quality: 'FHD 60FPS', genre: 'China Sports', country: 'CN', description: 'Chinese sports channel with NBA, football, and international events.' },
      { name: 'CCTV-6 Movies', quality: 'FHD 60FPS', genre: 'Chinese Cinema', country: 'CN', description: 'Chinese and international film programming.' },
      { name: 'CCTV-8 Drama', quality: 'FHD 60FPS', genre: 'Chinese Drama', country: 'CN', description: 'Chinese dramas and serial programming.' },
      { name: 'CCTV-13 News', quality: 'FHD 60FPS', genre: 'China News', country: 'CN', description: 'Chinese news channel with domestic and international coverage.' },
      { name: 'CGTN English', quality: 'FHD 60FPS', genre: 'China', country: 'CN', description: '24/7 English language world news and economic analysis from Asia.' },
      { name: 'Phoenix TV Chinese', quality: 'FHD 60FPS', genre: 'Hong Kong', country: 'CN', description: 'Hong Kong based Chinese language news and entertainment channel.' },
      // India
      { name: 'Zee TV HD', quality: 'FHD 60FPS', genre: 'India', country: 'IN', description: 'Popular Hindi entertainment, dramas, and reality programming.', popular: true },
      { name: 'Zee Cinema HD', quality: 'FHD 60FPS', genre: 'Bollywood', country: 'IN', description: 'Round the clock Bollywood films and Indian cinema classics.' },
      { name: 'Zee News HD', quality: 'FHD 60FPS', genre: 'India News', country: 'IN', description: 'Indian news channel with domestic and international coverage.' },
      { name: 'Star Plus HD', quality: 'FHD 60FPS', genre: 'India', country: 'IN', description: 'India top entertainment network with serial dramas and shows.', popular: true },
      { name: 'Star Gold HD', quality: 'FHD 60FPS', genre: 'Bollywood', country: 'IN', description: 'Bollywood films and Indian cinema programming.' },
      { name: 'Star Sports India HD', quality: 'FHD 60FPS', genre: 'India Sports', country: 'IN', description: 'Live cricket, kabaddi, and Indian sports coverage.', popular: true },
      { name: 'Sony Entertainment TV HD', quality: 'FHD 60FPS', genre: 'India', country: 'IN', description: 'Indian dramas, reality shows, and entertainment programming.' },
      { name: 'Sony SAB HD', quality: 'FHD 60FPS', genre: 'India Comedy', country: 'IN', description: 'Indian comedy, sitcoms, and light entertainment programming.' },
      { name: 'Colors TV HD', quality: 'FHD 60FPS', genre: 'India', country: 'IN', description: 'Hindi entertainment with dramas, reality, and comedy shows.' },
      { name: 'Colors Cineplex HD', quality: 'FHD 60FPS', genre: 'Bollywood', country: 'IN', description: 'Hindi cinema and Bollywood films from Colors.' },
      { name: 'Sun TV HD', quality: 'FHD 60FPS', genre: 'Tamil', country: 'IN', description: 'Tamil language entertainment, dramas, and comedy programming.' },
      { name: 'KTV HD', quality: 'FHD 60FPS', genre: 'Tamil', country: 'IN', description: 'Tamil cinema, movies, and entertainment programming.' },
      { name: 'Asianet HD', quality: 'FHD 60FPS', genre: 'Malayalam', country: 'IN', description: 'Malayalam language entertainment and serial programming.' },
      // Pakistan
      { name: 'PTV Sports HD', quality: 'FHD 60FPS', genre: 'Pakistan', country: 'PK', description: 'Pakistan flagship sports channel with cricket and PSL coverage.', popular: true },
      { name: 'PTV Home HD', quality: 'FHD 60FPS', genre: 'Pakistan', country: 'PK', description: 'Pakistan Television with dramas, news, and entertainment.' },
      { name: 'Geo News HD', quality: 'FHD 60FPS', genre: 'Pakistan News', country: 'PK', description: 'Pakistani news channel with national and international coverage.' },
      { name: 'Geo TV HD', quality: 'FHD 60FPS', genre: 'Pakistan', country: 'PK', description: 'Pakistani entertainment with dramas and family programming.' },
      { name: 'ARY Digital HD', quality: 'FHD 60FPS', genre: 'Pakistan', country: 'PK', description: 'Pakistani dramas, entertainment, and family programming.' },
      { name: 'ARY News HD', quality: 'FHD 60FPS', genre: 'Pakistan News', country: 'PK', description: 'Pakistani news channel with breaking coverage and analysis.' },
      { name: 'Hum TV HD', quality: 'FHD 60FPS', genre: 'Pakistan', country: 'PK', description: 'Pakistani drama network with popular serials and shows.' },
      { name: 'Hum Masala HD', quality: 'FHD 60FPS', genre: 'Pakistan Lifestyle', country: 'PK', description: 'Pakistani lifestyle, cooking, and family programming.' },
      // Japan
      { name: 'NHK World HD', quality: 'FHD 60FPS', genre: 'Japan', country: 'JP', description: 'Japanese public broadcaster English language news and cultural programming.', popular: true },
      { name: 'NHK General TV HD', quality: 'FHD 60FPS', genre: 'Japan', country: 'JP', description: 'Japanese public broadcaster with news, drama, and variety shows.' },
      { name: 'Fuji TV HD', quality: 'FHD 60FPS', genre: 'Japan', country: 'JP', description: 'Japanese commercial network with anime, drama, and variety shows.' },
      { name: 'TV Tokyo HD', quality: 'FHD 60FPS', genre: 'Japan', country: 'JP', description: 'Japanese entertainment with anime and youth focused programming.' },
      { name: 'TV Asahi HD', quality: 'FHD 60FPS', genre: 'Japan', country: 'JP', description: 'Japanese news, entertainment, and anime programming.' },
      { name: 'TBS Japan HD', quality: 'FHD 60FPS', genre: 'Japan', country: 'JP', description: 'Tokyo Broadcasting System with drama, sport, and news.' },
      // Korea
      { name: 'KBS World HD', quality: 'FHD 60FPS', genre: 'South Korea', country: 'KR', description: 'Korean broadcasting with dramas, K-pop shows, and cultural programming.', popular: true },
      { name: 'KBS 1 HD', quality: 'FHD 60FPS', genre: 'South Korea', country: 'KR', description: 'Korean public broadcaster with news, drama, and cultural content.' },
      { name: 'KBS 2 HD', quality: 'FHD 60FPS', genre: 'South Korea', country: 'KR', description: 'Korean entertainment, variety shows, and dramas.' },
      { name: 'SBS Korea HD', quality: 'FHD 60FPS', genre: 'South Korea', country: 'KR', description: 'Korean entertainment with K-dramas and variety shows.' },
      { name: 'MBC Korea HD', quality: 'FHD 60FPS', genre: 'South Korea', country: 'KR', description: 'Korean drama network and entertainment programming.' },
      { name: 'tvN HD', quality: 'FHD 60FPS', genre: 'Korean Drama', country: 'KR', description: 'Popular Korean dramas and variety shows from tvN.' },
      { name: 'Arirang TV HD', quality: 'FHD 60FPS', genre: 'Korea International', country: 'KR', description: 'Korean international broadcaster with English content.' },
      // Philippines
      { name: 'ABS-CBN HD', quality: 'FHD 60FPS', genre: 'Philippines', country: 'PH', description: 'Philippine entertainment with dramas, news, and variety shows.' },
      { name: 'GMA Pinoy TV HD', quality: 'FHD 60FPS', genre: 'Philippines', country: 'PH', description: 'Philippine programming for international audiences.' },
      { name: 'GMA News TV HD', quality: 'FHD 60FPS', genre: 'Philippines News', country: 'PH', description: 'Philippine news channel with domestic and international coverage.' },
      { name: 'Cinema One HD', quality: 'FHD 60FPS', genre: 'Philippine Cinema', country: 'PH', description: 'Filipino films and cinema programming.' },
      // Vietnam, Thailand, Indonesia, Malaysia
      { name: 'VTV1 HD', quality: 'FHD 60FPS', genre: 'Vietnam', country: 'VN', description: 'Vietnam national broadcaster with news and entertainment.' },
      { name: 'VTV3 HD', quality: 'FHD 60FPS', genre: 'Vietnam', country: 'VN', description: 'Vietnamese entertainment, sports, and variety programming.' },
      { name: 'Thai TV 3 HD', quality: 'FHD 60FPS', genre: 'Thailand', country: 'TH', description: 'Thai entertainment, news, and drama programming.' },
      { name: 'Thai TV 5 HD', quality: 'FHD 60FPS', genre: 'Thailand', country: 'TH', description: 'Thai national broadcaster with news and sports.' },
      { name: 'RCTI HD', quality: 'FHD 60FPS', genre: 'Indonesia', country: 'ID', description: 'Indonesian entertainment, drama, and news programming.' },
      { name: 'SCTV HD', quality: 'FHD 60FPS', genre: 'Indonesia', country: 'ID', description: 'Indonesian entertainment network with dramas and shows.' },
      { name: 'Astro Ria HD', quality: 'FHD 60FPS', genre: 'Malaysia', country: 'MY', description: 'Malaysian entertainment channel with dramas and variety.' },
      { name: 'TV3 Malaysia HD', quality: 'FHD 60FPS', genre: 'Malaysia', country: 'MY', description: 'Malaysian national broadcaster with news and entertainment.' },
      // Middle East
      { name: 'Al Jazeera HD', quality: 'FHD 60FPS', genre: 'Middle East News', country: 'ME', description: 'International Arabic news channel with global coverage.', popular: true },
      { name: 'Al Jazeera English HD', quality: 'FHD 60FPS', genre: 'Middle East News', country: 'ME', description: 'Al Jazeera English with international news and documentaries.' },
      { name: 'Al Arabiya HD', quality: 'FHD 60FPS', genre: 'Middle East News', country: 'ME', description: 'Arabic news channel covering the Middle East and world events.' },
      { name: 'MBC 1 HD', quality: 'FHD 60FPS', genre: 'Middle East', country: 'ME', description: 'Middle Eastern entertainment with dramas, films, and shows.' },
      { name: 'MBC 2 HD', quality: 'FHD 60FPS', genre: 'Arabic Movies', country: 'ME', description: 'Arabic and international films with Arabic subtitles.' },
      { name: 'MBC 3 HD', quality: 'FHD 60FPS', genre: 'Kids Arabic', country: 'ME', description: 'Arabic language children programming and cartoons.' },
      { name: 'MBC 4 HD', quality: 'FHD 60FPS', genre: 'Arabic Drama', country: 'ME', description: 'Turkish and Arabic dramas dubbed in Arabic.' },
      { name: 'MBC Action HD', quality: 'FHD 60FPS', genre: 'Action', country: 'ME', description: 'Action films, series, and male focused entertainment.' },
      { name: 'Dubai TV HD', quality: 'FHD 60FPS', genre: 'UAE', country: 'ME', description: 'Dubai based Arabic entertainment and news programming.' },
      { name: 'Abu Dhabi Sports HD', quality: 'FHD 60FPS', genre: 'Arabic Sports', country: 'ME', description: 'Middle Eastern sports channel with football and international coverage.' },
      { name: 'Rotana Cinema HD', quality: 'FHD 60FPS', genre: 'Arabic Cinema', country: 'ME', description: 'Arabic films and classic Middle Eastern cinema.' },
      { name: 'Rotana Khalijia HD', quality: 'FHD 60FPS', genre: 'Gulf Entertainment', country: 'ME', description: 'Gulf region entertainment with dramas and shows.' },
      { name: 'LBC HD', quality: 'FHD 60FPS', genre: 'Lebanon', country: 'ME', description: 'Lebanese entertainment, news, and talk shows.' },
      { name: 'Al Kass HD', quality: 'FHD 60FPS', genre: 'Qatar Sports', country: 'ME', description: 'Qatar sports channel with football and international events.' },
      { name: 'Al Ekhbariya HD', quality: 'FHD 60FPS', genre: 'Saudi News', country: 'ME', description: 'Saudi Arabian news channel with regional coverage.' },
      { name: 'Saudi TV 1 HD', quality: 'FHD 60FPS', genre: 'Saudi Arabia', country: 'ME', description: 'Saudi Arabian national channel with news and entertainment.' },
      // New Zealand
      { name: 'TVNZ 1 HD', quality: 'FHD 60FPS', genre: 'New Zealand', country: 'NZ', description: 'New Zealand public broadcaster with news, drama, and sport.' },
      { name: 'TVNZ 2 HD', quality: 'FHD 60FPS', genre: 'New Zealand', country: 'NZ', description: 'New Zealand entertainment and youth oriented programming.' },
      { name: 'Three NZ HD', quality: 'FHD 60FPS', genre: 'New Zealand', country: 'NZ', description: 'New Zealand commercial network with entertainment and sport.' },
      { name: 'Sky Sport NZ HD', quality: 'FHD 60FPS', genre: 'NZ Sports', country: 'NZ', description: 'New Zealand sports channel with rugby and cricket coverage.' },
    ],
    faqs: [
      {
        question: 'Are all Asian and Middle Eastern channels properly sorted?',
        answer:
          'Yes. Our playlists are neatly organised into alphabetical country categories with flag icons for fast, intuitive channel surfing. You can find every Chinese, Indian, Pakistani, Japanese, Korean, and Middle Eastern channel in its own group.',
      },
      {
        question: 'Can I hide unwanted country groups from my channel list?',
        answer:
          'Yes. Through your IPTV player like IBO Player Pro or TiviMate, or via our chat support team, you can hide categories you do not use.',
      },
    ],
  },

  // =========================================================================
  // 6. MOVIES & VOD
  // =========================================================================
  {
    slug: 'movies-vod',
    name: 'Movies & VOD Library',
    totalChannels: 500,
    description:
      'Access 120,000+ cinema films and complete TV series from every major streaming platform in Full HD and 4K with English subtitles and Dolby 5.1 sound.',
    longDescription:
      'Our Video on Demand library is one of the largest in the world with over 120,000 movies and complete TV series boxsets spanning every genre, era, and streaming platform. New releases are added daily, so there is always something fresh to watch, whether you want an action blockbuster, a family comedy, or the latest award winning drama series.',
    keywords: [
      'iptv movies usa',
      'vod iptv usa',
      'netflix iptv usa',
      'hbo iptv usa',
      'disney plus iptv',
      'best iptv subscription movies',
    ],
    channels: [
      { name: 'Cinema Premiere 4K', quality: '4K UHD', genre: 'Latest Releases', description: 'The newest cinema releases in 4K UHD with Dolby 5.1 surround sound.', popular: true },
      { name: 'Cinema Action 4K', quality: '4K UHD', genre: 'Action & Blockbusters', description: 'Blockbuster action films, Marvel, DC, and Fast & Furious titles.' },
      { name: 'Cinema Action & Thriller', quality: 'FHD 60FPS', genre: 'Action & Thriller', description: 'Round the clock action hits, martial arts, and psychological thrillers.' },
      { name: 'Cinema Comedy & Romance', quality: 'FHD 60FPS', genre: 'Comedy & Romance', description: 'Comedies, romantic classics, and feel good cinema picks.' },
      { name: 'Cinema Sci-Fi & Fantasy', quality: '4K UHD', genre: 'Sci-Fi & Fantasy', description: 'Space adventures, superhero films, and epic fantasy spectacles.' },
      { name: 'Cinema Horror 4K', quality: '4K UHD', genre: 'Horror', description: 'Horror films in 4K UHD including classic and modern horror hits.' },
      { name: 'Cinema Drama Premium', quality: 'FHD 60FPS', genre: 'Drama', description: 'Award winning dramas, biopics, and Oscar winners on demand.' },
      { name: 'Cinema Family', quality: 'FHD 60FPS', genre: 'Family', description: 'Family friendly films, animation, and kids movies on demand.' },
      { name: 'Cinema Classics Vault', quality: 'FHD 60FPS', genre: 'Classic Cinema', description: 'Restored cinema classics from the 1970s, 80s, and 90s in HD.' },
      { name: 'Cinema Bollywood', quality: 'FHD 60FPS', genre: 'Bollywood', description: 'Latest and classic Bollywood films with English subtitles.' },
      { name: 'Cinema Asian Movies', quality: 'FHD 60FPS', genre: 'Asian Cinema', description: 'Chinese, Japanese, Korean, and Thai films with subtitles.' },
      { name: 'Cinema World Movies', quality: 'FHD 60FPS', genre: 'World Cinema', description: 'International films from Europe, Latin America, and the Middle East.' },
      { name: 'Cinema Documentary', quality: 'FHD 60FPS', genre: 'Documentary', description: 'Feature length documentaries on nature, history, and true crime.' },
      { name: 'Cinema 4K Marvel', quality: '4K UHD', genre: 'Marvel', description: 'Every MCU film in 4K UHD including Infinity Saga and Phase 4.' },
      { name: 'Cinema 4K DC', quality: '4K UHD', genre: 'DC Comics', description: 'All DC films in 4K UHD including Batman, Superman, and Justice League.' },
      { name: 'Cinema 4K Star Wars', quality: '4K UHD', genre: 'Star Wars', description: 'Complete Star Wars saga in 4K UHD including The Mandalorian.' },
      { name: 'Cinema 4K Pixar', quality: '4K UHD', genre: 'Pixar', description: 'Every Pixar animated film in 4K UHD with Dolby Atmos.' },
      { name: 'HBO Series Central', quality: 'FHD 60FPS', genre: 'HBO Originals', description: 'Complete seasons of Succession, House of the Dragon, The Last of Us, and more.', popular: true },
      { name: 'HBO Max Originals', quality: 'FHD 60FPS', genre: 'HBO Max', description: 'HBO Max exclusive content and streaming originals.' },
      { name: 'Netflix Stream Hub', quality: 'FHD 60FPS', genre: 'Netflix Originals', description: 'Every season of Stranger Things, Squid Game, and top Netflix documentaries.', popular: true },
      { name: 'Netflix Action Hub', quality: 'FHD 60FPS', genre: 'Netflix Action', description: 'Netflix action originals and thriller series.' },
      { name: 'Netflix Comedy Hub', quality: 'FHD 60FPS', genre: 'Netflix Comedy', description: 'Netflix comedy specials and sitcom originals.' },
      { name: 'Disney & Marvel Vault', quality: '4K UHD', genre: 'Marvel, Star Wars & Pixar', description: 'All MCU films, Star Wars sagas, and Pixar animation.', popular: true },
      { name: 'Disney+ Originals', quality: '4K UHD', genre: 'Disney Plus', description: 'Disney Plus exclusive series like The Mandalorian, WandaVision, and Loki.' },
      { name: 'Paramount Showcase', quality: 'FHD 60FPS', genre: 'Paramount Originals', description: 'Yellowstone universe, Star Trek series, and Paramount cinema releases.' },
      { name: 'Paramount+ Originals', quality: 'FHD 60FPS', genre: 'Paramount Plus', description: 'Paramount Plus exclusive series and streaming content.' },
      { name: 'Apple Originals Channel', quality: '4K UHD', genre: 'Apple TV+', description: 'Ted Lasso, Severance, The Morning Show, and award winning films.' },
      { name: 'Apple TV+ Movies', quality: '4K UHD', genre: 'Apple Movies', description: 'Apple TV+ original films including Oscar winners and premieres.' },
      { name: 'Amazon Prime Originals', quality: 'FHD 60FPS', genre: 'Amazon Prime', description: 'The Boys, Reacher, Rings of Power, and Prime Video originals.' },
      { name: 'Hulu Originals', quality: 'FHD 60FPS', genre: 'Hulu', description: 'The Handmaid Tale, Only Murders in the Building, and Hulu exclusives.' },
      { name: 'Peacock Originals', quality: 'FHD 60FPS', genre: 'Peacock', description: 'Peacock exclusive content and NBC originals on demand.' },
      { name: 'Showmax Originals', quality: 'FHD 60FPS', genre: 'Showmax', description: 'Showmax originals and African content on demand.' },
      { name: 'Documentary World', quality: 'FHD 60FPS', genre: 'Documentaries', description: 'High quality nature and true crime documentaries from around the world.' },
      { name: 'Horror Nights HD', quality: 'FHD 60FPS', genre: 'Horror', description: 'Spine chilling horror films, slashers, and paranormal documentaries.' },
      { name: 'Sci-Fi Series Central', quality: 'FHD 60FPS', genre: 'Sci-Fi Series', description: 'Complete sci-fi series like Star Trek, The Expanse, and more.' },
      { name: 'Fantasy Series Hub', quality: 'FHD 60FPS', genre: 'Fantasy Series', description: 'Fantasy series like Game of Thrones, The Witcher, and Wheel of Time.' },
      { name: 'Crime Drama Series', quality: 'FHD 60FPS', genre: 'Crime Series', description: 'Crime series including True Detective, Mindhunter, and Line of Duty.' },
      { name: 'British TV Boxsets', quality: 'FHD 60FPS', genre: 'British Series', description: 'Complete British series including Doctor Who, Sherlock, and Peaky Blinders.' },
      { name: 'US TV Boxsets', quality: 'FHD 60FPS', genre: 'US Series', description: 'Complete US series including Breaking Bad, The Sopranos, and The Wire.' },
      { name: 'Kids Animation Vault', quality: 'FHD 60FPS', genre: 'Kids Series', description: 'Complete kids animation series including Bluey, Peppa Pig, and Paw Patrol.' },
      { name: 'Anime Central', quality: 'FHD 60FPS', genre: 'Anime', description: 'Popular anime series including Naruto, One Piece, and Attack on Titan.' },
      { name: 'Korean Drama Hub', quality: 'FHD 60FPS', genre: 'K-Drama', description: 'Popular Korean dramas including Squid Game, Crash Landing on You, and more.' },
      { name: 'Turkish Drama Hub', quality: 'FHD 60FPS', genre: 'Turkish Drama', description: 'Popular Turkish dramas with subtitles in multiple languages.' },
      { name: 'Indian Series Hub', quality: 'FHD 60FPS', genre: 'Indian Series', description: 'Popular Indian series and web originals from major platforms.' },
      { name: 'Latin American Series', quality: 'FHD 60FPS', genre: 'Latin Series', description: 'Spanish and Portuguese language series from Latin America and Spain.' },
      { name: 'Reality TV Hub', quality: 'FHD 60FPS', genre: 'Reality', description: 'Reality TV series including Survivor, Big Brother, and The Amazing Race.' },
      { name: 'Food & Cooking Series', quality: 'FHD 60FPS', genre: 'Food', description: 'Complete cooking series from chef led shows to competition programs.' },
      { name: 'True Crime Vault', quality: 'FHD 60FPS', genre: 'True Crime', description: 'True crime documentaries and investigative series from around the world.' },
      { name: 'Classic TV Vault', quality: 'FHD 60FPS', genre: 'Classic TV', description: 'Classic television series from the 1960s through the 2000s.' },
      { name: 'Sitcom Vault', quality: 'FHD 60FPS', genre: 'Sitcom', description: 'Classic and modern sitcoms including Friends, Seinfeld, and The Office.' },
      { name: 'Sports Documentaries', quality: 'FHD 60FPS', genre: 'Sports Docs', description: 'Sports documentaries including The Last Dance and Formula 1 Drive to Survive.' },
      { name: 'Music Documentaries', quality: 'FHD 60FPS', genre: 'Music Docs', description: 'Music documentaries and concert films from every genre.' },
      { name: '4K Nature Documentaries', quality: '4K UHD', genre: 'Nature', description: 'BBC and National Geographic nature documentaries in 4K UHD.' },
      { name: '4K Action Movies', quality: '4K UHD', genre: '4K Action', description: 'Action films in 4K UHD with Dolby Atmos surround sound.' },
    ],
    faqs: [
      {
        question: 'How often is the VOD movie library updated?',
        answer:
          'Our movie and TV series catalogue is automatically updated daily with the latest cinema releases and streaming titles from every major platform.',
      },
      {
        question: 'Do all movies include English subtitles?',
        answer:
          'Yes. Over 95% of all foreign language films and series include selectable English subtitles, with additional subtitle languages available for most titles.',
      },
    ],
  },

  // =========================================================================
  // 7. KIDS & FAMILY
  // =========================================================================
  {
    slug: 'kids-family',
    name: 'Kids & Family',
    totalChannels: 200,
    description:
      'Safe and entertaining children channels for all ages. Disney Channel, Nickelodeon, Cartoon Network, PBS Kids, CBeebies, and educational programming from around the world.',
    longDescription:
      'Family friendly entertainment that parents can trust. Our Kids and Family category includes every major children network. Disney Channel, Disney Junior, Nickelodeon, Nick Jr., Cartoon Network, PBS Kids, CBeebies, and more. All programming is age appropriate and free of aggressive content, with parental control options built into every IPTV player.',
    keywords: [
      'kids iptv subscription',
      'disney channel iptv',
      'nickelodeon iptv subscription',
      'cartoon network iptv',
      'pbs kids iptv',
      'family iptv subscription',
      'best iptv subscription kids',
    ],
    channels: [
      // Nickelodeon family
      { name: 'Nickelodeon HD', quality: 'FHD 60FPS', genre: 'Animation & Kids', country: 'US', description: 'SpongeBob SquarePants, PAW Patrol, The Loud House, and teen series.', popular: true },
      { name: 'Nick Jr. HD', quality: 'FHD 60FPS', genre: 'Preschool', country: 'US', description: 'Educational and fun programs for the youngest viewers.' },
      { name: 'Nicktoons HD', quality: 'FHD 60FPS', genre: 'Animation', country: 'US', description: 'Round the clock animation series and classic cartoons.' },
      { name: 'TeenNick HD', quality: 'FHD 60FPS', genre: 'Teen', country: 'US', description: 'Teen oriented programming and classic Nick series.' },
      // Disney family
      { name: 'Disney Channel HD', quality: 'FHD 60FPS', genre: 'Disney Series', country: 'US', description: 'Popular Disney series, teen shows, and original Disney movies.', popular: true },
      { name: 'Disney Junior HD', quality: 'FHD 60FPS', genre: 'Preschool', country: 'US', description: 'Mickey Mouse Clubhouse, Spidey and His Amazing Friends, and Bluey.', popular: true },
      { name: 'Disney XD HD', quality: 'FHD 60FPS', genre: 'Action Animation', country: 'US', description: 'Action packed animated series and Marvel cartoons for kids.' },
      // Cartoon Network family
      { name: 'Cartoon Network HD', quality: 'FHD 60FPS', genre: 'Classic Cartoons', country: 'US', description: 'Teen Titans Go, Gumball, Adventure Time, and Scooby Doo.' },
      { name: 'Boomerang HD', quality: 'FHD 60FPS', genre: 'Classic Animation', country: 'US', description: 'Tom and Jerry, Looney Tunes, Mr Bean animation, and preschool series.' },
      { name: 'Adult Swim HD', quality: 'FHD 60FPS', genre: 'Adult Animation', country: 'US', description: 'Adult Swim with Rick and Morty, Family Guy, and American Dad.' },
      // Australian kids
      { name: 'ABC Kids AU HD', quality: 'FHD 60FPS', genre: 'Australian Kids', country: 'AU', description: 'Bluey, Play School, and quality Australian children programming.' },
      { name: 'ABC ME HD', quality: 'FHD 60FPS', genre: 'Youth', country: 'AU', description: 'Programming for older children and teenagers on ABC ME.' },
      // UK kids
      { name: 'CBeebies HD', quality: 'FHD 60FPS', genre: 'Preschool UK', country: 'UK', description: 'BBC preschool programming with educational content for young viewers.' },
      { name: 'CBBC HD', quality: 'FHD 60FPS', genre: 'UK Kids', country: 'UK', description: 'BBC children programming with CBBC originals and animation.' },
      { name: 'Cartoonito HD', quality: 'FHD 60FPS', genre: 'Preschool', country: 'UK', description: 'Preschool animation and educational content for toddlers.' },
      { name: 'Hop! Channel HD', quality: 'FHD 60FPS', genre: 'Kids', country: 'UK', description: 'British kids channel with educational and entertainment programming.' },
      { name: 'Pop HD', quality: 'FHD 60FPS', genre: 'Kids', country: 'UK', description: 'British kids entertainment channel with popular animated series.' },
      { name: 'Tiny Pop HD', quality: 'FHD 60FPS', genre: 'Preschool', country: 'UK', description: 'Preschool animation programming for young children.' },
      // US kids
      { name: 'PBS Kids HD', quality: 'FHD 60FPS', genre: 'Educational', country: 'US', description: 'American educational children programming with STEM focus.' },
      { name: 'Sprout HD', quality: 'FHD 60FPS', genre: 'Preschool', country: 'US', description: 'Preschool programming block with educational content.' },
      { name: 'Universal Kids HD', quality: 'FHD 60FPS', genre: 'Kids', country: 'US', description: 'Universal Kids with original programming and family content.' },
      // Other kids
      { name: 'Baby TV HD', quality: 'FHD 60FPS', genre: 'Toddler', country: 'EU', description: 'Programming for babies and toddlers with educational content.' },
      { name: 'BabyFirst HD', quality: 'FHD 60FPS', genre: 'Toddler', country: 'US', description: 'Educational programming for babies with focus on early learning.' },
      { name: 'Da Vinci Kids HD', quality: 'FHD 60FPS', genre: 'Educational', country: 'EU', description: 'Educational content focused on science, math, and creativity.' },
      { name: 'National Geographic Kids HD', quality: 'FHD 60FPS', genre: 'Educational', country: 'US', description: 'Nat Geo Kids with educational nature and science programming.' },
      { name: 'Discovery Kids HD', quality: 'FHD 60FPS', genre: 'Educational', country: 'US', description: 'Discovery Kids programming with exploration and learning shows.' },
      // Canadian kids
      { name: 'Family Channel HD', quality: 'FHD 60FPS', genre: 'Family', country: 'CA', description: 'Family programming, kids shows, and teen dramas for Canadian viewers.' },
      { name: 'YTV HD', quality: 'FHD 60FPS', genre: 'Youth', country: 'CA', description: 'Canadian youth network with animation and teen entertainment.' },
      { name: 'Teletoon HD', quality: 'FHD 60FPS', genre: 'Animation', country: 'CA', description: 'Canadian animation channel with original and international cartoons.' },
      { name: 'Treehouse HD', quality: 'FHD 60FPS', genre: 'Preschool', country: 'CA', description: 'Preschool programming in English and French for the youngest viewers.' },
      { name: 'Knowledge Kids HD', quality: 'FHD 60FPS', genre: 'Educational', country: 'CA', description: 'Educational programming for children of all ages.' },
      // Anime and teens
      { name: 'Anime Central Kids', quality: 'FHD 60FPS', genre: 'Anime Kids', country: 'JP', description: 'Family friendly anime programming including Doraemon and Pokemon.' },
      { name: 'Kids Station HD', quality: 'FHD 60FPS', genre: 'Anime', country: 'JP', description: 'Japanese kids station with popular anime series.' },
      { name: 'Nick Music HD', quality: 'FHD 60FPS', genre: 'Music', country: 'US', description: 'Nick Music with music videos for kids and teens.' },
      { name: 'The CW Kids HD', quality: 'FHD 60FPS', genre: 'Teen', country: 'US', description: 'Family friendly programming from The CW network.' },
      // Movie channels for kids
      { name: 'Disney Junior Movies HD', quality: 'FHD 60FPS', genre: 'Preschool Movies', country: 'US', description: 'Disney Junior movies and special programs for young children.' },
      { name: 'Cartoon Network Movies HD', quality: 'FHD 60FPS', genre: 'Animation Movies', country: 'US', description: 'Animated feature films from Cartoon Network studios.' },
      { name: 'Nick Movies HD', quality: 'FHD 60FPS', genre: 'Kids Movies', country: 'US', description: 'Nickelodeon original movies and family features.' },
      { name: 'PBS Kids Movies HD', quality: 'FHD 60FPS', genre: 'Educational', country: 'US', description: 'PBS Kids movies with educational content.' },
      { name: 'Hallmark Family HD', quality: 'FHD 60FPS', genre: 'Family Movies', country: 'US', description: 'Hallmark original family movies and holiday programming.' },
      { name: 'Hallmark Movies & Mysteries HD', quality: 'FHD 60FPS', genre: 'Family Movies', country: 'US', description: 'Hallmark mystery movies and family entertainment.' },
      { name: 'UPtv HD', quality: 'FHD 60FPS', genre: 'Family', country: 'US', description: 'Family friendly entertainment and original programming.' },
      { name: 'Zoomoo HD', quality: 'FHD 60FPS', genre: 'Nature Kids', country: 'US', description: 'Nature and animal focused kids programming with fun hosts.' },
      { name: 'Duck TV HD', quality: 'FHD 60FPS', genre: 'Toddler', country: 'EU', description: 'Simple animation for very young children with minimal stimulation.' },
      { name: 'LooLoo Kids HD', quality: 'FHD 60FPS', genre: 'Toddler', country: 'US', description: 'Nursery rhymes and educational songs for toddlers.' },
      { name: 'Moonbug Kids HD', quality: 'FHD 60FPS', genre: 'Toddler', country: 'UK', description: 'Cocomelon, Blippi, and other popular toddler programming.' },
      { name: 'Sesame Street HD', quality: 'FHD 60FPS', genre: 'Preschool', country: 'US', description: 'Sesame Street and Sesame Workshop programming for young children.' },
      { name: 'Baby Einstein HD', quality: 'FHD 60FPS', genre: 'Toddler', country: 'US', description: 'Educational content for infants and toddlers from Baby Einstein.' },
    ],
    faqs: [
      {
        question: 'Are the kids channels available in multiple languages?',
        answer:
          'Yes. Many major children channels broadcast with multiple audio tracks including English, French, and Spanish, so your family can switch languages as needed.',
      },
      {
        question: 'Can I set parental controls on the IPTV app?',
        answer:
          'Yes. Virtually all IPTV players including IBO Player Pro and TiviMate offer parental control PIN codes so you can block specific channels or categories.',
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------
export function getChannelCategoryBySlug(slug: string): ChannelCategory | undefined {
  return channelsData.find((category) => category.slug === slug);
}

export function getAllCategorySlugs(): string[] {
  return channelsData.map((category) => category.slug);
}