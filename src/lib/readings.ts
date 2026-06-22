export type ServiceKey = 'tu-vi' | 'kinh-dich' | 'xin-xam' | 'tarot';

export interface ReadingInput {
  service: ServiceKey;
  name?: string;
  question?: string;
  birthDate?: string;
  birthTime?: string;
  gender?: 'male' | 'female' | 'other';
}

export interface ReadingResult {
  title: string;
  summary: string;
  details: string[];
  advice: string;
}

const stems = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
const branches = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
const palaces = ['Mệnh', 'Phụ mẫu', 'Phúc đức', 'Điền trạch', 'Quan lộc', 'Nô bộc', 'Thiên di', 'Tật ách', 'Tài bạch', 'Tử tức', 'Phu thê', 'Huynh đệ'];
const stars = ['Tử Vi', 'Thiên Cơ', 'Thái Dương', 'Vũ Khúc', 'Thiên Đồng', 'Liêm Trinh', 'Thiên Phủ', 'Thái Âm', 'Tham Lang', 'Cự Môn', 'Thiên Tướng', 'Thiên Lương', 'Thất Sát', 'Phá Quân'];
const hexagrams = ['Thuần Càn', 'Thuần Khôn', 'Thủy Lôi Truân', 'Sơn Thủy Mông', 'Thủy Thiên Nhu', 'Thiên Thủy Tụng', 'Địa Thủy Sư', 'Thủy Địa Tỷ'];
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

export function createReading(input: ReadingInput): ReadingResult {
  const seed = hash(JSON.stringify(input));
  const question = input.question?.trim() || 'Tổng quan hiện tại';

  if (input.service === 'tu-vi') {
    const year = input.birthDate ? new Date(input.birthDate).getFullYear() : new Date().getFullYear();
    const canChi = `${pick(stems, year)} ${pick(branches, year)}`;
    const palace = pick(palaces, seed);
    const mainStar = pick(stars, seed, 3);
    return {
      title: `Lá số Tử Vi: ${input.name || 'Đương số'}`,
      summary: `${canChi}, trọng tâm nằm tại cung ${palace}, chính tinh nổi bật là ${mainStar}.`,
      details: [`Cung ${palace} cho thấy trục quyết định giai đoạn này.`, `${mainStar} nhấn mạnh cách hành động, tham vọng và bài học cá nhân.`, 'Bản MVP đang dùng luận giải rule-based; có thể nối AI/RAG ở API để sinh diễn giải sâu.'],
      advice: 'Ưu tiên chọn một mục tiêu chính, theo dõi 90 ngày, tránh đổi hướng vì cảm xúc ngắn hạn.',
    };
  }

  if (input.service === 'kinh-dich') {
    const hexagram = pick(hexagrams, seed);
    return {
      title: `Quẻ Kinh Dịch: ${hexagram}`,
      summary: `Câu hỏi: ${question}. Quẻ chủ ${hexagram} báo thời vận cần xét thế, thời và người đồng hành.`,
      details: ['Quẻ chủ mô tả hoàn cảnh hiện tại.', 'Hào động dùng để tìm điểm cần đổi trước.', 'Kết quả tốt khi hành động thuận thời, không cưỡng cầu.'],
      advice: 'Hỏi lại bằng câu cụ thể hơn nếu cần chọn giữa hai phương án.',
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
