import type { Metadata, Viewport } from "next";
import "./globals.css";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import ReadingProgressBar from "@/components/ReadingProgressBar";

export const metadata: Metadata = {
  title: "MINDLOCK — Silence the Fear. Lock Your Rank.",
  description:
    "An exam psychology, focus protocol, and cognitive operating system built for 18–25 year old Indian aspirants preparing for JEE, NEET, UPSC, SSC, Banking, and State exams. Reset shame paralysis and dopamine burnout in 7 days.",
  keywords: [
    "MINDLOCK",
    "Silence the Fear Lock Your Rank",
    "exam psychology India",
    "JEE focus protocol",
    "NEET anxiety control",
    "UPSC mental framework",
    "SSC CGL study habit",
    "late night study focus",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0A0A0A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Noto+Sans+Devanagari:wght@400;600;700;800&family=Noto+Sans+Telugu:wght@400;600;700;800&family=Noto+Sans+Tamil:wght@400;600;700;800&family=Noto+Sans+Kannada:wght@400;600;700;800&family=Noto+Sans+Malayalam:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
      </head>
      <body className="bg-[#0A0A0A] text-slateText-primary min-h-screen antialiased selection:bg-crimson selection:text-white font-sans">
        <ReadingProgressBar />
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  );
}
