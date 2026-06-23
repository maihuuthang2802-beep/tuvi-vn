import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const password = typeof body.password === 'string' ? body.password : '';
  const name = typeof body.name === 'string' ? body.name.trim() : undefined;

  if (!email.includes('@')) {
    return NextResponse.json({ error: 'Email không hợp lệ' }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ error: 'Mật khẩu cần ít nhất 8 ký tự' }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: 'Email đã được đăng ký' }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { email, passwordHash, name },
  });

  return NextResponse.json({ user: { id: user.id, email: user.email, name: user.name } });
}
