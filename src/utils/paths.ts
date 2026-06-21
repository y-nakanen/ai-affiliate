export function withBase(path: string) {
  if (/^(https?:|mailto:|tel:)/.test(path)) {
    return path;
  }

  const base = import.meta.env.BASE_URL || '/';
  const cleanPath = path.replace(/^\/+/, '');

  if (!cleanPath) {
    return base;
  }

  return `${base}${cleanPath}`;
}
