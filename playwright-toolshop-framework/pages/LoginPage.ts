import {Page, Locator} from '@playwright/test';
import BasePage from "./BasePage";

export class LoginPage extends BasePage {
    readonly email: Locator;
    readonly password: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        super(page);
        this.email = page.locator('#email');
        this.password = page.locator('#password');
        this.submitButton = page.locator('[data-test="login-submit"]');
    }

    public async open() {
        return await this.page.goto('auth/login');
    }

    async login(email: string, password: string): Promise<void> {
        await this.email.fill(email);
        await this.password.fill(password);
        await this.submitButton.click();
    }
}