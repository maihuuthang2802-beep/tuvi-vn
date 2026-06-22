'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';

const LOTS = [
  { id: 1, type: 'Thượng Cát', title: 'Phúc đức rạng ngời', poem: 'Phúc như Đông Hải rộng, thọ tựa Nam Sơn cao. \nCó nhân có quả, gieo thiện gặt thiện.', tài: 'Tài lộc đang đến gần, có quý nhân giúp đỡ.', tinh: 'Tình duyên hòa hợp, gia đình yên ấm.', gia: 'Gia đạo thuận hòa, trên dưới đồng lòng.', tat: 'Sức khỏe ổn định, phòng bệnh hơn chữa bệnh.' },
  { id: 2, type: 'Thượng Cát', title: 'Rồng gặp mây lành', poem: 'Long đắc vân vũ hội, phong lưu nhất thế gian. \nHữu tài hữu trí, đại lợi đại cát.', tài: 'Kinh doanh thuận lợi, đầu tư có lời.', tinh: 'Hôn nhân tốt đẹp, con cháu đề huề.', gia: 'Gia đình hưng vượng, cha mẹ khỏe mạnh.', tat: 'Thể chất tốt, tinh thần minh mẫn.' },
  { id: 3, type: 'Thượng', title: 'Vượt suối an toàn', poem: 'Giang sơn hữu lộ, thiên hạ vô nan sự. \nChỉ cần kiên trì, ắt có ngày thành.', tài: 'Tài chính ổn định, có dư sau chi tiêu.', tinh: 'Tình cảm chân thành, đối phương tâm đầu ý hợp.', gia: 'Gia đình hòa thuận, anh em giúp đỡ.', tat: 'Sức khỏe tốt, chú ý vận động.' },
  { id: 4, type: 'Thượng', title: 'Giấc mơ hóa hiện thực', poem: 'Nguyện vọng từ tâm khởi, mộng thành hiện thực lai. \nTâm thành tất ứng, chí thành tất thành.', tài: 'Tiền bạc dồi dào, thu nhập tăng dần.', tinh: 'Nhân duyên tốt, có thể tiến tới hôn nhân.', gia: 'Gia đình đầm ấm, cha mẹ vui lòng.', tat: 'Thân thể khỏe mạnh.' },
  { id: 5, type: 'Trung Bình', title: 'Hoa nở hai lần', poem: 'Hoa khai tái độ xuân, sự nghiệp tùng tân thủy. \nKiên trì bất biến, chuyển nguy thành an.', tài: 'Tài chính có lúc thăng trầm, cần kiên nhẫn.', tinh: 'Tình cảm thử thách, cần bao dung.', gia: 'Gia đình có mâu thuẫn nhỏ, giải quyết kịp thời.', tat: 'Sức khỏe tạm ổn, cảnh giác bệnh nhẹ.' },
  { id: 6, type: 'Trung Bình', title: 'Qua cầu rút ván', poem: 'Quá kiều chuyết bản hành, vị lai đa biến số. \nCẩn thận kẻo mắc mưu người.', tài: 'Tài lộc bình thường, chi tiêu cần hợp lý.', tinh: 'Tình cảm có biến động, tránh nóng giận.', gia: 'Gia đạo còn lục đục, cần bình tĩnh.', tat: 'Sức khỏe khá, giữ tinh thần lạc quan.' },
  { id: 7, type: 'Trung', title: 'Thuyền ra khơi vắng', poem: 'Cô chu xuất hải môn, vị lai vị khả tri. \nTùy duyên nhi hành, an nhiên tự tại.', tài: 'Tiền bạc chưa ổn định, cần tích lũy.', tinh: 'Tình duyên lận đận, duyên chưa tới.', gia: 'Gia đình có phần cô quạnh, thăm hỏi thường xuyên.', tat: 'Sức khỏe trung bình, nghỉ ngơi đầy đủ.' },
  { id: 8, type: 'Trung', title: 'Trăng khuyết về tròn', poem: 'Nguyệt khuyết phục viên thời, khổ tận cam lai nhật. \nKiên trì ắt có ngày vui.', tài: 'Tài chính sắp qua giai đoạn khó khăn.', tinh: 'Tình cảm hàn gắn, bỏ qua quá khứ.', gia: 'Gia đình dần hòa thuận trở lại.', tat: 'Bệnh nhẹ sắp khỏi, phục hồi nhanh.' },
  { id: 9, type: 'Hạ', title: 'Sóng cả gập ghềnh', poem: 'Cuồng phong khởi đại hải, tiểu thuyền nan độ quan. \nẨn nhẫn đãi thời, chớ vội vàng.', tài: 'Tài chính hao hụt, hạn chế đầu tư lớn.', tinh: 'Tình cảm sóng gió, cần giữ lòng tin.', gia: 'Gia đình bất hòa, tạm thời nhẫn nại.', tat: 'Sức khỏe suy giảm, cần khám định kỳ.' },
  { id: 10, type: 'Hạ', title: 'Mây đen che khuất', poem: 'Hắc vân già nhật nguyệt, đạo lộ nan tiền hành. \nThủ thân chính đạo, chờ vận thời.', tài: 'Làm ăn trì trệ, kiên trì chờ thời.', tinh: 'Duyên dở dang, nên bình tĩnh.', gia: 'Gia đình trắc trở, cần sẻ chia.', tat: 'Dễ ốm đau, chú ý phòng bệnh.' },
];

const TUBE_TICK = 18;

export default function XinXamPage() {
  const [shaking, setShaking] = useState(false);
  const [count, setCount] = useState(0);
  const [drawn, setDrawn] = useState<(typeof LOTS)[0] | null>(null);
  const [expanded, setExpanded] = useState(false);

  const handleShake = useCallback(() => {
    if (shaking) return;
    setShaking(true);
    setDrawn(null);
    setExpanded(false);
    setCount(0);
    let tick = 0;
    const interval = setInterval(() => {
      tick += 1;
      setCount(tick);
      if (tick >= TUBE_TICK) {
        clearInterval(interval);
        setShaking(false);
        const seed = (hashText('lot') + Date.now()) % LOTS.length;
        setDrawn(LOTS[seed < 0 ? seed + LOTS.length : seed]);
      }
    }, 120);
    return () => clearInterval(interval);
  }, [shaking]);

  return (
    <main className="min-h-screen bg-bg text-text" style={{ fontFamily: 'var(--font-body)' }}>
      <nav className="flex items-center gap-6 px-6 py-4 border-b border-border">
        <Link href="/" className="text-gold text-lg font-bold tracking-[0.35em]" style={{ fontFamily: 'var(--font-heading)' }}>TUVI.VN</Link>
        <div className="flex gap-6 text-sm text-muted">
          <Link href="/tu-vi">Tử Vi</Link>
          <Link href="/kinh-dich">Kinh Dịch</Link>
          <span className="text-gold">Xin Xăm</span>
        </div>
      </nav>

      <div className="mx-auto max-w-2xl px-4 py-16 text-center space-y-8">
        <h1 className="text-3xl text-gold" style={{ fontFamily: 'var(--font-heading)' }}>Xin Xăm Thánh Mẫu</h1>

        {/* Tube graphic */}
        <div className="relative flex flex-col items-center">
          <div className={`w-16 h-80 border-2 border-gold/30 rounded-3xl bg-surface flex flex-col items-center pt-4 gap-1 overflow-hidden transition-transform  ${shaking ? 'animate-pulse' : ''}`} style={shaking ? { transform: `translateX(${Math.sin(count * 0.8) * 6}px) translateY(${Math.sin(count * 1.2) * 2}px)` } : undefined}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="w-8 h-2 bg-gold/20 rounded-full" />
            ))}
            {!shaking && !drawn && <div className="w-10 h-5 bg-gold/40 rounded mt-2" />}
          </div>

          {!drawn ? (
            <button onClick={handleShake} className="mt-8 rounded-xl bg-gold px-8 py-4 text-bg font-semibold text-lg">Lắc ống xăm</button>
          ) : (
            <div onClick={() => setExpanded(!expanded)} className={`mt-8 rounded-2xl border-2 border-gold p-6 cursor-pointer transition-transform hover:scale-105 w-full max-w-md mx-auto ${expanded ? 'bg-gold-soft' : 'bg-surface'}`}>
              <div className={`text-5xl mb-3 ${expanded ? 'scale-110' : ''} transition-transform`}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                  <span key={n} className={`inline-block transition-all duration-300 ${expanded ? 'opacity-100' : 'opacity-0'} ${expanded ? 'translate-y-0' : '-translate-y-2'} ${expanded ? 'w-auto' : 'w-0 overflow-hidden'}`} style={{ transitionDelay: `${n * 80}ms` }}>{n}</span>
                ))}
              </div>
              <p className="text-lg text-gold font-semibold">{drawn.type}</p>
              <p className="text-2xl mt-2" style={{ fontFamily: 'var(--font-heading)' }}>{drawn.title}</p>
              {expanded && (
                <div className="mt-6 space-y-3 text-left text-sm">
                  <p className="text-muted italic whitespace-pre-line">{drawn.poem}</p>
                  <div className="space-y-2">
                    {[['Cầu tài', drawn.tài], ['Tình duyên', drawn.tinh], ['Gia đạo', drawn.gia], ['Tật bệnh', drawn.tat]].map(([k, v]) => (
                      <div key={k} className="flex gap-2">
                        <span className="text-gold font-medium">{k}:</span>
                        <span className="text-muted">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function hashText(s: string) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }