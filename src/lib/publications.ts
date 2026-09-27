import bibtexParse from 'bibtex-parse-js';
import publicationsBib from '../data/publications.bib?raw';
import patentsBib from '../data/patents.bib?raw';

export type PublicationType =
  | 'journal'
  | 'conference'
  | 'book-chapter'
  | 'preprint'
  | 'report'
  | 'thesis'
  | 'patent';

export type Publication = {
  id: string;
  type: PublicationType;
  title: string;
  authors: string[];
  year: number;
  venue: string;
  url?: string;
  doi?: string;
};

type BibEntry = {
  citationKey: string;
  entryType: string;
  entryTags: Record<string, string>;
};

const latexCommands: Record<string, string> = {
  '\\AA': 'Å', '\\aa': 'å', '\\AE': 'Æ', '\\ae': 'æ',
  '\\O': 'Ø', '\\o': 'ø', '\\ss': 'ß', '\\l': 'ł', '\\L': 'Ł',
};

const accents: Record<string, string> = {
  '"': '\u0308', "'": '\u0301', '`': '\u0300', '^': '\u0302',
  '~': '\u0303', '=': '\u0304', '.': '\u0307', 'c': '\u0327', 'v': '\u030c',
};

/** Make BibTeX formatting readable in the static HTML without altering the source files. */
function plainText(value: string): string {
  let text = value;
  text = text.replace(/\\(["'`^~=cv.])\s*\{?([A-Za-z])\}?/g, (_match, mark: string, letter: string) =>
    (letter + accents[mark]).normalize('NFC'),
  );
  text = text.replace(/\\(?:AA|aa|AE|ae|O|o|ss|l|L)\b/g, (command) => latexCommands[command] ?? command);
  text = text.replace(/\\&/g, '&').replace(/\\%/g, '%').replace(/\\_/g, '_');
  text = text.replace(/[{}]/g, '').replace(/\\([A-Za-z]+)/g, '$1');
  return text.replace(/--/g, '–').replace(/\s+/g, ' ').trim();
}

function splitAuthors(value: string): string[] {
  return value.split(/\s+and\s+/i).map((raw) => {
    const name = plainText(raw);
    const parts = name.split(',').map((part) => part.trim());
    return parts.length === 2 ? `${parts[1]} ${parts[0]}` : name;
  }).filter(Boolean);
}

function publicationType(entry: BibEntry, patentList: boolean): PublicationType {
  if (patentList) return 'patent';
  switch (entry.entryType.toLowerCase()) {
    case 'article':
      return /(?:arxiv|preprint)/i.test(`${entry.entryTags.journal ?? ''} ${entry.entryTags.keywords ?? ''}`)
        ? 'preprint' : 'journal';
    case 'inproceedings': return 'conference';
    case 'incollection': return 'book-chapter';
    case 'techreport': return 'report';
    case 'phdthesis':
    case 'mastersthesis': return 'thesis';
    default: throw new Error(`Unsupported BibTeX entry type: ${entry.entryType} (${entry.citationKey})`);
  }
}

function originalKeys(source: string): string[] {
  return [...source.matchAll(/^@\w+\s*\{\s*([^,\s]+)\s*,/gm)].map((match) => match[1]);
}

function parseBibliography(source: string, patentList: boolean): Publication[] {
  const parsed = bibtexParse.toJSON(source) as BibEntry[];
  const keys = originalKeys(source);
  if (parsed.length !== keys.length) {
    throw new Error(`BibTeX parser read ${parsed.length} of ${keys.length} records`);
  }
  const seen = new Set<string>();
  return parsed.map((entry, index) => {
    // Preserve citation keys as written in the source for stable page links.
    const id = keys[index];
    if (entry.citationKey.toLowerCase() !== id.toLowerCase()) {
      throw new Error(`BibTeX citation key mismatch at record ${index + 1}`);
    }
    if (seen.has(id.toLowerCase())) throw new Error(`Duplicate citation key: ${id}`);
    seen.add(id.toLowerCase());
    const fields = entry.entryTags;
    const type = publicationType(entry, patentList);
    const title = plainText(fields.title ?? '');
    const authors = splitAuthors(fields.author ?? '');
    const year = Number(fields.year);
    if (!title || !authors.length || !Number.isInteger(year)) {
      throw new Error(`Missing title, author, or year for ${id}`);
    }
    const patentNumber = plainText(fields.number ?? '');
    const venue = plainText(
      type === 'patent' ? `US Patent ${patentNumber}` :
      type === 'journal' || type === 'preprint' ? fields.journal ?? '' :
      type === 'conference' || type === 'book-chapter' ? fields.booktitle ?? '' :
      type === 'report' ? fields.institution ?? 'Technical report' :
      fields.school ?? 'Thesis',
    );
    const doi = fields.doi ? plainText(fields.doi).replace(/^https?:\/\/(?:dx\.)?doi\.org\//i, '') : undefined;
    const url = fields.url ? plainText(fields.url) :
      doi ? `https://doi.org/${doi}` :
      type === 'patent' && patentNumber ? `https://patents.google.com/patent/US${patentNumber.replace(/\D/g, '')}/en` :
      undefined;
    return { id, type, title, authors, year, venue, ...(url ? { url } : {}), ...(doi ? { doi } : {}) };
  }).sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
}

export const publications: Publication[] = parseBibliography(publicationsBib, false);
export const patents: Publication[] = parseBibliography(patentsBib, true);
