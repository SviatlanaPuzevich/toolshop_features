import Page from './page';

class BasketPage extends Page {
  open() {
    return super.open('checkout');
  }

  get productRows() {
    return $$('[data-test="cart-item"]');
  }

  get productNames() {
    return $$('[data-test="product-title"]');
  }

  get productPrices() {
    return $$('[data-test="product-price"]');
  }

  get quantityInputs() {
    return $$('input[data-test="product-quantity"]');
  }

  get itemTotals() {
    return $$('[data-test="line-price"]');
  }

  get totalPrice() {
    return $('[data-test="cart-total"]');
  }

  get continueShoppingButton() {
    return $('button*=Continue Shopping');
  }

  get checkoutButton() {
    return $('button*=Proceed to checkout');
  }

  get removeButtons() {
    return $$('.btn-danger');
  }

  get emptyBasketMessage() {
    return $('//div[contains(., "cart is empty")]');
  }

  get successAlert() {
    return $('.alert');
  }

  async getItemTotal(index: number) {
    const text = await this.itemTotals[index].getText();

    return Number(text.replace(/[^\d.]/g, ''));
  }

  async getBasketTotal() {
    const text = await this.totalPrice.getText();

    return Number(text.replace(/[^\d.]/g, ''));
  }

  async setQuantity(index: number, quantity: number) {
    const input = this.quantityInputs[index];

    await input.clearValue();
    await input.setValue(quantity.toString());

    await browser.keys('Tab');
  }

  async removeProduct(index: number) {
    await this.removeButtons[index].click();
  }

  async removeAllProducts() {
      await browser.waitUntil(async () => (await this.removeButtons.length) > 0, {
        timeout: 3000,
        timeoutMsg: 'There are no buttons',
      });

    while ((await this.removeButtons.length) > 0) {
      const firstButton = this.removeButtons[0];

      await firstButton.waitForClickable({ timeout: 2000 });
      await firstButton.click();

      await browser.waitUntil(async () => !(await firstButton.isExisting()), {
        timeout: 5000,
        timeoutMsg: 'Remove button did not disappear after click',
      });
    }
  }
}

export default new BasketPage();
