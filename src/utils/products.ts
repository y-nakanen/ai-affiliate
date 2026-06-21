import products from '../data/products.json';

function byPriority<T extends { priority?: number; name?: string }>(a: T, b: T) {
  return (a.priority ?? 999) - (b.priority ?? 999) || String(a.name).localeCompare(String(b.name), 'ja');
}

export function getProductsByGroup(group: string) {
  return products.filter((product) => product.pageGroups.includes(group)).sort(byPriority);
}

export function getProductsByCategory(categoryId: string) {
  return products.filter((product) => product.categoryIds.includes(categoryId)).sort(byPriority);
}
