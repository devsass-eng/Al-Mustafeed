import type { FC } from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
  showSubtitle?: boolean;
}

export const BrandLogo: FC<BrandLogoProps> = ({
  size = 'md',
  variant = 'dark',
  showSubtitle = true,
}) => {
  const iconSizes = {
    sm: 'w-9 h-9',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const titleSizes = {
    sm: 'text-base font-bold',
    md: 'text-xl font-extrabold',
    lg: 'text-2xl font-extrabold',
  };

  const isLight = variant === 'light';

  return (
    <div className="flex items-center gap-3.5">
      {/* Islamic Emblem Icon */}
      <div
        className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center rounded-2xl p-1 shadow-md transition-transform hover:scale-105 ${
          isLight
            ? 'bg-emerald-950/40 border border-emerald-500/30'
            : 'bg-emerald-900 border border-emerald-700/60'
        }`}
      >
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
          {/* Islamic 8-Pointed Star (Rub el Hizb) Background */}
          <path
            d="M32 6L39.5 16.5L52.5 16.5L48.5 29.5L58 38.5L46 42.5L46 55.5L32 48.5L18 55.5L18 42.5L6 38.5L15.5 29.5L11.5 16.5L24.5 16.5L32 6Z"
            fill="#064e3b"
            stroke="#d97706"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Inner Decorative Ring */}
          <circle cx="32" cy="32" r="19" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 2" opacity="0.7" />
          
          {/* Stylized Holy Quran / Open Book Symbol */}
          <path
            d="M21 27C25.5 25.2 29.5 26.2 32 29C34.5 26.2 38.5 25.2 43 27V42C38.5 40.2 34.5 41.2 32 44C29.5 41.2 25.5 40.2 21 42V27Z"
            fill="#fef3c7"
            stroke="#b45309"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          {/* Book Spine */}
          <path d="M32 29V44" stroke="#b45309" strokeWidth="1.8" />
          {/* Mini Gold Crest on Top */}
          <circle cx="32" cy="20" r="2.5" fill="#f59e0b" />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span
            className={`tracking-tight uppercase font-sans ${titleSizes[size]} ${
              isLight ? 'text-white' : 'text-emerald-950'
            }`}
          >
            Al-Mustafeed
          </span>
          <span
            className={`font-arabic text-sm px-1.5 py-0.5 rounded ${
              isLight ? 'text-amber-300 bg-emerald-900/60' : 'text-amber-700 bg-amber-50'
            }`}
            title="المستفيد"
          >
            المستفيد
          </span>
        </div>
        {showSubtitle && (
          <span
            className={`text-xs tracking-wider uppercase font-medium ${
              isLight ? 'text-emerald-200/80' : 'text-emerald-700'
            }`}
          >
            Tahfeez Management System
          </span>
        )}
      </div>
    </div>
  );
};
