import { interpretReading, InterpretRequest } from '@/lib/ai/client';

export async function POST(req: Request) {
  try {
    const body = await req.json() as InterpretRequest;
    const { service, reading, question, context } = body;

    if (!service || !reading) {
      return Response.json({ error: 'Missing service or reading' }, { status: 400 });
    }

    const interpretation = await interpretReading({ service, reading, question, context });

    return Response.json({ interpretation });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('[API Error]', msg);
    return Response.json({ error: msg }, { status: 500 });
  }
}
