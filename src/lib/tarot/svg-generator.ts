import { TAROT_MAJOR_ARCANA } from './constants';

const COLORS = {
  0: '#FFD700', 1: '#FF6B9D', 2: '#9370DB', 3: '#FF1493', 4: '#8B4513',
  5: '#DC143C', 6: '#FF69B4', 7: '#DAA520', 8: '#FF4500', 9: '#8A2BE2',
  10: '#FFD700', 11: '#FF6347', 12: '#4B0082', 13: '#000000', 14: '#20B2AA',
  15: '#8B0000', 16: '#FF0000', 17: '#87CEEB', 18: '#191970', 19: '#FFD700',
  20: '#FF1493', 21: '#DAA520',
};

export function generateTarotSvg(cardId: number, reversed = false): string {
  const card = TAROT_MAJOR_ARCANA[cardId];
  if (!card) return '';

  const color = COLORS[cardId as keyof typeof COLORS] || '#C9A96E';
  const rotate = reversed ? 180 : 0;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300" width="200" height="300">
    <defs>
      <linearGradient id="grad-${cardId}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${color};stop-opacity:0.9" />
        <stop offset="100%" style="stop-color:#0D0B19;stop-opacity:1" />
      </linearGradient>
      <filter id="glow-${cardId}">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    <g transform="translate(100, 150) rotate(${rotate}) translate(-100, -150)">
      <!-- Card background -->
      <rect x="20" y="20" width="160" height="260" rx="8" fill="url(#grad-${cardId})" stroke="${color}" stroke-width="2"/>
      
      <!-- Border glow -->
      <rect x="20" y="20" width="160" height="260" rx="8" fill="none" stroke="${color}" stroke-width="1" opacity="0.5" filter="url(#glow-${cardId})"/>
      
      <!-- Top number -->
      <circle cx="35" cy="35" r="8" fill="${color}" opacity="0.8"/>
      <text x="35" y="40" text-anchor="middle" font-size="10" fill="#0D0B19" font-weight="bold">${String(cardId).padStart(2, '0')}</text>
      
      <!-- Center circle -->
      <circle cx="100" cy="120" r="45" fill="none" stroke="${color}" stroke-width="2" opacity="0.6"/>
      <circle cx="100" cy="120" r="40" fill="none" stroke="${color}" stroke-width="1" opacity="0.3"/>
      
      <!-- Symbol in center (tarot-ish symbol) -->
      <text x="100" y="130" text-anchor="middle" font-size="40" fill="${color}" opacity="0.7">✦</text>
      
      <!-- Card name -->
      <text x="100" y="200" text-anchor="middle" font-size="11" fill="#EDE7D3" font-weight="bold" font-family="serif">${card.vn}</text>
      
      <!-- Bottom Roman numeral or symbol -->
      <text x="100" y="260" text-anchor="middle" font-size="10" fill="${color}" opacity="0.6">— ${card.name} —</text>
      
      <!-- Corner accents -->
      <line x1="25" y1="30" x2="40" y2="30" stroke="${color}" stroke-width="1" opacity="0.5"/>
      <line x1="25" y1="30" x2="25" y2="45" stroke="${color}" stroke-width="1" opacity="0.5"/>
      <line x1="175" y1="30" x2="160" y2="30" stroke="${color}" stroke-width="1" opacity="0.5"/>
      <line x1="175" y1="30" x2="175" y2="45" stroke="${color}" stroke-width="1" opacity="0.5"/>
    </g>
  </svg>`;
}
