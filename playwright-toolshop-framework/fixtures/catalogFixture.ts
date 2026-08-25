import { test as base } from '@playwright/test';
import { CatalogPage } from '../pages/CatalogPage.js';

export type CatalogFixture = {
  catalogPage: CatalogPage;
  openCatalogPage: CatalogPage;
};

export const test = base.extend<CatalogFixture>({
  catalogPage: async ({ page }, use) => {
    const catalogPage = new CatalogPage(page);
    await use(catalogPage);
  },

  openCatalogPage: async ({ catalogPage }, use) => {
    await catalogPage.open();
    await catalogPage.waitProductsLoaded();
    await use(catalogPage);
  }
});

export { expect } from '@playwright/test';
