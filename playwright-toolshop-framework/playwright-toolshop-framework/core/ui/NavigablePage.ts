import { BasePage } from './BasePage.js';
import { StringUtils } from '../utils/StringUtils.js';

/** A page that has its own URL and therefore can be opened directly. */
export abstract class NavigablePage extends BasePage {
  /** Path relative to the configured base URL. */
  protected abstract readonly path: string;

  public async open(): Promise<void> {
    await this.page.goto(this.path);
  }

  public async waitUntilOpened(): Promise<void> {
    await this.page.waitForURL(this.urlPattern);
  }

  public isOpened(): boolean {
    return this.urlPattern.test(this.currentUrl);
  }

  /** Matches the page URL with an optional trailing slash and query string. */
  protected get urlPattern(): RegExp {
    return new RegExp(`${StringUtils.escapeRegExp(this.path)}/?(\\?.*)?$`);
  }
}
