import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { text, from, to } = await req.json();

    if (!text || !text.trim()) {
      return NextResponse.json({ error: 'متنی برای ترجمه وارد نشده است.' }, { status: 400 });
    }

    // استفاده از API رایگان MyMemory
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (data.responseStatus === 200) {
      return NextResponse.json({ translatedText: data.responseData.translatedText });
    } else {
      return NextResponse.json({ error: 'خطا در ترجمه متن.' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'خطای سرور در ارتباط با سرویس ترجمه.' }, { status: 500 });
  }
}
