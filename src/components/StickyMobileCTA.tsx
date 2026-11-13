"use client";

import { useEffect, useState } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { trackClientClick } from "./AnalyticsTracker";

interface StickyMobileCTAProps {
  onUnlockClick: (source: string) => void;
}

export default function StickyMobileCTA({ onUnlockClick }: StickyMobileCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Appear after scrolling past 400px (hero section)
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-2.5 sm:p-3 bg-[#0A0A0A]/95 backdrop-blur-md border-t border-[#222222] shadow-[0_-5px_25px_rgba(0,0,0,0.85)] md:hidden transition-all duration-300">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-xs line-through text-slateText-muted font-mono">₹799</span>
            <span className="text-lg font-extrabold text-white font-mono tracking-tight">
              ₹199
            </span>
          </div>
          <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-0.5">
            <ShieldCheck className="w-3 h-3 text-emerald-400 inline" /> 7-Day Honest Relief
          </span>
        </div>

        <button
          id="sticky_mobile_activate_btn"
          data-track-btn="sticky_mobile_activate_btn"
          onClick={() => {
            trackClientClick(
              "sticky_mobile_activate_btn",
              "Activate Protocol (Sticky Mobile)",
              "Sticky Mobile Bar"
            );
            onUnlockClick("sticky_mobile_activate_btn");
          }}
          className="flex-1 py-3 px-4 rounded-xl bg-crimson active:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg shadow-crimson/40 cursor-pointer"
        >
          <span>Activate Protocol — ₹199</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
