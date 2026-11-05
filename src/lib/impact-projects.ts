import type { MarkdownInstance } from 'astro';
import { impactHighlights } from '../data/impact-highlights';

interface ImpactFrontmatter {
  title: string;
  description: string;
  impactId: string;
}

const documents = import.meta.glob<MarkdownInstance<ImpactFrontmatter>>('../content/impact/*.md', { eager: true });
const seen = new Set<string>();

export const impactProjects = Object.entries(documents).map(([path, document]) => {
  const slug = path.split('/').pop()!.replace(/\.md$/, '');
  const data = document.frontmatter;
  if (!data.title || !data.description || !data.impactId || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(`Missing impact metadata or invalid slug: ${path}`);
  }
  if (!impactHighlights.some((item) => item.id === data.impactId) || seen.has(data.impactId)) {
    throw new Error(`Unknown or duplicate impact record: ${data.impactId}`);
  }
  seen.add(data.impactId);
  return { ...data, slug, href: `/impact/${slug}/`, Content: document.Content };
});

for (const item of impactHighlights) {
  if (!seen.has(item.id)) throw new Error(`Missing project page for impact record: ${item.id}`);
}

export const impactProjectById = new Map(impactProjects.map((project) => [project.impactId, project]));
