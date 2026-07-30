import { Page, Locator } from '@playwright/test';

export default class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public getError(fieldId: string): Locator {
    return this.page.locator(`[data-test="${fieldId}-error"]`);
  }

  public getErrorElementById(fieldId: string): Locator {
    return this.page.locator(`#${fieldId}-error`);
  }

  public getElementByDataTestAttribute(attribute: string): Locator {
    return this.page.locator(`[data-test="${attribute}"]`);
  }
}
