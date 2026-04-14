# .fmtion File Format

The `.fmtion` format is the unified animation file format for Faster Motion. It's a JSON file that declares everything needed to run animations on a web page: parameters, inputs, DOM animations, canvas scenes with node graphs, and assets.

## Root Structure

```typescript
interface FmtionFile {
  meta: FmtionMeta;                              // Required — file metadata
  parameters: Record<string, FmtionParameterDef>; // Required — parameter definitions
  dom: DomAnimation[];                            // Required — DOM CSS animations
  canvas: CanvasArea[];                           // Required — canvas 2D areas

  // Optional sections
  smoothScroll?: SmoothScrollConfig;
  inputs?: AnyInputDef[];                         // Mouse, scroll, time, distance inputs
  listeners?: InteractionListener[];              // DOM event → parameter bindings
  pointerFollow?: PointerFollowEffect[];          // Cursor-following effects
  imageTrail?: ImageTrailEffect[];                // Image trail effects
  lottie?: LottieAnimation[];                     // Lottie animations
  three?: ThreeDContent;                          // 3D content (coming soon)
  assets?: AssetLibrary;                          // Shared assets (images, fonts, audio)
  domSpritesheetTracks?: DomSpritesheetTrack[];   // Spritesheet animations
  videoTracks?: FmtionVideoTrack[];               // Video timelines
  carousels?: FmtionCarouselDef[];                // Carousel definitions
  dataBindings?: DataBinding[];                   // Data → DOM/canvas bindings
  domGraph?: { nodes: SerializedGraphNode[] };    // DOM-level graph nodes
}
```

## Minimal Example

```json
{
  "meta": { "name": "Fade In" },
  "parameters": {
    "hero/visible": { "type": "bool", "default": false }
  },
  "listeners": [
    {
      "id": "show-hero",
      "target": ".hero",
      "event": "mouseenter",
      "actions": [{ "set": "hero/visible", "value": true }]
    }
  ],
  "dom": [
    {
      "selector": ".hero-title",
      "driver": "hero/visible",
      "driverType": "bool",
      "from": { "opacity": 0, "y": 30 },
      "to": { "opacity": 1, "y": 0 },
      "duration": 600,
      "ease": "easeOutCubic"
    }
  ],
  "canvas": []
}
```

## DOM Animations

DOM animations drive CSS properties on HTML elements. Each animation is driven by a parameter.

```json
{
  "dom": [
    {
      "id": "hero-fade",
      "selector": ".hero-title",
      "driver": "hero/scrollProgress",
      "driverType": "scroll",
      "from": { "opacity": 0, "y": 50 },
      "to": { "opacity": 1, "y": 0 },
      "ease": "easeOutCubic"
    }
  ]
}
```

### Driver Types

| Type | Behavior |
|------|----------|
| `scroll` | Parameter value (0-1) directly maps to animation progress |
| `bool` | `true` → animate to `to`, `false` → animate to `from` over `duration` |
| `float` | Parameter value (0-1) maps to animation progress |

### Animatable CSS Properties

`x`, `y`, `rotation`, `scale`, `scaleX`, `scaleY`, `opacity`, `width`, `height`, `borderRadius`, `backgroundColor`, `color`, `translateX`, `translateY`, `skewX`, `skewY`

## DOM Graph (Node-Based DOM Animation)

For complex DOM animations that go beyond simple parameter→property mapping, use `domGraph`:

```json
{
  "domGraph": {
    "nodes": [
      {
        "id": "scroll-1",
        "type": "scrollTrigger",
        "params": { "selector": ".hero", "startEdge": "top bottom", "endEdge": "bottom top" }
      },
      {
        "id": "tween-1",
        "type": "tween",
        "params": { "from": 0, "to": 100, "ease": "easeOutCubic" },
        "inputs": { "progress": "scroll-1.progress" }
      },
      {
        "id": "write-1",
        "type": "domPropertyWrite",
        "params": { "selector": ".hero-title", "propertyName": "translateY", "cssUnit": "px" },
        "inputs": { "value": "tween-1.value" }
      }
    ]
  }
}
```

### Node Serialization Format

```json
{
  "id": "unique-node-id",
  "type": "nodeType",
  "params": { "key": "value" },
  "inputs": {
    "portName": "sourceNodeId.outputPortName"
  }
}
```

- `id` — Unique string identifier for this node
- `type` — Node type (must match a registered node type, see `node-registry.json`)
- `params` — Parameter values (overriding defaults from the node's `defaultParams`)
- `inputs` — Wire definitions: `inputPortName` → `"sourceNodeId.outputPortName"`

## Canvas Areas

Canvas areas define GPU-accelerated 2D scenes with objects, skeletons, animations, and node graphs.

```json
{
  "canvas": [
    {
      "id": "main-canvas",
      "mountSelector": "#canvas-container",
      "width": 1920,
      "height": 1080,
      "backgroundColor": "#000000",
      "objects": [...],
      "skeletons": [...],
      "animations": [...],
      "stateMachines": [...],
      "graph": {
        "nodes": [...]
      }
    }
  ]
}
```

Canvas areas contain their own complete node graphs evaluated by the FM runtime.

## Inputs

Unified input sources that write to parameters:

```json
{
  "inputs": [
    {
      "id": "mouse-x",
      "type": "mouse",
      "parameterId": "cursor/x",
      "axis": "x",
      "smooth": 0.1
    },
    {
      "id": "scroll-progress",
      "type": "scroll",
      "parameterId": "hero/scrollProgress",
      "trigger": ".hero-section",
      "start": "top bottom",
      "end": "bottom top"
    }
  ]
}
```

### Input Types

| Type | Description |
|------|-------------|
| `mouse` | Maps pointer position to parameter (0-1 on axis) |
| `scroll` | Maps scroll position to parameter (0-1 within trigger range) |
| `time` | Cycles parameter over time (for looping animations) |
| `distance` | Maps pointer distance from element to parameter |

## Listeners

DOM event → parameter bindings:

```json
{
  "listeners": [
    {
      "id": "menu-toggle",
      "target": ".menu-button",
      "event": "click",
      "actions": [
        { "set": "menu/open", "value": "toggle" }
      ]
    }
  ]
}
```

### Action Values

| Value | Behavior |
|-------|----------|
| `true` / `false` | Set boolean |
| `0.5` | Set numeric |
| `"toggle"` | Toggle boolean |
| `"fire"` | Fire trigger |
| `"increment"` | Add `amount` to value |
| `"decrement"` | Subtract `amount` from value |

## Assets

Shared asset library:

```json
{
  "assets": {
    "images": [
      { "id": "hero-bg", "name": "Hero Background", "src": "/images/hero.jpg", "width": 1920, "height": 1080 }
    ],
    "fonts": [
      { "id": "heading", "family": "Inter", "src": "/fonts/Inter-Bold.woff2", "weight": "700" }
    ],
    "audio": [
      { "id": "click-sfx", "name": "Click Sound", "src": "/audio/click.mp3" }
    ],
    "paths": [
      { "id": "wave", "name": "Wave Path", "d": "M0,100 Q250,0 500,100 T1000,100", "closed": false }
    ]
  }
}
```

## Loading

On any website, load a `.fmtion` file with:

```html
<script src="faster-motion.umd.js"></script>
<script>
  FasterMotion.load('/animations/hero.fmtion');
</script>
```

The runtime handles parsing, graph construction, and animation playback automatically.
