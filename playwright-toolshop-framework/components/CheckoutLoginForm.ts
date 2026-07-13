import {Page} from '@playwright/test';

export class CheckoutLoginForm {

    constructor(private readonly page: Page) {
    }

    readonly email = this.page.locator('[data-test="email"]');
    readonly password = this.page.locator('[data-test="password"]');
    readonly loginButton = this.page.locator('[data-test="login-submit"]');


    async login(email: string, password: string,) {
        await this.email.fill(email);
        await this.password.fill(password);
        await this.loginButton.click();
    }
}