import { Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly email: Locator;
  readonly password: Locator;
  readonly submitButton: Locator;
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
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
