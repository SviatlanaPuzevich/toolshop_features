import { test as base } from '@playwright/test';
import { CatalogPage } from '../pages/CatalogPage.js';

export type CatalogFixture = {
  catalogPage: CatalogPage;
};

export const test = base.extend<CatalogFixture>({
  catalogPage: async ({ page }, use) => {
    const catalogPage = new CatalogPage(page);
    await catalogPage.open();
    await use(catalogPage);
  },
});

export { expect } from '@playwright/test';
