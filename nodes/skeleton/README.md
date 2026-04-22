# Skeleton Nodes

Bone and skeleton rigging: per-bone FK transforms, IK solvers, bone collectors, spring/jiggle bone physics, chain dynamics, and FK recomposition.

| Node | Type | Context | Description |
|------|------|---------|-------------|
| [Rest Pose Bone](restPoseBone.md) | `restPoseBone` | shared | Per-bone pure-FK node — reads pose at boneIndex, computes pre-override world matrix from parent. Paired with boneTransform. |
| [Bone Transform](boneTransform.md) | `boneTransform` | canvas | Per-bone override-apply node — reads rest scalars from sibling restPoseBone, applies override/additive/constraintXform, outputs post-override world matrix |
| [Bone Collector](boneCollector.md) | `boneCollector` | canvas | Gather per-bone world matrices into AttributeBundle for IK solver |
| [Skeleton Transform](skeletonTransform.md) | `skeletonTransform` | canvas | Reads skeleton root transform each frame — feeds root bone parentWorldMatrix |
| [IK Solve](ikSolve.md) | `ikSolve` | canvas | Per-chain IK solver. Pure array-based FABRIK on AttributeBundle data. |
| [FK Recompose](fkRecompose.md) | `fkRecompose` | canvas | Reads a post-IK/physics bone pose bundle and outputs per-bone world matrices via full parent×local FK. One per IK/physics skeleton, lives at scene level (outside rig Module) so only one bundle wire crosses the Module boundary. |
| [Jiggle Bone](jiggleBone.md) | `jiggleBone` | canvas | 2D position spring — adds bouncy displacement to bone x/y from parent movement. |
| [Spring Bone](springBonePhysics.md) | `springBonePhysics` | canvas | Rotational spring — bone rotation follows parent with spring dynamics, gravity, and wind. |
| [Chain Physics](chainPhysics.md) | `chainPhysics` | canvas | Verlet chain simulation for hair, tails, ropes. Fixed timestep with distance/angular constraints. |
| [IK Target](ikTarget.md) | `ikTarget` | canvas | Boundary node — bridges scene-object position into IK solve target port. |
| [Bone Mat4 Bundle](boneMat4Bundle.md) | `boneMat4Bundle` | canvas | Gathers per-bone 2×3 world matrices from FK chain and promotes to Mat4TransformBundle for composable bone modifiers. |
| [Bone Jiggle Compute](boneJiggleCompute.md) | `boneJiggleCompute` | canvas | Per-bone secondary animation via closed-form damped spring. Composable with other bone modifiers via merge/mask. |
