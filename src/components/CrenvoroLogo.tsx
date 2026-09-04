import React from 'react';

export interface CrenvoroLogoProps {
  /**
   * 'icon': Standalone vector mark without background
   * 'tile': App icon with electric purple squircle tile & inner highlight
   * 'full': Icon + 'CRENVORO' display typography wordmark
   */
  variant?: 'icon' | 'tile' | 'full';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showSubtitle?: boolean;
  subtitleText?: string;
  darkWordmark?: boolean;
}

const sizeMap = {
  xs: { icon: 'w-6 h-6', text: 'text-base', sub: 'text-[9px]' },
  sm: { icon: 'w-8 h-8', text: 'text-xl', sub: 'text-[10px]' },
  md: { icon: 'w-10 h-10', text: 'text-2xl', sub: 'text-xs' },
  lg: { icon: 'w-14 h-14', text: 'text-3xl', sub: 'text-xs' },
  xl: { icon: 'w-20 h-20', text: 'text-4xl', sub: 'text-sm' },
};

/**
 * Pure Vector SVG Lettermark of CRENVORO
 * Letter "C" with precision 45-degree angled terminals and signature diamond spark
 */
export const CrenvoroMark: React.FC<{
  className?: string;
  fillColor?: string;
  idPrefix?: string;
}> = ({
  className = 'w-8 h-8',
  fillColor = 'currentColor',
  idPrefix = 'crm-',
}) => {
  const shadowId = `${idPrefix}drop-shadow`;

  return (
    <svg
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="CRENVORO Letter C Icon"
    >
      <defs>
        <filter id={shadowId} x="-10%" y="-10%" width="120%" height="125%">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#2B0E80" floodOpacity="0.25" />
        </filter>
      </defs>

      <g filter={`url(#${shadowId})`}>
        {/* Sculptural Letter 'C' for CRENVORO with 45° precision cuts */}
        <path
          d="M 380 132
             A 175.4 175.4 0 1 0 380 380
             L 321 321
             A 92 92 0 1 1 321 191
             Z"
          fill={fillColor}
        />

        {/* Signature Diamond Spark (Harmonized 45° angle completing the Letter C aperture) */}
        <rect
          x="320"
          y="228"
          width="56"
          height="56"
          rx="10"
          transform="rotate(45 348 256)"
          fill={fillColor}
        />
      </g>
    </svg>
  );
};

/**
 * Alternative "CR" Dual Monogram Vector Mark
 */
export const CrenvoroCRMark: React.FC<{
  className?: string;
  fillColor?: string;
}> = ({ className = 'w-8 h-8', fillColor = 'currentColor' }) => {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="CRENVORO CR Monogram"
    >
      {/* Letter C */}
      <path
        d="M 230 160
           C 208 136 178 122 144 122
           C 80 122 28 174 28 238
           C 28 302 80 354 144 354
           C 178 354 208 340 230 316
           L 190 282
           C 178 296 162 304 144 304
           C 108 304 78 274 78 238
           C 78 202 108 172 144 172
           C 162 172 178 180 190 194
           Z"
        transform="translate(30, 18)"
        fill={fillColor}
      />
      {/* Letter R */}
      <path
        d="M 230 140
           H 330
           C 366 140 396 170 396 206
           C 396 238 372 264 342 270
           L 398 372
           H 342
           L 294 274
           H 282
           V 372
           H 230
           V 140
           Z
           M 282 188
           V 228
           H 326
           C 338 228 346 218 346 208
           C 346 198 338 188 326 188
           H 282
           Z"
        transform="translate(30, 0)"
        fill={fillColor}
      />
    </svg>
  );
};

/**
 * CRENVORO App Icon Tile (Signature Electric Purple Squircle)
 * Faithful to the clean, vibrant purple tile from the original app,
 * elevated with the custom Letter "C" + Diamond mark!
 */
export const CrenvoroTile: React.FC<{
  className?: string;
  monogram?: 'c' | 'cr';
  idPrefix?: string;
}> = ({
  className = 'w-9 h-9',
  monogram = 'c',
  idPrefix = 'crt-',
}) => {
  return (
    <div
      className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-[#7C3AED] via-[#6C3BFF] to-[#551FFF] shadow-md shadow-[#6C3BFF]/35 ring-1 ring-white/20 overflow-hidden hover:scale-105 transition-transform duration-200 shrink-0 ${className}`}
    >
      {/* Top subtle highlight reflection */}
      <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />

      {/* Crisp White Letter Mark */}
      <div className="w-[66%] h-[66%] relative z-10 flex items-center justify-center">
        {monogram === 'cr' ? (
          <CrenvoroCRMark className="w-full h-full" fillColor="#FFFFFF" />
        ) : (
          <CrenvoroMark className="w-full h-full" fillColor="#FFFFFF" idPrefix={idPrefix} />
        )}
      </div>
    </div>
  );
};

/**
 * Main Unified Component
 */
export const CrenvoroLogo: React.FC<CrenvoroLogoProps> = ({
  variant = 'full',
  size = 'sm',
  className = '',
  showSubtitle = false,
  subtitleText = 'Creative Assets',
  darkWordmark = false,
}) => {
  const currentSize = sizeMap[size];

  if (variant === 'icon') {
    return <CrenvoroMark className={`${currentSize.icon} ${className}`} fillColor="#6C3BFF" />;
  }

  if (variant === 'tile') {
    return <CrenvoroTile className={`${currentSize.icon} ${className}`} />;
  }

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <CrenvoroTile className={currentSize.icon} />
      <div className="flex flex-col">
        <span
          className={`font-black tracking-[-0.03em] leading-none ${currentSize.text} ${
            darkWordmark
              ? 'text-white'
              : 'text-gray-950 group-hover:text-[#6C3BFF] transition-colors'
          }`}
        >
          CRENVORO
        </span>
        {showSubtitle && (
          <span
            className={`font-bold uppercase tracking-wider mt-0.5 ${currentSize.sub} ${
              darkWordmark ? 'text-purple-300' : 'text-[#6C3BFF]'
            }`}
          >
            {subtitleText}
          </span>
        )}
      </div>
    </div>
  );
};

export default CrenvoroLogo;
