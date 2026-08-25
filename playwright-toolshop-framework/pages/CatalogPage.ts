import { expect, Locator, Page } from '@playwright/test';
import { CategoryFilters } from '../components/CategoryFilters.js';
import { SearchFilter } from '../components/SearchFilter.js';

export class CatalogPage {
  readonly categorySelect: Locator;
  readonly categoryOptions: Locator;
  readonly productCards: Locator;
  readonly productNames: Locator;
  readonly searchCountText: Locator;

  readonly categoryFilters: CategoryFilters;
  readonly searchFilter: SearchFilter;

  constructor(private readonly page: Page) {
    this.categorySelect = this.page.locator('[data-test="nav-categories"]');
    this.categoryOptions = this.page.locator('[data-test="nav-categories"] + ul li');
    this.productCards = this.page.locator('.card:not(.skeleton)');
    this.productNames = this.page.locator('[data-test="product-name"]');
    this.searchCountText = this.page.locator('[data-test="search-result-count"]');
    this.categoryFilters = new CategoryFilters(this.page);
    this.searchFilter = new SearchFilter(this.page);
  }

  async open() {
    await this.page.goto('/');
  }

  async openCategories() {
    await this.categorySelect.click();
  }

  async selectCategory(category: string) {
    await this.openCategories();
    const categoriesList = this.page.locator('[data-test="nav-categories"] + ul a');
    await categoriesList.getByText(category, { exact: true }).click();
  }

  async getAvailableCategories() {
    await this.openCategories();
    return this.categoryOptions.allTextContents();
  }

  async getProductNames() {
    return this.productNames.allTextContents();
  }

  async waitProductsLoaded() {
    await expect(this.productCards.first()).toBeVisible();
  }

  async productCount() {
    return this.productCards.count();
  }

  async selectFirstCard() {
    await this.productCards.first().click();
  }

  async waitSearchResponse() {
    return this.page.waitForResponse(
      (response) => response.url().includes('/products/search') && response.status() === 200,
    );
  }

  async waitLoadedCatalogResponse() {
    return this.page.waitForResponse(
      (response) => response.url().endsWith('/products') && response.status() === 200,
    );
  }
}
