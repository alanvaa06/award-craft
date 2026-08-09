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
    (${CLAUDE_PLUGIN_ROOT}/skills/direction/references/awwwards-rubric.md) —
    report N/12 with one line each.

Layout & copy checks (per set — distilled from taste-skill, MIT):
13. Hero budget: headline ≤ 2 lines, subtext ≤ 20 words and ≤ 4 lines, hero
    stack ≤ 4 text elements, primary CTA visible without scrolling (1280 and 375).
14. Eyebrow restraint: uppercase-tracking micro-labels ≤ ceil(sectionCount / 3).
15. Layout variety: ≥ 4 distinct layout families across the page; no layout
    family repeated more than 2 consecutive sections.
16. One accent color used consistently (grep hex usage; accents beyond the
    DESIGN.md accent are a fail).
17. Full-viewport sections use `min-h-[100dvh]` (or 100dvh), never `h-screen`
    (grep for h-screen — zero hits).
18. Copy tells: zero em-dashes in landing copy (headlines, body, buttons,
    quotes); no placeholder names ("Jane Doe", "Acme", "Nexus"); no
    fake-precise specs ("47.2%") without data backing.

Narrative & copy checks (per set — see direction/references/copywriting.md):
19. Hero passes the grunt test (offer / benefit / how to buy readable in ~5s)
    AND the descriptiveness test — or the approved design plan explicitly
    justifies an evocative hero exception.
20. Page copy follows the approved guión's arc: every CONTENT section has a
    narrative job (problem / agitation step / proof / climax / resolution-CTA);
    no content section exists without one. Climax section = signature moment
    section. Structural chrome (preloader, navbar, overlay menu, footer) is
    exempt — it carries brand and utility, not narrative.
21. Micro-copy: buttons preview the post-click result, echo the headline verb
    phrase, and never remind the user of work; body copy is second person
    singular; no header a competitor could equally claim.

Asset direction checks (per set):
22. Each shipped asset executes its approved shot spec: subject, camera angle
    and position, lens, lighting setup, moment, and negative-space zone match
    what the design plan specified. A pretty asset that ignores its spec is a
    fail.
23. Cross-slot coherence: one lighting direction and one grade across every
    image on the page; locked elements (environment, product, prop, person)
    are visually identical wherever they recur. Mixed light directions across
    sections is the most common tell of ad-hoc AI generation.

Cost note (not a numbered check): the verify report states credits spent on
assets versus the ceiling approved with the design plan.

Refine note (not a numbered check): when assets were refined from feedback, the
report states which slots were refined, the feedback classification, and the
cumulative spend across refine rounds.
