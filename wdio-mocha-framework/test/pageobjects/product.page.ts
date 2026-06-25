import Page from './page.js';

class ProductPage extends Page {
  get toastMessage() {
    return $('.toast-message');
  }

  get addToFavoritesButton() {
    return $('#btn-add-to-favorites');
  }
}

export default new ProductPage();
