<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project: tuvi-vn

Vietnamese spiritual services MVP for Vercel deployment.

## Product scope
- Frontend landing/app for 4 services: Lá số Tử Vi, Quẻ Kinh Dịch, Xin Xăm, Tarot.
- API routes prepared for AI reading, auth, checkout, and history.
- Tử Vi engine is ported from `D:\tuvi\ziwei-doushu` and exposed through `/api/reading`.
- Kinh Dịch engine is a custom 64-guai + moving line system based on the King Wen classic.
- Xin Xăm (lots) and Tarot (major arcana) have dedicated UI pages with interactive graphics.

## Stack
- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Vercel target

## Main files
- `src/app/(app)/page.tsx`: homepage per `tuvi-ui-spec.md` — hero, 4 signature module cards, today strip, AI promo, quick chips.
- `src/app/(app)/tu-vi/page.tsx`: Tử Vi form page — submit to result page, giờ sinh chips, searchable province/city picker, longitude display.
- `src/app/(app)/kinh-dich/page.tsx`: Kinh Dịch module page — 3 modes (Lục Hào / Thiên Ý / Mai Hoa), 6-flip UI, submit to result page.
- `src/app/(app)/xin-xam/page.tsx`: Xin Xăm module page — theme cards, shake preview, submit to result page, AI CTA.
- `src/app/(app)/tarot/page.tsx`: Tarot module page — spread picker, question textarea, reveal preview, submit to result page, AI CTA.
- `src/app/(app)/goi-dich-vu/page.tsx`: pricing/paywall page for AI flow.
- `src/app/(app)/ket-qua/[slug]/page.tsx`: result pages for Tử Vi / Kinh Dịch / Xin Xăm / Tarot.
- `src/app/(app)/layout.tsx`: shared app shell with header, footer, mobile bottom nav.
- `src/components/layout/Header.tsx`: sticky blurred header.
- `src/components/layout/BottomNav.tsx`: fixed mobile bottom nav with elevated center AI button.
- `src/components/layout/Footer.tsx`: footer + disclaimer.
- `src/components/layout/BottomSheet.tsx`: reusable bottom sheet picker.
- `src/components/home/ModuleCards.tsx`: 4-card signature home grid.
- `src/components/home/TodayStrip.tsx`: “Hôm Nay” strip.
- `src/components/home/AIPromoCard.tsx`: AI promo card.
- `src/components/home/QuickChips.tsx`: horizontally scrollable quick actions.
- `src/components/shared/ModuleHero.tsx`: shared small hero for module pages.
- `src/components/shared/GlowCard.tsx`: reusable glow card shell.
- `src/lib/readings.ts`: reading orchestrator; Tử Vi/Kinh Dịch use real engines; Xin Xăm/Tarot use MVP rules.
- `src/lib/ziwei/algorithm.ts`: real Tử Vi chart generation via `iztro`.
- `src/lib/ziwei/cities.ts`: Vietnam provinces/cities and longitude data for true solar time.
- `src/lib/ziwei/vietnamese.ts`: Vietnamese labels for palaces, stars, branches, tứ hóa, ngũ hành cục.
- `src/lib/iching/engine.ts`: custom 64-guai I Ching engine with King Wen ordering, 3-coin casting, moving lines, hexagram lookup, and Vietnamese translations.
- `src/app/api/reading/route.ts`: reading API, returns local mode unless `AI_API_KEY` exists.
- `src/app/api/auth/route.ts`: mock email login.
- `src/app/api/checkout/route.ts`: mock checkout for starter/pro plans.
- `src/app/api/history/route.ts`: mock reading history.

## Env
- `AI_API_KEY`: future LLM provider key.
- `PAYMENT_PROVIDER`: default `mock`; future Stripe/PayOS/Momo.
- `DATABASE_URL`: future database for users/history.

## Commands
- `npm run dev`: local dev.
- `npm run lint`: ESLint.
- `npm run build`: production build/type check.

## Localization rules 
- All user-facing text must be Vietnamese.
- Keep Chinese star/palace keys only inside engine internals if `iztro` requires them.
- Always convert user-facing palaces/stars/tứ hóa through `src/lib/ziwei/vietnamese.ts`.
- Location data must be Vietnam-only; use `src/lib/ziwei/cities.ts`.
- I Ching hexagrams are fully translated into Vietnamese with original Chinese characters preserved for reference.

## Design system
- Active spec source: `C:\Users\Mrwin\Downloads\tuvi-ui-spec.md`.
- Theme: “Đêm Thiêng” — dark mystical, temple gold, subtle glow.
- Core colors: `#0D0B19` bg, `#181530` surface, `#221E3E` surface-2, `#C9A96E` gold, `#EDE7D3` text.
- Module colors: Tử Vi = gold, Kinh Dịch = green jade, Xin Xăm = vermilion red, Tarot = mystical purple, AI = cyan.
- Fonts: `Cormorant Garamond` for display + `Be Vietnam Pro` for UI.
- Mobile-first: base viewport ~390px, desktop breakpoint ~768px.
- Interactive animations: coin flip, tube shake, card flip 3D, glow pulse, page-enter fade.

## Current limitations / TODO
- Tử Vi result page now renders real `generateChart()` data, summary, Đại Hạn, Tứ Hóa, and palace grid; next step is richer tab interaction and deeper pattern output.
- Premium gating is now wired from result pages to `/goi-dich-vu` and mock checkout returns to result page with unlocked state; next step is replacing query-string mock state with real entitlement/auth/payment state.
- Kinh Dịch now supports Lục Hào, Mai Hoa, and Thiên Ý with method-aware derivation in `src/lib/iching/engine.ts`; next step is deeper interpretation quality and, if needed, stricter classical Mai Hoa rules.
- Tarot now supports full 78-card deck with major/minor arcana and upright/reversed meanings from `drawTarotCards()` in `src/lib/readings.ts`; next step is card images and richer per-card meaning dataset.
- Tarot card images: currently text-only; add Rider-Waite card images.
- Xin Xăm still uses mock lots; expand to full xăm dataset with 100+ lots, Hán/Nôm text, dịch nghĩa, and phẩm cấp.
- Auth/payment/history are mocks; replace with real providers (NextAuth, PayOS/Stripe, Vercel Postgres).
- No persistent database yet; add Vercel Postgres or Supabase for user data and reading history.
- No LLM integration yet; connect AI provider (OpenAI/Claude/Gemini) for deep reading interpretation.
- Add PDF report generation for readings.
- Add social sharing (OG image per chart/reading).

## Recent session progress
- Phase 1 done: premium gating flow across `src/app/(app)/ket-qua/[slug]/page.tsx`, `src/app/(app)/goi-dich-vu/page.tsx`, and `src/app/api/checkout/route.ts`.
- Phase 2 done: Kinh Dịch form/result now pass `method`, `objectName`, `datetime`; engine returns method detail, quẻ chủ/quẻ biến, hào động, and six-line summaries.
- Phase 3 done: Tarot form/result now support spread `1` or `3`; result page renders deterministic 78-card draws with reversed state.
- Verification baseline for these phases: `npm run lint` and `npm run build` both passed after each phase.
- Recommended next implementation phase: Xin Xăm dataset expansion, then real auth/payment/history + database.

## Git/deploy
- GitHub repo: `https://github.com/maihuuthang2802-beep/tuvi-vn`
- Production deploy expected through Vercel Git integration on `main` branch.
