import { ReadingResult } from '@/lib/readings';

export interface InterpretRequest {
  service: 'tu-vi' | 'kinh-dich' | 'xin-xam' | 'tarot';
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
Focus on: the primary and changing hexagrams, moving lines, the interplay between yin/yang, and actionable wisdom.
Always respond in Vietnamese. Use classical reference where appropriate but make it relevant to modern life.`;
  }
  if (service === 'xin-xam') {
    return `You are a Vietnamese spiritual guide specializing in divination through sacred lots (Xin Xăm).
You interpret lot draws with compassion, focusing on: the category (Tương/Bất/Liêu/Cải), deeper meanings, and practical steps forward.
Always respond in Vietnamese. Blend folk wisdom with psychological insight. Empower the seeker.`;
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

  if (service === 'kinh-dich') {
    return `I Ching Reading:
Title: ${reading.title}
Summary: ${reading.summary}
Details:
${reading.details.map((d) => `- ${d}`).join('\n')}

Question: ${question || context?.question || 'What does this hexagram teach me?'}

Provide a profound interpretation of this hexagram draw. Explain the wisdom, warn of pitfalls, and suggest right action. Connect to the seeker's current situation.`;
  }

  if (service === 'xin-xam') {
    return `Sacred Lot Reading:
Title: ${reading.title}
Summary: ${reading.summary}
Details:
${reading.details.map((d) => `- ${d}`).join('\n')}

Question/Theme: ${question || context?.question || 'General guidance'}

Provide a compassionate, insightful interpretation of this lot. Explore its deeper meanings beyond the surface category. What is this spirit message guiding them toward? Suggest practical steps.`;
  }

  return `Tarot Spread:
Title: ${reading.title}
Summary: ${reading.summary}
Details:
${reading.details.map((d) => `- ${d}`).join('\n')}

Question: ${question || context?.question || 'What do these cards reveal?'}

Provide a nuanced interpretation of this tarot spread. Weave the cards into a coherent narrative. Address the seeker's underlying question with compassion and clarity.`;
}
