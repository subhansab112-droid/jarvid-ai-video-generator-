# Jarvid AI Video Generator — Starter v0.1

A no-paid-API, local-first film planning workspace.

## What works now
- Write and save a screenplay/story in the browser.
- Split paragraphs into a scene outline.
- Create a character bible with appearance/continuity notes.
- Add character reference images (kept locally in the browser).
- Add visual direction notes per scene.
- Export the project as JSON.

## What this starter does NOT do yet
This first version does not generate AI images, voices, or video clips. Those require model runtimes and compute. The app deliberately has no paid API keys or hidden paid services.

## Run it
1. Extract the ZIP.
2. Open `index.html` in Chrome, Edge, or Firefox.
3. Use **Load sample** to test, then create scenes and add characters.

No Node.js, Python, database, or API key is needed for this starter.

## Free-only roadmap
1. Add open-source image generation through a user-run local model where hardware allows.
2. Add open-source text-to-speech.
3. Add FFmpeg-based assembly and export.
4. Add optional community/free GPU demos only when their published quotas and terms permit it.

**Important:** free cloud GPU access is limited and can change. Do not promise unlimited free video generation. The app's planning and editing tools can remain free; heavy AI generation must use a genuinely free available runtime or be disabled rather than silently charging the user.

## Privacy
Projects are stored in browser localStorage. Reference images are kept in browser memory for the current session in this starter and are not uploaded to a server. Export JSON does not include reference image binaries.
