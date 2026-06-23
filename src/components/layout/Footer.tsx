import Link from 'next/link';

export default function Footer() {
  const serviceLinks = [
    { label: 'Tử Vi', href: '/tu-vi' },
    { label: 'Kinh Dịch', href: '/kinh-dich' },
    { label: 'Xin Xăm', href: '/xin-xam' },
    { label: 'Tarot', href: '/tarot' },
    { label: 'AI Luận giải', href: '/goi-dich-vu' },
  ];

  const legalLinks = [
    { label: 'Chính sách bảo mật', href: '#' },
    { label: 'Điều khoản sử dụng', href: '#' },
    { label: 'Liên hệ', href: '#' },
  ];

  return (
    <footer className="border-t border-border bg-[#080611] px-5 py-8 md:py-12">
      <div className="mx-auto max-w-[1100px]">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="text-[18px] text-gold">✦</span>
              <span className="font-[var(--font-display)] text-[20px] font-bold"><span className="text-gold">Tu</span><span className="text-text">Vi</span><span className="ml-0.5 font-[var(--font-ui)] text-[14px] font-medium text-text-2">.vn</span></span>
            </Link>
            <p className="mt-3 text-[13px] text-text-2">Huyền học Việt — Dữ liệu chuẩn, AI tích hợp</p>
            <div className="mt-4 flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-text-2 hover:text-gold transition-colors">
                <span className="text-[18px]">f</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-text-2 hover:text-gold transition-colors">
                <span className="text-[18px]">📷</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-text-2 hover:text-gold transition-colors">
                <span className="text-[18px]">𝕏</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[2px] text-gold mb-3">Dịch vụ</div>
              <div className="flex flex-col gap-2">
                {serviceLinks.map(link => (
                  <Link key={link.href} href={link.href} className="text-[13px] text-text-2 hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[2px] text-gold mb-3">Pháp lý</div>
              <div className="flex flex-col gap-2">
                {legalLinks.map(link => (
                  <Link key={link.href} href={link.href} className="text-[13px] text-text-2 hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-[11px] text-text-3">
          <p>Nội dung mang tính tham khảo văn hóa dân gian. Không thay thế tư vấn chuyên môn y tế, pháp lý.</p>
          <p className="mt-3">© 2024 TuVi.vn. Bản quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
}