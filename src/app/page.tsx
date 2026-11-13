"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import SelfDiagnosisWidget from "@/components/SelfDiagnosisWidget";
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
  Crosshair,
  Sparkles,
  Check,
} from "lucide-react";

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState("hero");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleOpenCheckout = (sourceBtn: string) => {
    setModalSource(sourceBtn);
    setIsModalOpen(true);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
    trackClientClick(`faq_toggle_${idx}`, `Toggle FAQ ${idx}`, "FAQ Section");
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-slateText-primary selection:bg-crimson selection:text-white pb-20 md:pb-0 overflow-x-hidden font-sans">
      {/* Navigation */}
      <Navbar onUnlockClick={handleOpenCheckout} />

      {/* SECTION B: HERO SECTION (THE SUBCONSCIOUS MIRROR) */}
      <section
        id="hero"
        aria-label="Hero Section"
        className="relative pt-10 sm:pt-16 pb-16 px-4 sm:px-6 max-w-5xl mx-auto text-center"
      >
        {/* Pre-headline Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-crimson/10 border border-crimson/25 text-crimson text-xs sm:text-sm font-semibold mb-6">
          <Clock className="w-3.5 h-3.5" />
          <span>Read this if you are tired of pretending &apos;sab theek chal raha hai&apos;</span>
        </div>

        {/* Pattern-Interrupt Headline */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[2.75rem] font-extrabold tracking-tight text-white leading-[1.35] sm:leading-[1.28] max-w-4xl mx-auto font-hindi">
          &ldquo;22-23 की उम्र में जब एक Form भरने के लिए भी{" "}
          <span className="text-crimson bg-crimson/10 px-2 py-0.5 rounded border border-crimson/20">
            Papa से ₹1,000 मांगने
          </span>{" "}
          पड़ते हैं ना... तो पैसों से ज़्यादा, <span className="text-crimson">खुद से नज़रें मिलाने में शर्म आती है।</span>&rdquo;
        </h1>

        {/* Subheadline */}
        <p className="mt-6 text-sm sm:text-base md:text-lg text-slateText-secondary max-w-3xl mx-auto leading-relaxed">
          You are not lazy, and you are not average. Your nervous system is trapped in{" "}
          <strong className="text-white">shame paralysis and dopamine burnout</strong>. Reset how your brain handles pressure in 7 days—without fake motivation or rigid timetables.
        </p>

        {/* Primary Non-Sales Hero CTA */}
        <div className="mt-8 flex flex-col items-center justify-center gap-2.5">
          <button
            id="hero_activate_btn"
            data-track-btn="hero_activate_btn"
            onClick={() => {
              trackClientClick(
                "hero_activate_btn",
                "Activate My Reset Protocol →",
                "Hero"
              );
              handleOpenCheckout("hero_activate_btn");
            }}
            className="w-full sm:w-auto px-8 sm:px-11 py-4 sm:py-4.5 rounded-2xl bg-crimson hover:bg-rose-500 text-white font-extrabold text-base sm:text-lg tracking-wide shadow-[0_0_30px_rgba(225,29,72,0.45)] transition-all transform active:scale-95 cursor-pointer flex items-center justify-center gap-3 group"
          >
            <span>Activate My Reset Protocol →</span>
          </button>

          {/* Micro-trust line */}
          <p className="text-xs text-slateText-muted font-mono">
            Instant PDF Manual + 8 Hindi Audio Drills • ₹199 One-Time Commitment
          </p>
        </div>
      </section>

      {/* SECTION C: 20-SECOND MENTAL FRICTION SELF-DIAGNOSIS WIDGET */}
      <section
        id="self-diagnosis"
        aria-label="Self Diagnosis"
        className="px-4 sm:px-6"
      >
        <SelfDiagnosisWidget onUnlockClick={handleOpenCheckout} />
      </section>

      {/* SECTION D: THE SILENT DAILY WAR (6 UNAVOIDABLE REALITY CARDS) */}
      <section
        id="silent-war"
        aria-label="The Silent Daily War"
        className="py-16 sm:py-20 px-4 sm:px-6 bg-[#0E0E0E] border-y border-[#222222] relative"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-crimson font-mono font-bold">
              The Aspirant Reality Check
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-2 tracking-tight">
              The Silent Daily War You Fight Alone Every Night
            </h2>
            <p className="text-xs sm:text-sm text-slateText-secondary mt-3">
              Six inescapable psychological traps that drain 80% of an aspirant&apos;s mental energy before they even open a book:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Card 1 */}
            <div className="bg-[#121212] border border-[#222222] rounded-2xl p-5 hover:border-crimson/40 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-crimson/15 border border-crimson/30 flex items-center justify-center text-crimson mb-4 group-hover:scale-105 transition-transform font-bold text-sm font-mono">
                01
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-crimson transition-colors font-hindi">
                Papa Se Paise Maangne Ki Sharm
              </h3>
              <p className="text-xs sm:text-sm text-slateText-secondary mt-2.5 leading-relaxed">
                The silent guilt of asking for form fees or room rent at 22+ while parents never complain and say &quot;tu bas padh.&quot; That heaviness sits in your chest during every study hour.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#121212] border border-[#222222] rounded-2xl p-5 hover:border-crimson/40 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-crimson/15 border border-crimson/30 flex items-center justify-center text-crimson mb-4 group-hover:scale-105 transition-transform font-bold text-sm font-mono">
                02
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-crimson transition-colors font-hindi">
                Library Mein 10 Ghante Baithne Ka Jhooth
              </h3>
              <p className="text-xs sm:text-sm text-slateText-secondary mt-2.5 leading-relaxed">
                Coming home physically exhausted after turning pages all day, yet when you close your eyes at night, you realize you retained almost nothing. The exhaustion is from passive guilt, not real learning.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#121212] border border-[#222222] rounded-2xl p-5 hover:border-crimson/40 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-crimson/15 border border-crimson/30 flex items-center justify-center text-crimson mb-4 group-hover:scale-105 transition-transform font-bold text-sm font-mono">
                03
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-crimson transition-colors font-hindi">
                Result PDF Mein &apos;No Match Found&apos;
              </h3>
              <p className="text-xs sm:text-sm text-slateText-secondary mt-2.5 leading-relaxed">
                The unbearable silence in the living room when you walk out of your room after Ctrl+F fails to find your roll number. That silence hurts 100x deeper than any reprimand.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-[#121212] border border-[#222222] rounded-2xl p-5 hover:border-crimson/40 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-crimson/15 border border-crimson/30 flex items-center justify-center text-crimson mb-4 group-hover:scale-105 transition-transform font-bold text-sm font-mono">
                04
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-crimson transition-colors font-hindi">
                Raat 2 Baje Chhat Ko Ghoorna
              </h3>
              <p className="text-xs sm:text-sm text-slateText-secondary mt-2.5 leading-relaxed">
                Making ambitious promises every night (&quot;kal 6 baje pakka&quot;), breaking them by noon, and gradually destroying your subconscious self-trust and self-respect.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-[#121212] border border-[#222222] rounded-2xl p-5 hover:border-crimson/40 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-crimson/15 border border-crimson/30 flex items-center justify-center text-crimson mb-4 group-hover:scale-105 transition-transform font-bold text-sm font-mono">
                05
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-crimson transition-colors font-hindi">
                Dost Ki First Salary vs. Ruka Hua Waqt
              </h3>
              <p className="text-xs sm:text-sm text-slateText-secondary mt-2.5 leading-relaxed">
                Watching school friends buy gadgets, cars, or post corporate team trips on Instagram while your life remains frozen under the same yellow bulb and handwritten notes.
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-[#121212] border border-[#222222] rounded-2xl p-5 hover:border-crimson/40 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-crimson/15 border border-crimson/30 flex items-center justify-center text-crimson mb-4 group-hover:scale-105 transition-transform font-bold text-sm font-mono">
                06
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-crimson transition-colors font-hindi">
                Exam-Hall Sympathetic Hijack
              </h3>
              <p className="text-xs sm:text-sm text-slateText-secondary mt-2.5 leading-relaxed">
                Solving questions smoothly in your room, but the minute the exam countdown clock ticks red, your heart races, hands tremble, and mind blanks out on basic formulas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION E: WHY EVERYTHING ELSE FAILED YOU (MECHANISM COMPARISON) */}
      <section
        id="mechanism-comparison"
        aria-label="Mechanism Comparison"
        className="py-16 sm:py-20 px-4 sm:px-6 max-w-5xl mx-auto"
      >
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-crimson font-mono font-bold">
            Root Cause Diagnosis
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-2 tracking-tight">
            Why Surface Fixes Fail by Day 3
          </h2>
          <p className="text-xs sm:text-sm text-slateText-secondary mt-3">
            Willpower cannot defeat an overheated sympathetic nervous system. Compare the two approaches:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Surface Fixes */}
          <div className="bg-[#121212] border border-rose-950/60 rounded-3xl p-6 sm:p-7 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-4 text-rose-400 font-bold text-lg">
              <XCircle className="w-5 h-5 shrink-0" />
              <span>Traditional Advice (Surface Fixes)</span>
            </div>
            <ul className="space-y-4 text-xs sm:text-sm text-slateText-secondary">
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold">✕</span>
                <span>
                  <strong>14-Hour Rigid Timetables:</strong> Broken on Day 2, triggering a spiral of self-disgust and 3 hours of escapist Reels scrolling.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold">✕</span>
                <span>
                  <strong>App Blockers:</strong> Easily uninstalled in moments of boredom or replaced by cleaning the room and wandering aimlessly.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold">✕</span>
                <span>
                  <strong>Loud Motivational Videos:</strong> 20-minute temporary dopamine spike followed by an even deeper crash into despair by bedtime.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold">✕</span>
                <span>
                  <strong>Ignoring Nervous System State:</strong> Trying to force active study while your brain is biologically in an adrenaline threat freeze.
                </span>
              </li>
            </ul>
          </div>

          {/* Root Nervous System Rewiring */}
          <div className="bg-gradient-to-b from-[#161618] to-[#101012] border-2 border-crimson/50 rounded-3xl p-6 sm:p-7 relative overflow-hidden shadow-[0_0_30px_rgba(225,29,72,0.15)]">
            <div className="absolute top-0 right-0 bg-crimson text-white text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-bl-xl">
              Root Rewiring
            </div>
            <div className="flex items-center gap-2 mb-4 text-white font-bold text-lg">
              <CheckCircle2 className="w-5 h-5 text-crimson shrink-0" />
              <span>The MINDLOCK Operating System</span>
            </div>
            <ul className="space-y-4 text-xs sm:text-sm text-slateText-primary">
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>
                  <strong>60-Second Nervous System Down-Regulation:</strong> Neutralizes the brain&apos;s fight-or-flight freeze when opening difficult topics.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>
                  <strong>8 Late-Night Audio Reset Drills:</strong> Tactical Hindi neural reset tracks you listen to at 1:30 AM to silence guilt and kill phone urges.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>
                  <strong>Cold Exam-Hall Nerve Control:</strong> Physical vagal maneuvers and cognitive anchors that keep memory recall wide open under clock pressure.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>
                  <strong>Ego-Threat Neutralization:</strong> Rewires the subconscious mind so that difficult Physics/Quant/GS chapters feel intriguing instead of terrifying.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION F: INSIDE THE MINDLOCK VAULT (TANGIBLE DELIVERABLES) */}
      <section
        id="vault-modules"
        aria-label="Inside the Vault"
        className="py-16 sm:py-20 px-4 sm:px-6 bg-[#0E0E0E] border-y border-[#222222]"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-crimson font-mono font-bold">
              Tangible System Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-2 tracking-tight">
              Inside the MINDLOCK Vault
            </h2>
            <p className="text-xs sm:text-sm text-slateText-secondary mt-3">
              Four structured modules engineered for immediate implementation starting tonight:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* MODULE 01 */}
            <div className="bg-[#121212] border border-[#222222] rounded-3xl p-6 relative hover:border-crimson/50 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-crimson bg-crimson/15 px-2.5 py-1 rounded-lg border border-crimson/30">
                    MODULE 01
                  </span>
                  <BookOpen className="w-5 h-5 text-neutral-500" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                  The MINDLOCK Cognitive Manual (75-Page Blueprint)
                </h3>
                <p className="text-xs sm:text-sm text-slateText-secondary leading-relaxed">
                  Visual mental models designed to systematically eliminate overthinking, backlog panic, and passive reading traps. Provides a clean 7-day neurological reset framework.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-white/5 text-[11px] font-mono text-slateText-muted">
                Format: High-Res Interactive PDF Manual
              </div>
            </div>

            {/* MODULE 02 */}
            <div className="bg-[#121212] border border-[#222222] rounded-3xl p-6 relative hover:border-crimson/50 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800/40">
                    MODULE 02
                  </span>
                  <Headphones className="w-5 h-5 text-neutral-500" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                  8 Raw Hindi Late-Night Audio Reset Drills
                </h3>
                <p className="text-xs sm:text-sm text-slateText-secondary leading-relaxed">
                  Put on earphones before studying or sleeping to shut down subconscious guilt, phone urges, and mock test anxiety in under 4 minutes. Voiced in unfiltered Hindi for Indian aspirants.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-white/5 text-[11px] font-mono text-slateText-muted">
                Format: Complete 320kbps MP3 Audio Pack (ZIP)
              </div>
            </div>

            {/* MODULE 03 */}
            <div className="bg-[#121212] border border-[#222222] rounded-3xl p-6 relative hover:border-crimson/50 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-800/40">
                    MODULE 03
                  </span>
                  <Flame className="w-5 h-5 text-neutral-500" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                  The 60-Second Tough-Chapter Friction Decoder
                </h3>
                <p className="text-xs sm:text-sm text-slateText-secondary leading-relaxed">
                  The exact step-by-step psychological protocol to stop running away from difficult Physics, Quant, or GS topics and enter effortless focus within 60 seconds.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-white/5 text-[11px] font-mono text-slateText-muted">
                Format: Step-by-Step Tactical Flowchart
              </div>
            </div>

            {/* MODULE 04 */}
            <div className="bg-[#121212] border border-[#222222] rounded-3xl p-6 relative hover:border-crimson/50 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-sky-400 bg-sky-950/60 px-2.5 py-1 rounded-lg border border-sky-800/40">
                    MODULE 04
                  </span>
                  <Crosshair className="w-5 h-5 text-neutral-500" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                  Exam-Hall Nerve Control & Inner Scorecard Tracker
                </h3>
                <p className="text-xs sm:text-sm text-slateText-secondary leading-relaxed">
                  Printable daily execution matrix + pre-exam autonomic panic kill-switch that prevents hand tremors and blackout states during high-stakes exam hours.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-white/5 text-[11px] font-mono text-slateText-muted">
                Format: Printable Inner Scorecard PDF
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION G: SKEPTIC-FIRST ASPIRANT PROOF (WHATSAPP UI CARDS) */}
      <section
        id="proof"
        aria-label="Aspirant Proof"
        className="py-16 sm:py-20 px-4 sm:px-6 max-w-5xl mx-auto"
      >
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-crimson font-mono font-bold">
            Real Unfiltered Proof
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-2 tracking-tight">
            From Skepticism to Quiet Calm
          </h2>
          <p className="text-xs sm:text-sm text-slateText-secondary mt-3">
            Real late-night messages from aspirants who doubted whether ₹199 could change anything:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card 1 */}
          <div className="bg-[#121212] border border-[#222222] rounded-3xl p-5 shadow-lg relative">
            <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-950/70 border border-emerald-500/40 flex items-center justify-center text-emerald-300 font-bold text-xs">
                  A
                </div>
                <div>
                  <span className="font-bold text-white block leading-tight">Ankit, Dropper</span>
                  <span className="text-[10px] text-slateText-muted">Kota (JEE Preparation)</span>
                </div>
              </div>
              <span className="text-[10px] text-slateText-muted font-mono">1:48 AM</span>
            </div>
            <div className="bg-[#18181A] rounded-2xl p-3.5 text-xs sm:text-sm text-slate-200 border-l-2 border-emerald-500 leading-relaxed font-hindi">
              &ldquo;Bhai sach batau toh pehle laga tha ye bhi koi normal PDF hoga jo Telegram pe milta hai. Par raat ko Audio #2 sunne ke baad aaj subah bina phone chhuye 4 ghante Physics lagayi. Dimag ekdam shant ho gaya.&rdquo;
              <div className="mt-2 text-right flex items-center justify-end gap-1 text-[10px] text-sky-400 font-mono">
                <span>Read</span>
                <span className="text-sky-400">✓✓</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#121212] border border-[#222222] rounded-3xl p-5 shadow-lg relative">
            <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-crimson/20 border border-crimson/40 flex items-center justify-center text-crimson font-bold text-xs">
                  P
                </div>
                <div>
                  <span className="font-bold text-white block leading-tight">Priya, 2nd Attempt</span>
                  <span className="text-[10px] text-slateText-muted">Delhi (UPSC CSE)</span>
                </div>
              </div>
              <span className="text-[10px] text-slateText-muted font-mono">2:14 AM</span>
            </div>
            <div className="bg-[#18181A] rounded-2xl p-3.5 text-xs sm:text-sm text-slate-200 border-l-2 border-crimson leading-relaxed font-hindi">
              &ldquo;Papa se paise maangne wali baat seedha dil pe lagi thi. Is system ne guilt ko execution mein badalna sikha diya. Best ₹199 decision.&rdquo;
              <div className="mt-2 text-right flex items-center justify-end gap-1 text-[10px] text-sky-400 font-mono">
                <span>Read</span>
                <span className="text-sky-400">✓✓</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#121212] border border-[#222222] rounded-3xl p-5 shadow-lg relative">
            <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-950/70 border border-blue-500/40 flex items-center justify-center text-blue-300 font-bold text-xs">
                  R
                </div>
                <div>
                  <span className="font-bold text-white block leading-tight">Rohan</span>
                  <span className="text-[10px] text-slateText-muted">Patna (SSC CGL)</span>
                </div>
              </div>
              <span className="text-[10px] text-slateText-muted font-mono">11:32 PM</span>
            </div>
            <div className="bg-[#18181A] rounded-2xl p-3.5 text-xs sm:text-sm text-slate-200 border-l-2 border-blue-500 leading-relaxed font-hindi">
              &ldquo;Mock test mein haath kaampne band ho gaye bhai. Exam-hall nerve drill literally saved my attempt.&rdquo;
              <div className="mt-2 text-right flex items-center justify-end gap-1 text-[10px] text-sky-400 font-mono">
                <span>Read</span>
                <span className="text-sky-400">✓✓</span>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-[#121212] border border-[#222222] rounded-3xl p-5 shadow-lg relative">
            <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-purple-950/70 border border-purple-500/40 flex items-center justify-center text-purple-300 font-bold text-xs">
                  S
                </div>
                <div>
                  <span className="font-bold text-white block leading-tight">Sneha</span>
                  <span className="text-[10px] text-slateText-muted">Lucknow (NEET Aspirant)</span>
                </div>
              </div>
              <span className="text-[10px] text-slateText-muted font-mono">1:15 AM</span>
            </div>
            <div className="bg-[#18181A] rounded-2xl p-3.5 text-xs sm:text-sm text-slate-200 border-l-2 border-purple-500 leading-relaxed font-hindi">
              &ldquo;Pehli baar raat ko sone se pehle khud pe gussa nahi aa raha. Inner scorecard tracker is gold.&rdquo;
              <div className="mt-2 text-right flex items-center justify-end gap-1 text-[10px] text-sky-400 font-mono">
                <span>Read</span>
                <span className="text-sky-400">✓✓</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION H: ZERO-SALES RESISTANCE ACTIVATION CARD (PRICING & GUARANTEE) */}
      <section
        id="activation"
        aria-label="Activation Section"
        className="py-16 sm:py-20 px-4 sm:px-6 bg-[#0E0E0E] border-y border-[#222222] relative"
      >
        <div className="max-w-3xl mx-auto">
          <div className="rounded-3xl bg-gradient-to-b from-[#141414] to-[#0A0A0A] border-2 border-crimson/50 p-6 sm:p-10 shadow-[0_0_50px_rgba(225,29,72,0.2)] text-center relative overflow-hidden">
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to Take Back Control Tonight?
            </h3>
            <p className="text-xs sm:text-sm text-slateText-secondary mt-2 max-w-lg mx-auto">
              Get full instant access to the complete 4-module MINDLOCK Operating System.
            </p>

            {/* Psychological Price Reframe Box */}
            <div className="my-6 p-4 rounded-2xl bg-black/60 border border-white/5 text-left text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white block mb-1">Why ₹199 instead of free?</strong>
              Because free Telegram PDFs sit unopened in your phone storage forever. A small ₹199 commitment—less than a single meal—signals your subconscious brain that you are serious about changing your trajectory tonight.
            </div>

            {/* Price Stack */}
            <div className="my-6 flex items-baseline justify-center gap-3">
              <span className="text-lg sm:text-xl text-slateText-muted line-through font-mono">
                ₹799
              </span>
              <span className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight font-mono">
                ₹199
              </span>
              <span className="text-xs text-emerald-400 font-semibold uppercase bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded font-mono">
                One-Time Commitment
              </span>
            </div>

            <p className="text-xs text-slateText-muted mb-6 font-mono">
              One-Time Commitment • Lifetime Vault Access • Instant Delivery
            </p>

            {/* Primary Activation Button */}
            <button
              id="pricing_activate_btn"
              data-track-btn="pricing_activate_btn"
              onClick={() => {
                trackClientClick(
                  "pricing_activate_btn",
                  "Unlock Full Vault Access — ₹199",
                  "Pricing"
                );
                handleOpenCheckout("pricing_activate_btn");
              }}
              className="w-full max-w-md mx-auto py-4 sm:py-4.5 px-6 rounded-2xl bg-crimson hover:bg-rose-500 text-white font-extrabold text-base sm:text-lg tracking-wide shadow-[0_0_35px_rgba(225,29,72,0.45)] transition-all transform active:scale-98 cursor-pointer flex items-center justify-center gap-2 group"
            >
              <span>Unlock Full Vault Access — ₹199</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* UPI Badges */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-300 font-mono">
              <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">GPay</span>
              <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">PhonePe</span>
              <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">Paytm</span>
              <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">Instant UPI Access</span>
            </div>

            {/* 7-Day Honest Relief Guarantee Box */}
            <div className="mt-6 p-4 rounded-2xl bg-emerald-950/30 border border-emerald-700/40 text-left flex items-start gap-3 max-w-lg mx-auto">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs text-emerald-200 leading-relaxed">
                <strong>7-Day Honest Relief Guarantee:</strong> Use the audio drills and mental protocols for 7 days. If you don&apos;t feel a real drop in overthinking and a sharp rise in daily focus, message us on WhatsApp—100% refund, no awkward questions asked.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Bottom Mobile Bar */}
      <StickyMobileCTA onUnlockClick={handleOpenCheckout} />

      {/* 2-Step Access Modal */}
      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        sourceButton={modalSource}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
