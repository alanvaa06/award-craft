# award-craft

Claude Code plugin that builds and elevates Awwwards-level landing pages on a
fixed stack: Next.js + Tailwind + GSAP + Lenis, optional React Three Fiber.
It writes the page's story as well as its code, and every run ends in a
mandatory visual verify loop — no page ships on "the build succeeded" alone.

## Requirements

- Claude Code.
- Skills [gsap-skills](https://github.com/greensock/gsap-skills) and
  [impeccable](https://github.com/pbakaus/impeccable) installed.
- Higgsfield MCP connected (asset generation — hero images, textures,
  background loops).
- Optional: `ffmpeg` on PATH (scroll-video frame extraction — becomes required
  if your signature moment is a scroll-video); remotion / hyperframes for
  custom video (not integrated yet).

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
| `/award-craft:craft <brief> [@docs] [--brand <path>]` | Build a new landing page from nothing. Asks what you're selling, writes the script if you don't have one, proposes a design plan, waits for your approval on both, then builds it, generates the images, and checks the result on screen. |
| `/award-craft:elevate [path]` | Take a page you already have and make it better. Reads the code, lists what's weak against the Awwwards checklist, you pick what to fix, it fixes and re-checks. |

The four stages below run automatically inside `craft` and `elevate`. Call one
directly when you only want that piece redone.

| Command | What it does |
|---|---|
| `/award-craft:direction` | Decides how the page should look, move, and sound — colors, fonts, spacing, the motion feel, how the writing should read, a rough box-drawing layout per section, and the one moment meant to be memorable. Writes the plan; writes no code. Needs `PRODUCT.md`. |
| `/award-craft:build-recipes` | Writes the actual code from the approved plan, on the fixed stack. Never runs before a plan is approved. |
| `/award-craft:assets <slot>` | Makes the images and video the page needs (hero shot, texture, background loop, product shot) via Higgsfield, and drops them into place. Locks reusable references first (environment, product, recurring prop or person) so the set reads art-directed rather than stock. Needs a `DESIGN.md` with asset slots. |
| `/award-craft:verify` | Screenshots the page on desktop and mobile, grades it against a checklist, fixes what fails, screenshots again. Repeats until it passes. A build that compiled is not done — only a passing screenshot is done. |

## Recommended workflow

### Building a new page

```
/award-craft:craft "<what you're selling>" @script.md --brand ../brand-kit
```

1. **Bring a script if you have one.** Pass it as `@script.md`. Its sections
   become the page sections. No script is fine — it writes one for you
   (`docs/guion.md`) from the interview, and you approve it before any code.
2. **Point at your brand.** `--brand <path>` imports colors, type, and voice as
   local copies. The plugin reads that folder, never writes to it. No brand
   source? It builds one with you.
3. **Answer the intake questions.** Offer, audience, primary CTA, tone in three
   adjectives, references and anti-references, which section is the climax, and
   how much your visitors already know when they land. One at a time. Answer
   honestly — the anti-references matter as much as the references.
   **Say things in your own words, and paste real customer quotes if you have
   them.** Your exact phrasing gets recorded verbatim and reused: headlines
   lifted straight from how customers actually talk beat professionally written
   ones in every test that survived verification.
4. **Review the design plan and the script together. This is the only stop.**
   Colors, motion feel, how the writing should read, the section-by-section
   copy, and the one signature moment — which sits on the story's climax, so
   the page's biggest animation lands on its biggest line. Push back here and
   iterate: changing the plan is cheap, changing a built page is not. On
   approval `DESIGN.md` is written and locked in.
5. **Everything after runs on its own:** code, then images, then the verify
   loop. Watch it screenshot, grade, fix, and re-shoot.
6. **Read the final report.** It flags where the landing drifted from your
   brand source. Drift that turned out well is worth promoting back into the
   brand kit — that's a decision you make and apply yourself.

### Improving a page you already have

```
/award-craft:elevate ./apps/web
```

1. **Next.js only.** Anything else stops at the read step.
2. **Read the gap analysis** — what the page has, what's missing, what's wrong,
   each with a `file:line`. Copy is graded too, not just the visuals.
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
| Rethink the look and voice, keep the structure | `/award-craft:direction`, then `/award-craft:build-recipes` |
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
    │  script (@docs) or written for you + brand source (PRODUCT.md/DESIGN.md,
    │  --brand import, or interview) + comprehension questions, one at a time,
    │  incl. awareness stage and your verbatim wording
    ▼
 design plan + script ══════ GATE — human approval, only one ═══════════════
    │  look, motion, voice, section copy, signature moment on the climax,
    │  video tier menu (priced live) + credit ceiling approved with the plan
    │  DESIGN.md written on approval
    ▼
 build (recipes)
    ▼
 assets
    │  Higgsfield MCP — visual-DNA brief per slot; cost preflight hard-stops
    │  if the ceiling or balance would be exceeded
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
verified — treat it as a starting point, not doctrine. Calibration dials,
layout/copy checks and elevate lever ordering are distilled from
[taste-skill](https://github.com/Leonxlnx/taste-skill) (MIT).

Copy doctrine comes from the same vault: Ogilvy, Schwartz's awareness and
sophistication stages, Wiebe's PAS agitation sequence, Shapiro's hero tests,
Miller's grunt test. Two honest caveats. First, none of it originates after
2021 — copywriting fundamentals move slowly, but current award-site copy
practice is under-represented, and every A/B percentage quoted is a single
self-reported test without published statistics. Second, four sub-topics found
no verifiable doctrine at all and are written down as gaps rather than filled
with invention: LatAm bilingual register (tú/usted, false friends), the
methodology for turning brand adjectives into verbal rules, modern AI-copy-tell
lists, and per-section word budgets. The plugin's "verbal identity" section is
built by analogy with motion identity and labeled as such — a working
structure, not established doctrine.

## Versioning

Semantic versioning — see [CHANGELOG.md](CHANGELOG.md).

| Version | What it added |
|---|---|
| v0.1 | Six skills, the design-plan gate, recipe build, Higgsfield assets, the 12-check verify loop |
| v0.2 | Calibration dials, design read, layout/copy checks 13-18, elevate lever ordering |
| v0.3 | The narrative layer: gated script, verbal identity, copy doctrine, checks 19-21 |
| v0.4 | Art-directed assets: reference elements, shot specs at the gate, model routing, checks 22-23 |
| v0.5 | Credit ceiling approved at the gate; cost preflight with hard stop |
| v0.6 | Video tier menu priced at the gate; ceiling derived from picks |

Scope and NO-goals: [v0.1 design](docs/superpowers/specs/2026-08-06-award-craft-design.md) ·
[v0.2 taste-skill integration](docs/superpowers/specs/2026-08-06-taste-skill-integration.md).

## License

MIT — see [LICENSE](LICENSE).
