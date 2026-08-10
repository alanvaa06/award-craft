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

Comp fidelity checks (only when a comp was approved — otherwise mark N/A and say
so in the report; never silently drop them):
24. Side-by-side per section: the comp region and the built region viewed
    together, each as its own crop at legible scale. One full-page thumbnail
    comparison does not count — it hides exactly the failures that matter
    (crude controls, wrong lettering character, flattened material) behind a
    similar-looking section order. Quantities are judged as quantities: a field
    at a tenth of the comp's density, or type at half its weight, is a
    different design, not a near miss.
25. Every region the fidelity inventory marked `produce` ships as a real
    raster; nothing was silently downgraded to a CSS gradient, a flat fill or
    an omission. A `semantic` region that shipped as a raster fails too — it
    flattens something that should scale, move or respond.

Interop checks (per pass, code-level — not per screenshot):
26. impeccable's detector runs clean on the changed targets:
    `node <impeccable-base>/scripts/detect.mjs --json <targets>` reports no
    unresolved finding. Its findings are the list — do not re-derive them by
    eye, and do not run a second detector pass after fixing more than once.
27. Craft-floor discipline: every device on impeccable's refuse list that the
    build actually uses (grain/`feTurbulence`, viewport-scale display type
    above 6rem, mono labels, section indices 01/02/03, glass/`backdrop-filter`,
    generated CSS textures) appears in DESIGN.md's `## Craft-floor overrides`
    with its reason. Used but unnamed = fail. Eyebrow/kicker above a heading,
    gradient text and nested cards are not overridable — they fail outright.

Cost note (not a numbered check): the verify report states credits spent on
assets versus the ceiling approved with the design plan.

Format note (not a numbered check): DESIGN.md still parses as the shared spec
after the run — YAML token frontmatter present, the eight canonical sections in
order, award-craft data confined to the extension sections. A DESIGN.md the
next `$impeccable doctor` reports as drift is an unfinished handoff.

Refine note (not a numbered check): when assets were refined from feedback, the
report states which slots were refined, the feedback classification, and the
cumulative spend across refine rounds.
