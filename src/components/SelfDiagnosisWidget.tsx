"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, ArrowRight, Sparkles, Brain, RefreshCw } from "lucide-react";
import { trackClientClick } from "./AnalyticsTracker";

interface SelfDiagnosisWidgetProps {
  onUnlockClick: (source: string) => void;
}

export default function SelfDiagnosisWidget({ onUnlockClick }: SelfDiagnosisWidgetProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [step1Answer, setStep1Answer] = useState<string>("");
  const [step2Answer, setStep2Answer] = useState<string>("");

  const step1Options = [
    {
      id: "opt_reels",
      text: "Thumb automatically opens Reels/YouTube",
      tag: "Dopamine Friction Spike",
    },
    {
      id: "opt_line_repeat",
      text: "Read the same line 5 times with zero focus",
      tag: "Passive Reading Hypnosis",
    },
    {
      id: "opt_overthinking",
      text: "Overthinking result & parents' expectations",
      tag: "Threat-Response Hijack",
    },
  ];

  const step2Options = [
    {
      id: "opt_dinner",
      text: "At dinner when parents ask about studies",
      tag: "Parental Shame Trigger",
    },
    {
      id: "opt_2am",
      text: "At 2 AM staring at the ceiling fan",
      tag: "Subconscious Broken-Promise Guilt",
    },
    {
      id: "opt_comparison",
      text: "After seeing friends' jobs / corporate salaries",
      tag: "Comparison Isolation Trauma",
    },
  ];

  const handleStep1Select = (opt: string) => {
    setStep1Answer(opt);
    trackClientClick(`diag_step1_${opt.slice(0, 15)}`, opt, "Self Diagnosis");
    setStep(2);
  };

  const handleStep2Select = (opt: string) => {
    setStep2Answer(opt);
    trackClientClick(`diag_step2_${opt.slice(0, 15)}`, opt, "Self Diagnosis");

    // Log diagnosis payload to server
    try {
      const sessionId = localStorage.getItem("mindlock_session_id") || "anon";
      fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "DIAGNOSIS",
          sessionId,
          step1Choice: step1Answer,
          step2Choice: opt,
        }),
      }).catch(() => {});
    } catch {}

    setStep(3);
  };

  const handleReset = () => {
    setStep(1);
    setStep1Answer("");
    setStep2Answer("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-12 rounded-3xl bg-[#121212] border border-[#222222] p-5 sm:p-8 shadow-2xl relative overflow-hidden text-left">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] font-mono tracking-wider uppercase text-crimson font-semibold flex items-center gap-1.5">
          <Brain className="w-3.5 h-3.5 text-crimson" />
          Interactive 20-Second Cognitive Diagnosis
        </span>
        <span className="text-[11px] font-mono text-slateText-muted bg-black/40 px-2 py-0.5 rounded border border-white/5">
          {step === 3 ? "Diagnosis Complete" : `Question 0${step} of 02`}
        </span>
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <div className="animate-fadeIn">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
            What happens 15 minutes after you sit at your study desk?
          </h3>
          <p className="text-xs text-slateText-muted mb-5">
            Be completely honest with yourself. Nobody is grading this.
          </p>

          <div className="space-y-3">
            {step1Options.map((item) => (
              <button
                key={item.id}
                onClick={() => handleStep1Select(item.text)}
                data-track-btn={`diag_q1_${item.id}`}
                className="w-full p-4 rounded-2xl bg-black/50 hover:bg-[#1A1A1A] border border-[#262626] hover:border-crimson/50 text-left transition-all flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <span className="text-xs sm:text-sm text-slate-200 font-medium group-hover:text-white block">
                    {item.text}
                  </span>
                  <span className="text-[10px] text-slateText-muted font-mono mt-0.5 block">
                    {item.tag}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-crimson group-hover:translate-x-1 transition-all shrink-0 ml-3" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="animate-fadeIn">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
            When do you feel the heaviest, most suffocating guilt?
          </h3>
          <p className="text-xs text-slateText-muted mb-5">
            Select the moment that triggers your silent panic most often:
          </p>

          <div className="space-y-3">
            {step2Options.map((item) => (
              <button
                key={item.id}
                onClick={() => handleStep2Select(item.text)}
                data-track-btn={`diag_q2_${item.id}`}
                className="w-full p-4 rounded-2xl bg-black/50 hover:bg-[#1A1A1A] border border-[#262626] hover:border-crimson/50 text-left transition-all flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <span className="text-xs sm:text-sm text-slate-200 font-medium group-hover:text-white block">
                    {item.text}
                  </span>
                  <span className="text-[10px] text-slateText-muted font-mono mt-0.5 block">
                    {item.tag}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-crimson group-hover:translate-x-1 transition-all shrink-0 ml-3" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 3: DYNAMIC DIAGNOSIS OUTPUT */}
      {step === 3 && (
        <div className="animate-fadeIn">
          <div className="p-4 rounded-2xl bg-crimson/10 border border-crimson/30 mb-5">
            <div className="flex items-center gap-2 text-crimson font-mono text-xs font-bold uppercase mb-1">
              <AlertCircle className="w-4 h-4 shrink-0" />
              Pattern Detected: Sympathetic Threat Loop & Shame Paralysis
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mt-2">
              Based on your answers: <em>&ldquo;{step1Answer}&rdquo;</em> and <em>&ldquo;{step2Answer}&rdquo;</em>, your issue is <strong>biological, not moral</strong>.
            </p>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-slateText-secondary leading-relaxed bg-black/40 p-4 rounded-2xl border border-white/5 mb-6">
            <p>
              When your brain feels subconscious guilt about parents&apos; sacrifice, opening a difficult textbook triggers your autonomic nervous system into a <strong>subtle fight-or-flight freeze</strong>.
            </p>
            <p>
              Your thumb doesn&apos;t open YouTube because you lack discipline; your brain uses the screen as an <strong>emergency emotional anaesthetic</strong> to numb the shame. App blockers fail because they treat the symptom while your internal threat alarm keeps blaring.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              id="diagnosis_cta_btn"
              data-track-btn="diagnosis_cta_btn"
              onClick={() => {
                trackClientClick(
                  "diagnosis_cta_btn",
                  "See How MINDLOCK Fixes This Loop →",
                  "Self Diagnosis"
                );
                onUnlockClick("diagnosis_cta_btn");
              }}
              className="w-full sm:flex-1 py-3.5 px-5 rounded-xl bg-crimson hover:bg-rose-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-crimson/30 transition-all cursor-pointer"
            >
              <span>See How MINDLOCK Silences This Loop</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleReset}
              className="py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slateText-muted hover:text-white text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retake Test</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

