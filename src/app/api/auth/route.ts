import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const email = typeof body.email === 'string' ? body.email : '';

  if (!email.includes('@')) {
    return NextResponse.json({ error: 'Email không hợp lệ' }, { status: 400 });
  }

  return NextResponse.json({
    user: { email, plan: 'free' },
    token: Buffer.from(`${email}:${Date.now()}`).toString('base64url'),
  });
}
