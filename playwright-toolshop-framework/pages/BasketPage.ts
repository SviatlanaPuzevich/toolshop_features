import {Page} from '@playwright/test';
import BasePage from "./BasePage";

export class BasketPage extends BasePage {
    readonly proceedButton = this.page.locator('[data-test="proceed-1"]');

    constructor(page: Page) {
        super(page);
    }

    public async open() {
        return await this.page.goto('checkout');
    }

    async gotoCheckout(): Promise<void> {
        await this.proceedButton.click();
    }
}