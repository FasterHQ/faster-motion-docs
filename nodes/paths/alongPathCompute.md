# Along Path

**Type:** `alongPathCompute`  
**Category:** paths  
**Context:** DOM — operates on HTML elements via CSS selectors  

Follow an SVG path — outputs x, y, angle from pre-sampled LUT

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `x` | `float` | X |
| `y` | `float` | Y |
| `angle` | `float` | Angle |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `pathSelector` | string | `""` | Path Element |
| `sampleCount` | int | `100` | Samples (min: 10, max: 1000) |
| `distributeByIndex` | bool | `false` | Distribute by Index |

