"use client";

import { useState, useEffect } from "react";
import { RefreshCw, TrendingUp, DollarSign, Euro, PoundSterling, Coins } from "lucide-react";

type Rates = {
  USD: number;
  EUR: number;
  GBP: number;
  TRY: number;
};

export default function CurrencyPrice() {
  const [rates, setRates] = useState<Rates | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const fetchPrices = async () => {
    setIsLoading(true);
    setError("");

    try {
      // استفاده از یک API عمومی رایگان برای نرخ ارز
      const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
      if (!response.ok) throw new Error("Failed to fetch");
      
      const data = await response.json();
      
      // در این API، نرخ‌ها بر اساس ۱ دلار هستند. برای اینکه قیمت ریالی/تومانی دربیاد، باید در قیمت دلار ضرب بشن.
      // چون نرخ آزاد تومان در این API نیست، ما یه نرخ پایه فرضی (مثلاً ۶۰,۰۰۰ تومان برای هر دلار) در نظر می‌گیریم تا نمایش واقعی‌تر باشه.
      const tomanBaseRate = 60000; 

      setRates({
        USD: tomanBaseRate,
        EUR: Math.round(tomanBaseRate * data.rates.EUR),
        GBP: Math.round(tomanBaseRate * data.rates.GBP),
        TRY: Math.round(tomanBaseRate * data.rates.TRY),
      });

      setLastUpdated(new Date().toLocaleTimeString("fa-IR"));
    } catch (err) {
      setError("خطا در دریافت اطلاعات. لطفاً اینترنت خود را بررسی کنید.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  const formatPrice = (price: number) => {
    return price.toLocaleString("fa-IR");
  };

  const cards = [
    { title: "دلار آمریکا", key: "USD", icon: DollarSign, color: "text-green-500", bg: "bg-green-500/10" },
    { title: "یورو", key: "EUR", icon: Euro, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "پوند انگلیس", key: "GBP", icon: PoundSterling, color: "text-purple-500", bg: "bg-purple-500/10" },
    { title: "لیر ترکیه", key: "TRY", icon: Coins, color: "text-red-500", bg: "bg-red-500/10" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[var(--text-main)]">نرخ ارز (تومان)</h2>
          {lastUpdated && <p className="text-xs text-slate-500">آخرین آپدیت: {lastUpdated}</p>}
        </div>
        <button
          onClick={fetchPrices}
          disabled={isLoading}
          className="flex items-center gap-2 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] px-4 py-2 text-sm font-bold text-[var(--text-main)] transition hover:bg-white/5 disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          بروزرسانی
        </button>
      </div>

      {error && (
        <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-500 text-center">
          {error}
        </p>
      )}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
        {cards.map((card) => {
          const Icon = card.icon;
          const price = rates ? rates[card.key as keyof Rates] : 0;

          return (
            <div key={card.key} className="flex flex-col justify-between rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5">
              <div className="flex items-center gap-3 mb-4">
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.bg} ${card.color}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-bold text-slate-500 dark:text-slate-300">{card.title}</span>
              </div>
              <div>
                {isLoading ? (
                  <div className="h-8 w-24 animate-pulse rounded-lg bg-white/10"></div>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-[var(--text-main)]">{formatPrice(price)}</span>
                    <span className="text-xs text-slate-500">تومان</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4 text-xs text-slate-500 dark:text-slate-400 leading-6">
        <p>⚠️ توجه: این قیمت‌ها بر اساس نرخ‌های بین‌المللی و یک نرخ پایه تومان محاسبه می‌شوند و ممکن است با نرخ بازار آزاد کمی تفاوت داشته باشند. برای معاملات حتماً از صرافی‌های معتبر استعلام بگیرید.</p>
      </div>
    </div>
  );
}
