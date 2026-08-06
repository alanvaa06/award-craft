# Typography

Lookup reference for the `direction` skill: type pairing doctrine, scale rules,
and premium text-animation recipes. Sources: Awwwards Landing Page Patterns §5
(Typography) + Premium Motion Design Principles §7 (Premium Text Animation).

## 1. Pairing

Three-voice system, not a two-font pair:

- **Expressive display face** — high-contrast serif, condensed grotesque, or a
  modified custom face. Carries the brand at hero scale.
- **Neutral workhorse grotesque** — UI and body copy. Recedes so the display
  face reads as the personality.
- **Mono as a third voice** — labels, indices, metadata. Signals technical
  precision and structure (rulers, indices, section numbers).

Custom or licensed distinctive faces are near-mandatory at the top;
recognizable free-font defaults undercut the Design score.

## 2. Scale Doctrine

Extreme ratio, not a smooth modular climb:

- **Hero**: 8–18vw, `clamp()`-bounded so it never breaks at extreme viewport
  widths.
- **Body**: locked at 16–18px.
- **Steps**: very few intermediate steps — 4–6 total, loosely modular
  (~1.25–1.333 ratio), with a **deliberate jump** to display size. The gap
  itself creates the drama; a smooth ramp from body to hero reads as
  templated.

## 3. Display Details That Score

- **Letter-spacing**: −0.02 to −0.04em at display sizes.
- **Line-height**: 0.9–1.05 at display sizes.
- Optical alignment (not just box alignment).
- Real small-caps and figures where the face supports them.
- Variable-weight animation on hover/scroll.
- **System coherence on every page** — jurors check interior pages, not just
  the homepage. A distinctive hero treatment that isn't sustained through the
  rest of the site reads as inconsistent under the Design criterion (40%
  weight includes "consistency across all pages").

## 4. SplitText — Premium Text Animation

GSAP's SplitText (free since GSAP 3.13) splits text into chars/words/lines
with responsive re-splitting and built-in screen-reader handling.

| Split | Use | Cost |
|---|---|---|
| **Lines** | The premium default for headlines — each visual line rises from behind a mask | Cheapest, most legible |
| **Words** | Medium-length copy, lede reveals | Moderate |
| **Chars** | Short display headlines (1–5 words) | Hundreds of DOM nodes — reserve it |

**Canonical recipe**:
```
yPercent: 100 → 0
stagger: 0.02–0.04
ease: power4.out
duration: 0.8–1.2s
```

SplitText's `mask: "lines"` wraps each unit in an `overflow: hidden` container
— this is the single most recognizable premium text move. Prefer `mask:
"lines"` as the default entrance for headline copy; reserve char-level splits
for short, high-impact display headlines only.

Other reveal techniques: `clip-path: inset()` wipes (verify GPU behavior per
browser, keep areas moderate) and background-clip gradient "fill" effects
driven by scrub.

Body copy should get one soft fade/rise of the block — never per-char
animation on paragraphs; that reads as gimmicky and hurts readability.

## 5. Variable-Font Caveat

Variable fonts enable kinetic typography impossible with static files —
breathing weight on hover, width responding to scroll velocity — and one file
replaces 4–8 static weights (200–500KB saved).

**Caveat**: `font-variation-settings` animation is **main-thread and repaints
every frame** — it does not get the `transform`/`opacity` compositor fast
path. Use it only for:

- **Short** moments (not continuous loops).
- **Small-area** text (not full-bleed headline blocks).
- **Low-frequency** triggers (hover, one-shot on scroll-into-view) — never for
  continuous scroll-linked animation on large text blocks, which will drop
  frames.

## Applied Note

When writing the `direction` design plan's Tokens section, name the 2–3 type
roles explicitly (display / body / utility) with candidate faces, and check
the scale gap is deliberate rather than smooth — a smooth ramp from body to
hero is a generic-default smell the Pass-2 self-critique should catch.
