# Math Nodes

Pure compute nodes: remap ranges, math expressions, utility operations (abs, clamp, round), smoothing, parallax offset, velocity calculation, string operations.

| Node | Type | Context | Description |
|------|------|---------|-------------|
| [Remap](remap.md) | `remap` | shared | Map a value from one range to another with optional curve |
| [Expression](expression.md) | `expression` | shared | Evaluate a JavaScript math expression |
| [Converter](converter.md) | `converter` | shared | Value transformation (stringFormat, colorLerp, enumMap, conditional, math) |
| [Snap Float](snapFloat.md) | `snapFloat` | shared | F349 — snap an input float to the nearest of N configured values. Optional `smooth > 0` exponentially eases toward the target snap, frame-rate independent (gives ScrollTrigger-style "magnetic" snap behavior). Empty `values` array = passthrough. Linear nearest-neighbor scan; designed for small value lists (≤ 16). |
| [Smoothing](smoothing.md) | `smoothing` | shared | Exponential smoothing for any float signal — frame-rate independent |
| [Gate](gate.md) | `gate` | shared | Blend a driven value toward a rest value under a 0..1 gate, with optional spring-smoothed threshold crossings |
| [Parallax](parallax.md) | `parallax` | shared | Convert scroll progress to parallax pixel offset |
| [Velocity](velocity.md) | `velocity` | shared | Compute smoothed rate-of-change of any float signal |
| [Math Utility](mathUtil.md) | `mathUtil` | shared | Typed Float→Float math operation (abs, round, clamp, normalize, add, etc.). |
| [String Op](stringOp.md) | `stringOp` | shared | Typed String→String operation (uppercase, trim, replace, template, etc.). |
| [String Equals](stringEquals.md) | `stringEquals` | shared | F316: Outputs 1 when both string inputs are non-null and strictly equal, 0 otherwise. Null/undefined always evaluates to 0 (fail-safe). `b` input accepts a literal via setLiteralB() when unwired. |
| [Float Array Pick](floatArrayPick.md) | `floatArrayPick` | shared | Pure picker — emits `array[floor(index)]` as a float. Index is clamped to [0, length-1]. The `array` input port wins when wired (non-empty); otherwise falls back to the `values` param. Fallback float returned when the resolved array is empty. Pair with textDecompose.itemSources (or any float-array source) to drive per-index side effects. |
| [Color Array Pick](colorArrayPick.md) | `colorArrayPick` | shared | Pure picker — emits `array[floor(index)]` as a Color. Index is clamped to [0, length-1]. Hex-string `values` param is parsed to Color at load time (zero parse cost on hot path). Used to drive a current-color output from a per-variant palette; pair with textReveal\s sourceIndex or variantStagger\s per-child index. |
