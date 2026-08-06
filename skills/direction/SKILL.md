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
  `${CLAUDE_PLUGIN_ROOT}/skills/direction/references/trends.md`

## Pass 1 — the design plan (before ANY code)
Produce `docs/design-plan.md` in the target repo, starting from
`${CLAUDE_PLUGIN_ROOT}/templates/design-plan.template.md`, with exactly these
sections:

1. **Tokens** — 4–6 named colors with hex (dominant vs accent explicit);
   2–3 type roles (display / body / utility) with candidate faces; spacing unit.
2. **Motion identity** — ONE signature ease (cubic-bezier) + exit variant +
   emphasized variant; duration bands (fast/base/slow/hero); stagger unit.
   Choose 3 adjectives first, derive curves from them (see motion-system.md).
3. **Art direction** — medium, lighting recipe, grade, texture, mood; explicit
   anti-references (what this must NOT look like).
4. **Wireframe** — ASCII wireframe per script section, in script order. If no
   script: preloader → hero → 2-4 body chapters → interactive footer
   (anatomy in awwwards-rubric.md).
5. **Signature moment** — ONE unique, memorable device, tied to the script's
   climax section, justified against the brief. Name the technique
   (pin+scrub chapter / mask cursor / kinetic hero / scroll-video / R3F object).
6. **Drift vs brand source** — see below. Empty section allowed only when no
   brand source exists.
7. **Asset slots** — every media slot with ratio + treatment — use ONLY the
   slot names and ratios from the slot map in
   `${CLAUDE_PLUGIN_ROOT}/skills/assets/SKILL.md` (the authoritative contract).

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
Then STOP and present the plan for human approval. On approval, write
`DESIGN.md` in the target repo from
`${CLAUDE_PLUGIN_ROOT}/templates/DESIGN.md.template`. Do not proceed to build
yourself — the orchestrator does.
If the signature moment is scroll-video, state at the gate that ffmpeg
becomes a CORE dependency.
