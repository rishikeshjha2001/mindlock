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
  Crosshair,
  Sparkles,
  Check,
} from "lucide-react";

export default function TeluguLandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState("hero_te");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Self-diagnosis interactive state
  const [selectedIssue, setSelectedIssue] = useState<number | null>(null);
  const [selectedConsequence, setSelectedConsequence] = useState<number | null>(null);

  const handleOpenCheckout = (sourceBtn: string) => {
    setModalSource(sourceBtn);
    setIsModalOpen(true);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
    trackClientClick(`faq_toggle_te_${idx}`, `Toggle Telugu FAQ ${idx}`, "FAQ Section");
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-slateText-primary selection:bg-crimson selection:text-white pb-20 md:pb-0 overflow-x-hidden font-telugu">
      {/* Navigation */}
      <Navbar onUnlockClick={handleOpenCheckout} />

      {/* SECTION B: HERO SECTION (TELUGU PATTERN INTERRUPT) */}
      <section
        id="hero"
        aria-label="Hero Section"
        className="relative pt-10 sm:pt-16 pb-16 px-4 sm:px-6 max-w-5xl mx-auto text-center"
      >
        {/* Pre-headline Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-crimson/10 border border-crimson/25 text-crimson text-xs sm:text-sm font-semibold mb-6">
          <Clock className="w-3.5 h-3.5" />
          <span>&apos;అంతా బాగానే ఉంది&apos; అని ఇంట్లో అబద్ధం చెప్పి అలసిపోయిన aspirants కోసం మాత్రమే</span>
        </div>

        {/* Pattern-Interrupt Headline */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[2.75rem] font-extrabold tracking-tight text-white leading-[1.4] sm:leading-[1.3] max-w-4xl mx-auto">
          &ldquo;22-23 ఏళ్ల వయసులో ఒక Exam Form ఫీజు కట్టడానికి కూడా{" "}
          <span className="text-crimson bg-crimson/10 px-2 py-0.5 rounded border border-crimson/20">
            నాన్నని ₹1,000 అడగాల్సి
          </span>{" "}
          వచ్చినప్పుడు... ఆ డబ్బు కంటే ఎక్కువగా, <span className="text-crimson">మన కళ్లలోకి మనం చూసుకోవడానికే సిగ్గేస్తుంది.</span>&rdquo;
        </h1>

        {/* Subheadline */}
        <p className="mt-6 text-sm sm:text-base md:text-lg text-slateText-secondary max-w-3xl mx-auto leading-relaxed">
          మీరు సోమరిపోతు కాదు, తెలివితక్కువ వారు కూడా కాదు. మీ మైండ్{" "}
          <strong className="text-white">Shame Paralysis మరియు డోపమైన్ బర్న్‌అవుట్</strong> లో చిక్కుకుంది.
          ఎలాంటి నకిలీ మోటివేషన్ లేదా అసహజమైన టైమ్‌టేబుల్స్ లేకుండా... కేవలం 7 రోజుల్లో మీ మెదడు ప్రెజర్‌ను ఎదుర్కొనేలా రీవైర్ చేసుకోండి.
        </p>

        {/* Target Exams Pill */}
        <div className="mt-5 flex flex-wrap justify-center items-center gap-2 text-xs text-slate-300 font-mono">
          <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">AP / TS EAPCET</span>
          <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">TSPSC / APPSC Group 1, 2, 4</span>
          <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">NEET UG</span>
          <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">JEE Main</span>
          <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">AP/TS SI & Constable</span>
          <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">UPSC & Banking</span>
        </div>

        {/* Hero Urgency Box */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3.5 max-w-xl mx-auto">
          <UrgencyTimer />

          {/* Primary High-Urgency Action Button */}
          <button
            id="hero_buy_btn_te"
            data-track-btn="hero_buy_btn_te"
            onClick={() => {
              trackClientClick(
                "hero_buy_btn_te",
                "Claim Limited ₹199 Offer — Lock Your Rank (Telugu)",
                "Hero"
              );
              handleOpenCheckout("hero_buy_btn_te");
            }}
            className="w-full sm:w-auto px-8 sm:px-11 py-4 sm:py-4.5 rounded-2xl bg-gradient-to-r from-crimson via-rose-600 to-rose-700 hover:from-rose-600 hover:to-rose-800 text-white font-extrabold text-base sm:text-lg tracking-wide shadow-[0_0_35px_rgba(225,29,72,0.55)] hover:shadow-[0_0_45px_rgba(225,29,72,0.75)] transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2.5 sm:gap-3 group border border-rose-500/40"
          >
            <Flame className="w-5 h-5 text-white animate-pulse" />
            <span>కేవలం ₹199 ఆఫర్ పొందండి — మీ ర్యాంక్ లాక్ చేయండి</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </button>

          {/* Pricing Anchor & Scarcity Proof */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slateText-secondary font-mono">
            <span className="flex items-center gap-1.5">
              <span className="line-through text-slate-500 font-bold">₹799</span>
              <span className="text-white font-black text-sm">₹199 మాత్రమే</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold text-[10px] border border-emerald-800/40">75% OFF</span>
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-crimson font-semibold">₹199 ధరకు కేవలం 8 కాపీలు మిగిలాయి</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">తక్షణ UPI & వాల్ట్ యాక్సెస్</span>
          </div>

          {/* Loss Aversion Psychological Callout */}
          <div className="mt-2 p-3 sm:p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-center max-w-lg text-[11px] sm:text-xs text-slateText-muted leading-relaxed">
            <span className="text-white font-semibold">⚠️ చేదు నిజం:</span> ఇంకొక సంవత్సరం డ్రాప్ అయితే హైదరాబాద్ అశోక్ నగర్ లేదా హాస్టల్ ఫీజులకే <strong className="text-rose-400">₹1,50,000+</strong> ఖర్చవుతుంది. ఆ డిప్రెషన్ మరియు అవమానం కంటే... ఒక బిర్యానీ ఖర్చు కంటే తక్కువ ధరతో ఈరోజే మీ మైండ్‌సెట్ మార్చుకోండి.
          </div>
        </div>
      </section>

      {/* SECTION C: THE 2 AM MIRROR (TELUGU RAW PSYCHOLOGY) */}
      <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto border-t border-[#1C1C1C]">
        <div className="text-center mb-10">
          <span className="text-crimson text-xs font-mono uppercase tracking-widest font-semibold">
            అర్ధరాత్రి 2 గంటల ఒంటరితనం
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
            రూమ్‌లో లైట్ ఆరిపోయాక... అసలైన యుద్ధం మొదలవుతుంది
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-6 rounded-2xl bg-[#121212] border border-[#222222] hover:border-crimson/30 transition-colors">
            <div className="text-crimson font-bold text-sm mb-2 font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              రాత్రి రీల్స్ స్క్రోలింగ్ & గిల్ట్
            </div>
            <p className="text-xs sm:text-sm text-slateText-secondary leading-relaxed">
              &quot;రేపటి నుండి ఉదయం 5 గంటలకే లేచి 12 గంటలు చదువుతాను&quot; అని రాత్రి గట్టిగా అనుకుంటారు. కానీ ఫోన్ పట్టుకుని Reels, Shorts స్క్రోల్ చేస్తూ 2:30 AM దాటిపోతుంది. తెల్లవారుజామున నిద్రలేవగానే భయంకరమైన అపరాధ భావం (Guilt).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121212] border border-[#222222] hover:border-crimson/30 transition-colors">
            <div className="text-crimson font-bold text-sm mb-2 font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              బంధువుల ఫోన్ కాల్ భయం
            </div>
            <p className="text-xs sm:text-sm text-slateText-secondary leading-relaxed">
              ఫంక్షన్‌లకు వెళ్ళాలన్నా, బంధువుల ఫోన్ కాల్స్ ఎత్తాలన్నా వణుకు పుడుతుంది. &quot;బాబూ.. ఇంకా ప్రిపరేషనేనా? జాబ్ ఎప్పుడు వస్తుంది?&quot; అనే ప్రశ్న వినలేక ఇంట్లోనే తలుపులేసుకుని కూర్చునే నరకం.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121212] border border-[#222222] hover:border-crimson/30 transition-colors">
            <div className="text-crimson font-bold text-sm mb-2 font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              పుస్తకం ముందే ఉంటుంది కానీ చదవలేరు
            </div>
            <p className="text-xs sm:text-sm text-slateText-secondary leading-relaxed">
              స్టడీ టేబుల్ దగ్గర 8 గంటలు కూర్చుంటారు. కానీ నిజంగా చదివింది కేవలం 45 నిమిషాలు మాత్రమే. మిగతా సమయమంతా ఓవర్ థింకింగ్, భయం, రేపటి రిజల్ట్ గురించిన ఆందోళనలోనే కరిగిపోతుంది.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121212] border border-[#222222] hover:border-crimson/30 transition-colors">
            <div className="text-crimson font-bold text-sm mb-2 font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Mock Test భయం & పానిక్
            </div>
            <p className="text-xs sm:text-sm text-slateText-secondary leading-relaxed">
              సిలబస్ అంతా వచ్చు అనుకుంటారు. కానీ Mock Test రాయడానికి కూర్చోగానే హార్ట్‌బీట్ పెరిగిపోతుంది, చేతులు వణుకుతాయి. తెలిసిన సులభమైన ప్రశ్నలకు కూడా తప్పుడు ఆన్సర్లు పెట్టి నెగెటివ్ మార్కులతో బయటకు వస్తారు.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION E: INTERACTIVE SELF-DIAGNOSIS (TELUGU) */}
      <section className="py-14 px-4 sm:px-6 max-w-3xl mx-auto bg-[#111111] rounded-3xl border border-[#242424] my-10">
        <div className="text-center mb-6">
          <span className="text-xs font-mono uppercase text-crimson font-bold tracking-wider">
            20-సెకన్ల ఆన్‌లైన్ టెస్ట్
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
            మీ మైండ్‌లో ఎక్కడ బ్లాక్ ఉందో ఇప్పుడే గుర్తించండి
          </h2>
          <p className="text-xs text-slateText-muted mt-1">
            మీ ప్రస్తుత ప్రధాన సమస్యను ఎంచుకోండి:
          </p>
        </div>

        <div className="space-y-3 mb-6">
          {[
            "స్టడీ టేబుల్ వద్ద కూర్చోగానే నిద్ర మరియు డిస్ట్రాక్షన్ వస్తుంది",
            "ఫోన్ రీల్స్ ఆపలేక గంటల కొద్దీ టైమ్ వేస్ట్ అవుతోంది",
            "మాక్ టెస్ట్‌లలో మార్కులు రాక డిప్రెషన్ మరియు భయం పెరుగుతోంది",
            "కుటుంబం అంచనాలు, నాన్న పడే కష్టం గుర్తొచ్చి ఏడుపొస్తోంది",
          ].map((text, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedIssue(idx);
                trackClientClick(`diagnosis_q1_${idx}_te`, text, "Telugu Diagnosis Widget");
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
              💡 <strong>రోగనిర్ధారణ ఫలితం:</strong> ఇది మీ బలహీనత కాదు. ఇది మీ అమిగ్డాలా (Amygdala) భయం వల్ల వచ్చే &apos;Flight Mode&apos;. MINDLOCK ప్రోటోకాల్ కేవలం 3 రోజుల్లో ఈ న్యూరల్ సైకిల్‌ను బ్రేక్ చేస్తుంది.
            </p>
            <button
              onClick={() => {
                trackClientClick("diagnosis_cta_te", "Unlock Fix via Telugu Diagnosis", "Telugu Diagnosis");
                handleOpenCheckout("diagnosis_cta_te");
              }}
              className="mt-3 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-crimson hover:bg-rose-600 text-white font-bold text-xs sm:text-sm transition-transform active:scale-95"
            >
              <span>ఈ న్యూరల్ బ్లాక్‌ను అన్‌లాక్ చేయండి (₹199)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      {/* SECTION F: WHAT IS IN MINDLOCK? (THE VAULT CONTENTS) */}
      <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-mono uppercase text-crimson font-bold tracking-widest">
            మీకు ఏమి లభిస్తుంది?
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-2">
            MINDLOCK ఆర్కిటెక్చర్: 75-పేజీల బ్లూప్రింట్ + 8 ఆడియో డ్రిల్స్
          </h2>
          <p className="text-xs sm:text-sm text-slateText-secondary mt-2 max-w-2xl mx-auto">
            కేవలం పుస్తకం కాదు — ఎగ్జామ్ హాల్ ఒత్తిడిని జయించడానికి రూపొందించిన పూర్తి సైకలాజికల్ ఆపరేటింగ్ సిస్టమ్.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#121212] border border-[#222222] relative group hover:border-crimson/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-crimson/10 flex items-center justify-center text-crimson mb-4">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              75-పేజీల కాగ్నిటివ్ బ్లూప్రింట్
            </h3>
            <p className="text-xs sm:text-sm text-slateText-secondary leading-relaxed">
              డోపమైన్ డిటాక్స్, సిలబస్ పానిక్ మేనేజ్‌మెంట్ మరియు ఫోకస్ లాక్ చేసే ప్రాక్టికల్ వ్యూహాలు. అనవసర సిద్ధాంతాలు లేకుండా నేరుగా యాక్షన్ పాయింట్స్.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121212] border border-[#222222] relative group hover:border-crimson/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400 mb-4">
              <Headphones className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              8 న్యూరో ఆడియో డ్రిల్స్ (Binaural)
            </h3>
            <p className="text-xs sm:text-sm text-slateText-secondary leading-relaxed">
              చదవడానికి కూర్చునే 5 నిమిషాల ముందు వినాల్సిన ఆడియో గైడ్స్. మైండ్‌లోని గందరగోళాన్ని క్షణాల్లో శాంతింపజేసి డీప్ ఫోకస్‌లోకి తీసుకెళ్తాయి.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121212] border border-[#222222] relative group hover:border-crimson/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              ఎగ్జామ్ డే పానిక్ ప్రోటోకాల్
            </h3>
            <p className="text-xs sm:text-sm text-slateText-secondary leading-relaxed">
              ఎగ్జామ్ హాల్‌లో ప్రశ్న కష్టంగా రాగానే చేతులు వణకకుండా, బ్లాంక్ అవ్వకుండా 30 సెకన్లలో హార్ట్‌బీట్ సాధారణ స్థితికి తెచ్చే ఎమర్జెన్సీ టెక్నిక్.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION H: REAL PROOF FROM TELUGU ASPIRANTS */}
      <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto border-t border-[#1F1F1F]">
        <div className="text-center mb-10">
          <span className="text-xs font-mono uppercase text-emeraldRelief font-bold tracking-wider">
            నిజమైన విద్యార్థుల అనుభవాలు
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            తెలంగాణ & ఆంధ్రప్రదేశ్ ఆస్పిరెంట్ల ఫీడ్‌బ్యాక్
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-[#131313] border border-white/5">
            <div className="flex items-center justify-between mb-3 text-xs font-mono">
              <span className="text-white font-bold">కిరణ్ రెడ్డి — హైదరాబాద్ (అశోక్ నగర్)</span>
              <span className="text-emerald-400">TSPSC Group 2 Aspirant</span>
            </div>
            <p className="text-xs sm:text-sm text-slateText-secondary leading-relaxed">
              &quot;అశోక్ నగర్ లైబ్రరీలో రోజుకు 10 గంటలు కూర్చున్నా చదువు ముందుకు సాగేది కాదు. ఎప్పుడూ భయమే. MINDLOCK లోని 3-ఫేజ్ రీవైర్ వాడాక నా ఫోన్ స్క్రీన్ టైమ్ 7 గంటల నుంచి 1.5 గంటలకు తగ్గింది. ఇప్పుడు చదివింది గుర్తుంటోంది.&quot;
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#131313] border border-white/5">
            <div className="flex items-center justify-between mb-3 text-xs font-mono">
              <span className="text-white font-bold">శ్రావణి వి. — విజయవాడ</span>
              <span className="text-emerald-400">NEET UG Repeater</span>
            </div>
            <p className="text-xs sm:text-sm text-slateText-secondary leading-relaxed">
              &quot;లాస్ట్ ఇయర్ NEET లో ఫిజిక్స్ భయంతో 30 మార్కులు పోయాయి. డిప్రెషన్‌లో ఉన్నప్పుడు ఈ ప్రోటోకాల్ తీసుకున్నాను. ఆడియో డ్రిల్స్ నిజంగా అద్భుతం. ఇప్పుడు మాక్ టెస్టుల్లో నా స్కోర్ 520 నుంచి 635 కి పెరిగింది.&quot;
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#131313] border border-white/5">
            <div className="flex items-center justify-between mb-3 text-xs font-mono">
              <span className="text-white font-bold">వెంకటేష్ ఎం. — తిరుపతి</span>
              <span className="text-emerald-400">AP SI & Constable Aspirant</span>
            </div>
            <p className="text-xs sm:text-sm text-slateText-secondary leading-relaxed">
              &quot;ఇంట్లో ఆర్థిక పరిస్థితి బాగోలేదు. ₹199 అంటే మొదట ఆలోచించాను. కానీ చదివాక అర్థమైంది ఇది వేల రూపాయల కోచింగ్ కన్నా విలువైనది. నాలో ఆత్మవిశ్వాసం మళ్లీ వచ్చింది.&quot;
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#131313] border border-white/5">
            <div className="flex items-center justify-between mb-3 text-xs font-mono">
              <span className="text-white font-bold">భార్గవ్ కె. — వైజాగ్ (విశాఖపట్నం)</span>
              <span className="text-emerald-400">AP EAPCET & JEE Main</span>
            </div>
            <p className="text-xs sm:text-sm text-slateText-secondary leading-relaxed">
              &quot;రాత్రి 2 గంటల దాకా చదవలేకపోవడం, మర్నాడు బాధపడటం నా రొటీన్ అయ్యేది. 7 రోజుల లోపలే నా ఫోకస్ పూర్తిగా మారిపోయింది. ₹199 ఒక చిన్న పిజ్జా రేట్ అంతే, ఖచ్చితంగా ప్రతి ఆస్పిరెంట్ తీసుకోవాలి.&quot;
            </p>
          </div>
        </div>
      </section>

      {/* SECTION J: FAQS IN TELUGU */}
      <section className="py-14 px-4 sm:px-6 max-w-3xl mx-auto border-t border-[#1C1C1C]">
        <div className="text-center mb-8">
          <span className="text-xs font-mono uppercase text-crimson font-bold tracking-wider">
            తరచుగా అడిగే ప్రశ్నలు
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
            మీకు ఏమైనా సందేహాలు ఉన్నాయా?
          </h2>
        </div>

        <div className="space-y-3">
          {[
            {
              q: "నేను చెల్లింపు చేసిన వెంటనే మెటీరియల్ ఎలా అందుతుంది?",
              a: "Razorpay ద్వారా ₹199 చెల్లించిన మరుక్షణమే మీ స్క్రీన్‌పై డౌన్‌లోడ్ వాల్ట్ ఓపెన్ అవుతుంది. అలాగే మీరు నమోదు చేసిన వాట్సాప్ నంబర్‌కు కూడా డైరెక్ట్ యాక్సెస్ లింక్ పంపబడుతుంది.",
            },
            {
              q: "ఇది ఏయే పరీక్షలకు ఉపయోగపడుతుంది?",
              a: "AP/TS EAPCET, NEET, JEE, TSPSC & APPSC గ్రూప్స్, SI/Constable, UPSC, బ్యాంకింగ్ మరియు అన్ని పోటీ పరీక్షల ఆస్పిరెంట్లకు ఇది పనిచేస్తుంది. ఎందుకంటే ఇది సిలబస్ కాదు, మీ మెదడు ఒత్తిడిని నియంత్రించే మైండ్‌సెట్ ప్రోటోకాల్.",
            },
            {
              q: "ఆడియో డ్రిల్స్ ఎలా ఉపయోగించాలి?",
              a: "మీరు చదవడానికి కూర్చోవడానికి 5 నిమిషాల ముందు ఇయర్ ఫోన్స్ పెట్టుకుని వీటిని వినాలి. ఇవి మీ మెదడులోని ఆల్ఫా వేవ్స్‌ను ఉత్తేజితం చేసి గరిష్ట ఏకాగ్రతను తెస్తాయి.",
            },
            {
              q: "ఇది నాకు పనిచేయకపోతే పరిస్థితి ఏమిటి?",
              a: "మీరు ప్రోటోకాల్ అమలు చేసి 7 రోజుల్లో ఎలాంటి మార్పు చూడకపోతే, మాకు మెయిల్ చేయండి — ఒక్క ప్రశ్న కూడా అడగకుండా మీ ₹199 మీకు 100% రీఫండ్ చేయబడుతుంది.",
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

      {/* SECTION K: FINAL URGENCY CALL TO ACTION (TELUGU) */}
      <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto text-center border-t border-[#1C1C1C]">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-rose-950/40 via-[#141414] to-[#0D0D0D] border border-crimson/30 relative overflow-hidden">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
            మరో డ్రాప్ ఇయర్ భయం వద్దు... <br />
            <span className="text-crimson">ఈరోజే మీ మైండ్ లాక్ చేసుకోండి.</span>
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-slateText-secondary max-w-xl mx-auto">
            మీ తల్లిదండ్రుల కళ్ళలో గర్వం చూడటానికి మీకున్న ఏకైక అవకాశం ఇది. ₹199 ఒక చిన్న ఇన్వెస్ట్‌మెంట్, కానీ అది మీ భవిష్యత్తును మారుస్తుంది.
          </p>

          <div className="mt-6 flex flex-col items-center gap-3">
            <button
              id="final_cta_btn_te"
              data-track-btn="final_cta_btn_te"
              onClick={() => {
                trackClientClick(
                  "final_cta_btn_te",
                  "Final Unlock CTA (Telugu)",
                  "Footer CTA"
                );
                handleOpenCheckout("final_cta_btn_te");
              }}
              className="px-9 py-4 rounded-2xl bg-gradient-to-r from-crimson via-rose-600 to-rose-700 hover:from-rose-600 hover:to-rose-800 text-white font-extrabold text-base sm:text-lg tracking-wide shadow-xl shadow-crimson/30 transition-all transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 border border-rose-500/40"
            >
              <Flame className="w-5 h-5 text-white" />
              <span>కేవలం ₹199 చెల్లించి ఇప్పుడే యాక్సెస్ పొందండి</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <div className="text-[11px] font-mono text-slateText-muted flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% మనీ బ్యాక్ గ్యారెంటీ • తక్షణ వాట్సాప్ డెలివరీ</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Sticky Mobile CTA */}
      <StickyMobileCTA onUnlockClick={() => handleOpenCheckout("sticky_mobile_te")} />

      {/* Universal Checkout Modal configured for Telugu */}
      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        sourceButton={modalSource}
        lang="te"
      />
    </div>
  );
}
