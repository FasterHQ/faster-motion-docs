# Paths Nodes

Path geometry read/write and modifiers: bend, wave, noise deform, trim, offset, boolean ops, wiggle path, round corners, repeater, conform, and more.

| Node | Type | Context | Description |
|------|------|---------|-------------|
| [Morph Compute](morphCompute.md) | `morphCompute` | dom | Pure SVG path interpolation — takes fromPath and toPath as string inputs, outputs interpolated path string. Zero DOM awareness. |
| [Along Path](alongPathCompute.md) | `alongPathCompute` | dom | Follow an SVG path — outputs x, y, angle from pre-sampled LUT |
| [Path Read](pathRead.md) | `pathRead` | canvas | Read path geometry from a scene object. |
| [Path Write](pathWrite.md) | `pathWrite` | canvas | Write path geometry back to a scene object. |
| [Bend](bend.md) | `bend` | shared | Bend geometry around a center point. |
| [Wave](wave.md) | `wave` | shared | Sinusoidal displacement along a path. |
| [Noise Deform](noiseDeform.md) | `noiseDeform` | shared | Per-vertex noise displacement using 2D simplex. |
| [Pinch / Bloat](pinch.md) | `pinch` | shared | Radial pinch or bloat from a center point. |
| [Trim Path](trimPath.md) | `trimPath` | shared | Output a sub-segment of a path by start/end position. |
| [Offset Path](offsetPath.md) | `offsetPath` | shared | Inflate or deflate a path with cubic-preserving Tiller-Hanson offset. |
| [Boolean](boolean.md) | `boolean` | shared | Path boolean operations: union, subtract, intersect, exclude. |
| [Wiggle Path](wigglePath.md) | `wigglePath` | shared | Noise displacement per path point. |
| [Round Corners](roundCorners.md) | `roundCorners` | shared | Round sharp corners with cubic arcs. |
| [Pucker & Bloat](puckerBloat.md) | `puckerBloat` | shared | Move vertices toward/away from centroid. |
| [Chop Path](chopPath.md) | `chopPath` | shared | Split path into N visible segments with gaps. |
| [Wave Deformer](waveDeformer.md) | `waveDeformer` | shared | Sine wave displacement along path. Supports pulse mode. |
| [Zig Zag](zigZag.md) | `zigZag` | shared | Alternating perpendicular peaks and valleys. |
| [Squash & Stretch](squashStretch.md) | `squashStretch` | shared | Non-uniform scale preserving area. |
| [Motion Stretch](motionStretch.md) | `motionStretch` | shared | Stretch along velocity direction. |
| [Repeater](repeater.md) | `repeater` | shared | N copies with cumulative transform offset. |
| [Conform to Path](conformToPath.md) | `conformToPath` | shared | Deform source to follow target path shape. |
| [Merge Paths](mergePaths.md) | `mergePaths` | shared | Boolean ops (union/intersect/subtract/exclude) via clipper2. |
| [Path Vertex Anim](pathVertexAnim.md) | `pathVertexAnim` | shared | Animates per-vertex offsets along a path over time. |
| [Morph Path Animation](morphPathAnimation.md) | `morphPathAnimation` | shared | Interpolate an SVG path element from its current d attribute toward a target d, driven by a 0..1 progress input. One authoring node replaces the canonical chain `domAttributeRead(d) → morphCompute(fromPath ← read, toPath) → domPoseWrite(d)` that every SVG morph repeats. Compound: expanded into those three primitives at load time — no runtime class. |
