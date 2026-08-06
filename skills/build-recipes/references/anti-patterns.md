# Anti-Patterns

Lookup reference for the `build-recipes` skill: officially documented
ScrollTrigger mistakes, the purpose gate for any proposed animation, and
what impeccable already catches so it isn't duplicated here. Source: GSAP
ScrollTrigger Doctrine §10, Premium Motion Design Principles §10.

## ScrollTrigger Anti-Patterns Checklist

Officially documented mistakes — each one produces a specific,
recognizable bug:

- ScrollTrigger on a tween nested inside a timeline -> playhead conflict.
- Two `to()` tweens on the same property with separate triggers, no
  `immediateRender: false`/`fromTo` -> jump-backs from cached start values.
- One trigger for many sections (`gsap.to(".section", …)` with a single
  trigger animates all at once) -> loop per element, or `batch()`.
- Hardcoded start/end -> breaks on resize.
- Pinned triggers created out of document order without `refreshPriority`.
- Animating the pin target itself.
- Easing on the horizontal container tween or a `containerAnimation`
  source.
- Changing scrub "speed" via `duration` instead of `end` distance.
- SPAs not killing/recreating triggers across navigation.
- Leaving `markers: true` in production.
- Leaving `will-change` on everything permanently.
- Scroll-jacking: long forced snaps, scrub > ~2s, hijacked wheel deltas —
  penalized by judges even when technically clean.

## The Purpose Gate

NN/g's position: animation earns its place when it provides feedback,
indicates state change, directs attention, or expresses causality — and
erodes trust when it's decoration disconnected from user action. Filler
"down-time" animation is what frustrates users most in testing.

Six questions for every proposed animation:

1. **What is its job?** Feedback / Orientation / Attention / State / Brand
   signature. If none — cut it.
2. **Frequency test.** 1x (hero: can be 1s, expressive) / 10x per session
   (menu: <=300ms, quiet) / continuous (must be compositor-only and
   subtle). Expressiveness budget is inversely proportional to frequency.
3. **Does it delay the task?** Never block input. If a user can outrun it,
   let them.
4. **Does it survive reduced-motion?** If the design collapses without
   motion, the design is wrong.
5. **Can it run on the compositor?** If it needs layout/paint every frame
   and can't be FLIP-ed, redesign the effect.
6. **Is it in the system?** Brand curve, duration scale, stagger unit.
   Bespoke motion only for declared signature moments.

Run every proposed animation through this gate before writing the
ScrollTrigger for it, not after it feels wrong in review.

## Already Covered by impeccable

impeccable lints these — don't duplicate the linting, just don't do them:
Inter/Arial defaults, gray text on colored backgrounds, pure black/gray,
cards nested in cards, bounce/elastic easing on UI.
