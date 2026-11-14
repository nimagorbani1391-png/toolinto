import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'خروج موفقیت‌آمیز بود.' }, { status: 200 });
  
  // پاک کردن کوکی با ست کردن زمان انقضا به گذشته
  response.cookies.set('auth_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  });

  return response;
}
