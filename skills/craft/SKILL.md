---
name: craft
description: Build a new Awwwards-level landing page end-to-end — intake (script + brand source + interview), approved design plan gate, recipe build, Higgsfield assets, mandatory verify. Use when the user wants a new landing/marketing page built ("/award-craft:craft <brief> [@docs] [--brand <path>]"). Not for elevating an existing page (use elevate).
---

# Craft — orchestrator

Run phases IN ORDER. One human gate. Never skip verify.

## 0. Preflight
Check and report before anything:
- CORE (stop with install instructions if missing): gsap-skills skills
  available; impeccable available.
- CORE for asset phase (continue but mark assets phase blocked): Higgsfield
  MCP tools reachable — also read the credit balance so the design plan's
  ceiling can be proposed against a real number.
- OPTIONAL (warn only): remotion/hyperframes skills (custom video — out of
  scope v0.1), ffmpeg on PATH (scroll-video frames) — becomes CORE if the
  approved design plan's signature moment uses scroll-video (re-check at the
  gate; block the build of that section and report if missing).

## 1. Intake
Inputs (any combination): text brief; @docs (PRD, brand doc, landing script
"guión" — script sections become the page structure); `--brand <path>` folder.
Brand source resolution, in order:
  a) PRODUCT.md / DESIGN.md in the target repo → use them.
  b) External folder (--brand or ask) → IMPORT as local working copies with
     provenance frontmatter (source path + imported date). NEVER write to the
     business folder — it is a source, not a destination.
  c) Neither exists → create via interview.
ALWAYS ask comprehension questions (even with docs): offer, audience, primary
CTA, tone (3 adjectives), visual references/anti-references, which script
section is the climax (signature-moment candidate). One question at a time.
If docs + answers leave gaps → deep interview until PRODUCT.md writes with no
holes. Write PRODUCT.md from ${CLAUDE_PLUGIN_ROOT}/templates/PRODUCT.md.template.
If script and brand source contradict: surface it, propose a resolution,
let the gate decide.

   Awareness stage (Schwartz) — ask which stage the traffic arrives at:
   Most Aware / Product Aware / Solution Aware / Pain Aware / Unaware. It sets
   both headline strategy and page length (see copywriting.md).

   Voice of customer — during the interview, RECORD THE CLIENT'S EXACT PHRASING
   and any customer quotes they can supply (testimonials, reviews, support
   emails, sales-call language). Do not paraphrase: swiped customer wording is
   the strongest documented headline tactic. Store verbatim quotes in PRODUCT.md.

   If no landing script (guión) was supplied, CRAFT WRITES ONE as an intake
   deliverable: docs/guion.md — section list in scroll order, the narrative arc
   (PAS: problem → ordered agitation → solution/CTA, see
   ${CLAUDE_PLUGIN_ROOT}/skills/direction/references/copywriting.md), a copy draft
   per section (headline + subhead + body intent), and the climax section marked.
   RULE: the narrative climax and the signature moment are THE SAME SECTION —
   the page's peak of tension is where the animation budget is spent.

## 2. Design plan → GATE
Invoke skill `direction`. Present the plan and the guión (script + copy
drafts). ═══ STOP for human approval — both artifacts approved together ═══
Iterate on feedback. On approval: DESIGN.md written; proceed.

## 3. Build
Invoke skill `build-recipes` with DESIGN.md + design plan + script.

## 4. Assets
Invoke skill `assets` for every slot in the design plan. If blocked
(preflight), leave placeholders and mark in report. The asset phase runs its
own cost preflight against the ceiling approved with the plan and stops if it
would exceed it.

## 5. Verify
Invoke skill `verify`. Mandatory — an unverified build is not done.

## 6. Final report
What was built (per section); verify score + pending; assets per slot,
credits spent vs the approved ceiling; drift applied; copy decisions
(awareness stage, arc used, VoC quotes swiped); retro-sync suggestions (drift
worth promoting to the brand source — the human decides and executes; this
plugin never writes there).
