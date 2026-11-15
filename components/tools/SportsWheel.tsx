"use client";

import { useState, useRef, useEffect } from "react";
import { Play, RotateCcw, Dumbbell } from "lucide-react";

const COLORS = [
  "#f43f5e", "#ec4899", "#d946ef", "#a855f7", "#8b5cf6", 
  "#6366f1", "#3b82f6", "#0ea5e9", "#06b6d4", "#14b8a6"
];

const CHALLENGES = [
  "۱۰ شنا", 
  "۳۰ ثانیه پلانک", 
  "۲۰ اسکات", 
  "۱۰ بورپی", 
  "۲۰ پرش",
  "۱۵ ثانیه دیوار", 
  "۱۰ لانژ", 
  "۳۰ ثانیه زانو بالا", 
  "۱۵ دراز نشست", 
  "۲۰ ثانیه کوهنوردی"
];

export default function SportsWheel() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const numOptions = CHALLENGES.length;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 300;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - 10;

    ctx.clearRect(0, 0, size, size);
    const sliceAngle = (2 * Math.PI) / numOptions;

    for (let i = 0; i < numOptions; i++) {
      const startAngle = i * sliceAngle;
      const endAngle = startAngle + sliceAngle;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.fillStyle = COLORS[i % COLORS.length];
      ctx.fill();
      ctx.strokeStyle = "#09090b";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 12px Vazirmatn";
      
      let text = CHALLENGES[i];
      ctx.fillText(text, radius - 15, 0);
      ctx.restore();
    }
  }, [numOptions]);

  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setResult(null);

    const randomSpins = 5 + Math.random() * 5;
    const randomDegree = Math.floor(Math.random() * 360);
    const newRotation = rotation + (randomSpins * 360) + randomDegree;
    
    setRotation(newRotation);

    setTimeout(() => {
      const normalizedRotation = newRotation % 360;
      const sliceAngle = 360 / numOptions;
      
      let winningIndex = Math.floor((360 - normalizedRotation) / sliceAngle) % numOptions;
      
      setResult(CHALLENGES[winningIndex]);
      setIsSpinning(false);
    }, 4000);
  };

  return (
    <div className="flex flex-col items-center gap-8 py-4">
      <div className="relative flex h-[340px] w-[340px] items-center justify-center">
        <div className="absolute -top-2 z-10 h-10 w-10 drop-shadow-lg" style={{ clipPath: "polygon(50% 100%, 0 0, 100% 0)", backgroundColor: "#f59e0b" }} />
        
        <div 
          className="relative flex h-full w-full items-center justify-center rounded-full border-4 border-[var(--card-border)] shadow-2xl transition-transform duration-[4000ms] ease-[cubic-bezier(0.25,0.1,0.15,1)]"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <canvas ref={canvasRef} className="rounded-full" />
        </div>
      </div>

      <button
        onClick={spinWheel}
        disabled={isSpinning}
        className="flex w-full max-w-md items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4 font-black text-white shadow-lg transition hover:brightness-110 disabled:opacity-50"
      >
        {isSpinning ? <RotateCcw className="h-6 w-6 animate-spin" /> : <Play className="h-6 w-6" />}
        {isSpinning ? "در حال چرخش..." : "چالش رو بچرخون!"}
      </button>

      {result && !isSpinning && (
        <div className="animate-in fade-in zoom-in rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center w-full max-w-md">
          <Dumbbell className="mx-auto h-10 w-10 text-emerald-500 mb-2" />
          <p className="text-sm text-slate-500 dark:text-slate-400">چالش شما این است</p>
          <p className="mt-2 text-3xl font-black text-emerald-500">{result}</p>
        </div>
      )}
    </div>
  );
        }
