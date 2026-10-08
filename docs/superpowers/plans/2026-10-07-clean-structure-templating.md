# Cleanup Structure Templating Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure flat KeyGati static site into clean folders with shared templating, zero duplication, commented code, polished UI.

**Architecture:** Keep GitHub Pages static, no build step. Introduce `assets/` + `partials/` loaded via JS includes, shared `engine.js` core, page-specific thin wrappers. Preserve SEO, AdSense, CNAME at root.

**Tech Stack:** Vanilla HTML/CSS/JS, Tailwind CDN (app pages only), GitHub Pages.

**Spec:** `PRODUCT.md`, `codemap.md`, `README.md`

## Global Constraints
- Preserve `index.html`, `CNAME`, `robots.txt`, `sitemap.xml` at root for Pages/domain/crawl.
- Preserve AdSense `ca-pub-9910178999537907` on all pages except `404.html`.
- Preserve WPM `round((correct/5)/minutes)`, accuracy `round(correct/total*100)`, Words score `round((wpm/150)*1000+(accuracy/100)*500)`.
- No backend, no persistence beyond optional localStorage bests, refresh-safe.
- Canonical URLs `https://keygati.com/<page>` must stay in sync with sitemap 14 URLs.

## Review Focus
- Broken relative paths after folder move (CSS/JS/partials fail to load) — expect all assets resolve from any page depth.
- SEO drop from head templating (missing title/canonical/OG/JSON-LD) — expect identical rendered head as before.
- AdSense missing after dedupe — expect same publisher ID on same pages.
- ID coupling break `timemode.html<->script.js`, `words.html<->words.js` — expect tests start, timer/progress/results work.
- Mobile layout regression after CSS vars/breakpoint cleanup — expect 640/700/900/520/480 behavior preserved or improved.

---

### Task 1: Duplication audit

**Files:**
- Modify: none (read-only audit)
- Test: manual `grep` counts

**Interfaces:**
- Consumes: `*.html`, `script.js`, `words.js`, `style.css`
- Produces: duplication map (head blocks, nav, footer, AdSense, engine overlap lines)

- [ ] **Step 1:** Count duplicated head/nav/footer/AdSense blocks across 14 HTML via grep.
- [ ] **Step 2:** Diff `script.js` vs `words.js` shared render/compare/stats (~60%).
- [ ] **Step 3:** Output table file:line ranges for extraction.

### Task 2: Architecture strategy

**Files:**
- Create: `docs/superpowers/plans/2026-10-07-clean-structure-templating.md` (this file)
- Modify: none

**Interfaces:**
- Consumes: Task 1 map, Pages constraints
- Produces: target tree (`assets/css/`, `assets/js/`, `partials/`, `pages/` vs flat), templating choice (JS partial loader, no Jekyll), migration order

- [ ] **Step 1:** Choose folder tree preserving root `index.html`, `CNAME`.
- [ ] **Step 2:** Choose partials mechanism (fetch `header.html`/`footer.html`/`head.html` + fallback).
- [ ] **Step 3:** Define shared `typing-core.js` interface (`createEngine`, `calcWPM`, `calcAccuracy`).
- [ ] **Step 4:** Commit plan.

### Task 3: Templates + pages migration

**Files:**
- Create: `partials/head.html`, `partials/header.html`, `partials/footer.html`, `assets/js/include.js`
- Modify: `index.html`, `timemode.html`, `words.html`, `help.html`, guides, legal pages (swap duplicated blocks for includes + comments)

**Interfaces:**
- Consumes: Task 2 tree
- Produces: All pages render identical head/nav/footer via includes

- [ ] **Step 1: Write failing check** — script asserts no duplicated `<head>` SEO block across pages.
- [ ] **Step 2: Implement `include.js` + partials.**
- [ ] **Step 3: Migrate pages, add section comments (`<!-- Header / Main / Footer -->`).**
- [ ] **Step 4: Verify** `python3 -m http.server`, click landing->time->words->help, view-source head identical.
- [ ] **Step 5: Commit** `refactor: shared templates, dedupe heads`.

### Task 4: JS dedupe + commenting

**Files:**
- Create: `assets/js/typing-core.js`
- Modify: `assets/js/time-engine.js` (from `script.js`), `assets/js/words-engine.js` (from `words.js`)

**Interfaces:**
- Consumes: Task 2 interface
- Produces: `createEngine(opts)`, `calcWPM(correct,minutes)`, `calcAccuracy(correct,total)` shared; thin mode wrappers.

- [ ] **Step 1: Extract shared funcs** `render`, `processCharacter`, `updateWPM`, `updateAccuracy`, `showResults`.
- [ ] **Step 2: Add JSDoc comments for state, params, flow.**
- [ ] **Step 3: Verify** time 15/30/60/120 ends modal, words 24/set progress+score, mobile input works.
- [ ] **Step 4: Commit** `refactor: shared typing core`.

### Task 5: CSS system + UI polish (designer-owned)

**Files:**
- Modify: `assets/css/style.css` (from `style.css`)
- Create: `DESIGN.md`

**Interfaces:**
- Consumes: `PRODUCT.md`, Task 2 tree
- Produces: CSS vars palette, standard breakpoints, bento + test polish, a11y focus states

- [ ] **Step 1: Record system** in `DESIGN.md` (palette `#264653` `#2A9D8F` `#A8DADC` `#E76F51` `#F4A261` `#F1FAEE`, type, spacing).
- [ ] **Step 2: Introduce `:root` vars, keep Tailwind inline config in sync.**
- [ ] **Step 3: Polish** header/mode pill/hero/cards/modal, preserve plain instructional voice.
- [ ] **Step 4: Verify** 640/700/900/520/480 + keyboard-only + no webfonts.
- [ ] **Step 5: Commit** `style: design system + polish`.
