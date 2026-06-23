'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import ModuleHero from '@/components/shared/ModuleHero';

function DangNhapForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await signIn('credentials', { email, password, redirect: false });
    setLoading(false);
    if (result?.error) {
      setError('Email hoặc mật khẩu không đúng.');
      return;
    }
    router.push(searchParams.get('returnTo') || '/ca-nhan');
  }

  return (
    <form onSubmit={handleSubmit} className="mx-5 mt-5 max-w-[420px] space-y-4 rounded-[20px] border border-border bg-surface p-5 md:mx-auto">
      <div>
        <label className="text-[11px] font-bold uppercase tracking-[1px] text-gold">EMAIL</label>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-[12px] border border-border-2 bg-surface-2 px-[14px] py-3 text-[15px] text-text outline-none" placeholder="ban@email.com" />
      </div>
      <div>
        <label className="text-[11px] font-bold uppercase tracking-[1px] text-gold">MẬT KHẨU</label>
        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-[12px] border border-border-2 bg-surface-2 px-[14px] py-3 text-[15px] text-text outline-none" placeholder="••••••••" />
      </div>
      {error ? <p className="text-[13px] text-red-400">{error}</p> : null}
      <button type="submit" disabled={loading} className="w-full rounded-[14px] bg-gradient-to-br from-tuvi to-[#E8C87A] px-4 py-3 text-[15px] font-bold text-bg disabled:opacity-50">
        {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
      </button>
      <p className="text-center text-[13px] text-text-3">
        Chưa có tài khoản? <Link href="/dang-ky" className="text-gold font-semibold">Đăng ký</Link>
      </p>
    </form>
  );
}

export default function DangNhapPage() {
  return (
    <main className="page-enter pb-10">
      <ModuleHero icon="✦" title="Đăng Nhập" subtitle="Vào tài khoản để lưu lịch sử và mở gói chuyên sâu" accent="var(--color-tuvi)" />
      <Suspense fallback={null}>
        <DangNhapForm />
      </Suspense>
    </main>
  );
}
