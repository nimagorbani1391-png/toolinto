"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Coffee, Briefcase } from "lucide-react";

const WORK_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

export default function Pomodoro() {
  const [mode, setMode] = useState<"work" | "break">("work");
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // محاسبه دقیقه و ثانیه
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // وقتی زمان تموم شد
      setIsRunning(false);
      playSound();
      
      if (mode === "work") {
        setMode("break");
        setTimeLeft(BREAK_TIME);
      } else {
        setMode("work");
        setTimeLeft(WORK_TIME);
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, timeLeft, mode]);

  // تابع پخش صدا (بدون نیاز به فایل خارجی)
  const playSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.type = "sine";
      oscillator.frequency.value = 800;
      gainNode.gain.setValueAtTime(0.5, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1);
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      oscillator.start();
      oscillator.stop(ctx.currentTime + 1);
    } catch (e) {
      console.log("Audio not supported");
    }
  };

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(mode === "work" ? WORK_TIME : BREAK_TIME);
  };

  const switchMode = (newMode: "work" | "break") => {
    setMode(newMode);
    setIsRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(newMode === "work" ? WORK_TIME : BREAK_TIME);
  };

  return (
    <div className="flex flex-col items-center space-y-8 py-4">
      {/* دکمه‌های تغییر حالت */}
      <div className="flex gap-2 rounded-2xl bg-black/20 p-1">
        <button
          onClick={() => switchMode("work")}
          className={`flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-bold transition ${
            mode === "work"
              ? "brand-gradient text-white shadow-lg"
              : "text-slate-400 hover:text-[var(--text-main)]"
          }`}
        >
          <Briefcase className="h-4 w-4" />
          تمرکز (۲۵ دقیقه)
        </button>
        <button
          onClick={() => switchMode("break")}
          className={`flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-bold transition ${
            mode === "break"
              ? "bg-emerald-500 text-white shadow-lg"
              : "text-slate-400 hover:text-[var(--text-main)]"
          }`}
        >
          <Coffee className="h-4 w-4" />
          استراحت (۵ دقیقه)
        </button>
      </div>

      {/* نمایش زمان */}
      <div className="relative flex h-64 w-64 items-center justify-center rounded-full border-4 border-[var(--card-border)] shadow-2xl">
        <div
          className={`absolute inset-0 rounded-full opacity-10 transition-colors duration-1000 ${
            mode === "work" ? "bg-violet-500" : "bg-emerald-500"
          }`}
        />
        <div className="z-10 text-center">
          <span className="font-mono text-6xl font-black tracking-tighter text-[var(--text-main)]">
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </span>
          <p className="mt-2 text-sm font-bold text-slate-500">
            {mode === "work" ? "در حال تمرکز..." : "وقت استراحت!"}
          </p>
        </div>
      </div>

      {/* دکمه‌های کنترل */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTimer}
          className={`flex h-16 w-16 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-105 active:scale-95 ${
            isRunning ? "bg-orange-500" : "brand-gradient"
          }`}
        >
          {isRunning ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
        </button>

        <button
          onClick={resetTimer}
          className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] text-slate-400 transition hover:bg-white/5 hover:text-[var(--text-main)]"
        >
          <RotateCcw className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
