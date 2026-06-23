import type { ZiweiChart } from './types';
import { viPalace, viStars } from './vietnamese';

export interface CachCucPattern {
  type: 'tu-co' | 'ngu-hanh' | 'con-duong' | 'ban-dia' | 'thap-can' | 'khong-canh';
  name: string;
  description: string;
  evidence?: string;
  severity?: 'low' | 'medium' | 'high';
  palace?: string;
}

export function detectCachCuc(chart: ZiweiChart): CachCucPattern[] {
  const patterns: CachCucPattern[] = [];

  const ming = chart.palaces.find(p => p.isMingGong);
  
  if (!ming) return patterns;

  const mingStars = ming.stars.filter(s => s.type === 'major').map(s => s.name);

  if (mingStars.includes('紫微') && mingStars.includes('天相')) {
    patterns.push({
      type: 'tu-co',
      name: 'Tử Tương',
      description: 'Tính trách nhiệm cao, tư duy kỹ lưỡng, thích quyền lực hợp pháp.',
    });
  }

  if (mingStars.includes('天机') && mingStars.includes('太阴')) {
    patterns.push({
      type: 'tu-co',
      name: 'Cơ Âm',
      description: 'Tài năng thông minh, tính sáng tạo cao, cần chú ý sức khỏe tâm lý.',
    });
  }

  if (mingStars.includes('太阳') && mingStars.includes('天梁')) {
    patterns.push({
      type: 'tu-co',
      name: 'Dương Lương',
      description: 'Nhiệt tình, hòa nhập xã hội, tính kỷ luật cao, lãnh đạo tự nhiên.',
    });
  }

  if (mingStars.includes('武曲') && mingStars.includes('天府')) {
    patterns.push({
      type: 'tu-co',
      name: 'Vũ Phủ',
      description: 'Kinh tế vững vàng, tính bảo thủ, yêu thích sự ổn định.',
    });
  }

  if (mingStars.includes('天同') && mingStars.includes('巨门')) {
    patterns.push({
      type: 'tu-co',
      name: 'Đồng Môn',
      description: 'Tính cảm xúc phong phú, giao tiếp tốt, cần cân bằng công việc.',
    });
  }

  if (mingStars.includes('廉贞') && mingStars.includes('破军')) {
    patterns.push({
      type: 'tu-co',
      name: 'Trinh Quân',
      description: 'Quyết đoán, đột phá mạnh, cần kiểm soát cảm xúc.',
    });
  }

  if (mingStars.includes('贪狼') && mingStars.includes('天相')) {
    patterns.push({
      type: 'tu-co',
      name: 'Tham Tướng',
      description: 'Tham vọng lớn, sáng tạo cao, khả năng quản lý tốt.',
    });
  }

  if (mingStars.includes('七杀') && mingStars.includes('天府')) {
    patterns.push({
      type: 'tu-co',
      name: 'Sát Phủ',
      description: 'Quyết đoán, lãnh đạo mạnh, cần cân bằng quyền lực và thương yêu.',
    });
  }

  const wuxingJu = chart.wuxingJu;
  if (wuxingJu === 2) {
    patterns.push({
      type: 'ngu-hanh',
      name: `Nhị cục (Mệnh số ${wuxingJu})`,
      description: 'Chu kỳ năng lượng nhanh, sự thay đổi liên tục, linh hoạt cao.',
    });
  } else if (wuxingJu === 3) {
    patterns.push({
      type: 'ngu-hanh',
      name: `Tam cục (Mệnh số ${wuxingJu})`,
      description: 'Cân bằng trung bình, tính linh hoạt và ổn định ngang bằng.',
    });
  } else if (wuxingJu === 4) {
    patterns.push({
      type: 'ngu-hanh',
      name: `Tứ cục (Mệnh số ${wuxingJu})`,
      description: 'Sự cân bằng hoàn hảo, đạt được trạng thái hài hòa cao.',
    });
  } else if (wuxingJu === 5) {
    patterns.push({
      type: 'ngu-hanh',
      name: `Ngũ cục (Mệnh số ${wuxingJu})`,
      description: 'Năng lượng mạnh mẽ, sự dôi dư lớn, cần kiểm soát hạn chế.',
    });
  } else if (wuxingJu === 6) {
    patterns.push({
      type: 'ngu-hanh',
      name: `Lục cục (Mệnh số ${wuxingJu})`,
      description: 'Năng lượng siêu thừa, sự bất cân bằng mạnh, cần điều hòa nhiều.',
    });
  }

  const kongStars = ming.stars.filter(s => s.name === '地空' || s.name === '地劫' || s.name === '天空' || s.name === '旬空');
  if (kongStars.length > 0) {
    patterns.push({
      type: 'khong-canh',
      name: 'Không Cạnh',
      description: `Năng lượng bị ảnh hưởng bởi ${viStars(kongStars.map(s => s.name))}, cần tập trung cao độ.`,
    });
  }

  const daHaoStars = ming.stars.filter(s => s.name === '大耗' || s.name === '大耗' || s.name === '天使' || s.name === '天伤');
  if (daHaoStars.length > 0) {
    patterns.push({
      type: 'ban-dia',
      name: 'Bán Địa',
      description: 'Cần cảnh báo về tài chính, hãy cẩn trọng trong giao dịch.',
      evidence: viStars(daHaoStars.map(s => s.name)),
      severity: 'medium',
      palace: viPalace(ming.name),
    });
  }

  const phuThe = chart.palaces.find(p => p.name === '夫妻宫');
  const phuTheMajors = phuThe?.stars.filter(s => s.type === 'major').map(s => s.name) || [];
  if (phuTheMajors.includes('天相') || phuTheMajors.includes('天府')) {
    patterns.push({
      type: 'con-duong',
      name: 'Phu thê ổn định',
      description: 'Cung Phu thê có xu hướng trọng sự bền, hợp kiểu quan hệ trưởng thành và rõ cam kết.',
      evidence: phuTheMajors.length ? viStars(phuTheMajors) : 'Vô chính diệu',
      severity: 'low',
      palace: 'Phu thê',
    });
  }
  if (phuThe?.stars.some(s => s.name === '化忌' || s.siHua === '忌' || s.name === '破军' || s.name === '七杀')) {
    patterns.push({
      type: 'khong-canh',
      name: 'Phu thê nhiều áp lực',
      description: 'Đường quan hệ dễ va chạm kỳ vọng hoặc thay đổi mạnh nếu thiếu đối thoại và kỷ luật cảm xúc.',
      evidence: viStars(phuThe.stars.filter(s => s.siHua === '忌' || s.name === '破军' || s.name === '七杀').map(s => s.name)),
      severity: 'high',
      palace: 'Phu thê',
    });
  }

  const taiBach = chart.palaces.find(p => p.name === '财帛宫');
  const taiMajors = taiBach?.stars.filter(s => s.type === 'major').map(s => s.name) || [];
  if (taiMajors.includes('武曲') || taiMajors.includes('天府')) {
    patterns.push({
      type: 'con-duong',
      name: 'Tài bạch có nền giữ tiền',
      description: 'Tài bạch thiên về tích lũy, quản trị nguồn lực và bền nhịp hơn kiểu đánh nhanh.',
      evidence: viStars(taiMajors),
      severity: 'low',
      palace: 'Tài bạch',
    });
  }

  const quanLoc = chart.palaces.find(p => p.name === '官禄宫');
  const quanMajors = quanLoc?.stars.filter(s => s.type === 'major').map(s => s.name) || [];
  if (quanMajors.includes('紫微') || quanMajors.includes('太阳') || quanMajors.includes('天梁')) {
    patterns.push({
      type: 'con-duong',
      name: 'Quan lộc thiên hướng gánh vai lớn',
      description: 'Sự nghiệp hợp đường dài, vai trò chịu trách nhiệm, dẫn dắt hoặc làm chỗ dựa chuyên môn.',
      evidence: viStars(quanMajors),
      severity: 'medium',
      palace: 'Quan lộc',
    });
  }

  const currentDaXian = chart.daXians[chart.currentDaXianIndex];
  if (currentDaXian) {
    patterns.push({
      type: 'thap-can',
      name: 'Trọng tâm đại hạn hiện tại',
      description: `Giai đoạn hiện tại xoay nhiều quanh cung ${viPalace(currentDaXian.palaceName)}, nên ưu tiên quyết định theo bài học của cung này.`,
      evidence: `Tuổi ${currentDaXian.startAge}-${currentDaXian.endAge}`,
      severity: 'medium',
      palace: viPalace(currentDaXian.palaceName),
    });
  }

  return patterns;
}

export function getStarDeepMeaning(starName: string, palaceName: string): string {
  const meanings: Record<string, Record<string, string>> = {
    '紫微': {
      default: 'Vương tinh, chủ tướng mệnh, đại bộ tướng. Tính chính trực, tự tin cao, thích quyền lực.',
      '命宫': 'Tự Vi tại Mệnh: Lãnh đạo tự nhiên, quyết định mạnh, cần cân bằng quyền lực và lắng nghe ý kiến.',
      '财帛宫': 'Tự Vi tại Tài bạch: Kinh tế ổn định, tư duy kinh doanh sắc sảo, thu nhập ổn định cao.',
    },
    '天机': {
      default: 'Thông minh, thay đổi, linh hoạt. Tính toán cao, thích phân tích, cần ổn định tâm lý.',
      '命宫': 'Thiên Cơ tại Mệnh: Tư duy thông minh, khó yên tâm, cần tập trung vào một lĩnh vực.',
      '财帛宫': 'Thiên Cơ tại Tài bạch: Thu nhập thay đổi, sáng tạo kinh doanh cao, cần tích lũy kỹ năng.',
    },
    '太阳': {
      default: 'Ánh sáng, năng lượng, sáng tạo. Tính cách cởi mở, thích giúp đỡ, lãnh đạo bằng tình cảm.',
      '命宫': 'Thái Dương tại Mệnh: Nhiệt tình, nhân hậu, dễ bị tổn thương vì quá chân thành.',
      '财帛宫': 'Thái Dương tại Tài bạch: Thu nhập từ sáng tạo, công việc công cộng, cần quản lý chi tiêu.',
    },
  };

  return meanings[starName]?.[palaceName] || meanings[starName]?.default || `${starName}: Ảnh hưởng tại ${palaceName}.`;
}

export function analyzeCurrentDaXian(chart: ZiweiChart): string {
  const currentAge = chart.currentAge;
  const currentDaXian = chart.daXians[chart.currentDaXianIndex];

  if (!currentDaXian) {
    return `Tuổi ${currentAge}: Chưa xác định giai đoạn đại hạn hiện tại.`;
  }

  const daxianPalace = chart.palaces.find(p => p.branch === currentDaXian.palaceBranch);
  const mainStars = daxianPalace?.stars.filter(s => s.type === 'major') || [];

  return `Tuổi ${currentAge}-${currentDaXian.endAge}: Đại hạn tại cung ${daxianPalace?.name}. Chính tinh: ${mainStars.length ? viStars(mainStars.map(s => s.name)) : 'Vô chính diệu'}. Cần tập trung phát triển theo hướng này.`;
}
