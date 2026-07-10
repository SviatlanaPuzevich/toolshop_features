import {Page} from '@playwright/test';
import BasePage from "./BasePage";

export class ProductPage extends BasePage {
    readonly addToCartButton = this.page.locator('[data-test="add-to-cart"]');
    readonly productDescription = this.page.locator('[data-test="product-description"]');

    constructor(page: Page) {
        super(page);
    }

    async waitUntilProductLoaded() {
        await this.productDescription.waitFor({ state: 'visible' });
    }

    async addToCart(){
        await this.addToCartButton.click();
    }
}