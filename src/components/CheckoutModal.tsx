"use client";

import { useState } from "react";
import { X, Lock, ShieldCheck, ArrowRight, Loader2, Sparkles, CheckCircle2 } from "lucide-react";
import { trackClientClick } from "./AnalyticsTracker";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  sourceButton: string;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay?: any;
  }
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

      // 1. Record lead in database / store
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

      const leadData = await res.json();
      const fallbackRedirectUrl =
        leadData.paymentUrl || "https://mindlock-virid.vercel.app/download-vault?key=mindlock2026";

      // 2. Initialize Razorpay
      try {
        const orderRes = await fetch("/api/razorpay/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            whatsapp: cleanNumber,
            targetExam,
          }),
        });

        const orderInfo = await orderRes.json();

        // If Razorpay SDK is loaded and a key is provided
        const activeRazorpayKey = orderInfo?.keyId || "rzp_live_Tzg3cRYuMD2Dyi";
        if (activeRazorpayKey && typeof window !== "undefined" && window.Razorpay) {
          const options = {
            key: activeRazorpayKey,
            amount: orderInfo.amount || 19900,
            currency: orderInfo.currency || "INR",
            name: "MINDLOCK Protocol",
            description: "Instant Access: 75-Page Blueprint + 8 Audio Drills",
            order_id: orderInfo.orderId || undefined,
            prefill: {
              name: name.trim(),
              contact: `+91${cleanNumber}`,
            },
            theme: {
              color: "#E11D48",
            },
            handler: async function (response: {
              razorpay_payment_id: string;
              razorpay_order_id?: string;
              razorpay_signature?: string;
            }) {
              setIsSuccessStep(true);
              try {
                await fetch("/api/razorpay/verify", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(response),
                });
              } catch {}

              setTimeout(() => {
                window.location.href = "https://mindlock-virid.vercel.app/download-vault?key=mindlock2026";
              }, 800);
            },
            modal: {
              ondismiss: function () {
                setIsLoading(false);
              },
            },
          };

          const rzpInstance = new window.Razorpay(options);
          rzpInstance.open();
          return;
        }

        // If a direct Razorpay payment link or custom payment URL was configured
        if (orderInfo?.paymentUrl && orderInfo.paymentUrl.startsWith("http")) {
          setIsSuccessStep(true);
          setTimeout(() => {
            window.location.href = orderInfo.paymentUrl;
          }, 800);
          return;
        }
      } catch (rzpErr) {
        console.warn("Razorpay dynamic checkout fallback:", rzpErr);
      }

      // Default safe redirect
      setIsSuccessStep(true);
      setTimeout(() => {
        window.location.href = fallbackRedirectUrl;
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
          className="absolute top-5 right-5 text-slateText-muted hover:text-white p-1 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccessStep ? (
          /* Step 2: Instant Connection Confirmation State */
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emeraldRelief/15 border border-emeraldRelief/40 flex items-center justify-center text-emeraldRelief mx-auto animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Access Details Confirmed
            </h3>
            <p className="text-xs sm:text-sm text-slateText-secondary max-w-xs mx-auto">
              Connecting you to secure Razorpay UPI payment gateway...
            </p>
            <div className="flex items-center justify-center gap-2 pt-2 text-crimson font-mono text-xs">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Redirecting to Vault / Razorpay...</span>
            </div>
          </div>
        ) : (
          /* Step 1: Input Details */
          <div>
            <div className="flex items-center gap-2 text-crimson font-mono text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Step 1 of 2: Access Protocol</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Where should we send your private download access?
            </h3>
            <p className="text-xs text-slateText-muted mt-1 leading-relaxed">
              Your 75-page Cognitive Blueprint + 8 Audio Reset Drills will be delivered to this WhatsApp and unlocked in your private vault.
            </p>

            {errorMsg && (
              <div className="mt-3 p-2.5 rounded-lg bg-red-950/40 border border-red-800/50 text-red-300 text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-slateText-secondary mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#181818] border border-[#2a2a2a] rounded-xl px-4 py-2.5 text-sm text-white placeholder-slateText-muted focus:outline-none focus:border-crimson transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slateText-secondary mb-1">
                  WhatsApp Number (10 Digits) *
                </label>
                <div className="flex items-center bg-[#181818] border border-[#2a2a2a] rounded-xl overflow-hidden focus-within:border-crimson transition-colors">
                  <span className="px-3 text-xs font-mono text-slateText-muted border-r border-[#2a2a2a]">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="9876543210"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full bg-transparent px-3 py-2.5 text-sm text-white placeholder-slateText-muted focus:outline-none"
                  />
                </div>
                <p className="text-[10px] text-slateText-muted mt-1">
                  Used exclusively to dispatch your private vault credentials & receipts. Zero spam.
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slateText-secondary mb-1">
                  Target Examination *
                </label>
                <select
                  value={targetExam}
                  onChange={(e) => setTargetExam(e.target.value)}
                  className="w-full bg-[#181818] border border-[#2a2a2a] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-crimson transition-colors cursor-pointer"
                >
                  <option value="JEE">JEE Main / Advanced</option>
                  <option value="NEET">NEET UG</option>
                  <option value="UPSC">UPSC Civil Services</option>
                  <option value="SSC">SSC CGL / CHSL</option>
                  <option value="Banking">Banking (IBPS, SBI PO)</option>
                  <option value="State">State PSC / Police</option>
                  <option value="Other">Other Competitive Exam</option>
                </select>
              </div>

              {/* Price Reframe & Guarantee in Modal */}
              <div className="p-3 rounded-xl bg-obsidian-200 border border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-slateText-muted font-mono uppercase">
                    Protocol Fee
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-black text-white">₹199</span>
                    <span className="text-xs text-slateText-muted line-through">₹799</span>
                    <span className="text-[10px] font-mono text-emeraldRelief">75% OFF</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-slateText-secondary font-medium">
                    Instant Razorpay UPI Access
                  </div>
                  <div className="text-[10px] text-slateText-muted">
                    Lifetime Vault Access
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-5 rounded-xl bg-crimson hover:bg-rose-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-crimson/25 transition-all transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Preparing Secure Payment...</span>
                  </>
                ) : (
                  <>
                    <span>Proceed to Instant UPI Access — ₹199</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slateText-muted pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emeraldRelief" />
                <span>256-Bit SSL Encrypted • Razorpay & 100% Refund Guarantee</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
