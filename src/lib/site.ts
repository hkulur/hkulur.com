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

// URL section -> entry kind. Travel and notes have no section of their own; they appear in the index log only.
export const SECTIONS = {
  writing: 'writing',
  projects: 'project',
} as const satisfies Record<string, Kind>;

/** Published entries, newest first. */
export async function getEntries(kind?: Kind): Promise<Entry[]> {
  const all = await getCollection('log', ({ data }) => !data.draft);
  all.sort((a, b) => a.data.date.getTime() - b.data.date.getTime() || a.id.localeCompare(b.id));
  return all
    .map((entry, i) => ({ ...entry, number: i + 1 }))
    .filter((entry) => !kind || entry.data.kind === kind)
    .reverse();
}
