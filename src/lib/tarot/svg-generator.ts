/**
 * Sinh SVG lá Tarot theo dữ liệu rút bài thật (tên VN, arcana, suit, rank).
 * Không phụ thuộc file ảnh tĩnh trong /public — tránh lệch tên giữa các bộ từ điển khác nhau.
 */

export interface TarotSvgInput {
  name: string;
  arcana: 'major' | 'minor';
  suit?: string;
  rank?: string;
  reversed?: boolean;
}

const MAJOR_COLOR = '#C9A96E';
const SUIT_COLOR: Record<string, string> = {
  'Gậy': '#E8743B',
  'Cốc': '#4FA8D8',
  'Kiếm': '#B7C4D6',
  'Tiền': '#D4AF37',
};

function suitIcon(suit: string, color: string): string {
  if (suit === 'Gậy') {
    return `<g stroke="${color}" stroke-width="3" stroke-linecap="round" fill="none"><line x1="100" y1="95" x2="100" y2="150"/><line x1="88" y1="105" x2="100" y2="95"/><line x1="112" y1="105" x2="100" y2="95"/></g>`;
  }
  if (suit === 'Cốc') {
    return `<g stroke="${color}" stroke-width="3" fill="none"><path d="M82 100 L88 140 Q100 152 112 140 L118 100 Z"/><line x1="92" y1="152" x2="108" y2="152"/></g>`;
  }
  if (suit === 'Kiếm') {
    return `<g stroke="${color}" stroke-width="3" stroke-linecap="round" fill="none"><line x1="100" y1="90" x2="100" y2="150"/><line x1="86" y1="112" x2="114" y2="112"/></g>`;
  }
  if (suit === 'Tiền') {
    return `<g stroke="${color}" stroke-width="3" fill="none"><circle cx="100" cy="120" r="26"/><path d="M100 100 L108 116 L126 116 L112 127 L117 145 L100 134 L83 145 L88 127 L74 116 L92 116 Z" stroke-width="2"/></g>`;
  }
  return `<circle cx="100" cy="120" r="26" stroke="${color}" stroke-width="3" fill="none"/>`;
}

export function generateTarotSvg({ name, arcana, suit, reversed = false }: TarotSvgInput): string {
  const color = arcana === 'minor' && suit ? SUIT_COLOR[suit] || MAJOR_COLOR : MAJOR_COLOR;
  const rotate = reversed ? 180 : 0;
  const uid = `${arcana}-${suit || 'major'}-${name.length}`;

  const icon = arcana === 'major'
    ? `<circle cx="100" cy="120" r="45" fill="none" stroke="${color}" stroke-width="2" opacity="0.6"/>
       <circle cx="100" cy="120" r="40" fill="none" stroke="${color}" stroke-width="1" opacity="0.3"/>
       <text x="100" y="132" text-anchor="middle" font-size="38" fill="${color}" opacity="0.8">✦</text>`
    : suitIcon(suit || '', color);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
    <defs>
      <linearGradient id="grad-${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${color};stop-opacity:0.9" />
        <stop offset="100%" style="stop-color:#0D0B19;stop-opacity:1" />
      </linearGradient>
    </defs>
    <g transform="translate(100, 150) rotate(${rotate}) translate(-100, -150)">
      <rect x="20" y="20" width="160" height="260" rx="8" fill="url(#grad-${uid})" stroke="${color}" stroke-width="2"/>
      <rect x="20" y="20" width="160" height="260" rx="8" fill="none" stroke="${color}" stroke-width="1" opacity="0.5"/>
      <text x="35" y="40" text-anchor="middle" font-size="11" fill="${color}" opacity="0.9">${arcana === 'major' ? '✦' : suit?.[0] || ''}</text>
      ${icon}
      <text x="100" y="215" text-anchor="middle" font-size="13" fill="#EDE7D3" font-weight="bold" font-family="serif">${name}</text>
      <text x="100" y="260" text-anchor="middle" font-size="9" fill="${color}" opacity="0.6">${arcana === 'major' ? 'Major Arcana' : `${suit || ''}`}</text>
      <line x1="25" y1="30" x2="40" y2="30" stroke="${color}" stroke-width="1" opacity="0.5"/>
      <line x1="25" y1="30" x2="25" y2="45" stroke="${color}" stroke-width="1" opacity="0.5"/>
      <line x1="175" y1="30" x2="160" y2="30" stroke="${color}" stroke-width="1" opacity="0.5"/>
      <line x1="175" y1="30" x2="175" y2="45" stroke="${color}" stroke-width="1" opacity="0.5"/>
    </g>
  </svg>`;
}
