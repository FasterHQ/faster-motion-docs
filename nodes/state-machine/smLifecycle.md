# SM Lifecycle

**Type:** `smLifecycle`  
**Category:** state-machine  
**Context:** Shared — works in both DOM and canvas graphs  

Owns the running/stopped state for one state machine. Reads `shouldRun` from the auto-start or external lifecycle source, emits `isRunning` for downstream layer/state nodes. Also the snapshot/restore boundary for hot-reload (F266): stores the full SM execution state (clock, current state ids, clip start times, RNG seed) and reapplies it after a graph rebuild so reloads preserve in-flight animation.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `shouldRun` | `float` | Should Run |
| `shouldReset` | `float` | Should Reset |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `isRunning` | `float` | Is Running |


## Parameters

_No configurable parameters._
