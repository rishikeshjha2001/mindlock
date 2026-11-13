"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, ChevronDown, Check } from "lucide-react";
import { trackClientClick } from "./AnalyticsTracker";

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  href: string;
  badge: string;
}

export const LANGUAGES: LanguageOption[] = [
  {
    code: "en-hi",
    name: "English / Hindi",
    nativeName: "हिंदी / English",
    href: "/",
    badge: "National",
  },
  {
    code: "te",
    name: "Telugu",
    nativeName: "తెలుగు",
    href: "/te",
    badge: "AP / TS",
  },
  {
    code: "ta",
    name: "Tamil",
    nativeName: "தமிழ்",
    href: "/ta",
    badge: "Tamil Nadu",
  },
  {
    code: "kn",
    name: "Kannada",
    nativeName: "ಕನ್ನಡ",
    href: "/kn",
    badge: "Karnataka",
  },
  {
    code: "ml",
    name: "Malayalam",
    nativeName: "മലയാളം",
    href: "/ml",
    badge: "Kerala",
  },
];

export default function LanguageSelector() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Determine current active language based on pathname
  const currentLang =
    LANGUAGES.find((l) => (l.href === "/" ? pathname === "/" : pathname.startsWith(l.href))) ||
    LANGUAGES[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          trackClientClick("language_selector_toggle", `Toggle language menu (${currentLang.code})`, "Navbar");
        }}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-xs text-slate-200 transition-colors cursor-pointer"
        aria-label="Select Language"
      >
        <Globe className="w-3.5 h-3.5 text-crimson" />
        <span className="font-medium text-[11px] sm:text-xs">{currentLang.nativeName}</span>
        <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 sm:w-56 rounded-xl bg-[#141414] border border-[#2b2b2b] shadow-2xl shadow-black/80 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3 py-1 text-[10px] uppercase font-mono tracking-wider text-slate-400 border-b border-white/5">
            Select Language
          </div>
          <div className="py-1">
            {LANGUAGES.map((lang) => {
              const isActive = lang.code === currentLang.code;
              return (
                <Link
                  key={lang.code}
                  href={lang.href}
                  onClick={() => {
                    setIsOpen(false);
                    trackClientClick(`language_select_${lang.code}`, `Switched to ${lang.name}`, "Navbar Language Switcher");
                  }}
                  className={`flex items-center justify-between px-3 py-2 text-xs transition-colors ${
                    isActive
                      ? "bg-crimson/15 text-white font-semibold"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{lang.nativeName}</span>
                    <span className="text-[10px] text-slate-400">{lang.name} ({lang.badge})</span>
                  </div>
                  {isActive && <Check className="w-4 h-4 text-crimson" />}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
