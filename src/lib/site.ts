import { getCollection, type CollectionEntry } from 'astro:content';

export type Kind = CollectionEntry<'log'>['data']['kind'];
// Entries are numbered in date order across the whole log: No. 001 is the first thing shipped.
export type Entry = CollectionEntry<'log'> & { number: number };

export const STARTED = new Date('2026-10-20');

export function numberLabel(n: number): string {
  return `No. ${String(n).padStart(3, '0')}`;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' });
}

export const KIND_LABELS: Record<Kind, string> = {
  writing: 'Writing',
  project: 'Project',
  travel: 'Travel',
  note: 'Note',
};

// URL section -> entry kinds. Writing is everything that isn't a project.
export const SECTIONS = {
  writing: ['writing', 'note', 'travel'],
  projects: ['project'],
} as const satisfies Record<string, readonly Kind[]>;

/** Published entries, newest first. */
export async function getEntries(kinds?: readonly Kind[]): Promise<Entry[]> {
  const all = await getCollection('log', ({ data }) => !data.draft);
  all.sort((a, b) => a.data.date.getTime() - b.data.date.getTime() || a.id.localeCompare(b.id));
  return all
    .map((entry, i) => ({ ...entry, number: i + 1 }))
    .filter((entry) => !kinds || kinds.includes(entry.data.kind))
    .reverse();
}
