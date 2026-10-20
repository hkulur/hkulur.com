import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const log = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/log' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    kind: z.enum(['writing', 'project', 'travel', 'note']),
    // Optional display label, e.g. "Essay" or "Builder" for writing.
    label: z.string().optional(),
    summary: z.string(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { log };
