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
- `src/app/page.tsx`: landing page with 4 service cards (Tử Vi, Kinh Dịch, Xin Xăm, Tarot).
- `src/app/tu-vi/page.tsx`: Tử Vi page — 3-column layout: left sidebar (form + palace list), center (4×4 chart grid), right sidebar (star details + interpretation).
- `src/app/kinh-dich/page.tsx`: Kinh Dịch page — 3-tab switcher: Lục Hào (coin casting animation), Thiên Ý (intent-based), Mai Hoa (time-based). Hexagram rendering with line-by-line display.
- `src/app/xin-xam/page.tsx`: Xin Xăm page — bamboo tube shake animation, random lot draw, expandable poem + 4-category interpretation (tài lộc, tình duyên, gia đạo, sức khỏe).
- `src/app/tarot/page.tsx`: Tarot page — 1 or 3 card spread, 3D flip animation, upright/reversed meanings.
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
- `OPENAI_API_KEY`: OpenAI API key for deep reading AI interpretation (gpt-4-turbo). If not set, AI endpoint returns mock message.
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
- Theme: "Đêm Thiêng" — dark mystical, temple gold, subtle glow.
- Core colors: `#0D0B19` bg, `#181530` surface, `#221E3E` surface-2, `#C9A96E` gold, `#EDE7D3` text.
- Module colors: Tử Vi = gold, Kinh Dịch = green jade, Xin Xăm = vermilion red, Tarot = mystical purple, AI = cyan.
- Fonts: `Cormorant Garamond` for display + `Be Vietnam Pro` for UI.
- Mobile-first: base viewport ~390px, desktop breakpoint ~768px.
- Interactive animations: coin flip, tube shake, card flip 3D, glow pulse, page-enter fade.

## Current limitations / TODO

**Completed phases:**
- Phase 1 done: premium gating flow across `src/app/(app)/ket-qua/[slug]/page.tsx`, `src/app/(app)/goi-dich-vu/page.tsx`, and `src/app/api/checkout/route.ts`.
- Phase 2 done: Kinh Dịch form/result now pass `method`, `objectName`, `datetime`; engine returns method detail, quẻ chủ/quẻ biến, hào động, and six-line summaries.
- Phase 3 done: Tarot form/result now support spread `1` or `3`; result page renders deterministic 78-card draws with reversed state.
- Phase 4 done: Xin Xăm dataset expanded to 96 lots with Hán/Nôm, dịch nghĩa, phẩm cấp (tương/bất/liêu/cải); deterministic seed-based draw.
- Phase 6 done: LLM integration via OpenAI API; `/api/ai/interpret` endpoint; result pages have AI Luận Giải tab (client-side fetch via `useAIInterpretation` hook).
- Phase 7 done: PDF report generation via pdfkit; `/api/pdf/generate` endpoint; result pages have "PDF Report" download button.
- Phase 9 done: Tử Vi deeper output — interactive 5-tab UI (Tổng quan, Cung Mệnh, Đại Hạn, Tứ Hóa, Các Cung); cách cục pattern detection (Tử Tương, Cơ Âm, Dương Lương, v.v); deeper star meanings; current DaXian analysis.
- Phase 10 done: Tarot card images — SVG generative cards from `src/lib/tarot/svg-generator`; TarotCard component with image/detail toggle; graceful fallback if SVG missing.
- Phase 11 done: Header desktop nav (md: horizontal links, mobile: burger menu drawer).
- Phase 11b done: Placeholder page redirects (lich-van-nien, ca-nhan, lich-su → /).
- Phase 12 done: 2-step province/city picker (63 provinces → cities, search per-step, longitude display).
- Phase 13 done: Real 3-coin flip (yin/yang lines), hexagram seed encoded, passed to backend.
- Phase 14 done: Footer with service links, legal links, social icons, disclaimer, copyright.
- Phase 15 done: Profile dropdown menu (Cá nhân, Lịch sử, Đăng xuất).
- Phase 16 done: Accessibility (focus rings, reduced-motion)

**Verification baseline:** `npm run lint` and `npm run build` both passed after each phase.

## Full Audit Results (Jun 2026)

**Reviewed against original checklist. Core Phase 11–16 gaps closed. Remaining work is postponed Phase 5/8 only.**

### Confirmed DONE (verified by file/line)

| Item | File:line | Note |
|------|-----------|------|
| AI center button + paywall page | `(app)/goi-dich-vu/page.tsx:11` | 3-plan pricing, checkout form, returnTo logic |
| /ket-qua/* result pages | `(app)/ket-qua/[slug]/page.tsx:81` | Single dynamic route renders all 4 services |
| Tử Vi result 5-tab UI | `components/result/TuViResultClient.tsx:21` | Tổng quan · Cung Mệnh · Đại Hạn · Tứ Hóa · Các Cung |
| Tử Vi chart integration | `(app)/ket-qua/[slug]/page.tsx:54` | Calls `generateChart()` + `createReading()` |
| Province/city 2-step picker | `(app)/tu-vi/page.tsx:99–135` | BottomSheet province → city, search per step, longitude display |
| Kinh Dịch 3-mode form | `(app)/kinh-dich/page.tsx:7` | Lục Hào · Thiên Ý · Mai Hoa, each mode has unique fields |
| Kinh Dịch result (quẻ chủ/biến/hào) | `components/result/BasicResultClient.tsx:64–90` | Renders hexagram, changed hexagram, moving lines, 6-line table |
| Xin Xăm form + result route | `(app)/xin-xam/page.tsx` + `ket-qua/xin-xam` | Category picker, shake animation, result via BasicResultClient |
| Xin Xăm 97-lot dataset | `lib/xixam/lots.ts:11` | XI_XAM_LOTS has 97 entries (id 1–97), Hán/Nôm, category |
| Tarot 1/3 spread + result | `(app)/tarot/page.tsx` + `ket-qua/tarot` | TarotCard SVG, reversed state, spread label |
| Tarot 78-card SVG generator | `lib/tarot/svg-generator.ts` | All 78 cards generated; TarotCard component with fallback |
| Header desktop nav | `components/layout/Header.tsx:30` | `md:flex` nav: Tử Vi · Kinh Dịch · Xin Xăm · Tarot · AI |
| Header mobile hamburger | `components/layout/Header.tsx:88–126` | Burger button + drawer with same nav links |
| Profile dropdown | `components/layout/Header.tsx:47–78` | Cá nhân · Lịch sử · Đăng xuất; md: only |
| Footer | `components/layout/Footer.tsx` | Service links, legal links, social, disclaimer, copyright |
| BottomNav (mobile) | `components/layout/BottomNav.tsx` | 5-item nav, center AI button elevated, safe-area-inset-bottom |
| I Ching engine | `lib/iching/engine.ts` | 64 hexagrams, King Wen order, moving lines, Vietnamese |
| AI interpret endpoint | `app/api/ai/interpret/route.ts` | POST → OpenAI; mock if no API key |
| PDF generate endpoint | `app/api/pdf/generate/route.ts` | pdfkit, returns buffer download |
| useAIInterpretation hook | `hooks/useAIInterpretation.ts` | Fetches `/api/ai/interpret`, loading/error state |
| downloadPDF helper | `lib/pdf.ts` | Client-side fetch + `<a download>` trigger |
| Auth mock route | `app/api/auth/route.ts` | Email validation, returns base64url token |
| Checkout mock route | `app/api/checkout/route.ts` | Redirects to `returnTo?upgraded=1&plan=...` |
| Focus rings | `app/globals.css:37–44` | `:focus-visible { outline: 2px solid gold }` on all interactive |
| Reduced-motion | `app/globals.css:68–75` | `@media (prefers-reduced-motion: reduce)` kills all animations |

### Gaps remaining

None in Phase 11–16 scope.

## Remaining work (Priority order)

**Completed Phase 17:** Full ziwei expansion delivered (Jun 2026).

Files shipped:
- Compatibility engine: `src/lib/ziwei/compatibility.ts`, route `/tu-vi/hop-menh`, result route `/ket-qua/hop-menh`.
- Compatibility UI: `src/components/result/HopMenhResultClient.tsx` tabs overview/axes/people/ai/premium, AI tab with `useAIInterpretation`.
- Knowledge hub: `src/lib/ziwei/knowledge.ts` 14 stars × 13 topics, detail page `src/app/(app)/tu-vi/kien-thuc/[star]/[topic]/page.tsx`, hub page `src/app/(app)/tu-vi/kien-thuc/page.tsx`, expanded StarProfile with archetype/roles/needs/stress/growth/related stars/keywords.
- Pattern engine expanded: `src/lib/ziwei/patterns.ts` with evidence/severity/palace fields, new detectors Phu thê/Tài bạch/Quan lộc/current đại hạn.
- Internal links: result `TuViResultClient` → knowledge per star, per palace, sidebar knowledge + hợp mệnh CTAs. Form `/tu-vi` has knowledge shortcuts. `HopMenhResultClient` sidebar has knowledge + new pair links.
- AI prompts: new `hop-menh` branch in `src/lib/ai/prompts.ts`.
- Header: new Hợp Mệnh + Kiến Thức links. ModuleCards: 5-col with Hợp Mệnh card.

**Completed Phase 18:** Chart workbench + classics library (Jun 2026).

Files shipped:
- Chart workbench: `src/components/ziwei/ChartBoard.tsx`, `src/components/ziwei/TimeNav.tsx`, `src/components/ziwei/PalaceInsightPanel.tsx`.
- Tử Vi page upgraded to 3-col workbench: form + board + insight panel with "Xem workbench" preview, palace-select detail, star interpretation links.
- Classics library: `src/lib/classics/types.ts`, `src/lib/classics/index.ts`, `src/lib/classics/data/cot-tuy-phu.ts`, `src/lib/classics/data/tu-vi-toan-thu.ts`.
- Library pages: `/co-thu` hub with search, `/co-thu/[book]` reader with anchor-tagged chapters, search results linking to paragraph anchors.

**Next planned Phase 19:** Classics ↔ knowledge star links + more classic books.
- Add per-star links from classic paragraphs mentioning a star to knowledge pages.
- Add more classic book data files (port from `ziwei-doushu/lib/classics/data/quanji.ts` and `quanshu.ts` style).
- Add "Cổ thư" link in knowledge sidebar, maybe in Header.

**Next planned Phase 20:** Chart board SVG highlight + deeper board interaction.
- Draw 三方四正 lines between related palaces on workbench click.
- Add star brightness/badge overlay on palace cells.
- Add liunian (year) picker to TimeNav with year overlay.
- Add link from board palaces to classic search.

**Postponed (Phase 5, 8):**
- Phase 5: Auth + Payment + DB (NextAuth, PayOS/Stripe, Vercel Postgres)
- Phase 8: TBD feature discovery

## Git/deploy
- GitHub repo: `https://github.com/maihuuthang2802-beep/tuvi-vn`
- Production deploy expected through Vercel Git integration on `main` branch.

## LLM Integration (Phase 6)

**Setup:**
- Install OpenAI SDK: `npm install openai @types/openai`
- Set env var: `OPENAI_API_KEY=sk-...`
- Model: `gpt-4-turbo` (configurable in `src/lib/ai/client.ts`)

**How it works:**
1. Result page renders tab switcher: "Chi tiết" ↔ "AI Luận Giải"
2. Clicking "AI Luận Giải" triggers `useAIInterpretation()` hook (client-side)
3. Hook fetches POST `/api/ai/interpret` with service + reading + question
4. Server calls OpenAI with service-specific system prompt (`src/lib/ai/prompts.ts`)
5. Returns interpretation text; displays in tab
6. Fallback: if `OPENAI_API_KEY` not set, shows mock message

**Prompts per service:**
- Tử Vi: Focus on Ming Palace, Da Xian, Si Hua, practical life guidance
- Kinh Dịch: Focus on hexagram philosophy, yin/yang, actionable wisdom
- Xin Xăm: Focus on lot category meaning, spiritual insight, compassion
- Tarot: Focus on card arcana, narrative arc, psychological insight

**Files:**
- `src/lib/ai/client.ts`: OpenAI client + `interpretReading()` function
- `src/lib/ai/prompts.ts`: `getSystemPrompt()` + `getUserPrompt()` per service
- `src/app/api/ai/interpret/route.ts`: POST endpoint
- `src/hooks/useAIInterpretation.ts`: client hook (must be `'use client'`)
- `src/components/result/BasicResultClient.tsx`: tab UI + hook usage

**Notes:**
- AI tab only on kinh-dịch/xin-xăm/tarot (not Tử Vi; would need server-side refactor)
- Currently returns gpt-4-turbo; can swap to Claude/Gemini by changing provider
- No streaming; waits for full response (UX: "Đang tạo luận giải...")
- No caching; every tab click re-fetches (future: add Redis cache)

## PDF Generation (Phase 7) 

**Setup:**
- Install pdfkit: `npm install pdfkit @types/pdfkit`

**How it works:**
1. Result page has "PDF Report" button (all 4 services)
2. Clicking button calls `downloadPDF(service, reading, question, metadata)`
3. Fetches POST `/api/pdf/generate` with reading data
4. Server generates PDF using pdfkit; returns file
5. Browser auto-downloads as `{service}-{timestamp}.pdf`

**PDF contents:**
- Title + creation date (gold header)
- Summary (reading.summary)
- Question (if provided)
- Details (reading.details joined with newlines)
- Advice (reading.advice)
- Metadata (optional; footer section)

**Files:**
- `src/lib/pdf/generator.ts`: `generatePDFStream()` function; returns Buffer
- `src/app/api/pdf/generate/route.ts`: POST endpoint
- `src/lib/pdf.ts`: `downloadPDF()` helper (client-side, fetches + triggers download)
- `src/components/result/BasicResultClient.tsx`: "PDF Report" button + download state
- Tử Vi result page: placeholder button (disabled; server component)

**Notes:**
- Tử Vi: currently disabled (server-side render; would need client refactor for button interactivity)
- No images in PDF yet (future: add chart diagrams via canvas → image)
- Filename: `{service}-{Date.now()}.pdf` (e.g. `kinh-dich-1719123456789.pdf`)
