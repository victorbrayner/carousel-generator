# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.0] - 2026-08-19

### Added
- REV-01: Subresource Integrity (SRI) and `crossorigin="anonymous"` on html2canvas 1.4.1 and jszip 3.10.1.
- REV-02: Content-Security-Policy, Referrer-Policy, and color-scheme headers in `index.html`.
- REV-03: Inline SVG favicon to eliminate the silent `/favicon.ico` 404.
- REV-04: `package.json` metadata (`name`, `version`, `description`, `license`, `engines.node`).
- REV-05: `.editorconfig` for consistent indentation and line endings.
- REV-06: `LICENSE` (MIT) at the repository root.
- REV-07: this `CHANGELOG.md`.
- REV-08: `.nvmrc` pinning Node 20 (matching CI).

## [1.0.0] - 2026-08-19

### Added
- INFRA-01, INFRA-02: Initial Git repository and Netlify deployment.
- APP-01 to APP-05: Editable slide content, export status reporting, ZIP export with JSZip, overflow validation, dependency failure handling.
- QA-01 to QA-03: Playwright test suite covering smoke, individual export, ZIP export, overflow detection, dependency failures, and visual regression with reference snapshots.
- CI-01: GitHub Actions workflow running tests on `windows-latest` for every push and pull request.
- AGENT-01 to AGENT-04: opencode carousel-reviewer subagent, `carousel-content` and `carousel-visual-qa` skills, `/review` and `/release` commands.
- OPS-01: Monthly maintenance checklist and registry.
- DOC-01, DOC-02: `README.md` and `AGENTS.md` documenting the project and invariants.
