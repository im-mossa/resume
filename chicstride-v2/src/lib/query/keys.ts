// src/lib/query/keys.ts
export const queryKeys = {
  slides: (params: object) => ['slides', params] as const,
  categoriesTree: (includeInactive = false) => ['categoriesTree', includeInactive] as const,
  products: (params: object) => ['products', params] as const,
  product: (idOrSlug: string, category?: string) => ['product', idOrSlug, category] as const,
};
