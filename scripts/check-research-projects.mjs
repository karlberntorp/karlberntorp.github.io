import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const root = new URL('..', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');
const home = read('dist/index.html');
const overview = read('dist/research/index.html');
const bibliography = read('dist/publications/index.html');
const sitemap = read('dist/sitemap-0.xml');
const figures = JSON.parse(read('src/data/research-highlights.json'));
const projects = [
  ['friction-adaptive-tracking', 'Berntorp2020jan'],
  ['particle-filter-planning', 'Berntorp2018dec'],
  ['vehicle-state-estimation', 'Berntorp2016e'],
  ['quadrotor-planning', 'Greiff2025jan'],
];
const videos = { 'particle-filter-planning': 'v2pYQVnHfHY', 'quadrotor-planning': 'ewIcOwDwZC8' };

for (const [slug, id] of projects) {
  const route = `/research/${slug}/`;
  const page = read(`dist${route}index.html`);
  const figure = figures.find((item) => item.publicationId === id);
  assert.ok(figure, `Missing figure for ${id}`);
  assert.ok(existsSync(new URL(`dist${figure.image}`, root)), `Missing built figure for ${id}`);
  assert.ok(home.includes(`href="${route}"`), `Homepage has no project link for ${id}`);
  assert.ok(home.includes(`href="/publications/#${id}"`), `Homepage lost publication link for ${id}`);
  assert.ok(overview.includes(`href="${route}"`), `Research overview has no project link for ${id}`);
  assert.ok(page.includes(`src="${figure.image}"`), `Project uses the wrong figure for ${id}`);
  assert.ok(page.includes(`href="${figure.sourceUrl}"`), `Project lost figure provenance for ${id}`);
  assert.ok(page.includes(`href="/publications/#${id}"`), `Project lost publication link for ${id}`);
  assert.ok(bibliography.includes(`id="${id}"`), `Publication anchor does not resolve for ${id}`);
  assert.ok(page.includes('href="/#selected-heading"'), `Project has no homepage return link: ${slug}`);
  assert.ok(page.includes('aria-current="location"'), `Research navigation is not current: ${slug}`);
  assert.equal((page.match(/<h1\b/g) ?? []).length, 1, `Project must have one h1: ${slug}`);
  assert.ok(page.includes('Results and validation'), `Project lost validation context: ${slug}`);
  assert.ok(page.includes(`rel="canonical" href="https://karlberntorp.github.io${route}"`), `Wrong canonical URL: ${slug}`);
  assert.ok(sitemap.includes(`https://karlberntorp.github.io${route}`), `Project missing from sitemap: ${slug}`);
  if (figure.showOnOverview === false) {
    assert.ok(!overview.includes(`src="${figure.image}"`), `Project-only figure leaked into overview: ${slug}`);
  }
  assert.ok(!page.includes('evidenceNote') && !page.includes('OpenAlex'), `Internal evidence notes leaked: ${slug}`);
  const videoId = videos[slug];
  if (videoId) {
    assert.ok(page.includes(`href="https://www.youtube.com/watch?v=${videoId}"`), `Missing direct video link: ${slug}`);
    if (page.includes('<iframe')) {
      assert.ok(page.includes(`src="https://www.youtube-nocookie.com/embed/${videoId}"`), `Player must use the matched privacy-enhanced embed: ${slug}`);
      assert.ok(!page.includes('autoplay'), `Player must not autoplay: ${slug}`);
    }
  } else {
    assert.ok(!page.includes('<iframe'), `Unrelated player added to ${slug}`);
  }
}

assert.ok(home.includes('id="selected-heading"'), 'Homepage return anchor is missing.');
assert.ok(!home.includes('youtube'), 'Video was added to the homepage.');
for (const id of ['Berntorp2021mar', 'chakrabarty2025metalearningphysicallyconstrainedneuralidentification', 'Menner2022aug', 'Yang2026aida']) {
  assert.ok(overview.includes(`href="/publications/#${id}"`), `Learning reference is missing: ${id}`);
  assert.ok(bibliography.includes(`id="${id}"`), `Learning reference does not resolve: ${id}`);
}
console.log('Verified four research routes, project/publication links, figures, provenance, metadata, and overview visibility.');
