# Validation — Mood Match Landing Page

How we know this feature succeeded and can be merged/shipped. Run the automated
groups first; then the manual checks; then the human test. Any differences
between the implementation and these specs are surfaced to the founder and the
specs are updated only after the founder's approval.

---

## 1. Automated Gates

```bash
# from build-lab/
node --check script.js        # JS syntax
node test.js                  # 25 logic checks — must exit 0
```

`test.js` asserts:
- 7 common mood combos each return ≥ 2 matches, all scores ≥ 80
- Results are sorted by score descending
- A dead-end combo (`combat + cozy`) clears nothing but returns up to 3 near-misses, all between 1 and 79
- `MATCH_BAR === 80`, `MAX_PICKS === 5`
- Pool has 60 games; every game has ≥ 1 tag; all 11 categories are covered

**Static checks:**
- HTML: parse with zero unclosed/mismatched tags; one `h1`; ordered headings; matcher IDs present
- CSS: balanced braces; every `var(--x)` used is defined in `:root`; no rgba color outside tokens
- Contrast (WCAG AA): all text pairs ≥ 4.5:1 (worst measured: coral on graphite 6.09:1)
- Serving: `index.html`, `style.css`, `script.js` all return HTTP 200

---

## 2. Manual Interaction Checks

1. Select 1–5 moods → "Match my mood" → results render, score in mono font, sorted highest first, and the page scrolls them into view.
2. Attempt a 6th mood → it snaps back, the coral "You can only pick up to 5." warning shows, and the hint has live count.
3. Select a combo that clears nothing (e.g. Combat + Cozy) → "closest picks" near-misses appear instead of a dead end.
4. "Clear all" (visible once anything is picked) → moods cleared, results removed, hint resets.
5. Submit with zero moods → "Pick at least one mood first."
6. Keyboard: Tab through mood chips (focus ring visible, Space toggles), button focus ring visible.
7. Resize from ~320px to desktop: chips wrap, feature grid collapses to 1 column, result cards wrap, no horizontal scroll.
8. Test with JS disabled: all content still visible. Test with reduced-motion OS setting: no entrance/reveal/hover animations.

---

## 3. Design-System Compliance

- Every component uses `var(--…)` tokens; alpha colors only via `--color-*-soft`/`-glow` tokens
- Single CTA per page ("Match my mood"); 20-second explainability holds
- Motion budget: exactly 1 hero entrance + 1 scroll reveal + micro-hovers (card `-4px`, button `-1px`, chip border)

---

## 4. 1-Minute Human Test (Stage 6)

1. Hand a peer the live URL with no explanation.
2. Watch silently for 60 seconds; note where they look/hover/click first and where they hesitate.
3. Ask: "In one sentence, what does this site do?", "Would you use it tonight?", "What was confusing or missing?"
4. Capture 3 pieces of feedback; fix the 3 most critical; re-test.

---

## 5. Launch Gate

- Public URL responds HTTP 200 from a browser outside the Codio IDE
- Founder Decision, decision log, and this spec set all reflect the shipped state
- If validation surfaces any difference from `requirements.md` / `plan.md`,
  update the spec files **only with the founder's approval**, and note it in the
  Founder Notebook's decision log