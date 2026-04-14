# Easing Functions

Easing functions control the rate of change during interpolation. Used by Tween, Keyframe, Stagger Write, and DOM animation nodes.

## Standard Presets

| Easing | Description |
|--------|-------------|
| `linear` | Constant speed, no acceleration |
| `ease` | Subtle ease in and out |
| `ease-in` | Slow start, fast end |
| `ease-out` | Fast start, slow end |
| `ease-in-out` | Slow start and end |

## Power Curves

Each power curve comes in three variants: `.in` (accelerate), `.out` (decelerate), `.inOut` (both).

| Family | Variants |
|--------|----------|
| Quadratic | `easeInQuad`, `easeOutQuad`, `easeInOutQuad` |
| Cubic | `easeInCubic`, `easeOutCubic`, `easeInOutCubic` |
| Quartic | `easeInQuart`, `easeOutQuart`, `easeInOutQuart` |
| Quintic | `easeInQuint`, `easeOutQuint`, `easeInOutQuint` |
| Sine | `easeInSine`, `easeOutSine`, `easeInOutSine` |
| Expo | `easeInExpo`, `easeOutExpo`, `easeInOutExpo` |
| Circ | `easeInCirc`, `easeOutCirc`, `easeInOutCirc` |

## Special Curves

| Family | Variants | Description |
|--------|----------|-------------|
| Back | `easeInBack`, `easeOutBack`, `easeInOutBack` | Overshoot effect |
| Elastic | `easeInElastic`, `easeOutElastic`, `easeInOutElastic` | Spring-like oscillation |
| Bounce | `easeInBounce`, `easeOutBounce`, `easeInOutBounce` | Bouncing ball effect |

## Physics-Based

| Easing | Description |
|--------|-------------|
| `spring.bouncy` | More bounce, playful |
| `spring.smooth` | Balanced natural motion |
| `spring.wobbly` | More oscillation |

## Custom Cubic Bezier

Specify control points directly:

```json
"cubic-bezier(0.4, 0, 0.2, 1)"
```

Or as an object in .fmtion:

```json
{
  "type": "bezier",
  "controlPoints": [0.68, -0.55, 0.265, 1.55]
}
```
