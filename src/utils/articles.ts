import type { CollectionEntry } from 'astro:content';

export function articleSlug(article: CollectionEntry<'articles'>) {
  return article.id.replace(/\.(md|mdx)$/, '');
}
