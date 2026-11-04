// app/privacy/page.tsx
import { CONSTANTS, generateSEOMetadata } from '@/lib/seo';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  Eye,
  Mail,
  CheckCircle,
  Server,
  FileText,
} from 'lucide-react';

const SITE_URL = `https://${CONSTANTS.DOMAIN}`;
const BRAND = CONSTANTS.BRAND_NAME;
const PAGE_URL = `${SITE_URL}/privacy`;

// ---------------------------------------------------------------------------
// METADATA
// ---------------------------------------------------------------------------
export const metadata = generateSEOMetadata(
  'Privacy Policy & Data Protection',
  `Read how ${BRAND} safeguards your privacy and personal data in compliance with US privacy regulations, GDPR (EU), and CCPA (California). 100% confidential.`,
  '/privacy'
);

// ---------------------------------------------------------------------------
// JSON-LD
// ---------------------------------------------------------------------------
const PrivacySchema = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${PAGE_URL}/#webpage`,
        url: PAGE_URL,
        name: `Privacy Policy | ${BRAND}`,
        description: `${BRAND} privacy policy. How we collect, protect, and manage your personal data in compliance with US privacy regulations, GDPR, and CCPA.`,
        inLanguage: 'en-US',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${PAGE_URL}/#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: PAGE_URL },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      id="privacy-page-schema"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

// ---------------------------------------------------------------------------
// MAIN PAGE
// ---------------------------------------------------------------------------
export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-[#111111]">

      <PrivacySchema />

      {/* HERO */}
      <section className="relative pt-32 pb-16 overflow-hidden border-b border-[#111111]/10 bg-gradient-to-b from-[#EF233C] via-[#2a0814] to-black text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(239,35,60,0.2),_transparent_50%)] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #FFFFFF08 1px, transparent 1px), linear-gradient(to bottom, #FFFFFF08 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 flex flex-col items-center justify-center">
          <div className="inline-flex items-center gap-2 bg-black/60 px-4 py-2 rounded-none mb-6 shadow-md border border-[#FFD700]/40">
            <ShieldCheck className="w-4 h-4 text-[#FFD700]" />
            <span className="text-white font-black text-xs uppercase tracking-widest">
              Privacy & Data Guarantee 🇺🇸
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-6 drop-shadow-md">
            Privacy <span className="text-[#FFD700]">Policy</span>
          </h1>

          <p className="text-lg md:text-xl text-white/90 font-bold max-w-2xl mx-auto leading-relaxed">
            At {BRAND}, we place the highest value on your privacy. Learn how we confidentially collect, protect, and manage your personal data.
          </p>

          <p className="text-xs text-white/50 mt-4 font-bold uppercase tracking-wider">
            Last updated:{' '}
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="max-w-4xl mx-auto px-4 py-16 w-full">

        {/* Commitment Card */}
        <div className="bg-[#f9f9f9] border-2 border-[#111111]/15 rounded-none p-6 md:p-8 mb-12 shadow-sm">
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-none bg-[#EF233C]/10 flex items-center justify-center border border-[#EF233C]/30">
                <Lock className="w-6 h-6 text-[#EF233C]" />
              </div>
            </div>
            <div>
              <p className="text-[#333333] font-bold text-sm md:text-base leading-relaxed">
                <span className="text-[#EF233C] font-black uppercase tracking-wide block mb-1">
                  Our Privacy Promise:
                </span>
                We treat your data with strict confidentiality in full compliance with US privacy regulations, the EU GDPR, and the California CCPA. We never store viewing history, and we never sell your data to third parties under any circumstances.
              </p>
            </div>
          </div>
        </div>

        {/* Legal Body */}
        <div className="space-y-10">

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-[#111111] uppercase tracking-tight mb-4 flex items-center gap-3">
              <span className="w-2 h-7 bg-[#EF233C] rounded-none inline-block" />
              1. Data We Collect
            </h2>
            <p className="text-[#333333] text-base font-medium leading-relaxed mb-4">
              When you use {BRAND}&apos;s services, we process only the minimum data necessary to deliver your subscription:
            </p>
            <ul className="space-y-3 mb-6">
              {[
                'Email address and/or chat contact (used to send your login credentials and subscription status).',
                'Payment verification (securely and encrypted through licensed payment processors; we do not store credit card or bank details).',
                'IP address and device type (temporary, for server connection, load balancing, and fraud prevention).',
                'Selected subscription duration and number of active streams or screens.',
                'Customer support communication history for fast assistance.',
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-[#333333] font-bold text-sm md:text-base"
                >
                  <CheckCircle className="w-5 h-5 text-[#EF233C] flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="bg-[#f9f9f9] border-2 border-[#111111]/15 rounded-none p-6 my-6 shadow-sm">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-none bg-[#EF233C]/10 flex items-center justify-center border border-[#EF233C]/30">
                    <Eye className="w-5 h-5 text-[#EF233C]" />
                  </div>
                </div>
                <div>
                  <p className="text-[#333333] text-sm font-bold leading-relaxed">
                    <span className="text-[#EF233C] font-black uppercase tracking-wide block mb-0.5">
                      What We Never Collect:
                    </span>
                    We do not record viewing behaviour, channel selections, searches, or specific stream logs. Your streaming activity is and remains 100% private.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-[#111111] uppercase tracking-tight mb-4 flex items-center gap-3">
              <span className="w-2 h-7 bg-[#EF233C] rounded-none inline-block" />
              2. How We Use Your Data
            </h2>
            <p className="text-[#333333] text-base font-medium leading-relaxed mb-4">
              We use the information we collect exclusively for the following purposes:
            </p>
            <ul className="space-y-3 mb-6">
              {[
                'Activating and configuring your subscription details and app setup.',
                'Securely processing transactions and billing in US dollars.',
                'Providing technical support and setup assistance via chat and email.',
                'Informing you about important server maintenance or channel updates.',
                'Maintaining server stability and preventing unauthorised misuse.',
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-[#333333] font-bold text-sm md:text-base"
                >
                  <CheckCircle className="w-5 h-5 text-[#EF233C] flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-[#111111] uppercase tracking-tight mb-4 flex items-center gap-3">
              <span className="w-2 h-7 bg-[#EF233C] rounded-none inline-block" />
              3. Data Security
            </h2>
            <p className="text-[#333333] text-base font-medium leading-relaxed mb-4">
              {BRAND} employs advanced technical and organisational security measures to protect your data:
            </p>
            <ul className="space-y-3 mb-6">
              {[
                '256 bit SSL/TLS end to end encryption for all web and account connections.',
                'Isolated servers and firewalls to prevent data leaks and DDoS attacks.',
                'Strict access controls: only authorised technical staff have access to support data.',
                'No local storage of sensitive banking or credit card details.',
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-[#333333] font-bold text-sm md:text-base"
                >
                  <CheckCircle className="w-5 h-5 text-[#EF233C] flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="bg-[#f9f9f9] border-2 border-[#111111]/15 rounded-none p-6 my-6 shadow-sm">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-none bg-[#EF233C]/10 flex items-center justify-center border border-[#EF233C]/30">
                    <Server className="w-5 h-5 text-[#EF233C]" />
                  </div>
                </div>
                <div>
                  <p className="text-[#333333] text-sm font-bold leading-relaxed">
                    <span className="text-[#EF233C] font-black uppercase tracking-wide block mb-0.5">
                      No Data Sales:
                    </span>
                    We never sell, rent, or share your personal data with marketing agencies, ad networks, or data brokers, ever.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-[#111111] uppercase tracking-tight mb-4 flex items-center gap-3">
              <span className="w-2 h-7 bg-[#EF233C] rounded-none inline-block" />
              4. Cookies & Functional Storage
            </h2>
            <p className="text-[#333333] text-base font-medium leading-relaxed">
              We use only functional and anonymised analytical cookies to optimise website loading speed and remember your language preference. You can disable cookies at any time through your web browser settings.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-[#111111] uppercase tracking-tight mb-4 flex items-center gap-3">
              <span className="w-2 h-7 bg-[#EF233C] rounded-none inline-block" />
              5. Your Rights Under US Privacy Law, GDPR & CCPA
            </h2>
            <p className="text-[#333333] text-base font-medium leading-relaxed mb-4">
              Depending on your jurisdiction (United States, EU, or California), you have the following legal privacy rights:
            </p>
            <ul className="space-y-3 mb-6">
              {[
                'Right of access: You may request a copy of the data we hold about you.',
                'Right to rectification: The right to correct inaccurate contact details.',
                'Right to erasure (Right to be Forgotten): The right to request permanent deletion of all your account data.',
                'Right to restrict processing and data portability.',
                'Right to opt out of any data sale. We never sell data, so this right is inherently respected.',
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-[#333333] font-bold text-sm md:text-base"
                >
                  <CheckCircle className="w-5 h-5 text-[#EF233C] flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-[#111111] uppercase tracking-tight mb-4 flex items-center gap-3">
              <span className="w-2 h-7 bg-[#EF233C] rounded-none inline-block" />
              6. Third Party Service Providers
            </h2>
            <p className="text-[#333333] text-base font-medium leading-relaxed">
              We work with a small number of trusted third party service providers, including payment processors such as Stripe, PayPal, and crypto payment gateways, plus communications tools. These providers strictly comply with data protection standards, process data only as necessary to deliver their services, and are prohibited from using your data for any other purpose.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-[#111111] uppercase tracking-tight mb-4 flex items-center gap-3">
              <span className="w-2 h-7 bg-[#EF233C] rounded-none inline-block" />
              7. Children&apos;s Privacy
            </h2>
            <p className="text-[#333333] text-base font-medium leading-relaxed">
              Our services are not directed to children under the age of 13, or the applicable age of digital consent in your jurisdiction. We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us so we can promptly delete it.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-[#111111] uppercase tracking-tight mb-4 flex items-center gap-3">
              <span className="w-2 h-7 bg-[#EF233C] rounded-none inline-block" />
              8. Data Retention
            </h2>
            <p className="text-[#333333] text-base font-medium leading-relaxed">
              We retain your account and contact information only for as long as your subscription remains active, plus a reasonable period thereafter for legal, tax, and accounting purposes. After that period, all personal data is securely deleted or anonymised.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-[#111111] uppercase tracking-tight mb-4 flex items-center gap-3">
              <span className="w-2 h-7 bg-[#EF233C] rounded-none inline-block" />
              9. Contact Regarding Privacy
            </h2>
            <p className="text-[#333333] text-base font-medium leading-relaxed mb-4">
              Do you have questions about our privacy policy, or wish to submit a data removal request? Contact our Data Protection Officer directly:
            </p>
            <div className="bg-[#f9f9f9] border-2 border-[#111111]/15 rounded-none p-6 my-6 text-center shadow-sm">
              <Mail className="w-8 h-8 text-[#EF233C] mx-auto mb-2" />
              <p className="text-xs uppercase font-black text-[#555555] tracking-widest mb-1">
                Privacy & Data Protection Department
              </p>
              <a
                href={`mailto:privacy@${CONSTANTS.DOMAIN}`}
                className="text-[#111111] font-black text-xl md:text-2xl hover:text-[#EF233C] transition-colors break-all"
              >
                privacy@{CONSTANTS.DOMAIN}
              </a>
            </div>
            <p className="text-[#333333] text-base font-medium leading-relaxed">
              For general customer support, use our 24/7{' '}
              <Link href="/support" className="text-[#EF233C] font-black hover:underline">
                chat support team
              </Link>{' '}
              instead.
            </p>
          </section>

          {/* Section 10 — Updates */}
          <section>
            <div className="bg-[#f9f9f9] border-2 border-[#111111]/15 rounded-none p-6 md:p-8 shadow-sm">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-none bg-[#EF233C]/10 flex items-center justify-center flex-shrink-0 border border-[#EF233C]/30">
                  <FileText className="w-6 h-6 text-[#EF233C]" />
                </div>
                <div>
                  <p className="text-[#EF233C] font-black uppercase tracking-wider text-sm mb-1">
                    Policy Updates
                  </p>
                  <p className="text-[#333333] font-bold text-sm md:text-base leading-relaxed">
                    We reserve the right to update this Privacy Policy at any time. Material changes will be announced on our homepage or via chat to active subscribers. Continued use of our services after any changes constitutes acceptance of the updated policy.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-[#111111]/10 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#EF233C] hover:text-[#111111] transition-colors font-black text-xs uppercase tracking-widest"
          >
            ← Back to homepage
          </Link>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center">
          <p className="text-[#555555] text-xs font-bold">
            © {new Date().getFullYear()} {BRAND}. All rights reserved. Made in the USA 🇺🇸
          </p>
        </div>
      </div>
    </div>
  );
}