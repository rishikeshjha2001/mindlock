import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export default function PrivacyPolicyPage() {
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
          <Shield className="w-8 h-8 text-crimson" />
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Privacy Policy
          </h1>
        </div>
        <p className="text-xs text-slateText-muted mb-8">
          Last updated: November 2026
        </p>

        <div className="space-y-6 text-sm text-slateText-secondary leading-relaxed bg-[#141414] border border-[#262626] p-6 sm:p-8 rounded-2xl">
          <section>
            <h2 className="text-base font-bold text-white mb-2">1. Information We Collect</h2>
            <p>
              When you purchase or inquire about the MINDLOCK system, we collect basic details including your name, WhatsApp phone number, target examination, and transaction identifier. We do not store raw card numbers, UPI PINs, or banking credentials; all financial processing is managed securely by certified PCI-DSS compliant payment gateways (such as Razorpay, SuperProfile, Cashfree).
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-2">2. How We Use Your Information</h2>
            <p>
              Your contact information is used strictly to deliver the digital products (the 75-page Blueprint PDF and 8 Audio Reset Drills) directly to your WhatsApp and email address, and to provide customer support for your access portal. We will never sell, lease, or rent your personal information to third-party telemarketers or advertisers.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-2">3. First-Party Analytics & Cookies</h2>
            <p>
              To improve site performance and optimize the user experience, we employ a non-invasive, lightweight first-party analytics system that logs anonymized session metrics, page duration, and feature clicks. No third-party surveillance scripts or cross-site tracking cookies are injected.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-2">4. Data Security</h2>
            <p>
              We implement industry-standard 256-bit SSL encryption across our entire infrastructure to protect all transferred data from unauthorized access or alteration.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-2">5. Contact Information</h2>
            <p>
              For any privacy inquiries or to request data removal, please contact our support team at{" "}
              <a href="mailto:support@mindlocksystem.com" className="text-crimson underline">
                support@mindlocksystem.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
