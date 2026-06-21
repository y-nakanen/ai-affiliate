import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    categoryId: z.string(),
    tags: z.array(z.string()).default([]),
    affiliateDisclosure: z.boolean().default(true),
    relatedSlugs: z.array(z.string()).default([]),
    draft: z.boolean().default(false)
  })
});

export const collections = {
  articles
};
