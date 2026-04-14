# Pattern: Scroll-Driven Fade

Fade an element in as the user scrolls it into view.

## Graph

```
ScrollTrigger → Tween → DOMPropertyWrite (opacity)
                Tween → DOMPropertyWrite (translateY)
```

## Nodes

```json
{
  "domGraph": {
    "nodes": [
      {
        "id": "scroll",
        "type": "scrollTrigger",
        "params": {
          "selector": ".fade-section",
          "startEdge": "top 80%",
          "endEdge": "top 30%"
        }
      },
      {
        "id": "fade",
        "type": "tween",
        "params": { "from": 0, "to": 1, "ease": "easeOutCubic" },
        "inputs": { "progress": "scroll.progress" }
      },
      {
        "id": "slide",
        "type": "tween",
        "params": { "from": 40, "to": 0, "ease": "easeOutCubic" },
        "inputs": { "progress": "scroll.progress" }
      },
      {
        "id": "write-opacity",
        "type": "domPropertyWrite",
        "params": { "selector": ".fade-section", "propertyName": "opacity", "cssUnit": "none" },
        "inputs": { "value": "fade.value" }
      },
      {
        "id": "write-y",
        "type": "domPropertyWrite",
        "params": { "selector": ".fade-section", "propertyName": "translateY", "cssUnit": "px" },
        "inputs": { "value": "slide.value" }
      }
    ]
  }
}
```

## How It Works

1. `scrollTrigger` outputs `progress` (0→1) as `.fade-section` scrolls from 80% to 30% of the viewport
2. Two `tween` nodes remap that progress: opacity (0→1) and translateY (40px→0px)
3. `domPropertyWrite` nodes apply the values to the DOM element's CSS
