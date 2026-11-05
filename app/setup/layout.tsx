// app/setup/layout.tsx
import type { Metadata } from 'next';
import { CONSTANTS } from '@/lib/seo';

// ---------------------------------------------------------------------------
// SEO SAFETY HELPERS
// ---------------------------------------------------------------------------
const clampTitle = (s: string, max = 60): string =>
  s.length <= max ? s : s.slice(0, max - 1).trimEnd() + '…';

const clampDescription = (s: string, max = 160): string =>
  s.length <= max ? s : s.slice(0, max - 3).trimEnd() + '...';

const SITE_URL = CONSTANTS.SITE_URL;
const BRAND = CONSTANTS.BRAND_NAME;
const PAGE_URL = `${SITE_URL}/setup`;

// ---------------------------------------------------------------------------
// SEO STRINGS — Locked (Title 50–59, Desc 120–130)
// ---------------------------------------------------------------------------
const PAGE_TITLE = clampTitle(
  `VOCO TV Setup | Firestick, Smart TV & Mobile Guide`
);

const PAGE_DESCRIPTION = clampDescription(
  `${BRAND} setup guide for Firestick, Smart TV, Android & iOS. Install IBO Player Pro in 10 min with chat help and a free trial.`
);

// ---------------------------------------------------------------------------
// METADATA
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: PAGE_TITLE,
    absolute: PAGE_TITLE,
  },
  description: PAGE_DESCRIPTION,
  authors: [{ name: `${BRAND} Team` }],
  creator: BRAND,
  publisher: BRAND,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'en-US': PAGE_URL,
      'en-CA': PAGE_URL,
      'x-default': PAGE_URL,
    },
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: BRAND,
    locale: CONSTANTS.LOCALE,
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/img/structer.webp`,
        width: 1200,
        height: 630,
        alt: `${BRAND} Setup Guide for Firestick, Smart TV and Mobile`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [`${SITE_URL}/img/structer.webp`],
  },
  category: 'entertainment',
  keywords: [
    'streaming setup usa',
    'streaming firestick setup usa',
    'smart tv install usa',
    'ibo player pro setup',
    'best subscription',
    'streaming service',
    'installation usa',
    'how to install streaming usa',
    'firestick usa',
    'android tv setup',
    'apple tv install',
    'mag box setup',
    'xtream codes setup',
    'm3u playlist guide',
    'smart tv app usa',
  ],
};

// ---------------------------------------------------------------------------
// JSON-LD SCHEMA — HowTo + FAQPage + Breadcrumbs (Pure Informational)
// NOTE: Removed duplicate Organization schema to prevent conflict/duplication
// with the global Organization schema defined in app/layout.tsx.
// ---------------------------------------------------------------------------
const SetupPageSchema = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      // HOW TO SCHEMA
      {
        '@type': 'HowTo',
        '@id': `${PAGE_URL}/#howto`,
        name: `How to Set Up ${BRAND} on Any Device in the USA`,
        description: `Complete step by step installation guide for ${BRAND} on Firestick, Smart TV, Android, Apple TV, and PC or Mac. Guided chat setup and a free 24 hour trial.`,
        totalTime: 'PT10M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '39.00',
        },
        image: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/img/structer.webp`,
          width: 1200,
          height: 630,
        },
        supply: [
          {
            '@type': 'HowToSupply',
            name: 'Smart TV, Firestick, Android TV, Apple TV, or PC or Mac',
          },
          {
            '@type': 'HowToSupply',
            name: 'Stable internet connection (minimum 15 Mbps, 30 Mbps for 4K)',
          },
          {
            '@type': 'HowToSupply',
            name: `Active ${BRAND} subscription or free trial`,
          },
        ],
        tool: [
          {
            '@type': 'HowToTool',
            name: 'IBO Player Pro (recommended streaming player)',
          },
          {
            '@type': 'HowToTool',
            name: 'Live chat (for 24/7 setup support)',
          },
        ],
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Choose Your Plan',
            text: `Visit the pricing page and select a ${BRAND} subscription. Choose 3, 6, or 12 months with 1, 2, or 3 simultaneous screens. Pricing is in US dollars.`,
            url: `${SITE_URL}/pricing`,
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Contact Support on Chat',
            text: 'Message our team on chat. We confirm pricing in USD, send a secure payment link, and walk you through the setup from start to finish.',
            url: CONSTANTS.CONTACT?.whatsappUrl || '#',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Download IBO Player Pro',
            text: 'Install IBO Player Pro, one of the fastest and most stable players for Firestick, Smart TVs, Apple devices, and PC or Mac.',
            url: 'https://iboplayer.pro/',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Choose Auto or Manual Setup',
            text: 'Choose Auto Setup where our team activates remotely using your Device Key, or Manual Setup where you enter the M3U URL or Xtream Codes credentials we send you on chat.',
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Load Content in 1 to 2 Minutes',
            text: 'Once activated, IBO Player Pro automatically loads your full channel list, movies and TV shows library, and 7 day EPG guide.',
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Test on Your Free Trial',
            text: 'Try everything on the free 24 hour trial. Check the picture quality, sport lineup, and playback on your device before you upgrade to a paid plan.',
          },
          {
            '@type': 'HowToStep',
            position: 7,
            name: `Start Streaming ${BRAND}`,
            text: 'Enjoy instant access to 36,000+ live channels and 120,000+ movies and TV shows in 4K quality. Sport coverage includes NFL Sunday, NBA, MLB, NHL, college football, and Formula 1.',
          },
        ],
      },

      // FAQ SCHEMA
      {
        '@type': 'FAQPage',
        '@id': `${PAGE_URL}/#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How do I receive my login details after purchasing a plan?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Everything is handled live over chat. Once you confirm your plan and complete payment, our team sends your setup details directly in the chat, usually within minutes.',
            },
          },
          {
            '@type': 'Question',
            name: 'Which streaming player do you recommend?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `We recommend IBO Player Pro for the fastest channel zapping, lowest RAM usage, and best 4K performance across Firestick, Smart TVs, Apple devices, and PC or Mac. It is one of our top picks for smooth playback.`,
            },
          },
          {
            '@type': 'Question',
            name: 'Do I need to activate IBO Player Pro separately?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The activation service is included free with every subscription. Choose Auto Setup where you send us your Device Key and we activate remotely, or Manual Setup where you enter M3U or Xtream Codes yourself.',
            },
          },
          {
            '@type': 'Question',
            name: 'How long does the full setup take?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Most customers are streaming within 10 minutes. Installing IBO Player Pro takes about 2 minutes, activation takes 1 to 2 minutes, and content loading takes 1 to 2 minutes.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I use my login credentials on multiple devices?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, you can install the app on unlimited devices. The number of simultaneous streams depends on your plan, with 1 screen for Standard or 2 and 3 screens for Multi room.',
            },
          },
          {
            '@type': 'Question',
            name: 'What should I do if I get a login error in IBO Player Pro?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Confirm you selected the Xtream Codes API method, not M3U, and that there are no extra spaces in your username or password. If it persists, message us on chat and most issues resolve within 2 minutes.',
            },
          },
          {
            '@type': 'Question',
            name: 'What internet speed do I need for 4K streaming?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'For 4K Ultra HD we recommend 30 Mbps minimum. Full HD 1080p runs smoothly on 15 Mbps. Anti freeze server technology adapts to your connection speed automatically.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do I need a VPN to use your service?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No, our US servers are optimised and secure. If your internet provider applies streaming throttling during peak hours, you can enable a VPN without issues.',
            },
          },
        ],
      },

      // BREADCRUMBS
      {
        '@type': 'BreadcrumbList',
        '@id': `${PAGE_URL}/#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Setup Guide',
            item: PAGE_URL,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      id="setup-page-schema"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
    />
  );
};

// ---------------------------------------------------------------------------
// RESPONSIVE SETUP LAYOUT
// ---------------------------------------------------------------------------
export default function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full overflow-x-hidden min-h-screen flex flex-col bg-white text-[#111111]">
      <SetupPageSchema/>
      <main className="flex-grow w-full">{children}</main>
    </div>
  );
}