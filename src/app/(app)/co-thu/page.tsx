import Link from 'next/link';
import type { Metadata } from 'next';
import ModuleHero from '@/components/shared/ModuleHero';
import { ALL_CLASSIC_BOOKS, TOTAL_CLASSIC_PARAGRAPHS, searchClassics } from '@/lib/classics';

export const metadata: Metadata = {
  title: 'Cổ thư Tử Vi · TuVi.vn',
  description: 'Thư viện cổ thư Tử Vi: Cốt Tủy Phú, Tử Vi Toàn Thư, tìm kiếm câu trích, đọc theo chương và đoạn.',
};

export default async function ClassicsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const q = Array.isArray(query.q) ? query.q[0] : query.q || '';
  const hits = q ? searchClassics(q) : [];

  return (
    <main className="page-enter pb-10">
      <ModuleHero icon="☷" title="Thư Viện Cổ Thư" subtitle="Câu trích cổ bản · tìm kiếm nhanh · nối về lá số và kiến thức" accent="var(--color-tuvi)" />
      <section className="mx-5 mt-5 rounded-[24px] border border-border bg-surface p-5 md:mx-auto md:max-w-[1100px]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-[2px] text-gold">Classics</div>
            <p className="mt-2 text-[14px] text-text-2">{ALL_CLASSIC_BOOKS.length} sách · {TOTAL_CLASSIC_PARAGRAPHS} đoạn chọn lọc. Dùng để đọc nền lý thuyết, tra câu trích, hoặc nối với phần kiến thức từng sao.</p>
          </div>
          <form className="flex gap-2" action="/co-thu">
            <input name="q" defaultValue={q} className="w-full rounded-[12px] border border-border bg-surface-2 px-4 py-3 text-[14px] text-text outline-none md:w-[320px]" placeholder="Tìm: Mệnh, Phúc đức, Hóa Kỵ..." />
            <button className="rounded-[12px] bg-gold px-4 py-3 text-[14px] font-bold text-bg">Tìm</button>
          </form>
        </div>
      </section>

      {q ? (
        <section className="mx-5 mt-5 rounded-[24px] border border-border bg-surface p-5 md:mx-auto md:max-w-[1100px]">
          <div className="text-[11px] uppercase tracking-[2px] text-gold">Kết quả tìm kiếm</div>
          <div className="mt-4 space-y-3">
            {hits.length ? hits.map((hit) => (
              <Link key={hit.paragraphId} href={`/co-thu/${hit.bookSlug}#${hit.paragraphId}`} className="block rounded-[18px] border border-border bg-surface-2 p-4 hover:border-gold/30">
                <div className="text-[12px] text-gold">{hit.bookTitle} · {hit.chapterTitle}</div>
                <p className="mt-2 text-[14px] text-text-2">{hit.snippet}</p>
              </Link>
            )) : <p className="text-[14px] text-text-3">Không thấy kết quả phù hợp.</p>}
          </div>
        </section>
      ) : null}

      <section className="mx-5 mt-5 grid gap-4 md:mx-auto md:max-w-[1100px] md:grid-cols-2">
        {ALL_CLASSIC_BOOKS.map((book) => (
          <article key={book.slug} className="rounded-[24px] border border-border bg-surface p-5">
            <div className="text-[11px] uppercase tracking-[2px] text-gold">{book.dynasty} · {book.author}</div>
            <h2 className="mt-3 font-[var(--font-display)] text-[28px] font-bold text-text">{book.title}</h2>
            <p className="mt-3 text-[14px] text-text-2">{book.intro}</p>
            <p className="mt-3 text-[13px] text-text-3">{book.chapters.length} chương · ~{book.wordCount} chữ</p>
            <Link href={`/co-thu/${book.slug}`} className="mt-4 inline-block rounded-[12px] border border-gold/20 bg-tuvi-bg px-4 py-3 text-[14px] font-semibold text-gold">Mở sách</Link>
          </article>
        ))}
      </section>
    </main>
  );
}
