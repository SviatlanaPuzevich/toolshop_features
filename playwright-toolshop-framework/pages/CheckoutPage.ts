import { Locator, Page } from '@playwright/test';
import { CheckoutGuestForm } from '../components/CheckoutGuestForm.js';
import { CheckoutLoginForm } from '../components/CheckoutLoginForm.js';

export class CheckoutPage {
  readonly proceedButton: Locator;
  readonly checkoutMessage: Locator;
  readonly guestMessage: Locator;
  readonly guestTab: Locator;

  readonly loginForm: CheckoutLoginForm;
  readonly guestForm: CheckoutGuestForm;

  constructor(readonly page: Page) {
    this.page = page;
    this.proceedButton = this.page.getByRole('button', { name: /Proceed to checkout/i });
    this.checkoutMessage = this.page.getByText('already logged in');
    this.guestMessage = this.page.locator('p:has-text("Continuing as guest:")');
    this.guestTab = this.page.locator('a[href="#guest-tab"]');

    this.loginForm = new CheckoutLoginForm(this.page);
    this.guestForm = new CheckoutGuestForm(this.page);
  }

  async continueAsGuest() {
    await this.guestTab.click();
  }

  getLoginError() {
    return this.page.locator(`[data-test="login-error"]`);
  }

  async waitWhileUserLogged() {
      return this.page.waitForResponse(
          (response) => response.url().includes('users/login') && response.status() === 200,
      );
  }
}
