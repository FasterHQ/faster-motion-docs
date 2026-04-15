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
| [DOM String Write](domStringWrite.md) | `domStringWrite` | dom | Write a string value to a DOM element (CSS, SVG attribute, textContent) |
| [DOM Color Write](domColorWrite.md) | `domColorWrite` | dom | Write rgb() color to a DOM element CSS property |
| [Scene Transform](sceneTransform.md) | `sceneTransform` | canvas | Per-object transform — reads from objectPose bundle by index, computes world matrix, writes to HeadlessObject |
| [Object Property Read](objectPropertyRead.md) | `objectPropertyRead` | canvas | Read a runtime object property (bidirectional binding read side). |
| [Layout Compute](layoutCompute.md) | `layoutCompute` | canvas | WASM flex layout recompute + animated transitions. |
| [Mask Sync](maskSync.md) | `maskSync` | canvas | Mask transform synchronization — world-space mask geometry from source objects. |
| [Camera](camera.md) | `camera` | canvas | 2D camera — zoom, pan, rotation, parallax, DOF, color effects, tint, vignette. |
| [Clip Path Write](clipPathWrite.md) | `clipPathWrite` | shared | Serializes ClipPathPoints to CSS polygon() and writes to target element clip-path. Dirty-checks the serialized string to skip redundant DOM writes. |
| [DOM Attribute Read](domAttributeRead.md) | `domAttributeRead` | shared | Reads a DOM/SVG attribute (e.g., d, viewBox, points) from an element at bind time and outputs it as a string. Static read — the boundary counterpart to DOMStringWriteNode. |
| [Scene Render](sceneRender.md) | `sceneRender` | canvas | F232 renderer-agnostic scene boundary writer — draws all registered objects via Rust/WASM WebGL2. |
| [Bone Render](boneRender.md) | `boneRender` | canvas | Editor-mode bone debug rendering — draws skeleton overlays in viewport. |
| [Additive Property Write](additivePropertyWrite.md) | `additivePropertyWrite` | canvas | F241 additive write boundary — sums multiple driver outputs into a single property without overwriting. |
