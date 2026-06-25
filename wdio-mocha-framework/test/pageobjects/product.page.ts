import Page from './page.js';

class ProductPage extends Page {
  get toastMessage() {
    return $('.toast-message');
  }

  get addToFavoritesButton() {
    return $('#btn-add-to-favorites');
  }

  get addProductToBasketButton() {
    return $('#btn-add-to-cart');
  }

  async addProductToBasket() {
    await this.addProductToBasketButton.click();
    await this.toastMessage.waitForDisplayed({ timeout: 3000 });
  }
}

export default new ProductPage();
