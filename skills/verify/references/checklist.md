# Verify checklist — quantitative, not opinable

Code checks (grep/read once per pass):
1. `prefers-reduced-motion` variant exists (`matchMedia` reduce context in
   every animation file) AND renders full content (screenshot pass below).
2. Continuous/scroll-linked animations touch only transform/opacity:
   grep tweens for `width|height|top:|left:|margin|padding|fontSize` — zero hits
   in scrubbed/looping tweens.
3. `containerAnimation` sources and parallax tweens have `ease: "none"`;
   storytelling scrubs are numeric 0.5–1.5 (not `true`).
4. No `markers: true` anywhere. No global `will-change` in CSS.
5. Pinned ScrollTriggers appear in document order in each file (or carry
   `refreshPriority`).
6. Staggers: every stagger over 10+ items uses `{amount}` cap; durations fall
   inside the design plan's bands.
7. Colors in code ⊆ DESIGN.md palette (grep hex values); font families ⊆
   DESIGN.md faces.

Screenshot checks (per set):
8. Signature moment from the design plan exists and animates.
9. Asset slots: rendered ratio matches the slot contract; file weights within
   budget (image <500KB, loop <4MB — check /public/media sizes).
10. Mobile 375px reads as designed choreography (its own layout decisions,
    not overflowed desktop).
11. Text over media meets WCAG AA contrast (spot-check hero + footer CTA).
12. Score the page against the 12-point Awwwards anatomy checklist
    (direction/references/awwwards-rubric.md) — report N/12 with one line each.
