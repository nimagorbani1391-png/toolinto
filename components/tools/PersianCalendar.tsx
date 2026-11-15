"use client";

import { useState } from "react";
import { 
  format, 
  addMonths, 
  subMonths, 
  getDaysInMonth, 
  startOfMonth, 
  getDay, 
  isToday,
  parse
} from "date-fns-jalali";
import { ChevronRight, ChevronLeft, Calendar as CalendarIcon } from "lucide-react";

const WEEKDAYS = ["شنبه", "یک‌شنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه"];

export default function PersianCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = startOfMonth(currentDate);
  
  // محاسبه دقیق روز شروع هفته (شنبه = 0)
  const startingDayOfWeek = (getDay(firstDayOfMonth) + 1) % 7;

  const monthYearTitle = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    month: "long",
    year: "numeric",
  }).format(currentDate);

  // استخراج سال و ماه شمسی برای ساخت دقیق تاریخ هر روز
  const jalaliYear = format(currentDate, "yyyy");
  const jalaliMonth = format(currentDate, "MM");

  const emptyDays = Array.from({ length: startingDayOfWeek }, (_, i) => i);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
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
        <div className="mb-2 grid grid-cols-7 text-center">
          {WEEKDAYS.map((day) => (
            <div key={day} className="py-2 text-xs font-bold text-slate-500 dark:text-slate-400">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {emptyDays.map((i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}

          {days.map((day) => {
            // ساخت تاریخ شمسی دقیق برای هر روز جهت چک کردن isToday
            const dateObj = parse(`${jalaliYear}/${jalaliMonth}/${day}`, "yyyy/MM/dd", new Date());
            const isTodayDate = isToday(dateObj);

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
        امروز: {new Intl.DateTimeFormat("fa-IR-u-ca-persian", { dateStyle: "full" }).format(new Date())}
      </p>
    </div>
  );
}
