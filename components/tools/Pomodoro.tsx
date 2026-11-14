"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Settings } from "lucide-react";

export default function Pomodoro() {
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [taskName, setTaskName] = useState("مطالعه");
  
  const [mode, setMode] = useState<"work" | "break">("work");
  const [timeLeft, setTimeLeft] = useState(workTime * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const playSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = 880; // صدای واضح تر
      gainNode.gain.setValueAtTime(0.5, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5);
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      oscillator.start();
      oscillator.stop(ctx.currentTime + 1.5);
    } catch (e) {
      console.log("Audio not supported");
    }
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      playSound();
      if (mode === "work") {
        setMode("break");
        setTimeLeft(breakTime * 60);
      } else {
        setMode("work");
        setTimeLeft(workTime * 60);
      }
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isRunning, timeLeft, mode, workTime, breakTime]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setMode("work");
    setTimeLeft(workTime * 60);
  };

  const applySettings = () => {
    setIsRunning(false);
    setMode("work");
    setTimeLeft(workTime * 60);
    setShowSettings(false);
  };

  return (
    <div className="flex flex-col items-center space-y-6 py-4">
      {/* دکمه تنظیمات */}
      <button 
        onClick={() => setShowSettings(!showSettings)}
        className="flex items-center gap-2 text-sm text-slate-400 hover:text-[var(--text-main)] transition"
      >
        <Settings className="h-4 w-4" /> تنظیمات
      </button>

      {/* پنل تنظیمات */}
      {showSettings && (
        <div className="w-full max-w-sm rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4 space-y-4 animate-in fade-in">
          <div>
            <label className="text-xs text-slate-500 mb-1 block">نام کار</label>
            <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} className="w-full rounded-lg bg-black/20 p-2 text-sm text-[var(--text-main)] outline-none" />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-xs text-slate-500 mb-1 block">دقیقه تمرکز</label>
              <input type="number" value={workTime} onChange={(e) => setWorkTime(Number(e.target.value))} className="w-full rounded-lg bg-black/20 p-2 text-sm text-[var(--text-main)] outline-none" />
            </div>
            <div className="flex-1">
              <label className="text-xs text-slate-500 mb-1 block">دقیقه استراحت</label>
              <input type="number" value={breakTime} onChange={(e) => setBreakTime(Number(e.target.value))} className="w-full rounded-lg bg-black/20 p-2 text-sm text-[var(--text-main)] outline-none" />
            </div>
          </div>
          <button onClick={applySettings} className="w-full rounded-lg bg-violet-500 py-2 text-sm font-bold text-white hover:bg-violet-600">ذخیره</button>
        </div>
      )}

      {/* نمایشگر زمان */}
      <div className={`relative flex h-64 w-64 items-center justify-center rounded-full border-4 ${mode === "work" ? "border-violet-500" : "border-emerald-500"} shadow-2xl`}>
        <div className="z-10 text-center">
          <p className="text-sm font-bold text-slate-500 mb-2">{mode === "work" ? `در حال: ${taskName}` : "وقت استراحت!"}</p>
          <span className="font-mono text-6xl font-black tracking-tighter text-[var(--text-main)]">
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* دکمه‌های کنترل */}
      <div className="flex items-center gap-4">
        <button onClick={toggleTimer} className={`flex h-16 w-16 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-105 ${isRunning ? "bg-orange-500" : "brand-gradient"}`}>
          {isRunning ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
        </button>
        <button onClick={resetTimer} className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] text-slate-400 transition hover:bg-white/5">
          <RotateCcw className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
