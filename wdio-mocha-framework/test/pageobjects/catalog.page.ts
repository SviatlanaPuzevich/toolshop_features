import Page from '../pageobjects/page.ts';

class CatalogPage extends Page {
  open() {
    return super.open('');
  }

  get searchInput() {
    return $('[data-test="search-query"]');
  }

  get searchSubmit() {
    return $('[data-test="search-submit"]');
  }

  get searchReset() {
    return $('[data-test="search-reset"]');
  }

  get productCards() {
    return $$('a.card');
  }

  get noResults() {
    return $('[data-test="no-results"]');
  }

  async waitForProductsLoaded() {
    await browser.waitUntil(
      async () => (await this.productCards.length) > 0 || (await this.noResults.isExisting()),
      { timeout: 15000, timeoutMsg: 'Product catalog did not load' }
    );
  }

  async search(query: string) {
    await this.searchInput.setValue(query);
    await this.searchSubmit.click();
  }

  async clearSearch() {
    await this.searchReset.click();
  }

  async getProductNames(): Promise<string[]> {
    return browser.execute(() =>
      Array.from(document.querySelectorAll('[data-test="product-name"]')).map((el) =>
        (el as HTMLElement).innerText.trim()
      )
    );
  }

  async waitForProductsToChange(previousNames: string[]) {
    await browser.waitUntil(
      async () => {
        if (await this.noResults.isExisting()) {
          return true;
        }
        const current = await this.getProductNames();

        return JSON.stringify(current) !== JSON.stringify(previousNames);
      },
      { timeout: 20000, timeoutMsg: 'Product list did not update after filtering' }
    );
  }
}

export default new CatalogPage();
