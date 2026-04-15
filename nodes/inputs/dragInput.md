# Drag Input

**Type:** `dragInput`  
**Category:** inputs  
**Context:** DOM — operates on HTML elements via CSS selectors  

Boundary input: binds pointer events to a DOM element and maps drag offset to 0-1 progress on the configured axis. Supports parent-bounded range and inertia throw.

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

