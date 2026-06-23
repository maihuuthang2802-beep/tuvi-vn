import type { ZiweiChart, Palace } from './types';
import { PALACE_VI, SIHUA_VI, viStars, viWuxingJu } from './vietnamese';

export interface CompatibilityAxis {
  key: 'emotion' | 'communication' | 'marriage' | 'conflict';
  label: string;
  score: number;
  summary: string;
}

export interface CompatibilitySection {
  title: string;
  score?: number;
  summary: string;
  highlights: string[];
}

export interface CompatibilityAnalysis {
  score: number;
  level: 'Rất hợp' | 'Khá hợp' | 'Cần vun bồi' | 'Nhiều thử thách';
  summary: string;
  axes: CompatibilityAxis[];
  advice: string[];
  details: string[];
  premiumSections: CompatibilitySection[];
}

const GOOD_STARS = new Set(['紫微', '天府', '天相', '天梁', '左辅', '右弼', '文昌', '文曲', '天魁', '天钺', '禄存', '红鸾', '天喜']);
const TOUGH_STARS = new Set(['七杀', '破军', '廉贞', '擎羊', '陀罗', '火星', '铃星', '地空', '地劫', '天空', '旬空', '大耗', '天伤', '天使']);
const RELATIONSHIP_STARS = new Set(['贪狼', '太阴', '天同', '天相', '红鸾', '天喜']);

function getPalace(chart: ZiweiChart, palaceName: string) {
  return chart.palaces.find((palace) => palace.name === palaceName);
}

function getMajorStars(palace?: Palace) {
  return palace?.stars.filter((star) => star.type === 'major').map((star) => star.name) || [];
}

function getAllStarNames(palace?: Palace) {
  return palace?.stars.map((star) => star.name) || [];
}

function getOverlap(left: string[], right: string[]) {
  return left.filter((name) => right.includes(name));
}

function countBySet(stars: string[], set: Set<string>) {
  return stars.filter((star) => set.has(star)).length;
}

function clampScore(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function describeLevel(score: number): CompatibilityAnalysis['level'] {
  if (score >= 80) return 'Rất hợp';
  if (score >= 65) return 'Khá hợp';
  if (score >= 50) return 'Cần vun bồi';
  return 'Nhiều thử thách';
}

function describeAxis(score: number, positive: string, neutral: string, negative: string) {
  if (score >= 75) return positive;
  if (score >= 55) return neutral;
  return negative;
}

function getSiHuaMarks(palace?: Palace) {
  return palace?.stars.filter((star) => star.siHua).map((star) => `${SIHUA_VI[star.siHua || ''] || star.siHua} ${viStars([star.name])}`) || [];
}

function getCurrentDaXianPalace(chart: ZiweiChart) {
  return chart.daXians[chart.currentDaXianIndex];
}

function summarizePeople(chart: ZiweiChart, fallbackName: string) {
  const ming = getPalace(chart, '命宫');
  const phuThe = getPalace(chart, '夫妻宫');
  const phucDuc = getPalace(chart, '福德宫');
  return {
    name: chart.birthInfo.name || fallbackName,
    ming,
    phuThe,
    phucDuc,
    mingStars: getMajorStars(ming),
    spouseStars: getMajorStars(phuThe),
    phucStars: getAllStarNames(phucDuc),
    currentDaXian: getCurrentDaXianPalace(chart),
  };
}

export function analyzeCompatibility(chartA: ZiweiChart, chartB: ZiweiChart): CompatibilityAnalysis {
  const personA = summarizePeople(chartA, 'Người A');
  const personB = summarizePeople(chartB, 'Người B');

  const mingToSpouseA = getOverlap(personA.mingStars, personB.spouseStars);
  const mingToSpouseB = getOverlap(personB.mingStars, personA.spouseStars);
  const mingOverlap = getOverlap(personA.mingStars, personB.mingStars);
  const spouseOverlap = getOverlap(personA.spouseStars, personB.spouseStars);

  const mingSpouseScore = clampScore(10 + mingToSpouseA.length * 8 + mingToSpouseB.length * 8 + mingOverlap.length * 3 + spouseOverlap.length * 3, 0, 30);

  const phucGood = countBySet(personA.phucStars, GOOD_STARS) + countBySet(personB.phucStars, GOOD_STARS);
  const phucTough = countBySet(personA.phucStars, TOUGH_STARS) + countBySet(personB.phucStars, TOUGH_STARS);
  const phucScore = clampScore(12 + phucGood * 3 - phucTough * 2, 0, 25);

  const relationGood = countBySet([...personA.mingStars, ...personB.mingStars], RELATIONSHIP_STARS);
  const relationTough = countBySet([...personA.mingStars, ...personB.mingStars], TOUGH_STARS);
  const starHarmonyScore = clampScore(8 + mingOverlap.length * 4 + relationGood * 2 - relationTough * 2, 0, 20);

  const sihuaA = getSiHuaMarks(personA.phuThe).length + getSiHuaMarks(personA.ming).length;
  const sihuaB = getSiHuaMarks(personB.phuThe).length + getSiHuaMarks(personB.ming).length;
  const kyCount = [...(personA.phuThe?.stars || []), ...(personB.phuThe?.stars || [])].filter((star) => star.siHua === '忌').length;
  const sihuaScore = clampScore(7 + sihuaA + sihuaB - kyCount * 3, 0, 15);

  const daxianSamePalace = personA.currentDaXian?.palaceName === personB.currentDaXian?.palaceName;
  const daxianScore = clampScore((daxianSamePalace ? 8 : 5) + (personA.currentDaXian && personB.currentDaXian ? 2 : 0), 0, 10);

  const total = clampScore(mingSpouseScore + phucScore + starHarmonyScore + sihuaScore + daxianScore, 0, 100);
  const level = describeLevel(total);

  const emotion = clampScore(Math.round((phucScore / 25) * 100), 0, 100);
  const communication = clampScore(Math.round(((starHarmonyScore + mingOverlap.length * 2) / 24) * 100), 0, 100);
  const marriage = clampScore(Math.round(((mingSpouseScore + sihuaScore) / 45) * 100), 0, 100);
  const conflict = clampScore(100 - Math.round((relationTough + kyCount * 2 + phucTough) * 8), 0, 100);

  const axes: CompatibilityAxis[] = [
    {
      key: 'emotion',
      label: 'Tình cảm',
      score: emotion,
      summary: describeAxis(emotion, 'Dễ đồng cảm, giữ được cảm xúc ấm.', 'Có cảm tình nhưng cần nuôi nhịp gắn kết đều.', 'Dễ lệch nhịp cảm xúc nếu thiếu lắng nghe.'),
    },
    {
      key: 'communication',
      label: 'Giao tiếp',
      score: communication,
      summary: describeAxis(communication, 'Nói chuyện dễ vào nhịp, hiểu ý nhanh.', 'Trao đổi được nhưng cần nói rõ nhu cầu.', 'Dễ hiểu sai, cần quy ước cách nói chuyện khi căng.'),
    },
    {
      key: 'marriage',
      label: 'Hôn nhân',
      score: marriage,
      summary: describeAxis(marriage, 'Có nền để đi đường dài nếu cùng trưởng thành.', 'Có thể đi xa, nhưng cần chọn thời điểm và cam kết rõ.', 'Đường dài nhiều bài học, không nên vội ràng buộc.'),
    },
    {
      key: 'conflict',
      label: 'Xung đột',
      score: conflict,
      summary: describeAxis(conflict, 'Mâu thuẫn có thể hóa giải sớm.', 'Xung đột không lớn nhưng dễ âm ỉ nếu né tránh.', 'Điểm va chạm khá rõ, cần kỷ luật cảm xúc.'),
    },
  ];

  const sharedMingText = mingOverlap.length ? `Cùng cộng hưởng ở Mệnh qua ${viStars(mingOverlap)}.` : 'Ít trùng trực tiếp ở cung Mệnh, cần học cách bổ trợ thay vì đòi hỏi giống nhau.';
  const spouseMatchText = mingToSpouseA.length || mingToSpouseB.length
    ? `Mệnh và Phu thê có giao điểm qua ${viStars([...new Set([...mingToSpouseA, ...mingToSpouseB])])}.`
    : 'Mệnh và Phu thê ít giao điểm trực tiếp, nên đi chậm để quan sát kỳ vọng hôn phối.';

  const details = [
    `${personA.name}: ${viWuxingJu(chartA.wuxingJuName)}, Mệnh ${personA.mingStars.length ? viStars(personA.mingStars) : 'Vô chính diệu'}, Phu thê ${personA.spouseStars.length ? viStars(personA.spouseStars) : 'Vô chính diệu'}.`,
    `${personB.name}: ${viWuxingJu(chartB.wuxingJuName)}, Mệnh ${personB.mingStars.length ? viStars(personB.mingStars) : 'Vô chính diệu'}, Phu thê ${personB.spouseStars.length ? viStars(personB.spouseStars) : 'Vô chính diệu'}.`,
    sharedMingText,
    spouseMatchText,
  ];

  const advice = [
    emotion >= 65 ? 'Giữ nhịp chia sẻ đều, đừng chỉ dựa vào cảm xúc cao trào.' : 'Đặt lịch nói chuyện thẳng về mong đợi và ranh giới.',
    conflict >= 65 ? 'Khi có căng thẳng, chốt vấn đề trong ngày để tránh tích tụ.' : 'Có quy ước dừng tranh cãi khi nóng, quay lại sau khi cả hai bình tĩnh.',
    marriage >= 65 ? 'Nếu tính chuyện dài lâu, nên bàn sớm về tài chính, gia đình và nơi ở.' : 'Chưa nên quyết nhanh chuyện cam kết lớn trước khi thử qua áp lực thực tế.',
  ];

  const premiumSections: CompatibilitySection[] = [
    {
      title: 'Mệnh ↔ Phu thê',
      score: mingSpouseScore,
      summary: spouseMatchText,
      highlights: [
        `${personA.name} Mệnh: ${personA.mingStars.length ? viStars(personA.mingStars) : 'Vô chính diệu'}.`,
        `${personB.name} Mệnh: ${personB.mingStars.length ? viStars(personB.mingStars) : 'Vô chính diệu'}.`,
        `${personA.name} Phu thê: ${personA.spouseStars.length ? viStars(personA.spouseStars) : 'Vô chính diệu'}.`,
        `${personB.name} Phu thê: ${personB.spouseStars.length ? viStars(personB.spouseStars) : 'Vô chính diệu'}.`,
      ],
    },
    {
      title: 'Phúc đức đường dài',
      score: phucScore,
      summary: phucTough > phucGood ? 'Đường dài cần nhiều tu dưỡng và kiên nhẫn hơn mức bình thường.' : 'Phúc đức khá ổn, có nền để bồi đắp cảm tình bền.',
      highlights: [
        `${personA.name} Phúc đức: ${personA.phucStars.length ? viStars(personA.phucStars) : 'Ít sao nổi bật'}.`,
        `${personB.name} Phúc đức: ${personB.phucStars.length ? viStars(personB.phucStars) : 'Ít sao nổi bật'}.`,
      ],
    },
    {
      title: 'Tứ hóa và điểm kéo - đẩy',
      score: sihuaScore,
      summary: kyCount > 0 ? 'Có Hóa Kỵ chạm vùng quan hệ, nên tránh suy diễn và im lặng kéo dài.' : 'Tứ hóa không tạo áp lực lớn ở vùng quan hệ.',
      highlights: [
        `${personA.name}: ${getSiHuaMarks(personA.ming).concat(getSiHuaMarks(personA.phuThe)).join(' · ') || 'Chưa thấy tứ hóa nổi bật ở Mệnh/Phu thê'}.`,
        `${personB.name}: ${getSiHuaMarks(personB.ming).concat(getSiHuaMarks(personB.phuThe)).join(' · ') || 'Chưa thấy tứ hóa nổi bật ở Mệnh/Phu thê'}.`,
      ],
    },
    {
      title: 'Đại hạn hiện tại',
      score: daxianScore,
      summary: daxianSamePalace ? 'Hai người đang vào chu kỳ sống khá đồng pha, dễ hiểu áp lực của nhau hơn.' : 'Đại hạn hiện tại không hoàn toàn đồng pha, cần tôn trọng khác biệt nhịp phát triển.',
      highlights: [
        `${personA.name}: ${personA.currentDaXian ? `Tuổi ${personA.currentDaXian.startAge}-${personA.currentDaXian.endAge} tại cung ${PALACE_VI[personA.currentDaXian.palaceName] || personA.currentDaXian.palaceName}` : 'Chưa xác định đại hạn'}.`,
        `${personB.name}: ${personB.currentDaXian ? `Tuổi ${personB.currentDaXian.startAge}-${personB.currentDaXian.endAge} tại cung ${PALACE_VI[personB.currentDaXian.palaceName] || personB.currentDaXian.palaceName}` : 'Chưa xác định đại hạn'}.`,
      ],
    },
  ];

  return {
    score: total,
    level,
    summary: `Mức độ hòa hợp: ${level}. Trọng tâm nằm ở ${mingToSpouseA.length || mingToSpouseB.length ? 'độ khớp giữa Mệnh và Phu thê' : 'khả năng bù trừ giữa hai lá số'}, cùng nền Phúc đức ${phucScore >= 15 ? 'khá ổn' : 'cần vun bồi thêm'}.`,
    axes,
    advice,
    details,
    premiumSections,
  };
}
