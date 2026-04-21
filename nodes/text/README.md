# Text Nodes

Text animation nodes: split text into characters/words/lines, per-character wave/fade/spring/skew/distort transforms, coverage ranges for reveal effects.

| Node | Type | Context | Description |
|------|------|---------|-------------|
| [Text Split](textSplit.md) | `textSplit` | canvas | Split text into chars/words/lines with glyph metrics for per-element animation |
| [Scramble Compute](scrambleCompute.md) | `scrambleCompute` | dom | Per-character scramble effect — outputs original or random character |
| [Text Wave Compute](textWaveCompute.md) | `textWaveCompute` | shared | F256: Pure per-character wave sweep. Takes progress + upstream Mat4 bundle. schedulerPhase=pure, zero this.context access. |
| [Coverage Range](coverageRange.md) | `coverageRange` | shared | Per-character coverage window with falloff ramps. Animated offset via coverageTime keyframes. Chainable with blend modes. |
| [Coverage Group](coverageGroup.md) | `coverageGroup` | shared | F256: Per-character transforms scaled by coverage values. Outputs Mat4TransformBundle. |
| [Text Apply](textApply.md) | `textApply` | canvas | Pure passthrough: forwards per-character Mat4 transforms to output port for SRN consumption. Follows SkinnedPathDeformNode pattern (F264). |
| [Split Text](splitText.md) | `splitText` | canvas | Setup-only DOM text splitter — splits target element into spans (words/chars/lines). |
| [Counter](counter.md) | `counter` | shared | Animated number counter — interpolates min→max with formatting (decimals, separator, template). |
| [Text Sequence](textSequence.md) | `textSequence` | canvas | Cycles through a string array based on progress — outputs current text and index. |
| [Text Fade Compute](textFadeCompute.md) | `textFadeCompute` | shared | Per-character opacity ramp with stagger. Geometry modifier — routes through TextApply via Mat4Bundle. |
| [Text Spring Compute](textSpringCompute.md) | `textSpringCompute` | shared | Per-character bouncy scale/offset via closed-form damped spring. Geometry modifier — routes through TextApply. |
| [Text Scramble Apply](textScrambleApply.md) | `textScrambleApply` | canvas | Per-character glyph swap from a pre-rasterized pool. F272: configurable pool, easing curves, per-char stagger + reveal mode. |
| [Text Color Apply](textColorApply.md) | `textColorApply` | canvas | Per-character fill color interpolation. Writes `piece.outputs.fill.set(lerpedColor)` via the F260 port-sourced rendering contract. Supports 4 reveal modes (linear, center-out, edges-in, random) + stagger control. |
| [Text Stroke Apply](textStrokeApply.md) | `textStrokeApply` | canvas | Per-character stroke color interpolation. Writes `piece.outputs.stroke.set(lerpedColor)` via the F260 port-sourced rendering contract. |
| [Text Stroke Width Apply](textStrokeWidthApply.md) | `textStrokeWidthApply` | canvas | Per-character stroke width interpolation. Writes `piece.outputs.strokeWidth.set(lerped)` via the F260 port-sourced rendering contract. |
| [Text Draw Layer Index Apply](textDrawLayerIndexApply.md) | `textDrawLayerIndexApply` | canvas | Per-character draw-order layering. Assigns a discrete layer index per character based on reveal order pattern + stride. Writes `piece.outputs.drawLayerIndex.set(layerIdx)` via the F260 port-sourced rendering contract. |
| [Text Effect Apply](textEffectApply.md) | `textEffectApply` | canvas | Per-character blur/glow/shadow via the F260 port contract. Writes piece.outputs.blur/glow/shadow.set(v) per character using the perCharProgress stagger + reveal mode. The `effect` param selects which port to write. |
| [Text Skew Compute](textSkewCompute.md) | `textSkewCompute` | shared | Per-character horizontal shear with staggered decay. Geometry modifier — routes through TextApply. |
| [Text Distort Compute](textDistortCompute.md) | `textDistortCompute` | shared | Per-character random scatter/explosion entrance. Deterministic (seed-based). Geometry modifier — routes through TextApply. |
| [Text Scramble Animation](textScrambleAnimation.md) | `textScrambleAnimation` | shared | Scramble a single character at a target selector — cycles through a charset and settles on the original character, driven by a 0..1 progress input. One compound per character (use one per DOM element; author a multiKeyframe to drive all of them from one scroll/hover source). Compound: expanded into `scrambleCompute + domStringWrite` at load time — no runtime class. |
