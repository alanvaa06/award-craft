# Changelog

## [Unreleased]

### Known limitations (v0.2 candidates)
- DESIGN.md asset-slot `file` column is filled by the assets phase only in reports, not written back
- Section-stack pattern (N sequential pins) vs 1-2 pinned-sequences budget: budget wins unless the gate approves otherwise
- page-anatomy.md duplicates rubric §5 anatomy (maintenance hazard)
- Mixed ES/EN surface (templates + golden brief in Spanish)
- Preflight install instructions live only in README

## [0.7.0] - 2026-08-06
### Added
- Refine mode in the assets skill: name a slot with feedback (`/award-craft:assets hero "light too hard"`) to regenerate an asset the human rejected
- Feedback is classified before generating — execution feedback regenerates immediately, direction feedback (subject, camera, lens, moment, negative space) shows the updated shot spec and waits for approval, preserving the rule that the shot spec is the human's decision
- Refine rounds read `docs/assets-log.md` first so a failed attempt is not repeated, change one variable at a time, and can promote a partially-successful generation to a Reference Element
- Refine rounds obey the same cost preflight, approved ceiling and cumulative spend tracking; a tier change implied by feedback is presented as a priced decision, never applied silently

## [0.6.0] - 2026-08-06
### Added
- Video tier menu priced live with `get_cost` and presented at the existing design-plan gate: the human picks one tier for the whole landing (per-slot override on request), because model choice alone swings a clip ~4.3x
- Credit ceiling is now derived arithmetic (video slots x tier + image slots + stated headroom) instead of a guessed number
- Approved model and parameters recorded per slot in DESIGN.md; the asset phase must use them and stops if a slot cannot run on its approved config
- Cost levers table in the assets skill
### Measured
- 2026-08-06 via `get_cost`, no jobs submitted, one 16:9 clip: kling3_0_turbo 5s/720p = 7.5; seedance_2_5 5s/480p = 15; seedance_2_5 5s/720p = 32.5; seedance_2_5 8s/720p = 52; seedream_v4_5 image = 1
- Cost levers ranked: model ~4.3x > resolution ~2.2x > duration ~1.6x > audio (no measured effect)
- Corrects a v0.5 assumption: muted loops do not save credits — `generate_audio` has no measured price effect on seedance

## [0.5.0] - 2026-08-06
### Added
- Credit ceiling folded into the existing design-plan gate: direction proposes a maximum credit spend for the asset phase, the human approves it together with the plan — still one gate, no new stop in the common path
- Mandatory cost preflight in the asset phase (`balance` + `get_cost` per slot) with a hard stop when the total would exceed the approved ceiling, the balance, or when no ceiling exists
- Cumulative spend tracked in the iteration log; regeneration rounds that would cross the ceiling re-trigger the stop
- Free-trial unlimited generations are never spent silently: `use_unlim` is omitted so the server's `unlim_choice` question reaches the human verbatim
- Credits spent vs ceiling reported in the final report and the verify report
### Measured
- Cost reference measured 2026-08-06 with `get_cost` (no jobs submitted): 16:9 image = 1 credit; 5s 16:9 video = 32.5 credits. Video slots set the ceiling
### Unverified
- Reference-Element creation and media uploads are assumed free (not generations) and excluded from the preflight sum — confirm on the first real run; if they do cost, the ceiling stop fires late

## [0.4.0] - 2026-08-06
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

## [0.3.0] - 2026-08-06
### Added
- Narrative layer: craft writes the landing script (guión) as an intake deliverable when none is supplied; script + copy drafts are approved at the same gate as the design plan
- Rule: the narrative climax and the signature moment are the same section
- Intake now captures the Schwartz awareness stage and verbatim voice-of-customer phrasing
- Verbal identity in the direction design plan (derived by analogy with motion identity — no documented methodology survived verification)
- New reference: copywriting.md (PAS arc, awareness/sophistication, hero tests, VoC, Ogilvy, CTA micro-copy, banned language, documented gaps)
- Verify checks 19-21: hero grunt/descriptiveness tests, narrative arc coherence, micro-copy and POV
### Notes
- Copy doctrine distilled from the vault article "Landing Page Copywriting Doctrine" (Ogilvy, Schwartz, Wiebe/Unbounce, Shapiro, Miller). Four sub-topics have no verified doctrine and are documented as gaps: LatAm bilingual register, verbal-identity methodology, modern AI-copy-tell lists, per-section word budgets.

## [0.2.0] - 2026-08-06
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
