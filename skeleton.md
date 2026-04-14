# Skeleton Rigging

Skeletons provide hierarchical bone-based animation for characters, creatures, and any articulated structure.

## Concepts

### Bones
A bone defines a local transform (x, y, rotation, scaleX, scaleY) relative to its parent bone. The bone hierarchy forms a tree — transforms compose from root to leaf.

### Forward Kinematics (FK)
FK is the default evaluation: each bone's world transform is computed by multiplying its local transform with its parent's world transform, walking down the tree from root to tips.

### Inverse Kinematics (IK)
IK works backwards — given a target position for an end bone (e.g., a hand or foot), the solver computes the rotations of parent bones in the chain to reach that target. FM uses FABRIK (Forward And Backward Reaching Inverse Kinematics).

### Bone Physics
Physics-based secondary motion that runs after FK/IK:
- **Jiggle Bone** — Spring-based position displacement (for bouncy elements like ears, belly)
- **Spring Bone** — Rotational spring with gravity and wind (for hair, tails, clothing)
- **Chain Physics** — Verlet integration chain with distance and angular constraints (for ropes, chains, flowing hair)

### Pose Bundles
A pose bundle (`attributes` port type) is an AttributeBundle containing per-bone transform channels: `x`, `y`, `rotation`, `scaleX`, `scaleY`. Indexed by bone order in the skeleton.

## Evaluation Pipeline

```
SkeletonTransform → BoneTransform (per bone, parent→child order) → [constraints] → BoneCollector → IKSolve → FKRecompose
```

1. **Skeleton Transform** — Reads the skeleton root's world transform
2. **Bone Transform** — Per-bone FK: reads pose at boneIndex, computes world matrix from parent
3. **Bone Collector** — Gathers all bone world matrices into a single AttributeBundle
4. **IK Solve** — Runs FABRIK on a bone chain toward a target position
5. **FK Recompose** — After IK/physics modify the pose bundle, recomputes all bone world matrices via a full parent→child FK walk

## Graph Nodes

| Node | Purpose |
|------|---------|
| `skeletonTransform` | Root transform for the skeleton |
| `boneTransform` | Per-bone FK computation (reads pose bundle, outputs world matrix) |
| `boneCollector` | Gathers bone matrices into an AttributeBundle for IK |
| `ikSolve` | FABRIK IK solver for a bone chain |
| `fkRecompose` | Post-IK full FK recomputation |
| `jiggleBone` | Position spring on a bone |
| `springBonePhysics` | Rotational spring with gravity/wind |
| `chainPhysics` | Verlet chain simulation |
| `boneAim` | Aim constraint for a bone |

## Bone Attachment

Objects can be attached to bones. The attachment reads the bone's world matrix and applies it to the object's transform, so the object moves with the bone.

Key detail: attachment is at the bone's **start position** (parent tip + bone local offset), not the bone's tip.
