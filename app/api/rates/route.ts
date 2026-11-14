import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  try {
    // گرفتن نرخ‌های بین‌المللی از یک API بسیار پایدار
    const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD', { next: { revalidate: 3600 } });
    const data = await res.json();

    // چون APIهای رایگان ایرانی محدودیت دارن، از نرخ پایه تومان استفاده می‌کنیم
    // اگر API ایرانی وصل شد، این عدد جایگزین میشه
    const baseToman = 269840; 

    // محاسبه قیمت‌ها بر اساس نرخ دلار
    const usd = baseToman;
    const eur = Math.round(baseToman * data.rates.EUR);
    const gbp = Math.round(baseToman * data.rates.GBP);
    const tryRate = Math.round(baseToman * data.rates.TRY);
    
    // قیمت تقریبی طلای ۱۸ عیار
    const gold18 = 25000000;

    return NextResponse.json({
      usd,
      eur,
      gbp,
      try: tryRate,
      gold18,
      updatedAt: new Date().toLocaleTimeString("fa-IR")
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
