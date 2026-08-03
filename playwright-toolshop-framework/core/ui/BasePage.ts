import { Page } from '@playwright/test';
import { ApiResponseWaiter } from './ApiResponseWaiter.js';
import { UrlMatcher } from './UrlMatcher.js';

/**
 * Root of the page object hierarchy.
 *
 * Holds the Playwright page and the behaviour every page object needs, no matter
 * whether the page can be opened by an URL - see {@link NavigablePage} for those.
 */
export abstract class BasePage {
  protected constructor(protected readonly page: Page) {}

  public get currentUrl(): string {
    return this.page.url();
  }

  /** Runs the action and waits until the back end calls it triggers are answered. */
  protected async doAndWaitForApi(
    action: () => Promise<void>,
    ...urlMatchers: UrlMatcher[]
  ): Promise<void> {
    await ApiResponseWaiter.during(this.page, action, ...urlMatchers);
  }
}
