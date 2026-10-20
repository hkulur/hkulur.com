import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getEntries } from '../lib/site';

export async function GET(context: APIContext) {
  const entries = await getEntries();
  return rss({
    title: 'Harish Kulur',
    description: 'A running record of what I ship and what I think about.',
    site: context.site!,
    items: entries.map(({ id, data }) => ({
      title: data.title,
      description: data.summary,
      pubDate: data.date,
      link: `/log/${id}/`,
    })),
  });
}
