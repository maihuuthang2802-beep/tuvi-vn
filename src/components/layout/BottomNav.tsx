'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  { href: '/', label: 'Trang chủ', icon: '⌂', color: 'var(--color-text-3)' },
  { href: '/tu-vi', label: 'Tử Vi', icon: '◉', color: 'var(--color-tuvi)' },
  { href: '/goi-dich-vu', label: 'AI', icon: '✦', color: 'var(--color-ai)', center: true },
  { href: '/kinh-dich', label: 'Kinh Dịch', icon: '☰', color: 'var(--color-kinh)' },
  { href: '/xin-xam', label: 'Xin Xăm', icon: '❀', color: 'var(--color-xam)' },
];

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-[rgba(13,11,25,0.95)] backdrop-blur-[20px] md:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="mx-auto flex max-w-[430px] items-end justify-around px-2 py-2">
        {NAV.map((item) => {
          const active = pathname === item.href;
          if (item.center) {
            return (
              <Link key={item.href} href={item.href} className="-mt-[18px] flex h-[52px] w-[52px] flex-col items-center justify-center rounded-[16px] bg-gradient-to-br from-gold to-[#E8C87A] text-bg shadow-[0_4px_16px_rgba(201,169,110,0.45)]">
                <span className="text-[24px]">{item.icon}</span>
              </Link>
            );
          }
          return (
            <Link key={item.href} href={item.href} className="flex min-w-[54px] flex-col items-center gap-1 py-1 text-center">
              <span className="text-[18px]" style={{ color: active ? item.color : 'var(--color-text-3)' }}>{item.icon}</span>
              <span className="text-[10px]" style={{ color: active ? item.color : 'var(--color-text-3)' }}>{item.label}</span>
              <span className="h-[3px] w-[3px] rounded-full" style={{ background: active ? item.color : 'transparent' }} />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}