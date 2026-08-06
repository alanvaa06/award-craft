# Prompting — Higgsfield MCP media briefs

Lookup doc for constructing and iterating generation prompts for landing-page
media (hero images, textures, background loops, product shots, UGC). Read
before calling any Higgsfield MCP generation tool.

## 1. Universal prompt skeleton

Every current model guide converges on the same skeleton. Differences between
models are dialect (parameters, negative-prompt support), not structure.

**Image formula**:
`[Subject] + [Action/Pose] + [Setting] + [Composition/Framing] + [Lighting] + [Camera/Lens] + [Style/Medium] + [Mood] + [Technical params]`

**Video formula** (Veo 3.1 official structure):
`[Cinematography] + [Subject] + [Action] + [Context] + [Style & Ambiance] (+ [Audio])`

### Transversal rules (repeated across Google / OpenAI / Runway / BFL first-party guides)
- Natural language beats tag clouds. Brief it like a set photographer, not a
  search engine.
- Front-load the subject — Flux and most diffusion/DiT models weight prompt
  openings heavily.
- Every word earns its place. Past ~100 words (image) or ~200 (video),
  confusion sets in. The stacked-quality-keyword habit ("8k, masterpiece,
  ultra-detailed") is ignored or misread by modern models.
- One idea per generation — one camera move, one subject action, one scene.
- Positive framing. Describe what you want. FLUX.2, Runway Gen-4 and Nano
  Banana either don't support negatives or actively insert what you excluded
  — negatives backfire on these three. Where negatives ARE supported
  (SDXL-family, Kling, Veo as scene descriptions, Midjourney `--no`), keep
  them under ~10% of prompt mass.
- Iterate one variable at a time, and expect variance: budget 3–5
  generations per shipped asset.

## 2. Premium vocabulary

Photography-style prompts produce the most commercially usable output. Name a
medium — "analog 35mm photography", "medium-format editorial", "Kodak Portra
400" — rather than "photorealistic".

**Medium/stock**: analog 35mm, medium-format, Kodak Portra 400, shot on
RED/Arri Alexa.

**Lighting recipes**: golden-hour backlight, soft north-window light,
three-point softbox, chiaroscuro, rim + warm fill + cool spill. Name 3–5
color anchors per shot for grade consistency (Sora guidance).

**Lens/aperture**: 35mm environmental, 50mm natural, 85mm f/1.8 portrait
compression, 100mm macro, f/8 deep focus for architecture.

**Deliberate imperfection**: "pronounced film grain", "slightly imperfect
framing". Perfection reads as synthetic; controlled imperfection reads as
premium editorial.

**Restraint**: muted palettes, negative space, single-subject compositions.
High saturation + centered subject + perfect symmetry is the default AI look
you are avoiding.

**Materiality**: "navy blue tweed", "minimalist ceramic" — under-specified
materials are the #1 source of AI-looking renders.

## 3. Negative space for UI slots

Prompt for negative space explicitly where UI will sit: "large empty
negative space on the left third for text overlay", "low-contrast area at
top for navigation". Models comply imperfectly — generate wider than needed
and crop, which also buys responsive art-direction flexibility via
`<picture>`/`srcset`. Outpainting extends a good composition to an extreme
ratio instead of regenerating.

Ratios are fixed by the slot contract in
`${CLAUDE_PLUGIN_ROOT}/skills/assets/SKILL.md` — never choose alternatives.
This file only supplies prompt phrasing per slot type.

Delivery: WebP/AVIF, per-breakpoint variants, under ~500KB where possible.

## 4. Textures and abstract backgrounds

The lowest-risk, highest-yield AI asset class for premium sites — no
anatomy, no uncanny valley, easy brand-color control.

Recurring ingredients: "abstract gradient background, [brand colors],
minimal gradient transitions, high legibility for overlaid text, subtle
noise texture, large negative space". Anchor to physical media for premium
texture — frosted glass, brushed aluminum, silk macro, paper grain, smoke in
a dark studio under a single gel.

Rules:
- Name exact brand colors (hex works with varying fidelity; color names +
  reference image is more reliable).
- Ask for "subtle", "minimal", "soft transitions" — default AI gradients are
  too loud for premium UI.
- Add subtle film grain to kill banding in large gradients (also survives
  WebP compression better).
- Generate darker and lower-contrast than you think; busy backgrounds fight
  typography.
- These loop well as video — a slowly drifting version of the same texture
  is the cheapest premium hero background.

## 5. Seamless-loop technique ranking

A loop is seamless when last frame roughly equals first frame. In order of
reliability:

1. First-frame = last-frame interpolation using the *same image* for both —
   the structurally guaranteed loop (Veo 3.1 / Kling end-frame control).
2. Prompt cyclical motion that departs and returns — "a flag unfurls and
   settles", "smoke swirls up and curls back down".
3. Static camera, locked off, consistent lighting belongs in every loop
   prompt — any drift breaks the wrap.
4. Post fallback: 0.5–1s crossfade of tail onto head.
5. Subject whitelist: abstract gradients, smoke, liquid, clouds, bokeh drift
   only — avoid people and readable objects; loop errors are instantly
   visible there.

Web delivery: 6–10s, muted autoplay, no audio track, H.264/H.265 + WebM,
under ~2–4MB, `poster` fallback, `prefers-reduced-motion` respected, low
contrast behind text.

### Product motion (if a slot needs it)
Image-first: perfect the still (Flux/Nano Banana/Seedream), then prompt only
the motion — "slow 180-degree orbit around the bottle, condensation slides
down, static background". Never re-describe the product; the image is the
source of truth. One motion per clip, 4–8s, cut multiple clips rather than
requesting a long take.

## 6. Anti-uncanny UGC rules

Even premium brands sometimes need UGC-style assets for paid social and
testimonial sections. Tool split: Sora 2 for talking clips (nails
phone-camera texture), Veo 3 for motion hooks and demo b-roll, dedicated
avatar tools for scripted heads, assembled in an editor.

Invariant ad skeleton: Hook (0–3s) -> Problem -> Demo/proof -> casual CTA.
The hook does more work than production quality. Categories that perform:
curiosity gap, bold claim, social proof, speed/transformation, objection
handling.

Rules:
- Avoid over-polished avatars — perfect skin plus studio lighting reads as
  fake and gets down-ranked. Platforms reward natural/home lighting and
  handheld framing.
- Generate ~5 distinct creator variants per ad and test — messenger trust
  matters as much as the hook.
- Prompt-side: "handheld selfie framing, natural window light, casual
  tone", dialogue in the dedicated block, 1–2 short exchanges per 4–8s clip.

## 7. Consistency machinery — ranked

1. Reference images beat everything. Midjourney `--sref`, Nano Banana's 14
   reference slots, Runway Gen-4 References, Veo "ingredients", Higgsfield
   Soul ID. The industry-standard mechanism in 2026.
2. A locked prompt template — palette, typography, style descriptors,
   camera/lighting recipe appended verbatim to every generation. The more
   consistent your input, the more consistent the output.
3. Custom style training (LoRA / fine-tune) on 20–50 approved brand images
   for high-volume programs — strongest lock, real setup cost.
4. Seeds — narrow use only. Same seed + same prompt reproduces an image;
   same seed + different concept does NOT carry style. Seeds are for
   testing, useless for brand consistency across concepts.

## 8. Higgsfield specifics

Higgsfield is a multi-model AI media platform (image / video / 3D / audio)
whose distinguishing features are a trained-identity consistency layer
(Soul ID), productized UGC-ad modes, and an official agent-skills repository.
The architectural read: Higgsfield workflows are multi-model routing, not
single-model prompting — the skill/tool picks the underlying model (Nano
Banana 2, Soul V2, Veo 3.1, Kling 3.0, Seedance 2.0, Flux 2, GPT Image 2,
Seed Audio 1.0, among 30+ named models); you describe the outcome, not the
model.

### Soul ID — trained identity, not seeds
The consistency machinery for people and characters is a trained identity
model, not seed pinning. Training returns a `reference_id` that chains into
every subsequent generation call — train once, reference everywhere
(LoRA-lite mental model). Once trained, the same face applies automatically
without re-supplying reference images each time.

Operational specifics (vendor-sourced, treat as guidance not guarantee):
trains on 20+ reference photos (up to 80 accepted); reference-photo prep
wants >=960px images, varied angles and expressions, no sunglasses/masks/
extreme expressions, and consistent lighting across the reference set.
Recommended workflow: build the character -> generate a portrait batch ->
train Soul ID on that batch -> use the `reference_id` for everything after.

Use Soul ID when a landing needs a recurring human across testimonial,
about, or campaign assets — not for one-off abstract or product shots, where
a locked prompt template plus reference images is enough.

### hero_banner mode
The `product-photoshoot` skill/tool exposes a `hero_banner` mode — a
wide-format mode built for website and campaign headers. This is the direct
hit for a landing-page hero slot: prefer it over a generic image-generation
call when the slot is the hero.

### UGC mode templates
UGC avatar ads are productized as named modes combining avatars + products,
so generation is template selection rather than free-form prompting:

| Mode | Output |
|---|---|
| `ugc` | Default — casual, organic-feel presenter content |
| `ugc_how_to` | Tutorial / explainer |
| `ugc_unboxing` | Unboxing reveal |
| `virtual_try_on` | Polished model-driven clothing try-on |

The anti-uncanny rules in section 6 still bind on top of the template: mode
selection gets you a structurally correct ad fast, but over-polished avatars
still get down-ranked, and ~5 creator variants should still be tested per ad.

### Multi-model routing note
Do not hand-pick an underlying model by name inside a brief. Describe the
outcome (subject, composition, motion, mood) and let the Higgsfield
tool/skill route to the model suited to that outcome — this is the same
posture as the rest of this reference: brief like a photographer directing
an outcome, not an engineer selecting a checkpoint.

## 9. Prompt-log governance

Keep a prompt log (prompt, seed, references, model + version, date) per
shipped asset. Beyond reproducibility, EU AI Act transparency provisions
make generation records a practical compliance requirement for commercial
work in Europe from mid-2026. Record this log entry at generation time, not
retroactively — it is cheapest to capture right after the pick is made.
