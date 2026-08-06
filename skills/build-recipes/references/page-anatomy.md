# Page Anatomy

Lookup reference for the `build-recipes` skill: working recipes per page
zone, in the order they get built. Source: Awwwards Landing Page Patterns
§3 (anatomy), Premium Motion Design Principles §8 (page transitions).

The recurring structural skeleton across 2025-2026 winners: preloader,
hero, overlay menu, body sections, interactive footer, and the transitions
that connect pages.

## Preloader

The first branded moment, not a spinner. Patterns:
- **Counter** — 0-100 counter in the display typeface.
- **Typographic scramble** — doubles as a type showcase.
- **Curtain exit** — wipes away with a heavy `expo.out` ease.

Discipline: once per session (`sessionStorage`), real assets loading behind
it (honest loading — the number must reflect actual progress, not a fake
timer), capped at ~1.5-2.5s perceived.

The preloader exit and hero intro are ONE continuous timeline, never two
disconnected events — build them as a single GSAP timeline so the handoff
reads as one gesture, not a load screen followed by a separate animation.

## Hero

Type-first dominates. Viewport-scaled display type (`clamp()`-driven,
10-18vw) carries the brand instead of a stock image; lines split and masked
in with a rise (never per-char on body-length copy), staggers 0.03-0.08s
between units, media scaling 1.1-1.3 -> 1 behind. WebGL variants use one 3D
object or shader plane as atmosphere (see r3f.md). Scroll cue is minimal —
a line or micro-copy; winners rely on curiosity, not arrows.

## Overlay Menu

Fullscreen, oversized nav links in the display face, staggered line-mask
entrances, hover previews that follow the cursor, secondary column
(socials, office time), and a choreographed close (not just the reverse of
the open — design the close as its own beat). The menu button itself is a
micro-interaction showcase.

## Body Sections

Scroll as narrative structure, not merely a reveal trigger: pinned sections
with scrub, horizontal galleries inside a vertical page, sticky media
swapping as text columns pass — see scrolltrigger-patterns.md for the
implementation patterns. Broken/asymmetric grids: a real 12-col grid
deliberately violated with consistent violation rules, so the page reads
designed rather than templated (systematic chaos, not randomness).

## Interactive Footer

Treated as a destination, not an afterthought. Giant CTA typography at
viewport scale with hover distortion, reveal patterns (footer fixed behind
the page, uncovered as the last section scrolls away — the "next section
covers the hero" `pinSpacing: false` effect applied to the last section),
live details (studio local time, marquee, magnetic socials). It restates
the motion signature one final time — the same primary easing curve and
directional grammar used in the hero and body.

## Page Transitions

**View Transitions API** — the browser snapshots old and new states and
animates between them via `::view-transition-*`. Cross-document transitions
became cross-browser practical in late 2025 (`@view-transition { navigation:
auto; }`). Shared-element continuity via `view-transition-name`. Pros: tiny
code, works with plain MPA links, progressive enhancement by nature. Cons:
vocabulary limited to CSS on snapshot layers, snapshots are static (no live
content mid-transition), old-page JS is gone by transition time.

**GSAP + Barba/Swup/Taxi** — intercepts navigation and hands you
`leave`/`enter` hooks animating real live DOM. Still the tool for
signature art-directed transitions: curtain wipes with SplitText inside,
WebGL handoffs, persistent elements animating across pages. Cost: you own
scroll restoration, script re-execution, focus management, route
announcements, and killing ScrollTriggers per navigation or leaking memory.

**Decision rule**: content MPA where transitions are polish -> View
Transitions. Award-level site where the transition *is* the identity, or
persistent canvas/WebGL/audio across routes -> Barba/GSAP. Hybrid (View
Transitions for standard routes, custom takeover for hero routes) is
increasingly common.

The cross-cutting rule from winner analysis: transitions must be
directional elements between states, not decorative cuts. Outgoing and
incoming motion share one easing signature so the cut reads as a single
gesture — the same discipline that governs the preloader-to-hero handoff
above.
