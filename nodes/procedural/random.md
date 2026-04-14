# Random

**Type:** `random`  
**Category:** procedural  
**Context:** Shared — works in both DOM and canvas graphs  

Seeded random value per frame. Uniform or gaussian distribution.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `baseValue` | `float` | Base Value |
| `time` | `float` | Time |
| `deltaTime` | `float` | Delta Time |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `result` | `float` | Result |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `min` | float | `-10` | Min |
| `max` | float | `10` | Max |
| `mode` | enum | `"uniform"` | Mode. Options: `uniform`, `gaussian` |
| `seed` | int | `0` | Seed (min: 0) |
| `posterizeFps` | int | `0` | Posterize FPS (min: 0) |
| `compositionMode` | enum | `"replace"` | Composition. Options: `add`, `replace`, `multiply` |

