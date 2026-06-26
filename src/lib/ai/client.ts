import { getSystemPrompt, getUserPrompt, InterpretRequest } from '@/lib/ai/prompts';

export type { InterpretRequest };

export async function interpretReading(req: InterpretRequest): Promise<string> {
  const apiKey = process.env.AI_API_KEY || process.env.OPENAI_API_KEY;
  const baseURL = process.env.AI_BASE_URL || 'https://api.openai.com/v1';
  const model = process.env.AI_MODEL || 'gpt-4-turbo';

  if (!apiKey) {
    return `[Mock AI] Chưa cấu hình LLM. Thiết lập \`AI_API_KEY\` (và \`AI_BASE_URL\` nếu custom endpoint) để mở khóa luận giải chuyên sâu.`;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 25000);

  try {
    const response = await fetch(`${baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: getSystemPrompt(req.service) },
          { role: 'user', content: getUserPrompt(req) },
        ],
        temperature: 0.7,
        max_tokens: 1000,
        stream: false,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[AI Error]', response.status, errorText);
      if (response.status === 401 || response.status === 403) {
        return `[Mock AI] API key không hợp lệ (${response.status}). Đang dùng chế độ mock.`;
      }
      if (errorText.includes('No active credentials') || errorText.includes('model_not_found')) {
        return `[Mock AI] Endpoint không hỗ trợ model này. Đang dùng chế độ mock.`;
      }
      return `[Mock AI] Endpoint lỗi (${response.status}). Đang dùng chế độ mock.`;
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content?.trim();
    return text || '[AI] Không thể tạo phản hồi. Thử lại.';
  } catch (error) {
    clearTimeout(timeoutId);
    const msg = error instanceof Error ? error.message : String(error);
    console.error('[AI Error]', msg);
    
    if (msg.includes('Aborted') || msg.includes('timeout') || msg.includes('AbortError')) {
      return `[Mock AI] Yêu cầu hết thời gian chờ (25s). Đang dùng chế độ mock.`;
    }
    if (msg.includes('ECONNREFUSED') || msg.includes('ENOTFOUND') || msg.includes('fetch failed') || msg.includes('network')) {
      return `[Mock AI] Không kết nối được endpoint. Đang dùng chế độ mock.`;
    }
    return `[Mock AI] Lỗi: ${msg.split('\n')[0]}. Đang dùng chế độ mock.`;
  }
}
