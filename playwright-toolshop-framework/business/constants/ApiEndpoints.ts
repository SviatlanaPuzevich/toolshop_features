import { UrlMatcher } from '../../core/index.js';

/** Back end calls the UI depends on, used to synchronise steps with the application. */
export const ApiEndpoints = {
  /** Catalog listing. Matched by the end of the URL so that search calls are excluded. */
  products: /\/products(\?.*)?$/,
  productSearch: '/products/search',
  categoryTree: '/categories/tree',
} as const satisfies Record<string, UrlMatcher>;
