# Motion System

Lookup reference for the `direction` skill: easing, duration, choreography,
and motion-identity doctrine to define BEFORE any code is written. Source:
Premium Motion Design Principles §§1–4.

Meta-principle: restraint reads as confidence. The most awarded sites animate
fewer things, better.

## 1. Easing Rules

- **Ease-out for entrances and user-initiated actions** — fast start
  (instant perceived response), decelerating into place. The default for
  **~90%** of UI animation.
- **Ease-in alone is effectively banned** in UI: the slow start reads as lag
  exactly when the user is watching most closely. Acceptable only for exits,
  where the element accelerates away.
- **Ease-in-out** for elements moving between two on-screen positions (both
  endpoints visible), and for looping motion.
- **Linear** only for constant-rate property changes with no spatial movement:
  spinner opacity, marquees, progress that maps to real progress, and
  scrub-linked scroll animation, where the scrollbar is the ease.

Default browser `ease` and especially `linear` are the most common markers of
amateur motion. Linear transitions make an interface feel like a slideshow
rather than a product.

## 2. The Bezier Vocabulary

| Name | Value | Character |
|---|---|---|
| Strong ease-out (quart/quint) | `cubic-bezier(0.23, 1, 0.32, 1)` | Snappy start, long luxurious settle — the classic "expensive" feel |
| Expo-out (`expo.out`) | ~`cubic-bezier(0.19, 1, 0.22, 1)` | Sharper attack; hero reveals, big surfaces |
| Power4-out (`power4.out`) | `cubic-bezier(0.23, 1, 0.32, 1)` | The de facto Awwwards default for text and panel reveals |
| Strong ease-in-out | `cubic-bezier(0.77, 0, 0.175, 1)` | Symmetric, cinematic; position swaps, masks, curtains |
| iOS drawer | `cubic-bezier(0.32, 0.72, 0, 1)` | Sheet motion that feels native |
| Back-out (overshoot) | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Small bounce past target; playful confirmations only |

Material 3 splits **standard** easing (utilitarian, small components) from
**emphasized** (dramatic deceleration for large transitions) — same idea:
reserve the strongest curves for the biggest moments.

## 3. Springs vs Beziers

Beziers have fixed duration; springs derive it from stiffness/damping/mass,
making them naturally interruptible and velocity-preserving.

**Doctrine**: springs for anything the user's finger or cursor touches or can
interrupt; beziers for autonomous fire-and-forget transitions. Slightly
overdamped springs (soft settle, no visible oscillation) read premium;
visible bouncing reads as toy-like outside playful brands.

## 4. Duration — a Scale, Not a Number

A single global duration is a design-system smell. Duration must scale with
element size, distance traveled, and importance.

| Tier | Band | Examples |
|---|---|---|
| Micro-interactions | **100–300ms** | Hovers, presses, toggles, tooltips, icon morphs. Below ~100ms is subliminal; above ~300ms a hover feels laggy |
| Standard transitions | **300–500ms** | Dropdowns, modals, drawers, accordions, tab switches |
| Large / expressive | **400–800ms** | Page transitions, shared-element FLIP, section reveals |
| Hero / narrative | **800ms–1.5s+** | First-load choreography, preloader→hero handoff, staggered headline reveals |

Two quantitative rules:
- **Duration scales with travel**: ~100ms per 10% of viewport moved.
- **Duration scales with choreography complexity**: 2–5 objects → 300–400ms;
  6–10 objects → 500–700ms. Object-based baselines: buttons/small components
  100–200ms, page transitions 500–700ms.

**Asymmetry rule**: enter slower than exit (e.g. 300ms in / 200ms out). Users
need orientation on entry but want dismissal to feel immediate.

Most UI animation belongs in the **200–500ms** band; task-oriented interfaces
skew 200–300ms. Mobile trends ~30% shorter than desktop. The test for
anything repeated: does this still feel good the tenth time today?

## 5. Choreography and Stagger

Choreography is the difference between "elements that animate" and a scene
that unfolds.

- **One focal point at a time (staging).** Sequence entrances so attention
  follows a deliberate path: headline → subhead → CTA → imagery. Simultaneous
  everything is visual noise.
- **Stagger encodes relationship.** 30–80ms between siblings, 50ms a strong
  default, up to 100–120ms for large cards. In GSAP: `stagger: 0.05` on
  chars, `0.08–0.12` on lines/cards.
- **Cap the total.** Stagger total = per-item delay × count. 40 items at 80ms
  lands the last one 3.2s late. Use `stagger: {amount: 0.6}` to distribute a
  fixed total, or stagger only the first visible row.
- **Direction has meaning** — follow reading order or the direction of the
  triggering action; `from: "center"`/`"edges"` for radial emphasis.
- **Overlap, don't queue.** Premium timelines start element B at 60–80% of
  element A (GSAP position `"-=0.3"` / `"<0.2"`). Fully sequential animations
  feel twice as long as they are.
- **Parenting**: children inherit the parent's motion plus a small offset, so
  a container and its items read as one gesture rather than two competing
  ones.

## 6. Motion Identity — a Signature, Not a Toolbox

Premium sites feel coherent because motion is a brand system, not per-page
improvisation. Five components:

1. **One primary easing curve** (+ an exit variant and an emphasized variant)
   used site-wide. If the hero reveals with `power4.out`, so do the menu, the
   cards, and the footer. Mixed curve vocabularies are the fastest way to feel
   template-assembled. Design-system guidance converges on documenting only
   **2–3 bezier curves total**.
2. **A duration scale** as tokens (`fast: 0.2s / base: 0.4s / slow: 0.8s /
   hero: 1.2s`) and a **stagger unit** (always multiples of 0.05s).
3. **Directional grammar**: enter from below (editorial, grounded),
   fade+scale (product, soft), or mask reveal (fashion, architectural). Pick
   one and repeat it.
4. **Signature moments**: 1–3 distinctive recurring patterns. Recognition
   comes from repetition of a distinctive move, not from variety.
5. **Personality mapping**: Apple = subtle, smooth, invisible; Stripe =
   precise, geometric, confident; Duolingo = bouncy, celebratory. Choose
   adjectives first ("calm, weighty, precise"), then derive curves and
   durations.

**Encoding**: CSS custom properties (`--ease-out-brand`, `--dur-base`),
`gsap.registerEase` / `gsap.defaults({ease: "power4.out", duration: 0.8})`,
motion tokens sitting alongside color and type tokens in the design system.

## Applied Note

The `direction` skill's Motion identity section requires exactly this: one
signature ease (cubic-bezier) + exit variant + emphasized variant; duration
bands (fast/base/slow/hero); stagger unit; adjectives chosen first, curves
derived second.
