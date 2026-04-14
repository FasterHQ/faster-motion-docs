# Pattern: Hover Scale

Scale an element up smoothly on hover, with spring physics for natural overshoot.

## Graph

```
EventListener (mouseenter) → Spring → DOMPropertyWrite (scale)
EventListener (mouseleave) ↗
```

## Nodes

```json
{
  "domGraph": {
    "nodes": [
      {
        "id": "hover",
        "type": "pointer",
        "params": { "selector": ".card", "normalize": "normalized" }
      },
      {
        "id": "spring",
        "type": "spring",
        "params": { "stiffness": 300, "damping": 15, "mass": 1, "compositionMode": "replace" },
        "inputs": { "baseValue": "target.value" }
      },
      {
        "id": "target",
        "type": "tween",
        "params": { "from": 1, "to": 1.05, "ease": "linear" },
        "inputs": { "progress": "hover.isInside" }
      },
      {
        "id": "write-scale",
        "type": "domPropertyWrite",
        "params": { "selector": ".card", "propertyName": "scale", "cssUnit": "none" },
        "inputs": { "value": "spring.result" }
      }
    ]
  }
}
```

## How It Works

1. `pointer` outputs `isInside` (0 or 1) based on whether the cursor is over `.card`
2. `tween` maps that to scale range (1.0→1.05)
3. `spring` smooths the transition with physics-based overshoot
4. `domPropertyWrite` applies the final scale to the DOM
