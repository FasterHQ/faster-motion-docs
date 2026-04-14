# Port Types

Every graph node communicates through typed ports. Outputs produce data, inputs consume it. A wire connects one output to one input. Port types must be compatible for a wire to be valid.

## Built-in Types

### `float`
Numeric value. The most common port type — used for progress, positions, angles, opacity, sizes, etc.

**Default:** `0`

### `vec2`
Two-component vector for 2D positions and directions.

```json
{ "x": 0, "y": 0 }
```

### `bool`
Boolean true/false. Used for toggles, visibility, and conditional logic.

**Default:** `false`

### `color`
RGBA color with channels in 0-1 range.

```json
{ "r": 1, "g": 1, "b": 1, "a": 1 }
```

### `transform`
Full 2D transform with position, rotation, and non-uniform scale.

```json
{ "x": 0, "y": 0, "rotation": 0, "scaleX": 1, "scaleY": 1 }
```

### `string`
Text string. Used for CSS selectors, text content, SVG path data, expressions, etc.

**Default:** `""`

### `path`
Path geometry — an array of segments representing an SVG-like vector path. Used by all path deformer nodes (bend, wave, trim, offset, boolean, etc.).

### `attributes`
AttributeBundle — a keyed collection of Float32Array channels. Used for batch data transport: bone poses, object poses, glyph metrics. Each channel has a name (e.g., `"x"`, `"rotation"`) and stores one float per element.

### `mat4Bundle`
Per-element 4x4 transform bundle. Used by text animation nodes for per-character transforms. Nodes like Text Wave Compute and Text Fade Compute read an upstream bundle, apply per-character modifications, and output a modified bundle.

### `any`
Wildcard type — accepts connections from any other type. Used for generic passthrough nodes, data bindings, and serialized data that doesn't have a specific port type.

## Compatibility Rules

- **Same type** — always compatible
- **`any`** — compatible with everything (either side)
- **All other cross-type connections** — rejected at wire time

There are no implicit conversions. Use a `typeCast` node to explicitly convert between types when needed.
