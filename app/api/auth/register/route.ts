import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'ایمیل و رمز عبور الزامی است.' }, { status: 400 });
    }

    // چک کردن اینکه کاربر قبلا ثبت‌نام نکرده باشه
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'این ایمیل قبلاً ثبت‌نام کرده است.' }, { status: 400 });
    }

    // رمزنگاری پسورد
    const hashedPassword = await bcrypt.hash(password, 10);

    // ذخیره در دیتابیس
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return NextResponse.json({ message: 'ثبت‌نام با موفقیت انجام شد.', userId: user.id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'خطای سرور در ثبت‌نام.' }, { status: 500 });
  }
}
