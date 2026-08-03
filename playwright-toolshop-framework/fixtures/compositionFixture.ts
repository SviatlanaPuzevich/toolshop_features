import { mergeTests } from '@playwright/test';
import { test as registerTest } from './registerFixture.js';
import { test as catalogTest } from './catalogFixture.js';
import { test as productTest } from './productFixture.js';
import { test as basketTest } from './basketFixture.js';
import { test as checkoutBaseTest } from './checkoutFixture.js';

const mergedTest = mergeTests(
    registerTest,
    catalogTest,
    productTest,
    basketTest,
    checkoutBaseTest
);

export const test = mergedTest.extend<{ onCheckoutPage: void }>({
    onCheckoutPage: [async ({ catalogPage, productPage, basketPage }, use) => {
        await catalogPage.open();
        await catalogPage.waitProductsLoaded();
        await catalogPage.selectFirstCard();
        await productPage.waitUntilProductLoaded();
        await productPage.addToCart();
        await basketPage.open();
        await basketPage.gotoCheckout();

        await use();
    }, { auto: true }],
});

export { expect } from '@playwright/test';
