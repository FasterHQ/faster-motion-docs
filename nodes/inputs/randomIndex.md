# Random Index

**Type:** `randomIndex`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

Sister of `pulseCounter`: picks a random integer in [0, count) on each rising-edge `pulse`. Pair with `pulseRouter` for non-rhythmic dispatch where round-robin reads as too mechanical. Deterministic — uses a seeded mulberry32 PRNG so seek + replay produce identical sequences.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `pulse` | `float` | Pulse |
| `reset` | `float` | Reset |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `index` | `float` | Index |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `count` | int | `4` | Count (min: 1, max: 256) |
| `seed` | int | `1` | Seed |
| `avoidRepeat` | bool | `false` | Avoid Repeat |

