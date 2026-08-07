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

Two entry points. Start here unless you know you want a single stage.

| Command | What it does |
|---|---|
| `/award-craft:craft <brief> [@docs] [--brand <path>]` | Build a new landing page from nothing. Asks what you're selling, proposes a design plan, waits for your approval, then builds it, generates the images, and checks the result on screen. |
| `/award-craft:elevate [path]` | Take a page you already have and make it better. Reads the code, lists what's weak against the Awwwards checklist, you pick what to fix, it fixes and re-checks. |

The four stages below run automatically inside `craft` and `elevate`. Call one
directly when you only want that piece redone.

| Command | What it does |
|---|---|
| `/award-craft:direction` | Decides how the page should look and move — colors, fonts, spacing, the motion feel, a rough box-drawing layout per section, and the one moment meant to be memorable. Writes the plan; writes no code. Needs `PRODUCT.md`. |
| `/award-craft:build-recipes` | Writes the actual code from the approved plan, on the fixed stack. Never runs before a plan is approved. |
| `/award-craft:assets <slot>` | Makes the images and video the page needs (hero shot, texture, background loop, product shot) via Higgsfield, and drops them into place. Needs a `DESIGN.md` with asset slots. |
| `/award-craft:verify` | Screenshots the page on desktop and mobile, grades it against a checklist, fixes what fails, screenshots again. Repeats until it passes. A build that compiled is not done — only a passing screenshot is done. |

## Recommended workflow

### Building a new page

```
/award-craft:craft "<what you're selling>" @script.md --brand ../brand-kit
```

1. **Bring a script if you have one.** Pass it as `@script.md`. Its sections
   become the page sections. No script is fine — you'll be interviewed instead,
   it just takes longer.
2. **Point at your brand.** `--brand <path>` imports colors, type, and voice as
   local copies. The plugin reads that folder, never writes to it. No brand
   source? It builds one with you.
3. **Answer the intake questions.** Offer, audience, primary CTA, tone in three
   adjectives, references and anti-references, and which section is the climax.
   One at a time. Answer honestly — the anti-references matter as much as the
   references.
4. **Review the design plan. This is the only stop.** Colors, motion feel,
   layout per section, and the one signature moment. Push back here and iterate
   — changing the plan is cheap, changing a built page is not. On approval
   `DESIGN.md` is written and locked in.
5. **Everything after runs on its own:** code, then images, then the verify
   loop. Watch it screenshot, grade, fix, and re-shoot.
6. **Read the final report.** It flags where the landing drifted from your
   brand source. Drift that turned out well is worth promoting back into the
   brand kit — that's a decision you make and apply yourself.

### Improving a page you already have

```
/award-craft:elevate ./apps/web
```

1. **Next.js only** in v0.1. Anything else stops at the read step.
2. **Read the gap analysis** — what the page has, what's missing, what's wrong,
   each with a `file:line`.
3. **Pick your items at the gate.** They're ranked by impact against effort. Take
   the top few rather than everything; you can re-run.
4. **Applied, then verified** automatically, ending with a before/after score
   and side-by-side screenshots.

### Re-running one stage

Once a project has `PRODUCT.md` and `DESIGN.md`, call stages directly:

| You want | Run |
|---|---|
| Check a page you hand-edited | `/award-craft:verify` |
| Regenerate one image | `/award-craft:assets hero` |
| Rethink the look, keep the copy | `/award-craft:direction`, then `/award-craft:build-recipes` |
| Rebuild a section from an unchanged plan | `/award-craft:build-recipes` |

Two rules worth keeping: never run `build-recipes` before a design plan is
approved, and never call a page done on a green build — only `verify` decides
that.

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

## License

MIT — see [LICENSE](LICENSE).
