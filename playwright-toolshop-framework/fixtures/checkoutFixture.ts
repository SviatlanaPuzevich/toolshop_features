import { mergeTests } from '@playwright/test';
import { test as catalogTest } from './catalogFixture.js';
import { test as productTest } from './productFixture.js';
import { test as basketTest } from './basketFixture.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';

export type CheckoutFixture = {
  checkoutPage: CheckoutPage;
};

const mergedTest = mergeTests(catalogTest, productTest, basketTest);

export const test = mergedTest.extend<CheckoutFixture>({
  checkoutPage: async ({ page, catalogPage, productPage, basketPage }, use) => {
    await catalogPage.open();
    await catalogPage.waitProductsLoaded();
    await catalogPage.selectFirstCard();

    await productPage.waitUntilProductLoaded();
    await productPage.addToCart();

    await basketPage.open();
    await basketPage.gotoCheckout();

    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },
});

export { expect } from '@playwright/test';
