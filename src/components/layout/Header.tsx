import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-[rgba(13,11,25,0.90)] px-5 py-4 backdrop-blur-[20px]">
      <div className="mx-auto flex max-w-[1100px] items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-[18px] text-gold">✦</span>
          <span className="font-[var(--font-display)] text-[20px] font-bold"><span className="text-gold">Tu</span><span className="text-text">Vi</span><span className="ml-0.5 font-[var(--font-ui)] text-[14px] font-medium text-text-2">.vn</span></span>
        </Link>
        <button className="rounded-[12px] border border-border bg-surface px-[14px] py-[7px] text-[13px] font-semibold text-gold">Đăng nhập</button>
      </div>
    </header>
  );
}