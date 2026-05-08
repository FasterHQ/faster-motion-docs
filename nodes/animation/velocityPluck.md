# Velocity Pluck

**Type:** `velocityPluck`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

Single-shot pendulum pluck with velocity-derived shape. On each rising-edge `trigger`, samples `velocity`, then runs a two-stage tween: stage 1 swings out 0 → -peakRot over `M = swingOutBase + swingOutVelTerm·e` seconds with power2.out ease; stage 2 elastic-returns -peakRot → 0 over `P = returnBase + returnVelTerm·e` seconds with elastic.out and period `periodBase - periodVelTerm·e`. Here e = clamp(|velocity| / normalisationVel, 0, 1) and peakRot interpolates from `peakRotMin` to `peakRotMax` by e. The signed `rotation` output (degrees) carries the velocity sign, so left-drag and right-drag produce opposite directions. Pair with `viewportObserver.enterPulse` for "pluck on visibility entry" patterns (e.g. carousel cards swing on the rod as they pan into view), or with any pulse source for one-shot reactive animations whose magnitude scales with input speed.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `trigger` | `float` | Trigger |
| `velocity` | `float` | Velocity |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `rotation` | `float` | Rotation (deg) |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `normalisationVel` | float | `3000` | Normalisation Velocity (min: 1) |
| `peakRotMin` | float | `1` | Peak Rotation Min (deg) |
| `peakRotMax` | float | `9` | Peak Rotation Max (deg) |
| `swingOutBase` | float | `0.25` | Swing-Out Base (s) (min: 0.01) |
| `swingOutVelTerm` | float | `0.15` | Swing-Out Velocity Term (s) |
| `returnBase` | float | `1` | Return Base (s) (min: 0.01) |
| `returnVelTerm` | float | `5` | Return Velocity Term (s) |
| `periodBase` | float | `0.4` | Elastic Period Base (min: 0.01) |
| `periodVelTerm` | float | `0.3` | Elastic Period Velocity Term |

