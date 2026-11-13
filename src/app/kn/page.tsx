"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import UrgencyTimer from "@/components/UrgencyTimer";
import CheckoutModal from "@/components/CheckoutModal";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import Footer from "@/components/Footer";
import { trackClientClick } from "@/components/AnalyticsTracker";
import {
  Brain,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  BookOpen,
  Headphones,
  FileCheck,
  Flame,
  Zap,
  Lock,
  ChevronDown,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export default function KannadaLandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState("hero_kn");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Self-diagnosis interactive state
  const [selectedIssue, setSelectedIssue] = useState<number | null>(null);

  const handleOpenCheckout = (sourceBtn: string) => {
    setModalSource(sourceBtn);
    setIsModalOpen(true);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
    trackClientClick(`faq_toggle_kn_${idx}`, `Toggle Kannada FAQ ${idx}`, "FAQ Section");
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-slateText-primary selection:bg-crimson selection:text-white pb-20 md:pb-0 overflow-x-hidden font-kannada">
      {/* Navigation */}
      <Navbar onUnlockClick={handleOpenCheckout} />

      {/* SECTION B: HERO SECTION (KANNADA PATTERN INTERRUPT) */}
      <section
        id="hero"
        aria-label="Hero Section"
        className="relative pt-10 sm:pt-16 pb-16 px-4 sm:px-6 max-w-5xl mx-auto text-center"
      >
        {/* Pre-headline Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-crimson/10 border border-crimson/25 text-crimson text-xs sm:text-sm font-semibold mb-6">
          <Clock className="w-3.5 h-3.5" />
          <span>&apos;ಎಲ್ಲವೂ ಸರಿಯಾಗಿದೆ&apos; ಎಂದು ಮನೆಯಲ್ಲಿ ಸುಳ್ಳು ಹೇಳಿ ಸುಸ್ತಾಗಿರುವ ಅಭ್ಯರ್ಥಿಗಳಿಗಾಗಿ ಮಾತ್ರ</span>
        </div>

        {/* Pattern-Interrupt Headline */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[2.75rem] font-extrabold tracking-tight text-white leading-[1.4] sm:leading-[1.3] max-w-4xl mx-auto">
          &ldquo;22-23 ವರ್ಷದ ವಯಸ್ಸಿನಲ್ಲಿ ಒಂದು Exam Form ತುಂಬಲು ಕೂಡ{" "}
          <span className="text-crimson bg-crimson/10 px-2 py-0.5 rounded border border-crimson/20">
            ಅಪ್ಪನ ಬಳಿ ₹1,000 ಕೇಳಬೇಕಾದಾಗ...
          </span>{" "}
          ಆ ಹಣಕ್ಕಿಂತ ಹೆಚ್ಚಾಗಿ, <span className="text-crimson">ಕನ್ನಡಿಯ ಮುಂದೆ ನಿಂತು ನಮ್ಮ ಮುಖವನ್ನೇ ನೋಡಲು ನಾಚಿಕೆಯಾಗುತ್ತದೆ.</span>&rdquo;
        </h1>

        {/* Subheadline */}
        <p className="mt-6 text-sm sm:text-base md:text-lg text-slateText-secondary max-w-3xl mx-auto leading-relaxed">
          ನೀವು ಸೋಮಾರಿಗಳಲ್ಲ, ಬುದ್ಧಿಹೀನರೂ ಅಲ್ಲ. ನಿಮ್ಮ ಮೆದುಳು{" "}
          <strong className="text-white">Shame Paralysis ಮತ್ತು ಡೋಪಮೈನ್ ಬರ್ನ್‌ಔಟ್</strong>-ನಲ್ಲಿ ಸಿಲುಕಿಕೊಂಡಿದೆ.
          ಯಾವುದೇ ಸುಳ್ಳು ಮೋಟಿವೇಶನ್ ಅಥವಾ ಕಠಿಣ ಟೈಮ್‌ಟೇಬಲ್ ಇಲ್ಲದೆ... ಕೇವಲ 7 ದಿನಗಳಲ್ಲಿ ಒತ್ತಡವನ್ನು ಗೆಲ್ಲಲು ನಿಮ್ಮ ಮೆದುಳನ್ನು ರೀಸೆಟ್ ಮಾಡಿ.
        </p>

        {/* Target Exams Pill */}
        <div className="mt-5 flex flex-wrap justify-center items-center gap-2 text-xs text-slate-300 font-mono">
          <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">KCET (Karnataka CET)</span>
          <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">KPSC KAS / FDA / SDA</span>
          <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">Karnataka Police PSI & PC</span>
          <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">NEET UG</span>
          <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">JEE Main</span>
          <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">Banking & UPSC</span>
        </div>

        {/* Hero Urgency Box */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3.5 max-w-xl mx-auto">
          <UrgencyTimer />

          {/* Primary High-Urgency Action Button */}
          <button
            id="hero_buy_btn_kn"
            data-track-btn="hero_buy_btn_kn"
            onClick={() => {
              trackClientClick(
                "hero_buy_btn_kn",
                "Claim Limited ₹199 Offer — Lock Your Rank (Kannada)",
                "Hero"
              );
              handleOpenCheckout("hero_buy_btn_kn");
            }}
            className="w-full sm:w-auto px-8 sm:px-11 py-4 sm:py-4.5 rounded-2xl bg-gradient-to-r from-crimson via-rose-600 to-rose-700 hover:from-rose-600 hover:to-rose-800 text-white font-extrabold text-base sm:text-lg tracking-wide shadow-[0_0_35px_rgba(225,29,72,0.55)] hover:shadow-[0_0_45px_rgba(225,29,72,0.75)] transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2.5 sm:gap-3 group border border-rose-500/40"
          >
            <Flame className="w-5 h-5 text-white animate-pulse" />
            <span>ಕೇವಲ ₹199 ಆಫರ್ ಪಡೆಯಿರಿ — ನಿಮ್ಮ ಶ್ರೇಣಿಯನ್ನು ಲಾಕ್ ಮಾಡಿ</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </button>

          {/* Pricing Anchor & Scarcity Proof */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slateText-secondary font-mono">
            <span className="flex items-center gap-1.5">
              <span className="line-through text-slate-500 font-bold">₹799</span>
              <span className="text-white font-black text-sm">₹199 ಮಾತ್ರ</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold text-[10px] border border-emerald-800/40">75% OFF</span>
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-crimson font-semibold">₹199 ದರದಲ್ಲಿ ಕೇವಲ 8 ಪ್ರತಿಗಳು ಬಾಕಿ ಉಳಿದಿವೆ</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">ತಕ್ಷಣದ UPI ಮತ್ತು ವಾಲ್ಟ್ ಪ್ರವೇಶ</span>
          </div>

          {/* Loss Aversion Psychological Callout */}
          <div className="mt-2 p-3 sm:p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-center max-w-lg text-[11px] sm:text-xs text-slateText-muted leading-relaxed">
            <span className="text-white font-semibold">⚠️ ಕಠೋರ ವಾಸ್ತವ:</span> ಇನ್ನೊಂದು ವರ್ಷ ಡ್ರಾಪ್ ಆದರೆ ಬೆಂಗಳೂರು ವಿಜಯನಗರ ಅಥವಾ ಹಾಸ್ಟೆಲ್ ಖರ್ಚಿಗೇ <strong className="text-rose-400">₹1,50,000+</strong> ವ್ಯರ್ಥವಾಗುತ್ತದೆ. ಆ ಅವಮಾನ ಮತ್ತು ಖಿನ್ನತೆಗಿಂತ... ಒಂದು ಊಟದ ವೆಚ್ಚಕ್ಕಿಂತ ಕಡಿಮೆ ಬೆಲೆಯಲ್ಲಿ ಇಂದೇ ನಿಮ್ಮ ಗಮನವನ್ನು ಮರುಹೊಂದಿಸಿ.
          </div>
        </div>
      </section>

      {/* SECTION C: THE 2 AM MIRROR (KANNADA RAW PSYCHOLOGY) */}
      <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto border-t border-[#1C1C1C]">
        <div className="text-center mb-10">
          <span className="text-crimson text-xs font-mono uppercase tracking-widest font-semibold">
            ಮಧ್ಯರಾತ್ರಿ 2 ಗಂಟೆಯ ಏಕಾಂಗಿತನ
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
            ರೂಮಿನಲ್ಲಿ ಲೈಟ್ ಆಫ್ ಆದ ಮೇಲೆ... ನಿಜವಾದ ಸಂಘರ್ಷ ಆರಂಭವಾಗುತ್ತದೆ
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-6 rounded-2xl bg-[#121212] border border-[#222222] hover:border-crimson/30 transition-colors">
            <div className="text-crimson font-bold text-sm mb-2 font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              ರಾತ್ರಿ ರೀಲ್ಸ್ ಸ್ಕ್ರೋಲಿಂಗ್ & ಅಪರಾಧ ಪ್ರಜ್ಞೆ
            </div>
            <p className="text-xs sm:text-sm text-slateText-secondary leading-relaxed">
              &quot;ನಾಳೆ ಬೆಳಿಗ್ಗೆ 5 ಗಂಟೆಗೆ ಎದ್ದು 12 ಗಂಟೆ ಓದುತ್ತೇನೆ&quot; ಎಂದು ರಾತ್ರಿ ಗಟ್ಟಿಯಾಗಿ ನಿರ್ಧರಿಸುತ್ತೀರಿ. ಆದರೆ ಫೋನ್ ಹಿಡಿದು ರೀಲ್ಸ್ ನೋಡುತ್ತಾ 2:30 AM ಆಗಿಬಿಡುತ್ತದೆ. ಬೆಳಿಗ್ಗೆ ಎದ್ದಾಗ ಅಸಹನೀಯ ಅಪರಾಧ ಪ್ರಜ್ಞೆ (Guilt).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121212] border border-[#222222] hover:border-crimson/30 transition-colors">
            <div className="text-crimson font-bold text-sm mb-2 font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              ಸಂಬಂಧಿಕರ ಫೋನ್ ಕರೆ ಭಯ
            </div>
            <p className="text-xs sm:text-sm text-slateText-secondary leading-relaxed">
              ಯಾವುದೇ ಕಾರ್ಯಕ್ರಮಗಳಿಗೆ ಹೋಗಲು ಮುಜುಗರ, ಸಂಬಂಧಿಕರ ಫೋನ್ ಬಂದರೆ ಎತ್ತಲು ನಡುಕ. &quot;ಏನಪ್ಪಾ.. ಇನ್ನೂ ಓದ್ತಿದ್ದೀಯಾ? ಕೆಲಸ ಯಾವಾಗ ಸಿಗುತ್ತೆ?&quot; ಎಂಬ ಪ್ರಶ್ನೆಗೆ ಉತ್ತರಿಸಲಾಗದೆ ಕೊಣೆಯಲ್ಲಿ ಬಾಗಿಲು ಹಾಕಿಕೊಳ್ಳುವ ನರಕ.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121212] border border-[#222222] hover:border-crimson/30 transition-colors">
            <div className="text-crimson font-bold text-sm mb-2 font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              ಪುಸ್ತಕ ಮುಂದಿರುತ್ತದೆ ಆದರೆ ಓದಲು ಸಾಧ್ಯವಿಲ್ಲ
            </div>
            <p className="text-xs sm:text-sm text-slateText-secondary leading-relaxed">
              ಸ್ಟಡಿ ಟೇಬಲ್ ಬಳಿ 8 ಗಂಟೆ ಕುಳಿತಿರುತ್ತೀರಿ. ಆದರೆ ನಿಜವಾಗಿ ಗಮನವಿಟ್ಟು ಓದಿದ್ದು ಕೇವಲ 40 ನಿಮಿಷ ಮಾತ್ರ. ಉಳಿದ ಸಮಯವೆಲ್ಲ ಅತಿಯಾದ ಯೋಚನೆ, &quot;ಪಾಸ್ ಆಗದಿದ್ದರೆ ಏನು ಗತಿ?&quot; ಎಂಬ ಭಯದಲ್ಲೇ ಕಳೆದುಹೋಗುತ್ತದೆ.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121212] border border-[#222222] hover:border-crimson/30 transition-colors">
            <div className="text-crimson font-bold text-sm mb-2 font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Mock Test ಭಯ ಮತ್ತು ಬ್ಲಾಂಕ್ ಆಗುವುದು
            </div>
            <p className="text-xs sm:text-sm text-slateText-secondary leading-relaxed">
              ಎಲ್ಲಾ ಓದಿದ್ದೇನೆ ಎಂದುಕೊಳ್ಳುತ್ತೀರಿ. ಆದರೆ Mock Test ಬರೆಯಲು ಕುಳಿತ ತಕ್ಷಣ ಹೃದಯ ಬಡಿತ ಹೆಚ್ಚಾಗುತ್ತದೆ, ಕೈ ನಡುಗುತ್ತದೆ. ಚೆನ್ನಾಗಿ ಗೊತ್ತಿರುವ ಸರಳ ಪ್ರಶ್ನೆಗಳಿಗೂ ತಪ್ಪು ಉತ್ತರ ಹಾಕಿ ನೆಗೆಟಿವ್ ಅಂಕಗಳೊಂದಿಗೆ ಹೊರಬರುತ್ತೀರಿ.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION E: INTERACTIVE SELF-DIAGNOSIS (KANNADA) */}
      <section className="py-14 px-4 sm:px-6 max-w-3xl mx-auto bg-[#111111] rounded-3xl border border-[#242424] my-10">
        <div className="text-center mb-6">
          <span className="text-xs font-mono uppercase text-crimson font-bold tracking-wider">
            20-ಸೆಕೆಂಡ್‌ಗಳ ಸ್ವಯಂ ಪರೀಕ್ಷೆ
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
            ನಿಮ್ಮ ಮೆದುಳಿನಲ್ಲಿ ಎಲ್ಲಿ ಸಮಸ್ಯೆ ಇದೆ ಎಂದು ತಿಳಿಯಿರಿ
          </h2>
          <p className="text-xs text-slateText-muted mt-1">
            ನಿಮ್ಮ ಪ್ರಮುಖ ಸಮಸ್ಯೆಯನ್ನು ಆಯ್ಕೆ ಮಾಡಿ:
          </p>
        </div>

        <div className="space-y-3 mb-6">
          {[
            "ಓದಲು ಕುಳಿತ ತಕ್ಷಣ ನಿದ್ರೆ ಮತ್ತು ಗಮನ ಬೇರೆಡೆ ಸೆಳೆಯುವುದು",
            "ಮೊಬೈಲ್ ಫೋನ್ ರೀಲ್ಸ್ ನಿಲ್ಲಿಸಲಾಗದೆ ಗಂಟೆಗಟ್ಟಲೆ ಸಮಯ ವ್ಯರ್ಥವಾಗುವುದು",
            "ಮಾಕ್ ಟೆಸ್ಟ್‌ಗಳಲ್ಲಿ ಅಂಕಗಳು ಬಾರದೆ ಖಿನ್ನತೆ ಮತ್ತು ಭಯ ಹೆಚ್ಚಾಗುವುದು",
            "ಕುಟುಂಬದ ನಿರೀಕ್ಷೆ ಮತ್ತು ತಂದೆಯ ಶ್ರಮ ನೆನೆದು ಕಣ್ಣೀರು ಬರುವುದು",
          ].map((text, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedIssue(idx);
                trackClientClick(`diagnosis_q1_${idx}_kn`, text, "Kannada Diagnosis Widget");
              }}
              className={`w-full p-3.5 rounded-xl text-left text-xs sm:text-sm transition-all flex items-center justify-between border cursor-pointer ${
                selectedIssue === idx
                  ? "bg-crimson/20 border-crimson text-white font-bold"
                  : "bg-white/[0.03] border-white/5 text-slate-300 hover:bg-white/[0.06]"
              }`}
            >
              <span>{text}</span>
              {selectedIssue === idx && <CheckCircle2 className="w-4 h-4 text-crimson" />}
            </button>
          ))}
        </div>

        {selectedIssue !== null && (
          <div className="p-4 rounded-xl bg-crimson/10 border border-crimson/30 animate-in fade-in duration-200 text-center">
            <p className="text-xs sm:text-sm text-white font-medium">
              💡 <strong>ಪರೀಕ್ಷೆಯ ಫಲಿತಾಂಶ:</strong> ಇದು ನಿಮ್ಮ ದುರ್ಬಲತೆಯಲ್ಲ. ಭಯದಿಂದ ನಿಮ್ಮ ಮೆದುಳಿನ Amygdala ಪ್ರಚೋದಿಸುವ &apos;Flight Mode&apos;. MINDLOCK ಪ್ರೋಟೋಕಾಲ್ ಕೇವಲ 3 ದಿನಗಳಲ್ಲಿ ಈ ನರಗಳ ಸುಳಿಯನ್ನು ಬ್ರೇಕ್ ಮಾಡುತ್ತದೆ.
            </p>
            <button
              onClick={() => {
                trackClientClick("diagnosis_cta_kn", "Unlock Fix via Kannada Diagnosis", "Kannada Diagnosis");
                handleOpenCheckout("diagnosis_cta_kn");
              }}
              className="mt-3 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-crimson hover:bg-rose-600 text-white font-bold text-xs sm:text-sm transition-transform active:scale-95"
            >
              <span>ಈ ನರಗಳ ಬ್ಲಾಕ್ ಅನ್‌ಲಾಕ್ ಮಾಡಿ (₹199)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      {/* SECTION F: WHAT IS IN MINDLOCK? (THE VAULT CONTENTS) */}
      <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-mono uppercase text-crimson font-bold tracking-widest">
            ನಿಮಗೆ ಏನು ಸಿಗುತ್ತದೆ?
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-2">
            MINDLOCK ರಚನೆ: 75-ಪುಟಗಳ ಬ್ಲೂಪ್ರಿಂಟ್ + 8 ಆಡಿಯೋ ಡ್ರಿಲ್ಸ್
          </h2>
          <p className="text-xs sm:text-sm text-slateText-secondary mt-2 max-w-2xl mx-auto">
            ಕೇವಲ ಪುಸ್ತಕವಲ್ಲ — ಪರೀಕ್ಷಾ ಹಾಲ್ ಒತ್ತಡವನ್ನು ಗೆಲ್ಲಲು ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ ಸಂಪೂರ್ಣ ಮಾನಸಿಕ ಆಪರೇಟಿಂಗ್ ಸಿಸ್ಟಮ್.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#121212] border border-[#222222] relative group hover:border-crimson/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-crimson/10 flex items-center justify-center text-crimson mb-4">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              75-ಪುಟಗಳ ಕಾಗ್ನಿಟಿವ್ ಬ್ಲೂಪ್ರಿಂಟ್
            </h3>
            <p className="text-xs sm:text-sm text-slateText-secondary leading-relaxed">
              ಡೋಪಮೈನ್ ಡಿಟಾಕ್ಸ್, ಸಿಲಬಸ್ ಪ್ಯಾನಿಕ್ ನಿರ್ವಹಣೆ ಮತ್ತು ಏಕಾಗ್ರತೆ ಲಾಕ್ ಮಾಡುವ ಪ್ರಾಯೋಗಿಕ ತಂತ್ರಗಳು. ನೇರವಾದ ಕ್ರಿಯಾಯೋಜನೆ.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121212] border border-[#222222] relative group hover:border-crimson/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400 mb-4">
              <Headphones className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              8 ನ್ಯೂರೋ ಆಡಿಯೋ ಡ್ರಿಲ್ಸ್ (Binaural)
            </h3>
            <p className="text-xs sm:text-sm text-slateText-secondary leading-relaxed">
              ಓದಲು ಕುಳಿತುಕೊಳ್ಳುವ 5 ನಿಮಿಷಗಳ ಮೊದಲು ಕೇಳಬೇಕಾದ ಆಡಿಯೋ ಗೈಡ್ಸ್. ಮನಸ್ಸಿನ ಗೊಂದಲವನ್ನು ಶಾಂತಗೊಳಿಸಿ ಗಾಢವಾದ ಏಕಾಗ್ರತೆಗೆ ಕೊಂಡೊಯ್ಯುತ್ತವೆ.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121212] border border-[#222222] relative group hover:border-crimson/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              ಪರೀಕ್ಷಾ ದಿನದ ಪ್ಯಾನಿಕ್ ಪ್ರೋಟೋಕಾಲ್
            </h3>
            <p className="text-xs sm:text-sm text-slateText-secondary leading-relaxed">
              ಪರೀಕ್ಷಾ ಹಾಲ್‌ನಲ್ಲಿ ಕಠಿಣ ಪ್ರಶ್ನೆ ಕಂಡ ತಕ್ಷಣ ಕೈ ನಡುಗದೆ, ಮೆದುಳು ಬ್ಲಾಂಕ್ ಆಗದೆ 30 ಸೆಕೆಂಡುಗಳಲ್ಲಿ ನಿಯಂತ್ರಣಕ್ಕೆ ತರುವ ತುರ್ತು ತಂತ್ರ.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION H: REAL PROOF FROM KANNADA ASPIRANTS */}
      <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto border-t border-[#1F1F1F]">
        <div className="text-center mb-10">
          <span className="text-xs font-mono uppercase text-emeraldRelief font-bold tracking-wider">
            ವಿದ್ಯಾರ್ಥಿಗಳ ನೈಜ ಅನುಭವಗಳು
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            ಕರ್ನಾಟಕದ ಅಭ್ಯರ್ಥಿಗಳ ನೇರ ಪ್ರತಿಕ್ರಿಯೆಗಳು
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-[#131313] border border-white/5">
            <div className="flex items-center justify-between mb-3 text-xs font-mono">
              <span className="text-white font-bold">ಪ್ರವೀಣ್ ಗೌಡ — ಬೆಂಗಳೂರು (ವಿಜಯನಗರ)</span>
              <span className="text-emerald-400">KPSC KAS Aspirant</span>
            </div>
            <p className="text-xs sm:text-sm text-slateText-secondary leading-relaxed">
              &quot;ವಿಜಯನಗರ ಲೈಬ್ರರಿಯಲ್ಲಿ ದಿನಕ್ಕೆ 10 ಗಂಟೆ ಕುಳಿತರೂ ಓದಿದ್ದು ತಲೆಗೆ ಹೋಗುತ್ತಿರಲಿಲ್ಲ. MINDLOCK ಪ್ರೋಟೋಕಾಲ್ ಬಳಸಿದ ನಂತರ ನನ್ನ ಫೋನ್ ಸ್ಕ್ರೀನ್ ಟೈಮ್ 7 ಗಂಟೆಯಿಂದ 1.5 ಗಂಟೆಗೆ ಇಳಿಯಿತು. ಈಗ ಪೂರ್ಣ ಆತ್ಮವಿಶ್ವಾಸದಿಂದ ಓದುತ್ತಿದ್ದೇನೆ.&quot;
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#131313] border border-white/5">
            <div className="flex items-center justify-between mb-3 text-xs font-mono">
              <span className="text-white font-bold">ದೀಪಿಕಾ ಎಂ. — ಮೈಸೂರು</span>
              <span className="text-emerald-400">NEET UG Repeater</span>
            </div>
            <p className="text-xs sm:text-sm text-slateText-secondary leading-relaxed">
              &quot;ಕಳೆದ ವರ್ಷ NEET ಪರೀಕ್ಷೆಯಲ್ಲಿ ಭಯದಿಂದಲೇ ಕೆಮಿಸ್ಟ್ರಿಯಲ್ಲಿ ನೆಗೆಟಿವ್ ಅಂಕಗಳು ಬಂದಿದ್ದವು. ಈ ಆಡಿಯೋ ಡ್ರಿಲ್ಸ್ ಕೇಳಿದ ನಂತರ ಪರೀಕ್ಷೆಯ ಆತಂಕ ಪೂರ್ತಿ ನಿಂತುಹೋಯಿತು. ಮಾಕ್ ಟೆಸ್ಟ್‌ನಲ್ಲಿ ನನ್ನ ಸ್ಕೋರ್ ಈಗ 610+ ದಾಟಿದೆ.&quot;
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#131313] border border-white/5">
            <div className="flex items-center justify-between mb-3 text-xs font-mono">
              <span className="text-white font-bold">ಮಂಜುನಾಥ್ ಕೆ. — ಹುಬ್ಬಳ್ಳಿ</span>
              <span className="text-emerald-400">Karnataka Police PSI Aspirant</span>
            </div>
            <p className="text-xs sm:text-sm text-slateText-secondary leading-relaxed">
              &quot;ಮನೆಯಲ್ಲಿ ಆರ್ಥಿಕ ಸಂಕಷ್ಟ ನೋಡಿದಾಗ ತುಂಬಾ ಬೇಜಾರಾಗುತ್ತಿತ್ತು. ₹199 ಗೆ ಇಷ್ಟು ಉತ್ತಮ ಸೈಕಾಲಜಿಕಲ್ ಗೈಡ್ ಸಿಗುತ್ತದೆ ಎಂದು ಊಹಿಸಿರಲಿಲ್ಲ. ಒಂದು ಊಟದ ಬೆಲೆ ಅಷ್ಟೇ, ಪ್ರತಿಯೊಬ್ಬ ವಿದ್ಯಾರ್ಥಿಯೂ ಇದನ್ನು ಓದಲೇಬೇಕು.&quot;
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#131313] border border-white/5">
            <div className="flex items-center justify-between mb-3 text-xs font-mono">
              <span className="text-white font-bold">ಶಶಾಂಕ್ ಬಿ. — ಮಂಗಳೂರು</span>
              <span className="text-emerald-400">KCET & JEE Main Aspirant</span>
            </div>
            <p className="text-xs sm:text-sm text-slateText-secondary leading-relaxed">
              &quot;ರಾತ್ರಿ 2 ಗಂಟೆಯವರೆಗೂ ಫೋನ್ ನೋಡಿ ನೊಂದುಕೊಳ್ಳುವುದು ನನ್ನ ಅಭ್ಯಾಸವಾಗಿತ್ತು. 7 ದಿನಗಳಲ್ಲೇ ನನ್ನ ಫೋಕಸ್ ಸಂಪೂರ್ಣ ಬದಲಾಗಿದೆ. ಖಂಡಿತವಾಗಿಯೂ ಇದೊಂದು ಲೈಫ್ ಚೇಂಜರ್.&quot;
            </p>
          </div>
        </div>
      </section>

      {/* SECTION J: FAQS IN KANNADA */}
      <section className="py-14 px-4 sm:px-6 max-w-3xl mx-auto border-t border-[#1C1C1C]">
        <div className="text-center mb-8">
          <span className="text-xs font-mono uppercase text-crimson font-bold tracking-wider">
            ಸಾಮಾನ್ಯವಾಗಿ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
            ನಿಮಗೆ ಯಾವುದೇ ಸಂದೇಹಗಳಿವೆಯೇ?
          </h2>
        </div>

        <div className="space-y-3">
          {[
            {
              q: "ಹಣ ಪಾವತಿಸಿದ ತಕ್ಷಣ ಮೆಟೀರಿಯಲ್ ಹೇಗೆ ಸಿಗುತ್ತದೆ?",
              a: "Razorpay ಮೂಲಕ ₹199 ಪಾವತಿಸಿದ ಮರುಕ್ಷಣವೇ ನಿಮ್ಮ ಮೊಬೈಲ್ ಅಥವಾ ಲ್ಯಾಪ್ಟಾಪ್‌ನಲ್ಲಿ Download Vault ತೆರೆಯುತ್ತದೆ. ಜೊತೆಗೆ ನಿಮ್ಮ ವಾಟ್ಸಾಪ್ ನಂಬರ್‌ಗೂ ಡೈರೆಕ್ಟ್ ಲಿಂಕ್ ಕಳುಹಿಸಲಾಗುತ್ತದೆ.",
            },
            {
              q: "ಇದು ಯಾವ ಪರೀಕ್ಷೆಗಳಿಗೆ ಅನ್ವಯಿಸುತ್ತದೆ?",
              a: "KCET, KPSC KAS/FDA/SDA, ಕರ್ನಾಟಕ ಪೊಲೀಸ್ PSI, NEET, JEE, ಬ್ಯಾಂಕಿಂಗ್ ಮತ್ತು ಎಲ್ಲಾ ಸ್ಪರ್ಧಾತ್ಮಕ ಪರೀಕ್ಷೆಗಳಿಗೂ ಇದು ಕೆಲಸ ಮಾಡುತ್ತದೆ. ಇದು ಪಠ್ಯಪುಸ್ತಕವಲ್ಲ, ಮೆದುಳಿನ ಒತ್ತಡವನ್ನು ನಿಯಂತ್ರಿಸುವ ಮಾನಸಿಕ ತಂತ್ರ.",
            },
            {
              q: "ಆಡಿಯೋ ಡ್ರಿಲ್ಸ್ ಹೇಗೆ ಬಳಸಬೇಕು?",
              a: "ಓದಲು ಕುಳಿತುಕೊಳ್ಳುವ 5 ನಿಮಿಷಗಳ ಮೊದಲು ಇಯರ್‌ಫೋನ್ ಹಾಕಿಕೊಂಡು ಇದನ್ನು ಶಾಂತವಾಗಿ ಕೇಳಬೇಕು. ಇದು ನಿಮ್ಮ ಮೆದುಳಿನಲ್ಲಿ ಆಲ್ಫಾ ತರಂಗಗಳನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ ಅಖಂಡ ಏಕಾಗ್ರತೆ ತರುತ್ತದೆ.",
            },
            {
              q: "ಇದು ನನಗೆ ಫಲಿತಾಂಶ ನೀಡದಿದ್ದರೆ ಏನು ಮಾಡುವುದು?",
              a: "7 ದಿನಗಳ ಕಾಲ ಇದನ್ನು ಅನ್ವಯಿಸಿ ನಿಮಗೆ ಯಾವುದೇ ಬದಲಾವಣೆ ಕಾಣದಿದ್ದರೆ, ನಮಗೆ ಇಮೇಲ್ ಮಾಡಿ — ಒಂದೇ ಒಂದು ಪ್ರಶ್ನೆ ಕೇಳದೆ ನಿಮ್ಮ ₹199 ಹಣವನ್ನು 100% ಮರುಪಾವತಿಸಲಾಗುವುದು.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-white/5 bg-[#121212] overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-white cursor-pointer hover:bg-white/[0.02]"
              >
                <span>{item.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform ${
                    openFaq === idx ? "rotate-180 text-crimson" : ""
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="p-4 pt-0 text-xs text-slateText-secondary border-t border-white/5 bg-black/20 leading-relaxed">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SECTION K: FINAL URGENCY CALL TO ACTION (KANNADA) */}
      <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto text-center border-t border-[#1C1C1C]">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-rose-950/40 via-[#141414] to-[#0D0D0D] border border-crimson/30 relative overflow-hidden">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
            ಮತ್ತೊಂದು ವರ್ಷ ವ್ಯರ್ಥವಾಗುವ ಭಯ ಬೇಡ... <br />
            <span className="text-crimson">ಇಂದೇ ನಿಮ್ಮ ಗಮನವನ್ನು ಲಾಕ್ ಮಾಡಿ.</span>
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-slateText-secondary max-w-xl mx-auto">
            ನಿಮ್ಮ ಪೋಷಕರ ಕಣ್ಣಲ್ಲಿ ಹೆಮ್ಮೆಯನ್ನು ತರಲು ನಿಮಗಿರುವ ಅದ್ಭುತ ಅವಕಾಶ. ₹199 ಸಣ್ಣ ಹೂಡಿಕೆ, ಆದರೆ ಅದು ನಿಮ್ಮ ಜೀವನವನ್ನೇ ಬದಲಾಯಿಸುತ್ತದೆ.
          </p>

          <div className="mt-6 flex flex-col items-center gap-3">
            <button
              id="final_cta_btn_kn"
              data-track-btn="final_cta_btn_kn"
              onClick={() => {
                trackClientClick(
                  "final_cta_btn_kn",
                  "Final Unlock CTA (Kannada)",
                  "Footer CTA"
                );
                handleOpenCheckout("final_cta_btn_kn");
              }}
              className="px-9 py-4 rounded-2xl bg-gradient-to-r from-crimson via-rose-600 to-rose-700 hover:from-rose-600 hover:to-rose-800 text-white font-extrabold text-base sm:text-lg tracking-wide shadow-xl shadow-crimson/30 transition-all transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 border border-rose-500/40"
            >
              <Flame className="w-5 h-5 text-white" />
              <span>ಕೇವಲ ₹199 ಪಾವತಿಸಿ ತಕ್ಷಣದ ಪ್ರವೇಶ ಪಡೆಯಿರಿ</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <div className="text-[11px] font-mono text-slateText-muted flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% ಹಣ ಮರುಪಾವತಿ ಗ್ಯಾರಂಟಿ • ತಕ್ಷಣದ ವಾಟ್ಸಾಪ್ ವಿತರಣೆ</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Sticky Mobile CTA */}
      <StickyMobileCTA onUnlockClick={() => handleOpenCheckout("sticky_mobile_kn")} />

      {/* Universal Checkout Modal configured for Kannada */}
      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        sourceButton={modalSource}
        lang="kn"
      />
    </div>
  );
}
