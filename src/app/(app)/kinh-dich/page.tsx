'use client';

import { useCallback, useState } from 'react';
import Link from 'next/link';

type IChingLine = { position: number; value: number; yinYang: string; moving: boolean };
type Reading = {
  hexagram: { name: string; judgment: string; image: string };
  changedHexagram?: { name: string; judgment: string };
  movingLines: IChingLine[];
  lines: IChingLine[];
  summary: string;
  advice: string;
};



function hashText(s: string) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function next(seed: number) { return (Math.imul(seed, 1664525) + 1013904223) >>> 0; }

const HEXAGRAMS = [
  { number: 1, name: 'Thuần Càn', judgment: 'Sức sáng tạo mạnh; hợp khởi sự đúng đạo.', image: 'Trời vận hành không nghỉ.' },
  { number: 2, name: 'Thuần Khôn', judgment: 'Nhu thuận, bền bỉ thì lợi.', image: 'Đất dày chở vạn vật.' },
  { number: 3, name: 'Thủy Lôi Truân', judgment: 'Khởi đầu khó, cần người dẫn.', image: 'Mây sấm đầy trời.' },
  { number: 4, name: 'Sơn Thủy Mông', judgment: 'Mờ mịt vì thiếu học; hỏi đúng thì mở.', image: 'Núi trên suối.' },
  { number: 5, name: 'Thủy Thiên Nhu', judgment: 'Chờ đúng thời.', image: 'Mây lên trời.' },
  { number: 6, name: 'Thiên Thủy Tụng', judgment: 'Tranh chấp nên dừng sớm.', image: 'Trời nước đi ngược.' },
  { number: 7, name: 'Địa Thủy Sư', judgment: 'Kỷ luật, người chỉ huy đúng.', image: 'Đất chứa nước.' },
  { number: 8, name: 'Thủy Địa Tỷ', judgment: 'Liên kết đúng người.', image: 'Nước trên đất.' },
  { number: 9, name: 'Phong Thiên Tiểu Súc', judgment: 'Tích nhỏ, chưa đủ lực.', image: 'Gió trên trời.' },
  { number: 10, name: 'Thiên Trạch Lý', judgment: 'Đi trên thế nguy, giữ lễ.', image: 'Trời trên đầm.' },
  { number: 11, name: 'Địa Thiên Thái', judgment: 'Thông thuận, âm dương giao.', image: 'Trời đất giao.' },
  { number: 12, name: 'Thiên Địa Bĩ', judgment: 'Bế tắc, nên thủ chính.', image: 'Trời đất không giao.' },
  { number: 13, name: 'Thiên Hỏa Đồng Nhân', judgment: 'Đồng lòng công khai.', image: 'Trời cùng lửa.' },
  { number: 14, name: 'Hỏa Thiên Đại Hữu', judgment: 'Sáng suốt giữ phúc.', image: 'Lửa trên trời.' },
  { number: 15, name: 'Địa Sơn Khiêm', judgment: 'Khiêm hạ thì thông.', image: 'Đất chứa núi.' },
  { number: 16, name: 'Lôi Địa Dự', judgment: 'Vui thuận, khởi động.', image: 'Sấm khỏi đất.' },
  { number: 17, name: 'Trạch Lôi Tùy', judgment: 'Đi theo đúng đạo.', image: 'Đầm trong sấm.' },
  { number: 18, name: 'Sơn Phong Cổ', judgment: 'Sửa tận gốc.', image: 'Gió dưới núi.' },
  { number: 19, name: 'Địa Trạch Lâm', judgment: 'Tiến gần, lo xa.', image: 'Đất trên đầm.' },
  { number: 20, name: 'Phong Địa Quan', judgment: 'Quan sát, soi lại mình.', image: 'Gió trên đất.' },
  { number: 21, name: 'Hỏa Lôi Phệ Hạp', judgment: 'Cắn đứt vật cản.', image: 'Sấm điện.' },
  { number: 22, name: 'Sơn Hỏa Bí', judgment: 'Trang sức không đổi bản chất.', image: 'Lửa dưới núi.' },
  { number: 23, name: 'Sơn Địa Bác', judgment: 'Suy mòn, giữ nền.', image: 'Núi tựa đất.' },
  { number: 24, name: 'Địa Lôi Phục', judgment: 'Phục hồi khởi đầu.', image: 'Sấm trong đất.' },
  { number: 25, name: 'Thiên Lôi Vô Vọng', judgment: 'Không vọng động.', image: 'Sấm dưới trời.' },
  { number: 26, name: 'Sơn Thiên Đại Súc', judgment: 'Tích lũy lớn.', image: 'Trời trong núi.' },
  { number: 27, name: 'Sơn Lôi Di', judgment: 'Nuôi dưỡng đúng.', image: 'Sấm dưới núi.' },
  { number: 28, name: 'Trạch Phong Đại Quá', judgment: 'Quá nặng; đổi cấu trúc.', image: 'Đầm ngập cây.' },
  { number: 29, name: 'Thuần Khảm', judgment: 'Hiểm lặp, đi từng bước.', image: 'Nước chảy mãi.' },
  { number: 30, name: 'Thuần Ly', judgment: 'Sáng rõ, bám đúng.', image: 'Lửa hai lần.' },
  { number: 31, name: 'Trạch Sơn Hàm', judgment: 'Cảm ứng chân thành.', image: 'Đầm trên núi.' },
  { number: 32, name: 'Lôi Phong Hằng', judgment: 'Bền lâu, giữ nhịp.', image: 'Sấm gió.' },
  { number: 33, name: 'Thiên Sơn Độn', judgment: 'Lui để giữ thế.', image: 'Trời quá núi.' },
  { number: 34, name: 'Lôi Thiên Đại Tráng', judgment: 'Sức mạnh lớn; chính.', image: 'Sấm trên trời.' },
  { number: 35, name: 'Hỏa Địa Tấn', judgment: 'Tiến sáng, được nâng.', image: 'Mặt trời lên.' },
  { number: 36, name: 'Địa Hỏa Minh Di', judgment: 'Ánh sáng thương, ẩn.', image: 'Sáng vào đất.' },
  { number: 37, name: 'Phong Hỏa Gia Nhân', judgment: 'Việc nhà rõ vai.', image: 'Gió từ lửa.' },
  { number: 38, name: 'Hỏa Trạch Khuê', judgment: 'Khác biệt, việc nhỏ lợi.', image: 'Lửa trên đầm.' },
  { number: 39, name: 'Thủy Sơn Kiển', judgment: 'Gặp trở, tìm người giúp.', image: 'Nước trên núi.' },
  { number: 40, name: 'Lôi Thủy Giải', judgment: 'Giải ách nhanh.', image: 'Sấm mưa.' },
  { number: 41, name: 'Sơn Trạch Tổn', judgment: 'Bớt dư nuôi cần.', image: 'Núi dưới đầm.' },
  { number: 42, name: 'Phong Lôi Ích', judgment: 'Tăng ích, sửa lỗi.', image: 'Gió sấm.' },
  { number: 43, name: 'Trạch Thiên Quải', judgment: 'Quyết đoán, loại sai.', image: 'Đầm lên trời.' },
  { number: 44, name: 'Thiên Phong Cấu', judgment: 'Gặp bất ngờ, cảnh giác.', image: 'Gió dưới trời.' },
  { number: 45, name: 'Trạch Địa Tụy', judgment: 'Tụ họp cần lễ.', image: 'Đầm trên đất.' },
  { number: 46, name: 'Địa Phong Thăng', judgment: 'Đi lên từng bậc.', image: 'Cây trong đất.' },
  { number: 47, name: 'Trạch Thủy Khốn', judgment: 'Bị vây, giữ chí.', image: 'Đầm không nước.' },
  { number: 48, name: 'Thủy Phong Tỉnh', judgment: 'Giếng nuôi người, giữ nguồn.', image: 'Nước trên cây.' },
  { number: 49, name: 'Trạch Hỏa Cách', judgment: 'Cải cách đúng thời.', image: 'Lửa trong đầm.' },
  { number: 50, name: 'Hỏa Phong Đỉnh', judgment: 'Lập trật tự mới.', image: 'Lửa trên gỗ.' },
  { number: 51, name: 'Thuần Chấn', judgment: 'Chấn động; tỉnh thức.', image: 'Sấm lặp.' },
  { number: 52, name: 'Thuần Cấn', judgment: 'Dừng đúng chỗ.', image: 'Núi chồng núi.' },
  { number: 53, name: 'Phong Sơn Tiệm', judgment: 'Tiến dần, bền.', image: 'Cây trên núi.' },
  { number: 54, name: 'Lôi Trạch Quy Muội', judgment: 'Vị chưa chính; không cưỡng.', image: 'Sấm trên đầm.' },
  { number: 55, name: 'Lôi Hỏa Phong', judgment: 'Thịnh ngắn, dùng sáng.', image: 'Sấm điện.' },
  { number: 56, name: 'Hỏa Sơn Lữ', judgment: 'Khách khiêm thì yên.', image: 'Lửa trên núi.' },
  { number: 57, name: 'Thuần Tốn', judgment: 'Nhập mềm, lợi người lớn.', image: 'Gió theo nhau.' },
  { number: 58, name: 'Thuần Đoài', judgment: 'Vui thuận, giao tiếp.', image: 'Đầm nối đầm.' },
  { number: 59, name: 'Phong Thủy Hoán', judgment: 'Tan rồi quy tụ.', image: 'Gió trên nước.' },
  { number: 60, name: 'Thủy Trạch Tiết', judgment: 'Có giới hạn thì thông.', image: 'Nước trên đầm.' },
  { number: 61, name: 'Phong Trạch Trung Phu', judgment: 'Thành tín giữa.', image: 'Gió trên đầm.' },
  { number: 62, name: 'Lôi Sơn Tiểu Quá', judgment: 'Quá nhỏ, khiêm hạ.', image: 'Sấm trên núi.' },
  { number: 63, name: 'Thủy Hỏa Ký Tế', judgment: 'Đã xong; giữ như đầu.', image: 'Nước trên lửa.' },
  { number: 64, name: 'Hỏa Thủy Vị Tế', judgment: 'Chưa xong, cẩn.', image: 'Lửa trên nước.' },
];

function coinCast(seed: number) {
  const values: number[] = [];
  let s = seed;
  for (let i = 0; i < 6; i++) { s = next(s); const coins = [s & 1, (s >> 3) & 1, (s >> 7) & 1]; values.push(6 + coins.reduce((a, b) => a + b, 0)); }
  return values;
}

function buildReading(seed: number): Reading {
  const vals = coinCast(seed);
  const lines = vals.map((v, i) => ({ position: i + 1, value: v, yinYang: v % 2 === 0 ? 'âm' : 'dương', moving: v === 6 || v === 9 }));
  const bits = lines.map(l => l.yinYang === 'dương' ? '1' : '0').join('');
  const changedBits = lines.map(l => l.moving ? (l.yinYang === 'dương' ? '0' : '1') : (l.yinYang === 'dương' ? '1' : '0')).join('');
  const hNum = parseInt(bits.slice(3, 6) + bits.slice(0, 3), 2) % 64;
  const cNum = parseInt(changedBits.slice(3, 6) + changedBits.slice(0, 3), 2) % 64;
  const moving = lines.filter(l => l.moving);
  return {
    hexagram: { name: HEXAGRAMS[hNum].name, judgment: HEXAGRAMS[hNum].judgment, image: HEXAGRAMS[hNum].image },
    changedHexagram: moving.length ? { name: HEXAGRAMS[cNum].name, judgment: HEXAGRAMS[cNum].judgment } : undefined,
    movingLines: moving,
    lines,
    summary: `${HEXAGRAMS[hNum].name}${moving.length ? ` → ${HEXAGRAMS[cNum].name}` : ''}`,
    advice: moving.length ? 'Quẻ động: cần xử lý các hào động để chuyển hóa.' : 'Quẻ tĩnh: giữ nguyên tắc quẻ chủ, chưa nên đổi hướng.',
  };
}

export default function KinhDichPage() {
  const [tab, setTab] = useState<'luc-hao' | 'thien-y' | 'mai-hoa'>('luc-hao');
  const [question, setQuestion] = useState('');
  
  const [coinSteps, setCoinSteps] = useState<number[]>([]);
  const [reading, setReading] = useState<Reading | null>(null);
  const [focusedLine, setFocusedLine] = useState(-1);

  const handleCastAll = useCallback((q: string) => {
    const seed = hashText(q || 'hiện tại') + Date.now();
    
    setCoinSteps([0, 1, 2, 3, 4, 5]);
    setTimeout(() => setCoinSteps([]), 1800);
    setTimeout(() => setReading(buildReading(seed)), 400);
  }, []);

  const handleThienY = useCallback((q: string) => {
    const seed = hashText(q);
    setReading(buildReading(seed));
  }, []);

  const handleMaiHoa = useCallback(() => {
    const now = new Date();
    const y = now.getFullYear() % 8;
    const m = (now.getMonth() + 1) % 8;
    const d = now.getDate() % 8;
    setReading(buildReading(y * 10000 + m * 100 + d));
  }, []);

  return (
    <main className="min-h-screen bg-bg text-text" style={{ fontFamily: 'var(--font-body)' }}>
      <nav className="flex items-center gap-6 px-6 py-4 border-b border-border">
        <Link href="/" className="text-gold text-lg font-bold tracking-[0.35em]" style={{ fontFamily: 'var(--font-heading)' }}>TUVI.VN</Link>
        <div className="flex gap-6 text-sm text-muted">
          <Link href="/tu-vi">Tử Vi</Link>
          <span className="text-gold">Kinh Dịch</span>
        </div>
      </nav>

      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex gap-2 mb-8 justify-center">
          {([
            { k: 'luc-hao', label: 'Lục Hào' } as const,
            { k: 'thien-y', label: 'Thiên Ý' } as const,
            { k: 'mai-hoa', label: 'Mai Hoa' } as const,
          ] as const).map(t => (
            <button key={t.k} onClick={() => { setTab(t.k); setReading(null); setCoinSteps([]); }} className={`px-5 py-2 rounded-full text-sm border transition ${tab === t.k ? 'border-gold text-gold bg-gold-soft' : 'border-border text-muted'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'luc-hao' && (
          <div className="text-center space-y-5">
            <h2 className="text-2xl text-gold" style={{ fontFamily: 'var(--font-heading)' }}>Gieo Quẻ Lục Hào</h2>
            <textarea value={question} onChange={e => setQuestion(e.target.value)} className="w-full max-w-lg rounded-xl border border-border bg-surface px-4 py-3 text-text outline-none text-sm mx-auto" placeholder="Nhập câu hỏi" />
            <div className="flex justify-center gap-2 flex-wrap">
              <button onClick={() => handleCastAll(question)} className="rounded-xl bg-gold px-6 py-3 text-bg font-semibold text-sm">Gieo quẻ</button>
            </div>
            {coinSteps.length > 0 && (
              <div className="flex flex-col items-center gap-2 mt-6">
                {coinSteps.map(i => (
                  <div key={i} className="w-20 h-12 rounded-full border border-gold/30 bg-gold-soft animate-pulse flex items-center justify-center text-sm text-gold">{i + 1}</div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'thien-y' && (
          <div className="text-center space-y-5">
            <h2 className="text-2xl text-gold" style={{ fontFamily: 'var(--font-heading)' }}>Gieo Quẻ Thiên Ý</h2>
            <p className="text-sm text-muted">Tĩnh tâm, gõ câu hỏi hoặc chạm vào trung tâm — hệ thống tính toán dựa trên ký tự câu hỏi của bạn.</p>
            <input value={question} onChange={e => setQuestion(e.target.value)} className="w-full max-w-lg rounded-xl border border-border bg-surface px-4 py-3 text-text outline-none text-sm mx-auto" placeholder="Gõ câu hỏi và chạm..." />
            <button onClick={() => handleThienY(question)} className="rounded-full w-24 h-24 mx-auto bg-gradient-to-br from-gold to-gold-bright flex items-center justify-center text-bg font-semibold text-sm shadow-lg shadow-gold/20 animate-pulse">Thiên Ý</button>
          </div>
        )}

        {tab === 'mai-hoa' && (
          <div className="text-center space-y-5">
            <h2 className="text-2xl text-gold" style={{ fontFamily: 'var(--font-heading)' }}>Gieo Quẻ Mai Hoa</h2>
            <p className="text-sm text-muted">Hệ thống tự động bắt thời điểm hiện tại để lập quẻ chủ và quẻ biến.</p>
            <button onClick={handleMaiHoa} className="rounded-xl bg-gold px-6 py-3 text-bg font-semibold text-sm">Lập Quẻ Mai Hoa</button>
          </div>
        )}

        {reading && (
          <div className="mt-10 space-y-6">
            {/* hexagram rendering */}
            <div className="flex flex-col items-center gap-2">
              {reading.lines.map((l, i) => {
                const isFocus = i === focusedLine;
                return (
                  <div key={i} onClick={() => setFocusedLine(isFocus ? -1 : i)} className={`flex items-center gap-2 cursor-pointer text-sm ${isFocus ? 'text-gold' : 'text-muted'}`}>
                    <span className="text-xs w-6">{reading.lines.length - i}</span>
                    {l.yinYang === 'dương' ? <div className={`w-20 h-3 rounded-full ${l.moving ? 'bg-gold' : 'bg-text'}`} /> : <div className="flex gap-1.5"><div className={`w-8 h-3 rounded-full ${l.moving ? 'bg-gold' : 'bg-text'}`} /><div className={`w-8 h-3 rounded-full ${l.moving ? 'bg-gold' : 'bg-text'}`} /></div>}
                  </div>
                );
              })}
            </div>
            <div className="rounded-2xl border border-border bg-surface p-6 space-y-3 text-center">
              <h3 className="text-2xl text-gold" style={{ fontFamily: 'var(--font-heading)' }}>{reading.hexagram.name}</h3>
              <p className="text-sm text-muted">{reading.hexagram.judgment}</p>
              <p className="text-xs text-muted italic">{reading.hexagram.image}</p>
              {reading.changedHexagram && (
                <div className="pt-3 border-t border-border">
                  <p className="text-gold text-sm">Quẻ biến:</p>
                  <p className="text-lg" style={{ fontFamily: 'var(--font-heading)' }}>{reading.changedHexagram.name}</p>
                  <p className="text-xs text-muted">{reading.changedHexagram.judgment}</p>
                </div>
              )}
              {reading.movingLines.length > 0 && (
                <p className="text-sm text-gold">Hào động: {reading.movingLines.map(l => l.position).join(', ')}</p>
              )}
              <p className="text-sm text-muted mt-2">{reading.advice}</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}