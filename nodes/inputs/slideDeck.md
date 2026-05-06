# Slide Deck

**Type:** `slideDeck`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

Full-screen slide-deck navigation in one node. Bundles wheel input, optional next/prev arrow clicks, optional nav-link clicks (matchIndex → seekTo), and the eased slideRouter. Compound: at load time it expands to `slideRouter` + `wheelGesture` + up to 3 `clickPulse` nodes + `pulseOr` (when 2+ advance sources). Outputs re-export the slideRouter outputs verbatim. Author can still bypass and wire the primitives by hand for one-off cases — slideDeck is purely additive.

## Inputs

_No inputs._

## Outputs

| Port | Type | Description |
|------|------|-------------|
| `currentIndex` | `float` | Current Index |
| `discreteIndex` | `float` | Discrete Index |
| `transitionProgress` | `float` | Transition Progress |
| `slideActivations` | `floatArray` | Slide Activations |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `slidesSelector` | elementSelector | `""` | Slides Selector |
| `navLinkSelector` | elementSelector | `""` | Nav Links |
| `nextArrowSelector` | elementSelector | `""` | Next Arrow |
| `prevArrowSelector` | elementSelector | `""` | Prev Arrow |
| `wheelEnabled` | bool | `true` | Wheel Input |
| `wheelAxis` | axisChooser | `"y"` | Wheel Axis |
| `wheelThreshold` | float | `60` | Wheel Burst Threshold (min: 1) |
| `wheelLockoutMs` | float | `850` | Wheel Lockout (ms) (min: 0) |
| `wheelRestMs` | float | `250` | Wheel Idle Reset (ms) (min: 0) |
| `transitionDurationMs` | float | `800` | Transition Duration (ms) (min: 1) |
| `transitionEase` | easingCurve | `"easeInOutCubic"` | Transition Ease |
| `wrap` | bool | `false` | Wrap |

