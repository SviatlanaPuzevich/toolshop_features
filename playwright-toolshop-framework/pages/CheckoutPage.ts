import {Page} from '@playwright/test';
import BasePage from "./BasePage";

export class CheckoutPage extends BasePage{

    constructor(readonly page: Page) {
        super(page);
    }

    readonly proceedButton =this.page.getByRole('button', {name: /Proceed to checkout/i});
    readonly checkoutMessage = this.page.locator('p:has-text("You can proceed to checkout.")');
    readonly guestMessage = this.page.locator('p:has-text("Continuing as guest:")');
    readonly guestTab = this.page.locator('a[href="#guest-tab"]');


    async continueAsGuest() {
        await this.guestTab.click();
    }

}