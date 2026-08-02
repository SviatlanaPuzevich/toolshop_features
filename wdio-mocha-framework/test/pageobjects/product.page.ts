import Page from './page.js';

class ProductPage extends Page {
  get toastMessage() {
    return $('.toast-message');
  }

  get productName() {
    return $('h1[data-test="product-name"]');
  }

  get unitPrice() {
    return $('[data-test="unit-price"]');
  }

  get productDescription() {
    return $('[data-test="product-description"]');
  }

  get co2Badge() {
    return $('[data-test="co2-rating-badge"]');
  }

  get productImage() {
    return $('.figure img, figure img');
  }

  get specsTable() {
    return $('[data-test="product-specs"]');
  }

  get specRows() {
    return $$('[data-test="spec-row"]');
  }

  get quantityInput() {
    return $('[data-test="quantity"]');
  }

  get increaseQuantityButton() {
    return $('[data-test="increase-quantity"]');
  }

  get decreaseQuantityButton() {
    return $('[data-test="decrease-quantity"]');
  }

  get addToFavoritesButton() {
    return $('[data-test="add-to-favorites"]');
  }

  get addProductToBasketButton() {
    return $('[data-test="add-to-cart"]');
  }

  get addToCompareButton() {
    return $('[data-test="add-to-compare"]');
  }

  get cartQuantity() {
    return $('[data-test="cart-quantity"]');
  }

  get relatedProductCards() {
    return $$('.card');
  }

  async getCartCount(): Promise<number> {
    if (await this.cartQuantity.isExisting()) {
      return Number(await this.cartQuantity.getText());
    }

    return 0;
  }

  async getQuantity(): Promise<number> {
    return Number(await this.quantityInput.getValue());
  }

  async setQuantity(quantity: number) {
    await this.quantityInput.clearValue();
    await this.quantityInput.setValue(quantity.toString());
  }

  async increaseQuantity() {
    await this.increaseQuantityButton.click();
  }

  async decreaseQuantity() {
    await this.decreaseQuantityButton.click();
  }

  async addProductToBasket() {
    await this.addProductToBasketButton.waitForClickable({ timeout: 8000 });
    await this.addProductToBasketButton.click();
    await this.toastMessage.waitForDisplayed({ timeout: 8000 });
  }

  async addToFavorites() {
    await this.addToFavoritesButton.click();
    await this.toastMessage.waitForDisplayed({ timeout: 5000 });
  }
}

export default new ProductPage();
