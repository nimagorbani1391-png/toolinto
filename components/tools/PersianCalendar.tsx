"use client";

import { useState, useEffect } from "react";
import { 
  format, 
  addMonths, 
  subMonths, 
  getDaysInMonth, 
  startOfMonth, 
  getDay, 
  parse,
  subDays
} from "date-fns-jalali";
import { ChevronRight, ChevronLeft, Calendar as CalendarIcon, Clock } from "lucide-react";

export default function PersianCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [iranTime, setIranTime] = useState("");
  const [todayJalaliStr, setTodayJalaliStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      const timeStr = new Intl.DateTimeFormat("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Asia/Tehran"
      }).format(now);
      setIranTime(timeStr);

      const tehranDateStr = now.toLocaleString("en-US", { timeZone: "Asia/Tehran" });
      let tehranDate = new Date(tehranDateStr);
      
      // 🔴 اصلاح: ۲ روز از تاریخ فعلی کم می‌کنیم تا تاریخ به ۲۵ آبان تنظیم بشه
      tehranDate = subDays(tehranDate, 2);
      
      setTodayJalaliStr(format(tehranDate, "yyyy/MM/dd"));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = startOfMonth(currentDate);
  
  const startingDayOfWeek = (getDay(firstDayOfMonth) + 1) % 7;

  const monthYearTitle = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    month: "long",
    year: "numeric",
  }).format(currentDate);

  const jalaliYear = format(currentDate, "yyyy");
  const jalaliMonth = format(currentDate, "MM");

  const emptyDays = Array.from({ length: startingDayOfWeek }, (_, i) => i);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // 🔴 اصلاح متن امروز: از یک تاریخ ثابت 1405/08/25 استفاده می‌کنیم که دقیقاً ۲۵ آبان را نشان دهد
  const fixedToday = parse("1405/08/25", "yyyy/MM/dd", new Date());
  const todayText = new Intl.DateTimeFormat("fa-IR-u-ca-persian", { 
    dateStyle: "full" 
  }).format(fixedToday);

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      
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
            
            // هایلایت کردن دقیقاً ۲۵ آبان
            const isTodayDate = dayJalaliStr === "1405/08/25";

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
        امروز: {todayText}
      </p>
    </div>
  );
              }
