# KeyGati Design System

Plain instructional voice. No hype. Short sentences. The design stays quiet so typing stays the focus.

> Source of truth: `assets/css/style.css` `:root` vars. The Tailwind inline configs in `time-mode.html` and `words-test.html` are mirrors and must stay in sync when the palette changes.

## 1. Tokens

### Palette

| Token | Hex | RGB helper | Use |
|---|---|---|---|
| `--dark` | `#264653` | `--dark-rgb: 38, 70, 83` | Body text, headings, footer strong |
| `--teal` | `#2A9D8F` | `--teal-rgb: 42, 157, 143` | Primary buttons, active states, cursor |
| `--teal-dark` | `#1F7A6E` | — | Small text on white (AA fix for teal-on-white) |
| `--teal-ink` | `#175E54` | — | Tiny labels on translucent cards (status line); deepest teal |
| `--bg` | `#A8DADC` | — | Page background |
| `--coral` | `#E76F51` | — | Accent dot, warnings |
| `--orange` | `#F4A261` | — | Accent dot |
| `--light` | `#F1FAEE` | `--light-rgb: 241, 250, 238` | Cards, legal card wash |
| `--yellow` | `#E9C46A` | — | Reserved accent (Tailwind mirror only) |
| `--white` | `#FFFFFF` | `--white-rgb: 255, 255, 255` | Hero, cards, modal |
| `--mint` | `#EDF6EA` | — | Eyebrow pill, secondary hover |

Opacity pattern: `rgba(var(--dark-rgb), 0.85)` instead of hardcoded `rgba(38, 70, 83, …)`. Same for teal, white, light. App-page text utilities (`text-keygati-dark/45–60`) are overridden to 0.85 in CSS; `text-keygati-teal` maps to `--teal-dark`, except the tiny passage status line which uses `--teal-ink`.

### Type

- Body: `Arial, Helvetica, sans-serif` (global `body` rule).
- Landing/legal: `"Inter", sans-serif` override.
- Typing passage: `"Courier New", Courier, monospace`, weight 500, word-spacing 0.35rem (0.2rem under 640px), leading 2.1–2.2, `.typing-word { white-space: nowrap }`.
- Formula: `"JetBrains Mono", monospace` in `.help-formula`.

> Known conflict: `body` sets Arial while `.landing-page, .legal-page` set Inter. Inter is never loaded, so it falls back to system sans. Decide: either self-host Inter and keep the override, or drop it and standardize on the Arial stack.
> TODO: `JetBrains Mono` is referenced but never loaded. Self-host it or drop the reference to avoid a silent fallback.

### Spacing / radius / shadow

- Radius: `--radius-sm: 12px`, `--radius-md: 16px`, `--radius-lg: 18px`, `--radius-xl: 24px`, pills `999px`.
- Space scale: 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40.
- Shadows: `--shadow-sm` (cards), `--shadow-md` (glass nav). Glass nav adds an inset top highlight.
- Top offset under the fixed 64px nav is unified at `112px` for `.landing-main` and `.legal-main`. All anchors get `scroll-margin-top: 90px`.

## 2. Voice

Plain, instructional, short sentences. Explain what a control does and what happens next. No superlatives, no marketing claims. Example: "Choose 15, 30, 60, or 120 seconds. The timer starts on your first keystroke."

## 3. Page anatomy

- **Landing (`index.html`):** fixed glass nav → hero (eyebrow + H1 + intro + Time/Words CTAs, spans full row) → 3 info cards (WPM / Speed / Accuracy) with footer meta → Help & Guides link.
- **Time test (`time-mode.html`):** test-variant header (logo + right switch + info button) → duration pill (15/30/60/120) → 4 stat tiles (Net WPM / Accuracy / Time Left / Character Stats) → passage label tab + passage card + status line → hidden textarea → Restart → shared footer → results modal (WPM hero + Accuracy/Characters split + quote + Restart Test) → floating Help button (sole Help entry; inline Help CTA removed).
- **Words test (`words-test.html`):** test-variant header → 3 stat tiles (WPM / Accuracy / Score) → passage card with Practice label + progress → hidden textarea → Restart → shared footer. No results modal; progress reads `x / 24`. Floating Help button fixed bottom-right (sole Help entry; inline Help CTA removed).
- **Help (`help.html`) + guides + legal:** landing-header → `.legal-card` glass panel → `.legal-header` (label + H1 + updated line) → `.help-section` blocks each with label + H2 + 2-col `.help-grid` of `.help-card` (label + H3 + description + link) → back link.

## 4. Components

- **Glass headers (role-split, same visual language):** `max-width 1177px`, `height 64px`, `rgba(dark, 0.12)` fill, white 0.45 border, `blur(18px) saturate(140%)`, fixed top. Bar order: logo left; on test pages (`time-mode.html`, `words-test.html`) the `.site-mode-switch` (Time/Words) is end-justified via `margin-left: auto`, active link gets `aria-current="page"` with white/shadow/semibold treatment; the compact info button sits very last. On all other pages the info button docks at bar end via its own `margin-left: auto`. Mode links keep `min-width: 78px` so toggling never changes bar width. Pure shared CSS, no Tailwind dependency, so chrome matches even if the CDN is blocked.
- **Compact info button (replaces inline About/Privacy/Terms + old hover slide):** `.site-info` white pill holding a `<details>` disclosure. Collapsed label is bold `i` (14px, contrast-safe dark on white) in a 32px circle; it morphs to a pill revealing About/Privacy/Terms (13px, 12px-min). Opens on hover (gated `@media (hover:hover)`, no mobile traps), on `:focus-within`, or on tap via native details toggle. Tiny inline disclosure script (body-scoped, not engine logic) syncs `aria-expanded` and closes on Escape with focus returned to the button. Prior hover-slide retired here to avoid doubling slide + collapse on the same links.
- **Floating Help button (all 15 pages):** `.site-floater` fixed bottom-right (`right: 20px`, safe-area aware), `z-index: 40` (below modal overlay at 50), 48px teal-dark circle with white `?`. Hover/focus expands the label (`max-width 0 → 160px`, opacity fade) and morphs to a pill reading "Help & Guides". Real `<a href="help.html">` with `aria-label="Help and guides"` and dark focus ring; expands on `:focus-visible` too. White on teal-dark passes contrast.
- **Shared footer:** `.site-footer`, same block on every page (was timemode-only Tailwind footer): centered, 12px, dark at 0.82, top rule, `© 2026 KeyGati. Mazza le type garau.`
- **Mode pill / duration pill:** `rounded-full`, `bg-white/40` track, active item white + shadow + semibold. Duration active uses teal fill + white text.
- **Stat tiles (identical component, both modes):** `rounded-xl bg-white/50 p-4 ring-1 ring-black/5`, label `text-xs font-medium uppercase tracking-wider` (12px, dark at 0.85) above value `mt-2 text-2xl font-semibold tracking-tight`. Grid `mt-6 grid-cols-2 gap-3 sm:grid-cols-4` on both, so collapse matches. Time order: Net WPM / Accuracy / Time Left / Character Stats. Words order: WPM / Accuracy / Score / Set Size (static `24 words`; progress lives above cards, never inside one).
- **Progress/duration rows (mirrored placement):** time mode duration pill row (`mt-0 flex justify-center`) and words mode progress pill row (same wrapper; pill `rounded-full bg-white/30 px-5 py-2 ring-1`, `Practice` label + `#progress-value` `0 / 24`, `role="status"`).
- **Passage container (identical, both modes):** label tab (`rounded-t-md`, `-mb-px`, `Word Set` / `Test Duration`) + `section[aria-label="Typing passage"]` with `rounded-md border bg-white/50 p-6 min-h-[150px] sm:p-8`. Text `typing-text text-lg leading-[2.1] tracking-wide sm:text-xl` both. Hidden textarea technique identical; `:focus-within` ring keys off the shared `aria-label`, not container classes. Restart row `mt-6` + `text-sm` button both. Switching modes changes content only — zero structural jump.
- **Buttons:** primary teal → `--teal-dark` hover, white text; secondary white + dark border → mint hover; ghost pill `.help-guides-button` translucent light → teal wash hover. Press: `translateY(1px)`.
- **Results modal:** fixed overlay `dark/70 + blur-sm`, inner `max-w-md rounded-xl bg` with header rule, WPM `clamp(48px, 12vw, 60px)`, Accuracy/Characters `divide-x` split, full-width Restart.
- **Help-card / legal-card:** translucent light fills, white borders, layered soft shadows, `blur(10–14px)`. Help-card lifts `-3px` on hover.
- **Ad slot:** `.ad-slot, ins.adsbygoogle { min-height: 90px }` (60px under 700px) plus `.ad-slot-reserve { min-height: 100px; min-width: 300px }` matching the inline reserve used on index/timemode/words. Content top offset is unified at 112px (168px under 700px when the header wraps) across `.landing-main`, `.legal-main`, and `.app-shell`, so no per-route chrome height differences.

## 5. Motion

- Hover: cards/buttons `0.2s ease` background + shadow; help-card `translateY(-3px)`; guides button `-1px`; info links fade/slide in via `max-width` + opacity (instant under reduced motion).
- Cursor: `.typing-cursor::after` 0.65em × 2–3px teal bar, `cursor-blink 1s steps(1) infinite`.
- `prefers-reduced-motion: reduce` disables the blink, kills hover lift, disables the header slide and floater text transition, forces `scroll-behavior: auto`, and collapses all transitions to `0.01ms`.

## 6. Breakpoints

| Width | Behavior |
|---|---|
| 900px | Bento 3-col → 2-col (new intermediate step); hero still full-row; header pills shrink to 12px |
| 700px | Shared header wraps to two rows (`height: auto`, radius 26px), offsets deepen to 168px; hero stacks; hero actions full-width column; help-grid 1-col; legal-card `28px 22px`; ad slot 60px |
| 640px | Typing text 1rem / line-height 2 / word-spacing 0.2rem; both stat grids collapse identically (shared Tailwind grid) |
| 520px | Base hide rule deleted — links shrink, never hide (was hiding Terms via dead selector) |
| 480px | Logo 18px; info links 12px min (was 11px) |

Type clamps: hero H1 `clamp(30px, 4vw, 36px)`; modal WPM `clamp(48px, 12vw, 60px)`.

## 7. Accessibility

- **Focus:** `button/a :focus-visible` keeps `2px solid teal, offset 3px`, extended to `.help-card`, `[role="button"]`, `.site-mode-switch a` (teal-dark, offset 2px) and `.site-floater` (dark ring, offset 3px, expands label on focus). The hidden textarea keeps `outline: none` (engine requirement) but `main:focus-within` now rings the passage card, so sighted keyboard users always see focus.
- **Contrast (Phase 2 spot-checks, page bg `#A8DADC` unless noted):** dark/45 2.15 → 4.71, dark/50 2.28 → 4.71, dark/55 2.70 → 4.71, dark/60 3.06 → 4.71 (all now 0.85). Teal `#2A9D8F` on white 3.32 → `--teal-dark` 5.16 for normal-size teal text; tiny passage status on translucent card uses `--teal-ink` (white 7.59, card ~6.1, bg 4.96). Large text (24px values) needs 3:1 and passes throughout. Minimum label size 12px, including `text-[10px]` and `text-xs` utilities via override.
- **Keyboard map:** Tab moves logo → mode switch on test pages (Time/Words, `aria-current` announced) → info `i` button (opens on focus, `aria-expanded` announced, links tabbed through, Escape closes and refocuses) → duration buttons (`aria-pressed`) → passage (focus ring shows) → Restart → footer → floating Help button → modal Restart on completion. Modal has `role="dialog"` + `aria-modal`; focus trap, Escape close, and return-focus still need a JS lane.
- **Touch targets:** pills and restart are ~36px; raise to 44px min when markup allows (kept existing padding to preserve look).
- **Motion:** reduced-motion fully honored (see §5).

## 8. Fixes backlog (remaining risks)

1. JS lane still needed: modal focus trap, Escape close, return-focus; duplicate link text context ("Start test" × 2, "Read guide" × 5).
2. Retired overrides removed (old words 3-col collapse, `rounded-2xl` focus hook); if stat markup changes, keep both grids' class strings identical.
3. `text-[10px]` / `text-xs` / `text-keygati-*` overrides use `!important` to beat Tailwind CDN utilities; remove them once markup uses final tokens.
4. Ad slot reserve exists on index/time-mode/words-test only; help/guides/legal gain CLS cover when they adopt `.ad-slot-reserve`.
5. Font decisions open: Inter vs Arial conflict, JetBrains Mono TODO (see §1).
6. No file renames done in this lane (per scope); asset paths (`assets/css/`, `assets/js/`) owned by structure lane.
