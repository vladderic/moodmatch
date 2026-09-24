# Feature Spec — Mood Match Landing Page

**Feature:** Public-facing landing page with an interactive mood matcher
**Date:** 2026-09-24
**Spec type:** Forward-looking (the plan this feature was built against)
**Constitution:** `build-lab/SPECS/MISSION.md`, `ROADMAP.md`, `TECH.md`
**Founder Notebook:** `build-lab/MISSION.md`

---

## 1. Context

The startup problem (Stage 1 of the roadmap): gamers with large libraries waste
30–60 minutes of free time scrolling for a game that matches their current mood,
then give up and lose the evening to YouTube or doomscrolling. The chosen product
is a **mood-category matcher**: pick what you're in the mood for, get a short list
of games that clear an 80% match bar. Everything is frontend-only, per the
constitution (no backend, no login, no Steam import, no AI, no payments).

Brand personality: **Sleek, Cool, Laid Back** (see `build-lab/MISSION.md` §2).

---

## 2. Decisions already made (do not relitigate)

| Decision | Resolution |
| :--- | :--- |
| Color palette | **Slate & Amber** — graphite `#111418`, amber `#F5A623`, dusty teal `#6FB3B8`, coral accent `#E2708B` |
| Typography | Space Grotesk (headings), Inter (body), JetBrains Mono (scores/verdicts) |
| Core mechanic | 80% match bar, kept strict |
| Dead-end behavior | **Near-miss fallback**: when nothing clears the bar, show the top 3 closest picks |
| Mood categories | **11 total**, max **5 picks** per match |
| Game pool | 60 hand-tagged popular titles; every category covered |
| CTA | Single conversion action: **"Match my mood"** |
| Framing | Greenfield — **no backward compatibility constraints** apply (resolved) |

---

## 3. Functional Requirements

- **FR1 — Page structure.** The page must contain: sticky Navbar, Hero, Problem,
  Solution, Features, Social Proof, CTA/Matcher, and Footer, in that order, using
  semantic HTML5 tags.
- **FR2 — Single CTA.** Every call-to-action on the page is "Match my mood" and
  leads to the matcher (`#matcher`).
- **FR3 — Mood selection.** The matcher exposes 11 mood categories: Relaxing,
  Story-heavy, Quick sessions, Combat, Survival, Cozy, FPS, Co-Op, Singleplayer,
  Multiplayer, Incremental.
- **FR4 — Selection limit.** The user may select at most 5 moods. A live hint
  shows the current count ("Select up to 5. (2 picked)"), and a visible warning
  appears if a 6th selection is attempted (the extra pick is rejected).
- **FR5 — Matching.** On submit with ≥1 mood selected, every game in the built-in
  pool is scored as `round(hits / selectedMoods × 100)`. Games scoring **≥ 80**
  are returned, sorted by score descending, then alphabetically.
- **FR6 — Results.** Results are rendered as cards (game name + mono-font "% match"
  score) under a verdict line ("N games cleared the 80% bar."). Results announce
  themselves (`aria-live`) and scroll into view after submit.
- **FR7 — Near-miss fallback.** If no game clears 80%, the top 3 games with a score
  between 1 and 79 are shown under a "closest picks" verdict.
- **FR8 — Empty and error states.** Submitting with no moods shows "Pick at least
  one mood first." A combo with zero overlap shows the laid-back empty message.
- **FR9 — Reset.** A "Clear all" control (visible only when moods are selected)
  unchecks everything, hides results, and resets the hint.
- **FR10 — Game pool quality.** The pool has exactly 60 games; every game has at
  least one tag; all 11 categories are covered by at least one game.

## 4. Non-Functional Requirements

- **NFR1 — Vanilla only.** No npm packages, no frameworks (React/Vue/etc.), per
  `TECH.md`.
- **NFR2 — Token discipline.** All colors, fonts, spacing, radii, and shadows live
  as CSS custom properties in `:root`. No hardcoded color values outside tokens
  (including alpha variants).
- **NFR3 — Accessibility.** Text contrast ≥ 4.5:1 (WCAG AA); visible focus rings;
  results region `aria-live="polite"`; checkboxes reachable by keyboard;
  `prefers-reduced-motion` disables entrance, hover-lift, and reveal animations.
- **NFR4 — Motion budget.** Maximum 1 hero entrance effect, 1 scroll reveal
  effect, and micro-hover interactions (feature cards lift `-4px`, buttons `-1px`).
- **NFR5 — Responsive.** Works from ~320px up: fluid type (`clamp`), auto-fit
  feature grid, wrapping mood chips and result cards, sticky navbar with a
  `scroll-margin-top` anchor offset.
- **NFR6 — Progressive enhancement.** Content must remain visible without
  JavaScript and without `IntersectionObserver` (reveal classes are only applied
  when the observer exists).
- **NFR7 — Explainable in 20 seconds** and **one CTA** (constitution rules).

## 5. Out of Scope (explicit cuts)

- Steam library import, player accounts, login (needs a backend — forbidden here)
- Taste-learning AI and user-defined categories → held in the roadmap "Long-Term Vision"
- Payment processing, pricing, dashboards
- SQLite persistence (no backend of any kind; a static page)
- Logging, server-side schemas, or regex-based parsing (nothing runs server-side)
- Game roulette mechanic (rejected: 50/50 trust gamble)