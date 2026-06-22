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
- Phase 1 done: premium gating flow across `src/app/(app)/ket-qua/[slug]/page.tsx`, `src/app/(app)/goi-dich-vu/page.tsx`, and `src/app/api/checkout/route.ts`.
- Phase 2 done: Kinh Dịch form/result now pass `method`, `objectName`, `datetime`; engine returns method detail, quẻ chủ/quẻ biến, hào động, and six-line summaries.
- Phase 3 done: Tarot form/result now support spread `1` or `3`; result page renders deterministic 78-card draws with reversed state.
- Phase 4 done: Xin Xăm dataset expanded to 96 lots with Hán/Nôm, dịch nghĩa, phẩm cấp (tương/bất/liêu/cải); deterministic seed-based draw.
- Phase 6 done: LLM integration via OpenAI API; `/api/ai/interpret` endpoint; result pages have AI Luận Giải tab (client-side fetch via `useAIInterpretation` hook).
- Phase 7 done: PDF report generation via pdfkit; `/api/pdf/generate` endpoint; result pages have "PDF Report" download button.
- Verification baseline for these phases: `npm run lint` and `npm run build` both passed after each phase.

**Remaining phases:**
- Phase 5: Auth + Payment + DB (NextAuth, PayOS/Stripe, Vercel Postgres) — postponed.
- Phase 9: Tử Vi deeper output — richer tab interaction, pattern detection (cách cục), deeper star meanings.
- Phase 10: Tarot card images — Rider-Waite 78-card PNG set, per-card image render.

Recommended next: Phase 9 (Tử Vi richness) or Phase 10 (Tarot UX polish).

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
