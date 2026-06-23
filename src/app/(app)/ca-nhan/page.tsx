import { redirect } from 'next/navigation';
import { auth, signOut } from '@/auth';
import { prisma } from '@/lib/prisma';
import ModuleHero from '@/components/shared/ModuleHero';

async function signOutAction() {
  'use server';
  await signOut({ redirectTo: '/' });
}

export default async function CaNhanPage() {
  const session = await auth();
  if (!session?.user) redirect('/dang-nhap?returnTo=/ca-nhan');

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) redirect('/dang-nhap?returnTo=/ca-nhan');

  const readingCount = await prisma.readingHistoryEntry.count({ where: { userId: user.id } });

  return (
    <main className="page-enter pb-10">
      <ModuleHero icon="👤" title="Cá Nhân" subtitle="Thông tin tài khoản" accent="var(--color-tuvi)" />
      <section className="mx-5 mt-5 max-w-[560px] space-y-4 md:mx-auto">
        <div className="rounded-[20px] border border-border bg-surface p-5">
          <div className="text-[11px] uppercase tracking-[2px] text-gold">Tài khoản</div>
          <p className="mt-3 text-[16px] font-semibold text-text">{user.name || 'Chưa đặt tên'}</p>
          <p className="mt-1 text-[13px] text-text-3">{user.email}</p>
          <p className="mt-3 text-[13px] text-text-2">Gói hiện tại: <span className="text-gold font-semibold">{user.plan === 'pro' ? 'Chuyên sâu' : 'Miễn phí'}</span></p>
          <p className="mt-1 text-[13px] text-text-2">Đã lưu {readingCount} lượt xem trong lịch sử.</p>
        </div>
        <form action={signOutAction}>
          <button type="submit" className="w-full rounded-[14px] border border-gold/30 px-4 py-3 text-[14px] font-semibold text-gold">Đăng xuất</button>
        </form>
      </section>
    </main>
  );
}
