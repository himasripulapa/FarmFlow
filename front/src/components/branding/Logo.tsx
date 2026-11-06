import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  className = ''
}) => {
  const sizePixels = {
    sm: 28,
    md: 36,
    lg: 48,
    xl: 64
  }[size];

  const textClasses = {
    sm: 'text-lg font-bold',
    md: 'text-xl font-bold',
    lg: 'text-2xl font-extrabold',
    xl: 'text-4xl font-black'
  }[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <svg
        width={sizePixels}
        height={sizePixels}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
      >
        <defs>
          <linearGradient id="logoLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2E7D32" />
            <stop offset="100%" stopColor="#1B5E20" />
          </linearGradient>
          <linearGradient id="logoFlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBC02D" />
            <stop offset="100%" stopColor="#F57F17" />
          </linearGradient>
        </defs>

        {/* Soft background glow */}
        <circle cx="50" cy="50" r="46" fill="#F1F8E9" />

        {/* Flowing arrow path */}
        <path
          d="M 22 68 C 28 42, 52 38, 72 32 C 64 50, 44 58, 30 74 Z"
          fill="url(#logoFlowGrad)"
        />

        {/* Stylized leaf */}
        <path
          d="M 50 18 C 76 18, 82 46, 78 72 C 54 72, 32 60, 50 18 Z"
          fill="url(#logoLeafGrad)"
          opacity="0.95"
        />

        {/* Leaf vein */}
        <path
          d="M 50 18 C 55 38, 62 52, 70 66"
          stroke="#A5D6A7"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* Path endpoints */}
        <circle cx="24" cy="68" r="4" fill="#F57F17" />
        <circle cx="76" cy="32" r="4" fill="#2E7D32" />
      </svg>

      {showText && (
        <span className={`tracking-tight ${textClasses}`}>
          <span className="text-emerald-800 dark:text-emerald-400">Farm</span>
          <span className="text-amber-500 dark:text-amber-400">Flow</span>
        </span>
      )}
    </div>
  );
};
