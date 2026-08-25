import { test as base } from '@playwright/test';
import { BasketPage } from '../pages/BasketPage.js';

export type BasketFixture = {
  basketPage: BasketPage;
};

export const test = base.extend<BasketFixture>({
  basketPage: async ({ page }, use) => {
    const basketPage = new BasketPage(page);
    await use(basketPage);
  },
});

export { expect } from '@playwright/test';
