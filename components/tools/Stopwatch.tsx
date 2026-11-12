"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const toggleTimer = () => {
    if (isRunning) {
      setIsRunning(false);
    } else {
      startTimeRef.current = Date.now() - time;
      setIsRunning(true);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime(Date.now() - startTimeRef.current);
      }, 10);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const centiseconds = Math.floor((ms % 1000) / 10);

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(centiseconds).padStart(2, "0")}`;
  };

  return (
    <div className="space-y-8 py-4">
      <div className="flex items-center justify-center">
        <div 
          dir="ltr" 
          className="font-mono text-5xl font-black tracking-wider text-[var(--text-main)] sm:text-7xl"
        >
          {formatTime(time)}
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <button
          onClick={toggleTimer}
          className={`flex h-16 w-16 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-105 active:scale-95 ${
            isRunning ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {isRunning ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
        </button>

        <button
          onClick={resetTimer}
          disabled={time === 0}
          className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] text-slate-500 transition hover:bg-white/10 disabled:opacity-50 dark:text-slate-300"
        >
          <RotateCcw className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
