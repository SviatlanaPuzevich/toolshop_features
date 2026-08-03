import { Locator, Page } from '@playwright/test';
import { NavigablePage } from '../../core/index.js';
import { AppRoutes } from '../constants/AppRoutes.js';
import { TestAttribute } from '../support/TestAttribute.js';

/** First checkout step: the cart summary. */
export class CartPage extends NavigablePage {
  protected readonly path = AppRoutes.checkout;

  private readonly proceedButton: Locator;

  constructor(page: Page) {
    super(page);
    this.proceedButton = page.locator(TestAttribute.selector('proceed-1'));
  }

  public async proceedToCheckout(): Promise<void> {
    await this.proceedButton.click();
  }
}
