import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export default function TermsPage() {
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
          <FileText className="w-8 h-8 text-crimson" />
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Terms of Service
          </h1>
        </div>
        <p className="text-xs text-slateText-muted mb-8">
          Last updated: November 2026
        </p>

        <div className="space-y-6 text-sm text-slateText-secondary leading-relaxed bg-[#141414] border border-[#262626] p-6 sm:p-8 rounded-2xl">
          <section>
            <h2 className="text-base font-bold text-white mb-2">1. Nature of the Product</h2>
            <p>
              MINDLOCK is a digital cognitive training system consisting of educational audio drills, guides, and psychological frameworks. It is designed to assist exam aspirants with concentration, routine adherence, and anxiety control. It is strictly an educational tool and does not guarantee exam ranks or selection.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-2">2. Single-User License</h2>
            <p>
              Upon purchasing the MINDLOCK system for ₹199, you receive a non-exclusive, non-transferable, lifetime license for individual personal use. Re-selling, publicly distributing, copying, or re-uploading the audio tracks or Blueprint PDFs to Telegram groups, forums, or cloud drives is strictly prohibited and subject to legal action under copyright law.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-2">3. Instant Digital Delivery</h2>
            <p>
              Access to the digital products is granted immediately upon successful transaction completion via an automated redirect and instant WhatsApp message dispatch.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-2">4. Disclaimers</h2>
            <p>
              MINDLOCK materials do not substitute for certified medical or clinical psychiatric treatment. If you are experiencing clinical mental distress, please consult a qualified healthcare professional.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

