import { Locator, Page } from '@playwright/test';
import { BaseComponent } from '../../core/index.js';
import { TestAttribute } from '../support/TestAttribute.js';

/** "By category" block of the catalog side bar, showing the sub categories of the opened category. */
export class CategoryFilterPanel extends BaseComponent {
  private static readonly ROOT_SELECTOR = TestAttribute.selector('filters');
  private static readonly CATEGORY_SECTION_SELECTOR = 'h4:has-text("By category:") + div.checkbox';
  private static readonly SUB_CATEGORY_SELECTOR = 'ul div.checkbox';

  private readonly section: Locator;
  private readonly subCategoryItems: Locator;

  private constructor(root: Locator) {
    super(root);
    this.section = root.locator(CategoryFilterPanel.CATEGORY_SECTION_SELECTOR);
    this.subCategoryItems = this.section.locator(CategoryFilterPanel.SUB_CATEGORY_SELECTOR);
  }

  public static on(page: Page): CategoryFilterPanel {
    return new CategoryFilterPanel(page.locator(CategoryFilterPanel.ROOT_SELECTOR));
  }

  public get categorySection(): Locator {
    return this.section;
  }

  public get subCategoryFilters(): Locator {
    return this.subCategoryItems;
  }

  public async getSubCategoryNames(): Promise<string[]> {
    const names = await this.subCategoryItems.locator('label').allTextContents();

    return names.map((name) => name.trim());
  }
}
