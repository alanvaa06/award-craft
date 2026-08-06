---
name: assets
description: Generate and integrate all landing media via Higgsfield MCP from DESIGN.md-derived briefs — hero images, textures, background loops, product shots. Use when craft invokes the asset phase, or standalone to (re)generate one slot (e.g. "/award-craft:assets hero"). Requires DESIGN.md with an asset-slots section.
---

# Assets — Higgsfield MCP pipeline

Higgsfield MCP is the ONLY generator in v0.1. If its tools are unavailable,
STOP and report — do not substitute another generator.

## Brief construction (never prompt ad-hoc)
Every generation uses the visual-DNA block derived from DESIGN.md:
Style (medium) / Palette (named colors + hex) / Lighting (one recipe) /
Grade / Texture / Composition / Mood (3 adjectives) / Never-list.
Plus the slot spec: ratio, negative-space zone for UI overlay, subject.
Premium vocabulary and slot-negative-space phrasing:
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

## Generation rules
- Images: 3–5 candidates per slot, pick against DESIGN.md, iterate ONE
  variable at a time. Batch tools + jobs_wait for parallel slots.
- Loops: first-frame = last-frame technique; static camera locked; abstract
  subjects only (gradients/smoke/liquid) — no people, no readable objects.
- Consistency: same visual-DNA block verbatim on every call; reference
  previously approved generations when the MCP supports references.

## Post + integration
- Format: WebP (AVIF only when payload-critical). Budgets: image <500KB,
  loop video <4MB. Breakpoint variants + srcset.
- Naming by slot: `hero-16x9.webp`, `hero-9x16.webp`, `card-3x2-01.webp`,
  `bg-loop-16x9.mp4` → target repo `/public/media/`.
- Replace the build placeholder for the slot; verify ratio matches; alt text
  written at generation time from the slot's content purpose.
- Report per slot: prompt used, model, candidates generated, pick rationale.
