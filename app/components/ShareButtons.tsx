// components/ShareButtons.tsx
'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { CONSTANTS } from '@/lib/seo';
import {
  Share2,
  Twitter,
  Facebook,
  Send,
  Linkedin,
  Link2,
  Check,
} from 'lucide-react';

// Lightweight Vector WhatsApp Icon
const WhatsAppIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.477-.15-.678.15-.2.301-.778.979-.953 1.18-.176.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.495-.896-.799-1.501-1.786-1.677-2.087-.175-.301-.019-.464.132-.614.135-.135.301-.351.451-.527.151-.176.2-.301.301-.502.1-.201.05-.376-.025-.527-.075-.15-.678-1.634-.929-2.237-.245-.588-.493-.508-.678-.518-.176-.01-.376-.01-.577-.01-.201 0-.527.075-.803.376s-1.054 1.03-1.054 2.511 1.079 2.912 1.23 3.113c.15.201 2.123 3.242 5.143 4.547.719.311 1.28.497 1.718.636.722.23 1.378.197 1.898.12.579-.086 1.78-.728 2.031-1.431.251-.703.251-1.305.176-1.431-.075-.125-.276-.201-.577-.351z" />
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.662 1.435 5.176L2.05 21.95l4.908-1.34A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2a8.17 8.17 0 0 1-4.28-1.2l-.307-.183-2.912.796.779-2.837-.2-.319A8.17 8.17 0 1 1 12 20.2z" />
  </svg>
);

interface SocialShareProps {
  title?: string;
  url?: string;
}

export default function SocialShare({
  title = `${CONSTANTS.BRAND_NAME} - Best VocoTV Subscription USA 2026`,
  url = `https://${CONSTANTS.DOMAIN}`,
}: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const shareLinks = useMemo(() => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    return [
      {
        name: 'WhatsApp',
        href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
        icon: WhatsAppIcon,
        bgColor: 'hover:bg-[#25D366] hover:text-white',
        aria: 'Share this page via WhatsApp',
      },
      {
        name: 'Facebook',
        href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        icon: Facebook,
        bgColor: 'hover:bg-[#1877F2] hover:text-white',
        aria: 'Share this page via Facebook',
      },
      {
        name: 'X (Twitter)',
        href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        icon: Twitter,
        bgColor: 'hover:bg-black hover:text-[#FFD700]',
        aria: 'Share this page via X',
      },
      {
        name: 'Telegram',
        href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
        icon: Send,
        bgColor: 'hover:bg-[#0088cc] hover:text-white',
        aria: 'Share this page via Telegram',
      },
      {
        name: 'LinkedIn',
        href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        icon: Linkedin,
        bgColor: 'hover:bg-[#0A66C2] hover:text-white',
        aria: 'Share this page via LinkedIn',
      },
    ];
  }, [url, title]);

  const handleCopyLink = async () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = url;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      timeoutRef.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="w-full flex justify-center items-center px-4 my-8 relative z-10">
      <div className="w-full max-w-4xl bg-black/90 backdrop-blur-xl border border-[#FFD700]/30 rounded-none py-3.5 px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl transition-colors duration-300 hover:border-[#EF233C]">

        {/* Callout Header */}
        <div className="flex items-center justify-center gap-2.5 text-white shrink-0">
          <span className="p-2 rounded-none bg-[#EF233C] text-white">
            <Share2 className="w-4 h-4" />
          </span>
          <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-center">
            Share with friends 🇺🇸
          </span>
        </div>

        {/* Centered Action Icons Row */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {shareLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.aria}
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-none bg-white/5 border border-white/15 text-white/80 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm ${item.bgColor}`}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            );
          })}

          {/* Copy Link Button */}
          <button
            onClick={handleCopyLink}
            type="button"
            aria-label="Copy page link to clipboard"
            className={`flex items-center gap-2 px-4 h-10 sm:h-11 rounded-none text-xs font-black uppercase tracking-wider border transition-all duration-200 active:scale-95 cursor-pointer shadow-sm ${
              copied
                ? 'bg-black text-[#FFD700] border-[#FFD700]'
                : 'bg-[#FFD700] border-[#FFD700] text-black hover:bg-[#ffdf33] hover:border-[#ffdf33]'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#FFD700]" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Link2 className="w-4 h-4" />
                <span>Copy Link</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}