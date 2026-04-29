# Math Nodes

Pure compute nodes: remap ranges, math expressions, utility operations (abs, clamp, round), smoothing, parallax offset, velocity calculation, string operations.

| Node | Type | Context | Description |
|------|------|---------|-------------|
| [Remap](remap.md) | `remap` | shared | Map a value from one range to another with optional curve |
| [Expression](expression.md) | `expression` | shared | Evaluate a JavaScript math expression |
| [Converter](converter.md) | `converter` | shared | Value transformation (stringFormat, colorLerp, enumMap, conditional, math) |
| [Snap Float](snapFloat.md) | `snapFloat` | shared | F349 — snap an input float to the nearest of N configured values. Optional `smooth > 0` exponentially eases toward the target snap, frame-rate independent (gives ScrollTrigger-style "magnetic" snap behavior). Empty `values` array = passthrough. Linear nearest-neighbor scan; designed for small value lists (≤ 16). |
| [Smoothing](smoothing.md) | `smoothing` | shared | Frame-rate-independent exponential smoothing on any float signal. The output eases toward the input value at a rate controlled by `smooth` — pass-through at `0` (or below), near-instant at `10`. Useful for taking a noisy / step-y / discrete signal (gate flicks, scroll-velocity, mouse position) and producing a damped, animation-ready curve. |
| [Gate](gate.md) | `gate` | shared | Blend a driven value toward a rest value under a 0..1 gate, with optional spring-smoothed threshold crossings |
| [Parallax](parallax.md) | `parallax` | shared | Convert scroll progress to parallax pixel offset |
| [Velocity](velocity.md) | `velocity` | shared | Compute smoothed rate-of-change of any float signal |
| [Math Utility](mathUtil.md) | `mathUtil` | shared | Single Float→Float math operation. Picks unary (`abs`, `round`, `sqrt`, ...) or binary (`add`, `subtract`, `multiply`) ops; binary ops use `value` + `b`. Range ops (`clamp`, `normalize`) use `value` + `min` + `max`. |
| [String Op](stringOp.md) | `stringOp` | shared | Typed String→String operation (uppercase, trim, replace, template, etc.). |
| [String Equals](stringEquals.md) | `stringEquals` | shared | F316: Outputs 1 when both string inputs are non-null and strictly equal, 0 otherwise. Null/undefined always evaluates to 0 (fail-safe). `b` input accepts a literal via setLiteralB() when unwired. |
| [Phase Shift](phaseShift.md) | `phaseShift` | shared | Per-clone phase shift of a shared 0..1 progress signal. Computes `(progress + index/count) % 1`, wrapping the result into [0, 1) so it can drive any node that consumes a normalized progress (staggerWrite, multiKeyframe, propertyAnimation). Replaces the inline `((node('progress') + ($index / node('count'))) % 1)` expression that recurs in any forEach-instanced template that needs each clone to ride a different phase of one shared clock. |
| [Float Array Pick](floatArrayPick.md) | `floatArrayPick` | shared | Pure picker — emits `array[floor(index)]` as a float. Index is clamped to [0, length-1]. The `array` input port wins when wired (non-empty); otherwise falls back to the `values` param. Fallback float returned when the resolved array is empty. Pair with textDecompose.itemSources (or any float-array source) to drive per-index side effects. |
| [Color Array Pick](colorArrayPick.md) | `colorArrayPick` | shared | Pure picker — emits `array[floor(index)]` as a Color. Index is clamped to [0, length-1]. Hex-string `values` param is parsed to Color at load time (zero parse cost on hot path). Used to drive a current-color output from a per-variant palette; pair with textReveal\s sourceIndex or variantStagger\s per-child index. |
