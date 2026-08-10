# Comps — three rendered compositions before any code

Lookup reference for the `direction` skill's comp round. A comp is a rendered
picture of the landing's first viewport (plus enough of the second fold to prove
the concept governs the page), generated via Higgsfield and put in front of the
human WITH the design plan, as part of the same single gate.

Purpose: the design plan describes the page in words and an ASCII box drawing.
Words get approved that nobody has actually seen. A comp moves the "that is not
what I pictured" moment from after the build to before it — the cheapest place
it can happen. impeccable's own doctrine names this the step that produces the
most compositional and ambitious work.

## Why three

One comp gets rubber-stamped. The spread between three is what surfaces the
composition worth building — the human is choosing, not approving. Three is the
number: not two (a false binary), not five (decision fatigue at ~1 credit each).

## What a comp is NOT

**A comp is a designed surface, not a picture of the subject.** This is the one
failure mode that wastes the round. A prompt that opens with atmosphere gets a
poster back: the model paints the fish market instead of the fish market's
website.

Self-check every render before showing it:
- Could this hang on a wall as a poster? → not a comp, regenerate.
- Does it read as a photograph or scene with some text on it? → not a comp.
- Can you point at the nav, the headline block, the primary action, and the
  section boundary? → it is a comp.
- **Read the headline back word by word.** It is the one string a comp must
  render exactly, and long headlines — especially in a language other than
  English — come back with a word duplicated or dropped often enough to check
  every time (observed: "mas alto / alto que la niebla"). A garbled headline
  gets that comp regenerated, not explained away at the gate.
- Does any region contain a number, price, date or measurement nobody supplied?
  → regenerate; that is an invented claim, not a rendering flaw.

## Prompt shape — layout first

This inverts the front-load-the-subject rule in
`${CLAUDE_PLUGIN_ROOT}/skills/assets/references/prompting.md` §1, and the
inversion is deliberate: for a comp, **the layout IS the subject**. Everything
in prompting.md about materials, lighting vocabulary and restraint still applies
— it applies to the second half of the prompt.

Order:

1. **What it is, and that the image IS the viewport.** "A desktop website
   landing page, full first viewport, flat-on screenshot view, no device mockup,
   no browser chrome, no perspective. The image is the viewport itself, edge to
   edge — no surrounding canvas, margin, page border or drop shadow, and nothing
   of the next section showing." Saying only "no browser chrome" is not enough:
   models answer it with a page floating on a cream backdrop, which is a picture
   of a website rather than the website.
2. **The scaffold, region by region in vertical order, with scale relationships.**
   Name only the regions this design actually has. A page with no navigation says
   so instead of inventing one. Example shape: "thin utility bar across the top;
   below it a headline block occupying the left two-thirds and roughly half the
   viewport height; a single filled button beneath it; the right third held by a
   full-bleed image running off the edge."
3. **The world**: palette by name AND hex from the design plan's tokens, the
   display face's character (compression class, serif/sans/mono, weight), the
   material language, the grade.
4. **Medium and finish**: "rendered as a high-fidelity web design comp, crisp
   vector-sharp UI edges, real photographic material only inside image regions".
5. **The anti-references, verbatim from PRODUCT.md.** An unnamed region gets
   filled from the model's average, and the average is the category default —
   an unnamed utility bar comes back as SHOP / ABOUT / CART even when "generic
   e-commerce" is the brief's stated anti-reference. Either name the real nav
   items and the real CTA label, or state there is no navigation.
6. **Text rule — bind every legible string to its region, and never use the
   word "greeked".** Two failures, both observed:
   - The instruction becomes content. "every other text region is greeked" comes
     back rendered as the literal words *indistinct greeked lines of text*, and a
     button labelled *greeked text*. Ask for the visual instead: "every other
     text region is lorem ipsum filler at its real size" (the only phrasing that
     rendered correctly) or "illegible blurred horizontal bars".
   - A loose list of legible words scatters them. "the only legible words are
     'Acme' and the headline" puts the product name inside the CTA button. Bind
     them: "the wordmark in the top-left reads 'Acme'; the headline reads
     '<real headline>'; the button reads '<real CTA label>'; every other text
     region is lorem ipsum filler."

   Invented prices, specs, dates or testimonials in a comp are claims PRODUCT.md
   never made — that is what this rule exists to prevent, so check the render for
   them rather than trusting the instruction.

Keep the whole prompt under ~180 words. Log it verbatim (§ Logging).

## What varies across the three

**The world is fixed. Only structure varies.** Same palette, same type voice,
same material language, same mood in all three — those were decided in the plan
and the comp round must not reopen them. If the three differ in colour or font,
the round has become a second art direction and the human is now choosing an
identity by accident.

Pick three axes from this list, one per comp, and state which axis each comp is
testing when presenting them:

- **Topology** — where the mass sits: split-screen vs full-bleed vs stacked
  editorial vs asymmetric offset grid.
- **Sequence** — what the visitor meets first: type-led, image-led, or
  artifact-led (the product doing its job).
- **Density** — generous and gallery-quiet vs dense and information-forward.
- **Hierarchy** — one dominant element vs two competing anchors.
- **Focal composition** — where the eye lands and where the primary action sits
  relative to it.
- **Signature placement** — the signature moment visible in the first viewport
  vs deliberately withheld until the climax section.

## Generation

- Ratio 16:9, desktop. Mobile is NOT comped — it is designed as its own
  choreography at build time and verified as such. Comping a landing in portrait
  misstates the composition.
- **A comp needs a text-capable model, which is a different price class from a
  photo slot.** The ~1 credit/image figure in the assets skill was measured on a
  photography model; models that render legible type measured 1.25-2 credits
  (2026-08-09), so the round is **4-6 credits, not 3**. Always re-measure with
  `get_cost` before quoting a number, and quote the round total, not the unit.
- Resolve the model with `models_explore` as any slot does, then verify what
  actually ran: a request for one model can execute on a sibling (observed:
  `nano_banana_pro` requested, `nano_banana_2` executed, charged at the
  requested model's rate). Record the executed model in the log, not the asked-for
  one.
- The spend is authorized at intake, before the gate, precisely so the comp
  round does not become a second stop. No authorization → skip the round.
- Generate the three as one batch (`generate_image_batch`) — distinct prompts,
  one round trip.
- If a comp comes back as a poster, regenerate that one with the scaffold stated
  more literally. Budget one regeneration per comp; past that, show what exists
  and say which axis failed to render.

## Presenting them at the gate

Show all three together with the design plan and the script. For each: the axis
it tests, in one line. Ask three things:
1. Which composition carries forward (one, or a named combination)?
2. What feels false to the world?
3. Is the plan approved as it stands?

The human may pick a combination ("comp 2's topology with comp 1's hero scale")
— record that as the approved composition in prose, and treat comp 2 as the
reproduction reference for everything the combination does not override.

If the human delegates the choice, choose using the brief, PRODUCT.md and the
plan, state the evidence, and disclose that it was delegated in the first line
of the report — not the last.

## After approval — the fidelity inventory

The approved comp is now a contract, and everything it does not show gets built
from what you write down here. Read the comp as a design system and record it in
the design plan under `## Comps` (and carry the medium column into the asset
slot table):

- **Component grammar**: corner language, line weights, elevation treatment,
  button and input character, icon stroke.
- **Type ramp**: the actual scale relationships visible in the comp, and the
  display face's compression class. Render one headline word in the chosen face
  and compare it against the comp before building on it — a visibly wider or
  lighter silhouette means the face is wrong, and every section inherits the miss.
- **Region inventory with a MEDIUM each** — `produce` (raster to generate),
  `direct` (real asset the client supplies), `semantic` (HTML/CSS/SVG/canvas).
  The gate: decide from what the region SHOWS, never from what feels buildable.
  Anything with lighting, depth, a figure, or a named material texture (cloth,
  paper grain, brushed metal) is `produce` whatever the stack — "layered CSS
  texture" is not a medium, it is how an approved art direction quietly becomes
  a flat page. Conversely, precise geometry, diagrams, flat shape systems and
  anything that must move or respond is `semantic`, where a raster would flatten
  what should animate.
- **Quantity commitments**: for any field built from many small elements, write
  down its approximate density and coverage ("hundreds of hairlines across the
  top third, fading into the fold"). A field rebuilt at a tenth of its density
  passes every checklist and is still not the design.

Never crop pixels out of a comp to ship as an asset. A full-page comp's
effective resolution is reference grade, not asset grade — every comp-derived
asset is regenerated cleanly at asset resolution through the assets skill, with
the comp as the reference.

## What the comp does NOT decide

Core UI text, responsive behaviour, accessibility, semantics, interaction
states, and real copy remain implementation responsibilities. Treat the comp as
a north star, not something to trace: translation into semantic, responsive,
accessible code — never recomposition. Keeping the palette and mood while
redrawing the topology is a second art direction, not an adaptation.

## Logging

Write `docs/comps/comps.md`: one entry per comp — file path, the axis it tests,
the verbatim prompt, the model requested AND the model that actually executed,
the credits spent, and a two-line read of what the render got right and what it
botched (invented nav, leaked instructions, fake data). Then the decision: which
comp was approved (or the combination), the human's words for why, and the
fidelity inventory. This is what the build reads before composing a single
section, and what a later refine round reads instead of guessing.

## Degraded path

Higgsfield unreachable, or the human declined the comp spend at intake: skip the
round, gate on the plan and the ASCII wireframe as before, and state in the
final report that the build ran without a comp reference. It is a weaker run,
not a failed one — but say so rather than letting a wireframe-only approval read
like an approved composition.
