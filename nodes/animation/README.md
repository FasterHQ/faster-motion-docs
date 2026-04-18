# Animation Nodes

Core animation primitives: timelines for playback control, tweens for A→B interpolation, keyframes for multi-stop curves, and stagger for per-element timing.

| Node | Type | Context | Description |
|------|------|---------|-------------|
| [Bool Tween](boolTween.md) | `boolTween` | shared | Smoothly tween a 0..1 progress toward a bool target over a fixed duration. Used to drive DOM animations from bool parameters (hover/click toggles). Emits linear progress so downstream multiKeyframe can carry the ease curve. |
| [Timeline](timeline.md) | `timeline` | shared | Playback sequencer — self-advancing or externally driven (scroll, parameter) |
| [Seamless Playhead](seamlessPlayhead.md) | `seamlessPlayhead` | shared | Pure-math playhead for seamless infinite loops. Maps progress + iteration to a rawSequence-equivalent playhead time. |
| [Tween](tween.md) | `tween` | shared | A→B interpolation with easing — stateless, pure function of progress |
| [Keyframe](keyframe.md) | `keyframe` | shared | Multi-stop interpolation with per-segment easing |
| [Stagger](stagger.md) | `stagger` | shared | Per-element timing offset using Element Context (index, count) |
| [Color Tween](colorTween.md) | `colorTween` | shared | Perceptually uniform color interpolation in OKLab space |
| [Color Keyframe](colorKeyframe.md) | `colorKeyframe` | shared | Multi-stop color interpolation in OKLab space — outputs r, g, b channels (0-255). |
| [String Keyframe](stringKeyframe.md) | `stringKeyframe` | shared | Multi-stop string interpolation — parses embedded numbers and interpolates each independently. For CSS strings (filter, boxShadow, gradients) where multiple numbers change together. |
| [Clip Path](clipPath.md) | `clipPath` | shared | Keyframed polygon clip-path with structured point data. Interpolates between polygon keyframe stops — outputs typed ClipPathPoints for visual per-point editing in FVE. |
| [Multi Keyframe](multiKeyframe.md) | `multiKeyframe` | shared | Multi-channel keyframe interpolation — one progress input, N float outputs with per-channel per-segment easing. Channels defined in params, output ports created dynamically. |
