<!-- @tracks
  src/fmtion/types/
  src/core/nodes/meshGeometrySources.ts
-->

# Param Types

This page documents the **value-types every node parameter expects**. Different from [`port-types.md`](port-types.md), which documents the runtime types that flow through wires:

- **Port types** (`float`, `vec2`, `transform`, …) describe what travels through `connections`.
- **Param types** (this page) describe the JSON shape an author writes inside `params.<key>` on a node.

Per-node MDs list each parameter's `type:` in the Parameters table. This page is the reference for what JSON value satisfies that type.

## Quick reference

| Type | Section | One-line shape |
|---|---|---|
| `float`, `int` | [Primitives](#primitives) | A number. |
| `bool` | [Primitives](#primitives) | `true` / `false`. |
| `string` | [Primitives](#primitives) | A string. |
| `enum` | [Primitives](#primitives) | One of the `options` listed in the Parameters table. |
| `elementSelector` | [Selectors and pickers](#selectors-and-pickers) | A CSS selector string. |
| `selectorList` | [Selectors and pickers](#selectors-and-pickers) | Comma-separated selectors, or a `string[]`. |
| `objectPicker` | [Selectors and pickers](#selectors-and-pickers) | A canvas object id. |
| `bonePicker` | [Selectors and pickers](#selectors-and-pickers) | A bone id. |
| `cssProperty` | [Selectors and pickers](#selectors-and-pickers) | A CSS property name (`opacity`, `--my-var`). |
| `domEvent` | [Selectors and pickers](#selectors-and-pickers) | A DOM event name (`click`, `mouseenter`). |
| `axisChooser` / `eventTypeChooser` | [Selectors and pickers](#selectors-and-pickers) | Constrained-string enum. |
| `colorString` | [Selectors and pickers](#selectors-and-pickers) | A CSS color string. |
| `color` | [Primitives](#primitives) | `{ r, g, b, a }` 0..1. |
| `easingCurve` | [Easing](#easing) | A preset name or parametric string. See [`easing.md`](easing.md). |
| `expression` | [Expression](#expression) | A JavaScript expression string. |
| `floatArray` / `numberList` | [Arrays and maps](#arrays-and-maps) | `number[]`. |
| `stringArray` | [Arrays and maps](#arrays-and-maps) | `string[]`. |
| `attrMap` / `stringFloatMap` | [Arrays and maps](#arrays-and-maps) | `Record<string, number \| string>`. |
| `propertyAnimationChannels` | [Channel maps](#channel-maps) | Per-CSS-property keyframe channel map. |
| `staggerChannels` | [Channel maps](#channel-maps) | Stagger writer channel map (from→to + ease). |
| `multiKeyframeChannels` | [Channel maps](#channel-maps) | Multi-output keyframe channels. |
| `domVariablesChannels` | [Channel maps](#channel-maps) | CSS-custom-property writer channels with per-var remap. |
| `meshAttractorChannels` | [Channel maps](#channel-maps) | F375 per-channel literal-or-port config. |
| `counterChannels` / `dockToChannels` / `indexedDockChannels` / `textSequenceChannels` / `textStaggerChannels` / `textRevealChannels` / `stringChannels` | [Channel maps](#channel-maps) | Compound-specific channel maps. |
| `clipPathKeyframes` | [Keyframes](#keyframes) | `[{ time, points: [[x,y], …] }, …]`. |
| `colorKeyframes` | [Keyframes](#keyframes) | `[{ time, color: { r,g,b,a } }, …]`. |
| `meshGeometrySource` | [Geometry](#geometry) | One of `round` / `spike` / `blob` / `svgPath` / `textOutline` / `clipPath` / `rawVertices`. |
| `physicsShape` | [Physics](#physics) | One of `circle` / `box` / `polyline` / `compound` / `fromSelector`. |
| `scrollEdges` | [Scroll edges](#scroll-edges) | `<elementEdge> <viewportEdge> [+= offset]`. |
| `smParameters` / `smLayers` / `smListeners` / `smAudioBindings` / `smPointerAlignTargets` | [State-machine sub-shapes](#state-machine-sub-shapes) | See `stateMachine.md`. |
| `textWaveRanges` / `textRevealVariants` / `staggerInnerTemplate` / `variantStaggerTable` / `variantStaggerChannelMeta` / `colorPaletteStops` / `domPoseProperties` | [Compound-internal one-offs](#compound-internal-one-offs) | Compound-specific. See the owning node's MD. |

---

## Primitives

```json
{
  "params": {
    "duration": 0.5,        // float
    "count": 12,             // int — same as float, integer-valued
    "loop": true,            // bool
    "label": "hero",         // string
    "mode": "smooth",        // enum — value must be in the param's options[]
    "tint": { "r": 1, "g": 0.5, "b": 0.2, "a": 1 }   // color
  }
}
```

`enum` values are constrained — the per-node Parameters table lists the legal `options`. Unknown values are dropped at load.

`color` is RGBA 0..1, not 0..255 / hex. For CSS-color strings (`"#ff8000"` / `"hsl(30 80% 50%)"`) use [`colorString`](#selectors-and-pickers).

---

## Selectors and pickers

| Type | What goes in | Example |
|---|---|---|
| `elementSelector` | A CSS selector string. Multiple matches are allowed; the consuming node either writes to the first match or fans out via a forEach instance — see the per-node MD. | `".hero h1"`, `"#cta"`, `".ft-split-char"` |
| `selectorList` | Multiple selectors. Either a comma-separated string, or a string array. | `".btn, .link"` or `[".btn", ".link"]` |
| `objectPicker` | The id of a canvas scene object, declared elsewhere in the same `.fmtion`. | `"hero/title"` |
| `bonePicker` | The id of a bone in a skeleton declared in the same `.fmtion`. | `"spine_03"` |
| `cssProperty` | A CSS property name — standard properties or custom variables (must start with `--`). | `"opacity"`, `"translateY"`, `"--bento-col"` |
| `domEvent` | A DOM event name. | `"click"`, `"mouseenter"`, `"keydown"` |
| `axisChooser` | A constrained string. Per-node enum but the common values are: | `"vertical"`, `"horizontal"`, `"both"`, `"x"`, `"y"`, `"z"` |
| `eventTypeChooser` | A constrained string for event-pulse types. Per-node enum. | `"pulse"`, `"toggle"`, `"latch"` |
| `colorString` | A CSS color string. | `"#ff8000"`, `"rgb(255 128 0 / 0.5)"`, `"hsl(30 80% 50%)"` |

For the difference between `cssProperty` and writing into a transform component vs a CSS variable, see [`nodes/boundary/domPropertyWrite.md`](nodes/boundary/domPropertyWrite.md).

---

## Easing

`easingCurve` accepts:

- Any preset registered with FM — `linear`, `easeInCubic`, `easeOutBack`, `spring.bouncy`, …
- A parametric string — `cubic-bezier(0.4, 0, 0.2, 1)`, `back.out(1.4)`, `elastic.out(1, 0.3)`.
- An object form for custom bezier:

```json
{ "type": "bezier", "controlPoints": [0.68, -0.55, 0.265, 1.55] }
```

Full preset list: [`easing.md`](easing.md).

---

## Expression

A JavaScript expression that runs once per frame. `expression`-typed nodes have `dynamicPorts: true` — input port names are author-defined; reference them by name in the expression text.

```json
{
  "type": "expression",
  "params": {
    "expression": "(progress + index / count) % 1"
  },
  "connections": {
    "progress": { "nodeId": "scroll", "port": "progress" },
    "index":    { "nodeId": "forEach", "port": "index" },
    "count":    { "nodeId": "forEach", "port": "count" }
  }
}
```

Two reference patterns:

- **Direct port names** (`progress`, `index`, …) — refer to wired inputs.
- **`node('id')` cross-references** — pull a value from any other node in the graph by id without a wire. Adds an implicit dependency, so the expression re-evaluates when that node's output changes.

Allowed: standard `Math.*` (`sin`, `cos`, `min`, `max`, `floor`, `abs`, `pow`, `sqrt`, …), arithmetic, comparison, ternary, `Math.PI`. No `eval`, no DOM access, no globals.

If `node('foo')` references a missing id, the validator emits **`EXPR_REFERENCES_MISSING_NODE`** at runtime.

---

## Channel maps

Several nodes accept a `channels` param: a `Record<channelName, channelConfig>` map. The shape of `channelConfig` differs by type, but they all share the pattern of "one map entry per CSS property / output channel."

### `propertyAnimationChannels`

Multi-stop keyframe per CSS property. Used by `propertyAnimation`, `slideSlotAnimation`, `carouselFanout`.

```json
"channels": {
  "translateY": {
    "cssUnit": "px",
    "keyframes": [
      { "time": 0,   "value": 0 },
      { "time": 0.5, "value": -20, "ease": "easeOutCubic" },
      { "time": 1,   "value": 0 }
    ]
  },
  "color": {
    "keyframes": [
      { "time": 0, "color": { "r": 1, "g": 1, "b": 1, "a": 1 } },
      { "time": 1, "color": { "r": 1, "g": 0, "b": 0, "a": 1 } }
    ]
  },
  "opacity": {
    "keyframes": [
      { "time": 0, "valueFromCSS": "--initial-opacity", "value": 1 },
      { "time": 1, "value": 0 }
    ]
  }
}
```

- `value` (float) or `color` (`{r,g,b,a}` 0..1) per keyframe.
- `valueFromCSS: "--name"` reads each matched element's computed CSS custom property at bind time as a per-element keyframe override; static `value` is the fallback when the variable is unset.
- `colorFromCSS: "--name"` does the same for a color keyframe.
- `cssUnit` controls the unit string appended at write time (`px`, `deg`, `%`, `vw`, …).

### `staggerChannels`

Used by `staggerWrite`. One entry per CSS property; all entries share one stagger window + one progress driver.

```json
"channels": {
  "rotateX": { "from": -90, "to": 0, "cssUnit": "deg", "ease": "easeOutCubic" },
  "opacity": { "from": 0,   "to": 1 },
  "color":   {
    "mode": "hueCycle",
    "template": "hsl({value} 80% 65%)",
    "from": 0, "to": 360
  },
  "translateY": {
    "fromMin": -40, "fromMax": -10,
    "toMin":     0, "toMax":     0,
    "cssUnit": "px"
  }
}
```

- `from` / `to` are scalars by default. Replace them with `fromMin` / `fromMax` (and optionally `toMin` / `toMax`) for **F360 random ranges** — each element draws its own from/to from the range.
- `mode: "hueCycle"` requires a `template` containing `{value}` and an `hsl(...)` reference. Use for color cycling.
- `template` works for any non-numeric CSS value: `hue-rotate({value}deg)`, `circle({value}% at 50% 50%)`, `blur({value}px)`.

### `multiKeyframeChannels`

Used by `multiKeyframe`. Same keyframe shape as `propertyAnimationChannels`, but emits one float output per channel rather than writing to CSS.

### `domVariablesChannels`

Used by `domVariablesWrite`. Each row defines one CSS custom property + its remap.

```json
"properties": [
  {
    "name": "--bento-col",
    "outputMin": 1, "outputMax": 4,
    "inputMin": 0,  "inputMax": 1,
    "unit": "",
    "ease": "linear",
    "clamp": true
  },
  {
    "name": "--accent-hue",
    "outputMin": 200, "outputMax": 320,
    "unit": "",
    "ease": "easeInOutCubic"
  }
]
```

The shared `value` input is remapped per-row using `inputMin/Max → outputMin/Max` with `ease`. Defaults: `inputMin/Max = [0, 1]`, `clamp = true`.

### `meshAttractorChannels` (F375)

Used by `meshAttractor`. Per-channel toggle between literal value, wireable port, or port-with-default. Float channels also support multiply / offset / curve scaling on the wired path (cooked = `curve(raw × multiply + offset)`).

```json
"channels": {
  "mouseX":  { "mode": "port" },
  "mouseY":  { "mode": "port" },
  "colour":  { "mode": "literal", "value": { "r": 1, "g": 0.5, "b": 0.2, "a": 1 } },
  "jump":    { "mode": "port", "default": 0.4, "multiply": 1.5, "ease": "easeOutCubic" },
  "dist":    { "mode": "literal", "value": 120 }
}
```

`mode: "literal"` removes the input port entirely — the channel is a static value. `mode: "port"` exposes an input port with the channel name. `mode: "port"` + `default` exposes a port AND seeds it with a fallback so the node still works if the wire is unbound.

### Compound-specific channel maps

These each carry the channel-map idea but with shapes specialized to the owning compound. Schema lives next to the compound's MD:

| Type | Owner |
|---|---|
| `counterChannels` | [`counterAnimation`](nodes/text/counterAnimation.md) |
| `dockToChannels` | [`dockToAnimation`](nodes/animation/dockToAnimation.md) |
| `indexedDockChannels` | [`indexedDockAnimation`](nodes/animation/indexedDockAnimation.md) |
| `textSequenceChannels` | [`textSequenceAnimation`](nodes/text/textSequenceAnimation.md) |
| `textStaggerChannels` | [`textStaggerAnimation`](nodes/text/textStaggerAnimation.md) |
| `textRevealChannels` | [`textRevealAnimation`](nodes/text/textRevealAnimation.md) |
| `stringChannels` | [`domStringWrite`](nodes/boundary/domStringWrite.md) |

---

## Keyframes

### `clipPathKeyframes`

```json
"keyframes": [
  { "time": 0,   "points": [[50, 0], [100, 100], [0, 100]] },
  { "time": 0.5, "points": [[50, 20], [80, 80],  [20, 80]] },
  { "time": 1,   "points": [[50, 0], [100, 100], [0, 100]] }
]
```

Each keyframe's `points` is a flat array of `[x, y]` pairs in the same units the consuming node declares (`%` or `px`). Vertex count must match across keyframes — interpolation pairs vertices by index.

### `colorKeyframes`

```json
"keyframes": [
  { "time": 0, "color": { "r": 1, "g": 1, "b": 1, "a": 1 } },
  { "time": 1, "color": { "r": 1, "g": 0, "b": 0, "a": 1 }, "ease": "easeOutCubic" }
]
```

Same shape as the `color` keyframe family in `propertyAnimationChannels`, but stand-alone (no per-property wrapping).

---

## Geometry

`meshGeometrySource` is a **discriminated union** — pick a `kind` and supply that kind's params:

```json
// Built-in radial generators
{ "kind": "round",  "segmentCount": 96 }
{ "kind": "spike",  "segmentCount": 240, "spikeCount": 12, "spikeInnerRatio": 0.45 }
{ "kind": "blob",   "segmentCount": 144, "blobNoiseAmplitude": 0.12, "blobSeed": 1 }

// SVG path
{ "kind": "svgPath", "d": "M0 0 L100 50 L0 100 Z", "sampleCount": 96 }

// Glyph outline
{ "kind": "textOutline", "text": "FM", "font": "900 256px sans-serif", "sampleCount": 96 }

// CSS polygon shorthand
{ "kind": "clipPath", "polygon": "polygon(50% 0%, 100% 100%, 0% 100%)" }
{ "kind": "clipPath", "polygon": "polygon(20px 30px, 100px 0px, 50px 80px)" }

// Hand-authored vertex array (flat [x0,y0,x1,y1,...])
{ "kind": "rawVertices", "vertices": [0, 0, 100, 50, 0, 100] }
```

Constraints (errors thrown at load):
- `svgPath` must be **single-subpath** — multi-`M` paths are rejected.
- `clipPath` only accepts `polygon(...)` shorthand — `circle()` / `ellipse()` / `inset()` / `path()` are not supported.
- `textOutline` traces the outermost simply-connected silhouette via radial sampling — inter-letter gaps and inner counters (the hole in "O") are NOT captured.
- `rawVertices` must have ≥ 3 points and an even-length flat array.

---

## Physics

`physicsShape` is a discriminated union. Used by `physicsBody`, `physicsBodyStagger`, etc.

```json
{ "kind": "circle", "radius": 24 }
{ "kind": "box", "width": 60, "height": 30 }
{ "kind": "polyline", "points": [[0,0], [100,50], [200,0]], "closed": true }

// Composite shape — multiple primitives in one body
{ "kind": "compound", "parts": [
  { "kind": "circle", "radius": 12, "x": -10, "y": 0 },
  { "kind": "circle", "radius": 12, "x":  10, "y": 0 }
] }

// Read shape from CSS / DOM at bind time
{ "kind": "fromSelector", "selector": ".obstacle" }

// Read radius from a CSS variable (per-element)
{ "kind": "circle", "radiusFromCSS": "--bd" }
```

`fromSelector` and `*FromCSS` variants resolve at bind time — useful with `staggerAnimate` / `physicsBodyStagger` so each element instances with its own dimensions.

---

## Scroll edges

`scrollEdges` is a string with the syntax `<elementEdge> <viewportEdge> [+= offset]`:

```json
"startEdge": "top bottom"            // progress 0 when element top crosses viewport bottom (default scrollTrigger entry)
"endEdge":   "bottom top"            // progress 1 when element bottom crosses viewport top
"startEdge": "top top+=164vh"        // shift by 164vh below viewport top
"endEdge":   "center 50%"            // % is percent of viewport height from top
```

Element edges: `top` / `center` / `bottom`.
Viewport edges: `top` / `center` / `bottom` / a percentage / a viewport-unit offset (`+=Nvh`, `+=Npx`, `+=N%`).

For pinned scroll triggers, the canonical `endEdge:"bottom bottom"` gives a pin distance of `elementHeight - viewportHeight` (a usable runway). `endEdge:"bottom top"` gives only `elementHeight` of runway, which is usually a footgun unless the element is taller than the viewport.

---

## Arrays and maps

| Type | JSON | Notes |
|---|---|---|
| `floatArray` / `numberList` | `[0.1, 0.5, 0.9]` | Flat array of numbers. |
| `stringArray` | `["foo", "bar"]` | Flat array of strings. |
| `attrMap` / `stringFloatMap` | `{ "foo": 1.2, "bar": "hello" }` | Object map; values are numbers or strings depending on the consuming node. |
| `colorPaletteStops` | `[[0, {r,g,b,a}], [0.5, {r,g,b,a}], [1, {r,g,b,a}]]` | Or flat `[pos, r, g, b, a, pos, r, g, b, a, …]` — see [`gradientStops`](nodes/effects/parametricShape.md). |

---

## State-machine sub-shapes

`stateMachine` is a single compound node carrying the entire state-machine definition. Five of its params are dedicated sub-shapes:

| Param | Type | Purpose |
|---|---|---|
| `parameters` | `smParameters` | Named parameter store (floats, bools, triggers). |
| `layers` | `smLayers` | Array of layers, each with states + transitions. |
| `listeners` | `smListeners` | DOM-event → parameter binding. |
| `audioBindings` | `smAudioBindings` | State entry/exit → audio cue. |
| `pointerAlignTargets` | `smPointerAlignTargets` | Pointer-aligned animation targets. |

Schema of each lives on [`nodes/state-machine/stateMachine.md`](nodes/state-machine/stateMachine.md). Concept overview: [`state-machines.md`](state-machines.md).

---

## Compound-internal one-offs

These types appear once each, on a single compound node. The schema is specialized to that compound; consult its MD:

| Type | Owner |
|---|---|
| `textWaveRanges` | [`textWave*`](nodes/text/) family |
| `textRevealVariants` | [`textRevealAnimation`](nodes/text/textRevealAnimation.md) |
| `staggerInnerTemplate` | [`staggerAnimation`](nodes/text/staggerAnimation.md) |
| `variantStaggerTable` / `variantStaggerChannelMeta` | [`variantStaggerAnimation`](nodes/text/variantStaggerAnimation.md) |
| `domPoseProperties` | [`domPoseWrite`](nodes/boundary/domPoseWrite.md) |

---

## Source of truth

This page tracks the `type:` strings emitted by `paramSchema` entries in `faster-motion/src/core/NodeMetadata.ts`. When a new param type is introduced upstream, add an entry here. The set of types in use is auto-listed by the doc generator — diff this page against the live registry before each release.
