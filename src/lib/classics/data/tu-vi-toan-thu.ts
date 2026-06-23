import type { ClassicBook } from '../types';

export const tuViToanThu: ClassicBook = {
  title: 'Tử Vi Toàn Thư',
  slug: 'tu-vi-toan-thu',
  dynasty: 'Cổ bản',
  author: 'Nhiều đời biên tập',
  intro: 'Tập hợp luận đoán nền về các cung, sao chính, sao phụ và cách cục thường gặp trong mệnh bàn.',
  wordCount: 2800,
  chapters: [
    {
      title: 'Mười hai cung',
      subtitle: 'Vai trò từng cung trong lá số',
      paragraphs: [
        { id: 'tvtt-1', idx: 1, text: 'Mệnh cung là thân phận khí chất, Quan lộc là sự nghiệp, Tài bạch là nhịp tiền, Phu thê là quan hệ chính danh, Phúc đức là nền tinh thần.' },
        { id: 'tvtt-2', idx: 2, text: 'Xem từng cung không thể tách khỏi tam phương tứ chính, nếu cô cung mà luận riêng thì dễ sai lệch.' },
      ],
    },
    {
      title: 'Phu thê và Phúc đức',
      subtitle: 'Đường dài của quan hệ',
      paragraphs: [
        { id: 'tvtt-3', idx: 1, text: 'Muốn xét hôn phối bền hay không, không chỉ xem Phu thê mà còn phải nhìn Phúc đức để biết nền chịu đựng và độ bền tình cảm.' },
        { id: 'tvtt-4', idx: 2, text: 'Sao cát ở Phu thê giúp duyên thuận, nhưng Phúc đức xấu thì đường dài vẫn dễ hụt hơi.' },
      ],
    },
    {
      title: 'Tài quan đi cùng',
      subtitle: 'Tiền và nghề',
      paragraphs: [
        { id: 'tvtt-5', idx: 1, text: 'Tài bạch mạnh mà Quan lộc yếu thì kiếm được nhưng khó bền; Quan lộc mạnh mà Tài bạch yếu thì danh có mà tiền chưa chắc tụ.' },
        { id: 'tvtt-6', idx: 2, text: 'Các sao như Vũ Khúc, Thiên Phủ, Tử Vi ở đúng cung sở trường thường giúp đương số giữ được đường dài trong sự nghiệp và tài chính.' },
      ],
    },
  ],
};
