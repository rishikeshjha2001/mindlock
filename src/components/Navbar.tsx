"use client";

import { Brain, ShieldAlert, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { trackClientClick } from "./AnalyticsTracker";

interface NavbarProps {
  onUnlockClick: (source: string) => void;
}

export default function Navbar({ onUnlockClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#222222] bg-[#0A0A0A]/90 backdrop-blur-md">
      {/* Top Minimal Protocol Bar */}
      <div className="bg-[#121212] border-b border-[#222222] text-slateText-muted text-[10px] sm:text-xs font-mono py-1.5 px-3 text-center tracking-wider flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-pulse" />
        <span>
          PROTOCOL v2.4 • BUILT FOR INDIAN ASPIRANTS (18–25) • INSTANT VAULT ACCESS
        </span>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-white font-extrabold text-lg sm:text-xl tracking-tight group"
        >
          <div className="w-9 h-9 rounded-xl bg-crimson/20 border border-crimson/40 flex items-center justify-center text-crimson group-hover:bg-crimson group-hover:text-white transition-all shadow-[0_0_15px_rgba(225,29,72,0.25)]">
            <Brain className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="tracking-tight">
                MIND<span className="text-crimson">LOCK</span>
              </span>
              <span className="text-[9px] px-1.5 py-0.5 bg-white/10 text-slate-300 rounded font-mono uppercase">
                v2.4
              </span>
            </div>
            <span className="text-[10px] text-slateText-muted font-normal tracking-normal hidden sm:block">
              Silence the Fear. Lock Your Rank.
            </span>
          </div>
        </Link>

        {/* Center Live Aspirant Activity */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slateText-secondary font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>4,820+ Aspirants Activated This Week</span>
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <button
            id="nav_activate_btn"
            data-track-btn="nav_activate_btn"
            onClick={() => {
              trackClientClick("nav_activate_btn", "Activate Protocol (Navbar)", "Navbar");
              onUnlockClick("nav_activate_btn");
            }}
            className="px-4 py-2 rounded-xl bg-crimson hover:bg-rose-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-crimson/25 transition-all transform active:scale-95 cursor-pointer flex items-center gap-1.5"
          >
            <span>Activate Protocol — ₹199</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
