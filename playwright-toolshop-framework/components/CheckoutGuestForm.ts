import {Page} from '@playwright/test';

export class CheckoutGuestForm {

    constructor(private readonly page: Page) {
    }

    readonly email = this.page.locator('data-test["guest-email"]');
    readonly firstName = this.page.locator('data-test["guest-first-name"]');
    readonly lastName = this.page.locator('data-test["guest-last-name"]');
    readonly continueButton = this.page.locator('button[data-test="guest-submit"]');


    async register(email: string) {
        await this.email.fill(email);
        await this.firstName.fill("Ann");
        await this.lastName.fill("Ivanova");
        await this.continueButton.click();
    }
}