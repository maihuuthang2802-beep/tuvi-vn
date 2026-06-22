'use client';

import { useState } from 'react';
import Link from 'next/link';

const MAJOR = [
  { n: 0, name: 'Kẻ Khờ', meaning: 'Khởi đầu, tự do, niềm tin', reversed: 'Bốc đồng, thiếu chuẩn bị' },
  { n: 1, name: 'Nhà Ảo Thuật', meaning: 'Kỹ năng, hành động, tập trung', reversed: 'Lạm dụng, phân tán' },
  { n: 2, name: 'Nữ Tư Tế', meaning: 'Trực giác, bí mật, lắng nghe', reversed: 'Phớt lờ, thông tin bị che' },
  { n: 3, name: 'Hoàng Hậu', meaning: 'Nuôi dưỡng, sáng tạo, sinh sôi', reversed: 'Cạn năng lượng, phụ thuộc' },
  { n: 4, name: 'Hoàng Đế', meaning: 'Kỷ luật, cấu trúc, quyền lực', reversed: 'Kiểm soát quá, cứng nhắc' },
  { n: 5, name: 'Giáo Hoàng', meaning: 'Truyền thống, chỉ dẫn, cam kết', reversed: 'Phá khuôn, nghi ngờ niềm tin' },
  { n: 6, name: 'Tình Nhân', meaning: 'Lựa chọn giá trị, kết nối', reversed: 'Lệch giá trị, do dự' },
  { n: 7, name: 'Chiến Xa', meaning: 'Ý chí, tiến lên, kiểm soát', reversed: 'Mất lái, xung đột mục tiêu' },
  { n: 8, name: 'Sức Mạnh', meaning: 'Can đảm mềm, kiên nhẫn', reversed: 'Tự nghi ngờ, kiệt sức' },
  { n: 9, name: 'Ẩn Sĩ', meaning: 'Chiêm nghiệm, tìm lối riêng', reversed: 'Cô lập, mắc kẹt suy nghĩ' },
  { n: 10, name: 'Bánh Xe Số Phận', meaning: 'Chu kỳ, cơ hội, vận', reversed: 'Kháng cự thay đổi' },
  { n: 11, name: 'Công Lý', meaning: 'Nhân quả, quyết định đúng', reversed: 'Thiên lệch, né trách nhiệm' },
  { n: 12, name: 'Người Treo Ngược', meaning: 'Đổi góc nhìn, chờ đúng lúc', reversed: 'Trì hoãn, hy sinh sai' },
  { n: 13, name: 'Cái Chết', meaning: 'Kết thúc cần thiết, chuyển hóa', reversed: 'Bám víu, sợ kết thúc' },
  { n: 14, name: 'Tiết Độ', meaning: 'Cân bằng, chữa lành, điều hòa', reversed: 'Quá đà, lệch nhịp' },
  { n: 15, name: 'Ác Quỷ', meaning: 'Ràng buộc, ham muốn, bóng tối', reversed: 'Nhìn ra xiềng, lấy lại quyền' },
  { n: 16, name: 'Tòa Tháp', meaning: 'Đổ vỡ, sự thật giải phóng', reversed: 'Tránh sụp đổ, thay đổi âm ỉ' },
  { n: 17, name: 'Ngôi Sao', meaning: 'Hy vọng, phục hồi, cảm hứng', reversed: 'Mất niềm tin' },
  { n: 18, name: 'Mặt Trăng', meaning: 'Mơ hồ, vô thức, cảm xúc', reversed: 'Sương tan, sự thật lộ' },
  { n: 19, name: 'Mặt Trời', meaning: 'Rõ ràng, thành công, sinh lực', reversed: 'Niềm vui bị che, giảm tự tin' },
  { n: 20, name: 'Phán Xét', meaning: 'Thức tỉnh, bài học, quyết định', reversed: 'Trì hoãn tiếng gọi' },
  { n: 21, name: 'Thế Giới', meaning: 'Hoàn tất, tích hợp, mở rộng', reversed: 'Chưa khép vòng, thiếu bước cuối' },
];

function pick(seed: number) {
  const idx = Math.abs(seed) % MAJOR.length;
  const reversed = seed % 3 === 0;
  const card = MAJOR[idx];
  return { ...card, reversed };
}

export default function TarotPage() {
  const [layout, setLayout] = useState<'1' | '3'>('1');
  const [question, setQuestion] = useState('');
  const [cards, setCards] = useState<ReturnType<typeof pick>[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [flipped, setFlipped] = useState<Set<number>>(new Set());

  function draw() {
    const seed = (hashText(question || 'hiện tại')) + Date.now();
    const count = layout === '1' ? 1 : 3;
    const drawnCards = Array.from({ length: count }, (_, i) => pick(seed + i * 7));
    setCards(drawnCards);
    setRevealed(false);
    setFlipped(new Set());
  }

  function revealAll() {
    setRevealed(true);
    setTimeout(() => {
      cards.forEach((_, i) => setTimeout(() => setFlipped(prev => new Set([...prev, i])), i * 200));
    }, 300);
  }

  return (
    <main className="min-h-screen bg-bg text-text" style={{ fontFamily: 'var(--font-body)' }}>
      <nav className="flex items-center gap-6 px-6 py-4 border-b border-border">
        <Link href="/" className="text-gold text-lg font-bold tracking-[0.35em]" style={{ fontFamily: 'var(--font-heading)' }}>TUVI.VN</Link>
        <div className="flex gap-6 text-sm text-muted">
          <Link href="/tu-vi">Tử Vi</Link>
          <Link href="/kinh-dich">Kinh Dịch</Link>
          <Link href="/xin-xam">Xin Xăm</Link>
          <span className="text-gold">Tarot</span>
        </div>
      </nav>

      <div className="mx-auto max-w-5xl px-4 py-12 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl text-gold" style={{ fontFamily: 'var(--font-heading)' }}>Bài Tarot</h1>
          <p className="text-sm text-muted mt-2">Chọn kiểu trải và trải bài Tarot</p>
        </div>

        <div className="flex gap-4 justify-center">
          <button onClick={() => { setLayout('1'); setCards([]); setRevealed(false); }} className={`px-4 py-2 rounded-full text-sm border ${layout === '1' ? 'border-gold text-gold bg-gold-soft' : 'border-border text-muted'}`}>1 lá</button>
          <button onClick={() => { setLayout('3'); setCards([]); setRevealed(false); }} className={`px-4 py-2 rounded-full text-sm border ${layout === '3' ? 'border-gold text-gold bg-gold-soft' : 'border-border text-muted'}`}>3 lá</button>
        </div>

        <textarea value={question} onChange={e => setQuestion(e.target.value)} className="w-full max-w-lg mx-auto rounded-xl border border-border bg-surface px-4 py-3 text-text outline-none text-sm" placeholder="Câu hỏi Tarot..." />

        <div className="flex justify-center gap-3">
          <button onClick={draw} className="rounded-xl bg-gold px-6 py-3 text-bg font-semibold text-sm">Trải bài</button>
          {cards.length > 0 && !revealed && (
            <button onClick={revealAll} className="rounded-xl border border-gold px-6 py-3 text-gold text-sm">Lật bài</button>
          )}
        </div>

        {cards.length > 0 && (
          <div className="flex justify-center items-center gap-6 md:gap-10 py-8 flex-wrap">
            {cards.map((card, i) => {
              const flip = revealed && flipped.has(i);
              const labels = ['Quá khứ', 'Hiện tại', 'Tương lai'];
              return (
                <div key={i} className="flex flex-col items-center gap-3" style={{ perspective: '800px' }}>
                  <div className="w-32 h-44 md:w-40 md:h-56 relative transition-transform duration-700" style={{ transformStyle: 'preserve-3d', transform: flip ? 'rotateY(180deg)' : 'rotateY(0)' }}>
                    {/* back */}
                    <div className="absolute inset-0 rounded-xl border-2 border-gold/40 bg-surface flex items-center justify-center" style={{ backfaceVisibility: 'hidden' }}>
                      <span className="text-3xl md:text-4xl text-gold/60">★</span>
                    </div>
                    {/* front */}
                    <div className="absolute inset-0 rounded-xl border border-gold bg-bg flex flex-col items-center justify-center p-2 text-center" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                      <p className="text-sm md:text-base font-bold text-gold">{card.name}</p>
                      <p className="text-[10px] md:text-xs text-muted mt-2">{card.reversed ? 'Ngược' : 'Xuôi'}</p>
                      <p className="text-[9px] md:text-[10px] text-muted/70 mt-1">{card.reversed ? card.reversed : card.meaning}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted">{labels[i] ?? `Lá ${i + 1}`}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

function hashText(s: string) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }