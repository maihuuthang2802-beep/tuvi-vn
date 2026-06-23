import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ModuleHero from '@/components/shared/ModuleHero';
import { getAllKnowledgeRoutes, getKnowledgeEntry, getStarProfile, getTopicDefinition, STAR_PROFILES, TOPICS } from '@/lib/ziwei/knowledge';
import { getClassicMentionsForStar } from '@/lib/classics';

export function generateStaticParams() {
  return getAllKnowledgeRoutes();
}

export async function generateMetadata({ params }: { params: Promise<{ star: string; topic: string }> }): Promise<Metadata> {
  const { star, topic } = await params;
  const entry = getKnowledgeEntry(star, topic as never);
  if (!entry) {
    return { title: 'Kiến thức Tử Vi · TuVi.vn' };
  }
  return {
    title: `${entry.star} · ${entry.topicLabel} · TuVi.vn`,
    description: `${entry.star} trong chủ đề ${entry.topicLabel.toLowerCase()}: ${entry.summary}`,
    keywords: [entry.star, entry.topicLabel, ...entry.keywords],
  };
}

export default async function TuViKnowledgeDetailPage({ params }: { params: Promise<{ star: string; topic: string }> }) {
  const { star, topic } = await params;
  const entry = getKnowledgeEntry(star, topic as never);
  const profile = getStarProfile(star);
  const topicDef = getTopicDefinition(topic as never);

  if (!entry || !profile || !topicDef) notFound();

  const classicMentions = getClassicMentionsForStar(profile.name);

  return (
    <main className="page-enter pb-10">
      <ModuleHero icon="☯" title={`${entry.star} · ${entry.topicLabel}`} subtitle={`Trục ${entry.palaceLabel} · diễn giải sâu theo từng sao`} accent="var(--color-tuvi)" />
      <section className="mx-5 mt-5 rounded-[24px] border border-gold/20 bg-tuvi-bg p-5 md:mx-auto md:max-w-[1100px]">
        <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="text-[11px] uppercase tracking-[2px] text-gold">Headline</div>
            <p className="mt-3 text-[18px] font-semibold text-text">{entry.headline}</p>
            <p className="mt-3 text-[14px] text-text-2">{entry.summary}</p>
          </div>
          <div className="rounded-[18px] border border-gold/20 bg-surface/60 p-4">
            <div className="text-[11px] uppercase tracking-[2px] text-gold/80">Từ khóa</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {entry.keywords.map((keyword) => (
                <span key={keyword} className="rounded-full border border-border bg-surface-2 px-3 py-1 text-[12px] text-text-2">{keyword}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="mx-5 mt-5 grid gap-4 md:mx-auto md:max-w-[1100px] md:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <article className="rounded-[24px] border border-border bg-surface p-5">
            <div className="text-[11px] uppercase tracking-[2px] text-gold">Luận điểm chính</div>
            <p className="mt-3 text-[15px] text-text">{entry.core}</p>
            <div className="mt-5 rounded-[18px] border border-border bg-surface-2 p-4">
              <div className="text-[11px] uppercase tracking-[2px] text-gold/70">Điểm cần giữ</div>
              <p className="mt-2 text-[14px] text-text-2">{entry.cautionHeadline}</p>
            </div>
            <div className="mt-4 rounded-[18px] border border-border bg-surface-2 p-4">
              <div className="text-[11px] uppercase tracking-[2px] text-gold/70">Ứng dụng thực tế</div>
              <p className="mt-2 text-[14px] text-text-2">{entry.practicalUse}</p>
            </div>
          </article>

          {entry.sections.map((section) => (
            <article key={section.title} className="rounded-[24px] border border-border bg-surface p-5">
              <div className="text-[11px] uppercase tracking-[2px] text-gold">{section.title}</div>
              <p className="mt-3 text-[14px] text-text-2">{section.body}</p>
              <div className="mt-4 grid gap-2 md:grid-cols-2">
                {section.bullets.map((bullet) => (
                  <div key={bullet} className="rounded-[14px] border border-border bg-surface-2 px-4 py-3 text-[13px] text-text-2">{bullet}</div>
                ))}
              </div>
            </article>
          ))}

          <article className="rounded-[24px] border border-border bg-surface p-5">
            <div className="text-[11px] uppercase tracking-[2px] text-gold">Căn cứ lá số</div>
            <p className="mt-3 text-[14px] text-text-2">{entry.basis}</p>
            <div className="mt-5 text-[11px] uppercase tracking-[2px] text-gold/70">Gợi ý hành động</div>
            <p className="mt-3 text-[14px] text-text-2">{entry.guidance}</p>
          </article>

          {classicMentions.length > 0 ? (
            <article className="rounded-[24px] border border-border bg-surface p-5">
              <div className="text-[11px] uppercase tracking-[2px] text-gold">Cổ thư nói về {profile.name}</div>
              <div className="mt-4 space-y-3">
                {classicMentions.map((mention) => (
                  <Link
                    key={mention.paragraphId}
                    href={`/co-thu/${mention.bookSlug}#${mention.paragraphId}`}
                    className="block rounded-[14px] border border-border bg-surface-2 px-4 py-3 text-[13px] text-text-2 hover:text-gold"
                  >
                    <span className="text-[11px] uppercase tracking-[1px] text-gold/80">{mention.bookTitle} · {mention.chapterTitle}</span>
                    <p className="mt-1 text-text-2">{mention.text}</p>
                  </Link>
                ))}
              </div>
            </article>
          ) : null}

          <article className="rounded-[24px] border border-border bg-surface p-5">
            <div className="text-[11px] uppercase tracking-[2px] text-gold">Đọc tiếp cùng sao</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {TOPICS.filter((item) => item.slug !== topicDef.slug).map((item) => (
                <Link key={item.slug} href={`/tu-vi/kien-thuc/${profile.slug}/${item.slug}`} className="rounded-full border border-border bg-surface-2 px-3 py-2 text-[13px] text-text-2 hover:text-gold">
                  {item.label}
                </Link>
              ))}
            </div>
          </article>
        </div>
        <aside className="space-y-4">
          <section className="rounded-[24px] border border-border bg-surface p-5">
            <div className="text-[11px] uppercase tracking-[2px] text-gold">Hồ sơ sao</div>
            <p className="mt-3 text-[14px] text-text-2">{profile.brief}</p>
            <p className="mt-3 text-[13px] text-text-3">Mạnh: {profile.strengths.join(' · ')}</p>
            <p className="mt-2 text-[13px] text-text-3">Cần giữ: {profile.cautions.join(' · ')}</p>
            <p className="mt-2 text-[13px] text-text-3">Vai phù hợp: {profile.idealRoles.join(' · ')}</p>
          </section>
          <section className="rounded-[24px] border border-border bg-surface p-5">
            <div className="text-[11px] uppercase tracking-[2px] text-gold">Quan hệ cần gì</div>
            <div className="mt-3 space-y-2">
              {profile.relationshipNeeds.map((item) => (
                <div key={item} className="rounded-[12px] border border-border bg-surface-2 px-4 py-3 text-[13px] text-text-2">{item}</div>
              ))}
            </div>
          </section>
          <section className="rounded-[24px] border border-border bg-surface p-5">
            <div className="text-[11px] uppercase tracking-[2px] text-gold">Đi tiếp</div>
            <div className="mt-3 space-y-2">
              <Link href="/tu-vi" className="block rounded-[12px] border border-gold/20 bg-tuvi-bg px-4 py-3 text-center text-[14px] font-semibold text-gold">Lập lá số</Link>
              <Link href="/tu-vi/hop-menh" className="block rounded-[12px] border border-[rgba(44,195,184,0.3)] bg-ai-bg px-4 py-3 text-center text-[14px] font-semibold text-ai">Xem hợp mệnh</Link>
              <Link href="/tu-vi/kien-thuc" className="block rounded-[12px] border border-border bg-surface-2 px-4 py-3 text-center text-[14px] font-semibold text-text">Về hub kiến thức</Link>
            </div>
          </section>
          <section className="rounded-[24px] border border-border bg-surface p-5">
            <div className="text-[11px] uppercase tracking-[2px] text-gold">Sao liên hệ</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {entry.relatedStars.map((starName) => {
                const related = STAR_PROFILES.find((item) => item.name === starName);
                if (!related) return null;
                return (
                  <Link key={related.slug} href={`/tu-vi/kien-thuc/${related.slug}/${topicDef.slug}`} className="rounded-full border border-border bg-surface-2 px-3 py-2 text-[12px] text-text-2 hover:text-gold">
                    {related.name}
                  </Link>
                );
              })}
            </div>
          </section>
          <section className="rounded-[24px] border border-border bg-surface p-5">
            <div className="text-[11px] uppercase tracking-[2px] text-gold">Khám phá sao khác</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {STAR_PROFILES.filter((item) => item.slug !== profile.slug).slice(0, 8).map((item) => (
                <Link key={item.slug} href={`/tu-vi/kien-thuc/${item.slug}/${topicDef.slug}`} className="rounded-full border border-border bg-surface-2 px-3 py-2 text-[12px] text-text-2 hover:text-gold">
                  {item.name}
                </Link>
              ))}
            </div>
          </section>
        </aside>
      </section>
    </main>
  );
}
