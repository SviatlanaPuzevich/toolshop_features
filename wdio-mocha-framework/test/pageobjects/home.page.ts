import Page from './page.js';

class HomePage extends Page {
  open(): Promise<WebdriverIO.Request | void> {
    return super.open('');
  }

  get languageSelector() {
    return this.getElementByDataTestAttribute('language-select');
  }

  get availableLanguages() {
    return $$(
      '//button[@data-test="language-select"]/following-sibling::ul[contains(@class, "dropdown-menu")]/li'
    );
  }

  get menuCategories() {
    return $('button[data-test="nav-categories"]');
  }

  get productCards() {
    return $$('[data-test="product-name"]');
  }

  async selectLanguage(language: string) {
    await this.languageSelector.click();

    const dropdown = $('button[data-test="language-select"] + ul.dropdown-menu');
    const languageItem = dropdown.$(`li*=${language}`);
    await languageItem.click();
  }

  get allProductCards() {
    return $$('a.card');
  }

  async selectProductCard(index: number) {
    const allProductCards = this.allProductCards;
    await allProductCards[index].click();

    const productNameHeader = await $('h1[data-test="product-name"]');
    await productNameHeader.waitForDisplayed({
      timeout: 3000,
      timeoutMsg: `Product is not loaded during 3 sec`,
    });
  }
}

export default new HomePage();
