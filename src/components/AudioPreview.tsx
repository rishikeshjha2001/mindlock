"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, Sparkles } from "lucide-react";
import { trackClientClick } from "./AnalyticsTracker";

export default function AudioPreview() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const audioElemRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const DURATION = 15; // 15 seconds

  const stopAudio = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    if (timerRef.current) clearInterval(timerRef.current);

    if (audioElemRef.current) {
      audioElemRef.current.pause();
      audioElemRef.current.currentTime = 0;
    }

    if (gainNodeRef.current && audioContextRef.current) {
      try {
        gainNodeRef.current.gain.linearRampToValueAtTime(
          0.0001,
          audioContextRef.current.currentTime + 0.3
        );
        setTimeout(() => {
          try {
            osc1Ref.current?.stop();
            osc2Ref.current?.stop();
            audioContextRef.current?.close();
            audioContextRef.current = null;
          } catch {}
        }, 350);
      } catch {}
    }
  };

  const startSynthesizedCalmTone = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      // Soft ambient 108Hz / 112Hz theta wave focus pulse
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(280, ctx.currentTime);

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(108, ctx.currentTime);

      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(112, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 1.0);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();

      osc1Ref.current = osc1;
      osc2Ref.current = osc2;
      gainNodeRef.current = gain;
    } catch (e) {
      console.warn("Web Audio API not active", e);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopAudio();
      trackClientClick(
        "hero_audio_pause",
        "Pause 15-Sec Audio Reality Check",
        "Hero Audio Preview"
      );
    } else {
      setIsPlaying(true);
      trackClientClick(
        "hero_audio_play",
        "Play 15-Sec Audio Reality Check",
        "Hero Audio Preview"
      );

      // Attempt playing /preview.mp3 if present, fallback to synth
      if (audioElemRef.current) {
        audioElemRef.current
          .play()
          .catch(() => {
            startSynthesizedCalmTone();
          });
      } else {
        startSynthesizedCalmTone();
      }

      let elapsed = 0;
      timerRef.current = setInterval(() => {
        elapsed += 0.2;
        setCurrentTime(Math.min(DURATION, elapsed));
        setProgress((elapsed / DURATION) * 100);

        if (elapsed >= DURATION) {
          stopAudio();
        }
      }, 200);
    }
  };

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto mt-8 relative">
      {/* 4-second ambient breathing pulse glow behind player */}
      <div className="absolute inset-0 -m-3 bg-crimson/25 rounded-3xl blur-2xl animate-breathing-glow pointer-events-none -z-10" />

      <div className="rounded-2xl bg-gradient-to-b from-[#141414] to-[#0E0E0E] border border-[#222222] p-4 sm:p-5 shadow-2xl relative overflow-hidden group">
        <audio ref={audioElemRef} src="/preview.mp3" preload="none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-crimson opacity-75 ${
                  isPlaying ? "inline-flex" : "hidden"
                }`}
              ></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-crimson"></span>
            </span>
            <span className="text-[11px] uppercase tracking-wider text-slateText-secondary font-mono flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-crimson" />
              15-Second Late-Night Audio Reality Check
            </span>
          </div>

          <span className="text-[11px] font-mono text-slateText-muted bg-black/50 px-2 py-0.5 rounded border border-white/5 self-start sm:self-auto">
            {isPlaying
              ? `00:${Math.floor(currentTime).toString().padStart(2, "0")} / 00:15`
              : "00:15 Hindi Track"}
          </span>
        </div>

        {/* Player controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            id="hero_audio_play"
            data-track-btn="hero_audio_play"
            onClick={togglePlay}
            className="w-12 h-12 rounded-full bg-crimson hover:bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-crimson/30 transition-all transform active:scale-95 cursor-pointer focus:outline-none"
            aria-label={isPlaying ? "Pause Reality Check" : "Play Reality Check"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>

          {/* Waveform Visualization Bars */}
          <div
            onClick={togglePlay}
            className="flex-1 h-12 flex items-center justify-between gap-1 bg-black/60 rounded-xl px-3 py-2 border border-white/5 cursor-pointer hover:border-crimson/30 transition-colors"
          >
            {[40, 65, 85, 30, 95, 50, 75, 100, 45, 90, 60, 80, 55, 95, 70, 40, 85, 90, 65, 45, 80, 60, 95, 75, 50, 85, 40, 70].map(
              (barHeight, idx) => {
                const barPercent = (idx / 28) * 100;
                const isPast = barPercent <= progress;
                return (
                  <div
                    key={idx}
                    className={`w-1 rounded-full transition-all duration-150 ${
                      isPast
                        ? "bg-crimson shadow-[0_0_8px_rgba(225,29,72,0.8)]"
                        : "bg-neutral-800"
                    } ${isPlaying ? "animate-waveform" : ""}`}
                    style={{
                      height: isPlaying
                        ? `${Math.max(20, ((barHeight * (Math.floor(currentTime * 3) + 1)) % 100))}%`
                        : `${barHeight * 0.55}%`,
                    }}
                  />
                );
              }
            )}
          </div>

          <div className="hidden sm:flex items-center text-neutral-600">
            <Volume2 className="w-4 h-4" />
          </div>
        </div>

        <div className="mt-2.5 flex items-center justify-between text-[11px] text-slateText-muted font-sans">
          <span className="italic">
            🎧 Tap to hear why your brain freezes when you open tough chapters (Hindi Audio)
          </span>
          <span className="text-crimson/90 font-mono text-[10px] hidden sm:inline">
            NEURAL RESET
          </span>
        </div>
      </div>
    </div>
  );
}
