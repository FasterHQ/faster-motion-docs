# Falloff Nodes

Spatial weight fields that modulate deformer strength: linear ramp, radial distance, shape boundary, fractal noise, element index, and user-defined curve.

| Node | Type | Context | Description |
|------|------|---------|-------------|
| [Linear Falloff](linearFalloff.md) | `linearFalloff` | shared | Ramp falloff along a configurable axis. |
| [Radial Falloff](radialFalloff.md) | `radialFalloff` | shared | Distance-based falloff from a center point. |
| [Shape Falloff](shapeFalloff.md) | `shapeFalloff` | shared | Signed-distance boundary falloff (circle or rectangle). |
| [Noise Falloff](noiseFalloff.md) | `noiseFalloff` | shared | Fractal simplex noise-based falloff (max 6 octaves). |
| [Index Falloff](indexFalloff.md) | `indexFalloff` | shared | Element index mapping falloff (reads ForEachNode context). |
| [Curve Falloff](curveFalloff.md) | `curveFalloff` | shared | User-defined keyframe ramp. Input from upstream Float or element normalized. |
