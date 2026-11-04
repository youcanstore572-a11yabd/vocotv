// app/reseller/layout.tsx
import type { Metadata } from 'next';
import { CONSTANTS } from '@/lib/seo';

// SEO CONSTANTS
const SITE_URL = CONSTANTS.SITE_URL;
const BRAND = CONSTANTS.BRAND_NAME;
const YEAR = new Date().getFullYear();
const PAGE_URL = `${SITE_URL}/reseller`;

// ---------------------------------------------------------------------------
// SEO SAFETY HELPERS — enforce char limits
// ---------------------------------------------------------------------------
const clampTitle = (s: string, max = 60): string =>
  s.length <= max ? s : s.slice(0, max - 1).trimEnd() + '…';

const clampDescription = (s: string, max = 158): string =>
  s.length <= max ? s : s.slice(0, max - 3).trimEnd() + '...';

// ---------------------------------------------------------------------------
// SEO STRINGS — locked to safe SERP lengths
// ---------------------------------------------------------------------------
const PAGE_TITLE = clampTitle(
  `${BRAND} Reseller USA | Start at $320`
);

const PAGE_DESCRIPTION = clampDescription(
  `Become a ${BRAND} reseller in the USA from $320. Buy wholesale credits, sell yearly at $60–110, earn up to $78 profit per sale. Instant panel access.`
);

// ---------------------------------------------------------------------------
// METADATA CONFIGURATION
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  keywords: [
    'reseller usa',
    'become reseller',
    'reseller panel usa',
    'reseller program',
    'best reseller usa',
    'credits usa',
    'wholesale usa',
    'reseller business',
    'reseller panel',
    'subscription reseller',
  ],
  authors: [{ name: `${BRAND} Team` }],
  creator: BRAND,
  publisher: BRAND,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
        url: `${SITE_URL}/img/blog/article-reseller/cover.webp`,
        width: 1200,
        height: 630,
        alt: `${BRAND} Reseller Program USA ${YEAR}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [`${SITE_URL}/img/blog/article-reseller/cover.webp`],
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
  category: 'business',
};

// ---------------------------------------------------------------------------
// JSON-LD SCHEMAS — WebPage + Service + Product + FAQ + Breadcrumbs (Organization removed)
// ---------------------------------------------------------------------------
const ResellerSchema = () => {
  const currentDate = new Date().toISOString().split('T')[0];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      // WEBPAGE
      {
        '@type': 'WebPage',
        '@id': `${PAGE_URL}/#webpage`,
        url: PAGE_URL,
        name: `${BRAND} Reseller Program USA`,
        description: PAGE_DESCRIPTION,
        inLanguage: CONSTANTS.LANGUAGE,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#organization` },
        breadcrumb: { '@id': `${PAGE_URL}/#breadcrumb` },
        primaryImageOfPage: { '@id': `${PAGE_URL}/#primaryimage` },
      },

      // PRIMARY IMAGE
      {
        '@type': 'ImageObject',
        '@id': `${PAGE_URL}/#primaryimage`,
        url: `${SITE_URL}/img/blog/article-reseller/cover.webp`,
        contentUrl: `${SITE_URL}/img/blog/article-reseller/cover.webp`,
        width: 1200,
        height: 630,
        caption: `${BRAND} Reseller Program USA ${YEAR}`,
      },

      // BREADCRUMB
      {
        '@type': 'BreadcrumbList',
        '@id': `${PAGE_URL}/#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Reseller Program',
            item: PAGE_URL,
          },
        ],
      },

      // SERVICE — B2B Offering
      {
        '@type': 'Service',
        '@id': `${PAGE_URL}/#service`,
        name: `${BRAND} Reseller Program USA ${YEAR}`,
        description: `Become a ${BRAND} reseller in the USA. Buy wholesale credits, sell yearly subscriptions at $60 to $110, and earn up to $78 profit per customer.`,
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: {
          '@type': 'Country',
          name: 'United States',
        },
        serviceType: 'Reseller Panel',
        offers: [
          {
            '@type': 'Offer',
            name: 'Starter Reseller Package (10 Credits)',
            price: '320.00',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            url: PAGE_URL,
            validFrom: currentDate,
            description:
              '10 reseller credits, full panel access, 24/7 live chat support. Credits never expire.',
          },
          {
            '@type': 'Offer',
            name: 'Growth Reseller Package (20 Credits)',
            price: '590.00',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            url: PAGE_URL,
            validFrom: currentDate,
            description:
              '20 reseller credits, priority support, API access, credits never expire.',
          },
          {
            '@type': 'Offer',
            name: 'Pro Reseller Package (30 Credits)',
            price: '800.00',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            url: PAGE_URL,
            validFrom: currentDate,
            description:
              '30 reseller credits, dedicated support, white label option, full API access.',
          },
        ],
      },

      // PRODUCT + AGGREGATEOFFER
      {
        '@type': 'Product',
        '@id': `${PAGE_URL}/#product`,
        name: `${BRAND} Reseller Program USA`,
        description: `Wholesale ${BRAND} reseller credits for the USA. Buy in bulk, resell at your own price.`,
        brand: {
          '@id': `${SITE_URL}/#organization`,
        },
        category: 'Business Service',
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'USD',
          lowPrice: '320.00',
          highPrice: '800.00',
          offerCount: '3',
          availability: 'https://schema.org/InStock',
          url: PAGE_URL,
        },
      },

      // FAQ SECTION
      {
        '@type': 'FAQPage',
        '@id': `${PAGE_URL}/#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What exactly is a reseller panel?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `A reseller panel is a private dashboard that lets you create and manage ${BRAND} subscriptions for your own customers. You buy credits from us in bulk, then use those credits to activate yearly, monthly, or trial subscriptions for anyone you sell to.`,
            },
          },
          {
            '@type': 'Question',
            name: `How much can I realistically earn as a ${BRAND} reseller in the USA?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Customers typically pay between $60 and $110 per year. Your wholesale cost starts around $32 per credit, so your profit per sale ranges from $28 to $78. Sell 10 subscriptions at $85 and you have earned roughly $530 profit from a $320 investment.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do I need technical skills to become a reseller?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. The reseller panel is designed to be simple. If you can use live chat and a web browser, you can run a reseller business. We provide onboarding guidance over live chat any time you get stuck.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do the reseller credits expire?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. Your credits stay in your account indefinitely. There is no expiration date, no monthly minimum, and no pressure to sell quickly.',
            },
          },
          {
            '@type': 'Question',
            name: 'Which currencies can I sell in?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'You can sell to your customers in any currency you prefer. Your wholesale cost with us is fixed in USD. Your retail price is completely up to you, so you control your margin.',
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      id="reseller-page-schema"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
    />
  );
};

// ---------------------------------------------------------------------------
// RESPONSIVE RESELLER LAYOUT
// ---------------------------------------------------------------------------
export default function ResellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full overflow-x-hidden min-h-screen flex flex-col bg-white text-[#111111]">
      <ResellerSchema/>
      <main className="flex-grow w-full">{children}</main>
    </div>
  );
}