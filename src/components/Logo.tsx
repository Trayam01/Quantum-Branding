import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md', 
  showTagline = false,
  onClick 
}) => {
  const iconSizes = {
    sm: 'w-6 h-6 sm:w-7 sm:h-7',
    md: 'w-8 h-8 sm:w-9 sm:h-9',
    lg: 'w-11 h-11 sm:w-12 sm:h-12',
    xl: 'w-16 h-16',
  };

  const textSizes = {
    sm: 'text-xs sm:text-sm',
    md: 'text-base sm:text-lg',
    lg: 'text-xl sm:text-2xl',
    xl: 'text-3xl sm:text-4xl',
  };

  const brandingTextSizes = {
    sm: 'text-[8px] tracking-[0.15em]',
    md: 'text-[9.5px] sm:text-[10.5px] tracking-[0.22em]',
    lg: 'text-[11.5px] tracking-[0.25em]',
    xl: 'text-[15px] tracking-[0.3em]',
  };

  return (
    <div 
      onClick={onClick}
      className={`inline-flex items-center gap-2 sm:gap-2.5 cursor-pointer select-none group shrink-0 ${className}`}
    >
      {/* Quantum Branding Q Mark SVG */}
      <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center`}>
        <svg viewBox="-4 -4 108 108" className="w-full h-full drop-shadow-2xs transition-transform duration-300 group-hover:scale-105 overflow-visible">
          <defs>
            {/* Main Gradient for 'Q' Ring */}
            <linearGradient id="qbRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="25%" stopColor="#f43f5e" />
              <stop offset="55%" stopColor="#d946ef" />
              <stop offset="80%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>

            {/* Blue Tail Gradient */}
            <linearGradient id="qbTailGrad" x1="0%" y1="0%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="50%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>

            {/* Inner Ring Highlight */}
            <linearGradient id="qbInnerHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Left Digital Pixel Burst Dispersal */}
          {/* Row 1 - Orange/Yellow Top */}
          <rect x="10" y="33" width="5.5" height="5.5" rx="1" fill="#f59e0b" opacity="0.9" />
          <rect x="18" y="28" width="6.5" height="6.5" rx="1.2" fill="#f97316" />
          <rect x="27" y="27" width="5.5" height="5.5" rx="1" fill="#eab308" />

          {/* Row 2 - Pink/Magenta Middle */}
          <rect x="7" y="42" width="5" height="5" rx="1" fill="#ec4899" opacity="0.8" />
          <rect x="15" y="40" width="7" height="7" rx="1.2" fill="#f43f5e" />
          <rect x="24" y="36" width="6.5" height="6.5" rx="1.2" fill="#d946ef" />

          {/* Row 3 - Purple/Blue Bottom */}
          <rect x="12" y="50" width="5.5" height="5.5" rx="1" fill="#8b5cf6" opacity="0.9" />
          <rect x="20" y="49" width="7" height="7" rx="1.2" fill="#6366f1" />
          <rect x="29" y="45" width="6" height="6" rx="1" fill="#3b82f6" />

          {/* Row 4 - Cyan Deep Bottom */}
          <rect x="16" y="58" width="5.5" height="5.5" rx="1" fill="#0284c7" opacity="0.9" />
          <rect x="24" y="57" width="6.5" height="6.5" rx="1.2" fill="#06b6d4" />

          {/* Main Q Ring */}
          <path
            d="M 52 10 
               A 38 38 0 1 1 28 68 
               A 38 38 0 0 1 52 10 Z"
            fill="none"
            stroke="url(#qbRingGrad)"
            strokeWidth="15"
            strokeLinecap="round"
          />

          {/* Inner Gloss Arc Accent */}
          <path
            d="M 45 23
               A 25 25 0 0 1 73 48"
            fill="none"
            stroke="url(#qbInnerHighlight)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Q Dynamic Blue Tail Swoosh */}
          <path
            d="M 46 41 
               C 54 40, 60 48, 70 63 
               C 76 72, 85 75, 94 71 
               C 85 82, 68 82, 57 70 
               C 51 63, 45 52, 46 41 Z"
            fill="url(#qbTailGrad)"
          />
        </svg>
      </div>

      {/* Typography Section */}
      <div className="flex flex-col whitespace-nowrap">
        <span className={`font-display font-black tracking-wider text-slate-950 ${textSizes[size]} leading-none flex items-center`}>
          QU<span className="relative inline-block px-[0.5px]">A<span className="absolute bottom-[2px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-amber-500"></span></span>NTUM
        </span>
        
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="h-[1.5px] w-3 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full inline-block"></span>
          <span className={`font-bold ${brandingTextSizes[size]} bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 bg-clip-text text-transparent uppercase leading-tight`}>
            BRANDING
          </span>
          <span className="h-[1.5px] w-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full inline-block"></span>
        </div>

        {showTagline && (
          <span className="text-[9px] font-extrabold tracking-[0.2em] text-slate-500 uppercase mt-1">
            BUILDING BRANDS. CREATING IMPACT.
          </span>
        )}
      </div>
    </div>
  );
};

