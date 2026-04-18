# DOM Stage Preset

**Type:** `domStagePreset`  
**Category:** boundary  
**Context:** Shared — works in both DOM and canvas graphs  

One-shot mount-time CSS writer: perspective / transformStyle on the stage, transformOrigin per slide. Used by the carousel mount-time setup.

## Inputs

_No inputs._

## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `stageSelector` | string | `""` | Stage Selector |
| `slideSelector` | string | `""` | Slide Selector |
| `perspective` | int | `0` | Perspective (px) (min: 0, max: 5000) |
| `transformStyle` | enum | `""` | Transform Style. Options: ``, `preserve-3d`, `flat` |
| `slideTransformOrigin` | string | `""` | Slide Transform Origin |

