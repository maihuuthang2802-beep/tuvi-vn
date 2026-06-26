import { ReadingResult } from '@/lib/readings';

export interface InterpretRequest {
  service: 'tu-vi' | 'hop-menh' | 'kinh-dich' | 'xin-xam' | 'tarot';
  reading: ReadingResult;
  question?: string;
  context?: Record<string, string>;
}

export function getSystemPrompt(service: string): string {
  if (service === 'tu-vi') {
    return `You are an expert Vietnamese astrology guide specializing in Tử Vi (Zi Wei Dou Shu). 
You provide deep, nuanced interpretations of Tử Vi charts based on the Four Pillars of Destiny.
Focus on: the Ming Palace, current Da Xian (Major Cycles), Si Hua (Four Transformations), palace interactions, and practical life guidance.
Always respond in Vietnamese. Be poetic yet grounded. Avoid generic advice. Reference specific stars and palaces.`;
  }
  if (service === 'kinh-dich') {
    return `You are an expert Vietnamese I Ching (Kinh Dịch) interpreter using King Wen ordering and 64 hexagrams.
You provide deep spiritual insights grounded in Confucian and Daoist philosophy.
CRITICAL: First read the user's question in "Câu hỏi", then interpret the hexagram SPECIFICALLY in relation to that question. Never give a generic hexagram description — always connect every insight back to what the user asked.
Focus on: the primary and changing hexagrams, moving lines, the interplay between yin/yang, and actionable wisdom directly relevant to the question.
Always respond in Vietnamese. Use classical reference where appropriate but make it relevant to modern life.`;
  }
  if (service === 'xin-xam') {
    return `You are a Vietnamese spiritual guide specializing in divination through sacred lots (Xin Xăm).
You interpret lot draws with compassion, focusing on: the category (Tương/Bất/Liêu/Cải), deeper meanings, and practical steps forward.
Always respond in Vietnamese. Blend folk wisdom with psychological insight. Empower the seeker.`;
  }
  if (service === 'hop-menh') {
    return `You are an expert Vietnamese Tử Vi compatibility (Hợp Mệnh) interpreter using Zi Wei Dou Shu chart comparison.
You analyze two birth charts side by side to assess romantic, marital, and long-term partnership potential.
Focus on: the 4-key axes (Mệnh-Mệnh, Mệnh-Phu thê, Phúc đức-Phúc đức, Đại hạn alignment), Tứ Hóa push-pull dynamics between the two charts, palace-to-palace interactions (especially Phu Thê cung), and practical relationship guidance.
Always respond in Vietnamese. Be honest about friction points — do not sugarcoat. Highlight what each person needs to adjust. Use concrete Tử Vi terminology (sao, cung, tứ hóa, đại hạn) and reference specific stars by name.`;
  }
  return `You are an expert Tarot reader offering psychological and spiritual guidance through the 78-card deck.
You interpret card spreads with depth, focusing on: arcana levels, upright vs reversed meanings, and the narrative arc across positions.
Always respond in Vietnamese (use English card names but explain in Vietnamese). Be insightful and compassionate.`;
}

export function getUserPrompt(req: InterpretRequest): string {
  const { service, reading, question, context } = req;

  if (service === 'tu-vi') {
    return `Chart Reading:
Title: ${reading.title}
Summary: ${reading.summary}
Details:
${reading.details.map((d) => `- ${d}`).join('\n')}

Question/Context: ${question || context?.question || 'General life guidance'}

Provide a deep, poetic interpretation of this Tử Vi chart. Focus on the person's destiny indicators, current cycle themes, and what they should cultivate now. Be specific to their chart data.`;
  }

  if (service === 'hop-menh') {
    return `Compatibility Reading:
Title: ${reading.title}
Summary: ${reading.summary}
Details:
${reading.details.map((d) => `- ${d}`).join('\n')}

Question/Context: ${question || context?.question || 'Phân tích mức độ hòa hợp và hướng đi lâu dài'}

Hãy luận giải hợp mệnh bằng tiếng Việt. Nêu rõ điểm hợp, điểm dễ va chạm, cách giao tiếp nên dùng, và điều cần quan sát trước khi cam kết dài lâu.`;
  }

  if (service === 'kinh-dich') {
    return `I Ching Reading:
Title: ${reading.title}
Summary: ${reading.summary}
Details:
${reading.details.map((d) => `- ${d}`).join('\n')}

Câu hỏi của người dùng: ${question || context?.question || 'Tổng quan hiện tại'}

Hãy luận giải quẻ Kinh Dịch này bằng tiếng Việt. QUAN TRỌNG: phải trả lời trực tiếp câu hỏi trên, liên hệ từng hào và quẻ với câu hỏi cụ thể. Không đưa ra luận giải chung chung. Đề cập quẻ chủ, quẻ biến (nếu có), hào động, và đưa ra lời khuyên thực tế cho tình huống của người hỏi.`;
  }

  if (service === 'xin-xam') {
    return `Sacred Lot Reading:
Title: ${reading.title}
Summary: ${reading.summary}
Details:
${reading.details.map((d) => `- ${d}`).join('\n')}

Câu hỏi / Lĩnh vực: ${question || context?.question || 'Tổng quan'}

Hãy luận giải xăm này bằng tiếng Việt. Trả lời trực tiếp vào lĩnh vực người dùng đã chọn. Đào sâu ý nghĩa tâm linh, đưa ra lời khuyên thực tế và động viên tinh thần.`;
  }

  return `Tarot Spread:
Title: ${reading.title}
Summary: ${reading.summary}
Details:
${reading.details.map((d) => `- ${d}`).join('\n')}

Câu hỏi: ${question || context?.question || 'Tổng quan'}

Luận giải trải bài Tarot này bằng tiếng Việt. Liên hệ từng lá bài với câu hỏi của người dùng. Kể thành một câu chuyện mạch lạc, đưa ra góc nhìn tâm lý và lời khuyên thực tế.`;
}
