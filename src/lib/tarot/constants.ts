export const TAROT_MAJOR_ARCANA = [
  { id: 0, name: 'The Fool', vn: 'Người Dại' },
  { id: 1, name: 'The Magician', vn: 'Pháp Sư' },
  { id: 2, name: 'The High Priestess', vn: 'Nữ Tư Tế' },
  { id: 3, name: 'The Empress', vn: 'Nữ Hoàng' },
  { id: 4, name: 'The Emperor', vn: 'Hoàng Đế' },
  { id: 5, name: 'The Hierophant', vn: 'Thánh Chủ' },
  { id: 6, name: 'The Lovers', vn: 'Những Người Yêu' },
  { id: 7, name: 'The Chariot', vn: 'Chiến Xa' },
  { id: 8, name: 'Strength', vn: 'Sức Mạnh' },
  { id: 9, name: 'The Hermit', vn: 'Nhà Ẩn Sĩ' },
  { id: 10, name: 'Wheel of Fortune', vn: 'Bánh Xe Số Phận' },
  { id: 11, name: 'Justice', vn: 'Công Lý' },
  { id: 12, name: 'The Hanged Man', vn: 'Người Bị Treo' },
  { id: 13, name: 'Death', vn: 'Cái Chết' },
  { id: 14, name: 'Temperance', vn: 'Tiết Độ' },
  { id: 15, name: 'The Devil', vn: 'Quỷ Dạ' },
  { id: 16, name: 'The Tower', vn: 'Tòa Tháp' },
  { id: 17, name: 'The Star', vn: 'Ngôi Sao' },
  { id: 18, name: 'The Moon', vn: 'Mặt Trăng' },
  { id: 19, name: 'The Sun', vn: 'Mặt Trời' },
  { id: 20, name: 'Judgement', vn: 'Phán Xét' },
  { id: 21, name: 'The World', vn: 'Thế Giới' },
];

export function getCardImagePath(cardName: string): string {
  const normalized = cardName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  return `/tarot-cards/${normalized}.svg`;
}

export function getCardId(cardName: string): number | undefined {
  const card = TAROT_MAJOR_ARCANA.find(c => c.name.toLowerCase() === cardName.toLowerCase());
  return card?.id;
}
