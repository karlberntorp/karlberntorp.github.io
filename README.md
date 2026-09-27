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

The bibliography check verifies the source record counts, all generated citation anchors, publication categories, representative accented names, and the downloadable CV. It reads the built `dist/` output, so run it after `pnpm run build`.

## Update site copy

Page text and selected-work summaries live in [`src/content/`](src/content/). Update those Markdown files for biography, research, and CV copy. The featured paper cards on the home page use citation keys from the bibliography; if a key changes, update its `id` in the frontmatter of [`src/content/selected-work.md`](src/content/selected-work.md) and check that the resulting link reaches the corresponding publication anchor.

## Update publications and CV

The website keeps copies of the dated September 27, 2026 CV sources in [`src/data/publications.bib`](src/data/publications.bib), [`src/data/patents.bib`](src/data/patents.bib), and [`public/files/Karl_Berntorp_CV.pdf`](public/files/Karl_Berntorp_CV.pdf). The originals remain in the private CV working folder. Edit or replace these copies when a new CV is approved. The publication page and selected-work links are generated from the BibTeX citation keys at build time by [`src/lib/publications.ts`](src/lib/publications.ts). Preserve citation keys when possible to keep existing page anchors stable.

The September 2026 sources contain 133 publications and 48 granted US patents. If the counts change intentionally, update the expectations in [`scripts/check-publications.mjs`](scripts/check-publications.mjs) after reviewing the new records. The page distinguishes journal articles, conference papers, book chapters, preprints, reports, theses, and patents. Keep patent applications out of the granted-patent file unless they become grants.

## GitHub Pages

[`deploy.yml`](.github/workflows/deploy.yml) builds and validates the site on pushes to `main` or a manual workflow run, then deploys the static artifact with the official Astro and GitHub Pages actions. In the repository settings, configure Pages to use **GitHub Actions** as its build and deployment source. The `site` setting in `astro.config.mjs` must match the public URL. The repository must be named `karlberntorp.github.io` for the root GitHub Pages address above.
