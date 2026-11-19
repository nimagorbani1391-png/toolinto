import { NextResponse } from 'next/server';
import { SESSION_COOKIE, sessionCookieOptions } from '../../../../lib/auth';

export async function POST() {
  const response = NextResponse.json({ message: 'خروج موفقیت‌آمیز بود.' }, { status: 200 });
  
  response.cookies.set(SESSION_COOKIE, '', { ...sessionCookieOptions, maxAge: 0 });

  return response;
}
