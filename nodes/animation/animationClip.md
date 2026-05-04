# Animation Clip

**Type:** `animationClip`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

Authoring node for a single timeline-driven clip. params.objectTracks / boneTracks carry per-property keyframes; params.duration sets the clip length. Phase 01a expansion pushes this into the canvas animations array so the existing OCE + clipRegistry derivation produces identical runtime DAG. Use this instead of writing the animations array inline when authoring at the graph level.

## Inputs

_No inputs._

## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `clipId` | string | `""` | Clip Id |
| `name` | string | `""` | Name |
| `duration` | float | `1000` | Duration (ms) (min: 0) |

