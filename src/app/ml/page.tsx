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

export default function MalayalamLandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState("hero_ml");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Self-diagnosis interactive state
  const [selectedIssue, setSelectedIssue] = useState<number | null>(null);

  const handleOpenCheckout = (sourceBtn: string) => {
    setModalSource(sourceBtn);
    setIsModalOpen(true);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
    trackClientClick(`faq_toggle_ml_${idx}`, `Toggle Malayalam FAQ ${idx}`, "FAQ Section");
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-slateText-primary selection:bg-crimson selection:text-white pb-20 md:pb-0 overflow-x-hidden font-malayalam">
      {/* Navigation */}
      <Navbar onUnlockClick={handleOpenCheckout} />

      {/* SECTION B: HERO SECTION (MALAYALAM PATTERN INTERRUPT) */}
      <section
        id="hero"
        aria-label="Hero Section"
        className="relative pt-10 sm:pt-16 pb-16 px-4 sm:px-6 max-w-5xl mx-auto text-center"
      >
        {/* Pre-headline Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-crimson/10 border border-crimson/25 text-crimson text-xs sm:text-sm font-semibold mb-6">
          <Clock className="w-3.5 h-3.5" />
          <span>&apos;എല്ലാം ശരിയാകുന്നുണ്ട്&apos; എന്ന് വീട്ടിൽ കള്ളം പറഞ്ഞ് മടുത്ത ഉദ്യോഗാർത്ഥികൾക്കായി</span>
        </div>

        {/* Pattern-Interrupt Headline */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[2.75rem] font-extrabold tracking-tight text-white leading-[1.4] sm:leading-[1.3] max-w-4xl mx-auto">
          &ldquo;22-23 വയസ്സിൽ ഒരു Exam Form ഫീസ് അടക്കാൻ പോലും{" "}
          <span className="text-crimson bg-crimson/10 px-2 py-0.5 rounded border border-crimson/20">
            അച്ഛനോട് ₹1,000 ചോദിക്കേണ്ടി
          </span>{" "}
          വരുമ്പോൾ... ആ പണത്തേക്കാൾ കൂടുതൽ, <span className="text-crimson">സ്വന്തം മുഖത്ത് നോക്കാൻ തന്നെ നാണക്കേട് തോന്നും.</span>&rdquo;
        </h1>

        {/* Subheadline */}
        <p className="mt-6 text-sm sm:text-base md:text-lg text-slateText-secondary max-w-3xl mx-auto leading-relaxed">
          നിങ്ങൾ മടിയനല്ല, കഴിവില്ലാത്തവരുമല്ല. നിങ്ങളുടെ മനസ്സ്{" "}
          <strong className="text-white">Shame Paralysis, ഡോപാമിൻ ബേൺഔട്ട്</strong> എന്നിവയിൽ കുടുങ്ങിക്കിടക്കുകയാണ്.
          വ്യാജ മോട്ടിവേഷനോ അപ്രായോഗിക ടൈംടേബിളുകളോ ഇല്ലാതെ... വെറും 7 ദിവസം കൊണ്ട് ഏകാഗ്രത തിരിച്ചുപിടിക്കാൻ നിങ്ങളുടെ തലച്ചോറിനെ റീവയർ ചെയ്യുക.
        </p>

        {/* Target Exams Pill */}
        <div className="mt-5 flex flex-wrap justify-center items-center gap-2 text-xs text-slate-300 font-mono">
          <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">Kerala PSC (LDC, CPO, KAS)</span>
          <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">KEAM (Kerala Engg / Med)</span>
          <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">NEET UG</span>
          <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">JEE Main</span>
          <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">Banking (Federal, SBI)</span>
          <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">UPSC Civils</span>
        </div>

        {/* Hero Urgency Box */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3.5 max-w-xl mx-auto">
          <UrgencyTimer />

          {/* Primary High-Urgency Action Button */}
          <button
            id="hero_buy_btn_ml"
            data-track-btn="hero_buy_btn_ml"
            onClick={() => {
              trackClientClick(
                "hero_buy_btn_ml",
                "Claim Limited ₹199 Offer — Lock Your Rank (Malayalam)",
                "Hero"
              );
              handleOpenCheckout("hero_buy_btn_ml");
            }}
            className="w-full sm:w-auto px-8 sm:px-11 py-4 sm:py-4.5 rounded-2xl bg-gradient-to-r from-crimson via-rose-600 to-rose-700 hover:from-rose-600 hover:to-rose-800 text-white font-extrabold text-base sm:text-lg tracking-wide shadow-[0_0_35px_rgba(225,29,72,0.55)] hover:shadow-[0_0_45px_rgba(225,29,72,0.75)] transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2.5 sm:gap-3 group border border-rose-500/40"
          >
            <Flame className="w-5 h-5 text-white animate-pulse" />
            <span>വെറും ₹199 ഓഫർ നേടൂ — നിങ്ങളുടെ റാങ്ക് ലോക്ക് ചെയ്യൂ</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </button>

          {/* Pricing Anchor & Scarcity Proof */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slateText-secondary font-mono">
            <span className="flex items-center gap-1.5">
              <span className="line-through text-slate-500 font-bold">₹799</span>
              <span className="text-white font-black text-sm">₹199 മാത്രം</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold text-[10px] border border-emerald-800/40">75% OFF</span>
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-crimson font-semibold">₹199 നിരക്കിൽ വെറും 8 കോപ്പികൾ മാത്രം ബാക്കി</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">തൽക്ഷണ UPI & വോൾട്ട് ആക്സസ്</span>
          </div>

          {/* Loss Aversion Psychological Callout */}
          <div className="mt-2 p-3 sm:p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-center max-w-lg text-[11px] sm:text-xs text-slateText-muted leading-relaxed">
            <span className="text-white font-semibold">⚠️ കഠിനമായ യാഥാർത്ഥ്യം:</span> മറ്റൊരു ഡ്രോപ്പ് ഇയർ വന്നാൽ ഹോസ്റ്റൽ ചിലവിനും കോച്ചിംഗിനുമായി <strong className="text-rose-400">₹1,50,000+</strong> നഷ്ടപ്പെടും. ആ അപമാനവും നിരാശയും ഒഴിവാക്കാൻ... ഒരു ഉച്ചയൂണിന്റെ പൈസയേക്കാൾ കുറഞ്ഞ ചെലവിൽ നിങ്ങളുടെ ഫോക്കസ് ഇന്ന് തന്നെ റീസെറ്റ് ചെയ്യുക.
          </div>
        </div>
      </section>

      {/* SECTION C: THE 2 AM MIRROR (MALAYALAM RAW PSYCHOLOGY) */}
      <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto border-t border-[#1C1C1C]">
        <div className="text-center mb-10">
          <span className="text-crimson text-xs font-mono uppercase tracking-widest font-semibold">
            അർദ്ധരാത്രി 2 മണിയുടെ ഏകാന്തത
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
            മുറിയിലെ ലൈറ്റ് അണഞ്ഞാൽ... തുടങ്ങുന്ന യഥാർത്ഥ യുദ്ധം
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-6 rounded-2xl bg-[#121212] border border-[#222222] hover:border-crimson/30 transition-colors">
            <div className="text-crimson font-bold text-sm mb-2 font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              റീൽസ് സ്ക്രോളിംഗും കടുത്ത കുറ്റബോധവും
            </div>
            <p className="text-xs sm:text-sm text-slateText-secondary leading-relaxed">
              &quot;നാളെ പുലർച്ചെ 5 മണിക്ക് എഴുന്നേറ്റ് 12 മണിക്കൂർ പഠിക്കും&quot; എന്ന് രാത്രി ഉറപ്പിച്ച് കിടക്കും. എന്നാൽ ഫോണെടുത്ത് Reels കണ്ട് നേരം 2:30 AM ആകും. രാവിലെ ഉണരുമ്പോൾ ഉണ്ടാകുന്ന കടുത്ത കുറ്റബോധം (Guilt).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121212] border border-[#222222] hover:border-crimson/30 transition-colors">
            <div className="text-crimson font-bold text-sm mb-2 font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              ബന്ധുക്കളുടെ ഫോൺ കോൾ ഭയം
            </div>
            <p className="text-xs sm:text-sm text-slateText-secondary leading-relaxed">
              വിശേഷങ്ങൾക്ക് പോകാൻ മടി, ബന്ധുക്കളുടെ കോൾ വന്നാൽ എടുക്കാൻ വിറയൽ. &quot;മോനേ.. ഇപ്പോഴും പഠിച്ചുകൊണ്ടിരിക്കുകയാണോ? ജോലി എപ്പോ കിട്ടും?&quot; എന്ന ചോദ്യത്തിന് മറുപടി പറയാനില്ലാതെ മുറിയടച്ചിരിക്കുന്ന അവസ്ഥ.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121212] border border-[#222222] hover:border-crimson/30 transition-colors">
            <div className="text-crimson font-bold text-sm mb-2 font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              പുസ്തകം മുന്നിലുണ്ട്, പക്ഷെ പഠിക്കാൻ കഴിയുന്നില്ല
            </div>
            <p className="text-xs sm:text-sm text-slateText-secondary leading-relaxed">
              സ്റ്റഡി ടേബിളിൽ 8 മണിക്കൂർ ഇരിക്കും. എന്നാൽ മനസ്സിരുത്തി പഠിച്ചത് വെറും 40 മിനിറ്റ് മാത്രം. ബാക്കി സമയം മുഴുവൻ ഓവർ തിങ്കിംഗും, &quot;തോറ്റാൽ എന്താകും?&quot; എന്ന ഭയത്തിലും ഒലിച്ചുപോകുന്നു.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121212] border border-[#222222] hover:border-crimson/30 transition-colors">
            <div className="text-crimson font-bold text-sm mb-2 font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Mock Test ഭയവും ബ്ലാങ്ക് ആകുന്നതും
            </div>
            <p className="text-xs sm:text-sm text-slateText-secondary leading-relaxed">
              എല്ലാം പഠിച്ചു എന്ന് കരുതും. പക്ഷെ Mock Test എഴുതാൻ ഇരിക്കുമ്പോൾ നെഞ്ചിടിപ്പ് കൂടും, കൈ വിറയ്ക്കും. നന്നായി അറിയാവുന്ന എളുപ്പമുള്ള ചോദ്യങ്ങൾക്ക് പോലും തെറ്റായ ഉത്തരം നൽകി നെഗറ്റീവ് മാർക്കിൽ എത്തും.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION E: INTERACTIVE SELF-DIAGNOSIS (MALAYALAM) */}
      <section className="py-14 px-4 sm:px-6 max-w-3xl mx-auto bg-[#111111] rounded-3xl border border-[#242424] my-10">
        <div className="text-center mb-6">
          <span className="text-xs font-mono uppercase text-crimson font-bold tracking-wider">
            20-സെക്കൻഡ് ഓൺലൈൻ പരിശോധന
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
            നിങ്ങളുടെ തലച്ചോറിലെ തടസ്സം എവിടെയാണെന്ന് ഇപ്പോൾ കണ്ടെത്തൂ
          </h2>
          <p className="text-xs text-slateText-muted mt-1">
            നിങ്ങളുടെ ഇപ്പോഴത്തെ പ്രധാന പ്രശ്നം തിരഞ്ഞെടുക്കൂ:
          </p>
        </div>

        <div className="space-y-3 mb-6">
          {[
            "പഠിക്കാൻ ഇരുന്ന ഉടൻ ഉറക്കവും ശ്രദ്ധക്കുറവും അനുഭവപ്പെടുന്നു",
            "മൊബൈൽ ഫോൺ റീൽസ് മാറ്റിവെക്കാൻ കഴിയാതെ സമയം പാഴാകുന്നു",
            "മോക്ക് ടെസ്റ്റുകളിൽ മാർക്ക് കുറയുമ്പോൾ കടുത്ത വിഷാദവും ഭയവും തോന്നുന്നു",
            "വീട്ടുകാരുടെ പ്രതീക്ഷയും അച്ഛന്റെ കഷ്ടപ്പാടും ഓർത്ത് കരച്ചിൽ വരുന്നു",
          ].map((text, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedIssue(idx);
                trackClientClick(`diagnosis_q1_${idx}_ml`, text, "Malayalam Diagnosis Widget");
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
              💡 <strong>പരിശോധനാ ഫലം:</strong> ഇത് നിങ്ങളുടെ കഴിവുകേടല്ല. ഭയം കാരണം നിങ്ങളുടെ മസ്തിഷ്കത്തിലെ അമിഗ്ഡല (Amygdala) പ്രവർത്തിപ്പിക്കുന്ന &apos;Flight Mode&apos; ആണ്. MINDLOCK പ്രോട്ടോക്കോൾ വെറും 3 ദിവസത്തിനുള്ളിൽ ഈ ചക്രം തകർക്കുന്നു.
            </p>
            <button
              onClick={() => {
                trackClientClick("diagnosis_cta_ml", "Unlock Fix via Malayalam Diagnosis", "Malayalam Diagnosis");
                handleOpenCheckout("diagnosis_cta_ml");
              }}
              className="mt-3 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-crimson hover:bg-rose-600 text-white font-bold text-xs sm:text-sm transition-transform active:scale-95"
            >
              <span>ഈ ന്യൂറൽ ബ്ലോക്ക് അൺലോക്ക് ചെയ്യൂ (₹199)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      {/* SECTION F: WHAT IS IN MINDLOCK? (THE VAULT CONTENTS) */}
      <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-mono uppercase text-crimson font-bold tracking-widest">
            നിങ്ങൾക്ക് എന്താണ് ലഭിക്കുന്നത്?
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-2">
            MINDLOCK ഘടന: 75-പേജ് ബ്ലൂപ്രിന്റ് + 8 ഓഡിയോ ഡ്രില്ലുകൾ
          </h2>
          <p className="text-xs sm:text-sm text-slateText-secondary mt-2 max-w-2xl mx-auto">
            വെറുമൊരു പുസ്തകമല്ല — പരീക്ഷാ ഹാളിലെ മാനസിക സമ്മർദ്ദത്തെ മറികടക്കാൻ രൂപകൽപ്പന ചെയ്ത സമ്പൂർണ്ണ സൈക്കോളജിക്കൽ സിസ്റ്റം.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#121212] border border-[#222222] relative group hover:border-crimson/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-crimson/10 flex items-center justify-center text-crimson mb-4">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              75-പേജ് കോഗ്നിറ്റീവ് ബ്ലൂപ്രിന്റ്
            </h3>
            <p className="text-xs sm:text-sm text-slateText-secondary leading-relaxed">
              ഡോപാമിൻ ഡിറ്റോക്സ്, സിലബസ് പാനിക് മാനേജ്‌മെന്റ്, ഫോക്കസ് നിലനിർത്താനുള്ള വ്യക്തമായ തന്ത്രങ്ങൾ. നേരായ പ്രായോഗിക നിർദ്ദേശങ്ങൾ.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121212] border border-[#222222] relative group hover:border-crimson/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400 mb-4">
              <Headphones className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              8 ന്യൂറോ ഓഡിയോ ഡ്രില്ലുകൾ (Binaural)
            </h3>
            <p className="text-xs sm:text-sm text-slateText-secondary leading-relaxed">
              പഠിക്കാൻ ഇരിക്കുന്നതിന് 5 മിനിറ്റ് മുമ്പ് കേൾക്കേണ്ട ഓഡിയോ ഗൈഡുകൾ. മനസ്സിന്റെ ചഞ്ചലത മാറ്റി ആഴത്തിലുള്ള ഏകാഗ്രത നൽകുന്നു.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121212] border border-[#222222] relative group hover:border-crimson/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              പരീക്ഷാ ദിന പാനിക് പ്രോട്ടോക്കോൾ
            </h3>
            <p className="text-xs sm:text-sm text-slateText-secondary leading-relaxed">
              പരീക്ഷാ ഹാളിൽ കഠിനമായ ചോദ്യം കാണുമ്പോൾ വിറയ്ക്കാതെ, മനസ്സ് ബ്ലാങ്ക് ആകാതെ 30 സെക്കൻഡിൽ സമനില വീണ്ടെടുക്കുന്ന ടെക്നിക്.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION H: REAL PROOF FROM KERALA ASPIRANTS */}
      <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto border-t border-[#1F1F1F]">
        <div className="text-center mb-10">
          <span className="text-xs font-mono uppercase text-emeraldRelief font-bold tracking-wider">
            യഥാർത്ഥ വിദ്യാർത്ഥി അനുഭവങ്ങൾ
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            കേരളത്തിലെ ഉദ്യോഗാർത്ഥികളുടെ പ്രതികരണങ്ങൾ
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-[#131313] border border-white/5">
            <div className="flex items-center justify-between mb-3 text-xs font-mono">
              <span className="text-white font-bold">അഖിൽ എം. — തിരുവനന്തപുരം</span>
              <span className="text-emerald-400">Kerala PSC Secretariat Assistant</span>
            </div>
            <p className="text-xs sm:text-sm text-slateText-secondary leading-relaxed">
              &quot;തിരുവനന്തപുരത്തെ ലൈബ്രറിയിൽ ദിവസം മുഴുവൻ ഇരുന്നാലും തലയിൽ ഒന്നും കയറിയിരുന്നില്ല. MINDLOCK 3-Phase Rewire ഉപയോഗിച്ചതിന് ശേഷം എന്റെ ഫോൺ ഉപയോഗം 7 മണിക്കൂറിൽ നിന്ന് 1.5 മണിക്കൂറായി കുറഞ്ഞു. ഇപ്പോൾ ആത്മവിശ്വാസമുണ്ട്.&quot;
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#131313] border border-white/5">
            <div className="flex items-center justify-between mb-3 text-xs font-mono">
              <span className="text-white font-bold">അഞ്ജലി പി. — കൊച്ചി</span>
              <span className="text-emerald-400">NEET UG Repeater</span>
            </div>
            <p className="text-xs sm:text-sm text-slateText-secondary leading-relaxed">
              &quot;കഴിഞ്ഞ വർഷം NEET പരീക്ഷയിൽ ടെൻഷൻ കാരണം അറിയാവുന്ന ഫിസിക്സ് ചോദ്യങ്ങൾ തെറ്റിപ്പോയി. ഈ ഓഡിയോ ഡ്രില്ലുകൾ കേട്ടപ്പോൾ ഭയം മാറി. ഇപ്പോൾ മോക്ക് ടെസ്റ്റിൽ 620+ മാർക്ക് സ്കോർ ചെയ്യാൻ കഴിയുന്നുണ്ട്.&quot;
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#131313] border border-white/5">
            <div className="flex items-center justify-between mb-3 text-xs font-mono">
              <span className="text-white font-bold">നിതിൻ ബാബു — കോഴിക്കോട്</span>
              <span className="text-emerald-400">Kerala PSC CPO Aspirant</span>
            </div>
            <p className="text-xs sm:text-sm text-slateText-secondary leading-relaxed">
              &quot;വീട്ടിൽ അച്ഛന്റെ കഷ്ടപ്പാട് ഓർത്ത് പഠിക്കാൻ ഇരിക്കുമ്പോൾ സങ്കടം വരുമായിരുന്നു. ₹199-ന് ഇത്രയും മികച്ച സൈക്കോളജിക്കൽ സിസ്റ്റം കിട്ടുമെന്ന് കരുതിയില്ല. നിർബന്ധമായും ഓരോ ഉദ്യോഗാർത്ഥിയും വായിക്കണം.&quot;
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#131313] border border-white/5">
            <div className="flex items-center justify-between mb-3 text-xs font-mono">
              <span className="text-white font-bold">രാഹുൽ കൃഷ്ണൻ — തൃശ്ശൂർ</span>
              <span className="text-emerald-400">KEAM & JEE Main Aspirant</span>
            </div>
            <p className="text-xs sm:text-sm text-slateText-secondary leading-relaxed">
              &quot;രാത്രി 3 മണി വരെ ഉറങ്ങാതെ മൊബൈൽ നോക്കി വിഷമിച്ചിരുന്ന ഞാൻ വെറും 7 ദിവസം കൊണ്ട് പൂർണ്ണമായും മാറി. ഒരു നല്ല ഉച്ചയൂണിന്റെ വിലയേ ഉള്ളൂ, ഇത് തീർച്ചയായും വലിയൊരു മാറ്റമാണ്.&quot;
            </p>
          </div>
        </div>
      </section>

      {/* SECTION J: FAQS IN MALAYALAM */}
      <section className="py-14 px-4 sm:px-6 max-w-3xl mx-auto border-t border-[#1C1C1C]">
        <div className="text-center mb-8">
          <span className="text-xs font-mono uppercase text-crimson font-bold tracking-wider">
            പതിവായി ചോദിക്കുന്ന ചോദ്യങ്ങൾ
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
            നിങ്ങൾക്ക് എന്തെങ്കിലും സംശയങ്ങളുണ്ടോ?
          </h2>
        </div>

        <div className="space-y-3">
          {[
            {
              q: "പണം അടച്ച ഉടൻ മെറ്റീരിയൽ എങ്ങനെ ലഭിക്കും?",
              a: "Razorpay വഴി ₹199 അടച്ച നിമിഷത്തിൽ തന്നെ സ്ക്രീനിൽ Download Vault തുറക്കപ്പെടും. കൂടാതെ നിങ്ങളുടെ വാട്ട്‌സ്ആപ്പ് നമ്പറിലേക്ക് ഡൗൺലോഡ് ലിങ്ക് ഉടൻ അയച്ചുതരും.",
            },
            {
              q: "ഇത് ഏതൊക്കെ പരീക്ഷകൾക്ക് ഉപയോഗപ്രദമാണ്?",
              a: "Kerala PSC (LDC, CPO, KAS), KEAM, NEET, JEE, ബാങ്കിംഗ്, UPSC തുടങ്ങി എല്ലാ മത്സരപരീക്ഷകൾക്കും ഇത് ഫലപ്രദമാണ്. കാരണം ഇത് പഠനവിഷയമല്ല, സമ്മർദ്ദത്തെ കീഴടക്കാനുള്ള മാനസിക ശാസ്ത്രമാണ്.",
            },
            {
              q: "ഓഡിയോ ഡ്രില്ലുകൾ എങ്ങനെയാണ് ഉപയോഗിക്കേണ്ടത്?",
              a: "പഠിക്കാൻ ഇരിക്കുന്നതിന് 5 മിനിറ്റ് മുമ്പ് ഹെഡ്‌ഫോൺ ധരിച്ച് ശാന്തമായി കേൾക്കുക. ഇത് തലച്ചോറിലെ ആൽഫ തരംഗങ്ങളെ ഉത്തേജിപ്പിച്ച് അചഞ്ചലമായ ശ്രദ്ധ നൽകുന്നു.",
            },
            {
              q: "എനിക്ക് ഫലം ലഭിച്ചില്ലെങ്കിൽ എന്ത് ചെയ്യും?",
              a: "7 ദിവസം ഇത് പരീക്ഷിച്ച് യാതൊരു മാറ്റവും കാണുന്നില്ലെങ്കിൽ ഞങ്ങൾക്ക് ഒരു ഇമെയിൽ അയക്കുക — ഒരൊറ്റ ചോദ്യം പോലും ചോദിക്കാതെ നിങ്ങളുടെ ₹199 പൂർണ്ണമായി തിരികെ നൽകും.",
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

      {/* SECTION K: FINAL URGENCY CALL TO ACTION (MALAYALAM) */}
      <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto text-center border-t border-[#1C1C1C]">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-rose-950/40 via-[#141414] to-[#0D0D0D] border border-crimson/30 relative overflow-hidden">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
            മറ്റൊരു വർഷം നഷ്ടപ്പെടുമെന്ന ഭയം വേണ്ട... <br />
            <span className="text-crimson">ഇന്ന് തന്നെ നിങ്ങളുടെ മനസ്സിനെ ലോക്ക് ചെയ്യൂ.</span>
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-slateText-secondary max-w-xl mx-auto">
            മാതാപിതാക്കളുടെ കണ്ണുകളിൽ അഭിമാനം കാണാനുള്ള നിങ്ങളുടെ സുവർണ്ണാവസരം. ₹199 ഒരു ചെറിയ തുകയാണ്, എന്നാൽ അത് നിങ്ങളുടെ ഭാവിയെ മാറ്റിയെഴുതും.
          </p>

          <div className="mt-6 flex flex-col items-center gap-3">
            <button
              id="final_cta_btn_ml"
              data-track-btn="final_cta_btn_ml"
              onClick={() => {
                trackClientClick(
                  "final_cta_btn_ml",
                  "Final Unlock CTA (Malayalam)",
                  "Footer CTA"
                );
                handleOpenCheckout("final_cta_btn_ml");
              }}
              className="px-9 py-4 rounded-2xl bg-gradient-to-r from-crimson via-rose-600 to-rose-700 hover:from-rose-600 hover:to-rose-800 text-white font-extrabold text-base sm:text-lg tracking-wide shadow-xl shadow-crimson/30 transition-all transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 border border-rose-500/40"
            >
              <Flame className="w-5 h-5 text-white" />
              <span>വെറും ₹199 നൽകി തൽക്ഷണം പ്രവേശനം നേടൂ</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <div className="text-[11px] font-mono text-slateText-muted flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% മണി ബാക്ക് ഗ്യാരണ്ടി • തൽക്ഷണ വാട്ട്‌സ്ആപ്പ് ഡെലിവറി</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Sticky Mobile CTA */}
      <StickyMobileCTA onUnlockClick={() => handleOpenCheckout("sticky_mobile_ml")} />

      {/* Universal Checkout Modal configured for Malayalam */}
      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        sourceButton={modalSource}
        lang="ml"
      />
    </div>
  );
}
