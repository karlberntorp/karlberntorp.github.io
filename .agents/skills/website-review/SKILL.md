---
name: website-review
description: Review this Astro website's rendered desktop and mobile pages, accessibility, navigation, metadata, and layout regressions. Use for site reviews or changes affecting these behaviors, not isolated bibliography or typo corrections.
---

# Website review

Use [README.md](../../../README.md) for local build and preview instructions. Scope the review to affected pages and shared components; changes to the shared layout or navigation warrant checking Home, Research, and Publications.

## Implementation and checks

- Review the source change for correctness, clear component responsibilities, accessible markup, and unnecessary dependencies, client JavaScript, abstractions, or file splitting.
- Have the parent run `pnpm run check`, `pnpm run build`, and `pnpm run check:publications`. Review the results and use a current production preview when available. A reviewer must not start builds or servers that write files; the parent provides the preview and build evidence.
- Keep page titles, descriptions, canonical URLs, and sitemap behavior consistent with the site and affected routes.

## Rendered review

- Inspect affected pages at a desktop width (1440 px) and a narrow mobile width (375 px). Check a breakpoint boundary if a changed layout depends on it.
- Look for clipped or overlapping text, horizontal overflow, unreadable content, unexpected spacing, and distorted or broken images. Check image alt text, captions, and source credits where affected.
- Use the keyboard to check the skip link, visible focus, navigation, controls, and logical focus order. Inspect heading hierarchy and accessible names; do not claim a complete accessibility audit from these checks.
- Follow affected internal links and publication anchors. When navigation or redirects change, verify `/#experience`, `/cv/`, and `/experience/` reach the Experience section and navigation works from Research and Publications.
- Exercise affected publication search, filtering, or other interactions when their implementation changes. Verify changed external link targets as needed.

## Evidence and findings

Require actual browser observations before claiming visual verification. Record the preview URL, pages, viewport sizes, actions, and observed results; capture screenshots when they clarify an issue. Reuse relevant parent-provided browser evidence and identify it as supplied evidence.

If a preview or browser is unavailable, perform the source review and explicitly report rendered checks as unverified. Do not infer a visual pass from source inspection or build success.

Return actionable findings ordered by severity with file/line references, reproduction details when applicable, and remaining verification gaps. Routine edits need no subagent; a substantial change can use `site_reviewer` for independent read-only review. The parent applies any fixes.
