import { NextResponse } from 'next/server';
import { createReading, type ReadingInput } from '@/lib/readings';

export async function POST(request: Request) {
  const input = await request.json() as ReadingInput;
  if (!input.service) {
    return NextResponse.json({ error: 'Missing service' }, { status: 400 });
  }

  const local = createReading(input);
  const aiKey = process.env.AI_API_KEY;

  if (!aiKey) {
    return NextResponse.json({ result: local, mode: 'local' });
  }

  return NextResponse.json({
    result: {
      ...local,
      details: [...local.details, 'AI_API_KEY đã cấu hình. Thay phần này bằng provider LLM khi chốt model.'],
    },
    mode: 'ai-ready',
  });
}
