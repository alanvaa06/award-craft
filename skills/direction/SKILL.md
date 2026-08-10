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
  language),
  `${CLAUDE_PLUGIN_ROOT}/skills/direction/references/comps.md`
  (the comp round — prompt shape, variation axes, fidelity inventory)

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
   anti-references (what this must NOT look like). Follow it with a
   **Craft-floor overrides** section: any device on impeccable's refuse list
   that this landing will use anyway (grain/`feTurbulence`, viewport-scale display type above 6rem,
   mono labels, section indices, glass, CSS textures), each with the reason the
   brief earns it — see `${CLAUDE_PLUGIN_ROOT}/skills/direction/references/trends.md`
   §0. Nothing named there = the floor holds and verify flags the device.
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
   a MEDIUM (`produce` = raster to generate · `direct` = real asset the client
   supplies · `semantic` = built in HTML/CSS/SVG/canvas). Decide the medium from
   what the slot shows, never from what feels buildable: anything with lighting,
   depth, a figure, or a named material texture (cloth, paper grain, metal) is
   `produce` whatever the stack — "layered CSS texture" is not a medium and is
   how an approved art direction silently becomes a flat page.
   Then a SHOT SPEC: subject, camera angle and position, lens, lighting setup,
   the moment being captured, and where the negative space sits for UI overlay.
   Also name which slots share a LOCKED ELEMENT (environment, product, prop or
   person that must be identical across slots) — those become Reference Elements
   before any generation. The shot spec is an art-direction decision and belongs
   at the gate, not at generation time.
   Close the item with the Video tier and the derived Credit ceiling.
   Images cost ~1 credit and need no menu — generate them without asking.
   Video is where the money is, so price it live and let the human choose:

   Run `get_cost: true` (it prices without submitting) on one representative
   video slot for three candidate configs and present them as a menu with the
   real numbers, cheapest first. Reference shape, measured 2026-08-08 — RE-MEASURE,
   do not quote these:
   | Tier | Config | Measured |
   |---|---|---|
   | Budget | kling3_0_turbo · 5s · 720p | 7.5 credits |
   | Standard | seedance_2_5 · 5s · 720p | 32.5 credits |
   | Premium | seedance_2_5 · 8s · 720p | 52 credits |

   The human picks ONE tier for the whole landing (visual coherence across
   video slots matters more than per-slot optimisation). Per-slot overrides
   only when they ask for one — record the override and its cost on that slot.

   Then state the Credit ceiling as a derived sum, not a guess:
   (video slots x tier cost) + (image slots x image cost) + a stated headroom
   for regeneration rounds. Present the arithmetic so the human can see what
   drives it.

## Drift rules (when a brand source was imported)
- Core identity INHERITS, never silently changes: palette, typography families,
  voice/tone, anti-references.
- Landing-specific MAY drift: signature moment, per-section tokens, motion
  timings, one accent color.
- EVERY drift gets a line under "Drift vs brand source": what changed, why.
  The human approves drift consciously at the gate — never by accident.

## Pass 1.5 — comps (three rendered compositions, before any code)

Run this whenever Higgsfield is reachable AND the comp spend was authorized at
intake. Load
`${CLAUDE_PLUGIN_ROOT}/skills/direction/references/comps.md` and follow it.

Short form: render THREE 16:9 comps of the first viewport, world fixed (same
palette, type and material language in all three — this round tests structure,
not identity), each testing one named axis (topology / sequence / density /
hierarchy / focal composition / signature placement). Prompt LEADS with the
layout scaffold, region by region with scale relationships — a prompt that opens
with atmosphere returns a poster, not a page. Only the real product name and one
real headline are legible; everything else is greeked, because invented prices
or specs in a comp are claims PRODUCT.md never made. Save to `docs/comps/`, log
prompts and costs in `docs/comps/comps.md`. Three images ≈ 3 credits — inside
the comp allowance approved at intake, and counted separately from the asset
ceiling.

The comps are NOT a second gate: they are shown WITH the plan at the one gate
below. No authorization or no Higgsfield → skip the round and say so in the
report; a wireframe-only approval must never be reported as an approved
composition.

## Pass 2 — self-critique, then gate
Before presenting: test the plan against the brief; kill anything that reads as
a generic default (Inter, purple gradients, three-card rows, centered symmetric
hero). Check one aesthetic risk exists and surroundings are quiet.
Check the copy against the banned-language test: could a competitor claim this
exact header? If yes, rewrite.
Then STOP and present the plan for human approval — together with the three
comps when the round ran, each labelled with the axis it tests, and the three
questions from comps.md (which composition carries forward, what feels false,
is the plan approved). One decision, one stop. Do not proceed to build
yourself — the orchestrator does.

On approval, write the fidelity inventory into the plan's `## Comps` section
before handing off: component grammar, type ramp, region inventory with a
MEDIUM each, and quantity commitments (comps.md § After approval). The build
reads that inventory, not the picture alone.

## On approval — write DESIGN.md (shared file, spec format)

`DESIGN.md` is NOT award-craft's private file. impeccable v4 reads it
(`context.mjs` / `design-parser.mjs`), drift-checks it (`$impeccable doctor`)
and rewrites it (`document`, documenter agent). Write it from
`${CLAUDE_PLUGIN_ROOT}/templates/DESIGN.md.template`, which is the DESIGN.md
spec shape, and obey the contract:

- **YAML token frontmatter is normative** — palette, type roles, radii, spacing,
  component tokens live there; build-recipes reads tokens from there, not prose.
  Parser limits: 2-space indent, one nesting level, NO arrays, no multi-line
  scalars, component sub-tokens limited to the 8 allowed props.
- **The eight canonical sections keep their names and order**: Overview, Colors,
  Typography, Layout, Elevation & Depth, Shapes, Components, Do's and Don'ts.
  Omit one rather than inventing rules for it.
- **award-craft's production data goes in the extension sections at the bottom**
  (Motion identity, Art direction, Asset slots, Drift vs brand source,
  Craft-floor overrides). Unknown sections are preserved by the format.
  `## Art direction` closes with the approved comp: its path and one line on
  what it committed to. The full fidelity inventory stays in the design plan's
  `## Comps` section — one source, referenced from here, never copied.
- **Write the sidecar too:** `.impeccable/design.json`, `schemaVersion: 2`, with
  `extensions.motion` (signature/exit/emphasized eases + duration bands),
  `extensions.shadows`, `extensions.breakpoints`, `extensions.colorMeta`
  (display names keyed by frontmatter token) and `narrative` (north star,
  key characteristics, dos/donts). It carries what the 8-prop schema can't.
- **NEVER silently overwrite an existing DESIGN.md.** If one exists — whoever
  wrote it — show it, say whether it is impeccable-format or award-craft-format,
  and offer: refresh (rewrite from the approved plan), merge (keep its canonical
  sections, add/replace only the extension sections), or keep. The human picks.
  An impeccable-written DESIGN.md is incumbent visual truth, not an empty slot.
If the signature moment is scroll-video, state at the gate that ffmpeg
becomes a CORE dependency.
Present the video tier menu with live `get_cost` numbers and the derived credit
ceiling arithmetic when presenting the plan — the human approves the spend, the
tier and the design in one decision.

<!-- Calibration dials and design-read distilled from taste-skill (github.com/Leonxlnx/taste-skill, MIT) -->
