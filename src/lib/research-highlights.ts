import highlightsData from '../data/research-highlights.json';
import { publications } from './publications';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

export interface ResearchHighlight {
  publicationId: string;
  theme: string;
  image: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  sourceUrl: string;
  sourceLabel?: string;
  credit?: string;
  showOnOverview?: boolean;
}

export const researchHighlights: ResearchHighlight[] = highlightsData;
const themes = new Set(['planning-control', 'localization-estimation', 'robot-autonomy']);
for (const highlight of researchHighlights) {
  if (!themes.has(highlight.theme)) throw new Error(`Unknown research theme ${highlight.theme}.`);
  if (!publications.some((paper) => paper.id === highlight.publicationId)) {
    throw new Error(`Research highlight publication ${highlight.publicationId} was not found in the bibliography.`);
  }
  if (!highlight.image.startsWith('/research/') || !existsSync(join(process.cwd(), 'public', highlight.image.slice(1)))) {
    throw new Error(`Research image was not found in public/research: ${highlight.image}`);
  }
  if (!(highlight.width > 0 && highlight.height > 0)) throw new Error(`Research image dimensions are missing: ${highlight.image}`);
}

export const expandedVenues: Record<string, string> = {
  'IEEE Trans. Signal Process.': 'IEEE Transactions on Signal Processing',
  'IEEE Trans. Control Syst. Technol.': 'IEEE Transactions on Control Systems Technology',
};
