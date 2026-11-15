"use client";

import { useState, useEffect } from "react";
import { RotateCcw, Trophy, MousePointerClick } from "lucide-react";

const EMOJIS = ["🍎", "🍌", "🍇", "🍉", "🍓", "🍒", "🍑", "🥝"];

type Card = {
  id: number;
  icon: string;
  isFlipped: boolean;
  isMatched: boolean;
};

export default function MemoryTest() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [isWon, setIsWon] = useState(false);

  // تابع شروع بازی و قاطی کردن رندوم کارت‌ها
  const startGame = () => {
    // کپی کردن ایموجی‌ها برای ساخت جفت‌ها
    const deck = [...EMOJIS, ...EMOJIS];
    
    // الگوریتم Fisher-Yates برای قاطی کردن کاملاً رندوم
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    const newCards = deck.map((icon, index) => ({
      id: index,
      icon,
      isFlipped: false,
      isMatched: false,
    }));

    setCards(newCards);
    setFlippedIndices([]);
    setMoves(0);
    setMatches(0);
    setIsLocked(false);
    setIsWon(false);
  };

  // شروع بازی در اولین بارگذاری
  useEffect(() => {
    startGame();
  }, []);

  // چک کردن برد
  useEffect(() => {
    if (matches > 0 && matches === EMOJIS.length) {
      setIsWon(true);
    }
  }, [matches]);

  const handleCardClick = (index: number) => {
    if (isLocked || cards[index].isFlipped || cards[index].isMatched) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    if (flippedIndices.length === 1) {
      const firstIndex = flippedIndices[0];
      setFlippedIndices([firstIndex, index]);
      setIsLocked(true);

      if (cards[firstIndex].icon === cards[index].icon) {
        // اگر جفت بودند
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[firstIndex].isMatched = true;
          matchedCards[index].isMatched = true;
          setCards(matchedCards);
          setFlippedIndices([]);
          setIsLocked(false);
          setMatches((prev) => prev + 1);
        }, 500);
      } else {
        // اگر جفت نبودند
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[firstIndex].isFlipped = false;
          resetCards[index].isFlipped = false;
          setCards(resetCards);
          setFlippedIndices([]);
          setIsLocked(false);
          setMoves((prev) => prev + 1);
        }, 1000);
      }
    } else {
      setFlippedIndices([index]);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 py-4">
      {/* نوار وضعیت */}
      <div className="flex w-full max-w-md items-center justify-between rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4">
        <div className="text-center">
          <p className="text-xs text-slate-500">حرکت‌ها</p>
          <p className="text-xl font-black text-violet-500">{moves}</p>
        </div>
        <button
          onClick={startGame}
          className="flex items-center gap-2 rounded-xl bg-violet-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-violet-600"
        >
          <RotateCcw className="h-4 w-4" />
          شروع مجدد
        </button>
        <div className="text-center">
          <p className="text-xs text-slate-500">جفت‌ها</p>
          <p className="text-xl font-black text-green-500">{matches} / {EMOJIS.length}</p>
        </div>
      </div>

      {/* صفحه بازی */}
      <div className="relative w-full max-w-md">
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {cards.map((card, index) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(index)}
              disabled={isLocked || card.isMatched}
              className={`relative flex aspect-square items-center justify-center rounded-xl text-3xl sm:text-4xl transition-all duration-300 ${
                card.isFlipped || card.isMatched
                  ? "bg-violet-500/20 border-2 border-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                  : "bg-slate-800 border-2 border-slate-700 hover:bg-slate-700 cursor-pointer"
              } ${card.isMatched ? "opacity-50" : "opacity-100"}`}
            >
              {card.isFlipped || card.isMatched ? (
                <span className="animate-in zoom-in duration-300">{card.icon}</span>
              ) : (
                <MousePointerClick className="h-6 w-6 text-slate-600" />
              )}
            </button>
          ))}
        </div>

        {/* پیام برد */}
        {isWon && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-xl bg-black/80 backdrop-blur-sm animate-in fade-in zoom-in">
            <Trophy className="h-16 w-16 text-yellow-500 mb-4 animate-bounce" />
            <h2 className="text-2xl font-black text-white mb-2">آفرین! بردی</h2>
            <p className="text-slate-300 mb-6">تو {moves} حرکت تونستی همه رو پیدا کنی.</p>
            <button
              onClick={startGame}
              className="brand-gradient rounded-xl px-8 py-3 font-bold text-white shadow-lg transition hover:brightness-110"
            >
              دوباره بازی کن
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
