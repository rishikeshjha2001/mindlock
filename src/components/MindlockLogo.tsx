"use client";

interface MindlockLogoProps {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
}

export default function MindlockLogo({
  size = "md",
  showTagline = true,
}: MindlockLogoProps) {
  const iconDimensions = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const textDimensions = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl sm:text-3xl",
  };

  return (
    <div className="flex items-center gap-2.5 select-none group cursor-pointer">
      {/* Precision Geometric SVG Emblem */}
      <div
        className={`${iconDimensions[size]} relative rounded-2xl bg-gradient-to-br from-[#1C1C1E] via-[#121214] to-black border border-crimson/30 flex items-center justify-center p-2 shadow-[0_0_20px_rgba(225,29,72,0.3)] group-hover:border-crimson/60 group-hover:shadow-[0_0_30px_rgba(225,29,72,0.5)] transition-all`}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Shackle (Arch of the Lock) */}
          <path
            d="M17 22V14C17 10.134 20.134 7 24 7V7C27.866 7 31 10.134 31 14V22"
            stroke="url(#crimsonGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Lock Body */}
          <rect
            x="11"
            y="20"
            width="26"
            height="21"
            rx="5"
            fill="#0F0F11"
            stroke="#E11D48"
            strokeWidth="2.5"
          />
          {/* Neural Synapse Keyhole */}
          <circle cx="24" cy="29" r="3" fill="#FFFFFF" />
          <path
            d="M24 32V36"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Focus Protocol Radiating Notches */}
          <path
            d="M6 24H9M39 24H42M24 2V5"
            stroke="#E11D48"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.6"
          />
          {/* Gradient Definitions */}
          <defs>
            <linearGradient
              id="crimsonGrad"
              x1="17"
              y1="7"
              x2="31"
              y2="22"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FB7185" />
              <stop offset="1" stopColor="#E11D48" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`${textDimensions[size]} font-black tracking-tight text-white`}
          >
            MIND<span className="text-crimson">LOCK</span>
          </span>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-slate-300 font-mono font-bold uppercase tracking-wider border border-white/5">
            PRO
          </span>
        </div>
        {showTagline && (
          <span className="text-[10px] text-slateText-muted font-medium tracking-normal mt-0.5 hidden sm:block">
            Silence the Fear. Lock Your Rank.
          </span>
        )}
      </div>
    </div>
  );
}

