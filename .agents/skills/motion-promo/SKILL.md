---
name: motion-promo
description: Create deterministic explanatory motion videos and 3D isometric Reels from a storyboard with the repository's Three.js, Playwright and FFmpeg pipeline; also supports the vendored motion-video engine, narration and captions.
---

# Motion Promo for Codex

This file registers the upstream skill with Codex without duplicating or modifying the original `motion-promo/SKILL.md`.

1. From this repository's root read `motion-promo/SKILL.md` completely. Its paths beginning in `template/`, `motion-video/`, `scripts/` and `examples/` are relative to the `motion-promo/` directory, not this skill wrapper.
2. Treat `~/.claude/skills/motion-promo/` in upstream documentation as `<repository-root>/motion-promo/`. For this Codex fork, the original engine remains at `motion-promo/template` and `motion-promo/motion-video`.
3. Diagnose requirements with `node motion-promo/motion-video/scripts/video.mjs doctor`, then follow the appropriate upstream Diorama, motion-video or Hybrid workflow. On a machine lacking dependencies, clearly report them instead of claiming a successful render.
4. Default to the **Diorama** Three.js engine for 3D low-poly isometric scenes. It does not require Remotion. For Brazilian Portuguese narration over a diorama choose Hybrid or mix a user-provided voice track. Do not silently assume the English Kokoro TTS can speak Portuguese.
5. Keep video source and calculated example data under `examples/`; render in a separate local output folder. Preview multiple timestamps, inspect images, then encode, inspect frames from the final MP4 and check audio/duration.
6. A ready-to-adapt example is `examples/conectamf-dre/`. Read its README and run its financial model test before rendering. The reference numbers are fictional and educational.
7. Preserve MIT attribution and upstream notices. Never expose private company numbers, API keys or customer data in a rendered scene.

Output: a reproducible local video project and verified MP4, or an explicit status identifying missing rendering/voice prerequisites. Never confuse a committed scene with a finished video.
