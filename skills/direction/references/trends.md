# Trends

Lookup reference for the `direction` skill: the live 2025–2026 trend list with
working recipes, plus the doctrine for treating media as narrative material
rather than decoration. Source: Awwwards Landing Page Patterns §4 (Trends) +
§6 (Media as Narrative Material).

## 1. Trends (2025–2026)

| Trend | Working recipe |
|---|---|
| **Kinetic typography** | The defining trend. Viewport-scaled type replaces hero imagery; variable fonts animated on weight/width axes on hover and scroll |
| **Broken grids** | Asymmetry as personality — but systematic chaos: a strict grid violated by consistent rules |
| **Dark luxury** | Near-black canvases (#0a0a0a–#111, rarely pure #000), one restrained accent, generous space. Caveat: dark mode exposes glassmorphism's weakness — translucent layers go murky; contrast must be engineered, not assumed |
| **Tactile brutalism** | Sharp geometry, single-pixel borders, visible structure (rulers, indices, mono labels) + mathematically generated CSS textures (film grain, CRT scanlines) instead of faked depth |
| **WebGL touches** | Pendulum swung from full 3D worlds to *touches* — one hero object, shader-distorted images, scroll-tied particles. Heavy WebGL "drained performance budgets in ways most teams underestimated." WebGPU renderers with WebGL fallback at the cutting edge |
| **Custom cursor** | Lerped follow (~0.1–0.15), state morphs ("View", "Drag"), `mix-blend-mode: difference`, magnetic pull, mask-cursor reveals. Always off on touch; never lose the native cursor |
| **Micro-interactions** | Underline draws, character roll-ups, in-card image parallax, magnetic buttons. The bar: nothing is inert |
| **Noise / grain** | SVG `feTurbulence` at 15–30% opacity over heroes and dark surfaces — character without load cost, and it masks gradient banding |
| **Blur / glass** | `backdrop-filter` blur 5–15px, background opacity 0.1–0.3, 1px semi-transparent border. Mature usage = one or two glass surfaces per view, not glass-everything |

### Per-trend notes

- **Dark luxury**: the murky-glass caveat matters most here — a glass panel
  that reads crisp on a light background can turn to mud on #0a0a0a unless
  contrast is deliberately engineered (raise border opacity, add a subtle
  inner highlight, or drop glass on the darkest surfaces entirely).
- **WebGL touches**: budget warning is real — heavy WebGL scenes are a
  documented way teams blow their performance envelope (see
  `awwwards-rubric.md` §4). Default posture is atmosphere, not spectacle: one
  hero object, lazy-initialized, with a non-WebGL fallback.
- **Custom cursor**: must be disabled on touch devices entirely — a
  lerped/blend-mode cursor with no touch input is worse than no custom cursor.
- **Noise/grain**: doubles as a defense against banding on smooth gradients,
  so it is functional as well as textural.
- **Blur/glass**: discipline is the differentiator — one or two glass surfaces
  per view is the ceiling for mature usage; more reads as a Bootstrap-glass
  default.

## 2. Media as Narrative Material

- **Material, not decoration**: genuine photography/film art-directed for the
  site from day one. Stock imagery is a recognized failure pattern.
- **Scroll-driven film**: canvas frame sequences scrubbed by scroll, sticky
  media panels crossfading as text advances, masked video reveals expanding
  from a strip to full-bleed.
- **Hover-preview grammar**: project lists where the image follows the
  cursor; thumbnails that expand into case-study heroes via shared-element
  transitions — media becomes the connective tissue of navigation.
- **Shader-mediated imagery**: photos on WebGL planes with
  displacement/flowmap hover distortion, RGB-shift on velocity, grain
  composited in-shader, so photography inherits the site's motion signature.
- **Sound design** sits inside the Creativity criterion — subtle UI audio and
  spatialized ambient, with a **visible mute control** (never autoplay sound
  with no visible off-switch).
- **No stock photography** — treated as a hard rule, not a preference; stock
  imagery bleeds into the Design score even though Content is only 10%
  weighted, because it signals a template foundation.

## Applied Note

When the `direction` design plan picks a signature moment or asset treatment,
cross-check it against this table: does it read as a working recipe (specific
values, specific mechanism) or a vague trend name? "Add some glassmorphism" is
not a decision; "backdrop-filter blur 10px, opacity 0.15, 1px border, one
surface in the hero" is.
