"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, RotateCcw, Trophy } from "lucide-react";

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const CANVAS_SIZE = GRID_SIZE * CELL_SIZE;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIR = { x: 0, y: -1 };
const SPEED = 120; // میلی‌ثانیه

type Point = { x: number; y: number };

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  // استفاده از useRef برای جلوگیری از باگ‌های دوباره‌رندر شدن در گیم‌لوپ
  const snakeRef = useRef<Point[]>(INITIAL_SNAKE);
  const dirRef = useRef<Point>(INITIAL_DIR);
  const nextDirRef = useRef<Point>(INITIAL_DIR);
  const appleRef = useRef<Point>({ x: 5, y: 5 });
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const generateApple = useCallback(() => {
    let newApple: Point;
    let isOccupied = true;
    
    while (isOccupied) {
      newApple = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      // چک کردن اینکه سیب روی بدن مار نیفته
      isOccupied = snakeRef.current.some((segment) => segment.x === newApple.x && segment.y === newApple.y);
    }
    
    appleRef.current = newApple;
  }, []);

  const drawGame = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // پاک کردن صفحه
    ctx.fillStyle = "#09090b"; // رنگ پس‌زمینه تیره
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // کشیدن دیوار قرمز دور بازی
    ctx.strokeStyle = "#ef4444"; // قرمز
    ctx.lineWidth = 4;
    ctx.strokeRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // کشیدن سیب
    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    const appleCenterX = appleRef.current.x * CELL_SIZE + CELL_SIZE / 2;
    const appleCenterY = appleRef.current.y * CELL_SIZE + CELL_SIZE / 2;
    ctx.arc(appleCenterX, appleCenterY, CELL_SIZE / 2 - 2, 0, Math.PI * 2);
    ctx.fill();

    // کشیدن مار
    snakeRef.current.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? "#8b5cf6" : "#a78bfa"; // سر مار تیره‌تر
      ctx.fillRect(
        segment.x * CELL_SIZE + 1,
        segment.y * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2
      );
    });
  }, []);

  const updateGame = useCallback(() => {
    if (isGameOver || !isStarted) return;

    const snake = snakeRef.current;
    const dir = nextDirRef.current;
    dirRef.current = dir; // آپدیت جهت فعلی

    const head = { ...snake[0] };
    head.x += dir.x;
    head.y += dir.y;

    // چک کردن برخورد با دیوار (قرمز)
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      setIsGameOver(true);
      return;
    }

    // چک کردن برخورد با بدن خودش
    if (snake.some((segment) => segment.x === head.x && segment.y === head.y)) {
      setIsGameOver(true);
      return;
    }

    const newSnake = [head, ...snake];

    // چک کردن خوردن سیب
    if (head.x === appleRef.current.x && head.y === appleRef.current.y) {
      setScore((s) => s + 10);
      generateApple();
    } else {
      newSnake.pop(); // اگه سیب نخورد، دنباله رو حذف کن
    }

    snakeRef.current = newSnake;
    drawGame();
  }, [isGameOver, isStarted, drawGame, generateApple]);

  const startGame = () => {
    snakeRef.current = INITIAL_SNAKE;
    dirRef.current = INITIAL_DIR;
    nextDirRef.current = INITIAL_DIR;
    setScore(0);
    setIsGameOver(false);
    setIsStarted(true);
    generateApple();
    drawGame();
  };

  useEffect(() => {
    // لود کردن رکورد
    const savedHighScore = localStorage.getItem("snake_high_score");
    if (savedHighScore) setHighScore(Number(savedHighScore));
    
    drawGame(); // رسم اولیه

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [drawGame]);

  useEffect(() => {
    if (isStarted && !isGameOver) {
      gameLoopRef.current = setInterval(updateGame, SPEED);
    } else {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    }
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [isStarted, isGameOver, updateGame]);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("snake_high_score", score.toString());
    }
  }, [score, highScore]);

  const handleDirection = (newDir: Point) => {
    // جلوگیری از حرکت در جهت مخالف
    const currentDir = dirRef.current;
    if (currentDir.x === -newDir.x && currentDir.y === -newDir.y) return;
    nextDirRef.current = newDir;
  };

  // کنترل لمسی با Swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const touchEnd = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
    };

    const dx = touchEnd.x - touchStartRef.current.x;
    const dy = touchEnd.y - touchStartRef.current.y;

    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 30) handleDirection({ x: 1, y: 0 }); // راست
      else if (dx < -30) handleDirection({ x: -1, y: 0 }); // چپ
    } else {
      if (dy > 30) handleDirection({ x: 0, y: 1 }); // پایین
      else if (dy < -30) handleDirection({ x: 0, y: -1 }); // بالا
    }

    touchStartRef.current = null;
  };

  return (
    <div className="flex flex-col items-center gap-6 py-4 select-none">
      
      {/* امتیازات */}
      <div className="flex w-full max-w-[400px] items-center justify-between rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4">
        <div className="text-center">
          <p className="text-xs text-slate-500">امتیاز شما</p>
          <p className="text-2xl font-black text-violet-500">{score}</p>
        </div>
        <div className="text-center flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <div>
            <p className="text-xs text-slate-500">رکورد</p>
            <p className="text-xl font-bold text-[var(--text-main)]">{highScore}</p>
          </div>
        </div>
      </div>

      {/* صفحه بازی */}
      <div 
        className="relative overflow-hidden rounded-xl border border-slate-800 shadow-2xl touch-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          className="bg-[#09090b]"
        />

        {/* صفحه شروع یا باخت */}
        {(!isStarted || isGameOver) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
            {isGameOver ? (
              <>
                <h2 className="text-3xl font-black text-red-500 mb-2">Game Over!</h2>
                <p className="text-white mb-6">امتیاز شما: {score}</p>
              </>
            ) : (
              <h2 className="text-2xl font-black text-white mb-6">بازی مار</h2>
            )}
            
            <button
              onClick={startGame}
              className="brand-gradient flex items-center gap-2 rounded-xl px-8 py-3 font-bold text-white shadow-lg transition hover:brightness-110"
            >
              <RotateCcw className="h-5 w-5" />
              {isGameOver ? "تلاش مجدد" : "شروع بازی"}
            </button>
            
            <p className="mt-4 text-xs text-slate-400 px-4 text-center">
              با کشیدن انگشت روی صفحه (Swipe) مار را حرکت دهید.
            </p>
          </div>
        )}
      </div>

      {/* دکمه‌های کنترل لمسی */}
      <div className="grid grid-cols-3 gap-2 w-full max-w-[250px]">
        <div />
        <button onClick={() => handleDirection({ x: 0, y: -1 })} className="flex aspect-square items-center justify-center rounded-xl bg-slate-800 text-white active:bg-violet-600 transition">
          <ArrowUp className="h-8 w-8" />
        </button>
        <div />
        <button onClick={() => handleDirection({ x: -1, y: 0 })} className="flex aspect-square items-center justify-center rounded-xl bg-slate-800 text-white active:bg-violet-600 transition">
          <ArrowLeft className="h-8 w-8" />
        </button>
        <button onClick={() => handleDirection({ x: 0, y: 1 })} className="flex aspect-square items-center justify-center rounded-xl bg-slate-800 text-white active:bg-violet-600 transition">
          <ArrowDown className="h-8 w-8" />
        </button>
        <button onClick={() => handleDirection({ x: 1, y: 0 })} className="flex aspect-square items-center justify-center rounded-xl bg-slate-800 text-white active:bg-violet-600 transition">
          <ArrowRight className="h-8 w-8" />
        </button>
      </div>
    </div>
  );
  }
