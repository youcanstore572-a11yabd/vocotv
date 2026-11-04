// components/Flags.tsx
// Shared flag SVG components used across the site (pricing, setup, faq, reseller).
// All accept no props; wrap with aria-label / aria-hidden at the call site.

export const FlagAU = () => (
  <svg
    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full shadow-md shrink-0 border border-white/20"
    viewBox="0 0 32 32"
    role="img"
    aria-label="Australia"
  >
    <clipPath id="flag-au">
      <circle cx="16" cy="16" r="16" />
    </clipPath>
    <g clipPath="url(#flag-au)">
      <rect width="32" height="32" fill="#012169" />
      <path stroke="#FFF" strokeWidth="4" d="M0 0l16 16M16 0L0 16" />
      <path stroke="#C8102E" strokeWidth="2" d="M0 0l16 16M16 0L0 16" />
      <path stroke="#FFF" strokeWidth="6" d="M8 0v16M0 8h16" />
      <path stroke="#C8102E" strokeWidth="3" d="M8 0v16M0 8h16" />
      {/* Commonwealth Star */}
      <path
        fill="#FFF"
        d="M8 19.2l.65 1.95h2.05l-1.65 1.2.63 1.95L8 23.1l-1.68 1.2.63-1.95-1.65-1.2h2.05z"
      />
      {/* Southern Cross */}
      <path fill="#FFF" d="M24 4.6l.5 1.5h1.55l-1.25.9.48 1.5L24 7.6l-1.28.9.48-1.5-1.25-.9h1.55z" />
      <path fill="#FFF" d="M24 24l.5 1.5h1.55l-1.25.9.48 1.5L24 27l-1.28.9.48-1.5-1.25-.9h1.55z" />
      <path fill="#FFF" d="M28 14l.5 1.5h1.55l-1.25.9.48 1.5L28 17l-1.28.9.48-1.5-1.25-.9h1.55z" />
      <path fill="#FFF" d="M20 14l.5 1.5h1.55l-1.25.9.48 1.5L20 17l-1.28.9.48-1.5-1.25-.9h1.55z" />
      <path fill="#FFF" d="M23.2 18.6l.3.9h.95l-.77.56.3.9-.78-.55-.78.55.3-.9-.77-.56h.95z" />
    </g>
  </svg>
);

export const FlagUS = () => (
  <svg
    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full shadow-md shrink-0 border border-white/20"
    viewBox="0 0 32 32"
    role="img"
    aria-label="United States"
  >
    <clipPath id="flag-us">
      <circle cx="16" cy="16" r="16" />
    </clipPath>
    <g clipPath="url(#flag-us)">
      <rect width="32" height="32" fill="#FFF" />
      {[0, 4.57, 9.14, 13.71, 18.29, 22.86, 27.43].map((y, i) => (
        <rect key={i} y={y} width="32" height="2.29" fill="#B22234" />
      ))}
      <rect width="13.7" height="14.86" fill="#3C3B6E" />
    </g>
  </svg>
);

export const FlagUK = () => (
  <svg
    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full shadow-md shrink-0 border border-white/20"
    viewBox="0 0 32 32"
    role="img"
    aria-label="United Kingdom"
  >
    <clipPath id="flag-uk">
      <circle cx="16" cy="16" r="16" />
    </clipPath>
    <g clipPath="url(#flag-uk)">
      <rect width="32" height="32" fill="#012169" />
      <path stroke="#FFF" strokeWidth="6" d="M0 0l32 32M32 0L0 32" />
      <path stroke="#C8102E" strokeWidth="3" d="M0 0l32 32M32 0L0 32" />
      <path stroke="#FFF" strokeWidth="10" d="M16 0v32M0 16h32" />
      <path stroke="#C8102E" strokeWidth="6" d="M16 0v32M0 16h32" />
    </g>
  </svg>
);

export const FlagCA = () => (
  <svg
    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full shadow-md shrink-0 border border-white/20"
    viewBox="0 0 32 32"
    role="img"
    aria-label="Canada"
  >
    <clipPath id="flag-ca">
      <circle cx="16" cy="16" r="16" />
    </clipPath>
    <g clipPath="url(#flag-ca)">
      <rect width="32" height="32" fill="#FFF" />
      <rect width="8" height="32" fill="#D80621" />
      <rect x="24" width="8" height="32" fill="#D80621" />
      <path
        fill="#D80621"
        d="M16 7l1.2 2.4 2.6-.6-.9 2.5 2.3 1.3-2.1 1.5.8 2.5-2.5-.7L16 18l-1.4-2.1-2.5.7.8-2.5-2.1-1.5 2.3-1.3-.9-2.5 2.6.6L16 7z"
      />
    </g>
  </svg>
);