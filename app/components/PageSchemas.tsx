// components/PageSchemas.tsx
import React from 'react';
import { CONSTANTS } from '@/lib/seo';

const SITE_URL = `https://${CONSTANTS.DOMAIN}`;
const BRAND = CONSTANTS.BRAND_NAME;

// 1. Global Organization Schema (Safe for Root Layout)
export function OrganizationSchema() {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: BRAND,
    url: SITE_URL,
    logo: `${SITE_URL}/img/structer.webp`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-227-153-1925',
      contactType: 'customer support',
      areaServed: 'US',
      availableLanguage: ['English'],
    },
  };

  return (
    <script
      type="application/ld+json"
      id="org-schema"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema).replace(/</g, '\\u003c') }}
    />
  );
}

// 2. Product Schema (Import ONLY on app/page.tsx or pricing pages)
export function ProductSchema() {
  const commonOfferDefaults = {
    validFrom: '2026-01-01',
    hasMerchantReturnPolicy: {
      '@type': 'MerchantReturnPolicy',
      applicableCountry: 'US',
      returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
    },
    shippingDetails: {
      '@type': 'OfferShippingDetails',
      shippingRate: {
        '@type': 'MonetaryAmount',
        value: '0.00',
        currency: 'USD',
      },
      shippingDestination: {
        '@type': 'DefinedRegion',
        addressCountry: 'US',
      },
      deliveryTime: {
        '@type': 'ShippingDeliveryTime',
        handlingTime: {
          '@type': 'QuantitativeValue',
          minValue: 0,
          maxValue: 0,
          unitCode: 'DAY',
        },
        transitTime: {
          '@type': 'QuantitativeValue',
          minValue: 0,
          maxValue: 0,
          unitCode: 'DAY',
        },
      },
    },
  };

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${SITE_URL}/#product`,
    name: `${BRAND} Premium Subscription`,
    sku: 'SUB-US-PREMIUM',
    category: 'Streaming Service',
    description: `${BRAND} is a US subscription streaming 36,000+ live channels and 120,000+ movies and TV shows in 4K Ultra HD. Setup is guided on live chat, a free trial is available, and pricing is in USD with no lock in contract.`,
    image: {
      '@type': 'ImageObject',
      '@id': `${SITE_URL}/#primaryimage`,
      url: `${SITE_URL}/img/structer.webp`,
      contentUrl: `${SITE_URL}/img/structer.webp`,
      width: { '@type': 'QuantitativeValue', value: 1200 },
      height: { '@type': 'QuantitativeValue', value: 630 },
      caption: `${BRAND} - 4K Ultra HD Streaming Service`,
      representativeOfPage: true,
    },
    brand: {
      '@type': 'Brand',
      name: BRAND,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1205',
      bestRating: '5',
      worstRating: '1',
    },
    offers: [
      {
        '@type': 'Offer',
        name: '1 Screen - 3 Months',
        price: '39.00',
        priceCurrency: 'USD',
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/pricing`,
        ...commonOfferDefaults,
      },
      {
        '@type': 'Offer',
        name: '1 Screen - 6 Months',
        price: '49.00',
        priceCurrency: 'USD',
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/pricing`,
        ...commonOfferDefaults,
      },
      {
        '@type': 'Offer',
        name: '1 Screen - 12 Months',
        price: '69.00',
        priceCurrency: 'USD',
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/pricing`,
        ...commonOfferDefaults,
      },
      {
        '@type': 'Offer',
        name: '2 Screens - 3 Months',
        price: '45.00',
        priceCurrency: 'USD',
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/pricing`,
        ...commonOfferDefaults,
      },
      {
        '@type': 'Offer',
        name: '2 Screens - 6 Months',
        price: '65.00',
        priceCurrency: 'USD',
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/pricing`,
        ...commonOfferDefaults,
      },
      {
        '@type': 'Offer',
        name: '2 Screens - 12 Months',
        price: '89.00',
        priceCurrency: 'USD',
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/pricing`,
        ...commonOfferDefaults,
      },
      {
        '@type': 'Offer',
        name: '3 Screens - 3 Months',
        price: '59.00',
        priceCurrency: 'USD',
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/pricing`,
        ...commonOfferDefaults,
      },
      {
        '@type': 'Offer',
        name: '3 Screens - 6 Months',
        price: '79.00',
        priceCurrency: 'USD',
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/pricing`,
        ...commonOfferDefaults,
      },
      {
        '@type': 'Offer',
        name: '3 Screens - 12 Months',
        price: '99.00',
        priceCurrency: 'USD',
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/pricing`,
        ...commonOfferDefaults,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      id="product-schema"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema).replace(/</g, '\\u003c') }}
    />
  );
}

// 3. Homepage FAQ Schema (Import ONLY on app/page.tsx)
export function FAQSchema() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/#home-faq`,
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is streaming television and how does it work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Instead of a cable or satellite box, your channels and movies stream directly over your internet connection. You can watch 36,000+ live channels and over 120,000 movies and TV shows in 4K on your Smart TV, Firestick, phone, or tablet.',
        },
      },
      {
        '@type': 'Question',
        name: `Why is ${BRAND} the best streaming subscription in the USA?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We build everything around US viewers. You get 36,000+ live channels covering the NFL, NBA, MLB, NHL, college football, ESPN, HBO, and Showtime, plus over 120,000 movies and TV shows on demand. Anti freeze servers run on dedicated capacity in New York and Los Angeles for smooth playback during peak events.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which devices are compatible with your US streaming service?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our service works on Samsung and LG Smart TVs, Android TV, Google TV, Amazon Firestick, Apple TV, iPhone, iPad, Windows PC, Mac, plus set top boxes. If you are not sure about your device, message us on live chat and we will check before you subscribe.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does the setup and activation process work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Once you choose your plan and screen count, we chat on live chat. Our team walks you through installing and configuring a player app, then sends you the test content. You try everything on the free trial, and only upgrade to a paid subscription once you are happy.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I request a free trial before I pay?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Message us on live chat and we will set you up with a free 24 hour trial so you can test the 4K picture quality, check the channel lineup for sports, and make sure everything runs smooth on your device and internet connection.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I install the player on my Smart TV or Firestick?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For Smart TVs and Firestick, download a supported player from your app store, then enter the login details we send you on live chat. If any step is unclear, our support team guides you through it directly in the chat.',
        },
      },
      {
        '@type': 'Question',
        name: 'What payment methods do you accept and what currency is used?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'All prices are in US dollars (USD $) with no lock in contract. We accept Credit Card, PayPal, and Crypto through a secure encrypted checkout. You can pick a 3, 6, or 12 month plan and choose 1, 2, or 3 screens for your household.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is technical support available during my subscription?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, right through your whole subscription. Message our team on live chat any time for help with installation, setup, or anything else.',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      id="home-faq-schema"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }}
    />
  );
}