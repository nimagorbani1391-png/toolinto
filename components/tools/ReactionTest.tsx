"use client";

import { useState, useRef } from "react";
import { Zap, RotateCcw, AlertTriangle } from "lucide-react";

type GameState = "idle" | "waiting" | "ready" | "result" | "tooEarly";

export default function ReactionTest() {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [reactionTime, setReactionTime] = useState<number>(0);
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const handleStart = () => {
    setGameState("waiting");
    
    // تولید زمان رندوم بین 1.5 تا 4.5 ثانیه
    const randomDelay = Math.floor(Math.random() * 3000) + 1500;
    
    timeoutRef.current = setTimeout(() => {
      setGameState("ready");
      startTimeRef.current = performance.now();
    }, randomDelay);
  };

  const handleClick = () => {
    if (gameState === "idle" || gameState === "result" || gameState === "tooEarly") {
      handleStart();
    } else if (gameState === "waiting") {
      // کاربر زودتر کلیک کرده
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setGameState("tooEarly");
    } else if (gameState === "ready") {
      // محاسبه زمان واکنش
      const endTime = performance.now();
      const time = Math.round(endTime - startTimeRef.current);
      setReactionTime(time);
      setGameState("result");
    }
  };

  const getBackgroundColor = () => {
    switch (gameState) {
      case "idle": return "bg-slate-800";
      case "waiting": return "bg-red-500";
      case "ready": return "bg-green-500";
      case "result": return "bg-violet-600";
      case "tooEarly": return "bg-orange-500";
      default: return "bg-slate-800";
    }
  };

  const getContent = () => {
    switch (gameState) {
      case "idle":
        return (
          <div className="flex flex-col items-center gap-3 animate-in fade-in">
            <Zap className="h-12 w-12 text-slate-300 mb-2" />
            <h2 className="text-2xl font-black text-white">تست سرعت واکنش</h2>
            <p className="text-slate-300">برای شروع کلیک کنید</p>
          </div>
        );
      case "waiting":
        return (
          <div className="flex flex-col items-center gap-3">
            <h2 className="text-2xl font-black text-white">منتظر سبز شدن باش...</h2>
            <p className="text-white/80">وقتی صفحه سبز شد، سریع کلیک کن!</p>
          </div>
        );
      case "ready":
        return (
          <div className="flex flex-col items-center gap-3 animate-in zoom-in">
            <h2 className="text-4xl font-black text-white">بزن!</h2>
          </div>
        );
      case "result":
        return (
          <div className="flex flex-col items-center gap-3 animate-in slide-in-from-bottom-4">
            <h2 className="text-5xl font-black text-white">{reactionTime} <span className="text-2xl">ms</span></h2>
            <p className="text-white/80 font-bold mt-2">برای تلاش مجدد کلیک کنید</p>
          </div>
        );
      case "tooEarly":
        return (
          <div className="flex flex-col items-center gap-3 animate-in shake">
            <AlertTriangle className="h-12 w-12 text-white mb-2" />
            <h2 className="text-2xl font-black text-white">خیلی زود بود!</h2>
            <p className="text-white/80">صبر کن تا سبز بشه.</p>
            <p className="text-white/80 font-bold mt-2">برای تلاش مجدد کلیک کنید</p>
          </div>
        );
    }
  };

  return (
    <div className="w-full max-w-md mx-auto py-8">
      <div 
        onClick={handleClick}
        className={`flex aspect-square cursor-pointer select-none flex-col items-center justify-center rounded-3xl p-6 text-center shadow-2xl transition-colors duration-200 ${getBackgroundColor()}`}
      >
        {getContent()}
      </div>
      <p className="text-center text-xs text-slate-500 mt-6">
        نکته: میانگین سرعت واکنش انسان حدود ۲۵۰ میلی‌ثانیه است. ببینیم تو چقدر سریعی!
      </p>
    </div>
  );
}
