'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/tu-vi', label: 'Tử Vi' },
    { href: '/kinh-dich', label: 'Kinh Dịch' },
    { href: '/xin-xam', label: 'Xin Xăm' },
    { href: '/tarot', label: 'Tarot' },
    { href: '/goi-dich-vu', label: 'AI' },
  ];

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-[rgba(13,11,25,0.90)] backdrop-blur-[20px]">
      <div className="mx-auto flex max-w-[1100px] items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-[18px] text-gold">✦</span>
          <span className="font-[var(--font-display)] text-[20px] font-bold"><span className="text-gold">Tu</span><span className="text-text">Vi</span><span className="ml-0.5 font-[var(--font-ui)] text-[14px] font-medium text-text-2">.vn</span></span>
        </Link>

        <nav className="hidden gap-8 md:flex">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[14px] font-medium transition-colors ${
                isActive(link.href)
                  ? 'text-gold'
                  : 'text-text-2 hover:text-gold'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="relative hidden md:block">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface text-text-2 hover:text-gold transition-colors"
              aria-label="Profile menu"
            >
              👤
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-[12px] border border-border bg-surface shadow-lg overflow-hidden">
                <Link
                  href="#"
                  onClick={() => setProfileOpen(false)}
                  className="block px-4 py-3 text-[14px] text-text hover:bg-surface-3 hover:text-gold transition-colors"
                >
                  Cá nhân
                </Link>
                <Link
                  href="#"
                  onClick={() => setProfileOpen(false)}
                  className="block px-4 py-3 text-[14px] text-text hover:bg-surface-3 hover:text-gold transition-colors border-t border-border"
                >
                  Lịch sử
                </Link>
                <button
                  onClick={() => setProfileOpen(false)}
                  className="w-full px-4 py-3 text-left text-[14px] text-text hover:bg-surface-3 hover:text-gold transition-colors border-t border-border"
                >
                  Đăng xuất
                </button>
              </div>
            )}
          </div>

          <Link
            href="/login"
            className="hidden rounded-[12px] border border-border bg-surface px-[14px] py-[7px] text-[13px] font-semibold text-gold transition-colors hover:border-gold md:block"
          >
            Đăng nhập
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-[8px] border border-border bg-surface p-2 text-text-2 hover:text-gold"
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-border bg-surface md:hidden">
          <nav className="flex flex-col gap-0 px-5 py-4">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-3 text-[14px] font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-gold'
                    : 'text-text-2 hover:text-gold'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="border-t border-border py-3 text-[14px] font-medium text-gold hover:text-gold-light"
            >
              Đăng nhập
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
