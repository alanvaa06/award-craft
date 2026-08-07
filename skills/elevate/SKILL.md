---
name: elevate
description: Elevate an existing landing page toward Awwwards level — read the project, gap-analysis against the anatomy checklist, prioritized plan gate, apply approved items, mandatory verify. Use when the user wants an existing page improved ("/award-craft:elevate [path]"). Not for building from scratch (use craft).
---

# Elevate — orchestrator

## 0. Preflight — identical to craft (see ${CLAUDE_PLUGIN_ROOT}/skills/craft/SKILL.md §0).

## 1. Read the project
Stack (confirm Next.js — if not, report that v0.1 only supports the fixed
stack and stop); sections; existing animations (GSAP? Lenis? CSS?); existing
DESIGN.md/PRODUCT.md or brand source (same resolution as craft §1).
Detect the mode: **Preserve** (modernize without breaking identity) or
**Overhaul** (new visuals, preserve content). State it in the gap-analysis.

## 2. Gap-analysis
Score the current page against the Awwwards anatomy checklist
(${CLAUDE_PLUGIN_ROOT}/skills/direction/references/awwwards-rubric.md) + run
impeccable's audit.
Output: what it has / what is missing / what is wrong (with file:line refs).
Also score the copy: hero tests, arc coherence, banned language, micro-copy
(see `${CLAUDE_PLUGIN_ROOT}/skills/direction/references/copywriting.md`).
Copy rewrites are a modernization lever — place them with typography (highest
lift, lowest risk).

## 3. Elevation plan → GATE
Prioritized items (impact vs effort), each: what changes, which recipe
applies, expected checklist deltas. ═══ STOP: human picks items ═══

## 4. Apply approved items using ${CLAUDE_PLUGIN_ROOT}/skills/build-recipes (same rules).
Apply modernization levers in this order (highest lift / lowest risk first):
typography refresh → spacing & rhythm → color recalibration → motion layer →
hero and key-section recomposition → full block replacement (last resort).
Never silently change slugs, nav labels, form field names, or legal copy.
(Lever order distilled from taste-skill, MIT.)

## 5. Verify — invoke skill verify. Mandatory.

## 6. Report: antes/después — checklist score before vs after, screenshots
side by side, remaining gaps for a future pass.
