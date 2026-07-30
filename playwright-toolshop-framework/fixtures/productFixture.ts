import { test as base } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage.js';

export type ProductFixture = {
  productPage: ProductPage;
};

export const test = base.extend<ProductFixture>({
  productPage: async ({ page }, use) => {
    const productPage = new ProductPage(page);
    await use(productPage);
  },
});

export { expect } from '@playwright/test';
