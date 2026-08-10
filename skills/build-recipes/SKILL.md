---
name: build-recipes
description: Build the landing from the approved DESIGN.md and design plan on the fixed stack (Next.js + Tailwind + GSAP + Lenis, optional R3F). Use when craft/elevate invoke it after the design-plan gate, or standalone to rebuild a section. Never use before a design plan is approved.
---

# Build recipes — fixed-stack construction

Stack is FIXED: Next.js (App Router) + Tailwind + GSAP + Lenis. R3F only if the
approved design plan names a 3D signature. gsap-skills (installed separately)
owns API correctness — consult it for GSAP syntax. This skill owns WHICH
pattern goes WHERE and the site-level wiring.

## Order of construction
1. Scaffold: `create-next-app` (TS, Tailwind, App Router, src/). Install
   `gsap lenis`. No other animation libs.
2. Global wiring FIRST (${CLAUDE_PLUGIN_ROOT}/skills/build-recipes/references/lenis-setup.md):
   Lenis on GSAP ticker, `lagSmoothing(0)`, single RAF loop.
   `html { scroll-behavior: auto !important }`.
3. Tokens: read them from **DESIGN.md's YAML frontmatter** (`colors`,
   `typography`, `rounded`, `spacing`, `components`) — that layer is normative,
   the prose sections are context. Motion tokens come from the `## Motion
   identity` extension section (mirrored in `.impeccable/design.json` under
   `extensions.motion`). Frontmatter → Tailwind theme + CSS custom properties
   (`--ease-out-brand`, `--dur-base`...). `gsap.defaults({ease, duration})`.
   Keep the CSS custom-property names equal to the frontmatter token slugs so
   impeccable's detector and live panel resolve them.
3b. **When an approved comp exists, the comp is king and the build runs in two
   phases.** Phase one is REPRODUCTION, statics only: rebuild the first viewport
   at the comp's own width, screenshot it at the comp's dimensions, and set the
   two side by side. Materials, component character, elevation, scale
   relationships and type silhouette must match; the only allowed concessions
   are the closest obtainable font, the icon set, and genuine defects in the
   comp. The comparison is the authority, never your conviction that the
   recreation worked — models systematically believe HTML/CSS recreations
   succeeded when they did not. A region that keeps losing the comparison stops
   being recreated in code and becomes a `produce` asset composited into the
   page. Prove the hero this way BEFORE building past it: every later section
   inherits the hero's shortfall, and a five-minute retry here is what a rebuild
   verdict at verify costs. Where the comp does not cover a section, build it
   inside the fidelity inventory recorded in the design plan (§ Comps) — corner
   language, line weights, materials, type ramp — never from stock defaults.
   Only when reproduction holds does phase two (steps 4-7: motion, interaction,
   responsive) begin. No comp → skip this step and build from the wireframe.
4. Sections in SCRIPT ORDER, one at a time. Per section pick the pattern from
   ${CLAUDE_PLUGIN_ROOT}/skills/build-recipes/references/page-anatomy.md +
   ${CLAUDE_PLUGIN_ROOT}/skills/build-recipes/references/scrolltrigger-patterns.md.
   Consult ${CLAUDE_PLUGIN_ROOT}/skills/build-recipes/references/anti-patterns.md
   BEFORE writing each ScrollTrigger.
5. Asset placeholders: every media slot renders a placeholder at the EXACT
   ratio from the design plan (`aspect-[16/9]` etc.) with the slot name visible
   — layout must never reflow when real assets land.
6. `prefers-reduced-motion` from the START, not retrofit: every ScrollTrigger
   created inside `gsap.matchMedia()` with a reduce context (opacity-only,
   no pin, no scrub, no parallax). Content NEVER gated behind animation —
   no `opacity: 0` initial states in CSS; set from JS.
7. Signature moment LAST, with the most care. Budget: 1–2 pinned sequences per
   page max, runway 1.5–3 viewport-heights per chapter.
   Signature techniques: scroll-video → ${CLAUDE_PLUGIN_ROOT}/skills/build-recipes/references/scroll-video.md;
   3D → ${CLAUDE_PLUGIN_ROOT}/skills/build-recipes/references/r3f.md.

## Hard rules (from verified doctrine)
- Scrub OR toggleActions per trigger, never both. Scrub 0.5–1.5 for
  storytelling; `scrub: true` only for frame-accurate (sequences, progress).
- Pace = runway (`end`), never `duration`, on scrubbed timelines.
- Never a ScrollTrigger on a tween nested in a timeline. Never animate the pin
  target (pin wrapper, animate children). Pinned triggers in document order.
- Horizontal containers + parallax: `ease: "none"` mandatory.
- Function-based start/end + `invalidateOnRefresh: true` for anything
  size-dependent. All triggers inside `gsap.matchMedia()` contexts.
- Continuous/scroll-linked animation: `transform` + `opacity` ONLY.
- Mobile (≤768px) gets a DESIGNED simpler choreography, not degraded desktop.
