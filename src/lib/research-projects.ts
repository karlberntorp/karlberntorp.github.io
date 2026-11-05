import type { MarkdownInstance } from 'astro';
import { publications } from './publications';
import { researchHighlights } from './research-highlights';

export interface ProjectFrontmatter {
  title: string;
  description: string;
  publicationId: string;
  youtubeVideoId?: string;
  videoTitle?: string;
  videoCaption?: string;
}

const documents = import.meta.glob<MarkdownInstance<ProjectFrontmatter>>('../content/projects/*.md', { eager: true });
const seenPublications = new Set<string>();

export const researchProjects = Object.entries(documents).map(([path, document]) => {
  const slug = path.split('/').pop()!.replace(/\.md$/, '');
  const data = document.frontmatter;
  if (!data.title || !data.description || !data.publicationId || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(`Missing project metadata or invalid slug: ${path}`);
  }
  const paper = publications.find((item) => item.id === data.publicationId);
  const figures = researchHighlights.filter((item) => item.publicationId === data.publicationId);
  if (!paper || figures.length !== 1) throw new Error(`Project ${slug} needs a publication and exactly one figure.`);
  if (seenPublications.has(paper.id)) throw new Error(`Duplicate project for publication ${paper.id}.`);
  seenPublications.add(paper.id);
  if (data.youtubeVideoId && (!/^[\w-]{11}$/.test(data.youtubeVideoId) || !data.videoTitle || !data.videoCaption)) {
    throw new Error(`Project ${slug} needs a valid YouTube ID, video title, and caption.`);
  }
  return { slug, href: `/research/${slug}/`, ...data, paper, figure: figures[0], Content: document.Content };
});

export const projectByPublication = new Map(researchProjects.map((project) => [project.publicationId, project]));
