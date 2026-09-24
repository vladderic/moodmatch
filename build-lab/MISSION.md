# Founder Notebook

Welcome to your Founder Notebook. This is the single source of truth for your startup project. As founder and lead decision-maker, use this file to define your concept, guide OpenCode, and track every important decision.

---

## 1. Vision & Problem Discovery

*The foundation: Knowledge → Problem → Solution → Value → Product*

Please treat the Founder Decision below as the anchor for everything else in this notebook.

### Founder Decision (Stage 1)

> **Date:** 2026-09-24
> **Decision:** Bet on a **mood-category matcher** — the player picks what they're in the mood for, and a short list of games from a small built-in collection comes back, showing only games that clear an **80% match bar**. The roulette idea was rejected: it's a 50/50 gamble and "scary" if it picks something inappropriate.

| Filter | Verdict | Notes |
| :--- | :--- | :--- |
| **User** | Pass (provisional) | Real and specific: you, a gamer with a 235-title Steam library. The wider audience (gamers with big backlogs) is plausible but not yet confirmed. Must interview 3–5 other gamers before Stage 2. |
| **Problem** | Pass | Real and frequent: 30–60 min scrolling your library, no game matches the mood you're in, you give up, and the free time is fully lost to YouTube / doomscrolling. |
| **Value** | Pass | "Mood categories → 80%+ match" is different from Steam tags and 'games like X' sites, which only match on single attributes. |
| **Feasibility** | Pass (start minimal) | A few mood categories scored against a small, hand-picked list of games is very buildable with the current frontend-only stack — two people, one evening, no backend. |
| **Clarity** | Pass | 20-second version: "Tell us the mood you're in — we show you only games that clear the 80% bar." |

**Founder's rationale (in your words):**
> "Around 6 different games of mine have a small part of what I want. None has the whole thing. I burn 30–60 minutes finding that out and then just walk away."

**Simplification (what we cut and why):**
- **Cut: player's own Steam library** — importing it needs accounts, login, and a backend, which this project forbids. The games come from a small, hand-picked list baked into the page instead.
- **Cut: taste-learning AI** — too ambitious; a backend and months of data for no proven payoff.
- **Cut: game roulette** — honest reflection was a 50/50 gamble; a product can't run on a coin-flip trust.
- **Kept: the 80% match verdict** — it's the clear, memorable mechanism and the founder chose to keep it. At launch the founder added a **near-miss fallback**: when nothing clears the bar, the 3 closest games are shown as "closest picks" instead of a dead end.

**Known risk / open question:** Is this just my problem, or do other big-library gamers share it?
Next step: interview 3–5 gamers (ideally ones with 100+ game libraries) and report back before refining the product.

---

- **Domain / Industry:** Video games / gaming free time; choice paralysis and game discovery
- **Target Audience (Who is this for?):** Gamers with large libraries or backlogs (100+ games) who can name the mood they want but can't find a match inside their own collection. *(Provisional — confirm with interviews.)*
- **The Core Problem (What pain point are you solving?):** Spending 30–60 minutes of limited free time scrolling a game library and giving up because no single game seems to match the mood you're in — losing the free time entirely to YouTube / doomscrolling.
- **Proposed Solution:** A "mood category" matcher. The user picks up to 5 of 11 mood categories (Relaxing, Story-heavy, Quick sessions, Combat, Survival, Cozy, FPS, Co-Op, Singleplayer, Multiplayer, Incremental), and the page scores a hand-picked built-in pool of 60 games, showing only those that clear an 80% match bar — or, when nothing clears it, the 3 closest picks.
- **Value Proposition (Why choose this over existing alternatives?):** Steam tags, "games like X" sites, and review threads match on one attribute at a time; nothing scores your mood against a set of games with a clear "this clears the 80% bar" verdict — instantly, with no setup. 

---

## 2. Brand Identity & Design System

*Define the visual and emotional tone before generating code or copy.*

- **Company / Product Name:** *(TBD — decided in Stage 4)*
- **Tagline:** *(TBD)*
- **Brand Personality / Tone of Voice (e.g., Playful, Minimalist, Bold, Professional):** **Sleek, Cool, Laid Back.** Every design decision below traces back to these three words.
- **Color Palette:**
  - Primary: `#F5A623` (warm amber)
  - Secondary: `#6FB3B8` (dusty teal)
  - Accent: `#E2708B` (soft coral)
  - Background: `#111418` (graphite)
  - Surface / Card: `#1A1F26`
  - Text (Primary / Muted): `#E9ECEF` / `#9AA3AF`
- **Typography:**
  - Heading Font: `Space Grotesk` (geometric, sleek, premium)
  - Body Font: `Inter` (quiet and readable, laid back)
  - Mono Font: `JetBrains Mono` (used for numbers and match verdicts, e.g. "80%") — the cool data touch

### UI Rules

- **Buttons (only two styles, one CTA per page):**
  - *Primary:* background `#F5A623`, text `#111418`, weight 600, padding 12px 24px, radius 10px. Hover: lighter amber `#FFB84D` + lifts 1px. Active: pressed down. Focus ring: 2px `#E2708B`.
  - *Secondary (ghost):* transparent background, 1px border `rgba(255,255,255,0.25)`, text `#E9ECEF`, same padding/radius. Hover: border warms toward amber.
- **Border Radius rules (rounded, not bubbly):**
  - Buttons: `10px` · Inputs / small elements: `8px` · Cards / panels: `12px` · Large hero sections: `16px` · Badges / pills: `999px` (fully rounded)
- **Spacing scale:** `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64` (px)
- **Shadows:**
  - Card: `0 1px 3px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.25)`
  - CTA glow: `0 8px 30px rgba(245,166,35,0.25)`
  - Lift (cards on hover): `0 12px 32px rgba(0,0,0,0.45)`
  - Restrained — sleek means shadows whisper, they don't shout.
- **Microinteractions (motion budget):** feature cards hover-lift `translateY(-4px)` with the Lift shadow (0.2s ease); primary buttons lift `-1px`; mood chips border-warmer on hover. Hero entrance + one scroll reveal make up the rest of the budget. All alpha colors live as tokens (`--color-background-soft`, `--color-primary-soft`, `--color-primary-glow`, `--color-secondary-soft`). 

---

## 3. Page Architecture

*Outline the narrative flow and layout of the public-facing website.*

- **Primary Goal / Conversion Action:** Getting the visitor into the mood matcher — the single CTA button **"Match my mood"** on every section funnel leads to it. No accounts, no signup.

- **Page Sections:**
  1. **Hero** — "Stop scrolling. Start playing." / "Tell us the mood you're in. We only show you games that clear the 80% bar." / CTA: Match my mood
  2. **Problem** — "Your library is full. You still play nothing." / 30–60 min scrolling with no pickup in sight; six games each have a piece of what you want, none has the whole thing; then YouTube and doomscroll win. Closing bridge line: "This is where that ends."
  3. **Solution** — "The 80% bar." / Pick a few mood categories; only matches at 80%+ come back. One screen, a short list, no tag walls, no Steam login.
  4. **Features** — "Everything you want. Nothing you don't." / Three cards: "Mood categories" (feeling *or* category), "A plain verdict" (plain-language 80% readout), "A short list" (no tag walls, no Steam login).
  5. **Social Proof** — "Built for the backlog." / Founder quote: "I stopped losing evenings to my library screen." Honest line: "Founded by a gamer with a 235-game library. The doomscroll ends here."
  6. **CTA / Matcher** — "Next time you're stuck — don't scroll." / "No accounts. No login. Just your mood and a short list." / Button: Match my mood / The mood matcher lives here: 11 mood chips, "Select up to 5" hint + guard, "Clear all" reset, 60-game built-in pool, 80% match verdict, near-miss "closest picks" fallback, results scroll into view.
  7. **Navbar + Footer** — minimal: logo/name, one CTA button in the nav, simple footer with no secondary CTAs. 

---

## 4. Decision Log

*Follow the cycle: Think → Ask → Evaluate → Decide → Build*

| Date | Topic / Area | Options Considered | Final Decision & Rationale | Status |
| :--- | :--- | :--- | :--- | :--- |
| 2026-09-24 | Startup problem (Stage 1) | AI idea / making own game / generic 'what should I play' tool / mood-match-your-own-library | Bet on **mood-match-your-own-library** (the "80% checklist"). Real, frequent, sharp pain with a clear product mechanism. Audience confirmation with other gamers is the open risk. | Done |
| 2026-09-24 | Simplify the concept (Stage 1) | Game roulette vs. mood categories; keep vs. cut 80% scoring | **Mood categories** (roulette rejected — 50/50 gamble, erodes trust). Keep the **80% match**. Cut player's own library, Steam import, accounts, and taste-learning AI; games come from a small built-in list. | Done |
| 2026-09-24 | Brand personality & palette (Stage 3) | 3 palettes: Midnight Arcade / Slate & Amber / Fog & Ink | **Slate & Amber** — graphite base, warm amber primary, dusty teal + coral. Best fit for Sleek + Cool + Laid Back. | Done |
| 2026-09-24 | Page architecture (Stage 4) | 8-section roadmap template vs. a 6-lane hero→CTA story | **6 lanes + navbar/footer**, all funneling to the single CTA "Match my mood". Headlines lock in Sleek/Cool/Laid Back voice. | Done |
| 2026-09-24 | Mood categories (build) | 4 moods vs. expanded set | **Expanded to 11 categories** (added Survival, Cozy, FPS, Co-Op, Singleplayer, Multiplayer, Incremental), capped at **5 picks per match** with a live hint + guard. | Done |
| 2026-09-24 | Feature card content | 'Night-friendly' vs. product-meaning cards | Swapped third card to **"A short list"**; first card now says "name the feeling or the category". | Done |
| 2026-09-24 | Motion (course assignment) | None vs. hover + entrance polish | Added **feature-card hover lift (-4px)** and **hero CTA fade-in cascade** (0.3s). Vanilla only; reduced-motion respected. | Done |
| 2026-09-24 | Launch audit responses | Strict dead-ends vs. helpful fallbacks | Keep strict 80%; **near-miss fallback** shows the top 3 closest picks when nothing clears. Also: results scroll into view, IntersectionObserver feature guard, all colors tokenized, 25-check test suite committed (`test.js`). | Done |
| *YYYY-MM-DD* | *e.g., Primary CTA* | *Waitlist vs Direct Purchase* | *Waitlist — lower friction for initial validation* | *Done* |
| | | | | |
| | | | | |

---

## 5. Notes & Prompts for OpenCode

*Use this section to draft prompt briefs, review feedback, and keep track of pending tasks.*

**Future Vision (revisit later — intentionally out of MVP scope):**
- Live Steam-library sync each time a user visits, so matches stay current with new purchases
- A small AI agent that searches titles in the background and tags each one into mood categories
- User-defined custom categories to steer how the AI sorts their games

- [x] Define core problem statement and audience
- [x] Select color palette and typography
- [x] Define UI rules (buttons, border radius, spacing, shadows)
- [x] Draft page architecture and section copy
- [x] Build responsive hero and navigation components
- [x] Implement feature showcase sections
- [x] Add interactive elements and conversion forms (mood matcher, 5-pick guard, Clear all, near-miss fallback)
- [x] Final visual polish (audit + polish round complete)
- [ ] 1-minute human test with a peer (Stage 6) — still pending
- [ ] Commit, push, and deploy (Stage 6)
