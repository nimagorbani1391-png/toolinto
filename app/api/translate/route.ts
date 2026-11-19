import { NextResponse } from "next/server";
import { translationInput } from "../../../lib/validation";

export async function POST(req: Request) {
  const input = translationInput(await req.json().catch(() => null));
  if (!input) {
    return NextResponse.json({ error: "زبان نامعتبر است یا متن بیش از ۱۰۰۰ نویسه است." }, { status: 400 });
  }
  const params = new URLSearchParams({ client: "gtx", sl: input.from, tl: input.to, dt: "t", q: input.text });
  try {
    const response = await fetch(`https://translate.googleapis.com/translate_a/single?${params}`, {
      signal: AbortSignal.timeout(8000), cache: "no-store",
    });
    if (!response.ok) throw new Error("Translation service unavailable");
    const data: unknown = await response.json();
    if (!Array.isArray(data) || !Array.isArray(data[0])) throw new Error("Invalid translation");
    const translatedText = data[0].flatMap((item: unknown) =>
      Array.isArray(item) && typeof item[0] === "string" ? [item[0]] : [],
    ).join("");
    if (!translatedText) throw new Error("Empty translation");
    return NextResponse.json({ translatedText });
  } catch {
    return NextResponse.json({ error: "سرویس ترجمه پاسخ نداد. دوباره تلاش کنید." }, { status: 502 });
  }
}
