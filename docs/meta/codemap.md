# Repository Atlas: KeyGati

> Free online typing speed test at keygati.com. Flat static site: no build, no framework, no backend. Two interactive test pages + content/SEO pages + two vanilla JS typing engines + one global stylesheet.

## Project Responsibility

- Provide free typing speed test: Time mode (`timemode.html` + `script.js`, 15/30/60/120s passages) and Words mode (`words.html` + `words.js`, fixed 24-word sets).
- Landing + education funnel: `index.html` (`Test Your Typing Speed` hero, links to timemode/words/help) + `help.html` guides index + 7 guide pages + `about.html` brand story.
- Monetize via AdSense (`ca-pub-9910178999537907`) on all pages except `404.html`. Rank via static SEO (canonical, OG, JSON-LD, `sitemap.xml`, `robots.txt`).
- Hosted as GitHub Pages custom domain (`CNAME` → `keygati.com`).

## System Entry Points

| Entry | File | Loads | Purpose |
|---|---|---|---|
| Landing | `index.html` (307 lines) | `style.css`, AdSense | Hero h1 `Test Your Typing Speed`, CTAs to timemode/words/help |
| Time test | `timemode.html` (490 lines) | Tailwind CDN, `style.css`, `script.js`, AdSense | 15/30/60/120s timed passage test, results modal |
| Words test | `words.html` (277 lines) | Tailwind CDN, `style.css`, `words.js`, AdSense | Fixed-count (24 words/set) test, progress + score |
| Help index | `help.html` | `style.css`, AdSense | Index of all guides |
| Guides (7) | `wpm-guide.html`, `good-typing-speed.html`, `improve-typing-speed.html`, `improve-typing-accuracy.html`, `touch-typing-beginners.html`, `how-time-mode-works.html`, `how-words-test-works.html` | `style.css`, AdSense | SEO content, explain metrics and modes |
| Brand/legal | `about.html`, `privacy.html`, `terms.html`, `404.html` | `style.css` (+ AdSense except 404) | Brand story, legal, minified legal-page 404 |
| Infra | `CNAME`, `robots.txt`, `sitemap.xml` (14 URLs), `googleba43521b33eb7aa1.html`, `favicon.svg` (64px K mark), `docs/meta/README.md` (54 lines) | — | Domain, crawl, verify, icon, docs |

No JS router. Each `.html` is a standalone entry point with duplicated `<head>` (SEO block + theme `#A8DADC` + favicon + AdSense).

## Directory Map

Single root, flat. No `src/`, no subfolders, no bundler. `.slim/codemap.json` exists (verified recon source). `docs/meta/codemap.md` is this file.

| Group | Files |
|---|---|
| App pages | `index.html`, `timemode.html`, `words.html` |
| Guides | `help.html`, `wpm-guide.html`, `good-typing-speed.html`, `improve-typing-speed.html`, `improve-typing-accuracy.html`, `touch-typing-beginners.html`, `how-time-mode-works.html`, `how-words-test-works.html` |
| Legal/brand | `about.html`, `privacy.html`, `terms.html`, `404.html` |
| Logic | `script.js` (1079 lines, time engine), `words.js` (994 lines, words engine) |
| Assets | `style.css` (1086 lines, global), `favicon.svg` |
| Infra/SEO | `CNAME` (`keygati.com`), `robots.txt` (`Allow: /`, sitemap ref), `sitemap.xml` (14 URLs), `googleba43521b33eb7aa1.html` (Search Console verify) |
| Docs/meta | `docs/meta/README.md`, `docs/meta/codemap.md`, `.slim/codemap.json` |

## Landing + App Shell

**Responsibility:** `index.html` converts visitors to test-takers. `timemode.html` / `words.html` host the interactive tests. Content pages (`about`, `help`, guides, legal) retain + rank.

**Design — two nav patterns:**
1. Landing-header (landing + content pages): logo → `index.html`, `info-nav` with about/privacy/terms. Custom CSS, bento layout.
2. App header (`timemode.html`, `words.html` only): Tailwind utility header, logo → `index.html`, mode pill toggle (`timemode.html` ↔ `words.html`), help button. Footer exists only on app pages and is weak (minimal links).

**Flow:** `index.html` → click Time/Words CTA → `timemode.html` / `words.html` → test → results modal (in-page, no navigation) → restart or switch mode via pill → `help.html` → guides for interpretation.

**Integration:** App pages pull three external/local deps: Tailwind CDN (`https://cdn.tailwindcss.com`), `style.css`, engine JS (`script.js` / `words.js`). All pages except `404.html` load AdSense async. No shared header/footer partial — nav duplicated per file, so changes must be mirrored.

## Typing Engines

Two independent engines. No shared module, no exports, no `localStorage`. Each wraps everything in a `DOMContentLoaded` closure with its own state and DOM bindings. Not interchangeable without editing HTML IDs.

### `script.js` — Time engine (for `timemode.html`)

- **State:** `passage`, `typedText`, `totalTyped` / `totalCorrect`, `duration` (default 30), `timeLeft`, `started`, `timer`, `finished`.
- **Corpus:** Endless passage loop, ~100 passages inline lines 72–306.
- **Flow:** `keydown`/`input` → `processCharacter` → char compare → `renderPassage` + live stats → timer starts on first char (`startTimer`, 1s `setInterval`) → `timeLeft <= 0` → `showResults` modal.
- **Key funcs:** `restartTest`, `selectRandomPassage`, `setDuration`, `renderPassage`, `startTimer`, `updateWPM`, `getCorrectCharacters`, `updateAccuracy`, `updateCharacterStats`, `showResults`, `processCharacter`, `focusTypingInput`.
- **Metrics:** `WPM = round((correct/5) / minutes)`, `accuracy = round(correct/total*100)`.

### `words.js` — Words engine (for `words.html`)

- **State:** mirrors time engine plus `wordSet`, `completedWords`, per-word/char spans.
- **Corpus:** `wordBank` ~323 tiered words (line 26) + `WORDS_PER_SET = 24` (line 377). `generateWordSet` (line 412) picks 24 at random with replacement via `wordBank[randomIndex]` (line 406–408).
- **Flow:** render char/word spans → compare per keystroke → `updateProgress` (`0 / 24` → `completedWords / 24`) → `checkSetCompletion` → `setTimeout` next set. Test ends on word count, not wall clock.
- **Score:** `round((wpm/150)*1000 + (accuracy/100)*500)` — normalized composite, not raw WPM.

### script.js vs words.js

| Aspect | script.js | words.js |
|---|---|---|
| End condition | Timer (`timeLeft<=0`) | Word count (24/set) |
| Corpus | ~100 full passages | ~323-word bank, random sets |
| Progress UI | Countdown + live WPM/accuracy | `x / 24` word progress + score |
| Primary metric | WPM + accuracy | Composite score + WPM/accuracy |

## Style System

**Responsibility:** `style.css` (1086 lines) is the sole stylesheet, loaded by every page. Test pages layer Tailwind CDN utilities on top.

**Design:**
- No `:root` variables. All hex hardcoded — palette drift risk on edit.
- Palette: dark `#264653`, teal `#2A9D8F`, bg `#A8DADC`, coral `#E76F51`, orange `#F4A261`, light `#F1FAEE`. Tailwind inline config mirrors `bg #A8DADC` / `dark #264653`.
- Landing: bento 3-col → 1-col responsive. Test pages: Tailwind layout + custom `.typing-text` monospace, cursor blink, noise overlay, glass nav.
- Breakpoints: 640 / 700 / 900 / 520 / 480 (non-standard set, check all on change).
- Assets: `favicon.svg` 64px K mark. No webfonts, no icon set.

**Flow:** `<head>` links `style.css` → page-specific classes → test pages add Tailwind CDN script for utilities. Specificity conflicts resolve in favor of later Tailwind utilities on app pages.

## SEO / Infra

**Responsibility:** Discoverability + monetization + domain wiring with zero backend.

- **Heads:** Every content page duplicates full SEO block: title, description, `robots index,follow`, canonical (`https://keygati.com/<page>`), OG tags, `theme-color #A8DADC`, `favicon.svg`, JSON-LD. `timemode.html`/`words.html` add Tailwind CDN script.
- **Crawl:** `robots.txt` (`User-agent: *`, `Allow: /`, sitemap ref), `sitemap.xml` (14 URLs: `/`, timemode, words, about, help, 5 guides + 2 how-it-works, privacy, terms), `googleba43521b33eb7aa1.html` (verification), `CNAME` (`keygati.com`).
- **Ads:** AdSense `ca-pub-9910178999537907` async on all pages except `404.html`. No analytics instrumented.
- **Docs:** `docs/meta/README.md` 54 lines (free typing test, HTML/CSS/JS/Tailwind stack, personal license). `404.html` minified legal-page style.

## Integration Points / Data Flow / Key Risks

**Integration points:**
- `timemode.html` ↔ `script.js` via DOM IDs (duration buttons, passage container, hidden input, results modal). Rename an ID in one without the other breaks the test silently.
- `words.html` ↔ `words.js` via same tight ID coupling (word display, progress, input, score modal).
- `style.css` ↔ all HTML via class names + Tailwind utilities on app pages.
- AdSense ↔ all pages except `404.html` (single publisher ID).
- `sitemap.xml` ↔ `robots.txt` ↔ `CNAME` ↔ canonical URLs (must stay in sync when adding pages).

**Data flow (runtime):** Keystroke → hidden input → engine compare → span class toggle (correct/incorrect/current) → live WPM/accuracy/progress DOM update → end condition → results modal render. No network calls, no persistence, no server round-trip. Refresh wipes all state.

**Key risks:**
1. **No persistence** — no `localStorage`/cookies. Scores, bests, history lost on refresh. Adding persistence touches both engines separately.
2. **AdSense single point** — publisher ID hardcoded in ~14 files. Rotation or removal requires bulk edit.
3. **Tailwind CDN at runtime** — only `timemode.html`/`words.html` depend on `cdn.tailwindcss.com`. Offline or blocked CDN degrades test layout but engines still run.
4. **Weak footer (app pages only)** — minimal internal linking on highest-traffic pages; SEO opportunity + inconsistent chrome vs content pages.
5. **Duplication** — `<head>` SEO block and nav markup copied per file; `script.js`/`words.js` share ~60% logic (render/compare/stats) with no shared module. Fix in one engine does not propagate. Adding a page means copying head + nav + AdSense + sitemap entry manually.
6. **Hardcoded style values** — no CSS vars; palette/breakpoint change is find-replace across 1086 lines plus Tailwind inline config.
