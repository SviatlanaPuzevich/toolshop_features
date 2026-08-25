import { Page } from '@playwright/test';

export class CheckoutGuestForm {
  readonly email;
  readonly firstName;
  readonly lastName;
  readonly continueButton;

  constructor(private readonly page: Page) {
    this.email = this.page.locator('[data-test="guest-email"]');
    this.firstName = this.page.locator('[data-test="guest-first-name"]');
    this.lastName = this.page.locator('[data-test="guest-last-name"]');
    this.continueButton = this.page.locator('[data-test="guest-submit"]');
  }

  async register(email: string) {
    await this.email.fill(email);
    await this.firstName.fill('Ann');
    await this.lastName.fill('Ivanova');
    await this.continueButton.click();
  }
}
