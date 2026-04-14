# Coverage Range

**Type:** `coverageRange`  
**Category:** text  
**Context:** Shared — works in both DOM and canvas graphs  

Per-character coverage window with falloff ramps. Animated offset via coverageTime keyframes. Chainable with blend modes.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `coverageTime` | `float` | Coverage Time |
| `charCount` | `float` | Char Count |
| `upstreamCoverage` | `attributes` | Upstream Coverage |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `coverage` | `attributes` | Coverage |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `modifyFrom` | float | `0` | From (min: 0, max: 1) |
| `modifyTo` | float | `1` | To (min: 0, max: 1) |
| `falloffFrom` | float | `0` | Falloff From (min: 0, max: 1) |
| `falloffTo` | float | `0` | Falloff To (min: 0, max: 1) |
| `offset` | float | `0` | Offset |
| `strength` | float | `1` | Strength (min: 0, max: 1) |
| `blendMode` | enum | `"add"` | Blend. Options: `add`, `subtract`, `multiply`, `min`, `max`, `difference` |

