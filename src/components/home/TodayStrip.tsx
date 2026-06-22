export default function TodayStrip() {
  const now = new Date();
  const good = now.getDate() % 3 === 0 ? 'Tốt' : now.getDate() % 2 === 0 ? 'Bình thường' : 'Không tốt';
  return (
    <section className="mt-7 border-y border-border bg-surface px-5 py-[14px] md:mx-auto md:max-w-[1100px] md:rounded-2xl md:border">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[1.5px] text-gold">HÔM NAY</div>
          <div className="mt-1 text-[13px] font-semibold text-text">{new Intl.DateTimeFormat('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(now)} · Nhâm Thìn</div>
          <div className="mt-1 text-[12px] text-text-2">Ngày 27 tháng 5 Ất Tỵ</div>
        </div>
        <div className="text-right">
          <div className="inline-flex rounded-full px-2 py-1 text-[11px] font-bold" style={{ background: good === 'Tốt' ? 'rgba(74,155,111,0.15)' : 'rgba(201,169,110,0.12)', color: good === 'Tốt' ? 'var(--color-kinh)' : 'var(--color-gold)' }}>{good}</div>
          <div className="mt-2 text-[11px] text-text-2">07:00 – 09:00</div>
        </div>
      </div>
    </section>
  );
}