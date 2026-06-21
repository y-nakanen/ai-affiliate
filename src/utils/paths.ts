export function withBase(path: string) {
  if (/^(https?:|mailto:|tel:)/.test(path)) {
    return path;
  }

  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.replace(/^\/+/, '');

  if (!cleanPath) {
    return normalizedBase;
  }

  return `${normalizedBase}${cleanPath}`;
}
