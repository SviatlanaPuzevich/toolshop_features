import { Locator, Page } from '@playwright/test';
import { BasePage } from '../../core/index.js';
import { TestAttribute } from '../support/TestAttribute.js';

/** Product details page. It is reached from the catalog, so it has no path of its own. */
export class ProductPage extends BasePage {
  private readonly addToCartButton: Locator;
  private readonly description: Locator;
  private readonly cartQuantityBadge: Locator;

  constructor(page: Page) {
    super(page);
    this.addToCartButton = page.locator(TestAttribute.selector('add-to-cart'));
    this.description = page.locator(TestAttribute.selector('product-description'));
    this.cartQuantityBadge = page.locator(TestAttribute.selector('cart-quantity'));
  }

  public async waitUntilLoaded(): Promise<void> {
    await this.description.waitFor({ state: 'visible' });
  }

  /**
   * Puts the product into the cart and waits until the cart badge shows it. Without that
   * wait a following navigation can happen before the cart is stored, leaving it empty.
   */
  public async addToCart(): Promise<void> {
    await this.addToCartButton.click();
    await this.cartQuantityBadge.waitFor({ state: 'visible' });
  }
}
