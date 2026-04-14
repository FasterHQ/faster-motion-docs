# Math Utility

**Type:** `mathUtil`  
**Category:** math  
**Context:** Shared — works in both DOM and canvas graphs  

Typed Float→Float math operation (abs, round, clamp, normalize, etc.).

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Value |
| `min` | `float` | Min |
| `max` | `float` | Max |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `result` | `float` | Result |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `operation` | enum | `"abs"` | Operation. Options: `negate`, `abs`, `round`, `floor`, `ceil`, `sign`, `degToRad`, `radToDeg`, `fract`, `reciprocal`, `sqrt`, `clamp`, `normalize` |

