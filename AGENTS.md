# Agent Instructions

## Scope

- Keep this project as a static site unless a task explicitly requires a different architecture.
- `index.html` is the application entry point and contains the HTML, CSS, and JavaScript.
- Do not rename, move, or remove `index.html` without updating its configured Netlify publish path and the documentation. If that configuration is only in the Netlify dashboard, ask the project owner to update it; do not claim it was changed in the repository.
- Prefer the smallest correct change. Do not add frameworks, a backend, or a build step without a documented need.

## Non-Negotiable Behavior

- Preserve four carousel slides unless a task explicitly changes their number.
- Preserve the base slide size of 1080x1350 CSS pixels.
- Preserve PNG export at scale 2, which produces images at 2160x2700 pixels.
- Keep individual slide downloads working when changing the complete-carousel export flow.
- Keep user-facing interface text in Brazilian Portuguese unless the task requests another language.
- Preserve the editable-content behavior when modifying slide content or layout.

## Implementation Rules

- Treat `TASKS.md` as the project task source of truth. Work on one unblocked task at a time.
- Read the relevant HTML, CSS, and JavaScript before changing behavior.
- Do not silently change pricing, mentoring claims, personal names, or calls to action.
- Avoid external dependencies. When one is necessary, use a fixed version, explain its purpose, and update the README if usage changes.
- Do not remove error handling or font-loading safeguards from the export flow.
- Preserve keyboard operation, visible focus, accessible names for controls, and sufficient text contrast when changing the interface.

## Validation

- For behavior changes, test the affected interaction in a modern browser.
- For layout, typography, or content changes, inspect desktop and mobile views before completion.
- Wait for web fonts before validating visual output or exporting images.
- For export changes, validate at least one individual PNG export and the complete-carousel flow.
- Check that editable text does not overlap, clip, or escape the 1080x1350 slide bounds.
- Run the available automated checks when they exist. Do not claim a check passed if it was not run.
- Until automated browser tests exist, record the browser and desktop/mobile viewport used for manual validation in the handoff.

## Delivery

- Update the selected task status in `TASKS.md` only after its acceptance criteria have been verified.
- Keep documentation aligned when a change affects setup, editing, export, deployment, or maintenance.
- Inspect `git diff` and `git status` before handing work back.
- Do not commit, push, deploy, or change Netlify settings unless explicitly requested.
