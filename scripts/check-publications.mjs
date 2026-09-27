import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const root = new URL('..', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');
const publicationKeys = [...read('src/data/publications.bib').matchAll(/^@\w+\s*\{\s*([^,\s]+)\s*,/gm)].map((match) => match[1]);
const patentKeys = [...read('src/data/patents.bib').matchAll(/^@\w+\s*\{\s*([^,\s]+)\s*,/gm)].map((match) => match[1]);
const page = read('dist/publications/index.html');

assert.equal(publicationKeys.length, 133, 'The source publication count changed; review the bibliography and this check.');
assert.equal(patentKeys.length, 48, 'The source patent count changed; review the bibliography and this check.');
for (const key of [...publicationKeys, ...patentKeys]) {
  assert.ok(page.includes(`id="${key}"`), `Missing static bibliography entry: ${key}`);
}
for (const category of ['Journal article', 'Conference paper', 'Book chapter', 'Preprint', 'Technical report', 'Thesis', 'Granted US patent']) {
  assert.ok(page.includes(category), `Missing category label: ${category}`);
}
const expectedTypes = {
  journal: 23,
  conference: 102,
  'book-chapter': 1,
  preprint: 1,
  report: 4,
  thesis: 2,
  patent: 48,
};
for (const [type, count] of Object.entries(expectedTypes)) {
  assert.equal([...page.matchAll(new RegExp(`data-type="${type}"`, 'g'))].length, count, `Unexpected ${type} count`);
}
for (const name of ['Björn', 'Åslund', 'Årzén']) {
  assert.ok(page.includes(name), `BibTeX accent was not rendered: ${name}`);
}
for (const key of ['chaves2025acc', 'hu2025acc', 'zhou2025icra', 'Berntorp2024nov']) {
  assert.ok(page.includes(`id="${key}"`), `Featured-paper anchor is missing: ${key}`);
}
for (const doi of ['10.23919/ACC63710.2025.11107681', '10.23919/ACC63710.2025.11107797', '10.1109/ICRA55743.2025.11128205', '10.1016/j.conengprac.2024.106112']) {
  assert.ok(page.includes(`href="https://doi.org/${doi}"`), `Featured-paper DOI link is missing: ${doi}`);
}
assert.ok(existsSync(new URL('dist/files/Karl_Berntorp_CV.pdf', root)), 'Downloadable CV PDF is missing.');
assert.ok(!page.includes('\\AA'), 'Unconverted LaTeX accent remains in static page.');

console.log(`Verified ${publicationKeys.length} publications, ${patentKeys.length} patents, categories, accents, anchors, and CV PDF.`);
