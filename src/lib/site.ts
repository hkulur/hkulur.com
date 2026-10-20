import { getCollection, type CollectionEntry } from 'astro:content';

export type Entry = CollectionEntry<'log'>;
export type Kind = Entry['data']['kind'];

// Day 001. Every entry is stamped with its day number counted from here.
export const START = '2026-10-20';

const DAY = 86_400_000;

export function dayNumber(date: Date): number {
  return Math.floor((date.getTime() - Date.parse(START)) / DAY) + 1;
}

export function dayLabel(date: Date): string {
  return `Day ${String(dayNumber(date)).padStart(3, '0')}`;
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

// URL section -> entry kind.
export const SECTIONS = {
  writing: 'writing',
  projects: 'project',
  travel: 'travel',
  notes: 'note',
} as const satisfies Record<string, Kind>;

export async function getEntries(kind?: Kind): Promise<Entry[]> {
  const entries = await getCollection('log', ({ data }) => !data.draft && (!kind || data.kind === kind));
  return entries.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
