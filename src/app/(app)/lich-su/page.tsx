import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import ModuleHero from '@/components/shared/ModuleHero';

const SERVICE_LABEL: Record<string, string> = {
  'tu-vi': 'Tử Vi',
  'kinh-dich': 'Kinh Dịch',
  'xin-xam': 'Xin Xăm',
  tarot: 'Tarot',
};

export default async function LichSuPage() {
  const session = await auth();
  if (!session?.user) redirect('/dang-nhap?returnTo=/lich-su');

  const entries = await prisma.readingHistoryEntry.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });

  return (
    <main className="page-enter pb-10">
      <ModuleHero icon="🕘" title="Lịch Sử" subtitle="Các lượt xem lá số, quẻ, xăm, tarot đã lưu" accent="var(--color-tuvi)" />
      <section className="mx-5 mt-5 max-w-[680px] space-y-3 md:mx-auto">
        {entries.length === 0 ? (
          <div className="rounded-[20px] border border-border bg-surface p-5 text-center text-[14px] text-text-3">
            Chưa có lượt xem nào được lưu. Lập lá số hoặc xin xăm để bắt đầu.
          </div>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className="rounded-[18px] border border-border bg-surface p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] uppercase tracking-[1px] text-gold">{SERVICE_LABEL[entry.service] || entry.service}</span>
                <span className="text-[11px] text-text-3">{new Date(entry.createdAt).toLocaleString('vi-VN')}</span>
              </div>
              <p className="mt-2 text-[14px] font-semibold text-text">{entry.title}</p>
              <p className="mt-1 text-[13px] text-text-2">{entry.summary}</p>
            </div>
          ))
        )}
        <Link href="/" className="block rounded-[14px] border border-gold/20 bg-tuvi-bg px-4 py-3 text-center text-[14px] font-semibold text-gold">Về trang chủ</Link>
      </section>
    </main>
  );
}
