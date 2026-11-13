import Link from "next/link";
import { ArrowLeft, RefreshCw, ShieldCheck } from "lucide-react";

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-slateText-primary py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-crimson hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to MINDLOCK
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <RefreshCw className="w-8 h-8 text-crimson" />
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            7-Day 100% Refund Policy
          </h1>
        </div>
        <p className="text-xs text-slateText-muted mb-8">
          Clear, honest, zero-friction student guarantee.
        </p>

        <div className="space-y-6 text-sm text-slateText-secondary leading-relaxed bg-[#141414] border border-[#262626] p-6 sm:p-8 rounded-2xl">
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-700/40 flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-white font-bold text-sm mb-1">
                Zero-Risk 7-Day Guarantee
              </h3>
              <p className="text-xs text-emerald-200">
                Agar aapne MINDLOCK Blueprint padha aur audio drills ko 7 din tak follow kiya, aur fir bhi aapko apne focus, routine adherence ya exam-hall anxiety mein visible difference mehsoos na ho, toh aap 100% full refund claim kar sakte hain.
              </p>
            </div>
          </div>

          <section>
            <h2 className="text-base font-bold text-white mb-2">How to Request a Refund</h2>
            <p>
              To process your refund within 7 calendar days from your purchase time:
            </p>
            <ol className="list-decimal pl-5 mt-2 space-y-1.5 text-xs text-slate-300">
              <li>
                Send an email to{" "}
                <a
                  href="mailto:support@mindlocksystem.com"
                  className="text-crimson font-mono underline"
                >
                  support@mindlocksystem.com
                </a>{" "}
                or message us on our official WhatsApp desk.
              </li>
              <li>Mention your Registered WhatsApp Number or Payment Reference ID.</li>
              <li>Our team will initiate the 100% reverse transfer without asking frustrating questions.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-2">Refund Processing Timeline</h2>
            <p>
              Once initiated, UPI and banking refunds are credited directly back to your original source account within 24 to 48 banking hours.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
