import Page from './page';

class FavoritesPage extends Page {

  open() {
    return super.open('account/favorites');
  }

  get favoriteCards() {
    return $$('div.card');
  }

  get favoriteImages() {
    return $$('.card-img');
  }

  get favoriteNames() {
    return $$('[data-test="product-name"]');
  }

  get favoriteDescriptions() {
    return $$('[data-test="product-description"]');
  }

  get removeButtons() {
    return $$('button[data-test="delete"]');
  }

  get emptyFavoritesMessage() {
    return $('//div[contains(text(), "There are no favorites yet.")]');
  }

  async removeFavorite(index: number) {
    await this.removeButtons[index].click();
  }

  async removeAllFavorites() {

    let buttons = this.removeButtons;

    while (await buttons.length > 0) {

      await buttons[0].click();

      await browser.pause(300);

      buttons = this.removeButtons;
    }
  }
}

export default new FavoritesPage();