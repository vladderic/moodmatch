# Plan — Mood Match Landing Page

Numbered task groups in the order this feature is built. This is a Red/Green TDD
repo: logic work starts with tests that fail, then code is written until they pass.
Every group ends with the listed checks before moving on. Work happens in
`build-lab/` only.

---

## Group 1 — Foundation

Tasks:
1. Confirm constitution (`SPECS/MISSION.md`, `TECH.md`, `ROADMAP.md`, `README.md`).
2. Write the Founder Decision into `build-lab/MISSION.md` (problem, audience, 5-point filter).
3. Lock brand identity + design system in `build-lab/MISSION.md` §2 (palette, type, UI rules).
4. Draft the page architecture + section copy in `build-lab/MISSION.md` §3.

Checks:
- `build-lab/MISSION.md` contains a completed Founder Decision, design system, and page architecture.

---

## Group 2 — HTML structure

Tasks:
1. Create `build-lab/index.html` with semantic sections: Navbar → Hero → Problem →
   Solution → Features → Social Proof → CTA/Matcher (`#matcher`) → Footer.
2. Approve/refine copy one section at a time with the founder (headlines in brand voice).
3. Wire the single CTA ("Match my mood") in navbar, hero, and submit button — all to `#matcher`.
4. Build the matcher form: 11 mood chips (checkbox + label), hint line, hidden limit
   message, results region (`aria-live="polite"`).

Checks:
- Served page parses with zero unclosed/mismatched tags (HTMLParser check).
- One `h1`, ordered `h2` → `h3` hierarchy; all matcher IDs present.

---

## Group 3 — CSS design system

Tasks:
1. Define all design tokens in `style.css` `:root` (colors incl. alpha variants,
   fonts, spacing scale, radii, shadows).
2. Style components from tokens only — buttons (primary/ghost), navbar, hero,
   sections, feature cards, mood chips, result cards, footer.
3. Apply the motion budget in CSS: hero entrance keyframes (`@keyframes hero-in`,
   `fade-in` cascade for the CTA), feature-card hover lift `translateY(-4px)`,
   button lift `-1px`, chip hover.
4. Add `prefers-reduced-motion` overrides and `scroll-margin-top` for anchors.

Checks:
- Brace counts balanced; zero `var(--x)` references without definitions; no rgba
  color outside tokens; contrast ≥ 4.5:1 on all text pairs.

---

## Group 4 — Matcher logic (Red → Green)

Tasks:
1. Write `build-lab/test.js` first: test expectations for `matchGames`,
   `closestGames`, constants (`MATCH_BAR = 80`, `MAX_PICKS = 5`), 60-game pool,
   and category coverage. Run it — tests fail (red).
2. Add the 60-game tagged pool (`GAMES`) and scoring internals to `script.js`:
   `scoreGames`, `matchGames` (≥ 80), `closestGames` (top 3 near-misses, 1–79).
3. Run `node test.js` — tests pass (green).
4. Wire DOM behaviour: read checked moods on submit, 5-pick guard with hint +
   limit message, "Clear all" reset, verdict rendering + near-miss fallback,
   results `scrollIntoView`, empty-state messages.

Checks:
- `node --check script.js` (syntax) and `node test.js` (25 checks, exit 0).

---

## Group 5 — Scroll effect (progressive enhancement)

Tasks:
1. Add the single scroll reveal: apply `.reveal` (hidden start) **only when**
   `"IntersectionObserver" in window`; observe targets (`h2`, pain list, bridge,
   feature grid, blockquote) at threshold 0.15.

Checks:
- Content invisible-content impossible: with IO absent, no `.reveal` class is applied.

---

## Group 6 — Quality gates

Tasks:
1. Run the 5-Point Quality Audit (Structure, Functionality, Visual, Accessibility,
   Performance/Cleanliness); fix Critical + Important items.
2. Fix Important findings: near-miss fallback, IO feature guard, results
   scroll-into-view, token discipline for alpha colors.
3. Fix polish items: honest social-proof copy, OG tags + favicon, Clear all,
   reveal threshold, `-webkit-backdrop-filter`, committed test file, universal
   problem headline.

Checks:
- `node test.js` green; all three assets serve 200; HTML structural parse clean.

---

## Group 7 — Launch prep

Tasks:
1. Run the 1-Minute Human Test with a peer (protocol in `validation.md`); triage
   the 3 most critical feedback items.
2. Commit and push the feature branch; deploy (GitHub Pages / Vercel / Netlify).
3. Submit: startup name, value prop, GitHub URL, public URL.

Checks:
- Public URL responds with HTTP 200 (`curl`), and the human test produced ≤ 3 triaged fixes.