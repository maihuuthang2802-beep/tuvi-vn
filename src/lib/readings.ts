import { castIChing } from '@/lib/iching/engine';
import { generateChart } from '@/lib/ziwei/algorithm';
import { BRANCH_VI, PALACE_VI, STEM_VI, viPalace, viStars, viWuxingJu } from '@/lib/ziwei/vietnamese';

export type ServiceKey = 'tu-vi' | 'kinh-dich' | 'xin-xam' | 'tarot';

export interface ReadingInput {
  service: ServiceKey;
  name?: string;
  question?: string;
  spread?: '1' | '3';
  method?: 'luchao' | 'thieny' | 'maihoa';
  objectName?: string;
  datetime?: string;
  birthDate?: string;
  birthTime?: string;
  gender?: 'male' | 'female' | 'other';
  province?: string;
  city?: string;
  longitude?: number;
}

export interface ReadingResult {
  title: string;
  summary: string;
  details: string[];
  advice: string;
}

const lots = ['Thượng thượng', 'Thượng', 'Trung bình', 'Trung', 'Hạ nhưng chuyển được'];

const MAJOR_ARCANA = [
  'Kẻ Khờ', 'Nhà Ảo Thuật', 'Nữ Tư Tế', 'Hoàng Hậu', 'Hoàng Đế', 'Giáo Hoàng', 'Tình Nhân', 'Chiến Xa', 'Sức Mạnh', 'Ẩn Sĩ', 'Bánh Xe Số Phận', 'Công Lý', 'Người Treo Ngược', 'Cái Chết', 'Tiết Độ', 'Quỷ Dữ', 'Tòa Tháp', 'Ngôi Sao', 'Mặt Trăng', 'Mặt Trời', 'Phán Xét', 'Thế Giới',
] as const;

const MINOR_RANKS = ['Át', 'Hai', 'Ba', 'Bốn', 'Năm', 'Sáu', 'Bảy', 'Tám', 'Chín', 'Mười', 'Tiểu Đồng', 'Kỵ Sĩ', 'Hoàng Hậu', 'Vua'] as const;
const MINOR_SUITS = ['Gậy', 'Cốc', 'Kiếm', 'Tiền'] as const;
const SUIT_MEANINGS: Record<(typeof MINOR_SUITS)[number], string> = {
  Gậy: 'hành động, đam mê, động lực',
  Cốc: 'cảm xúc, kết nối, trực giác',
  Kiếm: 'tư duy, xung đột, quyết định',
  Tiền: 'tài chính, công việc, vật chất',
};

export interface TarotCardDraw {
  name: string;
  arcana: 'major' | 'minor';
  suit?: (typeof MINOR_SUITS)[number];
  rank?: (typeof MINOR_RANKS)[number];
  reversed: boolean;
  uprightMeaning: string;
  reversedMeaning: string;
}

function tarotMeaning(name: string, arcana: 'major' | 'minor', suit?: (typeof MINOR_SUITS)[number], rank?: (typeof MINOR_RANKS)[number]) {
  if (arcana === 'major') {
    return {
      upright: `${name}: chu kỳ lớn, bài học rõ, nên nhìn bức tranh rộng trước khi quyết.`,
      reversed: `${name} ngược: năng lượng bị nghẽn hoặc đi lệch, cần chậm lại để sửa gốc.`,
    };
  }

  const suitMeaning = suit ? SUIT_MEANINGS[suit] : 'năng lượng đời sống';
  const rankMeaning = rank === 'Át' ? 'khởi đầu mới' : rank === 'Mười' ? 'điểm tròn chu kỳ' : rank === 'Tiểu Đồng' ? 'tin tức hoặc học bài mới' : rank === 'Kỵ Sĩ' ? 'động lực đang tiến' : rank === 'Hoàng Hậu' ? 'nuôi dưỡng và thu hút' : rank === 'Vua' ? 'kiểm soát và trưởng thành' : `${rank?.toLowerCase()} bậc trong tiến trình`;
  return {
    upright: `${name}: ${rankMeaning}, trọng tâm ở ${suitMeaning}.`,
    reversed: `${name} ngược: ${suitMeaning} dễ lệch nhịp, cần rà lại cách dùng năng lượng này.`,
  };
}

export function drawTarotCards(question: string, spread: '1' | '3' = '3'): TarotCardDraw[] {
  const deck: TarotCardDraw[] = [
    ...MAJOR_ARCANA.map((name) => {
      const meaning = tarotMeaning(name, 'major');
      return { name, arcana: 'major' as const, reversed: false, uprightMeaning: meaning.upright, reversedMeaning: meaning.reversed };
    }),
    ...MINOR_SUITS.flatMap((suit) => MINOR_RANKS.map((rank) => {
      const name = `${rank} ${suit}`;
      const meaning = tarotMeaning(name, 'minor', suit, rank);
      return { name, arcana: 'minor' as const, suit, rank, reversed: false, uprightMeaning: meaning.upright, reversedMeaning: meaning.reversed };
    })),
  ];

  let state = hash(`${question}|${spread}|tarot-78`);
  const total = spread === '1' ? 1 : 3;
  const picks: TarotCardDraw[] = [];

  for (let i = 0; i < total; i += 1) {
    state = Math.imul(state ^ (i + 1), 16777619) >>> 0;
    const index = state % deck.length;
    const [card] = deck.splice(index, 1);
    state = Math.imul(state ^ 2246822519, 3266489917) >>> 0;
    picks.push({ ...card, reversed: (state & 1) === 1 });
  }

  return picks;
}

function hash(value: string) {
  let h = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pick<T>(items: T[], seed: number, offset = 0) {
  return items[(seed + offset) % items.length];
}

function trueSolarBranch(birthTime: string | undefined, longitude = 105.85) {
  const [hourText, minuteText] = (birthTime || '08:00').split(':');
  const clockMinutes = (Number(hourText) || 0) * 60 + (Number(minuteText) || 0);
  const solarMinutes = ((clockMinutes + (longitude - 105) * 4) % 1440 + 1440) % 1440;
  if (solarMinutes >= 1380 || solarMinutes < 60) return 0;
  return Math.floor((solarMinutes - 60) / 120) + 1;
}

export function createReading(input: ReadingInput): ReadingResult {
  const seed = hash(JSON.stringify(input));
  const question = input.question?.trim() || 'Tổng quan hiện tại';

  if (input.service === 'tu-vi') {
    const birthDate = input.birthDate ? new Date(input.birthDate) : new Date('1995-01-01');
    const longitude = typeof input.longitude === 'number' ? input.longitude : 105.85;
    const chart = generateChart({
      year: birthDate.getFullYear(),
      month: birthDate.getMonth() + 1,
      day: birthDate.getDate(),
      hour: trueSolarBranch(input.birthTime, longitude),
      gender: input.gender === 'female' ? 'female' : 'male',
      name: input.name,
      province: input.province,
      city: input.city,
      longitude,
    });
    const ming = chart.palaces.find(palace => palace.isMingGong);
    const currentDaXian = chart.daXians[chart.currentDaXianIndex];
    const mainStars = ming?.stars.filter(star => star.type === 'major').map(star => star.name) || [];
    const borrowedStars = ming?.borrowedStars?.length ? `, mượn chính tinh đối cung: ${viStars(ming.borrowedStars)}` : '';
    const canChi = `${STEM_VI[chart.lunarInfo.yearStem]} ${BRANCH_VI[chart.lunarInfo.yearBranch]}`;
    const mingName = ming ? viPalace(ming.name) : 'Mệnh';

    return {
      title: `Lá số Tử Vi: ${input.name || 'Đương số'}`,
      summary: `${canChi}, âm lịch ${chart.lunarInfo.lunarDay}/${chart.lunarInfo.lunarMonth}/${chart.lunarInfo.lunarYear}, ${viWuxingJu(chart.wuxingJuName)}. Cung ${mingName} tại ${BRANCH_VI[chart.mingGongBranch]}.`,
      details: [
        `Chính tinh cung Mệnh: ${mainStars.length ? viStars(mainStars) : 'Vô chính diệu'}${borrowedStars}.`,
        `Nơi sinh: ${input.city || 'Hà Nội'}${input.province ? `, ${input.province}` : ''}; kinh độ ${longitude.toFixed(2)}°Đ, dùng để hiệu chỉnh giờ mặt trời thật Việt Nam.`,
        `Thân cư tại chi ${BRANCH_VI[chart.shenGongBranch]}; tuổi hiện tại: ${chart.currentAge}.`,
        currentDaXian ? `Đại hạn hiện tại: ${currentDaXian.startAge}-${currentDaXian.endAge} tại cung ${PALACE_VI[currentDaXian.palaceName] || currentDaXian.palaceName}.` : 'Chưa xác định đại hạn hiện tại.',
      ],
      advice: 'Dùng lá số thật làm dữ liệu nền; tầng AI/RAG tiếp theo sẽ diễn giải sâu theo từng cung, tam phương tứ chính và đại hạn.',
    };
  }

  if (input.service === 'kinh-dich') {
    const reading = castIChing({ method: input.method, question, objectName: input.objectName, datetime: input.datetime });
    return {
      title: `Quẻ Kinh Dịch: ${reading.hexagram.name}`,
      summary: reading.summary,
      details: [
        `Phương pháp: ${reading.method === 'maihoa' ? 'Mai Hoa' : reading.method === 'thieny' ? 'Thiên Ý' : 'Lục Hào'}. ${reading.methodDetail}`,
        `Quẻ chủ: ${reading.hexagram.name} (${reading.hexagram.han}) — ${reading.hexagram.judgment}`,
        `Hình ảnh: ${reading.hexagram.image}`,
        ...reading.lines.map(line => `Hào ${line.position}: ${line.yinYang}${line.moving ? ' (động)' : ''} — ${line.text}`),
        reading.changedHexagram ? `Quẻ biến: ${reading.changedHexagram.name} (${reading.changedHexagram.han}) — ${reading.changedHexagram.judgment}` : null,
      ].filter(Boolean) as string[],
      advice: reading.advice,
    };
  }

  if (input.service === 'xin-xam') {
    const lot = pick(lots, seed);
    return {
      title: `Xin xăm: ${lot}`,
      summary: `Xăm ${lot} cho câu hỏi: ${question}.`,
      details: ['Việc có tín hiệu nhưng cần đúng người hỗ trợ.', 'Tài lộc đến chậm, không hợp đầu cơ.', 'Tình cảm nên rõ lời, tránh tự suy diễn.'],
      advice: 'Làm việc nhỏ chắc tay trong 7 ngày tới rồi mới quyết việc lớn.',
    };
  }

  const spread = input.spread === '1' ? '1' : '3';
  const cards = drawTarotCards(question, spread);
  const slots = spread === '1' ? ['Thông điệp chính'] : ['Quá khứ', 'Hiện tại', 'Hướng đi'];
  return {
    title: spread === '1' ? 'Tarot 1 lá' : 'Tarot 3 lá',
    summary: `${spread === '1' ? 'Lá bài hiện lên' : 'Trải bài'}: ${cards.map((card) => `${card.name}${card.reversed ? ' (ngược)' : ' (xuôi)'}`).join(' / ')}.`,
    details: cards.map((card, index) => `${slots[index]}: ${card.name}${card.reversed ? ' ngược' : ' xuôi'} — ${card.reversed ? card.reversedMeaning : card.uprightMeaning}`),
    advice: spread === '1' ? 'Một lá hợp câu hỏi nhanh; nếu còn mâu thuẫn, chuyển sang trải 3 lá để thấy tiến trình rõ hơn.' : 'Đừng hỏi Tarot thay cho quyết định; dùng nó để soi góc mù và chọn bước kế tiếp.',
  };
}
