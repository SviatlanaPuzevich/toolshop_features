import { test as baseTest } from '@playwright/test';
import { CheckoutPage } from '../pages/CheckoutPage.js';

export type CheckoutFixture = {
  checkoutPage: CheckoutPage;
};

export const test = baseTest.extend<CheckoutFixture>({
  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },
});

export { expect } from '@playwright/test';
