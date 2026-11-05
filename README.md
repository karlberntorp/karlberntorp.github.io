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
pnpm run check:research
pnpm run check:impact
pnpm run preview
```

The bibliography check verifies source counts, duplicate keys/DOIs/patent numbers, generated citation anchors, publication categories, representative accented names, and that the static site contains no PDFs. The research check verifies the four research routes, their links, figure provenance, metadata, and overview visibility. The impact check verifies the three impact routes, title/action links, return links, related publications, metadata, and sitemap entries. These checks read the built `dist/` output, so run them after `pnpm run build`.

## Update site copy

Public copy lives in `src/content/` and `src/data/impact-highlights.ts`:

- `home.md`: homepage eyebrow, introduction, metadata, and contact copy. The opening presents robotics, autonomy, and AI, with technical strategy, team leadership, and hands-on development given equal weight.
- `impact-highlights.ts`: the three selected industrial outcomes, with typed IDs, headings, and descriptions.
- `impact/*.md`: detail pages behind those outcomes. Filenames become `/impact/<filename>/` routes. Frontmatter supplies a `title`, `description`, and matching `impactId`. Every impact record needs exactly one page. Use Challenge, Approach and contribution, and Results sections. State the contribution and evidence directly; keep pages as short as the subject allows without a minimum word count. Related research links use paper titles and must resolve to existing bibliography anchors; describe published experimental conditions separately from customer or production outcomes.
- `cv.md`: selected public experience entries and supporting education/service and entrepreneurship paragraphs. This is curated website copy, not a CV document.
- `selected-work.md`: the existing four selected papers and summaries. Preserve citation keys so links reach the bibliography anchors.
- `research.md`: the Research page narrative.
- `projects/*.md`: the four research project narratives. Filenames become `/research/<filename>/` routes. Each frontmatter block supplies a `title`, `description`, and stable bibliography `publicationId`; optional `youtubeVideoId`, `videoTitle`, and `videoCaption` fields describe a related MERL video. Keep the Problem, Approach, and Results and validation sections grounded in the cited publication. Preserve shared attribution, experimental conditions, and meaningful comparisons. Use method-focused language for shared research and first person for documented personal contributions. Keep descriptions concise without a minimum word count; remove generic commentary about what the work illustrates.

The homepage composes `HomeHero`, `SelectedImpact`, `ExperienceSummary`, and `SelectedResearch`, with a small contact section inline. Selected research titles and “Explore the work” links open project pages; separate Publication links retain the bibliography anchors. Every selected paper must have one project page and a matching figure. Project pages share `src/pages/research/[slug].astro`; their loader is `src/lib/research-projects.ts`. Research overview links lead to the same projects. Each component owns its section styles; common styling stays in `global.css`. Experience remains at `/#experience`, and the shared navigation links there from every page. Research and Publications remain separate pages.

Project-page publication panels show the title, venue, year, and bibliography link. Keep complete author lists in the bibliography and preserve source/copyright credits on figures. Avoid naming individual collaborators in project narratives and related-paper summaries.

Selected impact titles and “Explore the work” links open text-first detail pages. They share `src/pages/impact/[slug].astro` and the build-time loader in `src/lib/impact-projects.ts`. Home is the current navigation section on these pages; “Back to Selected impact” returns to `/#impact-heading`. Research project pages retain their separate publication and figure requirements.

Keep private reference documents, full CV extractions, archives, and iCloud paths out of the repository and build. There is no CV download or automatic document import. Preserve context and shared attribution when editing outcome claims; distinguish production results from experiments and prototypes.

## Update photos and research figures

The home page uses [`public/portrait.jpg`](public/portrait.jpg), a 200 × 250 photo supplied by Karl. Replace it with an approved portrait at the same path; keep the displayed width at or below the file's native width. The home page also detects `portrait.webp` or `portrait.png` and shows the role panel without a photo when no portrait file is present.

Research figures live in [`public/research/`](public/research/) and are described in [`src/data/research-highlights.json`](src/data/research-highlights.json). Each record names a bibliography `publicationId`, one of the three research `theme` keys, a local `/research/…` image path, intrinsic `width` and `height`, descriptive `alt` text, a `caption`, and the original `sourceUrl`. Set `showOnOverview: false` for project-only figures; omission keeps a figure on the Research overview. Optional `sourceLabel` and `credit` fields distinguish original explanatory illustrations and additional source credits. The shared figure component uses the bibliography title, journal, and year for its linked source line. Keep the image, caption, and source aligned with the cited paper; optimize images for the web without enlarging them. The build fails if an overview theme has no figure or a listed image or publication is missing. The mini-car photograph is Figure 11 from MERL TR2018-164, optimized from the original embedded image. The vehicle-state SVG is an original explanatory schematic based on the cited institutional abstract, not experimental evidence.

Videos use lazy-loaded, responsive `youtube-nocookie.com` players without autoplay and always include a direct YouTube link. Verify that a video matches the described experiment, including its controllers and scale. Test embedded playback in the production preview; if embedding is unavailable, remove the iframe and retain the descriptive text and direct link. Keep source PDFs and extraction intermediates outside the repository; only web figures belong in the build.

## Update publications and Experience

The website keeps bibliographic records in [`src/data/publications.bib`](src/data/publications.bib) and [`src/data/patents.bib`](src/data/patents.bib). Update these files when approved records change. The publication page and selected-work links are generated from the BibTeX citation keys at build time by [`src/lib/publications.ts`](src/lib/publications.ts). Preserve citation keys when possible to keep existing page anchors stable. The Experience section is at `/#experience`; the former `/experience/` and `/cv/` URLs redirect there for existing links.

The November 5, 2026 sources contain 134 scholarly records and 49 granted US patents: 23 journal articles, 102 conference papers, 1 workshop paper, 1 book chapter, 1 preprint, 4 reports, and 2 theses. The home page presents these as approximately 130 publications and approximately 50 patents, in a compact supporting row below the hero buttons; entrepreneurship appears in Experience. If counts change intentionally, update the expectations in [`scripts/check-publications.mjs`](scripts/check-publications.mjs), the bibliography update date, and these totals after reviewing the records. Revisit the rounded home page figures when the totals warrant it. The publication page distinguishes journal articles, conference papers, workshop papers, book chapters, preprints, reports, theses, and patents. An `inproceedings` entry with the comma-separated keyword `workshop` receives the Workshop paper label. Keep patent applications out of the granted-patent file unless they become grants.

The current update adds the published AIDA LEAP/CoRL workshop paper (`Yang2026aida`) and its OpenReview link, with publication status confirmed by Karl; automated OpenReview access was unavailable. Grant `US12783900`, issued November 3, 2026, was verified against the [USPTO gazette](https://patentsgazette.uspto.gov/week44/OG/html/1552-1/US12783900-20261103.html). The grant list was compared with MERL's issued-patent records through the update date; later-dated records are excluded. Existing citation keys remain stable even when their embedded year/month differs from corrected journal issue metadata.

When reconciling CV sources, compare records by stable citation key and verify changed facts against primary sources. Preserve DOI and institutional-link enrichment, author/inventor order, and BibLaTeX keywords; ignore harmless brace, whitespace, month-format, and patent-comma differences. Update only explicitly selected editable source packages and their bibliography filters, leaving originals, archives, submitted versions, and existing PDFs intact. Keep package locations and reconciliation notes in the private workspace. A sources-only update requires its own dated package note; it does not renew previous PDF build or visual-validation claims. No private CV location is needed by the website build.

## GitHub Pages

[`deploy.yml`](.github/workflows/deploy.yml) builds and validates the site on pushes to `main` or a manual workflow run, then deploys the static artifact with the official Astro and GitHub Pages actions. In the repository settings, configure Pages to use **GitHub Actions** as its build and deployment source. The `site` setting in `astro.config.mjs` must match the public URL. The repository must be named `karlberntorp.github.io` for the root GitHub Pages address above.

## Agent guidance

[AGENTS.md](AGENTS.md) defines the project's simple, lean, modular coding principles, content safeguards, and validation expectations. Repository skills cover [publication maintenance](.agents/skills/website-publications/SKILL.md) and [site review](.agents/skills/website-review/SKILL.md). For substantial work, use a focused [content reviewer](.codex/agents/content_reviewer.toml) or [site reviewer](.codex/agents/site_reviewer.toml) when useful; routine edits need no subagent. Reviewers inherit the current model settings and session permissions and are instructed to review without editing. The parent owns changes and resolves their advisory findings.
