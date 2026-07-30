import { Locator, Page } from '@playwright/test';
import BasePage from './BasePage.js';

export class CheckoutPage extends BasePage {
  readonly proceedButton: Locator;
  readonly checkoutMessage: Locator;
  readonly guestMessage: Locator;
  readonly guestTab: Locator;

  constructor(readonly page: Page) {
    super(page);
    this.proceedButton = this.page.getByRole('button', { name: /Proceed to checkout/i });
    this.checkoutMessage = this.page.getByText('already logged in');
    this.guestMessage = this.page.locator('p:has-text("Continuing as guest:")');
    this.guestTab = this.page.locator('a[href="#guest-tab"]');
  }

  async continueAsGuest() {
    await this.guestTab.click();
  }
}
