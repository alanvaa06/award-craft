# Changelog

## [Unreleased]

### Known limitations (v0.2 candidates)
- DESIGN.md asset-slot `file` column is filled by the assets phase only in reports, not written back
- Section-stack pattern (N sequential pins) vs 1-2 pinned-sequences budget: budget wins unless the gate approves otherwise
- page-anatomy.md duplicates rubric §5 anatomy (maintenance hazard)
- Mixed ES/EN surface (templates + golden brief in Spanish)
- Preflight install instructions live only in README

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
