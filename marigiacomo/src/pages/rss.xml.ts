import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '../site';

export async function GET(context: { site: string }) {
  const posts = await getCollection('writing', ({ data }) => !data.draft);
  return rss({
    title: site.name,
    description: site.tagline,
    site: context.site,
    items: posts
      .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.summary ?? '',
        link: `/writing/${post.id}/`,
      })),
  });
}
