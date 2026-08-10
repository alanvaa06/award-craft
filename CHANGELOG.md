# Changelog

## [Unreleased]

### Fixed — from the first real dogfood (golden brief, 2026-08-09, 6 credits)
Ran the golden brief to the gate with live Higgsfield generation. The core bet held — the three comps read as web pages, not posters — and eight defects surfaced that only a real run could show.
- **Comp prompts leaked their own instructions as content**: "every other text region is greeked" rendered as the literal words *indistinct greeked lines of text*, and a button labelled *greeked text*. comps.md now bans the word "greeked" in a prompt and asks for the visual ("lorem ipsum filler at its real size" — the only phrasing that rendered correctly)
- **A loose list of legible strings scatters them**: "the only legible words are 'Cumbre' and the headline" put the product name inside the CTA button in 2 of 3 comps. Every legible string is now bound to its region (wordmark reads X, headline reads Y, button reads Z)
- **An unnamed region gets filled from the category default**: an unnamed utility bar came back as SHOP / ABOUT / CART — the brief's own stated anti-reference. PRODUCT.md's anti-references now go into the comp prompt verbatim, and nav items are named or declared absent
- **"No browser chrome" does not mean "no canvas"**: one comp rendered the page floating on a cream backdrop with the next section peeking. Prompts now state that the image IS the viewport, edge to edge
- **Comp budget was understated**: ~1 credit/image was measured on a photography model; text-capable models measured 1.25-2, so the round is 4-6 credits. Corrected in comps.md and in the intake question
- **PRODUCT.md predated impeccable v4's product record** (`doctor` finding `product-schema-legacy`). The template now carries the `<!-- impeccable:product-schema 1 -->` stamp and the canonical record (Users, Product Purpose, Positioning, Operating Context, Capabilities and Constraints, Brand Commitments, Evidence on Hand, Product Principles), with award-craft's landing intake as extension sections
- **DESIGN.md parsed structurally but read as an empty document** to impeccable's coverage check (northStar false, colors 0, fonts 0, rules 0). The template now carries the micro-formats its parser actually scrapes: `**Creative North Star: "..."**` with the closing asterisks after the quote, `**Key Characteristics:**` followed by a bullet list, `**The <Name> Rule.**` bullets, `**Name** (#hex):` colour bullets, `**Display Font:**` lines, and the `### Primary` / `### Hierarchy` / `### Buttons` sub-headings
- **`**Utility Font:**` silently overwrote the display face.** impeccable knows only display / headline / body / ui / label / mono; an unknown role falls back to `display`, so the mono face replaced the display face in the parsed model. Template uses `**Mono Font:**` or `**Label Font:**`, and validate.mjs fails the build if "Utility Font" comes back
- **Testing trap documented**: installed plugins are served from `~/.claude/plugins/cache/`, so editing a skill on a branch and running the slash command tests the last installed version. README now says how to tell which copy is live
- validate.mjs enforces all of the above; the fixture re-run ends with `doctor` reporting "No drift found"

### Added — comp round (three rendered compositions before any code)
- `direction` Pass 1.5 renders THREE 16:9 comps of the first viewport with the visual world held fixed (same palette, type and material language in all three) — the round tests structure, not identity, and each comp is labelled with the one axis it tests: topology, sequence, density, hierarchy, focal composition or signature placement
- New reference `direction/references/comps.md`: prompt shape (layout scaffold FIRST — the deliberate inversion of prompting.md's front-load-the-subject rule, because for a comp the layout is the subject), the poster self-check, the greeking rule that keeps invented prices and specs out of a comp, generation and logging
- **Still one gate.** The comp spend (~3 credits, priced live) is authorized during the intake questions, so the comps arrive AT the existing design-plan gate rather than adding a stop. The human approves plan, script and composition in one decision
- After approval, a fidelity inventory is recorded in the design plan's new `## Comps` section: component grammar, type ramp and compression class, region inventory with a `produce`/`direct`/`semantic` medium each, and quantity commitments for dense fields. The build reads the inventory, not the picture alone
- `build-recipes` gains a reproduction phase when a comp exists: rebuild the first viewport at the comp's width and compare screenshots side by side before any motion — the comparison is the authority, never the model's conviction that the recreation worked. A region that keeps losing becomes a produced asset instead of more CSS
- `verify` critiques comp vs build per section as its own crop at legible scale (never one full-page thumbnail) and checks that no `produce` region was silently downgraded to a gradient (new checks 24-25)
- `elevate` offers the round in Overhaul mode only; Preserve mode does not comp, because rendering alternatives to an incumbent composition invites a redesign nobody asked for
- Degraded path is explicit: no authorization or no Higgsfield → skip and say so in the report; a wireframe-only approval is never reported as an approved composition

### Changed — impeccable v4 interop (P0)
- `DESIGN.md` is now written in the shared [DESIGN.md spec](https://github.com/google-labs-code/design.md) format that impeccable v4 reads, drift-checks and rewrites: YAML token frontmatter (normative) + the eight canonical sections in order, with award-craft's production data (motion identity, art direction, asset slots, drift, craft-floor overrides) confined to clearly-marked extension sections below them. Verified against impeccable's own `design-parser.mjs`
- Motion, shadows, breakpoints and narrative are mirrored to the `.impeccable/design.json` sidecar (`schemaVersion: 2`) — the layer the 8-prop component schema cannot hold
- build-recipes reads tokens from the frontmatter, not from prose
- An existing `PRODUCT.md` / `DESIGN.md` is never overwritten silently, whoever wrote it: refresh / merge / keep is the human's call, and an impeccable-written DESIGN.md is treated as incumbent visual truth with drift rules
- Preflight resolves impeccable's base dir and requires **v4.0+**, because v4 is what changed the file contract
- verify and elevate now run impeccable's detector (`scripts/detect.mjs --json`) instead of assuming its hook is on; findings are consumed, not re-derived (new checks 24-25)
- Asset slots carry a `medium` (`produce` / `direct` / `semantic`) decided from what the slot shows, not from what feels buildable — the guard against an approved material silently becoming a CSS gradient
- Resolved six doctrine collisions between `trends.md` and impeccable's `craft-floor.md` (grain/`feTurbulence`, CSS textures, viewport-scale display type, mono labels, section indices, glass): overridable only when named in the design plan and carried into DESIGN.md's `## Craft-floor overrides`; unnamed use is a verify finding. Eyebrow/kicker, gradient text and nested cards stay banned outright
- `anti-patterns.md`'s "already covered by impeccable" list refreshed to the v4 craft floor

### Known limitations (v0.2 candidates)
- DESIGN.md asset-slot `file` column is filled by the assets phase only in reports, not written back
- Section-stack pattern (N sequential pins) vs 1-2 pinned-sequences budget: budget wins unless the gate approves otherwise
- page-anatomy.md duplicates rubric §5 anatomy (maintenance hazard)
- Mixed ES/EN surface (templates + golden brief in Spanish)
- Preflight install instructions live only in README

## [0.7.0] - 2026-08-08
### Added
- Refine mode in the assets skill: name a slot with feedback (`/award-craft:assets hero "light too hard"`) to regenerate an asset the human rejected
- Feedback is classified before generating — execution feedback regenerates immediately, direction feedback (subject, camera, lens, moment, negative space) shows the updated shot spec and waits for approval, preserving the rule that the shot spec is the human's decision
- Refine rounds read `docs/assets-log.md` first so a failed attempt is not repeated, change one variable at a time, and can promote a partially-successful generation to a Reference Element
- Refine rounds obey the same cost preflight, approved ceiling and cumulative spend tracking; a tier change implied by feedback is presented as a priced decision, never applied silently

## [0.6.0] - 2026-08-08
### Added
- Video tier menu priced live with `get_cost` and presented at the existing design-plan gate: the human picks one tier for the whole landing (per-slot override on request), because model choice alone swings a clip ~4.3x
- Credit ceiling is now derived arithmetic (video slots x tier + image slots + stated headroom) instead of a guessed number
- Approved model and parameters recorded per slot in DESIGN.md; the asset phase must use them and stops if a slot cannot run on its approved config
- Cost levers table in the assets skill
### Measured
- 2026-08-08 via `get_cost`, no jobs submitted, one 16:9 clip: kling3_0_turbo 5s/720p = 7.5; seedance_2_5 5s/480p = 15; seedance_2_5 5s/720p = 32.5; seedance_2_5 8s/720p = 52; seedream_v4_5 image = 1
- Cost levers ranked: model ~4.3x > resolution ~2.2x > duration ~1.6x > audio (no measured effect)
- Corrects a v0.5 assumption: muted loops do not save credits — `generate_audio` has no measured price effect on seedance

## [0.5.0] - 2026-08-08
### Added
- Credit ceiling folded into the existing design-plan gate: direction proposes a maximum credit spend for the asset phase, the human approves it together with the plan — still one gate, no new stop in the common path
- Mandatory cost preflight in the asset phase (`balance` + `get_cost` per slot) with a hard stop when the total would exceed the approved ceiling, the balance, or when no ceiling exists
- Cumulative spend tracked in the iteration log; regeneration rounds that would cross the ceiling re-trigger the stop
- Free-trial unlimited generations are never spent silently: `use_unlim` is omitted so the server's `unlim_choice` question reaches the human verbatim
- Credits spent vs ceiling reported in the final report and the verify report
### Measured
- Cost reference measured 2026-08-08 with `get_cost` (no jobs submitted): 16:9 image = 1 credit; 5s 16:9 video = 32.5 credits. Video slots set the ceiling
### Unverified
- Reference-Element creation and media uploads are assumed free (not generations) and excluded from the preflight sum — confirm on the first real run; if they do cost, the ceiling stop fires late

## [0.4.0] - 2026-08-08
### Added
- Reference Elements as the first phase of the asset pipeline: reusable characters/environments/props created from real images and injected via `<<<element_id>>>`, so slots share a locked look instead of each landing on the model's statistical average
- Shot spec per asset slot authored in the design plan (subject, camera, lens, lighting, moment, negative space) and approved at the gate — art direction no longer decided at generation time
- Model routing by job with runtime ID resolution via `models_explore` (vendor IDs drift and disagree across tools)
- Selection rubric: pick the most specific candidate, not the most polished; explicit rejection of the default AI look
- Generation mechanics: `count` for same-prompt variants vs `generate_image_batch` for distinct slots; `get_cost` preflight before expensive batches
- Iteration log at `docs/assets-log.md`
- Verify checks 22-23: shot-spec compliance and cross-slot coherence
### Notes
- `presets_show` verified NOT applicable to landing assets (creator/social effect presets only) and documented as a no-go to save the round trip

## [0.3.0] - 2026-08-07
### Added
- Narrative layer: craft writes the landing script (guión) as an intake deliverable when none is supplied; script + copy drafts are approved at the same gate as the design plan
- Rule: the narrative climax and the signature moment are the same section
- Intake now captures the Schwartz awareness stage and verbatim voice-of-customer phrasing
- Verbal identity in the direction design plan (derived by analogy with motion identity — no documented methodology survived verification)
- New reference: copywriting.md (PAS arc, awareness/sophistication, hero tests, VoC, Ogilvy, CTA micro-copy, banned language, documented gaps)
- Verify checks 19-21: hero grunt/descriptiveness tests, narrative arc coherence, micro-copy and POV
### Notes
- Copy doctrine distilled from the vault article "Landing Page Copywriting Doctrine" (Ogilvy, Schwartz, Wiebe/Unbounce, Shapiro, Miller). Four sub-topics have no verified doctrine and are documented as gaps: LatAm bilingual register, verbal-identity methodology, modern AI-copy-tell lists, per-section word budgets.

## [0.2.0] - 2026-08-07
### Added
- Calibration dials (DESIGN_VARIANCE / MOTION_INTENSITY / VISUAL_DENSITY, 1-10, baseline 8/6/4) and mandatory design-read line in the direction design plan
- Verify checks 13-18: hero budget, eyebrow restraint, layout variety, single accent, 100dvh, copy tells
- Copy & layout tells section in anti-patterns.md
- Elevate: Preserve/Overhaul mode detection and ordered modernization levers
- Attribution: distilled from taste-skill (github.com/Leonxlnx/taste-skill, MIT)

## [0.1.0] - 2026-08-06
### Added
- Skills: craft, elevate, direction, build-recipes, assets, verify
- References distilled from vault wiki/Web Design
- Templates: PRODUCT.md, DESIGN.md, design-plan
- validate.mjs structural acceptance test
- Golden brief fixture
