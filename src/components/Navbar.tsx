"use client";

import { ShieldAlert, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import MindlockLogo from "./MindlockLogo";
import { trackClientClick } from "./AnalyticsTracker";

interface NavbarProps {
  onUnlockClick: (source: string) => void;
}

export default function Navbar({ onUnlockClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#222222] bg-[#0A0A0A]/90 backdrop-blur-md">
      {/* Top Minimal Protocol Bar */}
      <div className="bg-gradient-to-r from-rose-950/60 via-[#141414] to-rose-950/60 border-b border-crimson/20 text-slate-200 text-[10px] sm:text-xs font-mono py-1.5 px-3 text-center tracking-wide flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-ping" />
        <span>
          ⚡ <strong className="text-white">URGENCY ALERT:</strong> Limited ₹199 Flash Pass Active • Save ₹600 Before Midnight • Instant Vault Delivery
        </span>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <Link href="/" className="transition-transform active:scale-95">
          <MindlockLogo size="md" />
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
              trackClientClick("nav_activate_btn", "Claim ₹199 Offer (Navbar)", "Navbar");
              onUnlockClick("nav_activate_btn");
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-crimson to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-extrabold text-xs sm:text-sm tracking-wide shadow-md shadow-crimson/35 transition-all transform active:scale-95 cursor-pointer flex items-center gap-1.5 border border-rose-500/30"
          >
            <span>Claim ₹199 Offer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
