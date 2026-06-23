import Link from 'next/link';
import type { Metadata } from 'next';
import ModuleHero from '@/components/shared/ModuleHero';
import { STAR_PROFILES, TOPICS } from '@/lib/ziwei/knowledge';

export const metadata: Metadata = {
  title: 'Kiến thức Tử Vi · 14 chính tinh · TuVi.vn',
  description: 'Kho kiến thức Tử Vi theo 14 chính tinh và 13 chủ đề: tổng quan, tính cách, tình cảm, sự nghiệp, tài bạch, sức khỏe, gia đạo, cha mẹ, con cái.',
};

export default function TuViKnowledgeHomePage() {
  return (
    <main className="page-enter pb-10">
      <ModuleHero icon="☯" title="Kiến Thức Tử Vi" subtitle="14 chính tinh · 13 chủ đề · đi từ tổng quan đến ứng dụng cụ thể" accent="var(--color-tuvi)" />
      <section className="mx-5 mt-5 rounded-[20px] border border-border bg-surface p-5 md:mx-auto md:max-w-[1100px]">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-[2px] text-gold">Knowledge hub</div>
            <p className="mt-2 max-w-[760px] text-[14px] text-text-2">Mỗi chính tinh được tách theo 13 chủ đề để người đọc đi từ khí chất gốc sang tình cảm, sự nghiệp, tài bạch, sức khỏe và quan hệ gia đình. Hub này dùng để đọc sâu trước khi lập lá số hoặc xem hợp mệnh.</p>
          </div>
          <div className="flex gap-2">
            <Link href="/tu-vi" className="rounded-[12px] border border-gold/20 bg-tuvi-bg px-4 py-3 text-[14px] font-semibold text-gold">Lập lá số</Link>
            <Link href="/tu-vi/hop-menh" className="rounded-[12px] border border-[rgba(44,195,184,0.3)] bg-ai-bg px-4 py-3 text-[14px] font-semibold text-ai">Xem hợp mệnh</Link>
          </div>
        </div>
      </section>
      <section className="mx-5 mt-5 rounded-[20px] border border-border bg-surface p-5 md:mx-auto md:max-w-[1100px]">
        <div className="text-[11px] uppercase tracking-[2px] text-gold">13 chủ đề phủ toàn hub</div>
        <div className="mt-4 flex flex-wrap gap-2">
          {TOPICS.map((topic) => (
            <span key={topic.slug} className="rounded-full border border-border bg-surface-2 px-3 py-2 text-[12px] text-text-2">{topic.label}</span>
          ))}
        </div>
      </section>
      <section className="mx-5 mt-5 grid gap-4 md:mx-auto md:max-w-[1100px] md:grid-cols-2 xl:grid-cols-3">
        {STAR_PROFILES.map((profile) => (
          <article key={profile.slug} className="rounded-[20px] border border-border bg-surface p-5">
            <div className="text-[11px] uppercase tracking-[2px] text-gold">{profile.name}</div>
            <p className="mt-3 text-[14px] text-text-2">{profile.brief}</p>
            <p className="mt-3 text-[13px] text-text-3">Từ khóa: {profile.keywords.join(' · ')}</p>
            <p className="mt-2 text-[13px] text-text-3">Vai hợp: {profile.idealRoles.slice(0, 3).join(' · ')}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {TOPICS.map((topic) => (
                <Link key={topic.slug} href={`/tu-vi/kien-thuc/${profile.slug}/${topic.slug}`} className="rounded-full border border-border bg-surface-2 px-3 py-1 text-[12px] text-text-2 hover:text-gold">
                  {topic.label}
                </Link>
              ))}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
