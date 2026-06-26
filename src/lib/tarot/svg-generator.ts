/**
 * Sinh SVG lá Tarot cao cấp — thiết kế "Đêm Thiêng" với viền vàng trang trí,
 * mandala thần bí, nền sao, và biểu tượng riêng cho từng lá Major Arcana.
 */

export interface TarotSvgInput {
  name: string;
  arcana: 'major' | 'minor';
  suit?: string;
  rank?: string;
  reversed?: boolean;
}

// ── Màu sắc ──
const GOLD = '#C9A96E';
const DARK = '#0D0B19';
const SURFACE = '#181530';
const TEXT = '#EDE7D3';

const SUIT_COLOR: Record<string, string> = {
  Gậy: '#E8743B',
  Cốc: '#4FA8D8',
  Kiếm: '#B7C4D6',
  Tiền: '#D4AF37',
};

// ── Major Arcana: tên VN → số (0-21) → số La Mã ──
const MAJOR_INDEX: Record<string, number> = {
  'Kẻ Khờ': 0,
  'Nhà Ảo Thuật': 1,
  'Nữ Tư Tế': 2,
  'Hoàng Hậu': 3,
  'Hoàng Đế': 4,
  'Giáo Hoàng': 5,
  'Tình Nhân': 6,
  'Chiến Xa': 7,
  'Sức Mạnh': 8,
  'Ẩn Sĩ': 9,
  'Bánh Xe Số Phận': 10,
  'Công Lý': 11,
  'Người Treo Ngược': 12,
  'Cái Chết': 13,
  'Tiết Độ': 14,
  'Quỷ Dữ': 15,
  'Tòa Tháp': 16,
  'Ngôi Sao': 17,
  'Mặt Trăng': 18,
  'Mặt Trời': 19,
  'Phán Xét': 20,
  'Thế Giới': 21,
};

const ROMAN: string[] = [
  '0', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII',
  'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII',
  'XVIII', 'XIX', 'XX', 'XXI',
];

function majorIndex(name: string): number {
  return MAJOR_INDEX[name] ?? 0;
}

// ── Helper: số ngẫu nhiên ổn định theo tên (dùng cho vị trí sao nền) ──
function seedHash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function rng(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

// ── Viền ngoài trang trí ──
function ornateBorder(color: string, uid: string): string {
  return `
    <!-- Outer border -->
    <rect x="7" y="7" width="186" height="286" rx="6" fill="none" stroke="${color}" stroke-width="2.5" opacity="0.9"/>
    <rect x="11" y="11" width="178" height="278" rx="4" fill="none" stroke="${color}" stroke-width="0.8" opacity="0.45"/>
    <!-- Corner squares (outer) -->
    <rect x="4" y="4" width="10" height="10" rx="1.5" fill="${color}" opacity="0.85"/>
    <rect x="186" y="4" width="10" height="10" rx="1.5" fill="${color}" opacity="0.85"/>
    <rect x="4" y="286" width="10" height="10" rx="1.5" fill="${color}" opacity="0.85"/>
    <rect x="186" y="286" width="10" height="10" rx="1.5" fill="${color}" opacity="0.85"/>
    <!-- Corner dots (inner) -->
    <circle cx="14" cy="14" r="2" fill="${color}" opacity="0.6"/>
    <circle cx="186" cy="14" r="2" fill="${color}" opacity="0.6"/>
    <circle cx="14" cy="286" r="2" fill="${color}" opacity="0.6"/>
    <circle cx="186" cy="286" r="2" fill="${color}" opacity="0.6"/>
    <!-- Midpoint diamonds -->
    <polygon points="100,5 103,10 100,15 97,10" fill="${color}" opacity="0.7"/>
    <polygon points="100,285 103,290 100,295 97,290" fill="${color}" opacity="0.7"/>
    <polygon points="5,150 10,147 15,150 10,153" fill="${color}" opacity="0.7"/>
    <polygon points="185,150 190,147 195,150 190,153" fill="${color}" opacity="0.7"/>
  `;
}

// ── Nền thần bí ──
function mysticalBackground(color: string, uid: string, name: string): string {
  const rand = rng(seedHash(name));
  const stars: string[] = [];
  for (let i = 0; i < 28; i++) {
    const cx = 22 + rand() * 156;
    const cy = 22 + rand() * 256;
    const r = 0.4 + rand() * 1.1;
    const op = 0.15 + rand() * 0.35;
    stars.push(`<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r.toFixed(2)}" fill="${color}" opacity="${op.toFixed(2)}"/>`);
  }
  return `
    <rect x="11" y="11" width="178" height="278" rx="4" fill="url(#bg-${uid})"/>
    <circle cx="100" cy="150" r="80" fill="url(#glow-${uid})" opacity="0.35"/>
    ${stars.join('\n')}
  `;
}

// ── Header: số + biểu tượng ──
function cardHeader(color: string, arcana: 'major' | 'minor', name: string, suit?: string): string {
  if (arcana === 'major') {
    const idx = majorIndex(name);
    const roman = ROMAN[idx];
    return `
      <text x="24" y="38" text-anchor="start" font-size="13" font-family="serif" font-weight="bold" fill="${color}" opacity="0.9">${roman}</text>
      <circle cx="100" cy="35" r="3" fill="${color}" opacity="0.5"/>
      <text x="176" y="38" text-anchor="end" font-size="13" font-family="serif" fill="${color}" opacity="0.9">${roman}</text>
      <line x1="24" y1="44" x2="176" y2="44" stroke="${color}" stroke-width="0.6" opacity="0.35"/>
    `;
  }
  const suitIcon = miniSuitIcon(suit || '', color, 60, 33);
  const rankNum = rankToShortNumber(name);
  return `
    <text x="24" y="38" text-anchor="start" font-size="13" font-family="serif" font-weight="bold" fill="${color}" opacity="0.9">${rankNum}</text>
    ${suitIcon}
    <text x="176" y="38" text-anchor="end" font-size="13" font-family="serif" fill="${color}" opacity="0.9">${rankNum}</text>
    <line x1="24" y1="44" x2="176" y2="44" stroke="${color}" stroke-width="0.6" opacity="0.35"/>
  `;
}

function rankToShortNumber(name: string): string {
  const m: Record<string, string> = {
    'Át': 'A', 'Hai': '2', 'Ba': '3', 'Bốn': '4', 'Năm': '5',
    'Sáu': '6', 'Bảy': '7', 'Tám': '8', 'Chín': '9', 'Mười': '10',
    'Tiểu Đồng': 'TĐ', 'Kỵ Sĩ': 'KS', 'Hoàng Hậu': 'HH', 'Vua': 'V',
  };
  for (const [k, v] of Object.entries(m)) {
    if (name.includes(k)) return v;
  }
  return name.slice(0, 2);
}

function miniSuitIcon(suit: string, color: string, cx: number, cy: number): string {
  const s = 6;
  if (suit === 'Gậy') {
    return `<line x1="${cx}" y1="${cy - s}" x2="${cx}" y2="${cy + s}" stroke="${color}" stroke-width="1.5" stroke-linecap="round"/>`;
  }
  if (suit === 'Cốc') {
    return `<path d="M${cx - s} ${cy - s} L${cx - s / 2} ${cy + s} Q${cx} ${cy + s + 2} ${cx + s / 2} ${cy + s} L${cx + s} ${cy - s} Z" fill="none" stroke="${color}" stroke-width="1.2"/>`;
  }
  if (suit === 'Kiếm') {
    return `<line x1="${cx}" y1="${cy - s}" x2="${cx}" y2="${cy + s}" stroke="${color}" stroke-width="1.5" stroke-linecap="round"/><line x1="${cx - s}" y1="${cy}" x2="${cx + s}" y2="${cy}" stroke="${color}" stroke-width="1.2"/>`;
  }
  // Tiền
  return `<circle cx="${cx}" cy="${cy}" r="${s}" fill="none" stroke="${color}" stroke-width="1.3"/><circle cx="${cx}" cy="${cy}" r="1.5" fill="${color}" opacity="0.8"/>`;
}

// ── Major Arcana biểu tượng trung tâm ──
function majorArcanaSymbol(name: string, color: string): string {
  const idx = majorIndex(name);
  const sym = MAJOR_SYMBOLS[idx] || MAJOR_SYMBOLS[0];
  return sym(color);
}

type SymbolFn = (color: string) => string;

const MAJOR_SYMBOLS: SymbolFn[] = [
  // 0 - Kẻ Khờ (The Fool): ngôi sao + comet
  (c) => `<polygon points="100,73 103,95 97,95" fill="${c}" opacity="0.7"/><circle cx="100" cy="70" r="4" fill="${c}" opacity="0.9"/>`,
  // 1 - Nhà Ảo Thuật (Magician): đũa phép + vòng infinity
  (c) => `<line x1="100" y1="90" x2="100" y2="55" stroke="${c}" stroke-width="2.5" stroke-linecap="round"/><circle cx="100" cy="52" r="4" fill="${c}"/><path d="M88 70 Q100 58 112 70 Q100 82 88 70" fill="none" stroke="${c}" stroke-width="1.5"/>`,
  // 2 - Nữ Tư Tế (High Priestess): trăng lưỡi liềm
  (c) => `<path d="M85 50 Q105 70 85 100" fill="none" stroke="${c}" stroke-width="2.5" stroke-linecap="round"/><path d="M105 50 Q85 70 105 100" fill="${c}" opacity="0.3"/><circle cx="100" cy="75" r="2" fill="${c}" opacity="0.7"/>`,
  // 3 - Hoàng Hậu (Empress): vương miện
  (c) => `<path d="M75 85 L80 60 L90 75 L100 55 L110 75 L120 60 L125 85 Z" fill="none" stroke="${c}" stroke-width="2"/><circle cx="100" cy="55" r="3" fill="${c}"/>`,
  // 4 - Hoàng Đế (Emperor): ngai vàng + quyền trượng
  (c) => `<rect x="82" y="85" width="36" height="20" rx="2" fill="none" stroke="${c}" stroke-width="2"/><line x1="100" y1="55" x2="100" y2="85" stroke="${c}" stroke-width="2" stroke-linecap="round"/><rect x="92" y="52" width="16" height="8" rx="2" fill="none" stroke="${c}" stroke-width="1.5"/>`,
  // 5 - Giáo Hoàng (Hierophant): chìa khóa chéo
  (c) => `<circle cx="88" cy="58" r="7" fill="none" stroke="${c}" stroke-width="2"/><circle cx="112" cy="58" r="7" fill="none" stroke="${c}" stroke-width="2"/><line x1="88" y1="65" x2="100" y2="95" stroke="${c}" stroke-width="2"/><line x1="112" y1="65" x2="100" y2="95" stroke="${c}" stroke-width="2"/><circle cx="100" cy="95" r="3" fill="${c}"/>`,
  // 6 - Tình Nhân (Lovers): trái tim
  (c) => `<path d="M100 95 Q100 75 90 75 Q78 75 78 88 Q78 100 100 112 Q122 100 122 88 Q122 75 110 75 Q100 75 100 95Z" fill="${c}" opacity="0.7"/>`,
  // 7 - Chiến Xa (Chariot): bánh xe
  (c) => `<circle cx="100" cy="80" r="18" fill="none" stroke="${c}" stroke-width="2"/><circle cx="100" cy="80" r="4" fill="${c}"/><line x1="100" y1="62" x2="100" y2="98" stroke="${c}" stroke-width="0.8"/><line x1="82" y1="80" x2="118" y2="80" stroke="${c}" stroke-width="0.8"/>`,
  // 8 - Sức Mạnh (Strength): đầu sư tử cách điệu
  (c) => `<circle cx="100" cy="80" r="14" fill="none" stroke="${c}" stroke-width="2"/><circle cx="94" cy="76" r="2" fill="${c}"/><circle cx="106" cy="76" r="2" fill="${c}"/><path d="M94 86 Q100 92 106 86" fill="none" stroke="${c}" stroke-width="1.5"/>`,
  // 9 - Ẩn Sĩ (Hermit): đèn lồng
  (c) => `<rect x="94" y="60" width="12" height="16" rx="2" fill="none" stroke="${c}" stroke-width="2"/><circle cx="100" cy="52" r="3" fill="${c}"/><line x1="100" y1="52" x2="100" y2="35" stroke="${c}" stroke-width="1.5"/><line x1="100" y1="76" x2="100" y2="82" stroke="${c}" stroke-width="1.5"/>`,
  // 10 - Bánh Xe Số Phận (Wheel of Fortune): vòng quay
  (c) => `<circle cx="100" cy="75" r="20" fill="none" stroke="${c}" stroke-width="2"/><circle cx="100" cy="75" r="12" fill="none" stroke="${c}" stroke-width="1"/><line x1="80" y1="75" x2="120" y2="75" stroke="${c}" stroke-width="0.8"/><line x1="100" y1="55" x2="100" y2="95" stroke="${c}" stroke-width="0.8"/><line x1="86" y1="61" x2="114" y2="89" stroke="${c}" stroke-width="0.8"/><line x1="114" y1="61" x2="86" y2="89" stroke="${c}" stroke-width="0.8"/>`,
  // 11 - Công Lý (Justice): cán cân
  (c) => `<line x1="100" y1="50" x2="100" y2="85" stroke="${c}" stroke-width="2"/><line x1="82" y1="55" x2="118" y2="55" stroke="${c}" stroke-width="2"/><polygon points="82,58 82,52 76,55" fill="${c}" opacity="0.8"/><polygon points="118,58 118,52 124,55" fill="${c}" opacity="0.8"/>`,
  // 12 - Người Treo Ngược (Hanged Man): thập tự ngược
  (c) => `<line x1="100" y1="50" x2="100" y2="95" stroke="${c}" stroke-width="2"/><line x1="85" y1="85" x2="115" y2="85" stroke="${c}" stroke-width="2"/><circle cx="100" cy="48" r="3" fill="none" stroke="${c}" stroke-width="2"/>`,
  // 13 - Cái Chết (Death): đầu lâu cách điệu
  (c) => `<circle cx="100" cy="75" r="15" fill="none" stroke="${c}" stroke-width="2"/><circle cx="94" cy="72" r="3" fill="${c}" opacity="0.7"/><circle cx="106" cy="72" r="3" fill="${c}" opacity="0.7"/><rect x="95" y="82" width="10" height="6" rx="1" fill="none" stroke="${c}" stroke-width="1.5"/>`,
  // 14 - Tiết Độ (Temperance): hai chiếc cốc
  (c) => `<path d="M92 55 L95 70 Q100 75 105 70 L108 55" fill="none" stroke="${c}" stroke-width="1.8"/><path d="M80 85 L83 98 Q88 102 92 98 L95 85" fill="none" stroke="${c}" stroke-width="1.8"/><path d="M108 55 Q105 70 100 75" fill="none" stroke="${c}" stroke-width="1"/><path d="M108 55 L115 65 Q118 75 116 90" fill="none" stroke="${c}" stroke-width="0.7" stroke-dasharray="2,2"/>`,
  // 15 - Quỷ Dữ (Devil): ngôi sao 5 cánh ngược
  (c) => `<polygon points="100,55 108,78 133,78 113,92 121,115 100,100 79,115 87,92 67,78 92,78" fill="none" stroke="${c}" stroke-width="1.8"/>`,
  // 16 - Tòa Tháp (Tower): tháp + sét
  (c) => `<rect x="85" y="55" width="30" height="45" fill="none" stroke="${c}" stroke-width="2"/><rect x="92" y="60" width="8" height="7" fill="none" stroke="${c}" stroke-width="1"/><rect x="92" y="72" width="8" height="7" fill="none" stroke="${c}" stroke-width="1"/><polyline points="108,50 100,58 106,62 98,70" fill="none" stroke="${c}" stroke-width="1.5"/>`,
  // 17 - Ngôi Sao (Star): sao 8 cánh
  (c) => `<polygon points="100,52 103,72 123,75 103,78 100,98 97,78 77,75 97,72" fill="${c}" opacity="0.7"/>`,
  // 18 - Mặt Trăng (Moon): trăng lưỡi liềm + mặt
  (c) => `<path d="M80 55 Q100 70 80 95" fill="none" stroke="${c}" stroke-width="2.5"/><path d="M95 55 Q75 70 95 95" fill="${c}" opacity="0.25"/><circle cx="88" cy="72" r="2" fill="${c}" opacity="0.6"/><circle cx="88" cy="82" r="1.5" fill="${c}" opacity="0.4"/>`,
  // 19 - Mặt Trời (Sun): mặt trời tia
  (c) => `<circle cx="100" cy="75" r="16" fill="none" stroke="${c}" stroke-width="2"/><circle cx="100" cy="75" r="5" fill="${c}" opacity="0.8"/><line x1="100" y1="52" x2="100" y2="57" stroke="${c}" stroke-width="1.5"/><line x1="100" y1="93" x2="100" y2="98" stroke="${c}" stroke-width="1.5"/><line x1="77" y1="75" x2="82" y2="75" stroke="${c}" stroke-width="1.5"/><line x1="118" y1="75" x2="123" y2="75" stroke="${c}" stroke-width="1.5"/>`,
  // 20 - Phán Xét (Judgement): kèn trumpet
  (c) => `<line x1="78" y1="75" x2="122" y2="75" stroke="${c}" stroke-width="2"/><rect x="118" y="68" width="14" height="14" rx="2" fill="none" stroke="${c}" stroke-width="1.5"/><circle cx="100" cy="75" r="4" fill="${c}" opacity="0.6"/><line x1="100" y1="71" x2="100" y2="95" stroke="${c}" stroke-width="1.2"/>`,
  // 21 - Thế Giới (World): vòng nguyệt quế
  (c) => `<ellipse cx="100" cy="75" rx="20" ry="25" fill="none" stroke="${c}" stroke-width="2"/><ellipse cx="100" cy="75" rx="12" ry="17" fill="none" stroke="${c}" stroke-width="1"/><circle cx="100" cy="75" r="3" fill="${c}" opacity="0.7"/>`,
];

// ── Mandala nền cho Major Arcana ──
function majorMandala(color: string, name: string): string {
  return `
    <!-- Vòng ngoài mandala -->
    <circle cx="100" cy="135" r="60" fill="none" stroke="${color}" stroke-width="1.2" opacity="0.35"/>
    <circle cx="100" cy="135" r="56" fill="none" stroke="${color}" stroke-width="0.5" opacity="0.25"/>
    <!-- Hoa văn 8 cánh -->
    <g opacity="0.15" stroke="${color}" stroke-width="0.6" fill="none">
      <line x1="100" y1="75" x2="100" y2="195"/>
      <line x1="40" y1="135" x2="160" y2="135"/>
      <line x1="57" y1="92" x2="143" y2="178"/>
      <line x1="143" y1="92" x2="57" y2="178"/>
    </g>
    <!-- Đường tròn trang trí -->
    <circle cx="100" cy="135" r="42" fill="none" stroke="${color}" stroke-width="0.6" opacity="0.3" stroke-dasharray="3,4"/>
    <circle cx="100" cy="135" r="30" fill="none" stroke="${color}" stroke-width="0.5" opacity="0.2"/>
    <!-- Biểu tượng chính -->
    ${majorArcanaSymbol(name, color)}
  `;
}

// ── Minor Arcana: biểu tượng suit ──
function suitIconLarge(suit: string, color: string): string {
  if (suit === 'Gậy') {
    return `
      <line x1="100" y1="60" x2="100" y2="220" stroke="${color}" stroke-width="4" stroke-linecap="round"/>
      <ellipse cx="100" cy="58" rx="8" ry="10" fill="${color}" opacity="0.85"/>
      <path d="M88 62 Q80 42 100 35 Q120 42 112 62" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.5"/>
      <path d="M92 100 L80 80" stroke="${color}" stroke-width="1.2" opacity="0.35"/>
      <path d="M108 100 L120 80" stroke="${color}" stroke-width="1.2" opacity="0.35"/>
      <path d="M92 160 L78 145" stroke="${color}" stroke-width="1" opacity="0.25"/>
      <path d="M108 160 L122 145" stroke="${color}" stroke-width="1" opacity="0.25"/>
    `;
  }
  if (suit === 'Cốc') {
    return `
      <path d="M70 85 Q70 55 100 55 Q130 55 130 85 L125 210 Q125 220 100 220 Q75 220 75 210 Z" fill="none" stroke="${color}" stroke-width="3"/>
      <ellipse cx="100" cy="55" rx="30" ry="8" fill="none" stroke="${color}" stroke-width="2.5"/>
      <path d="M75 75 Q100 90 125 75" fill="none" stroke="${color}" stroke-width="0.8" opacity="0.4"/>
      <path d="M82 105 Q100 115 118 105" fill="none" stroke="${color}" stroke-width="0.6" opacity="0.3"/>
      <path d="M85 180 Q100 190 115 180" fill="none" stroke="${color}" stroke-width="0.6" opacity="0.3"/>
    `;
  }
  if (suit === 'Kiếm') {
    return `
      <line x1="100" y1="52" x2="100" y2="210" stroke="${color}" stroke-width="3.5" stroke-linecap="round"/>
      <polygon points="100,50 97,58 103,58" fill="${color}" opacity="0.9"/>
      <rect x="88" y="195" width="24" height="3" rx="1" fill="${color}" opacity="0.7"/>
      <line x1="78" y1="165" x2="122" y2="165" stroke="${color}" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="100" cy="165" r="3" fill="${color}" opacity="0.8"/>
      <path d="M92 125 L85 140" stroke="${color}" stroke-width="0.8" opacity="0.3"/>
      <path d="M108 125 L115 140" stroke="${color}" stroke-width="0.8" opacity="0.3"/>
    `;
  }
  // Tiền
  return `
    <circle cx="100" cy="135" r="55" fill="none" stroke="${color}" stroke-width="3"/>
    <circle cx="100" cy="135" r="48" fill="none" stroke="${color}" stroke-width="1" opacity="0.5"/>
    <circle cx="100" cy="135" r="38" fill="none" stroke="${color}" stroke-width="0.6" opacity="0.25" stroke-dasharray="4,4"/>
    <polygon points="100,87 112,115 107,140 93,140 88,115" fill="none" stroke="${color}" stroke-width="1.8"/>
    <circle cx="100" cy="113" r="6" fill="${color}" opacity="0.6"/>
    <line x1="100" y1="83" x2="100" y2="78" stroke="${color}" stroke-width="1.5"/>
    <line x1="86" y1="130" x2="78" y2="133" stroke="${color}" stroke-width="1"/>
    <line x1="114" y1="130" x2="122" y2="133" stroke="${color}" stroke-width="1"/>
  `;
}

// ── Minor Arcana: biểu tượng suit nhỏ (cho numbered cards) ──
function suitIconSmall(suit: string, color: string, cx: number, cy: number, size: number): string {
  if (suit === 'Gậy') {
    return `<line x1="${cx}" y1="${cy - size}" x2="${cx}" y2="${cy + size}" stroke="${color}" stroke-width="1.8" stroke-linecap="round"/><ellipse cx="${cx}" cy="${cy - size - 1}" rx="3" ry="4" fill="${color}" opacity="0.7"/>`;
  }
  if (suit === 'Cốc') {
    const r = size * 0.7;
    return `<path d="M${cx - r} ${cy - r * 0.5} Q${cx - r} ${cy - r * 1.8} ${cx} ${cy - r * 1.8} Q${cx + r} ${cy - r * 1.8} ${cx + r} ${cy - r * 0.5} L${cx + r * 0.8} ${cy + r * 1.2} Q${cx + r * 0.8} ${cy + r * 1.5} ${cx} ${cy + r * 1.5} Q${cx - r * 0.8} ${cy + r * 1.5} ${cx - r * 0.8} ${cy + r * 1.2} Z" fill="none" stroke="${color}" stroke-width="1.5"/>`;
  }
  if (suit === 'Kiếm') {
    return `<line x1="${cx}" y1="${cy - size}" x2="${cx}" y2="${cy + size}" stroke="${color}" stroke-width="1.5" stroke-linecap="round"/><line x1="${cx - size * 0.7}" y1="${cy}" x2="${cx + size * 0.7}" y2="${cy}" stroke="${color}" stroke-width="1.2" stroke-linecap="round"/>`;
  }
  // Tiền
  return `<circle cx="${cx}" cy="${cy}" r="${size * 0.75}" fill="none" stroke="${color}" stroke-width="1.5"/><polygon points="${cx},${cy - size * 0.45} ${cx + size * 0.4},${cy - size * 0.1} ${cx + size * 0.3},${cy + size * 0.35} ${cx - size * 0.3},${cy + size * 0.35} ${cx - size * 0.4},${cy - size * 0.1}" fill="none" stroke="${color}" stroke-width="0.8"/>`;
}

// ── Số icon theo rank ──
interface RankCount { count: number; isCourt: boolean }

function parseRank(name: string): RankCount {
  const numMap: Record<string, number> = {
    'Át': 1, 'Hai': 2, 'Ba': 3, 'Bốn': 4, 'Năm': 5, 'Sáu': 6, 'Bảy': 7, 'Tám': 8, 'Chín': 9, 'Mười': 10,
  };
  for (const [k, v] of Object.entries(numMap)) {
    if (name.includes(k)) return { count: v, isCourt: false };
  }
  // Court cards
  const courtRanks = ['Tiểu Đồng', 'Kỵ Sĩ', 'Hoàng Hậu', 'Vua'];
  for (const r of courtRanks) {
    if (name.includes(r)) return { count: 1, isCourt: true };
  }
  return { count: 1, isCourt: false };
}

// ── Grid layout cho numbered cards ──
function numberedCardGrid(suit: string, color: string, count: number): string {
  // Layout patterns cho 1-10 icons trong central area (x:40-160, y:55-215)
  const positions: Array<{ cx: number; cy: number }> = [];

  if (count === 1) {
    positions.push({ cx: 100, cy: 135 }); // center
  } else if (count === 2) {
    positions.push({ cx: 100, cy: 100 }, { cx: 100, cy: 170 });
  } else if (count === 3) {
    positions.push({ cx: 100, cy: 90 }, { cx: 100, cy: 135 }, { cx: 100, cy: 180 });
  } else if (count === 4) {
    positions.push({ cx: 75, cy: 95 }, { cx: 125, cy: 95 }, { cx: 75, cy: 175 }, { cx: 125, cy: 175 });
  } else if (count === 5) {
    positions.push({ cx: 75, cy: 90 }, { cx: 125, cy: 90 }, { cx: 100, cy: 135 }, { cx: 75, cy: 180 }, { cx: 125, cy: 180 });
  } else if (count === 6) {
    positions.push({ cx: 75, cy: 85 }, { cx: 125, cy: 85 }, { cx: 75, cy: 135 }, { cx: 125, cy: 135 }, { cx: 75, cy: 185 }, { cx: 125, cy: 185 });
  } else if (count === 7) {
    positions.push({ cx: 75, cy: 80 }, { cx: 125, cy: 80 }, { cx: 88, cy: 120 }, { cx: 112, cy: 120 }, { cx: 75, cy: 150 }, { cx: 125, cy: 150 }, { cx: 100, cy: 190 });
  } else if (count === 8) {
    positions.push({ cx: 75, cy: 78 }, { cx: 125, cy: 78 }, { cx: 75, cy: 116 }, { cx: 125, cy: 116 }, { cx: 75, cy: 154 }, { cx: 125, cy: 154 }, { cx: 75, cy: 192 }, { cx: 125, cy: 192 });
  } else if (count === 9) {
    positions.push({ cx: 75, cy: 78 }, { cx: 125, cy: 78 }, { cx: 75, cy: 115 }, { cx: 125, cy: 115 }, { cx: 100, cy: 135 }, { cx: 75, cy: 155 }, { cx: 125, cy: 155 }, { cx: 75, cy: 192 }, { cx: 125, cy: 192 });
  } else if (count === 10) {
    positions.push({ cx: 75, cy: 78 }, { cx: 125, cy: 78 }, { cx: 75, cy: 110 }, { cx: 125, cy: 110 }, { cx: 75, cy: 142 }, { cx: 125, cy: 142 }, { cx: 75, cy: 174 }, { cx: 125, cy: 174 }, { cx: 75, cy: 200 }, { cx: 125, cy: 200 });
  }

  const size = count <= 4 ? 14 : count <= 7 ? 11 : 8;
  return positions.map(({ cx, cy }) => suitIconSmall(suit, color, cx, cy, size)).join('\n');
}

// ── Footer: tên + loại ──
function cardFooter(color: string, name: string, arcana: 'major' | 'minor', suit?: string): string {
  const subtitle = arcana === 'major' ? 'Major Arcana' : (suit || '');
  return `
    <line x1="40" y1="252" x2="68" y2="252" stroke="${color}" stroke-width="0.6" opacity="0.4"/>
    <polygon points="100,247 103,252 100,257 97,252" fill="${color}" opacity="0.6"/>
    <line x1="132" y1="252" x2="160" y2="252" stroke="${color}" stroke-width="0.6" opacity="0.4"/>
    <text x="100" y="272" text-anchor="middle" font-size="14" font-family="serif" font-weight="bold" fill="${TEXT}" opacity="0.95">${name}</text>
    <text x="100" y="290" text-anchor="middle" font-size="9" fill="${color}" opacity="0.65" letter-spacing="1.5">${subtitle.toUpperCase()}</text>
  `;
}

// ── Hàm chính ──
export function generateTarotSvg({ name, arcana, suit, reversed = false }: TarotSvgInput): string {
  const color = arcana === 'minor' && suit ? (SUIT_COLOR[suit] || GOLD) : GOLD;
  const uid = `${arcana}-${suit || 'major'}-${seedHash(name).toString(36)}`;
  const rotate = reversed ? 180 : 0;

  const { count, isCourt } = parseRank(name);

  const centralArt = arcana === 'major'
    ? majorMandala(color, name)
    : isCourt
      ? suitIconLarge(suit || '', color)
      : numberedCardGrid(suit || '', color, count);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
    <defs>
      <linearGradient id="bg-${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${SURFACE}" stop-opacity="1"/>
        <stop offset="50%" stop-color="${DARK}" stop-opacity="1"/>
        <stop offset="100%" stop-color="#0A0814" stop-opacity="1"/>
      </linearGradient>
      <radialGradient id="glow-${uid}" cx="50%" cy="45%" r="50%">
        <stop offset="0%" stop-color="${color}" stop-opacity="0.25"/>
        <stop offset="60%" stop-color="${color}" stop-opacity="0.05"/>
        <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
      </radialGradient>
      <filter id="shadow-${uid}">
        <feDropShadow dx="0" dy="1" stdDeviation="2" flood-color="${color}" flood-opacity="0.2"/>
      </filter>
    </defs>

    <g transform="translate(100, 150) rotate(${rotate}) translate(-100, -150)">
      <!-- Nền -->
      ${mysticalBackground(color, uid, name)}

      <!-- Mandala / suit art -->
      ${centralArt}

      <!-- Viền -->
      ${ornateBorder(color, uid)}

      <!-- Header -->
      ${cardHeader(color, arcana, name, suit)}

      <!-- Footer -->
      ${cardFooter(color, name, arcana, suit)}
    </g>
  </svg>`;
}
