import { browser } from '@wdio/globals';

/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
export default class Page {
  /**
   * Opens a sub page of the page
   * @param path path of the sub page (e.g. /path/to/page.html)
   */
  public open(path: string) {
    return browser.url(`https://practicesoftwaretesting.com/${path}`);
  }

  public getError(fieldId: string) {
    return $(`[data-test="${fieldId}-error"]`);
  }

  public getErrorElementById(fieldId: string) {
    return $(`#${fieldId}-error`);
  }

  public getElementByDataTestAttribute(attribute: string) {
    return $(`[data-test="${attribute}"]`);
  }
}
