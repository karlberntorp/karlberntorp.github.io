import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import bibtexParse from 'bibtex-parse-js';

const root = new URL('..', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');
const publicationKeys = [...read('src/data/publications.bib').matchAll(/^@\w+\s*\{\s*([^,\s]+)\s*,/gm)].map((match) => match[1]);
const patentKeys = [...read('src/data/patents.bib').matchAll(/^@\w+\s*\{\s*([^,\s]+)\s*,/gm)].map((match) => match[1]);
const page = read('dist/publications/index.html');

assert.equal(publicationKeys.length, 134, 'The source publication count changed; review the bibliography and this check.');
assert.equal(patentKeys.length, 49, 'The source patent count changed; review the bibliography and this check.');
assert.equal(new Set([...publicationKeys, ...patentKeys].map((key) => key.toLowerCase())).size, publicationKeys.length + patentKeys.length, 'Duplicate citation keys.');
for (const [file, field] of [['publications.bib', 'doi'], ['patents.bib', 'number']]) {
  const values = bibtexParse.toJSON(read(`src/data/${file}`)).map((entry) => entry.entryTags[field]).filter(Boolean).map((value) => value.replace(/[{},\s]/g, '').toLowerCase());
  assert.equal(new Set(values).size, values.length, `Duplicate ${field} records in ${file}.`);
}
for (const key of [...publicationKeys, ...patentKeys]) {
  assert.ok(page.includes(`id="${key}"`), `Missing static bibliography entry: ${key}`);
}
for (const category of ['Journal article', 'Conference paper', 'Workshop paper', 'Book chapter', 'Preprint', 'Technical report', 'Thesis', 'Granted US patent']) {
  assert.ok(page.includes(category), `Missing category label: ${category}`);
}
const expectedTypes = {
  journal: 23,
  conference: 102,
  workshop: 1,
  'book-chapter': 1,
  preprint: 1,
  report: 4,
  thesis: 2,
  patent: 49,
};
for (const [type, count] of Object.entries(expectedTypes)) {
  assert.equal([...page.matchAll(new RegExp(`data-type="${type}"`, 'g'))].length, count, `Unexpected ${type} count`);
}
for (const name of ['Björn', 'Åslund', 'Årzén']) {
  assert.ok(page.includes(name), `BibTeX accent was not rendered: ${name}`);
}
const workshop = page.match(/<li id="Yang2026aida"[\s\S]*?<\/li>/)?.[0] ?? '';
assert.ok(workshop.includes('data-type="workshop"') && workshop.includes('LEAP'), 'AIDA must be categorized as a workshop paper with its venue.');
assert.ok(workshop.includes('href="https://openreview.net/pdf?id=d0QoEpVBxX"'), 'AIDA paper link is missing.');
assert.ok(!workshop.includes('Forthcoming'), 'AIDA retains the superseded forthcoming status.');
assert.ok(page.includes('id="US12783900"'), 'The November 3, 2026 grant is missing.');
for (const key of ['chaves2025acc', 'hu2025acc', 'zhou2025icra', 'Berntorp2024nov']) {
  assert.ok(page.includes(`id="${key}"`), `Featured-paper anchor is missing: ${key}`);
}
for (const doi of ['10.23919/ACC63710.2025.11107681', '10.23919/ACC63710.2025.11107797', '10.1109/ICRA55743.2025.11128205', '10.1016/j.conengprac.2024.106112']) {
  assert.ok(page.includes(`href="https://doi.org/${doi}"`), `Featured-paper DOI link is missing: ${doi}`);
}
assert.equal(readdirSync(new URL('dist/', root), { recursive: true }).filter((file) => file.toLowerCase().endsWith('.pdf')).length, 0, 'A PDF was included in the static site.');
assert.ok(!page.includes('\\AA'), 'Unconverted LaTeX accent remains in static page.');

console.log(`Verified ${publicationKeys.length} publications, ${patentKeys.length} patents, categories, accents, anchors, and no published PDFs.`);
