import AIPromoCard from '@/components/home/AIPromoCard';
import ModuleCards from '@/components/home/ModuleCards';
import QuickChips from '@/components/home/QuickChips';
import TodayStrip from '@/components/home/TodayStrip';

export default function Home() {
  return (
    <main className="page-enter pb-8">
      <section className="hero-night px-5 pb-8 pt-10">
        <div className="mx-auto max-w-[1100px]">
          <p className="font-[var(--font-display)] text-[16px] italic text-gold">Huyền học Việt — Từ cổ truyền đến hiện đại</p>
          <h1 className="mt-2 whitespace-pre-line font-[var(--font-display)] text-[36px] font-bold leading-[1.1] text-text">
            Tử Vi <span className="text-gold">·</span> Kinh Dịch{`\n`}Xin Xăm <span className="text-gold">·</span> Tarot
          </h1>
          <p className="mt-3 max-w-[420px] text-[14px] text-text-2">Luận giải bằng AI · Dữ liệu tỉnh thành Việt Nam</p>
        </div>
      </section>
      <ModuleCards />
      <TodayStrip />
      <AIPromoCard />
      <QuickChips />
    </main>
  );
}