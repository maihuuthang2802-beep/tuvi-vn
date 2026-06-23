'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import ModuleHero from '@/components/shared/ModuleHero';

export default function DangKyPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const body = await res.json().catch(() => ({}));

    if (!res.ok) {
      setError(body.error || 'Đăng ký thất bại.');
      setLoading(false);
      return;
    }

    const result = await signIn('credentials', { email, password, redirect: false });
    setLoading(false);
    if (result?.error) {
      setError('Tạo tài khoản thành công nhưng đăng nhập thất bại, thử đăng nhập lại.');
      return;
    }
    router.push('/ca-nhan');
  }

  return (
    <main className="page-enter pb-10">
      <ModuleHero icon="✦" title="Đăng Ký" subtitle="Tạo tài khoản để lưu lịch sử lá số và mở gói chuyên sâu" accent="var(--color-tuvi)" />
      <form onSubmit={handleSubmit} className="mx-5 mt-5 max-w-[420px] space-y-4 rounded-[20px] border border-border bg-surface p-5 md:mx-auto">
        <div>
          <label className="text-[11px] font-bold uppercase tracking-[1px] text-gold">HỌ TÊN</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="mt-2 w-full rounded-[12px] border border-border-2 bg-surface-2 px-[14px] py-3 text-[15px] text-text outline-none" placeholder="Nhập họ tên" />
        </div>
        <div>
          <label className="text-[11px] font-bold uppercase tracking-[1px] text-gold">EMAIL</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-[12px] border border-border-2 bg-surface-2 px-[14px] py-3 text-[15px] text-text outline-none" placeholder="ban@email.com" />
        </div>
        <div>
          <label className="text-[11px] font-bold uppercase tracking-[1px] text-gold">MẬT KHẨU</label>
          <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-[12px] border border-border-2 bg-surface-2 px-[14px] py-3 text-[15px] text-text outline-none" placeholder="Ít nhất 8 ký tự" />
        </div>
        {error ? <p className="text-[13px] text-red-400">{error}</p> : null}
        <button type="submit" disabled={loading} className="w-full rounded-[14px] bg-gradient-to-br from-tuvi to-[#E8C87A] px-4 py-3 text-[15px] font-bold text-bg disabled:opacity-50">
          {loading ? 'Đang tạo tài khoản...' : 'Đăng ký'}
        </button>
        <p className="text-center text-[13px] text-text-3">
          Đã có tài khoản? <Link href="/dang-nhap" className="text-gold font-semibold">Đăng nhập</Link>
        </p>
      </form>
    </main>
  );
}
