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
2. Global wiring FIRST (references/lenis-setup.md): Lenis on GSAP ticker,
   `lagSmoothing(0)`, single RAF loop. `html { scroll-behavior: auto !important }`.
3. Tokens: DESIGN.md palette/type/spacing → Tailwind theme + CSS custom
   properties (`--ease-out-brand`, `--dur-base`...). `gsap.defaults({ease, duration})`.
4. Sections in SCRIPT ORDER, one at a time. Per section pick the pattern from
   references/page-anatomy.md + references/scrolltrigger-patterns.md. Consult
   references/anti-patterns.md BEFORE writing each ScrollTrigger.
5. Asset placeholders: every media slot renders a placeholder at the EXACT
   ratio from the design plan (`aspect-[16/9]` etc.) with the slot name visible
   — layout must never reflow when real assets land.
6. `prefers-reduced-motion` from the START, not retrofit: every ScrollTrigger
   created inside `gsap.matchMedia()` with a reduce context (opacity-only,
   no pin, no scrub, no parallax). Content NEVER gated behind animation —
   no `opacity: 0` initial states in CSS; set from JS.
7. Signature moment LAST, with the most care. Budget: 1–2 pinned sequences per
   page max, runway 1.5–3 viewport-heights per chapter.

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
