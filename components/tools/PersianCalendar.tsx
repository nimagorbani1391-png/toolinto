"use client";

import { useState, useEffect } from "react";
import { 
  format, 
  addMonths, 
  subMonths, 
  getDaysInMonth, 
  startOfMonth, 
  getDay, 
  parse
} from "date-fns-jalali";
import { ChevronRight, ChevronLeft, Calendar as CalendarIcon, Clock } from "lucide-react";

export default function PersianCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [iranTime, setIranTime] = useState("");
  const [tick, setTick] = useState(0); // برای اجبار به رندر مجدد موقع عوض شدن تاریخ

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      // گرفتن ساعت دقیق ایران
      const timeStr = new Intl.DateTimeFormat("fa-IR", {
        timeZone: "Asia/Tehran",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      }).format(now);
      setIranTime(timeStr);
      
      // یک تیک می‌زنیم که هر ثانیه چک کنه اگه تاریخ عوض شد، تقویم آپدیت بشه
      setTick(prev => prev + 1);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = startOfMonth(currentDate);
  
  // تنظیم روز شروع ماه (شنبه = 0)
  const startingDayOfWeek = (getDay(firstDayOfMonth) + 1) % 7;

  const monthYearTitle = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    month: "long",
    year: "numeric",
  }).format(currentDate);

  const jalaliYear = format(currentDate, "yyyy");
  const jalaliMonth = format(currentDate, "MM");

  // گرفتن تاریخ دقیق امروز ایران به صورت رشته شمسی برای مقایسه
  const iranTodayJalali = new Intl.DateTimeFormat("en-US-u-ca-persian", { 
    year: "numeric", month: "2-digit", day: "2-digit", timeZone: "Asia/Tehran" 
  }).format(new Date()).replace(/\//g, "/"); 

  const emptyDays = Array.from({ length: startingDayOfWeek }, (_, i) => i);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      
      {/* ساعت زنده ایران */}
      <div className="flex items-center justify-center gap-2 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-3">
        <Clock className="h-5 w-5 text-emerald-500 animate-pulse" />
        <span className="font-mono text-lg font-black text-[var(--text-main)]" dir="ltr">
          {iranTime}
        </span>
        <span className="text-xs text-slate-500">(وقت ایران)</span>
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4">
        <button onClick={prevMonth} className="rounded-xl p-2 text-slate-500 hover:bg-white/5 transition">
          <ChevronRight className="h-6 w-6" />
        </button>
        <div className="flex items-center gap-2 text-lg font-black text-[var(--text-main)]">
          <CalendarIcon className="h-5 w-5 text-violet-500" />
          {monthYearTitle}
        </div>
        <button onClick={nextMonth} className="rounded-xl p-2 text-slate-500 hover:bg-white/5 transition">
          <ChevronLeft className="h-6 w-6" />
        </button>
      </div>

      <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4">
        <div className="grid grid-cols-7 gap-1">
          {emptyDays.map((i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}

          {days.map((day) => {
            const dateObj = parse(`${jalaliYear}/${jalaliMonth}/${day}`, "yyyy/MM/dd", new Date());
            const dayJalaliStr = format(dateObj, "yyyy/MM/dd");
            const isTodayDate = iranTodayJalali === dayJalaliStr;

            return (
              <div
                key={day}
                className={`flex aspect-square items-center justify-center rounded-xl text-sm font-medium transition-all ${
                  isTodayDate
                    ? "brand-gradient text-white shadow-lg font-black scale-110"
                    : "text-[var(--text-main)] hover:bg-white/10"
                }`}
              >
                {day.toLocaleString("fa-IR")}
              </div>
            );
          })}
        </div>
      </div>
      
      <p className="text-center text-xs text-slate-500">
        امروز: {new Intl.DateTimeFormat("fa-IR-u-ca-persian", { dateStyle: "full", timeZone: "Asia/Tehran" }).format(new Date())}
      </p>
    </div>
  );
}
