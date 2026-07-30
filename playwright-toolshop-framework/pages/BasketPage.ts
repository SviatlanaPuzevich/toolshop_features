import { Locator, Page } from '@playwright/test';
import BasePage from './BasePage.js';

export class BasketPage extends BasePage {
  readonly proceedButton: Locator;

  constructor(page: Page) {
    super(page);
    this.proceedButton = this.page.locator('[data-test="proceed-1"]');
  }

  public async open() {
    return await this.page.goto('checkout');
  }

  async gotoCheckout(): Promise<void> {
    await this.proceedButton.click();
  }
}
