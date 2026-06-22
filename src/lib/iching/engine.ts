export interface IChingLine {
  position: number;
  value: 6 | 7 | 8 | 9;
  yinYang: 'âm' | 'dương';
  moving: boolean;
  text: string;
}

export interface Hexagram {
  number: number;
  name: string;
  han: string;
  upper: string;
  lower: string;
  judgment: string;
  image: string;
}

export interface IChingReading {
  question: string;
  hexagram: Hexagram;
  changedHexagram?: Hexagram;
  movingLines: IChingLine[];
  lines: IChingLine[];
  summary: string;
  advice: string;
}

type TrigramKey = 'can' | 'doai' | 'ly' | 'chan' | 'ton' | 'kham' | 'canNui' | 'khon';

const TRIGRAM_BITS: Record<TrigramKey, string> = {
  khon: '000',
  canNui: '001',
  kham: '010',
  ton: '011',
  chan: '100',
  ly: '101',
  doai: '110',
  can: '111',
};

const TRIGRAM_NAME: Record<TrigramKey, string> = {
  can: 'Càn / Trời',
  doai: 'Đoài / Đầm',
  ly: 'Ly / Lửa',
  chan: 'Chấn / Sấm',
  ton: 'Tốn / Gió',
  kham: 'Khảm / Nước',
  canNui: 'Cấn / Núi',
  khon: 'Khôn / Đất',
};

const HEXAGRAMS: Array<Omit<Hexagram, 'upper' | 'lower'>> = [
  { number: 1, name: 'Thuần Càn', han: '乾', judgment: 'Sức sáng tạo mạnh, hợp khởi sự khi có chính đạo.', image: 'Trời vận hành không nghỉ; người quân tử tự cường.' },
  { number: 2, name: 'Thuần Khôn', han: '坤', judgment: 'Nhu thuận, tiếp nhận, bền bỉ thì lợi.', image: 'Đất dày chở vạn vật; lấy đức nâng việc.' },
  { number: 3, name: 'Thủy Lôi Truân', han: '屯', judgment: 'Khởi đầu khó, cần lập trật tự trước khi tiến.', image: 'Mây sấm đầy trời; việc mới cần người dẫn đường.' },
  { number: 4, name: 'Sơn Thủy Mông', han: '蒙', judgment: 'Mờ mịt vì thiếu học hỏi; hỏi đúng thì mở.', image: 'Dưới núi có suối; nuôi trí bằng kỷ luật.' },
  { number: 5, name: 'Thủy Thiên Nhu', han: '需', judgment: 'Chờ đúng thời, chuẩn bị đầy đủ rồi hành động.', image: 'Mây lên trời; ăn uống, nghỉ sức để chờ mưa.' },
  { number: 6, name: 'Thiên Thủy Tụng', han: '訟', judgment: 'Tranh chấp nên dừng sớm, tìm người công tâm.', image: 'Trời và nước đi ngược; xét kỹ trước kiện tụng.' },
  { number: 7, name: 'Địa Thủy Sư', han: '師', judgment: 'Cần tổ chức, kỷ luật và người chỉ huy đúng.', image: 'Trong đất có nước; gom dân thành đội ngũ.' },
  { number: 8, name: 'Thủy Địa Tỷ', han: '比', judgment: 'Liên kết đúng người thì lợi; chậm sẽ mất cơ hội.', image: 'Nước trên đất; thân cận người cùng chí.' },
  { number: 9, name: 'Phong Thiên Tiểu Súc', han: '小畜', judgment: 'Tích nhỏ, chưa đủ lực lớn; mềm giữ cứng.', image: 'Gió đi trên trời; trau văn đức, gom từng phần.' },
  { number: 10, name: 'Thiên Trạch Lý', han: '履', judgment: 'Đi trên thế nguy nhưng giữ lễ thì không hại.', image: 'Trên trời dưới đầm; phân biệt trên dưới.' },
  { number: 11, name: 'Địa Thiên Thái', han: '泰', judgment: 'Thông thuận, âm dương giao hòa, việc tiến được.', image: 'Trời đất giao nhau; chia phúc để giữ thái bình.' },
  { number: 12, name: 'Thiên Địa Bĩ', han: '否', judgment: 'Bế tắc, người nhỏ lấn người ngay; nên thủ chính.', image: 'Trời đất không giao; quân tử tiết kiệm đức.' },
  { number: 13, name: 'Thiên Hỏa Đồng Nhân', han: '同人', judgment: 'Đồng lòng công khai thì lợi việc lớn.', image: 'Trời cùng lửa; phân biệt loại người để hợp tác.' },
  { number: 14, name: 'Hỏa Thiên Đại Hữu', han: '大有', judgment: 'Có lớn, sáng suốt thì giữ được phúc.', image: 'Lửa trên trời; ngăn ác, nêu thiện.' },
  { number: 15, name: 'Địa Sơn Khiêm', han: '謙', judgment: 'Khiêm hạ thì hanh thông, càng cao càng cần hạ mình.', image: 'Trong đất có núi; bớt chỗ đầy, bù chỗ thiếu.' },
  { number: 16, name: 'Lôi Địa Dự', han: '豫', judgment: 'Vui thuận, hợp chuẩn bị lực lượng và khởi động.', image: 'Sấm ra khỏi đất; dùng nhạc và lệnh để động dân.' },
  { number: 17, name: 'Trạch Lôi Tùy', han: '隨', judgment: 'Đi theo đúng đạo thì lợi; bỏ cố chấp.', image: 'Trong đầm có sấm; nghỉ đúng lúc.' },
  { number: 18, name: 'Sơn Phong Cổ', han: '蠱', judgment: 'Việc cũ hư cần sửa tận gốc.', image: 'Dưới núi có gió; chấn chỉnh dân, nuôi đức.' },
  { number: 19, name: 'Địa Trạch Lâm', han: '臨', judgment: 'Tiến gần, có cơ hội lớn nhưng phải lo xa.', image: 'Đất trên đầm; dạy dân không mỏi.' },
  { number: 20, name: 'Phong Địa Quan', han: '觀', judgment: 'Quan sát, soi lại mình, chưa vội động.', image: 'Gió đi trên đất; xem dân để lập giáo.' },
  { number: 21, name: 'Hỏa Lôi Phệ Hạp', han: '噬嗑', judgment: 'Có vật cản phải cắn đứt, xử rõ luật.', image: 'Sấm điện; hình phạt rõ để dẹp loạn.' },
  { number: 22, name: 'Sơn Hỏa Bí', han: '賁', judgment: 'Trang sức, hình thức đẹp nhưng không thay bản chất.', image: 'Lửa dưới núi; làm sáng việc nhỏ.' },
  { number: 23, name: 'Sơn Địa Bác', han: '剝', judgment: 'Suy mòn, không hợp tiến; giữ nền.', image: 'Núi tựa đất; hậu đãi dưới để an trên.' },
  { number: 24, name: 'Địa Lôi Phục', han: '復', judgment: 'Quay lại chính đạo, khởi đầu phục hồi.', image: 'Sấm trong đất; đóng cửa lúc chí âm để dưỡng dương.' },
  { number: 25, name: 'Thiên Lôi Vô Vọng', han: '無妄', judgment: 'Không vọng động; ngay thật thì không lỗi.', image: 'Dưới trời có sấm; nuôi vạn vật theo thời.' },
  { number: 26, name: 'Sơn Thiên Đại Súc', han: '大畜', judgment: 'Tích lũy lớn, dừng để nuôi lực.', image: 'Trời trong núi; học lời xưa, nuôi đức.' },
  { number: 27, name: 'Sơn Lôi Di', han: '頤', judgment: 'Nuôi dưỡng đúng miệng, đúng tâm, đúng người.', image: 'Dưới núi có sấm; cẩn lời, tiết ăn.' },
  { number: 28, name: 'Trạch Phong Đại Quá', han: '大過', judgment: 'Gánh quá nặng, cần đổi cấu trúc.', image: 'Đầm ngập cây; đứng riêng không sợ.' },
  { number: 29, name: 'Thuần Khảm', han: '坎', judgment: 'Hiểm lặp lại; giữ lòng tin, đi từng bước.', image: 'Nước chảy mãi; thường đức, tập việc dạy.' },
  { number: 30, name: 'Thuần Ly', han: '離', judgment: 'Sáng rõ, cần bám vào điều đúng.', image: 'Lửa sáng hai lần; soi bốn phương.' },
  { number: 31, name: 'Trạch Sơn Hàm', han: '咸', judgment: 'Cảm ứng, tình cảm khởi; chân thành thì lợi.', image: 'Đầm trên núi; mở lòng nhận người.' },
  { number: 32, name: 'Lôi Phong Hằng', han: '恆', judgment: 'Bền lâu, giữ nhịp đều thì thành.', image: 'Sấm gió; đứng vững không đổi phương.' },
  { number: 33, name: 'Thiên Sơn Độn', han: '遯', judgment: 'Nên lui để giữ thế, không phải thất bại.', image: 'Dưới trời có núi; xa kẻ nhỏ.' },
  { number: 34, name: 'Lôi Thiên Đại Tráng', han: '大壯', judgment: 'Sức mạnh lớn, phải chính mới lợi.', image: 'Sấm trên trời; không theo lễ thì không đi.' },
  { number: 35, name: 'Hỏa Địa Tấn', han: '晉', judgment: 'Tiến sáng, được nâng đỡ.', image: 'Mặt trời lên khỏi đất; tự sáng đức.' },
  { number: 36, name: 'Địa Hỏa Minh Di', han: '明夷', judgment: 'Ánh sáng bị thương; ẩn tài giữ chính.', image: 'Sáng vào trong đất; dùng tối để giữ sáng.' },
  { number: 37, name: 'Phong Hỏa Gia Nhân', han: '家人', judgment: 'Việc nhà, vai trò rõ thì yên.', image: 'Gió từ lửa; lời có vật, hành có thường.' },
  { number: 38, name: 'Hỏa Trạch Khuê', han: '睽', judgment: 'Khác biệt, việc nhỏ lợi, việc lớn cần hòa.', image: 'Lửa trên đầm; đồng mà khác.' },
  { number: 39, name: 'Thủy Sơn Kiển', han: '蹇', judgment: 'Gặp trở, nên quay về tìm người giúp.', image: 'Nước trên núi; xét mình tu đức.' },
  { number: 40, name: 'Lôi Thủy Giải', han: '解', judgment: 'Giải ách, nên xử nhanh phần còn lại.', image: 'Sấm mưa; tha lỗi, giảm tội.' },
  { number: 41, name: 'Sơn Trạch Tổn', han: '損', judgment: 'Bớt cái dư để nuôi cái cần.', image: 'Núi dưới đầm; kiềm giận, bớt ham.' },
  { number: 42, name: 'Phong Lôi Ích', han: '益', judgment: 'Tăng ích, lợi đi xa và sửa lỗi.', image: 'Gió sấm; thấy thiện thì theo, có lỗi thì đổi.' },
  { number: 43, name: 'Trạch Thiên Quải', han: '夬', judgment: 'Quyết đoán loại bỏ sai lệch, công khai rõ ràng.', image: 'Đầm lên trời; ban lộc xuống dưới.' },
  { number: 44, name: 'Thiên Phong Cấu', han: '姤', judgment: 'Gặp bất ngờ; không để yếu tố nhỏ chi phối lớn.', image: 'Gió dưới trời; ban mệnh khắp bốn phương.' },
  { number: 45, name: 'Trạch Địa Tụy', han: '萃', judgment: 'Tụ họp, cần trung tâm và lễ nghi.', image: 'Đầm trên đất; phòng bị khí giới.' },
  { number: 46, name: 'Địa Phong Thăng', han: '升', judgment: 'Đi lên từng bậc, gặp người lớn thì lợi.', image: 'Cây mọc trong đất; tích nhỏ thành cao.' },
  { number: 47, name: 'Trạch Thủy Khốn', han: '困', judgment: 'Bị vây, giữ lời ít, giữ chí bền.', image: 'Đầm không nước; quân tử hy sinh thân để giữ mệnh.' },
  { number: 48, name: 'Thủy Phong Tỉnh', han: '井', judgment: 'Giếng nuôi người; sửa hệ thống, giữ nguồn.', image: 'Trên cây có nước; khuyến dân giúp nhau.' },
  { number: 49, name: 'Trạch Hỏa Cách', han: '革', judgment: 'Cải cách đúng thời thì tin.', image: 'Trong đầm có lửa; làm lịch rõ thời.' },
  { number: 50, name: 'Hỏa Phong Đỉnh', han: '鼎', judgment: 'Lập trật tự mới, nuôi hiền tài.', image: 'Lửa trên gỗ; chính vị để ngưng mệnh.' },
  { number: 51, name: 'Thuần Chấn', han: '震', judgment: 'Chấn động, sợ rồi cười; tỉnh thức.', image: 'Sấm lặp lại; sợ mà sửa mình.' },
  { number: 52, name: 'Thuần Cấn', han: '艮', judgment: 'Dừng đúng chỗ, không chạy theo vọng động.', image: 'Núi chồng núi; nghĩ không vượt vị trí.' },
  { number: 53, name: 'Phong Sơn Tiệm', han: '漸', judgment: 'Tiến dần, cưới hỏi và việc dài hạn có lợi.', image: 'Cây trên núi; ở hiền để cải tục.' },
  { number: 54, name: 'Lôi Trạch Quy Muội', han: '歸妹', judgment: 'Vị trí chưa chính, không nên cưỡng cầu.', image: 'Sấm trên đầm; biết kết cuộc để giữ lâu.' },
  { number: 55, name: 'Lôi Hỏa Phong', han: '豐', judgment: 'Thịnh lớn nhưng ngắn; dùng sáng để xử việc.', image: 'Sấm điện cùng đến; quyết đoán hình phạt.' },
  { number: 56, name: 'Hỏa Sơn Lữ', han: '旅', judgment: 'Ở thế khách, việc nhỏ lợi, khiêm thì yên.', image: 'Lửa trên núi; hình phạt rõ mà không kéo dài.' },
  { number: 57, name: 'Thuần Tốn', han: '巽', judgment: 'Nhập dần bằng mềm mỏng, lợi gặp người lớn.', image: 'Gió theo nhau; truyền mệnh, làm việc.' },
  { number: 58, name: 'Thuần Đoài', han: '兌', judgment: 'Vui thuận, giao tiếp mở thì hanh.', image: 'Đầm nối đầm; bạn bè cùng học.' },
  { number: 59, name: 'Phong Thủy Hoán', han: '渙', judgment: 'Tan rã rồi quy tụ; cần trung tâm tinh thần.', image: 'Gió trên nước; lập miếu, vượt sông lớn.' },
  { number: 60, name: 'Thủy Trạch Tiết', han: '節', judgment: 'Tiết chế, có giới hạn thì thông.', image: 'Nước trên đầm; đặt số và đức hạnh.' },
  { number: 61, name: 'Phong Trạch Trung Phu', han: '中孚', judgment: 'Thành tín ở giữa, cảm được người.', image: 'Gió trên đầm; xét án chậm giết.' },
  { number: 62, name: 'Lôi Sơn Tiểu Quá', han: '小過', judgment: 'Quá nhỏ, hợp việc khiêm, không hợp bay cao.', image: 'Sấm trên núi; đi quá cung kính, tang quá buồn, dùng quá tiết kiệm.' },
  { number: 63, name: 'Thủy Hỏa Ký Tế', han: '既濟', judgment: 'Việc đã xong, giữ cuối như đầu.', image: 'Nước trên lửa; phòng họa từ trước.' },
  { number: 64, name: 'Hỏa Thủy Vị Tế', han: '未濟', judgment: 'Chưa xong, gần thành càng phải cẩn thận.', image: 'Lửa trên nước; phân biệt vật, đặt đúng chỗ.' },
];

const KING_WEN: Record<string, number> = {
  'can-can': 1, 'khon-khon': 2, 'kham-chan': 3, 'canNui-kham': 4, 'kham-can': 5, 'can-kham': 6, 'khon-kham': 7, 'kham-khon': 8,
  'ton-can': 9, 'can-doai': 10, 'khon-can': 11, 'can-khon': 12, 'can-ly': 13, 'ly-can': 14, 'khon-canNui': 15, 'chan-khon': 16,
  'doai-chan': 17, 'canNui-ton': 18, 'khon-doai': 19, 'ton-khon': 20, 'ly-chan': 21, 'canNui-ly': 22, 'canNui-khon': 23, 'khon-chan': 24,
  'can-chan': 25, 'canNui-can': 26, 'canNui-chan': 27, 'doai-ton': 28, 'kham-kham': 29, 'ly-ly': 30, 'doai-canNui': 31, 'chan-ton': 32,
  'can-canNui': 33, 'chan-can': 34, 'ly-khon': 35, 'khon-ly': 36, 'ton-ly': 37, 'ly-doai': 38, 'kham-canNui': 39, 'chan-kham': 40,
  'canNui-doai': 41, 'ton-chan': 42, 'doai-can': 43, 'can-ton': 44, 'doai-khon': 45, 'khon-ton': 46, 'doai-kham': 47, 'kham-ton': 48,
  'doai-ly': 49, 'ly-ton': 50, 'chan-chan': 51, 'canNui-canNui': 52, 'ton-canNui': 53, 'chan-doai': 54, 'chan-ly': 55, 'ly-canNui': 56,
  'ton-ton': 57, 'doai-doai': 58, 'ton-kham': 59, 'kham-doai': 60, 'ton-doai': 61, 'chan-canNui': 62, 'kham-ly': 63, 'ly-kham': 64,
};

function hashText(value: string) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function next(seed: number) {
  return (Math.imul(seed, 1664525) + 1013904223) >>> 0;
}

function trigramFromBits(bits: string): TrigramKey {
  const found = (Object.keys(TRIGRAM_BITS) as TrigramKey[]).find(key => TRIGRAM_BITS[key] === bits);
  return found || 'khon';
}

function findHexagram(upper: TrigramKey, lower: TrigramKey): Hexagram {
  const number = KING_WEN[`${upper}-${lower}`];
  const base = HEXAGRAMS[number - 1];
  return { ...base, upper: TRIGRAM_NAME[upper], lower: TRIGRAM_NAME[lower] };
}

function lineText(line: IChingLine) {
  if (line.value === 6) return 'Lão âm: âm cực hóa dương, việc cũ cần đổi mềm sang cứng.';
  if (line.value === 9) return 'Lão dương: dương cực hóa âm, hành động mạnh cần biết dừng.';
  if (line.value === 7) return 'Thiếu dương: lực đang lên, có thể chủ động nhưng chưa nóng vội.';
  return 'Thiếu âm: nên giữ, dưỡng lực, quan sát thêm.';
}

export function castIChing(question: string, now = new Date()): IChingReading {
  const cleanQuestion = question.trim() || 'Tôi nên làm gì trong tình huống hiện tại?';
  let seed = hashText(`${cleanQuestion}|${now.toISOString().slice(0, 10)}`);
  const values: Array<6 | 7 | 8 | 9> = [];

  for (let i = 0; i < 6; i += 1) {
    seed = next(seed);
    const coins = [seed & 1, (seed >> 3) & 1, (seed >> 7) & 1];
    const heads = coins.reduce((sum, coin) => sum + coin, 0);
    values.push((6 + heads) as 6 | 7 | 8 | 9);
  }

  const lines = values.map((value, index) => ({
    position: index + 1,
    value,
    yinYang: value % 2 === 0 ? 'âm' as const : 'dương' as const,
    moving: value === 6 || value === 9,
    text: '',
  })).map(line => ({ ...line, text: lineText(line) }));

  const bits = lines.map(line => (line.yinYang === 'dương' ? '1' : '0')).join('');
  const lower = trigramFromBits(bits.slice(0, 3));
  const upper = trigramFromBits(bits.slice(3, 6));
  const hexagram = findHexagram(upper, lower);
  const movingLines = lines.filter(line => line.moving);
  const changedBits = lines.map(line => line.moving ? (line.yinYang === 'dương' ? '0' : '1') : (line.yinYang === 'dương' ? '1' : '0')).join('');
  const changedLower = trigramFromBits(changedBits.slice(0, 3));
  const changedUpper = trigramFromBits(changedBits.slice(3, 6));
  const changedHexagram = movingLines.length ? findHexagram(changedUpper, changedLower) : undefined;
  const movingText = movingLines.length ? `Hào động: ${movingLines.map(line => line.position).join(', ')}.` : 'Không có hào động: lấy quẻ chủ làm trọng tâm.';

  return {
    question: cleanQuestion,
    hexagram,
    changedHexagram,
    movingLines,
    lines,
    summary: `${hexagram.name} (${hexagram.han}), thượng quái ${hexagram.upper}, hạ quái ${hexagram.lower}. ${movingText}`,
    advice: changedHexagram ? `Quẻ biến sang ${changedHexagram.name}: hiện trạng cần đổi theo hào động, kết quả phụ thuộc cách xử lý điểm chuyển.` : 'Quẻ tĩnh: giữ đúng nguyên tắc của quẻ chủ, chưa nên đổi hướng lớn.',
  };
}
