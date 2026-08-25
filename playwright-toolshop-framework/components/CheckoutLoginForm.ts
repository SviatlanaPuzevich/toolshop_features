import { Locator, Page } from '@playwright/test';

export class CheckoutLoginForm {
  readonly email: Locator;
  readonly password;
  readonly loginButton;

  constructor(private readonly page: Page) {
    this.email = this.page.locator('#email');
    this.password = this.page.locator('#password');
    this.loginButton = this.page.locator('[data-test="login-submit"]');
  }

  async login(email: string, password: string) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}
