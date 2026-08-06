# React Three Fiber Doctrine

Lookup reference for the `build-recipes` skill: React Three Fiber
architecture, GLSL fundamentals, scroll-linked 3D, and the performance rules
that decide whether WebGL reads as atmosphere or as jank. Source: WebGL and
React Three Fiber Doctrine (entire article).

**Evidence status**: this reference is built from a 2026-08-06 deep-research
corpus, but none of these claims went through adversarial verification (the
verification budget went to GSAP, Awwwards and Higgsfield doctrine). Each
source claim is sourced with a quote from a named practitioner article.
Treat the R3F architecture claims as strong practitioner consensus rather
than vendor-documented fact.

The 2026 posture: WebGL for atmosphere, not spectacle. The pendulum swung
from full 3D worlds to *touches* — one hero object, shader-distorted images,
particles tied to scroll — because heavy WebGL "drained performance budgets
in ways most teams underestimated."

## 1. Shader Fundamentals

A shader is a GLSL program running on the GPU in two distinct stages:

| Stage | Role |
|---|---|
| Vertex shader | Positions each vertex of a geometry — this is what lets you programmatically deform shape and "make things move" |
| Fragment shader | Sets the RGBA color of each visible pixel |

Three data channels, and the constraints between them dictate how every
effect is structured:

- **Uniforms** — read-only inputs available to *both* stages, carrying the
  same value for every vertex and pixel. The correct channel for time,
  mouse position, scroll velocity: anything per-frame.
- **Attributes** — per-vertex data, readable only in the vertex shader.
- **Varyings** — declared and set in the vertex shader, read by the
  fragment shader. The only mechanism for forwarding per-vertex values into
  pixel coloring.

Worth internalizing: Three.js and R3F are abstractions over WebGL that use
shaders as their main component — the bundled materials are themselves
implemented with shaders. Custom GLSL is the same rendering path as stock
materials, not an exotic bypass.

## 2. React Three Fiber Architecture

### The 60fps / React state boundary

Anything that changes at 60fps — camera position, animation progress,
shader uniforms — cannot live in React state. React reconciliation cannot
keep up. Such values go in mutable refs bridged into the render loop via
`useFrame`.

### The memoization trap

The most common R3F shader bug: if the component can re-render from React
state, the uniforms object must be memoized. Otherwise `useFrame` keeps
writing to the *previous* uniforms reference while the material reads the
new one — and the shader visually freezes. Symptom is a still image, not an
error.

### Motion: damping over timelines

For interaction-driven 3D where animations must redirect mid-flight,
GSAP's timeline model is a poor fit — the problem is interruptibility.
Frame-rate-independent exponential damping (`easing.damp()` from maath)
smoothly retargets without cancellation or cleanup logic.

The distinction is sharp and worth keeping straight against
scrolltrigger-patterns.md:

| Motion type | Tool |
|---|---|
| Authored, scroll-linked, deterministic sequences | GSAP timeline (scrubbed) |
| Interaction-driven, interruptible, retargetable | `easing.damp()` |

Timing doctrine that generalizes beyond 3D: slow in (~0.6s), fast out
(~0.15s) — "you savor the reveal but never wait for the dismiss." The same
asymmetry appears in the motion-design doctrine (enter slower than exit).

### Per-material shaders vs postprocessing

For effects that are local to individual elements and interaction-driven,
choose per-material shaders. Full-screen postprocessing adds full-screen
overhead for what is really a per-card effect. Reserve postprocessing for
genuinely global grades (bloom, vignette, chromatic aberration across the
whole frame).

## 3. Scroll-Linked 3D

The canonical R3F pattern is not ScrollTrigger. Build a GSAP timeline and
scrub it manually every frame with drei's `useScroll` offset:

```jsx
const scroll = useScroll();
useFrame(() => {
  tl.current.seek(scroll.offset * tl.current.duration());
});
```

Setup rules:
- `<ScrollControls pages={N} damping={0.25} />` — `pages` is scroll length
  in viewport-heights; damping 0.25 is the recommended smoothing.
- Timeline duration = `pages - 1` seconds (2s for 3 pages), so every page
  boundary lands on an integer second and position parameters (`0`, `0.5`,
  `1`, `1.5`) choreograph overlapping tweens legibly.
- Author the timeline in `useLayoutEffect`.
- HTML UI composites inside the Canvas via `<Scroll html>`; drive section
  opacity from the same scroll state with `scroll.range()` / `scroll.curve()`
  rather than CSS scroll effects — one scroll source, no drift.
- `OrbitControls` intercepts wheel events and silently blocks
  ScrollControls. Fix: `<OrbitControls enableZoom={false} />`.

For DOM-driven pages (Lenis + ScrollTrigger already in place), the
alternative is to keep GSAP as the single scroll authority and render the
WebGL on the same RAF tick — the phase-lock pattern from the Awwwards
canonical stack.

## 4. Scroll-Reactive Shader Effects

The recurring premium pattern is piping scroll velocity into the material
as a uniform, then deforming in the vertex shader:

```js
ref.material.uniforms.uScrollSpeed.value = velocity * 0.005;  // heavy downscale
```

```glsl
// velocity-reactive bend: planes bow more the faster the user scrolls
float yDisplacement = -sin(uv.x * PI) * uScrollSpeed;

// separate static "wavy" arc from world-space Y, tunable via uniforms
float xDisplacement = uCurveStrength * cos(worldPosition.y * uCurveFrequency);
```

Two implementation facts that decide whether this works:
- Velocity must be scaled down hard (factor ~0.005 in the reference
  implementation) — raw wheel deltas destroy the effect.
- Subdivide the geometry. `new THREE.PlaneGeometry(1, 1, 16, 16)` — a
  default 1x1-segment plane cannot bend smoothly under vertex displacement,
  no matter what the shader says.

**Infinite carousels** recycle mesh positions instead of duplicating
meshes: wrap each plane's Y with a modulo of total stack height every
frame. No reset, no clones.

## 5. Performance

- Preload every texture at module level, before any component mounts.
  Described as non-negotiable — uploading to the GPU upfront is what
  prevents visible pop-in on collection switches.
- Time-slice mounts for heavy scenes: ~5 components per frame (~200ms
  total for 60+ textured cards) to avoid an init spike.
- Assets: glTF with Draco compression, lazy-initialized contexts, CSS/SVG
  fallbacks. WebGPU renderers with WebGL fallback at the frontier.
- Budget the same way as DOM work — see the motion-design performance
  model for the compositor pipeline. The relevant difference: WebGL
  bypasses the layout/paint pipeline entirely, which is exactly why heavy
  scenes move to canvas once DOM compositing hits its ceiling.

## Key Takeaways

- Uniforms carry per-frame values; attributes are vertex-only; varyings are
  the sole bridge to the fragment shader. Every effect's structure follows
  from those three constraints.
- Nothing changing at 60fps belongs in React state — refs bridged into
  `useFrame`. And memoize the uniforms object, or the shader silently
  freezes.
- Scrubbed GSAP for authored sequences; `easing.damp()` for interruptible
  interaction. Choosing the wrong one produces either cancellation
  spaghetti or motion that can't be redirected.
- The R3F scroll pattern is `tl.seek(scroll.offset * duration)` in
  `useFrame`, with timeline duration = `pages - 1` — not ScrollTrigger.
- Subdivide geometry before displacing it, and scale scroll velocity down
  hard (~0.005) before it reaches a uniform.
- Preload textures at module level; time-slice mounts. Pop-in and init
  spikes are the two failure modes users actually notice.
