---
name: website-publications
description: Maintain or review this website's BibTeX records, publication counts, selected-paper references, and research figure attribution. Use for publication data changes, not general layout or copy edits.
---

# Website publications

Read the relevant publication and figure maintenance sections in [README.md](../../../README.md). Inspect only the source records and consumers affected by the request.

## Source integrity

- Edit bibliographic records in `src/data/publications.bib` and `src/data/patents.bib`; generated HTML is not the source of truth.
- Preserve citation keys, including case, because they become public anchors. If a key migration is explicitly requested, update all affected references and report the link impact.
- Check duplicate keys and duplicate works, malformed entries, missing required fields, author names and accents, and title/year/venue consistency. A second key for the same DOI or patent number needs review rather than automatic deletion.
- Verify changed metadata against supplied evidence or authoritative publisher, DOI, institutional, or patent records as needed. Do not invent missing fields; report unresolved uncertainty. Keep patent applications out of the granted-US-patent file.

## Linked content and counts

- Confirm affected references in `src/content/selected-work.md`, `src/pages/research.astro`, and `src/data/research-highlights.json` resolve to the intended paper.
- For changed figures, verify the local image, research theme, publication ID, descriptive alt text, caption, and original source URL agree. Preserve attribution and do not broaden the paper's claims.
- If records change counts or categories, reconcile the intentional changes with `scripts/check-publications.mjs`, the public figures in `src/components/HomeHero.astro`, and any affected copy or README counts. Do not relax expectations merely to make a failing check pass.

## Verification and reporting

Run `pnpm run check`, then `pnpm run build`, then `pnpm run check:publications`. Inspect affected rendered entries for accents, category labels, DOI links, figure credits, and selected-paper anchors; use `website-review` when a rendered site review is needed.

Report changed records, intentional count or key changes, verification results, and unresolved metadata or provenance gaps. For a substantial update, `content_reviewer` can provide a focused read-only review; routine record corrections do not require delegation.
