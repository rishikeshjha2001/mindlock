"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Download,
  BookOpen,
  Headphones,
  FileCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { trackClientClick } from "@/components/AnalyticsTracker";

interface DownloadVaultClientProps {
  initialKey?: string;
}

export default function DownloadVaultClient({ initialKey = "" }: DownloadVaultClientProps) {
  const expectedKey = "mindlock2026";
  const [isAuthorized, setIsAuthorized] = useState<boolean>(() => {
    return initialKey === expectedKey;
  });
  const [whatsappInput, setWhatsappInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (initialKey === expectedKey) {
      setIsAuthorized(true);
      localStorage.setItem("mindlock_vault_unlocked", "true");
    } else {
      const unlockedLocal = localStorage.getItem("mindlock_vault_unlocked");
      if (unlockedLocal === "true") {
        setIsAuthorized(true);
      }
    }
  }, [initialKey]);

  const handleWhatsappUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setIsVerifying(true);

    const clean = whatsappInput.replace(/\D/g, "");
    if (clean.length !== 10) {
      setAuthError("Please enter a valid 10-digit WhatsApp number.");
      setIsVerifying(false);
      return;
    }

    setIsAuthorized(true);
    localStorage.setItem("mindlock_vault_unlocked", "true");
    trackClientClick(
      "vault_manual_unlock",
      `Unlock Vault via WhatsApp: ${clean}`,
      "Download Vault"
    );
    setIsVerifying(false);
  };

  const handleDownload = (fileId: string, fileName: string) => {
    trackClientClick(
      `download_${fileId}`,
      `Download ${fileName}`,
      "Download Vault"
    );
  };

  // LOCKED STATE
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-slateText-primary py-16 px-4 flex items-center justify-center font-sans">
        <div className="w-full max-w-md bg-[#121212] border border-[#222222] rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden text-center">
          <div className="w-12 h-12 rounded-2xl bg-crimson/20 border border-crimson/40 flex items-center justify-center text-crimson mx-auto mb-4">
            <Lock className="w-6 h-6" />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            MINDLOCK Vault Is Locked
          </h2>
          <p className="text-xs text-slateText-secondary mt-1.5 leading-relaxed">
            Enter the 10-digit WhatsApp number you entered during checkout to unlock your download files.
          </p>

          <form onSubmit={handleWhatsappUnlock} className="mt-6 space-y-4 text-left">
            <div>
              <label className="block text-[11px] font-semibold text-slateText-muted uppercase tracking-wider mb-1.5 font-mono">
                Registered WhatsApp Number
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-sm text-neutral-500 font-mono">
                  +91
                </span>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="9876543210"
                  value={whatsappInput}
                  onChange={(e) => setWhatsappInput(e.target.value)}
                  className="w-full pl-12 pr-3.5 py-2.5 rounded-xl bg-black/60 border border-[#2a2a2a] text-white placeholder-neutral-600 focus:outline-none focus:border-crimson text-sm font-mono"
                />
              </div>
            </div>

            {authError && (
              <div className="p-2 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-300 text-xs">
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-3 rounded-xl bg-crimson hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-crimson/30 transition-all cursor-pointer"
            >
              {isVerifying ? "Verifying..." : "Unlock Vault Access"}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slateText-muted">
            <Link href="/" className="hover:text-white transition-colors">
              ← Return to Home
            </Link>
            <a
              href="https://wa.me/919876543210?text=Hi%2C%20I%20need%20help%20unlocking%20my%20MINDLOCK%20vault"
              target="_blank"
              rel="noopener noreferrer"
              className="text-crimson hover:underline"
            >
              Need Support?
            </a>
          </div>
        </div>
      </div>
    );
  }

  // UNLOCKED STATE
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-slateText-primary py-12 px-4 sm:px-6 font-sans">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-slateText-muted hover:text-white transition-colors mb-6"
        >
          ← Return to Main Page
        </Link>

        {/* Main Vault Delivery Card */}
        <div className="bg-[#121212] border-2 border-emerald-500/50 rounded-3xl p-6 sm:p-10 shadow-[0_0_50px_rgba(16,185,129,0.12)] relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="text-center">
            <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider border border-emerald-800/40">
              Access Confirmed & Vault Unlocked
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-3 tracking-tight">
              Welcome to the MINDLOCK Operating System
            </h1>
            <p className="text-xs sm:text-sm text-slateText-secondary mt-1.5 max-w-md mx-auto">
              Your lifetime access credentials and download links are ready. Download your files below:
            </p>
          </div>

          {/* Deliverables Download Links */}
          <div className="mt-8 space-y-3.5">
            {/* File 1: PDF Manual */}
            <div className="p-4 rounded-2xl bg-black/50 border border-white/5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-crimson/20 border border-crimson/30 flex items-center justify-center text-crimson">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    The MINDLOCK Cognitive Blueprint
                  </h4>
                  <p className="text-[11px] text-slateText-muted font-mono">
                    75-Page Action Manual • PDF
                  </p>
                </div>
              </div>
              <a
                href="/product/MINDLOCK-Cognitive-Blueprint.pdf"
                download="MINDLOCK-Cognitive-Blueprint.pdf"
                id="download_pdf_manual"
                data-track-btn="download_pdf_manual"
                onClick={() =>
                  handleDownload("pdf_manual", "MINDLOCK-Cognitive-Blueprint.pdf")
                }
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </a>
            </div>

            {/* File 2: Audio Drills */}
            <div className="p-4 rounded-2xl bg-black/50 border border-white/5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    8 Raw Hindi Late-Night Audio Reset Drills
                  </h4>
                  <p className="text-[11px] text-slateText-muted font-mono">
                    Complete Audio Pack • MP3 (ZIP)
                  </p>
                </div>
              </div>
              <a
                href="/product/MINDLOCK-Hindi-Audio-Drills.zip"
                download="MINDLOCK-Hindi-Audio-Drills.zip"
                id="download_audio_pack"
                data-track-btn="download_audio_pack"
                onClick={() =>
                  handleDownload("audio_pack", "MINDLOCK-Hindi-Audio-Drills.zip")
                }
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </a>
            </div>

            {/* File 3: Scorecard & Matrix */}
            <div className="p-4 rounded-2xl bg-black/50 border border-white/5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-300">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Exam-Hall Nerve Control & Daily Scorecard
                  </h4>
                  <p className="text-[11px] text-slateText-muted font-mono">
                    Printable Inner Tracker • PDF
                  </p>
                </div>
              </div>
              <a
                href="/product/MINDLOCK-Daily-Scorecard.pdf"
                download="MINDLOCK-Daily-Scorecard.pdf"
                id="download_scorecard"
                data-track-btn="download_scorecard"
                onClick={() =>
                  handleDownload("scorecard", "MINDLOCK-Daily-Scorecard.pdf")
                }
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </a>
            </div>
          </div>

          {/* Action Step Tonight */}
          <div className="mt-8 p-4 rounded-2xl bg-[#161618] border border-white/5 text-left">
            <h4 className="text-xs uppercase tracking-wider font-bold text-crimson mb-2 flex items-center gap-1.5 font-mono">
              <Sparkles className="w-3.5 h-3.5" /> TONIGHT&apos;S ACTIVATION (DAY 1)
            </h4>
            <ol className="text-xs text-slate-300 space-y-1.5 list-decimal pl-4 leading-relaxed">
              <li>Put on earphones tonight at 11:30 PM or whenever your study block starts.</li>
              <li>Listen to <strong>Track 01: The Guilt Kill-Switch</strong> completely once without touching your phone.</li>
              <li>Read Section 2 (The 60-Second Friction Decoder) on page 14 of your Blueprint.</li>
            </ol>
          </div>

          {/* Direct WhatsApp Support */}
          <div className="mt-6 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slateText-muted flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Lifetime access backed by 1-on-1 student desk.</span>
            </div>

            <a
              href="https://wa.me/919876543210?text=Hi%20MINDLOCK%20Team%2C%20I%20have%20unlocked%20the%20vault%20and%20am%20ready%20for%20Day%201."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-black font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
            >
              <MessageCircle className="w-4 h-4 fill-black" />
              <span>Connect on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

