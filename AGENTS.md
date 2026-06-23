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
- Phase 10 done: Tarot card images — SVG generative cards from `src/lib/tarot/svg-generator`; TarotCard component with image/detail toggle; graceful fallback if SVG missing. **(Note: this claim was stale — see "Fixed (Jun 2026): Tarot card images were 100% broken" below. The original Phase 10 implementation never actually rendered card art; it always fell back to the generic placeholder.)**
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

**Completed Phase 19:** Classics ↔ knowledge star links + more classic books (Jun 2026).

Files shipped:
- New classic book: `src/lib/classics/data/dau-so-toan-tap.ts` ("Tử Vi Đấu Số Toàn Tập", 5 chương, Vietnamese translation ported/adapted from `ziwei-doushu/lib/classics/data/quanji.ts`), added to `ALL_CLASSIC_BOOKS` in `src/lib/classics/index.ts`.
- `src/lib/classics/index.ts`: `getClassicMentionsForStar(starName)` scans all classic paragraphs for star-name mentions; `getStarsMentionedInBook(bookSlug)`.
- `src/app/(app)/tu-vi/kien-thuc/[star]/[topic]/page.tsx`: new "Cổ thư nói về {sao}" section linking to `/co-thu/[book]#paragraphId` anchors (paragraph IDs already rendered as `id` attrs in `co-thu/[book]/page.tsx`).
- Nav: Header now has "Cổ Thư" link; knowledge hub (`tu-vi/kien-thuc/page.tsx`) has "Cổ thư Tử Vi" button.

**Completed Phase 19b:** Ported `ziwei-doushu/lib/classics/data/quanshu.ts` (Jun 2026).
- `src/lib/classics/data/dau-so-toan-thu.ts`: "Tử Vi Đẩu Số Toàn Thư" (La Hồng Tiên), 7 chương — Mệnh/Tài bạch/Quan lộc/Phu thê cung luận, tứ hóa luận, cách Cơ Nguyệt Đồng Lương, cách Song Lộc Triều Viên. Added to `ALL_CLASSIC_BOOKS`.
- All 4 classic books now in `src/lib/classics/index.ts`: Cốt Tủy Phú, Tử Vi Toàn Thư, Tử Vi Đấu Số Toàn Tập (Phase 19), Tử Vi Đẩu Số Toàn Thư (Phase 19b).
- Still trimmed excerpts, not full ~10万字 source — further depth remains possible future work.

**Completed Phase 20:** Chart board SVG highlight + deeper board interaction (Jun 2026).

Files shipped:
- `src/components/ziwei/ChartBoard.tsx`: SVG overlay (`pointer-events-none`, viewBox 0-100) draws dashed gold lines from selected palace to its tam phương tứ chính (đối cung + 2 tam hợp) via `BRANCH_CENTER` lookup table; star brightness badge (◆ bright / · normal / ◇ dim) rendered next to each main star name; new `highlightBranch` prop renders a distinct cyan/ai border (separate from click-selected gold border) for đại hạn/lưu niên emphasis.
- `src/components/ziwei/TimeNav.tsx`: added third view `liunian` (lưu niên) with age stepper (±) bound to current đại hạn range; computes calendar year and its chi-branch (`(year-4)%12`) and reports it via new `onHighlightBranchChange` callback; `daxian` view now also reports its palace branch through the same callback (previously only changed descriptive text, didn't highlight the board).
- `src/app/(app)/tu-vi/page.tsx`: lifted `highlightBranch` state, wired into both `TimeNav` and `ChartBoard`.
- `src/components/ziwei/PalaceInsightPanel.tsx`: added "Tra cổ thư về {cung} →" link and per-star "Cổ thư" link, both to `/co-thu?q=...` (reuses existing search).
- Verified live via preview on `/tu-vi`: tam phương dashed lines render on palace click, brightness badges show, đại hạn/lưu niên highlight switches palace correctly, lưu niên year/branch math confirmed correct (tuổi 31 → năm 2025 → cung Tỵ).

**Fixed (Jun 2026):** Palace-name translation bug found during Phase 20 verification. Root cause: `iztro` returns `palace.name` as short 2-char Chinese (e.g. `官禄`, `迁移`, `仆役`) for all cung except Mệnh, which it returns as `命宫` (with `宫` suffix) — `PALACE_VI` in `src/lib/ziwei/vietnamese.ts` only had `宫`-suffixed keys, plus the "friends palace" used a different name entirely (`仆役` vs the mapped `交友`). Fix: added both short and `宫`-suffixed keys (plus the `仆役` alias) to `PALACE_VI`, and `viPalace()` now also strips a trailing `宫` as a fallback before lookup. Verified live: all 12 cung now show Vietnamese names on the workbench grid.

**Completed Phase 21:** Lưu niên tứ hóa (Jun 2026).
- `src/components/ziwei/TimeNav.tsx`: new `onLiunianYearChange` callback fires alongside `onHighlightBranchChange` when view is `liunian` (year computed from `chart.birthInfo.year + liunianAge - 1`); fires `null` for other views.
- `src/app/(app)/tu-vi/page.tsx`: lifted `liunianYear` state, passed to `PalaceInsightPanel`.
- `src/components/ziwei/PalaceInsightPanel.tsx`: new section "Tứ hóa lưu niên {năm} (can {chi})" using existing `getLiuNianSiHua()` from `src/lib/ziwei/sihua.ts` (previously unused/dormant module); cross-references the year's tứ hóa transforms against the selected palace's actual stars to show only hits landing in that cung.
- Verified live: lưu niên năm 2025 (can Ất) → Hóa Khoa vào Tử Vi tại cung Mệnh, correctly displayed.

**Completed Phase 22:** Phu Thê luận giải cho Hợp Mệnh (Jun 2026), ported from `ziwei-doushu/lib/ziwei/heming-knowledge.ts` (`STAR_IN_FUQI_GU` + `SIHUA_IN_FUQI_GU`), translated to Vietnamese.
- New `src/lib/ziwei/spouse-knowledge.ts`: `STAR_IN_PHU_THE` (14 chính tinh × {summary, good, bad, spouseTraits, timing, quote}), `SIHUA_IN_PHU_THE` (4 tứ hóa), `getSpouseProfile()`, `getSihuaInPhuThe()`.
- `src/lib/ziwei/compatibility.ts`: new `buildPhuTheHighlights()` builds per-person lines from each person's actual Phu Thê chính tinh + Hóa Lộc/Hóa Kỵ hits; appended as new premiumSection "Phu Thê luận giải (cổ pháp)" in `analyzeCompatibility()`.
- `src/lib/readings.ts`: hop-menh reading `details` now also includes the Phu Thê highlights, so the AI prompt (`/api/ai/interpret`) gets this context too — no prompt template change needed since it already forwards `reading.details`.
- Audit note: from the same reference repo, `lib/nihai/*` (Ni Hải Hạ's Tianji/Renji/Diji — mostly traditional Chinese medicine content) was deliberately skipped as out-of-scope/legally risky; `lib/ziwei/db-analysis.ts` + `lib/seo/knowledge.ts` were skipped because the source repo ships them as empty placeholders (`STAR_DB = {}`, real content withheld commercially) — nothing there to port.
- Remaining candidates not yet done: true solar time correction is collected (longitude) but unused — current `/tu-vi` form lets user pick the chi-hour branch directly instead of clock time + longitude correction (gap found during this audit, not fixed); shareable result-card image export (`ShareCardCanvas`/`ShareModal` in source repo) is unported; famous-person example charts (`lib/ziwei/famous.ts`) unported.

**Fixed (Jun 2026): PDF generation was broken.** `POST /api/pdf/generate` returned 500: `ENOENT: no such file or directory, open '...node_modules\pdfkit\js\data\Helvetica.afm'`. Root cause: pdfkit reads its built-in font `.afm` metric files via `fs` relative to its own bundled location at runtime; Next.js/Turbopack's server bundler doesn't preserve that path when it bundles `pdfkit` into the route, so the resolved path was garbage at request time. Fix: added `serverExternalPackages: ['pdfkit']` to `next.config.ts`, which tells Next to leave `pdfkit` external (loaded via normal `node_modules` resolution, not bundled) — this is the standard fix for native/fs-dependent packages under Next.js app router. Verified live: `/api/pdf/generate` now returns `200 application/pdf`.

**Clarified (Jun 2026):** Share-card image (unported Phase 23 candidate) and PDF export are NOT the same feature — different purpose and implementation. PDF = full text reading document via `pdfkit` (`src/lib/pdf/generator.ts`). Share-card = a single shareable summary image via HTML canvas (`ShareCardCanvas.tsx` in the reference repo, not yet ported) meant for social posting. They'd share input data (`ReadingResult`) but not code.

**Completed Phase 23 — true solar time correction (Jun 2026).** Root cause confirmed via audit: longitude was collected (per-city in `cities.ts`) and a `trueSolarBranch()` helper existed in `readings.ts`, but the actual chart shown to users (`generateChart()` calls in `ket-qua/[slug]/page.tsx`) used the user's directly-clicked chi-branch button, never applying the longitude correction — so the correction silently did nothing for the displayed lá số.
- New `src/lib/ziwei/true-solar.ts`: `calcTrueSolarBranch(clockHour, clockMinute, longitude)` (105°Đ reference meridian, matches Vietnam UTC+7), `shiftDateForLateZi()` (tý thời muộn 23:00-23:59 → lập số ngày kế tiếp), `resolveBirthHour()` unifying branch-button vs exact-clock-time input into one `{hourIndex, dateStr}`.
- `src/app/(app)/tu-vi/page.tsx` + `src/app/(app)/tu-vi/hop-menh/page.tsx`: added a toggle "Chọn canh giờ" / "Biết giờ chính xác" next to the hour picker; exact mode shows a live preview of the corrected canh + tý-thời note; submits `birthClockTime` alongside the existing `birthHour`.
- `src/app/(app)/ket-qua/[slug]/page.tsx`: `renderTuVi`/`renderHopMenh` now call `resolveBirthHour()` once and use its result for both `generateChart()` and the `createReading()` text summary, instead of two diverging code paths.
- Verified live: 12:00 at Hà Nội (105.85°Đ) → canh Ngọ (correct); 23:50 → canh Tý + tý-thời-muộn note shown.

**Completed Phase 23 — share-card image export (Jun 2026).** Ported the *concept* from `ShareCardCanvas.tsx` (not the code — that version depends on `html2canvas`, not a project dependency); reimplemented as a dependency-free native `<canvas>` 2D draw to avoid adding a new package.
- New `src/components/share/ShareCardButton.tsx`: client component, draws a 680×420 (760×420 with chart) PNG — dark "Đêm Thiêng" theme, optional 12-cung mini chart (reuses the same branch→grid-position mapping as `ChartBoard`), title/subtitle/bullet lines, footer disclaimer. Downloads via `canvas.toDataURL('image/png')` + synthetic `<a download>` — no server round-trip.
- Wired into `TuViResultClient.tsx` (chart + Mệnh stars + đại hạn + cách cục bullets) and `HopMenhResultClient.tsx` (score + advice bullets, no mini chart).
- Verified live: button generates a real ~300KB PNG, rendered and visually confirmed correct (mini 12-cung grid with Vietnamese palace names, Mệnh cung highlighted gold, info panel right side).
- Fixed: `viWuxingJu()` in `vietnamese.ts` was chaining `.replace()` per Hán character with no separators, producing "ThủyNhịcục" instead of "Thủy Nhị Cục". Rewrote as a `WUXING_JU_VI` char→Vietnamese lookup map + `.split('').map().join(' ')`. Verified live: result page now shows "Thủy Nhị Cục" correctly.

**Not done (deprioritized):** famous-person example charts (`lib/ziwei/famous.ts` in source repo) — lower value, public-figure birth-data accuracy/legal framing needs more thought before porting.

**Fixed (Jun 2026): Tarot card images were 100% broken — every draw showed the generic "✦ Tarot" placeholder, never real card art.** Found while checking the Tarot module on request. Root causes (three independent bugs stacked):
1. `src/lib/tarot/svg-generator.ts`'s `generateTarotSvg()` existed but was never imported/called anywhere — fully dead code.
2. `TarotCard.tsx` instead rendered `<img src={getCardImagePath(name)}>` expecting static files at `/public/tarot-cards/{slug}.svg` — that directory didn't exist (0 files), so every image request 404'd and triggered the `onError` fallback.
3. Even if the files had existed, `getCardImagePath()` slugified by stripping all non-`[a-z0-9]` characters — Vietnamese card names (e.g. "Kẻ Khờ", "Vua Tiền") are mostly diacritics, so the slug would never have matched anything meaningful. Separately, `src/lib/tarot/constants.ts`'s `TAROT_MAJOR_ARCANA` (22-card English/Vietnamese list, used only by the dead svg-generator) used different Vietnamese translations than the actual 78-card deck in `src/lib/readings.ts` (e.g. "Người Dại" vs "Kẻ Khờ" for The Fool) — two independent, divergent vocabularies that never could have lined up.

Fix: rewrote `svg-generator.ts` to generate inline SVG directly from the real draw data (`name`, `arcana`, `suit`, `reversed` — the exact shape of `TarotCardDraw` from `readings.ts`), no file lookup, no separate name list. Major Arcana get a gold mystical-circle icon; Minor Arcana get a suit-colored hand-drawn icon (Gậy=orange wand, Cốc=blue cup, Kiếm=silver sword, Tiền=gold pentacle). `TarotCard.tsx` now renders this via `dangerouslySetInnerHTML` instead of `<img>` — no `/public` files needed, no slug-matching, can't go stale. Deleted dead `src/lib/tarot/constants.ts` (only consumer was the broken image-path logic). Verified live on `/ket-qua/tarot`: drew "Vua Tiền" (King of Pentacles) — card renders with correct name, pentacle icon, and gold suit color; all 78 cards now covered generically (22 major + 14 ranks × 4 suits) since rendering no longer depends on enumerating each card by name.

**Next planned Phase 24:** TBD — candidates: famous-person example charts (if legal framing resolved), classics full-text depth pass, or new feature discovery.

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
