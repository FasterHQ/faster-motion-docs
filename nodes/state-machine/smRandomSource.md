# SM Random Source

**Type:** `smRandomSource`  
**Category:** state-machine  
**Context:** Shared — works in both DOM and canvas graphs  

Per-SM deterministic Mulberry32 PRNG used by `LayerAdvanceNode` for weighted-random transition selection. Hot path is direct method call (`nextFloat()`) inside the layer's instant-chain inner loop; the `random` output port is updated each frame for FVE display only. Per-SM isolation guarantees that snapshotting one SM and restoring it later produces the identical random sequence regardless of what other SMs consumed in between (F266).

## Inputs

_No inputs._

## Outputs

| Port | Type | Description |
|------|------|-------------|
| `random` | `float` | Random |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `rngState` | int | `0` | RNG State |

