# Carousel Generator

A lightweight browser-based generator for a four-slide social media carousel about IT career mentoring and private lessons. Content can be edited directly in the page and exported as PNG images.

## Project Structure

- `index.html`: the complete static application, including HTML, CSS, and JavaScript.
- `TASKS.md`: prioritized maintenance backlog and the source of truth for project tasks.

## Run Locally

The project has no build step or server requirement.

1. Open `index.html` in a modern browser.
2. Keep an internet connection while using the page because fonts and the image-export library are loaded from external CDNs.

## Edit the Carousel

1. Change the month through the `Mes da agenda` field. It updates the tab name on all slides.
2. Click an editable text area in a slide to change its content.
3. Use the individual download button to export one slide.
4. Use `Baixar os 4 slides (PNG)` to export the complete carousel.
5. Wait for fonts to load before exporting. Export buttons remain disabled until then.
6. Check the status message in the toolbar for export progress, success, or failed slide names.

The output slide dimensions are 1080x1350 pixels. The current export scale produces PNG files at 2160x2700 pixels.

## Publish

Netlify is connected directly to the GitHub repository.

1. Commit the intended changes.
2. Push them to the branch configured in Netlify.
3. Netlify automatically creates a new deploy.
4. Check the deploy status and published site before considering the change complete.

The static entry point is `index.html` at the repository root. Do not rename or move it without updating the Netlify publish configuration.

## Test

Browser tests use Playwright with Chromium in desktop and mobile viewports.

1. Run `npm install` to install the fixed test dependency.
2. Run `npx playwright install chromium` once to download the test browser.
3. Run `npm test` to start the local static server and execute the suite.

## Maintenance Workflow

1. Check `TASKS.md` and select one unblocked task.
2. Implement only the selected task and its required validation.
3. Update its status and acceptance criteria in `TASKS.md` after verification.
4. Commit and push the change so Netlify can publish it.

## Current Limitations

- Fonts and `html2canvas` depend on third-party CDNs.
- Long editable content can exceed the fixed slide layout.
- Browsers can block multiple automatic downloads when exporting all slides.

These items are tracked in `TASKS.md`.
