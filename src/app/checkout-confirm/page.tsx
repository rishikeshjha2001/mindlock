"use client";

import Link from "next/link";
import { CheckCircle2, Download, Headphones, BookOpen, ArrowLeft, ShieldCheck, Sparkles } from "lucide-react";

export default function CheckoutConfirmPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-slateText-primary py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Top return link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-slateText-muted hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Home
        </Link>

        {/* Confirmation Card */}
        <div className="bg-[#141414] border-2 border-emerald-500/50 rounded-3xl p-6 sm:p-10 shadow-[0_0_50px_rgba(16,185,129,0.15)] relative overflow-hidden text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/60 flex items-center justify-center text-emerald-400 mx-auto mb-5 shadow-lg shadow-emerald-950">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider border border-emerald-800/40">
            Access Confirmed & Generated
          </span>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-4 tracking-tight">
            Welcome to the MINDLOCK Protocol
          </h1>
          <p className="text-xs sm:text-sm text-slateText-secondary mt-2 max-w-md mx-auto">
            Your credentials and download links have also been dispatched to your WhatsApp. You can download and access your files directly below:
          </p>

          {/* Deliverables Download Links */}
          <div className="mt-8 space-y-3 text-left">
            <div className="p-4 rounded-xl bg-obsidian-200 border border-white/5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-crimson/20 border border-crimson/30 flex items-center justify-center text-crimson">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    MINDLOCK Blueprint Manual (75 Pages)
                  </h4>
                  <p className="text-[11px] text-slateText-muted">High-Res PDF • 18.4 MB</p>
                </div>
              </div>
              <button
                onClick={() => {
                  alert("Your official Blueprint PDF is downloading. Please check your downloads folder.");
                }}
                className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-obsidian-200 border border-white/5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-900/30 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    8 Late-Night Raw Hindi Audio Drills
                  </h4>
                  <p className="text-[11px] text-slateText-muted">Complete MP3 Audio Pack • 85 MB</p>
                </div>
              </div>
              <button
                onClick={() => {
                  alert("Your 8 Audio Reset Drills zip file is downloading.");
                }}
                className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>

          {/* Action Step Tonight */}
          <div className="mt-8 p-4 rounded-xl bg-[#1A1A1E] border border-white/5 text-left">
            <h4 className="text-xs uppercase tracking-wider font-bold text-crimson mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Instructions For Tonight (Day 1)
            </h4>
            <ol className="text-xs text-slate-300 space-y-1.5 list-decimal pl-4">
              <li>Put on your earphones at bedtime or right before starting study.</li>
              <li>Listen to <strong>Track 01: The Guilt Kill-Switch</strong> once completely without multitasking.</li>
              <li>Read Section 2 (The 60-Second Friction Decoder) from page 14 of the manual.</li>
            </ol>
          </div>

          {/* Access Support Note */}
          <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-center text-center">
            <div className="text-xs text-slateText-muted flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Lifetime vault access verified. All files are downloadable directly from this page.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
