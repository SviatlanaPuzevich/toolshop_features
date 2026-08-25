import { mergeTests } from '@playwright/test';
import { test as catalogTest } from './catalogFixture.js';
import { test as productTest } from './productFixture.js';
import { test as basketTest } from './basketFixture.js';
import { test as checkoutTest } from './checkoutFixture.js';
import { test as registerTest } from './registerFixture.js';

const baseCheckoutTest = mergeTests(catalogTest, productTest, basketTest, checkoutTest, registerTest);

export type CheckoutFlowFixture = {
  goToCheckout: () => Promise<void>;
};

export const test = baseCheckoutTest.extend<CheckoutFlowFixture>({
  goToCheckout: async ({ openCatalogPage, productPage, basketPage }, use) => {
    const goToCheckout = async () => {

      await openCatalogPage.selectFirstCard();

      await productPage.waitUntilProductLoaded();
      await productPage.addToCart();

      await basketPage.open();
      await basketPage.gotoCheckout();
    };

    await use(goToCheckout);
  },
});

export { expect } from '@playwright/test';
