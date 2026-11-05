import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const root = new URL('..', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');
const home = read('dist/index.html');
const bibliography = read('dist/publications/index.html');
const sitemap = read('dist/sitemap-0.xml');
const projects = [
  ['fleet-routing', []],
  ['satellite-positioning', ['Berntorp2020feb']],
  ['shipping-yard-autonomy', ['Iqbal2023aug', 'You2023may']],
];
const titles = new Set();
for (const [slug, papers] of projects) {
  const route = `/impact/${slug}/`;
  const page = read(`dist${route}index.html`);
  assert.equal((home.match(new RegExp(`href="${route}"`, 'g')) ?? []).length, 2, `Missing title/action link pair: ${slug}`);
  for (const heading of ['Challenge', 'Approach and contribution', 'Results']) {
    assert.ok(page.includes(`>${heading}</h2>`), `Missing impact section ${heading}: ${slug}`);
  }
  assert.equal((page.match(/<h1\b/g) ?? []).length, 1, `Impact page must have one h1: ${slug}`);
  const title = page.match(/<title>(.*?)<\/title>/)?.[1];
  assert.ok(title && !titles.has(title), `Missing or duplicate title: ${slug}`);
  titles.add(title);
  assert.ok(page.includes('<meta name="description" content="'), `Missing description: ${slug}`);
  assert.ok(page.includes('href="/#impact-heading"'), `Missing impact return link: ${slug}`);
  assert.ok(/href="\/" aria-current="location"/.test(page), `Home navigation is not current: ${slug}`);
  assert.ok(page.includes(`rel="canonical" href="https://karlberntorp.github.io${route}"`), `Wrong canonical: ${slug}`);
  assert.ok(sitemap.includes(`https://karlberntorp.github.io${route}`), `Missing sitemap entry: ${slug}`);
  assert.ok(!page.includes('<iframe') && !page.includes('<img'), `Unexpected media on text-first impact page: ${slug}`);
  for (const id of papers) {
    assert.ok(page.includes(`href="/publications/#${id}"`), `Missing related research: ${id}`);
    assert.ok(bibliography.includes(`id="${id}"`), `Related publication anchor is missing: ${id}`);
  }
}
assert.ok(home.includes('id="impact-heading"'), 'Missing Selected impact return target.');
console.log('Verified three impact routes, card links, return links, related publications, metadata, and sitemap entries.');
