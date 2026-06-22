import Link from 'next/link';

export default function Footer() {
  const links = ['Tử Vi', 'Kinh Dịch', 'Xin Xăm', 'Tarot', 'AI Luận giải', 'Tài khoản'];
  return (
    <footer className="border-t border-border bg-[#080611] px-5 py-8">
      <div className="mx-auto max-w-[1100px]">
        <div className="flex items-center gap-2">
          <span className="text-[18px] text-gold">✦</span>
          <span className="font-[var(--font-display)] text-[20px] font-bold"><span className="text-gold">Tu</span><span className="text-text">Vi</span><span className="ml-0.5 font-[var(--font-ui)] text-[14px] font-medium text-text-2">.vn</span></span>
        </div>
        <p className="mt-2 text-[13px] text-text-2">Huyền học Việt — Dữ liệu chuẩn, AI tích hợp</p>
        <div className="mt-5 grid grid-cols-2 gap-y-2 text-[13px] text-text-2 md:grid-cols-3">
          {links.map((label) => <Link key={label} href="#">{label}</Link>)}
        </div>
        <div className="mt-5 border-t border-border pt-5 text-[11px] text-text-3">
          Nội dung mang tính tham khảo văn hóa dân gian. Không thay thế tư vấn chuyên môn y tế, pháp lý.
        </div>
      </div>
    </footer>
  );
}