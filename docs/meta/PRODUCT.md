# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: self-practice individuals opening KeyGati to check WPM/accuracy and practice solo at own pace. Includes touch-typing learners, workers with frequent keyboard use, and curious visitors. Confirmed via interview 2026-10-07.

## Product Purpose

Free online typing speed test to measure and improve typing speed, accuracy, and consistency. Success means visitor starts test in one click, sees clear WPM/accuracy/character stats, and repeats practice without account friction.

## Positioning

Simple distraction-free free no-login typing test. Open page and type; no account, no setup, focus stays on keyboard and performance. Neighbors with accounts, lessons, or heavy gamification cannot copy this one-click simplicity on a fast static site.

## Operating Context

Flow: landing (`index.html`) → Time (`timemode.html`) or Words (`words.html`) test → in-page results modal → restart or switch mode via pill → `help.html` guides for interpretation. Browser-only, desktop and mobile, no backend. Ritual is short repeat practice sessions. Contact: hello@keygati.com, feedback@keygati.com.

## Capabilities and Constraints

Confirmed functionality: Time Mode 15/30/60/120s passages (`script.js`); Words Mode fixed 24-word sets from ~323-word bank (`words.js`); live WPM `round((correct/5)/minutes)` and accuracy `round(correct/total*100)`; Words composite score `round((wpm/150)*1000 + (accuracy/100)*500)`; 7 SEO guides + help index + about/privacy/terms/404.
Constraints: static GitHub Pages site at keygati.com (`CNAME`); no persistence — refresh wipes state, no localStorage/accounts/history; AdSense `ca-pub-9910178999537907` on all pages except `404.html`; Tailwind CDN only on test pages; duplicated head/nav per file and duplicated engine logic (~60% shared, no shared module); sitemap 14 URLs must stay in sync; personal and educational use license.

## Brand Commitments

Name KeyGati, logo `Key`+`Gati` linking to `index.html`, tagline direction "Simple typing. Better practice." / "Test. Type. Improve". Voice: plain, instructional, no hype. Assets on hand: `favicon.svg` K mark, `about.html` brand story. No invented claims.

## Evidence on Hand

Real: live at https://keygati.com/; engines `script.js` (1079 lines), `words.js` (994 lines); stylesheet `style.css`; guide pages `wpm-guide, good-typing-speed, improve-typing-speed, improve-typing-accuracy, touch-typing-beginners, how-time-mode-works, how-words-test-works`. Absent — do not fabricate: testimonials, customers, benchmarks, pricing, analytics, history/best-score data.

## Product Principles

1. Start typing instantly — one click, no login.
2. Clarity over volume — WPM, accuracy, characters only.
3. Reward accuracy with speed, never speed alone.
4. Keep it light and static — fast pages, no backend.
5. Teach alongside test — guides explain every metric.
