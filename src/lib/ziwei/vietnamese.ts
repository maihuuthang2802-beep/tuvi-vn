export const STEM_VI = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
export const BRANCH_VI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

export const PALACE_VI: Record<string, string> = {
  '命宫': 'Mệnh',
  '兄弟宫': 'Huynh đệ',
  '夫妻宫': 'Phu thê',
  '子女宫': 'Tử tức',
  '财帛宫': 'Tài bạch',
  '疾厄宫': 'Tật ách',
  '迁移宫': 'Thiên di',
  '交友宫': 'Nô bộc',
  '官禄宫': 'Quan lộc',
  '田宅宫': 'Điền trạch',
  '福德宫': 'Phúc đức',
  '父母宫': 'Phụ mẫu',
};

export const SIHUA_VI: Record<string, string> = {
  '禄': 'Hóa Lộc',
  '权': 'Hóa Quyền',
  '科': 'Hóa Khoa',
  '忌': 'Hóa Kỵ',
};

export const BRIGHTNESS_VI = {
  bright: 'Miếu/vượng',
  normal: 'Bình hòa',
  dim: 'Hãm/yếu',
} as const;

export const STAR_TYPE_VI = {
  major: 'Chính tinh',
  minor: 'Phụ tinh',
  lucky: 'Cát tinh',
  sha: 'Sát tinh',
} as const;

export const STAR_VI: Record<string, string> = {
  '紫微': 'Tử Vi',
  '天机': 'Thiên Cơ',
  '太阳': 'Thái Dương',
  '武曲': 'Vũ Khúc',
  '天同': 'Thiên Đồng',
  '廉贞': 'Liêm Trinh',
  '天府': 'Thiên Phủ',
  '太阴': 'Thái Âm',
  '贪狼': 'Tham Lang',
  '巨门': 'Cự Môn',
  '天相': 'Thiên Tướng',
  '天梁': 'Thiên Lương',
  '七杀': 'Thất Sát',
  '破军': 'Phá Quân',
  '文昌': 'Văn Xương',
  '文曲': 'Văn Khúc',
  '左辅': 'Tả Phù',
  '右弼': 'Hữu Bật',
  '天魁': 'Thiên Khôi',
  '天钺': 'Thiên Việt',
  '禄存': 'Lộc Tồn',
  '天马': 'Thiên Mã',
  '擎羊': 'Kình Dương',
  '陀罗': 'Đà La',
  '火星': 'Hỏa Tinh',
  '铃星': 'Linh Tinh',
  '地空': 'Địa Không',
  '地劫': 'Địa Kiếp',
  '红鸾': 'Hồng Loan',
  '天喜': 'Thiên Hỷ',
  '天刑': 'Thiên Hình',
  '天姚': 'Thiên Diêu',
  '天巫': 'Thiên Vu',
  '天月': 'Thiên Nguyệt',
  '阴煞': 'Âm Sát',
  '台辅': 'Thai Phụ',
  '封诰': 'Phong Cáo',
  '三台': 'Tam Thai',
  '八座': 'Bát Tọa',
  '龙池': 'Long Trì',
  '凤阁': 'Phượng Các',
  '孤辰': 'Cô Thần',
  '寡宿': 'Quả Tú',
  '天哭': 'Thiên Khốc',
  '天虚': 'Thiên Hư',
  '天才': 'Thiên Tài',
  '天寿': 'Thiên Thọ',
  '天官': 'Thiên Quan',
  '天福': 'Thiên Phúc',
  '天伤': 'Thiên Thương',
  '天使': 'Thiên Sứ',
  '天空': 'Thiên Không',
  '旬空': 'Tuần Không',
  '截路': 'Triệt Lộ',
  '大耗': 'Đại Hao',
};

export function viPalace(name: string) {
  return PALACE_VI[name] || name;
}

export function viStar(name: string) {
  return STAR_VI[name] || name;
}

export function viStars(names: string[]) {
  return names.map(viStar).join(', ');
}

export function viSiHua(name?: string) {
  return name ? SIHUA_VI[name] || name : undefined;
}

export function viWuxingJu(name: string) {
  return name
    .replace('水', 'Thủy')
    .replace('木', 'Mộc')
    .replace('金', 'Kim')
    .replace('土', 'Thổ')
    .replace('火', 'Hỏa')
    .replace('二', 'Nhị')
    .replace('三', 'Tam')
    .replace('四', 'Tứ')
    .replace('五', 'Ngũ')
    .replace('六', 'Lục')
    .replace('局', 'cục');
}
