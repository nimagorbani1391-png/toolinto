import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { prisma } from '../../../../lib/prisma';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'toolinto-super-secret-key-123');

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const { payload } = await jwtVerify(token, JWT_SECRET);
    
    // گرفتن اطلاعات کامل کاربر از دیتابیس برای چک کردن VIP
    const user = await prisma.user.findUnique({ where: { id: payload.userId as string } });
    
    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    return NextResponse.json({ 
      user: { 
        name: user.name || 'کاربر', 
        userId: user.id,
        isVip: user.isVip 
      } 
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
