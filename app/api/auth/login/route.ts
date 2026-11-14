import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'toolinto-super-secret-key-123');

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // پیدا کردن کاربر
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: 'ایمیل یا رمز عبور اشتباه است.' }, { status: 401 });
    }

    // چک کردن پسورد
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: 'ایمیل یا رمز عبور اشتباه است.' }, { status: 401 });
    }

    // ساخت توکن ورود
    const token = await new SignJWT({ userId: user.id, name: user.name })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(JWT_SECRET);

    // ذخیره توکن در کوکی امن
    const response = NextResponse.json({ message: 'ورود موفقیت‌آمیز بود.', name: user.name }, { status: 200 });
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // ۷ روز
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'خطای سرور در ورود.' }, { status: 500 });
  }
}
