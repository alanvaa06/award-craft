# Awwwards Rubric

Lookup reference for the `direction` skill: the scoring mechanics, performance
envelope, page anatomy, and contender checklist that a design plan must satisfy
to be Awwwards/FWA/CSSDA-competitive. Source: Awwwards official evaluation page,
distilled 2025–2026.

## 1. The Scoring Rubric

Every submission is scored on a 10-point scale across four weighted criteria:

| Criterion | Weight | What jurors look at |
|---|---|---|
| **Design** | **40%** | Visual hierarchy, typography quality, color, micro-detail, consistency across *all* pages |
| **Usability** | **30%** | Navigation clarity, load performance, responsive behavior, accessibility, Core Web Vitals |
| **Creativity** | **20%** | Custom interaction patterns, 3D/immersive elements, sound design, concept |
| **Content** | **10%** | Real content (no lorem ipsum), copy quality, genuine photography, multilingual |

Design + Usability = **70% of the score**. Creativity is the tiebreaker, not the
foundation.

## 2. The Jury Mechanism

- Each approved submission goes to a **minimum of 18 jury members**.
- The **3 scores furthest from the average are automatically discarded**
  (outlier-trimming).
- Implication: this structurally penalizes **polarizing work** — a design a few
  jurors love but most find divisive cannot be rescued by its enthusiasts. Broad
  craft consensus wins over a daring-but-divisive swing.

## 3. Thresholds and Process

- **Honorable Mention**: ≥ 6.5 jury score.
- **Site of the Day (SOTD)**: highest-scoring of the voting window (exact
  threshold undisclosed).
- **Developer Award**: SOTD winners are re-evaluated by a *separate developer
  jury* against Developer Guidelines; score **> 7.0** earns it. Code quality is
  scored independently of Design/Usability/Creativity/Content — several recent
  winners took both awards.
- **Voting window**: 5 days, but a site can win early with a high jury score
  plus ≥10 validated PRO votes.
- **Selectivity**: ~15,000 submissions/year, fewer than 365 SOTD wins →
  **sub-2.5% SOTD rate**. Submission fee ≈ $75.

## 4. The Performance Envelope

What the Developer Award actually tests, and how far the target sits above
industry norms:

| Metric | Award target | Industry average |
|---|---|---|
| LCP | < 1.5s | 2.5–4s |
| CLS | < 0.05 | 0.1–0.25 |
| INP | < 100ms | 200–500ms |
| Page weight | < 3 MB | 5–10 MB |
| Animation | 60fps sustained under throttling | 30–45fps |

Custom code is the **baseline expectation, not a differentiator**. Jurors test
on mid-range hardware with CPU throttling.

## 5. Page Anatomy — Working Recipes

The recurring structural skeleton across 2025–2026 winners.

**Preloader** — the first branded moment, not a spinner. Patterns: 0–100
counter in the display typeface; typographic scramble that doubles as a type
showcase; curtain exit that wipes away with a heavy `expo.out` ease. The
preloader exit and hero intro are **one continuous timeline**, never two
disconnected events. Discipline: once per session (sessionStorage), real assets
loading behind it, capped at ~1.5–2.5s perceived.

**Hero** — type-first dominates. Viewport-scaled display type
(`clamp()`-driven, 10–18vw) carries the brand instead of a stock image;
lines/words/chars split and masked in with 0.03–0.08s staggers, media scaling
1.1–1.3 → 1 behind. WebGL variants use one 3D object or shader plane as
atmosphere. Scroll cue is minimal — a line or micro-copy; winners rely on
curiosity, not arrows.

**Page transitions** — curtain wipes, shared-element morphs (a clicked
thumbnail becomes the next page's hero), WebGL crossfades. Transitions must be
directional elements between states, not decorative cuts. Outgoing and
incoming motion share one easing signature so the cut reads as a single
gesture.

**Overlay menu** — fullscreen, oversized nav links in the display face,
staggered line-mask entrances, hover previews that follow the cursor,
secondary column (socials, office time), and a choreographed close. The menu
button itself is a micro-interaction showcase.

**Body sections** — scroll as narrative structure, not merely a reveal
trigger: pinned sections with scrub, horizontal galleries inside a vertical
page, sticky media swapping as text columns pass. Broken/asymmetric grids: a
real 12-col grid deliberately violated with consistent violation rules, so the
page reads designed rather than templated.

**Interactive footer** — treated as a destination. Giant CTA typography at
viewport scale with hover distortion, reveal patterns (footer fixed behind the
page, uncovered as the last section scrolls away), live details (studio local
time, marquee, magnetic socials). It restates the motion signature one final
time.

## 6. Awwwards Anatomy Checklist

1. Preloader: branded, honest, one continuous timeline into the hero, once per session.
2. Hero: viewport-scale kinetic type with masked staggered line reveals; optional single WebGL atmosphere element.
3. One signature interaction the site is remembered by — everything else restrained.
4. Motion system: one signature ease + 2 support curves, tokenized durations, consistent stagger direction, real `prefers-reduced-motion` variant.
5. Overlay menu: oversized staggered links, hover previews, choreographed close.
6. Scroll narrative pacing real content; broken-but-systematic grid.
7. Custom cursor: lerped, state-aware, blend-mode aware, off on touch.
8. Texture: grain 15–30%, selective glass, engineered dark contrast.
9. Typography: distinctive display + neutral grotesque + mono labels; extreme scale gap; negative tracking; coherence on every page.
10. Media: art-directed, shader-distorted or scroll-scrubbed — never decorative stock.
11. Interactive footer as destination.
12. 60fps throttled, LCP < 1.5s, CLS < 0.05, INP < 100ms.

## 7. Recent Winners and Their Techniques

| Site | Awards | Signature technique |
|---|---|---|
| **Bruno Simon portfolio (2025)** | Site of the Month, Jan 2026 | Drivable-vehicle 3D world in Three.js + spatialized audio — the reference for playable-world portfolios |
| **By-Kin** | SOTD + Dev Award + FWA + CSSDA | Next.js + GSAP, editorial typography-first — proof a type-driven site sweeps all three awards |
| **Iventions** | SOTD + Dev Award + CSSDA, SOTY finalist | Three.js lighting treating each project as a spotlit installation — "WebGL for atmosphere, not spectacle" |
| **Mat Voyce** | SOTD, GSAP SOTY nominee | Pure kinetic typography, GSAP timeline letter animation, zero 3D |
| **Uncommon Studio** | SOTD + Dev Award + FWA | GSAP page transitions, strict grid, performance discipline |
| **Springs (Vide Infra)** | SOTD + Dev Award, Mar 2026 | Fluid WebGL soft-body/spring visuals as brand device |
| **Hubtown (Unseen Studio)** | SOTD, Jun 2026 | Corporate site built around a single 3D monolith — one hero object *is* the concept |
| **Furrow Studio** | Awwwards-featured | Mask-cursor: the cursor as a circular reveal window |

Cross-cutting: Next.js recurs across winners; every one pairs exactly one
memorable concept with disciplined execution; several took the Developer
Award, confirming code quality is a separate, winnable axis.

## 8. Strategic Reading

- **One signature moment beats ten scattered effects.** Winners are remembered
  for a single unforgettable interaction; effect overload reads as insecurity.
- **Art direction must survive a screenshot.** Static frames must demonstrate
  intentional design independent of animation — motion cannot mask weak
  aesthetics.
- **Performance is the invisible half.** Jurors test on mid-range hardware with
  CPU throttling.
- **Real content from day one.** The 10% Content weight is small, but
  placeholder copy and stock-photo sameness bleed into the Design score.
- **Cross-device parity**: the mobile experience must be *designed*, not
  merely responsive. Studios ship a distinct, simpler touch-first choreography
  rather than degraded desktop effects.

**Failure patterns**: recognizable page-builder foundations (WordPress themes,
Webflow defaults), desktop-first with responsive bolted on, 5s+ loads,
inconsistent systems between pages, no memorable moment.

**Budget reality**: SOTD-ready work runs $60K–$120K over 12–18 weeks;
entry-tier (CSSDA WOTD / Honorable Mention) $30K–$60K over 8–12 weeks; SOTM
contenders $120K–$200K+ over 18–24 weeks. Rushed polish is visible and
punished.

The Japanese-studio phenomenon (mount inc., SHIFTBRAIN, JUNNI, Utsubo) wins
disproportionately by applying *ma* — intentional negative space — plus
pixel-level micro-detail and technical restraint. Doing less, better.
