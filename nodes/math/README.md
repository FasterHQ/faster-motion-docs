# Math Nodes

Pure compute nodes: remap ranges, math expressions, utility operations (abs, clamp, round), smoothing, parallax offset, velocity calculation, string operations.

| Node | Type | Context | Description |
|------|------|---------|-------------|
| [Remap](remap.md) | `remap` | shared | Map a value from one range to another with optional curve |
| [Expression](expression.md) | `expression` | shared | Evaluate a JavaScript math expression |
| [Converter](converter.md) | `converter` | shared | Value transformation (stringFormat, colorLerp, enumMap, conditional, math) |
| [Snap Float](snapFloat.md) | `snapFloat` | shared | Pure 1D nearest-from-list quantizer. Snaps the input to whichever entry of `values` is closest. Empty `values` = passthrough. For magnetic-snap behaviour (eased approach to the snapped target) compose `snapFloat → smoothing(mode:exponential)` — the inlined `smooth` param this node used to expose was a duplicate of SmoothingNode and was removed in the smoothing-family unification. |
| [Smoothing](smoothing.md) | `smoothing` | shared | Temporal lowpass filter for any float signal — picks one of three filter shapes via `mode`. Replaces the old `spring` and `valueSolver` nodes (folded in). For magnetic-snap behaviour compose `snapFloat → smoothing(mode:exponential)`. |
| [Palette LUT](paletteLut.md) | `paletteLut` | shared | Sample a 1D colour palette at position `t` ∈ [0..1] with configurable interpolation (sRGB or perceptually-uniform OKLab) and wrap mode (clamp / repeat / mirror). Stops can be static (param) or dynamically wired via `inputStops` for computed palettes. |
| [Gate](gate.md) | `gate` | shared | Blend a driven value toward a rest value under a 0..1 gate, with optional spring-smoothed threshold crossings |
| [Parallax](parallax.md) | `parallax` | shared | Convert scroll progress to parallax pixel offset |
| [Velocity](velocity.md) | `velocity` | shared | Compute smoothed rate-of-change of any float signal |
| [Selector Join](selectorJoin.md) | `selectorJoin` | shared | Concatenate `prefix` + `suffix` into a single CSS selector string. The canonical helper for composing per-iteration selectors out of a `forEachScope.selector` (prefix) and a static descendant fragment (suffix), replacing the F351 embedded-token form `"$match .child"`. |
| [Math Utility](mathUtil.md) | `mathUtil` | shared | Single Float→Float math operation. Picks unary (`abs`, `round`, `sqrt`, ...) or binary (`add`, `subtract`, `multiply`) ops; binary ops use `value` + `b`. Range ops (`clamp`, `normalize`) use `value` + `min` + `max`. |
| [String Op](stringOp.md) | `stringOp` | shared | Typed String→String operation (uppercase, trim, replace, template, etc.). |
| [String Equals](stringEquals.md) | `stringEquals` | shared | F316: Outputs 1 when both string inputs are non-null and strictly equal, 0 otherwise. Null/undefined always evaluates to 0 (fail-safe). `b` input accepts a literal via setLiteralB() when unwired. |
| [Phase Shift](phaseShift.md) | `phaseShift` | shared | Per-clone phase shift of a shared 0..1 progress signal. Computes `(progress + index/count) % 1`, wrapping the result into [0, 1) so it can drive any node that consumes a normalized progress (staggerWrite, multiKeyframe, propertyAnimation). Replaces the inline `((node('progress') + (node('index') / node('count'))) % 1)` expression that recurs in any forEach-instanced template that needs each clone to ride a different phase of one shared clock. |
| [Float Array Pick](floatArrayPick.md) | `floatArrayPick` | shared | Pure picker — emits `array[floor(index)]` as a float. Index is clamped to [0, length-1]. The `array` input port wins when wired (non-empty); otherwise falls back to the `values` param. Fallback float returned when the resolved array is empty. Pair with textDecompose.itemSources (or any float-array source) to drive per-index side effects. |
| [Color Array Pick](colorArrayPick.md) | `colorArrayPick` | shared | Pure picker — emits `array[floor(index)]` as a Color. Index is clamped to [0, length-1]. Hex-string `values` param is parsed to Color at load time (zero parse cost on hot path). Used to drive a current-color output from a per-variant palette; pair with textReveal\s sourceIndex or variantStagger\s per-child index. |
