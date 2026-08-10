---
name: verify
description: Mandatory visual verification loop for award-craft landings — screenshot desktop+mobile, critique against the quantitative checklist, fix, re-shoot until verified. Use when craft/elevate reach the verify phase, or standalone after manual edits ("/award-craft:verify"). An edit that ran without errors is NOT done — only verified_ screenshots are done.
---

# Verify — the loop that makes doctrine real

"Build succeeded" ≠ done. Done = rendered, screenshotted, critiqued, passing.

## Protocol
1. Ensure production build passes (`npm run build`) — fix before any screenshots.
2. Start the dev server; open the page in the available browser tooling.
3. Screenshot set: desktop 1280px AND mobile 375px, at minimum: top of page,
   each script section, the signature moment mid-animation, the footer.
   Mobile is evaluated as ITS OWN designed choreography, not shrunk desktop.
4. Critique each screenshot against
   ${CLAUDE_PLUGIN_ROOT}/skills/verify/references/checklist.md — enumerate
   concrete deltas, no vibes. Code checks (grep items) run once per pass.
   Run impeccable's detector once per pass over the changed targets —
   `node <impeccable-base>/scripts/detect.mjs --json <targets>`, base dir
   resolved in preflight — and fold its findings into the same list (checks
   26-27). It catches the mechanical tells this checklist deliberately does not
   duplicate; do not eyeball them, and do not run it twice in one pass.
   When a comp was approved (`docs/comps/`), the critique is a SIDE-BY-SIDE:
   view the comp region and the built region together, the hero and each
   section as its own crop at legible scale — never one full-page thumbnail,
   which hides crude controls, wrong lettering character and flattened material
   behind a similar section order (checks 24-25).
5. Fix findings. Re-shoot affected screenshots.
6. A screenshot that passes is renamed with the `verified_` prefix. Loop until
   the whole set carries the prefix, then run ONE final confirmation pass.
7. Max 3 iterations per issue. Non-converging issues go to the report as
   pending — never loop infinitely, never silently drop.
8. Output: verify report — checks passed/failed, pending issues, screenshot
   inventory, score against the Awwwards anatomy checklist
   (${CLAUDE_PLUGIN_ROOT}/skills/direction/references/awwwards-rubric.md).

## Reduced-motion pass (mandatory)
Emulate prefers-reduced-motion; screenshot the same set. Full content must be
visible and usable with no pin, no scrub, no parallax.
