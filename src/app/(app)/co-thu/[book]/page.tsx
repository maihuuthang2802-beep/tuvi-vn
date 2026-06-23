import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ModuleHero from '@/components/shared/ModuleHero';
import { getClassicBookBySlug } from '@/lib/classics';

export async function generateMetadata({ params }: { params: Promise<{ book: string }> }): Promise<Metadata> {
  const { book } = await params;
  const item = getClassicBookBySlug(book);
  return item ? { title: `${item.title} · Cổ thư Tử Vi · TuVi.vn`, description: item.intro } : { title: 'Cổ thư Tử Vi · TuVi.vn' };
}

export default async function ClassicBookPage({ params }: { params: Promise<{ book: string }> }) {
  const { book } = await params;
  const item = getClassicBookBySlug(book);
  if (!item) notFound();

  return (
    <main className="page-enter pb-10">
      <ModuleHero icon="☷" title={item.title} subtitle={`${item.dynasty} · ${item.author} · ${item.chapters.length} chương`} accent="var(--color-tuvi)" />
      <section className="mx-5 mt-5 grid gap-4 md:mx-auto md:max-w-[1100px] md:grid-cols-[280px_1fr]">
        <aside className="rounded-[24px] border border-border bg-surface p-5">
          <div className="text-[11px] uppercase tracking-[2px] text-gold">Mục lục</div>
          <div className="mt-4 space-y-2">
            {item.chapters.map((chapter, index) => (
              <a key={`${chapter.title}-${index}`} href={`#chapter-${index}`} className="block rounded-[12px] border border-border bg-surface-2 px-4 py-3 text-[13px] text-text-2 hover:text-gold">
                {chapter.title}
              </a>
            ))}
          </div>
          <Link href="/co-thu" className="mt-4 block rounded-[12px] border border-gold/20 bg-tuvi-bg px-4 py-3 text-center text-[13px] font-semibold text-gold">Về thư viện</Link>
        </aside>
        <div className="space-y-4">
          <section className="rounded-[24px] border border-border bg-surface p-5">
            <div className="text-[11px] uppercase tracking-[2px] text-gold">Giới thiệu</div>
            <p className="mt-3 text-[14px] text-text-2">{item.intro}</p>
          </section>
          {item.chapters.map((chapter, index) => (
            <section key={`${chapter.title}-${index}`} id={`chapter-${index}`} className="rounded-[24px] border border-border bg-surface p-5">
              <div className="text-[11px] uppercase tracking-[2px] text-gold">Chương {index + 1}</div>
              <h2 className="mt-2 text-[22px] font-semibold text-text">{chapter.title}</h2>
              {chapter.subtitle ? <p className="mt-1 text-[13px] text-text-3">{chapter.subtitle}</p> : null}
              <div className="mt-4 space-y-3">
                {chapter.paragraphs.map((paragraph) => (
                  <article key={paragraph.id} id={paragraph.id} className="rounded-[16px] border border-border bg-surface-2 p-4">
                    <div className="text-[11px] uppercase tracking-[2px] text-gold/80">Đoạn {paragraph.idx}</div>
                    <p className="mt-2 text-[14px] leading-7 text-text-2">{paragraph.text}</p>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
