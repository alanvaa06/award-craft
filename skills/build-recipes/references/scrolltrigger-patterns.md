# ScrollTrigger Patterns

Lookup reference for the `build-recipes` skill: the decision forks and
production code patterns for ScrollTrigger. Source: GSAP ScrollTrigger
Doctrine §§1-3, 6-8, 11.

Architectural premise: ScrollTrigger does not continuously watch elements.
It pre-calculates start/end positions in the natural document flow,
debounces scroll events, and syncs to `requestAnimationFrame`. No
scroll-jacking — native scrolling is preserved. This is why it stays cheap
at scale, and why anything that invalidates its cached measurements
(animating a pin target, hardcoding viewport values) breaks it.

## 1. The Fundamental Fork: scrub vs toggleActions

Every ScrollTrigger animation is one of two species. Choosing wrong is the
most common source of "it feels off."

| | `toggleActions` | `scrub` |
|---|---|---|
| Control | Animation plays on its own timeline once a position is crossed | Playhead bound to the scrollbar |
| Semantics | Time-based | Position-based |
| Feels | Authored — designed ease + duration | Driven — user controls it |
| Use for | Entrance reveals, text fade-ups, card intros | Parallax, pinned storytelling, morphs, image sequences, horizontal scroll |

Mutually exclusive — `toggleActions` is ignored when `scrub` is set. The
official skill states it directly: use one or the other on a given trigger,
never both.

```js
// toggleActions — the most common premium pattern
gsap.from(".reveal", {
  y: 60, autoAlpha: 0, duration: 1, ease: "power3.out",
  scrollTrigger: { trigger: ".reveal", start: "top 80%",
                   toggleActions: "play none none reverse" }
});
```

Four slots map to four events: `onEnter onLeave onEnterBack onLeaveBack`.
Keywords: `play`, `pause`, `resume`, `reset`, `restart`, `complete`,
`reverse`, `none`. Default `"play none none none"`. For one-shot reveals
prefer `once: true` — the ScrollTrigger self-destructs after firing
(cheaper).

### The scrub number is a smoothing delay in seconds

`scrub: true` = instant 1:1 mapping. `scrub: 0.5` = the playhead takes 0.5
seconds to catch up to the scrollbar position.

- `scrub: 0.5`–`1.5` almost always beats `scrub: true`. The slight lag reads
  as weight and expensiveness; `true` reads as mechanical.
- Exception: image sequences and progress bars, where frame accuracy
  matters — use `scrub: true`.
- Scrub values > ~2s cross into scroll-jacking territory (see
  anti-patterns.md).

### Duration is meaningless under scrub

The duration of a scrubbed animation is force-fitted between start and end.
To make it "slower," extend the scroll runway (`end: "+=300"` →
`"+=600"`), never `duration`. Within a scrubbed timeline, relative
durations set only *proportions*.

Keep `ease: "none"` on anything spatial that must track scroll (horizontal
containers, parallax layers). A deliberate ease within a pin distance is
legitimate for designed acceleration profiles (hero zooms) — never on
`containerAnimation` sources.

## 2. Pinning

```js
ScrollTrigger.create({
  trigger: ".hero",
  start: "top top",
  end: "+=1500",       // pin for 1500px of scroll
  pin: true,           // or pin: ".inner"
  anticipatePin: 1,    // pre-pin on fast scroll, kills the 1-frame flash
});
```

Mechanically, pinning wraps the element in a fixed-size div and uses
`position: fixed` on viewport scrollers, but transforms on nested scrollers.
`pinReparent: true` moves the element to `<body>` at a performance cost —
and breaks descendant-selector CSS.

**pinSpacing** — defaults to `true`; a spacer prevents layout collapse:

| Value | Effect |
|---|---|
| `true` (default) | Padding injected below; following content pushed down. Page height grows by pin distance. Storytelling default. |
| `false` | Following content slides over/under the pinned element — the layered "next section covers the hero" effect. |
| `"margin"` | Margin instead of padding (margin-collapse edge cases). |

Gotcha: if the pinned element's parent is `display: flex`, `pinSpacing`
defaults to `false`. Wrap pinned sections in a plain block container.

### Two hard rules

1. Never animate the pinned element itself — ScrollTrigger pre-measures
   positions; transforming the pin target corrupts those measurements. Pin
   a wrapper, animate children. Stated identically in the docs, the
   mistakes page, and the official skill.
2. Creation order matters — when any ScrollTrigger pins with default
   `pinSpacing`, triggers must be created in the order they are reached
   when scrolling (document order, top-to-bottom). Otherwise later
   triggers' start/end positions won't account for the pin's added scroll
   distance. When order can't be controlled (component frameworks), assign
   `refreshPriority` (higher = calculated sooner) or call
   `ScrollTrigger.sort()`.

`pinType`: `"fixed"` for the main viewport scroller, `"transform"` for
custom scrollers or transformed ancestors — see lenis-setup.md for the
symptom-driven fix table (pins jitter → `"fixed"`; pins don't stick →
`"transform"`) and the `will-change` ancestor trap.

Pin nesting is not supported. You cannot pin an element inside an
already-pinned area with a second overlapping trigger and expect sane math.
Premium pattern = one pin per stage: pin a single stage wrapper for a long
distance, choreograph everything inside with one scrubbed timeline.

## 3. Scrubbed Timelines — the Storytelling Backbone

One pinned stage + one scrubbed timeline is the architecture behind nearly
every Awwwards storytelling section.

```js
const tl = gsap.timeline({
  scrollTrigger: { trigger: ".story", start: "top top", end: "+=4000",
                   pin: true, scrub: 1 },
  defaults: { ease: "none" }
});

tl.to(".bg", { scale: 1.15 })                          // 0 → whole distance
  .from(".headline", { yPercent: 100, autoAlpha: 0 }, 0.1)
  .to(".headline", { autoAlpha: 0 }, 0.45)
  .fromTo(".chapter-2", { autoAlpha: 0 }, { autoAlpha: 1 }, 0.5)
  .addLabel("chapter2", 0.5);
```

- Positions are proportions. Under scrub, absolute position parameters
  carve up the total scroll distance. Design the timeline as percentages of
  the journey.
- Never put a ScrollTrigger on a tween nested inside a timeline — the #1
  documented mistake. The parent timeline's playhead and the scrollbar
  would both try to control the same playhead: "you can't have both." One
  ScrollTrigger on the parent, period. Either independent tweens, or a
  single trigger on the timeline.
- Starting values are cached at trigger creation — stacking multiple `to()`
  tweens on the same property of the same element with separate triggers
  causes visible jumps. Documented fixes: `immediateRender: false`, use
  `fromTo()` for subsequent tweens, or put them all in one timeline under
  one trigger.
- Add labels — they become snap targets for free.

### Snap

```js
snap: {
  snapTo: "labelsDirectional",   // or 1/(sections-1), array, or fn
  duration: { min: 0.2, max: 0.8 },
  ease: "power1.inOut",
  inertia: false
}
```

Directional snapping is default since v3.8 — keep it; snapping backwards
against user intent feels broken. Keep `duration.max` under ~1s: long forced
snaps read as scroll-jacking, the cardinal sin judges punish. Snapping is
unavailable with `containerAnimation`.

## 4. batch() — Staggered Grid Reveals

Per-element triggers with manual staggers either fire all at once or feel
disconnected. `ScrollTrigger.batch()` groups elements entering within an
`interval` window into one call so `stagger` works naturally.

```js
gsap.set(".card", { y: 60, autoAlpha: 0 });

ScrollTrigger.batch(".card", {
  interval: 0.1, batchMax: 6, start: "top 85%",
  onEnter: batch => gsap.to(batch, {
    y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out",
    stagger: { each: 0.12, grid: "auto" }, overwrite: true
  }),
  onLeaveBack: batch => gsap.set(batch, { y: 60, autoAlpha: 0, overwrite: true })
});
```

`overwrite: true` prevents pile-ups on fast up/down scroll. Cheaper than N
independent tweens — the correct tool for portfolio grids and feature
lists.

## 5. Horizontal Scroll Sections

```js
const scrollTween = gsap.to(panels, {
  xPercent: -100 * (panels.length - 1),
  ease: "none",                                 // MANDATORY
  scrollTrigger: {
    trigger: ".h-container", pin: true, scrub: 1,
    snap: 1 / (panels.length - 1),
    end: () => "+=" + document.querySelector(".h-container").offsetWidth,
    invalidateOnRefresh: true
  }
});
```

`ease: "none"` on the container tween is mandatory — any ease desynchronizes
scroll distance from horizontal distance and breaks trigger position mapping
inside the fake-horizontal section.

Animations *inside* the horizontal area use `containerAnimation`, which
makes ScrollTrigger compute when elements enter the horizontal viewport:

```js
gsap.from(".panel-2 .title", {
  y: 80, autoAlpha: 0,
  scrollTrigger: { trigger: ".panel-2 .title", containerAnimation: scrollTween,
                   start: "left 80%", toggleActions: "play none none reverse" }
});
```

Limitations: source tween must be linear; no pinning and no snapping on
containerAnimation-based triggers; don't animate the inner trigger element
on `x`.

## 6. Multilayer Parallax

Depth = layers moving at different scroll velocities.

```js
gsap.utils.toArray("[data-speed]").forEach(layer => {
  const speed = parseFloat(layer.dataset.speed);   // 0.2 slow bg, 1.4 fast fg
  gsap.to(layer, {
    y: () => (1 - speed) * ScrollTrigger.maxScroll(window) * 0.1,
    ease: "none",
    scrollTrigger: { trigger: layer.closest("section"),
                     start: "top bottom", end: "bottom top",
                     scrub: true, invalidateOnRefresh: true }
  });
});
```

`start: "top bottom", end: "bottom top"` = the canonical parallax range
(progress 0 when the section enters at the bottom, 1 when it exits at the
top).

Alternative for hero media: oversize the image inside an `overflow: hidden`
mask (`height: 130%`) and translate within the clip — no gaps ever appear.

Rules: transforms only, `ease: "none"`, `scrub: true`. Don't mix different
scrub numbers across layers — they drift apart; smoothing comes globally
from Lenis. For jumps when loading mid-page, use `start: "clamp(top
bottom)"` (v3.12+).

## 7. Responsive: gsap.matchMedia()

`ScrollTrigger.matchMedia()` is officially deprecated — `gsap.matchMedia()`
is the current pattern. Everything created inside a matching context is
auto-reverted and killed when the query stops matching.

```js
const mm = gsap.matchMedia();

mm.add({
  isDesktop: "(min-width: 1024px)",
  reduceMotion: "(prefers-reduced-motion: reduce)"
}, (ctx) => {
  const { isDesktop, reduceMotion } = ctx.conditions;
  if (reduceMotion) { gsap.set(".reveal", { clearProps: "all" }); return; }

  gsap.to(".panel", { xPercent: isDesktop ? -300 : 0,
    scrollTrigger: { trigger: ".stage", pin: isDesktop, scrub: 1 } });
});
```

Hardcoded start/end values go stale on resize — ScrollTrigger auto-refreshes
on viewport resize (debounced ~200ms), but it cannot re-evaluate a value you
baked in at creation. Doctrine: function-based start/end values, plus
`invalidateOnRefresh: true` with function-based animation values when the
animation's own numbers must recompute.

`prefers-reduced-motion` handling is an accessibility judging criterion. A
reduced context that skips pinning and scrub entirely is the professional
baseline. In React, pair with `useGSAP`/`gsap.context()` — SPA navigation
without killing ScrollTriggers is a top documented failure mode.

## 8. Production Patterns

**A) Hero pin + scrub ("lock and transform" opener)** — page locks, hero
media zooms, headline exits, next chapter fades in before release. `end:
"+=200%"` (2x viewport runway) is a luxurious default; tune runway, not
durations.

```js
gsap.timeline({
  scrollTrigger: { trigger: ".hero", start: "top top", end: "+=200%",
                   pin: true, scrub: 1, anticipatePin: 1 }
})
.to(".hero-media", { scale: 1.35, ease: "none" }, 0)
.to(".hero-title", { yPercent: -40, autoAlpha: 0, ease: "none" }, 0)
.fromTo(".hero-next", { autoAlpha: 0, y: 80 }, { autoAlpha: 1, y: 0 }, 0.6);
```

**B) Storytelling chapters** — one long pinned stage (`end: "+=400%"`+), one
scrubbed master timeline, chapters as labeled segments cross-fading
absolutely-positioned layers, optional `snap: "labelsDirectional"`.
Backgrounds transform continuously so the scene never feels static between
chapters.

**C) Image sequence (Apple-style canvas scrub)** — official
`imageSequenceScrub` helper: preload numbered frames, scrub a frame
counter, draw to `<canvas>` with `Math.round` to avoid sub-frame draws.
Full engineering treatment in scroll-video.md.

**D) Section stack / cover transitions** — sequential pins with
`pinSpacing: false` so each incoming section slides over the pinned
previous one, plus a scrubbed scale-down/darken on the outgoing section for
depth.
