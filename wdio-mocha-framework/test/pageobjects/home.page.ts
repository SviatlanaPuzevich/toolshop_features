import Page from './page.js';

class HomePage extends Page {
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

}

export default new HomePage();
