# Math Utility

**Type:** `mathUtil`  
**Category:** math  
**Context:** Shared — works in both DOM and canvas graphs  

Single Float→Float math operation. Picks unary (`abs`, `round`, `sqrt`, ...) or binary (`add`, `subtract`, `multiply`) ops; binary ops use `value` + `b`. Range ops (`clamp`, `normalize`) use `value` + `min` + `max`.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Value |
| `min` | `float` | Min |
| `max` | `float` | Max |
| `b` | `float` | B (binary) |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `result` | `float` | Result |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `operation` | enum | `"abs"` | Operation. Options: `negate`, `abs`, `round`, `floor`, `ceil`, `sign`, `degToRad`, `radToDeg`, `fract`, `reciprocal`, `sqrt`, `clamp`, `normalize`, `add`, `subtract`, `multiply` |

