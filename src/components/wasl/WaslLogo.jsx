import React from 'react';

export default function WaslLogo({ size = 'md', showTagline = false }) {
  const sizes = {
    sm: { icon: 32, arabic: 'text-xl', english: 'text-xs' },
    md: { icon: 48, arabic: 'text-3xl', english: 'text-sm' },
    lg: { icon: 64, arabic: 'text-5xl', english: 'text-lg' },
  };
  const s = sizes[size] || sizes.md;

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Abstract connection symbol */}
      <svg width={s.icon} height={s.icon} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16 40C16 40 24 28 32 28C40 28 48 40 48 40"
          stroke="#07549A"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M16 24C16 24 24 36 32 36C40 36 48 24 48 24"
          stroke="#07549A"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />
        <circle cx="14" cy="32" r="4" fill="#07549A" opacity="0.7" />
        <circle cx="50" cy="32" r="4" fill="#07549A" opacity="0.7" />
      </svg>
      <div className="text-center">
        <p className={`${s.arabic} font-bold text-wasl-primary leading-tight`} style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}>
          وَصْل
        </p>
        <p className={`${s.english} font-semibold text-wasl-navy tracking-[0.3em] uppercase`}>
          WASL
        </p>
      </div>
      {showTagline && (
        <p className="text-wasl-gray text-sm mt-1 text-center max-w-[240px]">
          Understand each other. Grow closer together.
        </p>
      )}
    </div>
  );
}