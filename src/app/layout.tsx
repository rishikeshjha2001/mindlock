import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Noto_Sans_Devanagari, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import ReadingProgressBar from "@/components/ReadingProgressBar";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-hindi",
  weight: ["400", "700"],
  display: "swap",
  adjustFontFallback: false,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

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
    <html
      lang="en"
      className={`dark scroll-smooth ${plusJakartaSans.variable} ${notoSansDevanagari.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-[#0A0A0A] text-slateText-primary min-h-screen antialiased selection:bg-crimson selection:text-white font-sans">
        <ReadingProgressBar />
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  );
}
