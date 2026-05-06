# Click Pulse

**Type:** `clickPulse`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

DOM pointer-event listener that emits a single-frame `pulse` per fire on `selector`, with click metadata fan-out — `value` (param-or-wired), `x` / `y` (clientX/Y), and `matchIndex` (which selector match fired). `pulse` is the only pulse-coupled signal; all metadata holds at the last-fire value between pulses, so consumers gate on the rising edge to read fresh data. `eventType` selects between `click` / `dblclick` / `pointerdown` / `contextmenu` / `auxclick` etc.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `valueInput` | `float` | Value (wired) |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `pulse` | `float` | Pulse |
| `value` | `float` | Value |
| `x` | `float` | X (px) |
| `y` | `float` | Y (px) |
| `matchIndex` | `float` | Match Index |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | Target |
| `eventType` | eventTypeChooser | `"click"` | Event |
| `value` | float | `0` | Pulse Value |
| `preventDefault` | bool | `false` | Prevent Default |

