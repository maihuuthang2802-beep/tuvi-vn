import type { ClassicBook } from '../types';

export const guSuiFu: ClassicBook = {
  title: 'Cốt Tủy Phú',
  slug: 'cot-tuy-phu',
  dynasty: 'Minh',
  author: 'Cổ bản Tử Vi',
  intro: 'Bản cô đọng các khẩu quyết nền của Tử Vi: mệnh cung, tam phương tứ chính, tứ hóa, sát tinh, các cách cục cốt lõi.',
  wordCount: 1500,
  chapters: [
    {
      title: 'Tổng luận',
      subtitle: 'Khí chất nền của hệ sao',
      paragraphs: [
        { id: 'ctp-1', idx: 1, text: 'Xem mệnh trước hết nhìn Mệnh cung, rồi xét tam phương tứ chính để định cách cục và chỗ phát dụng của lá số.' },
        { id: 'ctp-2', idx: 2, text: 'Tử Vi chủ tôn quý, Thiên Phủ chủ bảo toàn, Thiên Cơ chủ mưu trí, Thái Dương chủ quang minh, mỗi sao có khí chất và đường dùng khác nhau.' },
        { id: 'ctp-3', idx: 3, text: 'Mệnh cung là gốc, Thân cung là chỗ nương về sau, đại hạn là tiết tấu tiến lui của đời người.' },
      ],
    },
    {
      title: 'Tử Vi tinh luận',
      subtitle: 'Đế tinh và quyền trục',
      paragraphs: [
        { id: 'ctp-4', idx: 1, text: 'Tử Vi được phụ tá thì quyền quý sáng, cô quân vô phụ thì khó bền lâu dù có thế.' },
        { id: 'ctp-5', idx: 2, text: 'Tử Vi gặp cát tinh ở tam phương tứ chính thì thành khí lớn, gặp Không Kiếp thì vị cao mà thực lực hao.' },
      ],
    },
    {
      title: 'Sát Phá Lang',
      subtitle: 'Biến động và mở cục diện',
      paragraphs: [
        { id: 'ctp-6', idx: 1, text: 'Thất Sát, Phá Quân, Tham Lang hội mệnh tài quan thì đời nhiều biến động, hợp mở lối khó hơn giữ lối cũ.' },
        { id: 'ctp-7', idx: 2, text: 'Nếu có Lộc Quyền trợ thì biến động thành cơ hội; nếu sát quá nặng thì dễ thành nóng vội và hao tổn.' },
      ],
    },
    {
      title: 'Tứ hóa',
      subtitle: 'Lộc Quyền Khoa Kỵ',
      paragraphs: [
        { id: 'ctp-8', idx: 1, text: 'Hóa Lộc chủ khả năng biến năng lượng thành lợi ích; Hóa Quyền chủ quyền chủ động; Hóa Khoa chủ danh và quý nhân; Hóa Kỵ chủ bài học sâu và chỗ dễ vướng.' },
        { id: 'ctp-9', idx: 2, text: 'Hóa Kỵ vào Phu thê thì đường quan hệ dễ nhiều thử thách; vào Tài bạch thì dễ có nhịp tiền vào rồi ra.' },
      ],
    },
  ],
};
