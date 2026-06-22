'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  { href: '/', label: 'Trang chủ', icon: '⌂' },
  { href: '/lich-van-nien', label: 'Lịch', icon: '☀' },
  { href: '/gieo-que', label: 'Gieo Quẻ', icon: '☯' },
  { href: '/lich-su', label: 'Lịch sử', icon: '◷' },
  { href: '/ca-nhan', label: 'Cá nhân', icon: '◎' },
];

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-border bg-bg/95 backdrop-blur-md py-2">
      {NAV.map(n => {
        const active = pathname === n.href;
        return (
          <Link key={n.href} href={n.href} className={`flex flex-col items-center gap-0.5 px-2 py-1`} style={{ color: active ? 'var(--color-gold)' : 'var(--color-muted)' }}>
            <span className="text-lg leading-none">{n.icon}</span>
            <span className="text-[10px]">{n.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}