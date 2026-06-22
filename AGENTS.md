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
- Dark theme dominant (`#0a0a0a` bg, `#14110f` surface, `#D4AF37` gold accent, `#F5F5F0` text).
- Heading font: Playfair Display (serif); body font: Inter (sans-serif).
- All pages responsive: desktop 3-column layouts collapse to stacked on mobile.
- Interactive animations: coin flip, tube shake, card flip 3D, hexagram build-up.

## Current limitations / TODO
- Kinh Dịch has full line judgments (tóm lược); add full line-by-line translations from original text later.
- Xin Xăm uses 10 lots; expand to full xăm dataset with 100+ lots.
- Tarot uses 22 major arcana cards; expand to full 78-card deck with minor arcana and detailed meanings.
- Tarot card images: currently text-only; add Rider-Waite card images.
- Auth/payment/history are mocks; replace with real providers (NextAuth, PayOS/Stripe, Vercel Postgres).
- No persistent database yet; add Vercel Postgres or Supabase for user data and reading history.
- No LLM integration yet; connect AI provider (OpenAI/Claude/Gemini) for deep reading interpretation.
- Tử Vi patterns (cách cục) engine exists but not wired to API output yet.
- Add PDF report generation for readings.
- Add social sharing (OG image per chart/reading).

## Git/deploy
- GitHub repo: `https://github.com/maihuuthang2802-beep/tuvi-vn`
- Production deploy expected through Vercel Git integration on `main` branch.
