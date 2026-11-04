// app/components/USAFlag.tsx

type USAFlagProps = {
  className?: string;
};

export default function USAFlag({ className = 'w-5 h-5' }: USAFlagProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      role="img"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Circle mask so the flag is cropped into a round badge */}
        <clipPath id="usaFlagCircle">
          <circle cx="10" cy="10" r="9" />
        </clipPath>

        {/* Subtle inner shade for depth */}
        <radialGradient id="usaFlagShade" cx="30%" cy="25%" r="80%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.10" />
          <stop offset="60%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.18" />
        </radialGradient>
      </defs>

      {/* Flag content, cropped into a circle at radius 9 */}
      <g clipPath="url(#usaFlagCircle)">
        {/* 13 horizontal stripes — 7 red, 6 white, alternating starting with red */}
        <rect width="20" height="20" fill="#FFFFFF" />
        <rect y="0" width="20" height="1.538" fill="#B22234" />
        <rect y="3.077" width="20" height="1.538" fill="#B22234" />
        <rect y="6.154" width="20" height="1.538" fill="#B22234" />
        <rect y="9.231" width="20" height="1.538" fill="#B22234" />
        <rect y="12.308" width="20" height="1.538" fill="#B22234" />
        <rect y="15.385" width="20" height="1.538" fill="#B22234" />
        <rect y="18.462" width="20" height="1.538" fill="#B22234" />

        {/* Blue canton — top-left quarter covering 7 stripes */}
        <rect width="9" height="10.769" fill="#3C3B6E" />

        {/* 5x4 grid of stars in the canton (20 stars — simplified but recognisable) */}
        {/* Row 1 */}
        <circle cx="1.1" cy="1.2" r="0.35" fill="#FFFFFF" />
        <circle cx="3.1" cy="1.2" r="0.35" fill="#FFFFFF" />
        <circle cx="5.1" cy="1.2" r="0.35" fill="#FFFFFF" />
        <circle cx="7.1" cy="1.2" r="0.35" fill="#FFFFFF" />
        {/* Row 2 (offset) */}
        <circle cx="2.1" cy="2.8" r="0.35" fill="#FFFFFF" />
        <circle cx="4.1" cy="2.8" r="0.35" fill="#FFFFFF" />
        <circle cx="6.1" cy="2.8" r="0.35" fill="#FFFFFF" />
        <circle cx="8.1" cy="2.8" r="0.35" fill="#FFFFFF" />
        {/* Row 3 */}
        <circle cx="1.1" cy="4.4" r="0.35" fill="#FFFFFF" />
        <circle cx="3.1" cy="4.4" r="0.35" fill="#FFFFFF" />
        <circle cx="5.1" cy="4.4" r="0.35" fill="#FFFFFF" />
        <circle cx="7.1" cy="4.4" r="0.35" fill="#FFFFFF" />
        {/* Row 4 (offset) */}
        <circle cx="2.1" cy="6.0" r="0.35" fill="#FFFFFF" />
        <circle cx="4.1" cy="6.0" r="0.35" fill="#FFFFFF" />
        <circle cx="6.1" cy="6.0" r="0.35" fill="#FFFFFF" />
        <circle cx="8.1" cy="6.0" r="0.35" fill="#FFFFFF" />
        {/* Row 5 */}
        <circle cx="1.1" cy="7.6" r="0.35" fill="#FFFFFF" />
        <circle cx="3.1" cy="7.6" r="0.35" fill="#FFFFFF" />
        <circle cx="5.1" cy="7.6" r="0.35" fill="#FFFFFF" />
        <circle cx="7.1" cy="7.6" r="0.35" fill="#FFFFFF" />
        {/* Row 6 (offset) */}
        <circle cx="2.1" cy="9.2" r="0.35" fill="#FFFFFF" />
        <circle cx="4.1" cy="9.2" r="0.35" fill="#FFFFFF" />
        <circle cx="6.1" cy="9.2" r="0.35" fill="#FFFFFF" />
        <circle cx="8.1" cy="9.2" r="0.35" fill="#FFFFFF" />

        {/* Soft shading layer */}
        <rect width="20" height="20" fill="url(#usaFlagShade)" />
      </g>

      {/* Solid white circle border on top */}
      <circle
        cx="10"
        cy="10"
        r="9"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.5"
      />
    </svg>
  );
}