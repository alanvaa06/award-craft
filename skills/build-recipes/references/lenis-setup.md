# Lenis Setup

Lookup reference for the `build-recipes` skill: wiring Lenis smooth-scroll
into GSAP/ScrollTrigger correctly, once, before any section is built. Source:
GSAP ScrollTrigger Doctrine §5.

Lenis (darkroom.engineering) is the de-facto standard on award sites; GSAP's
ScrollSmoother is the in-family alternative. Lenis keeps the native document
scroll (accessibility, no `scrollerProxy` needed) and lerps the visual
position.

## The Canonical Snippet

```js
const lenis = new Lenis({ lerp: 0.1 });

lenis.on('scroll', ScrollTrigger.update);      // sync every scroll
gsap.ticker.add((time) => lenis.raf(time * 1000));  // drive from GSAP ticker
gsap.ticker.lagSmoothing(0);                   // critical
```

Why each line matters:
- Driving Lenis from GSAP's ticker (not its own rAF) guarantees both update
  in the same frame — otherwise trigger positions jitter by 1–2 frames.
- `lagSmoothing(0)` stops GSAP from catching up time after a long frame,
  which would visibly jump scrubbed animations.

The general mechanism: any third-party scroller must notify ScrollTrigger on
update — register `ScrollTrigger.update` as a listener. `scrollerProxy()`
with `scrollTop`/`scrollLeft` getters-setters is only needed when the
library *transforms a wrapper* instead of using native scroll (Locomotive
v4, custom smoothers). Modern Lenis needs no scrollerProxy — a major reason
it won.

## Next.js Placement

Mount Lenis in a client component (`"use client"`) instantiated once in the
root layout (or a top-level providers wrapper), not per-page and not inside
individual sections. One Lenis instance, one GSAP ticker hookup, for the
whole app. Tear it down (`lenis.destroy()`) on unmount if the provider can
ever unmount (it generally shouldn't in an App Router root layout).

Also set globally, once:

```css
html { scroll-behavior: auto !important; }
```

CSS smooth scroll corrupts ScrollTrigger's refresh measurements when it
fights Lenis's own lerp.

## Caveats

- **Nested scrollables**: add `data-lenis-prevent` to any element that needs
  its own native scroll (a modal, a code block, an internal list) so Lenis
  doesn't hijack it.
- **Programmatic scroll**: use `lenis.scrollTo()`, never `scrollIntoView()`
  — the latter bypasses Lenis's lerp and desyncs the visual position from
  the tracked scroll position.
- **Touch**: many premium sites disable smoothing on touch (native inertia
  already feels good) — smoothing is off by default on touch in current
  Lenis versions; don't force it on without a reason.
- **Mobile address-bar resize**: `ScrollTrigger.normalizeScroll(true)`
  stabilizes pinned heroes against the address-bar show/hide resize on
  mobile, but it changes touch feel — test before shipping it globally.

## pinType Symptom Table

Pinning uses `position: fixed` on viewport scrollers, but **transforms** on
nested scrollers. Pick `pinType` from the symptom you see, not from theory:

| Symptom | Fix |
|---|---|
| Pins jitter | `pinType: "fixed"` |
| Pins don't stick (scroll past, unpin early/late) | `pinType: "transform"` |

## The will-change Trap

`will-change: transform` (or any transform/filter) on an ancestor of a
pinned element breaks `position: fixed` in its descendants — a very common
Lenis-era bug. If a pin glitches only on certain sections, check every
ancestor for a stray `will-change`, `transform`, or `filter` before touching
ScrollTrigger config. This is also why `will-change` should be applied
surgically and removed after the animation completes, never left on
permanently.

## scrollerProxy — When You Actually Need It

`scrollerProxy()` is only required when the scroll library transforms a
wrapper element instead of using native document scroll (Locomotive v4,
older custom smoothers). Modern Lenis uses native scroll under the hood and
needs no scrollerProxy at all — just the three-line ticker hookup above.
Don't add one speculatively; it is dead code with a real footprint if the
stack is Lenis.
