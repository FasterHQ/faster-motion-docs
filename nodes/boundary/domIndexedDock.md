# DOM Indexed Dock

**Type:** `domIndexedDock`  
**Category:** boundary  
**Context:** Shared — works in both DOM and canvas graphs  

Dock a source element onto the Nth child of a list, where N is derived from a 0..1 progress input. Sibling to domDockTo (which docks onto a static target). Used for typewriter cursors, scanning highlights, focus rings, and any "park X on the active item in a sequence" effect.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `offsetX` | `float` | Offset X (px) |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `sourceSelector` | string | `""` | Source Element |
| `childSelector` | string | `""` | Indexed Children |

