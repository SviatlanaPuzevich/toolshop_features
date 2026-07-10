import {ProductPage} from '../pages/ProductPage';
import {BasketPage} from '../pages/BasketPage';
import {CheckoutPage} from '../pages/CheckoutPage';
import {CatalogPage} from "../pages/CatalogPage";

export type CheckoutFixture = {
    checkoutPage: CheckoutPage;
};

export const checkoutFixtures = {
    checkoutPage: async ({ page }, use) => {
        const catalogPage = new CatalogPage(page);
        await catalogPage.open();
        await catalogPage.waitProductsLoaded();
        await catalogPage.selectFirstCard();

        const productPage = new ProductPage(page);
        await productPage.waitUntilProductLoaded();
        await productPage.addToCart();

        const basketPage = new BasketPage(page);
        await basketPage.open();
        await basketPage.gotoCheckout();

        const checkoutPage = new CheckoutPage(page);

        await use(checkoutPage);
    },
};

export { expect } from '@playwright/test';