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

## Already Covered by impeccable (v4 craft floor + detector)

impeccable v4 ships `reference/craft-floor.md` and a detector
(`scripts/detect.mjs --json`, which `verify` runs). Don't duplicate the linting
— just don't do these:

Inter/Arial and system display faces, gray text on colored backgrounds, pure
black/gray, cards nested in cards, bounce/elastic easing on UI, gradient text,
eyebrow/kicker above a heading, same-size icon+heading+text card rows as page
structure, colored `border-left` above 1px, hard offset shadows outside a
committed neobrutalist world, unicode/emoji standing in for icons, elevation
declared twice (1px border under a wide soft shadow), tracking past -0.04em,
sketch-style SVG scenes.

Six craft-floor defaults COLLIDE with the Awwwards trend list (grain, CSS
textures, viewport-scale display type, mono labels, section indices, glass).
Those are overridable, but only through the design plan — see
`${CLAUDE_PLUGIN_ROOT}/skills/direction/references/trends.md` §0 and DESIGN.md's
`## Craft-floor overrides` section. A device used without being named there is a
verify finding, not a style choice.

## Copy & layout tells (distilled from taste-skill, MIT)

- Em-dashes in landing copy — the #1 LLM copy tell. Periods, commas, line
  breaks or hyphens instead. (Applies to page copy, not to code or docs.)
- Placeholder names ("Jane Doe", "Sarah Chan") and startup-slop brand names
  ("Acme", "Nexus", "CloudFlow") in mock content.
- Fake-precise specs ("47.2%", "1234567") without data backing them.
- The default premium-consumer palette (beige + brass + oxblood + espresso)
  reached for on every luxury/wellness brief — requires explicit brand
  justification and must differ from your previous premium project.
- Three equal feature cards in a row — use asymmetric grids or split layouts.
- Serif as an unexamined default: serif display faces are core Awwwards
  vocabulary (see typography.md) but every serif choice must be articulated
  in the design plan's art direction — never reached for on autopilot.
