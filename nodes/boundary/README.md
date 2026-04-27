# Boundary Nodes

Scene I/O boundary: read/write object transforms and properties, DOM CSS/attribute writes, color writes, stagger writes, data writes.

| Node | Type | Context | Description |
|------|------|---------|-------------|
| [Object Position](objectPosition.md) | `objectPosition` | canvas | Read world position of a scene object |
| [Position Write](positionWrite.md) | `positionWrite` | canvas | Write world-space position to a scene object |
| [Transform Read](transformRead.md) | `transformRead` | canvas | Read full transform (position + rotation + scale) of a scene object |
| [Transform Write](transformWrite.md) | `transformWrite` | canvas | Write full transform to a scene object |
| [Property Write](propertyWrite.md) | `propertyWrite` | canvas | Write a float value to any object property |
| [Data Write](dataWrite.md) | `dataWrite` | canvas | Write any-typed value to a canvas object property |
| [DOM Property Write](domPropertyWrite.md) | `domPropertyWrite` | dom | Write a float value to a CSS property, transform, attribute, or textContent on a DOM element |
| [Stagger Write](staggerWrite.md) | `staggerWrite` | dom | Batched stagger animation — one node handles all elements matching a selector with per-element timing offset |
| [DOM Dock To](domDockTo.md) | `domDockTo` | shared | Compute additive translate that centers a source DOM element over a target element, scaled by a 0..1 blend. Wire outputs into a domPoseWrite translateX/translateY. |
| [DOM Indexed Dock](domIndexedDock.md) | `domIndexedDock` | shared | Dock a source element onto the Nth child of a list, where N is derived from a 0..1 progress input. Sibling to domDockTo (which docks onto a static target). Used for typewriter cursors, scanning highlights, focus rings, and any "park X on the active item in a sequence" effect. |
| [DOM String Write](domStringWrite.md) | `domStringWrite` | dom | Write a string value to a DOM element (CSS, SVG attribute, textContent) |
| [DOM Stage Preset](domStagePreset.md) | `domStagePreset` | shared | One-shot mount-time CSS writer: perspective / transformStyle on the stage, transformOrigin per slide. Used by the carousel mount-time setup. |
| [Scene Transform](sceneTransform.md) | `sceneTransform` | canvas | Per-object transform — reads from objectPose bundle by index, computes world matrix, writes to HeadlessObject |
| [Object Property Read](objectPropertyRead.md) | `objectPropertyRead` | canvas | Read a runtime object property (bidirectional binding read side). |
| [Layout Compute](layoutCompute.md) | `layoutCompute` | canvas | WASM flex layout recompute + animated transitions. |
| [Mask Sync](maskSync.md) | `maskSync` | canvas | Mask transform synchronization — world-space mask geometry from source objects. |
| [Camera](camera.md) | `camera` | canvas | 2D camera — zoom, pan, rotation, parallax, DOF, color effects, tint, vignette. |
| [Switch Gate](switchGate.md) | `switchGate` | shared | Gates parentVisible for one child of a displayMode:switch group. Internal loader-generated node. |
| [Clip Path Write](clipPathWrite.md) | `clipPathWrite` | shared | Serializes ClipPathPoints to CSS polygon() and writes to target element clip-path. Dirty-checks the serialized string to skip redundant DOM writes. |
| [DOM Pose Write](domPoseWrite.md) | `domPoseWrite` | shared | Boundary node: writes one or more float values to CSS properties on a target DOM element. Pick which properties to expose via the picker — each becomes an input port wired from upstream tweens / latches / math. |
| [DOM Attribute Read](domAttributeRead.md) | `domAttributeRead` | shared | Reads a DOM value from an element at bind time and outputs it as a string. `readMode: attribute` (default) reads via getAttribute — SVG d/viewBox/points, data-* attributes, aria-* attributes. `readMode: textContent` reads el.textContent — used for i18n-friendly text animations where the translatable string lives in the DOM. Static read. Boundary counterpart to DOMStringWriteNode. |
| [DOM String Array Read](domStringArrayRead.md) | `domStringArrayRead` | shared | Reads textContent (or an attribute) from EVERY element matching a selector, emits the results as a stringArray. Purpose: i18n-friendly multi-source text animations — the HTML owns every translatable string, the .fmtion carries only the recipe. Static read at bind time via querySelectorAll; document-order matches. |
| [Scene Render](sceneRender.md) | `sceneRender` | canvas | F232 renderer-agnostic scene boundary writer — draws all registered objects via Rust/WASM WebGL2. |
| [Bone Render](boneRender.md) | `boneRender` | canvas | Editor-mode bone debug rendering — draws skeleton overlays in viewport. |
| [Additive Property Write](additivePropertyWrite.md) | `additivePropertyWrite` | canvas | F241 additive write boundary — sums multiple driver outputs into a single property without overwriting. |
