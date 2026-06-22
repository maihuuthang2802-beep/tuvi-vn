import { castIChing } from '@/lib/iching/engine';
import { generateChart } from '@/lib/ziwei/algorithm';
import { BRANCH_VI, PALACE_VI, STEM_VI, viPalace, viStars, viWuxingJu } from '@/lib/ziwei/vietnamese';

export type ServiceKey = 'tu-vi' | 'kinh-dich' | 'xin-xam' | 'tarot';

export interface ReadingInput {
  service: ServiceKey;
  name?: string;
  question?: string;
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
const tarot = ['Kẻ Khờ', 'Nhà Ảo Thuật', 'Nữ Tư Tế', 'Hoàng Hậu', 'Hoàng Đế', 'Tình Nhân', 'Chiến Xa', 'Ẩn Sĩ', 'Bánh Xe Số Phận', 'Công Lý', 'Ngôi Sao', 'Mặt Trời'];

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
    const reading = castIChing(question);
    return {
      title: `Quẻ Kinh Dịch: ${reading.hexagram.name}`,
      summary: reading.summary,
      details: [
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

  const cards = [pick(tarot, seed), pick(tarot, seed, 5), pick(tarot, seed, 9)];
  return {
    title: 'Tarot 3 lá',
    summary: `Quá khứ - hiện tại - hướng đi: ${cards.join(' / ')}.`,
    details: [`${cards[0]}: gốc vấn đề.`, `${cards[1]}: năng lượng hiện tại.`, `${cards[2]}: hướng hành động.`],
    advice: 'Đừng hỏi Tarot thay cho quyết định; dùng nó để soi góc mù và chọn bước kế tiếp.',
  };
}
