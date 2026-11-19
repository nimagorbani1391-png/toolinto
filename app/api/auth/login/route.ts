import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import bcrypt from 'bcryptjs';
import { createSession, SESSION_AGE, SESSION_COOKIE, sessionCookieOptions } from '../../../../lib/auth';
import { isRecord, validEmail, validPassword } from '../../../../lib/validation';

export async function POST(req: Request) {
  try {
    const input: unknown = await req.json().catch(() => null);
    if (!isRecord(input) || !validEmail(input.email) || !validPassword(input.password)) {
      return NextResponse.json({ error: 'ایمیل یا رمز عبور نامعتبر است.' }, { status: 400 });
    }
    const { email, password } = input;

    const user = await prisma.user.findUnique({ where: { email }, select: { id: true, name: true, password: true } });
    if (!user) {
      return NextResponse.json({ error: 'ایمیل یا رمز عبور اشتباه است.' }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: 'ایمیل یا رمز عبور اشتباه است.' }, { status: 401 });
    }

    const token = await createSession(user.id);

    const response = NextResponse.json({ message: 'ورود موفقیت‌آمیز بود.', name: user.name }, { status: 200 });
    response.cookies.set(SESSION_COOKIE, token, { ...sessionCookieOptions, maxAge: SESSION_AGE });

    return response;
  } catch (error) {
    console.error('Login failed', error);
    return NextResponse.json({ error: 'خطای سرور در ورود.' }, { status: 500 });
  }
}
