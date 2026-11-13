"use client";

import { useState, useEffect } from "react";
import { Clock, Flame } from "lucide-react";

export default function UrgencyTimer() {
  const [timeLeft, setTimeLeft] = useState({ minutes: 11, seconds: 43 });

  useEffect(() => {
    // Read from session storage or initialize 14 mins from now
    const STORAGE_KEY = "mindlock_urgency_deadline";
    let deadline = sessionStorage.getItem(STORAGE_KEY);

    if (!deadline) {
      const target = Date.now() + 14 * 60 * 1000 + 48 * 1000;
      sessionStorage.setItem(STORAGE_KEY, target.toString());
      deadline = target.toString();
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, parseInt(deadline!, 10) - now);

      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ minutes: mins, seconds: secs });

      if (diff <= 0) {
        // Reset a short 5-minute extension so it never shows 00:00 dead
        const newTarget = Date.now() + 8 * 60 * 1000;
        sessionStorage.setItem(STORAGE_KEY, newTarget.toString());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const format = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-crimson/15 border border-crimson/35 text-white text-xs font-mono">
      <span className="flex items-center gap-1 text-crimson font-bold">
        <Flame className="w-3.5 h-3.5 animate-bounce" />
        <span className="uppercase tracking-wider text-[11px]">Limited Midnight Batch:</span>
      </span>
      <span className="text-slate-200">Price jumps to ₹799 in</span>
      <span className="px-2 py-0.5 rounded bg-black/70 border border-crimson/50 text-crimson font-bold font-mono text-xs shadow-inner">
        {format(timeLeft.minutes)}:{format(timeLeft.seconds)}
      </span>
    </div>
  );
}

