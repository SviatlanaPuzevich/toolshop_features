import { Locator, Page } from '@playwright/test';

export class BasketPage {
  readonly proceedButton: Locator;
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    this.proceedButton = this.page.locator('[data-test="proceed-1"]');
  }

  public async open() {
    return await this.page.goto('checkout');
  }

  async gotoCheckout(): Promise<void> {
    await this.proceedButton.click();
  }
}
