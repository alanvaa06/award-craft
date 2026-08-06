# Scroll-Driven Video

Lookup reference for the `build-recipes` skill: the engineering behind
Apple-style landing pages where a product sequence plays under scroll
control. Source: Scroll-Driven Video Landing Pages.

Every implementation has the same three moving parts: a pinned viewport
region (visual stays fixed while the user scrolls through a tall virtual
distance, typically 2,000-6,000px for a 3-8s clip), a scroll-to-time mapping
(scroll progress 0-1 mapped to a frame index or `currentTime`, with
smoothing), and a frame renderer (a `<canvas>` that `drawImage()`s a
pre-decoded frame, or a `<video>` whose `currentTime` is seeked).

Apple's AirPods Pro page uses the image-sequence-on-canvas route: ~148
numbered frames served from predictable zero-padded URLs preloaded into
`Image` objects, painted to canvas by scroll progress. It is a flipbook, not
a video.

## The Four Techniques — Decision Matrix

| Criterion | Canvas image sequence | `<video>` currentTime | WebCodecs | CSS scroll-timeline |
|---|---|---|---|---|
| Scrub smoothness (incl. reverse) | Excellent | Fair-poor (codec/browser dependent) | Excellent | n/a for video frames |
| Payload | Highest (WebP/AVIF mitigates) | Lowest (but `-g 1` ~2x) | Low | — |
| Memory | High — budget it | Low | High during decode | Minimal |
| Mobile reliability | Best | Worst | Good w/ fallbacks | Good |
| Implementation cost | Medium | Low | Low (library) / High (DIY) | Low |
| Best for | Hero sequences 3-8s | Long video, desktop-first | One-file premium scrub | Everything *around* the video |

**Canvas image sequence is the 2026 default.** Every frame is a fully
decoded bitmap, so there is no codec seek latency and reverse scrubbing is
exactly as fast as forward — the killer weakness of `<video>`. Full pixel
control (composite text/masks/WebGL in the same canvas), and you can serve a
smaller mobile frame set without re-encoding.

Benchmark evidence (Ghosh, 6 delivery strategies): server-pre-generated
frames were 3-4.5x faster to first-interactive than any client-side
extraction — 244 frames ready in ~2.5s first hit / ~1.3s cached, at only
~20% more bytes (~3MB images vs ~2.5MB video). Client-side extraction by
seeking is itself 2-3x faster than the play-and-capture method (~9s vs
18s+) — but both lose to pre-generation.

Costs: payload, and memory. A decoded 1920x1080 frame is ~8.3 MB RGBA; 150
frames fully decoded ~= 1.2 GB. No audio, no "tap to play normally"
fallback, and you own an ffmpeg pipeline + manifest + preloader UI.

### `<video>` + currentTime — the keyframe problem

```js
video.currentTime = (window.scrollY /
  (document.documentElement.scrollHeight - window.innerHeight)) * video.duration;
```

Codecs store keyframes (I-frames) as full images and delta frames as diffs.
Seeking to a non-keyframe forces the decoder back to the previous keyframe
and forward through every delta — and some players skip delta
reconstruction entirely when seeking, so only keyframes render. Default
encodes are brutal here: Adobe Media Encoder ships a typical 72-frame
keyframe interval.

Per-browser reality:

| Browser | Behavior |
|---|---|
| Desktop Safari | Best seeker — reconstructs delta frames on the fly, smooth even with few keyframes |
| Chrome / Edge | Acceptable at ~1 keyframe per 5 frames |
| Firefox | Needs ~every 2 frames, and prefers WebM/VP9 — choppy on MP4 regardless of density |
| Android (native scroll) | Fails outright — no frame updates render while scrolling is in motion |
| iOS | Needs `muted playsinline preload="auto"`; Low Power Mode can suspend decoding entirely |

Density costs real bytes: keyframe-every-5 vs every-100 measured 845 KB vs
146 KB (MP4) and 1038 KB vs 195 KB (WebM) — roughly 5x file size for
scrub-grade encoding. Ship both MP4 and WebM: Firefox scrubs MP4 badly, iOS
Safari handles WebM badly.

Micro-optimizations: throttle seeks past a ~0.1s delta threshold, lerp the
scroll percent, and wait for `seeked` before issuing the next seek.

### WebCodecs — one file, canvas-grade smoothness

Demux the MP4 in-browser (mp4box.js or mediabunny), feed
`EncodedVideoChunk`s to a `VideoDecoder`, `drawImage()` the resulting
`VideoFrame`s. Breaks the classic trade-off: ship one small file, scrub like
canvas.

Two hard requirements: `VideoFrame` objects hold GPU memory and must be
explicitly `.close()`d (failing to do so turns the page into a memory leak
— keep a sliding window, the reference impl evicts frames outside ±1s), and
coalesce the seek queue (when more than ~3 seeks are pending, skip to the
latest scroll position and discard intermediates, or the visual visibly
"catches up"; debounce scroll via rAF).

Support (as of mid-2026): Chromium best; Safari desktop/iOS arriving around
iOS 26; Firefox partial on some paths. A fallback path is mandatory.

### CSS scroll-driven animations — for everything around the video

```css
.card { animation: reveal linear both; animation-timeline: view();
        animation-range: entry 0% cover 40%; }
```

`scroll()` maps to a scroll container's position; `view()` maps to the
subject's visibility in the scrollport. Runs off the main thread for
compositable properties. Support in 2026: Chrome/Edge 115+, Firefox 132+,
Safari 18+ (~90% global). Feature-detect with `@supports
(animation-timeline: scroll())`.

Limit: CSS cannot drive `video.currentTime` or a canvas. Practical pattern =
CSS scroll timelines for text reveals/parallax/progress + GSAP/canvas for
the frame sequence itself.

## Asset Preparation (ffmpeg)

Rule of thumb: 12-15 fps of extracted frames is enough for scroll scrubbing
— scrub smoothing hides the gaps. Reserve 24-30 fps for very slow, very
long scroll distances.

```bash
# WebP — ~30% smaller than JPEG at equal quality; best default in 2026
ffmpeg -i master.mp4 -vf "fps=15,scale=1920:-2" -c:v libwebp -quality 75 frames/frame_%04d.webp

# Mobile set (serve conditionally)
ffmpeg -i master.mp4 -vf "fps=12,scale=960:-2" -c:v libwebp -quality 70 frames-mobile/frame_%04d.webp
```

```bash
# Scrub-grade H.264: every 2nd frame a keyframe, no audio, scenecut disabled
ffmpeg -i master.mp4 -an -vcodec libx264 -x264-params keyint=2:scenecut=0 -pix_fmt yuv420p scrub.mp4

# WebM/VP9 variant — REQUIRED for smooth Firefox scrubbing
ffmpeg -i master.mp4 -an -vcodec libvpx-vp9 -g 2 -crf 32 -b:v 0 scrub.webm
```

- `%04d` zero-pads names, keeping URL generation trivial.
- AVIF decode cost matters here — you decode 100+ images on one page. WebP
  is the size/decode sweet spot for sequences; reserve AVIF for when
  payload is the binding constraint.
- Keep frames <= ~1920px. 4K frames explode payload *and* decode memory.
- `-an` strips audio (scrubbed video must be muted for autoplay policies);
  `yuv420p` for universal decode.

## GSAP Implementation

Official helper: `imageSequenceScrub`. Production version with pinning, DPR
cap, cover-fit and off-main-thread decode:

```js
const urls = Array.from({ length: 148 }, (_, i) =>
  `/frames/frame_${String(i + 1).padStart(4, "0")}.webp`);
const state = { frame: 0 }, images = [];

// object-fit: cover math, done manually; never resize inside onUpdate
function render() {
  const img = images[Math.round(state.frame)];
  if (!img) return;
  const cr = canvas.width / canvas.height, ir = img.width / img.height;
  let dw, dh;
  if (ir > cr) { dh = canvas.height; dw = dh * ir; }
  else         { dw = canvas.width;  dh = dw / ir; }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, (canvas.width - dw) / 2, (canvas.height - dh) / 2, dw, dh);
}

Promise.all(urls.map((url, i) =>
  fetch(url).then(r => r.blob()).then(createImageBitmap)  // decode off main thread
            .then(bmp => (images[i] = bmp))
)).then(() => {
  fitCanvas();
  gsap.to(state, {
    frame: 147, snap: "frame", ease: "none", onUpdate: render,
    scrollTrigger: { trigger: ".hero", start: "top top", end: "+=4000",
                     pin: true, scrub: 0.5, anticipatePin: 1 }
  });
});
```

Critical details:
- `scrub: 0.5` (a number, not `true`) adds the short catch-up lag that makes
  frame steps imperceptible — this is what reads as "premium." See
  scrolltrigger-patterns.md for why numeric scrub is a smoothing delay in
  seconds.
- `snap: "frame"` lands on integer indices, avoiding double-painting
  interpolated ones.
- Never resize the canvas inside `onUpdate` (layout thrash) and never
  allocate there — paint only.
- Cap DPR at 2 to bound memory: `canvas.width = clientWidth *
  Math.min(devicePixelRatio, 2)`.
- In React: wrap in `useGSAP(() => {...}, { scope })` so the trigger and
  tween are cleaned up on unmount.

## Preloading, Decoding, Memory

Loading strategies in ascending sophistication:

1. Eager all-frames + loader UI — Apple's hero approach. Show frame 0 (or a
   poster `<img>`) immediately for LCP.
2. Priority-window loading — frame 0 first, then every 4th frame (usable
   low-fps sequence fast), then backfill.
3. Scroll-aware lazy loading — keep a decoded window of ±N frames, fetch
   approaching frames, `close()` bitmaps far behind. Essential above ~300
   frames.

Decoding correctly matters as much as loading. `new Image(); img.src = url`
alone defers decode to first paint, so the first scrub pass jank-decodes
every frame on the main thread. Fix with `img.decode()` (async after load)
or `createImageBitmap(blob)` (off-main-thread; pairs with a Web Worker +
`OffscreenCanvas` for a fully main-thread-free pipeline).

The architectural choice is fundamentally network download size traded
against on-device decode compute.

Core Web Vitals: poster image for LCP, reserved canvas dimensions for CLS,
allocation-free `onUpdate` for INP.

## requestVideoFrameCallback (for the `<video>` route)

Fires when a new frame has actually been presented to the compositor, with
`mediaTime` / `presentedFrames` / `expectedDisplayTime` metadata. Solves
"did my seek actually paint yet?":

```js
video.currentTime = t;
video.requestVideoFrameCallback((now, meta) => {
  // frame at meta.mediaTime is on screen — safe to seek again, or drawImage it
});
```

Use it to throttle seeks to real presentation rate instead of scroll-event
rate, and to mirror exact frames into a canvas pipeline. Chrome 83+, Safari
15.4+, Firefox via Interop 2024.

## Libraries

- **ScrollyVideo.js** (`dkaoster/scrolly-video`) — the reference for the
  single-file route. Three-tier internal strategy: WebCodecs->canvas
  (Chromium), `playbackRate` modulation (can't go backwards), `currentTime`
  fallback. Options include `videoPercentage` + `setVideoPercentage()` for
  external control — drive it from ScrollTrigger. Recommends keyframe
  interval 1. Known limitation: iOS battery-saver suspends it.
- **diffusionstudio/webcodecs-scroll-sync** — minimal WebCodecs reference
  implementation.
- **GSAP `imageSequenceScrub`** — the canonical DIY canvas route.

## Recommended 2026 Stack

ffmpeg -> 12-15 fps WebP frames (desktop + mobile sets) -> `createImageBitmap`
preloader with poster frame -> GSAP ScrollTrigger (`pin`, `scrub: 0.5`,
`snap: "frame"`) painting to a DPR-capped cover-fit canvas -> CSS
scroll-driven animations for surrounding text and parallax with an
`@supports` fallback. Reach for ScrollyVideo.js only when a single video
file must ship as-is.
