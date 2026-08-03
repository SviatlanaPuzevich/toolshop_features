import { Locator, Page } from '@playwright/test';
import { ApiResponseWaiter, BaseComponent } from '../../core/index.js';
import { ApiEndpoints } from '../constants/ApiEndpoints.js';
import { TestAttribute } from '../support/TestAttribute.js';

/** Search box of the catalog side bar. */
export class SearchPanel extends BaseComponent {
  private static readonly ROOT_SELECTOR = TestAttribute.selector('filters');

  private readonly queryInput: Locator;
  private readonly submitButton: Locator;
  private readonly resetButton: Locator;

  private constructor(root: Locator) {
    super(root);
    this.queryInput = root.locator(TestAttribute.selector('search-query'));
    this.submitButton = root.locator(TestAttribute.selector('search-submit'));
    this.resetButton = root.locator(TestAttribute.selector('search-reset'));
  }

  public static on(page: Page): SearchPanel {
    return new SearchPanel(page.locator(SearchPanel.ROOT_SELECTOR));
  }

  /** Searches and waits until the results have been received. */
  public async searchFor(query: string): Promise<void> {
    await this.enterQuery(query);
    await ApiResponseWaiter.during(this.page, () => this.submit(), ApiEndpoints.productSearch);
  }

  /** Types the query without submitting it. */
  public async enterQuery(query: string): Promise<void> {
    await this.queryInput.fill(query);
  }

  /** Submits the typed query without waiting for results, e.g. a query the shop ignores. */
  public async submit(): Promise<void> {
    await this.submitButton.click();
  }

  /** Clears the query and waits until the full catalog has been restored. */
  public async reset(): Promise<void> {
    await ApiResponseWaiter.during(
      this.page,
      () => this.resetButton.click(),
      ApiEndpoints.products,
    );
  }
}
