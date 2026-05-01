# Indexed Dispatch

**Type:** `indexedDispatch`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  
**Dynamic Ports:** Yes — ports may be added/removed at runtime  

Edge dispatcher for an externally-owned integer index. Whenever `index` rises or falls to a different integer, fires a single-frame pulse pair: `exit_out{prev}` for the slot we leave and `enter_out{curr}` for the slot we enter. First evaluate fires only the initial enter (no prior slot exists). Sink-agnostic — routes pulses, not values.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `index` | `float` | Index |
| `reset` | `float` | Reset |
| `direction` | `float` | Direction |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `activeIdx` | `float` | Active Idx |
| `forwardActive` | `float` | Forward |
| `backwardActive` | `float` | Backward |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `count` | int | `1` | Channels (min: 1, max: 256) |

