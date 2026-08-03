import { Page, Response } from '@playwright/test';
import { matchesUrl, UrlMatcher } from './UrlMatcher.js';

/**
 * Synchronises test steps with the back end calls a single page action triggers.
 *
 * The waiter has to be started *before* the action, otherwise the response can be
 * missed, therefore {@link during} takes the action as an argument.
 */
export class ApiResponseWaiter {
  private static readonly SUCCESS_STATUS = 200;

  /** Runs the action and resolves when the matching response has been received. */
  public static async during(
    page: Page,
    action: () => Promise<void>,
    ...urlMatchers: UrlMatcher[]
  ): Promise<void> {
    const responses = urlMatchers.map((matcher) => ApiResponseWaiter.waitFor(page, matcher));

    await Promise.all([...responses, action()]);
  }

  public static waitFor(
    page: Page,
    urlMatcher: UrlMatcher,
    expectedStatus: number = ApiResponseWaiter.SUCCESS_STATUS,
  ): Promise<Response> {
    return page.waitForResponse(
      (response) => matchesUrl(response.url(), urlMatcher) && response.status() === expectedStatus,
    );
  }
}
