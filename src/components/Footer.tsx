import Link from "next/link";
import { Brain, Lock, ShieldCheck, Mail, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#080808] border-t border-white/5 py-12 px-4 sm:px-6 relative text-slateText-secondary">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        {/* Brand */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2 text-white font-bold text-lg tracking-tight">
            <div className="w-7 h-7 rounded-lg bg-crimson/20 border border-crimson/40 flex items-center justify-center text-crimson">
              <Brain className="w-4 h-4" />
            </div>
            <span>MIND<span className="text-crimson">LOCK</span></span>
          </div>
          <p className="text-xs text-slateText-muted max-w-md leading-relaxed">
            The psychological operating system built specifically for 18–25 year old Indian competitive exam aspirants (JEE, NEET, UPSC, SSC, Banking). Engineered to dismantle fear, guilt, overthinking, and dopamine burnout.
          </p>
          <div className="flex items-center gap-4 text-xs pt-1 text-slateText-muted">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 7-Day Money-Back Guarantee
            </span>
            <span className="flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-slate-400" /> 256-Bit SSL Encrypted
            </span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
            Legal & Support
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link
                href="/privacy-policy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                href="/refund-policy"
                className="hover:text-white transition-colors"
              >
                Refund Policy (7 Days)
              </Link>
            </li>
            <li>
              <Link
                href="/checkout-confirm"
                className="hover:text-white transition-colors"
              >
                Access Portal
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
            Aspirant Desk
          </h4>
          <p className="text-xs text-slateText-muted mb-2">
            Have questions before ordering? Reach out to our team:
          </p>
          <a
            href="mailto:support@mindlocksystem.com"
            className="text-xs text-crimson hover:underline flex items-center gap-1 font-mono"
          >
            <Mail className="w-3 h-3" /> support@mindlocksystem.com
          </a>
          <p className="text-[11px] text-slateText-muted mt-3">
            Instant delivery via WhatsApp & Email immediately after successful payment.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slateText-muted">
        <div>
          © {new Date().getFullYear()} MINDLOCK Protocol. All rights reserved.
        </div>
        <div className="flex items-center gap-1">
          <span>Crafted with</span>
          <Heart className="w-3 h-3 text-crimson fill-crimson" />
          <span>for every silent late-night warrior in India</span>
        </div>
      </div>
    </footer>
  );
}

