import OpenAI from 'openai';
import { getSystemPrompt, getUserPrompt, InterpretRequest } from '@/lib/ai/prompts';

export type { InterpretRequest };

let client: OpenAI | null = null;

function getClient(): OpenAI | null {
  if (!process.env.OPENAI_API_KEY) return null;
  if (!client) {
    client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return client;
}

export async function interpretReading(req: InterpretRequest): Promise<string> {
  const provider = getClient();
  if (!provider) {
    return `[Mock AI] Chưa cấu hình LLM. Kết nối OpenAI qua biến \`OPENAI_API_KEY\` để mở khóa luận giải chuyên sâu.`;
  }

  try {
    const response = await provider.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        { role: 'system', content: getSystemPrompt(req.service) },
        { role: 'user', content: getUserPrompt(req) },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const text = response.choices[0]?.message?.content?.trim();
    return text || '[AI] Không thể tạo phản hồi. Thử lại.';
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('[AI Error]', msg);
    return `[AI Error] ${msg}. Thử lại hoặc liên hệ support.`;
  }
}
