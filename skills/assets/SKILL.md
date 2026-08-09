---
name: assets
description: Generate and integrate all landing media via Higgsfield MCP from DESIGN.md-derived briefs — hero images, textures, background loops, product shots. Use when craft invokes the asset phase, or standalone to (re)generate one slot (e.g. "/award-craft:assets hero"). Requires DESIGN.md with an asset-slots section.
---

# Assets — Higgsfield MCP pipeline

Higgsfield MCP is the ONLY generator in v0.1. If its tools are unavailable,
STOP and report — do not substitute another generator.

## Phase 0 — Reference Elements FIRST (the anti-generic lever)

Generating from text alone lands on the model's statistical average, which IS
the generic look. Before generating ANY slot, establish reusable references.

`show_reference_elements(action='create')` stores reusable characters,
environments and props per workspace from your own images. Embed them in a
prompt as `<<<element_id>>>` — the backend injects the image. MULTIPLE
elements per prompt are allowed. This is what makes a slot set look
art-directed instead of stock.

Sources for the reference images, in order of preference:
1. Real photography the client supplied (product shots, space, people).
2. Images in the imported brand source folder.
3. A first generation you and the human approved — promote it to an Element,
   then every later slot inherits it.

Create elements for whatever must stay identical across slots: the
environment, the hero product, a recurring prop, a person.

**Element vs Soul** (vendor's documented rule):
- **Element** — instant, single image, multiple references per generation,
  any subject (person, place, prop). Use by default.
- **Soul** (`show_characters(action='train')`) — 5-20 photos, ~10 min, ONE
  person, returns a `soul_id` usable with `soul_2`. Only when the landing
  needs a recurring human identity and the client supplied 5+ photos of them.
Never train a Soul silently — ask first.

Upload flow for local images: `media_upload` → PUT the bytes to the returned
`upload_url` → `media_confirm`, then pass the returned id.

## Shot spec drives the prompt (never prompt ad-hoc)

Each slot's shot spec comes from the APPROVED design plan (direction Pass-1
writes it: subject, camera angle/position, lens, lighting setup, moment,
negative-space zone). The asset phase executes that spec — it does not invent
art direction after the gate.

Every prompt = shot spec + the visual-DNA block derived from DESIGN.md:
Style (medium) / Palette (named colors + hex) / Lighting (one recipe) /
Grade / Texture / Composition / Mood (3 adjectives) / Never-list.
Plus `<<<element_id>>>` for every locked element the spec names.
Premium vocabulary and negative-space phrasing:
${CLAUDE_PLUGIN_ROOT}/skills/assets/references/prompting.md.

## Slot map (ratios are contract — layout never reflows)
| Slot | Ratio | Notes |
|---|---|---|
| hero desktop | 16:9 (21:9 if plan says ultrawide) | ≥1920px; upscale if needed |
| hero mobile | 9:16 | SEPARATE composition, never a crop |
| section divider | 21:9 / 8:1 | outpaint from a 16:9 master |
| card / feature | 3:2 | consistent across the whole grid |
| portrait | 4:5 | editorial standard |
| bg loop | 16:9 video 6–10s | muted, no audio track, seamless |
| scroll-video master | 16:9 source clip 4-8s | generate master clip via Higgsfield, then ffmpeg frame sets (15fps desktop / 12fps mobile 960px) per ${CLAUDE_PLUGIN_ROOT}/skills/build-recipes/references/scroll-video.md |

## Model routing — by job, never by hardcoded ID

Model IDs drift and the vendor's own tools disagree on them
(`nano_banana_2` / `nano_banana_pro` / `nano_banana_flash` all appear).
ALWAYS resolve the current ID with
`models_explore(action='recommend', query=<the job>, type='image'|'video')`,
and read `medias[].roles`, `aspect_ratios` and `parameters` off the returned
model — never assume them.

Vendor-documented routing by job (from the generate_image contract):

| Job | Route to |
|---|---|
| Commercial / product / ad imagery | marketing_studio_image |
| Portrait, fashion, UGC, editorial people | soul_2 (+ `soul_id` when trained) |
| 4K, text in image, diagrams | nano_banana (Pro tier) |
| Precise control, transformations, 4-6K, reference-heavy | seedream_v4_5 |
| Cinematic still | cinematic_studio_2_5 |

DO NOT call `presets_show` — verified: its presets are creator/social effects
(orbit selfies, paparazzi, character stunts), none applicable to landing-page
assets. Calling it wastes a round trip.

## Generation mechanics
- `count: 2-4` produces variants of the SAME prompt and settings.
  For slots with DIFFERENT prompts use `generate_image_batch` — do not loop
  single calls.
- `get_cost: true` preflights credits; run it before any batch over ~4 images
  or any video set, and report the number before spending.
- Iterate ONE variable at a time between rounds.
- Loops: first-frame = last-frame technique; static camera locked; abstract
  subjects only (gradients/smoke/liquid) — no people, no readable objects.

## Selection rubric — pick specific over polished
The most conventionally beautiful candidate is usually the generic one.
Reject a candidate if it shows the default AI look: centered symmetric
subject, oversaturation, over-polished skin/surfaces, stock-photo posing,
or a busy field where the spec asked for negative space.
Pick the candidate that (a) satisfies the shot spec's framing and
negative-space requirement, (b) reads most SPECIFIC — a particular place,
hour and material rather than a category, and (c) matches the locked
elements. If no candidate qualifies, change one variable and regenerate;
never ship the least-bad frame.

## Iteration log
Append every round to `docs/assets-log.md` in the target repo:
slot · model resolved · prompt · element ids used · candidate count ·
which one was picked and the one-line reason. It prevents repeating a
generic attempt and gives the human something to argue with.

## Post + integration
- Format: WebP (AVIF only when payload-critical). Budgets: image <500KB,
  loop video <4MB. Breakpoint variants + srcset.
- Naming by slot: `hero-16x9.webp`, `hero-9x16.webp`, `card-3x2-01.webp`,
  `bg-loop-16x9.mp4` → target repo `/public/media/`.
- Replace the build placeholder for the slot; verify ratio matches; alt text
  written at generation time from the slot's content purpose.
- Report per slot: shot spec executed, model resolved, elements used, prompt,
  candidates generated, pick rationale — and link the assets-log entry.
