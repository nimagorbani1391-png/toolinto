import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import bcrypt from 'bcryptjs';
import { Prisma } from '@prisma/client';
import { isRecord, validEmail, validPassword } from '../../../../lib/validation';

export async function POST(req: Request) {
  try {
    const input: unknown = await req.json().catch(() => null);
    if (!isRecord(input) || !validEmail(input.email) || !validPassword(input.password, 8) ||
        (input.name !== undefined && (typeof input.name !== 'string' || input.name.length > 100))) {
      return NextResponse.json({ error: 'ایمیل معتبر و رمز عبور ۸ تا ۷۲ بایتی لازم است.' }, { status: 400 });
    }
    const { name, email, password } = input;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name: typeof name === 'string' ? name.trim() || null : null, email, password: hashedPassword },
      select: { id: true },
    });

    return NextResponse.json({ message: 'ثبت‌نام با موفقیت انجام شد.', userId: user.id }, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return NextResponse.json({ error: 'این ایمیل قبلاً ثبت‌نام کرده است.' }, { status: 409 });
    }
    console.error('Registration failed', error);
    return NextResponse.json({ error: 'خطای سرور در ثبت‌نام.' }, { status: 500 });
  }
}
