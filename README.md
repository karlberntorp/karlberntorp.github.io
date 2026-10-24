# Karl Berntorp website

An Astro static website for Karl Berntorp, intended for `https://karlberntorp.github.io/`.

## Work locally

Use Node.js 22.12 or newer and pnpm 11. From the repository root:

```sh
pnpm install
pnpm run dev
```

Create and inspect the production build with:

```sh
pnpm run build
pnpm run check
pnpm run check:publications
pnpm run preview
```

The bibliography check verifies the source record counts, all generated citation anchors, publication categories, representative accented names, and that the static site contains no PDFs. It reads the built `dist/` output, so run it after `pnpm run build`.

## Update site copy

Public copy lives in `src/content/` and `src/data/impact-highlights.ts`:

- `home.md`: homepage introduction, metadata, and contact copy.
- `impact-highlights.ts`: the three selected industrial outcomes, with typed IDs, headings, and descriptions.
- `cv.md`: selected public experience entries and supporting education/service and entrepreneurship paragraphs. This is curated website copy, not a CV document.
- `selected-work.md`: the existing four selected papers and summaries. Preserve citation keys so links reach the bibliography anchors.
- `research.md`: the Research page narrative.

The homepage composes `HomeHero`, `SelectedImpact`, `ExperienceSummary`, and `SelectedResearch`, with a small contact section inline. Each component owns its section styles; common styling stays in `global.css`. Experience remains at `/#experience`, and the shared navigation links there from every page. Research and Publications remain separate pages.

Keep private reference documents, full CV extractions, archives, and iCloud paths out of the repository and build. There is no CV download or automatic document import. Preserve context and shared attribution when editing outcome claims; distinguish production results from experiments and prototypes.

## Update photos and research figures

The home page uses [`public/portrait.jpg`](public/portrait.jpg), a 200 × 250 photo supplied by Karl. Replace it with an approved portrait at the same path; keep the displayed width at or below the file's native width. The home page also detects `portrait.webp` or `portrait.png` and shows the role panel without a photo when no portrait file is present.

Research figures live in [`public/research/`](public/research/) and are described in [`src/data/research-highlights.json`](src/data/research-highlights.json). Each record names a bibliography `publicationId`, one of the three research `theme` keys, a local `/research/…` image path, descriptive `alt` text, a `caption`, and the original `sourceUrl`. The page uses the bibliography title, journal, and year for its linked source line. Keep the image, caption, and source aligned with the cited paper; optimize images for the web without enlarging them. The build fails if a theme has no figure or a listed image or publication is missing.

## Update publications and Experience

The website keeps bibliographic records in [`src/data/publications.bib`](src/data/publications.bib) and [`src/data/patents.bib`](src/data/patents.bib). Update these files when approved records change. The publication page and selected-work links are generated from the BibTeX citation keys at build time by [`src/lib/publications.ts`](src/lib/publications.ts). Preserve citation keys when possible to keep existing page anchors stable. The Experience section is at `/#experience`; the former `/experience/` and `/cv/` URLs redirect there for existing links.

The September 2026 sources contain 133 publications and 48 granted US patents. The home page presents these as approximately 130 publications and approximately 50 patents, as research credentials; entrepreneurship appears in Experience. If the counts change intentionally, update the expectations in [`scripts/check-publications.mjs`](scripts/check-publications.mjs) and the home page figures after reviewing the new records. The publication page distinguishes journal articles, conference papers, book chapters, preprints, reports, theses, and patents. Keep patent applications out of the granted-patent file unless they become grants.

## GitHub Pages

[`deploy.yml`](.github/workflows/deploy.yml) builds and validates the site on pushes to `main` or a manual workflow run, then deploys the static artifact with the official Astro and GitHub Pages actions. In the repository settings, configure Pages to use **GitHub Actions** as its build and deployment source. The `site` setting in `astro.config.mjs` must match the public URL. The repository must be named `karlberntorp.github.io` for the root GitHub Pages address above.
