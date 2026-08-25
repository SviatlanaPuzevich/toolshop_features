import { Page } from '@playwright/test';

export class CategoryFilters {
  readonly filtersPanel;
  readonly subFilters;
  readonly subFilter;

  constructor(private readonly page: Page) {
    this.filtersPanel = this.page.locator('h4:has-text("By category:") + div.checkbox');
    this.subFilters = this.page.locator(
      "//h4[contains(text(), 'By category:')]/following-sibling::div[1]//ul//div",
    );
    this.subFilter = this.page.locator('h4:has-text("By category:") + div >> ul div label');
  }

  async subfiltersCount() {
    return this.subFilters.count();
  }

  async waitForCategoryTree() {
    return this.page.waitForResponse(
      (response) => response.url().includes('/categories/tree') && response.status() === 200,
    );
  }
}
