# Pattern: Parallax Scroll

Move elements at different speeds during scroll to create depth.

## Graph

```
ScrollTrigger → Parallax → DOMPropertyWrite (translateY)
```

## Nodes

```json
{
  "domGraph": {
    "nodes": [
      {
        "id": "scroll",
        "type": "scrollTrigger",
        "params": { "selector": ".parallax-section", "startEdge": "top bottom", "endEdge": "bottom top" }
      },
      {
        "id": "bg-offset",
        "type": "parallax",
        "params": { "speed": 0.3, "range": -1 },
        "inputs": { "progress": "scroll.progress" }
      },
      {
        "id": "fg-offset",
        "type": "parallax",
        "params": { "speed": -0.2, "range": -1 },
        "inputs": { "progress": "scroll.progress" }
      },
      {
        "id": "write-bg",
        "type": "domPropertyWrite",
        "params": { "selector": ".parallax-bg", "propertyName": "translateY", "cssUnit": "px" },
        "inputs": { "value": "bg-offset.offset" }
      },
      {
        "id": "write-fg",
        "type": "domPropertyWrite",
        "params": { "selector": ".parallax-fg", "propertyName": "translateY", "cssUnit": "px" },
        "inputs": { "value": "fg-offset.offset" }
      }
    ]
  }
}
```

## How It Works

1. `scrollTrigger` tracks scroll progress through the section
2. `parallax` converts progress to pixel offset — positive `speed` moves slower (background), negative moves opposite (foreground)
3. When `range` is -1, the node auto-calculates range from element height
4. Each layer gets a different speed value, creating the depth illusion
