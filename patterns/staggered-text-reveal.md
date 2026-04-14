# Pattern: Staggered Text Reveal

Reveal text characters one-by-one with a wave animation triggered by scroll.

## Using StaggerWrite (Simple)

For DOM text elements, `staggerWrite` handles the entire stagger in a single node:

```json
{
  "domGraph": {
    "nodes": [
      {
        "id": "scroll",
        "type": "scrollTrigger",
        "params": { "selector": ".reveal-text", "startEdge": "top 80%", "endEdge": "top 40%" }
      },
      {
        "id": "stagger-opacity",
        "type": "staggerWrite",
        "params": {
          "selector": ".reveal-text span",
          "propertyName": "opacity",
          "cssUnit": "none",
          "from": 0,
          "to": 1,
          "ease": "easeOutCubic",
          "totalStagger": 0.4,
          "staggerOrder": "start"
        },
        "inputs": { "progress": "scroll.progress" }
      },
      {
        "id": "stagger-y",
        "type": "staggerWrite",
        "params": {
          "selector": ".reveal-text span",
          "propertyName": "translateY",
          "cssUnit": "px",
          "from": 20,
          "to": 0,
          "ease": "easeOutCubic",
          "totalStagger": 0.4,
          "staggerOrder": "start"
        },
        "inputs": { "progress": "scroll.progress" }
      }
    ]
  }
}
```

## Using Canvas Text Nodes (Advanced)

For canvas text with per-character transforms:

```
TextSplit → TextWaveCompute → SceneTransform (per char)
```

1. `textSplit` splits text into characters and outputs a `mat4Bundle`
2. `textWaveCompute` applies per-character wave offset based on progress
3. The bundle flows into the rendering pipeline

## Stagger Orders

| Order | Behavior |
|-------|----------|
| `start` | First element animates first |
| `end` | Last element animates first |
| `center` | Center elements animate first, edges last |
| `edges` | Edge elements animate first, center last |
| `random` | Random order |
