# award-craft

Claude Code plugin that builds and elevates Awwwards-level landing pages on a
fixed stack: Next.js + Tailwind + GSAP + Lenis, optional React Three Fiber.
Every build or elevation run ends in a mandatory visual verify loop — no page
ships on "the build succeeded" alone.

## Requirements

- Claude Code.
- Skills [gsap-skills](https://github.com/greensock/gsap-skills) and
  [impeccable](https://github.com/pbakaus/impeccable) installed.
- Higgsfield MCP connected (asset generation — hero images, textures,
  background loops).
- Optional: `ffmpeg` on PATH (scroll-video frame extraction); remotion /
  hyperframes for custom video (out of scope for v0.1).

Preflight checks these at the start of every run and reports what's missing
before doing any work.

## Install

```
/plugin marketplace add alanvaa06/award-craft
/plugin install award-craft@award-craft
```

Local dev alternative:

```bash
git clone https://github.com/alanvaa06/award-craft
```
```
/plugin marketplace add /path/to/award-craft
/plugin install award-craft@award-craft
```

## Commands

| Command | Description |
|---|---|
| `/award-craft:craft <brief> [@docs] [--brand <path>]` | Build a new landing page end-to-end — intake, approved design plan gate, recipe build, Higgsfield assets, mandatory verify. |
| `/award-craft:elevate [path]` | Elevate an existing page — gap-analysis against the Awwwards anatomy checklist, prioritized plan gate, apply approved items, mandatory verify. |
| `/award-craft:verify` | Mandatory visual verification loop — screenshot desktop+mobile, critique against the checklist, fix, re-shoot until `verified_`. |
| `/award-craft:assets <slot>` | Generate and integrate landing media via Higgsfield MCP from a DESIGN.md-derived brief (hero, texture, bg loop, product shot). |

## The flow

```
 preflight
    │  (CORE: gsap-skills, impeccable — stop if missing)
    │  (asset CORE: Higgsfield MCP — warn + mark assets blocked)
    ▼
 intake
    │  script (@docs) + brand source (PRODUCT.md/DESIGN.md, --brand import,
    │  or interview) + comprehension questions, one at a time
    ▼
 design plan ═══════════════ GATE — human approval, only one ═══════════════
    │  DESIGN.md written on approval
    ▼
 build (recipes)
    ▼
 assets (Higgsfield MCP — visual-DNA brief per slot)
    ▼
 verify (mandatory, never skipped)
    │  build → screenshot desktop+mobile → critique vs checklist → fix →
    │  re-shoot → rename verified_ → loop (max 3/issue) → reduced-motion pass
    ▼
 report
```

`craft` builds from zero; `elevate` runs the same gate + verify shape against
an existing page, starting from a gap-analysis instead of a blank intake.

## Doctrine sources

Skills and references are distilled from a private research vault: GSAP
official docs and forums, Awwwards evaluation pages, and engineering blogs on
scroll and motion craft. Claims marked `verified` in the references passed a
3-vote adversarial verification pass before being written down. The WebGL /
React Three Fiber reference is practitioner consensus, not independently
verified — treat it as a starting point, not doctrine.

## Versioning

Semantic versioning — see [CHANGELOG.md](CHANGELOG.md). v0.1 scope and
NO-goals: [docs/superpowers/specs/2026-08-06-award-craft-design.md](docs/superpowers/specs/2026-08-06-award-craft-design.md).
