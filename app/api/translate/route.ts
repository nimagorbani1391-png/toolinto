import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { text, from, to } = await req.json();

    if (!text || !text.trim()) {
      return NextResponse.json({ error: 'متنی برای ترجمه وارد نشده است.' }, { status: 400 });
    }

    // استفاده از API غیررسمی گوگل ترنسلیت (رایگان و بدون کلید)
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;
    
    const response = await fetch(url);
    const data = await response.json();

    // ساختار خروجی گوگل یک آرایه پیچیده است، اینطوری متن نهایی رو درمیاریم
    if (data && data[0]) {
      const translatedText = data[0].map((item: any) => item[0]).join('');
      return NextResponse.json({ translatedText });
    } else {
      return NextResponse.json({ error: 'خطا در ترجمه متن.' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'خطای سرور در ارتباط با سرویس ترجمه.' }, { status: 500 });
  }
}
