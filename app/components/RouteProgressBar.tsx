// components/RouteProgressBar.tsx
'use client';

import { useEffect, useState, Suspense, useRef, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { CONSTANTS } from '@/lib/seo';

// ---------------------------------------------------------------------------
// How long the fullscreen overlay stays visible after navigation ends, so the
// feel is intentional rather than a flash.
// ---------------------------------------------------------------------------
const MIN_VISIBLE_MS = 500;
const BRAND = CONSTANTS.BRAND_NAME;

// ---------------------------------------------------------------------------
// Styles — plain <style> tag (styled-jsx is not guaranteed in App Router)
// ---------------------------------------------------------------------------
const OVERLAY_STYLES = `
  @keyframes route-loader-spin {
    to { transform: rotate(360deg); }
  }
  @keyframes route-loader-shimmer {
    0%   { transform: translateX(-100%) scaleX(0.6); opacity: 0.6; }
    50%  { transform: translateX(0%) scaleX(1);     opacity: 1; }
    100% { transform: translateX(100%) scaleX(0.6); opacity: 0.6; }
  }
  @keyframes route-loader-fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes route-loader-fade-out {
    from { opacity: 1; }
    to   { opacity: 0; }
  }
  .route-loader-spinner {
    animation: route-loader-spin 0.8s linear infinite;
  }
  .route-loader-bar {
    animation: route-loader-shimmer 1.4s ease-in-out infinite;
  }
  .route-loader-enter { animation: route-loader-fade-in 0.15s ease-out both; }
  .route-loader-exit  { animation: route-loader-fade-out 0.25s ease-out both; }
  @media (prefers-reduced-motion: reduce) {
    .route-loader-spinner { animation-duration: 2s; }
    .route-loader-bar { animation: none; opacity: 1; }
    .route-loader-enter, .route-loader-exit { animation: none; }
  }
`;

function LoadingGate() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const startedAtRef = useRef<number>(0);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const exitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathnameRef = useRef<string>('');
  const searchRef = useRef<string>('');

  // Keep refs in sync so the click handler doesn't need to be re-registered
  useEffect(() => {
    pathnameRef.current = pathname;
    searchRef.current = searchParams?.toString() ?? '';
  }, [pathname, searchParams]);

  const show = useCallback(() => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current);
    hideTimeoutRef.current = null;
    exitTimeoutRef.current = null;
    setExiting(false);
    startedAtRef.current = Date.now();
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    const elapsed = Date.now() - startedAtRef.current;
    const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => {
      // Trigger exit animation first
      setExiting(true);
      exitTimeoutRef.current = setTimeout(() => {
        setVisible(false);
        setExiting(false);
        hideTimeoutRef.current = null;
        exitTimeoutRef.current = null;
      }, 250);
    }, remaining);
  }, []);

  // Hide the loader when the new route finishes rendering
  useEffect(() => {
    hide();
  }, [pathname, searchParams, hide]);

  // Intercept internal link clicks
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor = (event.target as HTMLElement | null)?.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Skip: external, hash-only, mailto/tel/sms, downloads, new tabs
      if (
        !href.startsWith('/') ||
        href.startsWith('/#') ||
        href.startsWith('#') ||
        anchor.getAttribute('target') === '_blank' ||
        anchor.hasAttribute('download')
      ) {
        return;
      }

      const [pathOnly] = href.split('?');
      if (pathOnly === pathnameRef.current) return;

      show();
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [show]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <div
        className={`fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center pointer-events-auto ${
          exiting ? 'route-loader-exit' : 'route-loader-enter'
        }`}
        role="status"
        aria-live="polite"
        aria-label="Loading page"
      >
        {/* Ambient pink/gold glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#EF233C]/15 blur-[140px] rounded-none pointer-events-none"
          aria-hidden="true"
        />

        {/* Brand spinner */}
        <div className="relative flex flex-col items-center justify-center gap-6">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-none border-4 border-[#FFD700]/20" />
            <div className="absolute inset-0 rounded-none border-4 border-transparent border-t-[#FFD700] border-r-[#EF233C] route-loader-spinner" />
          </div>

          <div className="flex flex-col items-center gap-3">
            <span className="text-[#FFD700] font-black text-xs uppercase tracking-[0.3em]">
              Loading {BRAND}
            </span>
            <span className="sr-only">Please wait while the page loads</span>
          </div>
        </div>

        {/* Bottom thin progress bar — brand accent */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1 bg-black/60 overflow-hidden"
          aria-hidden="true"
        >
          <div className="route-loader-bar h-full w-full bg-gradient-to-r from-[#EF233C] via-[#FFD700] to-[#EF233C] origin-left" />
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: OVERLAY_STYLES }} />
    </>
  );
}

// ---------------------------------------------------------------------------
// Public wrapper — <Suspense> required by useSearchParams
// ---------------------------------------------------------------------------
export default function RouteProgressBar() {
  return (
    <Suspense fallback={null}>
      <LoadingGate />
    </Suspense>
  );
}