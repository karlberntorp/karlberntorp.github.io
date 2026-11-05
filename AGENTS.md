# Website agent guide

This is Karl Berntorp's static Astro website. Read [README.md](README.md) for detailed maintenance instructions and load only the files relevant to the task.

## Simple, lean, modular code

- Prefer straightforward Astro, TypeScript, semantic HTML, and CSS. Add dependencies or client-side JavaScript only when a concrete requirement justifies them.
- Give components and functions clear responsibilities: pages compose sections, components own presentation, existing content/data files hold public copy and records, and library modules hold shared logic.
- Extract shared code when it reduces meaningful duplication or clarifies responsibility. Avoid speculative abstractions, generic frameworks, and excessive file splitting.
- Keep component styles local; reserve global styles for shared foundations.
- Make the smallest cohesive change that completes the request. Remove code made obsolete by that change and avoid unrelated refactoring.
- Preserve strict typing and accessible markup. Use existing checks and add focused tests when new logic or a regression warrants them; do not add tests that merely mirror trivial edits.

## Project map and safeguards

- `src/pages/`, `src/components/`, and `src/layouts/` compose the website; shared styles live in `src/styles/global.css`.
- `src/content/` and `src/data/impact-highlights.ts` hold curated public copy. `src/lib/publications.ts` derives publication data from the BibTeX files in `src/data/`.
- `public/research/` and `src/data/research-highlights.json` hold research figures and their provenance. Keep images, captions, source links, and cited papers aligned.
- Keep private reference documents, full CV extractions, archives, and private filesystem paths outside the repository and build. Do not introduce a downloadable CV or publish PDFs.
- Preserve shared attribution, measurement conditions, and claim scope. Distinguish production results from experiments and prototypes; do not invent achievements or supporting evidence.
- Preserve bibliography citation keys and anchors, `/#experience`, and the `/cv/` and `/experience/` redirects unless the task explicitly calls for a migration.
- Update README instructions in the same change when behavior or maintenance commands change.

## Skills and focused review

- For bibliography records, publication counts, selected-paper references, or research figure attribution, use [website-publications](.agents/skills/website-publications/SKILL.md).
- For requested site reviews or changes affecting rendered layout, navigation, accessibility, or metadata, use [website-review](.agents/skills/website-review/SKILL.md).
- Routine edits, such as a typo, need no subagent. For substantial work that benefits from independent review, normally select one focused reviewer: [content_reviewer](.codex/agents/content_reviewer.toml) for copy, claims, attribution, and citations; [site_reviewer](.codex/agents/site_reviewer.toml) for implementation and rendered behavior.
- Pass only relevant files, applicable skill instructions, acceptance criteria, a preview URL when available, and existing check results. Reviewers do not edit files; they inherit the parent session's permissions and model settings. Their findings are advisory; the parent owns implementation and resolves findings.

## Validation

Use the Node.js and pnpm versions documented in README. For website changes, run:

```sh
pnpm run check
pnpm run build
pnpm run check:publications
```

The publication check reads the built output, so build first. Inspect affected rendered pages when appearance or interaction changes. A successful build is not visual verification. For instruction-only changes, validate skill frontmatter, agent TOML syntax, and referenced paths. Run `git diff --check` before closeout.

Report checks run and their results, plus any unverified behavior, unsupported claims, or provenance gaps. Keep generated output in ignored directories.
