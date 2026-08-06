# award-craft v0.1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Claude Code plugin that builds and elevates Awwwards-level landing pages (fixed stack Next.js + Tailwind + GSAP + Lenis) with a mandatory visual verify loop and Higgsfield-MCP-generated assets.

**Architecture:** Six skills in `skills/` (no `commands/` dir — skills ARE the slash commands, per forge-master convention). `craft` and `elevate` are orchestrator entrypoints; `direction`, `build-recipes`, `assets`, `verify` are internal stages also invocable standalone. Doctrine lives in per-skill `references/` distilled from `C:\Obsidian\wiki\Web Design\` (progressive disclosure, token-budgeted). `validate.mjs` is the structural acceptance test, written early so tasks turn it green.

**Tech Stack:** Markdown skills + Node ESM validator (dependency-free). No runtime code — the plugin is instructions + references + templates.

**Precondition for the executing engineer:** read access to `C:\Obsidian\wiki\Web Design\*.md` and `C:\Obsidian\wiki\AI\Higgsfield.md` (distillation sources). Spec: `docs/superpowers/specs/2026-08-06-award-craft-design.md`.

---

### Task 1: Plugin manifests + repo hygiene

**Files:**
- Create: `.claude-plugin/plugin.json`
- Create: `.claude-plugin/marketplace.json`
- Create: `LICENSE`
- Create: `CHANGELOG.md`
- Create: `README.md` (stub; full content in Task 12)

- [ ] **Step 1: Write `.claude-plugin/plugin.json`**

```json
{
  "name": "award-craft",
  "displayName": "Award Craft",
  "version": "0.1.0",
  "description": "Builds and elevates Awwwards-level landing pages on a fixed stack (Next.js + Tailwind + GSAP + Lenis, optional R3F): guided intake with landing script and brand source, approved design plan gate, build from recipes, Higgsfield MCP assets, mandatory visual verify loop.",
  "author": { "name": "Alan Vazquez", "email": "alanvaa.06@gmail.com" },
  "homepage": "https://github.com/alanvaa06/award-craft",
  "repository": "https://github.com/alanvaa06/award-craft",
  "license": "MIT",
  "keywords": ["web-design", "awwwards", "gsap", "lenis", "landing-page", "design-system", "higgsfield", "scrolltrigger"]
}
```

- [ ] **Step 2: Write `.claude-plugin/marketplace.json`**

```json
{
  "name": "award-craft",
  "description": "Award Craft — Awwwards-level landing page builder: guided intake, design-plan gate, recipe-driven build, Higgsfield assets, mandatory visual verify.",
  "owner": { "name": "Alan Vazquez", "email": "alanvaa.06@gmail.com" },
  "plugins": [
    {
      "name": "award-craft",
      "source": "./",
      "description": "Builds and elevates Awwwards-level landing pages with GSAP/Lenis scroll craft, Higgsfield MCP assets, and a quantitative visual verify loop."
    }
  ]
}
```

- [ ] **Step 3: Write `LICENSE`** — MIT license text, copyright `2026 Alan Vazquez` (copy the license body verbatim from `C:\Proyectos\forge-master\LICENSE`, change year/name if needed).

- [ ] **Step 4: Write `CHANGELOG.md`**

```markdown
# Changelog

## [Unreleased]

## [0.1.0] - TBD-in-Task-13
### Added
- Skills: craft, elevate, direction, build-recipes, assets, verify
- References distilled from vault wiki/Web Design
- Templates: PRODUCT.md, DESIGN.md, design-plan
- validate.mjs structural acceptance test
- Golden brief fixture
```

- [ ] **Step 5: Write `README.md` stub**

```markdown
# award-craft

Awwwards-level landing page builder plugin for Claude Code. WIP — see docs/superpowers/specs/.
```

- [ ] **Step 6: Verify manifests parse**

Run: `node -e "JSON.parse(require('fs').readFileSync('.claude-plugin/plugin.json','utf8')); JSON.parse(require('fs').readFileSync('.claude-plugin/marketplace.json','utf8')); console.log('ok')"`
Expected: `ok`

- [ ] **Step 7: Commit**

```bash
git add .claude-plugin LICENSE CHANGELOG.md README.md
git commit -m "feat: plugin manifests, license, changelog"
```

---

### Task 2: validate.mjs — the acceptance test (written red-first)

**Files:**
- Create: `validate.mjs`

The validator encodes the finished v0.1 structure. It MUST fail now (skills don't exist yet) and turn green as Tasks 3–11 land. Adapt the forge-master pattern (`C:\Proyectos\forge-master\validate.mjs`) — same `fail/ok` helpers, same style.

- [ ] **Step 1: Write `validate.mjs`**

```js
// validate.mjs — structural acceptance test for the award-craft plugin.
// Dependency-free Node ESM. Exit 0 = all green, non-zero = failures.
import { readFileSync, existsSync, statSync } from 'node:fs';

let failures = 0;
const fail = (m) => { console.error('FAIL: ' + m); failures++; };
const ok = (m) => console.log('ok:   ' + m);

// 1. plugin.json
const PJ = '.claude-plugin/plugin.json';
try {
  const j = JSON.parse(readFileSync(PJ, 'utf8'));
  if (j.name !== 'award-craft') fail(`${PJ}: name "${j.name}" != "award-craft"`);
  for (const f of ['displayName', 'version', 'description', 'homepage', 'repository', 'license'])
    if (!j[f]) fail(`${PJ}: missing ${f}`);
  if (!failures) ok(`${PJ} valid`);
} catch (e) { fail(`${PJ}: ${e.message}`); }

// 1b. marketplace.json — one root-plugin entry
const MP = '.claude-plugin/marketplace.json';
try {
  const m = JSON.parse(readFileSync(MP, 'utf8'));
  if (m.name !== 'award-craft') fail(`${MP}: bad name`);
  if (!m.owner?.name) fail(`${MP}: missing owner.name`);
  if (!Array.isArray(m.plugins) || m.plugins.length !== 1) fail(`${MP}: must list exactly one plugin`);
  else if (m.plugins[0].source !== './') fail(`${MP}: plugins[0].source must be "./"`);
  ok(`${MP} checked`);
} catch (e) { fail(`${MP}: ${e.message}`); }

if (!existsSync('LICENSE')) fail('LICENSE missing');

// 2. Skills: existence, frontmatter, load-bearing markers, token budget (~4 chars/token)
const SKILL_BUDGET = 20000;   // chars ≈ 5K tokens
const REF_BUDGET = 26000;     // chars ≈ 6.5K tokens
const SKILLS = [
  { path: 'skills/craft/SKILL.md', name: 'craft',
    markers: ['Preflight', 'Intake', 'brand source', 'GATE', 'verify', 'guión'] },
  { path: 'skills/elevate/SKILL.md', name: 'elevate',
    markers: ['Preflight', 'Gap-analysis', 'GATE', 'verify', 'antes/después'] },
  { path: 'skills/direction/SKILL.md', name: 'direction',
    markers: ['two-pass', 'signature moment', 'Drift vs brand source', 'tokens', 'motion identity'] },
  { path: 'skills/build-recipes/SKILL.md', name: 'build-recipes',
    markers: ['Lenis', 'reduced-motion', 'anti-patterns', 'placeholders', 'ratio'] },
  { path: 'skills/assets/SKILL.md', name: 'assets',
    markers: ['Higgsfield', 'DESIGN.md', 'slot', 'WebP', 'naming'] },
  { path: 'skills/verify/SKILL.md', name: 'verify',
    markers: ['screenshot', 'checklist', 'verified_', '3 iterations', 'mobile'] },
];
for (const s of SKILLS) {
  if (!existsSync(s.path)) { fail(`${s.path} missing`); continue; }
  const t = readFileSync(s.path, 'utf8');
  if (!t.startsWith('---')) fail(`${s.path}: missing YAML frontmatter`);
  if (!new RegExp(`^name:\\s*${s.name}\\s*$`, 'm').test(t)) fail(`${s.path}: frontmatter name != ${s.name}`);
  if (!/^description:\s*.+$/m.test(t)) fail(`${s.path}: missing description`);
  if (!/description:.*[Uu]se when/.test(t)) fail(`${s.path}: description must state when to use`);
  for (const mk of s.markers) if (!t.includes(mk)) fail(`${s.path}: missing marker "${mk}"`);
  if (t.length > SKILL_BUDGET) fail(`${s.path}: ${t.length} chars > budget ${SKILL_BUDGET}`);
  ok(`${s.path} checked`);
}

// 3. References: existence + size budget
const REFS = [
  'skills/direction/references/awwwards-rubric.md',
  'skills/direction/references/typography.md',
  'skills/direction/references/motion-system.md',
  'skills/direction/references/trends.md',
  'skills/build-recipes/references/lenis-setup.md',
  'skills/build-recipes/references/scrolltrigger-patterns.md',
  'skills/build-recipes/references/scroll-video.md',
  'skills/build-recipes/references/page-anatomy.md',
  'skills/build-recipes/references/anti-patterns.md',
  'skills/build-recipes/references/r3f.md',
  'skills/assets/references/prompting.md',
  'skills/verify/references/checklist.md',
];
for (const r of REFS) {
  if (!existsSync(r)) { fail(`${r} missing`); continue; }
  const n = statSync(r).size;
  if (n > REF_BUDGET) fail(`${r}: ${n} bytes > budget ${REF_BUDGET}`);
  else ok(`${r} within budget`);
}

// 4. Templates + golden brief
for (const f of ['templates/PRODUCT.md.template', 'templates/DESIGN.md.template',
                 'templates/design-plan.template.md', 'tests/golden-brief.md'])
  if (!existsSync(f)) fail(`${f} missing`); else ok(`${f} exists`);

console.log(failures ? `\n${failures} failure(s)` : '\nALL GREEN');
process.exit(failures ? 1 : 0);
```

- [ ] **Step 2: Run it — must be RED**

Run: `node validate.mjs`
Expected: exit 1, FAIL lines for all 6 skills, 12 references, 3 templates, golden brief. `plugin.json`/`marketplace.json`/LICENSE lines `ok`.

- [ ] **Step 3: Commit**

```bash
git add validate.mjs
git commit -m "test: structural acceptance validator (red — plugin content pending)"
```

---

### Task 3: Skill `direction` (SKILL.md)

**Files:**
- Create: `skills/direction/SKILL.md`

- [ ] **Step 1: Write `skills/direction/SKILL.md`** — complete content:

```markdown
---
name: direction
description: Produce the Pass-1 design plan for an Awwwards-level landing — tokens, motion identity, art direction, ASCII wireframe per script section, ONE signature moment, and explicit drift vs brand source. Use when craft/elevate invoke it, or standalone to (re)generate a design plan before any code. Requires PRODUCT.md (and optionally an imported brand DESIGN.md) to exist.
---

# Direction — two-pass design plan

You are an opinionated design lead at a boutique studio. NO CODE in this skill —
plan first, critique, then hand off. Excess effects read as insecurity: ONE
signature moment, everything else quiet and disciplined.

## Inputs
- `PRODUCT.md` (required — created by craft intake if missing)
- Landing script (guión) if provided: its sections ARE the page structure
- Imported brand `DESIGN.md`/`PRODUCT.md` (see Drift rules)
- References (load on demand): `references/awwwards-rubric.md` (scoring + page
  anatomy + contender checklist), `references/typography.md`,
  `references/motion-system.md`, `references/trends.md`

## Pass 1 — the design plan (before ANY code)
Produce `docs/design-plan.md` in the target repo with exactly these sections:

1. **Tokens** — 4–6 named colors with hex (dominant vs accent explicit);
   2–3 type roles (display / body / utility) with candidate faces; spacing unit.
2. **Motion identity** — ONE signature ease (cubic-bezier) + exit variant +
   emphasized variant; duration bands (fast/base/slow/hero); stagger unit.
   Choose 3 adjectives first, derive curves from them (see motion-system.md).
3. **Art direction** — medium, lighting recipe, grade, texture, mood; explicit
   anti-references (what this must NOT look like).
4. **Wireframe** — ASCII wireframe per script section, in script order. If no
   script: preloader → hero → 2-4 body chapters → interactive footer
   (anatomy in awwwards-rubric.md).
5. **Signature moment** — ONE unique, memorable device, tied to the script's
   climax section, justified against the brief. Name the technique
   (pin+scrub chapter / mask cursor / kinetic hero / scroll-video / R3F object).
6. **Drift vs brand source** — see below. Empty section allowed only when no
   brand source exists.
7. **Asset slots** — every media slot with ratio + treatment (see assets skill).

## Drift rules (when a brand source was imported)
- Core identity INHERITS, never silently changes: palette, typography families,
  voice/tone, anti-references.
- Landing-specific MAY drift: signature moment, per-section tokens, motion
  timings, one accent color.
- EVERY drift gets a line under "Drift vs brand source": what changed, why.
  The human approves drift consciously at the gate — never by accident.

## Pass 2 — self-critique, then gate
Before presenting: test the plan against the brief; kill anything that reads as
a generic default (Inter, purple gradients, three-card rows, centered symmetric
hero). Check one aesthetic risk exists and surroundings are quiet.
Then STOP and present the plan for human approval. On approval, write
`DESIGN.md` in the target repo from `templates/DESIGN.md.template`. Do not
proceed to build yourself — the orchestrator does.
```

- [ ] **Step 2: Run validator — direction lines turn green**

Run: `node validate.mjs 2>&1 | grep -E "direction/SKILL"`
Expected: `ok:   skills/direction/SKILL.md checked`

- [ ] **Step 3: Commit**

```bash
git add skills/direction/SKILL.md
git commit -m "feat: direction skill — two-pass design plan with drift rules"
```

---

### Task 4: References for `direction` (4 files, distilled from vault wiki)

**Files:**
- Create: `skills/direction/references/awwwards-rubric.md`
- Create: `skills/direction/references/typography.md`
- Create: `skills/direction/references/motion-system.md`
- Create: `skills/direction/references/trends.md`

Each file distills a named vault source. Carry over the listed items **with their concrete numbers and tables** — these are lookup docs for an agent mid-build, not essays. No `[[wikilinks]]` (they don't resolve outside the vault). Stay under 26,000 chars each.

- [ ] **Step 1: Write `awwwards-rubric.md`** — Source: `C:\Obsidian\wiki\Web Design\Awwwards Landing Page Patterns.md`. Must include: the 40/30/20/10 table with what jurors look at; 18-juror + 3-outlier-discard mechanism and its implication (polarizing work loses); thresholds (HM ≥6.5, Dev Award >7.0); the performance envelope table (award targets vs industry); the full page anatomy (preloader / hero / transitions / overlay menu / body / footer with the working recipes); the 12-point contender checklist verbatim; the winners table (By-Kin, Mat Voyce, Iventions, etc. with techniques).
- [ ] **Step 2: Write `typography.md`** — Source: same article §5 + `Premium Motion Design Principles.md` §7. Must include: pairing pattern (display + grotesque + mono third voice); scale doctrine (8–18vw clamp hero, 16–18px body, 4–6 steps, deliberate jump); display details (tracking −0.02/−0.04em, leading 0.9–1.05); SplitText lines/words/chars table with costs and the canonical recipe (`yPercent: 100→0, stagger 0.02–0.04, power4.out, 0.8–1.2s`); variable-font caveat (main-thread, small areas only).
- [ ] **Step 3: Write `motion-system.md`** — Source: `Premium Motion Design Principles.md` §§1–4. Must include: ease-out default / ease-in banned / linear-only-for-scrub rules; the full bezier vocabulary table (all 6 curves with values); duration tiers table (100–300 / 300–500 / 400–800 / 800–1500ms) + the two quantitative rules (~100ms per 10% viewport; complexity scaling) + enter-slower-than-exit; stagger doctrine (30–80ms, cap total via `{amount}`, direction has meaning, overlap `"-=0.3"`); the 5-component motion identity (adjectives-first) and token encoding (`--ease-out-brand`, `gsap.defaults`).
- [ ] **Step 4: Write `trends.md`** — Source: `Awwwards Landing Page Patterns.md` §4 (trends table) + §6 (media as narrative). Must include: the 9-trend table with working recipes (kinetic type, broken grids, dark luxury with the murky-glass caveat, tactile brutalism, WebGL-as-atmosphere, custom cursor specs with lerp 0.1–0.15, micro-interactions, feTurbulence grain 15–30%, glass blur 5–15px one-or-two-per-view); the media-as-narrative rules (scroll-driven film, hover-preview grammar, shader-mediated imagery, no stock).
- [ ] **Step 5: Validate + commit**

Run: `node validate.mjs 2>&1 | grep -E "direction/references"`
Expected: 4 × `ok ... within budget`

```bash
git add skills/direction/references
git commit -m "feat: direction references — rubric, typography, motion system, trends"
```

---

### Task 5: Skill `build-recipes` (SKILL.md)

**Files:**
- Create: `skills/build-recipes/SKILL.md`

- [ ] **Step 1: Write `skills/build-recipes/SKILL.md`** — complete content:

```markdown
---
name: build-recipes
description: Build the landing from the approved DESIGN.md and design plan on the fixed stack (Next.js + Tailwind + GSAP + Lenis, optional R3F). Use when craft/elevate invoke it after the design-plan gate, or standalone to rebuild a section. Never use before a design plan is approved.
---

# Build recipes — fixed-stack construction

Stack is FIXED: Next.js (App Router) + Tailwind + GSAP + Lenis. R3F only if the
approved design plan names a 3D signature. gsap-skills (installed separately)
owns API correctness — consult it for GSAP syntax. This skill owns WHICH
pattern goes WHERE and the site-level wiring.

## Order of construction
1. Scaffold: `create-next-app` (TS, Tailwind, App Router, src/). Install
   `gsap lenis`. No other animation libs.
2. Global wiring FIRST (references/lenis-setup.md): Lenis on GSAP ticker,
   `lagSmoothing(0)`, single RAF loop. `html { scroll-behavior: auto !important }`.
3. Tokens: DESIGN.md palette/type/spacing → Tailwind theme + CSS custom
   properties (`--ease-out-brand`, `--dur-base`...). `gsap.defaults({ease, duration})`.
4. Sections in SCRIPT ORDER, one at a time. Per section pick the pattern from
   references/page-anatomy.md + references/scrolltrigger-patterns.md. Consult
   references/anti-patterns.md BEFORE writing each ScrollTrigger.
5. Asset placeholders: every media slot renders a placeholder at the EXACT
   ratio from the design plan (`aspect-[16/9]` etc.) with the slot name visible
   — layout must never reflow when real assets land.
6. `prefers-reduced-motion` from the START, not retrofit: every ScrollTrigger
   created inside `gsap.matchMedia()` with a reduce context (opacity-only,
   no pin, no scrub, no parallax). Content NEVER gated behind animation —
   no `opacity: 0` initial states in CSS; set from JS.
7. Signature moment LAST, with the most care. Budget: 1–2 pinned sequences per
   page max, runway 1.5–3 viewport-heights per chapter.

## Hard rules (from verified doctrine)
- Scrub OR toggleActions per trigger, never both. Scrub 0.5–1.5 for
  storytelling; `scrub: true` only for frame-accurate (sequences, progress).
- Pace = runway (`end`), never `duration`, on scrubbed timelines.
- Never a ScrollTrigger on a tween nested in a timeline. Never animate the pin
  target (pin wrapper, animate children). Pinned triggers in document order.
- Horizontal containers + parallax: `ease: "none"` mandatory.
- Function-based start/end + `invalidateOnRefresh: true` for anything
  size-dependent. All triggers inside `gsap.matchMedia()` contexts.
- Continuous/scroll-linked animation: `transform` + `opacity` ONLY.
- Mobile (≤768px) gets a DESIGNED simpler choreography, not degraded desktop.
```

- [ ] **Step 2: Validate + commit**

Run: `node validate.mjs 2>&1 | grep "build-recipes/SKILL"`
Expected: `ok:   skills/build-recipes/SKILL.md checked`

```bash
git add skills/build-recipes/SKILL.md
git commit -m "feat: build-recipes skill — fixed-stack construction order and hard rules"
```

---

### Task 6: References for `build-recipes` (6 files)

**Files:**
- Create: `skills/build-recipes/references/lenis-setup.md`
- Create: `skills/build-recipes/references/scrolltrigger-patterns.md`
- Create: `skills/build-recipes/references/scroll-video.md`
- Create: `skills/build-recipes/references/page-anatomy.md`
- Create: `skills/build-recipes/references/anti-patterns.md`
- Create: `skills/build-recipes/references/r3f.md`

Distill with code blocks copied **verbatim** from the named wiki sources (they are already correct, verified code). Budget 26,000 chars each.

- [ ] **Step 1: Write `lenis-setup.md`** — Source: `GSAP ScrollTrigger Doctrine.md` §5. Must include: the canonical Lenis+GSAP snippet verbatim (ticker, `lagSmoothing(0)`, `ScrollTrigger.update` listener) with the why-each-line notes; Next.js placement (client component mounted in root layout); caveats (`data-lenis-prevent`, `lenis.scrollTo`, touch smoothing off by default, `normalizeScroll` note); pinType symptom table (jitter→fixed, no-stick→transform); `will-change` breaks `position:fixed` warning.
- [ ] **Step 2: Write `scrolltrigger-patterns.md`** — Source: `GSAP ScrollTrigger Doctrine.md` §§1–3, 6–8, 11. Must include, each with its verbatim code block: toggleActions reveal (+ `once: true` note); scrubbed pinned timeline (storytelling, labels, snap config); `ScrollTrigger.batch()` grid reveal; horizontal scroll + `containerAnimation` (with its limitations list); multilayer parallax (`data-speed` loop + overflow-mask hero variant + clamp() note); `gsap.matchMedia()` responsive + reduced-motion pattern; production patterns A–D (hero lock-and-transform, storytelling chapters, image sequence pointer to scroll-video.md, section stack with `pinSpacing: false`).
- [ ] **Step 3: Write `scroll-video.md`** — Source: `Scroll-Driven Video Landing Pages.md`. Must include: the decision matrix table (4 techniques); the production canvas implementation verbatim (cover-fit render, `createImageBitmap` preload, `scrub: 0.5`, `snap: "frame"`, DPR cap 2); ffmpeg recipes verbatim (WebP 15fps desktop + 12fps mobile sets; `-g 2` MP4 + VP9 WebM scrub encodes); per-browser reality table (Android fails, Safari best, Firefox needs VP9); memory math (~8.3MB/frame decoded) + loading strategies (eager/priority-window/scroll-aware); CWV notes (poster LCP, reserved CLS, allocation-free INP).
- [ ] **Step 4: Write `page-anatomy.md`** — Source: `Awwwards Landing Page Patterns.md` §3. Must include per-section working recipes: preloader (counter/typographic/curtain, sessionStorage once, honest loading, 1.5–2.5s cap, continuous timeline into hero); hero (type-first 10–18vw clamp, masked line staggers 0.03–0.08s, media scale 1.1–1.3→1, minimal scroll cue); overlay menu (oversized staggered links, hover previews, choreographed close); body (scroll narrative, broken-but-systematic grid); footer (giant CTA, fixed-reveal pattern, live details); page transitions (one easing signature across cut; View Transitions vs GSAP/Barba decision rule from `Premium Motion Design Principles.md` §8).
- [ ] **Step 5: Write `anti-patterns.md`** — Source: `GSAP ScrollTrigger Doctrine.md` §10 checklist verbatim + `Premium Motion Design Principles.md` §10 gate (6 questions) + the impeccable-covered items marked "impeccable lints this — don't duplicate, just don't do it" (Inter/Arial, gray-on-color, pure black, nested cards, bounce easing).
- [ ] **Step 6: Write `r3f.md`** — Source: `WebGL and React Three Fiber Doctrine.md` entire. Must include: the unverified-status warning from the article header; refs-not-state rule; uniforms memoization trap; damp-vs-timeline table; drei ScrollControls pattern (`tl.seek(scroll.offset * duration)`, pages−1 duration, `enableZoom: false`); scroll-velocity uniform (×0.005) + 16×16 subdivision; module-level texture preload + time-sliced mounts; "atmosphere not spectacle" posture + fallbacks.
- [ ] **Step 7: Validate + commit**

Run: `node validate.mjs 2>&1 | grep "build-recipes/references"`
Expected: 6 × `ok ... within budget`

```bash
git add skills/build-recipes/references
git commit -m "feat: build-recipes references — six distilled pattern docs"
```

---

### Task 7: Skill `assets` + prompting reference

**Files:**
- Create: `skills/assets/SKILL.md`
- Create: `skills/assets/references/prompting.md`

- [ ] **Step 1: Write `skills/assets/SKILL.md`** — complete content:

```markdown
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
Premium vocabulary and slot-negative-space phrasing: references/prompting.md.

## Slot map (ratios are contract — layout never reflows)
| Slot | Ratio | Notes |
|---|---|---|
| hero desktop | 16:9 (21:9 if plan says ultrawide) | ≥1920px; upscale if needed |
| hero mobile | 9:16 | SEPARATE composition, never a crop |
| section divider | 21:9 / 8:1 | outpaint from a 16:9 master |
| card / feature | 3:2 | consistent across the whole grid |
| portrait | 4:5 | editorial standard |
| bg loop | 16:9 video 6–10s | muted, no audio track, seamless |

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
```

- [ ] **Step 2: Write `skills/assets/references/prompting.md`** — Source: `AI Media Prompting for Web.md` + `C:\Obsidian\wiki\AI\Higgsfield.md`. Must include: universal prompt skeleton; premium vocabulary lists (medium/lighting recipes/lens/imperfection/restraint/materiality); negative-space phrasing examples for UI slots; texture/gradient ingredient list with "subtle, minimal, grain" rules; seamless-loop technique ranking (first=last frame, cyclical motion, static camera, crossfade fallback, subject whitelist); anti-uncanny UGC rules (in case testimonial slots appear); consistency ranking (references > locked template > seeds-are-useless-across-concepts); Higgsfield specifics (Soul ID = train-once reference_id for recurring humans; `hero_banner` product-photoshoot mode; UGC modes table).
- [ ] **Step 3: Validate + commit**

Run: `node validate.mjs 2>&1 | grep -E "assets/"`
Expected: `ok` for SKILL and prompting.md

```bash
git add skills/assets
git commit -m "feat: assets skill — Higgsfield MCP pipeline with slot contract"
```

---

### Task 8: Skill `verify` + checklist reference

**Files:**
- Create: `skills/verify/SKILL.md`
- Create: `skills/verify/references/checklist.md`

- [ ] **Step 1: Write `skills/verify/SKILL.md`** — complete content:

```markdown
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
4. Critique each screenshot against references/checklist.md — enumerate
   concrete deltas, no vibes. Code checks (grep items) run once per pass.
5. Fix findings. Re-shoot affected screenshots.
6. A screenshot that passes is renamed with the `verified_` prefix. Loop until
   the whole set carries the prefix, then run ONE final confirmation pass.
7. Max 3 iterations per issue. Non-converging issues go to the report as
   pending — never loop infinitely, never silently drop.
8. Output: verify report — checks passed/failed, pending issues, screenshot
   inventory, score against the Awwwards anatomy checklist
   (direction/references/awwwards-rubric.md).

## Reduced-motion pass (mandatory)
Emulate prefers-reduced-motion; screenshot the same set. Full content must be
visible and usable with no pin, no scrub, no parallax.
```

- [ ] **Step 2: Write `skills/verify/references/checklist.md`** — the 12 technical checks from the spec §8, each with its concrete verification method:

```markdown
# Verify checklist — quantitative, not opinable

Code checks (grep/read once per pass):
1. `prefers-reduced-motion` variant exists (`matchMedia` reduce context in
   every animation file) AND renders full content (screenshot pass below).
2. Continuous/scroll-linked animations touch only transform/opacity:
   grep tweens for `width|height|top:|left:|margin|padding|fontSize` — zero hits
   in scrubbed/looping tweens.
3. `containerAnimation` sources and parallax tweens have `ease: "none"`;
   storytelling scrubs are numeric 0.5–1.5 (not `true`).
4. No `markers: true` anywhere. No global `will-change` in CSS.
5. Pinned ScrollTriggers appear in document order in each file (or carry
   `refreshPriority`).
6. Staggers: every stagger over 10+ items uses `{amount}` cap; durations fall
   inside the design plan's bands.
7. Colors in code ⊆ DESIGN.md palette (grep hex values); font families ⊆
   DESIGN.md faces.

Screenshot checks (per set):
8. Signature moment from the design plan exists and animates.
9. Asset slots: rendered ratio matches the slot contract; file weights within
   budget (image <500KB, loop <4MB — check /public/media sizes).
10. Mobile 375px reads as designed choreography (its own layout decisions,
    not overflowed desktop).
11. Text over media meets WCAG AA contrast (spot-check hero + footer CTA).
12. Score the page against the 12-point Awwwards anatomy checklist
    (direction/references/awwwards-rubric.md) — report N/12 with one line each.
```

- [ ] **Step 3: Validate + commit**

Run: `node validate.mjs 2>&1 | grep -E "verify/"`
Expected: `ok` for both files

```bash
git add skills/verify
git commit -m "feat: verify skill — screenshot loop with quantitative checklist"
```

---

### Task 9: Templates (3 files)

**Files:**
- Create: `templates/PRODUCT.md.template`
- Create: `templates/DESIGN.md.template`
- Create: `templates/design-plan.template.md`

- [ ] **Step 1: Write `templates/PRODUCT.md.template`**

```markdown
---
source: {{brand_source_path | "created by award-craft intake"}}
imported: {{date}}
---
# PRODUCT — {{project}}

## Oferta
{{qué vende / qué resuelve, 2-4 líneas}}

## Audiencia
{{quién compra, qué le importa, nivel de sofisticación}}

## CTA principal
{{la única acción que la página debe lograr}}

## Tono
{{3 adjetivos}}

## Referencias visuales
{{sitios/estéticas a acercarse}}

## Anti-referencias
{{lo que NO debe parecer — incluye siempre: plantilla genérica SaaS,
stock photography, Inter + gradiente morado}}

## Guión
{{ruta al guión del landing si existe; si no, "sin guión — anatomía estándar"}}
```

- [ ] **Step 2: Write `templates/DESIGN.md.template`**

```markdown
---
source: {{brand_source_path | "created by award-craft direction"}}
imported: {{date}}
approved: {{date_gate}}
---
# DESIGN — {{project}}

## Palette
{{4-6 named colors: `--name: #hex` — mark dominant vs accent}}

## Typography
{{display face / body face / utility-mono face; scale: hero clamp() +
body px + steps}}

## Motion identity
- Signature ease: `cubic-bezier({{...}})`  (adjectives: {{a, b, c}})
- Exit ease: {{...}} · Emphasized: {{...}}
- Durations: fast {{0.2s}} / base {{0.4s}} / slow {{0.8s}} / hero {{1.2s}}
- Stagger unit: {{0.05s}}

## Art direction
Medium / Lighting / Grade / Texture / Mood / Never-list

## Asset slots
| slot | ratio | treatment | file |
|---|---|---|---|
{{one row per media slot}}

## Drift vs brand source
{{inherited core: palette, type, voice, anti-refs — list each drift + reason,
or "sin drift"}}
```

- [ ] **Step 3: Write `templates/design-plan.template.md`** — headers matching direction SKILL Pass-1 exactly: `## Tokens`, `## Motion identity`, `## Art direction`, `## Wireframe`, `## Signature moment`, `## Drift vs brand source`, `## Asset slots`, each with one-line instruction comment `<!-- ... -->` describing required content (copy the requirement text from `skills/direction/SKILL.md` Pass-1 items 1–7).

- [ ] **Step 4: Validate + commit**

Run: `node validate.mjs 2>&1 | grep templates`
Expected: 3 × `ok ... exists`

```bash
git add templates
git commit -m "feat: PRODUCT/DESIGN/design-plan templates"
```

---

### Task 10: Entrypoint skills `craft` and `elevate`

**Files:**
- Create: `skills/craft/SKILL.md`
- Create: `skills/elevate/SKILL.md`

- [ ] **Step 1: Write `skills/craft/SKILL.md`** — complete content:

```markdown
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
  MCP tools reachable.
- OPTIONAL (warn only): remotion/hyperframes skills (custom video — out of
  scope v0.1), ffmpeg on PATH (scroll-video frames).

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
holes. Write PRODUCT.md from templates/PRODUCT.md.template.
If script and brand source contradict: surface it, propose a resolution,
let the gate decide.

## 2. Design plan → GATE
Invoke skill `direction`. Present the plan. ═══ STOP for human approval ═══
Iterate on feedback. On approval: DESIGN.md written; proceed.

## 3. Build
Invoke skill `build-recipes` with DESIGN.md + design plan + script.

## 4. Assets
Invoke skill `assets` for every slot in the design plan. If blocked
(preflight), leave placeholders and mark in report.

## 5. Verify
Invoke skill `verify`. Mandatory — an unverified build is not done.

## 6. Final report
What was built (per section); verify score + pending; assets per slot;
drift applied; retro-sync suggestions (drift worth promoting to the brand
source — the human decides and executes; this plugin never writes there).
```

- [ ] **Step 2: Write `skills/elevate/SKILL.md`** — complete content:

```markdown
---
name: elevate
description: Elevate an existing landing page toward Awwwards level — read the project, gap-analysis against the anatomy checklist, prioritized plan gate, apply approved items, mandatory verify. Use when the user wants an existing page improved ("/award-craft:elevate [path]"). Not for building from scratch (use craft).
---

# Elevate — orchestrator

## 0. Preflight — identical to craft (see skills/craft/SKILL.md §0).

## 1. Read the project
Stack (confirm Next.js — if not, report that v0.1 only supports the fixed
stack and stop); sections; existing animations (GSAP? Lenis? CSS?); existing
DESIGN.md/PRODUCT.md or brand source (same resolution as craft §1).

## 2. Gap-analysis
Score the current page against the Awwwards anatomy checklist
(skills/direction/references/awwwards-rubric.md) + run impeccable's audit.
Output: what it has / what is missing / what is wrong (with file:line refs).

## 3. Elevation plan → GATE
Prioritized items (impact vs effort), each: what changes, which recipe
applies, expected checklist deltas. ═══ STOP: human picks items ═══

## 4. Apply approved items using skills/build-recipes (same rules).

## 5. Verify — invoke skill verify. Mandatory.

## 6. Report: antes/después — checklist score before vs after, screenshots
side by side, remaining gaps for a future pass.
```

- [ ] **Step 3: Validate + commit**

Run: `node validate.mjs 2>&1 | grep -E "craft/|elevate/"`
Expected: `ok` both

```bash
git add skills/craft skills/elevate
git commit -m "feat: craft and elevate orchestrator skills"
```

---

### Task 11: Golden brief fixture

**Files:**
- Create: `tests/golden-brief.md`

- [ ] **Step 1: Write `tests/golden-brief.md`**

```markdown
# Golden brief — regression fixture for /award-craft:craft

Run craft with EXACTLY this input in a throwaway repo before each release.
Pass = design plan contains all 7 sections, one signature moment tied to the
climax, and (if executed through build) the 12 verify checks pass.

## Brief
Landing para "Cumbre" — café de especialidad mexicano de altura, venta
directa a consumidor, suscripción mensual.

## Producto
Café de especialidad de Veracruz (1,400+ msnm), tueste propio semanal,
suscripción 250g/500g. Diferenciador: trazabilidad por productor.

## Audiencia
Urbanos 28-45, ya compran café de especialidad, valoran origen y diseño.

## CTA principal
Iniciar suscripción.

## Tono
Cálido, preciso, orgulloso.

## Referencias
Editorial, dark-luxury con acentos tierra; fotografía macro de textura.

## Anti-referencias
E-commerce genérico, verde-café cliché, stock de baristas sonriendo.

## Guión (secciones)
1. Hero — "Café que creció más alto que la niebla" (clímax candidato: no)
2. Origen — mapa/altura, productor con nombre (scroll narrative)
3. Proceso — tueste semanal, macro textura (CLÍMAX — signature moment aquí)
4. Suscripción — planes 250g/500g (CTA)
5. Footer — contacto + IG
```

- [ ] **Step 2: Validate + commit**

Run: `node validate.mjs 2>&1 | grep golden`
Expected: `ok:   tests/golden-brief.md exists`

```bash
git add tests/golden-brief.md
git commit -m "test: golden brief regression fixture"
```

---

### Task 12: README (full)

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Rewrite `README.md`** — sections: What it is (2 lines); Requirements (Claude Code, gsap-skills, impeccable, Higgsfield MCP, optional ffmpeg); Install (`/plugin marketplace add alanvaa06/award-craft` + local dev instructions); Commands table (the 4 user-facing invocations `/award-craft:craft|elevate|verify|assets` with one-line descriptions from each SKILL frontmatter); The flow (compact craft diagram: preflight → intake → design plan GATE → build → assets → verify → report); Doctrine sources (one line: distilled from a private research vault; claims adversarially verified where marked); Versioning (semver, CHANGELOG). Keep under 120 lines.

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: full README"
```

---

### Task 13: Release v0.1.0

**Files:**
- Modify: `CHANGELOG.md`

- [ ] **Step 1: Full validation — must be ALL GREEN**

Run: `node validate.mjs`
Expected: exit 0, final line `ALL GREEN`. If any FAIL, fix before proceeding.

- [ ] **Step 2: Manual smoke** — in a Claude Code session with the plugin loaded locally, confirm `/award-craft:craft` triggers the craft skill (preflight output appears) and `/award-craft:verify` triggers verify. No full run needed — triggering only.

- [ ] **Step 3: Stamp CHANGELOG** — replace `TBD-in-Task-13` with today's date.

- [ ] **Step 4: Commit + tag**

```bash
git add CHANGELOG.md
git commit -m "chore: release v0.1.0"
git tag v0.1.0
```

---

## Post-v0.1 (NOT in this plan — spec §11 NO-goals)

Dogfood: (1) `/craft` on tu-tribu with its guión + brand source; (2) `/elevate` on alanvaa. Findings feed v0.2 without redefining plan defaults unless Alan decides explicitly.
