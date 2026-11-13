"use client";

import { useState } from "react";
import { X, Lock, ShieldCheck, ArrowRight, Loader2, Sparkles, CheckCircle2 } from "lucide-react";
import { trackClientClick } from "./AnalyticsTracker";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  sourceButton: string;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  sourceButton,
}: CheckoutModalProps) {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [targetExam, setTargetExam] = useState("JEE");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSuccessStep, setIsSuccessStep] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const cleanNumber = whatsapp.replace(/\D/g, "");
    if (!name.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }
    if (cleanNumber.length !== 10) {
      setErrorMsg("Please enter a valid 10-digit Indian WhatsApp number.");
      return;
    }

    setIsLoading(true);

    try {
      const sessionId = localStorage.getItem("mindlock_session_id") || "ml_anon";

      trackClientClick(
        "modal_proceed_payment_btn",
        `Proceed to Instant UPI Access (${targetExam})`,
        "Access Modal"
      );

      const res = await fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "LEAD",
          sessionId,
          name: name.trim(),
          whatsapp: cleanNumber,
          targetExam,
          sourceButton,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to record access details");
      }

      setIsSuccessStep(true);
      const redirectUrl = data.paymentUrl || "/download-vault?key=mindlock2026";

      // Brief 1-second calm transitional state before redirect
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 1000);
    } catch (err: unknown) {
      console.error("Lead submission error:", err);
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong. Please retry."
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full max-w-lg bg-[#121212] border border-[#222222] rounded-3xl shadow-2xl p-5 sm:p-7 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle crimson glow background */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-crimson/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => {
            trackClientClick("modal_close_btn", "Close Access Modal", "Access Modal");
            onClose();
          }}
          className="absolute top-4 right-4 text-slateText-muted hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccessStep ? (
          <div className="py-8 text-center animate-fadeIn">
            <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white">
              Preparing your secure UPI checkout...
            </h3>
            <p className="text-xs text-slateText-muted mt-2">
              Connecting to MINDLOCK Vault dispatch system. Redirecting you now...
            </p>
            <div className="mt-5 flex justify-center">
              <Loader2 className="w-5 h-5 text-crimson animate-spin" />
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold tracking-wider bg-crimson/15 text-crimson border border-crimson/25 uppercase flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Step 1 of 2: Vault Credentials
              </span>
              <span className="text-[11px] text-slateText-muted">• 7-Day Honest Relief</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
              Where should we send your MINDLOCK Vault backup link?
            </h3>
            <p className="text-xs text-slateText-secondary mt-1">
              Your 75-page Cognitive Blueprint + 8 Audio Reset Drills will be delivered to this WhatsApp.
            </p>

            {/* Offer Summary Bar */}
            <div className="mt-4 p-3 rounded-2xl bg-black/50 border border-white/5 flex items-center justify-between">
              <div>
                <div className="text-[11px] text-slateText-muted line-through font-mono">
                  Standard Commitment: ₹799
                </div>
                <div className="text-base sm:text-lg font-bold text-white flex items-center gap-1.5">
                  <span className="text-xs text-slateText-muted font-normal">Today:</span>
                  <span className="text-crimson font-mono text-xl">₹199</span>
                  <span className="text-[10px] font-normal text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-1.5 py-0.5 rounded font-mono">
                    One-Time
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[11px] text-slateText-muted">Instant Access</div>
                <div className="text-xs font-medium text-slate-300">Lifetime Vault</div>
              </div>
            </div>

            {/* Lead Capture Form */}
            <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slateText-secondary uppercase tracking-wider mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aryan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-[#2a2a2a] text-white placeholder-neutral-600 focus:outline-none focus:border-crimson text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slateText-secondary uppercase tracking-wider mb-1">
                  WhatsApp Number (10 Digits) *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-sm text-neutral-400 font-mono">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="9876543210"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full pl-12 pr-3.5 py-2.5 rounded-xl bg-black/60 border border-[#2a2a2a] text-white placeholder-neutral-600 focus:outline-none focus:border-crimson text-sm font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slateText-secondary uppercase tracking-wider mb-1">
                  Exam Preparing For *
                </label>
                <select
                  value={targetExam}
                  onChange={(e) => setTargetExam(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-[#2a2a2a] text-white focus:outline-none focus:border-crimson text-sm"
                >
                  <option value="JEE (Main & Advanced)">JEE (Main & Advanced)</option>
                  <option value="NEET UG">NEET UG</option>
                  <option value="UPSC CSE / State PSC">UPSC CSE / State PSC</option>
                  <option value="SSC CGL / Banking / Railways">SSC & Banking</option>
                  <option value="Board 10th-12th">Board 10-12</option>
                  <option value="College / GATE / Other">Other Competitive Exam</option>
                </select>
              </div>

              {errorMsg && (
                <div className="p-2.5 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs">
                  {errorMsg}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                id="modal_proceed_payment_btn"
                data-track-btn="modal_proceed_payment_btn"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-xl bg-crimson hover:bg-rose-500 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-crimson/30 transition-all transform active:scale-98 cursor-pointer disabled:opacity-50 mt-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Connecting to Secure UPI...</span>
                  </>
                ) : (
                  <>
                    <span>Continue to Instant UPI Access (₹199) →</span>
                  </>
                )}
              </button>
            </form>

            {/* Badges */}
            <div className="mt-4 pt-3.5 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slateText-muted">
              <div className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>256-Bit Encrypted</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium text-slate-300">
                <span>GPay • PhonePe • Paytm • Cards</span>
              </div>
              <div className="flex items-center gap-1 text-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>7-Day Relief Guarantee</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
