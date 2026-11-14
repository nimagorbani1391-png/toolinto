"use client";

import { useState, useRef, useEffect } from "react";
import { Play, RotateCcw } from "lucide-react";

const COLORS = [
  "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#ec4899", "#6366f1", "#14b8a6"
];

export default function WheelOfFortune() {
  const [optionsText, setOptionsText] = useState("پیتزا\nکباب\nفست فود\nخونه");
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // استخراج گزینه‌ها از متن
  const options = optionsText.split("\n").map(o => o.trim()).filter(Boolean);
  const numOptions = options.length;

  // رسم گردونه روی Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // تنظیم سایز دقیق برای رتینا دیسپلی
    const size = 300;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - 10;
    const sliceAngle = (2 * Math.PI) / numOptions;

    ctx.clearRect(0, 0, size, size);

    if (numOptions === 0) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = "#1f2937";
      ctx.fill();
      ctx.fillStyle = "#6b7280";
      ctx.font = "16px Vazirmatn";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("گزینه‌ای اضافه کنید", centerX, centerY);
      return;
    }

    for (let i = 0; i < numOptions; i++) {
      const startAngle = i * sliceAngle;
      const endAngle = startAngle + sliceAngle;

      // رسم برش
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.fillStyle = COLORS[i % COLORS.length];
      ctx.fill();
      ctx.strokeStyle = "#09090b"; // خط جداکننده
      ctx.lineWidth = 2;
      ctx.stroke();

      // نوشتن متن روی برش
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 16px Vazirmatn";
      ctx.fillText(options[i], radius - 20, 0);
      ctx.restore();
    }
  }, [options, numOptions]);

  const spinWheel = () => {
    if (isSpinning || numOptions < 2) return;
    
    setIsSpinning(true);
    setResult(null);

    // محاسبه یک زاویه کاملاً تصادفی (بین ۵ تا ۱۰ دور کامل)
    const randomSpins = 5 + Math.random() * 5;
    const randomDegree = Math.floor(Math.random() * 360);
    const newRotation = rotation + (randomSpins * 360) + randomDegree;
    
    setRotation(newRotation);

    // بعد از پایان انیمیشن، برنده رو محاسبه کن
    setTimeout(() => {
      // محاسبه اینکه کدوم گزینه زیر اشاره‌گر (بالا) قرار گرفته
      // چون گردونه ساعتگرد می‌چرخه، زاویه رو نرمال‌سازی می‌کنیم
      const normalizedRotation = newRotation % 360;
      const sliceAngle = 360 / numOptions;
      
      // اشاره‌گر در زاویه ۰ (بالا) قرار داره. 
      // با چرخش، برنده از سمت راست شروع میشه و به سمت پایین میره
      let winningIndex = Math.floor((360 - normalizedRotation) / sliceAngle) % numOptions;
      
      setResult(options[winningIndex]);
      setIsSpinning(false);
    }, 4000); // ۴ ثانیه انیمیشن
  };

  return (
    <div className="flex flex-col items-center gap-8 py-4">
      {/* بخش ورودی گزینه‌ها */}
      <div className="w-full max-w-md">
        <label className="mb-2 block text-sm text-slate-500 dark:text-slate-300">
          گزینه‌ها (هر خط یک گزینه)
        </label>
        <textarea
          rows={4}
          value={optionsText}
          onChange={(e) => {
            setOptionsText(e.target.value);
            setResult(null);
          }}
          disabled={isSpinning}
          className="w-full resize-none rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] px-4 py-3 text-[var(--text-main)] outline-none focus:border-violet-400 disabled:opacity-50"
        />
      </div>

      {/* گردونه و اشاره‌گر */}
      <div className="relative flex h-[340px] w-[340px] items-center justify-center">
        {/* اشاره‌گر بالای گردونه */}
        <div className="absolute -top-2 z-10 h-10 w-10 drop-shadow-lg" style={{ clipPath: "polygon(50% 100%, 0 0, 100% 0)", backgroundColor: "#f59e0b" }} />
        
        {/* بدنه گردونه */}
        <div 
          className="relative flex h-full w-full items-center justify-center rounded-full border-4 border-[var(--card-border)] shadow-2xl transition-transform duration-[4000ms] ease-[cubic-bezier(0.25,0.1,0.15,1)]"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <canvas ref={canvasRef} className="rounded-full" />
        </div>
      </div>

      {/* دکمه چرخش */}
      <button
        onClick={spinWheel}
        disabled={isSpinning || numOptions < 2}
        className="brand-gradient flex w-full max-w-md items-center justify-center gap-2 rounded-xl px-6 py-4 font-black text-white shadow-lg transition hover:brightness-110 disabled:opacity-50"
      >
        {isSpinning ? <RotateCcw className="h-6 w-6 animate-spin" /> : <Play className="h-6 w-6" />}
        {isSpinning ? "در حال چرخش..." : "بچرخون!"}
      </button>

      {/* نمایش نتیجه */}
      {result && !isSpinning && (
        <div className="animate-in fade-in zoom-in rounded-2xl border border-green-500/30 bg-green-500/10 p-6 text-center w-full max-w-md">
          <p className="text-sm text-slate-500 dark:text-slate-400">نتیجه قرعه‌کشی</p>
          <p className="mt-2 text-3xl font-black text-green-500">{result}</p>
        </div>
      )}
    </div>
  );
        }
