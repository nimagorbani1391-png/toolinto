import { NextRequest, NextResponse } from 'next/server';
import { EdgeTTS } from '@travisvn/edge-tts';

export const runtime = 'nodejs'; // یا 'edge' اگر مطمئنی که کتابخانه پشتیبانی می‌کنه

export async function POST(req: NextRequest) {
  try {
    const { text, voice } = await req.json();

    if (!text || text.length > 5000) {
      return NextResponse.json({ error: 'متن نامعتبر است یا بیش از حد طولانی است.' }, { status: 400 });
    }

    // انتخاب صدای فارسی (پیش‌فرض: زنانه)
    const selectedVoice = voice || 'fa-IR-DilaraNeural';

    const tts = new EdgeTTS(text, selectedVoice);
    const result = await tts.synthesize();
    const audioBuffer = Buffer.from(await result.audio.arrayBuffer());

    // برگردوندن فایل صوتی به عنوان پاسخ برای دانلود
    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Disposition': 'attachment; filename="toolinto-speech.mp3"',
        'Content-Length': audioBuffer.length.toString(),
      },
    });

  } catch (error) {
    console.error('TTS Error:', error);
    return NextResponse.json({ error: 'خطا در تولید صدا. لطفاً دوباره تلاش کنید.' }, { status: 500 });
  }
}
