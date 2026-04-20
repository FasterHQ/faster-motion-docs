# Pattern: Property Animation Compound

Animate multiple CSS properties of a DOM element from one compound
node. This is the idiomatic way to author element-driven animations —
one node per animated element, N channels per animation.

## Graph

```
ScrollTrigger → propertyAnimation (.card)
                  ├── opacity:    0 → 1
                  ├── translateY: 40px → 0
                  └── scale:      0.9 → 1
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
          "selector": ".card-section",
          "startEdge": "top 80%",
          "endEdge": "top 30%"
        }
      },
      {
        "id": "card-anim",
        "type": "propertyAnimation",
        "params": {
          "selector": ".card",
          "channels": {
            "opacity": {
              "cssUnit": "none",
              "keyframes": [
                { "time": 0, "value": 0 },
                { "time": 1, "value": 1, "ease": "easeOutCubic" }
              ]
            },
            "translateY": {
              "cssUnit": "px",
              "keyframes": [
                { "time": 0, "value": 40 },
                { "time": 1, "value": 0, "ease": "easeOutCubic" }
              ]
            },
            "scaleX": {
              "cssUnit": "none",
              "keyframes": [
                { "time": 0, "value": 0.9 },
                { "time": 1, "value": 1 }
              ]
            },
            "scaleY": {
              "cssUnit": "none",
              "keyframes": [
                { "time": 0, "value": 0.9 },
                { "time": 1, "value": 1 }
              ]
            }
          }
        },
        "connections": {
          "progress": { "nodeId": "scroll", "port": "progress" }
        }
      }
    ]
  }
}
```

## Channel Shape

Every key in `params.channels` is a CSS property name. The value carries:

- `cssUnit` — the unit to append when writing to the DOM (`px`, `%`,
  `deg`, `rad`, `em`, `rem`, `vw`, `vh`, `none`). Use `none` for
  dimensionless properties (opacity, scale).
- `keyframes[]` — ordered by `time` (0..1). Each keyframe is
  `{ time, value, ease? }`. `ease` defaults to `linear` when omitted.
- `type?` — `'float'` (default) | `'color'` | `'string'`. Float
  channels use `value: number`; color channels use `color: "#hex"`
  instead of `value`.

## Inputs

- `progress: float` — drives all channels. Wire to `scrollTrigger`,
  `keyframeProgress`, `mouseProgress`, or any other `float` source.

No outputs. `propertyAnimation` is terminal.

## Multi-element animations

Use one `propertyAnimation` per element. Three cards with different
reveal offsets:

```json
{ "id": "card-1", "type": "propertyAnimation", "params": { "selector": ".card-1", ... } },
{ "id": "card-2", "type": "propertyAnimation", "params": { "selector": ".card-2", ... } },
{ "id": "card-3", "type": "propertyAnimation", "params": { "selector": ".card-3", ... } }
```

All three wire their `progress` input to the same `scrollTrigger`.

## Notes

- `propertyAnimation` is an authoring compound — at load time, the
  runtime expands it into a `multiKeyframe + domPoseWrite` pair. You
  don't need to author these primitives directly, but you'll see them
  if you inspect the runtime graph after load.
- One `propertyAnimation` targets exactly one selector. If you want
  the same animation on multiple selectors, duplicate the node.
- Keyframes are sorted by time at load; authored order doesn't matter.
- Keyframe times outside `[0, 1]` are allowed (extended easing range)
  but the `progress` input is typically clamped by its source node.
