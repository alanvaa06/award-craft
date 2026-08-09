---
name: direction
description: Produce the Pass-1 design plan for an Awwwards-level landing — tokens, motion identity, art direction, ASCII wireframe per script section, ONE signature moment, and explicit drift vs brand source. Use when craft/elevate invoke it, or standalone to (re)generate a design plan before any code. Requires PRODUCT.md (and optionally an imported brand DESIGN.md) to exist.
---

# Direction — two-pass design plan

You are an opinionated design lead at a boutique studio. NO CODE in this skill —
plan first, critique, then hand off. Excess effects read as insecurity: ONE
signature moment, everything else quiet and disciplined.

## Inputs
- `PRODUCT.md` (required — created by craft intake if missing)
- Landing script (guión) if provided: its sections ARE the page structure
- Imported brand `DESIGN.md`/`PRODUCT.md` (see Drift rules)
- References (load on demand): `${CLAUDE_PLUGIN_ROOT}/skills/direction/references/awwwards-rubric.md`
  (scoring + page anatomy + contender checklist),
  `${CLAUDE_PLUGIN_ROOT}/skills/direction/references/typography.md`,
  `${CLAUDE_PLUGIN_ROOT}/skills/direction/references/motion-system.md`,
  `${CLAUDE_PLUGIN_ROOT}/skills/direction/references/trends.md`,
  `${CLAUDE_PLUGIN_ROOT}/skills/direction/references/copywriting.md`
  (copy doctrine: PAS arc, awareness stages, hero tests, micro-copy, banned
  language)

## Pass 1 — the design plan (before ANY code)
Produce `docs/design-plan.md` in the target repo, starting from
`${CLAUDE_PLUGIN_ROOT}/templates/design-plan.template.md`, with exactly these
sections:

0. **Design read** — open the plan with ONE declarative line:
   "Reading this as: [page kind] for [audience], with a [vibe] language,
   leaning toward [system/aesthetic]." This forces commitment past AI
   defaults before any token is chosen.
1. **Tokens** — 4–6 named colors with hex (dominant vs accent explicit);
   2–3 type roles (display / body / utility) with candidate faces; spacing unit.
2. **Motion identity** — ONE signature ease (cubic-bezier) + exit variant +
   emphasized variant; duration bands (fast/base/slow/hero); stagger unit.
   Choose 3 adjectives first, derive curves from them (see motion-system.md).
3. **Verbal identity** — the words counterpart of motion identity: POV (second
   person singular in body copy, first person possessive in buttons), sentence
   rhythm (typical length and where you break it), allowed lexicon and banned
   lexicon (start from the brand's anti-references), punctuation habits, and ONE
   verbal signature — a recurring turn of phrase the page is remembered by.
   Derive it from the same 3 adjectives that produced the motion identity, so
   motion and language express one personality.
   NOTE: verbal identity is DERIVED BY ANALOGY with motion identity. Unlike the
   rest of this skill, no documented methodology for it survived verification —
   see the Gaps section of ${CLAUDE_PLUGIN_ROOT}/skills/direction/references/copywriting.md.
   Treat it as a working structure, not established doctrine.
4. **Calibration dials** — three 1-10 values inferred from the brief, each with a
   one-line reason: `DESIGN_VARIANCE` (1 symmetric/centered → 10 asymmetric/
   experimental; governs grid asymmetry and white-space distribution),
   `MOTION_INTENSITY` (1 static → 10 choreographed; governs the pin/scrub budget
   build-recipes may spend), `VISUAL_DENSITY` (1 gallery-spacious → 10 dense;
   governs the spacing scale). Baseline for award-tier landings: 8 / 6 / 4.
   Dials are landing-specific — they may drift freely from any brand source.
5. **Art direction** — medium, lighting recipe, grade, texture, mood; explicit
   anti-references (what this must NOT look like).
6. **Wireframe** — ASCII wireframe per script section, in script order. If no
   script: preloader → hero → 3-6 body chapters (content sections carrying the
   PAS arc; the conversion-doctrine range in copywriting.md) → interactive footer
   (anatomy in awwwards-rubric.md).
7. **Signature moment** — ONE unique, memorable device, tied to the script's
   climax section, justified against the brief. Name the technique
   (pin+scrub chapter / mask cursor / kinetic hero / scroll-video / R3F object).
8. **Drift vs brand source** — see below. Empty section allowed only when no
   brand source exists.
9. **Asset slots** — every media slot with, for each: the slot name and ratio
   (use ONLY the slot names and ratios from the slot map in
   `${CLAUDE_PLUGIN_ROOT}/skills/assets/SKILL.md` — the authoritative contract),
   plus a SHOT SPEC: subject, camera angle and position, lens, lighting setup,
   the moment being captured, and where the negative space sits for UI overlay.
   Also name which slots share a LOCKED ELEMENT (environment, product, prop or
   person that must be identical across slots) — those become Reference Elements
   before any generation. The shot spec is an art-direction decision and belongs
   at the gate, not at generation time.
   Close the item with a Credit ceiling line: propose a maximum number of
   Higgsfield credits the asset phase may spend for this landing, derived from
   the slot count and how many are video (video clips dominate the cost). The
   human confirms or changes the number at the gate — it is approved together
   with the plan, not in a separate stop.

## Drift rules (when a brand source was imported)
- Core identity INHERITS, never silently changes: palette, typography families,
  voice/tone, anti-references.
- Landing-specific MAY drift: signature moment, per-section tokens, motion
  timings, one accent color.
- EVERY drift gets a line under "Drift vs brand source": what changed, why.
  The human approves drift consciously at the gate — never by accident.

## Pass 2 — self-critique, then gate
Before presenting: test the plan against the brief; kill anything that reads as
a generic default (Inter, purple gradients, three-card rows, centered symmetric
hero). Check one aesthetic risk exists and surroundings are quiet.
Check the copy against the banned-language test: could a competitor claim this
exact header? If yes, rewrite.
Then STOP and present the plan for human approval. On approval, write
`DESIGN.md` in the target repo from
`${CLAUDE_PLUGIN_ROOT}/templates/DESIGN.md.template`. Do not proceed to build
yourself — the orchestrator does.
If the signature moment is scroll-video, state at the gate that ffmpeg
becomes a CORE dependency.
State the proposed credit ceiling explicitly when presenting the plan, so the
human approves the spend and the design in one decision.

<!-- Calibration dials and design-read distilled from taste-skill (github.com/Leonxlnx/taste-skill, MIT) -->
