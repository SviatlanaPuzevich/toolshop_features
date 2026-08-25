import { Page } from '@playwright/test';

export class SearchFilter {
  readonly searchInput;
  readonly searchSubmit;
  readonly clearButton;
  readonly emptyMessage;

  constructor(private readonly page: Page) {
    this.searchInput = this.page.locator('[data-test="search-query"]');
    this.searchSubmit = this.page.locator('[data-test="search-submit"]');
    this.clearButton = this.page.locator('[data-test="search-reset"]');
    this.emptyMessage = this.page.locator('text=There are no products found.');
  }

  async search(text: string) {
    await this.searchInput.fill(text);
    await this.searchSubmit.click();
  }

  async clearSearch() {
    await this.clearButton.click();
  }
}
