import { Locator, Page } from '@playwright/test';
import { NavigablePage } from '../../core/index.js';
import { CategoryFilterPanel } from '../components/CategoryFilterPanel.js';
import { SearchPanel } from '../components/SearchPanel.js';
import { ApiEndpoints } from '../constants/ApiEndpoints.js';
import { AppRoutes } from '../constants/AppRoutes.js';
import { TestAttribute } from '../support/TestAttribute.js';

/** Landing page of the shop: product grid, search and category navigation. */
export class CatalogPage extends NavigablePage {
  protected readonly path = AppRoutes.catalog;

  public readonly search: SearchPanel;
  public readonly categoryFilters: CategoryFilterPanel;

  private readonly categoriesMenuButton: Locator;
  private readonly categoryLinks: Locator;
  private readonly productCards: Locator;
  private readonly productTitles: Locator;
  private readonly noProductsFound: Locator;

  constructor(page: Page) {
    super(page);
    this.search = SearchPanel.on(page);
    this.categoryFilters = CategoryFilterPanel.on(page);
    this.categoriesMenuButton = page.locator(TestAttribute.selector('nav-categories'));
    this.categoryLinks = page.locator(`${TestAttribute.selector('nav-categories')} + ul a`);
    this.productCards = page.locator('.card:not(.skeleton)');
    this.productTitles = page.locator(TestAttribute.selector('product-name'));
    this.noProductsFound = page.getByText('There are no products found.');
  }

  public get products(): Locator {
    return this.productCards;
  }

  public get noProductsFoundMessage(): Locator {
    return this.noProductsFound;
  }

  public override async open(): Promise<void> {
    await super.open();
    await this.waitUntilProductsLoaded();
  }

  /** Opens a top level category and waits until products and filters have been refreshed. */
  public async selectCategory(category: string): Promise<void> {
    await this.openCategoriesMenu();
    await this.doAndWaitForApi(
      () => this.categoryLinks.getByText(category, { exact: true }).click(),
      ApiEndpoints.products,
      ApiEndpoints.categoryTree,
    );
    await this.waitUntilProductsLoaded();
  }

  public async getAvailableCategories(): Promise<string[]> {
    await this.openCategoriesMenu();
    const categories = await this.categoryLinks.allTextContents();

    return categories.map((category) => category.trim());
  }

  public async getProductNames(): Promise<string[]> {
    return this.productTitles.allTextContents();
  }

  public async getProductCount(): Promise<number> {
    return this.productCards.count();
  }

  public async openFirstProduct(): Promise<void> {
    await this.waitUntilProductsLoaded();
    await this.productCards.first().click();
  }

  public async waitUntilProductsLoaded(): Promise<void> {
    await this.productCards.first().waitFor({ state: 'visible' });
  }

  private async openCategoriesMenu(): Promise<void> {
    await this.categoriesMenuButton.click();
  }
}
