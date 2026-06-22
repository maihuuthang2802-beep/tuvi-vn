import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    items: [
      { id: 'demo-1', service: 'tu-vi', title: 'Lá số mẫu', createdAt: new Date().toISOString() },
      { id: 'demo-2', service: 'tarot', title: 'Tarot 3 lá', createdAt: new Date().toISOString() },
    ],
    storage: process.env.DATABASE_URL ? 'database-ready' : 'mock',
  });
}
