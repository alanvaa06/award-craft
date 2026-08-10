# Design Plan — {{project}}

This document is what the human approves at the gate before build begins.

## Design read
<!-- One declarative line — page kind, audience, vibe, aesthetic lean. -->

## Tokens
<!-- 4–6 named colors with hex (dominant vs accent explicit); 2–3 type roles (display / body / utility) with candidate faces; spacing unit. -->

## Motion identity
<!-- ONE signature ease (cubic-bezier) + exit variant + emphasized variant; duration bands (fast/base/slow/hero); stagger unit. Choose 3 adjectives first, derive curves from them. -->

## Verbal identity
<!-- POV (second person singular in body copy, first person possessive in buttons), sentence rhythm, allowed/banned lexicon, punctuation habits, one verbal signature. Derived by analogy with motion identity — not documented doctrine, see copywriting.md Gaps section. -->

## Calibration dials
<!-- DESIGN_VARIANCE / MOTION_INTENSITY / VISUAL_DENSITY, 1-10 each with one-line reason; baseline 8/6/4. -->

## Art direction
<!-- Medium, lighting recipe, grade, texture, mood; explicit anti-references (what this must NOT look like). -->

## Craft-floor overrides
<!-- Devices impeccable's craft floor refuses by default that this landing uses anyway (grain/feTurbulence, viewport-scale display type above 6rem, mono labels, section indices, glass, generated CSS textures), each with the reason the brief earns it. See direction/references/trends.md §0. "None — the floor holds" is a valid and common answer. Not overridable: eyebrow/kicker, gradient text, nested cards. -->

## Wireframe
<!-- ASCII wireframe per script section, in script order. If no script: preloader → hero → 3-6 body chapters → interactive footer. -->

## Signature moment
<!-- ONE unique, memorable device, tied to the script's climax section, justified against the brief. Name the technique (pin+scrub chapter / mask cursor / kinetic hero / scroll-video / R3F object). -->

## Drift vs brand source
<!-- Core identity INHERITS (palette, typography families, voice/tone, anti-references). Landing-specific MAY drift (signature moment, per-section tokens, motion timings, one accent color). EVERY drift: what changed, why. -->

## Asset slots
<!-- Slot table: name + ratio + MEDIUM (produce = raster to generate / direct = real asset the client supplies / semantic = built in HTML/CSS/SVG/canvas; anything with lighting, depth, a figure or a named material texture is `produce` whatever the stack), plus a shot spec (subject, camera angle/position, lens, lighting setup, moment, negative-space zone for UI overlay). Name which slots share a locked element (environment, product, prop, person) — those become Reference Elements before generation. Then the VIDEO TIER MENU: three candidate configs priced live with `get_cost` (cheapest first), the CHOSEN TIER the human picked for the whole landing, any PER-SLOT OVERRIDES with their cost, and the derived CEILING ARITHMETIC (video slots x tier cost + image slots x image cost + stated headroom) — human confirms or changes it at the gate. -->
