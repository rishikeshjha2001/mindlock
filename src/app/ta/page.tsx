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

export default function TamilLandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState("hero_ta");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Self-diagnosis interactive state
  const [selectedIssue, setSelectedIssue] = useState<number | null>(null);

  const handleOpenCheckout = (sourceBtn: string) => {
    setModalSource(sourceBtn);
    setIsModalOpen(true);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
    trackClientClick(`faq_toggle_ta_${idx}`, `Toggle Tamil FAQ ${idx}`, "FAQ Section");
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-slateText-primary selection:bg-crimson selection:text-white pb-20 md:pb-0 overflow-x-hidden font-tamil">
      {/* Navigation */}
      <Navbar onUnlockClick={handleOpenCheckout} />

      {/* SECTION B: HERO SECTION (TAMIL PATTERN INTERRUPT) */}
      <section
        id="hero"
        aria-label="Hero Section"
        className="relative pt-10 sm:pt-16 pb-16 px-4 sm:px-6 max-w-5xl mx-auto text-center"
      >
        {/* Pre-headline Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-crimson/10 border border-crimson/25 text-crimson text-xs sm:text-sm font-semibold mb-6">
          <Clock className="w-3.5 h-3.5" />
          <span>&apos;எல்லாம் நல்லா போகுது&apos;னு வீட்ல பொய் சொல்லி நொந்துபோன மாணவர்களுக்காக</span>
        </div>

        {/* Pattern-Interrupt Headline */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[2.75rem] font-extrabold tracking-tight text-white leading-[1.4] sm:leading-[1.3] max-w-4xl mx-auto">
          &ldquo;22-23 வயசுல ஒரு Exam Application ஃபீஸ் கட்டுறதுக்கு கூட{" "}
          <span className="text-crimson bg-crimson/10 px-2 py-0.5 rounded border border-crimson/20">
            அப்பாகிட்ட ₹1,000 கேட்கும்போது...
          </span>{" "}
          அந்த பணத்தை விட, <span className="text-crimson">கண்ணாடியில நம்ம முகத்தையே பார்க்க வெட்கமா இருக்கும்.</span>&rdquo;
        </h1>

        {/* Subheadline */}
        <p className="mt-6 text-sm sm:text-base md:text-lg text-slateText-secondary max-w-3xl mx-auto leading-relaxed">
          நீங்க சோம்பேறியும் இல்லை, திறமையற்றவரும் இல்லை. உங்க மூளை{" "}
          <strong className="text-white">Shame Paralysis மற்றும் Dopamine Burnout</strong>-ல் சிக்கியிருக்கிறது.
          போலி மோட்டிவேஷன் அல்லது கடுமையான டைம்-டேபிள் எதுவும் இல்லாமல்... வெறும் 7 நாட்களில் உங்கள் கவனத்தை மீண்டும் மீட்டெடுங்கள்.
        </p>

        {/* Target Exams Pill */}
        <div className="mt-5 flex flex-wrap justify-center items-center gap-2 text-xs text-slate-300 font-mono">
          <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">TNPSC Group 4 / 2 / 1 / VAO</span>
          <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">TNUSRB SI & Police</span>
          <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">NEET UG</span>
          <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">JEE Main</span>
          <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">Bank Exam (SBI, IBPS)</span>
          <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">UPSC Civils</span>
        </div>

        {/* Hero Urgency Box */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3.5 max-w-xl mx-auto">
          <UrgencyTimer />

          {/* Primary High-Urgency Action Button */}
          <button
            id="hero_buy_btn_ta"
            data-track-btn="hero_buy_btn_ta"
            onClick={() => {
              trackClientClick(
                "hero_buy_btn_ta",
                "Claim Limited ₹199 Offer — Lock Your Rank (Tamil)",
                "Hero"
              );
              handleOpenCheckout("hero_buy_btn_ta");
            }}
            className="w-full sm:w-auto px-8 sm:px-11 py-4 sm:py-4.5 rounded-2xl bg-gradient-to-r from-crimson via-rose-600 to-rose-700 hover:from-rose-600 hover:to-rose-800 text-white font-extrabold text-base sm:text-lg tracking-wide shadow-[0_0_35px_rgba(225,29,72,0.55)] hover:shadow-[0_0_45px_rgba(225,29,72,0.75)] transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2.5 sm:gap-3 group border border-rose-500/40"
          >
            <Flame className="w-5 h-5 text-white animate-pulse" />
            <span>வரையறுக்கப்பட்ட ₹199 ஆஃபர் பெறுங்கள் — ரேங்க் லாக் செய்யுங்கள்</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </button>

          {/* Pricing Anchor & Scarcity Proof */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slateText-secondary font-mono">
            <span className="flex items-center gap-1.5">
              <span className="line-through text-slate-500 font-bold">₹799</span>
              <span className="text-white font-black text-sm">₹199 மட்டுமே</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold text-[10px] border border-emerald-800/40">75% OFF</span>
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-crimson font-semibold">₹199 விலையில் வெறும் 8 காப்பிகள் மட்டுமே உள்ளன</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">உடனடி UPI & வால்ட் அணுகல்</span>
          </div>

          {/* Loss Aversion Psychological Callout */}
          <div className="mt-2 p-3 sm:p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-center max-w-lg text-[11px] sm:text-xs text-slateText-muted leading-relaxed">
            <span className="text-white font-semibold">⚠️ கசப்பான உண்மை:</span> இன்னொரு வருடம் வேஸ்ட் ஆனால் சென்னை அண்ணா நகர் அல்லது ஹாஸ்டல் கட்டணத்திற்கே <strong className="text-rose-400">₹1,50,000+</strong> செலவாகும். அந்த அவமானம் மற்றும் விரக்தியை விட... ஒரு பிரியாணி விலையை விட குறைவான கட்டணத்தில் உங்கள் கவனத்தை இன்றே ரீசெட் செய்யுங்கள்.
          </div>
        </div>
      </section>

      {/* SECTION C: THE 2 AM MIRROR (TAMIL RAW PSYCHOLOGY) */}
      <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto border-t border-[#1C1C1C]">
        <div className="text-center mb-10">
          <span className="text-crimson text-xs font-mono uppercase tracking-widest font-semibold">
            நள்ளிரவு 2 மணி தனிமை
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
            ரூமில் லைட் அணைஞ்சதும்... ஆரம்பமாகும் நிஜமான நரகம்
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-6 rounded-2xl bg-[#121212] border border-[#222222] hover:border-crimson/30 transition-colors">
            <div className="text-crimson font-bold text-sm mb-2 font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              நைட் ரீல்ஸ் ஸ்க்ரோலிங் & குற்ற உணர்ச்சி
            </div>
            <p className="text-xs sm:text-sm text-slateText-secondary leading-relaxed">
              &quot;நாளைக்கு காலையில 5 மணிக்கே எழுந்து 12 மணி நேரம் படிக்க போறேன்&quot;னு சபதம் போடுவீங்க. ஆனா மொபைலை எடுத்து ரீல்ஸ் பார்க்க ஆரம்பிச்சு மணி 2:30 AM ஆயிடும். காலையில எழும்போது கடுமையான குற்ற உணர்ச்சி (Guilt).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121212] border border-[#222222] hover:border-crimson/30 transition-colors">
            <div className="text-crimson font-bold text-sm mb-2 font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              சொந்தக்காரர்கள் போன் கால் பயம்
            </div>
            <p className="text-xs sm:text-sm text-slateText-secondary leading-relaxed">
              விசேஷங்களுக்கு போக முடியாது, சொந்தக்காரங்க போன் எடுத்தா பயம். &quot;தம்பி.. இன்னும் படிச்சிட்டே இருக்கியா? வேலை எப்போ கிடைக்கும்?&quot;னு கேக்குற கேள்விக்கு பதில் சொல்ல முடியாம கதவை பூட்டி உட்காரும் வேதனை.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121212] border border-[#222222] hover:border-crimson/30 transition-colors">
            <div className="text-crimson font-bold text-sm mb-2 font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              புத்தகம் முன்னாடி இருக்கும் ஆனா படிக்க முடியாது
            </div>
            <p className="text-xs sm:text-sm text-slateText-secondary leading-relaxed">
              ஸ்டடி டேபிளில் 8 மணி நேரம் உட்காருவீங்க. ஆனா நிஜமா படிச்சது வெறும் 40 நிமிஷம் தான். மீதி நேரம் முழுக்க மன உளைச்சல், பயம், &quot;பாஸ் ஆகலனா என்ன பண்றது?&quot;ங்கிற எண்ணத்திலேயே முடிஞ்சு போயிடும்.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121212] border border-[#222222] hover:border-crimson/30 transition-colors">
            <div className="text-crimson font-bold text-sm mb-2 font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Mock Test பதற்றம் & பிளாங்க் ஆவது
            </div>
            <p className="text-xs sm:text-sm text-slateText-secondary leading-relaxed">
              எல்லாம் படிச்சிட்டோம்னு நினைப்பீங்க. ஆனா Mock Test எழுத உட்கார்ந்ததும் இதயம் வேகமா துடிக்கும், கை நடுங்கும். நல்லா தெரிஞ்ச ஈஸியான கேள்விக்கு கூட தப்பான விடை போட்டு நெகட்டிவ் மார்க்ல வந்து நிப்பீங்க.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION E: INTERACTIVE SELF-DIAGNOSIS (TAMIL) */}
      <section className="py-14 px-4 sm:px-6 max-w-3xl mx-auto bg-[#111111] rounded-3xl border border-[#242424] my-10">
        <div className="text-center mb-6">
          <span className="text-xs font-mono uppercase text-crimson font-bold tracking-wider">
            20-விநாடி ஆன்லைன் பரிசோதனை
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
            உங்க மூளையில பிரச்சனை எங்க இருக்குனு இப்பவே தெரிஞ்சுக்கோங்க
          </h2>
          <p className="text-xs text-slateText-muted mt-1">
            உங்களுடைய தற்போதைய முக்கிய பிரச்சனையை தேர்ந்தெடுங்கள்:
          </p>
        </div>

        <div className="space-y-3 mb-6">
          {[
            "படிக்க உட்கார்ந்த உடனே தூக்கம் மற்றும் கவனம் சிதறல் ஏற்படுகிறது",
            "மொபைல் போன் ரீல்ஸை நிறுத்த முடியாமல் பல மணி நேரம் வீணாகிறது",
            "Mock டெஸ்ட்களில் மதிப்பெண் வராமல் பயமும் மன அழுத்தமும் அதிகமாகிறது",
            "குடும்பத்தின் எதிர்பார்ப்பும், அப்பாவின் கஷ்டமும் நினைத்து அழுகை வருகிறது",
          ].map((text, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedIssue(idx);
                trackClientClick(`diagnosis_q1_${idx}_ta`, text, "Tamil Diagnosis Widget");
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
              💡 <strong>பரிசோதனை முடிவு:</strong> இது உங்கள் திறமையின்மை அல்ல. பயத்தினால் உங்கள் மூளையின் Amygdala செயல்படுத்தும் &apos;Flight Mode&apos;. MINDLOCK ப்ரோட்டோகால் வெறும் 3 நாட்களில் இந்த நரம்பியல் சுழற்சியை உடைத்துவிடும்.
            </p>
            <button
              onClick={() => {
                trackClientClick("diagnosis_cta_ta", "Unlock Fix via Tamil Diagnosis", "Tamil Diagnosis");
                handleOpenCheckout("diagnosis_cta_ta");
              }}
              className="mt-3 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-crimson hover:bg-rose-600 text-white font-bold text-xs sm:text-sm transition-transform active:scale-95"
            >
              <span>இந்த பிளாக்கை அன்லாக் செய்யுங்கள் (₹199)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      {/* SECTION F: WHAT IS IN MINDLOCK? (THE VAULT CONTENTS) */}
      <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-mono uppercase text-crimson font-bold tracking-widest">
            உங்களுக்கு என்ன கிடைக்கும்?
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-2">
            MINDLOCK ஆர்கிடெக்சர்: 75-பக்க புளூபிரிண்ட் + 8 ஆடியோ டிரில்ஸ்
          </h2>
          <p className="text-xs sm:text-sm text-slateText-secondary mt-2 max-w-2xl mx-auto">
            வெறும் புத்தகம் அல்ல — தேர்வுக்கூட பதற்றத்தை வெல்வதற்காக உருவாக்கப்பட்ட முழுமையான உளவியல் ஆப்பரேட்டிங் சிஸ்டம்.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#121212] border border-[#222222] relative group hover:border-crimson/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-crimson/10 flex items-center justify-center text-crimson mb-4">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              75-பக்க காக்னிட்டிவ் புளூபிரிண்ட்
            </h3>
            <p className="text-xs sm:text-sm text-slateText-secondary leading-relaxed">
              டோபமைன் டீடாக்ஸ், சிலபஸ் பதற்ற மேலாண்மை மற்றும் கவனத்தை லாக் செய்யும் நடைமுறை யுக்திகள். நேரடியான செயல் திட்டம்.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121212] border border-[#222222] relative group hover:border-crimson/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400 mb-4">
              <Headphones className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              8 நரம்பியல் ஆடியோ டிரில்ஸ் (Binaural)
            </h3>
            <p className="text-xs sm:text-sm text-slateText-secondary leading-relaxed">
              படிக்க உட்காரும் 5 நிமிடங்களுக்கு முன் கேட்க வேண்டிய ஆடியோ வழிகாட்டி. மனதின் குழப்பத்தை அடக்கி ஆழ்ந்த கவனத்திற்கு அழைத்துச் செல்லும்.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121212] border border-[#222222] relative group hover:border-crimson/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              தேர்வு நாள் பதற்ற ப்ரோட்டோகால்
            </h3>
            <p className="text-xs sm:text-sm text-slateText-secondary leading-relaxed">
              தேர்வு அறையில் கடினமான கேள்வியைப் பார்த்தவுடன் கை நடுக்கம் மற்றும் மூளை பிளாங்க் ஆவதை வெறும் 30 விநாடிகளில் கட்டுப்படுத்தும் உத்தி.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION H: REAL PROOF FROM TAMIL ASPIRANTS */}
      <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto border-t border-[#1F1F1F]">
        <div className="text-center mb-10">
          <span className="text-xs font-mono uppercase text-emeraldRelief font-bold tracking-wider">
            மாணவர்களின் உண்மை அனுபவங்கள்
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            தமிழ்நாடு மாணவர்களின் நேரடி கருத்துகள்
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-[#131313] border border-white/5">
            <div className="flex items-center justify-between mb-3 text-xs font-mono">
              <span className="text-white font-bold">கார்த்திக் எஸ். — சென்னை (அண்ணா நகர்)</span>
              <span className="text-emerald-400">TNPSC Group 2 Aspirant</span>
            </div>
            <p className="text-xs sm:text-sm text-slateText-secondary leading-relaxed">
              &quot;அண்ணா நகர் லைப்ரரில 10 மணி நேரம் உட்கார்ந்தாலும் மனசுல பயம் தான் இருந்தது. MINDLOCK-ல் உள்ள 3-Phase Rewire முறை பயன்படுத்திய பிறகு என் போன் டைம் 8 மணி நேரத்திலிருந்து 2 மணி நேரமா குறைஞ்சது. இப்போ நம்பிக்கையோடு படிக்கிறேன்.&quot;
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#131313] border border-white/5">
            <div className="flex items-center justify-between mb-3 text-xs font-mono">
              <span className="text-white font-bold">பிரியா ஆர். — மதுரை</span>
              <span className="text-emerald-400">NEET UG Repeater</span>
            </div>
            <p className="text-xs sm:text-sm text-slateText-secondary leading-relaxed">
              &quot;போன வருஷம் NEET-ல பயத்துலேயே கெமிஸ்ட்ரில நெகட்டிவ் மார்க்ஸ் வந்தது. இந்த ஆடியோ டிரில்ஸ் கேட்க ஆரம்பிச்சதும் பதற்றம் சுத்தமா போயிடுச்சு. இப்போ என் மார்க் டெஸ்ட் ஸ்கோர் 590+ இருக்கு.&quot;
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#131313] border border-white/5">
            <div className="flex items-center justify-between mb-3 text-xs font-mono">
              <span className="text-white font-bold">விஜய் கே. — கோயம்புத்தூர்</span>
              <span className="text-emerald-400">TNUSRB SI Aspirant</span>
            </div>
            <p className="text-xs sm:text-sm text-slateText-secondary leading-relaxed">
              &quot;வீட்ல அப்பா கஷ்டப்படுறத பார்த்து தினமும் மன உளைச்சல். ₹199-க்கு இவ்வளவு ஆழமான மனவியல் வழிகாட்டி கிடைக்கும்னு நான் எதிர்பார்க்கல. ஒரு பிரியாணி ரேட் தான், கண்டிப்பா எல்லாரும் படிக்கணும்.&quot;
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#131313] border border-white/5">
            <div className="flex items-center justify-between mb-3 text-xs font-mono">
              <span className="text-white font-bold">அருண் பாண்டியன் — திருச்சிராப்பள்ளி</span>
              <span className="text-emerald-400">TNPSC Group 4 Aspirant</span>
            </div>
            <p className="text-xs sm:text-sm text-slateText-secondary leading-relaxed">
              &quot;இரவு 3 மணி வரை தூங்காம மொபைல் பார்த்து வருத்தப்படுறது தான் என் பழக்கம். 7 நாள்ல என் வாழ்க்கை மாறிடுச்சு. இப்போ காலையில சுறுசுறுப்பா படிக்க முடிகிறது.&quot;
            </p>
          </div>
        </div>
      </section>

      {/* SECTION J: FAQS IN TAMIL */}
      <section className="py-14 px-4 sm:px-6 max-w-3xl mx-auto border-t border-[#1C1C1C]">
        <div className="text-center mb-8">
          <span className="text-xs font-mono uppercase text-crimson font-bold tracking-wider">
            அடிக்கடி கேட்கப்படும் கேள்விகள்
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
            உங்களுக்கு ஏதேனும் சந்தேகங்கள் உள்ளதா?
          </h2>
        </div>

        <div className="space-y-3">
          {[
            {
              q: "பணம் செலுத்திய உடன் மெட்டீரியல் எப்படி கிடைக்கும்?",
              a: "Razorpay மூலமாக ₹199 செலுத்திய உடனேயே உங்கள் திரையில் Download Vault திறக்கும். மேலும் உங்கள் வாட்ஸ்அப் எண்ணிற்கும் நேரடி டவுன்லோடு இணைப்பு அனுப்பப்படும்.",
            },
            {
              q: "இது எந்தெந்த தேர்வுகளுக்கு பொருந்தும்?",
              a: "TNPSC (Group 4, 2, 1, VAO), TNUSRB SI/Police, NEET, JEE, வங்கி தேர்வுகள் மற்றும் அனைத்து போட்டித் தேர்வுகளுக்கும் இது பொருந்தும். இது பாடப் புத்தகம் அல்ல, உங்கள் மூளையின் பதற்றத்தை கட்டுப்படுத்தும் உத்தி.",
            },
            {
              q: "ஆடியோ டிரில்ஸை எப்படி பயன்படுத்த வேண்டும்?",
              a: "படிக்க உட்காரும் 5 நிமிடங்களுக்கு முன் இயர்போன் அணிந்து இதை அமைதியாக கேட்க வேண்டும். இது உங்கள் மூளையின் ஆல்பா அலைகளை இயக்கி ஆழ்ந்த கவனத்தை தரும்.",
            },
            {
              q: "எனக்கு இது பலன் தரவில்லை என்றால் என்ன செய்வது?",
              a: "7 நாட்கள் இதை செயல்படுத்தி உங்களுக்கு எந்த மாற்றமும் தெரியவில்லை என்றால் எங்களுக்கு ஒரு மெயில் அனுப்புங்கள் — எந்த கேள்வியும் கேட்காமல் உங்கள் ₹199 தொகை 100% திருப்பித் தரப்படும்.",
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

      {/* SECTION K: FINAL URGENCY CALL TO ACTION (TAMIL) */}
      <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto text-center border-t border-[#1C1C1C]">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-rose-950/40 via-[#141414] to-[#0D0D0D] border border-crimson/30 relative overflow-hidden">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
            இன்னொரு வருடம் வேஸ்ட் ஆகும் பயம் வேண்டாம்... <br />
            <span className="text-crimson">இன்றே உங்கள் கவனத்தை லாக் செய்யுங்கள்.</span>
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-slateText-secondary max-w-xl mx-auto">
            உங்கள் பெற்றோரின் கண்களில் பெருமையைக் காண உங்களுக்கு கிடைத்திருக்கும் வாய்ப்பு. ₹199 என்பது மிகச் சிறிய முதலீடு, ஆனால் அது உங்கள் வாழ்க்கையை மாற்றும்.
          </p>

          <div className="mt-6 flex flex-col items-center gap-3">
            <button
              id="final_cta_btn_ta"
              data-track-btn="final_cta_btn_ta"
              onClick={() => {
                trackClientClick(
                  "final_cta_btn_ta",
                  "Final Unlock CTA (Tamil)",
                  "Footer CTA"
                );
                handleOpenCheckout("final_cta_btn_ta");
              }}
              className="px-9 py-4 rounded-2xl bg-gradient-to-r from-crimson via-rose-600 to-rose-700 hover:from-rose-600 hover:to-rose-800 text-white font-extrabold text-base sm:text-lg tracking-wide shadow-xl shadow-crimson/30 transition-all transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 border border-rose-500/40"
            >
              <Flame className="w-5 h-5 text-white" />
              <span>வெறும் ₹199 செலுத்தி உடனடியாக அணுகல் பெறுங்கள்</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <div className="text-[11px] font-mono text-slateText-muted flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% பணம் திரும்பப் பெறும் உத்தரவாதம் • உடனடி வாட்ஸ்அப் டெலிவரி</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Sticky Mobile CTA */}
      <StickyMobileCTA onUnlockClick={() => handleOpenCheckout("sticky_mobile_ta")} />

      {/* Universal Checkout Modal configured for Tamil */}
      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        sourceButton={modalSource}
        lang="ta"
      />
    </div>
  );
}
