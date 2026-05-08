# Drag Input

**Type:** `dragInput`  
**Category:** inputs  
**Context:** DOM — operates on HTML elements via CSS selectors  

DEPRECATED for new authoring — prefer `dragVelocity` (passive sensor) wired into a `scrollPosition` or a translateX expression. `dragInput` wraps the internal Draggable utility, which physically translates the bound element via inline `transform` writes to drive its own progress reading. That hijacks the element: it can't coexist with a pinned section, an existing transform, or another node that needs the same DOM space. Kept as a stable boundary input for legacy `.fmtion` files; new graphs should not introduce it. Boundary input: binds pointer events to a DOM element and maps drag offset to 0-1 progress on the configured axis. Supports parent-bounded range and inertia throw.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `externalProgress` | `float` | External Progress |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | string | `""` | CSS Selector |
| `axis` | enum | `"x"` | Axis. Options: `x`, `y` |
| `bounds` | enum | `"parent"` | Bounds. Options: ``, `parent`, `window` |
| `inertia` | bool | `—` | Inertia |
| `accumulate` | bool | `false` | Accumulate Across Drags |

